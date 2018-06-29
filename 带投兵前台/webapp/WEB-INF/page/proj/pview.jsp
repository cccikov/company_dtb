<%@page import="dtb.fund.entity.TbUserEntity"%>
<%@page contentType="text/html;charset=utf-8"%>
<%
	request.setCharacterEncoding("UTF-8");
	response.setContentType("text/html;charset=UTF-8");
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/";

	String url = request.getAttribute("url") != null ? (String)request.getAttribute("url"):null;
	TbUserEntity tbUserEntity = request.getAttribute("tbUserEntity") != null ? (TbUserEntity)request.getAttribute("tbUserEntity") :null;
	String type = getFileType(url);
	

%>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style type="text/css">
    * {
        padding: 0;
        margin: 0;
    }

    html,
    body {
        height: 100%;
    }

    iframe {
        display: block;
        width: 100%;
        height: 100%;
        border: none;
    }

    ul {
        position: fixed;
        top: 50%;
        left: 50%;
        list-style: none;
        overflow: hidden;
        pointer-events: none;
    }

    li {
        float: left;
        width: 200px;
        line-height: 100px;
        transform: rotate(-30deg);
        pointer-events: none;
        color: #ccc;
        font-weight: 700;
        opacity: 0.3;
        text-shadow: 2px 2px 3px #000;
        text-align: center;
    }
    </style>
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
    <script type="text/javascript">
    function Watermark(str) {
        var li = $("<li>" + str + "</li>");
        $(window).on("resize", function() {
            var winW = window.innerWidth;
            var winH = window.innerHeight
            var col = parseInt(winW / 200) + 1;
            var row = parseInt(winH / 100) + 1;
            var num = col * row;
            var ulW = col * 200;
            var ulH = row * 100;
            $("ul").css({
                width: ulW + "px",
                height: ulH + "px",
                margin: "-" + ulH / 2 + "px 0 0 -" + ulW / 2 + "px"
            }).html("");

            for (var i = 0; i < num; i++) {
                li.clone().appendTo("ul");
            }
        }).resize();
    }
    </script>
</head>
<%if(type.equals("pdf")){ %>
<body>
    <iframe src="/pdf/web/viewer.html?file=<%=url %>" frameborder="no"></iframe>
    <ul>
    </ul>
    <script type="text/javascript">
        Watermark("<%=tbUserEntity.getUsername()+tbUserEntity.getIdCard()%>");
    </script>
</body>
<%}else{ %>
<canvas id="myCanvas" width="3000" height="3000" >
</canvas>
<script>
    //准备img对象 
    var img = new Image();   
    img.src = '<%=url %>';
 
    // 加载完成开始绘制
    img.onload=function(){
       //准备canvas环境 
       var canvas=document.getElementById("myCanvas");
       var ctx=canvas.getContext("2d");
       // 绘制图片
       ctx.drawImage(img,0,0);
       // 绘制水印
       ctx.font="20px microsoft yahei";
       ctx.fillStyle = "rgba(255,255,255,0.5)";
       ctx.fillText("<%=tbUserEntity.getUsername()+tbUserEntity.getIdCard()%>",100,100);
    }
</script>
<%} %>
</html>





<%!
public String getFileType(String fileName) {
    String[] strArray = fileName.split("\\.");
    int suffixIndex = strArray.length -1;
    return strArray[suffixIndex];        
}
%>