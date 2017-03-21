frOrder.directive('frControl', [function () {
    return {
        restrict: "EA",
        controller: "frControlController"
    }
}]);
frOrder.controller('frControlController', ['$scope', '$rootScope', '$attrs', 'localStorageService', '$location', '$http', 'ngDialog',
    function ($scope, $rootScope, $attrs, localStorageService, $location, $http, ngDialog) {
        var cart = localStorageService.get('restaurant-cart') || [];
        localStorageService.set('restaurant-cart', cart);
        var ac_id = localStorageService.get('accountid');

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
            if (urunbilgi.adet) {
                saveToCart(urunbilgi, urunbilgi.adet);
                return;
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



    }]);