function baseFontSize() {
    var maxFontSize = 20;
    var rootfontsize = window.innerWidth / 20;
    rootfontsize = rootfontsize > maxFontSize ? maxFontSize : rootfontsize;
    document.documentElement.style.fontSize = rootfontsize + "px"
    return rootfontsize;
}

function htmlFull() {
    var html = document.documentElement;
    html.style.height = "100%";
    if (html.scrollHeight > html.offsetHeight) {
        html.style.height = "auto";
    } else {
        html.style.height = "100%";
    }
}
$(function() {
    $(window).on("resize", function() {
        htmlFull();
    }).resize();
});