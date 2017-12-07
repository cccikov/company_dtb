var id = getUrlParam("id");
var vm = new Vue({
    // el: "#wrap",
    data: {
        projectListData: {},
    },
    methods: {
        getdata: function() {
            $.get("/m/getprojdetail?pjid=" + id, function(r) {
                var result = JSON.parse(r);
                vm.projectListData = result.pjInfoEntity;
                vm.$mount("#wrap");
            });
        },
        unescape:function(str) {
        	 var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        	 return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        	}
    },
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
