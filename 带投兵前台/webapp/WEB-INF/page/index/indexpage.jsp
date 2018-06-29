<!DOCTYPE html>
<%@page import="org.jsoup.nodes.Element"%>
<%@page import="org.jsoup.select.Elements"%>
<%@page import="org.jsoup.Jsoup"%>
<%@page import="org.jsoup.nodes.Document"%>
<%@page import="dtb.fund.entity.InvestorEntity"%>
<%@page import="dtb.fund.entity.SysCarouselEntity"%>
<%@page import="io.renren.utils.FDate"%>
<%@page import="io.renren.utils.FString"%>
<%@page import="java.math.BigDecimal"%>
<%@page import="java.util.Calendar"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.text.ParseException"%>
<%@page import="java.util.Date"%>
<%@page import="dtb.fund.entity.PjDocumentEntity"%>
<%@page import="java.util.Map"%>
<%@page import="dtb.fund.entity.NwNewsEntity"%>
<%@page import="dtb.fund.entity.PjInfoEntity"%>
<html lang="zh">
<%@page import="java.util.List"%>
<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";

	List<SysCarouselEntity> CarouselList = request.getAttribute("CarouselList") != null ? (List<SysCarouselEntity>)request.getAttribute("CarouselList"):null;
	List<PjInfoEntity> ProjectList = request.getAttribute("ProjectList") != null ? (List<PjInfoEntity>)request.getAttribute("ProjectList"):null;
	List<PjInfoEntity> SucProjectList = request.getAttribute("SucProjectList") != null ? (List<PjInfoEntity>)request.getAttribute("SucProjectList"):null;
	List<NwNewsEntity> newsEntities = request.getAttribute("newsEntities") != null ? (List<NwNewsEntity>)request.getAttribute("newsEntities"):null;
	List<NwNewsEntity> noticeEntities = request.getAttribute("noticeEntities") != null ? (List<NwNewsEntity>)request.getAttribute("noticeEntities"):null;
	List<InvestorEntity> investorEntities = request.getAttribute("investorEntities") != null ? (List<InvestorEntity>)request.getAttribute("investorEntities"):null;

	String investor = request.getAttribute("investor") != null ? (String)request.getAttribute("investor"):null;

	String project_benefit = request.getAttribute("project_benefit") != null ? (String)request.getAttribute("project_benefit"):null;

	String investment_amount = request.getAttribute("investment_amount") != null ? (String)request.getAttribute("investment_amount"):null;

	String successful_project = request.getAttribute("successful_project") != null ? (String)request.getAttribute("successful_project"):null;
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="description" content="带投兵（深圳）网络科技股份有限公司，是一家专注于高新技术创新与文化娱乐产业的互联网股权直投平台。">
    <meta name="Keywords" content="带投兵，股权众筹，股权直投，股权众筹平台，股权直投平台，投资理财，网上投资，网上理财，股权投资，daitoubing，新型股权直投平台">
    <title>带投兵-新型股权直投平台，带您投出自己的独角兽</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="statics/plugins/swiper/swiper.min.css">
    <link rel="stylesheet" type="text/css" href="statics/css/index.css">
    <script type="text/javascript" src="statics/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="statics/libs/circle-progress.min.js"></script>
    <script type="text/javascript" src="statics/libs/vue.min.js"></script>
    <script type="text/javascript" src="statics/plugins/swiper/swiper.jquery.min.js"></script>
    <script src="statics/libs/base.js"></script>
    <script type="text/javascript" src='statics/libs/index.js'></script>
