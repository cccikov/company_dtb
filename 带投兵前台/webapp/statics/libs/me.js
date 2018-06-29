function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

function modify() {
    $(".mask").add(".password-float").addClass("active");
}

function cancel() {
    $(".mask").add(".password-float").removeClass("active");
}

function setScrollTop(top, until) {
    document.documentElement.scrollTop = document.body.scrollTop = top;
    setTimeout(function() { // 虽然是在window.onload里面 , 但是有时页面进入的时候 , 还是设置不成功 , 初步猜测 , 可能是页面虽然加载好 , 但是还没有渲染完成, 还没有滚动条 , 所以设置失败 ; 特别是刷新的时候,  如果是直接跳转过来还好
        if (getScrollTop() != top && until) { // 判断是否设置值 , 不是的话重新设置 , 这个判断只能是放在定时器里面 , 因为如果是直接在外面判断的话 , 可能由于刚设置的原因 , getScrollTop()是等于top的
            /*console.log("执行");*/
            setScrollTop(top);
        }
    }, 16.7); // 经过试验 其实定时器时间设为1都也只是执行一次 ,
    return getScrollTop() == top;
}

function iframeFull() {
    setScrollTop(0);
    $("#ifr").css("transition","opacity 0s").off("load").css("opacity", "0").height("auto").on("load", function() {
        var $this = $(this);

        setScrollTop(0);
        $this.css("opacity", "0").height("auto"); // 这里的height是为让那些直接改变ifr href的链接也有特效

        var obj = $(window.frames["ifr"].document);
        $this.css("transition","opacity 0.3s");
        $this.height(obj.outerHeight()).css("opacity", "1");
    });
}

$(function() {

    $(".main-left ul li a").on("click", function(e) {
        e.preventDefault();
        $(".main-left ul li a").removeClass("active");
        var _this = $(this).addClass("active");
        var url = _this.attr("href");
        $("#ifr").attr("src", url);
        iframeFull();
    });


    iframeFull();

    if (!!$("#ifr") && !!getUrlParam("frame")) {
        var framename = getUrlParam("frame");
        $(".main-left a").removeClass("active");
        $(".main-left a[href='/member/" + framename + "']").addClass("active");
        $("#ifr").attr("src", "/member/" + framename);
    }
});


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