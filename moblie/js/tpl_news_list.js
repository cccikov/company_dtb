Vue.component("tpl-news-list", {
    template: `
        <!-- 新闻资讯 -->
        <div class="news-list">
            <a href="###" class="news-item no-animation" @click="click" v-for="val in data">
                <!-- 资讯图片 -->
                <div class="news-img">
                    <img src="img/test/test02.png">
                </div>
                <!-- 资讯内容 -->
                <div class="news-content">
                    <!-- 资讯标题 -->
                    <p class="news-title">南方日报：顺德资本招商 引国内投资大咖抢滩</p>
                    <!-- 资讯摘要 -->
                    <p class="news-abstract">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim id est laborum.</p>
                    <p class="news-date">2017-08-28 &nbsp; 12:58</p>
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
    mounted: function () {
        var _this = this;
        Vue.nextTick(function () {
            _this.newimgarr = toArray(_this.$el.getElementsByTagName("img"));
            imgAllLoad(_this.newimgarr, function () {
                _this.$emit("imgload");
                _this.oldimgarr = _this.newimgarr.slice(0);
            });
        });
    },
    updated: function () {
        var _this = this;
        _this.newimgarr = toArray(_this.$el.getElementsByTagName("img"));
        imgAllLoad(different(_this.newimgarr, _this.oldimgarr), function () {
            _this.$emit("imgload");
            _this.oldimgarr = _this.newimgarr;
        });
    }
});

