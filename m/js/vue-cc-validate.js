/**
 * Vue插件
 * by ccc
 * 2017-11-6
 */

/**
 * 整理arguments
 * @param  {整理arguments} arg 需要整理的arguments
 * @return {array}     整理好的参数(这里一般是input_name的集合)
 */
function getArg(arg) {
    var arg, // 这个arg 应该是arguments对象
        arr = [];
    /*根据不同的参数方式 , 获取参数内容*/
    if (arg.length == 1) {
        var type = typeof arg[0];
        if (type == "object") { // (['a','b','c'])
            arr = arg[0];
        } else if (type == "string") { // ('a|b|c')
            arr = (arg[0]).split("|");
        }
    } else { // ('a','b','c')
        arr = [].slice.call(arg);
    }
    return arr;
}

/**
 * 真正的事件处理函数
 * @param  {element} el 元素
 * @param  {vnode} vm Vue实例
 * @return {undefined}    undefined
 */
function reallyHandle(el, vm) {
    var input_val = el.value; // 表单值
    var input_name = el.name; // 表单名
    var input_type = el.type; // 表单类型

    var required = vm.validate_required[input_name];
    var field = vm.validate_field[input_name];
    var rule = vm.validate_rule[field]; // 获取 该验证项目的规则

    // 勾选表单操作 , 就只会有是否必选
    if (input_type == "checkbox") {
        if (required && !el.checked) {
            vm.validate_error[input_name] = 1;
        } else {
            vm.validate_error[input_name] = 0;
        }
        return;
    }

    // 先判断是否符合必须输入
    if (required) { // 必填项
        if (input_val == "") {
            vm.validate_error[input_name] = 1;
            return;
        } else {
            vm.validate_error[input_name] = 0;
        }
    } else { // 非必填项
        if (input_val == "") {
            vm.validate_error[input_name] = 0; // 对于非必填项来说 , 空着就是正确;
            return
        }
    }

    // 是否除了required还有别的认证
    if (!rule) { // 有些除了required之外没有别的了
        return
    }

    // 验证长度
    if (!!rule.len) {
        var lenArr = rule.len.split("-"); // 长度限定
        if (lenArr.length == 1) { // 只有一个数字的时候 , 就表示只能是这个长度
            var mustLen = lenArr[0];
            if (input_val.length == mustLen) {
                vm.validate_error[input_name] = 0;
            } else {
                vm.validate_error[input_name] = 4;
                return
            }
        } else if (lenArr.length == 2) { // 只有一个数字的时候 , 就表示只能是这个长度
            var maxLen = Math.max(lenArr[0], lenArr[1]);
            var minLen = Math.min(lenArr[0], lenArr[1]);
            if (input_val.length >= minLen && input_val.length <= maxLen) {
                vm.validate_error[input_name] = 0;
            } else {
                vm.validate_error[input_name] = 4;
                return
            }
        }
    }
    if (!!rule.minLength) {
        if (input_val.length < rule.minLength) {
            vm.validate_error[input_name] = 4;
            return
        } else {
            vm.validate_error[input_name] = 0;
        }
    }
    if (!!rule.maxLength) {
        if (input_val.length > rule.maxLength) {
            vm.validate_error[input_name] = 4;
            return
        } else {
            vm.validate_error[input_name] = 0;
        }
    }



    // 判断是否符合正则
    if (!!rule.reg) {
        var reg_result = !!input_val.match(rule.reg);
        if (!reg_result) {
            vm.validate_error[input_name] = 2;
            return;
        } else {
            vm.validate_error[input_name] = 0;
        }
    }

    // 最后判断ajax
    if (!!rule.ajax && !!rule.ajax.url) {
        var ajaxData = {};
        if (rule.ajax.data) {
            var keys = Object.keys(rule.ajax.data);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                ajaxData[key] = rule.ajax.data[key](vm);
            }
        }
        $.ajax({
            url: rule.ajax.url,
            async: true,
            success: function(result) {
                if (!result) {
                    Vue.set(vm.validate_error, input_name, 3);
                } else {
                    Vue.set(vm.validate_error, input_name, 0);
                }
            },
            data: ajaxData,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.error(XMLHttpRequest);
                console.error(textStatus);
                console.error(errorThrown);
            }
        });
    }

}


/**
 * 当使用插件的时候，Vue.use(validate,...) 执行以下操作（也算是插件运行流程）
 *
 * 添加实例属性，方法；即添加但凡是Vue的实例都可以使用的方法。  Vue.prototype....
 *
 * 全局混合，这里主要让，使用了这个插件的页面，里面的vue实例都会自动添加初始数据（其实是空，就是添加了属性而已，主要用于后续存放数据进去）
 *
 * 自定义指令，即对绑定 v-validate 指令的元素进行的操作；这里主要用于记录表单元素的name，需要验证的内容，以及添加change事件(或者blur)监听器
 *
 * 触发change时，真正操作的函数是reallyHandle
 *
 */
