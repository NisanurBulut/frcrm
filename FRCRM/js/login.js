
app.controller('loginctrl', function ($scope, $http, localStorageService, $location) {



    $scope.kayitol = function () {
        var kayitadi = $scope.kayitadi;
        var kayitsoyadi = $scope.kayitsoyadi;
        var kayitsifre = $scope.kayitsifre;
        var kayitsifretekrar = $scope.kayitsifretekrar;
        var kayitemail = $scope.kayitmail;
        var jsdt = '{"adi":"' + kayitadi + '","soyadi":"' + kayitsoyadi + '","mail":"' + kayitemail + '","sifre":"' + kayitsifre + '"}';
        //alert(jsdt);
        $http.post('Default.aspx/SignUp', jsdt).success(function (data) {
            var durum = data.d;
            if (durum == '0') { $scope.hatamesaji = 'Kayıt Başarılı'; }
            if (durum == '1') { $scope.hatamesaji = 'Mail başka  bir kullanıcı tarafından kullanılıyor'; }
            if (durum == '2') { $scope.hatamesaji = 'Tekrar deneyin'; }
        }).error(function (err) { alert(JSON.stringify(err)) });
    }

});