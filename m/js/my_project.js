var qstatus = getUrlParam("qstatus");
var vm = new Vue({
    el: "#wrap"
});

var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: "auto", //'auto'
    centeredSlides : true,
    //slidesPerView : 3.7,
    //如果设置为auto（例如制作全屏展示时的页脚部分），最后一个slide在键盘或鼠标滚动时可能会直接跳到倒数第三个slide，
    //此时可以手动设置activeIndex解决，如下
    onTransitionEnd: function(swiper) {
        if (swiper.progress == 1) {
            swiper.activeIndex = swiper.slides.length - 1
        }
    }
});

if (qstatus == "") {
    $("a[qstatus=all]").addClass("active");
} else {
    var index = $("a[qstatus=" + qstatus + "]").addClass("active").index();
    mySwiper.slideTo(index, 0, false);
}