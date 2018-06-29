<%@page import="io.renren.utils.FString"%>
<%@page import="org.apache.shiro.SecurityUtils"%>
<%@page import="dtb.fund.entity.TbUserEntity"%>
<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
    response.setContentType("text/html;charset=UTF-8");
    TbUserEntity tbUserEntity =  (TbUserEntity)SecurityUtils.getSubject().getPrincipal();
%>
<!--[if lte IE 9]>
    <style type="text/css">
        .ie-tips{
            line-height:24px;
            padding: 0 12px;
            background:#fffcde;
            color:#545454;
            font-size: 14px;
        }
        .ie-tips a{
            color:blue;
            text-decoration:underline;
        }
    </style>
    <p class="ie-tips">！！！带投兵网站提醒：您的浏览器版本过低，为了您的安全着想，请升级您的浏览器，或者使用别的浏览器（推荐使用<a target="_blank" href="https://www.baidu.com/s?ie=UTF-8&wd=chrome">chrome浏览器</a>）</p>
<![endif]-->

<!-- 导航 begin -->
<div class="nav">
    <div class="nav-line">
        <div class="width-wrap">
            <p class="nav-line-l">
                <span> 欢迎您来到带投兵，投资有风险，选择需谨慎！</span>
            </p>
            <!-- <p class="nav-line-r">
                <a class="" href="javascript:void(0)">新手指南</a>
            </p> -->
        </div>
    </div>
    <!-- nav-line end -->


    <div class="nav-main">
        <div class="width-wrap">
            <div class="top-img">
                <a href="/"><img src="/statics/img/logo.png"></a>
                <!-- <img src="/statics/img/index00.png"> -->
            </div>
            <div class="top-link">
                <a href="/">首页</a>
                <a href="/project/projpage/all/1">募集项目</a>
                <!-- <a href="###">发起项目</a> -->
                <a href="/guide.html">新手指南</a>
                <a href="/about.html">关于我们</a>
            </div>
            <div class="top-login">
                 <%if(tbUserEntity != null){ %>
                    <a class="" href="/member/index"><%=FString.toString(tbUserEntity.getUsername(),"").equals("")?tbUserEntity.getTradername():tbUserEntity.getUsername() %> | 个人中心</a>
                    <!-- <a class="" href="/member/index">个人中心</a> -->
                    <a class="" href="/logout">退出</a>
                <%}else{ %>
                    <a class="" href="/login.html">登录</a>
                    <a class="" href="/registerpage">注册</a>
                <%} %>
            </div>
        </div>
        <!-- width-wrap end -->
    </div>
    <!-- nav-main end -->


</div>
<!-- 导航 end -->
