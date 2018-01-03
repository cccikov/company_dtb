var vm = new Vue({
    el:"#wrap",
    data:{
        tab:1
    },
    methods:{
        changeTab:function(num){
            this.tab = num;
        }
    }
})