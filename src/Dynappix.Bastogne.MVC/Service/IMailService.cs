namespace Dynappix.Bastogne.Service
{
    public interface IMailService
    {
        void SendMail(string to, string from, string subject, string body);
    }
}
