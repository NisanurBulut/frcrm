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
    public class UpdateTransaction
    {

        string islem;
        public string RunNpgsqlTransaction(string sql)
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


                    pgCommand.CommandText = sql;
                    pgCommand.ExecuteNonQuery();
                    myTrans.Commit();
                    islem = "0";
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
}