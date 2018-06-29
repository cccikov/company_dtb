function inputHandle(val) {
    var deposit = val * 2000; // 20% * 万元
    var offerToBuy = val * 100; // 1% * 万元

    if (deposit >= 10000) {
        deposit = deposit / 10000;
        $("#deposit").html(formatNum(deposit) + " 万元");
    } else {
        $("#deposit").html(formatNum(deposit) + " 元");
    }

    if (offerToBuy >= 10000) {
        offerToBuy = offerToBuy / 10000;
        $("#offerToBuy").html(formatNum(offerToBuy) + " 万元");
    } else {
        $("#offerToBuy").html(formatNum(offerToBuy) + " 元");
    }
    $(".origin-value").html(val + " 万元");
}

/* 提示显示 */
var sureTimer = null;

function showSure() {
    $(".sure-float strong").html($("#amount").val() + " 万元");
    $(".mask").attr("class", "mask active white-mask");
    $(".sure-float").addClass("active");
    // var second = 10;
    // $(".sure-float button.sure").html("确定(" + second + ")");
    // sureTimer = window.setInterval(function() {
    //     second--;
    //     $(".sure-float button.sure").html("确定(" + second + ")");
    //     if (second == 0) {
    //         window.clearInterval(sureTimer);
    //         $(".sure-float button.sure").addClass("canClick").html("确定");
    //     }
    // }, 1000);
    $(".sure-float button.sure").addClass("canClick");
}

/* 提示隐藏 */
function hideSure() {
    $(".mask").attr("class", "mask");
    $(".sure-float").removeClass("active");
    // $(".sure-float button.sure").removeClass("canClick").html("确定");
    // window.clearInterval(sureTimer);
}

$(function() {
    var min = $("#minamount").val();
    var max = $("#maxamount").val();
    var tipsEle = $("#amountTips");
    var submitBtn = $("#sumitOrder").add("#sumitOrder2");

    $("#amount").on("input", function() {
        var _this = $(this);
        var val = Number(_this.val());
        var reg = /^\d+$/.test(val);
        if (!reg) {
            tipsEle.html("请输入正整数");
            submitBtn.removeClass("canClick");
            return false;
        }
        var range = (val >= min && val <= max);
        if (!range) {
            tipsEle.html("不在范围内(" + min + "万~" + max + "万)");
            submitBtn.removeClass("canClick");
            return false;
        }
        submitBtn.addClass("canClick");
        tipsEle.html("");
        inputHandle(val);
    });


    inputHandle(Number($("#amount").val()));
});
