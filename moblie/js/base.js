function baseFontSize() {
    var maxFontSize = 20;
    var rootfontsize = window.innerWidth / 20;
    rootfontsize = rootfontsize > maxFontSize ? maxFontSize : rootfontsize;
    document.documentElement.style.fontSize = rootfontsize + "px"
    return rootfontsize;
}

function htmlFull() {
    var screenH = window.innerHeight;
    var body = document.body;
    body.style.minHeight = screenH + "px";
}

/* 按钮,标签动画 */
function alinkAnimation() {
    /* var alink = $("a").add(".alink").not(".no-animation");
    alink.addClass("btn-normal");
    alink.off("touchstart.ani").on("touchstart.ani", function(e) {
        // e.preventDefault();
        $(this).addClass("btn-active");
    });
    // 因为有可能不是在元素上面离开手指
    $(window).off("touchend.ani").on("touchend.ani",function(){
        alink.removeClass("btn-active");
    }); */
    var alink = $("a").add(".alink").not(".no-animation");
    alink.on("click", function () {
        var _this = this;
        _this.style.transition = "transform 0.1s,opacity 0.1s";
        _this.style.transform = "scale(0.95)";
        _this.style.opacity = "0.8";
        setTimeout(function () {
            _this.style.transform = "scale(1)";
            _this.style.opacity = "1";
        }, 100);
    });
}

/* 列表按钮动画 */
function listAnimation(e) {
    var _this = e.currentTarget;
    _this.style.transition = "transform 0.1s";
    _this.style.transform = "scale(0.95)";
    setTimeout(function () {
        _this.style.transform = "scale(1)";
    }, 100);
}

// 两个数组 除去arr1里面同时存在于两个数组的元素
function different(arr1, arr2) {
    var arr = [];
    arr1.forEach(function (val) {
        if (arr2.indexOf(val) == -1) {
            arr.push(val);
        }
    });
    return arr;
}

// 将类数组对象转为数组
var toArray = (function () {
    return Array.from ? Array.from : function (arrLike) {
        return [].slice.call(arrLike);
    }
})();

// 图片load好 , 一般来说图片load好 , 基本页面的其他内容也load好了
function imgAllLoad(imgArr, cb) {
    // 如果imgArr里面有img元素已经load好了 , 就不会再触发 load事件
    // 这里采用 different 函数 , arr2为以前已经load好的元素 , arr1是包含load好元素和未load好元素 , 取差集;
    var len = imgArr.length;
    var n = 0

    function handle() { // 事件监听器
        n++;
        if (n >= len) {
            cb && cb();
        }
    }
    for (var i = 0; i < len; i++) {
        imgArr[i].removeEventListener("load", handle);
        imgArr[i].addEventListener("load", handle, false);
    }
}

$(function () {
    alinkAnimation();
});