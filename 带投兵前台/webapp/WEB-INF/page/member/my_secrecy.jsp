<!DOCTYPE html>
<%@page import="dtb.fund.entity.OdSecrecyEntity"%>
<%@page import="dtb.fund.entity.PjLogEntity"%>
<%@page import="io.renren.utils.PageUtils"%>
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
    List<OdSecrecyEntity> odSecrecyEntities = pageUtil != null ? (List<OdSecrecyEntity>)pageUtil.getList():null;
    Map<String, Object> params = request.getAttribute("params") != null ? (Map<String, Object>)request.getAttribute("params"):null;
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>保密金管理</title>
    <link rel="stylesheet" type="text/css" href="/statics/css/me_frame.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
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
                oLabel.innerHTML = "<font style='color:red;'>交割已超时</font>";
            }
        }

        function getLeaveDay(date3) {
            if (date3 < 0) {
                return "<font style='color:red;'>交割已超时</font>";
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
            var s = "剩" + (days > 0 ? (days + "天") : "") + (hours > 0 ? (hours + "小时") : "") + minutes + "分钟<font style='color:red'>" + seconds + "</font>秒";
            return s;
        }

        function startShowTimer() {
            timerWork();
            window.setInterval('timerWork()', 1000);
        }
    </script>
</head>

<body style="min-width:0;" onLoad="startShowTimer();">
    <form action="/member/secrecy" name="frmAction" method="post">
        <div id="wrap">
            <div class="main-right-content manage">
                <h4>保密金管理</h4>

                <ul>
                    <!-- 新 -->
                    <!-- 新 -->
                    <!-- 新 -->
                    <!-- 新 -->
                    <!-- 新 -->
                    <%for(OdSecrecyEntity odSecrecyEntity:odSecrecyEntities){ %>
                    <li>
                        <%if(odSecrecyEntity.getPjInfoEntity().getPjDocumentEntities().get("SY") != null){ %>
                            <i class="img" style="background-image: url(<%=odSecrecyEntity.getPjInfoEntity().getPjDocumentEntities().get("SY").get(0).getPic()%>)"></i>
                        <%} %>
                        <!-- 右边 -->
                        <div class="right">
                            <p class="line1">
	                            <%if(odSecrecyEntity.getStatus() == 0){ %>
	                            	<a class="detail" target="_top" href="/order/secrecypage?pjid=<%=odSecrecyEntity.getPjInfoEntity().getId()%>">上传凭证</a>
	                            <%} %>
                            </p>
                            <p class="line2">
                                <span>
                                <%if(odSecrecyEntity.getStatus() == 0){ %>
                               	 	待审核
                                <%}else if(odSecrecyEntity.getStatus() == 5){ %>
                                	审核中
                                <%}else if(odSecrecyEntity.getStatus() == 10){ %>
                               		 审核成功
                                <%}else if(odSecrecyEntity.getStatus() == 20){ %>
                                	已退款
                                <%} %>
                                </span>
                            </p>
                        </div>
                        <!-- 中间 -->
                        <div class="middle">
                            <div class="line1">
                                <!-- 项目名字 -->
                                <a href="/project/projdetail/<%=odSecrecyEntity.getPjInfoEntity().getId()%>" target="_blank"><h5><%=odSecrecyEntity.getPjInfoEntity().getName() %></h5></a>
                                <!-- 项目状态 -->
                                <span><%=odSecrecyEntity.getPjInfoEntity().getStatusDesc() %></span>
                                	<%if(odSecrecyEntity.getPjInfoEntity().getStatus() == 20 && odSecrecyEntity.getPjInfoEntity().getPjFinacingEntity().getPreheatdays() != 0){ %>
                                    <span><%=odSecrecyEntity.getPjInfoEntity().getPjFinacingEntity().getPreheatdays()%>天</span>
                                    <%}else if(odSecrecyEntity.getPjInfoEntity().getStatus() == 30 && odSecrecyEntity.getPjInfoEntity().getPjFinacingEntity().getRaisedays() != 0){ %>
                                    <span><%=odSecrecyEntity.getPjInfoEntity().getPjFinacingEntity().getRaisedays()%>天</span>
                                    <%}else if(odSecrecyEntity.getPjInfoEntity().getStatus() == 40 && odSecrecyEntity.getPjInfoEntity().getPjFinacingEntity().getContributivedays() != 0){ %>
                                    <span><%=odSecrecyEntity.getPjInfoEntity().getPjFinacingEntity().getContributivedays()%>天</span>
                                    <%}else if(odSecrecyEntity.getPjInfoEntity().getStatus() == 50 && odSecrecyEntity.getPjInfoEntity().getPjFinacingEntity().getDeliverydays() != 0){ %>
                                    <span><%=odSecrecyEntity.getPjInfoEntity().getPjFinacingEntity().getDeliverydays()%>天</span>
                                    <%} %>
                            </div>
                            <div class="line2">
								<%=odSecrecyEntity.getPjInfoEntity().getBrief() %>
                            </div>
                            <div class="line3">
                                <!-- 保密金 -->
                                <span class="span1">￥<%=odSecrecyEntity.getAmount().stripTrailingZeros().toPlainString() %></span>
                            </div>
                        </div>
                    </li>
                    <%} %>
                </ul>
            </div>
            <!-- main-right-content end -->
        </div>
        <div class="pageBtn">
            <%out.println(pageUtil.genSimpleHtml("frmAction", "/member/secrecy")); %>
        </div>
    </form>

</body>

</html>
