var orderid = getUrlParam("orderid");

var vm = new Vue({
	// el : "#wrap",
	data: {
		odOrderEntity: null,
		pjInfoEntity: null,
		platform_bankname: null,
		platform_accno: null,
		platform_accname: null
	},
	methods: {
		getdata: function () {
			$.get("/m/myProjectdetail?orderid=" + orderid, function (r) {
				var result = JSON.parse(r);
				vm.odOrderEntity = result.odOrderEntity;
				vm.pjInfoEntity = result.pjInfoEntity
				vm.platform_bankname = result.platform_bankname
				vm.platform_accno = result.platform_accno
				vm.platform_accname = result.platform_accname
				if (!vm.$el) { // 最好先判断一下有无挂载元素
					vm.$mount("#wrap");
				};
			});
		}
	}
});

vm.getdata();