app.controller('dynamicmodalDiaCtrl', function ($scope, $http, $rootScope, ngDialog, localStorageService, $location) {
    dynaddctrl = 0;
    $scope.dynamic = dynamicMenu;
    $scope.dynamicfiyat = dynamicMenu.dmfiyat;
    $scope.degisenSecim = function () {
        Menuİnfo();
    }
    function Menuİnfo() {
        var dynlength = $scope.dynamicMenu.length;
        var fy = 0.00;
        for (var i = 0; i <= dynlength - 1; i++) {
            if (!$scope.dynamicMenu[i].secim) { continue }
            var sfy = $scope.dynamicMenu[i].secim;
            sfy = sfy.arttirim || 0;
            fy = parseFloat(fy) + parseFloat(sfy);
            //alert(JSON.stringify(sfy))

        }
        $scope.dynamic = dynamicMenu;
        var df = dynamicMenu.dmfiyat;
        df = parseLocalNum(df);
        var tf = parseFloat(fy) + df;
        var fn = tf.toFixed(2);
        $scope.dynamicfiyat = fn;
    }
    cart = localStorageService.get('restaurant-cart') || [];
    var dynagrup = [];
    $scope.dinamikekle = function () {

    }
    function getNextIndexCart() {
        var zmn = new Date();
        zmn = zmn.getTime();
        return zmn;
    }
    for (var i = 0; i <= dynamicMenuJsn.length - 1; i++) {
        if (i == 0) {
            var gid = dynamicMenuJsn[i].g_id
            var gad = dynamicMenuJsn[i].g_adi;
            var ext = dynamicMenuJsn[i].extra;
            var icr = [];
            for (var a = 0; a <= dynamicMenuJsn.length - 1; a++) {
                if (gid == dynamicMenuJsn[a].g_id) {
                    var sid = dynamicMenuJsn[a].sp_id;
                    var adi = dynamicMenuJsn[a].adi;
                    var mik = dynamicMenuJsn[a].miktar;
                    var art = dynamicMenuJsn[a].arttirim;
                    /*var adilng = adi.length;
                    var lng = 30;
                    var lngspace = '    ';
                    for (var x = 0; x <= lng - adilng; x++) {
                        lngspace = lngspace + '     ';
                    }*/
                    if (parseFloat(art) > 0) { adi = adi  +' +' + art + ' TL'; }
                    var a_jsn = { 'sp_id': sid, 'adi': adi, 'miktar': mik, 'arttirim': art };
                    icr.push(a_jsn);
                    lngspace = ' ';

                }
            }

            var jsn = { 'g_id': gid, 'g_adi': gad, 'extra': ext, 'icerik': icr, 'secim': null };
            dynagrup.push(jsn);

        }
        if (i != 0 && dynamicMenuJsn[i - 1].g_id != dynamicMenuJsn[i].g_id) {
            var gid = dynamicMenuJsn[i].g_id
            var gad = dynamicMenuJsn[i].g_adi;
            var ext = dynamicMenuJsn[i].extra;
            var icr = [];
            for (var a = 0; a <= dynamicMenuJsn.length - 1; a++) {
                if (gid == dynamicMenuJsn[a].g_id) {
                    var sid = dynamicMenuJsn[a].sp_id;
                    var adi = dynamicMenuJsn[a].adi;
                    var mik = dynamicMenuJsn[a].miktar;
                    var art = dynamicMenuJsn[a].arttirim;
                    if (parseFloat(art) > 0) { adi = adi + '      +' + art + '  TL'; }
                    var a_jsn = { 'sp_id': sid, 'adi': adi, 'miktar': mik, 'arttirim': art };
                    icr.push(a_jsn);

                }
            }

            var jsn = { 'g_id': gid, 'g_adi': gad, 'extra': ext, 'icerik': icr };
            dynagrup.push(jsn);

        }
    }
    //alert(JSON.stringify(dynagrup))
    $scope.dynamicMenu = dynagrup;
    $scope.sepeteAtDynax = function () {
        var ctr = dynaCtr();
        if (ctr) { sepeteAtDyna(dynamicMenu, true, 0); $scope.hatalar = false; } else { $scope.hatalar = true }

    }
    function dynaCtr() {
        var dynlength = $scope.dynamicMenu.length;
        var rt = true;
        for (var i = 0; i <= dynlength - 1; i++) {
            var scm = $scope.dynamicMenu[i].secim;
            if (!scm) { rt = false; break; }
        }
        return rt;
    }
    function sepeteAtDyna(urun, dyn, seviye) {
        var dynlength = $scope.dynamicMenu.length;
        var fy = urun.dmfiyat;
        fy = parseLocalNum(fy);
        for (var i = 0; i <= dynlength - 1; i++) {
            var sfy = $scope.dynamicMenu[i].secim;
            fy = parseFloat(fy) + parseFloat(sfy.arttirim);
            //alert(JSON.stringify(sfy.arttirim))

        }

        fy = fy.toFixed(2);
        var urunbilgi = { 'id': urun.dmid, 'adi': urun.pname, 'fiyat': fy, 'adet': dynamicPrice, 'dynamic': dyn, 'seviye': seviye, 'index': dynamicIndx, 'dynasecim': dinamikSecimHafiza() }

        sepeteat2(urunbilgi);
    }
    function sepeteAtDynaUrun(urun, dyn, seviye) {
        //alert(JSON.stringify(urun));
        var fy = 0.00;
        var urunbilgi = { 'id': urun.sp_id, 'adi': urun.adi, 'fiyat': fy, 'adet': dynamicPrice, 'dynamic': dyn, 'seviye': seviye, 'index': dynamicIndx, 'dynasecim': [] }

        sepeteat2(urunbilgi);
    }
        function sepeteat2(urunbilgi) {
            var ac_id = localStorageService.get('accountid');
            var resid = localStorageService.get('resid') || 0;
            if (cart.length == 0) {
                if (urunbilgi.adet) {
                    localStorageService.set('resid', ac_id);
                    saveToCart(urunbilgi, urunbilgi.adet);
                    return;
                }
            } else if (resid != 0 && resid == ac_id) {
                if (urunbilgi.adet) {
                    saveToCart(urunbilgi, urunbilgi.adet);
                    return;
                }
            } else if (resid == 0) {
                if (urunbilgi.adet) {
                    localStorageService.set('resid', ac_id);
                    saveToCart(urunbilgi, urunbilgi.adet);
                    return;
                }
            } else if (resid != ac_id) {
                alert('Sepetinizde farklı bir Restaurant a ait ürün var ekleme yapamazsınız')
            }

        }
    function saveToCart(urunbilgi, adet) {

        cart = localStorageService.get('restaurant-cart');
        cart.push(urunbilgi);
        localStorageService.set('restaurant-cart', cart);
        ngDialog.close();
        $rootScope.$emit('cartGncl');
        //alert(JSON.stringify(cart));
        if (dynaddctrl == 0) { dynaddctrl = 1; dinamikSecim(); }


    }
    function dinamikSecimHafiza() {
        var secimler = [];
        var dynlength = $scope.dynamicMenu.length;

        for (var i = 0; i <= dynlength - 1; i++) {
            secimler.push($scope.dynamicMenu[i].secim);
        }
        //alert(JSON.stringify(secimler));
        return secimler;

    }
    function dinamikSecim() {
        var secimler = [];
        var dynlength = $scope.dynamicMenu.length;

        for (var i = 0; i <= dynlength - 1; i++) {
            secimler.push($scope.dynamicMenu[i].secim);
        }
        //alert(JSON.stringify(secimler));
        var secimlength = secimler.length;
        for (var a = 0; a <= secimlength - 1; a++) {
            sepeteAtDynaUrun(secimler[a], false, 1);
            //alert(JSON.stringify(secimler[a]));
        }
    }



});