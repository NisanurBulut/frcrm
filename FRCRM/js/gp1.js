﻿app.controller('GroupAndProductCtrl', function ($scope, $rootScope, $http, localStorageService, $location, $timeout) {

   

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
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
                if (cart[i].seviye == 0) { adet++ }
            }
        }

        $scope.toplam = parseFloat(ttr).toFixed(2);
        $scope.$emit('cartCount', adet, parseFloat(ttr).toFixed(2));
    }
    //$scope.adetdegisx = function (a, b) {appCartService.adetdegis(a, b); $scope.sepetim = localStorageService.get('restaurant-cart');tt(); }

    //alert(ac_id);
    $http.post('Default.aspx/GetGroupJson', '{"id":"' + ac_id + '"}').success(function (data) {
        var jsn = data.d;
        jsn = JSON.parse(jsn);
        for (var i = 0; i <= jsn.length; i++) { if (i == 0) { GetProduct(jsn[0].id) } }
        $scope.groups = jsn;
    }).error();

    function GetProduct(id) {
       
        $http.post('Default.aspx/GetProductJson', '{"id":"' + id + '","account_id":"' + ac_id + '"}').success(function (data) {
            var jsn = data.d;
            jsn = JSON.parse(jsn);
            $scope.urunler = jsn;
          // alert(JSON.stringify(jsn))
        }).error();

    }

    $scope.ClikGroup = function (id) { 
       
        GetProduct(id);
      
       }

    $rootScope.$on('cartGncl', function (event) {
        $scope.sepetim = localStorageService.get('restaurant-cart');

        tt();
    });

    $rootScope.$emit('GetAdr');
    $rootScope.$emit('GetOldOrders');
    $rootScope.$emit('GetSlider');



   
    });
