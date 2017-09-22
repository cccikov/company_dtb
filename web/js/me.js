$(function(){

    // tab切换
    var tab_btn = $(".tab-nav a");
    var tab = $(".tab");
    tab_btn.on("click",function(){
        var _this = $(this);
        var _index = _this.parent().index();
        tab_btn.removeClass("active");
        _this.addClass("active");
        tab.removeClass("active").eq(_index).addClass("active");
    });

});