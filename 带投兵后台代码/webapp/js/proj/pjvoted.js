function format(cellvalue) { //cellvalue表示当前单元格的值
    return cellvalue / 10000;
}


var votedUrl = "";
var votedPara = {
    id: null,
    pjid: null,
    name: null,
    isdownload: 0,
    pic: null
};
var votedsPara = [];

$(function () {
    getToken()

    var table = {
        url: '../pjvoted/list?status=50,100',
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
                label: '状态',
                name: 'statusDesc',
                index: 'statusDesc',
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
            }
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

    new AjaxUpload('#uploadvoted', {
        action: '/upload/up',
        name: 'file',
        autoSubmit: true,
        responseType: "json",
        onSubmit: function (file, extension) {

            top.vm.loading(true); // loading效果出现

            var token = $("#token").val();
            this.setData({
                'token': token,
                'type': "project/" + vm_win.pjid
            });
        },
        onComplete: function (file, r) {}
    });
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
        query: function () {
            vm.reload();
        },
        reload: function (event) {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'name': vm.Data.name
                },
                page: page
            }).trigger("reloadGrid");
        },
        // 添加资料
        addpj: function () {
            var id = getSelectedRow("#jqGrid");
            if (id == null) {
                return;
            }
            vm_win.pjid = id;
            vm_win.show_win = true;
        },
        detail: function () {
            var pjid = getSelectedRow("#jqGrid");
            if (pjid == null) {
                return;
            }
            window.location.href = 'pjvoteddetail.html?pjid=' + pjid;
        },
    }
});


// 弹窗
var vm_win = new Vue({
    el: "#detail-win",
    data: {
        tab: "tab4", // 标记打开的是哪一个tab
        show_win: false,
        pjid: null,
        voted: votedPara
    },
    computed: {
        // 以下三个属性用于控制tab的出现 , 会根据 tab属性自动变化
        tab4: function () {
            return this.tab == "tab4";
        },
        textLen: function () {
            var len = this.info.brief.length;
            return len;
        },
        usetolen: function () {
            var len = this.finacing.useto.length;
            return len;
        }
    },
    methods: {
        changeView: function (view) {
            this.tab = view;
        },
        formatAmount: function (val) {
            return val / 10000
        },
        closewin: function () {
            this.show_win = !this.show_win;
        },
        editvoted: function () {
            vm_win.voted.pic = votedUrl;
            vm_win.voted.pjid = vm_win.pjid;
            $.ajax({
                type: "POST",
                url: "../pjvoted/savevoted",
                contentType: "application/json",
                data: JSON.stringify(vm_win.voted),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function (index) {
                            vm_win.voted.id = r.pjvotedid;
                            vm_win.show_win = false;
                        });
                    } else {
                        alert(r.msg);
                    }

                    top.vm.loading(false); // loading效果消失

                }
            });
        },
        // delvoted: function (id) {
        //     $.ajax({
        //         type: "POST",
        //         url: "../pjinfo/delvoted",
        //         data: {
        //             "id": id
        //         },
        //         success: function (r) {
        //             if (r.code === 0) {
        //                 alert('操作成功', function (index) {
        //                     vm_win.closewin();
        //                 });
        //             } else {
        //                 alert(r.msg);
        //             }
        //         }
        //     });
        // },
    }
});


function getToken() {
    $.ajax({
        type: "POST",
        url: "../pjinfo/gettoken",
        success: function (r) {
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
        votedUrl = url;
        if (vm_win.tab == "tab4") {
            vm_win.editvoted()
        }
    } else {
        alert(r.msg);
    }
}