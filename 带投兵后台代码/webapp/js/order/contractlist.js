function format(cellvalue) { //cellvalue表示当前单元格的值
    return cellvalue / 10000;
}

$(function() {
    var tab_obj = {
        url: '../contract/listContract',
        pager: "#jqGridPager",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        },
        datatype: "json",
        colModel: [
            { label: '合同编号', name: 'id', index: 'id', width: 50, key: true },
            { label: '项目名称', name: 'pjinfoName', index: 'pjinfoName', width: 80 },
            { label: '所属订单号', name: 'orderId', index: 'orderId', width: 80 }, {
                label: '合同类型',
                name: 'type',
                width: 40,
                formatter: function(value, options, row) {
                    if (value == 'B') {
                        return "保密合同";
                    } else if (value == 'T') {
                        return "投资合同";
                    }
                }
            }, {
                label: '合同状态',
                name: 'status',
                width: 40,
                formatter: function(value, options, row) {
                    if (value == 0) {
                        return "待签";
                    } else if (value == 10) {
                        return "平台已签";
                    } else if (value == 20) {
                        return "客户已签";
                    }
                }
            }, {
                label: '会员名称',
                name: 'username',
                index: 'username',
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
                    var a = "<a  target='_blank' href='" + rowObject.viewpdfUrl + "'>查看合同</a>&nbsp;";
                    a += "<a  target='_blank' href='" + rowObject.downloadUrl + "'>下载合同</a>";
                    return a;
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
                postData: { 'orderId': vm.queryData.orderId },
                page: page
            }).trigger("reloadGrid");
        }
    }
});


// 用户信息弹窗
var vm_user_msg_win = new UserMsg();
