math.config({
    number: 'BigNumber'
});

function format(cellvalue) { //cellvalue表示当前单元格的值
    return math.eval(cellvalue +"/10000")
}

$(function() {
    var tab_obj = {
        url: '../order/listProject?status=10,20,30,40,50,100',
        pager: "#jqGridPager",
        gridComplete: function() {
            // 隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({
                "overflow-x": "hidden"
            });
        },
        datatype: "json",
        colModel: [{
            label: 'id',
            name: 'id',
            index: 'id',
            width: 50,
            key: true,
            hidden: true
        }, {
            label: '项目名称',
            name: 'name',
            index: 'name',
            width: 80
        }, {
            label: '标签',
            name: 'tabs',
            index: 'tabs',
            width: 150
        }, {
            label: '跟投会员数',
            name: 'sumCount',
            index: 'sumCount',
            width: 80
        }, {
            label: '意向总金额（万元）',
            name: 'sumIntention',
            index: 'sumIntention',
            width: 80,
            formatter: format
        }, {
            label: '跟投总金额（万元）',
            name: 'sumAmount',
            index: 'sumAmount',
            width: 80,
            formatter: format
        }, {
            label: '已收保证金（万元）',
            name: 'sumDeposit',
            index: 'sumDeposit',
            width: 80,
            formatter: format
        }, {
            label: '已收余款（万元）',
            name: 'sumSpare',
            index: 'sumSpare',
            width: 80,
            formatter: format
        }, {
            label: '状态',
            name: 'statusDesc',
            index: 'status',
            width: 40
        }],
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
        queryData: {
            name: null
        }
    },
    methods: {
        query: function() {
            vm.reload();
        },
        reload: function(event) {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'name': vm.queryData.name
                },
                page: page
            }).trigger("reloadGrid");
        },
        pause: function() {
            var idArr = getSelectedRows();
            if (idArr == null) {
                return;
            }
            var ids = idArr.join(",");
            confirm('确定要暂停选中的记录？', function() {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/changstatus",
                    data: {
                        "optype": "pause",
                        "ids": ids,
                        "flag": "1"
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
        },
        projectinfo: function() {
            var id = getSelectedRow();
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

        // first弹窗出现
        look: function() {
            var id = getSelectedRow("#jqGrid");
            if (id == null) {
                return;
            }
            if (!vm_first.jqGrid_build) {
                var tab_objOrder = {
                    url: '../order/listMemberOrder',
                    pager: "#jqGridPagerOrder",
                    gridComplete: function() {
                        // 隐藏grid底部滚动条
                        $("#jqGridOrder").closest(".ui-jqgrid-bdiv").css({
                            "overflow-x": "hidden"
                        });
                    },
                    postData: {
                        "projid": id,
                        "astatus": "10,15,20,25,100"
                    },
                    datatype: "json",
                    colModel: [{
                        label: '用户',
                        name: 'tbUserEntity.username',
                        index: 'tbUserEntity.username',
                        width: 50,
                        formatter: function(value, options, row) {
                            var userid = row.userid;
                            return '<a class="alink" href="javascript:void(0)" onclick="showUser(\'' + userid + '\')">' + value + '</a>';
                        }
                    }, {
                        label: '下单时间',
                        name: 'createtime',
                        index: 'createtime',
                        width: 80
                    }, {
                        label: '意向金额',
                        name: 'intentionamount',
                        index: 'intentionamount',
                        width: 80
                    }, {
                        label: '跟投金额',
                        name: 'amount',
                        index: 'amount',
                        width: 150
                    }, {
                        label: '保证金',
                        name: 'depositamount',
                        index: 'depositamount',
                        width: 80
                    }, {
                        label: '余款',
                        name: 'depositamount',
                        index: 'depositamount',
                        width: 80,
                        formatter: function(value, options, row) {
                            return row.amount - row.depositamount;
                        }
                    }, {
                        label: '状态',
                        name: 'statusDesc',
                        index: 'statusDesc',
                        width: 80
                    }, ],
                    viewrecords: true,
                    height: 385,
                    rowNum: 10,
                    rowList: [10, 30, 50],
                    rownumbers: true,
                    rownumWidth: 25,
                    autowidth: true,
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

                vm_first.show_win = true; // 要先show再build , display:none情况下build , 表格单元格将不能通过拖拉改变长度

                $("#jqGridOrder").jqGrid(tab_objOrder);
                $("#jqGridOrder").setGridWidth(980);
                vm_first.jqGrid_build = true;
            } else {
                // var page = $("#jqGridOrder").jqGrid('getGridParam', 'page');
                $("#jqGridOrder").jqGrid('setGridParam', {
                    postData: { 'projid': id, 'astatus': '10,15,20,25,100' },
                    page: 1
                }).trigger("reloadGrid");
                vm_first.show_win = true;
            }

        }
    }
});

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


/**
 * first弹窗
 */
var vm_first = new Vue({
    el: "#first",
    data: {
        show_win: false,
        jqGrid_build: false
    },
    methods: {
        closewin: function() {
            this.show_win = !this.show_win;
        },
    }
});


// 用户信息弹窗
var vm_user_msg_win = new UserMsg();