$(function() {
    $("#jqGrid").jqGrid({
        url: '../nwnews/list',
        datatype: "json",
        colModel: [
            { label: 'id', name: 'id', index: 'id', width: 50, key: true },
            { label: '标题', name: 'title', index: 'title', width: 80 },
            //{ label: '内容', name: 'content', index: 'content', width: 80 },
            { label: '发布者', name: 'creator', index: 'creator', width: 80 },
            { label: '发布时间', name: 'createtime', index: 'createtime', width: 80 },
            { label: '文章栏目', name: 'sortname', index: 'sortname', width: 80 },
        ],
        viewrecords: true,
        height: 385,
        rowNum: 10,
        rowList: [10, 30, 50],
        rownumbers: true,
        rownumWidth: 25,
        autowidth: true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader: {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames: {
            page: "page",
            rows: "limit",
            order: "order"
        },
        gridComplete: function() {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x": "hidden" });
        }
    });
});

var vm = new Vue({
    el: '#rrapp',
    data: {
        showList: true,
        title: null,
        nwNews: {
            sortid: null,
            sortname: null,
            pjid: null,
            pjname: null
        },
    },
    methods: {
        query: function() {
            vm.reload();
        },
        add: function() { // 新增
            vm.showList = false;
            vm.title = "新增";
            vm.nwNews = { // 以下这些变量不能空
                sortid: null,
                sortname: null,
                pjid: null,
                pjname: null
            };
            vm.getMenu();
            vm.getProjectMenu();

        },
        update: function(event) { // 修改
            var id = getSelectedRow();
            if (id == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";
            vm.getInfo(id, function(sortid, pjid) {
                vm.getMenu(sortid);
                vm.getProjectMenu(pjid);
            }); // getMenu设置默认值 , 就需要栏目id才可以 , 所以作为getInfo方法的回调函数执行
        },
        saveOrUpdate: function(event) {
            var url = vm.nwNews.id == null ? "../nwnews/save" : "../nwnews/update";
            vm.nwNews.content = window.encodeURI(getUeditorContent());
            $.ajax({
                type: "POST",
                url: url,
                contentType: "application/json",
                data: JSON.stringify(vm.nwNews),
                success: function(r) {
                    if (r.code === 0) {
                        alert('操作成功', function(index) {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        del: function(event) {
            var ids = getSelectedRows();
            if (ids == null) {
                return;
            }

            confirm('确定要删除选中的记录？', function() {
                $.ajax({
                    type: "POST",
                    url: "../nwnews/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ids),
                    success: function(r) {
                        if (r.code == 0) {
                            alert('操作成功', function(index) {
                                $("#jqGrid").trigger("reloadGrid");
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        reload: function(event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                page: page
            }).trigger("reloadGrid");
        },

        getInfo: function(id, callback) { // 获取这个新闻的内容
            var _this = this;
            $.get("../nwnews/info/" + id, function(r) {
                _this.nwNews = r.nwNews;
                UE.getEditor('editor').setContent(vm.nwNews.content);
                callback && callback(_this.nwNews.sortid, _this.nwNews.pjid); // 回调函数 , 传入参数为这个栏目id , 回调函数可以是需要这个新闻id的方法(比如带参数的getMenu)
            });
        },

        /**
         * 菜单选择流程
         *
         * 点击新增 - 触发add - 触发无参数getMenu创建菜单树
         * 点击input - 触发menuTree - 打开菜单树
         * 点击确认按钮 - 触发btn1事件 - 赋值到vm.nwNews中
         *
         * 点击修改 - 触发update - 获取这个新闻内容(主要是要新闻id) - 触发带'栏目id'参数的getMenu - 创建菜单树以及设置默认值
         */

        // input 点击触发这个事件
        menuTree: function() {
            layer.open({ // 打开弹窗
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择菜单",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#menuLayer"),
                btn: ['确定', '取消'],
                btn1: function(index) { // 点击确认按钮是
                    var node = ztree.getSelectedNodes(); // 获取你选择的项
                    //选择菜单菜单
                    vm.nwNews.sortid = node[0].id; // 单选 , 直接去第一个值的id和name
                    vm.nwNews.sortname = node[0].name;
                    if (vm.nwNews.sortid != "XMGG") { // 若不是项目公告的时候
                        Vue.set(vm.nwNews, 'pjid', null);
                        Vue.set(vm.nwNews, 'pjname', null);
                    }
                    layer.close(index); // 关闭弹窗
                }
            });
        },
        getMenu: function(sortid) {
            //加载菜单树
            $.get("../nwsort/select", function(r) { // 获取选择列表
                ztree = $.fn.zTree.init($("#menuTree"), setting, r.menuList); // 生成菜单tree
                if (sortid) { // 设置默认值 这是修改的时候使用的 , 传入栏目id的时候
                    var node = ztree.getNodeByParam("id", sortid); // 选择节点中id值为 sortid 的节点
                    ztree.selectNode(node);
                    vm.nwNews.sortname = node.name;
                }
            });
        },


        getProjectMenu: function(pjid) { // 生成菜单
            //加载菜单树
            $.get("../pjinfo/select", function(r) {
                ptree = $.fn.zTree.init($("#projectTree"), setting, r.menuList);
                if (pjid) {
                    // 默认值
                    var node = ptree.getNodeByParam("id", pjid);
                    ptree.selectNode(node);
                    Vue.set(vm.nwNews, 'pjname', node.name);
                }
            });
        },
        projectTree: function() { // 点击触发
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择菜单",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#projectLayer"),
                btn: ['确定', '取消'],
                btn1: function(index) {
                    var node = ptree.getSelectedNodes();
                    //选择上级菜单
                    Vue.set(vm.nwNews, 'pjid', node[0].id);
                    Vue.set(vm.nwNews, 'pjname', node[0].name);
                    layer.close(index);
                }
            });
        },
    },
});


var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "menuId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url: "nourl"
        }
    }
};

var ztree, ptree;


var testData = {
    "menuList": [{
        "icon": "fa fa-cog",
        "list": null,
        "menuId": 1,
        "name": "系统管理",
        "open": null,
        "orderNum": 0,
        "parentId": -1,
        "parentName": null,
        "perms": null,
        "type": 0,
        "url": null
    }, {
        "icon": "fa fa-file-text-o",
        "list": null,
        "menuId": 29,
        "name": "系统日志",
        "open": null,
        "orderNum": 7,
        "parentId": -1,
        "parentName": null,
        "perms": "sys:log:list",
        "type": 1,
        "url": "sys/log.html"
    }, {
        "icon": null,
        "list": null,
        "menuId": 0,
        "name": "一级菜单",
        "open": true,
        "orderNum": null,
        "parentId": -1,
        "parentName": null,
        "perms": null,
        "type": null,
        "url": null
    }],
    "code": 0
}
