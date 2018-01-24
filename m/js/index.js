var carouse_swiper;
var vm = new Vue({
    el: "#wrap",
    data: {
        //轮播
        carouselListData: [],

        // 项目列表
        projectListData: [],

        // 完成项目
        finishProjectListData: [],

        // 新闻资讯
        newsData: [],

        //通告
        noticeData: []

    },
    computed: {
        page: function () {
            return navActive();
        },
        noticeComputedData: function () {
            var _this = this;
            var originArr = _this.noticeData;
            var newArr = [];
            var smallArr = [];
            originArr.forEach(function (val, index) {
                smallArr.push(val);
                if (index % 2 != 0) {
                    newArr.push(smallArr);
                    smallArr = [];
                }
            });
            if (smallArr.length > 0) { // 剩下单个的
                newArr.push(smallArr);
            }
            return newArr;
        }
    },
    methods: {
        getdata: function () {
            $.get("/m/data/indexData.json", function (r) {
                r = JSON.stringify(r);



                var result = JSON.parse(r);
                vm.carouselListData = result.CarouselList;
                vm.projectListData = result.ProjectList;
                vm.finishProjectListData = result.CompleteList;
                vm.newsData = result.newsEntities;
                vm.noticeData = result.noticeEntities;
            });
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            carouse_swiper = new Swiper('.carouse-swiper', { // 资讯swiper
                autoplay: 2000,
                spaceBetween: 12,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: false, //修改swiper的父元素时，自动初始化swiper
            });
        })
    },
    updated: function() {
        var _this = this;
        var carouse_h = (window.innerWidth - 24) / 3.84;
        Vue.nextTick(function() { // Vue初始化完成
            carouse_swiper.update();
            for (var i = 0, len = carouse_swiper.slides.length; i < len; i++) {
                var img = carouse_swiper.slides[i].getElementsByTagName("img")[0];
                img.style.width = "100%";
                img.style.height = carouse_swiper.width / 3.84+"px";
            }
        });
    },
});
vm.getdata();
