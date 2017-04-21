app.controller('signupctrl',function($scope, $http){
	mainpage = 1;
	var regg = localStorage.getItem('regid');
	var regios = localStorage.getItem('regios');
	$scope.frkayit = function(){
		
		
		var emailk = $scope.email;
		var passk  = $scope.password;
		var tel    = $scope.telefon;
		var ad     = $scope.ad;
		var soyad  = $scope.soyad;
		var kayit  = "isim="+ad+"&sadi="+soyad+"&mail="+emailk+"&sifre="+passk+"&telefon="+tel+'&regid='+regg+'&regios='+regios;
		if(ad.length>0){
	        $http.get(httpurl+"kayit.php?"+kayit).then(function (response) {
           var sonuc =response.data[0].sonuc;
           if(sonuc==0 || sonuc ==2 || sonuc==3){alert('Kayıt esnasında bir hata oluştu Lütfen tekrar deneyiniz');}
           if(sonuc==1){alert('Kayıt işlemi başarılı : Email ve şifreniz ile giriş yapabilirsiniz');menu.setMainPage('html/login.html', {closeMenu: true});}
           if(sonuc==10){alert('İsim alanını doldurunuz');}
           if(sonuc==11){alert('Mail alanını doldurunuz');}
           if(sonuc==12){alert('Mail adresi ile daha önce kayıt olunmuş');}
           if(sonuc==13){alert('Lütfen geçerli bir mail adresi giriniz');}

    });

	}if(ad.length<1){alert('İsim alanını doldurunuz')}
                              }
	
});
