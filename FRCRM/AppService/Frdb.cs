
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Web.Security;
using System.Configuration;
using Npgsql;

namespace FRCRM.AppService
{
    public class Frdb
    {
        string sunucu, port, kullaniciAdi, sifre, veritabani;
        public string baglantiMetni;
        public DataSet dSet = new DataSet();
        public DataTable dTable = new DataTable();
        public NpgsqlConnection baglanti;
        public string Baglantim()
        {
            string a;
            //sunucu = "88.250.177.86";/*happy*/
            //sunucu = "85.104.100.162";/*break*/   
            HttpContext context = HttpContext.Current;
            //sunucu = (string)(context.Session["ip"]);
            sunucu = "46.235.9.215";
            port = "5432";
            kullaniciAdi = "begum";
            sifre = "KORDO";
            veritabani = "markalarsepeti";
            baglantiMetni = string.Format("Server={0};Port={1};User Id={2};Password={3};Database={4};",
                        sunucu, port, kullaniciAdi, sifre, veritabani);
            a = baglantiMetni;
            return a;
        }
        public void Baglan(string bglntmtn)
        {
            try
            {
                //sunucu = "85.104.100.162";/*bereak*/
                //sunucu = "88.250.177.86";/*happymons*/
                HttpContext context = HttpContext.Current;
                //sunucu = (string)(context.Session["ip"]);
                sunucu = "46.235.9.215";
                port = "5432";
                kullaniciAdi = "begum";
                sifre = "KORDO";
                veritabani = "markalarsepeti";
                baglantiMetni = string.Format("Server={0};Port={1};User Id={2};Password={3};Database={4};",
                            sunucu, port, kullaniciAdi, sifre, veritabani);
                baglanti = new NpgsqlConnection(baglantiMetni);
                baglanti.Open();
                NpgsqlDataAdapter dAdapter = new NpgsqlDataAdapter(bglntmtn, baglanti);
                //dAdapter.Fill(null);
                dAdapter.Fill(dSet);
                dTable = dSet.Tables[0];
                baglanti.Close();
                /*try Sonu*/
            }
            catch
            {

                /*Catch Sonu*/
            }

            /*Baglan Sonu*/
        }


        /*Frdb Sonu*/
    }
    /*namespace Sonu*/
}