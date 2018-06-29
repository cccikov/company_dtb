<!DOCTYPE html>
<%@page import="dtb.fund.entity.OdSecrecyEntity"%>
<%@page import="dtb.fund.common.Constant"%>
<%@page import="io.renren.utils.ShiroUtils"%>
<%@page import="dtb.fund.entity.NwNewsEntity"%>
<%@page import="dtb.fund.entity.CtContractEntity"%>
<%@page import="dtb.fund.entity.TbUserEntity"%>
<%@page import="io.renren.utils.FDate"%>
<%@page import="io.renren.utils.FString"%>
<%@page import="dtb.fund.entity.BookmarkEntity"%>
<%@page import="dtb.fund.entity.PjDetailEntity"%>
<%@page import="dtb.fund.entity.OdOrderEntity"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="java.util.Map"%>
<%@page import="dtb.fund.entity.PjTeamEntity"%>
<%@page import="dtb.fund.entity.PjFinacingEntity"%>
<%@page import="dtb.fund.entity.PjReceiverEntity"%>
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

	PjInfoEntity pjInfoEntity = request.getAttribute("pjInfoEntity") != null ? (PjInfoEntity)request.getAttribute("pjInfoEntity"):null;
	OdOrderEntity userOdOrder = pjInfoEntity != null ? pjInfoEntity.getUserOrder() :null;
	//OdSecrecyEntity userSecrecy = pjInfoEntity != null ? pjInfoEntity.getUserSecrecy() :null;
	BookmarkEntity userBookmark = pjInfoEntity != null ? pjInfoEntity.getUserBookmark():null;
	CtContractEntity BMContract = pjInfoEntity != null ?pjInfoEntity.getBMContract():null;
	CtContractEntity TZContract = pjInfoEntity != null ?pjInfoEntity.getTZContract():null;
	List<OdOrderEntity> odOrderEntities = pjInfoEntity != null ?pjInfoEntity.getOrderList():null;
	PjFinacingEntity pjFinacingEntity = pjInfoEntity.getPjFinacingEntity();
	Map<String,List<PjDocumentEntity>> pjDocumentEntities = pjInfoEntity.getPjDocumentEntities();
	List<NwNewsEntity> notices = pjInfoEntity.getNotices();


