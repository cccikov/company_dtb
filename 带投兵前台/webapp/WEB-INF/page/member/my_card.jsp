<!DOCTYPE html>
<%@page import="dtb.fund.entity.BankcardEntity"%>
<%@page import="dtb.fund.entity.TbUserEntity"%>
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
	List<BankcardEntity> bankcardEntities = request.getAttribute("bankcardEntities") != null ? (List<BankcardEntity>)request.getAttribute("bankcardEntities"):null;
%>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <title>我的银行卡</title>
    <link rel="shortcut icon" href="statics/img/favicon.ico" />
    <link rel="icon" href="statics/img/favicon.ico"/>
    <link rel="stylesheet" type="text/css" href="/statics/css/me_frame.css">
    <script type="text/javascript" src="/statics/libs/jquery-1.11.3.min.js"></script>
</head>
<script type="text/javascript">
    var cardObj = {};
    $(function(){
        $(".card").on("click",function(){
            var _this = $(this);
            cardObj = _this;
            var bank_name = _this.find(".bank-name").html();
            var bank_address = _this.find(".bank-address").html();
            var name = _this.find(".name").html();
            var number = _this.find(".number").html();

            $("#cardNo").val(number);
            $(".card-msg").addClass("active").find(".bank-name").html(bank_name);
            $(".card-msg").find(".name").html(name);
            $(".card-msg").find(".number").html(number);
            $(".card-msg").find(".bank-address")[0].value = bank_address;
        });
        $(".card-msg a").on("click",function(){
            $(".card-msg").removeClass("active");
        });
        $(".card-msg button").on("click",function(){
            var address = $(".card-msg").removeClass("active").find(".bank-address")[0].value;
            updatecard();
            cardObj.find(".bank-address").html(address);
        });
    });
    
    function updatecard(){
    	if($("#dotName").val() == ""){
    		$("#dotName").focus();
    		return false;
    	}
		 $.ajax({
				type: "POST",
			    url: "/member/updatebankcard",
			    data:{"cardNo":$("#cardNo").val(),"dotName":$("#dotName").val()},
			    success: function(r){
			    	var obj = eval('('+r+')');
					if(obj.code=="500"){
						alert(obj.msg)
					}else{
						//location.reload();
					}
			    }
			});
	} 
</script>
<body style='min-width:0px;'>
    <!-- 右边 -->
    <div class="main-right-content">
        <h4>银行卡管理</h4>

        <ul class="card-main">
            <%if(bankcardEntities != null){ %>
                <%for(BankcardEntity bankcardEntitie:bankcardEntities){ %>
                <li class="card">
                    <div>
                        <p class="name"><%=bankcardEntitie.getAccountName() %></p>
                        <p class="bank-name"><%=bankcardEntitie.getBankName() %></p>
                    </div>
                    <p class="bank-address"><%=bankcardEntitie.getDotName() %></p>
                    <p class="number"><%=bankcardEntitie.getCardNo() %></p>
                </li>
                <%} %>
            <%} %>
        </ul>
    </div>

    <div class="card-msg">
        <!-- 关闭按钮 -->
        <a href="javascript:void(0)"></a>

        <input type="hidden" name="cardNo" id="cardNo" />
        <div>
            <span>姓名：</span>
            <p class="name">XXX</p>
        </div>
         <div>
            <span>银行名称：</span>
            <p class="bank-name">XXXX</p>
        </div>
        <div>
            <span>分/支行：</span>
            <input class="bank-address" type="text" name="dotName" id="dotName">
        </div>
        <div>
            <span>银行卡号：</span>
            <p class="number">XXXX</p>
        </div>
        <div class="action">
            <button>提交</button>
        </div>
    </div>
</body>

</html>

