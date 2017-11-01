Vue.component("tpl-project-list", {
    template: `
        <!-- 项目列表 -->
        <div class="project-list little">
            <a class="project-item no-animation" @click="click" v-for="val in data" :href="val.link" :class="{finish:val.status=='finish',yr:val.status=='yr',jg:val.status=='jg',mj:val.status=='mj',cz:val.status=='cz'}" :key="val.id" :data-key="val.id">
                <!-- 项目图片 -->
                <div class="project-img">
                    <img :src="val.img">
                </div>
                <!-- 项目内容 -->
                <div class="project-content">
                    <!-- 标题 与 进度 -->
                    <div class="project-major">
                        <!-- 标题 -->
                        <p class="project-title">{{val.title}}</p>
                        <!-- 摘要 -->
                        <p class="project-abstract">{{val.abstract}}</p>
                        <!-- 进度 -->
                        <div class="item-line">
                            <span>{{val.percent}}%</span>
                            <div class="item-percent" :style="{height:val.percent+'%'}"></div>
                        </div>
                    </div>
                    <!-- 其他信息 -->
                    <div class="project-info">
                        <!-- 融资目标 -->
                        <span>1000万</span>
                        <!-- 已众筹 -->
                        <span>720万</span>
                        <!-- 剩余时间 -->
                        <span>42天</span>
                        <!-- 出让股份 -->
                        <span>10%</span>
                    </div>
                </div>
            </a>
        </div>
    `,
    data: function () {
        return {
            tplName: "项目列表模板"
        }
    },
    props: ["data"],
    methods: {
        click: listAnimation
    }
});