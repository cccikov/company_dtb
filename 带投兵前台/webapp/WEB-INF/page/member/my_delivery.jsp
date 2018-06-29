<!DOCTYPE html>
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
    List<OdOrderEntity> odOrderEntities = pageUtil != null ? (List<OdOrderEntity>)pageUtil.getList():null;
    Map<String, Object> params = request.getAttribute("params") != null ? (Map<String, Object>)request.getAttribute("params"):null;
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>投后管理</title>
    <link rel="stylesheet" type="text/css" href="/statics/css/me_frame.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="/statics/libs/base.js"></script>
    <script type="text/javascript">
        var now = new Date();
        now.setTime(<%=(Calendar.getInstance()).getTimeInMillis()%>);
        var arrDates = new Array(0);
        var arrTimerLabels = new Array(0);


        /* 显示流程 */
        function showStep(step, alink2, alink3,alink4) {
            scrollTop = top.getScrollTop();
            top.setScrollTop(0);

            $(".mask").add(".manage-float").addClass("active");

            var arr = ["step1", "step2", "step3", "step4"];
            var activeArr = arr.slice(0, step);
            // 完成步骤操作
            activeArr.forEach(function(key) {
                var _this = $("." + key).addClass("finish");
                _this.find(".status").html("已完成");
                if(key == "step2"){
                    _this.find("a").attr("href",alink2).addClass("active");
                }
                if(key == "step3"){
                    _this.find("a").attr("href",alink3).addClass("active");
                }
                if(key == "step4"){
                    _this.find("a").attr("href",alink4).addClass("active");
                }
            });
            // 进行中
            $("." + arr[step]).find(".status").html("进行中");
        }

        /* 隐藏流程 */
        function hideStep(){
            $(".mask").add(".manage-float").removeClass("active");
            top.setScrollTop(scrollTop);
            // 清空数据
            $(".manage-float").find(".step").removeClass("finish");
            $(".manage-float").find(".status").html("");
            $(".manage-float").find("a").attr("href","javascript:void(0)").removeClass("active");
        }

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
    <form action="/member/delivery" name="frmAction" method="post">
        <div id="wrap">
            <div class="main-right-content manage">
                <h4>投后管理</h4>

                <ul>
                    <!-- 新 -->
                    <!-- 新 -->
                    <!-- 新 -->
                    <!-- 新 -->
                    <!-- 新 -->
                    <%for(OdOrderEntity odOrderEntitie:odOrderEntities){ %>
                    <li>
                        <%if(odOrderEntitie.getPjInfoEntity().getPjDocumentEntities().get("SY") != null){ %>
                            <i class="img" style="background-image: url(<%=odOrderEntitie.getPjInfoEntity().getPjDocumentEntities().get("SY").get(0).getPic()%>)"></i>
                        <%} %>
                        <!-- 右边 -->
                        <div class="right">
                            <p class="line1">
                                <%
                                Map<String,PjLogEntity> pjLogEntitieMap = odOrderEntitie.getPjInfoEntity().getPjLogEntities();
                                if(pjLogEntitieMap != null && pjLogEntitieMap.size()>0){
                                    if(pjLogEntitieMap.get("certificate") != null){
                                       %><a class="detail" href="javascript:showStep(4,'<%=pjLogEntitieMap.get("paytoowner").getPic()%>','<%=pjLogEntitieMap.get("paytofinancing").getPic()%>','<%=pjLogEntitieMap.get("certificate").getPic()%>')">查看流程</a><%
                                    }else if(pjLogEntitieMap.get("paytofinancing") != null){
                                        %><a class="detail" href="javascript:showStep(3,'<%=pjLogEntitieMap.get("paytoowner").getPic()%>','<%=pjLogEntitieMap.get("paytofinancing").getPic()%>')">查看流程</a><%
                                    }else if(pjLogEntitieMap.get("paytoowner") != null){
                                        %><a class="detail" href="javascript:showStep(2,'<%=pjLogEntitieMap.get("paytoowner").getPic()%>')">查看流程</a><%
                                    }else if(pjLogEntitieMap.get("paymentreceived") != null){
                                        %><a class="detail" href="javascript:showStep(1)">查看流程</a><%
                                    }
                                }else{
                                    %><a class="detail" href="javascript:showStep(0)">查看流程</a><%
                                }
                                %>
                                <%if(odOrderEntitie.getVotedCount() > 0 ){ %>
                                	<a class="detail" href="/member/voteddetail?pjid=<%=odOrderEntitie.getProjid()%>">查看附件</a>
                                <%} %>
                            </p>
                            <p class="line2">
                                <span>
                                <%if(odOrderEntitie.getPjInfoEntity().getStatus() == 50){ %>
                               	 	交割中
                                <%}else if(odOrderEntitie.getPjInfoEntity().getStatus() == 100){ %>
                                	交割成功
                                <%}else if(odOrderEntitie.getPjInfoEntity().getStatus() == -100){ %>
                               		 交割失败
                                <%} %>
                                </span>
                            </p>
                        </div>
                        <!-- 中间 -->
                        <div class="middle">
                            <div class="line1">
                                <!-- 项目名字 -->
                                <a href="projectdetail?orderid=<%=odOrderEntitie.getId()%>"><h5><%=odOrderEntitie.getPjInfoEntity().getName() %></h5></a>
                                <!-- 项目状态 -->
                                <span>交割</span>
                                <%if(odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getDeliverydays() > 0){ %>
                                	<span><%=odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getDeliverydays() %>天</span>
                                <%} %>
                            </div>
                            <div class="line2">
								<%=odOrderEntitie.getPjInfoEntity().getBrief() %>
                            </div>
                            <div class="line3">
                                <!-- 保密金 -->
                                <span class="span1">￥<%=odOrderEntitie.getSecrecyamount().stripTrailingZeros().toPlainString() %></span>
                                <!-- 保证金 -->
                                <span class="span2">￥<%=odOrderEntitie.getDepositamount().stripTrailingZeros().toPlainString() %></span>
                                <!-- 投资金额 -->
                                <span class="span3">￥<%=odOrderEntitie.getAmount().stripTrailingZeros().toPlainString() %></span>
                            </div>
                        </div>
                    </li>
                    <%} %>
                </ul>
            </div>
            <!-- main-right-content end -->
        </div>
        <div class="pageBtn">
            <%out.println(pageUtil.genSimpleHtml("frmAction", "/member/delivery")); %>
        </div>
    </form>

    <!-- 浮窗 -->
    <div class="float">
        <div class="mask pointer" style="opacity:1;" onclick="hideStep()">
        </div>
        <div class="manage-float">
            <h5>项目交割流程</h5>
            <a class="close" href="javascript:void(0)" onclick="hideStep()"></a>
            <div class="step step1">
                <p>带投兵平台已收到客户所支付全款</p>
            </div>
            <div class="step step2">
                <p>带投兵平台付款给投资主体</p>
                <a href="javascript:void(0)" target="_blank">查看水单</a>
            </div>
            <div class="step step3">
                <p>投资主体付款给融资主体</p>
                <a href="javascript:void(0)" target="_blank">查看水单</a>
            </div>
            <div class="step step4">
                <p>出资证明书</p>
                <a href="javascript:void(0)" target="_blank">下载出资证明书</a>
            </div>
        </div>
    </div>


</body>

</html>
