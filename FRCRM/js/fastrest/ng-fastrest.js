
var frOrder = angular.module('fr.order', ['LocalStorageModule', 'ngRoute','ngDialog']);

frOrder.directive('frControl', [function () {
    return {
        restrict: "EA",
        controller: "frControlController"
    }
}]);
frOrder.controller('frControlController', ['$scope','$rootScope', '$attrs', 'localStorageService', '$location', '$http', 'ngDialog',
    function ($scope,$rootScope, $attrs, localStorageService, $location, $http, ngDialog) {
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

frOrder.directive('frSepet', function() {
	
	var html = '';
        return {
	        restrict: "EA",
            templateUrl:'js/fastrest/template/sepet.html',
            controller:'frSepetController'
        }
});



frOrder.directive("sosyalButon", [function(){
        return {
            restrict: "EA", 
            templateUrl: "js/fastrest/sosyal/sosyal.html",
            controller:'frSosyalController'
        }
}]);    
    

frOrder.directive("frSolMenu",[function(){
	return{
		restrict:"EA",
		templateUrl:"js/fastrest/solmenu/solmenu.html",
		controller:'frSolMenuController'
	}
}]);



frOrder.controller('frSolMenuController', ['$scope','$attrs','$http',function($scope,$attrs,$http) {
	$http.get('http://www.mobilmuayene.com/api_lavazza/solmenu.json').then(function(response){
		var json = response.data;
		$scope.uygulama_adi=json.adi;
		$scope.uygulama_logo=json.logo; 
		$scope.logogoster = json.logogoster;
		$scope.menus = json.data;
		
	});
        
}]);


    
frOrder.controller('frSepetController', ['$scope', function($scope) {
        
}]);
    
    
frOrder.controller('frSosyalController',['$scope','$attrs',function($scope,$attrs){
	    $scope.fb = $attrs.bilgiFb;
	    $scope.tw = $attrs.bilgiTw;
	    $scope.gp = $attrs.bilgiGp;
	    $scope.em = $attrs.bilgiEm;
	    

	    

}]);    

frOrder.directive("frHeaderUst", [function(){
        return {
            restrict: "EA", 
            templateUrl: "js/fastrest/header/ust.html",
            controller:'frHeaderUstController'
        }
}]);    

frOrder.controller('frHeaderUstController',['$scope','$attrs',function($scope,$attrs){
	    $scope.fb = $attrs.bilgiFb;
	    $scope.tw = $attrs.bilgiTw;
	    $scope.gp = $attrs.bilgiGp;
	    $scope.em = $attrs.bilgiEm;
	    $scope.tel = $attrs.bilgiTel;
	    $scope.mail = $attrs.bilgiMail;
	    
	    

}]); 
frOrder.directive("frHeaderOrta", [function(){
        return {
            restrict: "EA", 
            templateUrl: "js/fastrest/header/orta.html",
            controller:'frHeaderOrtaController'
        }
}]);    

frOrder.controller('frHeaderOrtaController', ['$scope', '$attrs', 'localStorageService', '$location','$http', function ($scope, $attrs, localStorageService, $location,$http) {
	    $scope.logo = $attrs.bilgiLogo;
	    $scope.hesabim = $attrs.sayfaHesabim;
	    $scope.favorilerim = $attrs.sayfaFavorilerim;
	    $scope.sepetim = $attrs.sayfaSepetim;
	    $scope.giris = $attrs.sayfaGiris;
	    $scope.activeclass = $attrs.activeClass;
	    $scope.kmail = localStorageService.get('kmail');
	    var giris = localStorageService.get('giris') || 0;

	    if (giris == 0) { $scope.headerlogin = false;  }
	    if (giris == 1) { $scope.headerlogin = true; }

	    $scope.logox = function () {
	        $location.path('/');
	    }
	    $scope.kayitx = function () {
	        $location.path('/login');
	    }
	    $scope.cikis = function () {
	        localStorageService.set('giris',0);
	        $scope.headerlogin = false;
	        $location.path('/login');
	    }
	    $scope.girisyapx = function () {
	        var email = $scope.email;
	        var sifre = $scope.sifre;
	        var jsdt = '{"mail":"' + email + '","sifre":"' + sifre + '"}';

	        $http.post('Default.aspx/Logins', jsdt).success(function (data) {
	            var durumx = data.d;
	            durumx = JSON.parse(durumx);
	            localStorageService.set('musadi', durumx.adi);
	            localStorageService.set('mustid', durumx.id);
	            var durum = durumx.hata;
	            if (durum == '0') {
	                $scope.hatamesaji = 'Giriş Başarılı';
	                var giris = localStorageService.set('giris', 1);
	                localStorageService.set('kmail', email);
	                $scope.kmail = localStorageService.get('kmail');
	                var giris_zamani = localStorageService.set('giris_zamani', zaman);
	                $scope.headerlogin = true;
	                $scope.kmail = localStorageService.get('kmail');
	                var cartx = localStorageService.get('restaurant-cart');
	                if (cartx.length > 0) { $location.path('/cart'); } else { $location.path('/home-liste'); }

	                
	            }
	            if (durum == '1') { $location.path('/login'); $scope.hatamesaji = 'Hatalı kullanıcı adı yada şifre '; }
	            if (durum == '2') { $location.path('/login'); $scope.hatamesaji = 'Tekrar deneyin'; }
	        }).error(function (err) {  });

	    }
	    $scope.$on('cartLogin', function (event) { $scope.headerlogin = true; $scope.kmail = localStorageService.get('kmail'); });
	    $scope.$on('cartCount', function (event, cnt, ttr) { $scope.spetadet = cnt; $scope.tutar = ttr;});
	    

}]);     

frOrder.directive("frSlider", [function(){
        return {
            restrict: "EA", 
            templateUrl: "js/fastrest/slider/slider.html",
            controller:'frSliderController'
        }
}]);    

frOrder.controller('frSliderController',['$scope','$attrs',function($scope,$attrs){

	    
	    

}]);   


frOrder.directive("frBodyKategori", [function(){
        return {
            restrict: "EA", 
            templateUrl: "js/fastrest/body/kategori.html",
            controller:'frBodyKategoriController'
        }
}]);    

frOrder.controller('frBodyKategoriController',['$scope','$attrs','$http',function($scope,$attrs,$http){


}]);  


frOrder.directive("frBodyUrun", [function(){
        return {
            restrict: "EA", 
            templateUrl: "js/fastrest/body/urun.html",
            controller:'frBodyUrunController'
        }
}]);    

frOrder.controller('frBodyUrunController',['$scope','$attrs','$http',function($scope,$attrs,$http){	
    //$scope.$on('GroupChange', function (event) { alert(1); });



}]);  


frOrder.directive("frFooterBottom", [function(){
        return {
            restrict: "EA", 
            templateUrl: "js/fastrest/footer/bottom.html",
            controller:'frFooterBottomController'
        }
}]);    

frOrder.controller('frFooterBottomController',['$scope','$attrs',function($scope,$attrs){

	    
	    

}]); 

frOrder.directive("frCart", [function(){
        return {
            restrict: "EA", 
            templateUrl: "js/fastrest/cart/cart.html",
            controller:'frCartController'
        }
}]);    

frOrder.controller('frCartController',['$scope','$attrs',function($scope,$attrs){
	
	    
	    

}]);

frOrder.directive("frLogin", [function () {
    return {
        restrict: "EA",
        templateUrl: "js/fastrest/login/lgn.html",
        controller:"frLoginController"
    }

}]);

frOrder.controller("frLoginController", ['$scope', function ($scope) {

}]);

frOrder.directive("frAddressCard", [function () {
    return {
        restrict: "EA",
        templateUrl: "js/fastrest/template/addresscard.html"
    }

}]);

frOrder.directive("frCartWizard", [function () {
    return {
        restrict: "EA",
        templateUrl: "js/fastrest/template/carttemplate.html"
    }

}]);

frOrder.directive("frPayWizard", [function () {
    return {
        restrict: "EA",
        templateUrl: "js/fastrest/template/paywizard.html"
    }

}]);


frOrder.directive("frAddressCheck", [function () {
    return {
        restrict: "EA",
        templateUrl: "js/fastrest/template/adresscheck.html"
    }

}]);
frOrder.directive("frInvoice", [function () {
    return {
        restrict: "EA",
        templateUrl:"js/fastrest/template/invoice.html"
    }
}]);


frOrder.directive("frDynamicModal", [function () {
    return {
        restrict: "EA",
        templateUrl: "js/fastrest/template/dynamicmodal.html"
    }
}]);

frOrder.directive("frTrSvgMap", [function () {
    return {
        restrict: "EA",
        templateUrl: "js/fastrest/template/trmap.html"
    }
}]);




// restrict: "EA",//Nitelik kullanım şekli    
// restrict E olursa element (fr-Sepet></fr-Sepet>)
// restrict A olursa attribute (<div fr-Sepet></div>)
// restrict C olursa class (<div class="fr-Sepet"></div>)
// veya bir arada da olabilir (restrict: "EA" veya restrict: "EAC")    
//transclude: true, Burası tag içerisine yazı yazdığımızda ekranda görünmesini sağlıyor
