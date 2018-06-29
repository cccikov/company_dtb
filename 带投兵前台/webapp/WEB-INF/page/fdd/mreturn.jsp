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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>签署合同状态</title>
    <link rel="stylesheet" href="/m/css/success.css">
    <script type="text/javascript" src="/m/js/vue.min.js"></script>
    <script type="text/javascript" src="/m/js/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="/m/js/base.js"></script>
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

        <!-- 内容 begin -->
        <div class="container">
            <%if(fddMessage.getResult_code().equals("3000")){ %>
                <div class="status success">
                    <div class="icon"></div>
                    <div class="text">
                        <p class="p1">合同签署成功</p>
                    </div>
                </div>
                <%if(ctContractEntity.getType().equals("B")){ %>
                    <p class="jump">
                        <span class="tips">
                            <strong class="second">5</strong>秒后跳转到项目详情页
                        </span>
                        <a class="alink" href="/m/page/project_detail.html?id=<%=pjInfoEntity.getId()%>">立即跳转</a>
                    </p>
                <%}else if(pjInfoEntity.getStatus() == 40){ %>
                    <p class="jump">
                        <span class="tips">
                            <strong class="second">5</strong>秒后跳转到订单余款支付页面
                        </span>
                        <a class="alink" href="/m/page/pay.html?orderid=<%=ctContractEntity.getOrderId()%>">立即跳转</a>
                    </p>
                <%}else if(pjInfoEntity.getStatus() == 30){ %>
                    <p class="jump">
                        <span class="tips">
                            <strong class="second">5</strong>秒后跳转到订单投资页面
                        </span>
                        <a class="alink" href="/m/page/order.html?pjid=<%=pjInfoEntity.getId()%>">立即跳转</a>
                    </p>
                <%} %>
            <%}else{ %>
                <div class="status error">
                    <div class="icon"></div>
                    <div class="text">
                        <p class="p1">合同签署失败</p>
                        <p class="p2">请重试</p>
                    </div>
                </div>
            <%} %>
        </div>
        <!-- 内容 end -->

    </div>

</body>

</html>