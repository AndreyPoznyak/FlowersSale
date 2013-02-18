using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web;
using System.Net.Mail;

namespace FlowersSale
{
		[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
		public class OrdersMailService : IOrdersMailService
		{
				public void SendMail()
				{
						string data = HttpContext.Current.Request.Form.ToString();
						string response = "success";
						try
						{
								// Create a new message
								var mail = new MailMessage();

								// Set the to and from addresses.
								// The from address must be your GMail account
								mail.From = new MailAddress("andpoznyak@gmail.com");
								mail.To.Add(new MailAddress("andwer97@mail.ru"));

								// Define the message
								mail.Subject = "flowers testing";
								mail.IsBodyHtml = true;
								mail.Body = data;

								// Create a new Smpt Client using Google's servers
								var mailclient = new SmtpClient();
								mailclient.Host = "smtp.gmail.com";
								mailclient.Port = 587;

								// This is the critical part, you must enable SSL
								mailclient.EnableSsl = true;

								// Specify your authentication details
								mailclient.Credentials = new System.Net.NetworkCredential(
																								 "",
																								 "");
								mailclient.Send(mail);
						}
						catch (Exception ex)
						{
								response = ex.Message;
						}

						HttpContext.Current.Response.ContentType = "application/text";
						HttpContext.Current.Response.Write(response);
				}
		}
}
