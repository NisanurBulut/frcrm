/// <reference path="C:\Users\nisanur\Source\Repos\frcrm\FRCRM\html/oldOrders.html" />

var frOrder = angular.module('fr.order', ['LocalStorageModule', 'ngRoute','ngDialog']);



frOrder.directive('frOldOlders', function () {

    var html = '';
    return {
        restrict: "EA",
        templateUrl: 'js/fastrest/template/oldOrders.html',
        controller: ''
    }
});

frOrder.directive('frSepet', function () {

    var html = '';
    return {
        restrict: "EA",
        templateUrl: 'js/fastrest/template/sepet.html',
        controller: 'frSepetController'
    }
});

frOrder.controller('frSepetController', ['$scope', function ($scope) {

}]);



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


frOrder.directive("frAccountInfo", [function () {
    return {
        restrict: "EA",
        templateUrl: "js/fastrest/template/accountinfo.html"
    }
}]);




// restrict: "EA",//Nitelik kullanım şekli    
// restrict E olursa element (fr-Sepet></fr-Sepet>)
// restrict A olursa attribute (<div fr-Sepet></div>)
// restrict C olursa class (<div class="fr-Sepet"></div>)
// veya bir arada da olabilir (restrict: "EA" veya restrict: "EAC")    
//transclude: true, Burası tag içerisine yazı yazdığımızda ekranda görünmesini sağlıyor
