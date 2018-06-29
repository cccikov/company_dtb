<!DOCTYPE html>
<%@page import="dtb.fund.entity.BankcardEntity"%>
<%@page import="io.renren.utils.FString"%>
<%@page import="dtb.fund.entity.TbUserEntity"%>
<%@page import="dtb.fund.entity.OdOrderEntity"%>
<%@page import="dtb.fund.entity.PjInfoEntity"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.ParseException"%>
<%@page import="java.util.Date"%>
<%@page import="dtb.fund.entity.PjDocumentEntity"%>
<%@page import="java.util.Map"%>
<html lang="zh">
<%@page import="java.util.List"%>
<%@page contentType="text/html;charset=utf-8"%>
<%
    request.setCharacterEncoding("UTF-8");
    response.setContentType("text/html;charset=UTF-8");
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
    TbUserEntity userEntity = request.getAttribute("tbUserEntity") != null ? (TbUserEntity)request.getAttribute("tbUserEntity"):null;
    List<BankcardEntity> bankcardEntities = request.getAttribute("bankcardEntities") != null ? (List<BankcardEntity>)request.getAttribute("bankcardEntities"):null;
    String optype = request.getAttribute("optype") != null ? (String)request.getAttribute("optype"):"";
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>个人认证</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/me_frame.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="/statics/libs/pc.js"></script>
    <script src="/statics/libs/ajaxupload.js"></script>
    <script type="text/javascript" src="/statics/libs/jquery.validate.1.9.min.js"></script>
    <script type="text/javascript" src="/statics/libs/jquery.form.js"></script>

