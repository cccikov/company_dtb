<!DOCTYPE html>
<%@page import="java.util.Map"%>
<%@page import="dtb.fund.entity.NwSortEntity"%>
<%@page import="java.util.List"%>
<%@page import="io.renren.utils.PageUtils"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="dtb.fund.entity.NwNewsEntity"%>
<html lang="zh">
<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
	List<NwSortEntity> sortEntities = request.getAttribute("sortEntities") != null ? (List<NwSortEntity>)request.getAttribute("sortEntities"):null;
	PageUtils pageUtil = request.getAttribute("pageUtil") != null ? (PageUtils)request.getAttribute("pageUtil"):null;
	List<NwNewsEntity> newsEntities = pageUtil != null ? (List<NwNewsEntity>)pageUtil.getList():null;
	Map<String, Object> params = request.getAttribute("params") != null ? (Map<String, Object>)request.getAttribute("params"):null;
	String sortid = params.get("sortid").toString();
%>

<head>
    <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width">
	<meta name="description" content="带投兵（深圳）网络科技股份有限公司，是一家专注于高新技术创新与文化娱乐产业的互联网股权直投平台。">
    <meta name="Keywords" content="带投兵，股权众筹，股权直投，股权众筹平台，股权直投平台，投资理财，网上投资，网上理财，股权投资，daitoubing，新型股权直投平台">
    <title>新闻列表</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/news.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script src="/statics/libs/base.js"></script>
</head>
<script type="text/javascript">
$(function() {
	$("a[name=sortpara]").click(function(){
		var sortid = $(this).attr("sortid");
		$("#sortid").val(sortid);
		frmAction.submit();
	})
})
</script>
<body>
    <div id="wrap">
        <!-- 导航 begin -->
        <%@ include file="../header.html"%><!--动态包含-->
        <!-- 导航 end -->
		
		<form action="/newslist" name="frmAction" method="post">
		<input type="hidden" name="sortid" id="sortid" value="<%=sortid%>">
			<!-- 主要内容 begin -->
	        <div class="main width-wrap">
	            <h4>新闻列表</h4>
	
	            <div class="news-top">
	                <p class="type">
	                    <a name="sortpara" <%=sortid.equals("")?"class='active'":""%>  sortid="" href="javascript:void(0)">全部</a>
	                    <%if(sortEntities != null){ %>
	                    	<%for(NwSortEntity sortEntitie:sortEntities){ %>
	                    		<a name="sortpara" <%=sortid.equals(sortEntitie.getId())?"class='active'":""%>  sortid="<%=sortEntitie.getId() %>" href="javascript:void(0)"><%=sortEntitie.getName() %></a>
	                    	<%} %>
	                    <%} %>
	                    
	                </p>
	                <!-- 
	                
	                <p class="sort">
	                    <a class="active" href="javascript:void(0)">时间升序</a>
	                    <a href="javascript:void(0)">时间降序</a>
	                </p>
	                -->
	            </div>
	            
	            <ul>
				<%if(newsEntities != null){ %>
                    <%for(NwNewsEntity newsEntitie:newsEntities){ %>
                    <li>
	                    <a href="newsdetail/<%=newsEntitie.getId()%>">(<%=newsEntitie.getSortname() %>)<%=newsEntitie.getTitle() %></a>
	                    <span class="time"><%=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss ").format(newsEntitie.getCreatetime()) %></span>
	                </li>
                    <%} %>
                <%} %>
				</ul>
				


				<div class="pageBtn">
					   <%out.println(pageUtil.genSimpleHtml("frmAction", "/newslist")); %>
				</div>
	        </div>
	        <!-- 主要内容 end -->
		</form>

		

        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->
    </div>
</body>

</html>
