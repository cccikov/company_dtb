var id = getUrlParam("id");
var vm = new Vue({
    // el: "#wrap",
    data: {
    	nwNewsEntity:null
    },
    methods: {
    	getdata : function() {
			$.get("/m/newsdetail/" + id, function(r) {
				var result = JSON.parse(r);
				vm.nwNewsEntity = result.nwNewsEntity;
				vm.$mount("#wrap");
			});
		}
    }
});

vm.getdata();