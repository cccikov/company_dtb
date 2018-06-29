var tbUserEntityPara = {
    tradername: "",
    password: "",
    password2: "",
    mobile: "",
    validcode: "",
    optype: 1
};
var tbUserEntityPara2 = {
    mobile: "",
    validcode: "",
    optype: 2
};

var InterValObj; // timer变量，控制时间
var count = 30; // 间隔函数，1秒执行
var curCount; // 当前剩余秒数
var clickCount = 0;
var cclickCount = 0;

Vue.use(validate, {
    // immediate: true,
    rules: {
        isMobile: {
            reg: /^1[3|4|5|6|7|8][0-9]\d{8}$/,
            ajax:{
                url:"/regvalid?optype=validmobile",
                data:{
                    mobile:function(vm){
                       if(vm.tab == 1){
                            return vm.tbUserEntity.mobile;
                        }else{
                            return vm.tbUserEntity2.mobile;
                        }
                    }
                }
            }
        },
        isBindMobile: {
            reg: /^1[3|4|5|6|7|8][0-9]\d{8}$/,
            ajax:{
                url:"/regvalid?optype=validbindmobile",
                data:{
                    mobile:function(vm){
                       if(vm.tab == 1){
                            return vm.tbUserEntity.mobile;
                        }else{
                            return vm.tbUserEntity2.mobile;
                        }
                    }
                }
            }
        },
        isTradername: {
            reg: /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/,
            minLength: 6,
            maxLength: 20,
            ajax:{
                url:"/regvalid?optype=validtradername",
                data:{
                    tradername:function(vm){
                        return vm.tbUserEntity.tradername;
                    }
                }
            }
        },
        isPassword:{
            reg:/^[A-Za-z0-9@#]{6,16}$/
        },
        code:{
            ajax:{
                url:"/regvalid?optype=validmobilecode",
                data:{
                    mobilevaildcode:function(vm){
                        if(vm.tab == 1){
                            return vm.tbUserEntity.validcode;
                        }else{
                            return vm.tbUserEntity2.validcode;
                        }
                    },
                    mobile:function(vm){
                        if(vm.tab == 1){
                            return vm.tbUserEntity.mobile;
                        }else{
                            return vm.tbUserEntity2.mobile;
                        }
                    }
                }
            }
        }
    }
});

var vm = new Vue({
    el: "#wrap",
    data: {
        tab: 1,
        tbUserEntity: tbUserEntityPara,
        tbUserEntity2: tbUserEntityPara2
    },
    methods: {
        changeTab: function(num) {
            this.tab = num;
        },
        bind: function() {
            if (vm.tab == 1) {
                $.ajax({
                    type: "POST",
                    url: "/wx/bind",
                    contentType: "application/json",
                    data: JSON.stringify(vm.tbUserEntity),
                    success: function(r) {
                        var result = eval('(' + r + ')')
                        if (result.code === 0) {
                            location.href = "/m/page/index.html"
                        } else {
                            alert(result.msg);
                        }
                    }
                });
            } else if (vm.tab == 2) {
                $.ajax({
                    type: "POST",
                    url: "/wx/bind",
                    contentType: "application/json",
                    data: JSON.stringify(vm.tbUserEntity2),
                    success: function(r) {
                        var result = eval('(' + r + ')')
                        if (result.code === 0) {
                            location.href = "/m/page/index.html"
                        } else {
                            alert(result.msg);
                        }
                    }
                });
            }
        },
    }
})

function sendMessage() {
    var mobile = "";

    if (vm.tab == 1) {
        mobile = vm.tbUserEntity.mobile
    } else if (vm.tab == 2) {
        mobile = vm.tbUserEntity2.mobile
    }

    var reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;

    if (!reg.test(mobile)) {
        alert("请输入正确的手机号码")
        return;
    }
    curCount = count;
    // 设置button效果，开始计时
    $(".code").attr("href", "javascript:void(0)");
    $(".code").html("重新获取(" + curCount + ")");
    InterValObj = window.setInterval(SetRemainTime, 1000); // 启动计时器，1秒执行一次

    (jQuery).ajax({
        type: "POST",
        url: "/register/sendcode", // 发送验证码
        data: {
            'mobile': mobile, // 传入参数
            'optype': "regist"
        },
        success: function(data) {
            var obj = eval("(" + data + ")");
            var flag = obj[0].flag;
            if (flag == "1") {
                alert(obj[0].msg)
            }
        }
    })
}

// timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj); // 停止计时器
        $(".code").attr("href", "javascript:sendMessage()");
        $(".code").html("重发验证码");
        clickCount = clickCount + 1;
    } else {
        curCount--;
        $(".code").html("重新获取(" + curCount + ")");
    }
}


