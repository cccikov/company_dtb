Vue.component("tpl-news-list", {
    template: `
        <!-- 新闻资讯 -->
        <div class="news-list">
            <a href="###" class="news-item no-animation" @click="click" v-for="val in data">
                <!-- 资讯内容 -->
                <div class="news-content">
                    <!-- 资讯标题 -->
                    <p class="news-title">{{val.title}}</p>
                    <!-- 资讯摘要 -->
                    <div class="news-abstract" v-html="val.content"></div>
                    <p class="news-date">{{val.createtime}}</p>
                </div>
            </a>
        </div>
    `,
    data: function () {
        return {
            tplName: "新闻列表模板",
            newimgarr: null,
            oldimgarr: null
        }
    },
    props: ["data"],
    methods: {
        click: listAnimation
    },
});

