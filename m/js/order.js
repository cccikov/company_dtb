var pjid = getUrlParam("pjid");
var vm = new Vue({
    data: {
    	step: 1,
        amount: 5,
        checked:false,
    	pjInfo: {},
    	odOrder: {},
    	secrecy_ratio: {},
    	firstdeposit_ratio: {},
    	platform_bankname: {},
    	platform_accno: {},
    	platform_accname: {},
    	secrecy_amount: 0
    },
    methods: {
        getdata: function() {
            $.get("/m/getorderdata?pjid=" + pjid, function(r) {
                var result = JSON.parse(r);
                vm.pjInfo = result.pjInfo;
                vm.odOrder = result.odOrder;
                vm.secrecy_ratio = result.secrecy_ratio;
                vm.firstdeposit_ratio = result.firstdeposit_ratio;
                vm.platform_bankname = result.platform_bankname;
                vm.platform_accno = result.platform_accno;
                vm.platform_accname = result.platform_accname;
                vm.secrecy_amount = result.pjInfo.pjFinacingEntity.amount*result.secrecy_ratio;
                vm.amount = result.pjInfo.pjFinacingEntity.minamount/10000
                vm.$mount("#wrap");
            });
        },
        add: function() {
            this.amount += 10;
        },
        remove: function() {
            if (this.amount >= 10) {
                this.amount -= 10;
            } else {
                this.amount = 0;
            }
        },
        changeMillion:function(amount){
        	if(amount > 10000){
	   	   		 return  amount/10000+"万";
	   	   	 }else{
	   	   		 return amount;
	   	   	 }
        },
        unescape:function(str) {
        	 var arrEntities={'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
        	 return str.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];});
        	}
    }
});
vm.getdata();
