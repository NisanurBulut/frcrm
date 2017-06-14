frOrder.directive('frControl', [function () {
    return {
        restrict: "EA",
        controller: "frControlController"
    }
}]);
frOrder.controller('frControlController', ['$scope', '$rootScope', '$attrs', 'localStorageService', '$location', '$http', 'ngDialog', '$log', '$filter',
function ($scope, $rootScope, $attrs, localStorageService, $location, $http, ngDialog, $log, $filter) {
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
        var resid = localStorageService.get('resid') || 0;
        var account_name = localStorageService.get('account_name');
        $scope.statusAddr = false;
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
                  
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
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
               
                dynamicMenuJsn = jsn;
               
                ngDialog.open({ template: 'dynamicmodal', controller: 'dynamicmodalDiaCtrl', width: '90%' });
               
            }).error(function (data) { });


        }

        $scope.AddressInfoModal = function () {
           
            ngDialog.open({ template: 'addressInfoModal', controller: 'addressInfoCtrl', width: '70%' });
            //ngDialog.open({ template: 'dynamicmodal', controller: 'dynamicmodalDiaCtrl', width: '90%' });
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
                $scope.$emit('createDialog','Sepetinizde farklı bir Restaurant a ait ürün var ekleme yapamazsınız')
            }

        }



        function saveToCart(urunbilgi, adet) {
            cart.push(urunbilgi);
            var calert = JSON.stringify(cart);   
            localStorageService.set('restaurant-cart', cart);
            tt();
        }

        $scope.deleteItem = function (item, index) {
            cart = localStorageService.get('restaurant-cart');
            
            var dynactr = 0;
            for (var i = cart.length - 1; i >= 0; i--) {
                if (index == cart[i].index) {
                    
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

        GetAddress();
        $rootScope.$on('GetAdr', function (event) {
            GetAddress(); 
        });

        function GetAddress() {
         
            var adr = [];
            ac_id = localStorageService.get('accountid');
            mustid = localStorageService.get('mustid');
            var jsn = '{"id":"' + mustid + '","account_id":"' + ac_id + '"}';
            $http.post('Default.aspx/GetAddress', jsn).success(function (data) {
                adr = data.d;
               
                if (!data.d) {
                    $scope.statusAddr = false;
                    if (!$scope.$$phase) {
                        $scope.$apply();

                    }
                  
                    accountInfo();
                    
                } else {
                    adr = JSON.parse(adr);//bull dönüyo
                    $scope.statusAddr = true;
                    if (!$scope.$$phase) {
                        $scope.$apply();

                    }
                  
                }
               
                //bu dönmelerin null olması error olarak yansıyor
                //bunlar ilgilide düzenlemeler yapılması gerekıyor
                adresjson = adr;
                $scope.adresler = adr;
                $scope.adresradio = { id: $scope.adresler[0].id };
                $scope.adres_sehir = $scope.adresler[0];//ilk adresin seçili gelmesi
                change_address($scope.adresler[0].id);
                console.log("adr:", adr);
                if (!$scope.$$phase) {
                    $scope.$apply();
                    
                }
                
            }).error();
            
        }

        $scope.change_address = function (adid){
            change_address(adid);
        }
        function accountInfo()
        {
            
            $http.post('Default.aspx/GetAccountInfo', '{"account_id":"' + ac_id + '"}').success(function (data) {
                 
                adr = JSON.parse(data.d);
             
                //adres olmaması durumunda açılış kapanış saatı ve mınumum tutarın gelmesı saglanıyor
                var minpaktut = adr[0].min_pak_tutar;
                
                minpaktut = parseFloat(minpaktut).toFixed(2);
                var servissure = adr[0].servis_sure;
                simdikizaman = adr[0].openctrl;
                acsaat = adr[0].acsaat;
                kapsaat = adr[0].kapsaat;
                $scope.acsaat = acsaat.substring(0, 5);  //$filter('date')(acsaat, 'hh:mm');
                $scope.kapsaat = kapsaat.substring(0, 5); //$filter('date')(kapsaat, 'hh:mm');
                $scope.minpak = minpaktut;
                minpaktutar = minpaktut;
                $scope.servissure = servissure;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }).error();

        }
        function change_address(adid) {
            localStorageService.set('chosedadid', adid);
            for (var i = 0; i <= adresjson.length - 1; i++) {
                    if (adresjson[i].id == adid) {
                        var minpaktut = adresjson[i].min_pak_tutar;
                        minpaktut = parseFloat(minpaktut).toFixed(2);
                        var servissure = adresjson[i].servis_sure;
                        simdikizaman = adresjson[i].openctrl;
                        acsaat = adresjson[i].acsaat;
                        kapsaat = adresjson[i].kapsaat;
                        $scope.acsaat = acsaat.substring(0, 5);    //$filter('date')(acsaat, 'hh:mm');
                        $scope.kapsaat = kapsaat.substring(0, 5);   //$filter('date')(kapsaat, 'hh:mm');
                        $scope.minpak = minpaktut;
                        minpaktutar = minpaktut;
                        $scope.servissure = servissure;
                       
                        break;
                    }
                
            }
             
        }


        GetOldOrders();
        $rootScope.$on('GetOldOrders', function (event) {
            GetOldOrders();
        });

        function GetOldOrders() {
            ac_id = localStorageService.get('accountid');
            mustid = localStorageService.get('mustid');
            var jsn = '{"id":"' + mustid + '","account_id":"' + ac_id + '"}';
            $http.post('Default.aspx/OldOrders', jsn).success(function (data) {
                var ord = data.d;
                ord = JSON.parse(ord);
                $scope.oldorders = ord;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }
            }).error();
        }

        GetSlider();
        $rootScope.$on('GetSlider', function (event) {
            GetSlider();
        });

        function GetSlider() {
            ac_id = localStorageService.get('accountid');
  
            var jsn = '{"account_id":"' + ac_id + '"}';
            $http.post('Default.aspx/getSlider', jsn).success(function (data) {
                var sad = data.d;
                sad = JSON.parse(sad);
                $scope.sads = sad;
                if (!$scope.$$phase) {
                    $scope.$apply();
                }

                
            }).error();
        }

        $scope.modalShown = false;
      
        $scope.toCart = function () {
            tt();
            var resid = localStorageService.get('resid') || 0;
            var ac_id = localStorageService.get('accountid');
            console.log("resid", resid);
            console.log("ac_id", ac_id);
            if (parseFloat(sepettoplam) < parseFloat(minpaktutar)) {
                createDialog('SEPETİNİZDEKİ ÜRÜNLER MİNİMUM SİPARİŞ TUTARININ ALTINDADIR');
                $scope.modalShown = !$scope.modalShown;
            }
            else if (resid != ac_id) {
                createDialog('SEPETİNİZDEKİ ÜRÜNLER FARKLI BİR RESTORANA AİTTİR');
                $location.path('/home-liste');
            }
            else if (simdikizaman < 1) {
                createDialog('HİZMET SAATLERİ DIŞINDAYIZ');
            }
            else {
                $location.path('/cart');
            }
        }

        $scope.$on('createDialog', function (event, durummesaj) { createDialog(durummesaj); });

        function createDialog(durummesaj) {
            localStorageService.set('alertMessageInfo', durummesaj);
            ngDialog.open({ template: 'alertMessage', width: '40%', height: '30%', className: 'ngdialog-theme-default' });
            $scope.alertMessageInfo = localStorageService.get('alertMessageInfo');
            
        }
      
}]);
