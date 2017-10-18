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
    _this.input = obj.input;
    _this.action = obj.action || null;
    _this.val = Number(_this.input[0].value) || 0;

    _this.add.on("click", function() {
        _this.val += 10;
        _this.input[0].value = _this.val;
        _this.action && _this.action(_this.val);
    });
    _this.minus.on("click", function() {
        _this.val -= 10;
        if (_this.val < 0) {
            _this.val = 0;
        }
        _this.input[0].value = _this.val;
        _this.action && _this.action(_this.val);
    });
}

function formatNum(str) {
    str = ""+str;
    var newStr = "";
    var count = 0;

    if (str.indexOf(".") == -1) {
        for (var i = str.length - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr;
            }
            count++;
        }
        str = newStr;
    } else {
        for (var i = str.indexOf(".") - 1; i >= 0; i--) {
            if (count % 3 == 0 && count != 0) {
                newStr = str.charAt(i) + "," + newStr;
            } else {
                newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
    }
    return str;
}

/**
 * 滚动检测
 * @param  {number} posi 滚动条某个位置
 * @param  {function} cb1  回到posi之前操作(只操作一次)
 * @param  {function} cb2  到达posi操作(只操作一次)
 */
function scrollPosi(posi, cb1, cb2) {
    var flag = true; //表示在posi之前 , 用于限制值操作一次
    window.onscroll = function() {
        var top = document.body.scrollTop;
        if (top > posi) { // 在posi下面的时候
            if (flag) { // 要是true , 超过posi没有执行过
                cb2 && cb2();
                flag = false; // 设为false , 表示超过posi已经执行过一次了 , 要返回posi之上之后 , 才有可能再执行cb2
            }
        } else { // 在posi上面的时候
            if (!flag) {
                cb1 && cb1();
                flag = true;
            }
        }
    }
}

$(function() {
    $(window).on("resize", function() {
        htmlFull();
    }).resize();
});
