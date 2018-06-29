<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
    response.setContentType("text/html;charset=UTF-8");
%>

<!-- 页面底部 begin -->
<div class="footer">
        <p class="horn"><strong>温馨提示：</strong>本平台特聘广东十大律所「星辰律师事务所」为您提供法律保障，并由国内知名电子合同签署平台「法大大」为您提供证据保全服务</p>
    <div class="footer-main">
        <div class="footer-left">
            <img src="/statics/img/bottom-logo.png">
        </div>
        <div class="footer-middle">
            <a class="about" target="_blank" href="/about.html">关于我们</a>
            <a class="new" target="_blank" href="/guide.html">新手指南</a>
            <a class="question" href="javascript:void(0)">常见问题</a>
        </div>
        <div class="footer-right">
            <p>
                <img src="/statics/img/gongzhonghao.jpg" alt="公众号二维码">官方公众号
            </p>
            <p>
                <img src="/statics/img/kefu.jpg" alt="公众号二维码">在线客服
            </p>
        </div>
        <div class="footer-bottom">
            <p>客服电话：400-1116-199</p>
            <p>工作时间：周一到周五 9:00-19:00</p>
            <p>客服邮箱：kf@dtb.cn</p>
        </div>
    </div>
    <img style="position:absolute;bottom:0px;right:15px;opacity:0.05" src="/statics/img/fdd.png">
    <p class="right">版权所有&copy;Copyright 2017 带投兵 - <a target="_blank" href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">粤ICP备17129433号</a></p>
</div>
<!-- 页面底部 end -->






<!-- 浮窗 -->
<!-- js 调用showLogin(true) 出现弹窗 ;  调用showLogin(false) 隐藏弹窗 -->
<div class="float">
    <div class="mask">
    </div>
    <div class="login-float">
        <h4>会员登录</h4>
        <ul>
            <li class="error-li" v-if="error">
                <p><i class="fa fa-exclamation-triangle"></i>{{errorMsg}}</p>
            </li>
            <li>
                <input type="text" class="form-control" v-model="tradername" placeholder="账号">
            </li>
            <li>
                <input type="password" class="form-control" v-model="password" placeholder="密码">
            </li>
            <li class="code-li">
                <span class="alink" @click="refreshCode">点击刷新</span>
                <p>
                    <img alt="如果看不清楚，请单击图片刷新！" class="pointer" :src="src" @click="refreshCode">
                </p>
                <label>
                    <input type="text" class="form-control" v-model="captcha" @keyup.enter="login" placeholder="验证码">
                </label>
            </li>
            <!--
            <li class="remeber-li">
                <label>
                    <input type="checkbox" name="">记住用户名
                </label>
                <a href="javascript:void(0)">忘记密码?</a>
            </li>
             -->
            <li>
                <button>登录</button>
            </li>
            <li class="register-li">没有账户?
                <a href="/registerpage">免费注册</a>
            </li>
        </ul>
    </div>
    <div class="loader-float">
        <div class="loader">
            <div class="loader-inner ball-spin-fade-loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</div>