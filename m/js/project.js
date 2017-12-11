var qstatus = getUrlParam("qstatus");
var page = 1;

var vm = new Vue({
    el: "#wrap",
    data: {
        projectListData: [],
    },
    methods: {

    },
    computed: {
        page: function() {
            return navActive();
        }
    }
});


var more = new GetMore({
    cb: function() {
        var _this = this;
        $.ajax({
            // type: "post",
            url: "/m/data/projectListData.json",
            async: true,
            dataType: "json",
            success: function(r) {
                var result = r;
                if (!!result.pjInfoList && result.pjInfoList.length > 0) {
                    page = page + 1;
                    vm.projectListData = vm.projectListData.concat(result.pjInfoList);
                    if (result.pjInfoList.length < 10) { // 数据少于10条也表示无数据了
                        $(".tips .loading").removeClass("active").siblings().addClass("active");
                    } else {
                        _this.loading = false;
                    }
                } else {
                    $(".tips .loading").removeClass("active").siblings().addClass("active");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest, textStatus, errorThrown)
            }
        });
    }
});
more.cb();


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
