/* 使用插件 */
Vue.use(validate, {
    // 验证项目 field是项目名
    rules: {
        "code": {
            // 验证项目 里面的规则
            ajax: {
                url: "/member/certvalid?optype=validmobilecode",
                data: {
                    mobilevaildcode: function () {
                        return vm.mobilevaildcode
                    },
                    mobile: function () {
                        return vm.mobile
                    },
                }
            }
        }
    }
});

var vm = new Vue({
    el: "#wrap",
    data: {
        certified: false,
        type: "select",
        time: 0,
        canSubmit: false,
        formData: {
            cardnoS: 2, //选择的银行卡
            frontImg: "",
            backImg: "",
            username: null,
            mobile: null,
            idCard: null,
            cardNo: null,
            bankName: null,
            dotName: null,
            mobilevaildcode: null
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            compressImg();
        });
    },
    watch: {
        formData: {
            handler: function (val) {
                if (this.type == "select") {
                    var result = this.group("username|mobile|idCard|mobilevaildcode");
                } else if (this.type == "add") {
                    var result = this.group("username|mobile|idCard|cardNo|bankName|dotName|mobilevaildcode");
                }
                console.log(result);
                this.canSubmit = result;
            },
            deep: true
        }

    },
    methods: {
        certify: function () {
            this.certified = false;
        },
        change_type: function (type) {
            this.type = type;
            this.clearerror(); // 清除验证错误
        },
        bankCardInput: function (e) {
            var el = e.currentTarget;
            el.value = this.formatBankCard(el.value);
        },
        getCode: function () {
            var _this = this;
            _this.time = 30; // 30秒
            var timer = setInterval(function () {
                _this.time--;
                if (_this.time == 0) {
                    clearInterval(timer);
                    console.log(_this.time);
                }
            }, 1000);
        },
        selectCard: function (cardnoS) {
            this.formData.cardnoS = cardnoS;
        },
        formatBankCard: function (card, spacing) { // 格式化银行卡
            card = String(card);
            card = card.replace(/\s/g, "");
            var len = card.length;
            var spacing = spacing || 4;
            var arr = [];
            var n = 0;
            while (n < len) {
                arr.push(card.slice(n, n + spacing));
                n += spacing;
            };
            return arr.join(" ");
        }
    }
});


