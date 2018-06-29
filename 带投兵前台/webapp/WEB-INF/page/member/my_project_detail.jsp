<!DOCTYPE html>
<%@page import="dtb.fund.entity.OdPayEntity"%>
<%@page import="io.renren.utils.FString"%>
<%@page import="dtb.fund.entity.TbUserEntity"%>
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
	PjInfoEntity pjInfoEntity = request.getAttribute("pjInfoEntity") != null ? (PjInfoEntity)request.getAttribute("pjInfoEntity"):null;
	OdOrderEntity odOrderEntity = request.getAttribute("odOrderEntity") != null ? (OdOrderEntity)request.getAttribute("odOrderEntity"):null;
	List<OdPayEntity> odPayEntities = request.getAttribute("odPayEntities") != null ? (List<OdPayEntity>)request.getAttribute("odPayEntities"):null;
	String platform_bankname = request.getAttribute("platform_bankname") != null ? (String)request.getAttribute("platform_bankname"):"";
	String platform_accno = request.getAttribute("platform_accno") != null ? (String)request.getAttribute("platform_accno"):"";
	String platform_accname = request.getAttribute("platform_accname") != null ? (String)request.getAttribute("platform_accname"):"";
%>
<script type="text/javascript">
	function pdetail(id){
		parent.location.href="/project/projdetail/"+id
	}
</script>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>交易详情</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/me_frame.css">
</head>

<body style="min-width: 0px">
    <!-- 右边 -->
    <div class="main-right-content">
        <h4>交易详情</h4>
        <div class="me-project-detail">
            <div class="info">
                <!-- 174*132 -->
                <i style="background-image: url(<%=pjInfoEntity.getPjDocumentEntities().get("SY") != null ? pjInfoEntity.getPjDocumentEntities().get("SY").get(0).getPic():""%>)"></i>
                <div class="side">
                    <p><span>起投: </span><%=FString.changeMillion(pjInfoEntity.getPjFinacingEntity().getMinamount())%></p>
                    <p><span>募集金额: </span><%=FString.changeMillion(pjInfoEntity.getPjFinacingEntity().getAmount())%></p>
                </div>
                <div class="middle">
                    <a href="javascript:pdetail(<%=pjInfoEntity.getId()%>)"><%=pjInfoEntity.getName() %></a>
                    <p><span>状态：</span><%=pjInfoEntity.getStatusDesc() %></p>
                </div>
            </div>
            <div class="detail">
                <h5>订单详情</h5>
                <p>
                    <span>订单号 :<i><%=odOrderEntity.getId() %></i></span>
                    <span>订单状态 : <i class="blue">
                    <%if(odOrderEntity.getStatus() == 0){ %>
                            	待付保密金
                    <%}else if(odOrderEntity.getStatus() == 5){ %>
                           	 保密金待审核
                    <%}else if(odOrderEntity.getStatus() == 10){ %>
                            	待付保证金
                    <%}else if(odOrderEntity.getStatus() == 15){ %>
                          	  保证金待审核
                    <%}else if(odOrderEntity.getStatus() == 20){ %>
                          	  待付余款
                    <%}else if(odOrderEntity.getStatus() == 25){ %>
                        	    余款待审核
                    <%}else if(odOrderEntity.getStatus() == 100){ %>
                          	  交易成功
                    <%}else if(odOrderEntity.getStatus() == -100){ %>
                        	    失败
	                <%}else if(odOrderEntity.getStatus() == -10){ %>
	                        	已退款
	                <%} %>
                    </i></span>
                </p>
                <p>
                    <span>意向投资金额 : <i>￥ <%=FString.changeMillion(odOrderEntity.getIntentionamount()) %></i></span>
                    <span>实际投资金额 : <i class="red ">￥ <%=FString.changeMillion(odOrderEntity.getAmount()) %></i></span>
                </p>
                <p>
                    <span>保证金金额 : <i class="red ">￥ <%=FString.changeMillion(odOrderEntity.getDepositamount()) %></i></span>
                </p>
                <p>
                    <span class="only">打款账户 : <em><%=platform_bankname %></em><em><%=platform_accname %></em><em><%=platform_accno %></em></span>
                </p>
            </div>


        </div>
    </div>
</body>

</html>
