$(function () {
	getToken();
    $("#jqGrid").jqGrid({
    	url: '../syscarousel/list',
        datatype: "json",
        colModel: [
			{ label: 'id', name: 'id', width: 100, key: true,hidden:true },
			{ label: '轮播图名称', name: 'name', width: 100 },
			{ label: '链接', name: 'src', width: 100 },
			{ label: '是否禁用', name: 'status', width: 100,formatter: function(value, options, row) {
                    return value === 0 ?
                        '禁用' :
                        '启动';
                } },
			{ label: '创建时间', name: 'createtime', width: 100 }
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


    new AjaxUpload('#uploadCarousel', {
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
                'type':"carousel/0"
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
		sysCarousel:{
            status:"1"
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
				    url: "../syscarousel/delete",
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
			var url = vm.sysCarousel.id == null ? "../syscarousel/save" : "../syscarousel/update";
			$.ajax({
				type: "POST",
			    url: url,
                contentType: "application/json",
			    data: JSON.stringify(vm.sysCarousel),
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

			vm.getCarousel(id);
		},
		getCarousel: function(id){
			$.get("../syscarousel/info/"+id, function(r){
				vm.sysCarousel = r.sysCarousel;
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
        vm.sysCarousel.pic = url;
        vm.saveOrUpdate();
    } else {
        alert(r.msg);
    }
}

