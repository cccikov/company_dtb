$(function() {
	var tab_common_obj_checking = {
		datatype: "json",
		colModel: [{
				label: '用户ID',
				name: 'userId',
				index: "user_id",
				width: 45,
				key: true,
				hidden: true
			},
			{
				label: '账号',
				name: 'stradername',
				width: 45
			},
			{
				label: '姓名',
				name: 'username',
				width: 50
			},
			{
				label: '手机',
				name: 'mobile',
				width: 50
			},
			{
				label: '身份证',
				name: '',
				index: 'operate',
				width: 50,
				align: 'center',
				formatter: function(cellvalue, options, rowObject) {
					// rowObject.frontpic  rowObject.backpic
					var html = "<a onclick='showIdcard(\"" + rowObject.frontpic + "\",\"" + rowObject.backpic + "\")' href='javascript:void(0)'>" + rowObject.idCard + "</a>";
					return html;
				},
			},
			{
				label: '银行卡号',
				name: 'cardno',
				width: 30
			},
			{
				label: '申请时间',
				name: 'applicationTime',
				width: 80
			}
		],
		viewrecords: true,
		height: 385,
		rowNum: 10,
		rowList: [10, 30, 50],
		rownumbers: true,
		rownumWidth: 25,
		autowidth: true,
		multiselect: true,
		jsonReader: {
			root: "page_1.list",
			page: "page_1.currPage",
			total: "page_1.totalPage",
			records: "page_1.totalCount"
		},
		prmNames: {
			page: "page",
			rows: "limit",
			order: "order"
		},
	}

	var tab_common_obj_checked = {
		datatype: "json",
		colModel: [{
				label: '用户ID',
				name: 'userId',
				index: "user_id",
				width: 45,
				key: true,
				hidden: true
			},
			{
				label: '账号',
				name: 'stradername',
				width: 45
			},
			{
				label: '姓名',
				name: 'username',
				width: 50
			},
			{
				label: '手机',
				name: 'mobile',
				width: 50
			},
			{
				label: '身份证',
				name: '',
				index: 'operate',
				width: 50,
				align: 'center',
				formatter: function(cellvalue, options, rowObject) {
					// rowObject.frontpic  rowObject.backpic
					var html = "<a onclick='showIdcard(\"" + rowObject.frontpic + "\",\"" + rowObject.backpic + "\")' href='javascript:void(0)'>" + rowObject.idCard + "</a>";
					return html;
				},
			},
			{
				label: '银行卡号',
				name: 'cardno',
				width: 30
			},
			{
                label: '会员类型',
                name: 'memberTypeName',
                width: 40
            }
		],
		viewrecords: true,
		height: 385,
		rowNum: 10,
		rowList: [10, 30, 50],
		rownumbers: true,
		rownumWidth: 25,
		autowidth: true,
		multiselect: true,
		jsonReader: {
			root: "page_2.list",
			page: "page_2.currPage",
			total: "page_2.totalPage",
			records: "page_2.totalCount"
		},
		prmNames: {
			page: "page",
			rows: "limit",
			order: "order"
		},
	}

	var tab_common_obj_reject = {
		datatype: "json",
		colModel: [{
				label: '用户ID',
				name: 'userId',
				index: "user_id",
				width: 45,
				key: true,
				hidden: true
			},
			{
				label: '账号',
				name: 'stradername',
				width: 45
			},
			{
				label: '姓名',
				name: 'username',
				width: 50
			},
			{
				label: '手机',
				name: 'mobile',
				width: 50
			},
			{
				label: '身份证',
				name: '',
				index: 'operate',
				width: 50,
				align: 'center',
				formatter: function(cellvalue, options, rowObject) {
					// rowObject.frontpic  rowObject.backpic
					var html = "<a onclick='showIdcard(\"" + rowObject.frontpic + "\",\"" + rowObject.backpic + "\")' href='javascript:void(0)'>" + rowObject.idCard + "</a>";
					return html;
				},
			},
			{
				label: '银行卡号',
				name: 'cardno',
				width: 30
			},
			{
				label: '申请时间',
				name: 'applicationTime',
				width: 80
			}
		],
		viewrecords: true,
		height: 385,
		rowNum: 10,
		rowList: [10, 30, 50],
		rownumbers: true,
		rownumWidth: 25,
		autowidth: true,
		multiselect: true,
		jsonReader: {
			root: "page_-1.list",
			page: "page_-1.currPage",
			total: "page_-1.totalPage",
			records: "page_-1.totalCount"
		},
		prmNames: {
			page: "page",
			rows: "limit",
			order: "order"
		},
	}



	var checking_tab_obj = {
		url: '../tbuser/list?auditStatus=1',
		pager: "#jqGridPager-checking",
		gridComplete: function() {
			//隐藏grid底部滚动条
			$("#jqGrid-checking").closest(".ui-jqgrid-bdiv").css({
				"overflow-x": "hidden"
			});
		}
	}
	var checked_tab_obj = {
		url: '../tbuser/list?auditStatus=2',
		pager: "#jqGridPager-checked",
		gridComplete: function() {
			//隐藏grid底部滚动条
			$("#jqGrid-checked").closest(".ui-jqgrid-bdiv").css({
				"overflow-x": "hidden"
			});
		}
	}
	var reject_tab_obj = {
		url: '../tbuser/list?auditStatus=-1',
		pager: "#jqGridPager-reject",
		gridComplete: function() {
			//隐藏grid底部滚动条
			$("#jqGrid-reject").closest(".ui-jqgrid-bdiv").css({
				"overflow-x": "hidden"
			});
		}
	}

	$.extend(checking_tab_obj, tab_common_obj_checking);
	$.extend(checked_tab_obj, tab_common_obj_checked);
	$.extend(reject_tab_obj, tab_common_obj_reject);


	$("#jqGrid-checking").jqGrid(checking_tab_obj);
	$("#jqGrid-checked").jqGrid(checked_tab_obj);
	$("#jqGrid-reject").jqGrid(reject_tab_obj);
});

