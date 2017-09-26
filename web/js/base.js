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

function Tab(obj) {
    var _this = this;
    _this.btn = obj.btn;
    _this.box = obj.box;
    _this.defalut = obj.defalut || 0;
    _this.btn.eq(_this.defalut).addClass("active");
    _this.box.eq(_this.defalut).addClass("active");

    _this.btn.on("click", function() {
        var that = $(this);
        var _index = that.index();
        _this.btn.removeClass("active");
        _this.box.removeClass("active");
        that.addClass("active");
        _this.box.eq(_index).addClass("active");
    });
}

$(function() {
    $(window).on("resize", function() {
        htmlFull();
    }).resize();
});
