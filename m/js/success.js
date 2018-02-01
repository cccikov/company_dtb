var vm = new Vue({
    el: "#wrap",
    data: {
        status: "success",
    }
});

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