using Dynappix.Bastogne.Helpers;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Utils;
using System;
using System.IO;
using System.Threading.Tasks;


namespace Dynappix.Bastogne.Services
{
    public class MailService: IMailService
    {
        private MailSettings _mailSettings;

        public MailService(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }

        public async Task SendImplementationEmail(string toAddress, string subject, string message, string base64Image)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("", _mailSettings.FromAddress));
            emailMessage.To.Add(new MailboxAddress("", toAddress));
            emailMessage.Subject = subject;

            // create an image attachment for the file located at path
            var attachment = ConvertBase64ImageToAttachment(base64Image);

            var contentId = MimeUtils.GenerateMessageId();

            //Create Message Body
            var bodyBuilder = new BodyBuilder();
            message = message + "<img src=\"cid:{0}\" alt=\"form.png\">";
            bodyBuilder.HtmlBody = string.Format(message, contentId);

            bodyBuilder.LinkedResources.Add(attachment);
            bodyBuilder.LinkedResources[0].ContentId = contentId;

            var multipart = new Multipart("mixed");
            multipart.Add(bodyBuilder.ToMessageBody());
//            multipart.Add(attachment);

            // now set the multipart/mixed as the message body
            emailMessage.Body = multipart;

            await SendEmailAsync(emailMessage);
        }

        public async Task SendEmailAsync(MimeMessage message)
        {
            //Send the message via O365
            using (var client = new MailKit.Net.Smtp.SmtpClient())
            {
                //client.LocalDomain = "smtp.gmail.com"
;
                await client.ConnectAsync(_mailSettings.Server, _mailSettings.Port, false);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                await client.AuthenticateAsync(
                    _mailSettings.UserName, 
                    _mailSettings.Password
                    );
                await client.SendAsync(message);
                await client.DisconnectAsync(true);
            }
        }

        private MimePart ConvertBase64ImageToAttachment(string base64image)
        {

            byte[] imageBytes = Convert.FromBase64String(base64image.Replace("data:image/png;base64,", ""));
            MemoryStream ms = new MemoryStream(imageBytes, 0, imageBytes.Length);


            MimePart Attachment = new MimePart()
            {
                ContentObject = new ContentObject(ms, ContentEncoding.Default),
                ContentDisposition = new MimeKit.ContentDisposition(MimeKit.ContentDisposition.Inline),
                ContentTransferEncoding = ContentEncoding.Base64,
                FileName = "form.png"
            };

            return Attachment;

        }

    }
}
