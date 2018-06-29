var page = 1;
var vm = new Vue({
    el: "#wrap",
    data: {
    	ctContractEntities:[]
    },
    methods: {

    }
});


var more = new GetMore({
    cb: function() {
        var _this = this;
        $.ajax({
            type: "post",
            url: "/m/mycontract",
            async: true,
            dataType: "json",
            data: {'page': page },
            success: function(r) {
                var result = r;
                if (!!result.ctContractEntities && result.ctContractEntities.length > 0) {
                    page = page + 1;
                    vm.ctContractEntities = vm.ctContractEntities.concat(result.ctContractEntities);
                    if (result.ctContractEntities.length < 9) { // 数据少于9条也表示无数据了
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