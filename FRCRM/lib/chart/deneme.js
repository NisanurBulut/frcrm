(function(){
  'use strict';
  	  var app = angular.module('chartApp', ['ng-fusioncharts']);
	  app.controller('MyController', function($scope) {
  // chart data source
  $scope.dataSource = {
    "chart": {
      "caption": "Column Chart Built in Angular!",
      "captionFontSize": "30",
      // more chart properties - explained later
    },
    "data": [{
        "label": "CornflowerBlue",
        "value": "42"
      }, //more chart data
    ]
  };
});



})();