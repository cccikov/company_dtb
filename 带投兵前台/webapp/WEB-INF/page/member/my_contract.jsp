<!DOCTYPE html>
<%@page import="io.renren.utils.PageUtils"%>
<%@page import="dtb.fund.entity.CtContractEntity"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.ParseException"%>
<%@page import="java.util.Date"%>
<%@page import="java.util.Map"%>
<html lang="zh">
<%@page import="java.util.List"%>
<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";
	PageUtils pageUtil = request.getAttribute("pageUtil") != null ? (PageUtils)request.getAttribute("pageUtil"):null;
	List<CtContractEntity> ctContractEntities = pageUtil != null ? (List<CtContractEntity>)pageUtil.getList():null;
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>我的合同</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/me_frame.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script src="/statics/libs/base.js"></script>
    <script type="text/javascript" src="/statics/libs/me.js"></script>
</head>
<script type="text/javascript">
</script>
<body style='min-width:0px;'>
    <!-- 右边 -->
    <form action="/member/contract" name="frmAction" method="post">
    <div class="main-right-content">
            <h4>我的合同</h4>
            <div class="contract">
                <table class="contract-table">
                    <tr>
                        <th></th>
                        <th>合同编号</th>
                        <th>所属项目</th>
                        <th>合同类型</th>
                        <th>状态</th>
                        <th>生成时间</th>
                        <th>操作</th>
                    </tr>
                    <%if(ctContractEntities != null){ int i = 0;%>
                    	<%for(CtContractEntity ctContractEntitie:ctContractEntities){i = i + 1; %>
                    	<tr>
	                        <td><%=i %></td>
	                        <td><%=ctContractEntitie.getId() %></td>
	                        <td><%=ctContractEntitie.getPjinfoName() %></td>
	                        <td><%=ctContractEntitie.getType().equals("B")?"保密合同":"投资合同" %></td>
	                        <td><%=ctContractEntitie.getStatus() == 20?"已签":"待签" %></td>
	                        <td><%=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(ctContractEntitie.getCreatetime())  %></td>
	                        <td>
	                        <a  target="_blank" href="<%=ctContractEntitie.getViewpdfUrl()%>">查看合同</a>
	                        <a href="<%=ctContractEntitie.getDownloadUrl()%>">下载合同</a>
	                        <%if(ctContractEntitie.getStatus() != 20){ %>
	                        	<a target="_blank" href="<%=ctContractEntitie.getSignUrl()%>">签署合同</a>
	                        <%} %>
	                        
	                        
	                        
	                        </td>
	                    </tr>
                    	<%} %>
                    <%} %>
                    
                </table>
            </div>
        </div>
        <div class="pageBtn">
       		<%out.println(pageUtil.genSimpleHtml("frmAction", "/member/contract")); %>
        </div>
    </form>
</body>

</html>

