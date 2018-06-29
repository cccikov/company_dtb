$(function () {
	getToken();
    $("#jqGrid").jqGrid({
    	url: '../investor/list',
        datatype: "json",
        colModel: [
			{ label: 'id', name: 'id', width: 100, key: true,hidden:true },
			{ label: '姓名', name: 'name', width: 100 },
			{ label: '是否可见', name: 'isshow', width: 100,formatter: function(value, options, row) {
                    return value === 0 ?
                        '不可见' :
                        '可见';
                } },
			{ label: '创建时间', name: 'createtime', width: 100 },
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50,100,200],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });


    new AjaxUpload('#uploadInvestor', {
        action: '/upload/up',
        //action : '../upload/test',
        name: 'file',
        autoSubmit: true,
        responseType: "json",
        onSubmit: function(file, extension) {
            if (!(extension && /^(jpg|jpeg|png|gif)$/.test(extension.toLowerCase()))) {
                alert('只支持jpg、png、gif格式的图片！');
                return false;
            }
            var token = $("#token").val();
            this.setData({
                'token': token,
                'type':"investor/0"
            });
        },
        onComplete: function(file, r) {}
    });

});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
			name: null
		},
		showList: true,
		title:null,
		investor:{
            isshow:"0"
        }
	},
	methods: {
		query: function () {
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{'name': vm.q.name},
                page:1
            }).trigger("reloadGrid");
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
		},
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}

			vm.showList = false;
            vm.title = "修改";

		},
		del: function () {
			var id = getSelectedRows();
			if(id == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../investor/delete",
                    contentType: "application/json",
				    data: JSON.stringify(id),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
                                vm.reload();
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		saveOrUpdate: function (event) {
			var url = vm.investor.id == null ? "../investor/save" : "../investor/update";
			$.ajax({
				type: "POST",
			    url: url,
                contentType: "application/json",
			    data: JSON.stringify(vm.investor),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				 postData:{'name': vm.q.name},
                page:page
            }).trigger("reloadGrid");
		},
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";

			vm.getInvestor(id);
		},
		getInvestor: function(id){
			$.get("../investor/info/"+id, function(r){
				vm.investor = r.investorEntity;
			});
		},
	}
});

function getToken() {
    $.ajax({
        type: "POST",
        url: "../syscarousel/gettoken",
        success: function(r) {
            var token = r.token;
            $("#token").val(token)
        }
    });
}

function onAjaxUploadComplete(j) {
    r = JSON.parse(j);
    getToken();
    if (r.url != "没有上传权限") {
        var url = r.url;
        vm.investor.pic = url;
        vm.saveOrUpdate();
    } else {
        alert(r.msg);
    }
}

