// 模板
var vm_btn = new Vue({
    el:"#btns",
    methods:{
        btnFn1:function(){
            r = data;
            console.log(vm_win);
            vm_win.info = r.pjInfo;
            vm_win.teams = r.pjTeams;
            vm_win.documents = r.pjDocuments;
            vm_win.finacings = r.pjFinacings;
            vm_win.receivers = r.pjReceivers;
            if(!vm_win.$el){
                vm_win.$mount("#detail-win");
            };
            vm_win.show_win = true;
        }
    }
});




// vue弹窗实例1
var vm_win = new Vue({
    // el: "#detail-win",
    data: {
        tab: "tab1", // 标记打开的是哪一个tab
        show_win: false
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
    "pjReceivers": [],
    "code": 0,
    "pjFinacings": [],
    "pjTeams": [],
    "pjDetails": [
        {
            "content": " 奥术大师大所大所大所  ",
            "createtime": "2017-10-06 10:50:01",
            "creator": null,
            "id": 4,
            "pjid": 7
        }
    ],
    "pjDocuments": [],
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
