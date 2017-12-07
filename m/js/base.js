$(function() {
    alinkAnimation();
});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //以 name 开头或者以 "&"+name 开头，中间是 "=" + 若干个非&的字符 ,后面是结尾 或者 以 "&"结尾
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return "";
}

var setStorage = function(key, value) {
    if (arguments.length === 2) {
        var v = value;
        if (typeof v == 'object') {
            v = JSON.stringify(v);
            v = 'obj-' + v;
        } else {
            v = 'str-' + v;
        }
        var ls = window.localStorage;
        if (ls) {
            ls.setItem(key, v);
            return v;
        }
    }
};
// 访问localStorage
var getStorage = function(key) {
    var ls = window.localStorage;
    if (ls) {
        var v = ls.getItem(key);
        if (!v) {
            return;
        }
        if (v.indexOf('obj-') === 0) {
            v = v.slice(4);
            return JSON.parse(v);
        } else if (v.indexOf('str-') === 0) {
            return v.slice(4);
        }
    }
};
// 删除localStorage
var rmStorage = function(key) {
    var ls = window.localStorage;
    if (ls && key) {
        ls.removeItem(key);
    }
};
// 清空localStorage
var clearStorage = function() {
    var ls = window.localStorage;
    if (ls) {
        ls.clear();
    }
};

function changeMillion(amount){
	if(amount > 10000){
	   		 return  amount/10000+"万";
	   	 }else{
	   		 return amount;
	   	 }
}

// 格式化数字 逢千逗号
function formatNum(num) {
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
        decimal = "00";
    }
    var len = integer.length;
    var n = len;
    while (n > 3) {
        n -= 3;
        arr.unshift(num.substr(n, 3));
    }
    arr.unshift(num.slice(0, n));
    return arr.join(",")
}

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

function navActive() {
    var path = location.pathname.slice(1);
    var index = path.lastIndexOf("/");
    if (index > 0) {
        var tabName = path.slice(index + 1); // 文件夹
    } else {
        var tabName = path; // 直接文件名
        index = tabName.indexOf(".");
        if (index > 0) {
            tabName = tabName.slice(0, index);
        }
    }

    switch (tabName) {
        case "":
            return 1;
            break;
        case "index.html":
            return 1;
            break;
        case "project.html":
            return 2;
            break;
        case "news.html":
            return 3;
            break;
        case "me.html":
            return 4;
            break;
        default:
            return 0;
            break;
    }
}

/* 按钮,标签动画 */
function alinkAnimation() {
    /* var alink = $("a").add(".alink").not(".no-animation");
    alink.addClass("btn-normal");
    alink.off("touchstart.ani").on("touchstart.ani", function(e) {
        // e.preventDefault();
        $(this).addClass("btn-active");
    });
    // 因为有可能不是在元素上面离开手指
    $(window).off("touchend.ani").on("touchend.ani",function(){
        alink.removeClass("btn-active");
    }); */
    var alink = $("a").add(".alink").not(".no-animation");
    alink.on("click", function() {
        var _this = this;
        _this.style.transition = "transform 0.1s,opacity 0.1s";
        _this.style.transform = "scale(0.95)";
        _this.style.opacity = "0.8";
        setTimeout(function() {
            _this.style.transform = "scale(1)";
            _this.style.opacity = "1";
        }, 100);
    });
}

/* 列表按钮动画 */
function listAnimation(e) {
    var _this = e.currentTarget;
    _this.style.transition = "transform 0.1s";
    _this.style.transform = "scale(0.95)";
    setTimeout(function() {
        _this.style.transform = "scale(1)";
    }, 100);
}

// 两个数组 除去arr1里面同时存在于两个数组的元素
function different(arr1, arr2) {
    var arr = [];
    arr1.forEach(function(val) {
        if (arr2.indexOf(val) == -1) {
            arr.push(val);
        }
    });
    return arr;
}

// 将类数组对象转为数组
var toArray = (function() {
    return Array.from ? Array.from : function(arrLike) {
        return [].slice.call(arrLike);
    }
})();

// 图片load好 , 一般来说图片load好 , 基本页面的其他内容也load好了
function imgAllLoad(imgArr, cb) {
    // 如果imgArr里面有img元素已经load好了 , 就不会再触发 load事件
    // 这里采用 different 函数 , arr2为以前已经load好的元素 , arr1是包含load好元素和未load好元素 , 取差集;
    var len = imgArr.length;
    var n = 0

    function handle() { // 事件监听器
        n++;
        if (n >= len) {
            cb && cb();
        }
    }
    for (var i = 0; i < len; i++) {
        imgArr[i].removeEventListener("load", handle);
        imgArr[i].addEventListener("load", handle, false);
    }
}

function GetMore(obj) {
    var _this = this;
    _this.loading = false;
    _this.cb = obj.cb;

    _this.winH = window.innerHeight;
    _this.eleTop = $(".tips").offset().top;

    $(window).on("scroll", function() {
        _this.winH = window.innerHeight;
        _this.eleTop = $(".tips").offset().top;
        _this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if (_this.scrollTop > _this.eleTop - _this.winH - 100 && !_this.loading) { // 到底 且 没有在加载数据的时候
            _this.loading = true;
            !!_this.cb && _this.cb();
        }
    });
}

Vue.component("footer-tpl", {
    template: `
        <!-- 底部 -->
        <div class="footer">
            <a :class="{active:page=='1'}"" href="index.html">首页</a>
            <a :class="{active:page=='2'}"" href="project.html">项目</a>
            <a :class="{active:page=='3'}"" href="news.html">资讯</a>
            <a :class="{active:page=='4'}"" href="me.html">我的</a>
        </div>
    `,
    props: ["page"]
});

// 全局混合
Vue.mixin({
    methods: {
        formatNum:function(num){
            return formatNum(num);
        },
        formatPhone:function(phone){
            phone = String(phone);
            return phone.slice(0,3)+" **** ****"
        }

    },

});
