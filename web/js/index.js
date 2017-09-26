$(function(){
    // 轮播
    var mySwiper = new Swiper ('.swiper-container', {
        effect : 'fade', // 切换效果
        loop:true,
        // autoplay:2000,
        // 如果需要分页器
        pagination: '.swiper-pagination',
    });

    // tab切换
    var tab = new Tab({
        btn:$(".news-tab-btn a"),
        box:$(".news-tab-box"),
    });
});