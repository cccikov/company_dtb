// 模板
var vm_btn = new Vue({
    el: "#btns",
    methods: {
        btnFn1: function () {
            r = data;
            vm_win.info = r.pjInfo;
            vm_win.teams = r.pjTeams;
            vm_win.documents = r.pjDocuments;
            vm_win.finacings = r.pjFinacings;
            vm_win.receivers = r.pjReceivers;
            if (!vm_win.$el) {
                vm_win.$mount("#win");
            };
            vm_win.show_win = true;
        }
    }
});







// vue弹窗实例1
var vm_win = new Vue({
    // el: "#win",
    data: {
        tab: "1", // 标记打开的是哪一个tab
        tabArr: ['项目基本信息', '融资需求', '团队成员', '项目材料', '收款人信息'],
        show_win: false,
    },
    methods: {
        formatAmount: function (val) {
            return val / 10000
        },
        changeView: function (view) {
            this.tab = view;
        },
        closewin: function () {
            this.show_win = !this.show_win;
        },
        showTeamWin: function (id) {
            $.get("../pjinfo/teaminfo/" + id, function (r) {
                vm_team_win.teaminfo = r.teaminfo;
                if (!vm_team_win.$el) {
                    vm_team_win.$mount("#team-win");
                };
                vm_team_win.show_team_win = true;
            });
        },
        showDocumentWin: function (id) {
            $.get("../pjinfo/documentinfo/" + id, function (r) {
                vm_document_win.documentinfo = r.documentinfo;
                if (!vm_document_win.$el) {
                    vm_document_win.$mount("#document-win");
                };
                vm_document_win.show_document_win = true;
            });
        }
    }
});



var data = {
    "pjReceivers": [
        {
            "realname": "你叫圣诞节"
        }
    ],
    "code": 0,
    "pjFinacings": [
        {
            amount: 100000,
            minamount: 100000000,
            days: 15,
            sellrate: "15%",
            maxamount: "100万",
            useto: "nothing"
        }
    ],
    "pjTeams": [
        {
            id: 123,
            name: "哈哈",
            position: "经理",
        }
    ],
    "pjDetails": [
        {
            "content": " 奥术大师大所大所大所  ",
            "createtime": "2017-10-06 10:50:01",
            "creator": null,
            "id": 4,
            "pjid": 7
        }
    ],
    "pjDocuments": [
        {
            id: 12312314123
        }
    ],
    "pjInfo": {
        "brief": "123123",
        "capital": 1231230000,
        "createtime": "2017-09-30 17:40:50",
        "creator": "admin",
        "id": 15,
        "name": "6456",
        "orderAmount": null,
        "pjDocumentEntities": null,
        "pjFinacingEntity": null,
        "pjReceiverEntity": null,
        "pjTeamEntities": null,
        "pjenddate": null,
        "status": 0,
        "statusDesc": null,
        "tabs": "12312",
        "updater": "admin",
        "updatetime": "2017-10-06 14:44:02"
    }
};
