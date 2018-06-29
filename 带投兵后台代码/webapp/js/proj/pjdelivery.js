Vue.use(validate);

function format(cellvalue) { //cellvalue表示当前单元格的值
    return cellvalue / 10000;
}
$(function () {
    var tab_obj = {
        url: '../pjinfo/list?status=30,50,100',
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
                    } else if (value == 100) {
                        return "成功";
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
        queryData: {
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
                    'name': vm.queryData.name
                },
                page: page
            }).trigger("reloadGrid");
        },
        projectinfo: function () {
            var id = getSelectedRow();
            if (id == null) {
                return;
            }
            $.get("../pjinfo/info/" + id, function (r) {
                vm_win.projectData = r;
                if (!vm_win.$el) {
                    vm_win.$mount("#pro-detail");
                };
                vm_win.show_win = true;
            });
        },
        show:function(){
        	var id = getSelectedRow();
            if (id == null) {
                return;
            }
            vm_partner_win.show = true;
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
        closewin: function () {
            this.show_win = !this.show_win;
        }
    }
});


// 出资填写合伙人弹窗
var vm_partner_win = new Vue({
    el: "#partner-win",
    data: {
        show: false,
        username: "",
        amount: "",
        mobile: "",
        username_need:true,
        mobile_need:false,
    },
    methods: {
        closewin: function () {
            this.show = !this.show;
        },
        clean:function(){
            this.amount = "";
            this.username = "";
            this.mobile = "";
        },
        save: function () {
            var _this = this;
            if(_this.mobile_need){
                var pass = vm_partner_win.focusErrorEl(['username', 'mobile','amount']);
            }else{
                var pass = vm_partner_win.focusErrorEl(['username','amount']);
            }
            if (!pass) { // 有错误
                return;
            }
            console.log("没错误");
            var id = getSelectedRow();
            if (id == null) {
                return;
            }

            confirm('确定信息无误？', function () {
                $.ajax({
                    type: "POST",
                    url: "../pjinfo/ordercreate",
                    data: {
                        "projid": id,
                        "amount": _this.amount,
                        "username": _this.username,
                        "mobile": _this.mobile_need ? _this.mobile : ""
                    },
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function (index) {
                            	vm_partner_win.show = false
                                vm.reload();
                                vm_partner_win.clean();
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
