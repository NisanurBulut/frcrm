  app.controller('DatePickerCtrl',function($scope,$http,$compile,$filter){
	  var tarih1 = '';
	  var tarih2 = '';
	  var dt = new Date();// Günğn tarihini dt değişkenine aktar
	  var yil = dt.getFullYear();// dt değişkeninden yıl bilgisini al
	  $scope.date1 =  new Date(yil,0,0);//html de date1 alanına yılı , yılın ilk ayını , yılın ilk gününü aktar
	  $scope.date2 = new Date();//html de date2 alanına bugunun tarihini aktar
	  //listele();
	  
	  $scope.getDate1 = function(){// html de getDate1 alanına basıldığında çalışan fonksiyon
		  var options = {date: new Date(),mode: 'date'};// Tarih alma option u 
		  function onSuccess(date) {$scope.date1 = date;}//datepicker den seçinlen tarihi date1 e aktar
		  function onError(error) { /* Android only*/ alert('Error: ' + error);}
		  datePicker.show(options, onSuccess, onError);//datepicker i aç
        }
      $scope.getDate2 = function(){var options = {date: new Date(),mode: 'date'};
      function onSuccess(date) {$scope.date2 = date;}
      function onError(error) { /* Android only*/alert('Error: ' + error);}
      datePicker.show(options, onSuccess, onError);
        }
      function listele (){//Yukarıda listele(); başındaki kommenti kaldırırsanız Burası ilk açışta çalışan kısım
	      var dateone =  new Date(2015,1,1);//veritabanında listeleme yapmak için tarih değişkeni 
	      dateone= $filter("date")($scope.date1, 'yyyy-MM-dd');//tarih değişkenine seçilendeğeri aktarma
	      var datetwo =  new Date();//veritabanında listeleme yapmak için tarih değişkeni 
	      datetwo= $filter("date")($scope.date2, 'yyyy-MM-dd');//tarih değişkenine seçilendeğeri aktarma
	      var musteri1 =  localStorage.getItem('musid');//Sorgusunu yapacağınız müşteri
	      var uril = httpurl+'harcamalarbonus.php?tarih1='+dateone+'&tarih2='+datetwo+'&must_id='+musteri1;
	      $http.get(uril).then(function(response){$scope.moneys=response.data;});
        }
        $scope.getir = function (){//Tarih seçimi kendiniz yaptığınızda çalışan kısım 
	        var dateone =  new Date(2013,1,1);
	        dateone= $filter("date")($scope.date1, 'yyyy-MM-dd');
	        var datetwo =  new Date(2013,1,1);
	        datetwo= $filter("date")($scope.date2, 'yyyy-MM-dd');
	        var musteri2 =  localStorage.getItem('musid');
	        var uril = httpurl+'harcamalarbonus.php?tarih1='+dateone+'&tarih2='+datetwo+'&must_id='+musteri2;
	        $http.get(uril).then(function(response){$scope.moneys=response.data;});
          }
    });