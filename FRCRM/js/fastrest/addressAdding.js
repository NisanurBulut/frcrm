app.controller('addressInfoCtrl', function($scope, $rootScope,localStorageService,$location, $http,ngDialog,$log,$filter){
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
    GetAddress();
    function GetAddress() {
        var jsn = '{"id":"' + mustid + '","account_id":"' + ac_id + '"}';
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


 

});
