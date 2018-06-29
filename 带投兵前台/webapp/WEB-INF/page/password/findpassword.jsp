<!DOCTYPE html>
<html lang="zh">
<%@page import="java.util.List"%>
<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
%>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>带投兵</title>
    <link rel="stylesheet" type="text/css" href="/statics/css/register.css">
    <script src="/statics/libs/jquery.min.js"></script>
    <script type="text/javascript" src="/statics/libs/base.js"></script>
    
    <script type="text/javascript" src="/statics/libs/jquery.validate.1.9.min.js"></script>
    <style>
		.main{
			padding: 65px 0 195px;
		}
		.main-wrap{
			padding: 50px 0;
		}
	</style>
    <script type="text/javascript">
	var InterValObj; //timer变量，控制时间
	var count = 30; //间隔函数，1秒执行
	var curCount;//当前剩余秒数
	var clickCount = 0;
	var cclickCount = 0;
	jQuery(function($){

		$.validator.addMethod("isMobile", function(value, element){
			var chrnum = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
			return this.optional(element) || (chrnum.test(value));
		}, "请输入正确的手机号码");

		
		var attemp=0,flag=true;

		
		
		// 表单验证
		$('#frmAction').validate({
			//debug:true,
			onkeyup: false,
			onfocusout:function(element){
				$(element).valid();
			},
			errorPlacement:function(error, element){
				var placeholder=element.parents('.item2').next('.item3');
				placeholder.find('span.reg-valid-valid').remove();
				placeholder.find('span.reg-valid-error').remove();
				error.appendTo(placeholder);
			},
			errorClass:'reg-valid-error',
			errorElement:'span',
			success: function(label){
				label.html("").attr("class","reg-valid-valid");
			},
			rules:{
				mobile:{
					required:true,
					isMobile:true,
					remote:{
						url:"/password/valid?optype=validmobile",
						data:{
							mobile:function(){return $('#mobile').val();}
						}
					}
				},
				mobilevaildcode:{
					required:true,
					remote:{
						url:"/password/valid?optype=validmobilecode",
						data:{
							mobilevaildcode:function(){return $('#mobilevaildcode').val();},
							mobile:function(){return $('#mobile').val();}
						}
					}
				}
			},
			messages:{
				mobile:{
					required:'请输入已注册手机号码',
					remote:'该手机号码无效！'
				},
				mobilevaildcode:{
					required:'请输入短信验证码',
					remote:'验证码错误或已失效！'
				}
			}
		});

		
		$('input').focus(function(){
			if($(this).is(":text"))
				$(this).addClass('reg-input-focus');
			if(!$(this).hasClass('reg-valid-error')&&$(this).parent().next('.item3').find('span.reg-valid-error').size()==0)
				$(this).parent().next('.item3').find('.reg-valid-tip').removeClass('tip-hidden').siblings().remove();
		});

		$('input').blur(function(){
			$(this).removeClass('reg-input-focus').parent().next('.item3').find('.reg-valid-tip').addClass('tip-hidden');
		});

		$("#submit").click(function(){
			frmAction.submit();
		})

		$("#mobile").blur(function(){
			if($("#frmAction").validate().element($("#mobile")) != false){
				var mobile = $(this).val();
				var vmobile = $("#vmobile").val();
				if(vmobile == ""){
					$("#vmobile").val(mobile);
				}else if(vmobile != mobile){
					$("#vmobile").val(mobile);
					refreshCode();
				}
			}
		})
	});


	 //timer处理函数
	function SetRemainTime() {
	    if (curCount == 0) {
	        window.clearInterval(InterValObj);//停止计时器
	        $("#btnSendCode").attr("href","javascript:sendMessage()");
	        $("#btnSendCode").html("重新发送短信验证码");
	        clickCount = clickCount + 1;
	    }
	    else {
	        curCount--;
	        $("#btnSendCode").html("重新获取("+curCount +")");
	    }
	}

	function sendMessage() {
		if(clickCount > 0){
			if(cclickCount != clickCount){
				cclickCount = clickCount
				return;
			}

		}
		 if( $("#frmAction").validate().element($("#mobile")) ==true){
			 var mobile = $('#mobile').val();
				var reg=/^1[3|4|5|6|7|8][0-9]\d{8}$/;
				  if(!reg.test(mobile))
				  {
					$('#mobile').focus();
					$('#mobile').val("")
				   return ;
				  }
			    curCount = count;
				//设置button效果，开始计时
				$("#btnSendCode").attr("href","javascript:void(0)");
				$("#btnSendCode").html("重新获取("+curCount +")");
				InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
				
				(jQuery).ajax({
					 type : "POST",
					 url : "/password/sendcode",//发送验证码
					 success : function(data) {
						 var obj  = eval("("+data+")");
						 var flag = obj[0].flag;
						 if(flag == "1"){
							 alert(obj[0].msg)
						 }
					 }
				})
		 }
	}

	
	</script>
</head>

<body>
	<div id="wrap">

		<!-- 导航 begin -->
		<jsp:include page="../header.jsp" flush="true" />
		<!--动态包含-->
		<!-- 导航 end -->

		<form name="frmAction" id="frmAction" action="/password/resetpassword" method="post">
			<input type="hidden" name="vmobile" id="vmobile" />
			<!-- 主要内容 begin -->
			<div class="main width-wrap">

				<div class="main-wrap">

					<!-- new-main-middle begin -->
					<div class="new-main-middle">
						<h4 style="text-align:center">找回密码</h4>
						<!-- new-register begin -->
						<div class="new-register">

							<!-- 手机号 -->
							<p class="fmreg-item">
								<span class="text"></span>
								<span class="item2">
									<input type="text" name="mobile" id="mobile" class="reg-input" placeholder="已注册手机号"/>
								</span>
								<span class="item3">
									<span class="reg-valid-tip"></span>
								</span>
							</p>
							<!-- 验证码 -->
							<p class="fmreg-item code">
								<span class="text"></span>
								<span class="item2">
									<input type="text" name="picvalidcode" id="picvalidcode" class="reg-input" placeholder="验证码"/>
									<img src="/captcha.jpg" id="codepic">
									<span class="alink" onclick="refreshCode()">看不清?换一个</span>
								</span>
								<span class="item3">
									<span class="reg-valid-tip"></span>
								</span>
							</p>
							<!-- 短信验证码 -->
							<p class="fmreg-item message">
								<span class="text"></span>
								<span class="item2">
									<input type="text" name="mobilevaildcode" id="mobilevaildcode" class="reg-input" placeholder="短信验证码"/>
									<a href="javascript:sendMessage()" class="btnSendCode" id="btnSendCode">获取验证码</a>
								</span>
								<span class="item3">
									<span class="reg-valid-tip"></span>
								</span>
							</p>

							<!-- 提交 -->
							<p class="fmreg-item submit">
								<button>下一步</button>
							</p>
						</div>
						<!-- new-register end -->
					</div>
					<!-- new-main-middle end -->



				</div>
				<!-- main-wrap end -->


			</div>
			<!-- 主要内容 end -->
		</form>

		<!-- 页面底部 begin -->
		<jsp:include page="../bottom.jsp" flush="true" />
		<!--动态包含-->
		<!-- 页面底部 end -->

	</div>
</body>
</html>
