using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FRCRM.AppService
{

    public class Grafiksql
    {
        HttpContext context = HttpContext.Current;/*Session için*/
        public string group_query,dynamic_menu_query, product_query,product_list_query,dyna_query, account_query,citys_query,districts_query,address_query,paytype_query;

        public string run_group_guery(string account_id)
        {
            group_query = "SELECT * FROM product_group where account_id = " + account_id + " ORDER BY grpsira";


            return group_query;
        }
        

        public string run_dynamic_menu_query(string menu_id, string account_id)
        {
            dynamic_menu_query = "select g.id as g_id ,g.adi as g_adi , extra , sp_id ,i.adi as adi , miktar , arttirim from "+
                        " (select * from dyna_grup where menu_id = " + menu_id + " and account_id = " + account_id +") as g " +
                        " left outer join dyna_icerik i on (g.menu_id = i.menu_id and i.grup_id = g.id and i.account_id = " + account_id +") "+
                        " order by dmgsira , g.adi";
            return dynamic_menu_query;
        }


        public string run_product_query(string account_id,string group_id)
        {

            product_query = "SELECT pg.adi as g_adi, pg.id as g_id,p.product_name as pname , f.fiyat as pfiyat , o.resim as resim , p.id as id , " +
                " dm.id as dmid , dm.adi as dmadi , dm.fiyat as dmfiyat "+
                " FROM product p "+
                " LEFT OUTER JOIN dyna_menu dm on(p.id = dm.dmproductid) "+
                " LEFT outer JOIN product_fiyat f ON p.id = f.p_id and(bastar <= current_date) and((bittar is null) or bittar >= current_date) "+
                " LEFT outer JOIN pr_ozellik o ON p.id = o.urun_id "+
                " left outer join product_group pg on (pg.id = p.tip or pg.id = dm.grup1) " +
                " where tip = " + group_id + " or grup1 = " + group_id + " and p.account_id = " + account_id +
                " and p.paket = true and(p.silindi <> true) " +
                " and p.isrecete = false and dm.silindi <> true "+
                " ORDER BY p.sirano,p.product_name";

            return product_query;
        }

        public string run_product_list_query(string account_id)
        {

            product_list_query = "SELECT pg.adi as g_adi, pg.id as g_id,p.product_name as pname , f.fiyat as pfiyat , o.resim as resim , p.id as id , " +
                " dm.id as dmid , dm.adi as dmadi , dm.fiyat as dmfiyat " +
                " FROM product p " +
                " LEFT OUTER JOIN dyna_menu dm on(p.id = dm.dmproductid) " +
                " LEFT outer JOIN product_fiyat f ON p.id = f.p_id and(bastar <= current_date) and((bittar is null) or bittar >= current_date) " +
                " LEFT outer JOIN pr_ozellik o ON p.id = o.urun_id " +
                " left outer join product_group pg on (pg.id = p.tip or pg.id = dm.grup1) " +
                " where tip > 0 or grup1 >0 and p.account_id = " + account_id +
                " and p.paket = true and(p.silindi <> true) " +
                " and p.isrecete = false and dm.silindi <> true " +
                " ORDER BY pg.grpsira,pg.adi,p.sirano,p.product_name";

            return product_list_query;
        }


        public string run_dyna_query(string account_id, string group_id)
        {
            dyna_query = "select * from dyna_menu as a  left outer join pr_ozellik "+
                "as p on a.dmproductid=p.urun_id  where grup1 = "+group_id+" and account_id = "+account_id+" and silindi = false";

            return dyna_query;
        }
        
        public string run_account_query()
        {
             account_query = "select  * from accounts";
            return account_query;
        }

        public string run_citys_query()
        {
            citys_query = "select distinct(c.cityid) as cityid , c.plate as plate , "+
                        " (select count(*) from accounts where city_id = a.city_id and city_id > 0 and active = true) "+
                        " as account_count , c.name as name "+
                        " from(select * from accounts ) as a "+
                        " left outer join citys c on (a.city_id = c.cityid) "+
                        " where a.city_id > 0 and a.active = true ";
            return citys_query;
        }

        public string run_districts_query(string city_id)
        {
            districts_query = "select * from districts where active = true and city_id = "+city_id;
            return districts_query;
        }

        public string run_address_query(string id)
        {
            address_query = "select addressid as id, a.name as tanim , a.address as adres , c.name as sehir, d.name as ilce, "+
            " m.lc_email as mail , a.phone as telefon,m.adi as adi , m.soyadi as soyadi  from " +
            " (select * from addresss where lastuserid = "+id+") as a "+
            " left outer join citys c on (a.city_id = c.cityid) "+
            " left outer join districts d on(a.district_id = d.districtid) "+
            " left outer join ads_musteri m on(m.mustid = "+id+")";
            return address_query;
        }

        public string run_paytype_query(string id)
        {
            paytype_query = "select *from (select * from ads_odmsekli_account where active = true and account_id = "+id+") as a "+
            " left outer join ads_odmsekli o on (o.odmno = a.odmno_id)";
            return paytype_query;
        }

        /*Grafiksql Sonu*/
    }

/*Namespace Sonu*/}