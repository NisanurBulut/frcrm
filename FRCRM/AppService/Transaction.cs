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
using System.Globalization;
using System.Data;

namespace FRCRM.AppService
{
    public class Transaction
    {

        string islem;
        public string RunNpgsqlTransaction(string json, string k_id, string adres_id, string odeme_id, string account_id ,string adsnot)
        {
            string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
            using (NpgsqlConnection pgConnection = new NpgsqlConnection(constr))
            {
                pgConnection.Open();
                // Start a local transaction
                NpgsqlTransaction myTrans = pgConnection.BeginTransaction(System.Data.IsolationLevel.ReadCommitted);
                NpgsqlCommand pgCommand = pgConnection.CreateCommand();
                try
                { 

                    JavaScriptSerializer ser = new JavaScriptSerializer();
                    cartList cart = ser.Deserialize<cartList>(json);
                    Grafikjson gj = new Grafikjson();
                    DataTable dt = new DataTable();
                    dt = gj.JsonDataAl("SELECT adsnoartir(1,1)");
                    string adsno = dt.Rows[0]["adsnoartir"].ToString();


                    for (int i = 0; i <= cart.cart.Count-1; i++) {
                        string id = cart.cart[i].id;
                        string adi = cart.cart[i].adi;
                        string adet = cart.cart[i].adet;
                        string fiyat = cart.cart[i].fiyat;
                        float tutarx = Convert.ToSingle(adet, CultureInfo.InvariantCulture) * Convert.ToSingle(fiyat, CultureInfo.InvariantCulture);
                        string tutar = tutarx.ToString().Replace(",",".");
                        string dmenu = cart.cart[i].dynamic;
                        string seviye = cart.cart[i].seviye;
                        string sqlx = "insert into ads_acik(masano,pluid,miktar,bfiyat,tutar,sipno,garsonno,vergi,hbasildi, " +
                                 " sip_ekleyen,ack1,ack2,ack3,ack4,adsno,actar,acsaat, " +
                                 " adtur,orgno,sturu,mustid,hsahid,country,dontar,donsaat, " +
                                 " adsfisno,daily_number,fiyatno,sip_tutar,voran,mustcnt,myazici,mars_var,d_menu,seviye,k_id,adres_id,odeme_id,account_id)values (" +
                                 " 9999,"+id+", " +
                                 " "+adet+","+fiyat+","+tutar+", '1',1,1,false," +
                                 " 1, 'ack1', 'ack2', " +
                                 " 'ack3', '4',"+adsno+", NOW(), NOW(), '1', '-1', '0', '0', '-1'," +
                                 " 1, NOW(),NOW(), '0', '0', '0', '0',8,1,-1,0,"+dmenu+","+seviye+ "," + k_id + "," + adres_id + "," + odeme_id + "," + account_id + ")";
                        pgCommand.CommandText = sqlx;
                        pgCommand.ExecuteNonQuery();

                    }
                    myTrans.Commit();
                    islem = "0";
                    dt = gj.JsonDataAl("insert into ads_notlar (adsno,adsnot) values ("+adsno+",'"+adsnot+"')");
                    Console.WriteLine("işlem tamam");
                    

                    
                }
                catch (Exception e)
                {
                    myTrans.Rollback();
                    Console.WriteLine(e.ToString());
                    Console.WriteLine("Hata oluştu işlem geri alındı");
                    islem = e.ToString();
                }
                finally
                {
                    pgCommand.Dispose();
                    myTrans.Dispose();
                }
            }
            return islem;
        }

        
    }

    public class cart
    {
        public string id { get; set; }
        public string adi { get; set; }
        public string fiyat { get; set; }
        public string adet { get; set; }
        public string dynamic { get; set; }
        public string seviye { get; set; }
    }

    public class cartList
    {
        public List<cart> cart { get; set; }
    }

}