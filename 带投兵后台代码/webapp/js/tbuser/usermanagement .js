 function format(cellvalue){ //cellvalue表示当前单元格的值
        return cellvalue/10000;
 }
var memberRank ;
$(function() {
	
	
    $("#jqGrid").jqGrid({
        url: '../tbuser/list',
        datatype: "json",
        colModel: [
            { label: '用户ID', name: 'userId', index: "user_id", width: 45, key: true },
            { label: '姓名', name: 'username', width: 50 },
            { label: '手机', name: 'mobile', width: 50 },
            { label: '身份证', name: 'idCard', width: 80 },
            { label: '账号', name: 'stradername', width: 45 }, {
                label: '会员类型',
                name: 'memberTypeName',
                width: 40
            },
            { label: '投资金额(万元)', name: 'memberAmount', width: 80,formatter:format },
            { label: '注册时间', name: 'createTime', width: 80 }
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        }
    });
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        q: {
            username: null,
            memberType:"",
            mobile:"",
        },
        showList: true,
        title: null,
        userranks:[],
        roleList: {},
        user: {
            status: 1,
            roleIdList: []
        }
    },
    methods: {
        query: function() {
            vm.reload();
        },
        getrank:function() {
        	var _self=this
        	$.get("../tbuser/rank" , function(r) {
        		_self.userranks = r.userRanks;
            });
		},
        reload: function(event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: { 'username': vm.q.username,'memberType':vm.q.memberType,'mobile':vm.q.mobile },
                page: page
            }).trigger("reloadGrid");
        },
        cardinfo: function() {
            var userId = getSelectedRow();
            if (userId == null) {
                return;
            }
            $.get("../tbuser/cardinfo/" + userId, function(r) {
            	vm_card_win.carinfos = r.cardinfo;
                if(!vm_card_win.$el){
                    vm_card_win.$mount("#card-win");
                };
                vm_card_win.show_card_win = true;
            });

        },
        getuserinfo: function(jqGridselect) {
        	 var userId = getSelectedRow();
            if (userId == null) {
                return;
            }
            $.get("../tbuser/userinfo/" + userId, function(r) {
            	vm_detail_win.userinfo = r.tbuserinfo;
                if(!vm_detail_win.$el){
                    vm_detail_win.$mount("#detail-win");
                };
                vm_detail_win.show_win = true;
            });
        }
    }
});

vm.getrank();

var vm_detail_win = new Vue({
    // el:"#detail-win",
    data:{
    	show_win:false,
        userinfo:null
    },
    methods: {
        closewin: function() {
            this.show_win = !this.show_win;
        }
    }
});

var vm_card_win = new Vue({
    // el:"#card-win",
    data:{
    	show_card_win:false,
    	carinfos:null
    },
    methods: {
        closewin: function() {
            this.show_card_win = !this.show_card_win;
        }
    }
});
