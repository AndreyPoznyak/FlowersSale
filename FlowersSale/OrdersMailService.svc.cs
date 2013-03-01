using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web;
using System.Net;
using System.Net.Mail;

namespace FlowersSale
{
		[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
		public class OrdersMailService : IOrdersMailService
		{
				public void SendMail()
				{
						string data = HttpContext.Current.Request.Form.ToString();//HttpUtility.UrlDecode(HttpContext.Current.Request.Form.ToString());
						string response = "success";
						try
						{
								var client = new SmtpClient("smtp.gmail.com", 587)
								{
										Credentials = new NetworkCredential("leonid.druyan@gmail.com", "AWARD_SW"),
										EnableSsl = true
								};
								client.Send("leonid.druyan@gmail.com", "leonid.druyan@gmail.com", "LEPESTKI.BY: New order", data);
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
