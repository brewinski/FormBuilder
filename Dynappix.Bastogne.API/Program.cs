using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;

namespace Dynappix.Bastogne.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel() // Web server Kestrel = cross platform. Options Kestrel and Web Listener = Windows Only
                .UseContentRoot(Directory.GetCurrentDirectory()) 
                .UseIISIntegration() //IIS as reverse proxy
                .UseStartup<Startup>() 
                .UseApplicationInsights() // Interesting to see how this works :)
                .Build(); //Builds IWebhost Instance.

            host.Run(); //Runs Application
        }
    }
}
