var vm = new Vue({
    el: "#wrap",
    data: {
        projectListData: [{
            id: 1,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "###",
            img: "./img/test/test02.png",
            percent: 50,
            status: "finish"
        }, {
            id: 2,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "###",
            img: "./img/test/test02.png",
            percent: 50,
            status: "yr"
        }, {
            id: 3,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "###",
            img: "./img/test/test02.png",
            percent: 50,
            status: "mj"
        }],
    },
    methods: {

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
                    vm.projectListData = vm.projectListData.concat(newData);
                    _this.loading = false;
                } else {
                    $(".tips .loading").removeClass("active").siblings().addClass("active");
                }
            }, 1000);
        }
    });


});



var newData = [{
    id: 1,
    title: "saas平台",
    abstract: "这是一个神奇的平台",
    link: "###",
    img: "./img/test/test02.png",
    percent: 50,
    status: "finish"
}, {
    id: 2,
    title: "saas平台",
    abstract: "这是一个神奇的平台",
    link: "###",
    img: "./img/test/test02.png",
    percent: 50,
    status: "yr"
}, {
    id: 3,
    title: "saas平台",
    abstract: "这是一个神奇的平台",
    link: "###",
    img: "./img/test/test02.png",
    percent: 50,
    status: "mj"
}]
