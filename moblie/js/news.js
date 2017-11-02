var vm = new Vue({
    el: "#wrap",
    data: {
        // 新闻资讯
        newsData: [6, 7, 8]
    },
    methods: {
        load: function() {
            console.log("load好");
        }
    },
    computed: {
        page: function() {
            return navActive();
        }
    }
});

$(function() {

    var more = new GetMore({
        cb: function() {
            var _this = this;
            setTimeout(function() {
                if (Math.random() > 0.5) {
                    vm.newsData = vm.newsData.concat([1, 2, 3, 4]);
                    _this.loading = false;
                } else {
                    $(".tips .loading").removeClass("active").siblings().addClass("active");
                }
            }, 1000);
        }
    });


});