%>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title><%=pjInfoEntity.getName() %></title>
    <link rel="shortcut icon" href="/statics/img/favicon.ico" />
    <link rel="icon" href="/statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/project_detail.css">
    <!--[if lte IE 9]>
        <style>
            .blur{
                background: #fff;
                opacity: 0;
                filter:alpha(opacity=0);
            }
        </style>
    <![endif]-->
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="/statics/libs/base.js"></script>
    <script type="text/javascript" src='/statics/libs/prodetail.js'></script>
    <script type="text/javascript">
        var now = new Date();
        now.setTime(<%=(Calendar.getInstance()).getTimeInMillis()%>);
        var arrDates = new Array(0);
        var arrTimerLabels = new Array(0);
        var login = false;

        function islogin(cb){
            if(login){
                cb && cb();
            }else{
                $.ajax({
                    type: "POST",
                    url: "/order/check",
                    success: function(r){
                        var result = eval('('+r+')');
                        if(result.code == "0"){
                            cb && cb();
                            login = true;
                        }else{
                            location.href = result.URL
                        }
                    }
                });
            }
        }


        // 签约
        var signing = false; // 签约中 , 以防多次点击造成多次签约
        function contract(type){
            hideTips2();
            hideTips3();

            var projid = $("#projid").val();
            var orderid = $("#orderid").val();
            console.log(signing);
            if(!signing){ // 没有在签约中
                signing = true;
                $.ajax({
                    type: "POST",
                    url: "/contract/create",
                    data:{"projid":projid,"orderid":orderid,"type":type},
                    beforeSend:showTips(),
                    success: function(r){
                        var result = eval('('+r+')');
                        if(result.code == "0"){
                            setTimeout("javascript:location.href='"+result.sign_url+"'", 2000);
                        }else{
                            if(result.error == "1"){
                                location.href = result.URL
                            }else{
                                alert("跳转合同签署界面失败，请刷新重新操作")
                                hideTips();
                                hideTips2();
                                hideTips3();
                            }
                        }
                    }
                });
            }
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
</head>
<body onLoad="startShowTimer();">
    <div id="wrap">

        <!-- 导航 begin -->
        <%@ include file="../header.html"%><!--动态包含-->
        <!-- 导航 end -->

        <!-- 主要内容 begin -->
        <div class="main">
            <div class="main-content">
            <input type="hidden" name="projid" id="projid" value="<%=pjInfoEntity.getId()%>" />
            <input type="hidden" name="orderid" id="orderid" value="<%=userOdOrder == null ? "" : userOdOrder.getId()%>" />
                <!-- 左边内容 -->
                <!-- 左边内容 -->
                <div class="main-left">
                    <div class="prologo">
                        <%=pjDocumentEntities.get("HF")==null?pjDocumentEntities.get("SY")==null?"":"<img src="+pjDocumentEntities.get("SY").get(0).getPic()+">":"<img src="+pjDocumentEntities.get("HF").get(0).getPic()+">" %>
                    </div>
                    <div class="section">
                        <h4 class="heading">项目简介</h4>
                        <p><%=pjInfoEntity.getBrief() %></p>
                    </div>

					<%List<PjDocumentEntity> SPdocumentEntities = pjDocumentEntities.get("SP"); %>
                    <%if(SPdocumentEntities != null){ %>
		                    <div class="section">
		                        <h4 class="heading">视频介绍</h4>
		                        <%for(PjDocumentEntity pjDocumentEntity:SPdocumentEntities){ %>
		                        	<div class="video-wrap play show">
			                            <video id="video" controls="">
			                                <source src="<%=pjDocumentEntity.getPic()%>" type="video/mp4"></source>
			                            </video>
			                        </div>
		                        <%} %>
		                    </div>
					<%} %>

 					<%List<PjDocumentEntity> LDdocumentEntities = pjDocumentEntities.get("LD"); %>
                    <%if(LDdocumentEntities != null){ %>
		                    <div class="section">
		                        <h4 class="heading">投资亮点</h4>
		                        <%for(PjDocumentEntity pjDocumentEntity:LDdocumentEntities){ %>
		                        	<img src="<%=pjDocumentEntity.getPic()%>">
		                        <%} %>
		                    </div>
					<%} %>
                    <!-- 项目介绍 -->
                    <%List<PjDocumentEntity> XQdocumentEntities = pjDocumentEntities.get("XQ"); %>
                    <%if(XQdocumentEntities != null){ %>
                    		<div class="section">
                        		<h4 class="heading">项目介绍</h4>
                            	<%for(PjDocumentEntity pjDocumentEntity:XQdocumentEntities){ %>
                            		<img src="<%=pjDocumentEntity.getPic()%>">
                            	<%} %>
                    		</div>
					<%} %>
                    <!-- 团队成员 -->
                    <%List<PjDocumentEntity> CYdocumentEntities = pjDocumentEntities.get("CY"); %>
                    <%if(CYdocumentEntities != null){ %>
		                    <div class="section">
		                        <h4 class="heading">团队成员</h4>
		                        <%for(PjDocumentEntity pjDocumentEntity:CYdocumentEntities){ %>
                            		<img src="<%=pjDocumentEntity.getPic()%>">
                            	<%} %>
		                    </div>
					<%} %>
					<%List<PjDocumentEntity> FAdocumentEntities = pjDocumentEntities.get("FA"); %>
                    <%if(FAdocumentEntities != null){ %>
		                    <div class="section">
		                        <h4 class="heading">投资方案</h4>
		                        <%for(PjDocumentEntity pjDocumentEntity:FAdocumentEntities){ %>
		                        	<img src="<%=pjDocumentEntity.getPic()%>">
		                        <%} %>
		                    </div>
					<%} %>
                    <!-- 风险提示 -->
                    <div class="section tips">
                        <h4 class="heading">风险提示</h4>
                        <p>带投兵平台不对任何股权投资项目的盈利、亏损作承诺、担保或保证，不对您的投资损失承担任何责任。</p>
                        <h5>主要风险</h5>
                        <p>1、投资失败风险：由于各种原因致使您最终未能成功投资目标企业而产生的投资款被退回且未获得任何收益的风险。在此期间，您也可能丧失了其他潜在的投资机会。</p>
                        <p>2、市场风险：目标企业的市值会因经济因素、政治因素、投资心理和交易制度等因素的影响而产生波动，从而导致您的收益水平发生变化，并可能引发亏损的风险。</p>
                        <p>3、未聘请专业人士的风险：您可能并未聘请专业人士为您的投资提供法律、财务、投资方面的建议，这可能会影响您投资判断的准确性与专业性。</p>
                        <p>4、其他风险：宏观经济风险、政策性风险、流通性风险、目标企业经营风险、未全面了解目标企业的风险、对目标企业控制权的风险、技术风险、不可抗力风险、其他风险。</p>
                    </div>

                    <!-- 本轮投资意向 -->
                    <div class="section">
                        <h4 class="heading">本轮投资<%=pjInfoEntity.getStatus() == 20?"意向":"" %></h4>
                        <ul class="investor-list">
                        <%if(odOrderEntities != null){ %>
                        <%for(OdOrderEntity odOrderEntity:odOrderEntities){ %>
                            <li>
                                <i style="background-image:url(<%=odOrderEntity.getTbUserEntity().getPic() != null ? odOrderEntity.getTbUserEntity().getPic():"/statics/img/default.jpg"%>)"></i>
                                <div class="investor-content">
                                    <p>
                                        <span><%=odOrderEntity.getTbUserEntity().getMobile().substring(0,3) +" XXXX"+" XXXX"%></span>
                                        <%if(pjInfoEntity.getStatus() != 50){ %>
                                        	<span><%=new SimpleDateFormat("yyyy-MM-dd").format(odOrderEntity.getCreatetime()) %></span>
                                        <%} %>
                                    </p>
                                    <%if(pjInfoEntity.getStatus() == 20){ %>
                                    <p>
                                        <span><%=FString.changeMillion(odOrderEntity.getIntentionamount()) %></span>
                                        <span>意向金额</span>
                                    </p>
                                    <%}else{ %>
                                    <p>
                                        <span><%=FString.changeMillion(odOrderEntity.getAmount()) %></span>
                                        <span>投资金额</span>
                                    </p>
                                    <%} %>
                                </div>
                            </li>
                         <%} %>
                         <%} %>
                        </ul>
                    </div>


                </div>
                <!-- 左边内容 end -->


                <!-- 右边内容 -->
                <!-- 右边内容 -->
                <div class="main-right">

                    <!-- 项目融资信息 , 进度 , 剩余时间 , 投资按钮 -->
                    <div class="info">
                        <h5><%=pjInfoEntity.getName()%></h5>
                        <!-- 进度条 -->
                        <%if(pjInfoEntity.getStatus() != 20){ %>
                        <div class="percent">
                            <div class="percent-color" style="width:<%=pjInfoEntity.getCompletePercent()%>%"></div>
                        </div>
                        <%} %>
                        <!-- 项目融资信息 -->
                        <div class="info-msg">
                            <p>
                                <span>目标：</span><strong><%=FString.changeMillion(pjFinacingEntity.getAmount()) %></strong>
                            </p>
                            <p>
                                <span>起投：</span><strong><%=FString.changeMillion(pjFinacingEntity.getMinamount()) %></strong>
                            </p>

                            <%if(pjInfoEntity.getStatus() != 20){ %>
                            <p>
                                <span>募集总额：</span><strong><%=FString.changeMillionByRound(pjInfoEntity.getOrderAmount()) %></strong>
                            </p>
                            <p>
                                <span>完成度：</span><strong><%=pjInfoEntity.getCompletePercent()%>%</strong>
                            </p>
                            <%} %>
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

                        <!-- 剩余时间 -->
                        <%if(pjInfoEntity.getStatus() != 50){ %>
	                        <div class="remain" id="lblDates_<%=pjInfoEntity.getId() %>">
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
                        <!-- 报名按钮 -->
                        <div class="action">
                            <%if(pjInfoEntity.getStatus() == 20 ){ %>
                                <%if(userOdOrder == null){ %>
                                    <a class="btn" href="/order/orderpage?pjid=<%=pjInfoEntity.getId()%>">我要报名</a>
                                <%}else{ %>
                                    <a class="btn" href="javascript:void(0)">已报名</a>
                                <%} %>
                            <%}else if(pjInfoEntity.getStatus() == 30 ){ %>
                                <%if(userOdOrder != null && userOdOrder.getStatus() == 10 && userOdOrder.getAmount().compareTo(BigDecimal.ZERO) == 1 ){ %>
                                    <a class="btn" href="javascript:void(0)">已投资</a>
                                <%}else if(userOdOrder == null || (userOdOrder != null && userOdOrder.getStatus() == 10 && userOdOrder.getAmount().compareTo(BigDecimal.ZERO) == 0)){%>
	                                <%if(TZContract == null){ %>
	                                	<a class="btn" id="contract" onclick="showTips3();" href="javascript:void(0)">我要投资</a>
	                                <%}else{ %>
	                                	<a class="btn" href="/order/orderpage?pjid=<%=pjInfoEntity.getId()%>">我要投资</a>
	                                <%} %>

                                <%}else if(userOdOrder != null && userOdOrder.getStatus() == 20  ){ %>
                                	<a class="btn" href="/order/paypage?orderid=<%=userOdOrder.getId()%>">我要出资</a>
                                <%}%>
                            <%}%>
                        </div>

                        <!-- 收藏按钮 -->
                        <div class="star part">
                            <a href="javascript:void(0)" <%=userBookmark == null?"":"class='active'"%> id="bookmark"></a>
                        </div>
                    </div>

                    <!-- 流程 , 下载融资计划书 -->
                    <div class="step section">
                        <h6 class="heading">项目筹资流程</h6>
                        <!-- 流程 -->
                        <div class="process-step">
                            <span class="step1 <%=pjInfoEntity.getStatus()==20?"active":"" %>" >预热</span>
                            <span class="step2 <%=pjInfoEntity.getStatus()==30?"active":"" %>" >募集</span>
                            <span class="step4 <%=pjInfoEntity.getStatus()==50?"active":"" %>" >交割</span>
                        </div>
                        <!-- 融资计划书 -->
                        <%if((BMContract != null && BMContract.getStatus() == 20) || (userOdOrder != null && userOdOrder.getStatus() >=20)){ %>
                        <div class="plan">
                           <%if(pjDocumentEntities.get("JH")!=null){ %>
                           	<form action="/project/pview" method="post" id="subform">
                           		<input type="hidden" name="url" value="<%=pjDocumentEntities.get("JH").get(0).getPic()%>">
                           		<a href='#' onclick="document.getElementById('subform').submit();return false">下载融资计划书</a>
                           	</form>
                           <%} %>
                        </div>
                        <!-- 下载项目核心内容 -->
                        <div class="keyContent">
	                        <%if(pjDocumentEntities.get("HX")!=null){ %>
                           	<form action="/project/pview" method="post" id="subform">
                           		<input type="hidden" name="url" value="<%=pjDocumentEntities.get("HX").get(0).getPic()%>">
                           		<a href='#' onclick="document.getElementById('subform').submit();return false">项目资料</a>
                           	</form>
                           <%} %>
                        </div>
                        <%}else{ %>
	                        <%if(pjInfoEntity.getStatus() == 20 || pjInfoEntity.getStatus() == 30){ %>
		                        		<div class="plan">
				                           <%=pjDocumentEntities.get("JH")==null?"":"<a href='javascript:showTips2();' >下载融资计划书</a>" %>
				                        </div>
				                        <!-- 下载项目核心内容 -->
				                        <div class="keyContent">
					                        <%=pjDocumentEntities.get("HX")==null?"":"<a href='javascript:showTips2();' >项目资料</a>" %>
				                        </div>
	                        <%} %>
                        <%} %>
                    </div>

                    <!-- 通知公告 -->
                    <%if(notices != null){ %>
                    <div class="notice section">
                        <h5 class="heading">通知公告</h5>

                        	<%for(NwNewsEntity notice:notices){ %>
                        		<a href="/newsdetail/<%=notice.getId()%>" target="_blank" title="<%=notice.getTitle() %>">
                                    <div class="notice-title">
                                        <span><%=new SimpleDateFormat("yyyy-MM-dd").format(notice.getCreatetime()) %></span><p><%=notice.getTitle() %></p>
                                    </div>
                                </a>
                        	<%} %>

                    </div>
					<%} %>
                </div>
                <!-- 右边内容 end -->
            </div>
        </div>
        <!-- 主要内容 end -->

        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->

        <a id="top" title="回到顶部" href="javascript:void(0)" onclick="setScrollTop(134)">回到顶部</a>

        <!-- showTips() 显示 ; hideTips() 隐藏 -->
        <div class="float">
            <div class="tips-float">
                正跳转到合同签署界面......
            </div>
            <div class="tips2-float">
                <a class="close" onclick="hideTips2();" href="javascript:void(0)"></a>
                <h5>提示</h5>
                <div class="box box1">
                    <p>该部分内容需要签署【保密协议】后方可查看。</p>
                    <button onclick="contract('B');">查看资料</button>
                    <button style="background: #ff8f35;margin:0 0 0 30px;" onclick="hideTips2();">不看资料</button>
                </div>
                <div class="box box2">
                    <p>保密金已经提交，我们工作人员正在审核中，请注意查看短信通知，如有疑问，请及时联系我们工作人员。</p>
                    <button onclick="hideTips2();">确认</button>
                </div>

            </div>
            <div class="tips3-float">
                <a class="close" onclick="hideTips3();" href="javascript:void(0)"></a>
                <h5>尊敬的投资人</h5>
                <p class="p1">为了让您在进行互联网非公开股权投资前，尽可能多地了解互联网非公开股权投资的风险，带投兵（深圳）网络科技股份有限公司在此郑重提醒，请您务必仔细阅读并理解本《风险提示书》，谨慎评估风险后，再决定是否继续进行互联网非公开股权投资。</p>
                <p class="p2">
                    <a target="_blank" href="/risks.html">【风险提示书】</a>
                </p>
                <p class="p3">
                    同时，为保证您投资后的合伙权益，请知悉如下合同
                </p>
                <p class="p4">
                    <a target="_blank" href="/partnership.html">【合伙协议】</a>
                    <a target="_blank" href="/partner.html">【合伙人协议】</a>
                    <a target="_blank" href="/transferOfRights.html">【合伙人转让权益协议】</a>
                </p>
                <p class="p5">
                    <button onclick="contract('T');">已阅读，同意</button>
                </p>
            </div>
        </div>
    </div>
</body>

</html>
