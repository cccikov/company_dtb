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
    // var alink = $("a").add(".alink").not(".no-animation");
    // alink.addClass("btn-normal");
    // alink.off("touchstart.ani").on("touchstart.ani", function(e) {
    //     // e.preventDefault();
    //     $(this).addClass("btn-active");
    // });
    // // 因为有可能不是在元素上面离开手指
    // $(window).off("touchend.ani").on("touchend.ani",function(){
    //     alink.removeClass("btn-active");
    // });
    var alink = $("a").add(".alink").not(".no-animation");
    alink.on("click",function(){
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

function listAnimation(e){
    var _this = e.currentTarget;
    _this.style.transition = "transform 0.1s";
    _this.style.transform = "scale(0.95)";
    setTimeout(function () {
        _this.style.transform = "scale(1)";
    }, 100);
}

$(function() {
    alinkAnimation();
});
