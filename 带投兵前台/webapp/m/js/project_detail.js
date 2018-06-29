var id = getUrlParam("id");
var vm = new Vue({
    // el: "#wrap",
    data: {
        projectListData: {},
        // 浮窗控制
        maskClass: [],
        maskClass2: [],
        contractClass: [],
        documentClass: [],
        riskClass: [],
        documentListClass: [],
    },
    methods: {
        getdata: function() {
            $.get("/m/getprojdetail?pjid=" + id, function(r) {
                var result = JSON.parse(r);
                vm.projectListData = result.pjInfoEntity;
                vm.$mount("#wrap");
            });
        },
        unescape: function(str) {
            if (!str) {
                return "";
            }
            var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
                return arrEntities[t];
            });
        },
        bookmark: function(id) {
            if (this.projectListData.userBookmark == null) {
                $.ajax({
                    type: "POST",
                    url: "/m/bookmarkProject",
                    data: {
                        "projid": id
                    },
                    success: function(r) {
                        var obj = eval('(' + r + ')');
                        if (obj.code == "500") {
                            alert(obj.msg)
                        } else {
                            vm.projectListData.userBookmark = [];
                        }
                    }
                });
            } else {
                $.ajax({
                    type: "POST",
                    url: "/m/unbookmarkProject",
                    data: {
                        "projid": id
                    },
                    success: function(r) {
                        var obj = eval('(' + r + ')');
                        if (obj.code == "500") {
                            alert(obj.msg)
                        } else {
                            vm.projectListData.userBookmark = null;
                        }
                    }
                });
            }
        },
        contract: function(type) {
            var projid = vm.projectListData.id;
            var orderid = vm.projectListData.userOrder == null ? "" : vm.projectListData.userOrder.id;
            $.ajax({
                type: "POST",
                url: "/contract/create",
                data: { "projid": projid, "orderid": orderid, "type": type },
                success: function(r) {
                    var result = eval('(' + r + ')');
                    if (result.code == "0") {
                        setTimeout("javascript:location.href='" + result.sign_url + "'", 2000);
                    } else {
                        if (result.error == "1") {
                            location.href = result.URL
                        } else {
                            alert("跳转合同签署界面失败，请刷新重新操作")
                        }
                    }
                }
            });
        },
        secrecypage: function(pjid){
        	location.href = "secrecy.html?pjid="+pjid;
        },
        show_document_list: function(bool) {
            if (!!bool) {
                this.maskClass2 = ["active"];
                this.documentListClass = ["active"];
            }else{
                this.maskClass2 = [];
                this.documentListClass = [];
            }
        },
        show_contract_tips: function(bool) {
            if (!!bool) {
                this.maskClass = ["active", "white-mask"];
                this.contractClass = ["active"];
            } else {
                this.maskClass = [];
                this.contractClass = [];
            }
        },
        show_document_tips: function(bool) {
            if (!!bool) {
                this.maskClass = ["active", "black-mask"];
                this.documentClass = ["active"];
            } else {
                this.maskClass = [];
                this.documentClass = [];
            }
        },
        show_risk_tips: function(bool) {
            if (!!bool) {
                this.maskClass = ["active", "black-mask"];
                this.riskClass = ["active"];
            } else {
                this.maskClass = [];
                this.riskClass = [];
            }
        }

    }, // methods
    computed: {
        page: function() {
            return 2;
        }
    },
    mounted: function() {
        var _this = this;
        Vue.nextTick(function() { // Vue初始化完成
            alinkAnimation();
        });
    },
});
vm.getdata();