<!DOCTYPE html>
<%@page import="io.renren.utils.PageUtils"%>
<%@page import="io.renren.utils.FDate"%>
<%@page import="dtb.fund.entity.BookmarkEntity"%>
<%@page import="io.renren.utils.FString"%>
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
	PageUtils pageUtil = request.getAttribute("pageUtil") != null ? (PageUtils)request.getAttribute("pageUtil"):null;
	List<BookmarkEntity> bookmarkEntities = pageUtil != null ? (List<BookmarkEntity>)pageUtil.getList():null;
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>我的收藏</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/me_frame.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
</head>

<script type="text/javascript">

	function unbookmark(id){
		 $.ajax({
				type: "POST",
			    url: "/member/unbookmarkProject",
			    data:{"projid":id},
			    success: function(r){
			    	var obj = eval('('+r+')');
					if(obj.code=="500"){
						alert(obj.msg)
					}else{
						 location.reload()
					}
			    }
			});
	}
	function projdetail(id){
		parent.location.href="/project/projdetail/"+id
	}
</script>
<body style='min-width:0px;'>
    <!-- 右边 -->
    <div class="main-right-content">
        <h4>我的收藏</h4>

        <ul class="tab-nav">
            <li>
                <a class="active" href="javascript:void(0)">我的收藏</a>
            </li>
        </ul>
		<form action="/member/bookmark" name="frmAction" method="post">

		
        <!-- 我的投资 -->
        <div class="tab blue active">

            <ul>

                <%if(bookmarkEntities != null){ %>
                    <%for(BookmarkEntity bookmarkEntitie:bookmarkEntities){ %>
                    <li>
                        <%if(bookmarkEntitie.getPjInfoEntity().getPjDocumentEntities().get("SY") != null){ %>
                            <i class="img" style="background-image: url(<%=bookmarkEntitie.getPjInfoEntity().getPjDocumentEntities().get("SY").get(0).getPic()%>)"></i>
                        <%} %>
                        <!-- 右边 -->
                        <div class="right">
                            <p class="line1">
                                <a class="detail" href="javascript:void(0);" onclick="unbookmark(<%=bookmarkEntitie.getPjInfoEntity().getId()%>)">取消关注</a>
                            </p>
                        </div>
                        <!-- 中间 -->
                        <div class="middle">
                            <div class="line1">
                                <a href="javascript:projdetail(<%=bookmarkEntitie.getPjInfoEntity().getId()%>)"><h5><%=bookmarkEntitie.getPjInfoEntity().getName() %></h5></a>
                                <span><%=bookmarkEntitie.getPjInfoEntity().getStatusDesc() %></span>
                            </div>
                            <div class="line2">
								<%=bookmarkEntitie.getPjInfoEntity().getBrief() %>
                            </div>
                            <div class="line3">
                                <span class="span3">￥<%=FString.changeMillion(bookmarkEntitie.getPjInfoEntity().getPjFinacingEntity().getAmount()) %></span>
                            </div>
                        </div>
                    </li>
                    <%} %>
                <%} %>
            </ul>
        </div>
        <div class="pageBtn">
       		<%out.println(pageUtil.genSimpleHtml("frmAction", "/member/bookmark")); %>
        </div>
        </form>
    </div>
</body>

</html>
