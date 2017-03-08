using Npgsql;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;

namespace FRCRM.AppService
{
    public class AddAddress
    {
        public string AddAddressx(string name, string city_id, string district_id, string address , string lastuserid ,string phone)
        {

            string hatamesaji = "";
            string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
            using (NpgsqlConnection con = new NpgsqlConnection(constr))
            {
                DataSet dSet = new DataSet();
                DataTable dTable = new DataTable();
                string sqlsorgu = "insert into addresss (name,active,city_id,district_id,address,lastuserid,kind,kindid,phone) "+
                    " values ('" + name + "',true," + city_id + "," + district_id + ",'" + address + "'," + lastuserid + ",1,1,'"+phone+"')";
                NpgsqlDataAdapter dAdapter = new NpgsqlDataAdapter(sqlsorgu, con);
                dAdapter.Fill(dSet);
                hatamesaji = "0";
                con.Open();
                con.Close();
            }
            return hatamesaji;
        }

        public string UpdateAddressx(string id ,string name, string city_id, string district_id, string address, string phone)
        {

            string hatamesaji = "";
            string constr = ConfigurationManager.ConnectionStrings["constr"].ConnectionString;
            using (NpgsqlConnection con = new NpgsqlConnection(constr))
            {
                DataSet dSet = new DataSet();
                DataTable dTable = new DataTable();
                string sqlupdate = "update addresss set name = '"+name+"' ,  city_id = "+city_id+ " ,district_id = "+district_id+",phone = '"+phone+ "' where addressid = " + id+"    ";
                NpgsqlDataAdapter dAdapter = new NpgsqlDataAdapter(sqlupdate, con);
                dAdapter.Fill(dSet);
                hatamesaji = "0";
                con.Open();
                con.Close();
            }
            return hatamesaji;
        }


    }
}