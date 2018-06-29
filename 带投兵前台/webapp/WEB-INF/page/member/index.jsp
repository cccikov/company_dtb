<!DOCTYPE html>
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
	int unsign = request.getAttribute("unsign") != null ? Integer.valueOf(request.getAttribute("unsign").toString()):0;
	int unpay = request.getAttribute("unpay") != null ? Integer.valueOf(request.getAttribute("unpay").toString()):0;
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>会员中心</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/me.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script src="/statics/libs/base.js"></script>
    <script type="text/javascript" src="/statics/libs/me.js"></script>
    <script type="text/javascript" src="/statics/libs/jquery.validate.1.9.min.js"></script>
</head>
   <script type="text/javascript">
	var InterValObj; //timer变量，控制时间
	var count = 30; //间隔函数，1秒执行
	var curCount;//当前剩余秒数
	var clickCount = 0;
	var cclickCount = 0;
	
	jQuery(function($){

		<%if(unpay > 0){%>
			showTips2();
		<%}%>
		
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
				label.html("&nbsp;").attr("class","reg-valid-valid");
			},
			rules:{
				oldpassword:{
					required:true,
					isPassword:true
				},
				newpassword:{
					required:true,
					isPassword:true
				},
				newpassword2:{
					equalTo: "#newpassword"
				}
			},
			messages:{
				oldpassword:{
					required:'密码长度6-16位，支持数字、字母、字符'
				},
				newpassword:{
					required:'密码长度6-16位，支持数字、字母、字符'
				},
				newpassword2:{
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

		$("#change").click(function(){
			if (!$("#frmAction").valid()) {
		        return;
		     }
			var data = $("#frmAction").serializeArray();
		    $.ajax({
		      url: "/member/changgepassword",
		      data: data,
		      success: function(r){

		    	  var result = eval('('+r+')');
		    	  if(result.code != "500"){
		    		  alert("修改成功")
		    	  }else{
		    		  alert(r.msg)
		    	  }
		      }
		    });
		})

	});





	</script>
<body>
    <div id="wrap">

        <!-- 导航 begin -->
        <%@ include file="../header.html"%><!--动态包含-->
        <!-- 导航 end -->



        <!-- 主要内容 begin -->
        <div class="main width-wrap">

            <!-- 左边 -->
            <div class="main-left">

                <!-- 头像区 -->
                <div class='self'>
                    <p class="img-wrap">
                        <img src="<%=FString.toString(userEntity.getPic(),"").equals("") ? "/statics/img/default.jpg":userEntity.getPic() %>">
                    </p>
                    <strong><%=FString.toString(userEntity.getUsername(),"").equals("") ?userEntity.getTradername():userEntity.getUsername()  %></strong>
                    <a href="javascript:modify()">修改密码</a>
                </div>

                <!-- 链接区 -->
                <ul>
                    <li>
                        <a class="active" href="/member/project">我的项目
                        <%if(unsign > 0){ %>
                        <i></i>
                        <%} %></a>
                    </li>
                     <li>
                        <a href="/member/delivery">投后管理</a>
                    </li>
                    <li>
                        <a href="/member/contract">合同管理</a>
                    </li>
                     <li>
                        <a href="/member/bookmark">我的收藏</a>
                    </li>
                    <li>
                        <a href="/member/cert">投资人认证</a>
                    </li>
                    <li>
                        <a href="/member/card">银行卡管理</a>
                    </li>
                </ul>

            </div>

            <!-- 右边 -->
            <div class="main-right">
                <iframe id="ifr" scrolling="no" name="ifr" src="/member/project"></iframe>
            </div>


        </div>
        <!-- 主要内容 end -->

        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->

        <div class="float">
            <div class="tips-float">
               正跳转到合同签署界面......
            </div>
            <div class="tips2-float">
                <a class="close" onclick="hideTips2();" href="javascript:void(0)"></a>
                <h5>提示</h5>
                <p>你有未完成得付款订单，请及时查看并处理，谢谢。</p>
                <button onclick="hideTips2();">确认</button>
            </div>
        </div>

        <form name="frmAction" id="frmAction" action="/" method="post">
            <div class="float">
                <div class="password-float">
                    <a class="close" href="javascript:void(0)" onclick="cancel()"></a>

                    <!-- new-main-middle begin -->
                    <div class="new-main-middle">
                        <h4>修改密码</h4>
                        <!-- new-register begin -->
                        <div class="new-register">

                            <!-- 密码 -->
                            <p class="fmreg-item">
                                <span class="item2">
                                    <input type="password" name="oldpassword" id="oldpassword" class="reg-input" placeholder="原密码" />
                                </span>
                                <span class="item3">
                                    <span class="reg-valid-tip"></span>
                                </span>
                            </p>
                            <!-- 密码 -->
                            <p class="fmreg-item">
                                <span class="item2">
                                    <input type="password" name="newpassword" id="newpassword" class="reg-input" placeholder="新密码" />
                                </span>
                                <span class="item3">
                                    <span class="reg-valid-tip"></span>
                                </span>
                            </p>
                            <!-- 密码 -->
                            <p class="fmreg-item">
                                <span class="item2">
                                    <input type="password" name="newpassword2" id="newpassword2" class="reg-input" placeholder="确认新密码" />
                                </span>
                                <span class="item3">
                                    <span class="reg-valid-tip"></span>
                                </span>
                            </p>

                            <!-- 提交 -->
                            <p class="fmreg-item submit">
                                <button id="change">确定</button>
                            </p>
                        </div>
                        <!-- new-register end -->
                    </div>
                    <!-- new-main-middle end -->

                </div>
            </div>
        </form>

    </div>

</body>

</html>

