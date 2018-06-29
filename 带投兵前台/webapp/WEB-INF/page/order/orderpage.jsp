<!DOCTYPE html>
<%@page import="io.renren.utils.FDate"%>
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
    PjInfoEntity pjInfo = request.getAttribute("pjInfo") != null ? (PjInfoEntity)request.getAttribute("pjInfo"):null;
    OdOrderEntity odOrder = request.getAttribute("odOrder") != null ? (OdOrderEntity)request.getAttribute("odOrder"):null;
    BigDecimal secrecy_ratio = request.getAttribute("secrecy_ratio") != null ? (BigDecimal)request.getAttribute("secrecy_ratio"):null;
    BigDecimal firstdeposit_ratio = request.getAttribute("firstdeposit_ratio") != null ? (BigDecimal)request.getAttribute("firstdeposit_ratio"):null;
    BigDecimal subscribe_ratio = request.getAttribute("subscribe_ratio") != null ? (BigDecimal)request.getAttribute("subscribe_ratio"):null;
    String platform_bankname = request.getAttribute("platform_bankname") != null ? (String)request.getAttribute("platform_bankname"):"";
    String platform_accno = request.getAttribute("platform_accno") != null ? (String)request.getAttribute("platform_accno"):"";
    String platform_accname = request.getAttribute("platform_accname") != null ? (String)request.getAttribute("platform_accname"):"";
    Integer ordercount = request.getAttribute("ordercount") != null ? Integer.valueOf(request.getAttribute("ordercount").toString()):0;
%>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>下单</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/order.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script src="/statics/libs/base.js"></script>
    <script src="/statics/libs/order.js"></script>
