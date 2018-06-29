<%@page import="java.util.HashMap"%>
<%@page import="dtb.fund.weixin.bean.TemplateData"%>
<%@page import="java.util.Map"%>
<%@page import="dtb.fund.weixin.TestTM"%>
<%@page import="dtb.fund.weixin.bean.UserAuth"%>
<%@page import="dtb.fund.weixin.util.WeixinUtil"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>微信</title>
</head>
<body>
<%
String code = request.getParameter("code");
String state= request.getParameter("state");
System.out.println("code:"+request.getParameter("code"));
System.out.println("state:"+request.getParameter("state"));
UserAuth ua =  WeixinUtil.getUserAuth(code);
System.out.println("openid:"+ua.getOpenid());

Map<String,TemplateData> m = new HashMap<String,TemplateData>();  
TemplateData name = new TemplateData();  
name.setColor("#000000");  
name.setValue("吴永巍");  
m.put("name", name);

//TestTM.sendTM(ua.getOpenid(),m,"OBj9mT4qh9eHrS0SYxrlR_DJyR8Bl9tGBE0gxKaF3xA","192.168.1.99/m/page/index.html");
%>
<%=ua.getOpenid() %>
</body>
</html>