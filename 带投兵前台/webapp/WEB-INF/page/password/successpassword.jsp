<!DOCTYPE html>
<%@page import="io.renren.utils.R"%>
<html lang="zh">
<%@page import="java.util.List"%>
<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
	R r = request.getAttribute("r") != null ? (R)request.getAttribute("r"):null;
%>


<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>找回密码成功</title>
    <link rel="stylesheet" type="text/css" href="/statics/css/action_response.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="/statics/libs/base.js"></script>
    <style>
        html,body{
            background: #eaeaea;
        }
    </style>
    <script>
        $(function () {
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
            <div class="action-response">
                <div>
                    <p class="success">恭喜你 , 找回密码成功</p>
                    <p class="jump">
                        将在<strong class="second">5</strong>秒后跳转到登录页面
                    </p>
                    <a class="alink btn" href="/">不等了 , 直接登录</a>
                </div>
            </div>
        </div>
        <!-- 主要内容 end -->


        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true" />
        <!-- 页面底部 end -->
    </div>
</body>

</html>