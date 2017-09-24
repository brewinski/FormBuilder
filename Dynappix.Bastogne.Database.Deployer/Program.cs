namespace Dynappix.Bastogne.Database.Deployer
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using DbUp;
    using DbUp.Engine;
    using DbUp.Helpers;
    using Dynappix.Bastogne.Database.Deployer.Properties;

    /// <summary>
    ///     The <see cref="Program" />
    ///     class provides the
    /// </summary>
    internal class Program
    {
        /// <summary>
        /// Cleans the argument.
        /// </summary>
        /// <param name="argument">
        /// The argument.
        /// </param>
        /// <param name="prefix">
        /// The prefix.
        /// </param>
        /// <returns>
        /// The cleaned argument.
        /// </returns>
        private static string CleanArgument(string argument, string prefix)
        {
            var strippedArgument = argument.Substring(prefix.Length);

            if (strippedArgument.StartsWith("\"", StringComparison.OrdinalIgnoreCase) &&
                strippedArgument.EndsWith("\"", StringComparison.OrdinalIgnoreCase))
            {
                strippedArgument = strippedArgument.Substring(1, strippedArgument.Length - 2);
            }

            return strippedArgument;
        }

        /// <summary>
        /// Deploys the database.
        /// </summary>
        /// <param name="connectionString">
        /// The connection string.
        /// </param>
        /// <param name="args">
        /// The arguments.
        /// </param>
        /// <returns>
        /// The <see cref="bool"/>.
        /// </returns>
        private static bool DeployDatabase(string connectionString, string[] args)
        {
            if (ExecuteArgumentScripts(connectionString, args, "-pre:") == false)
            {
                return false;
            }

            var assembly = Assembly.GetExecutingAssembly();


            var variables = new Dictionary<string, string>();

            variables.Add("Environment", ConfigurationManager.AppSettings["EnvironmentName"]);
            variables.Add("FromEmail", ConfigurationManager.AppSettings["FromEmail"]);

            // Execute all the scripts in the application except the dbo.GetVersion script
            //var upgradeEngine =
            //    DeployChanges.To.SqlDatabase(connectionString)
            //        .WithScriptsEmbeddedInAssembly(assembly)
            //        .WithVariables(variables)
            //        .LogToConsole()
            //        .Build();

            // Execute all the scripts in the application except the dbo.GetVersion script
            var upgradeEngineBuilder =
                DeployChanges.To.SqlDatabase(connectionString)
                    .WithScriptsEmbeddedInAssembly(assembly)
                    .WithVariables(variables);

            upgradeEngineBuilder.Configure(
                            c =>
                            {
                                c.ScriptExecutor.ExecutionTimeoutSeconds = 10 * 60; // 10 minutes in seconds
                            }
                        );

            var upgradeEngine =
                upgradeEngineBuilder
                    .LogToConsole()
                    .Build();


            if (ExecuteEngine(upgradeEngine) == false)
            {
                return false;
            }

            // Execute all the embedded scripts without journaling
            var versionEngine =
                DeployChanges.To.SqlDatabase(connectionString)
                    .WithScripts(new EmbeddedCodeProvider(assembly))
                    .LogToConsole()
                    .JournalTo(new NullJournal())
                    .Build();

            if (ExecuteEngine(versionEngine) == false)
            {
                return false;
            }

            if (ExecuteArgumentScripts(connectionString, args, "-post:") == false)
            {
                return false;
            }

            return true;
        }

        /// <summary>
        /// Executes the argument scripts.
        /// </summary>
        /// <param name="connectionString">
        /// The connection string.
        /// </param>
        /// <param name="args">
        /// The arguments.
        /// </param>
        /// <param name="prefix">
        /// The prefix.
        /// </param>
        /// <returns>
        /// The <see cref="bool"/>.
        /// </returns>
        private static bool ExecuteArgumentScripts(string connectionString, IEnumerable<string> args, string prefix)
        {
            // Find any script in the arguments that match the expected prefix
            var scripts = ParseScriptArguments(args, prefix);

            if (scripts.Count == 0)
            {
                return true;
            }

            var missingScripts = scripts.Where(x => File.Exists(x) == false).ToList();

            if (missingScripts.Count > 0)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(Resources.ScriptsNotFound, prefix);
                missingScripts.ForEach(Console.WriteLine);
                Console.ResetColor();

                return false;
            }

            Console.WriteLine(Resources.ExecutingCommandLine, prefix);

            var builder = DeployChanges.To.SqlDatabase(connectionString).LogToConsole().JournalTo(new NullJournal());

            var scriptsToExecute = scripts.Select(SqlScript.FromFile);

            var engine = builder.WithScripts(scriptsToExecute).Build();

            return ExecuteEngine(engine);
        }

        /// <summary>
        /// Executes the engine.
        /// </summary>
        /// <param name="engine">
        /// The engine.
        /// </param>
        /// <returns>
        /// The <see cref="bool"/>.
        /// </returns>
        private static bool ExecuteEngine(UpgradeEngine engine)
        {
            var result = engine.PerformUpgrade();

            if (result.Successful == false)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(result.Error);
                Console.ResetColor();
            }

            return result.Successful;
        }

        /// <summary>
        /// Mains the specified arguments.
        /// </summary>
        /// <param name="args">
        /// The arguments.
        /// </param>
        /// <returns>
        /// The <see cref="int"/>.
        /// </returns>
        /// <exception cref="System.InvalidOperationException">
        /// No configuration found for connection setting TGA.CaCertificateRepository.Database.Deploy.
        /// </exception>
        private static int Main(string[] args)
        {
            var configuration = ConfigurationManager.ConnectionStrings["Dynappix.Bastogne.Database.Deploy"];

            if (configuration == null)
            {
                throw new InvalidOperationException(
                    "No configuration found for connection setting Dynappix.Bastogne.Database.Deploy.");
            }

            var connectionString = configuration.ConnectionString;

            if (DeployDatabase(connectionString, args) == false)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(Resources.DeploymentFailed);
                Console.ResetColor();

#if (DEBUG == true)
                Console.ReadKey();
#endif

                return -1;
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine(Resources.DeploymentSucceeded);
            Console.ResetColor();

#if (DEBUG == true)
            Console.ReadKey();
#endif

            return 0;
        }

        /// <summary>
        /// Parses the script arguments.
        /// </summary>
        /// <param name="args">
        /// The arguments.
        /// </param>
        /// <param name="prefix">
        /// The prefix.
        /// </param>
        /// <returns>
        /// The <see cref="List{T}"/>.
        /// </returns>
        private static List<string> ParseScriptArguments(IEnumerable<string> args, string prefix)
        {
            var scripts =
                args.Where(x => x.StartsWith(prefix, StringComparison.OrdinalIgnoreCase))
                    .Select(x => CleanArgument(x, prefix))
                    .ToList();

            return scripts;
        }
    }

}
