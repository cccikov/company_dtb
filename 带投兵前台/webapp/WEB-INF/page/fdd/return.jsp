<%@page import="dtb.fund.entity.CtContractEntity"%>
<%@page import="dtb.fund.entity.PjInfoEntity"%>
<%@page import="java.net.URLDecoder"%>
<%@page import="dtb.fund.vo.SignMessageEntity"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>法大大签约结果</title>
<%
SignMessageEntity fddMessage = (SignMessageEntity)request.getAttribute("fddMessage");
PjInfoEntity pjInfoEntity = (PjInfoEntity)request.getAttribute("pjInfoEntity");
CtContractEntity ctContractEntity = (CtContractEntity)request.getAttribute("ctContractEntity");
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>合同签署成功</title>
    <link rel="stylesheet" type="text/css" href="/statics/css/order.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="/statics/libs/base.js"></script>
    <script>
        $(function () {
        	<%if(pjInfoEntity.getStatus() == 20 || pjInfoEntity.getStatus() == 30 || pjInfoEntity.getStatus() == 40){ %>
        	var second = $(".second");
            var remain = Number(second.html());
            var timer = setInterval(function () {
                remain--;
                second.html(remain);
                if (remain <= 0) {
                    clearInterval(timer);
                    $(".alink")[0].click();
                }
            }, 1000);
        	<%}%>

        });
    </script>
</head>

<body>
    <div id="wrap">
        <!-- 导航 begin -->
        <jsp:include page="../header.jsp" flush="true" />
        <!-- 导航 end -->


        <!-- 主要内容 begin -->
        <div class="main width-wrap">
            <div class="content contract">
                <h5>合同签署</h5>
                <div>
                	<%if(fddMessage.getResult_code().equals("3000")){ %>
                	<p class="success">恭喜你 , 合同签署成功</p>
                	<%if(ctContractEntity.getType().equals("B")){ %>
                    <p class="jump">
                        <strong class="second">5</strong>秒后跳转到项目详情页,
                        <a class="alink" href="/project/projdetail/<%=pjInfoEntity.getId()%>">立即跳转</a>
                    </p>
                    <%}else if(pjInfoEntity.getStatus() == 40){ %>
                    <p class="jump">
                        <strong class="second">5</strong>秒后跳转到订单余款支付页面 ,
                        <a class="alink" href="/order/paypage?orderid=<%=ctContractEntity.getOrderId()%>">立即跳转</a>
                    </p>
                    <%}else if(pjInfoEntity.getStatus() == 30){ %>
	                <p class="jump">
	                    <strong class="second">5</strong>秒后跳转到订单投资页面 ,
	                    <a class="alink" href="/order/orderpage?pjid=<%=pjInfoEntity.getId()%>">立即跳转</a>
	                </p>
	                <%} %>
                    <!-- <p class="jump">
                        <a href="/member/index?frame=contract">点击查看我的合同</a>
                    </p> -->
                	<%}else{ %>
                	<p class="error">合同签署失败 , 请重新签署</p>
                	<%} %>
                </div>
            </div>
        </div>
        <!-- 主要内容 end -->



        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true" />
        <!-- 页面底部 end -->
    </div>
</body>