</head>
<script type="text/javascript">
    $(function(){
        $("#sumitOrder").click(function(e){
            var amount = $("#amount").val();
            if(amount == ""){
                alert("请填写投资金额")
                return;
            }
            frmAction.submit();
        });

        $("#sumitOrder2").click(function(e){
            var amount = $("#amount").val();
            if(amount == ""){
                alert("请填写投资金额")
                return;
            }
            showSure();
        });
    });

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
                oLabel.innerHTML = "<em>已超时</em>";
            }
        }

        function getLeaveDay(date3) {
            if (date3 < 0) {
                return "<em>已超时</em>";
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
            var s = (days > 0 ? ("<span>"+days+"</span>天") : "") + (hours > 0 ? ("<span>"+hours+"</span>时") : "") + "<span>"+minutes+"</span>分<span>"+seconds+"</span>秒";
            return s;
        }

        function startShowTimer() {
            timerWork();
            window.setInterval('timerWork()', 1000);
        }


</script>
<body onLoad="startShowTimer();">
    <div id="wrap">


        <!-- 导航 begin -->
        <%@ include file="../header.html"%><!--动态包含-->
        <!-- 导航 end -->



        <!-- 主要 begin -->
        <div>
            <input type="hidden" id="maxamount" name="maxamount" value="<%=pjInfo.getPjFinacingEntity().getPmaxamount().divide(new BigDecimal(10000))%>">
            <input type="hidden" id="pmaxamount" name="pmaxamount" value="<%=pjInfo.getPjFinacingEntity().getPmaxamount().divide(new BigDecimal(10000))%>">
            <input type="hidden" id="minamount" name="minamount" value="<%=pjInfo.getPjFinacingEntity().getMinamount().divide(new BigDecimal(10000))%>">




            <%if(pjInfo.getStatus() == 20 ){ %>




                <!-- 预热的时候 -->
                <!-- 报名-->
                <form action="/order/createorder" method="post" id="frmAction" name="frmAction">
                    <input type="hidden" name="projid" value="<%=pjInfo.getId()%>">
                    <div class="main width-wrap">
                        <div class="main-content" >

                            <!-- 步骤提示 -->
                            <p class="step">
                                <span class="step1 active">预约报名</span>
                                <span class="step2">签署协议</span>
                                <span class="step3">支付保证金</span>
                                <span class="step4">支付余款</span>
                                <span class="step5">付款完成</span>
                            </p>

                            <!-- 项目信息 -->
                            <div class="proj-msg">
                                <!-- 项目logo 标题 -->
                                <div class="msg1">
                                    <i style="background-image:url(<%=pjInfo.getPjDocumentEntities().get("SY")==null?"":pjInfo.getPjDocumentEntities().get("SY").get(0).getPic()%>)"></i>
                                    <p><%=pjInfo.getName() %></p>
                                </div>
                                <!-- 起投 -->
                                <div class="msg3" style="margin: 0 0 0 120px;">
                                    <p><span>融资目标</span><span class="orange-font"><%=FString.changeMillion(pjInfo.getPjFinacingEntity().getAmount()) %></span></p>
                                </div>
                                <!-- 起投 -->
                                <div class="msg3">
                                    <p><span>起投金额</span><span class="orange-font"><%=FString.changeMillion(pjInfo.getPjFinacingEntity().getMinamount()) %></span></p>
                                </div>
                                <!-- 倒计时 -->
                                <div class="msg4">
                                    <p>
                                    <%
                                        Date pjbegindate = pjInfo.getPjbegindate();
                                        Date pjenddate = pjInfo.getPjenddate();
                                        int preheatdays = pjInfo.getPjFinacingEntity().getPreheatdays();
                                        int raisedays = pjInfo.getPjFinacingEntity().getRaisedays();
                                        int contributivedays = pjInfo.getPjFinacingEntity().getContributivedays();
                                        int deliverydays = pjInfo.getPjFinacingEntity().getDeliverydays();

                                        long begindate = pjbegindate.getTime();
                                        long enddate = pjbegindate.getTime();
                                        long preheatdate = 0;
                                        long raisesdate = 0;
                                        long contributivedate = 0;
                                        long deliverydate = 0;

                                        Calendar ca = Calendar.getInstance();
                                        ca.setTime(pjbegindate);
                                        if(pjInfo.getStatus() == 20){
                                            ca.add(Calendar.DATE, preheatdays);
                                            preheatdate = ca.getTime().getTime();
                                        }else if(pjInfo.getStatus() == 30){
                                            ca.add(Calendar.DATE, raisedays);
                                            raisesdate = ca.getTime().getTime();
                                        }else if(pjInfo.getStatus() == 40){
                                            ca.add(Calendar.DATE, contributivedays);
                                            contributivedate = ca.getTime().getTime();
                                        }else if(pjInfo.getStatus() == 50){
                                            ca.add(Calendar.DATE, deliverydays);
                                            deliverydate = ca.getTime().getTime();
                                        }
                                    %>

                                    <span id="lblDates_<%=pjInfo.getId() %>">
                                    <%if(pjInfo.getStatus() == 20){ %>
                                        <%if(preheatdays > 0){ %>
                                        <script type="text/javascript">
                                            registerDateTimer(document.getElementById("lblDates_<%=pjInfo.getId() %>"),<%=preheatdate%>);
                                        </script>
                                        <%}%>
                                    <%}else if(pjInfo.getStatus() == 30){ %>
                                        <%if(raisedays > 0){ %>
                                        <script type="text/javascript">
                                            registerDateTimer(document.getElementById("lblDates_<%=pjInfo.getId() %>"),<%=raisesdate%>);
                                        </script>
                                        <%}%>
                                    <%}else if(pjInfo.getStatus() == 40){ %>
                                        <%if(contributivedays > 0){ %>
                                        <script type="text/javascript">
                                            registerDateTimer(document.getElementById("lblDates_<%=pjInfo.getId() %>"),<%=contributivedate%>);
                                        </script>
                                        <%}%>
                                    <%}else if(pjInfo.getStatus() == 50){ %>
                                        <%if(deliverydays > 0){ %>
                                        <script type="text/javascript">
                                            registerDateTimer(document.getElementById("lblDates_<%=pjInfo.getId() %>"),<%=deliverydate%>);
                                        </script>
                                        <%}%>
                                    <%} %>
                                    </span>

                                    </p>
                                </div>
                            </div>

                            <!-- 投资 -->
                            <div class="investment">
                                <p class="investment-amount">
                                    <span class="label-span" style="width:8em;">意向投资金额：</span>
                                    <input  name="amount" id="amount"  type="number" value="<%=pjInfo.getPjFinacingEntity().getMinamount().divide(new BigDecimal(10000)) %>">
                                    <span class="tail">万元</span>
                                    <em id="amountTips" style="display: block;line-height: 2;font-size: 12px;color:red;font-style: normal;margin:0 0 0 103px"></em>
                                </p>
                                <!-- <p>
                                    <span class="label-span">意向保密金</span><%=FString.changeMillion(pjInfo.getPjFinacingEntity().getMinamount()) %>元 × <%=secrecy_ratio.multiply(new BigDecimal(100)).stripTrailingZeros().toPlainString()%>% = <strong class="orange-font big-font"><%=FString.changeMillion(pjInfo.getPjFinacingEntity().getMinamount().multiply(secrecy_ratio)) %>元</strong>
                                </p> -->
                                <p>
                                    <a class="canClick btn" id="sumitOrder" href="javascript:void(0)">确认报名</a>
                                </p>
                            </div>

                            <!-- 提示 -->
                            <!-- <div class="tips">
                                <h5>保密金规则</h5>
                                <ul>
                                    <li>保密金为项目起投额1%</li>
                                    <li>支付完成后，方可在项目详情页查看核心资料</li>
                                    <li>项目募集完成三个月内，保密金将原路退回到支付宝</li>
                                    <li>若泄露核心资料，则不予退还保密金，且平台保留追究法律责任的权利</li>
                                </ul>
                            </div> -->

                        </div>
                    </div>
                </form>


            <%}else if(pjInfo.getStatus() == 30 ){ %>

                <!-- 保证金 -->
                <!-- 项目募集状态 -->
                <!-- 交保证金 -->
                <form action="/order/raiseorder" method="post" id="frmAction" name="frmAction">
                    <input type="hidden" name="projid" value="<%=pjInfo.getId()%>">

                    <div class="main width-wrap">
                        <div class="main-content" >

                            <!-- 步骤提示 -->
                            <p class="step">
                                <span class="step1 pass">预约报名</span>
                                <span class="step2 pass">签署协议</span>
                                <span class="step3 active">支付保证金</span>
                                <span class="step4">支付余款</span>
                                <span class="step5">付款完成</span>
                            </p>

                            <!-- 项目信息 -->
                            <div class="proj-msg">
                                <!-- 项目logo 标题 -->
                                <div class="msg1">
                                    <i style="background-image:url(<%=pjInfo.getPjDocumentEntities().get("SY")==null?"":pjInfo.getPjDocumentEntities().get("SY").get(0).getPic()%>)"></i>
                                    <p><%=pjInfo.getName() %></p>
                                </div>
                                <!-- 项目状态 -->
                                <div class="msg2">
                                    <div class="msg2-line1">
                                        <span class="left red-font">募集中</span>
                                        <span class="red-font right">融资目标：<%=FString.changeMillion(pjInfo.getPjFinacingEntity().getAmount()) %></span>
                                    </div>
                                    <div class="percent">
                                        <div class="percent-color" style="width:<%=pjInfo.getCompletePercent()%>%"></div>
                                    </div>
                                    <div class="msg-line3">
                                        <p><span class="orange-font"><%=ordercount %></span>人正在投资这个项目，先支付保证金</p>
                                    </div>
                                </div>
                                <!-- 起投 -->
                                <div class="msg3">
                                    <p><span>起投金额</span><span class="orange-font"><%=FString.changeMillion(pjInfo.getPjFinacingEntity().getMinamount()) %></span></p>
                                </div>
                                <!-- 倒计时 -->
                                <div class="msg4">
                                    <p>
                                    <%
                                        Date pjbegindate = pjInfo.getPjbegindate();
                                        Date pjenddate = pjInfo.getPjenddate();
                                        int preheatdays = pjInfo.getPjFinacingEntity().getPreheatdays();
                                        int raisedays = pjInfo.getPjFinacingEntity().getRaisedays();
                                        int contributivedays = pjInfo.getPjFinacingEntity().getContributivedays();
                                        int deliverydays = pjInfo.getPjFinacingEntity().getDeliverydays();

                                        long begindate = pjbegindate.getTime();
                                        long enddate = pjbegindate.getTime();
                                        long preheatdate = 0;
                                        long raisesdate = 0;
                                        long contributivedate = 0;
                                        long deliverydate = 0;

                                        Calendar ca = Calendar.getInstance();
                                        ca.setTime(pjbegindate);
                                        if(pjInfo.getStatus() == 20){
                                            ca.add(Calendar.DATE, preheatdays);
                                            preheatdate = ca.getTime().getTime();
                                        }else if(pjInfo.getStatus() == 30){
                                            ca.add(Calendar.DATE, raisedays);
                                            raisesdate = ca.getTime().getTime();
                                        }else if(pjInfo.getStatus() == 40){
                                            ca.add(Calendar.DATE, contributivedays);
                                            contributivedate = ca.getTime().getTime();
                                        }else if(pjInfo.getStatus() == 50){
                                            ca.add(Calendar.DATE, deliverydays);
                                            deliverydate = ca.getTime().getTime();
                                        }
                                    %>

                                    <span id="lblDates_<%=pjInfo.getId() %>">
                                    <%if(pjInfo.getStatus() == 20){ %>
                                        <%if(preheatdays > 0){ %>
                                        <script type="text/javascript">
                                            registerDateTimer(document.getElementById("lblDates_<%=pjInfo.getId() %>"),<%=preheatdate%>);
                                        </script>
                                        <%}%>
                                    <%}else if(pjInfo.getStatus() == 30){ %>
                                        <%if(raisedays > 0){ %>
                                        <script type="text/javascript">
                                            registerDateTimer(document.getElementById("lblDates_<%=pjInfo.getId() %>"),<%=raisesdate%>);
                                        </script>
                                        <%}%>
                                    <%}else if(pjInfo.getStatus() == 40){ %>
                                        <%if(contributivedays > 0){ %>
                                        <script type="text/javascript">
                                            registerDateTimer(document.getElementById("lblDates_<%=pjInfo.getId() %>"),<%=contributivedate%>);
                                        </script>
                                        <%}%>
                                    <%}else if(pjInfo.getStatus() == 50){ %>
                                        <%if(deliverydays > 0){ %>
                                        <script type="text/javascript">
                                            registerDateTimer(document.getElementById("lblDates_<%=pjInfo.getId() %>"),<%=deliverydate%>);
                                        </script>
                                        <%}%>
                                    <%} %>
                                    </span>
                                    </p>
                                </div>
                            </div>

                            <!-- 投资 -->
                            <div class="investment">
                                <p class="investment-amount">
                                    <span class="label-span">投资金额</span>
                                    <input  name="amount" id="amount"  type="number" value="<%=pjInfo.getPjFinacingEntity().getMinamount().divide(new BigDecimal(10000)) %>">
                                    <span class="tail">万元</span>
                                    <em id="amountTips" style="display: block;line-height: 2;font-size: 12px;color:red;font-style: normal;margin:0 0 0 103px"></em>
                                </p>
                                <p>
                                    <span class="label-span">认购费</span><span class="origin-value"></span> × <%=subscribe_ratio.multiply(new BigDecimal(100)).stripTrailingZeros().toPlainString()%>% = <strong class="orange-font big-font" id="offerToBuy"></strong>
                                </p>
                                <p>
                                    <span class="label-span">保证金</span><span class="origin-value"></span> × <%=firstdeposit_ratio.multiply(new BigDecimal(100)).stripTrailingZeros().toPlainString()%>% = <strong class="orange-font big-font" id="deposit"></strong>
                                </p>
                                <p>
                                    <a class="btn canClick" id="sumitOrder2" href="javascript:void(0)">确认提交</a>
                                </p>
                            </div>

                            <!-- 提示 -->
                            <div class="tips">
                                <h5>保证金规则</h5>
                                <ul>
                                    <li>保证金为投资额<%=firstdeposit_ratio.multiply(new BigDecimal(100)).stripTrailingZeros().toPlainString()%>%</li>
                                    <li>在支付保证金的同时，需缴纳投资额的1%~3%作为认购费</li>
                                    <li>如放弃支付余款，则保证金与认购费不予退还</li>
                                    <li>保证金支付完成后，平台将指定余款支付日期</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </form>

            <%} %>
            <!-- 提交订单 -->
        </div>
        <!-- 主要 end -->


        <div class="float">
            <div class="sure-float">
                <a class="close" onclick="hideSure();" href="javascript:void(0)"></a>
                <h5>尊敬的投资人</h5>
                <p>请确认您的投资金额：</p>
                <p class="center">
                    <strong>XXX 万元</strong>
                </p>
                <button onclick="frmAction.submit()" class="sure">确认</button>
                <button class="cancal" onclick="hideSure();">修改</button>
            </div>
        </div>

        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->

    </div>
</body>

</html>
