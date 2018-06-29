<!DOCTYPE html>
<%@page import="io.renren.utils.FDate"%>
<%@page import="io.renren.utils.FString"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="dtb.fund.entity.PjFinacingEntity"%>
<%@page import="java.util.Map"%>
<%@page import="java.text.ParseException"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Date"%>
<%@page import="dtb.fund.entity.PjDocumentEntity"%>
<%@page import="dtb.fund.entity.PjInfoEntity"%>
<%@page import="io.renren.utils.PageUtils"%>
<html lang="zh">
<%@page import="java.util.List"%>
<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";

	PageUtils pageUtils = request.getAttribute("pageUtil") != null ? (PageUtils)request.getAttribute("pageUtil"):null;
	List<PjInfoEntity> pjInfoEntities = pageUtils != null ? (List<PjInfoEntity>)pageUtils.getList():null;
	Map<String, Object> params = request.getAttribute("params") != null ? (Map<String, Object>)request.getAttribute("params"):null;
	String qstatus = request.getAttribute("qstatus") != null ? (String)request.getAttribute("qstatus"):null;
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="带投兵（深圳）网络科技股份有限公司，是一家专注于高新技术创新与文化娱乐产业的互联网股权直投平台。">
    <meta name="Keywords" content="带投兵，股权众筹，股权直投，股权众筹平台，股权直投平台，投资理财，网上投资，网上理财，股权投资，daitoubing，新型股权直投平台">
    <title>募集项目</title>
    <link rel="shortcut icon" href="/statics/img/favicon.ico" />
    <link rel="icon" href="/statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/project.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="/statics/libs/base.js"></script>
</head>
<script type="text/javascript">
var now = new Date();
now.setTime(<%=(Calendar.getInstance()).getTimeInMillis()%>);
var arrDates = new Array(0);
var arrTimerLabels = new Array(0);

 function timerWork() {
        now.setTime(now.getTime() + 1000);
        for (var i = 0; i < arrTimerLabels.length; i++) {
            var date3 = arrDates[i] - now.getTime();
            arrTimerLabels[i].innerHTML = getLeaveDay(date3);
        }
    }
    function registerDateTimer(oLabel, iPayDate) {
        if (iPayDate - now.getTime() > 0) {
            arrTimerLabels[arrTimerLabels.length] = oLabel;
            arrDates[arrDates.length] = iPayDate;
        } else {
            oLabel.innerHTML = "<p class='error'><em>已超时</em></p>";
        }
    }

    function getLeaveDay(date3) {
        if (date3 < 0) {
            return "<p class='error'><em>已超时</em></p>";
        }
        var days = Math.floor(date3 / (24 * 3600 * 1000));
        //计算出小时数
        var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000));
        //计算相差分钟数
        var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        var minutes = Math.floor(leave2 / (60 * 1000));
        //计算相差秒数
        var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        var seconds = Math.round(leave3 / 1000);
        var s = "<p>" + (days > 0 ? ("<span>"+days+"</span>天") : "") + (hours > 0 ? ("<span>"+hours+"</span>时") : "") + "<span>"+minutes+"</span>分<span>"+seconds+"</span>秒";
        return s;
    }

    function startShowTimer() {
        timerWork();
        window.setInterval('timerWork()', 1000);
    }


