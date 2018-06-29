var page = 1;
var vm = new Vue({
    el: "#wrap",
    data: {
    	odOrderEntities: [],
    },
    methods: {
        showStep: function(e,step, alink2, alink3, alink4) {
            e.stopPropagation();
            $(".mask").add(".manage-float").addClass("active");
            var arr = ["step1", "step2", "step3", "step4"];
            var activeArr = arr.slice(0, step);
            // 完成步骤操作
            activeArr.forEach(function(key) {
                var _this = $("." + key).addClass("finish");
                if (key == "step2" && !!alink2) {
                    _this.find("a").attr("href", alink2).addClass("active");
                }
                if (key == "step3" && !!alink3) {
                    _this.find("a").attr("href", alink3).addClass("active");
                }
                if (key == "step4" && !!alink4) {
                    _this.find("a").attr("href", alink4).addClass("active");
                }
            });
        },
        hideStep: function() {
            $(".mask").add(".manage-float").removeClass("active");
            // 清空数据
            $(".manage-float").find(".step").removeClass("finish");
            $(".manage-float").find("a").attr("href", "javascript:void(0)").removeClass("active");
        }
    }
});

var more = new GetMore({
    cb: function() {
        var _this = this;
        $.ajax({
            type: "post",
            url: "/m/mydelivery",
            async: true,
            dataType: "json",
            data: {'page': page },
            success: function(r) {
                var result = r;
                if (!!result.odOrderEntities && result.odOrderEntities.length > 0) {
                    page = page + 1;
                    vm.odOrderEntities = vm.odOrderEntities.concat(result.odOrderEntities);
                    if (result.odOrderEntities.length < 9) { // 数据少于9条也表示无数据了
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


