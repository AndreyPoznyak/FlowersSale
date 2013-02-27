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
						string data = HttpUtility.UrlDecode(HttpContext.Current.Request.Form.ToString());
						string response = "success";
						try
						{
								// Create a new message
								var mail = new MailMessage();

								// Set the to and from addresses.
								// The from address must be your GMail account
								mail.From = new MailAddress("leonid.druyan@gmail.com");
								mail.To.Add(new MailAddress("leonid.druyan@gmail.com"));

								// Define the message
								mail.Subject = "LEPESTKI.BY: New order";
								mail.IsBodyHtml = true;
								mail.Body = data.Replace("|", "<br />");

								// Create a new Smpt Client using Google's servers
								var mailclient = new SmtpClient();
								mailclient.Host = "smtp.gmail.com";
								mailclient.Port = 587;

								// This is the critical part, you must enable SSL
								mailclient.EnableSsl = true;

								// Specify your authentication details
								mailclient.Credentials = new System.Net.NetworkCredential(
																								 "leonid.druyan@gmail.com",
																								 "AWARD_SW");
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
