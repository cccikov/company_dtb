var vm = new Vue({
    el: "#wrap",
    computed: {
        page: function() {
            return navActive();
        },
    }
});
