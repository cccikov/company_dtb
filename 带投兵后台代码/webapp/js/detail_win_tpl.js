var template =
'<div v-show="show" class="mask" :class="{active:show}">'+
    '<div class="float-win">'+
        '<h4>'+
            '<span>{{title}}</span>'+
            '<a href="javascript:void(0)" @click="closewin">'+
                '<i class="fa fa-close"></i>'+
            '</a>'+
        '</h4>'+
        '<ul class="win-nav">'+
            '<li v-for="(value,index) in tabArr" :class="{active:(tab==(index+1))}">'+
                '<a href="javascript:void(0)" @click="changeView(index+1)">{{value}}</a>'+
            '</li>'+
        '</ul>'+
        '<!-- tab切换 内容 -->'+
        '<div class="win-box">'+
            '<!-- 项目基本信息 -->'+
            '<div class="box-content" v-show="tab==&quot;1&quot;">'+
                '<div class="box-content-left">'+
                    '<label>'+
                        '<span>项目名称：</span>'+
                        '<input type="text" readonly v-model="msg.pjInfo.name">'+
                    '</label>'+
                    '<label>'+
                        '<span>项目阶段：</span>'+
                        '<input type="text" readonly v-model="msg.pjInfo.statusDesc">'+
                    '</label>'+
                '</div>'+
                '<div class="box-content-right">'+
                    '<label><span>项目标签：</span><input type="text" readonly v-model="msg.pjInfo.tab"></label>'+
                    '<label><span>创建者：</span><input type="text" readonly v-model="msg.pjInfo.creator"></label>'+
                '</div>'+
                '<div class="box-content-bottom">'+
                    '<label>'+
                        '<span>项目简介：</span><textarea v-model="msg.pjInfo.brief" readonly></textarea>'+
                    '</label>'+
                '</div>'+
            '</div>'+
            '<!-- 融资需求 -->'+
            '<div class="box-content" v-show ="tab==&quot;2&quot;" v-for="finacing in msg.pjFinacings">'+
                '<div class="clearfix">'+
                    '<div class="box-content-left">'+
                        '<label><span>目标金额：</span><input type="text" readonly v-model="formatAmount(finacing.amount)"><i>万元</i></label>'+
                    '</div>'+
                    '<div class="box-content-right">'+
                        '<label><span>最高目标金额：</span><input type="text" readonly v-model="formatAmount(finacing.maxamount)"><i>万元</i></label>'+
                    '</div>'+
                '</div>'+
                '<div class="clearfix">'+
                    '<div class="box-content-left">'+
                        '<label><span>起投金额：</span><input type="text" readonly v-model="formatAmount(finacing.minamount)"><i>万元</i></label>'+
                    '</div>'+
                    '<div class="box-content-right">'+
                        '<label><span>最高投资金额：</span><input type="text" readonly v-model="formatAmount(finacing.pmaxamount)"><i>万元</i></label>'+
                    '</div>'+
                '</div>'+
                '<div class="clearfix">'+
                    '<div class="box-content-left">'+
                        '<label><span>保证金天数：</span><input type="text" readonly v-model="finacing.depositdays"><i>天</i></label>'+
                    '</div>'+
                    '<div class="box-content-right">'+
                        '<label><span>余额天数：</span><input type="text" readonly v-model="finacing.balancedays"><i>天</i></label>'+
                    '</div>'+
                '</div>'+
                '<div class="clearfix">'+
                    '<div class="box-content-left">'+
                        '<label><span>预热期限：</span><input type="text" readonly v-model="finacing.preheatdays"><i>天</i></label>'+
                        '<label><span>交割期限：</span><input type="text" readonly v-model="finacing.deliverydays"><i>天</i></label>'+
                    '</div>'+
                    '<div class="box-content-right">'+
                        '<label><span>募资期限：</span><input type="text" readonly v-model="finacing.raisedays"><i>天</i></label>'+
                    '</div>'+
                '</div>'+
                '<div class="box-content-bottom">'+
                    '<label><span>资金用途：</span><textarea v-model="finacing.useto" readonly></textarea></label>'+
                '</div>'+
            '</div>'+
            '<!-- 项目材料 -->'+
            '<div class="box-table" v-show="tab==&quot;3&quot;">'+
                '<table>'+
                    '<tr>'+
                        '<th></th>'+
                        '<th>上传者</th>'+
                        '<th>材料类型</th>'+
                        '<th>编号</th>'+
                        '<th>上传时间</th>'+
                        '<th>详情</th>'+
                    '</tr>'+
                    '<tr v-for="item in msg.pjDocuments" :key="item.id">'+
                        '<td>{{item.id}}</td>'+
                        '<td>{{item.creator}}</td>'+
                        '<td>{{item.typedes}}</td>'+
                        '<td>{{item.num}}</td>'+
                        '<td>{{item.createtime}}</td>'+
                        '<td><a class="table-action" target="_blank" :href="item.pic"><i class="icon-search"></i></a></td>'+
                    '</tr>'+
                '</table>'+
            '</div>'+
            '<!-- 收款人信息 -->'+
            '<div class="box-content" v-show="tab==&quot;4&quot;" v-for="receiver in msg.pjReceivers">'+
                '<h5>收款人基础信息</h5>'+
                '<div class="box-content-left">'+
                    '<label><span>真实姓名：</span><input type="text" readonly v-model="receiver.realname"></label>'+
                    '<label><span>联系电话：</span><input type="text" readonly v-model="receiver.phone"></label>'+
                '</div>'+
                '<div class="box-content-right">'+
                    '<label><span>邮箱地址：</span><input type="text" readonly v-model="receiver.email"></label>'+
                '</div>'+
                '<h5>收款人账号信息</h5>'+
                '<div class="box-content-left">'+
                    '<label><span>银行名称：</span><input type="text" readonly v-model="receiver.bankname"></label>'+
                    '<label><span>网点名称：</span><input type="text" readonly v-model="receiver.branch"></label>'+
                '</div>'+
                '<div class="box-content-right">'+
                    '<label><span>开户名称：</span><input type="text" readonly v-model="receiver.accname"></label>'+
                    '<label><span>银行卡号：</span><input type="text" readonly v-model="receiver.accno"></label>'+
                '</div>'+
            '</div>'+
            '<div class="box-content" v-show="tab==&quot;5&quot;" >'+
                '<div class="box-content-left">'+
                    '<label><span>原有限合伙人：</span><input type="text" readonly v-model="msg.pjInfo.lp"></label>'+
                    '<label><span>LP法大大编号：</span><input type="text" readonly v-model="msg.pjInfo.lpcustomerid"></label>'+
                '</div>'+
                '<div class="box-content-right">'+
                    '<label><span>普通合伙人：</span><input type="text" readonly v-model="msg.pjInfo.gp"></label>'+
                    '<label><span>GP法大大编号：</span><input type="text" readonly v-model="msg.pjInfo.gpcustomerid"></label>'+
                '</div>'+
                '<div class="box-content-left">'+
                    '<label><span>合伙企业名称：</span><input type="text" readonly v-model="msg.pjInfo.companyname"></label>'+
                    '<label><span>合伙企业出资额：</span><input type="text" readonly v-model="msg.pjInfo.capital"></label>'+
                '</div>'+
                '<div class="box-content-right">'+
                    '<label><span>合伙企业成立日期：</span><input type="text" readonly v-model="msg.pjInfo.establishmentdate"></label>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>';

// 组件
Vue.component("detail-win-tpl", {
    template: template,
    data: function () {
        var _this = this;
        return {
            tab: "1", // 标记打开的是哪一个tab
            tabArr: ['项目基本信息', '融资需求',  '项目材料', '收款人信息','合伙人信息'],
            title:this.name || "项目详细信息"
        }
    },
    props: ["msg", "show","name"],
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
        showDocumentDetail: function (id) {
            this.$emit("document-detail", id);
        }
    }
});

























// 组件 single-win-tpl
Vue.component("single-win-tpl", {
    template: '<div v-show="show" class="mask" :class="{active:show}"><div class="float-win" :style="winStyle"><h4><span>{{title}}</span><a href="javascript:void(0)" @click="closewin"><i class="fa fa-close"></i></a></h4><div class="box-content only"><slot></slot></div></div></div>',
    data: function () {
        var _this = this;
        return {
            title:this.name || ""
        }
    },
    props: ["show","name","winStyle"],
    methods: {
        closewin: function () {
            this.$emit("close");
        },
    }
});
