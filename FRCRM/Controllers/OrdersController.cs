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
    public class OrdersController : ApiController
    {

        [ScriptMethod(UseHttpGet = true)]
        public DataTable Get(string id)
        { 
            
            Grafikjson grafikjson = new Grafikjson();
           
            string OrderStatSsql;
            Grafiksql g = new Grafiksql();
            OrderStatSsql = "SELECT * FROM ads_order_state where account_id = "+id+" and order_state = 0 order by order_date asc";//g.run_group_guery(id);
            DataTable dt = new DataTable();
            dt = grafikjson.JsonDataAl(OrderStatSsql);
            //DataTable[] AllOrders = new DataTable[dt.Rows.Count];
            DataTable AllOrders = new DataTable("Json");
            /*for (int a = 0; a<= dt.Rows.Count-1; a++) {
                string adsno = dt.Rows[a]["adsno"].ToString();
                AllOrders.Columns.Add(a.ToString(),typeof(DataTable));
            }*/
            AllOrders.Columns.Add("order", typeof(DataTable));
            for (int i = 0; i<= dt.Rows.Count -1; i++) {
                Grafikjson grafikcs = new Grafikjson();
                Grafikjson grafikps = new Grafikjson();
                Grafikjson grafikos = new Grafikjson();                
                string adsno = dt.Rows[i]["adsno"].ToString();
                string customer = dt.Rows[i]["customer_id"].ToString();
                string address = dt.Rows[i]["address_id"].ToString();
                string paytype = dt.Rows[i]["pay_type_id"].ToString();
                string total = dt.Rows[i]["total"].ToString();
                string orderdate = dt.Rows[i]["order_date"].ToString();
                string CustomerSql = "select addressid as id, a.name as tanim , a.address as adres , c.name as sehir, d.name as ilce, " +
                    " m.lc_email as mail , a.phone as telefon,m.adi as adi , m.soyadi as soyadi from " +
                    " (select * from addresss ) as a " +
                    " left outer join citys c on (a.city_id = c.cityid) " +
                    " left outer join districts d on(a.district_id = d.districtid) " +
                    " left outer join ads_musteri m on(m.mustid = a.lastuserid) " +
                    " where a.addressid = " + address;
                string PaytypeSql = "select odmno as paytype_id , odmname as paytype_name from ads_odmsekli where odmno = " + paytype;
                string OrdersSql = "select a.*,p.product_name,dm.adi as d_name from " +
                        " (select sirano, pluid, miktar, bfiyat, tutar, d_menu, seviye from ads_acik where account_id = " + id + " and adsno = " + adsno + ") as a " +
                        " left outer join product p on (p.id = a.pluid) " +
                        " left outer join dyna_menu dm on(a.pluid = dm.id and a.d_menu = true) " +
                        " order by sirano";
                DataTable json = new DataTable("Orders");// = grafikjson.JsonDataAl(sql);
                DataTable cs = grafikcs.JsonDataAl(CustomerSql);
                DataTable ps = grafikps.JsonDataAl(PaytypeSql);
                DataTable os = grafikos.JsonDataAl(OrdersSql);
                json.Columns.Add("adsno");
                json.Columns.Add("customer", typeof(DataTable));
                json.Columns.Add("paytype", typeof(DataTable));
                json.Columns.Add("products", typeof(DataTable));
                json.Rows.Add( adsno, cs, ps, os );
                //AllOrders.Columns.Add(adsno, typeof(DataTable));
                AllOrders.Rows.Add(json);
                //AllOrders[i].Rows[i].SetAdded();
            }
            
            return AllOrders;
        }
    }
}
