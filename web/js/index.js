$(function() {


    new Vue({
        "el": "#wrap",
        mounted: function() {
            this.$nextTick(function() {
                onload();
            });
        }
    });

    function onload() {

        // 轮播
        var banner = new Swiper('#banner', {
            // effect: 'fade', // 切换效果
            loop: true,
            autoplay: 5000,
            autoplayDisableOnInteraction:false,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            paginationClickable :true,
            onInit: function(swiper) {
                var _this = swiper;
                var height = _this.width * 0.2604166666666667;
                height = height > 500 ? 500 : height;
                _this.slides.height(height);
            }
        });

        indes_show = new Swiper('.index-swiper', {
            slidesPerView:"auto",
            spaceBetween : 10,
            onlyExternal : true,
            autoplay:5000,
            autoplayDisableOnInteraction:false,
            onInit: function(swiper) {
                var _this = swiper;
                if(_this.slides.length>4){
                    var dom = _this.container.parents(".index-swiper-contain");
                    var left = dom.find(".swiper-left");
                    var right = dom.find(".swiper-right");
                    left.on("click",function(){
                        _this.slidePrev() ;
                        index_swiper_btn_show_hide(swiper);
                    });
                    right.show().on("click",function(){
                        _this.slideNext() ;
                        index_swiper_btn_show_hide(swiper);
                    });
                }else{
                    _this.stopAutoplay();
                }
            },
            onAutoplay:function(swiper){
                index_swiper_btn_show_hide(swiper);
            }
        });

        // 当是第一个的时候 , 左按钮隐藏 ; 最后一个的时候 , 右按钮隐藏
        function index_swiper_btn_show_hide(swiper){
            var _this = swiper;
            var progress = _this.progress;
            var dom = _this.container.parents(".index-swiper-contain");
            var left = dom.find(".swiper-left");
            var right = dom.find(".swiper-right");
            if(progress == 0){
                left.hide();
                right.show();
            }else if(progress == 1){
                right.hide();
                left.show();
            }else{
                right.show();
                left.show();
            }
        }


        $(".short .num").each(function(index, value) {
            var _this = $(value);
            num_decrease(_this);
        });


        window.onscroll = function(){
            var scrollTop = getScrollTop();
            var winH = window.innerHeight;
            var markTop = $(".hot .more").offset().top;
            if(markTop <= scrollTop + winH){

                $(".progress-canvas").circleProgress({
                    size: 76,
                    startAngle: -Math.PI / 2,
                    thickness: 5,
                    fill: {
                        gradient: ["#ff8a35", "#ff3b35"],
                    },
                });

                $(".hot .num").each(function(index, value) {
                    var _this = $(value);
                    num_decrease(_this);
                });

                window.onscroll = null;
            }
        }

    }



});


// 是否整数
function isInteger(num) {
    // return num % 1 === 0;
    return Math.floor(num) === num;
}

// 小数点位数
function decimal_length(num) {
    num = num.toString();
    var point = num.indexOf(".");
    if (point != -1) {
        var integer = num.slice(0, point);
        var decimal = num.slice(point + 1);
    } else {
        var integer = num;
        var decimal = "";
    }
    return decimal.length;
}

function num_handle(num, digits) {
    // 数字处理 , 如果 digits为-1时 , 则只取整数部分 ; 如果是其他整数 , 则根据digits取多少位小数
    num = Number(num);
    digits = Math.floor(digits);
    if (digits == -1) {
        return Math.floor(num);
    } else {
        return num.toFixed(digits);
    }
}

function num_decrease(jqdom){
    var _this = jqdom;
    var max = _this.attr("data-val");
    if(!max){
        return false;
    }
    var current = 0;
    var per = (max - current) / 40;

    var digits;
    var flag = isInteger(max);
    if (flag) {
        digits = -1;
    } else {
        digits = decimal_length(max);
    }

    var timer = setInterval(function() {
        current = current + per;
        if (current >= max) {
            current = max;
            clearInterval(timer);
        }
        _this.html(num_handle(current, digits));
    }, 30);
}

/**
 * 获取滚动条位置处理
 * @return {number} 浏览器滚动条位置
 */
function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}