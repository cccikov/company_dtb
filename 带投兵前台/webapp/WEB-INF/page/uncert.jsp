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
    <title>募集项目</title>
    <link rel="shortcut icon" href="/statics/img/favicon.ico" />
    <link rel="icon" href="/statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/project_detail.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="/statics/libs/base.js"></script>
</head>

<body>
    <div id="wrap">
        <!-- 导航 begin -->
        <%@ include file="header.html"%><!--动态包含-->
        <!-- 导航 end -->

        <!-- 主要内容 begin -->
        <div class="main" style="text-align:center;padding:30px 0 200px">
            <img src="/statics/img/mao.jpg">
        </div>
        <!-- 主要内容 end -->

        <!-- 页面底部 begin -->
        <jsp:include page="bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->


        <div class="float">
            <div class="mask black-mask active">
            </div>
            <div class="cert-float active">
                <h4>认证查看项目详情</h4>
                <p>尊敬的带投兵用户：</p>
                <p>根据国家相关规定，互联网非公开股权融资平台不得通过报刊、电台、电视、互联网等公众传播媒体或者讲座、报告会、分析会和布告、传单、手机短信、微信、博客和电子邮件等方式，向不特定对象宣传推介。本平台谨遵国家规定，只向特定的投资者展示相关股权融资产品。</p>
                <p>本平台所展示的项目信息来自于融资公司、带投人等机构提供的信息资料，融资公司、带投人对其提供信息的真实可靠性和完整准确性负责。本平台提供的宣传推介材料仅供投资者参考，不构成本平台的任何推荐或投资建议。投资者应审慎决策、独立承担风险。</p>
                <a href="/member/index?frame=cert">认证</a>
            </div>
        </div>
    </div>
</body>
</html>
