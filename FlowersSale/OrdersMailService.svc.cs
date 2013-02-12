using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Activation;
using System.ServiceModel.Web;
using System.Text;
using System.Web;

namespace FlowersSale
{
		[AspNetCompatibilityRequirements(RequirementsMode = AspNetCompatibilityRequirementsMode.Allowed)]
		public class OrdersMailService : IOrdersMailService
		{
				public void SendMail()
				{
						string data = HttpContext.Current.Request.Form["data"];

						HttpContext.Current.Response.ContentType = "application/text";
						HttpContext.Current.Response.Write("success");
				}
		}
}
