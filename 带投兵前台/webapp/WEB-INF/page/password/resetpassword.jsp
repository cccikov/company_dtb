<!DOCTYPE html>
<html lang="zh">
<%@page import="java.util.List"%>
<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
	String register_regingMobile = request.getAttribute("register_regingMobile") != null ? (String)request.getAttribute("register_regingMobile"):"";
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
        .item2 strong{
            display: inline-block;
            padding: 0 12px;
            line-height: 37px;
            font-weight: 500;
            font-size: 20px;
		}
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

		var attemp=0,flag=true;
		$.validator.addMethod("isPassword", function(value, element){
			var chrnum = /^[A-Za-z0-9@#]{6,16}$/;
			return this.optional(element) || (chrnum.test(value));
		}, "密码长度6-16位，支持数字、字母、字符");
		
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
				password:{
					required:true,
					isPassword:true
				},
				password2:{
					equalTo: "#password"
				}
			},
			messages:{
				password:{
					required:'密码长度6-16位，支持数字、字母、字符'
				},
				password2:{
					equalTo:'密码不一致'
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
					$("#picvalidcode").removeData("previousValue");
					refreshCode();
				}
			}
		})
	});




	
	</script>
</head>

<body>
	<div id="wrap">

		<!-- 导航 begin -->
		<jsp:include page="../header.jsp" flush="true" />
		<!--动态包含-->
		<!-- 导航 end -->

		<form name="frmAction" id="frmAction" action="/password/passwordaction" method="post">
			<!-- 主要内容 begin -->
			<div class="main width-wrap">

				<div class="main-wrap">

					<!-- new-main-middle begin -->
					<div class="new-main-middle">
						<h4 style="text-align:center">通过短信验证码找回</h4>
						<!-- new-register begin -->
						<div class="new-register">

							<!-- 手机号 -->
							<p class="fmreg-item">
								<span class="text"></span>
								<span class="item2">
									<strong>您的手机号码：<%=register_regingMobile %></strong>
								</span>
								<span class="item3">
									<span class="reg-valid-tip"></span>
								</span>
							</p>
                            <!-- 密码 -->
                            <p class="fmreg-item">
                                <span class="text"></span>
                                <span class="item2">
                                    <input type="password" name="password" id="password" class="reg-input" placeholder="设置新密码"/>
                                </span>
                                <span class="item3">
                                    <span class="reg-valid-tip">由6-21字母和数字组成，不能是纯数字或纯英文</span>
                                </span>
                            </p>
                            <!-- 密码 -->
                            <p class="fmreg-item">
                                <span class="text"></span>
                                <span class="item2">
                                    <input type="password" name="password2" id="password2" class="reg-input" placeholder="确认新密码"/>
                                </span>
                            </p>

							<!-- 提交 -->
							<p class="fmreg-item submit">
								<button>确定</button>
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