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
using System.Diagnostics;

namespace FRCRM.AppService
{
    public class Transaction
    {

        string islem;
        public ArrayList cartAL = new ArrayList();
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
                    cartList cart = ser.Deserialize<cartList>(json); //attributeleri dolduracagımız liste tanımını yaparız
                    Grafikjson gj = new Grafikjson();
                    DataTable dt = new DataTable();
                    dt = gj.JsonDataAl("SELECT adsnoartir(1,1)");
                    string adsno = dt.Rows[0]["adsnoartir"].ToString();
                    float ttoplam = 0;
                    
                    for (int i = 0; i <= cart.cart.Count-1; i++) { //veri doldurması yapılılır
                        string id = cart.cart[i].id;
                        string adi = cart.cart[i].adi;
                        string adet = cart.cart[i].adet;
                        string fiyat = cart.cart[i].fiyat;
                        
                       
                        float tutarx = Convert.ToSingle(adet, CultureInfo.InvariantCulture) * Convert.ToSingle(fiyat, CultureInfo.InvariantCulture);
                        ttoplam += tutarx;
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

                        cartAL.Add(cart.cart[i]);

                    }
                   if (ControlCartTrans(cart, account_id))
                    {
                    myTrans.Commit(); //burada veri tabanına yazılır //burada fonksıyon cagırmalı if lemeli
                    string ttoplamx = ttoplam.ToString().Replace(",", ".");
                    islem = "0";
                    dt = gj.JsonDataAl("insert into ads_notlar (adsno,adsnot) values ("+adsno+",'"+adsnot+"')");
                    pgCommand.CommandText = "insert into ads_order_state (adsno,customer_id,account_id,order_state,address_id,pay_type_id,total) values (" +
                        " "+adsno+" , "+k_id+","+account_id+",0,"+adres_id+","+odeme_id+","+ttoplamx+") ";
                    pgCommand.ExecuteNonQuery();
                    Console.WriteLine("işlem tamam");
                    }
                   else
                    {
                        islem = "1";
                        Debug.WriteLine("HATA VAR");
                        return islem;
                    }


                }
                catch (Exception e)
                {
                    myTrans.Rollback();
                    Console.WriteLine(e.ToString());
                    Console.WriteLine("Hata oluştu işlem geri alındı");
                    islem =e.ToString();
                }
                finally
                {
                    pgCommand.Dispose();
                    myTrans.Dispose();
                }
            }
            return islem;
        }

        public Boolean ControlCartTrans(cartList _cartList, string account_id)
        {
           
            Boolean flagControl= false;
            string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
            using (NpgsqlConnection pgConnection = new NpgsqlConnection(constr))
            {
                pgConnection.Open();
             
                // Start a local transaction
               
                NpgsqlCommand pgCommand = pgConnection.CreateCommand();
   
                try
                {
                    pgCommand.Connection = pgConnection;
                 
                    pgCommand.CommandType = CommandType.Text;
                    foreach (cart eleman in cartAL)
                    {
                    
                        pgCommand.CommandText = "Select p_id , fiyat from product_fiyat where p_id=" + eleman.id + " and account_id=" + account_id+"and(bastar <= current_date) and((bittar is null) or bittar >= current_date)";
                        pgCommand.ExecuteNonQuery();
                    }

                    // Execute the query and obtain a result set
                    NpgsqlDataReader dr = pgCommand.ExecuteReader();
                    // Output rows
                 
                  
                      while (dr.Read())  {      
                        foreach (cart eleman in cartAL)
                        {
                           

                               string tutar = eleman.fiyat.ToString().Replace(".", ",");

                            if (float.Parse(dr[1].ToString()) ==float.Parse(tutar))
                            {
                                Debug.WriteLine("fiyatlar aynı " + dr[1].ToString() + " -> " + tutar);
                                flagControl = true;
                            }
                                
                            else
                            {
                                Debug.WriteLine("fiyatlar farklı " + dr[1].ToString() + " -> " + tutar);
                                flagControl = false;
                                return false; //bir kez false olması yeterli olmalı listede uc tane sıparıs olsun brıının dahı fıyatı degısse false olmaalı
                            }
                                
                            
                        }

                    }


                    Debug.WriteLine("işlem tamam");
                    pgCommand.Dispose();
                    pgConnection.Close();
                    dr.Close();

                }
                catch (Exception e)
                {
                    Console.Write(e.Data.ToString());
                }
                finally
                {
                    
                }
            }

            return flagControl;
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
        public string sirano { get; set; }
     
    }

    public class cartList
    {
        public List<cart> cart { get; set; }
    }

}