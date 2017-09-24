using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dynappix.Bastogne.Helpers
{
    public class MailSettings
    {
        public string ToAddress { get; set; }
        public string FromAddress { get; set; }
        public string ImplementationSubject { get; set; }
        public string Server { get; set; }
        public int Port { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string RunTimeBaseUrl { get; set; }
    }
}
