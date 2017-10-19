// 原模板

/**
<div v-show="show" class="mask" :class="{active:show}">
    <div class="float-win">
        <h4>
            <span>项目详细信息</span>
            <a href="javascript:void(0)" @click="closewin">
                <i class="fa fa-close"></i>
            </a>
        </h4>
        <ul class="win-nav">
            <li v-for="(value,index) in tabArr" :class="{active:(tab==(index+1))}">
                <a href="javascript:void(0)" @click="changeView(index+1)">{{value}}</a>
            </li>
        </ul>

        <!-- tab切换 内容 -->
        <div class="win-box">
            <!-- 项目基本信息 -->
            <div class="box-content" v-show="tab==&quot;1&quot;">
                <div class="box-content-left">
                    <label>
                        <span>项目名称：</span>
                        <input type="text" readonly v-model="msg.pjInfo.name">
                    </label>
                    <label>
                        <span>项目阶段：</span>
                        <input type="text" readonly v-if="msg.pjInfo.status === -1" value="反驳">
                        <input type="text" readonly v-else-if="msg.pjInfo.status === 0" value="待审核">
                        <input type="text" readonly v-else-if="msg.pjInfo.status === 1" value="已审核">
                        <input type="text" readonly v-else-if="msg.pjInfo.status === 10" value="暂停">
                        <input type="text" readonly v-else-if="msg.pjInfo.status === 20" value="预热">
                        <input type="text" readonly v-else-if="msg.pjInfo.status === 30" value="募集">
                        <input type="text" readonly v-else-if="msg.pjInfo.status === 40" value="交割">
                        <input type="text" readonly v-else-if="msg.pjInfo.status === -100" value="失败">
                    </label>
                    <label>
                        <span>团队人数：</span>
                        <input type="text" readonly v-model="msg.pjTeams.length">
                    </label>
                </div>
                <div class="box-content-right">
                    <label>
                        <span>项目标签：</span>
                        <input type="text" readonly v-model="msg.pjInfo.tab">
                    </label>
                    <label>
                        <span>注册资本：</span>
                        <input type="text" readonly v-model="formatAmount(msg.pjInfo.capital)">
                        <i>万元</i>
                    </label>
                    <label>
                        <span>创建者：</span>
                        <input type="text" readonly v-model="msg.pjInfo.creator">
                    </label>
                </div>
                <div class="box-content-bottom">
                    <label>
                        <span>项目简介：</span>
                        <textarea v-model="msg.pjInfo.brief" readonly></textarea>
                    </label>
                </div>
            </div>
            <!-- 融资需求 -->
            <div class="box-content" v-show ="tab==&quot;2&quot;" v-for="finacing in msg.pjFinacings">
                <div class="box-content-left">
                    <label>
                        <span>目标金额：</span>
                        <input type="text" readonly v-model="formatAmount(finacing.amount)">
                        <i>万元</i>
                    </label>
                    <label>
                        <span>起投金额：</span>
                        <input type="text" readonly v-model="formatAmount(finacing.minamount)">
                        <i>万元</i>
                    </label>
                    <label>
                        <span>募资期限：</span>
                        <input type="text" readonly v-model="finacing.days">
                        <i> 天</i>
                    </label>
                </div>
                <div class="box-content-right">
                    <label>
                        <span>拟出让出股份：</span>
                        <input type="text" readonly v-model="finacing.sellrate">
                        <i>%</i>
                    </label>
                    <label>
                        <span>最高目标金额：</span>
                        <input type="text" readonly v-model="formatAmount(finacing.maxamount)">
                        <i>万元</i>
                    </label>
                </div>
                <div class="box-content-bottom">
                    <label>
                        <span>资金用途：</span>
                        <textarea v-model="finacing.useto" readonly></textarea>
                    </label>
                </div>
            </div>
            <!-- 团队成员 -->
            <div class="box-table" v-show="tab==&quot;3&quot;">
                <table>
                    <tr>
                        <th></th>
                        <th>姓名</th>
                        <th>职位</th>
                        <th>联系方式</th>
                        <th>详情</th>
                    </tr>
                    <tr v-for="item in msg.pjTeams" :key="item.id">
                        <td>{{item.id}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.position}}</td>
                        <td>{{item.intro}}</td>
                        <td>
                            <a @click="showTeamDetail(item.id)" class="table-action" href="javascript:void(0)">
                                <i class="icon-search"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 项目材料 -->
            <div class="box-table" v-show="tab==&quot;4&quot;">
                <table>
                    <tr>
                        <th></th>
                        <th>上传者</th>
                        <th>材料类型</th>
                        <th>上传时间</th>
                        <th>详情</th>
                    </tr>
                    <tr v-for="item in msg.pjDocuments" :key="item.id">
                        <td>{{item.id}}</td>
                        <td>{{item.creator}}</td>
                        <td>{{item.type}}</td>
                        <td>{{item.createtime}}</td>
                        <td>
                            <a @click="showDocumentDetail(item.id)" class="table-action" href="javascript:void(0)">
                                <i class="icon-search"></i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
            <!-- 收款人信息 -->
            <div class="box-content" v-show="tab==&quot;5&quot;" v-for="receiver in msg.pjReceivers">
                <h5>收款人基础信息</h5>
                <div class="box-content-left">
                    <label>
                        <span>真实姓名：</span>
                        <input type="text" readonly v-model="receiver.realname">
                    </label>
                    <label>
                        <span>联系电话：</span>
                        <input type="text" readonly v-model="receiver.phone">
                    </label>
                </div>
                <div class="box-content-right">
                    <label>
                        <span>邮箱地址：</span>
                        <input type="text" readonly v-model="receiver.email">
                    </label>
                </div>
                <h5>收款人账号信息</h5>
                <div class="box-content-left">
                    <label>
                        <span>银行名称：</span>
                        <input type="text" readonly v-model="receiver.bankname">
                    </label>
                    <label>
                        <span>网点名称：</span>
                        <input type="text" readonly v-model="receiver.branch">
                    </label>
                </div>
                <div class="box-content-right">
                    <label>
                        <span>开户名称：</span>
                        <input type="text" readonly v-model="receiver.accname">
                    </label>
                    <label>
                        <span>银行卡号：</span>
                        <input type="text" readonly v-model="receiver.accno">
                    </label>
                </div>
            </div>
        </div>
    </div>
</div>

 */

