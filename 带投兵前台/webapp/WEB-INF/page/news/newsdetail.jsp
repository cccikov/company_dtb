<!DOCTYPE html>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="dtb.fund.entity.NwNewsEntity"%>
<html lang="zh">
<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
	NwNewsEntity nwNewsEntity = request.getAttribute("nwNewsEntity") != null ? (NwNewsEntity)request.getAttribute("nwNewsEntity"):null;
%>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="带投兵（深圳）网络科技股份有限公司，是一家专注于高新技术创新与文化娱乐产业的互联网股权直投平台。">
    <meta name="Keywords" content="带投兵，股权众筹，股权直投，股权众筹平台，股权直投平台，投资理财，网上投资，网上理财，股权投资，daitoubing，新型股权直投平台">
    <title><%=nwNewsEntity.getTitle() %></title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/news_detail.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script src="/statics/libs/base.js"></script>
</head>

<body>
    <div id="wrap">
        <!-- 导航 begin -->
        <%@ include file="../header.html"%><!--动态包含-->
        <!-- 导航 end -->

		<%if(nwNewsEntity != null){ %>
		<!-- 主要内容 begin -->
        <div class="main">
            <div class="content">
                <h2 class="news-title">
                    <%=nwNewsEntity.getTitle() %>
                </h2>
                <p class="news-info">
                    <span>日期：
                        <%=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss ").format(nwNewsEntity.getCreatetime()) %>
                    </span>
                    <span>类型：
                        <%=nwNewsEntity.getSortname() %>
                    </span>
                </p>
                <div>
                    <%=nwNewsEntity.getContent() %>
                </div>
            </div>
        </div>
        <!-- 主要内容 end -->
		<%} %>
        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->
    </div>
</body>

</html>
