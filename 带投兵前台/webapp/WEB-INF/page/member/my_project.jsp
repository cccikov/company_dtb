<!DOCTYPE html>
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
	String qstatus = params.get("qstatus").toString();
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>我的项目</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/me_frame.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
</head>
<script type="text/javascript">
    
    /* 提示显示 */
    function showTips() {
        $(".mask",top.document).addClass("active white-mask");
        $(".tips-float",top.document).addClass("active");
    }

    /* 提示隐藏 */
    function hideTips() {
        $(".mask",top.document).removeClass("active white-mask");
        $(".tips-float",top.document).removeClass("active");
    }

    var now = new Date();
    now.setTime(<%=(Calendar.getInstance()).getTimeInMillis()%>);
    var arrDates = new Array(0);
    var arrTimerLabels = new Array(0);

    $(function() {
    	$("a[name=contract]").click(function(){
            showTips();
    		$.ajax({
    			type: "POST",
    		    url: "/contract/create",
    		    data:{"projid":$(this).attr("pjid"),"orderid":$(this).attr("orderid"),"type":"T"},
    		    //beforeSend:showTips(),
    		    success: function(r){
    		    	var result = eval('('+r+')');
    		    	if(result.code == "0"){
    		    		setTimeout("javascript:parent.location.href='"+result.sign_url+"'", 2000); 
    		    	}else{
    		    		if(result.error == "1"){
    		    			parent.location.href = result.URL
			    		}else{
			    			alert("跳转合同签署界面失败，请刷新重新操作")
				    		hideTips();
			    		}
    		    	}
    		    	
    			}
    		});
    	})
    	
    	
        $("a[status]").click(function() {
        	var status = $(this).attr("status");
    		$("#qstatus").val(status);
    		frmAction.submit();
        });

        // tab切换
        var tab_btn = $(".tab-nav a");
        var tab = $(".tab");
        tab_btn.on("click", function() {
            var _this = $(this);
            var _index = _this.parent().index();
            tab_btn.removeClass("active");
            _this.addClass("active");
            tab.removeClass("active").eq(_index).addClass("active");
        });

    });

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
            oLabel.innerHTML = "<font style='color:red;'>已超时未付款</font>";
        }
    }

    function getLeaveDay(date3) {
        if (date3 < 0) {
            return "<font style='color:red;'>已超时未付款</font>";
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

    function pay(id) {
        parent.location.href = "/order/paypage?orderid=" + id
    }

    function order(id) {
        parent.location.href = "/order/orderpage?pjid=" + id
    }

</script>
<body onLoad="startShowTimer();">
    <!-- 右边 -->
    <form action="/member/project" name="frmAction" method="post">
        <input type="hidden" name="qstatus" id="qstatus" value="<%=qstatus %>" />
        <div class="main-right-content">
            <h4>我的项目</h4>

            <ul class="tab-nav">
                <li>
                    <a class="active" href="javascript:void(0)">我的投资</a>
                </li>
            </ul>

            <!-- 我的投资 -->
            <div class="tab blue active">
                <p class='type'>
                    <a <%=qstatus.equals("null") || qstatus.equals("") ?"class='active'":""%> href="javascript:void(0)" status="">全部</a>
                    <a <%=qstatus.equals("10")?"class='active'":""%> href="javascript:void(0)" status="10">待付保证金</a>
                    <a <%=qstatus.equals("15")?"class='active'":""%> href="javascript:void(0)" status="15">保证金待审核</a>
                    <a <%=qstatus.equals("20")?"class='active'":""%> href="javascript:void(0)" status="20">待付余款</a>
                    <a <%=qstatus.equals("25")?"class='active'":""%> href="javascript:void(0)" status="25">余款待审核</a>
                    <a <%=qstatus.equals("100")?"class='active'":""%> href="javascript:void(0)" status="100">交易成功</a>
                    <a <%=qstatus.equals("-100")?"class='active'":""%> href="javascript:void(0)" status="-100">失败</a>
                    <a <%=qstatus.equals("-10")?"class='active'":""%> href="javascript:void(0)" status="-10">已退款</a>
                </p>

                <ul>
                    <%if(odOrderEntities != null){ %>
                        <%for(OdOrderEntity odOrderEntitie:odOrderEntities){ %>
                        <li>
                            <%if(odOrderEntitie.getPjInfoEntity().getPjDocumentEntities().get("SY") != null){ %>
                                <i class="img" style="background-image: url(<%=odOrderEntitie.getPjInfoEntity().getPjDocumentEntities().get("SY").get(0).getPic()%>)"></i>
                            <%} %>
                            <!-- 右边 -->
                            <div class="right">
                                <p class="line1">
                                    <%if(odOrderEntitie.getPjInfoEntity().getStatus() == 30 && odOrderEntitie.getStatus() == 10 && odOrderEntitie.getTJContract() != null && odOrderEntitie.getTJContract().getStatus() == 10 && odOrderEntitie.getAmount().compareTo(BigDecimal.ZERO) == 0){ %>
                                    	<span>有待签合同</span> 
                                    <%} %>
                                    <a href="projectdetail?orderid=<%=odOrderEntitie.getId()%>">交易详情</a>
                                </p>
                                
                                <%
                                    Date pjbegindate = odOrderEntitie.getPjInfoEntity().getPjbegindate(); 
                                    Date pjenddate = odOrderEntitie.getPjInfoEntity().getPjenddate(); 
                                    int preheatdays = odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getPreheatdays();
                                    int raisedays = odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getRaisedays();
                                    int contributivedays = odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getContributivedays();
                                    int deliverydays = odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getDeliverydays();
                                    
                                    long begindate = pjbegindate.getTime();
                                    long enddate = pjbegindate.getTime();
                                    long preheatdate = 0;
                                    long raisesdate = 0;
                                    long contributivedate = 0;
                                    long deliverydate = 0;
                                    
                                    Calendar ca = Calendar.getInstance();
                    				ca.setTime(pjbegindate);
                    				if(odOrderEntitie.getPjInfoEntity().getStatus() == 20){
                    					ca.add(Calendar.DATE, preheatdays);
                    					preheatdate = ca.getTime().getTime();
                    				}else if(odOrderEntitie.getPjInfoEntity().getStatus() == 30){
                    					ca.add(Calendar.DATE, raisedays);
                    					raisesdate = ca.getTime().getTime();
                    				}else if(odOrderEntitie.getPjInfoEntity().getStatus() == 40){
                    					ca.add(Calendar.DATE, contributivedays);
                    					contributivedate = ca.getTime().getTime();
                    				}else if(odOrderEntitie.getPjInfoEntity().getStatus() == 50){
                    					ca.add(Calendar.DATE, deliverydays);
                    					deliverydate = ca.getTime().getTime();
                    				}
                    				
                    				Date bpaytime = odOrderEntitie.getBpaytime() == null ? pjbegindate  :odOrderEntitie.getBpaytime(); 
                    				int depositdays = odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getDepositdays();
                                    int balancedays = odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getBalancedays();
                    				
                                    long bpaydate = bpaytime.getTime();
                                    long depositdate = 0;
                                    long balancedate = 0;
                                    
                                    Calendar oca = Calendar.getInstance();
                                    oca.setTime(bpaytime);
                                    if(odOrderEntitie.getStatus() == 10){
                                    	oca.add(Calendar.DATE, depositdays);
                                    	depositdate = oca.getTime().getTime();
                                    }else if(odOrderEntitie.getStatus() == 20){
                                    	oca.add(Calendar.DATE, balancedays);
                                    	balancedate = oca.getTime().getTime();
                                    }
                                    %>
                                    
                                    <%if(odOrderEntitie.getPjInfoEntity().getStatus() == 20){ %>
	                                    <%if(odOrderEntitie.getStatus() == 0){ %>
	                                    <p class="line2">
		                                    <span><a href="javascript:pay(<%=odOrderEntitie.getId()%>)">待付保密金</a></span>
		                                </p>
		                                <%if(preheatdays != 0){ %>
		                                <p class="line3" id="lblDates_<%=odOrderEntitie.getId() %>">
		                                    <script type="text/javascript">
	        									registerDateTimer(document.getElementById("lblDates_<%=odOrderEntitie.getId() %>"),<%=preheatdate%>);
	        								</script>
		                                </p>
		                                <%} %>
	                                    <%}else if(odOrderEntitie.getStatus() == 5){ %>
	                                    <p class="line2">
		                                    <span>保密金待审核</span>
		                                </p>
	                                    <%}else if(odOrderEntitie.getStatus() == 10){ %>
										<p class="line2">
		                                    <span>报名成功</span>
		                                </p>
		                                <%}else if(odOrderEntitie.getStatus() == -100){ %>
	                                    	<p class="line2"><span>失败</span></p>
		                                    <p class="line3"><span>订单取消</span></p>
		                                <%}else if(odOrderEntitie.getStatus() == -10){ %>
	                                    	<p class="line2"><span>已退款</span></p>
	                                    <%}else{ %>
	                                	 	<p class="line2"><span>失败</span></p>
	                                    	<p class="line3"><span>逾期未付款</span></p>
	                                	<%} %>
                                    <%}else if(odOrderEntitie.getPjInfoEntity().getStatus() == 30){ %>
	                                    <%if(odOrderEntitie.getStatus() == 10){%>
	                                    	<%if(odOrderEntitie.getAmount().compareTo(BigDecimal.ZERO) == 0){ %>
		                                    	<%if(odOrderEntitie.getTJContract() == null || odOrderEntitie.getTJContract().getStatus() == 10){ %>
	                                    			<p class="line2">
							                    		<span><a pjid="<%=odOrderEntitie.getProjid() %>" orderid="<%=odOrderEntitie.getId() %>" name="contract" href="javascript:void(0)">待签投资合同</a></span>
								                    </p>
	                                    		<%}else{ %>
	                                    			<p class="line2">
				                                    	<span><a href="javascript:order(<%=odOrderEntitie.getProjid()%>)">待投资</a></span>
				                                	</p>
	                                    		<%} %>
        	                            		
        	                            		<%if(raisedays != 0){ %>
	        	                            		<p class="line3" id="lblDates_<%=odOrderEntitie.getId() %>">
	        				                           	<script type="text/javascript">
	        												registerDateTimer(document.getElementById("lblDates_<%=odOrderEntitie.getId() %>"),<%=raisesdate%>);
	        											</script>
	        										</p>
        			                            <%} %>
        	                            	<%}else{ %>
        	                            		<p class="line2">
				                                    <span><a href="javascript:pay(<%=odOrderEntitie.getId()%>)">待付保证金</a></span>
				                                </p>
        	                            		<%if(raisedays != 0){ %>
        	                            			<%if(raisesdate > depositdate){ %>
	        	                            			<p class="line3" id="lblDates_<%=odOrderEntitie.getId() %>">
	        				                            	<script type="text/javascript">
	        													registerDateTimer(document.getElementById("lblDates_<%=odOrderEntitie.getId() %>"),<%=depositdate%>);
	        												</script>
	        											</p>
        	                            			<%}else{ %>
	        	                            			<p class="line3" id="lblDates_<%=odOrderEntitie.getId() %>">
	        				                            	<script type="text/javascript">
	        													registerDateTimer(document.getElementById("lblDates_<%=odOrderEntitie.getId() %>"),<%=raisesdate%>);
	        												</script>
	        											</p>
        	                            			<%} %>
        			                            <%}else{ %>
		    			                            <p class="line3" id="lblDates_<%=odOrderEntitie.getId() %>">
						                            	<script type="text/javascript">
															registerDateTimer(document.getElementById("lblDates_<%=odOrderEntitie.getId() %>"),<%=depositdate%>);
														</script>
													</p>
					                            <%} %>
        	                            	<%} %>
	                                    <%}else if(odOrderEntitie.getStatus() == 15){ %>
		                                    <p class="line2">
						                    	<span>保证金待审核</span>
						                    </p>
					                    <%}else if(odOrderEntitie.getStatus() == 20){ %>
					                     	<p class="line2">
						                    	<span><a href="javascript:pay(<%=odOrderEntitie.getId()%>)">待付余款</a></span>
						                    </p>
		                                    <%if(raisedays != 0){ %>
		        		                       	<%if(raisesdate > depositdate){ %>
	        	                            		<p class="line3" id="lblDates_<%=odOrderEntitie.getId() %>">
	        				                           	<script type="text/javascript">
	        												registerDateTimer(document.getElementById("lblDates_<%=odOrderEntitie.getId() %>"),<%=balancedate%>);
	        											</script>
	        										</p>
        	                            		<%}else{ %>
	        	                            		<p class="line3" id="lblDates_<%=odOrderEntitie.getId() %>">
	        				                           	<script type="text/javascript">
	        												registerDateTimer(document.getElementById("lblDates_<%=odOrderEntitie.getId() %>"),<%=raisesdate%>);
	        											</script>
	        										</p>
        	                            		<%} %>
		        		                    <%}else{ %>
	    			                            <p class="line3" id="lblDates_<%=odOrderEntitie.getId() %>">
					                            	<script type="text/javascript">
														registerDateTimer(document.getElementById("lblDates_<%=odOrderEntitie.getId() %>"),<%=balancedate%>);
													</script>
												</p>
				                            <%} %>
	                                   	<%}else if(odOrderEntitie.getStatus() == 25){ %>
	                                   		<p class="line2"><span>余款待审核</span></p>
	                                   	<%}else if(odOrderEntitie.getStatus() == 100){ %>
	                                   		<p class="line2"><span>已付余款</span></p>
	                                   	<%}else if(odOrderEntitie.getStatus() == -100){ %>
		                                   	<p class="line2"><span>失败</span></p>
			                                <p class="line3"><span>订单取消</span></p>
			                           <%}else if(odOrderEntitie.getStatus() == -10){ %>
		                                   	<p class="line2"><span>已退款</span></p>
					                    <%}else{ %>
	                                	 	<p class="line2"><span>失败</span></p>
	                                    	<p class="line3"><span>逾期未付款</span></p>
	                                	<%} %>
                                    <%}else if(odOrderEntitie.getPjInfoEntity().getStatus() == 50){ %>
                                    	<%if(odOrderEntitie.getStatus() == 100){ %>
                                    		<p class="line2"><span>交割中</span></p>
                                    	<%}else if(odOrderEntitie.getStatus() == -100){ %>
	                                    	<p class="line2"><span>失败</span></p>
		                                    <p class="line3"><span>订单取消</span></p>
		                                <%}else if(odOrderEntitie.getStatus() == -10){ %>
	                                    	<p class="line2"><span>已退款</span></p>
                                    	<%}else{ %>
                                    		<p class="line2"><span>失败</span></p>
	                                    	<p class="line3"><span>逾期未付款</span></p>
                                    	<%} %>
                                    <%}else if(odOrderEntitie.getPjInfoEntity().getStatus() == 100){ %>
                                    	<%if(odOrderEntitie.getStatus() == 100){ %>
                                    		<p class="line2"><span>交易成功</span></p>
                                    	<%}else if(odOrderEntitie.getStatus() == -100){ %>
	                                    	<p class="line2"><span>失败</span></p>
		                                    <p class="line3"><span>订单取消</span></p>
		                                <%}else if(odOrderEntitie.getStatus() == -10){ %>
	                                    	<p class="line2"><span>已退款</span></p>
                                    	<%}else{ %>
                                    		<p class="line2"><span>失败</span></p>
	                                    	<p class="line3"><span>逾期未付款</span></p>
                                    	<%} %>
                                    <%}%>
                            </div>
                            <!-- 中间 -->
                            <div class="middle">
                                <div class="line1">
                                    <a href="projectdetail?orderid=<%=odOrderEntitie.getId()%>"><h5><%=odOrderEntitie.getPjInfoEntity().getName() %></h5></a>
                                    <span><%=odOrderEntitie.getPjInfoEntity().getStatusDesc() %></span>
                                    <%if(odOrderEntitie.getPjInfoEntity().getStatus() == 20 && odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getPreheatdays() != 0){ %>
                                    <span><%=odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getPreheatdays()%>天</span>
                                    <%}else if(odOrderEntitie.getPjInfoEntity().getStatus() == 30 && odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getRaisedays() != 0){ %>
                                    <span><%=odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getRaisedays()%>天</span>
                                    <%}else if(odOrderEntitie.getPjInfoEntity().getStatus() == 40 && odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getContributivedays() != 0){ %>
                                    <span><%=odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getContributivedays()%>天</span>
                                    <%}else if(odOrderEntitie.getPjInfoEntity().getStatus() == 50 && odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getDeliverydays() != 0){ %>
                                    <span><%=odOrderEntitie.getPjInfoEntity().getPjFinacingEntity().getDeliverydays()%>天</span>
                                    <%} %>
                                </div>
                                <div class="line2">
                                   <%=odOrderEntitie.getPjInfoEntity().getBrief() %>
                                </div>
                                <div class="line3">
                                    <span class="span2">￥<%=odOrderEntitie.getDepositamount().stripTrailingZeros().toPlainString() %></span>
                                    <span class="span3">￥<%=odOrderEntitie.getAmount().stripTrailingZeros().toPlainString() %></span>
                                </div>
                            </div>
                        </li>
                        <%} %>
                    <%} %>
                </ul>
            </div>

            <div class="pageBtn">
                 <%out.println(pageUtil.genSimpleHtml("frmAction", "/member/project")); %>
            </div>
        </div>
   
    </form>

    
</body>

</html>

<%!
public int daysBetween(Date smdate,Date bdate) throws ParseException    
{    
    SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");  
    smdate=sdf.parse(sdf.format(smdate));  
    bdate=sdf.parse(sdf.format(bdate));  
    Calendar cal = Calendar.getInstance();    
    cal.setTime(smdate);    
    long time1 = cal.getTimeInMillis();                 
    cal.setTime(bdate);    
    long time2 = cal.getTimeInMillis();         
    long between_days=(time2-time1)/(1000*3600*24);  
        
   return Integer.parseInt(String.valueOf(between_days));           
}  
%>