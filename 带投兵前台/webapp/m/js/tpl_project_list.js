var oneDay = 86400000; // 一天毫秒数
Vue.component("tpl-project-list", {
    template: `
        <!-- 项目列表 -->
        <div class="project-list">
            <a class="project-item" v-for="(val , index) in data" :href="'/m/page/project_detail.html?id='+val.id" :class="{finish:val.status=='100',yr:val.status=='20',jg:val.status=='50',mj:val.status=='30',cz:val.status=='40'}" :key="val.id" :data-key="val.id">
                <!-- 项目图片 -->
                <div class="project-img">
                    <img v-if="val.pjDocumentEntities.SY" :src="val.pjDocumentEntities.SY[0].pic">
                    <div v-else class="img"></div>
                </div>
                <!-- 项目内容 -->
                <div class="project-content">
                    <!-- 标题 与 摘要 -->
                    <div class="project-major">
                        <!-- 标题 -->
                        <p class="project-title">{{val.name}}</p>
                        <!-- 摘要 -->
                        <p class="project-abstract">{{val.brief}}</p>
                    </div>
                    <!-- 其他信息 -->
                    <div class="project-info">
                        <!-- 融资目标 -->
                        <p>
                            <strong>目标</strong>
                            <span>{{changeMillion(val.pjFinacingEntity.amount)}}元</span>
                        </p>
                        <!-- 募集总额 -->
                        <p>
                            <strong>募集总额</strong>
                            <span>{{changeMillion(val.orderAmount)}}元</span>
                        </p>
                        <!-- 起投 -->
                        <p>
                            <strong>起投</strong>
                            <span>{{changeMillion(val.pjFinacingEntity.minamount)}}元</span>
                        </p>
                        <!-- 完成度 -->
                        <p>
                            <strong>完成度</strong>
                            <span>{{val.completePercent}}%</span>
                        </p>
                    </div>
                </div>
                <!-- 倒计时 -->
                <div class="project-limit-time" v-html="limithtmls[index]">
                    <p><span>--</span>天<span>--</span>时<span>--</span>分<span>--</span>秒</p>
                </div>
            </a>
        </div>
    `,
    data: function () {
        return {
            tplName: "项目列表模板",
            times: [], // 一个储存时间的对象
            limits: []
        }
    },
    props: ["data"],
    methods: {
        changeMillion: function (amount) {
            if (amount > 10000) {
                return amount / 10000 + "万";
            } else {
                return amount;
            }
        },
        onesecond: function () {
            this.limits.forEach(function (item, index, arr) {
                if (item != "nolimit") {
                    Vue.set(arr, index, item - 1000);
                }
            });
        },
        createTime: function () { // 创建times数据
            var _this = this;
            var data = _this.data;
            var limits = _this.limits = [];
            var times = _this.times = [];
            data.forEach(function (item, index) {
                var obj = {};
                obj.id = item.id; // 项目id
                obj.begin = new Date(item.pjbegindate).getTime(); // 阶段开始时间
                obj.yr = item.pjFinacingEntity.preheatdays; // 预热
                obj.mj = item.pjFinacingEntity.raisedays; // 募集
                obj.jg = item.pjFinacingEntity.deliverydays; // 交割
                var status = item.status;
                if (status == '100') {
                    obj.status = "finish";
                } else if (status == '20') {
                    obj.status = "yr";
                } else if (status == '50') {
                    obj.status = "jg";
                } else if (status == '30') {
                    obj.status = "mj";
                } else if (status == '40') {
                    obj.status = "cz";
                }

                if (obj[obj.status] != 0) {
                    var now = new Date().getTime();
                    var end = obj[obj.status] * oneDay + obj.begin;
                    obj.limit = end - now;
                } else {
                    obj.limit = "nolimit";
                }
                times.push(obj);

                limits.push(obj.limit);
            });
        },
        remain: function (retime) {
            if (retime == "nolimit") {
                return "<p><span>--</span>天<span>--</span>时<span>--</span>分<span>--</span>秒</p>"
            } else if (retime > 0) {
                var result = remaintime(retime);
                return "<p><span>" + result.day + "</span>天<span>" + result.hour + "</span>时<span>" + result.min + "</span>分<span>" + result.second + "</span>秒</p>";
            } else {
                return "<p>超时</p>";
            }
        }
    },
    computed: {
        limithtmls: function () {
            var _this = this;
            var htmlarr = [];
            _this.limits.forEach(function (item, index) {
                htmlarr[index] = _this.remain(item);
            });
            return htmlarr;
        }
    },
    watch: {
        data: function (newData, old) {
            this.createTime(); // 增加数据的时候再来一次
        }
    },
    mounted: function () {
        var _this = this;
        _this.$nextTick(function () {
            _this.createTime(); // 创建的是来一次
            _this.timer = setInterval(function () {
                _this.onesecond();
            }, 1000);
        });
    }
});


function ranInt(max, min) {
    if (min > max) {
        var mid = max;
        max = min;
        min = mid;
    }
    return parseInt(Math.random() * (max - min + 1) + min)
}

function remaintime(retime) {
    retime = retime / 1000;
    var reday = parseInt(retime / 60 / 60 / 24);
    var rehour = parseInt(retime / 60 / 60 % 24); //retime/1000/3600表示总共有这么多个小时，每够24个小时就是一天，余下的就是不够组成一天的小时数。
    var reminter = parseInt(retime / 60 % 60);
    var resecond = parseInt(retime % 60);
    return {
        day: reday,
        hour: rehour,
        min: reminter,
        second: resecond,
    }
}