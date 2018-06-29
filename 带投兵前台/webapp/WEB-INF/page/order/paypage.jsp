<!DOCTYPE html>
<%@page import="io.renren.utils.FString"%>
<%@page import="dtb.fund.entity.OdPayEntity"%>
<%@page import="dtb.fund.dao.OdOrderDao"%>
<%@page import="io.renren.utils.R"%>
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
	String platform_bankname = request.getAttribute("platform_bankname") != null ? (String)request.getAttribute("platform_bankname"):"";
	String platform_accno = request.getAttribute("platform_accno") != null ? (String)request.getAttribute("platform_accno"):"";
	String platform_accname = request.getAttribute("platform_accname") != null ? (String)request.getAttribute("platform_accname"):"";
	List<OdPayEntity> odPayEntities = request.getAttribute("odPayEntities") != null ? (List<OdPayEntity>)request.getAttribute("odPayEntities"):null;
	BigDecimal secrecy_ratio = request.getAttribute("secrecy_ratio") != null ? (BigDecimal)request.getAttribute("secrecy_ratio"):null;
	BigDecimal firstdeposit_ratio = request.getAttribute("firstdeposit_ratio") != null ? (BigDecimal)request.getAttribute("firstdeposit_ratio"):null;
	BigDecimal subscribe_ratio = request.getAttribute("subscribe_ratio") != null ? (BigDecimal)request.getAttribute("subscribe_ratio"):null;
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
    <script src="/statics/libs/ajaxupload.js"></script>
    <script type="text/javascript">
        var Url = "";

        function loading(flag) {
            if (flag) {
                $(".loader-float", top.document).addClass("active"); // loading效果出现
            } else {
                $(".loader-float", top.document).removeClass("active"); // loading效果消失
            }
        }

        $(function() {
            // 先输入金额才可以上传
            $("#amount").on("input", function() {
                var _this = this;
                var type = $("#type").val();// 上传类型
                var max = 1000;
                if (_this.value.length > 0) { // 有值
                    var value = Number(_this.value);
                    if(!isNaN(value)){ // 是正常数字
                        if(type == "DJ" || type == "YK"){ // 单位为万的时候
                            if(value < max){ // 不超过1000万元
                                $(".action .btn").addClass("canClick");
                            }else{
                                $(".action .btn").removeClass("canClick");
                                alert("金额错误，请注意金额的单位是\"万元\"");
                            }
                        }else{ // 单位为元
                        	 $(".action .btn").addClass("canClick");
                        }
                    }else{
                    	 $(".action .btn").removeClass("canClick");
                        alert("格式错误，请输入数字。");
                    }
                } else {
                	 $(".action .btn").removeClass("canClick");
                }
            });


            $("#audit").click(function() {
                formAction.submit();
            });

        })



    </script>

</head>

