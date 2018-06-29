function star(obj) {
    var that = $(obj);
    if (!that.is(".active")) {
        that.addClass("active");
    } else {
        that.removeClass("active");
    }
}

/* 提示显示 */
function showTips() {
    $(".mask").attr("class", "mask active black-mask");
    $(".tips-float").addClass("active");
}

/* 提示隐藏 */
function hideTips() {
    $(".mask").attr("class", "mask");
    $(".tips-float").removeClass("active");
}


/* 提示2显示 */
function showTips2(str) {
    str == Number(str);
    var box = null;
    if (str == 5) {
        box = 2;
    } else {
        box = 1;
    }
    $(".tips2-float .box").removeClass("active");
    $(".tips2-float .box" + box).addClass("active");
    $(".mask").attr("class", "mask active black-mask");
    $(".tips2-float").addClass("active");
}

/* 提示2隐藏 */
function hideTips2() {
    $(".mask").attr("class", "mask");
    $(".tips2-float").removeClass("active");
}

/* 提示3显示 */
function showTips3() {
    $(".mask").attr("class", "mask active black-mask");
    $(".tips3-float").addClass("active");
}

/* 提示3隐藏 */
function hideTips3() {
    $(".mask").attr("class", "mask");
    $(".tips3-float").removeClass("active");
}

$(function() {
    $("#bookmark").click(function() {
        var flag = $("#flag").val();
        if (flag == 0) {
            showLogin(true);
        } else {
            if (!$(this).is(".active")) {
                $.ajax({
                    type: "POST",
                    url: "/project/bookmarkProject",
                    data: {
                        "projid": $("#projid").val()
                    },
                    success: function(r) {
                        var obj = eval('(' + r + ')');
                        if (obj.code == "500") {
                            alert(obj.msg)
                        } else {
                            $("#bookmark").addClass("active");
                        }
                    }
                });
            } else {
                $.ajax({
                    type: "POST",
                    url: "/project/unbookmarkProject",
                    data: {
                        "projid": $("#projid").val()
                    },
                    success: function(r) {
                        var obj = eval('(' + r + ')');
                        if (obj.code == "500") {
                            alert(obj.msg)
                        } else {
                            $("#bookmark").removeClass("active");
                        }
                    }
                });
            }
        }
    });



    var video_box = $(".video-wrap").addClass("show play");
    var video = $("#video")[0];
    $("#video").on("click", function() {
        if (video.paused) { // 暂停中
            video.play();
            video_box.removeClass("play");
        } else { // 播放中
            video.pause();
            video_box.addClass("play");
        }
    });

});
