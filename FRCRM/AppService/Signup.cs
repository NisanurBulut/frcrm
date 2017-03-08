using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace FRCRM.AppService
{
    public class Signup
    {
        public  string SignUpx(string sifre, string mail, string adi, string soyadi)
        {

            string hatamesaji = "";
            int userId = 0;
            string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
            using (NpgsqlConnection con = new NpgsqlConnection(constr))
            {
                using (NpgsqlCommand cmd = new NpgsqlCommand("ads_musteri"))
                {
                    DataSet dSet = new DataSet();
                    DataTable dTable = new DataTable();
                    string sql = "select * from ads_musteri where lc_email ='" + mail + "'";
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
                        hatamesaji = "1";
                        break;
                    case 0:
                        DataSet dSet = new DataSet();
                        DataTable dTable = new DataTable();
                        string sqlsorgu = "insert into ads_musteri (adi,soyadi,lc_email,lc_password) values ('" + adi + "','" + soyadi + "','" + mail + "','" + sifre + "')";
                        NpgsqlDataAdapter dAdapter = new NpgsqlDataAdapter(sqlsorgu, con);
                        hatamesaji = "0";
                        dAdapter.Fill(dSet);
                        con.Open();
                        con.Close();
                        break;
                    default:

                        hatamesaji = "2";
                        break;
                }
            }
            return hatamesaji;
        }


    }
}