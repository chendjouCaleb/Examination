namespace Exam.Services.Emails
{
    public interface IEmailSender
    {
        void SendEmail(EmailMessage message);
    }
}