var page = 1,
    sortid = getUrlParam("sortid");

var firstIn = true;

var vm = new Vue({
    el: "#wrap",
    data: {
        // 新闻资讯
        newsData: [],
        sortData: [],
        sortid: sortid,
        opacity: 0
    },
    computed: {
        page: function() {
            return navActive();
        }
    },
    updated: function() {
        var _this = this;
        _this.$nextTick(function() { // Vue初始化完成

            if (firstIn) {
                var mySwiper = new Swiper('.nav', { // 资讯swiper
                    slidesPerView: "auto", //'auto'
                    centeredSlides: true,
                    onTransitionEnd: function(swiper) {
                        if (swiper.progress == 1) {
                            swiper.activeIndex = swiper.slides.length - 1
                        }
                    }
                });

                var _index = $(".swiper-slide.active").index();

                mySwiper.slideTo(_index, 0, false);
                _this.opacity = 1;

                firstIn = false;
            }
        });
    },
});

var more = new GetMore({
    cb: function() {
        var _this = this;
        $.ajax({
            // type: "post",
            type: "get",
            url: "/m/data/newsListData.json",
            async: true,
            dataType: "json",
            data: { 'sortid': sortid, 'page': page },
            success: function(r) {
                var result = r;
                vm.sortData = result.sortEntities;
                if (!!result.newsEntities && result.newsEntities.length > 0) {
                    page = page + 1;
                    vm.newsData = vm.newsData.concat(result.newsEntities);
                    if (result.newsEntities.length < 10) { // 数据少于10条也表示无数据了
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
