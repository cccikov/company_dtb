var vm = new Vue({
    el: "#wrap",
    data: {

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


