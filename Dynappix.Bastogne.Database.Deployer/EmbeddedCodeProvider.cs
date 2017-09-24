namespace Dynappix.Bastogne.Database.Deployer
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using DbUp.Engine;
    using DbUp.Engine.Transactions;

    /// <summary>
    ///     An enhanced <see cref="IScriptProvider" /> implementation which retrieves upgrade scripts or IScript code upgrade
    ///     scripts embedded in an assembly.
    /// </summary>
    public class EmbeddedCodeProvider : IScriptProvider
    {
        /// <summary>
        ///     The assembly.
        /// </summary>
        private readonly Assembly _assembly;

        /// <summary>
        /// Initializes a new instance of the <see cref="EmbeddedCodeProvider" /> class.
        /// </summary>
        /// <param name="assembly">The assembly.</param>
        public EmbeddedCodeProvider(Assembly assembly)
        {
            _assembly = assembly;
        }

        /// <summary>
        /// Gets all scripts that should be executed.
        /// </summary>
        /// <param name="connectionManager">
        /// The connection manager.
        /// </param>
        /// <returns>
        /// The <see cref="IEnumerable{T}"/>.
        /// </returns>
        public IEnumerable<SqlScript> GetScripts(IConnectionManager connectionManager)
        {
            var sqlScripts = ScriptsFromScriptClasses(connectionManager).OrderBy(x => x.Name).ToList();

            return sqlScripts;
        }

        /// <summary>
        /// Scripts from script classes.
        /// </summary>
        /// <param name="connectionManager">
        /// The connection manager.
        /// </param>
        /// <returns>
        /// The scripts from embedded code files.
        /// </returns>
        private IEnumerable<SqlScript> ScriptsFromScriptClasses(IConnectionManager connectionManager)
        {
            var script = typeof(IScript);
            return
                connectionManager.ExecuteCommandsWithManagedConnection(
                    dbCommandFactory =>
                        _assembly.GetTypes()
                            .Where(type => script.IsAssignableFrom(type) && type.IsClass)
                            .Select(
                                s =>
                                    (SqlScript)
                                        new LazySqlScript(
                                            s.Name + ".cs",
                                            () => ((IScript)Activator.CreateInstance(s)).ProvideScript(dbCommandFactory)))
                            .ToList());
        }
    }

}
