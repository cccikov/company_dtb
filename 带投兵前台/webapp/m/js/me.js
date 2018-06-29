var vm = new Vue({
    // el: "#wrap",
    data: {
        tbuser: null
    },
    methods: {
        friends: function () {
            var obj = {
                "type": "friends"
            }
            appAction(obj);
        },
        getme: function () {
            $.get("/m/me", function (r) {
                var result = JSON.parse(r);
                vm.tbuser = result.tbuser;
                if(!vm.$el){
                    vm.$mount("#wrap");
                }
            });
        },
        logout: function () {
            var _this = this;
            $.ajax({
                url: "/m/logout",
                dataType: "json",
                success: function (r) {
                    console.log(r);
                    if (r.code == 0) {
                        // 成功退出
                        _this.tbuser = null;
                        document.documentElement.scrollTop = document.body.scrollTop = top;
                    }
                }
            })
        }
    },
    computed: {
        page: function () {
            return navActive();
        },
    }
});

vm.getme();