var vm = new Vue({
    el: "#wrap",
    data: {
        certified: true,
    },
    methods: {
        certify: function () {
            this.certified = false;
        }
    }
});