var vm = new Vue({
    el: "#wrap",
    data: {
        // 新闻资讯
        newsData: [1, 23, 4]
    },
    methods: {
        load: function () {
            console.log("load好");
        }
    }
});

setTimeout(function () {
    vm.newsData = [1, 2, 3, 4, 5];
}, 1000);