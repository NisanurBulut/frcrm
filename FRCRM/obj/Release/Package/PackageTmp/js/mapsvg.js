var illerjsonx = [
    { "plaka": "01", "sehirid": "adana" },
    { "plaka": "02", "sehirid": "adiyaman" },
    { "plaka": "03", "sehirid": "afyonkarahisar" },
    { "plaka": "04", "sehirid": "agri" },
    { "plaka": "05", "sehirid": "amasya" },
    { "plaka": "06", "sehirid": "ankara" },
    { "plaka": "07", "sehirid": "antalya" },
    { "plaka": "08", "sehirid": "artvin" },
    { "plaka": "09", "sehirid": "aydin" },
    { "plaka": "10", "sehirid": "balikesir" },
    { "plaka": "10", "sehirid": "balikesir2" },
    { "plaka": "11", "sehirid": "bilecik" },
    { "plaka": "12", "sehirid": "bingol" },
    { "plaka": "13", "sehirid": "bitlis" },
    { "plaka": "14", "sehirid": "bolu" },
    { "plaka": "15", "sehirid": "burdur" },
    { "plaka": "16", "sehirid": "bursa" },
    { "plaka": "17", "sehirid": "canakkale" },
    { "plaka": "17", "sehirid": "canakkale2" },
    { "plaka": "17", "sehirid": "canakkale3" },
    { "plaka": "18", "sehirid": "cankiri" },
    { "plaka": "19", "sehirid": "corum" },
    { "plaka": "20", "sehirid": "denizli" },
    { "plaka": "21", "sehirid": "diyarbakir" },
    { "plaka": "22", "sehirid": "edirne" },
    { "plaka": "23", "sehirid": "elazig" },
    { "plaka": "24", "sehirid": "erzincan" },
    { "plaka": "25", "sehirid": "erzurum" },
    { "plaka": "26", "sehirid": "eskisehir" },
    { "plaka": "27", "sehirid": "gaziantep" },
    { "plaka": "28", "sehirid": "giresun" },
    { "plaka": "29", "sehirid": "gumushane" },
    { "plaka": "30", "sehirid": "hakkari" },
    { "plaka": "31", "sehirid": "hatay" },
    { "plaka": "32", "sehirid": "isparta" },
    { "plaka": "33", "sehirid": "mersin" },
    { "plaka": "34", "sehirid": "ISTANBUL" },
    { "plaka": "34", "sehirid": "ISTANBUL2" },
    { "plaka": "34", "sehirid": "ISTANBUL3" },
    { "plaka": "35", "sehirid": "izmir" },
    { "plaka": "36", "sehirid": "kars" },
    { "plaka": "37", "sehirid": "kastamonu" },
    { "plaka": "38", "sehirid": "kayseri" },
    { "plaka": "39", "sehirid": "kirklareli" },
    { "plaka": "40", "sehirid": "kirsehir" },
    { "plaka": "41", "sehirid": "kocaeli" },
    { "plaka": "42", "sehirid": "konya" },
    { "plaka": "43", "sehirid": "kutahya" },
    { "plaka": "44", "sehirid": "malatya" },
    { "plaka": "45", "sehirid": "manisa" },
    { "plaka": "46", "sehirid": "kahramanmaras" },
    { "plaka": "47", "sehirid": "mardin" },
    { "plaka": "48", "sehirid": "mugla" },
    { "plaka": "49", "sehirid": "mus" },
    { "plaka": "50", "sehirid": "nevsehir" },
    { "plaka": "51", "sehirid": "nigde" },
    { "plaka": "52", "sehirid": "ordu" },
    { "plaka": "53", "sehirid": "rize" },
    { "plaka": "54", "sehirid": "sakarya" },
    { "plaka": "55", "sehirid": "samsun" },
    { "plaka": "56", "sehirid": "siirt" },
    { "plaka": "57", "sehirid": "sinop" },
    { "plaka": "58", "sehirid": "sivas" },
    { "plaka": "59", "sehirid": "tekirdag" },
    { "plaka": "60", "sehirid": "tokat" },
    { "plaka": "61", "sehirid": "trabzon" },
    { "plaka": "62", "sehirid": "tunceli" },
    { "plaka": "63", "sehirid": "sanliurfa" },
    { "plaka": "64", "sehirid": "usak" },
    { "plaka": "65", "sehirid": "van" },
    { "plaka": "66", "sehirid": "yozgat" },
    { "plaka": "67", "sehirid": "zonguldak" },
    { "plaka": "68", "sehirid": "aksaray" },
    { "plaka": "69", "sehirid": "bayburt" },
    { "plaka": "70", "sehirid": "karaman" },
    { "plaka": "71", "sehirid": "kirikkale" },
    { "plaka": "72", "sehirid": "batman" },
    { "plaka": "73", "sehirid": "sirnak" },
    { "plaka": "74", "sehirid": "bartin" },
    { "plaka": "75", "sehirid": "ardahan" },
    { "plaka": "76", "sehirid": "igdir" },
    { "plaka": "77", "sehirid": "yalova" },
    { "plaka": "78", "sehirid": "karabuk" },
    { "plaka": "79", "sehirid": "kilis" },
    { "plaka": "80", "sehirid": "osmaniye" },
    { "plaka": "81", "sehirid": "duzce" }
];
app.controller('mapsvgctrl', function ($scope, $rootScope, $http, localStorageService, $location) {
    var jsn;
    $http.post('Default.aspx/GetCitysx', '{}').success(function (data) {
        jsn = data.d;
        jsn = JSON.parse(jsn);
        for (var x = 0; x <= jsn.length; x++) {

            for (var i = 0; i <= illerjsonx.length - 1; i++) {
                //if (jsn[x].plate == illerjsonx[i].plaka) { alert(jsn[x].name + '-' + jsn[x].plate +'-'+ illerjsonx[i].plaka) }
                if (parseInt(jsn[x].plate) == parseInt(illerjsonx[i].plaka)) {
                    var elid = illerjsonx[i].sehirid;
                    var elm = document.getElementById(elid);
                    elm.style.fill = '#F72848';//getRandomColor();
                }

                    

            }
        }
        

    }).error();
    
    
    $scope.cityClick = function (plaka,il) {
        
        for (var i = 0; i <= jsn.length - 1; i++) {
            if (jsn[i].plate == plaka) {
                localStorageService.set('city_id',plaka);
                $location.path('/accounts');
            } else {
                $scope.alertmessage = il + ' Bölgesinde online siparişe açık mekan bulunmamaktadır';
            }
        }
    }
});