/**
 * tab切换的时候需要重新设置table的kuandu
 * @param  {string} view 哪个view的table
 * @return {[type]}      [description]
 */
function resetTableWidth(view) {
	var width = $("#wrap").width();

	$("#jqGrid-" + view).setGridWidth(width)
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
		tab: "checking", // 标记打开的是哪一个tab
		checkingData: {
			username: null,
			mobile: null
		},
		checkedData: {
			username: null,
			mobile: null,
			memberType: ""
		},
		rejectData: {
			username: null,
			mobile: null
		}
	},
	computed: {
		// 以下三个属性用于控制tab的出现 , 会根据 tab属性自动变化
		checking: function() {
			return this.tab == "checking";
		},
		checked: function() {
			return this.tab == "checked";
		},
		reject: function() {
			return this.tab == "reject";
		}
	},
	methods: {
		changeView: function(view) {
			this.tab = view;
			resetTableWidth(view);
		},
		query_checking: function() {
			vm.reload_checking();
		},
		reload_checking: function(event) {
			var page = $("#jqGrid-checking").jqGrid('getGridParam', 'page');
			$("#jqGrid-checking").jqGrid('setGridParam', {
				postData: {
					'username': vm.checkingData.username,
					'mobile': vm.checkingData.mobile
				},
				page: page
			}).trigger("reloadGrid");
		},
		query_checked: function() {
			vm.reload_checked();
		},
		reload_checked: function(event) {
			var page = $("#jqGrid-checked").jqGrid('getGridParam', 'page');
			$("#jqGrid-checked").jqGrid('setGridParam', {
				postData: {
					'username': vm.checkedData.username,
					'mobile': vm.checkedData.mobile,
					'memberType': vm.checkedData.memberType
				},
				page: page
			}).trigger("reloadGrid");
		},
		query_reject: function() {
			vm.reload_reject();
		},
		reload_reject: function(event) {
			var page = $("#jqGrid-reject").jqGrid('getGridParam', 'page');
			$("#jqGrid-reject").jqGrid('setGridParam', {
				postData: {
					'username': vm.rejectData.username,
					'mobile': vm.rejectData.mobile
				},
				page: page
			}).trigger("reloadGrid");
		},
		getuserinfo: function(jqGridselect) {
			var userId = getSelectedRow("#jqGrid-" + jqGridselect);
			if (userId == null) {
				return;
			}
			$.get("../tbuser/userinfo/" + userId, function(r) {
				vm_detail_win.userinfo = r.tbuserinfo;
				if (!vm_detail_win.$el) {
					vm_detail_win.$mount("#detail-win");
				};
				vm_detail_win.show_win = true;
			});
		},
		review_ok_show: function() {
			$(".select-rank").removeClass("active");
			var userId = getSelectedRow("#jqGrid-checking");
			if (userId == null) {
				return;
			}
			vm_ok_win.userId = userId;
			$.get("../tbuser/rank", function(r) {
				vm_ok_win.userRanks = r.userRanks;
				if (!vm_ok_win.$el) {
					vm_ok_win.$mount("#ok-win");
				};
				vm_ok_win.show_win = true;
			});
		},
		review_no_show: function() {
			var userId = getSelectedRow("#jqGrid-checking");
			if (userId == null) {
				return;
			}
			vm_no_win.userId = userId;
			if (!vm_no_win.$el) {
				vm_no_win.$mount("#no-win");
			};
			vm_no_win.show_win = true;
		}
	}
});


