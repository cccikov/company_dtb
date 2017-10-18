$(function(){
    var posi = $(".scrollWhere").position().top;
    scrollPosi(posi, function(top) {
        $(".fixed-box").removeClass("fixed");
    }, function(top) {
        $(".fixed-box").addClass("fixed");
    });
});