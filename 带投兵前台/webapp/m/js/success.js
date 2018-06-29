var r = getUrlParam("r");
var type = getUrlParam("type");
var id = getUrlParam("id");


var rObj = eval('('+r+')');

var vm = new Vue({
    el: "#wrap",
    data: {
        r:null,
        type:null,
        id:null
    }
});
vm.r = rObj;
vm.type = type;
vm.id = id;
$(function () {
    var second = 10;
    var html = $(".timeout").html();
    var timer = setInterval(() => {
        if (second < 0) {
            clearInterval(timer);
            $(".timeout")[0].click();
            return
        }
        $(".timeout").html(html + "，" + second + "秒后自动跳转");
        second--;
    }, 1000);
});