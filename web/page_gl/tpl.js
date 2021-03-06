// 模板
var vm_btn = new Vue({
    el: "#btns",
    methods: {
        btnFn1: function () {
            r = data;
            vm_win.msg = r;
            if (!vm_win.$el) {
                vm_win.$mount("#win");
            };
            vm_win.show_win = true;
        }
    }
});


var dataEmpty = {
    "pjReceivers": [
       
    ],
    "code": 0,
    "pjFinacings": [
      
    ],
    "pjTeams": [
      
    ],
    "pjDetails": [],
    "pjDocuments": [
        
    ],
    "pjInfo": {
        
    }
};




// vue弹窗实例1
var vm_win = new Vue({
    // el: "#win",
    data: {
        tab: "1", // 标记打开的是哪一个tab
        tabArr: ['项目基本信息', '融资需求', '团队成员', '项目材料', '收款人信息'],
        show_win: false,
        msg:dataEmpty
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
            console.log(id);
        },
        showDocumentWin: function (id) {
            console.log(id);
        }
    }
});











































































































































var data = {
    "pjReceivers": [
        {
            "accname": "",
            "accno": "6227003115242001367",
            "bankname": "中国建设银行",
            "branch": "佛山三水支行",
            "email": "2654510350@qq.com",
            "id": 17,
            "phone": "15814463257",
            "pjid": 28,
            "realname": "李元宵"
        }
    ],
    "code": 0,
    "pjFinacings": [
        {
            "amount": 1000000,
            "days": null,
            "id": 23,
            "maxamount": 1000000,
            "minamount": 50000,
            "pjid": 28,
            "sellrate": 10,
            "useto": ""
        }
    ],
    "pjTeams": [
        {
            "id": 71,
            "intro": "曾创立中国最顶级的电影密室逃脱，具有5年以上线下娱乐开发及经营经验",
            "name": "周志光",
            "pic": "/upload/project/team/1843179b-2d78-4d70-aa58-58c5a2c567a4_1.jpg",
            "pjid": 28,
            "position": "创始人"
        },
        {
            "id": 70,
            "intro": "曾创立中国最顶级的电影密室逃脱，具有5年以上线下娱乐开发及经营经验",
            "name": "谭艳红",
            "pic": "/upload/project/team/37c2f1a8-a06e-4da7-899d-5a06e8a8436b_2.jpg",
            "pjid": 28,
            "position": "副总经理"
        },
        {
            "id": 69,
            "intro": "曾创立中国最顶级的电影密室逃脱，具有5年以上线下娱乐开发及经营经验",
            "name": "李元宵",
            "pic": "/upload/project/team/dea7a8dc-6001-47c0-a61f-263cce89de39_3.jpg",
            "pjid": 28,
            "position": "总经理"
        },
        {
            "id": 68,
            "intro": "曾创立中国最顶级的电影密室逃脱，具有5年以上线下娱乐开发及经营经验",
            "name": "刘甜甜",
            "pic": "/upload/project/team/f2282faf-88b2-4706-a6c4-809633a5ad60_4.jpg",
            "pjid": 28,
            "position": "行政总监"
        }
    ],
    "pjDetails": [],
    "pjDocuments": [
        {
            "createtime": "2017-10-14 16:40:31",
            "creator": "admin",
            "id": 90,
            "pic": "/upload/project/team/4c3e3306-39e9-4a78-9e67-67f2528351ae_p1.jpg",
            "pjid": 28,
            "type": "YR"
        },
        {
            "createtime": "2017-10-14 14:28:51",
            "creator": "admin",
            "id": 68,
            "pic": "/upload/project/team/0bed1bb1-5887-4cce-a0d1-a0140aa53657_xq9.jpg",
            "pjid": 28,
            "type": "XQ"
        },
        {
            "createtime": "2017-10-14 14:28:41",
            "creator": "admin",
            "id": 67,
            "pic": "/upload/project/team/b0c74210-1e4c-4e4f-9152-67b6e030449c_a6.jpg",
            "pjid": 28,
            "type": "LOGO"
        },
        {
            "createtime": "2017-10-14 14:27:41",
            "creator": "admin",
            "id": 66,
            "pic": "/upload/project/team/d62d51f4-480b-40ba-b3d7-9fb795ea0265_xq.jpg",
            "pjid": 28,
            "type": "JH"
        }
    ],
    "pjInfo": {
        "brief": "感谢您对石门橘农的支持，您将获得价值42.9元的5斤装石门蜜橘鲜果1箱，果园现采。",
        "capital": 1000000,
        "createtime": "2017-10-14 14:26:01",
        "creator": "admin",
        "id": 28,
        "name": "来自“柑橘之乡”的自然味道",
        "orderAmount": null,
        "pjDocumentEntities": null,
        "pjFinacingEntity": null,
        "pjReceiverEntity": null,
        "pjTeamEntities": null,
        "pjenddate": "2017-11-13 14:29:38",
        "status": 20,
        "statusDesc": "预热",
        "tabs": "柑橘",
        "updater": "admin",
        "updatetime": "2017-10-14 14:29:38"
    }
};