<body>
    <div id="wrap">


        <!-- 导航 begin -->
        <%@ include file="../header.html"%><!--动态包含-->

        <input name="token" id="token" type="hidden"></input>

        <!-- 导航 end -->
		<%if(odOrder != null){ %>
		<%if(odOrder.getStatus() == 0){ %>
            <!-- 项目预热状态 -->
            <!-- 上传保密金凭证 -->
            <div class="main width-wrap">
                <form action="/order/receiptsubmit" method="post" name="formAction">
                    <input type="hidden" id="orderid" name="orderid" value="<%=odOrder.getId()%>">
                    <input type="hidden" id="type" value="<%=odOrder.getStatus() == 0?"BM":odOrder.getStatus() == 10?"DJ":odOrder.getStatus() == 20?"YK":""%>">
        			<div class="main-content">
        				<p class="upload-title">支付保密金</p>

        				<!-- 项目table -->
        				<table class="proj-table">
        					<tr>
        						<th>项目</th>
        						<th>会员</th>
        						<th>起投金额</th>
        						<th>保密金占比</th>
        						<th>保密金</th>
        					</tr>
        					<tr>
        						<td><%=pjInfo.getName() %></td>
        						<td><%=odOrder.getTbUserEntity().getUsername() %></td>
        						<td></td>
        						<td><%=secrecy_ratio.multiply(new BigDecimal(100)).stripTrailingZeros().toPlainString()%>%</td>
        						<td><%=FString.changeMillion(odOrder.getSecrecyamount()) %>元</td>
        					</tr>
                        </table>

                        <!-- 收款账户table -->
                        <table class="bank-table" style="display:none;">
                            <tr>
                                <td>收款账户</td>
                                <td>
                                    <%=platform_bankname %>
                                </td>
                                <td>
                                    <%=platform_accname %>
                                </td>
                                <td>
                                    <%=platform_accno %>
                                </td>
                            </tr>
                        </table>

						<div class="upload-zhifubao">
							<div class="zhifubao-pay">
		                        <img src="/statics/img/zhifubao.png">
                                <p>支付宝收款码</p>
                                <a href="javascript:void(0)" onclick="$('.bank-table').show();" class="no-zhifubao">没有支付宝?</a>
		                    </div>

	        				<!-- 上传操作 按钮 -->
	        				<div class="upload-wrap">
	        					<p class="input-wrap">
	        						<span class="label-span">付款金额</span>
	        						<input class="text-input" type="text" name="amount" id="amount">
	        						<span class="tail">元</span>
	        					</p>
	        				</div>
						</div>


        	            <p class="action">
        	                <a href="javascript:void(0)" class="btn" id="audit">确认提交</a>
        	            </p>


        				<!-- 提示 -->
        				<div class="tips">
        					<h5>保密金规则</h5>
        					<ul>
        						<li>保密金为项目起投额1%</li>
        						<li>支付完成后，方可在项目详情页查看核心资料</li>
        						<li>项目募集完成三个月内，保密金将退回所登记的银行卡</li>
        						<li>若泄露核心资料，则不予退还保密金，且平台保留追究法律责任的权利</li>
        					</ul>
        				</div>

        			</div>
                 </form>
    		</div>


		<%}else if(odOrder.getStatus() == 10){ %>
    		<!-- 项目募集状态 -->
    		<!-- 上传保证金凭证 -->
    		<div class="main width-wrap">
                <form action="/order/receiptsubmit" method="post" name="formAction">
                    <input type="hidden" id="orderid" name="orderid" value="<%=odOrder.getId()%>">
                    <input type="hidden" id="type" value="<%=odOrder.getStatus() == 0?"BM":odOrder.getStatus() == 10?"DJ":odOrder.getStatus() == 20?"YK":""%>">
                    <div class="main-content">
        				<p class="upload-title">你已成功认投该项目 , 请及时打款</p>

        				<!-- 项目table -->
        				<table class="proj-table">
        					<tr>
        						<th>项目</th>
        						<th>认投人</th>
        						<th>认投金额</th>
        						<th>认购费</th>
        						<th>保证金</th>
                                <th>总计</th>
        					</tr>
        					<tr>
        						<td><%=pjInfo.getName() %></td>
        						<td><%=odOrder.getTbUserEntity().getUsername() %></td>
        						<td><%=FString.changeMillion(odOrder.getAmount())%></td>
        						<td><%=FString.changeMillion(odOrder.getAmount().multiply(subscribe_ratio)) %>元(<%=subscribe_ratio.multiply(new BigDecimal(100)).stripTrailingZeros().toPlainString()%>%)</td>
        						<td><%=FString.changeMillion(odOrder.getDepositamount()) %>元(<%=firstdeposit_ratio.multiply(new BigDecimal(100)).stripTrailingZeros().toPlainString()%>%)</td>
                                <td style="color:#3489d8"><%=FString.changeMillion(odOrder.getDepositamount().add(odOrder.getAmount().multiply(subscribe_ratio))) %>元</td>
        					</tr>
        				</table>

        				<!-- 收款账户table -->
        				<table class="bank-table">
        					<tr>
        						<td>收款账户</td>
        						<td><%=platform_bankname %></td>
        						<td><%=platform_accname %></td>
        						<td><%=platform_accno %></td>
        					</tr>
        				</table>

        				<!-- 上传操作 按钮 -->
        				<div class="upload-wrap">
        					<p class="input-wrap">
        						<span class="label-span">付款金额</span>
        						<input class="text-input" type="text" name="amount" id="amount">
        						<strong class="tail big-font red-font">万元</strong>
        					</p>
        				</div>

        	            <p class="action">
        	                <a href="javascript:void(0)" class="btn" id="audit">确认提交</a>
        	            </p>


        				<!-- 提示 -->
        				<div class="tips">
        					<h5>保证金规则</h5>
        					<ul>
        						<li>保证金为投资额20%</li>
        						<li>在支付保证金的同时，需缴纳投资额的1%~3%作为认购费</li>
        						<li>如放弃支付余款，则保证金与认购费不予退还</li>
        						<li>保证金支付完成后，平台将指定余款支付日期</li>
        					</ul>
        				</div>

        			</div>
                </form>
    		</div>






		<%}else if(odOrder.getStatus() == 20){ %>
    		<!-- 项目余款状态 -->
    		<!-- 上传余款凭证 -->
    		<div class="main width-wrap">
                <form action="/order/receiptsubmit" method="post" name="formAction">
                    <input type="hidden" id="orderid" name="orderid" value="<%=odOrder.getId()%>">
                    <input type="hidden" id="type" value="<%=odOrder.getStatus() == 0?"BM":odOrder.getStatus() == 10?"DJ":odOrder.getStatus() == 20?"YK":""%>">

        			<div class="main-content">

        				<p class="upload-title">你已成功认投该项目 , 请及时打款</p>

        				<!-- 项目table -->
        				<table class="proj-table">
        					<tr>
        						<th>项目</th>
        						<th>投资人</th>
        						<th>投资金额</th>
        						<th>余款占比</th>
        						<th>余款</th>
        					</tr>
        					<tr>
        						<td><%=pjInfo.getName() %></td>
        						<td><%=odOrder.getTbUserEntity().getUsername() %></td>
        						<td><%=FString.changeMillion(odOrder.getAmount())%></td>
        						<td><%=BigDecimal.valueOf(100).subtract(firstdeposit_ratio.multiply(new BigDecimal(100))).stripTrailingZeros().toPlainString()%>%</td>
        						<td><%=FString.changeMillion(odOrder.getAmount().subtract(odOrder.getDepositamount())) %>元</td>
        					</tr>
        				</table>

        				<!-- 收款账户table -->
        				<table class="bank-table">
        					<tr>
        						<td>收款账户</td>
        						<td><%=platform_bankname %></td>
        						<td><%=platform_accname %></td>
        						<td><%=platform_accno %></td>
        					</tr>
        				</table>

        				<!-- 上传操作 按钮 -->
        				<div class="upload-wrap">
        					<p class="input-wrap">
        						<span class="label-span">付款金额</span>
        						<input class="text-input" type="text" name="amount" id="amount">
        						<strong class="tail big-font red-font">万元</strong>
        					</p>
        				</div>

        	            <p class="action">
        	                <a href="javascript:void(0)" class="btn" id="audit">确认提交</a>
        	            </p>

        				<!-- 提示 -->
        				<div class="tips">
        					<h5>余款规则</h5>
        					<ul>
        						<li>余款为投资额80%</li>
        						<li>需在平台通知后于指定日期前一次性付清</li>
        						<li>逾期放弃支付，视为违约，保证金与认购费不予退还</li>
        					</ul>
        				</div>

        			</div>
                </form>
    		</div>

		<%}else{ %>
		订单状态已发生变化，请刷新页面
		<%} %>
		<%}else{ %>
		不存在改订单
		<%} %>


        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->

    </div>
</body>

</html>
