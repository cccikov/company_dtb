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
    var alink = $("a").add(".alink").not(".no-animation");
    alink.addClass("btn-normal");
    alink.off("touchstart.ani").on("touchstart.ani", function(e) {
        // e.preventDefault();
        $(this).addClass("btn-active");
    });
    // 因为有可能不是在元素上面离开手指
    $(window).off("touchend.ani").on("touchend.ani",function(){
        alink.removeClass("btn-active");
    });
}

$(function() {
    alinkAnimation();
});
