<!DOCTYPE html>
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
</head>
<script type="text/javascript">

</script>
<body >
    <div id="wrap">

        <!-- 主要内容 begin -->
        <div class="main">
            <div class="main-content">
            <input type="hidden" name="projid" id="projid" value="<%=pjInfoEntity.getId()%>" />
                <!-- 左边内容 -->
                <!-- 左边内容 -->
                <div class="main-left">
                    <div class="prologo">
                        <img src="<%=pjDocumentEntities.get("SY")==null?"":pjDocumentEntities.get("SY").get(0).getPic() %>">
                    </div>
                    <div class="section">
                        <h4 class="heading">项目简介</h5>
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
		                        <h4 class="heading">投资亮点</h5>
		                        <%for(PjDocumentEntity pjDocumentEntity:LDdocumentEntities){ %>
		                        	<img src="<%=pjDocumentEntity.getPic()%>">
		                        <%} %>
		                    </div>
					<%} %>
                    <!-- 项目介绍 -->
                    <%List<PjDocumentEntity> XQdocumentEntities = pjDocumentEntities.get("XQ"); %>
                    <%if(XQdocumentEntities != null){ %>
                    		<div class="section">
                        		<h4 class="heading">项目介绍</h5>
                            	<%for(PjDocumentEntity pjDocumentEntity:XQdocumentEntities){ %>
                            		<img src="<%=pjDocumentEntity.getPic()%>">
                            	<%} %>
                    		</div>
					<%} %>
                    <!-- 团队成员 --> 
                    <%List<PjDocumentEntity> CYdocumentEntities = pjDocumentEntities.get("CY"); %>
                    <%if(CYdocumentEntities != null){ %>
		                    <div class="section">
		                        <h4 class="heading">团队成员</h5>
		                        <%for(PjDocumentEntity pjDocumentEntity:CYdocumentEntities){ %>
                            		<img src="<%=pjDocumentEntity.getPic()%>">
                            	<%} %>
		                    </div>
					<%} %>
                    <!-- 风险提示 -->
                    <div class="section tips">
                        <h4 class="heading">风险提示</h5>
                        <p>带投兵平台不对任何股权投资项目的盈利、亏损作承诺、担保或保证，不对您的投资损失承担任何责任。</p>
                        <h5>主要风险</h5>
                        <p>1、投资失败风险：由于各种原因致使您最终未能成功投资目标企业而产生的投资款被退回且未获得任何收益的风险。在此期间，您也可能丧失了其他潜在的投资机会。</p>
                        <p>2、市场风险：目标企业的市值会因经济因素、政治因素、投资心理和交易制度等因素的影响而产生波动，从而导致您的收益水平发生变化，并可能引发亏损的风险。</p>
                        <p>3、未聘请专业人士的风险：您可能并未聘请专业人士为您的投资提供法律、财务、投资方面的建议，这可能会影响您投资判断的准确性与专业性。</p>
                        <p>4、其他风险：宏观经济风险、政策性风险、流通性风险、目标企业经营风险、未全面了解目标企业的风险、对目标企业控制权的风险、技术风险、不可抗力风险、其他风险。</p>
                    </div>
					<%List<PjDocumentEntity> FAdocumentEntities = pjDocumentEntities.get("FA"); %>
                    <%if(FAdocumentEntities != null){ %>
		                    <div class="section">
		                        <h4 class="heading">投资方案</h5>
		                        <%for(PjDocumentEntity pjDocumentEntity:FAdocumentEntities){ %>
		                        	<img src="<%=pjDocumentEntity.getPic()%>">
		                        <%} %>
		                    </div>
					<%} %>
                </div>
                <!-- 左边内容 end -->


                <!-- 右边内容 -->
                <!-- 右边内容 -->
                <div class="main-right">

                    <!-- 项目融资信息 , 进度 , 剩余时间 , 投资按钮 -->
                    <div class="info">
                        <h5><%=pjInfoEntity.getName()%></h5>
                        <!-- 进度条 -->
                        <div class="percent">
                            <div class="percent-color" style="width:<%=pjInfoEntity.getCompletePercent()%>%"></div>
                        </div>
                        <!-- 项目融资信息 -->
                        <div class="info-msg">
                            <p>
                                <span>目标：</span><strong><%=FString.changeMillion(pjFinacingEntity.getAmount()) %></strong>
                            </p>
                        </div>
                        
                        
                        <!-- 剩余时间 -->
                        <div class="remain" id="lblDates_<%=pjInfoEntity.getId() %>">
                                <p><span>--</span>天<span>--</span>时<span>--</span>分<span>--</span>秒
                        </div>
								                     
                    </div>

                    <!-- 流程 , 下载融资计划书 -->
                    <div class="step section">
                        <h6 class="heading">项目筹资流程</h6>
                        <!-- 流程 -->
                        <div class="process-step">
                            <span class="step1 <%=pjInfoEntity.getStatus()==20?"active":"" %>" >预热</span>
                            <span class="step2 <%=pjInfoEntity.getStatus()==30?"active":"" %>" >募集</span>
                            <span class="step3 <%=pjInfoEntity.getStatus()==40?"active":"" %>" >出资</span>
                            <span class="step4 <%=pjInfoEntity.getStatus()==50?"active":"" %>" >交割</span>
                        </div>
                        <!-- 融资计划书 -->
                        <div class="plan">
                           <%=pjDocumentEntities.get("JH")==null?"":"<a href="+pjDocumentEntities.get("JH").get(0).getPic()+" download>下载融资计划书</a>" %>
                        </div>
                    </div>

                </div>
                <!-- 右边内容 end -->
            </div>
        </div>
        <!-- 主要内容 end -->


    </div>
</body>

</html>

