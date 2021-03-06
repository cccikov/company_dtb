var vm = new Vue({
    el: "#wrap",
    data: {
        projectListData: [{
            id: 1,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "project_detail.html",
            img: "./img/test/test02.png",
            percent: 50,
            status: "finish"
        }, {
            id: 2,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "project_detail.html",
            img: "./img/test/test02.png",
            percent: 50,
            status: "yr"
        }, {
            id: 3,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "project_detail.html",
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
            $.ajax({
                type: "get",
                url: "data/testData.json",
                async: true,
                dataType: "json",
                success: function(data) {
                    vm.projectListData = vm.projectListData.concat(data);
                    _this.loading = false;

                    // 没有数据后
                    // _this.loading不设置为false
                    //  $(".tips .loading").removeClass("active").siblings().addClass("active");
                },
                error:function(XMLHttpRequest, textStatus, errorThrown){
                    console.log(XMLHttpRequest, textStatus, errorThrown)
                }
            });

        }
    });


});



