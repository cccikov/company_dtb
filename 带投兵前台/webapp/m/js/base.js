var platform = null;
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
var error = "";
try {
    if (isAndroid) {
        android.postMessage;
    } else if (isiOS) {
        window.webkit.messageHandlers.app.postMessage;
    }
    platform = "app";
} catch (e) {
    platform = "web";
    error = e;
}


$(function () {
    alinkAnimation();
    maskNoScroll();
    appLink();
    if (platform == "web") {
        $(".web_platform").addClass("active").show();
    }
});

function appAction(obj, errfn) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端


    try {
        var str = JSON.stringify(obj);
        if (str != "") {
            if (isAndroid) {
                android.postMessage(str);
            } else if (isiOS) {
                window.webkit.messageHandlers.app.postMessage(str);
            }
        }
    } catch (e) {
        errfn && errfn(e);
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //以 name 开头或者以 "&"+name 开头，中间是 "=" + 若干个非&的字符 ,后面是结尾 或者 以 "&"结尾
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return "";
}

var setStorage = function (key, value) {
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
var getStorage = function (key) {
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
var rmStorage = function (key) {
    var ls = window.localStorage;
    if (ls && key) {
        ls.removeItem(key);
    }
};
// 清空localStorage
var clearStorage = function () {
    var ls = window.localStorage;
    if (ls) {
        ls.clear();
    }
};


//设置cookie
function setCookie(cname, cvalue, exDays) {
    var d = new Date();
    var expires = d.getTime() + exDays * (24 * 60 * 60 * 1000);
    document.cookie = cname + "=" + cvalue + "; expires=" + new Date(expires);
}

//getCookie事件
function getCookie(cookieName, value) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; "); //"user=1443507891162S0005I7F000001R1418; mark=9171E5659CD7799C6651332AD619185D; organizationCode=CCC; username=admin" => ["user=1443507891162S0005I7F000001R1418", "mark=9171E5659CD7799C6651332AD619185D", "organizationCode=CCC", "username=admin"]
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (cookieName == arr[0]) {
            return arr[1];
        }
    }
    return "";
}

//清除cookie
function clearCookie(cname) {
    setCookie(cname, "", -1);
}

function changeMillion(amount) {
    if (amount > 10000) {
        return amount / 10000 + "万";
    } else {
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
    $(document).on("click", "a,.alink", function (e) {
        // console.log("alink");
        if ($(this).is(".no-animation")) {
            return true;
        }
        clickAnimation(this);
    });
}

function appLink() {
    // 通过事件委托让全部a标签实现app跳转
    $(document).on("click", "a", function (e) {
        var _this = $(this);
        var href = _this.attr("href");
        if (!href) { // 没有href跳过
            return;
        }
        if (href.slice(0, 10) == "javascript") {
            return;
        }
        if (href.slice(0, 1) == "#") {
            return;
        }
        if(_this.is(".notAppLink")){
            return;
        }
        e.preventDefault();

        var str_obj = {
            "type": "openWindow",
            "url": href
        }
        appAction(str_obj, function () {
            window.location.href = href;
        });
    });
}



function clickAnimation(dom) {
    var _this = dom;
    _this.style.transition = "transform 0.1s,opacity 0.1s";
    _this.style.transform = "scale(0.95)";
    _this.style.opacity = "0.8";
    setTimeout(function () {
        _this.style.transform = "scale(1)";
        _this.style.opacity = "1";
    }, 100);
}

function GetMore(obj) {
    var _this = this;
    _this.loading = false;
    _this.cb = obj.cb;

    _this.winH = window.innerHeight;
    _this.eleTop = $(".tips").offset().top;

    $(window).on("scroll", function () {
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
        <div class="footer" :class="{active:platform=='web'}">
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
        formatNum: function (num) {
            return formatNum(num);
        },
        formatPhone: function (phone) {
            phone = String(phone);
            return phone.slice(0, 3) + " **** ****"
        }
    },
    data: function () {
        return {
            platform: platform
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            if (platform == "web") {
                $(".web_platform").addClass("active").show();
            }
        });
    }
});

function maskNoScroll() { // 蒙层后面内容不能翻滚
    $(".mask").on('touchmove', function (e) {
        e.preventDefault();
        console.log(e);
    });
}