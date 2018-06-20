/* 使用插件 */
Vue.use(validate);

var vm = new Vue({
    el: "#wrap",
    data: {
        certified: false,
        type: "select",
        cardid: 0
    },
    methods: {
        certify: function () {
            this.certified = false;
        },
        change_type: function (type) {
            this.type = type;
            this.clearerror(); // 清除验证错误
        },
        bankCardInput: function (e) {
            var el = e.currentTarget;
            el.value = this.formatBankCard(el.value);
        },
        getCode: function () {
            if (this.type == "select") {
                this.manual("name|phone|id|font|back");
                var result = this.group("name|phone|id|font|back");
            } else if (this.type == "add") {
                this.manual("name|phone|id|font|back|cardno|bank|bankadd");
                var result = this.group("name|phone|id|font|back|cardno|bank|bankadd");
            }

            if (result) {
                alert("获取验证码");
            } else {
                return
            }
        },
        selectCard: function (cardid) {
            this.cardid = cardid;
        },
        formatBankCard: function (card, spacing) { // 格式化银行卡
            card = String(card);
            card = card.replace(/\s/g, "");
            var len = card.length;
            var spacing = spacing || 4;
            var arr = [];
            var n = 0;
            while (n < len) {
                arr.push(card.slice(n, n + spacing));
                n += spacing;
            };
            return arr.join(" ");
        }
    }
});