var vm_detail_win = new Vue({
	// el:"#detail-win",
	data: {
		show_win: false,
		userinfo: null
	},
	methods: {
		closewin: function() {
			this.show_win = !this.show_win;
		}
	}
});

var vm_ok_win = new Vue({
	// el:"#ok-win",
	data: {
		show_win: false,
		userId: null,
		userRanks: null
	},
	methods: {
		closewin: function() {
			this.show_win = !this.show_win;
		},
		review_ok: function(memberRank, e) {
			$(".select-rank").removeClass("active");
			$(e.currentTarget).addClass("active");
			confirm('确定要通过吗？', function() {
				$.ajax({
					type: "POST",
					url: "../tbuser/review",
					data: {
						"userIds": vm_ok_win.userId,
						"flag": "1",
						"memberType": memberRank
					},
					success: function(r) {
						if (r.code == 0) {
							alert('操作成功', function(index) {
								vm.reload_reject();
								vm.reload_checked();
								vm.reload_checking();
								vm_ok_win.show_win = false;
							});
						} else {
							alert(r.msg);
						}
					}
				});
			});
		}
	}
});

var vm_no_win = new Vue({
	// el:"#no-win",
	data: {
		show_win: false,
		remark: null,
		userId: null
	},
	methods: {
		closewin: function() {
			this.show_win = !this.show_win;
		},
		review_no: function() {
			confirm('确定要通驳回选中的记录？', function() {
				$.ajax({
					type: "POST",
					url: "../tbuser/review",
					data: {
						"userIds": vm_no_win.userId,
						"flag": "-1",
						"remark": vm_no_win.remark
					},
					success: function(r) {
						if (r.code == 0) {
							alert('操作成功', function(index) {
								vm.reload_reject();
								vm.reload_checked();
								vm.reload_checking();
								vm_no_win.show_win = false;
							});
						} else {
							alert(r.msg);
						}
					}
				});
			});
		},
	}
});

var vm_idcard_win = new Vue({
	el: "#idcard",
	data: {
		show_idcard: false,
		front: "",
		back: ""
	},
	methods: {
		closewin: function() {
			this.show_idcard = !this.show_idcard;
		}
	}
});

function showIdcard(front, back) {
	vm_idcard_win.front = front;
	vm_idcard_win.back = back;
	vm_idcard_win.show_idcard = true;
}
