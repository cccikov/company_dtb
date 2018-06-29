function format(cellvalue) { //cellvalue表示当前单元格的值
    return cellvalue / 10000;
}

function cancel(id) {
    confirm('确定要取消吗？', function() {
        $.ajax({
            type: "POST",
            url: "../order/cancelOrder",
            data: {
                "orderid": id
            },
            success: function(r) {
                if (r.code == 0) {
                    alert('操作成功', function(index) {
                        vm.reload();
                    });
                } else {
                    alert(r.msg);
                }
            }
        });
    });
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

$(function() {
    var tab_obj = {
        url: '../order/listOrder',
        pager: "#jqGridPager",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        },
        datatype: "json",
        colModel: [
            { label: '订单号', name: 'id', index: 'id', width: 50 },
            { label: '项目id', name: 'projid', index: 'projid', width: 50, key: true, hidden: true },
            { label: '项目名称', name: 'pjInfoEntity.name', index: 'pjInfoEntity.name', width: 80 },
            { label: '保密金(元)', name: 'secrecyamount', index: 'secrecyamount', width: 80 },
            { label: '意向投资(万元)', name: 'intentionamount', index: 'intentionamount', width: 80, formatter: format },
            { label: '保证金(万元)', name: 'depositamount', index: 'depositamount', width: 80, formatter: format },
            { label: '投资金额(万元)', name: 'amount', index: 'amount', width: 80, formatter: format }, {
                label: '订单状态',
                name: 'status',
                width: 40,
                formatter: function(value, options, row) {
                    if (value == 0) {
                        return "待付保密金";
                    } else if (value == 5) {
                        return "保密金待审核";
                    } else if (value == 10) {
                        return "待付保证金";
                    } else if (value == 15) {
                        return "保证金待审核";
                    } else if (value == 20) {
                        return "待付余款";
                    } else if (value == 25) {
                        return "余款待审核";
                    } else if (value == 100) {
                        return "交易成功";
                    } else if (value == -100) {
                        return "失败";
                    } else if (value == -10) {
                        return "已退款";
                    }
                }
            }, {
                label: '创建人',
                name: 'tbUserEntity.username',
                index: 'tbUserEntity.username',
                width: 80,
                formatter: function(value, options, row) {
                    var userid = row.userid;
                    return '<a class="alink" href="javascript:void(0)" onclick="showUser(\'' + userid + '\')">' + value + '</a>';
                }
            },
            { label: '创建时间', name: 'createtime', index: 'createtime', width: 80 }, {
                label: '操作',
                name: '',
                index: 'operate',
                width: 50,
                align: 'center',
                formatter: function(cellvalue, options, rowObject) {
                    if (rowObject.status == 0) {
                        var detail = "<a onclick='cancel(" + rowObject.id + ")' href='javascript:void(0)'>取消订单</a>";
                        return detail;
                    } else {
                        return "";
                    }
                },
            },
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
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        }
    }

    $("#jqGrid").jqGrid(tab_obj);
});

var vm = new Vue({
    el: "#wrap",
    data: {
        tab: "showList", // 标记打开的是哪一个tab
        queryData: {
            name: null
        }
    },
    computed: {
        // 以下三个属性用于控制tab的出现 , 会根据 tab属性自动变化
        showList: function() {
            return this.tab == "showList";
        }
    },
    methods: {
        query: function() {
            vm.reload();
        },
        reload: function(event) {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: { 'id': vm.queryData.id },
                page: page
            }).trigger("reloadGrid");
        },
        projectinfo: function(jqGridselect) {
            var id = getSelectedRow("#jqGrid");
            console.log(id);
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


// 用户信息弹窗
var vm_user_msg_win = new UserMsg();
