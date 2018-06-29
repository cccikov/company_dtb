<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
String transaction_id 	= request.getParameter("transaction_id");
String contract_id		= request.getParameter("contract_id");
String result_code		= request.getParameter("result_code");
String result_desc 		= request.getParameter("result_desc");
String download_url		= request.getParameter("download_url");
String viewpdf_url		= request.getParameter("viewpdf_url");
String timestamp		= request.getParameter("timestamp");
String msg_digest		= request.getParameter("msg_digest");
System.out.println(
		"法大大反馈："+
		"transaction_id:"+transaction_id+","+
		"contract_id:"+contract_id+","+
		"result_code:"+result_code+","+
		"result_desc:"+result_desc+","+
		"download_url:"+download_url+","+
		"viewpdf_url:"+viewpdf_url+","+
		"timestamp:"+timestamp+","+
		"msg_digest:"+msg_digest
		);
%>
