

/*! 
 * v1.0.0
 * Beni takip edin  http://ahmetbaltaci.com
 * 
 * 
 */

// 
var httpurl = 'http://www.mobilmuayene.com/frcatrapi/';
var uniqueid = '';
var localbilgi = '';
var mainpage = 0;
var cart = [];
var dynamicMenuJsn = [];
var dynamicMenu = {};
var dynamicIndx;
var dynaddctrl = 0;
var dynamicPrice;
var zaman = new Date();
zaman = (zaman.getTime() / 1000);
var gunx = 86400;
var saatx = 3600;
function parseLocalNum(num) {
    return +(num.replace(",", "."));
}
var app = angular.module('app', ['ngRoute', 'ngCookies', 'LocalStorageModule', 'angular-images-loaded', 'ngMap', 'angular-carousel',
    'ngSanitize', 'ngDialog', 'googlechart', 'shoppinpal.scratch-off', 'fr.order', 'sticky']);

(function(){
  'use strict';
    //'LocalStorageModule'

  // Tüm html etiketlerini kardırır ve sayfaya html içeriği oluşturur.
  app.filter('htmlToPlaintext', function() {
      return function(text) {
        return String(text).replace(/<[^>]+>/gm, '');
      }
    }
  );

  app.factory('appCartService', function ($rootScope, localStorageService, $filter) {
      var restaurantCartKey = 'restaurant-cart';
      var cart = localStorageService.get(restaurantCartKey) || [];

      var service = {
          deleteItem: deleteItem,
          flush: flush,
          getAll: getAll,
          adetdegis: adetdegis
      };
      return service;

      // ********************************************************

      function deleteItem(itemToRemove) {
          _.remove(cart, function (item) {
              return item === itemToRemove;
          });
          localStorageService.set(restaurantCartKey, cart);
      }

      function flush() {
          cart = [];
          localStorageService.set(restaurantCartKey, cart);
      }



      function getAll() {
          return cart;
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

      }
      function adetdegis(a, b) {
          // değişme fonksionunu yaz
          if (b == 0) { b = 1; }
          //if (b >300) { b = 300; }
          b = parseInt(b);
          cart[a].adet = b;
          localStorageService.set('restaurant-cart', cart);
          $scope.sepetim = localStorageService.get('restaurant-cart');
          tt();
      }
      function deleteItem(item, index) {
          //alert(JSON.stringify(index))
          for (var i = cart.length - 1; i >= 0; i--) {
              if (i == index) {
                  //alert(JSON.stringify(cart[i]))
                  cart.splice(i, 1);
              }
          }
          localStorageService.set('restaurant-cart', cart);

      }

      function tt() {
          var ttr = 0.00;
          for (var i = cart.length - 1; i >= 0; i--) {
              if (parseFloat(cart[i].fiyat) > 0) {
                  var sep = parseLocalNum(cart[i].fiyat);
                  var adt = cart[i].adet;
                  ttr += parseFloat(sep * adt);
                  //alert(cart[i]);
              }
          }

          
      }


  });
  

  app.config(['ngDialogProvider', function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                plain: false,
                showClose: true,
                closeByDocument: true,
                closeByEscape: true,
                appendTo: false,
                preCloseCallback: function () {
                    console.log('default pre-close callback');
                }
            });
        }]);


  app.config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
    }]);  

  app.directive('datePicker', function () {
      return {
          link: function postLink(scope, element, attrs) {
              scope.$watch(attrs.datePicker, function () {
                  if (attrs.datePicker === 'start') {
                      //element.pickadate();
                  }
              });
          }
      };
  });
  // arkaplan resmi için
  app.directive('backImg', function(){
    return function(scope, element, attrs){
        var url = attrs.backImg;
        element.css({
            'background-image': 'url(' + url +')',
            'background-size' : 'cover'
        });
    };
  });

    //internet kontrol modaldaki mesajı gösterir
    document.addEventListener("offline", function(){offlineMessage.show();
	setTimeout('offlineMessage.hide()', 8000);}, false);
	document.addEventListener("online", function(){
		//alert('online');
	});
	//storage ayarları
	Storage.prototype.setObject = function(key, value) {this.setItem(key, JSON.stringify(value));}
	Storage.prototype.getObject = function(key) {var value = this.getItem(key);return value && JSON.parse(value);}
    //<img> etiketli tüm ögeleri önbelleğe almak için


app.directive('imgCache', ['$document', function ($document) {
	     return {
		     link: function (scope, ele, attrs) {
			     var target = $(ele);
			     scope.$on('ImgCacheReady', function () {
				     ImgCache.isCached(attrs.src, function(path, success){
					     if(success){
						     ImgCache.useCachedFile(target);
						     } else {
							     ImgCache.cacheFile(attrs.src, function(){
								     ImgCache.useCachedFile(target);
								     });
                                    }
       });}, false);}
             };
    }]);  


app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: "html/mapsvg.html"
    })
    .when("/accounts", {
        templateUrl : "html/accounts.html"
    })
    .when("/home", {
            templateUrl: "html/home2.html"
    })
    .when("/home2", {
            templateUrl: "html/home.html"
    })
    .when("/cart", {
        templateUrl : "cart.html"
    })
    .when("/login", {
        templateUrl : "login.html"
    });
});





})();