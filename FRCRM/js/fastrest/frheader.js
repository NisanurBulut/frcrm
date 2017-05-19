frOrder.directive("frHeaderOrta", [function () {
    return {
        restrict: "EA",
        templateUrl: "js/fastrest/header/orta.html",
        controller: 'frHeaderOrtaController'
    }
}]);

frOrder.controller('frHeaderOrtaController', ['$scope', '$attrs', 'localStorageService', '$location', '$http','$rootScope', function ($scope, $attrs, localStorageService, $location, $http,$rootScope) {
    $scope.logo = $attrs.bilgiLogo;
    $scope.hesabim = $attrs.sayfaHesabim;
    $scope.favorilerim = $attrs.sayfaFavorilerim;
    $scope.sepetim = $attrs.sayfaSepetim;
    $scope.giris = $attrs.sayfaGiris;
    $scope.activeclass = $attrs.activeClass;
    $scope.kmail = localStorageService.get('kmail');
    var giris = localStorageService.get('giris') || 0;

    if (giris == 0) { $scope.headerlogin = false; }
    if (giris == 1) { $scope.headerlogin = true; }

    $scope.logox = function () {
        $location.path('/accounts');
    }
    $scope.kayitx = function () {
        $location.path('/login');
    }
    $scope.cikis = function () {
        localStorageService.set('giris', 0);
        $scope.headerlogin = false;
    
        $location.path('/login');
        localStorageService.set('mustid', -1);
        $rootScope.$emit('GetAdr');
        $rootScope.$emit('GetOldOrders');
    }
    $scope.girisyapx = function () {
       
       
        var email = $scope.email;
        var sifre = $scope.sifre;
        var jsdt = '{"mail":"' + email + '","sifre":"' + sifre + '"}';

        if(email.length > 0 && sifre.length > 0){
             $http.post('Default.aspx/Logins', jsdt).success(function (data) {
            var durumx = data.d;
            durumx = JSON.parse(durumx);
            localStorageService.set('musadi', durumx.adi);
            localStorageService.set('mustid', durumx.id);
            var durum = durumx.hata;
            if (durum == '0') {
                $scope.hatamesaji = 'Giriş Başarılı';
                var giris = localStorageService.set('giris', 1);
                var oldMail=localStorageService.get('kmail') || 0;
                if (oldMail == email) {
                    $location.path('/home-liste');
                }
                else
                {
                    localStorageService.set('restaurant-cart', []);
                    $rootScope.$emit('cartGncl');
                }
                console.log();
                localStorageService.set('kmail', email);
                $scope.kmail = localStorageService.get('kmail');
                var giris_zamani = localStorageService.set('giris_zamani', zaman);
                $scope.headerlogin = true;
                $scope.kmail = localStorageService.get('kmail');

                var cartx = localStorageService.get('restaurant-cart');
                $rootScope.$emit('GetAdr');
                $rootScope.$emit('GetOldOrders');

                if (cartx.length > 0) { $location.path('/cart'); } else { $location.path('/home-liste'); }


        }
            if (durum == '1') { $location.path('/login'); $scope.hatamesaji = 'Hatalı kullanıcı adı yada şifre '; }

            if (durum == '2') { $location.path('/login'); $scope.hatamesaji = 'Tekrar deneyin'; }
             }).error(function (err) { });
        }

    }


    $scope.$on('cartLogin', function (event) { $scope.headerlogin = true; $scope.kmail = localStorageService.get('kmail'); });
    $scope.$on('cartCount', function (event, cnt, ttr) { $scope.spetadet = cnt; $scope.tutar = ttr; });


}]);