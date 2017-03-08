using FRCRM.AppService;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FRCRM.Controllers
{
    public class GroupController : ApiController
    {
        [HttpPost]
        public DataTable Post(string id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_group_guery(id);
            DataTable json = grafikjson.JsonDataAl(sql);
            return json;
        }
    }
}
