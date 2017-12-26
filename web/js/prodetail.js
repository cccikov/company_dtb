function star(obj) {
    var that = $(obj);
    if (!that.is(".active")) {
        that.addClass("active");
    } else {
        that.removeClass("active");
    }
}

/* 提示显示 */
function showTips() {
    $(".mask").attr("class", "mask active white-mask");
    $(".tips-float").addClass("active");
}

/* 提示隐藏 */
function hideTips() {
    $(".mask").attr("class", "mask");
    $(".tips-float").removeClass("active");
}


/* 提示2显示 */
function showTips2() {
    $(".mask").attr("class", "mask active black-mask");
    $(".tips2-float").addClass("active");
}

/* 提示2隐藏 */
function hideTips2() {
    $(".mask").attr("class", "mask");
    $(".tips2-float").removeClass("active");
}

/* 提示3显示 */
function showTips3() {
    $(".mask").attr("class", "mask active black-mask");
    $(".tips3-float").addClass("active");
}

/* 提示3隐藏 */
function hideTips3() {
    $(".mask").attr("class", "mask");
    $(".tips3-float").removeClass("active");
}

$(function() {
    $("#bookmark").click(function() {
        var flag = $("#flag").val();
        if (flag == 0) {
            showLogin(true);
        } else {
            if (!$(this).is(".active")) {
                $.ajax({
                    type: "POST",
                    url: "/project/bookmarkProject",
                    data: {
                        "projid": $("#projid").val()
                    },
                    success: function(r) {
                        var obj = eval('(' + r + ')');
                        if (obj.code == "500") {
                            alert(obj.msg)
                        } else {
                            $("#bookmark").addClass("active");
                        }
                    }
                });
            } else {
                $.ajax({
                    type: "POST",
                    url: "/project/unbookmarkProject",
                    data: {
                        "projid": $("#projid").val()
                    },
                    success: function(r) {
                        var obj = eval('(' + r + ')');
                        if (obj.code == "500") {
                            alert(obj.msg)
                        } else {
                            $("#bookmark").removeClass("active");
                        }
                    }
                });
            }
        }
    });

    /**
     * 通知公告
     */
    $(".notice-content").each(function(i, k) {
        var _this = $(k);
        _this.attr("data-height", _this.height());
        _this.parents("a").addClass("hide");
    });
    $(".notice a").on("click", function() {
        var _this = $(this);
        var son = _this.find(".notice-content");
        var sonH = son.attr("data-height");
        if (!_this.is(".active")) {
            son.css({
                height: sonH,
                padding: "6px"
            });
            _this.addClass("active");
        } else {
            son.css({
                height: 0,
                padding: "0 6px"
            });
            _this.removeClass("active");
        }
    });

    /* 滚动条检测 */
    // ! function () {
    //     var ele = $(".fixed-box");
    //     var posi = $(".scrollWhere").offset().top; // 文档坐标
    //     window.addEventListener("scroll", function () {
    //         var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //         var posi2 = $(".scrollWhere2").offset().top; // 文档坐标
    //         var rightHeight = ele.height(); // 要实时获取 , 因为有些时候图片还没有加载出来 , 高度会变
    //         // posi - scrollTop < 0 => scrollTop > posi
    //         // posi2 - scrollTop < rightHeight => scrollTop > posi2-rightHeight
    //         if (scrollTop > posi && scrollTop < posi2 - rightHeight) {
    //             ele.removeClass("absolute").addClass("fixed");
    //         } else if (scrollTop > posi2 - rightHeight) {
    //             ele.removeClass("fixed").addClass("absolute");
    //         } else {
    //             ele.removeClass("fixed absolute");
    //         }
    //     }, false);
    // }();

});
