function format(cellvalue) { //cellvalue表示当前单元格的值
    return cellvalue / 10000;
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

var pjid = getUrlParam("pjid");

$(function() {
    var table = {
        url: '../pjvoted/detaillist?pjid='+pjid,
        pager: "#jqGridPager",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        },
        datatype: "json",
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true, hidden: true },
            { label: '附件名称', name: 'name', index: 'name', width: 80 },
            {
                label: '是否可下载',
                name: 'isdownload',
                width: 40,
                formatter: function (value, options, row) {
                    if (value == 0) {
                        return "不可下载";
                    } else if (value == 10) {
                        return "可下载";
                    } 
                }
            },
            { label: '创建者', name: 'creator', index: 'creator', width: 80 },
            { label: '创建时间', name: 'createtime', index: 'createtime', width: 80 },
            {
                label: '操作',
                name: 'operate',
                width: 40,
                formatter: function(cellvalue, options, rowObject) {
                    var a = "<a  target='_blank' href='" + rowObject.pic + "'>查看</a>&nbsp;";
                     a += "<a   href='javascript:void(0)' onclick='delvoted("+rowObject.id+")'>删除</a>&nbsp;";
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

    $("#jqGrid").jqGrid(table);

});

/**
 * tab切换的时候需要重新设置table的kuandu
 * @param  {string} view 哪个view的table
 * @return {[type]}      [description]
 */


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
        Data: {
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
                postData: { 'name': vm.Data.name },
                page: page
            }).trigger("reloadGrid");
        },
    }
});

function delvoted(id) {
    $.ajax({
        type: "POST",
        url: "../pjvoted/delvoted",
        data: { "id": id },
        success: function(r) {
            if (r.code === 0) {
                alert('操作成功', function(index) {
                    vm.reload();
                });
            } else {
                alert(r.msg);
            }
        }
    });
}