</script>
<body onLoad="startShowTimer();">
    <div id="wrap" >
        <!-- 导航 begin -->
        <%@ include file="../header.html"%><!--动态包含-->
        <!-- 导航 end -->


            <!-- 主要内容 begin -->
            <div class="main width-wrap">

                <div class="main-top">

                    <!-- 募集状态 -->
                    <div class="main-top-status">
                        <p>
                            <a name="statuspara" <%=qstatus.equals("all")?"class='active'":""%> href="/project/projpage/all/1" status="">全部</a>
                            <a name="statuspara" <%=qstatus.equals("20")?"class='active'":""%> href="/project/projpage/20/1" status="20">预热中</a>
                            <a name="statuspara" <%=qstatus.equals("30")?"class='active'":""%> href="/project/projpage/30/1" status="30">募集中</a>
                            <a name="statuspara" <%=qstatus.equals("50")?"class='active'":""%> href="/project/projpage/50/1" status="50">交割中</a>
                            <a name="statuspara" <%=qstatus.equals("100")?"class='active'":""%> href="/project/projpage/100/1" status="100">成功</a>
                        </p>
                    </div>

                </div>
                <!-- main-top end -->

                <ul class="list">
                 <%for(PjInfoEntity pjInfoEntity:pjInfoEntities){ %>
                        <%
                        String style = "";
                        if(pjInfoEntity.getStatus() == 20){
                            style = "yr-project";
                        }else if(pjInfoEntity.getStatus() == 30){
                            style = "mj-project";
                        }else if(pjInfoEntity.getStatus() == 40){
                            style = "cz-project";
                        }else if(pjInfoEntity.getStatus() == 50){
                            style = "jg-project";
                        }else if(pjInfoEntity.getStatus() == 100){
                            style = "finish-project";
                        }
                        %>

                        <li class="<%=style%>">
	                        <a href="/project/projdetail/<%=pjInfoEntity.getId()%>" target="_blank">
	                            <!-- 363*245 -->
	                            <%Map<String,List<PjDocumentEntity>> pjDocumentEntities = pjInfoEntity.getPjDocumentEntities(); %>
	                            <div class="img-wrap">
	                                <i class="img" style="background-image: url(<%=pjDocumentEntities.get("SY")==null?"":pjDocumentEntities.get("SY").get(0).getPic() %>)" alt="<%=pjInfoEntity.getName() %>)" ></i>
	                            </div>
	                            <div class="project-content">
	                                <!-- 项目标题与简介 -->
	                                <div class="part1">
	                                    <h5><span><%=pjInfoEntity.getName() %></span></h5>
	                                    <p>
	                                    	<%=pjInfoEntity.getBrief() %>
	                                    </p>
	                                </div>
	                                <!-- 项目进度 -->
	                                <div class="part2">
	                                    <div class="project-percent">
	                                        <div class="percent" style="width:<%=pjInfoEntity.getCompletePercent()%>%;">
	                                            <span><%=pjInfoEntity.getCompletePercent()%>%</span>
	                                        </div>
	                                    </div>
	                                    <div class="project-msg">
	                                        <span>目标：<em><%=FString.changeMillion(pjInfoEntity.getPjFinacingEntity().getAmount()) %></em></span>
	                                        <span class="yr-hidden">已募集总额：<em><%=FString.changeMillionByRound(pjInfoEntity.getOrderAmount()) %></em></span>
	                                    </div>
	                                </div>

	                                 <%
                                    Date pjbegindate = pjInfoEntity.getPjbegindate();
                                    Date pjenddate = pjInfoEntity.getPjenddate();
                                    int preheatdays = pjInfoEntity.getPjFinacingEntity().getPreheatdays();
                                    int raisedays = pjInfoEntity.getPjFinacingEntity().getRaisedays();
                                    int contributivedays = pjInfoEntity.getPjFinacingEntity().getContributivedays();
                                    int deliverydays = pjInfoEntity.getPjFinacingEntity().getDeliverydays();

                                    long begindate = pjbegindate.getTime();
                                    long enddate = pjbegindate.getTime();
                                    long preheatdate = 0;
                                    long raisesdate = 0;
                                    long contributivedate = 0;
                                    long deliverydate = 0;

                                    Calendar ca = Calendar.getInstance();
                    				ca.setTime(pjbegindate);
                    				if(pjInfoEntity.getStatus() == 20){
                    					ca.add(Calendar.DATE, preheatdays);
                    					preheatdate = ca.getTime().getTime();
                    				}else if(pjInfoEntity.getStatus() == 30){
                    					ca.add(Calendar.DATE, raisedays);
                    					raisesdate = ca.getTime().getTime();
                    				}else if(pjInfoEntity.getStatus() == 40){
                    					ca.add(Calendar.DATE, contributivedays);
                    					contributivedate = ca.getTime().getTime();
                    				}else if(pjInfoEntity.getStatus() == 50){
                    					ca.add(Calendar.DATE, deliverydays);
                    					deliverydate = ca.getTime().getTime();
                    				}

                                    %>
									<%if(pjInfoEntity.getStatus() != 50){ %>
										<!-- 剩余时间 -->
		                                <div class="part3" id="lblDates_<%=pjInfoEntity.getId() %>">
	                                        <%if(pjInfoEntity.getStatus() == 20){ %>
		                                        <%if(preheatdays > 0){ %>
		                                        <script type="text/javascript">
	        										registerDateTimer(document.getElementById("lblDates_<%=pjInfoEntity.getId() %>"),<%=preheatdate%>);
	        									</script>
		                                        <%}else{ %>
		                                        <p><span>--</span>天<span>--</span>时<span>--</span>分<span>--</span>秒
		                                        <%} %>
	                                        <%}else if(pjInfoEntity.getStatus() == 30){ %>
		                                        <%if(raisedays > 0){ %>
		                                        <script type="text/javascript">
	        										registerDateTimer(document.getElementById("lblDates_<%=pjInfoEntity.getId() %>"),<%=raisesdate%>);
	        									</script>
	        									<%}else{ %>
		                                        <p><span>--</span>天<span>--</span>时<span>--</span>分<span>--</span>秒
		                                        <%} %>
	                                        <%}else if(pjInfoEntity.getStatus() == 40){ %>
		                                        <%if(contributivedays > 0){ %>
		                                        <script type="text/javascript">
	        										registerDateTimer(document.getElementById("lblDates_<%=pjInfoEntity.getId() %>"),<%=contributivedate%>);
	        									</script>
	        									<%}else{ %>
		                                        <p><span>--</span>天<span>--</span>时<span>--</span>分<span>--</span>秒
		                                        <%} %>
	                                        <%}else if(pjInfoEntity.getStatus() == 50){ %>
		                                        <%if(deliverydays > 0){ %>
		                                        <script type="text/javascript">
	        										registerDateTimer(document.getElementById("lblDates_<%=pjInfoEntity.getId() %>"),<%=deliverydate%>);
	        									</script>
	        									<%}else{ %>
		                                        <p><span>--</span>天<span>--</span>时<span>--</span>分<span>--</span>秒
		                                        <%} %>
	                                        <%} %>
	                                    </div>
									<%} %>
	                            </div>
	                        </a>
	                    </li>
                 <%} %>

                </ul>


                <!-- 分页 -->
                <div class="pageBtn">
                    <%out.println(pageUtils.genNoFormHtml( "/project/projpage/"+qstatus)); %>
                </div>

            </div>
            <!-- 主要内容 end -->
            <input type="hidden" name="qstatus" id="qstatus" value="<%=qstatus%>">

        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->

    </div>
</body>

</html>

