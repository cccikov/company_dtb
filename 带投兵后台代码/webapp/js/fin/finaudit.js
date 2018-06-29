/* 格式化银行卡 */
function formatBankCard(card) {
    card = String(card);
    card = card.replace(/\s/g, "");
    var len = card.length;
    var arr = [];
    var n = 0;
    while (n < len) {
        arr.push(card.slice(n, n + 4));
        n += 4;
    };
    return arr.join(" ");
}

function formatNum(num) { // 本来toLocaleString就可以实现这个功能 , 但是搜狗这个傻逼浏览器
    num = num.toString();
    var decimal = ""; //小数
    var integer = ""; //整数
    var point = num.indexOf(".");
    var arr = [];
    if (point != -1) {
        decimal = num.slice(point + 1);
        integer = num.slice(0, point);
    } else {
        integer = num;
        decimal = "";
    }
    var len = integer.length;
    var n = len;
    while (n > 3) {
        n -= 3;
        arr.unshift(num.substr(n, 3));
    }
    arr.unshift(num.slice(0, n));
    if (point != -1) {
        return arr.join(",") + "." + decimal;
    }
    return arr.join(",");
}

$(function() {
    var BM_tab_obj = {
        url: '../finance/list?type=BM',
        pager: "#jqGridPager-BM",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid-BM").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        },
        datatype: "json",
        colModel: [
            { label: '保密单号', name: 'id', index: 'id', width: 50, key: true },
            { label: '项目名称', name: 'pjInfoEntity.name', index: 'pjname', width: 80 }, {
                label: '投资会员',
                name: 'tbUserEntity.username',
                index: 'username',
                width: 80,

                formatter: function(value, options, row) {
                    var userid = row.userid;
                    return '<a class="alink" href="javascript:void(0)" onclick="showUser(\'' + userid + '\')">' + value + '</a>';
                }
            },
            { label: '应收保密金(元)', name: 'amount', index: 'amount', width: 150 },
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
            root: "page_BM.list",
            page: "page_BM.currPage",
            total: "page_BM.totalPage",
            records: "page_BM.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        }
    }
    var DJ_tab_obj = {
        url: '../finance/list?type=DJ',
        pager: "#jqGridPager-DJ",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid-DJ").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        },
        datatype: "json",
        colModel: [
            { label: '订单号', name: 'id', index: 'id', width: 50, key: true },
            { label: '项目名称', name: 'pjInfoEntity.name', index: 'pjname', width: 80 }, {
                label: '投资会员',
                name: 'tbUserEntity.username',
                index: 'username',
                width: 80,
                formatter: function(value, options, row) {
                    var userid = row.userid;
                    return '<a class="alink" href="javascript:void(0)" onclick="showUser(\'' + userid + '\')">' + value + '</a>';
                }
            },
            { label: '应收保证金(元)', name: 'depositamount', index: 'depositamount', width: 150 },
            { label: '应收认购费(元)', name: 'subscribe', index: 'subscribe', width: 150 }, {
                label: '应收总额(元)',
                name: '',
                index: 'sumamount',
                width: 50,
                align: 'center',
                formatter: function(cellvalue, options, rowObject) {
                    return rowObject.depositamount + rowObject.subscribe
                },
            },
            { label: '投资金额(元)', name: 'amount', index: 'amount', width: 80 },
            { label: '提交时间', name: 'updatetime', index: 'updatetime', width: 80 }
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
            root: "page_DJ.list",
            page: "page_DJ.currPage",
            total: "page_DJ.totalPage",
            records: "page_DJ.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        }
    }
    var YK_tab_obj = {
        url: '../finance/list?type=YK',
        pager: "#jqGridPager-YK",
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid-YK").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        },
        datatype: "json",
        colModel: [
            { label: '订单号', name: 'id', index: 'id', width: 50, key: true },
            { label: '项目名称', name: 'pjInfoEntity.name', index: 'pjname', width: 80 }, {
                label: '投资会员',
                name: 'tbUserEntity.username',
                index: 'username',
                width: 80,
                formatter: function(value, options, row) {
                    var userid = row.userid;
                    return '<a class="alink" href="javascript:void(0)" onclick="showUser(\'' + userid + '\')">' + value + '</a>';
                }
            },
            { label: '应收余款(元)', name: 'residue', index: 'residue', width: 150 },
            { label: '投资金额(元)', name: 'amount', index: 'amount', width: 80 },
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
            root: "page_YK.list",
            page: "page_YK.currPage",
            total: "page_YK.totalPage",
            records: "page_YK.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        }
    }

    $("#jqGrid-BM").jqGrid(BM_tab_obj);
    $("#jqGrid-DJ").jqGrid(DJ_tab_obj);
    $("#jqGrid-YK").jqGrid(YK_tab_obj);
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
        tab: "DJ", // 标记打开的是哪一个tab
        BMData: {
            name: null
        },
        DJData: {
            name: null
        },
        YKData: {
            name: null
        }
    },
    computed: {
        // 以下三个属性用于控制tab的出现 , 会根据 tab属性自动变化
        BM: function() {
            return this.tab == "BM";
        },
        DJ: function() {
            return this.tab == "DJ";
        },
        YK: function() {
            return this.tab == "YK";
        }
    },
    methods: {
        changeView: function(view) {
            this.tab = view;
            resetTableWidth(view);
        },
        query_BM: function() {
            vm.reload_BM();
        },
        reload_BM: function(event) {
            var page = $("#jqGrid-BM").jqGrid('getGridParam', 'page');
            $("#jqGrid-BM").jqGrid('setGridParam', {
                postData: { 'name': vm.BMData.name },
                page: page
            }).trigger("reloadGrid");
        },
        query_DJ: function() {
            vm.reload_DJ();
        },
        reload_DJ: function(event) {
            var page = $("#jqGrid-DJ").jqGrid('getGridParam', 'page');
            $("#jqGrid-DJ").jqGrid('setGridParam', {
                postData: { 'name': vm.DJData.name },
                page: page
            }).trigger("reloadGrid");
        },
        query_YK: function() {
            vm.reload_YK();
        },
        reload_YK: function(event) {
            var page = $("#jqGrid-YK").jqGrid('getGridParam', 'page');
            $("#jqGrid-YK").jqGrid('setGridParam', {
                postData: { 'name': vm.YKData.name },
                page: page
            }).trigger("reloadGrid");
        },
        receiptInfo: function(jqGridselect) {
            var id = getSelectedRow("#jqGrid-" + jqGridselect);
            if (id == null) {
                return;
            }
            $.get("../finance/payinfo/" + id + "/" + jqGridselect, function(r) {
                vm_receipt_win.payinfo = r.odPayEntities
                if (!vm_receipt_win.$el) {
                    vm_receipt_win.$mount("#receipt-win");
                }

                if (jqGridselect == "BM") {
                    vm_receipt_win.secrecyid = id;
                } else {
                    vm_receipt_win.orderid = id;
                }

                vm_receipt_win.receiptData = {
                    banknames: [],
                    cardnos: [],
                    payids: [],
                    accnames: [],
                    amount: []
                };
                vm_receipt_win.payinfo.forEach(function(item, key) {
                    vm_receipt_win.receiptData.amount.push(formatNum(item.amount));
                    if (jqGridselect =="BM") {
                        vm_receipt_win.receiptData.accnames.push(item.secrecy.tbUserEntity.username);
                    } else {
                        vm_receipt_win.receiptData.accnames.push(item.order.tbUserEntity.username);
                    }
                });

                if (!vm_receipt_win.$el) {
                    vm_receipt_win.$mount("#receipt-win");
                }
                vm_receipt_win.show_receipt_win = true;
            });
        }
    }
});



var vm_receipt_win = new Vue({
    // el:"#receipt-win",
    data: {
        show_receipt_win: false,
        payinfo: null,
        orderid: null,
        secrecyid: null,
        receiptData: {
            banknames: [],
            cardnos: [],
            payids: [],
            accnames: [],
            amount: []
        },
    },
    methods: {
        closewin: function() {
            this.show_receipt_win = !this.show_receipt_win;
        },
        showDocumentWin: function(src) {
            vm_document_win.imgsrc = src;
            vm_document_win.show_document_win = true
        },
        receiptAudit: function(flag) {
            var _this = this;
            if (flag == 1) { // 通过
                // 判断是否全部填写 begin
                var allinput = $(vm_receipt_win.$el).find("td").find("input");
                var pass = true;
                allinput.each(function(i, k) {
                    if (pass) {
                        var _this = k;
                        if (_this.value == "") {
                            _this.focus();
                            pass = false;
                        }
                    }
                });
                if (!pass) {
                    return false
                }
                // 判断是否全部填写 end

                var payids = "";
                var originamount = [];
                for (var i = 0; i < _this.payinfo.length; i++) {
                    _this.receiptData.payids[i] = _this.payinfo[i].id;
                    originamount[i] = _this.receiptData.amount[i].replace(/,/g, "");
                }

                payids = _this.receiptData.payids.join(",");
                amount = originamount.join(",");
                if (vm.tab == "BM") {
                    confirm('确定要通过吗？', function() {
                        $.ajax({
                            type: "POST",
                            url: "../finance/secrecyaudit",
                            data: {
                                "secrecyid": vm_receipt_win.secrecyid,
                                "flag": flag,
                                "remark": "",
                                "payids": payids,
                                "amounts": amount
                            },
                            success: function(r) {
                                if (r.code == 0) {
                                    alert('操作成功', function(index) {
                                        vm.reload_BM();
                                        vm.reload_DJ();
                                        vm.reload_YK();
                                        vm_receipt_win.show_receipt_win = false;
                                    });
                                } else {
                                    alert(r.msg);
                                }
                            }
                        });
                    });
                } else {
                    confirm('确定要通过吗？', function() {
                        $.ajax({
                            type: "POST",
                            url: "../finance/receiptaudit",
                            data: {
                                "orderid": vm_receipt_win.orderid,
                                "flag": flag,
                                "remark": "",
                                "payids": payids,
                                "amounts": amount
                            },
                            success: function(r) {
                                if (r.code == 0) {
                                    alert('操作成功', function(index) {
                                        vm.reload_BM();
                                        vm.reload_DJ();
                                        vm.reload_YK();
                                        vm_receipt_win.show_receipt_win = false;
                                    });
                                } else {
                                    alert(r.msg);
                                }
                            }
                        });
                    });
                }


            } else if (flag == -1) {
                if (vm.tab == "BM") {
                    confirm('确定要驳回吗？', function() {
                        $.ajax({
                            type: "POST",
                            url: "../finance/secrecyaudit",
                            data: {
                                "secrecyid": vm_receipt_win.secrecyid,
                                "flag": flag,
                                "remark": "凭证无效"
                            },
                            success: function(r) {
                                if (r.code == 0) {
                                    alert('操作成功', function(index) {
                                        vm.reload_BM();
                                        vm.reload_DJ();
                                        vm.reload_YK();
                                        vm_receipt_win.show_receipt_win = false;
                                    });
                                } else {
                                    alert(r.msg);
                                }
                            }
                        });
                    });

                } else {
                    confirm('确定要驳回吗？', function() {
                        $.ajax({
                            type: "POST",
                            url: "../finance/receiptaudit",
                            data: {
                                "orderid": vm_receipt_win.orderid,
                                "flag": flag,
                                "remark": "凭证无效"
                            },
                            success: function(r) {
                                if (r.code == 0) {
                                    alert('操作成功', function(index) {
                                        vm.reload_BM();
                                        vm.reload_DJ();
                                        vm.reload_YK();
                                        vm_receipt_win.show_receipt_win = false;
                                    });
                                } else {
                                    alert(r.msg);
                                }
                            }
                        });
                    });
                }


            }
        },
        formBank: function(index, e) {
            var value = formatBankCard(this.receiptData.cardnos[index]);
            this.receiptData.cardnos[index] = value;
        },
        formMoney: function(index) {
            var value = this.receiptData.amount[index];
            value = value.replace(/,/g, "");
            value = formatNum(value);
            this.receiptData.amount[index] = value;
        },
        del: function(index, id, orderid) {
            var _this = this;
            console.log(index, id, orderid);
            confirm("确认删除凭证?", function() {
                if (vm.tab == "BM") {
                    $.ajax({
                        type: "POST",
                        url: "../finance/secrecydel",
                        data: {
                            "secrecyid": orderid,
                            "receiptid": id
                        },
                        success: function(r) {
                            if (r.code == 0) {
                                alert("删除凭证成功", function(index) {
                                    _this.payinfo.splice(index, 1);
                                    var inputData = _this.receiptData;
                                    var keys = Object.keys(inputData);
                                    keys.forEach(function(item) {
                                        if (inputData[item][index]) {
                                            inputData[item].splice(index, 1);
                                        }
                                    });
                                });
                            } else {
                                alert(r.msg);
                            }
                        }
                    });
                } else {
                    $.ajax({
                        type: "POST",
                        url: "../finance/receiptdel",
                        data: {
                            "orderid": orderid,
                            "receiptid": id
                        },
                        success: function(r) {
                            if (r.code == 0) {
                                alert("删除凭证成功", function(index) {
                                    _this.payinfo.splice(index, 1);
                                    var inputData = _this.receiptData;
                                    var keys = Object.keys(inputData);
                                    keys.forEach(function(item) {
                                        if (inputData[item][index]) {
                                            inputData[item].splice(index, 1);
                                        }
                                    });
                                });
                            } else {
                                alert(r.msg);
                            }
                        }
                    });
                }
            })
        },
        bankInfo: function(index) {
            var _this = this;
            if (!_this.receiptData.cardnos[index]) {
                return;
            }
            var card = _this.receiptData.cardnos[index].replace(/\s+/g, "");
            if (card.length >= 15) {
                getBankBin(card, function(err, data) {
                    if (!err) { // 没有错误的时候
                        var bankName = data.bankName;
                        _this.receiptData.banknames.splice(index, 1, bankName);
                    } else {
                        console.log(err);
                    }
                });
            }
        }
    }
});


// 用户信息弹窗
var vm_user_msg_win = new UserMsg();
