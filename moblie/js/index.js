var vm = new Vue({
    el: "#wrap",
    data: {
        // 项目列表
        projectListData: [{
            id: 1,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "###",
            img: "./img/test/test02.png",
            percent: 50,
            status: "jg"
        }, {
            id: 2,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "###",
            img: "./img/test/test02.png",
            percent: 50,
            status: "yr"
        }, {
            id: 3,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "###",
            img: "./img/test/test02.png",
            percent: 50,
            status: "mj"
        }],

        // 完成项目
        finishProjectListData: [{
            id: 1,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "###",
            img: "./img/test/test02.png",
            percent: 50,
            status: "finish"
        }, {
            id: 2,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "###",
            img: "./img/test/test02.png",
            percent: 50,
            status: "finish"
        }, {
            id: 3,
            title: "saas平台",
            abstract: "这是一个神奇的平台",
            link: "###",
            img: "./img/test/test02.png",
            percent: 50,
            status: "finish"
        }],

        // 新闻资讯
        newsData: [1, 23, 4]
    },
    computed:{
        page:function(){
            return navActive();
        }
    }
});