</head>
<script type="text/javascript">

    var now = new Date();
    now.setTime(<%=(Calendar.getInstance()).getTimeInMillis()%>);
    var arrDates = new Array(0);
    var arrTimerLabels = new Array(0);

    $(function() {
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
    <div id="wrap">


        <!-- 导航 begin -->
        <%@ include file="../header.html"%><!--动态包含-->
        <!-- 导航 end -->

        <!-- 主要 begin -->
        <div class="main">

            <!-- 主要 轮播轮播区域 -->
            <div class="banner">
                <!-- 轮播图片 -->
                <div class="swiper-container" id="banner">
                    <div class="swiper-wrapper">
                    <%if(CarouselList != null){ %>
                    	<%for(SysCarouselEntity carouselEntity:CarouselList){ %>
	                            <a class="swiper-slide" href="<%=carouselEntity.getSrc()%>">
	                            	<img src="<%=carouselEntity.getPic().equals("")?"":carouselEntity.getPic()%>">
	                            </a>
                    	<%} %>
                    <%} %>
                    </div>
                    <!-- 如果需要分页器 -->
                    <div class="swiper-pagination"></div>
                </div>
                <!-- 轮播图片 end -->
            </div>
            <!-- 主要 轮播轮播区域 end -->


            <!-- 主要 内容区域 -->
            <div class="main-content">

                <!-- 主要_short begin -->
                <div class="short-wrap">
                    <div class="short">
                        <p class="short1">
                            <strong><i class="num" data-val="<%=successful_project %>">0</i>个+</strong>
                            <span>成功募集项目</span>
                        </p>
                        <p class="short2">
                            <strong><i class="num" data-val="<%=investment_amount %>">0</i>亿</strong>
                            <span>总投资金额</span>
                        </p>
                        <p class="short3">
                            <strong><i class="num" data-val="<%=investor %>">0</i>位</strong>
                            <span>投资人</span>
                        </p>
                        <p class="short4">
                            <strong><i class="num" data-val="<%=project_benefit%>">0</i>%+</strong>
                            <span>近期项目收益</span>
                        </p>
                    </div>
                </div>
                <!-- 主要_short end -->



                <!-- 主要_热门项目 begin -->
                <div class="hot">
                    <h4 class="heading">HOT PROJECTS</h4>
                    <h5 class="heading">热门项目</h5>

                    <img class="high" src="/statics/img/high01.png">

                    <div class="index-swiper-contain">
                        <div class="index-swiper-clip">

                            <div class="swiper-container index-swiper">

                				<ul class="swiper-wrapper">
                					<%if(ProjectList != null){ %>
            		                    <%for(PjInfoEntity pjInfoEntity:ProjectList){ %>
            		                    <%Map<String,List<PjDocumentEntity>> pjDocumentEntities = pjInfoEntity.getPjDocumentEntities(); %>
            	                        <!-- 募集 mj-project -->
            	                        <!-- 预热 yr-project -->
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
            						<li class="swiper-slide">
                                        <a class="<%=pjInfoEntity.getFinancing() %>-round" href="/project/projdetail/<%=pjInfoEntity.getId()%>"  target="_blank">
                                            <!-- 项目图片 -->
                                            <i style="background-image:url(<%=pjDocumentEntities.get("SY")==null?"":pjDocumentEntities.get("SY").get(0).getPic() %>)"></i>

                                            <div class="project-content">
                                                <p class="project-title">
                                                    <em><%=pjInfoEntity.getStatusDesc() %></em>
                                                    <span><%=pjInfoEntity.getName() %></span>
                                                </p>
                                                <div class="project-detail">
                                                    <!-- 进度条 -->
                                                    <div class="progress">
                                                        <div class="progress-canvas" data-value="<%=Double.valueOf(pjInfoEntity.getCompletePercent())/100%>"></div>
                                                        <span class="progress-num"><em class="num" data-val="<%=pjInfoEntity.getCompletePercent()%>">0</em>%</span>
                                                    </div>
                                                    <div class="projec-major">
                                                        <p>
                                                            <span>目标：</span><%=FString.changeMillion(pjInfoEntity.getPjFinacingEntity().getAmount()) %>
                                                        </p>
                                                        <p>
                                                            <span>起投：</span><%=FString.changeMillion(pjInfoEntity.getPjFinacingEntity().getMinamount()) %>
                                                        </p>
                                                        <p>
                                                            <span>募集总额：</span><%=FString.changeMillionByRound(pjInfoEntity.getOrderAmount()) %>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
            		            		<%} %>
            	            		<%} %>
            	            	</ul>
                            </div>

                        </div>

                        <a href="javascript:void(0)" class="swiper-left"></a>
                        <a href="javascript:void(0)" class="swiper-right"></a>
                    </div>


                    <div class="more">
                        <a href="/project/projpage/all/1" target="_blank">查看更多</a>
                    </div>

                </div>
                <!-- 主要_热门项目 end -->




                <!-- 主要_成功项目 begin -->
                <div class="accomplished">
                    <h4 class="heading">ACCOMPLISHED PROJECTS</h4>
                    <h5 class="heading">成功项目</h5>

                    <img class="high" src="/statics/img/high02.png">

                    <ul>
                        <%if(SucProjectList != null){ int i = 0;%>
		                    <%for(PjInfoEntity pjInfoEntity:SucProjectList){i=i+1; %>
		                    <%Map<String,List<PjDocumentEntity>> pjDocumentEntities = pjInfoEntity.getPjDocumentEntities(); %>
			                <li class="proj<%=i %>" >
	                            <a style="background-image:url(<%=pjDocumentEntities.get("SUC")==null?pjDocumentEntities.get("SY")==null?"":pjDocumentEntities.get("SY").get(0).getPic():pjDocumentEntities.get("SUC").get(0).getPic() %>)" href="/project/projdetail/<%=pjInfoEntity.getId()%>"  target="_blank">
	                                <div class="proj-info">
	                                    <div class="box">
	                                        <h6><%=pjInfoEntity.getName() %></h6>
	                                        <p><%=FString.toString(pjInfoEntity.getSucbrief(),"").equals("")?pjInfoEntity.getBrief():pjInfoEntity.getSucbrief() %></p>
	                                    </div>
	                                </div>
	                            </a>
	                        </li>
		                    <%} %>
		                <%} %>
                    </ul>

                    <div class="more">
                        <a href="/project/projpage/100/1" target="_blank">查看更多</a>
                    </div>
                </div>
                <!-- 主要_成功项目 end -->



                <!-- 主要_明星投资人 begin -->
                <div class="famous">
                    <h4 class="heading">FAMOUS INVESTORS</h4>
                    <h5 class="heading">明星投资人</h5>

                    <img class="high" src="/statics/img/high03.png">

                    <ul>
                        <li>
                            <a href="###">
                                <i style="background-image: url(/statics/img/famous1.jpg);background-position: center top -48px"></i>
                                <div class="famous-content">
                                    <p class="name">李斌</p>
                                    <p class="intro">出行教父，蔚来汽车董事长<br>摩拜天使投资人<br>投资「考拉FM」</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                <i style="background-image: url(/statics/img/famous2.jpg)"></i>
                                <div class="famous-content">
                                    <p class="name">吴世春</p>
                                    <p class="intro">梅花天使创投创始合伙人<br>趣店天使投资人<br>投资「蜂狂运动」</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                <i style="background-image: url(/statics/img/famous3.jpg)"></i>
                                <div class="famous-content">
                                    <p class="name">罗飞</p>
                                    <p class="intro">松禾资本董事长<br>柔宇科技天使投资人<br>投资「皓图智能」</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href="###">
                                <i style="background-image: url(/statics/img/famous4.jpg)"></i>
                                <div class="famous-content">
                                    <p class="name">戚薇</p>
                                    <p class="intro">亚洲偶像盛典<br>"最具人气女演员"<br>投资「康堤股份」</p>
                                </div>
                            </a>
                        </li>
                    </ul>

                    <!-- <ul>
                        <%if(investorEntities != null){ %>
                            <%for(InvestorEntity investorEntity:investorEntities){ %>
                            <li>
                                <a href="###">
                                    <i style="background-image: url(<%=investorEntity.getPic() %>);background-position: center top -48px"></i>
                                    <div class="famous-content">
                                        <p class="name"><%=investorEntity.getName() %></p>
                                        <p class="intro"><%=investorEntity.getBrief() %></p>
                                    </div>
                                </a>
                            </li>
                            <%} %>
                        <%} %>
                    </ul> -->

                </div>
                <!-- 主要_明星投资人 end -->



                <!-- 新闻与通知 -->
                <div class="big-wrap">

                    <h4 class="heading">BREAKING NEWS</h4>
                    <h5 class="heading">新闻资讯</h5>

                    <div class="index-news-notice">

                        <!-- 新闻 -->
                        <div class="news">
                            <h4>新闻动态<a href="/newslist" target="_blank">更多</a></h4>
                            <div class="content">


								<%
								if(newsEntities != null){int i = 0;
	                                for(NwNewsEntity nwNewsEntity:newsEntities){
	                                	Document doc = Jsoup.parseBodyFragment(nwNewsEntity.getContent()); //html内容解析为Document
	                                	Elements inputArray = doc.getElementsByTag("img");//对应的元素数组
	                                	if(inputArray.size() > 0){
	                                		newsEntities.remove(i);
	                                		String src = inputArray.get(0).attr("src");

	                           %>
	                           <div class="major">
                                    <a href="newsdetail/<%=nwNewsEntity.getId()%>">
                                        <i style="background-image:url(<%=src%>)"></i>
                                        <p> <%=nwNewsEntity.getTitle() %></p>
                                    </a>
                                </div>
	                           <%
	                           break;
	                                	}
									i = i + 1;
	                                }
                                }

								%>

                                <div class="minor">
                                    <%if(newsEntities != null){int i = 0; %>
                                    <%for(NwNewsEntity nwNewsEntity:newsEntities){i = i + 1; %>
	                                    <%if(i < 6 ){ %>
	                                    	<a href="newsdetail/<%=nwNewsEntity.getId()%>">
		                                        <p><%=nwNewsEntity.getTitle() %></p>
		                                        <span><%=new SimpleDateFormat("MM/dd").format(nwNewsEntity.getCreatetime()) %></span>
		                                    </a>
	                                    <%} %>
                                    <%} %>
                                    <%} %>
                                </div>
                                <!-- minor end -->
                            </div>
                        </div>
                        <!-- 新闻 end -->


                        <!-- 通知 -->
                        <div class="notice">
                            <h4>通知公告<a href="/newslist" target="_blank">更多</a></h4>
                            <div class="content">
                            <%if(noticeEntities != null){ %>
                        		<%for(NwNewsEntity nwNewsEntity:noticeEntities){ %>
	                                <a href="newsdetail/<%=nwNewsEntity.getId()%>">
	                                    <p><%=nwNewsEntity.getTitle() %></p>
	                                    <span><%=new SimpleDateFormat("MM/dd").format(nwNewsEntity.getCreatetime()) %></span>
	                                </a>
                                <%} %>
                        	<%} %>
                            </div>
                        </div>
                        <!-- 通知 end -->
                    </div>
                </div>


                <!-- 主要_合作伙伴 begin -->
                <div class="partners">
                    <h4 class="heading">PARTNERS</h4>
                    <h5 class="heading">合作伙伴</h5>

                    <ul>
                        <li>
                            <img src="/statics/img/partners1.png">
                        </li>
                        <li>
                            <img src="/statics/img/partners2.png" alt="">
                        </li>
                        <li>
                            <img src="/statics/img/partners3.png" alt="">
                        </li>
                        <li>
                            <img src="/statics/img/partners4.png" alt="">
                        </li>
                        <li>
                            <img src="/statics/img/partners5.png" alt="">
                        </li>
                        <li>
                            <img src="/statics/img/partners6.png" alt="">
                        </li>
                        <li>
                            <img src="/statics/img/partners7.png" alt="">
                        </li>
                        <li>
                            <img src="/statics/img/partners8.png" alt="">
                        </li>
                        <li>
                            <img src="/statics/img/partners9.png" alt="">
                        </li>
                    </ul>

                </div>
                <!-- 主要_合作伙伴 end -->

            </div>
            <!-- 主要 内容区域 end -->

        </div>
        <!-- 主要 end -->

        <!-- 页面底部 begin -->
        <jsp:include page="../bottom.jsp" flush="true"/><!--动态包含-->
        <!-- 页面底部 end -->

    </div>
</body>

</html>
