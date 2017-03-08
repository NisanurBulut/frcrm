using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Npgsql;
using System.Configuration;
using System.Web.Script.Serialization;
using System.Text;
using System.Collections;
using System.Collections.ObjectModel;
using System.Dynamic;
using System.Web.Services;
using System.Web.Script.Services;
using Newtonsoft.Json.Linq;

namespace FRCRM.AppService
{
    public class JsonConverter
    {

        public String getjson(string json)
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            cartList cart = ser.Deserialize<cartList>(json);



            return ser.Serialize(cart.cart[0].adi);
        }

    }

    public class cartx
    {
        public string id { get; set; }
        public string adi { get; set; }
        public string fiyat { get; set; }
        public string adet { get; set; }
    }

    public class cartListx
    {
        public List<cartx> cart { get; set; }
    }
}