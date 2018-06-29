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

// 格式化数字 , 逢千逗号
function formatNum(num) { // 本来toLocaleString就可以实现这个功能 , 但是搜狗这个傻逼浏览器
    num = num.toString();
    var decimal = ""; //小数
    var integer = ""; //整数
    var point = num.indexOf(".");
    var arr = [];
    if (point != -1) {
        decimal = num.slice(point + 1);
        integer = num.slice(0, point);
    } else {
        integer = num;
        decimal = "";
    }
    var len = integer.length;
    var n = len;
    while (n > 3) {
        n -= 3;
        arr.unshift(num.substr(n, 3));
    }
    arr.unshift(num.slice(0, n));
    if(decimal != ""){
        return arr.join(",") + "." + decimal;
    }
    return arr.join(",");
}

// tab 切换
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

// 增减
function AddMinus(obj) {
    var _this = this;
    _this.add = obj.add;
    _this.minus = obj.minus;
    _this.min = Number(obj.min);
    _this.max = Number(obj.max);
    _this.input = obj.input;
    _this.action = obj.action || null;
    _this.val = Number(_this.input[0].value) || 0;

    _this.add.on("click", function() {
        _this.val += 1;
        if (_this.val > _this.max) {
            _this.val = _this.max
        }
        _this.input[0].value = _this.val;
        _this.action && _this.action(_this.val);
    });
    _this.minus.on("click", function() {
        _this.val -= 1;
        if (_this.val < 0) {
            _this.val = 0;
        }
        if (_this.val < _this.min) {
            _this.val = _this.min;
        }
        _this.input[0].value = _this.val;
        _this.action && _this.action(_this.val);
    });
}

/**
 * 获取滚动条位置处理
 * @return {number} 浏览器滚动条位置
 */
function getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop;
}

/**
 * 设置浏览器滚动条位置
 * @param {number} top 需要设置浏览器滚动条的位置
 * @param {boolean} until 是否需要一直设置浏览器滚动条的位置 , 知道浏览器滚动条的位置 为top , 一般是页面进入的时候才需要设置为true , 其他时候可以忽略
 * @return {boolean} 是否设置成功
 */
function setScrollTop(top, until) {
    document.documentElement.scrollTop = document.body.scrollTop = top;
    setTimeout(function () { // 虽然是在window.onload里面 , 但是有时页面进入的时候 , 还是设置不成功 , 初步猜测 , 可能是页面虽然加载好 , 但是还没有渲染完成, 还没有滚动条 , 所以设置失败 ; 特别是刷新的时候,  如果是直接跳转过来还好
        if (getScrollTop() != top && until) { // 判断是否设置值 , 不是的话重新设置 , 这个判断只能是放在定时器里面 , 因为如果是直接在外面判断的话 , 可能由于刚设置的原因 , getScrollTop()是等于top的
            /*console.log("执行");*/
            setScrollTop(top);
        }
    }, 16.7); // 经过试验 其实定时器时间设为1都也只是执行一次 ,
    return getScrollTop() == top;
}

/**
 * 让导航active
 */
function navActive() {
    var path = location.pathname.slice(1);
    var index = path.indexOf("/");
    if (index > 0) {
        var tabName = path.slice(0, index);
    } else {
        var tabName = path;
    }
    index = tabName.indexOf(".");
    if (index > 0) {
        tabName = tabName.slice(0, index);
    }

    switch (tabName) {
        case "":
            $(".top-link a").eq(0).addClass("active");
            break;
        case "index":
            $(".top-link a").eq(0).addClass("active");
            break;
        case "project":
            $(".top-link a").eq(1).addClass("active");
            break;
        case "login":
            $(".top-login a").eq(0).addClass("active");
            break;
        case "member":
            $(".top-login a").eq(0).addClass("active");
            break;
        case "registerpage":
            $(".top-login a").eq(1).addClass("active");
            break;
    }
}

/**
 * 浮窗部分
 */
function showLogin(flag) {
    showMask(flag, "black-mask");
    if (flag) {
        $(".login-float").addClass("active");
        return "show";
    } else {
        $(".login-float").removeClass("active");
        return "hide";
    }
}

function showMask(flag, className) {
    // black-mask
    if (flag) {
        $(".mask").addClass("active " + className)
    } else {
        $(".mask").removeClass("active");
    }
}

/**
 * 取消毛玻璃效果
 */
function removeBlur() {
    $(".blur").removeClass("blur");
}

$(function() {
    if ($("#wrap").size() > 0) { // 不是iframe
        navActive();

        /* 检测有无登录 */
        $.ajax({
            type: "get",
            url: "/getuser?ran="+Math.random(),
            async: true,
            dataType: "json",
            success: function (data) {
                var name = data.name || "";
                if (!!name) {
                    $("#userName").html(name);
                    $(".logged").addClass("active");
                } else {
                    $(".logging").addClass("active");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.error(textStatus, errorThrown);
            }
        });
    }
});
