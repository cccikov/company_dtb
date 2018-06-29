var template =
'<div class="mask active" v-show="show" v-cloak>'+
    '<div class="float-win">'+
        '<h4><span>会员信息</span> <a @click="closewin" href="javascript:void(0)"><i class="fa fa-close"></i></a></h4>'+
        '<ul class="win-nav">'+
            '<li :class="{active:tab == &quot;1&quot;}"><a @click="changeView(&quot;1&quot;)" href="javascript:void(0)">基本信息</a></li>'+
            '<li :class="{active:tab == &quot;2&quot;}"><a @click="changeView(&quot;2&quot;)" href="javascript:void(0)">银行卡信息</a></li>'+
        '</ul>'+
        '<div class="win-box">'+
            '<div class="box-content" v-show="tab == &quot;1&quot;">'+
                '<!-- 左 -->'+
                '<div class="box-content-left">'+
                    '<label>'+
                        '<span>账号名：</span>'+
                        '<input type="text" readonly v-model="userinfo.tradername">'+
                    '</label>'+
                    '<label>'+
                        '<span>姓名：</span>'+
                        '<input type="text" readonly v-model="userinfo.username">'+
                    '</label>'+
                    '<label>'+
                        '<span>身份证：</span>'+
                        '<input type="text" readonly v-model="userinfo.idCard">'+
                    '</label>'+
                    '<label>'+
                        '<span>微信号：</span>'+
                        '<input type="text" readonly v-model="userinfo.wechar">'+
                    '</label>'+
                    '<label>'+
                        '<span>状态：</span>'+
                        '<input type="text" readonly v-model="userinfo.status">'+
                    '</label>'+
                    '<label>'+
                        '<span>省份：</span>'+
                        '<input type="text" readonly v-model="userinfo.province">'+
                    '</label>'+
                '</div>'+
                '<!-- 右 -->'+
                '<div class="box-content-right">'+
                     '<label>'+
                        '<span>手机：</span>'+
                        '<input type="text" readonly v-model="userinfo.mobile">'+
                    '</label>'+
                    '<label>'+
                        '<span>所属公司：</span>'+
                        '<input type="text" readonly v-model="userinfo.company">'+
                    '</label>'+
                    '<label>'+
                        '<span>邮箱：</span>'+
                        '<input type="text" readonly v-model="userinfo.email">'+
                    '</label>'+
                    '<label>'+
                        '<span>QQ号码：</span>'+
                        '<input type="text" readonly v-model="userinfo.qq">'+
                    '</label>'+
                    '<label>'+
                        '<span>会员类型：</span>'+
                        '<input type="text" readonly v-model="userinfo.memberType">'+
                    '</label>'+
                    '<label>'+
                        '<span>城市：</span>'+
                        '<input type="text" readonly v-model="userinfo.city">'+
                    '</label>'+
                '</div>'+
                '<!-- 底 -->'+
                '<div class="box-content-bottom">'+
                    '<label>'+
                        '<span>地址：</span>'+
                        '<input type="text" style= "width:400px;" readonly v-model="userinfo.address">'+
                    '</label>'+
                    '<label>'+
                        '<span>备注：</span>'+
                        '<textarea readonly v-model="userinfo.remark"></textarea>'+
                    '</label>'+
                '</div>'+
            '</div>'+
            '<div class="box-table" v-show="tab == &quot;2&quot;">'+
                '<table>'+
                    '<tr>'+
                        '<th>账号</th>'+
                        '<th>银行名称</th>'+
                        '<th>开户名称</th>'+
                        '<th>网点名称</th>'+
                    '</tr>'+
                    '<tr v-for="item in carinfos" :key="item.cardNo">'+
                        '<td>{{item.cardNo}}</td>'+
                        '<td>{{item.bankName}}</td>'+
                        '<td>{{item.accountName}}</td>'+
                        '<td>{{item.dotDame}}</td>'+
                     '</tr>'+
                '</table>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>'
;
// 组件
Vue.component("member-tpl", {
    template:template,
    props: ["userinfo", "show","carinfos","tab"],
    methods:{
        closewin: function() {
            this.$emit("closewin");
        },
        changeView: function (view) {
            this.$emit("change-view",view);
        },
    }
});


function UserMsg(){
    var vm_user_msg_win = new Vue({
        // el:"#user-msg",
        data: {
            show_win: false,
            userinfo: null,
            carinfos: null,
            tab:"1"
        },
        methods: {
            closewin: function() {
                this.show_win = !this.show_win;
            },
            changeView: function (view) {
                this.tab = view;
            },
            showWinFn:function(){
                if (!this.$el) {
                    this.$mount("#user-msg");
                };
                this.tab = "1";
                this.show_win = true;
            }
        }
    });
    return vm_user_msg_win;
}

