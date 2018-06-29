//jqGrid的配置信息
$.jgrid.defaults.width = 1000;
$.jgrid.defaults.responsive = true;
$.jgrid.defaults.styleUI = 'Bootstrap';

//工具集合Tools
window.T = {};

// 获取请求参数
// 使用示例
// location.href = http://localhost:8080/index.html?id=123
// T.p('id') --> 123;
var url = function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
T.p = url;

//全局配置
$.ajaxSetup({
    dataType: "json",
    cache: false
});

//重写alert
window.alert = function(msg, callback) {
    parent.layer.alert(msg, function(index) {
        parent.layer.close(index);
        if (typeof(callback) === "function") {
            callback("ok");
        }
    });
}

//重写confirm式样框
window.confirm = function(msg, callback) {
    parent.layer.confirm(msg, { btn: ['确定', '取消'] },
        function() { //确定事件
            if (typeof(callback) === "function") {
                callback("ok");
            }
        });
}

//选择一条记录
function getSelectedRow() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }

    var selectedIDs = grid.getGridParam("selarrrow");
    if (selectedIDs.length > 1) {
        alert("只能选择一条记录");
        return;
    }

    return selectedIDs[0];
}

//选择多条记录
function getSelectedRows() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if (!rowKey) {
        alert("请选择一条记录");
        return;
    }

    return grid.getGridParam("selarrrow");
}

$(document).on("mousedown", ".float-win h4", function(e) {
    // e.preventDefault();
    var h4 = $(this);
    var float = h4.parent();
    var mask = float.parent();

    var winW = window.innerWidth;
    var winH = window.innerHeight;

    var left = float.offset().left;
    var top = float.offset().top;
    var mouseX = e.clientX;
    var mouseY = e.clientY;


    $(window).on("mousemove.drag", function(e) { // 这里监听器对象为window , 因为如果为h4的话 , 只要鼠标过快 , 移出了h4 , 这个事件就触发不了
        e.preventDefault(); // 会禁用系统默认拖拽事件 , 如a标签,img标签拖拽
        if (e.clientX < 0 || e.clientY < 0 || e.clientX > winW || e.clientY > winH) {
            $(window).off("mousemove.drag");
        }
        var deltaX = e.clientX - mouseX;
        var deltaY = e.clientY - mouseY;
        left += deltaX;
        top += deltaY;

        float[0].style.transform = "translate(" + left + "px," + top + "px)";
        float[0].style.top = "0";
        float[0].style.left = "0";

        mouseX = e.clientX; // 新坐标
        mouseY = e.clientY; // 新坐标

    });
}).on("mouseup", ".float-win h4", function() {
    $(window).off("mousemove.drag");
});
