using Microsoft.Extensions.Configuration;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dynappix.Bastogne.Services
{
    public interface IMailService
    {
        Task SendEmailAsync(MimeMessage emailMessage);
        Task SendImplementationEmail(string toAddress, string subject, string message, string base64Image);
    }
}
