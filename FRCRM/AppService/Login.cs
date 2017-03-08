using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace FRCRM.AppService
{
    public class Login
    {
        public string Loginx(string mail, string sifre)
        {

            string hatamesaji = "";
            int userId = 0;
            //string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
            string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
            using (NpgsqlConnection con = new NpgsqlConnection(constr))
            {
                string id = "";
                string adi = "";
                DataSet dSet = new DataSet();
                DataTable dTable = new DataTable();
                using (NpgsqlCommand cmd = new NpgsqlCommand("ads_musteri"))
                {
                    
                    string sql = "select * from ads_musteri where lc_email ='" + mail + "' and lc_password ='" + sifre + "'";
                    
                    NpgsqlDataAdapter dAdapter = new NpgsqlDataAdapter(sql, con);
                    dAdapter.Fill(dSet);
                    dTable = dSet.Tables[0];
                    con.Open();
                    userId = dTable.Rows.Count;
                    con.Close();
                }
                switch (userId)
                {
                    case 1:
                        id = dTable.Rows[0]["mustid"].ToString();
                        adi = dTable.Rows[0]["adi"].ToString();
                        hatamesaji ="{\"hata\":\"0\",\"id\":\"" + id+ "\",\"adi\":\""+adi+"\"}";
                        break;
                    case 0:
                        hatamesaji =  "{\"hata\":\"1\",\"id\":\"" + id + "\",\"adi\":\"" + adi + "\"}";
                        break;
                    default:

                        hatamesaji =  "{\"hata\":\"2\",\"id\":\"" + id + "\",\"adi\":\"" + adi + "\"}";
                        break;
                }
            }
            return hatamesaji;
        }
    }
}