var vm = new Vue({
    el: "#wrap",
    data: {
        projectListData: [{
            id: 1,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "javascript:void();",
            img: "./img/test/test02.png",
            percent: 50,
            status: "finish"
        }],
    },
    methods: {

    },
    computed: {
        page: function() {
            return 2;
        }
    }
});