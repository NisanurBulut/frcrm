frOrder.directive('frControl', [function () {
    return {
        restrict: "EA",
        controller: "frControlController"
    }
}]);
frOrder.controller('frControlController', ['$scope', '$rootScope', '$attrs', 'localStorageService', '$location', '$http', 'ngDialog','$filter',
    function ($scope, $rootScope, $attrs, localStorageService, $location, $http, ngDialog,$filter) {
        var mustid = localStorageService.get('mustid');
        var cart = localStorageService.get('restaurant-cart') || [];
        var adresjson = [];
        var minpaktutar = 0;
        var sepettoplam = 0;
        var acsaat = new Date();
        var kapsaat = new Date();
        var simdikizaman = new Date();
        localStorageService.set('restaurant-cart', cart);
        var ac_id = localStorageService.get('accountid');
        var account_name = localStorageService.get('account_name');
        $scope.account_name = account_name;
        function getNextIndexCart() {
            var zmn = new Date();
            zmn = zmn.getTime();
            return zmn;
        }

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
            sepettoplam = parseFloat(ttr).toFixed(2);
            $rootScope.$emit('cartGncl');
            $scope.$emit('cartCount', adet, parseFloat(ttr).toFixed(2));
        }

        $scope.dynamicModalOpen = function (urun, indx, price) {
            function getNextIndexCart() {
                var zmn = new Date();
                zmn = zmn.getTime();
                return zmn;
            }
            dynamicMenu = urun;
            dynamicIndx = getNextIndexCart();
            dynamicPrice = price;
            var mdjson = '{"id":"' + urun.dmid + '","account_id":"' + ac_id + '"}';
            $http.post('Default.aspx/GetDynamicGroup', mdjson).success(function (data) {
                var jsn = data.d;
                jsn = JSON.parse(jsn);
                //alert(JSON.stringify(jsn))
                dynamicMenuJsn = jsn;
                //alert(JSON.stringify($scope.dynamicMenu))
                ngDialog.open({ template: 'dynamicmodal', controller: 'dynamicmodalDiaCtrl', width: '90%' });
                //$scope.$apply();
            }).error(function (data) { });


        }

        $scope.sepeteAt = function (urun, indx, price, dyn, seviye) {
            cart = localStorageService.get('restaurant-cart');
            var fy = urun.pfiyat;
            fy = parseLocalNum(fy);
            fy = fy.toFixed(2);
            var urunbilgi = { 'id': urun.id, 'adi': urun.pname, 'fiyat': fy, 'adet': price, 'dynamic': false, 'seviye': 0, 'index': getNextIndexCart() }

            sepeteat2(urunbilgi);
        }
        function sepeteat2(urunbilgi) {

            var resid = localStorageService.get('resid') || 0;
            ac_id = localStorageService.get('accountid');
            if (cart.length == 0) {
                if (urunbilgi.adet) {
                    localStorageService.set('resid', ac_id);
                    saveToCart(urunbilgi, urunbilgi.adet);
                    return;
                }
            } else if (resid != 0 && resid == ac_id) {
                if (urunbilgi.adet) {
                    saveToCart(urunbilgi, urunbilgi.adet);
                    return;
                }
            } else if (resid == 0) {
                if (urunbilgi.adet) {
                    localStorageService.set('resid', ac_id);
                    saveToCart(urunbilgi, urunbilgi.adet);
                    return;
                }
            } else if (resid != ac_id) {
                alert('Sepetinizde farklı bir Restaurant a ait ürün var ekleme yapamazsınız')
            }

        }



        function saveToCart(urunbilgi, adet) {
            cart.push(urunbilgi);
            var calert = JSON.stringify(cart);
            //alert(calert);
            localStorageService.set('restaurant-cart', cart);
            tt();
        }

        $scope.deleteItem = function (item, index) {
            cart = localStorageService.get('restaurant-cart');
            //alert(JSON.stringify(index))
            var dynactr = 0;
            for (var i = cart.length - 1; i >= 0; i--) {
                if (index == cart[i].index) {
                    //alert(JSON.stringify(cart[i]))
                    cart.splice(i, 1);
                }

            }
            //alert(JSON.stringify(cart));
            localStorageService.set('restaurant-cart', cart);
            $rootScope.$emit('cartGncl');
        }

        $scope.adetdegis = function (a, b) {
            cart = localStorageService.get('restaurant-cart');
            // değişme fonksionunu yaz
            if (b < 1) { b = 1; }
            //if (b > 300) { b = 300; }
            b = parseInt(b);
            for (var i = 0; i <= cart.length - 1; i++) {
                if (cart[i].index == a) {
                    cart[i].adet = b;
                }

            }

            localStorageService.set('restaurant-cart', cart);
            $scope.sepetim = localStorageService.get('restaurant-cart');
            tt();
        }

        $scope.toCart = function () {
            tt();
           
            if (parseFloat(sepettoplam) < parseFloat(minpaktutar)) {
                alert('SEPETİNİZDEKİ ÜRÜNLER MİNİMUM SİPARİŞ TUTARININ ALTINDADIR');
            }
            else if (simdikizaman < 1) {
                alert('HİZMET SAATLERİ DIŞINDAYIZ');
            }
            else {
                $location.path('/cart');
            }
        }

        GetAddress();
        $rootScope.$on('GetAdr', function (event) {
            GetAddress(); 
        });

        function GetAddress() {
            ac_id = localStorageService.get('accountid');
            mustid = localStorageService.get('mustid');
            var jsn = '{"id":"' + mustid + '","account_id":"' + ac_id + '"}';
            $http.post('Default.aspx/GetAddress', jsn).success(function (data) {
                var adr = data.d;
                adr = JSON.parse(adr);
                adresjson = adr;
                $scope.adresler = adr;
                $scope.adresradio = { id: $scope.adresler[0].id };
                $scope.adres_sehir = $scope.adresler[0];//ilk adresin seçili gelmesi
                change_address($scope.adresler[0].id);
                $scope.$apply();

            }).error();
        }

        $scope.change_address = function (adid){
            change_address(adid);
        }

        function change_address(adid) {
            for (var i = 0; i <= adresjson.length - 1; i++) {
                if (adresjson[i].id == adid) {
                    var minpaktut       = adresjson[i].min_pak_tutar; minpaktut = parseFloat(minpaktut).toFixed(2);
                    var servissure      = adresjson[i].servis_sure;
                    simdikizaman        = adresjson[i].openctrl;
                    acsaat              = adresjson[i].acsaat;
                    kapsaat             = adresjson[i].kapsaat;
                    $scope.acsaat       = acsaat.substring(0,5);    //$filter('date')(acsaat, 'hh:mm');
                    $scope.kapsaat      = kapsaat.substring(0, 5);   //$filter('date')(kapsaat, 'hh:mm');
                    $scope.minpak       = minpaktut;
                    minpaktutar         = minpaktut;
                    $scope.servissure = servissure;
                    break;
                }
            }    
        }
    }]);