var validate = {};
validate.install = function(Vue, options) {
    options = options || {}; // 里面会用到options.XXX属性 , 要是没有options 会报错

    /**
     * 实例属性
     * 增加vue实例属性,方法
     */

    /* 增加验证规则 */
    Vue.prototype.addRule = function(obj) {
        for (var i in obj) {
            this.$set(this.validate_rule, i, obj[i]);
        }
    }

    /* 根据错误类型数字返回中文 */
    Vue.prototype.errorType = function(num) {
        switch (num) {
            case 0:
                return "没有错误";
            case 1:
                return "空值错误";
            case 2:
                return "正则错误";
            case 3:
                return "ajax错误";
            case 4:
                return "长度错误";
        }

    }

    /* 查看错误类型 返回数字 */
    if (!Vue.prototype.error) {
        Vue.prototype.error = function(name) {
            return this.validate_error[name];
        }
    } else {
        console.error("error已被声明");
    }

    /**
     * 清除全部错误信息
     */
    Vue.prototype.clearerror = function() {
        for (var i in this.validate_error) {
            this.validate_error[i] = null;
        }
    }

    /**
     * 组合全正确
     * @param  ['phone','email'] 或者 'phone|email' 或者 "phone","email" 三种形式选一的参数     需要验证的表单组合
     * @return {boolean}                      组合是否全验证正确
     */
    if (!Vue.prototype.group) {
        Vue.prototype.group = function() {
            var arr = getArg(arguments); // input_name的集合

            var result = arr.every(function(val) {
                return this.validate_error[val] == 0;
            }, this);

            return result;
        }
    } else {
        console.error("group已被声明");
    }

    /**
     * 聚焦一组验证表单中的错误元素
     * @param  ['phone','email'] 或者 'phone|email' 或者 "phone","email" 三种形式选一的参数     需要验证的表单组合
     * @return {undefined} undefined
     */
    Vue.prototype.focusErrorEl = function() {
        var arr = getArg(arguments); // input_name的集合
        var result = arr.every(function(val) {
            var flag = (this.validate_error[val] == 0);
            if (!flag) {
                this.validate_el[val].focus();
            }
            return flag;
        }, this);
    }

    /**
     * 手动验证某个组合的表单
     * @param  ['phone','email'] 或者 'phone|email' 或者 "phone","email" 三种形式选一的参数    需要验证的表单组合
     * @return {undefined} undefined
     */
    Vue.prototype.manual = function() {
        var arr = getArg(arguments); // input_name的集合
        var vm = this;
        arr.forEach(function(val) {
            var thisEle = vm.validate_el[val];
            if (!!thisEle) { // 有才执行 , 因为有时候name没有对应任何元素
                reallyHandle(thisEle, vm);
            }
        });
    }





    /**
     * 全局混合
     * 任何vue实例创建的时候 , 都会自动加入下面选项
     */
    Vue.mixin({
        data: function() {
            return {
                validate_rule: options.rules || {}, // 记录全部验证规则
                validata_immediate: options.immediate || false, // 立即检验一次 , 适合修改 , 新增的时候一般为false ; 而且true的时候必须
                validate_error: {}, // 记录错误 , 以input_name作为属性名
                validate_el: {}, // 记录元素 , 以input_name作为属性名
                validate_field: {}, // 记录验证项目名 , 以input_name作为属性名
                validate_required: {}, // 记录是否必填 , 以input_name作为属性名
            }
        }
    });






    /**
     * 自定义指令
     */
    Vue.directive("validata", {
        bind: function(_el, _binding, _vnode) {
            // 获取变量
            var el = _el; // 当前元素
            var input_name = el.name; // 表单名
            var binding_val = _binding.value.split("|"); // 指令值 需要验证的项目
            var vm = _vnode.context; // 当前vue实例

            // 设定初始值
            var required = false; // 表单是否必要输入
            Vue.set(vm.validate_el, input_name, el);


            // 将 required 从需要验证的项目里面的剔除
            if (binding_val.indexOf("required") != -1) {
                var _index = binding_val.indexOf("required");
                required = true;
                binding_val.splice(_index, 1);
                Vue.set(vm.validate_error, input_name, null); // 也不是正确的 , 但是也没有立即报错
            } else {
                Vue.set(vm.validate_error, input_name, 0); // 非必要的,不填也是正确的嘛;
            }
            var field = binding_val[0]; // 获取需要验证的项目 1项
            Vue.set(vm.validate_field, input_name, field);
            Vue.set(vm.validate_required, input_name, required);

            // 事件监听器
            function handle(e) {
                reallyHandle(el, vm);
            }

            // 添加事件监听器
            if (vm.validata_immediate) {
                handle();
            }

            if (el.type == "checkbox") { // radio 是无法使用这个插件的，由于name是几个元素都一样；但是其实radio也不需要做什么验证，如果想必选，那么写html的时候只需要默认选上默认值就可以了，选上后除了用js改变，基本就是必选的
                el.addEventListener("change", handle, false);
            }else{
                el.addEventListener("blur", handle, false);
            }
        }
    });
}

















////////
// 例子 //
////////

// validate_rule 总验证规则 结构
var validate_rule = {
    // 验证项目 field是项目名
    "field": {
        // 验证项目 里面的规则
        reg: "/^0?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[0-9])[0-9]{8}$/",
        minLength: 10,
        maxLength: 20,
        len: "10-20",
        ajax: {
            url: "https://cccikov.github.io/remoteData/array.json",
            data: {
                name: function() {
                    return $("#name").val;
                },
                id: function() {
                    return 211
                },
                msg: function(vm) {
                    return vm.msg;
                }
            }
        }
    }
}
