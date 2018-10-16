var VoiceLib;
(function(VoiceLib) {
    var Voice = (function() {
        function Voice() {}

        /**
         * 初始化声音库
         */
        Voice.init = function() {
            if (this.isIE) {
                var div = document.createElement("div");
                div.setAttribute("id", "flashContent");
                document.body.appendChild(div);
                var script = document.createElement("script");
                script.src = "http://cdn.ronghub.com/swfobject-2.0.0.min.js";
                var header = document.getElementsByTagName("head")[0];
                header.appendChild(script);
                setTimeout(function() {
                    var swfVersionStr = "11.4.0";
                    var flashvars = {};
                    var params = {};
                    params.quality = "high";
                    params.bgcolor = "#ffffff";
                    params.allowScriptAccess = "always";
                    params.allowfullscreen = "true";
                    var attributes = {};
                    attributes.id = "player";
                    attributes.name = "player";
                    attributes.align = "middle";
                    swfobject.embedSWF("http://cdn.ronghub.com/player-2.0.2.swf", "flashContent", "1", "1", swfVersionStr, null, flashvars, params, attributes);
                }, 200);
            } else {
                var list = ["http://cdn.ronghub.com/pcmdata-2.0.0.min.js", "http://cdn.ronghub.com/libamr-2.0.1.min.js"];
                for (var i = 0, len = list.length; i < len; i++) {
                    var script = document.createElement("script");
                    script.src = list[i];
                    document.head.appendChild(script);
                }
            }
            this.isInit = true;
        };

        /**
         * 开始播放声音
         * @param data {string} amr 格式的 base64 码
         * @param duration {number} 播放大概时长 用 data.length / 1024
         */
        Voice.play = function(data, duration) {
            this.checkInit("play");
            var me = this;
            if (me.isIE) {
                me.thisMovie().doAction("init", data);
            } else {
                me.palyVoice(data);
                me.onCompleted(duration);
            }
        };

        /**
         * 停止播放声音
         */
        Voice.stop = function() {
            this.checkInit("stop");
            var me = this;
            if (me.isIE) {
                me.thisMovie().doAction("stop");
            } else {
                if (me.element) {
                    me.element.stop();
                }
            }
        };

        /**
         * 播放声音时调用的方法
         */
        Voice.onprogress = function() {
            this.checkInit("onprogress");
        };
        Voice.checkInit = function(postion) {
            if (!this.isInit) {
                throw new Error("VoiceLib not initialized,postion:" + postion);
            }
        };
        Voice.thisMovie = function() {
            return eval("window['player']");
        };
        Voice.onCompleted = function(duration) {
            var me = this;
            var count = 0;
            var timer = setInterval(function() {
                count++;
                me.onprogress();
                if (count >= duration) {
                    clearInterval(timer);
                }
            }, 1000);
            if (me.isIE) {
                me.thisMovie().doAction("play");
            }
        };
        Voice.base64ToBlob = function(base64Data, type) {
            var mimeType;
            if (type) {
                mimeType = { type: type };
            }
            base64Data = base64Data.replace(/^(.*)[,]/, '');
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);
            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);
                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, mimeType);
        };
        Voice.palyVoice = function(base64Data) {
            var reader = new FileReader(),
                blob = this.base64ToBlob(base64Data, "audio/amr"),
                me = this;
            reader.onload = function() {

                console.log('reader.result == ', reader.result);

                var samples = new AMR({
                    benchmark: true
                }).decode(reader.result);
                me.element = AMR.util.play(samples);
            };
            reader.readAsBinaryString(blob);
        };
        Voice.isIE = /Trident/.test(navigator.userAgent);
        Voice.isInit = false;
        return Voice;
    })();

    VoiceLib.Voice = Voice;

    // 兼容AMD CMD
    if ("function" === typeof require && "object" === typeof module && module && module.id && "object" === typeof exports && exports) {
        module.exports = Voice;
    } else if ("function" === typeof define && define.amd) {
        define("VoiceLib", [], function() {
            return Voice;
        });
    }
})(VoiceLib || (VoiceLib = {}));