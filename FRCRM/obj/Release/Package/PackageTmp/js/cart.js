app.controller('cartCtrl', function ($scope, $http, localStorageService, $location, $rootScope, ngDialog, $timeout) {
    var mustid = localStorageService.get('mustid');
    var ac_id = localStorageService.get('accountid');
    var chsad = localStorageService.get('chosedadid');
    var adres_id = 0;
    var odeme_id = 0;
    if (cart.length < 1) { $location.path('/home-liste'); }


    $scope.sonok = function () {
        var odemeid = $scope.odemeradio.id;
        odeme_id = odemeid;
        var cmplt = { adres: [], cart: [] };
        var adrjson = {};
        var adresid = $scope.adresradio.id;
        adres_id = adresid;
        for (var i = 0; i <= $scope.adresler.length - 1; i++) {
            if ($scope.adresler[i].id == adresid) { adrjson = $scope.adresler[i]; }
        }
        for (var o = 0; o <= $scope.odemetipleri.length - 1; o++) {
            if ($scope.odemetipleri[o].id == odemeid) { $scope.odemetipismi = $scope.odemetipleri[o].odmname; }
        }
        cmplt.adres.push(adrjson);
        $scope.teslimatadres = cmplt.adres;
        var d = new Date();
        var n = d.toLocaleDateString();
        $scope.simdi = n;
        //$scope.completecard

    }

    $scope.onayla = function () {
        var jcart = {};
        jcart.cart = cart;
        //alert(JSON.stringify(jcart));
        var adsnot = $scope.adsnot;
        $http.post('Default.aspx/AdsAcik', "{'json':'" + JSON.stringify(jcart) + "','k_id':'" + mustid + "','adres_id':'" + adres_id + "','odeme_id':'" + odeme_id + "','account_id':'" + ac_id + "','adsnot':'"+adsnot+"'}")
            .success(function (data) {
                var g = data.d;
                //g = JSON.parse(g);
                //alert(JSON.stringify(g))
                if (g == 0) {
                    cart = [];
                    localStorageService.set('restaurant-cart', cart);
                    $location.path('/home-liste');
                } else {
                    //alert(JSON.stringify(g))
                    alert('Birşeyler yanlış gitti tekrar deneyin');
                }
            }).error();
    }
    $scope.adres_ekle = function () {
        var adres_adi = $scope.adres_adi;
        var adres_detay = $scope.adres_detay;
        var adres_sehir = $scope.adres_sehir.cityid;
        var adres_ilce = $scope.adres_ilce.districtid;
        var adres_telefon = $scope.adres_telefon;

        var hatamsg = '';

        var json = '{"name":"' + adres_adi + '","city_id":"' + adres_sehir + '","district_id":"' + adres_ilce + '","address":"' + adres_detay + '","lastuserid":"' + mustid + '","phone":"' + adres_telefon + '"}';
        if (adres_adi == null || adres_detay == null || adres_sehir == null || adres_ilce == null || adres_telefon == null) {
            alert('EKSİK ALANLARI DOLDURUNUZ ');
        } else {
            $http.post('Default.aspx/Add_Address', json).success(function (data) {

                var durum = data.d;
                if (durum == 0) {
                    $scope.add_address_scope = false;
                    $scope.adres_adi = null;
                    $scope.adres_detay = null;
                    $scope.adres_sehir = null;
                    $scope.adres_ilce = null;
                    $scope.adres_telefon = null;
                    GetAddress();
                } else { alert('Bir sorun oluştu'); }
            }).error();
        }
    }
    var adid = 0;
    $scope.addressupdate = function (index) {
        $scope.add_address_scope = true;
        $scope.adekbut = false;
        $scope.adgunbut = true;
        adid = $scope.adresler[index].id;
        $scope.adres_adi = $scope.adresler[index].tanim;
        $scope.adres_detay = $scope.adresler[index].adres;
        $scope.adres_sehir = $scope.adresler[index].sehir;
        $scope.adres_ilce = $scope.adresler[index].ilce;
        $scope.adres_telefon = $scope.adresler[index].telefon;
    }
    $scope.adres_guncelle = function () {
        var adres_adi = $scope.adres_adi;
        var adres_detay = $scope.adres_detay;
        var adres_sehir = $scope.adres_sehir.cityid;
        var adres_ilce = $scope.adres_ilce.districtid;
        var adres_telefon = $scope.adres_telefon;

        var hatamsg = '';

        var json = '{"id":"' + adid + '","name":"' + adres_adi + '","city_id":"' + adres_sehir + '","district_id":"' + adres_ilce + '","address":"' + adres_detay + '","phone":"' + adres_telefon + '"}';
        if (adres_adi == null || adres_detay == null || adres_sehir == null || adres_ilce == null || adres_telefon == null) {
            alert('EKSİK ALANLARI DOLDURUNUZ ');
        } else {
            $http.post('Default.aspx/Update_Address', json).success(function (data) {

                var durum = data.d;
                if (durum == 0) {
                    $scope.add_address_scope = false;
                    $scope.adres_adi = null;
                    $scope.adres_detay = null;
                    $scope.adres_sehir = null;
                    $scope.adres_ilce = null;
                    $scope.adres_telefon = null;
                    GetAddress();
                } else { alert('Bir sorun oluştu'); }
            }).error();
        }
    }
    GetAddress();
    function GetAddress() {
        var jsn = '{"id":"' + mustid + '","account_id":"'+ac_id+'"}';
        $http.post('Default.aspx/GetAddress', jsn).success(function (data) {
            var adr = data.d;
            adr = JSON.parse(adr);
            $scope.adresler = adr;
            $scope.adresradio = { id: chsad };

        }).error();
    }
    $http.post('Default.aspx/GetCitys', '{"account_id":"' + ac_id + '"}').success(function (data) {
        var jsn = data.d;
        jsn = JSON.parse(jsn);
        $scope.sehirlerjson = jsn;

    }).error();

    $scope.adres_deg = function (id) {
        $http.post('Default.aspx/GetDistricts', '{"id":"' + id + '","account_id":"' + ac_id + '"}').success(function (data) {
            var jsn = data.d;
            jsn = JSON.parse(jsn);
            $scope.ilcelerjson = jsn;

        }).error();
    }

    $http.post('Default.aspx/Get_Paytype', '{"id":"' + ac_id + '"}').success(function (data) {
        var jsn = data.d;
        jsn = JSON.parse(jsn);

        $scope.odemetipleri = jsn;
        $scope.odemeradio = { id: $scope.odemetipleri[0].id };
    }).error();

    var giris = localStorageService.get('giris') || 0;
    var giris_zamani = localStorageService.get('giris_zamani') || 0;
    if (giris != 0) { } else { $location.path('/login'); }//Burada şuanda Giriş zamanı 1 saatten fazla ise sepeti siliyor bunu giriş yapan kullanıcının sepetini silmek için ayarla yoksa yeni oluşturulan sepettde silinir
    //if (giris_zamani < zaman - saatx ) { /*$location.path('/login');*/ localStorageService.set('restaurant-cart', []); }
    cart = localStorageService.get('restaurant-cart') || [];
    $scope.sepetim = cart;
    tt();


    function tt() {
        var ttr = 0.00;
        var adet = 0;
        cart = localStorageService.get('restaurant-cart');
        for (var i = cart.length - 1; i >= 0; i--) {
            if (parseFloat(cart[i].fiyat) > 0) {
                var sep = parseLocalNum(cart[i].fiyat);
                var adt = cart[i].adet;
                ttr += parseFloat(sep * adt);
                //alert(cart[i]);
                $scope.$apply();
                if (cart[i].seviye == 0) { adet++ }
            }
        }

        $scope.toplamttr = parseFloat(ttr).toFixed(2);
        $scope.$emit('cartCount', adet, parseFloat(ttr).toFixed(2));
    }

    $rootScope.$on('cartGncl', function (event) {
        cart = localStorageService.get('restaurant-cart');
        //alert(JSON.stringify(cart))
        $scope.sepetim = localStorageService.get('restaurant-cart');
        tt();
    });

});