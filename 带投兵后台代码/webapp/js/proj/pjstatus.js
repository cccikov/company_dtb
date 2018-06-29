Vue.use(validate,{
    rules: {
        sucbriefMax: {
            maxLength: 500
        }
    }
});

function format(cellvalue) { //cellvalue表示当前单元格的值
    return cellvalue / 10000;
}


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
        if (vm_edit_win.tab == "tab4") {
            vm_edit_win.editDocument()
        } else if (vm_edit_win.tab == "tab3") {
            vm_edit_win.editTeam();
        }
    } else {
        alert(r.msg);
    }
}

$(function() {
    var tab_obj = {
        url: '../pjinfo/list?status=10,20,30,40,50,100',
        pager: "#jqGridPager",
        gridComplete: function() {
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
            label: '创建者',
            name: 'creator',
            index: 'creator',
            width: 80
        }, {
            label: '创建时间',
            name: 'createtime',
            index: 'createtime',
            width: 80
        }, {
            label: '状态',
            name: 'statusDesc',
            index: 'statusDesc',
            width: 40,
        }, {
            label: '操作',
            name: '',
            index: 'operate',
            width: 50,
            align: 'center',
            formatter: function(cellvalue, options, rowObject) {
            	 var detail = "";
            	 if (rowObject.status != 100) {
            		 
            		 detail += "<a onclick='editprojectinfo(" + rowObject.id + ",\"tab2\",0)' href='javascript:void(0)'>修改期限</a>";
            		 detail += "&nbsp;<a onclick='editprojectinfo(" + rowObject.id + ",\"tab4\",0)' href='javascript:void(0)'>修改材料</a>";
            	 }else{
            		 detail += "<a onclick='editprojectinfo(" + rowObject.id + ",\"tab4\",1)' href='javascript:void(0)'>修改</a>";
            	 }
                return detail;
            },
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



    getToken();

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
                'type': "project/" + vm_edit_win.pjid
            });
        },
        onComplete: function(file, r) {}
    });
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
        raise: function() {
            var idArr = getSelectedRows();
            if (idArr == null) {
                return;
            }
            var ids = idArr.join(",");
            confirm('确定要募集选中的记录？', function() {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/changstatus",
                    data: {
                        "optype": "raise",
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
        delivery: function() {
            var idArr = getSelectedRows();
            if (idArr == null) {
                return;
            }
            var ids = idArr.join(",");
            confirm('确定要交割选中的记录？', function() {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/changstatus",
                    data: {
                        "optype": "delivery",
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
        stop: function() {
            var idArr = getSelectedRows();
            if (idArr == null) {
                return;
            }
            var ids = idArr.join(",");
            confirm('确定要通过选中的记录？', function() {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/changstatus",
                    data: {
                        "optype": "stop",
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
        finish: function() {
            var idArr = getSelectedRows();
            if (idArr == null) {
                return;
            }
            var ids = idArr.join(",");
            confirm('确定要通过选中的记录？', function() {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/changstatus",
                    data: {
                        "optype": "finish",
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
        contributive: function() {
            var idArr = getSelectedRows();
            if (idArr == null) {
                return;
            }
            var ids = idArr.join(",");

            confirm('确定要修改为出资阶段？', function() {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/changstatus",
                    data: {
                        "optype": "contributive",
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

        showraise: function() {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }
            vm_partner_win.show = true;
        },
        reloadprojectinfo: function(id) {
            $.get("../pjinfo/info/" + id, function(r) {
                vm_edit_win.pjid = id;
                vm_edit_win.info = r.pjInfo;
                vm_edit_win.info.sucbrief = vm_edit_win.info.sucbrief?vm_edit_win.info.sucbrief:""; // sucbrief 没有的时候 设置默认值
                vm_edit_win.info.financing = vm_edit_win.info.financing?vm_edit_win.info.financing:"seed"; // finacing 没有的时候 设置默认值

                if (r.pjFinacings.length > 0) {
                    vm_edit_win.finacing = r.pjFinacings[0];
                    vm_edit_win.finacing.amount = vm_edit_win.finacing.amount / 10000
                    vm_edit_win.finacing.maxamount = vm_edit_win.finacing.maxamount / 10000
                    vm_edit_win.finacing.minamount = vm_edit_win.finacing.minamount / 10000
                    if (vm_edit_win.finacing.preheatdays != 0 || vm_edit_win.finacing.raisedays != 0 || vm_edit_win.finacing.contributivedays != 0 || vm_edit_win.finacing.deliverydays != 0) {
                        vm_edit_win.timeLimit = true;
                    }
                }

                if (r.pjReceivers.length > 0) {
                    vm_edit_win.receiver = r.pjReceivers[0];
                }
                vm_edit_win.teams = r.pjTeams;
                vm_edit_win.documents = r.pjDocuments;
                vm_edit_win.show_win = true;
            });
        }
    }
});

// 详情弹窗
var vm_win = new Vue({
    // el: "#pro-detail",
    data: {
        show_win: false,
        projectData: null
    },
    methods: {
        closewin: function() {
            this.show_win = !this.show_win;
        },
    }
});






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
    sucbrief:"",
    financing: "seed"
};
var finacingPara = {
    id: "",
    pjid: "",
    useto: "",
    amount: "",
    preheatdays: "",
    raisedays: "",
    contributivedays: "",
    deliverydays: "",
    autoflag: "",
    sellrate: "",
    minamount: "",
    maxamount: ""
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

// 修改弹窗
var vm_edit_win = new Vue({
    el: "#detail-win",
    data: {
        tab: "tab2", // 标记打开的是哪一个tab
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
        timeLimit: false,
        // 到期自动进入状态
        autoGo: true,
        flag:0, // 是否成功项目
        showEditArr:[false,false,false,false,false], // 标记显示那些tab切换按钮
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
        sucbriefLen: function() {
            var len = this.info.sucbrief.length;
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
            vm_edit_win.info.pjid = vm_edit_win.pjid;
            var flag = vm_edit_win.focusErrorEl(['sucbrief']);
            if (!flag) {
                return;
            }
            $.ajax({
                type: "POST",
                url: "../pjinfo/saveinfo",
                contentType: "application/json",
                data: JSON.stringify(vm_edit_win.info),
                success: function(r) {
                    if (r.code === 0) {
                        alert('操作成功', function(index) {
                            vm_edit_win.info.id = r.pjid;
                            vm.reloadprojectinfo(vm_edit_win.pjid);
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        editDocument: function() {
            vm_edit_win.document.pic = documentUrl;
            vm_edit_win.document.pjid = vm_edit_win.pjid;
            $.ajax({
                type: "POST",
                url: "../pjinfo/savedocument",
                contentType: "application/json",
                data: JSON.stringify(vm_edit_win.document),
                success: function(r) {
                    if (r.code === 0) {
                        alert('操作成功', function(index) {
                            vm_edit_win.document.id = r.pjdocumentid;
                            vm.reloadprojectinfo(vm_edit_win.pjid);
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
                            vm.reloadprojectinfo(vm_edit_win.pjid);
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        editFinacing: function() {
            vm_edit_win.finacing.pjid = vm_edit_win.pjid;
            $.ajax({
                type: "POST",
                url: "../pjinfo/editFinacingDays",
                contentType: "application/json",
                data: JSON.stringify(vm_edit_win.finacing),
                success: function(r) {
                    if (r.code === 0) {
                        alert('操作成功', function(index) {
                            vm.reloadprojectinfo(vm_edit_win.pjid);
                        });
                    } else {
                        alert(r.msg);
                    }

                    top.vm.loading(false); // loading效果消失

                }
            });
        },
        financingChange:function(){
            vm_edit_win.info.pjid = vm_edit_win.pjid;
            confirm('确定要修改融资阶段吗？', function(){
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/setFinacing",
                    contentType: "application/json",
                    data: JSON.stringify(vm_edit_win.info),
                    success: function(r) {
                        if (r.code === 0) {
                            alert('操作成功', function(index) {
                                vm_edit_win.info.id = r.pjid;
                                vm.reloadprojectinfo(vm_edit_win.pjid);
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

function editprojectinfo(pjid,tab,flag) {
    var id = pjid;
    vm_edit_win.flag = flag;
    vm_edit_win.showEditArr = [false,false,false,false,false];

    $.get("../pjinfo/info/" + id, function(r) {
        vm_edit_win.pjid = id;
        vm_edit_win.info = r.pjInfo;
        vm_edit_win.info.sucbrief = vm_edit_win.info.sucbrief?vm_edit_win.info.sucbrief:""; // sucbrief 没有的时候 设置默认值
        vm_edit_win.info.financing = vm_edit_win.info.financing?vm_edit_win.info.financing:"seed"; // finacing 没有的时候 设置默认值
        if (r.pjFinacings.length > 0) {
            vm_edit_win.finacing = r.pjFinacings[0];
            vm_edit_win.finacing.amount = vm_edit_win.finacing.amount / 10000
            vm_edit_win.finacing.maxamount = vm_edit_win.finacing.maxamount / 10000
            vm_edit_win.finacing.minamount = vm_edit_win.finacing.minamount / 10000
            if (vm_edit_win.finacing.preheatdays != null || vm_edit_win.finacing.raisedays != null || vm_edit_win.finacing.contributivedays != null || vm_edit_win.finacing.deliverydays != null) {
                vm_edit_win.timeLimit = true;
            }
        }
        if (r.pjReceivers.length > 0) {
            vm_edit_win.receiver = r.pjReceivers[0];
        }
        vm_edit_win.teams = r.pjTeams;
        vm_edit_win.documents = r.pjDocuments;


        if(tab == "tab2"){
            vm_edit_win.showEditArr[1] = vm_edit_win.showEditArr[4] = true;
        }else if(tab == "tab4" && flag == 1){
            vm_edit_win.showEditArr[0] = vm_edit_win.showEditArr[3] = true;
        }else if(tab == "tab4" && flag == 0){
            vm_edit_win.showEditArr[3] = true;
        }

        vm_edit_win.tab = tab;
        vm_edit_win.show_win = true;

    });
}
























// 出资填写合伙人弹窗
var vm_partner_win = new Vue({
    el: "#partner-win",
    data: {
        show: false,
        companyname: "",
        capital: "",
        establishmentdate: "",
        lp: "",
        gp: "",
        lpcustomerid: "",
        gpcustomerid: "",
        gp2: "",
        gpcustomerid2: ""
    },
    methods: {
        closewin: function() {
            this.show = !this.show;
        },
        save: function() {
            var pass = vm_partner_win.focusErrorEl(['companyname', 'capital', 'establishmentdate', 'lp', 'gp', 'lpcustomerid', 'gpcustomerid', 'gp2', 'gpcustomerid2']);
            if (!pass) { // 有错误
                return;
            }
            console.log("没错误");
            var id = getSelectedRow();
            if (id == null) {
                return;
            }
            var companyname = $("input[name=companyname]").val()
            var capital = $("input[name=capital]").val()
            var establishmentdate = $("input[name=establishmentdate]").val()
            var lp = $("input[name=lp]").val()
            var gp = $("input[name=gp]").val()
            var lpcustomerid = $("input[name=lpcustomerid]").val()
            var gpcustomerid = $("input[name=gpcustomerid]").val()
            var gp2 = $("input[name=gp2]").val()
            var gpcustomerid2 = $("input[name=gpcustomerid2]").val()

            confirm('确定要修改为募集阶段？', function() {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/changraise",
                    data: {
                        "id": id,
                        "companyname": companyname,
                        "capital": capital,
                        "establishmentdate": establishmentdate,
                        "lp": lp,
                        "gp": gp,
                        "lpcustomerid": lpcustomerid,
                        "gpcustomerid": gpcustomerid,
                        "gp2": gp2,
                        "gpcustomerid2": gpcustomerid2
                    },
                    success: function(r) {
                        if (r.code == 0) {
                            alert('操作成功', function(index) {
                                vm_partner_win.show = false
                                vm.reload();
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
