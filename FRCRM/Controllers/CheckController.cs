using FRCRM.AppService;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Services;

namespace FRCRM.Controllers
{
    public class CheckController : ApiController
    {
        public DataTable Get(string account_id,string adsno,string state)
        {
            DataTable response = new DataTable("response");
            UpdateTransaction updt = new UpdateTransaction();
            string trans = updt.RunNpgsqlTransaction("update ads_order_state set order_state = "+state+" where adsno = "+adsno+" and account_id ="+account_id);
            response.Columns.Add("response");
            response.Rows.Add(trans);
            return response;
        }
    }
}
