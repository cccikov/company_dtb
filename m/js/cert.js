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
        }
    }
});