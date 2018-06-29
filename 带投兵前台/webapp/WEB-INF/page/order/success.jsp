<!DOCTYPE html>
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
	R r = request.getAttribute("r") != null ? (R)request.getAttribute("r"):null;
	String type = request.getAttribute("type") != null ? (String)request.getAttribute("type"):null;
	String pjid = "";
	if(r != null){
		Object pjidObj = r.get("pjid");
		if(pjidObj != null){
			pjid = pjidObj.toString();
		}
	}
%>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>下单</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/order.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script src="/statics/libs/base.js"></script>
</head>
<script type="text/javascript">
    $(function(){
        if($(".timeout").size()>0){
            var timer = 0;
            var n = 5
            var html = $(".timeout").html();
            timer = setInterval(function(){
                if(n<0){
                    clearInterval(timer);
                    $(".timeout")[0].click();
                    return
                }
                $(".timeout").html(html+"，"+n+"秒后自动跳转");
                n--;
            },1000)
        }
    });
</script>
<body>
    <div id="wrap">


        <!-- 导航 begin -->
        <%@ include file="../header.html"%><!--动态包含-->
        <!-- 导航 end -->


        <!-- 主要 begin -->
        <div class="main width-wrap">

			<%if(type.equals("create")){ %>
				<!-- 提交订单成功 -->
				<div class="main-content">
					<%if(r.get("code").toString().equals("500")){ %>
						<p class="upload-title">报名失败</p>
	                    <div class="upload-status error">
	                        <p><%=r.get("msg").toString() %></p>
	                    </div>
	            	<%}else{ %>
						<p class="upload-title">报名成功</p>
						<div class="upload-status success">
							<p>恭喜您，报名成功。项目正式募集阶段，我们会以短信的方式通知您进行认购！如有疑问，请联系我们工作人员。</p>
							<a class="timeout" href="/member/index?frame=project">点击返回项目详情</a>
						</div>
	            	<%} %>
				</div>









			<%}else if(type.equals("raise")){ %>


	            <!-- 更新订单成功 , 募集状态 -->
	            <div class="main-content">
	            	<%if(r.get("code").toString().equals("500")){ %>
						<p class="upload-title">更新订单失败</p>
						<div class="upload-status error">
							<p><%=r.get("msg").toString() %></p>
						</div>
	            	<%}else{ %>
						<p class="upload-title">更新订单成功</p>
		                <div class="upload-status success">
		                    <p>订单更新成功，请在规定时间内支付保证金</p>
		                    <a class="timeout" href="/order/paypage?orderid=<%=r.get("orderno")%>">支付</a>
		                </div>
	            	<%} %>
	            </div>











			<%}else if(type.equals("receipt")){ %>
				<!-- 上传凭证 -->
				<div class="main-content">
					<%if(r.get("code").toString().equals("500")){ %>
						<p class="upload-title">提交失败</p>
	                    <div class="error">
	                        <p><%=r.get("msg").toString() %></p>
	                    </div>
	            	<%}else{ %>
						<p class="upload-title">提交成功</p>
						<div class="upload-status success">
							<p>恭喜您，提交成功，我们工作人员会尽快完成审核并通知您! 如有疑问，请联系我们工作人员。</p>
							<%if(!pjid.equals("")){ %>
								<a class="timeout" href="/project/projdetail/<%=pjid%>">点击查看项目详情</a>
							<%}else{ %>
								<a class="timeout" href="/member/index?frame=project">点击查看订单</a>
							<%} %>

						</div>
	            	<%} %>
				</div>

			<%} %>




			<!-- <div class="main-content">
				<p class="upload-title">提交审核成功</p>
				<div class="upload-status success">
					<p>恭喜您，提交审核成功，我们工作人员会尽快完成审核并通知您！请留意短信通知。如有疑问，请联系我们客服人员。</p>
					<a href="###">点击查看订单，<span id="time">5</span>秒后自动跳转</a>
				</div>
				<div class="upload-status error">
					<p>恭喜您，提交审核成功，我们工作人员会尽快完成审核并通知您！请留意短信通知。如有疑问，请联系我们客服人员。</p>
				</div>
			</div> -->
        </div>
        <!-- 主要 end -->



        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->

    </div>
</body>

</html>
