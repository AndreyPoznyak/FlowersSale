﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Web;
using System.IO;

namespace FlowersSale
{
		[ServiceContract]
		public interface IOrdersMailService
		{
				[OperationContract]
				[WebInvoke(Method = "POST")]
				void SendMail(Stream data);
		}
}