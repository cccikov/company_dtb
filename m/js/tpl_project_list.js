Vue.component("tpl-project-list", {
    template: `
        <!-- 项目列表 -->
        <div class="project-list little">
            <a class="project-item no-animation" @click="click" v-for="(val , index) in data" :href="'/m/page/project_detail.html?id='+val.id" :class="{finish:val.status=='100',yr:val.status=='20',jg:val.status=='50',mj:val.status=='30',cz:val.status=='40'}" :key="val.id" :data-key="val.id">
                <!-- 项目图片 -->
                <div class="project-img">
                    <img v-if="val.pjDocumentEntities.LOGO" :src="val.pjDocumentEntities.LOGO.pic">
                </div>
                <!-- 项目内容 -->
                <div class="project-content">
                    <!-- 标题 与 进度 -->
                    <div class="project-major">
                        <!-- 标题 -->
                        <p class="project-title">{{val.name}}</p>
                        <!-- 摘要 -->
                        <p class="project-abstract">{{val.brief}}</p>
                        <!-- 进度 -->
                        <div class="item-line">
                            <span>{{val.completePercent}}%</span>
                            <div class="item-percent" :style="{height:val.completePercent+'%'}"></div>
                        </div>
                    </div>
                    <!-- 其他信息 -->
                    <div class="project-info">
                        <!-- 融资目标 -->
                        <span>{{changeMillion(val.pjFinacingEntity.amount)}}元</span>
                        <!-- 已众筹 -->
                        <span>{{changeMillion(val.orderAmount)}}元</span>
                        <!-- 剩余时间 -->
                        <span>{{val.daysBetween}}天</span>
                        <!-- 出让股份 -->
                        <span>{{val.pjFinacingEntity.sellrate}}%</span>
                    </div>
                </div>
            </a>
        </div>
    `,
    data: function () {
        return {
            tplName: "项目列表模板",
            newimgarr: null,
            oldimgarr: null
        }
    },
    props: ["data"],
    methods: {
        click: listAnimation,
        changeMillion:function(amount){
        	if(amount > 10000){
	   	   		 return  amount/10000+"万";
	   	   	 }else{
	   	   		 return amount;
	   	   	 }
        }
    },
});