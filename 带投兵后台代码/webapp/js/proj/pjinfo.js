
$(function() {
    getToken()
    var checking_tab_obj = {
        url: '../pjinfo/list?status=0&&type=checking',
        pager: "#jqGridPager-checking",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid-checking").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
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
            root: "page_checking.list",
            page: "page_checking.currPage",
            total: "page_checking.totalPage",
            records: "page_checking.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        }
    }
    var checked_tab_obj = {
        url: '../pjinfo/list?status=1&&type=checked',
        pager: "#jqGridPager-checked",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid-checked").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
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
            root: "page_checked.list",
            page: "page_checked.currPage",
            total: "page_checked.totalPage",
            records: "page_checked.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        }
    }
    var reject_tab_obj = {
        url: '../pjinfo/list?status=-1&&type=reject',
        pager: "#jqGridPager-reject",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid-reject").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
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
            root: "page_reject.list",
            page: "page_reject.currPage",
            total: "page_reject.totalPage",
            records: "page_reject.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        }
    }

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
        tab: "checking", // 标记打开的是哪一个tab
        checkingData: {
            name: null
        },
        checkedData: {
            name: null
        },
        rejectData: {
            name: null
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
                postData: { 'name': vm.checkingData.name },
                page: page
            }).trigger("reloadGrid");
        },
        query_checked: function() {
            vm.reload_checked();
        },
        reload_checked: function(event) {
            var page = $("#jqGrid-checked").jqGrid('getGridParam', 'page');
            $("#jqGrid-checked").jqGrid('setGridParam', {
                postData: { 'name': vm.checkedData.name },
                page: page
            }).trigger("reloadGrid");
        },
        query_reject: function() {
            vm.reload_reject();
        },
        reload_reject: function(event) {
            var page = $("#jqGrid-reject").jqGrid('getGridParam', 'page');
            $("#jqGrid-reject").jqGrid('setGridParam', {
                postData: { 'name': vm.rejectData.name },
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
        projectinfoviw: function(jqGridselect) {
            var id = getSelectedRow("#jqGrid-" + jqGridselect);
            if (id == null) {
                return;
            }
            var token = $("#token").val();
            window.open("/project/viewproject?pjid=" + id + "&token=" + token);
        },
        review_ok: function() {
            var idArr = getSelectedRows("#jqGrid-checking");
            if (idArr == null) {
                return;
            }
            var ids = idArr.join(",");
            confirm('确定要通过选中的记录？', function() {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/review",
                    data: {
                        "optype": "review",
                        "ids": ids,
                        "flag": "1"
                    },
                    success: function(r) {
                        if (r.code == 0) {
                            alert('操作成功', function(index) {
                                vm.reload_reject();
                                vm.reload_checked();
                                vm.reload_checking();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        review_no: function() {
            var idArr = getSelectedRows("#jqGrid-checking");
            if (idArr == null) {
                return;
            }
            var ids = idArr.join(",");
            confirm('确定要反驳选中的记录？', function() {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/review",
                    data: {
                        "optype": "review",
                        "ids": ids,
                        "flag": "-1"
                    },
                    success: function(r) {
                        if (r.code == 0) {
                            alert('操作成功', function(index) {
                                vm.reload_reject();
                                vm.reload_checked();
                                vm.reload_checking();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        release: function() {
            var idArr = getSelectedRows("#jqGrid-checked");
            if (idArr == null) {
                return;
            }
            var ids = idArr.join(",");
            confirm('确定要发布选中的记录？', function() {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/release",
                    data: {
                        "optype": "release",
                        "ids": ids,
                        "flag": "1"
                    },
                    success: function(r) {
                        if (r.code == 0) {
                            alert('操作成功', function(index) {
                                vm.reload_reject();
                                vm.reload_checked();
                                vm.reload_checking();
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

function getToken() {
    $.ajax({
        type: "POST",
        url: "../pjinfo/gettoken",
        success: function(r) {
            var token = r.token;
            $("#token").val(token)
        }
    });
}
