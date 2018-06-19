/* 使用插件 */
Vue.use(validate);

var vm = new Vue({
    el: "#wrap",
    data: {
        certified: false,
        type: "add"
    },
    methods: {
        certify: function () {
            this.certified = false;
        },
        change_type: function (type) {
            this.type = type;
        },
        formatBankCard: function (e) {
            var el = e.currentTarget;
            console.log(e);
            // formatBankCard();
        }
    }
});

function formatBankCard(card, spacing) {
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