</head>
<script type="text/javascript">
    var Url = "";
    var button = "";
    var InterValObj; //timer变量，控制时间
    var count = 30; //间隔函数，1秒执行
    var curCount; //当前剩余秒数
    var clickCount = 0;
    var cclickCount = 0;

    /* loading 动画 */
    function loading(flag){
        if(flag){
            $(".loader-float", top.document).addClass("active"); // loading效果出现
        }else{
            $(".loader-float", top.document).removeClass("active"); // loading效果消失
        }
    }

    /* 重置iframe高度 */
    function resetIframe(){
        var iframe = $("#ifr",top.document);
        var height = $(document).outerHeight();
        iframe.height(height);
    }

    /* 格式化银行卡 */
    function formatBankCard(card) {
        card = String(card);
        card = card.replace(/\s/g, "");
        var len = card.length;
        var arr = [];
        var n = 0;
        while (n < len) {
            arr.push(card.slice(n, n + 4));
            n += 4;
        };
        return arr.join(" ");
    }

    $(function () {
        // 点击身份证正反面的时候 , 点击对应file-input
        $(".front_pic").on("click",function(){
            $("#front")[0].click();
        });
        $(".back_pic").on("click",function(){
            $("#back")[0].click();
        });


        /**
         * 表单验证 begin
         */

        $.validator.addMethod("isIdcard", function (value, element) {
            //身份证正则表达式(15位)
            var isIDCard1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
            //身份证正则表达式(18位)
            return this.optional(element) || (isIDCard1.test(value));
        }, "请输入正确的身份证号码");
        $.validator.addMethod("isMobile", function (value, element) {
            var chrnum = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
            return this.optional(element) || (chrnum.test(value));
        }, "请输入正确的手机号码");

        $.validator.addMethod("isBankCard", function () {
            var ischeck = $("#ischeck").val();
            if (ischeck == 0) { // ischeck为0的时候是选择银行卡
                var cardnoS = $('#cardnoS').val();
                if (cardnoS == undefined || cardnoS == "") {
                    return false;
                } else {
                    return true;
                }
            } else { // ischeck为1的时候是填写银行卡
                var cardNo = $('#cardNo').val();
                var bankName = $('#bankName').val();
                var dotName = $('#dotName').val();
                if (cardNo == "" || bankName == "" || dotName == "") {
                    return false;
                } else {
                    return true
                }
            }
        }, "请输入或选择银行卡信息");

        $.validator.addMethod("isUploadCardPic", function () {
            var front = $("#frontpic").val();
            var back = $("#backpic").val();
            return !!front && !!back;
        }, "请选择上传身份证正反面图片");

        var attemp = 0,
            flag = true;

        // 表单验证
        $('#frmaction').validate({
            //debug:true,
            onkeyup: false,
            onfocusout: function (element) { // 失去焦点时验证
                $(element).valid();
            },
            errorPlacement: function (error, element) { // 跟一个函数，可以自定义错误放到哪里。 error 是 validate生成的错误标签 , element是当前验证的input元素
                var placeholder = element.parents('.input').next('.tips');
                placeholder.find('span.reg-valid-success').remove();
                placeholder.find('span.reg-valid-error').remove();
                error.appendTo(placeholder);
            },
            submitHandler: function () { // 通过验证后运行的函数，里面要加上表单提交的函数，否则表单不会提交。
                $('#frmaction').ajaxSubmit({ // form.js 提交表单
                    type: "post",
                    url: "/member/certaction",
                    success: function (data) {
                        var result = eval('(' + data + ')');
                        if (result.code == 0) {
                            location.href="/member/cert"
                        } else {
                            alert(result.msg)
                        }
                    }
                });
            },
            errorClass: 'reg-valid-error',
            errorElement: 'span',
            success: function (label) { // label 是当前生成的错误标签
                label.html("").attr("class", "reg-valid-success"); // 手动置换className
            },
            rules: {
                username: {
                    required: true,
                    maxlength: 20
                },
                idCard: {
                    required: true,
                    isIdcard: true
                },
                mobile: {
                    required: true,
                    isMobile: true,
                    remote: {
                        url: "/member/certvalid?optype=validmobile",
                        data: {
                            mobile: function () {
                                return $('#mobile').val();
                            }
                        }
                    }
                },
                mobilevaildcode: {
                    required: true,
                    remote: {
                        url: "/member/certvalid?optype=validmobilecode",
                        data: {
                            mobilevaildcode: function () {
                                return $('#mobilevaildcode').val();
                            },
                            mobile: function () {
                                return $('#mobile').val();
                            }
                        }
                    }
                },
                frontpic: {
                    isUploadCardPic:true
                },
                backpic: {
                    isUploadCardPic:true
                },
                cardNo: {
                    isBankCard: true
                },
                bankName: {
                    isBankCard: true
                },
                dotName: {
                    isBankCard: true
                },
                cardnoS: {
                    isBankCard: true
                }
            },
            messages: {
                username: {
                    required: '请输入姓名',
                    maxlength: jQuery.format("姓名不能超过{0}个字符")
                },
                idCard: {
                    required: '请输入身份证号码'
                },
                mobile: {
                    required: '请输入手机号',
                    remote: '该手机号码无效或已被认证！'
                },
                mobilevaildcode: {
                    required: '请输入短信验证码',
                    remote: '验证码错误或已失效！'
                }
            }
        });

        $('input').focus(function () {
            if ($(this).is(":text")){ // type = text
                $(this).addClass('reg-input-focus');
            }
            if (!$(this).hasClass('reg-valid-error') && $(this).parent().next('.tips').find('span.reg-valid-error').size() == 0){ // input没有reg-valid-error 和 tips 里面 没有reg-valid-error
                $(this).parent().next('.tips').find('.reg-valid-tip').removeClass('tip-hidden').siblings().remove();
            }
        });

        $('input').blur(function () {
            $(this).removeClass('reg-input-focus').parent().next('.tips').find('.reg-valid-tip').addClass('tip-hidden');
        });
        /**
         * 表单验证 end
         */


        $("#mobile").on("change",function(){
            var _this = $(this);
            if(!_this.val()){
                $("#btnSendCode").removeClass("canClick");
            }else{
                $("#btnSendCode").addClass("canClick");
            }
        }).change();


        /**
         * 银行信息填写 begin
         */
         var ischeck = $("#ischeck").val();
         if(ischeck == 0){
             $(".type-radio").addClass("active");
             $(".radio-card").addClass("active");
         }else if(ischeck == 1){
             $(".type-text").addClass("active");
             $(".text-card").addClass("active");
         }
         resetIframe();

         $(".type-select a").on("click",function(){
            var _this = $(this);
            _this.addClass("active").siblings("a").removeClass("active");

            if(_this.is(".type-radio")){
                var ischeck = 0;
                $(".radio-card").addClass("active").siblings(".select-box").removeClass("active");
            }else if(_this.is(".type-text")){
                var ischeck = 1;
                $(".text-card").addClass("active").siblings(".select-box").removeClass("active");
            }
            $("#ischeck").val(ischeck);
             resetIframe();
         });

         // 选择银行卡
         $(".card-item").on("click",function(){
            var _this = $(this);
            _this.addClass("active").siblings("a").removeClass("active");
            $("#cardnoS").val(_this.attr("cardno"));
         });

         $("#cardNo").on("input",function(){
            var val = this.value;
            val = formatBankCard(val);
            this.value = val;
         });
         /**
         * 银行信息填写 end
         */




        $("#edit").click(function () {
            window.location.href = '/member/cert?optype=edit';
        });

        <%if(userEntity.getAuditStatus() <= 0 || optype.equals("edit")){ %>
            getToken();

        <%}%>



    });


    function getToken() {
        $.ajax({
            type: "POST",
            url: "/gettoken",
            success: function (r) {
                var result = eval('(' + r + ')');
                var token = result.token;
                $("#token").val(token)
            }
        });
    }


    //timer处理函数
    function SetRemainTime() {
        if (curCount == 0) {
            window.clearInterval(InterValObj); //停止计时器
            $("#btnSendCode").attr("href", "javascript:sendMessage()").addClass("canClick");
            $("#btnSendCode").html("重新发送短信验证码");
            clickCount = clickCount + 1;
        } else {
            curCount--;
            $("#btnSendCode").html("重新获取(" + curCount + ")");
        }
    }



    function sendMessage() {
        if(!$("#mobile").val()){
            return false;
        }



        curCount = count;
        //设置button效果，开始计时
        $("#btnSendCode").attr("href", "javascript:void(0)").removeClass("canClick");
        $("#btnSendCode").html("重新获取(" + curCount + ")");
        InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
        (jQuery).ajax({
            type: "POST", url: "/member/sendcode", //发送验证码
            data: {
                'mobile': $('#mobile').val() //传入参数
            },
            success: function (data) {
                if (data == "true") {} else {
                    alert("验证码发送失败！")
                }
            }
        })
    }
