var qstatus = getUrlParam("qstatus");
var page = 1;
var vm = new Vue({
	data: {
		odOrderEntities: [],
    },
    el: "#wrap",
    computed: {
        page: function() {
            return navActive();
        }
    },
    methods: {
    	contract: function(projid,orderid,type) {
    	    $.ajax({
    	        type: "POST",
    	        url: "/contract/create",
    	        data: { "projid": projid, "orderid": orderid, "type": type },
    	        success: function(r) {
    	            var result = eval('(' + r + ')');
    	            if (result.code == "0") {
    	                setTimeout("javascript:location.href='" + result.sign_url + "'", 2000);
    	            } else {
    	                if (result.error == "1") {
    	                    location.href = result.URL
    	                } else {
    	                    alert("跳转合同签署界面失败，请刷新重新操作")
    	                }
    	            }
    	        }
    	    });
    	}
	}
});

var more = new GetMore({
    cb: function() {
        var _this = this;
        $.ajax({
            type: "post",
            url: "/m/myproject",
            async: true,
            dataType: "json",
            data: { 'qstatus': qstatus, 'page': page },
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

var mySwiper = new Swiper('.swiper-container', {
    slidesPerView: "auto", //'auto'
    centeredSlides : true,
    //slidesPerView : 3.7,
    //如果设置为auto（例如制作全屏展示时的页脚部分），最后一个slide在键盘或鼠标滚动时可能会直接跳到倒数第三个slide，
    //此时可以手动设置activeIndex解决，如下
    onTransitionEnd: function(swiper) {
        if (swiper.progress == 1) {
            swiper.activeIndex = swiper.slides.length - 1
        }
    }
});

if (qstatus == "") {
    $("a[qstatus=all]").addClass("active");
} else {
    var index = $("a[qstatus=" + qstatus + "]").addClass("active").index();
    mySwiper.slideTo(index, 0, false);
}