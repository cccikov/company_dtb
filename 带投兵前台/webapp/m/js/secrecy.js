var pjid = getUrlParam("pjid");
var vm = new Vue({
    // el: "#wrap",
    data: {
    	platform_bankname:null,
		platform_accno:null,
		platform_accname:null,
		odPayEntities:null,
		secrecy_ratio:null,
		odSecrecy:null,
		pjInfo:null,
        token:null,
        username:null,
        amount:""
    },
    methods: {
        getdata: function() {
            $.get("/m/secrecypage?pjid=" + pjid, function(r) {
                var result = JSON.parse(r);
                vm.platform_bankname = result.platform_bankname;
                vm.platform_accno = result.platform_accno;
                vm.platform_accname = result.platform_accname;
                vm.odPayEntities = result.odPayEntities;
                vm.secrecy_ratio = result.secrecy_ratio;
                vm.odSecrecy = result.odSecrecy;
                vm.pjInfo = result.pjInfo;
                vm.username = result.username;
                if(!vm.$el){
                    vm.$mount("#wrap");
                }
            });
        },
        unescape: function(str) {
            if(!str){
                return "";
            }
            var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
            return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, function(all, t) {
                return arrEntities[t];
            });
        },
        getToken:function() {
            $.ajax({
                type: "POST",
                url: "/gettoken",
                success: function(r) {
                    r = JSON.parse(r);
                    vm.token = r.token;
                }
            });
        },
        uploadInputClick:function(){
        	$("#cert")[0].click();
        },
        upload:function(event){
            console.log(event,event.currentTarget)
            var cert = event.currentTarget;
            var files = Array.prototype.slice.call(cert.files);
            if (files.length === 0) {
                alert('请选择图片')
                return
            }
            if (files.length > 1) {
                alert('只能选择一张图片')
                return
            }

            var file = files[0];
            var name = file.name;
            var size = file.size/ 1024 / 1024;
            var type = file.type.split("/")[0];
            if (type != "image") {
                alert("上传文件格式错误 , 只能上传图片文件");
                this.value = "";
                return false;
            }


            var reader = new FileReader()
                // ~~用于将字符串转化为整数，MB前的逻辑是为了保留一位小数取整，参考：https://github.com/whxaxes/node-test/issues/11
            var fileSize = file.size / 1024 > 1024 ? (~~(10 * file.size / 1024 / 1024) / 10) + 'MB' : ~~(file.size / 1024) + 'KB'

            reader.onload = function() {
                var result = this.result
                var img = new Image()
                img.src = result

                // if image file size is not greater than 100 kb, upload it directly
                if (result.length <= maxSize) {
                    img = null
                    upload(result, file.type);
                    return
                }

                // compress image firstly after uploaded completely, and then upload it
                if (img.complete) {
                    callback()
                } else {
                    img.onload = callback
                }

                function callback() {
                    var data = compress(img)
                    upload(data, file.type);
                    img = null
                }
            }

            reader.readAsDataURL(file);
        },
        secrecydel: function(id){
        	var secrecyid = vm.odSecrecy.id;
            $.ajax({
                type: "POST",
                url: "/m/secrecydel",
                data: {
                    "secrecyid": secrecyid,
                    "receiptid": id
                },
                success: function(r) {
                    var result = eval('(' + r + ')');
                    if (result.code != "500") {
                        location.reload()
                    } else {
                        alert(result.msg);
                    }
                }
            });
        },
        secrecysubmit: function(){
        	var secrecyid = vm.odSecrecy.id;
            $.ajax({
                type: "POST",
                url: "/m/secrecysubmit",
                data: {
                    "secrecyid": secrecyid
                },
                success: function(r) {
                    var result = eval('(' + r + ')');
                    if (result.code != "500") {
                    	 location.href = "/m/page/project_detail.html?id="+vm.pjInfo.id;
                    } else {
                        alert(result.msg);
                    }
                }
            });
        }
    },
    computed: {
        page: function() {
            return 2;
        }
    },
    mounted: function() {
        var _this = this;
        Vue.nextTick(function() { // Vue初始化完成
            alinkAnimation();
        });
    },
});
vm.getdata();
vm.getToken()



        // 用于压缩图片的canvas
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')

        // 瓦片canvas
        var tCanvas = document.createElement('canvas')
        var tctx = tCanvas.getContext('2d')

        // 100 kb
        var maxSize = 100 * 1024;

        // compress large image using canvas
        function compress(objImg) {
            var initSize = objImg.src.length
            var width = objImg.width
            var height = objImg.height

            // 如果图片大于400万像素，计算压缩比并将大小压至400万以下
            var ratio
            if ((ratio = width * height / 4000000) > 1) {
                ratio = Math.sqrt(ratio)
                width /= ratio
                height /= ratio
            } else {
                ratio = 1
            }

            canvas.width = width
            canvas.height = height

            // 铺底色
            ctx.fillStyle = '#fff'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // 如果图片像素大于100万则使用瓦片绘制
            var count
            if ((count = width * height / 1000000) > 1) {
                // 计算要分成多少块瓦片
                count = ~~(Math.sqrt(count) + 1)
                var nw = ~~(width / count)
                var nh = ~~(height / count)

                tCanvas.width = nw
                tCanvas.height = nh

                for (var i = 0; i < count; i++) {
                    for (var j = 0; j < count; j++) {
                        tctx.drawImage(objImg, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)

                        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
                    }
                }
            } else {
                ctx.drawImage(objImg, 0, 0, width, height)
            }

            // 进行最小压缩
            var nData = canvas.toDataURL('image/jpeg', 0.3)

            console.log('压缩前：' + initSize)
            console.log('压缩后：' + nData.length)
            console.log('压缩率：' + ~~(100 * (initSize - nData.length) / initSize) + '%')

            tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
            return nData
        }

        // 图片上传，将base64的图片转成二进制对象，塞进formdata上传
        function upload(basestr, type) {
            var token = vm.token;
            var secrecyid = vm.odSecrecy.id;
            
            var text = window.atob(basestr.split(',')[1])
            var buffer = new Uint8Array(text.length)
            var percent = 0,
                loop = null

            for (var i = 0, len = text.length; i < len; i++) {
                buffer[i] = text.charCodeAt(i)
            }

            var blob = getBlob([buffer], type);

            var xhr = new XMLHttpRequest();

            var formData = getFormData();

            formData.append('file', blob);

            xhr.open('post', "/member/up?type=secrecy/"+secrecyid+"&token=" + token);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var jsonData = xhr.responseText.replace(/\"/g, "");
                    clearInterval(loop);
                    vm.getToken();
                    if (jsonData != "没有上传权限") {
                        var url = jsonData;
                        Url = url;
                        $.ajax({
                            type: "POST",
                            url: "/m/secrecyupload",
                            data:{
                                "attach":Url,
                                "secrecyid":secrecyid,
                                "flag":0,
                                "amount":Number(vm.amount),
                            },
                            success: function(r){
                                var result = eval('('+r+')');
                                if(result.code == 0){
                                    location.reload();
                                }else{
                                    alert(result.msg);
                                }
                            }
                        });

                    } else {
                        alert(r.msg);
                    }

                }
            }

            // 数据发送进度，前50%展示该进度
            xhr.upload.addEventListener('progress', function(e) {
                if (loop) {
                    return
                }
                percent = ~~(100 * e.loaded / e.total) / 2
                console.log(percent)
                if (percent === 50) {
                    mockProgress()
                }
            }, false)

            function mockProgress() {
                if (loop) {
                    return
                }
                loop = setInterval(function() {
                    percent++
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
                buffer.forEach(function(buf) {
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

            this.append = function(name, value, fileName) {
                parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"')
                if (value instanceof Blob) {
                    parts.push('; filename="' + (fileName || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n')
                    parts.push(value)
                } else {
                    parts.push('\r\n\r\n' + value)
                }
                parts.push('\r\n')
            }

            // 重写XHR send()方法
            XMLHttpRequest.prototype.send = function(val) {
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
                    fr.onload = function() {
                        oldSend.call(oXHR, fr.result);
                    };
                    fr.onerror = function(err) {
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