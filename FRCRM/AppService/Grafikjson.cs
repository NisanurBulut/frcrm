using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Npgsql;
using System.Data;
using System.Configuration;
using System.Web.Script.Serialization;
using System.Text;

namespace FRCRM.AppService
{
    public class Grafikjson
    {

        public string baglantiMetni;
        public DataSet dSet = new DataSet();
        public DataTable dTable = new DataTable();
        public NpgsqlConnection baglanti;

        public string JsonAl(string sql)
        { 
            Frdb frdb = new Frdb();
            baglantiMetni = frdb.Baglantim();
            baglanti = new NpgsqlConnection(baglantiMetni);
            dTable.Clear();
            try {
                NpgsqlDataAdapter dAdapter = new NpgsqlDataAdapter(sql, baglanti);
                baglanti.Open();
                dAdapter.Fill(dSet);
                dTable = dSet.Tables[0];
            } catch { }
            
            
            baglanti.Close();

            /*JsonAl Sonu*/
            //return DataTableToJSONWithJavaScriptSerializer(dTable);
            return DataTableToJsonObj(dTable);
            
        }




        public DataTable JsonDataAl(string sql)
        {
            string json;
            Frdb frdb = new Frdb();
            baglantiMetni = frdb.Baglantim();
            baglanti = new NpgsqlConnection(baglantiMetni);
            dTable.Clear();
            try
            {
                NpgsqlDataAdapter dAdapter = new NpgsqlDataAdapter(sql, baglanti);
                baglanti.Open();
                dAdapter.Fill(dSet);
                dTable = dSet.Tables[0];
            }
            catch { }


            baglanti.Close();

            /*JsonAl Sonu*/
            //return DataTableToJSONWithJavaScriptSerializer(dTable);
            return dTable;

        }
        /*Grafikjson Sonu*/

        public string DataTableToJsonObj(DataTable dt)
        {
            DataSet ds = new DataSet();
            ds.Merge(dt);
            StringBuilder JsonString = new StringBuilder();
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                JsonString.Append("[");
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    JsonString.Append("{");
                    for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                    {
                        if (j < ds.Tables[0].Columns.Count - 1)
                        {
                            JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString() + "\",");
                        }
                        else if (j == ds.Tables[0].Columns.Count - 1)
                        {
                            JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString() + "\"");
                        }
                    }
                    if (i == ds.Tables[0].Rows.Count - 1)
                    {
                        JsonString.Append("}");
                    }
                    else
                    {
                        JsonString.Append("},");
                    }
                }
                JsonString.Append("]");
                return JsonString.ToString();
            }
            else
            {
                return null;
            }
        }

    }
}