// 压缩图片
function compressImg() {
    // 'use strict'
    // 参考资料：https://github.com/whxaxes/node-test/blob/master/server/upload/index_2.html
    var front = document.getElementById('front');
    var back = document.getElementById('back');

    // 用于压缩图片的canvas
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');

    // 瓦片canvas
    var tCanvas = document.createElement('canvas');
    var tctx = tCanvas.getContext('2d');

    // 100 kb
    var maxSize = 100 * 1024;

    front.addEventListener('change', function (e) {
        var files = Array.prototype.slice.call(front.files)
        if (files.length === 0) {
            alert('请选择图片');
            return false;
        }
        if (files.length > 1) {
            alert('只能选择一张图片');
            return false;
        }

        var file = files[0];
        var reader = new FileReader();
        // ~~用于将字符串转化为整数，MB前的逻辑是为了保留一位小数取整，参考：https://github.com/whxaxes/node-test/issues/11
        var fileSize = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024) / 10) + 'MB' : ~~(file.size / 1024) + 'KB';

        reader.onload = function () {
            var result = this.result;
            var img = new Image();
            img.src = result;

            // if image file size is not greater than 100 kb, upload it directly
            // 如果图片小于100k，则直接输出，不经过压缩
            if (result.length <= maxSize) {
                img = null;
                showImg(result, "frontImg");
                upload(result, file.type);
                return;
            }

            // compress image firstly after uploaded completely, and then upload it
            // 如果图片大于100k，经过压缩后输出
            if (img.complete) { // 对于 complete 属性来讲，IE是根据图片是否显示过来判断，就是说当加载的图片显示出来后，complete 属性的值才为 true ，否则一直是 false ，和以前是否加载
                callback();
            } else {
                img.onload = callback; // 现代浏览器，img 加载好会触发onload事件
            }

            function callback() { // img 加载好callback
                // console.dir(img);
                // console.log(img.complete);
                var data = compress(img);
                showImg(data, "frontImg");
                upload(data, file.type);
                img = null; // 释放内存
            }
        }

        reader.readAsDataURL(file);
    }, false)

    back.addEventListener('change', function (e) {
        var files = Array.prototype.slice.call(back.files)
        if (files.length === 0) {
            alert('请选择图片');
            return false;
        }
        if (files.length > 1) {
            alert('只能选择一张图片');
            return false;
        }

        var file = files[0];
        var reader = new FileReader();
        // ~~用于将字符串转化为整数，MB前的逻辑是为了保留一位小数取整，参考：https://github.com/whxaxes/node-test/issues/11
        var fileSize = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024) / 10) + 'MB' : ~~(file.size / 1024) + 'KB';

        reader.onload = function () {
            var result = this.result;
            var img = new Image();
            img.src = result;

            // if image file size is not greater than 100 kb, upload it directly
            // 如果图片小于100k，则直接输出，不经过压缩
            if (result.length <= maxSize) {
                img = null;
                showImg(result, "backImg");
                upload(result, file.type);
                return;
            }

            // compress image firstly after uploaded completely, and then upload it
            // 如果图片大于100k，经过压缩后输出
            if (img.complete) { // 对于 complete 属性来讲，IE是根据图片是否显示过来判断，就是说当加载的图片显示出来后，complete 属性的值才为 true ，否则一直是 false ，和以前是否加载
                callback();
            } else {
                img.onload = callback; // 现代浏览器，img 加载好会触发onload事件
            }

            function callback() { // img 加载好callback
                // console.dir(img);
                // console.log(img.complete);
                var data = compress(img);
                showImg(data, "backImg");
                upload(data, file.type);
                img = null; // 释放内存
            }
        }

        reader.readAsDataURL(file);
    }, false)

    // compress large image using canvas
    function compress(objImg) {
        var initSize = objImg.src.length;
        var width = objImg.width;
        var height = objImg.height;

        // 如果图片大于400万像素，计算压缩比并将大小压至400万以下
        var ratio;
        if ((ratio = width * height / 4000000) > 1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        } else {
            ratio = 1;
        }

        canvas.width = width;
        canvas.height = height;

        // 铺底色
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 如果图片像素大于100万则使用瓦片绘制
        var count;
        if ((count = width * height / 1000000) > 1) {
            // 计算要分成多少块瓦片
            count = ~~(Math.sqrt(count) + 1);
            var nw = ~~(width / count);
            var nh = ~~(height / count);

            tCanvas.width = nw;
            tCanvas.height = nh;

            for (var i = 0; i < count; i++) {
                for (var j = 0; j < count; j++) {
                    tctx.drawImage(objImg, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                    ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                }
            }
        } else {
            ctx.drawImage(objImg, 0, 0, width, height);
        }

        // 进行最小压缩
        var nData = canvas.toDataURL('image/jpeg', 0.3);

        // console.log('压缩前：' + initSize);
        // console.log('压缩后：' + nData.length);
        // console.log('压缩率：' + ~~(100 * (initSize - nData.length) / initSize) + '%');

        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return nData;
    }

    // 显示图片
    function showImg(basestr, which) {
        vm.formData[which] = basestr;
    }













    // 图片上传，将base64的图片转成二进制对象，塞进formdata上传
    function upload(basestr, type) {
        // 去除mime type，atob() 函数用来解码一个已经被base-64编码过的数据
        var text = window.atob(basestr.split(',')[1])
        var buffer = new Uint8Array(text.length)
        var percent = 0,
            loop = null

        for (var i = 0, len = text.length; i < len; i++) {
            buffer[i] = text.charCodeAt(i)
        }

        var blob = getBlob([buffer], type)

        var xhr = new XMLHttpRequest()

        var formData = getFormData()

        formData.append('file', blob)

        xhr.open('post', '/upload/up?type=test&token=<%=UploadHelper.getToken()%>')

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var jsonData = JSON.parse(xhr.responseText)
                var imageData = jsonData[0] || {}
                var text = imageData.path ? '上传成功：' + imageData.path : '上传失败'

                // console.log(text)

                clearInterval(loop)
                // console.log('进度：' + percent)
            }
        }

        // 数据发送进度，前50%展示该进度
        xhr.upload.addEventListener('progress', function (e) {
            if (loop) {
                return
            }
            percent = ~~(100 * e.loaded / e.total) / 2
            // console.log(percent)
            if (percent === 50) {
                mockProgress()
            }
        }, false)

        function mockProgress() {
            if (loop) {
                return
            }
            loop = setInterval(function () {
                percent++
                // console.log(percent)
                if (percent >= 99) {
                    clearInterval(loop)
                }
            }, 100)
        }

        xhr.send(formData)
    }

    // 获取blob对象的兼容性写法
    function getBlob(buffer, format) {
        try {
            return new Blob(buffer, {
                type: format
            })
        } catch (e) {
            var bb = new(window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder)
            buffer.forEach(function (buf) {
                bb.append(buf)
            })
            return bb.getBlob(format)
        }
    }

    // 获取formdata
    function getFormData() {
        var isNeedShim = ~navigator.userAgent.indexOf('Android') &&
            ~navigator.vendor.indexOf('Google') &&
            ~navigator.userAgent.indexOf('Chrome') &&
            navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534
        return isNeedShim ? new FormDataShim() : new FormData()
    }

    // formData 补丁，给不支持formdata上传blob的android机打补丁
    // 构造函数
    function FormDataShim() {
        console.warn('using dormdata shim')
        var o = this,
            parts = [],
            boundary = new Array(21).join('-') + (+new Data() * (1e6 * Math.random())).toString(36),
            oldSend = XMLHttpRequest.prototype.send

        this.append = function (name, value, fileName) {
            parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"')
            if (value instanceof Blob) {
                parts.push('; filename="' + (fileName || 'blob') + '"\r\nContent-Type: ' + value.type +
                    '\r\n\r\n')
                parts.push(value)
            } else {
                parts.push('\r\n\r\n' + value)
            }
            parts.push('\r\n')
        }

        // 重写XHR send()方法
        XMLHttpRequest.prototype.send = function (val) {
            var fr,
                data,
                oXHR = this;
            if (val === o) {
                // Append the final boundary string
                parts.push('--' + boundary + '--\r\n');
                // Create the blob
                data = getBlob(parts);
                // Set up and read the blob into an array to be sent
                fr = new FileReader();
                fr.onload = function () {
                    oldSend.call(oXHR, fr.result);
                };
                fr.onerror = function (err) {
                    throw err;
                };
                fr.readAsArrayBuffer(data);
                // Set the multipart content type and boudary
                this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
                XMLHttpRequest.prototype.send = oldSend;
            } else {
                oldSend.call(this, val);
            }
        }
    }

    function onAjaxUploadComplete(src) {
        alert(src);
    }
}