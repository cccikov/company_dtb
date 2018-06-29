<!DOCTYPE html>
<%@page import="dtb.fund.entity.PjVotedEntity"%>
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
	Map<String, Object> params = request.getAttribute("params") != null ? (Map<String, Object>)request.getAttribute("params"):null;
	List<PjVotedEntity> pjVotedEntities = pageUtil != null ? (List<PjVotedEntity>)pageUtil.getList():null;
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>投后附件</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/me_frame.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script src="/statics/libs/base.js"></script>
    <script type="text/javascript" src="/statics/libs/me.js"></script>
</head>
<script type="text/javascript">
$(function() {
	$("a[name=check]").click(function(){
		$("input[name=url]").val($(this).attr("src"));
		$("form[name=frmAction]").attr("action","/project/pview") ;
		$("form[name=frmAction]").attr("target","_blank") ;
		$("form[name=frmAction]").submit();
		$("form[name=frmAction]").attr("action","/member/voteddetail") ;
		$("form[name=frmAction]").removeAttr("target","_blank") ;
	})
})

</script>
<body style='min-width:0px;'>
    <!-- 右边 -->
    <form action="/member/voteddetail" name="frmAction" method="post">
    <input type="hidden" name="pjid" value="<%=params.get("pjid").toString()%>">
    <input type="hidden" name="url" value="">
    <div class="main-right-content">
            <h4>投后附件列表</h4>
            <div class="contract">
                <table class="contract-table">
                    <tr>
                        <th></th>
                        <th>附件名称</th>
                        <th>所属项目</th>
                        <th>上传时间</th>
                        <th>操作</th>
                    </tr>
                    <%if(pjVotedEntities != null){ int i = 0;%>
                    	<%for(PjVotedEntity pjVotedEntity:pjVotedEntities){i = i + 1; %>
                    	<tr>
	                        <td><%=i %></td>
	                        <td><%=pjVotedEntity.getName() %></td>
	                        <td><%=pjVotedEntity.getPjInfoEntity().getName() %></td>
	                        <td><%=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(pjVotedEntity.getCreatetime())  %></td>
	                        <td>
	                        <%if(pjVotedEntity.getIsdownload() == 10){ %>
	                        	<a  href="<%=pjVotedEntity.getPic()%>" download="<%=pjVotedEntity.getPic()%>" >下载</a>
	                        <%} %>
                           		
                           		<a href='#' src="<%=pjVotedEntity.getPic()%>" name="check" >查看</a>
	                        </td>
	                    </tr>
                    	<%} %>
                    <%} %>
                    
                </table>
            </div>
        </div>
        <div class="pageBtn">
       		<%out.println(pageUtil.genSimpleHtml("frmAction", "/member/voteddetail")); %>
        </div>
    </form>
</body>

</html>

