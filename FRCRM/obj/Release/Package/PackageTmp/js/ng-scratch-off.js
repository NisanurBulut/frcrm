/* This is a port of code by Wes Pickett. Original code here: http://wespickett.com/blog#feb0212 */
angular.module('shoppinpal.scratch-off', [])
    .provider('scratchOffConfig', function(){
        var waitForEvent,
            hiddenText = "You win!",
            hiddenTextColor = "#74b96a",
            hiddenTextFont = "16px Arial",
            hiddenBackgroundColor = "#000000",
            hiddenBackgroundImage = true,
            scratchOffColor = "#7d7c83",
            scratchOffImage = false,
            scratchOffText = "Scratch Me!",
            scratchOffTextColor = "#80fe01",
            scratchOffTextFont = "16px Arial";

        this.$get = function(){
            return {
                waitForEvent: waitForEvent,
                hiddenText: hiddenText,
                hiddenTextColor: hiddenTextColor,
                hiddenTextFont: hiddenTextFont,
                hiddenBackgroundColor: hiddenBackgroundColor,
                hiddenBackgroundImage: hiddenBackgroundImage,
                scratchOffColor: scratchOffColor,
                scratchOffImage: scratchOffImage,
                scratchOffText: scratchOffText,
                scratchOffTextColor: scratchOffTextColor,
                scratchOffTextFont: scratchOffTextFont
            };
        }
    })
    .directive("scratchOff", ['scratchOffConfig', function(scratchOffConfig){
        var html = '<div id="scratchOffContainer{{ $id }}">' +
                        '<canvas id="hiddenCanvas{{ $id }}" width="{{ canvasWidth }}" height="{{ canvasHeight }}">' +
                        '</canvas>' +
                        '<canvas id="scratchOffCanvas{{ $id }}" width="{{ canvasWidth }}" height="{{ canvasHeight }}">' +
                        '</canvas>' +
                   '</div>';

        return {
            restrict: 'EAC',
            replace: true,
            template: html ,
            scope: {
                hiddenText: "@",
                hiddenTextColor: "@",
                hiddenTextFont: "@",
                hiddenBackgroundColor: "@",
                hiddenBackgroundImage: "@",
                scratchOffColor: "@",
                scratchOffImage: "@",
                scratchOffText: "@",
                scratchOffTextColor: "@",
                scratchOffTextFont: "@",
                canvasWidth: "@width",
                canvasHeight: "@height"
            },
            link: function link (scope, elem, attrs){
                var config = scratchOffConfig;
                var hiddenText = scope.hiddenText || config.hiddenText,
                    hiddenTextColor = scope.hiddenTextColor || config.hiddenTextColor,
                    hiddenTextFont = scope.hiddenTextFont || config.hiddenTextFont,
                    hiddenBackgroundColor = scope.hiddenBackgroundColor || config.hiddenBackgroundColor,
                    hiddenBackgroundImage = scope.hiddenBackgroundImage || config.hiddenBackgroundImage,
                    scratchOffColor = scope.scratchOffColor || config.scratchOffColor,
                    scratchOffImage = scope.scratchOffImage || config.scratchOffImage,
                    scratchOffText = scope.scratchOffText || config.scratchOffText,
                    scratchOffTextColor = scope.scratchOffTextColor || config.scratchOffTextColor,
                    scratchOffTextFont = scope.scratchOffTextFont || config.scratchOffTextFont

                var scratchOffContext,
                     hiddenContext,
                     w,
                     h,
                     canvas,
                     canvasHidden,
                     isMouseDown = false,
                     scratchCount = 0;

                function init() {
                    var scratchOffCanvas = document.getElementById("scratchOffCanvas" + scope.$id);
                    var hiddenCanvas = document.getElementById("hiddenCanvas" + scope.$id);
                    scratchOffContext = scratchOffCanvas.getContext("2d");
                    hiddenContext = hiddenCanvas.getContext("2d");
                    w = scratchOffCanvas.width;
                    h = scratchOffCanvas.height;

                    var isTouchDevice = !!("ontouchstart" in window);
                    var downEvent = isTouchDevice ? "touchstart" : "mousedown";
                    var moveEvent = isTouchDevice ? "touchmove" : "mousemove";
                    var endEvent = isTouchDevice ? "touchend" : "mouseup";

                    canvas = angular.element(scratchOffCanvas);
                    canvas.css({
                        'position':'absolute',
                        'width':'90%',
                        'top': hiddenContext.canvas.offsetTop + 'px',
                        'left': hiddenContext.canvas.offsetLeft + 'px',
                        'opacity': '1',
                        'transition': 'opacity .25s ease-out',
                        '-moz-transition': 'opacity .25s ease-out',
                        '-webkit-transition': 'opacity .25s ease-out',
                        'margin':'5%',
                    });
                    canvasHidden = angular.element(hiddenCanvas);
                    canvasHidden.css({
                        /*'position':'absolute',*/
                        'width':'90%',   
                        'margin':'5%',
                                             
                    });


                    canvas.bind(downEvent, function(e){
                        isMouseDown = true;
                        var pageX = isTouchDevice ? e.touches[0].pageX : e.pageX;
                        var pageY = isTouchDevice ? e.touches[0].pageY : e.pageY;
                        var relX = pageX - this.offsetLeft;
                        var relY = pageY - this.offsetTop;
                        scratchOff(relX, relY, true);
                    });

                    canvas.bind(moveEvent, function(e){
                        var pageX = isTouchDevice ? e.touches[0].pageX : e.pageX;
                        var pageY = isTouchDevice ? e.touches[0].pageY : e.pageY;
                        var relX = pageX - this.offsetLeft;
                        var relY = pageY - this.offsetTop;
                        if (isMouseDown) scratchOff(relX, relY, false);
                    });

                    canvas.bind(endEvent, function(e){
                        isMouseDown = false;
                    });
                    draw();
                }

                function draw() {
                    if(scratchOffImage){
                        var img = document.getElementById(scratchOffImage);
                        scratchOffContext.drawImage(img, 0, 0);
                        //TODO: May want to offer clipping and/or stretch/reduce options here.
                    } else {
                        scratchOffContext.fillStyle = scratchOffColor;
                        scratchOffContext.fillRect(0, 0, w, h);
                    }

                    scratchOffContext.fillStyle = scratchOffTextColor;
                    scratchOffContext.font = scratchOffTextFont;
                    scratchOffContext.textAlign = "center";
                    scratchOffContext.textBaseline = "middle";
                    scratchOffContext.fillText(scratchOffText, w / 2, h / 2, w * 0.8);

                    if(hiddenBackgroundImage) {
                        var hiddenImg = document.getElementById(hiddenBackgroundImage);
                        hiddenContext.drawImage(hiddenImg, 0, 0);
                    } else {
                        hiddenContext.fillStyle = hiddenBackgroundColor;
                        hiddenContext.fillRect(0, 0, w, h);
                    }

                    hiddenContext.fillStyle = hiddenTextColor;
                    hiddenContext.font = hiddenTextFont;
                    hiddenContext.textAlign = "center";
                    hiddenContext.textBaseline = "middle";
                    hiddenContext.fillText(hiddenText, w / 2, h / 2, w * 0.8);
                }

                function scratchOff(x, y)
                {
                    var scX,
                        scH,
                        x2,
                        y2,
                        d,
                        center,
                        a = scratchOffContext.createImageData(1,1);

                    x = x - 25;
                    y = y - 25;

                    scratchCount++;
                    scX = scY = 50;
                    center = scX/2;

                    scratchOffContext.save();
                    a.data[3] = 0;

                    for (sy = 0; sy < scY; sy++) {
                        for (sx = 0; sx < scX; sx++) {

                            x2 = sx - center;
                            y2 = sy - center;
                            d = Math.sqrt(x2*x2 + y2*y2);

                            if(d < 15){
                                if(Math.random()*100 < 65){
                                    scratchOffContext.putImageData(a,x+sx,y+sy);
                                }
                            }
                            if(d < 10){
                                if(Math.random()*100 < 75){
                                    scratchOffContext.putImageData(a,x+sx,y+sy);
                                }
                            }
                            if(d < 5){
                                if(Math.random()*100 < 100){
                                    scratchOffContext.putImageData(a,x+sx,y+sy);
                                }
                            }
                        }
                    }
                    scratchOffContext.restore();
                    if(scratchCount > 100){

                        var myImageData = scratchOffContext.getImageData(0, 0, w, h);
                        var transparencyCount = 0;

                        for(var i = 3; i < w*h*4; i +=4){
                            if (myImageData.data[i] === 0){
                                transparencyCount++;
                            }
                        }

                        if (transparencyCount > w*h*0.4) {
                            canvas.css({'opacity': '0'});
                        }
                        scratchCount = 0;
                    }
                }

                if(config.waitForEvent){
                    scope.$parent.$on(config.waitForEvent, function() {
                        init();
                    });
                } else {
                    angular.element(document).ready(function(){
                        init();
                    });
                }
            }
        };
    }]);