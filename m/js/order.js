var pjid = getUrlParam("pjid");
var vm = new Vue({
    el: "#wrap",
    data: {
        amount: 10, // 金额
        min: 5, // 最大值
        max: 15, // 最小值
        inputValue: null
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
    },
    computed: {
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
    },
});
