/**
 * 判断是否登录了
 */
$.ajax({
    "url": "/member/im/getPoints?num=" + Math.random(),
    success: function (result, textStatus, jqXHR) {
        try {
            JSON.parse(result); // 返回的不是json就是未登录
            vm.getdata();
        } catch (e) {
            console.log("未登录");
            var username = getCookie("lu");
            var password = getCookie("lp");
            if (username && password) {
                $.ajax({
                    url: "/m/mlogin?num" + Math.random(),
                    type: "post",
                    data: {
                        "tradername": username,
                        "password": password
                    },
                    success: function () {
                        console.log("登录成功");
                        vm.getdata();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        // 通常 textStatus 和 errorThrown 之中
                        // 只有一个会包含信息
                        console.log(XMLHttpRequest, textStatus, errorThrown);
                    }
                });
                return;
            }
            vm.getdata();
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        // 通常 textStatus 和 errorThrown 之中
        // 只有一个会包含信息
        console.log(XMLHttpRequest, textStatus, errorThrown);
    }
})


var carouse_swiper = null;
var vm = new Vue({
    // el: "#wrap",
    data: {
        //轮播
        carouselListData: [],

        // 项目列表
        projectListData: [],

        // 新闻资讯
        newsData: [],

        //用户
        tbuser: null

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
            $.get("/m/getIndexData", function (r) {
                var result = JSON.parse(r);
                vm.carouselListData = result.CarouselList;
                vm.projectListData = result.ProjectList;
                vm.newsData = result.newsEntities;
                vm.tbuser = result.tbuser;
                vm.jsessionid = result.jsessionid;
                vm.loginUrl = result.loginUrl;
                if (!vm.$el) {
                    vm.$mount("#wrap");
                };
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                var str = "";

                if (vm.tbuser != null) {
                    str = "{\"type\": \"getToken\",\"data\":\"" + vm.tbuser.token + "\",\"jsessionid\":\"" + vm.jsessionid + "\",\"loginUrl\":\"" + vm.loginUrl + "\",\"imid\":\"" + vm.tbuser.imid + "\"}";
                }
                if (str != "") {
                    if (isAndroid) {
                        android.postMessage(str);
                    } else if (isiOS) {
                        window.webkit.messageHandlers.app.postMessage(str);
                    }
                }

            });
        },
        changeMillion: function (amount) {
            if (amount > 10000) {
                return amount / 10000 + "万";
            } else {
                return amount;
            }
        },
        more_project: function () {
            var obj = {
                type: "switch",
                target: 2
            }
            appAction(obj, function () {
                window.location.href = "project.html";
            });
        },
        more_news: function () {
            var obj = {
                type: "switch",
                target: 3
            }
            appAction(obj, function () {
                window.location.href = "news.html";
            });
        },
        changUrl: function (url) {
            // var path = url.match(/www.dtb.cn\/(.+)/)[1];
            var path = url;
            if (path.match(/projdetail\/(.+)/)) {
                var id = path.match(/projdetail\/(.+)/)[1];
                var newUrl = "/m/page/project_detail.html?id=" + id
            } else if (path.match(/newsdetail\/(.+)/)) {
                var id = path.match(/newsdetail\/(.+)/)[1];
                var newUrl = "/m/page/news_detail.html?id=" + id
            } else if (path.match(/projpage\/(.+?)\//)) {
                var id = path.match(/projpage\/(.+?)\//)[1];
                if (id == "all") {
                    var newUrl = "/m/page/project.html"
                } else {
                    var newUrl = "/m/page/project.html?qstatus=" + id
                }
            }
            return newUrl;
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            carouse_swiper = new Swiper('.carouse-swiper', { // 资讯swiper
                autoplay: 2000,
                spaceBetween: 12,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: false, //修改swiper的父元素时，自动初始化swiper
            });
        })
    },
    updated: function () {
        var _this = this;
        var carouse_h = (window.innerWidth - 24) / 3.84;
        Vue.nextTick(function () { // Vue初始化完成
            carouse_swiper.update();
            for (var i = 0, len = carouse_swiper.slides.length; i < len; i++) {
                carouse_swiper.slides[i].style.height = carouse_swiper.width / 3.84 + "px";
            }
        });
    },
});