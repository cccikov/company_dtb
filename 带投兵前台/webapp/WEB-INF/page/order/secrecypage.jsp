<!DOCTYPE html>
<%@page import="dtb.fund.entity.OdSecrecyEntity"%>
<%@page import="io.renren.utils.FString"%>
<%@page import="dtb.fund.entity.OdPayEntity"%>
<%@page import="dtb.fund.dao.OdOrderDao"%>
<%@page import="io.renren.utils.R"%>
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
	PjInfoEntity pjInfo = request.getAttribute("pjInfo") != null ? (PjInfoEntity)request.getAttribute("pjInfo"):null;
	OdSecrecyEntity odSecrecy = request.getAttribute("odSecrecy") != null ? (OdSecrecyEntity)request.getAttribute("odSecrecy"):null;
	String platform_bankname = request.getAttribute("platform_bankname") != null ? (String)request.getAttribute("platform_bankname"):"";
	String platform_accno = request.getAttribute("platform_accno") != null ? (String)request.getAttribute("platform_accno"):"";
	String platform_accname = request.getAttribute("platform_accname") != null ? (String)request.getAttribute("platform_accname"):"";
	List<OdPayEntity> odPayEntities = request.getAttribute("odPayEntities") != null ? (List<OdPayEntity>)request.getAttribute("odPayEntities"):null;
	BigDecimal secrecy_ratio = request.getAttribute("secrecy_ratio") != null ? (BigDecimal)request.getAttribute("secrecy_ratio"):null;
	String username = request.getAttribute("username") != null ? (String)request.getAttribute("username"):null;
%>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>上传保密金</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/order.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script src="/statics/libs/base.js"></script>
    <script src="/statics/libs/ajaxupload.js"></script>
    <script type="text/javascript">
        var Url = "";

        function loading(flag) {
            if (flag) {
                $(".loader-float", top.document).addClass("active"); // loading效果出现
            } else {
                $(".loader-float", top.document).removeClass("active"); // loading效果消失
            }
        }

        $(function() {
            // 先输入金额才可以上传
            $("#amount").on("input", function() {
                var _this = this;
                var type = $("#type").val();// 上传类型
                var max = 1000;
                if (_this.value.length > 0) { // 有值
                    var value = Number(_this.value);
                    if(!isNaN(value)){ // 是正常数字
                        if(type == "DJ" || type == "YK"){ // 单位为万的时候
                            if(value < max){ // 不超过1000万元
                                $("#upload").addClass("active");
                            }else{
                                $("#upload").removeClass("active");
                                alert("金额错误，请注意金额的单位是\"万元\"");
                            }
                        }else{ // 单位为元
                            $("#upload").addClass("active");
                        }
                    }else{
                        $("#upload").removeClass("active");
                        alert("格式错误，请输入数字。");
                    }
                } else {
                    $("#upload").removeClass("active");
                }
            });

            $("#upload").on("click",function(){
                if($(this).is(".active")){
                    $("#cert")[0].click();
                }
            });

            $(".del").click(function() {
                var secrecyid = $("#secrecyid").val();
                var receiptid = $(this).attr("receiptid");
                $.ajax({
                    type: "POST",
                    url: "/order/secrecydel",
                    data: {
                        "secrecyid": secrecyid,
                        "receiptid": receiptid
                    },
                    success: function(r) {
                        var result = eval('(' + r + ')');
                        if (result.code != "500") {
                            location.reload()
                        } else {
                            alert(result.msg);
                        }
                    }
                });
            });

            // 有内容才可以提交
            if($(".pic-table tr").length>1){
                $(".action .btn").addClass("canClick");
            }

            $("#audit").click(function() {
                formAction.submit();
            });

            getToken();
        })

        function getToken() {
            $.ajax({
                type: "POST",
                url: "/gettoken",
                success: function(r) {
                    r = JSON.parse(r);
                    token = r.token;
                    imgserver = r.imgserver;
                    $("#token").val(token);
                }
            });
        }


    </script>

</head>