</script>



<body style='min-width:0px;' >
    <!-- 右边 -->
    <div class="main-right-content">
        <h4>投资人认证</h4>

        <%if(userEntity.getAuditStatus() <= 0 || optype.equals("edit")){ %>
        <input name="token" id="token" type="hidden"></input>
        <input name="memberid" id="memberid" type="hidden" value="<%=userEntity.getUserId()%>"></input>

        <form  name="frmaction" id="frmaction">
        <input name="ischeck" id="ischeck" type="hidden" value="<%=bankcardEntities != null && bankcardEntities.size()>0 ? "0":"1"%>"></input>
            <div class="main-input">


                <!-- 姓名 -->
                <div class="input-wrap">
                    <span class="text">姓名</span>
                    <div class="input">
                        <input type="text" name="username" id="username" value="<%=FString.toString(userEntity.getUsername(),"")%>">
                    </div>
                    <p class="tips">
                        <span class="reg-valid-tip tip-hidden">请输入姓名</span>
                    </p>
                </div>



                <!-- 姓名 -->
                <div class="input-wrap">
                    <span class="text">手机</span>
                    <div class="input">
                        <input type="text" name="mobile" id="mobile" value="<%=FString.toString(userEntity.getMobile(),"")%>">
                    </div>
                    <p class="tips">
                        <span class="reg-valid-tip tip-hidden">请输入手机号</span>
                    </p>
                </div>



                <!-- 身份证号 -->
                <div class="input-wrap">
                    <span class="text">身份证号</span>
                    <div class="input">
                        <input type="text" name="idCard" id="idCard" value="<%=FString.toString(userEntity.getIdCard(),"")%>">
                    </div>
                    <p class="tips">
                        <span class="reg-valid-tip tip-hidden">根据法律规定投资人需要实名认证</span>
                    </p>
                </div>




                <!-- 上传身份证 -->
                <div class="input-wrap">
                    <span class="text">身份证正反面</span>
                    <div class="input">
                        <input type="text" class="hidden" name="frontpic" id="frontpic" value="<%=FString.toString(userEntity.getFrontpic(),"") %>"></input>
                        <input type="text" class="hidden" name="backpic" id="backpic" value="<%=FString.toString(userEntity.getBackpic(),"") %>"></input>
                        <input id="front" class="hidden" type="file"  class="file-control">
                        <input id="back" class="hidden" type="file"   class="file-control">
                        <div class="certcard">
                            <div class="uploadcard">
                                <p>请上传身份证正面</p>
                                <p class="font-plus">+</p>
                                <div class="img-wrap front_pic">
                                    <img src="<%=FString.toString(userEntity.getFrontpic(),"") %>">
                                </div>
                            </div>
                            <div class="uploadcard">
                                <p>请上传身份证反面</p>
                                <p class="font-plus">+</p>
                                <div class="img-wrap back_pic">
                                    <img src="<%=FString.toString(userEntity.getBackpic(),"") %>">
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="tips">
                    </p>
                </div>



                <div class="input-wrap">
                    <span class="text">银行卡信息</span>
                    <div class="input wrap-right">
                        <div class="type-select">
                        <%if(bankcardEntities != null && bankcardEntities.size()>0){ %>
                            <a class="type-radio" href="javascript:void(0)">选择已绑定银行卡</a>
                        <%} %>
                            <a class="type-text" href="javascript:void(0)">+ 添加绑定银行卡</a>
                        </div>
                        
                        <%String cardNoS = ""; %>
                        <%String bankNameS = ""; %>
                        <%String dotNameS = ""; %>
                        <%if(bankcardEntities != null && bankcardEntities.size()>0){%>
                            <div class="select-box radio-card">
                                <div class="card-list">
                                <%for(BankcardEntity bankcardEntity:bankcardEntities){ %>
                                    <%if(bankcardEntity.getIsdefault() == 1){cardNoS = bankcardEntity.getCardNo();bankNameS = bankcardEntity.getBankName();dotNameS = bankcardEntity.getDotName(); }%>
                                    <a class="card-item <%=bankcardEntity.getIsdefault() == 1 ?"active":"" %>" href="javascript:void(0)" cardno="<%=bankcardEntity.getCardNo() %>"><%=bankcardEntity.getCardNo() %> <%=bankcardEntity.getBankName() %></a>
                                <%} %>
                                </div>
                                <input type="text" class="hidden" id="cardnoS" name="cardnoS" value="<%=cardNoS%>">
                            </div>
                        <%}%>
                        <div class="select-box text-card">
                            <div class="inner-input">
                                <input type="text" name="cardNo" id="cardNo" value="<%=userEntity.getAuditStatus() == -1 ?cardNoS:"" %>" placeholder="银行卡号">
                            </div>
                            <div class="inner-input">
                                <input type="text" name="bankName" id="bankName" value="<%=userEntity.getAuditStatus() == -1 ?bankNameS:"" %>" placeholder="开户行">
                            </div>
                            <div class="inner-input">
                                <input type="text" name="dotName" id="dotName" value="<%=userEntity.getAuditStatus() == -1 ?dotNameS:"" %>" placeholder="开户行网点">
                            </div>
                        </div>

                    </div>
                    <p class="tips">
                        <span class="reg-valid-tip tip-hidden">请选择银行卡</span>
                    </p>
                </div>

                <!-- 身份证号 -->
                <div class="input-wrap">
                    <span class="text">验证码</span>
                    <div class="input code-input">
                        <input type="text" name="mobilevaildcode" id="mobilevaildcode" class="reg-input" placeholder="验证码"/>
                        <a href="javascript:sendMessage()" class="btnSendCode" id="btnSendCode">获取验证码</a>
                    </div>
                    <p class="tips">
                        <span class="reg-valid-tip tip-hidden">请输入手机验证码</span>
                    </p>
                </div>

                <p class="submit-btn">
                    <button id="submitCert">提交认证</button>
                </p>
            </div>
        </form>




        <%}else{ %>


            <!-- 这是显示编辑好的资料 -->
            <div class="main-input had-upload">
                <div class="text-input">
                    <span>姓名</span>
                    <p>
                        <%=FString.toString(userEntity.getUsername(),"") %>
                    </p>
                </div>
                <div class="text-input">
                    <span>手机</span>
                    <p>
                        <%=FString.toString(userEntity.getMobile(),"") %>
                    </p>
                </div>
                <div class="text-input">
                    <span>身份证号</span>
                    <p>
                        <%=FString.toString(userEntity.getIdCard(),"") %>
                    </p>
                </div>

                <div class="certcard" style="padding: 0 0px 13px 147px;">
                    <div class="uploadcard" style="border:none;">
                        <a target="_blank" href='<%=FString.toString(userEntity.getFrontpic(),"") %>' class="img-wrap">
                            <img src="<%=FString.toString(userEntity.getFrontpic(),"") %>">
                        </a>
                    </div>
                    <div class="uploadcard" style="border:none;">
                        <a target="_blank" href='<%=FString.toString(userEntity.getBackpic(),"") %>' class="img-wrap">
                            <img src="<%=FString.toString(userEntity.getBackpic(),"") %>">
                        </a>
                    </div>
                </div>

                <div class="text-input">
                    <span>银行卡号</span>
                    <p>
                        <%=FString.toString(userEntity.getCardno(),"") %>
                    </p>
                </div>

                <div class="text-input">
                    <span>审核状态</span>
                    <p>
                        <%if(userEntity.getAuditStatus() == 1){ %>
                                待审核
                        <%}else if(userEntity.getAuditStatus() == 2){ %>
                                审核通过
                        <%} %>

                    </p>
                </div>

                <%if(userEntity.getAuditStatus() == 2){ %>
                <p class="submit-btn">
                    <button id="edit">资料更改</button>
                </p>
                <%} %>
            </div>
        <%} %>

    </div>

    <script>
        var front = document.getElementById('front');
        var back = document.getElementById('back');

        

        // 用于压缩图片的canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        // 瓦片canvas
        var tCanvas = document.createElement('canvas');
        var tctx = tCanvas.getContext('2d');

        // 100 kb
        var maxSize = 100 * 1024

        if(!!front && !!back){
            front.addEventListener('change', function (e) {
                button = "frontpic"
                var files = Array.prototype.slice.call(front.files)
                if (files.length === 0) {
                    alert('请选择图片');
                    return;
                }
                if (files.length > 1) {
                    alert('只能选择一张图片');
                    return;
                }

                var file = files[0];
                var name = file.name;
                var size = file.size / 1024 / 1024;
                var type = file.type.split("/")[0];
                if (type != "image") {
                    alert("上传文件格式错误 , 只能上传图片文件");
                    return false;
                }



                var reader = new FileReader();
                // ~~用于将字符串转化为整数，MB前的逻辑是为了保留一位小数取整，参考：https://github.com/whxaxes/node-test/issues/11
                var fileSize = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024) / 10) + 'MB' : ~~(file.size / 1024) + 'KB';

                reader.onload = function () {
                    var result = this.result;
                    var img = new Image();
                    img.src = result;

                    // if image file size is not greater than 100 kb, upload it directly
                    if (result.length <= maxSize) {
                        img = null;
                        upload(result, file.type, $(".front_pic img")[0]);
                        return;
                    }

                    // compress image firstly after uploaded completely, and then upload it
                    if (img.complete) {
                        callback();
                    } else {
                        img.onload = callback;
                    }

                    function callback() {
                        var data = compress(img);
                        upload(data, file.type, $(".front_pic img")[0]);
                        img = null;
                    }
                }

                reader.readAsDataURL(file);
            }, false);

            back.addEventListener('change', function (e) {
                button = "backpic";
                var files = Array.prototype.slice.call(back.files);
                if (files.length === 0) {
                    alert('请选择图片')
                    return
                }
                if (files.length > 1) {
                    alert('只能选择一张图片')
                    return
                }

                var file = files[0];
                var name = file.name;
                var size = file.size / 1024 / 1024;
                var type = file.type.split("/")[0];
                if (type != "image") {
                    alert("上传文件格式错误 , 只能上传图片文件");
                    return false;
                }

                var name = file.name;
                var size = file.size / 1024 / 1024;
                var type = file.type.split("/")[0];
                if (type != "image") {
                    alert("上传文件格式错误 , 只能上传图片文件");
                    return false;
                }

                var reader = new FileReader();
                reader.onload = function () {
                    var result = this.result
                    var img = new Image()
                    img.src = result

                    // if image file size is not greater than 100 kb, upload it directly
                    if (result.length <= maxSize) {
                        img = null
                        upload(result, file.type, $(".back_pic img")[0]);
                        return
                    }

                    // compress image firstly after uploaded completely, and then upload it
                    if (img.complete) {
                        callback()
                    } else {
                        img.onload = callback
                    }

                    function callback() {
                        var data = compress(img)
                        upload(data, file.type, $(".back_pic img")[0]);
                        img = null
                    }
                }

                reader.readAsDataURL(file)
            }, false);
        }


        // compress large image using canvas
        function compress(objImg) {
            var initSize = objImg.src.length
            var width = objImg.width
            var height = objImg.height

            // 如果图片大于400万像素，计算压缩比并将大小压至400万以下
            var ratio
            if ((ratio = width * height / 4000000) > 1) {
                ratio = Math.sqrt(ratio)
                width /= ratio
                height /= ratio
            } else {
                ratio = 1
            }

            canvas.width = width
            canvas.height = height

            // 铺底色
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // 如果图片像素大于100万则使用瓦片绘制
            var count
            if ((count = width * height / 1000000) > 1) {
                // 计算要分成多少块瓦片
                count = ~~(Math.sqrt(count) + 1)
                var nw = ~~(width / count)
                var nh = ~~(height / count)

                tCanvas.width = nw
                tCanvas.height = nh

                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < count; j++) {
                        tctx.drawImage(objImg, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)

                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
                    }
                }
            } else {
                ctx.drawImage(objImg, 0, 0, width, height)
            }

            // 进行最小压缩
            var nData = canvas.toDataURL('image/jpeg', 0.3)

            console.log('压缩前：' + initSize)
            console.log('压缩后：' + nData.length)
            console.log('压缩率：' + ~~(100 * (initSize - nData.length) / initSize) + '%')

            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
            return nData
        }

        // 图片上传，将base64的图片转成二进制对象，塞进formdata上传
        function upload(basestr, type,imgEle) {
            var token = $("#token").val()
            var memberid = $("#memberid").val()
            imgEle.src= basestr;
            var text = window.atob(basestr.split(',')[1])
            var buffer = new Uint8Array(text.length)
            var percent = 0,
                loop = null

            for (var i = 0, len = text.length; i < len; i++) {
                buffer[i] = text.charCodeAt(i)
            }

            var blob = getBlob([buffer], type)

            var xhr = new XMLHttpRequest()

            var formData = getFormData()

            formData.append('file', blob)

             xhr.open('post', "/member/up?type=member/"+memberid+"&token=" + token);
            loading(1);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    loading(0);

                    var jsonData = JSON.parse(xhr.responseText)
                    var imageData = jsonData[0] || {}
                    var text = imageData.path ? '上传成功：' + imageData.path : '上传失败'

                    console.log(text)

                    clearInterval(loop)
                    console.log('进度：' + percent)

                    getToken();
                    if (jsonData != "没有上传权限") {
                        var url = jsonData;
                        Url = url;
                        if (button == "frontpic") {
                            $("#frontpic").val(url);
                        } else if (button == "backpic") {
                            $("#backpic").val(url);
                        }

                    } else {
                        alert(r.msg);
                    }

                }
            }

            // 数据发送进度，前50%展示该进度
            xhr.upload.addEventListener('progress', function(e) {
                if (loop) {
                    return
                }
                percent = ~~(100 * e.loaded / e.total) / 2
                console.log(percent)
                if (percent === 50) {
                    mockProgress()
                }
            }, false)

            function mockProgress() {
                if (loop) {
                    return
                }
                loop = setInterval(function() {
                    percent++
                    console.log(percent)
                    if (percent >= 99) {
                        clearInterval(loop)
                    }
                }, 100)
            }

            xhr.send(formData)
        }

        // 获取blob对象的兼容性写法
        function getBlob(buffer, format) {
            try {
                return new Blob(buffer, {
                    type: format
                })
            } catch (e) {
                var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder)
                buffer.forEach(function(buf) {
                    bb.append(buf)
                })
                return bb.getBlob(format)
            }
        }

        // 获取formdata
        function getFormData() {
            var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
                ~navigator.vendor.indexOf('Google') &&
                ~navigator.userAgent.indexOf('Chrome') &&
                navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534
            return isNeedShim ? new FormDataShim() : new FormData()
        }

        // formData 补丁，给不支持formdata上传blob的android机打补丁
        // 构造函数
        function FormDataShim() {
            console.warn('using dormdata shim')
            var o = this,
                parts = [],
                boundary = new Array(21).join('-') + (+new Data() * (1e6 * Math.random())).toString(36),
                oldSend = XMLHttpRequest.prototype.send

            this.append = function(name, value, fileName) {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"')
                if (value instanceof Blob) {
                    parts.push('; filename="' + (fileName || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n')
                    parts.push(value)
                } else {
                    parts.push('\r\n\r\n' + value)
                }
                parts.push('\r\n')
            }

            // 重写XHR send()方法
            XMLHttpRequest.prototype.send = function(val) {
                var fr,
                    data,
                    oXHR = this;
                if (val === o) {
                    // Append the final boundary string
                    parts.push('--' + boundary + '--\r\n');
                    // Create the blob
                    data = getBlob(parts);
                    // Set up and read the blob into an array to be sent
                    fr = new FileReader();
                    fr.onload = function() {
                        oldSend.call(oXHR, fr.result);
                    };
                    fr.onerror = function(err) {
                        throw err;
                    };
                    fr.readAsArrayBuffer(data);
                    // Set the multipart content type and boudary
                    this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                    XMLHttpRequest.prototype.send = oldSend;
                } else {
                    oldSend.call(this, val);
                }
            }
        }
    </script>

</body>

</html>
