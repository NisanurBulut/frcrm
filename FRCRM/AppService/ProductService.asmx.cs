using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using FRCRM.AppService;
using System.Web.Script.Services;

namespace FRCRM.AppService
{
    /// <summary>
    /// Summary description for WebService1
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    // [System.Web.Script.Services.ScriptService]
    public class WebService1 : System.Web.Services.WebService
    {

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public string HelloWorld()
        {
            return "Hello World";
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static string GetGroupJson()
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_group_guery("15");
            string json = grafikjson.JsonAl(sql);
            return json;
            /*GetBarchartData Sonu*/

        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true)]
        public static string GetProductJson()
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_product_query("15","2");
            string json = grafikjson.JsonAl(sql);
            return json;
            /*GetBarchartData Sonu*/

        }
    }
}
