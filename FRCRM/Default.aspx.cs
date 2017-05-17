using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services.Protocols;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using FRCRM.AppService;
using System.Text;
using System.Web.Security;
using System.Configuration;
using Npgsql;
using System.Web.Services;
using System.Web.Script.Services;
using Newtonsoft.Json.Linq;

namespace FRCRM
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            
        }


        [System.Web.Services.WebMethod]
        public static string GetAccountJson(string city_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_account_query(city_id);
            string json = grafikjson.JsonAl(sql);
            return json;
            /*GetBarchartData Sonu*/

        }

        [System.Web.Services.WebMethod]
        public static string GetGroupJson(string id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_group_guery(id);
            string json = grafikjson.JsonAl(sql);
            return json;
            /*GetBarchartData Sonu*/
            
        }

        [System.Web.Services.WebMethod]
        public static string GetDynamicGroup(string id, string account_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_dynamic_menu_query(id,account_id);
            string json = grafikjson.JsonAl(sql);
            return json;
            /*GetBarchartData Sonu*/

        }


        [System.Web.Services.WebMethod]
        public static string GetProductJson(string id,string account_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_product_query(account_id,id);
            string json = grafikjson.JsonAl(sql);
            return json;
            /*GetBarchartData Sonu*/

        }

        [System.Web.Services.WebMethod]
        public static string GetProductJsonList(string account_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_product_list_query(account_id);
            string json = grafikjson.JsonAl(sql);
            return json;
            /*GetBarchartData Sonu*/

        }

        [System.Web.Services.WebMethod]
        public static string GetCitys(string account_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_citys_query(account_id);
            string json = grafikjson.JsonAl(sql);
            return json;
            /*GetBarchartData Sonu*/

        }

        [System.Web.Services.WebMethod]
        public static string GetCitysx()
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_citys_queryx();
            string json = grafikjson.JsonAl(sql);
            return json;
            /*GetBarchartData Sonu*/

        }

        [System.Web.Services.WebMethod]
        public static string GetAddress(string id , string account_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_address_query(id,account_id);
            string json = grafikjson.JsonAl(sql);
            return json;
        }

        [System.Web.Services.WebMethod]
        public static string GetAccountInfo(string account_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_accountInfo_query(account_id);
            string json = grafikjson.JsonAl(sql);
            return json;
        }

        [System.Web.Services.WebMethod]
        public static string GetDistricts(string id , string account_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_districts_query(id,account_id);
            string json = grafikjson.JsonAl(sql);
            return json;
            /*GetBarchartData Sonu*/

        }
        [System.Web.Services.WebMethod]
        public static string Get_Paytype(string id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_paytype_query(id);
            string json = grafikjson.JsonAl(sql);
            return json;
        }

        [System.Web.Services.WebMethod]
        public static string Add_Address(string name , string city_id ,string district_id, string address,string lastuserid ,string phone){
            AddAddress adr = new AddAddress();
            string sonuc = adr.AddAddressx(name, city_id,district_id, address, lastuserid ,phone);
            return sonuc;
        }

        [System.Web.Services.WebMethod]
        public static string Update_Address(string id ,string name, string city_id, string district_id, string address, string phone)
        {
            AddAddress adr = new AddAddress();
            string sonuc = adr.UpdateAddressx(id ,name, city_id, district_id, address, phone);
            return sonuc;
        }

        [System.Web.Services.WebMethod]
        public static string SignUp( string adi , string soyadi ,string mail , string sifre)
        {
            Signup sgn = new Signup();
            string sonuc = sgn.SignUpx(sifre, mail, adi, soyadi);
            return sonuc;
        }



        [System.Web.Services.WebMethod]
        public static string Logins(string mail, string sifre)
        {
            AppService.Login lgn = new AppService.Login();
            string sonuc = lgn.Loginx(mail, sifre);
            return sonuc;
        }

        [WebMethod]
        public static string AdsAcik(string json , string k_id , string adres_id , string odeme_id,string account_id,string adsnot)
        {
            Transaction trans = new Transaction();
            string gjsn = trans.RunNpgsqlTransaction(json,k_id,adres_id,odeme_id,account_id,adsnot);
           

            return gjsn;
        }

        [WebMethod]
        public static string OldOrders(string id,string account_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql;
            Grafiksql g = new Grafiksql();
            sql = g.run_oldsip_query(id,account_id);
            string json = grafikjson.JsonAl(sql);
            return json;
        }

        [WebMethod]
        public static string getSlider(string account_id)
        {
            Grafikjson grafikjson = new Grafikjson();
            string sql="";
            Grafiksql g = new Grafiksql();
            sql = g.run_slider_query(account_id);
            string json = grafikjson.JsonAl(sql);
            return json;
        }



    }
}