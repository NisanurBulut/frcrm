app.controller('accountsctrl', function ($scope, $http, localStorageService) {
    localStorageService.set('accountid', 0);
    $scope.openAccount = function (id) {
        localStorageService.set('accountid', id);
    }
    $http.get('api/shops', { data: {} }).success(function (data) {
        var jsn = data;
        //alert(JSON.stringify(jsn));
        $scope.accounts = jsn;
    }).error();


});

