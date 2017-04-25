app.controller('GroupAndProductCtrl2', function ($scope, $rootScope, $http, localStorageService, $location, ngDialog, $timeout, appCartService) {
    // alert(JSON.stringify($location.search()))
    var urljsn = JSON.stringify($location.search());
    urljsn = JSON.parse(urljsn);
    var urlaccount = urljsn.accountid;
    var urlaccountname = urljsn.accountname;
    //alert(urlaccount);
    cart = localStorageService.get('restaurant-cart') || [];
    $scope.account_name = localStorageService.get('account_name');
    if (urlaccountname) {
        localStorageService.set('account_name', urlaccountname);
        $scope.account_name = urlaccountname;
    }
    var ac_id = localStorageService.get('accountid');
    if (urlaccount) {
        localStorageService.set('accountid', urlaccount);
        ac_id = localStorageService.get('accountid');
        localStorageService.set('account_name', urlaccountname);
        $scope.account_name = urlaccountname;
    }
    if (ac_id == 0) { $location.path('/'); }
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

        $scope.toplam = parseFloat(ttr).toFixed(2);
        $scope.$emit('cartCount', adet, parseFloat(ttr).toFixed(2));
    }


    $http.post('Default.aspx/GetProductJsonList', '{"account_id":"' + ac_id + '"}').success(function (data2) {
        var Grupjsn = [];
        var Gelenjs = data2.d;;
        var jsn2 = [];
        Gelenjs = JSON.parse(Gelenjs);
        jsn2 = Gelenjs;



        for (var i = 0; i <= jsn2.length - 1; i++) {
            if (i == 0) {
                var g_adi = jsn2[i].g_adi;
                var g_id = jsn2[i].g_id;
                var urn = [];
                for (var a = 0; a <= jsn2.length - 1; a++) {
                    if (g_id == jsn2[a].g_id) {
                        if (parseInt(jsn2[a].pfiyat) > 0 || parseInt(jsn2[a].dmfiyat) > 0) {
                            var pname = jsn2[a].pname;
                            var pfiyat = jsn2[a].pfiyat;
                            var resim = jsn2[a].resim;
                            var uid = jsn2[a].id;
                            var dmid = jsn2[a].dmid;
                            var dmadi = jsn2[a].dmadi;
                            var dmfiyat = jsn2[a].dmfiyat;
                            var ujsn = { 'pname': pname, 'pfiyat': pfiyat, 'resim': resim, 'id': uid, 'dmid': dmid, 'dmadi': dmadi, 'dmfiyat': dmfiyat };
                            urn.push(ujsn);
                        }
                    }
                }
                var gjsn = { 'adi': g_adi, 'id': g_id, 'product': urn };
                Grupjsn.push(gjsn);


            }

            if (i != 0 && jsn2[i].g_id != jsn2[i - 1].g_id) {
                var g_adi = jsn2[i].g_adi;
                var g_id = jsn2[i].g_id;
                var urn = [];
                for (var a = 0; a <= jsn2.length - 1; a++) {
                    if (g_id == jsn2[a].g_id) {
                        if (parseInt(jsn2[a].pfiyat) > 0 || parseInt(jsn2[a].dmfiyat) > 0) {
                            var pname = jsn2[a].pname;
                            var pfiyat = jsn2[a].pfiyat;
                            var resim = jsn2[a].resim;
                            var uid = jsn2[a].id;
                            var dmid = jsn2[a].dmid;
                            var dmadi = jsn2[a].dmadi;
                            var dmfiyat = jsn2[a].dmfiyat;
                            var ujsn = { 'pname': pname, 'pfiyat': pfiyat, 'resim': resim, 'id': uid, 'dmid': dmid, 'dmadi': dmadi, 'dmfiyat': dmfiyat };
                            urn.push(ujsn);
                        }
                    }
                }
                var gjsn = { 'adi': g_adi, 'id': g_id, 'product': urn };
                Grupjsn.push(gjsn);


            }
        }
        $scope.groups = Grupjsn;

    }).error();


    $scope.price = 1;

    $rootScope.$on('cartGncl', function (event) {
        cart = localStorageService.get('restaurant-cart');
        //alert(JSON.stringify(cart))
        $scope.sepetim = localStorageService.get('restaurant-cart');
        tt();
    });
    $rootScope.$emit('GetAdr');
    $rootScope.$emit('GetOldOrders');
    $rootScope.$emit('GetSlider');



});