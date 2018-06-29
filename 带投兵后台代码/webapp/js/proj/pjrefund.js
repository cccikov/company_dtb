function format(cellvalue) { //cellvalue表示当前单元格的值
    return cellvalue / 10000;
}
$(function() {
    var checking_tab_obj = {
        url: '../pjinfo/listrefund?status=10,20,30&refunding=1&type=checking',
        pager: "#jqGridPager-checking",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid-checking").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        },
        datatype: "json",
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true, hidden: true },
            { label: '项目名称', name: 'name', index: 'name', width: 80 },
            { label: '标签', name: 'tabs', index: 'tabs', width: 150 }, {
                label: '跟投总金额',
                name: 'sumAmount',
                index: 'sumAmount',
                width: 80,
                formatter: function(value, options, row) {
                    return Number(value).toLocaleString();
                }
            },
            { label: '已退款总金额', name: 'sumRefund', index: 'sunRefund', width: 80 },
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
        url: '../pjinfo/listrefund?status=10,20,30,-100&finished=1&type=checked',
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
            { label: '跟投总金额', name: 'sumAmount', index: 'sumAmount', width: 80 },
            { label: '退款总金额', name: 'sumRefund', index: 'sumRefund', width: 80 },
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

    $("#jqGrid-checking").jqGrid(checking_tab_obj);
    $("#jqGrid-checked").jqGrid(checked_tab_obj);
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
        formatAmount: function(val) {
            return val / 10000
        },
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
        projectinfo: function(view) {
            var id = getSelectedRow("#jqGrid-" + view);
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
        view: function(jqGridselect) {
            var id = getSelectedRow("#jqGrid-" + jqGridselect);
            if (id == null) {
                return;
            }
            $.get("../pjinfo/refundinfo/" + id, function(r) {
                vm_win.info = r.pjInfo;
                vm_win.teams = r.pjTeams;
                vm_win.documents = r.pjDocuments;
                vm_win.finacings = r.pjFinacings;
                vm_win.receivers = r.pjReceivers;
                if (!vm_win.$el) {
                    vm_win.$mount("#detail-win");
                };
                vm_win.show_win = true;
            });
        },

        // 查看退款按钮事件
        refund: function() {
            var id = getSelectedRow("#jqGrid-checking");
            if (id == null) {
                return;
            }
            // alert("你选中的数据的id是 : "+id);
            if (!vm_refund_win.jqGrid_build) {
                var tab_objOrder = {
                    url: '../orderpay/listByProject',
                    pager: "#jqGridPagerRefund",
                    gridComplete: function() {
                        // 隐藏grid底部滚动条
                        $("#jqGridRefund").closest(".ui-jqgrid-bdiv").css({
                            "overflow-x": "hidden"
                        });
                    },
                    postData: {
                        "projid": id,
                        "isrefund": 0,
                        "status": 10
                    },
                    datatype: "json",
                    colModel: [
                        { label: '用户', width: 80, sortable: false,
                            formatter: function(value, options, row) {
                                if(row.order != null){
                                    var username = row.order.tbUserEntity.username;
                                    var userid = row.order.userid;
                                }else{
                                    var username = row.secrecy.tbUserEntity.username;
                                    var userid = row.secrecy.userid;
                                }
                                return '<a class="alink" href="javascript:void(0)" onclick="showUser(\'' + userid + '\')">' + username + '</a>';
                            }
                        },
                        { label: '手机',  width: 120, sortable: false,
                        	formatter: function(cellvalue, options, rowObject) {
                        		if(rowObject.order != null){
                        			return rowObject.order.tbUserEntity.mobile;
                        		}else{
                        			return rowObject.secrecy.tbUserEntity.mobile;
                        		}
                            }
                        },
                        {
                            label: '金额',
                            name: 'amount',
                            width: 80,
                            sortable: false,
                            formatter: function(value) {
                                return value.toLocaleString();
                            }
                        },
                        { label: '类型', name: 'typeDesc', width: 80, sortable: false },
                        { label: '银行', name: 'bankcard.bankName', width: 80, sortable: false },
                        { label: '户名', name: 'bankcard.accountName', width: 80, sortable: false },
                        { label: '账号', name: 'bankcard.cardNo', width: 80, sortable: false },
                        { label: '网点', name: 'bankcard.dotName', width: 80, sortable: false }, {
                            label: '凭证',
                            name: 'attach',
                            width: 200,
                            sortable: false,
                            align: "center",
                            formatter: function(value) {
                                return "<a target='_blank' href='" + value + "'><img style='max-width:150px;max-height:80px;' src='" + value + "' alt='凭证'/></a>";
                            }
                        },
                        { label: '上传凭证时间', name: 'createtime', index: 'createtime', width: 80 },
                        { label: '状态', name: 'statusDesc', width: 80, sortable: false }, {
                            label: '确定退款',
                            name: 'id',
                            align: "center",
                            width: 80,
                            formatter: function(cellvalue, options, rowObject) {
                            	if(rowObject.order != null){
                            		return '<a class="btn btn-sm btn-primary" onclick=\'vm_sure_refund_win.show("' + cellvalue + '","' + rowObject.order.projid + '","' + rowObject.order.tbUserEntity.username + '","' + rowObject.amount +'")\' class="table-action" style="color:#fff" href="javascript:void(0)">退款</a>';
                        		}else{
                        			return '<a class="btn btn-sm btn-primary" onclick=\'vm_sure_refund_win.show("' + cellvalue + '","' + rowObject.secrecy.pjid + '","' + rowObject.secrecy.tbUserEntity.username + '","' + rowObject.amount +'")\' class="table-action" style="color:#fff" href="javascript:void(0)">退款</a>';
                        		}


                            },
                            sortable: false
                        },
                    ],
                    viewrecords: true,
                    height: 385,
                    rowNum: 5,
                    rowList: [3, 5, 10, 15],
                    rownumbers: true,
                    rownumWidth: 25,
                    autowidth: true,
                    multiselect: false,
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
                vm_refund_win.show_win = true; // 要先show再build , display:none情况下build , 表格单元格将不能通过拖拉改变长度
                setTimeout(function() {
                    $("#jqGridRefund").jqGrid(tab_objOrder);
                }, 16.7); // 设置一帧延迟 1000/60帧 = 16.7ms/帧 ,不延迟无法获取正确的弹窗宽度导致表格过窄(弹窗通过vue数据出现不适立即反应的);
                vm_refund_win.jqGrid_build = true;
            } else {
                // var page = $("#jqGridRefund").jqGrid('getGridParam', 'page');
                $("#jqGridRefund").jqGrid('setGridParam', {
                    postData: {
                        "projid": id,
                        "isrefund": 0,
                        "status": 10
                    },
                    page: 1
                }).trigger("reloadGrid");
                vm_refund_win.show_win = true;
            }
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


// 退款弹窗-新 2017-12-16
var vm_refund_win = new Vue({
    el: "#refund-win",
    data: {
        jqGrid_build: false,
        show_win: false,
    },
    methods: {
        closewin: function() {
            this.show_win = !this.show_win;
        }
    }
});

// 确定退款
function sureRefund(id, projid) {
    // console.log(id,projid);
    $.ajax({
        type: "POST",
        url: "../orderpay/refund",
        data: {
            "payid": id
        },
        success: function(r) {
            if (r.code == 0) {
                alert("操作成功");
                $.ajax({ // 更新表格
                    type: "POST",
                    url: "../orderpay/listByProject",
                    data: {
                        "projid": projid,
                        "isrefund": 0
                    },
                    success: function(r) {
                        if (r.code == 0) {

                            // var page = $("#jqGridRefund").jqGrid('getGridParam', 'page');
                            $("#jqGridRefund").jqGrid('setGridParam', {
                                postData: {
                                    "projid": projid,
                                    "isrefund": 0,
                                    "status": 10
                                },
                                page: 1
                            }).trigger("reloadGrid");

                        } else {
                            alert(r.msg);
                        }
                    }
                });
            } else {
                alert(r.msg);
            }
        }
    });
}

/* 确定退款 */
var vm_sure_refund_win = new Vue({
    el: "#sure-refund",
    data: {
        show_win: false,
        title: "退款",
        style: {
            width: "300px",
        },
        name: "李三",
        amount: "100万元",
        id: 0,
        projid: 0,
        time: 5,
        timer: null,
    },
    methods: {
        close: function() {
            this.show_win = !this.show_win;
        },
        show: function(id, projid, name, amount) {
            this.id = id;
            this.projid = projid;
            this.name = name;
            this.amount = amount;

            this.show_win = true;
            this.wait();
        },
        refund: function() {
            var id = this.id;
            var projid = this.projid;
            this.close();
            sureRefund(id, projid);
        },
        wait: function() {
            var _this = this;
            clearInterval(_this.timer); // 先把之前的停了
            _this.time = 5;
            _this.timer = setInterval(function() {
                _this.time--;
                if (_this.time == 0) {
                    console.log(_this.time);
                    clearInterval(_this.timer);
                }
            }, 1000);
        }
    }
});


// 用户信息弹窗
var vm_user_msg_win = new UserMsg();