var template = '<div v-show="show" class="mask" :class="{active:show}"><div class="float-win"><h4><span>项目详细信息</span><a href="javascript:void(0)" @click="closewin"><i class="fa fa-close"></i></a></h4><ul class="win-nav"><li v-for="(value,index) in tabArr" :class="{active:(tab==(index+1))}"><a href="javascript:void(0)" @click="changeView(index+1)">{{value}}</a></li></ul><!-- tab切换 内容 --><div class="win-box"><!-- 项目基本信息 --><div class="box-content" v-show="tab==&quot;1&quot;"><div class="box-content-left"><label><span>项目名称：</span><input type="text" readonly v-model="msg.pjInfo.name"></label><label><span>项目阶段：</span><input type="text" readonly v-if="msg.pjInfo.status === -1" value="反驳"><input type="text" readonly v-else-if="msg.pjInfo.status === 0" value="待审核"><input type="text" readonly v-else-if="msg.pjInfo.status === 1" value="已审核"><input type="text" readonly v-else-if="msg.pjInfo.status === 10" value="暂停"><input type="text" readonly v-else-if="msg.pjInfo.status === 20" value="预热"><input type="text" readonly v-else-if="msg.pjInfo.status === 30" value="募集"><input type="text" readonly v-else-if="msg.pjInfo.status === 40" value="交割"><input type="text" readonly v-else-if="msg.pjInfo.status === -100" value="失败"></label><label><span>团队人数：</span><input type="text" readonly v-model="msg.pjTeams.length"></label></div><div class="box-content-right"><label><span>项目标签：</span><input type="text" readonly v-model="msg.pjInfo.tab"></label><label><span>注册资本：</span><input type="text" readonly v-model="formatAmount(msg.pjInfo.capital)"><i>万元</i></label><label><span>创建者：</span><input type="text" readonly v-model="msg.pjInfo.creator"></label></div><div class="box-content-bottom"><label><span>项目简介：</span><textarea v-model="msg.pjInfo.brief" readonly></textarea></label></div></div><!-- 融资需求 --><div class="box-content" v-show ="tab==&quot;2&quot;" v-for="finacing in msg.pjFinacings"><div class="box-content-left"><label><span>目标金额：</span><input type="text" readonly v-model="formatAmount(finacing.amount)"><i>万元</i></label><label><span>起投金额：</span><input type="text" readonly v-model="formatAmount(finacing.minamount)"><i>万元</i></label><label><span>募资期限：</span><input type="text" readonly v-model="finacing.days"><i> 天</i></label></div><div class="box-content-right"><label><span>拟出让出股份：</span><input type="text" readonly v-model="finacing.sellrate"><i>%</i></label><label><span>最高目标金额：</span><input type="text" readonly v-model="formatAmount(finacing.maxamount)"><i>万元</i></label></div><div class="box-content-bottom"><label><span>资金用途：</span><textarea v-model="finacing.useto" readonly></textarea></label></div></div><!-- 团队成员 --><div class="box-table" v-show="tab==&quot;3&quot;"><table><tr><th></th><th>姓名</th><th>职位</th><th>联系方式</th><th>详情</th></tr><tr v-for="item in msg.pjTeams" :key="item.id"><td>{{item.id}}</td><td>{{item.name}}</td><td>{{item.position}}</td><td>{{item.intro}}</td><td><a @click="showTeamDetail(item.id)" class="table-action" href="javascript:void(0)"><i class="icon-search"></i></a></td></tr></table></div><!-- 项目材料 --><div class="box-table" v-show="tab==&quot;4&quot;"><table><tr><th></th><th>上传者</th><th>材料类型</th><th>上传时间</th><th>详情</th></tr><tr v-for="item in msg.pjDocuments" :key="item.id"><td>{{item.id}}</td><td>{{item.creator}}</td><td>{{item.type}}</td><td>{{item.createtime}}</td><td><a @click="showDocumentDetail(item.id)" class="table-action" href="javascript:void(0)"><i class="icon-search"></i></a></td></tr></table></div><!-- 收款人信息 --><div class="box-content" v-show="tab==&quot;5&quot;" v-for="receiver in msg.pjReceivers"><h5>收款人基础信息</h5><div class="box-content-left"><label><span>真实姓名：</span><input type="text" readonly v-model="receiver.realname"></label><label><span>联系电话：</span><input type="text" readonly v-model="receiver.phone"></label></div><div class="box-content-right"><label><span>邮箱地址：</span><input type="text" readonly v-model="receiver.email"></label></div><h5>收款人账号信息</h5><div class="box-content-left"><label><span>银行名称：</span><input type="text" readonly v-model="receiver.bankname"></label><label><span>网点名称：</span><input type="text" readonly v-model="receiver.branch"></label></div><div class="box-content-right"><label><span>开户名称：</span><input type="text" readonly v-model="receiver.accname"></label><label><span>银行卡号：</span><input type="text" readonly v-model="receiver.accno"></label></div></div></div></div></div>';

// 组件
Vue.component("detail-win-tpl", {
    template: template,
    data: function () {
        var _this = this;
        return {
            tab: "1", // 标记打开的是哪一个tab
            tabArr: ['项目基本信息', '融资需求', '团队成员', '项目材料', '收款人信息'],
        }
    },
    props: ["msg", "show"],
    methods: {
        formatAmount: function (val) {
            return val / 10000
        },
        changeView: function (view) {
            this.tab = view;
        },
        closewin: function () {
            this.$emit("close");
        },
        showTeamDetail: function (id) {
            this.$emit("team-detail", id);
        },
        showDocumentDetail: function (id) {
            this.$emit("document-detail", id);
        }
    }
});