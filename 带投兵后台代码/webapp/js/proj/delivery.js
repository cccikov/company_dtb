function format(cellvalue) { //cellvalue表示当前单元格的值
    return cellvalue / 10000;
}


$(function () {
    var tab_obj = {
        url: '../pjinfo/list?status=50',
        pager: "#jqGridPager",
        gridComplete: function () {
            //隐藏grid底部滚动条
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
            },
            {
                label: '项目名称',
                name: 'name',
                index: 'name',
                width: 80
            },
            {
                label: '标签',
                name: 'tabs',
                index: 'tabs',
                width: 150
            },
            {
                label: '创建者',
                name: 'creator',
                index: 'creator',
                width: 80
            },
            {
                label: '创建时间',
                name: 'createtime',
                index: 'createtime',
                width: 80
            }, {
                label: '状态',
                name: 'status',
                width: 40,
                formatter: function (value, options, row) {
                    if (value == 10) {
                        return "暂停";
                    } else if (value == 20) {
                        return "预热";
                    } else if (value == 30) {
                        return "募集";
                    } else if (value == 40) {
                        return "出资";
                    } else if (value == 50) {
                        return "交割";
                    } else if (value == -100) {
                        return "失败";
                    }
                }
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
        showList: function () {
            return this.tab == "showList";
        }
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function (event) {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'name': vm.queryData.name
                },
                page: page
            }).trigger("reloadGrid");
        },
        show_add: function () {
            var id = getSelectedRow("#jqGrid");
            if (id == null) {
                return;
            }
            console.log(id);
            vm_add.show_win = true;
        },
        show_win: function () {
            var id = getSelectedRow("#jqGrid");
            if (id == null) {
                return;
            }
            console.log(id);
            win_jqGrid_build(id);
            vm_win.show_win = true;
        },
    }
});





// 添加资料弹窗
var vm_add = new Vue({
    el: "#add",
    data: {
        id: null,
        num: "",
        name: "",
        download: false,
        show_win: false,
        url: null
    },
    methods: {
        closewin: function () {
            this.show_win = !this.show_win;
        }
    }
});


var vm_win = new Vue({
    el: "#win",
    data: {
        show_win: false,
        jqGrid_build: false,
    },
    methods: {
        closewin: function () {
            this.show_win = !this.show_win;
        }
    }
});

function win_jqGrid_build(id) {
    if (!vm_win.jqGrid_build) {
        var tab_win = {
            url: '../orderpay/listByProject',
            pager: "#jqGridPager_delivery",
            gridComplete: function () {
                // 隐藏grid底部滚动条
                $("#jqGrid_delivery").closest(".ui-jqgrid-bdiv").css({
                    "overflow-x": "hidden"
                });
            },
            postData: {
                "pjid": id,
                "isrefund": 0,
                "status": 10
            },
            datatype: "json",
            colModel: [{
                    label: '用户',
                    width: 80,
                    sortable: false,
                    formatter: function (cellvalue, options, row) {
                        if (row.order != null) {
                            var username = row.order.tbUserEntity.username;
                            var userid = row.order.userid;
                        } else {
                            var username = row.secrecy.tbUserEntity.username;
                            var userid = row.secrecy.userid;
                        }
                        return '<a class="alink" href="javascript:void(0)" onclick="showUser(\'' + userid + '\')">' + username + '</a>';
                    }
                }, {
                    label: '手机',
                    width: 120,
                    sortable: false,
                    formatter: function (cellvalue, options, rowObject) {
                        if (rowObject.order != null) {
                            return rowObject.order.tbUserEntity.mobile;
                        } else {
                            return rowObject.secrecy.tbUserEntity.mobile;
                        }
                    }
                }, {
                    label: '金额',
                    name: 'amount',
                    width: 80,
                    sortable: false,
                    formatter: function (value) {
                        return value.toLocaleString();
                    }
                },
                {
                    label: '类型',
                    name: 'typeDesc',
                    width: 80,
                    sortable: false
                },
                {
                    label: '银行',
                    name: 'bankcard.bankName',
                    width: 80,
                    sortable: false
                },
                {
                    label: '户名',
                    name: 'bankcard.accountName',
                    width: 80,
                    sortable: false
                },
                {
                    label: '账号',
                    name: 'bankcard.cardNo',
                    width: 80,
                    sortable: false
                },
                {
                    label: '网点',
                    name: 'bankcard.dotName',
                    width: 80,
                    sortable: false
                }, {
                    label: '凭证',
                    name: 'attach',
                    width: 200,
                    sortable: false,
                    align: "center",
                    formatter: function (value) {
                        return "<a target='_blank' href='" + value + "'><img style='max-width:150px;max-height:80px;' src='" + value + "' alt='凭证'/></a>";
                    }
                },
                {
                    label: '上传凭证时间',
                    name: 'createtime',
                    index: 'createtime',
                    width: 80
                },
                {
                    label: '状态',
                    name: 'statusDesc',
                    width: 80,
                    sortable: false
                }, {
                    label: '确定退款',
                    name: 'id',
                    align: "center",
                    width: 80,
                    formatter: function (cellvalue, options, rowObject) {
                        if (rowObject.order != null) {
                            return '<a class="btn btn-sm btn-primary" onclick=\'vm_sure_refund_win.show("' + cellvalue + '","' + rowObject.order.projid + '","' + rowObject.order.tbUserEntity.username + '","' + rowObject.amount + '")\' class="table-action" style="color:#fff" href="javascript:void(0)">退款</a>';
                        } else {
                            return '<a class="btn btn-sm btn-primary" onclick=\'vm_sure_refund_win.show("' + cellvalue + '","' + rowObject.secrecy.pjid + '","' + rowObject.secrecy.tbUserEntity.username + '","' + rowObject.amount + '")\' class="table-action" style="color:#fff" href="javascript:void(0)">退款</a>';
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
        vm_win.show_win = true; // 要先show再build , display:none情况下build , 表格单元格将不能通过拖拉改变长度
        setTimeout(function () {
            $("#jqGrid_delivery").jqGrid(tab_win);
        }, 16.7); // 设置一帧延迟 1000/60帧 = 16.7ms/帧 ,不延迟无法获取正确的弹窗宽度导致表格过窄(弹窗通过vue数据出现不适立即反应的);
        vm_win.jqGrid_build = true;
    } else {
        // var page = $("#jqGrid_delivery").jqGrid('getGridParam', 'page');
        $("#jqGrid_delivery").jqGrid('setGridParam', {
            postData: {
                "pjid": id,
                "isrefund": 0,
                "status": 10
            },
            page: 1
        }).trigger("reloadGrid");
        vm_win.show_win = true;
    }
}