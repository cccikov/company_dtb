<%@page import="dtb.fund.util.RedisHelper"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	import="com.baidu.ueditor.ActionEnter"
    pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%
    request.setCharacterEncoding( "utf-8" );
	response.setHeader("Content-Type" , "text/html");
	response.setHeader("Access-Control-Allow-Origin","dtb.cn");
	response.setHeader("Access-Control-Allow-Origin","*");
	response.setHeader("Access-Control-Allow-Headers","X-Requested-With,X_Requested_With");
	if (!"config".equals(request.getParameter("action"))){
		String token = request.getParameter("token");
		//System.out.println("token="+token);
		String from = RedisHelper.getValueByKey(token);
		if (from ==null || !"ready".equals(from)){
			out.write("没有权限");
			System.err.println("无有效令牌调用ueditor");
			return;
		}		
	}
	String rootPath = application.getRealPath( "/" );
	out.write( new ActionEnter( request, rootPath ).exec());
%>