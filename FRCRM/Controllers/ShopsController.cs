using FRCRM.AppService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data;

namespace FRCRM.Controllers
{
    public class ShopsController : ApiController
    {
        public DataTable Get(string city_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_account_query(city_id);
            DataTable json = grafikjson.JsonDataAl(sql);
            return json;
        }
    }
}