/**
 * 使用
 * 在页面引用的js中调用
    // 用户信息弹窗
    var vm_user_msg_win = new UserMsg();
 */

function showUser(userId) {
    var successsTimes = 0; // 标记ajax成功次数 , 2次才打开弹窗
    $.get("/gl/tbuser/userinfo/" + userId, function(r) {
        vm_user_msg_win.userinfo = r.tbuserinfo;
        successsTimes ++;
        open();
    });
    $.get("/gl/tbuser/cardinfo/" + userId, function(r) {
        vm_user_msg_win.carinfos = r.cardinfo;
        successsTimes ++;
        open();
    });
    function open(){
        if(successsTimes<2){
            return ;
        }
        vm_user_msg_win.showWinFn();
    }
}









// <div class="mask active" v-show="show_win" v-cloak>
//     <div class="float-win">
//         <h4><span>会员信息</span> <a @click="closewin" href="javascript:void(0)"><i class="fa fa-close"></i></a></h4>
//         <ul class="win-nav">
//             <li :class="{active:tab == &quot;1&quot;}"><a @click="changeView(&quot;1&quot;)" href="javascript:void(0)">基本信息</a></li>
//             <li :class="{active:tab == &quot;2&quot;}"><a @click="changeView(&quot;2&quot;)" href="javascript:void(0)">银行卡信息</a></li>
//         </ul>
//         <div class="win-box">
//             <div class="box-content" v-show="tab == &quot;1&quot;">
//                 <!-- 左 -->
//                 <div class="box-content-left">
//                     <label>
//                         <span>账号名：</span>
//                         <input type="text" readonly v-model="userinfo.tradername">
//                     </label>
//                     <label>
//                         <span>姓名：</span>
//                         <input type="text" readonly v-model="userinfo.username">
//                     </label>
//                     <label>
//                         <span>身份证：</span>
//                         <input type="text" readonly v-model="userinfo.idCard">
//                     </label>
//                     <label>
//                         <span>微信号：</span>
//                         <input type="text" readonly v-model="userinfo.wechar">
//                     </label>
//                     <label>
//                         <span>状态：</span>
//                         <input type="text" readonly v-model="userinfo.status">
//                     </label>
//                     <label>
//                         <span>省份：</span>
//                         <input type="text" readonly v-model="userinfo.province">
//                     </label>
//                 </div>
//                 <!-- 右 -->
//                 <div class="box-content-right">
//                      <label>
//                         <span>手机：</span>
//                         <input type="text" readonly v-model="userinfo.mobile">
//                     </label>
//                     <label>
//                         <span>所属公司：</span>
//                         <input type="text" readonly v-model="userinfo.company">
//                     </label>
//                     <label>
//                         <span>邮箱：</span>
//                         <input type="text" readonly v-model="userinfo.email">
//                     </label>
//                     <label>
//                         <span>QQ号码：</span>
//                         <input type="text" readonly v-model="userinfo.qq">
//                     </label>
//                     <label>
//                         <span>会员类型：</span>
//                         <input type="text" readonly v-model="userinfo.memberType">
//                     </label>
//                     <label>
//                         <span>城市：</span>
//                         <input type="text" readonly v-model="userinfo.city">
//                     </label>
//                 </div>
//                 <!-- 底 -->
//                 <div class="box-content-bottom">
//                     <label>
//                         <span>地址：</span>
//                         <input type="text" style= "width:400px;" readonly v-model="userinfo.address">
//                     </label>
//                     <label>
//                         <span>备注：</span>
//                         <textarea readonly v-model="userinfo.remark"></textarea>
//                     </label>
//                 </div>
//             </div>
//             <div class="box-table" v-show="tab == &quot;2&quot;">
//                 <table>
//                     <tr>
//                         <th>账号</th>
//                         <th>银行名称</th>
//                         <th>开户名称</th>
//                         <th>网点名称</th>
//                     </tr>
//                     <tr v-for="item in carinfos" :key="item.cardNo">
//                         <td>{{item.cardNo}}</td>
//                         <td>{{item.bankName}}</td>
//                         <td>{{item.accountName}}</td>
//                         <td>{{item.dotDame}}</td>
//                      </tr>
//                 </table>
//             </div>
//         </div>
//     </div>
// </div>