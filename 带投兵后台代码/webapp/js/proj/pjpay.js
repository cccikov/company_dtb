function format(cellvalue) { //cellvalue表示当前单元格的值
    return cellvalue / 10000;
}

var Url = "";

$(function() {
	getToken()

	new AjaxUpload('#upload', {
        action: '/upload/up',
    	//action : '../upload/test',
        name: 'file',
        autoSubmit:true,
        responseType:"json",
        onSubmit:function(file, extension){
            if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))){
                alert('只支持jpg、png、gif格式的图片！');
                return false;
            }
            var token = $("#token").val();
            var choseTab = vm.tab;
            var id = getSelectedRow("#jqGrid-"+choseTab);
            this.setData({
            	'token':token,
            	'type':"project/"+id
            });
        },
        onComplete : function(file, r){
        }
    });


    var paytoowner_tab_obj = {
        url: '../pjinfo/listpayed?deliverystatus=10&optype=paymentreceived:&type=paytoowner',
        pager: "#jqGridPager-paytoowner",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid-paytoowner").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        },
        datatype: "json",
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true, hidden: true },
            { label: '项目名称', name: 'name', index: 'name', width: 80 },
            { label: '标签', name: 'tabs', index: 'tabs', width: 150 },
            { label: '创建者', name: 'creator', index: 'creator', width: 80 },
            { label: '创建时间', name: 'createtime', index: 'createtime', width: 80 }
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true, // 多选
        jsonReader: {
            root: "page_paytoowner.list",
            page: "page_paytoowner.currPage",
            total: "page_paytoowner.totalPage",
            records: "page_paytoowner.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        }
    }
    var paytofinancing_tab_obj = {
        url: '../pjinfo/listpayed?deliverystatus=20&optype=paytoowner&type=paytofinancing',
        pager: "#jqGridPager-paytofinancing",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid-paytofinancing").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        },
        datatype: "json",
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true, hidden: true },
            { label: '项目名称', name: 'name', index: 'name', width: 80 },
            { label: '标签', name: 'tabs', index: 'tabs', width: 150 },
            { label: '创建者', name: 'creator', index: 'creator', width: 80 },
            { label: '创建时间', name: 'createtime', index: 'createtime', width: 80 },
            { label: '付款人', name: 'payer', index: 'payer', width: 80 },
            { label: '付款时间', name: 'paytime', index: 'paytime', width: 80 }
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true, // 多选
        jsonReader: {
            root: "page_paytofinancing.list",
            page: "page_paytofinancing.currPage",
            total: "page_paytofinancing.totalPage",
            records: "page_paytofinancing.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        }
    }

    var certificate_tab_obj = {
        url: '../pjinfo/listpayed?deliverystatus=30&optype=paytofinancing&type=certificate',
        pager: "#jqGridPager-certificate",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid-certificate").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        },
        datatype: "json",
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true, hidden: true },
            { label: '项目名称', name: 'name', index: 'name', width: 80 },
            { label: '标签', name: 'tabs', index: 'tabs', width: 150 },
            { label: '创建者', name: 'creator', index: 'creator', width: 80 },
            { label: '创建时间', name: 'createtime', index: 'createtime', width: 80 },
            { label: '付款人', name: 'payer', index: 'payer', width: 80 },
            { label: '付款时间', name: 'paytime', index: 'paytime', width: 80 }
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true, // 多选
        jsonReader: {
            root: "page_certificate.list",
            page: "page_certificate.currPage",
            total: "page_certificate.totalPage",
            records: "page_certificate.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        }
    }

    $("#jqGrid-paytoowner").jqGrid(paytoowner_tab_obj);
    $("#jqGrid-paytofinancing").jqGrid(paytofinancing_tab_obj);
    $("#jqGrid-certificate").jqGrid(certificate_tab_obj);
});

/**
 * tab切换的时候需要重新设置table的kuandu
 * @param  {string} view 哪个view的table
 * @return {[type]}      [description]
 */
function resetTableWidth(view) {
    var width = $("#wrap").width();
    $("#jqGrid-" + view).setGridWidth(width);
}


//选择一条记录
function getSelectedRow(selector) {
    var grid = $(selector);
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }

    var selectedIDs = grid.getGridParam("selarrrow");
    if (selectedIDs.length > 1) {
        alert("只能选择一条记录");
        return;
    }

    return selectedIDs[0];
}

//选择多条记录
function getSelectedRows(selector) {
    var grid = $(selector);
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }

    return grid.getGridParam("selarrrow");
}

