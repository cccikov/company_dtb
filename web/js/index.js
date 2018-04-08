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
        var mySwiper = new Swiper('.swiper-container', {
            // effect: 'fade', // 切换效果
            // loop: true,
            autoplay: 5000,
            autoHeight: true,
            // 如果需要分页器
            pagination: '.swiper-pagination',
            paginationClickable: true,
            onInit: function(swiper) {
                swiper.slides.height(swiper.width * 0.2604166666666667);
            }
        });


        $(".progress-canvas").circleProgress({
            size: 76,
            startAngle: -Math.PI / 2,
            thickness: 5,
            fill: {
                gradient: ["#ff8a35", "#ff3b35"],
            },
        });

    }



});