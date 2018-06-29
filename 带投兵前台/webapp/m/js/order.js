var pjid = getUrlParam("pjid");
var vm = new Vue({
    // el: "#wrap",
    data: {
        amount: 0, // 金额
        min: 0, // 最大值
        max: 0, // 最小值
        inputValue: null,
        projectListData:{},
        secrecy_ratio : null,
        firstdeposit_ratio : null,
        subscribe_ratio : null,
        platform_bankname : null,
        platform_accno : null,
        platform_accname : null,
        odOrder : null,
        ordercount : null
    },
    methods: {
        add: function() {
            var _this = this;
            _this.amount++;
            if (_this.amount > _this.max) {
                _this.amount = _this.max;
            }
            _this.inputValue = _this.amount;
        },
        minus: function() {
            var _this = this;
            _this.amount--;
            if (_this.amount < 0) {
                _this.amount = 0;
            }
            if (_this.amount < _this.min) {
                _this.amount = _this.min;
            }
            _this.inputValue = _this.amount;
        },
        inputing: function() {
            var _this = this;
            var val = _this.inputValue;
            var reg = /^\d+$/.test(val);
            if (!reg) {
                console.log("请输入正整数");
                return false;
            }

            val = Number(val);
            var range = (val >= _this.min && val <= _this.max);
            if (!range) {
                console.log("不在范围内(" + _this.min + "万~" + _this.max + "万)");
                return false;
            }

            _this.amount = _this.inputValue = val;
        },
        createorder: function(){
        	var projid = vm.projectListData.id;
        	var amount = vm.amount;
        	$.ajax({
                type: "POST",
                url: "/m/createorder",
                data:{"projid":projid,"amount":amount},
                success: function(r){
                    var result = eval('('+r+')');
                    location.href = "success.html?r="+r+"&type=create&id="+projid
                }
            });
        },
        raiseorder: function(){
        	var projid = vm.projectListData.id;
        	var amount = vm.amount;
        	$.ajax({
                type: "POST",
                url: "/m/raiseorder",
                data:{"projid":projid,"amount":amount},
                success: function(r){
                    var result = eval('('+r+')');
                    location.href = "success.html?r="+r+"&type=raise"
                }
            });
        }
    },
    computed: {
       
        offerToBuy: function() { // 认购费
            var _this = this;
            var offerToBuy = _this.amount * 100; // 1% * 万元
            if (offerToBuy >= 10000) {
                offerToBuy = offerToBuy / 10000;
                return offerToBuy.toLocaleString() + " 万元";
            } else {
                return offerToBuy.toLocaleString() + " 元";
            }
        },
        deposit: function() { // 意向保证金
            var _this = this;
            var deposit = _this.amount * 2000; // 20% * 万元
            if (deposit >= 10000) {
                deposit = deposit / 10000;
                return deposit.toLocaleString() + " 万元";
            } else {
                return deposit.toLocaleString() + " 元";
            }
        },
        remain: function() { // 意向保证金
            var _this = this;
            var remain = _this.amount * 8000; // 20% * 万元
            if (remain >= 10000) {
                remain = remain / 10000;
                return remain.toLocaleString() + " 万元";
            } else {
                return remain.toLocaleString() + " 元";
            }
        },
        sum: function() {
            var _this = this;
            var deposit = _this.amount * 2000; // 20% * 万元
            var offerToBuy = _this.amount * 100; // 1% * 万元
            var sum = deposit + offerToBuy;
            return sum.toLocaleString()
        },
        canclick: function() {
            return this.inputValue === this.amount;
        }
    },
    mounted: function() {
        var _this = this;
        Vue.nextTick(function() {
            _this.inputValue = _this.amount;
        });
    }
});

$.get("/m/orderpage?pjid=" + pjid, function(r) {
    var result = JSON.parse(r);
    vm.projectListData = result.pjInfo;
    vm.secrecy_ratio = result.secrecy_ratio;
    vm.firstdeposit_ratio = result.firstdeposit_ratio;
    vm.subscribe_ratio = result.subscribe_ratio;
    vm.platform_bankname = result.platform_bankname;
    vm.platform_accno = result.platform_accno;
    vm.platform_accname = result.platform_accname;
    vm.odOrder = result.odOrder;
    vm.ordercount = result.ordercount;
    vm.amount = result.pjInfo.pjFinacingEntity.minamount/10000;
    vm.min = result.pjInfo.pjFinacingEntity.minamount/10000;
    vm.max = result.pjInfo.pjFinacingEntity.pmaxamount/10000;
    vm.$mount("#wrap");
});