<body>
    <div id="wrap">


        <!-- 导航 begin -->
        <%@ include file="../header.html"%><!--动态包含-->

        <input name="token" id="token" type="hidden"></input>

        <!-- 导航 end -->
		<%if(odSecrecy != null){ %>
		<%if(odSecrecy.getStatus() == 0){ %>
            <!-- 项目预热状态 -->
            <!-- 上传保密金凭证 -->
            <div class="main width-wrap">
                <form action="/order/secrecysubmit" method="post" name="formAction">
                    <input type="hidden" id="secrecyid" name="secrecyid" value="<%=odSecrecy.getId()%>">
                    <input type="hidden" id="type" value="BM">
        			<div class="main-content">
        				<p class="upload-title">支付保密金</p>

        				<!-- 项目table -->
        				<table class="proj-table">
        					<tr>
        						<th>项目</th>
        						<th>会员</th>
        						<th>起投金额</th>
        						<th>保密金占比</th>
        						<th>保密金</th>
        					</tr>
        					<tr>
        						<td><%=pjInfo.getName() %></td>
        						<td><%=username %></td>
        						<td><%=FString.changeMillion(pjInfo.getPjFinacingEntity().getMinamount()) %>元 </td>
        						<td><%=secrecy_ratio.multiply(new BigDecimal(100)).stripTrailingZeros().toPlainString()%>%</td>
        						<td><%=FString.changeMillion(odSecrecy.getAmount()) %>元</td>
        					</tr>
                        </table>

                        <!-- 收款账户table -->
                        <table class="bank-table" style="display:none;">
                            <tr>
                                <td>收款账户</td>
                                <td>
                                    <%=platform_bankname %>
                                </td>
                                <td>
                                    <%=platform_accname %>
                                </td>
                                <td>
                                    <%=platform_accno %>
                                </td>
                            </tr>
                        </table>

						<div class="upload-zhifubao">
							<div class="zhifubao-pay">
		                        <img src="/statics/img/zhifubao.png">
                                <p>支付宝收款码</p>
                                <a href="javascript:void(0)" onclick="$('.bank-table').show();" class="no-zhifubao">没有支付宝?</a>
		                    </div>

	        				<!-- 上传操作 按钮 -->
	        				<div class="upload-wrap">
	        					<p class="input-wrap">
	        						<span class="label-span">付款金额</span>
	        						<input class="text-input" type="text" name="amount" id="amount">
	        						<span class="tail">元</span>
	        					</p>
	        					<p class="input-wrap">
	        						<span class="label-span">上传交易凭证</span>
	        						<input class="file-upload" id="upload" type="button" value="本地上传">
                                    <input type="file" id="cert">
	        					</p>
	        				</div>
						</div>

        				<!-- 上传展示 -->
        	            <table class="pic-table">
        	                <tr>
        	                    <th>金额</th>
        	                    <th>凭证</th>
        	                    <th>操作</th>
        	                </tr>
        					<%if(odPayEntities != null){ %>
        						<%for(OdPayEntity odPayEntitie:odPayEntities){ %>
        						<tr>
        							<td><%=FString.changeMillion(odPayEntitie.getAmount()) %>元</td>
        							<td>
        								<a target="_blank" href="<%=odPayEntitie.getAttach()%>">
        									<img src="<%=odPayEntitie.getAttach()%>" alt="">
        								</a>
        							</td>
        							<td>
        								<a class="del" receiptid="<%=odPayEntitie.getId()%>" href="javascript:void(0)">删除</a>
        							</td>
        						</tr>
        						<%} %>
        					<%} %>
        	            </table>

        	            <p class="action">
        	                <a href="javascript:void(0)" class="btn" id="audit">确认提交</a>
        	            </p>


        				<!-- 提示 -->
        				<div class="tips">
        					<h5>保密金规则</h5>
        					<ul>
        						<li>保密金为项目起投额1%</li>
        						<li>支付完成后，方可在项目详情页查看核心资料</li>
        						<li>项目募集完成三个月内，保密金将退回所登记的银行卡</li>
        						<li>若泄露核心资料，则不予退还保密金，且平台保留追究法律责任的权利</li>
        					</ul>
        				</div>

        			</div>
                 </form>
    		</div>

		<%}else{ %>
		状态已发生变化，请刷新页面
		<%} %>
		<%}else{ %>
		数据不存在
		<%} %>


        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->

    </div>
    <script>
        var cert = document.getElementById('cert')

        // 用于压缩图片的canvas
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')

        // 瓦片canvas
        var tCanvas = document.createElement('canvas')
        var tctx = tCanvas.getContext('2d')

        // 100 kb
        var maxSize = 100 * 1024

        cert.addEventListener('change', function(e) {
            var files = Array.prototype.slice.call(cert.files)
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
            var size = file.size/ 1024 / 1024;
            var type = file.type.split("/")[0];
            if (type != "image") {
                alert("上传文件格式错误 , 只能上传图片文件");
                this.value = "";
                return false;
            }



            var reader = new FileReader()
                // ~~用于将字符串转化为整数，MB前的逻辑是为了保留一位小数取整，参考：https://github.com/whxaxes/node-test/issues/11
            var fileSize = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024) / 10) + 'MB' : ~~(file.size / 1024) + 'KB'

            reader.onload = function() {
                var result = this.result
                var img = new Image()
                img.src = result

                // if image file size is not greater than 100 kb, upload it directly
                if (result.length <= maxSize) {
                    img = null
                    upload(result, file.type);
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
                    upload(data, file.type);
                    img = null
                }
            }

            reader.readAsDataURL(file)
        }, false);


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
        function upload(basestr, type) {
            var token = $("#token").val();
            var memberid = $("#memberid").val()
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

             xhr.open('post', "/member/up?type=secrecy/<%=odSecrecy.getId()%>&token=" + token);
            loading(1);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    loading(0);
                    var jsonData = xhr.responseText.replace(/\"/g, "");
                    clearInterval(loop);
                    getToken();
                    if (jsonData != "没有上传权限") {
                        var url = jsonData;
                        Url = url;

                        $.ajax({
                            type: "POST",
                            url: "/order/secrecyupload",
                            data:{
                                "attach":Url,
                                "secrecyid":$("#secrecyid").val(),
                                "flag":0,
                                "amount":$("#amount").val(),
                            },
                            success: function(r){
                                var result = eval('('+r+')');
                                if(result.code == 0){
                                    location.reload()
                                }else{
                                    alert(result.msg)
                                }
                            }
                        });

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