var vm = new Vue({
    el: "#wrap",
    data: {
        tab: "paytoowner", // 标记打开的是哪一个tab
        paytoownerData: {
            name: null,
            optype:"paytoowner"
        },
        paytofinancingData: {
            name: null,
            optype:"paytofinancing"
        },
        certificateData: {
            name: null,
            optype:"certificate"
        }
    },
    computed: {
        // 以下三个属性用于控制tab的出现 , 会根据 tab属性自动变化
        paytoowner: function() {
            return this.tab == "paytoowner";
        },
        paytofinancing: function() {
            return this.tab == "paytofinancing";
        },
        certificate: function() {
            return this.tab == "certificate";
        }
    },
    methods: {
        changeView: function(view) {
            this.tab = view;
            resetTableWidth(view);
        },
        query_paytoowner: function() {
            vm.reload_paytoowner();
        },
        reload_paytoowner: function(event) {
            var page = $("#jqGrid-paytoowner").jqGrid('getGridParam', 'page');
            $("#jqGrid-paytoowner").jqGrid('setGridParam', {
                postData: { 'name': vm.paytoownerData.name },
                page: page
            }).trigger("reloadGrid");
        },
        query_paytofinancing: function() {
            vm.reload_paytofinancing();
        },
        reload_paytofinancing: function(event) {
            var page = $("#jqGrid-paytofinancing").jqGrid('getGridParam', 'page');
            $("#jqGrid-paytofinancing").jqGrid('setGridParam', {
                postData: { 'name': vm.paytofinancingData.name },
                page: page
            }).trigger("reloadGrid");
        },
        query_certificate: function() {
            vm.reload_certificate();
        },
        reload_certificate: function(event) {
            var page = $("#jqGrid-certificate").jqGrid('getGridParam', 'page');
            $("#jqGrid-certificate").jqGrid('setGridParam', {
                postData: { 'name': vm.certificateData.name },
                page: page
            }).trigger("reloadGrid");
        },
        projectinfo: function(jqGridselect) {
            var id = getSelectedRow("#jqGrid-" + jqGridselect);
            if (id == null) {
                return;
            }
            $.get("../pjinfo/info/" + id, function(r) {
                vm_win.projectData = r;
                if (!vm_win.$el) {
                    vm_win.$mount("#pro-detail");
                };
                vm_win.show_win = true;
            });
        },
        review_ok: function() {
        	 var id = getSelectedRow("#jqGrid-"+this.tab);
             if (id == null) {
                 return;
             }
            vm_pay.show_win = true;
        },
    }
});


// 弹窗
var vm_win = new Vue({
    // el: "#pro-detail",
    data: {
        show_win: false,
        projectData: null
    },
    methods: {
        closewin: function() {
            this.show_win = !this.show_win;
        }
    }
});

// 付款弹窗
var vm_pay = new Vue({
    el: "#pay",
    data: {
        show_win: false,
        style: {
            width: "auto",
            minWidth: "320px"
        },
        imgSrc: ""
    },
    methods: {
        closewin: function() {
            this.show_win = !this.show_win;
        },
        topay: function() {
        	var choseTab = vm.tab;
             var id = getSelectedRow("#jqGrid-"+choseTab);
             if (id == null) {
                 return;
             }
             if(choseTab == "paytoowner" ){
            	 confirm('确定选中的项目已经付款给投资主体？', function() {
                     $.ajax({
                         type: "POST",
                         url: "../pjinfo/paytoowner",
                         data: {
                             "id": id,
                             "url":Url
                         },
                         success: function(r) {
                             if (r.code == 0) {
                                 alert('操作成功', function(index) {
                                     vm.reload_certificate();
                                     vm.reload_paytofinancing();
                                     vm.reload_paytoowner();
                                     vm_pay.imgSrc = ""
                                 });
                             } else {
                                 alert(r.msg);
                             }
                         }
                     });
                 });
             }else if(choseTab == "paytofinancing"){
            	 confirm('确定选中的项目已经付款给融资主体？', function() {
                     $.ajax({
                         type: "POST",
                         url: "../pjinfo/paytofinancing ",
                         data: {
                             "id": id,
                             "url":Url
                         },
                         success: function(r) {
                             if (r.code == 0) {
                                 alert('操作成功', function(index) {
                                     vm.reload_certificate();
                                     vm.reload_paytofinancing();
                                     vm.reload_paytoowner();
                                     vm_pay.imgSrc = ""
                                 });
                             } else {
                                 alert(r.msg);
                             }
                         }
                     });
                 });
             }else if(choseTab == "certificate"){
            	 confirm('确定上传出资证明书？', function() {
                     $.ajax({
                         type: "POST",
                         url: "../pjinfo/certificate",
                         data: {
                             "id": id,
                             "url":Url
                         },
                         success: function(r) {
                             if (r.code == 0) {
                                 alert('操作成功', function(index) {
                                     vm.reload_certificate();
                                     vm.reload_paytofinancing();
                                     vm.reload_paytoowner();
                                     vm_pay.imgSrc = ""
                                 });
                             } else {
                                 alert(r.msg);
                             }
                         }
                     });
                 });
             }
        }
    }
});

function getToken(){
	$.ajax({
		type: "POST",
	    url: "../pjinfo/gettoken",
	    success: function(r){
	    	var token = r.token;
	    	$("#token").val(token)
		}
	});
}

function onAjaxUploadComplete(j){
	r=JSON.parse(j);
	getToken();
	 if(r.url != "没有上传权限"){
		var url = r.url;
		Url = url;
		vm_pay.imgSrc = Url;
     }else{
         alert(r.msg);
     }
}
