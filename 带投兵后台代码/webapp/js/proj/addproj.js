function format(cellvalue) { //cellvalue表示当前单元格的值
    return cellvalue / 10000;
}


var documentUrl = "";
var documentPara = {
    id: null,
    type: null,
    pic: null,
    pjid: null,
    num: null
};
var infoPara = {
    id: "",
    name: "",
    tabs: "",
    brief: "",
    financing: "seed"
};
var finacingPara = {
    id: "",
    pjid: "",
    useto: "",
    amount: "",
    balancedays: "",
    depositdays: "",
    preheatdays: "",
    raisedays: "",
    contributivedays: "",
    deliverydays: "",
    autoflag: "",
    sellrate: "",
    minamount: "",
    maxamount: "",
    subscriberatio:""
};
var documentsPara = [];
var receiverPara = {
    realname: "",
    email: "",
    phone: "",
    accname: "",
    bankname: "",
    accno: "",
    branch: ""
};

$(function() {
    getToken()

    var table = {
        url: '../pjinfo/list?status=0,-1,10&&type=checking',
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
            { label: '融资阶段', name: 'financing', index: 'financing', width: 150 },
            { label: '状态', name: 'statusDesc', index: 'statusDesc', width: 150 },
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

    $("#jqGrid-checking").jqGrid(table);

    new AjaxUpload('#uploadDocument', {
        action: '/upload/up',
        //action : '../upload/test',
        name: 'file',
        autoSubmit: true,
        responseType: "json",
        onSubmit: function(file, extension) {

            top.vm.loading(true); // loading效果出现

            var token = $("#token").val();
            this.setData({
                'token': token,
                'type': "project/" + vm_win.pjid
            });
        },
        onComplete: function(file, r) {}
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
        checkingData: {
            name: null
        }
    },
    methods: {
        // 添加项目
        addpj: function() {
            vm_win.show_win = true;
            vm_win.pjid = null;
            vm_win.info = infoPara;
            vm_win.finacing = finacingPara;
            vm_win.receiver = receiverPara;
            vm_win.documents = documentsPara;
            vm_win.clearerror();
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
        projectinfo: function(jqGridselect) {// 读取项目信息
            var id = getSelectedRow("#jqGrid-" + jqGridselect);
            if (id == null) {
                return;
            }
            $.get("../pjinfo/info/" + id, function(r) {
                vm_win.pjid = id;
                vm_win.info = r.pjInfo;
                if (r.pjFinacings.length > 0) {
                    vm_win.finacing = r.pjFinacings[0];
                    vm_win.finacing.amount = vm_win.finacing.amount / 10000
                    vm_win.finacing.maxamount = vm_win.finacing.maxamount / 10000
                    vm_win.finacing.minamount = vm_win.finacing.minamount / 10000
                    vm_win.finacing.pmaxamount = vm_win.finacing.pmaxamount / 10000
                    vm_win.finacing.subscriberatio = vm_win.finacing.subscriberatio * 100
                    if (!!vm_win.finacing.preheatdays|| !!vm_win.finacing.raisedays || !!vm_win.finacing.deliverydays) {
                        vm_win.timeLimit = true;
                    }else{
                        vm_win.timeLimit = false;
                    }
                }
                if (r.pjReceivers.length > 0) {
                    vm_win.receiver = r.pjReceivers[0];
                }
                vm_win.teams = r.pjTeams;
                vm_win.documents = r.pjDocuments;

                setTimeout(function() {
                    vm_win.manual(['name', 'tabs', 'brief']);
                    vm_win.manual(['amount', 'minamount', 'preheatdays', 'depositdays', 'balancedays','subscriberatio', 'sellrate', 'maxamount', 'pmaxamount', 'raisedays', 'deliverydays', 'useto']);
                    // vm_win.manual(['teamname', 'position', 'intro']);
                    vm_win.manual(['realname', 'phone', 'email', 'bankname', 'branch', 'accname', 'accno']);
                }, 16.7);

                vm_win.show_win = true;
            });
        },
        reloadprojectinfo: function(id) {
            $.get("../pjinfo/info/" + id, function(r) {
                vm_win.pjid = id;
                vm_win.info = r.pjInfo;
                if (r.pjFinacings.length > 0) {
                    vm_win.finacing = r.pjFinacings[0];
                    vm_win.finacing.amount = vm_win.finacing.amount / 10000
                    vm_win.finacing.maxamount = vm_win.finacing.maxamount / 10000
                    vm_win.finacing.minamount = vm_win.finacing.minamount / 10000
                    vm_win.finacing.pmaxamount = vm_win.finacing.pmaxamount / 10000
                    vm_win.finacing.subscriberatio = vm_win.finacing.subscriberatio * 100
                    if (!!vm_win.finacing.preheatdays || !!vm_win.finacing.raisedays || !!vm_win.finacing.deliverydays) {
                        vm_win.timeLimit = true;
                    }
                }

                if (r.pjReceivers.length > 0) {
                    vm_win.receiver = r.pjReceivers[0];
                }
                vm_win.teams = r.pjTeams;
                vm_win.documents = r.pjDocuments;
                vm_win.show_win = true;
            });
        },
    }
});


// 弹窗
var vm_win = new Vue({
    el: "#detail-win",
    data: {
        tab: "tab1", // 标记打开的是哪一个tab
        show_win: false,
        pjid: null,
        document: documentPara,
        // 基本信息
        info: infoPara,
        // 融资需求
        finacing: finacingPara,
        // 项目材料
        documents: documentsPara,
        // 收款人信息
        receiver: receiverPara,

        // 时间限制
        timeLimit: true,
        // 到期自动进入状态
        autoGo: true
    },
    computed: {
        // 以下三个属性用于控制tab的出现 , 会根据 tab属性自动变化
        tab1: function() {
            return this.tab == "tab1";
        },
        tab2: function() {
            return this.tab == "tab2";
        },
        tab4: function() {
            return this.tab == "tab4";
        },
        tab5: function() {
            return this.tab == "tab5";
        },
        textLen: function() {
            var len = this.info.brief.length;
            return len;
        },
        usetolen: function() {
            var len = this.finacing.useto.length;
            return len;
        }
    },
    methods: {
        changeView: function(view) {
            this.tab = view;
        },
        formatAmount: function(val) {
            return val / 10000
        },
        closewin: function() {
            this.show_win = !this.show_win;
        },
        editInfo: function() {
            var flag = vm_win.focusErrorEl(['name', 'tabs', 'brief']);
            if (flag != true) {
                return;
            }

            // loading效果出现
            top.vm.loading(true);
            vm_win.info.status = 0;
            $.ajax({
                type: "POST",
                url: "../pjinfo/saveinfo",
                contentType: "application/json",
                data: JSON.stringify(vm_win.info),
                success: function(r) {
                    if (r.code === 0) {
                        alert('操作成功', function(index) {
                            vm_win.pjid = r.pjid;
                            vm.reload_checking();
                        });
                    } else {
                        alert(r.msg);
                    }
                    top.vm.loading(false);
                }
            });
        },
        editFinacing: function() {
            vm_win.finacing.pjid = vm_win.pjid;
            vm_win.finacing.contributivedays = 0;
            if (vm_win.timeLimit == false) {
                var flag = vm_win.focusErrorEl(['amount', 'minamount', 'maxamount', 'pmaxamount','depositdays', 'balancedays', 'useto']);
                if (flag != true) {
                    return;
                }
                vm_win.finacing.preheatdays = 0;
                vm_win.finacing.raisedays = 0;
                vm_win.finacing.deliverydays = 0;
            } else {
                var flag = vm_win.focusErrorEl(['amount', 'minamount', 'maxamount','pmaxamount', 'depositdays', 'balancedays', 'subscriberatio','preheatdays', 'raisedays', 'deliverydays', 'useto']);
                if (flag != true) {
                    return;
                }
            }
            $.ajax({
                type: "POST",
                url: "../pjinfo/savefinacing",
                contentType: "application/json",
                data: JSON.stringify(vm_win.finacing),
                success: function(r) {
                    if (r.code === 0) {
                        alert('操作成功', function(index) {
                            vm_win.finacing.id = r.pjfinacingid;
                            vm.reloadprojectinfo(vm_win.pjid);
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        editReceiver: function() {
            vm_win.receiver.pjid = vm_win.pjid;
            var flag = vm_win.focusErrorEl(['realname', 'phone', 'email', 'bankname', 'branch', 'accname', 'accno']);
            if (flag != true) {
                return;
            }
            $.ajax({
                type: "POST",
                url: "../pjinfo/savereceiver",
                contentType: "application/json",
                data: JSON.stringify(vm_win.receiver),
                success: function(r) {
                    if (r.code === 0) {
                        alert('操作成功', function(index) {
                            vm_win.receiver.id = r.pjreceiverid;
                            vm.reloadprojectinfo(vm_win.pjid);
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        editDocument: function() {
            vm_win.document.pic = documentUrl;
            vm_win.document.pjid = vm_win.pjid;
            $.ajax({
                type: "POST",
                url: "../pjinfo/savedocument",
                contentType: "application/json",
                data: JSON.stringify(vm_win.document),
                success: function(r) {
                    if (r.code === 0) {
                        alert('操作成功', function(index) {
                            vm_win.document.id = r.pjdocumentid;
                            vm.reloadprojectinfo(vm_win.pjid);
                        });
                    } else {
                        alert(r.msg);
                    }

                    top.vm.loading(false); // loading效果消失

                }
            });
        },
        delDocument: function(id) {
            $.ajax({
                type: "POST",
                url: "../pjinfo/deldocument",
                data: { "id": id },
                success: function(r) {
                    if (r.code === 0) {
                        alert('操作成功', function(index) {
                            vm.reloadprojectinfo(vm_win.pjid);
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
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

function onAjaxUploadComplete(j) {
    r = JSON.parse(j);
    getToken();
    if (r.url != "没有上传权限") {
        var url = r.url;
        teamUrl = url;
        documentUrl = url;
        if (vm_win.tab == "tab4") {
            vm_win.editDocument()
        } else if (vm_win.tab == "tab3") {
            vm_win.editTeam();
        }
    } else {
        alert(r.msg);
    }
}
