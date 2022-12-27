define("common/wx/mpEditor/plugin/audio_music.js", ["common/wx/popup.js", "biz_web/ui/checkbox.js", "common/wx/media/audioMusicDialog.js", "common/wx/Tips.js"], function (i) {
    "use strict";

    function e(i, e) {
        if (!e) {
            var t = i.getUeditor();
            e = $(t.body);
        }
        return e.find("iframe.js_editor_audio").length;
    }

    function t(i) {
        return i.find("iframe.js_editor_audio").removeAttr("isaac"), i.find("mpvoice").remove(),
            i.find(".js_audio_frame").remove(), i.find("qqmusic").addClass("res_iframe qqmusic_iframe js_editor_qqmusic"),
            i.find("span.qqmusic_area").remove(), i;
    }

    function n(i) {
        this.__o = {
            container: "",
            allowAudio: !1,
            allowMusic: !1
        }, this.editor = null, this.__init(i || {}), i && i.container && $(i.container).show();
    }

    i("common/wx/popup.js"), i("biz_web/ui/checkbox.js");
    var o = i("common/wx/media/audioMusicDialog.js"), r = i("common/wx/Tips.js"), m = 1;
    return n.beforeSetContent = function (i) {
        if (!i.html) return "";
        var e = $("<div>").html(i.html);
        return e.find("mpvoice.js_editor_audio").replaceTagName("iframe"), e = t(e), e.find("qqmusic.js_editor_qqmusic").replaceTagName("iframe"),
            e.html();
    }, n.prototype = {
        getName: function () {
            return "insertaudio";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var i = this;
            return function () {
                var t = i.__o.allowAudio, n = i.__o.allowMusic, a = !1;
                if (t && e(i.editor) >= m) {
                    if (!n) return void r.err("每篇图文消息只能添加一个语音");
                    a = !0;
                }
                o.show({
                    allowAudio: t,
                    allowMusic: n,
                    audioDisabled: a,
                    onOK: function (e) {
                        i.__insert(e);
                    },
                    onCancel: function () {
                    }
                });
            };
        },
        getContainer: function () {
            return this.__o.container;
        },
        addListener: function (i) {
            var n = this;
            i.addListener("beforepaste", function (i, o) {
                var a = $("<div></div>").html(o.html), u = a.find("iframe.js_editor_audio").length;
                return e(n.editor) + u > m ? (r.err("每篇图文消息只能添加一个语音"), o.html = "", !0) : (a = t(a), a.find("qqmusic.js_editor_qqmusic").replaceTagName("iframe"),
                    void(o.html = a.html()));
            });
        },
        beforeSetContent: function (i) {
            return n.beforeSetContent({
                html: i
            });
        },
        initPluginData: function () {
            return ["music_id"];
        },
        getPluginData: function (i) {
            var e = i.init(this.initPluginData()), n = e.get("content");
            if (n) {
                var o = $("<div></div>").html(n);
                o = t(o), o.find("iframe.js_editor_audio").replaceTagName("mpvoice"), o.find("iframe.js_editor_qqmusic").replaceTagName("qqmusic"),
                    n = o.html(), e.set("content", n), n = e.get("content");
                for (var r = /<qqmusic\s(?:[\s\S]*?)musicid=['"]([\d]*?)['"](?:[\s\S]*?)>/g, m = [], a = "", u = null; null != (u = r.exec(n));) u[1] && -1 == a.indexOf(u[1] + ",") && (m.push(u[1]),
                    a += u[1] + ",");
                return e.set("music_id", m.join(",")), e;
            }
        },
        check: function (i) {
            return i.find("mpvoice").length > m ? (r.err("每篇图文消息只能添加一个语音"), !1) : !0;
        },
        __init: function (i) {
            var e = this.__o;
            for (var t in i) Object.prototype.hasOwnProperty.call(e, t) && (e[t] = i[t]);
        },
        __insertAudio: function (i) {
            i.uri_encoded_name = encodeURIComponent(i.name), i.uri_encoded_title = encodeURIComponent(i.title),
                i.title_encode = i.title.html(!0), i.src = "/cgi-bin/readtemplate?t=tmpl/audio_tmpl&name={uri_encoded_title}&play_length={duration}".format(i);
            var e = '<p><iframe frameborder="0" class="res_iframe js_editor_audio audio_iframe" src="{src}" isaac2={is_aac} low_size="{low_size}" source_size="{source_size}" high_size="{high_size}" name="{title_encode}" play_length="{play_length}" voice_encode_fileid="{voice_encode_fileid}"></iframe></p>';
            e = e.format(i);
            var t = this.editor;
            t.execCommand("inserthtml", e, !0), t.funcPvUvReport("insertaudio");
        },
        __insertMusic: function (i) {
            var e = i.musicid, t = i.mid, n = i.url, o = i.songname, r = i.albumurl, m = i.singername, a = i.play_length, u = (i.commentid || "",
                "/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&singer=" + encodeURIComponent(m) + "&music_name=" + encodeURIComponent(o) + "&albumurl=" + encodeURIComponent(r) + "&musictype=" + encodeURIComponent(i.musictype)),
                c = ['<iframe class="res_iframe qqmusic_iframe js_editor_qqmusic" scrolling="no" frameborder="0"', ' musicid="' + e.html(!0) + '"', ' mid="' + t.html(!0) + '"', ' albumurl="' + r.html(!0) + '"', ' audiourl="' + n.html(!0) + '"', ' music_name="' + o.html(!0) + '"', ' singer="' + m.html(!0) + '"', ' play_length="' + a + '"', ' src="' + u + '"', ' musictype="' + i.musictype + '"', ' otherid="' + i.otherid + '"', ' albumid="' + i.albumid + '"', ' jumpurlkey="' + i.jumpurlkey + '"', "></iframe>"].join(""),
                s = this.editor;
            s.execCommand("inserthtml", c, !0), s.funcPvUvReport("insertmusic");
        },
        __insert: function (i) {
            "audio" === i.type ? this.__insertAudio(i) : this.__insertMusic(i);
        }
    }, n;
});
define("common/wx/mpEditor/plugin/templateList.js", ["common/wx/media/templateListDialog.js"], function (t) {
    "use strict";

    function n(t) {
        this._o = {
            token: ""
        }, this._extend(t), this.editor = null;
    }

    var e = t("common/wx/media/templateListDialog.js");
    return n.prototype = {
        _extend: function (t) {
            if (t) for (var n in t) this._o[n] = t[n];
        },
        getName: function () {
            return "templatelist";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var t = this, n = this._o;
            return function () {
                var o = t.editor;
                if (o) {
                    new e({
                        token: n.token,
                        onSuccess: function (t) {
                            t && t.content && o.insertTemplate(t.content, !0);
                        }
                    });
                }
            };
        },
        getType: function () {
            return 1;
        },
        getTitle: function () {
            return "插入图文模版";
        }
    }, n;
});
define("common/wx/mpEditor/plugin/insert_product.js", ["common/wx/dialog.js", "common/wx/media/productDialog.js", "common/wx/media/productTemplateDialog.js", "common/wx/mpEditor/utils.js", "tpl/mpEditor/plugin/product_popup.html.js", "tpl/mpEditor/plugin/product_popup_icon.html.js", "common/wx/Tips.js", "biz_web/lib/store.js"], function (e) {
    "use strict";

    function t() {
        y.mpproductReg = new RegExp("<mpproduct([^>]*?)" + y.className + "([^>]*?)><\\/mpproduct>", "g"),
            y.mpproductRegReplace = "<iframe $1" + y.className + "$2></iframe>", y.iframeReg = new RegExp("<iframe([^>]*?)" + y.className + "([^>]*?)><\\/iframe>", "g"),
            y.iframeRegReplace = "<mpproduct $1" + y.className + "$2></mpproduct>";
        var e = _.get(y.cacheProductKey) || {};
        e.templateId && (y.curTemplateId = e.templateId);
    }

    function r(e) {
        return e.find("iframe." + y.className).remove(), e.find("mpproduct").remove(), e.find("." + m.appmsgContainerClass).remove(),
            e.find("." + m.appmsgLoopClass).remove(), e.find("." + m.appmsgProductErrClass).remove(),
            e.find("section").each(function () {
                this.firstChild || this.style.cssText || $(this).remove();
            }), e;
    }

    function i(e) {
        this._o = {
            container: null,
            clearProduct: !1,
            can_see_product: !1,
            can_use_smart: !1,
            can_use_product: !1,
            can_use_wxopen_link: !1
        }, this._g = {
            highlineCacheIframe: [],
            highlineTarget: null,
            highlineTimeoutId: null
        }, this._extend(e), this._o.container && this._o.can_see_product === !0 && $(this._o.container).show(),
            this._o.can_see_product !== !0 || this._o.can_use_product !== !0 ? this._o.clearProduct = !0 : this.initTemplate(),
            this.editor = null;
    }

    function o(e, t, r) {
        for (var i = window.UE.dom.domUtils, o = e, d = !0; o;) {
            if (i.isBody(o)) {
                d = !1;
                break;
            }
            var l = i["find" + r + "Sibling"](o, n(t), !1);
            if (l && !i.isBody(l)) {
                var s = i["find" + r + "Sibling"](o, c(l), !1);
                if (s && s !== l && !i.isBody(s)) {
                    d = !1;
                    break;
                }
                if (l === t) {
                    d = !0;
                    break;
                }
                var u = "";
                if ("Next" == r ? u = "Previous" : "Previous" == r && (u = "Next"), a(t, l, u)) {
                    d = !1;
                    break;
                }
                d = !0;
                break;
            }
            if (l = i["find" + r + "Sibling"](o, c(), !1), l && !i.isBody(l)) {
                d = !1;
                break;
            }
            o = o.parentNode;
        }
        return d;
    }

    function a(e, t, r) {
        for (var i = window.UE.dom.domUtils, o = e, a = !1; o && o !== t;) {
            var n = i["find" + r + "Sibling"](o, c(), !1);
            if (n && !i.isBody(n)) {
                a = !0;
                break;
            }
            o = o.parentNode;
        }
        return a;
    }

    function n(e) {
        var t = window.UE.dom.domUtils, r = e.getAttribute("data-uid");
        return function (i) {
            if (t.isBody(i)) return !0;
            if (1 == i.nodeType) {
                if (e === i) return !0;
                var o = $(i).find("." + y.className + "[data-uid=" + r + "]");
                return o && o.length > 0 ? !0 : !1;
            }
            return !1;
        };
    }

    function c(e) {
        var t = window.UE.dom.domUtils;
        return function (r) {
            if (t.isBody(r)) return !0;
            if ("undefined" != typeof e && r === e) return !0;
            if (1 == r.nodeType) {
                if ("br" == r.nodeName.toLowerCase()) return !1;
                var i = r.innerText.replace(/[\r\n\s]/g, "").replace(t.fillCharReg, "");
                if (r.style.cssText || i.length > 0) return !0;
                var o = ["p", "section", "span"], a = "," + o.join(",") + ",", n = r.nodeName.toLowerCase();
                if (a.indexOf("," + n + ",") >= 0) {
                    if (0 == r.childElementCount) return !1;
                    var c = $(r.cloneNode(!0));
                    c.find("br").remove();
                    for (var d = [], l = 0, s = o.length; s > l; l++) {
                        var u = o[l];
                        c.find(u).each(function () {
                            0 != this.childElementCount || this.style.cssText || d.push(this);
                        });
                    }
                    for (var l = 0, s = d.length; s > l; l++) $(d[l]).remove();
                    return 0 === c[0].childElementCount ? !1 : !0;
                }
                return !0;
            }
            if (3 == r.nodeType) {
                var i = r.nodeValue.replace(/[\r\n\s]/g, "").replace(t.fillCharReg, "");
                return i.length > 0 ? !0 : !1;
            }
            return !1;
        };
    }

    function d(e, t) {
        for (var r = window.UE.dom.domUtils, i = e; i && !r.isBody(i);) {
            var o = r["find" + t + "Sibling"](i, s, !1);
            if (o) {
                i = o;
                break;
            }
            i = i.parentNode;
        }
        if (i && !r.isBody(i) && 1 == i.nodeType) {
            if (l(i) === !0) return i;
            var a = $(i).find("." + y.className).eq(0)[0];
            if (a) {
                var n;
                "Next" == t ? n = "Previous" : "Previous" == t && (n = "Next");
                for (var c = a; c && !r.isBody(c) && c !== i;) {
                    var o = r["find" + n + "Sibling"](c, s, !1);
                    if (o) {
                        c = o;
                        break;
                    }
                    c = c.parentNode;
                }
                return c && !r.isBody(c) && c !== i ? null : a;
            }
        }
        return null;
    }

    function l(e) {
        return e && 1 == e.nodeType && /^iframe$/i.test(e.nodeName) && (e.className || "").indexOf(y.className) >= 0 ? !0 : !1;
    }

    function s(e) {
        var t = window.UE.dom.domUtils;
        return t.isBody(e) || 3 == e.nodeType && 0 == (e.nodeValue || "").replace(t.fillCharReg, "").length ? !1 : !0;
    }

    var u = e("common/wx/dialog.js"), p = e("common/wx/media/productDialog.js"), m = e("common/wx/media/productTemplateDialog.js"), f = e("common/wx/mpEditor/utils.js"), h = e("tpl/mpEditor/plugin/product_popup.html.js"), g = e("tpl/mpEditor/plugin/product_popup_icon.html.js"),
        v = e("common/wx/Tips.js"), _ = e("biz_web/lib/store.js"), y = {
            hasTemplateData: !1,
            afterTemplateQueue: [],
            maxLen: 200,
            curColor: m.defaultColor,
            colorCacheMax: 10,
            curTemplateId: "",
            PopupTplCompile: template.compile(h),
            PopupIconTplCompile: template.compile(g),
            iframeUid: "insert_product_iframe_ready",
            className: "js_editor_product",
            cacheProductKey: "editorProductInfo_" + window.wx.data.uin,
            defaultColorList: ["#fa7834", "#09BB07", "#D54036", "#9058CB"],
            productStyleText: "width:100% !important;border:0;"
        };
    return t(), i.afterSetContent = function (e) {
        var t = [], r = e.$dom;
        r.find("mpproduct").each(function () {
            var e = $(this), r = e.attr("data-uid") || "";
            r || (r = f.getuid(), e.attr("data-uid", r)), e.attr("src", f.getIframeSrc(r, y.iframeUid)),
                t.push(e);
        }), f.createAsynRenderIframe(t);
    }, i.beforeSetContent = function (e) {
        if (!e.html) return "";
        if (e.clearProduct === !0) {
            var t = $("<div>").html(e.html);
            return t = r(t), t.html();
        }
        if (/<mpproduct\s/.test(e.html)) {
            var i, t = $("<div>").html(e.html), o = [];
            t.find("mpproduct").each(function () {
                var t, r = $(this);
                e.isPreview === !0 ? (t = f.getuid(), r.attr("data-uid", t)) : i = r.attr("data-color");
                var a = r.parents("p");
                if (a && a.length > 0) for (var n = 0, c = a.length; c > n; n++) o.push(a[n]);
            }), i && m.validColor(i) && (y.curColor = i);
            for (var a = 0, n = o.length; n > a; a++) {
                var c = o[a];
                c && 1 == c.nodeType && "p" == c.nodeName.toLowerCase() && c.parentNode && $(c).replaceTagName("section");
            }
            return e.html = t.html(), e.html;
        }
        return e.html;
    }, i.prototype = {
        _extend: function (e) {
            for (var t in e) this._o[t] = e[t];
        },
        getName: function () {
            return "insertproduct";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            {
                var e = this;
                this._o;
            }
            return function () {
                var t = e.editor;
                if (t) {
                    if (e._o.can_use_product !== !0) {
                        var r = "未关联开通微信支付的小程序，暂无法使用商品组件能力%s去关联%s", i = "";
                        return i = e._o.can_use_wxopen_link === !0 ? "<p style='text-align:center'><a href='" + wx.url("/cgi-bin/wxopen?action=list") + "' target='_blank'>" : "<p style='text-align:center'><a href='" + wx.url("/cgi-bin/wxopen?action=apply_page") + "' target='_blank'>",
                            void u.show({
                                title: "选择商品",
                                type: "info",
                                msg: r.sprintf(i, "</a></p>"),
                                className: "dialog-product-not-support",
                                buttons: [{
                                    text: "确定",
                                    click: function () {
                                        this.remove();
                                    }
                                }]
                            });
                    }
                    var o = e.getCurProductCount();
                    return o >= y.maxLen ? void v.err("最多插入%s个商品".sprintf(y.maxLen)) : void new p({
                        can_use_smart: e._o.can_use_smart,
                        maxLen: y.maxLen - o,
                        editor: t,
                        callback: function (t) {
                            y.curTemplateId && m.getTemplateDataById(y.curTemplateId) && (t.templateId = y.curTemplateId),
                                e.insertHtml(t);
                        }
                    });
                }
            };
        },
        initTemplate: function () {
            y.hasTemplateData !== !0 && m.getTemplate({
                callback: function () {
                    y.hasTemplateData = !0;
                    for (var e = 0, t = y.afterTemplateQueue.length; t > e; e++) {
                        var r = y.afterTemplateQueue[e];
                        "function" == typeof r && r();
                    }
                    y.afterTemplateQueue = [];
                }
            });
        },
        addListener: function (e) {
            if (this._o.clearProduct !== !0) {
                var t = this;
                this.domUtils = this.editor.getDomUtils(), this.createIframeReadyFunc(), this.showPopup(e),
                    e.addListener("beforesavescene", function (e, t) {
                        t && t.content && (t.content = t.content.replace(y.iframeReg, y.iframeRegReplace));
                    }), e.addListener("afterscencerestore", function () {
                    t.afterSetContent();
                }), e.addListener("show_product_template_dialog", function (e, r, i) {
                    $(r).parents(".js_product_popup").find(".js_color_picker").hide(), t.showProductTemplateDialog(i);
                }), e.addListener("beforepaste", function (e, r) {
                    var i = $("<div></div>").html(r.html);
                    i = t.filterData(i), r.html = i.html();
                }), e.addListener("toggle_product_color", function (e, t, r) {
                    t = t || window.event;
                    var i = $(t.target || t.srcElement);
                    if (i.hasClass("js_toggle")) {
                        var o = $(r).find(".js_color_picker");
                        o.is(":hidden") ? o.show() : o.hide();
                    }
                }), e.addListener("templateDialogClosed", function () {
                    t.createIframeReadyFunc();
                }), e.addListener("product_color_pick", function (e, r, i, o) {
                    r = r || window.event;
                    var a = $(r.target || r.srcElement);
                    if (a.hasClass("js_color_icon")) {
                        var n = a.attr("data-color"), c = a.parents(".js_color_picker"), d = t.pickColor(c, n, o);
                        d === !0 && this.fireEvent("hide_common_popup");
                    }
                }), e.addListener("product_color_change", function (e, r, i, o) {
                    var a = $(i), n = a.parents(".js_color_picker"), c = n.find("input.js_color_input").val(), d = n.find(".js_fail");
                    if (c && m.validColor(c)) {
                        d.hide(), r = r || window.event;
                        var l = r.keyCode || r.which || 0;
                        if ("click" == r.type || "keyup" == r.type && 13 == l) {
                            var s = t.pickColor(n, c, o);
                            s === !0 && this.fireEvent("hide_common_popup");
                        }
                    } else c ? d.show().find(".js_fail_msg").text("请输入合法颜色值，如#666666") : d.hide();
                }), e.addListener("common_popup_mouseover", function (e, r, i, o) {
                    if (l(o)) {
                        var a = t._g, n = $(i).find(".js_template")[0];
                        if (n) {
                            var c = n.getBoundingClientRect();
                            r.clientX < parseInt(c.left) || r.clientX > parseInt(c.right) || r.clientY < parseInt(c.top) || r.clientY > parseInt(c.bottom) ? t.cancelHighline() : (a.highlineTimeoutId && (clearTimeout(a.highlineTimeoutId),
                                a.highlineTimeoutId = null), (0 == a.highlineCacheIframe.length || a.highlineTarget !== o) && (a.highlineTarget = o,
                                a.highlineCacheIframe = t.getNeighbor(o).iframeList || [], t.highLineIframe(!0)));
                        } else t.cancelHighline();
                    }
                }), e.addListener("common_popup_mouseout", function (e, r, i, o) {
                    l(o) && t.cancelHighline();
                }), e.addListener("beforekeydown", function (e, r) {
                    if (r = r || window.event, r && r.type) {
                        var i = r.keyCode || r.which;
                        if (8 == i || 46 == i) {
                            var o = this.selection.getRange();
                            if (o.collapsed) {
                                var a;
                                if (8 == i) {
                                    if (1 == o.startContainer.nodeType) a = o.startContainer.childNodes[o.startOffset - 1]; else if (3 == o.startContainer.nodeType) {
                                        var n = o.startContainer.nodeValue.charAt(o.startOffset - 1) || "";
                                        n = n.replace(t.domUtils.fillCharReg, ""), n && (a = o.startContainer);
                                    }
                                    a || (a = d(o.startContainer, "Previous"));
                                } else if (46 == i) {
                                    if (1 == o.startContainer.nodeType) a = o.startContainer.childNodes[o.startOffset]; else if (3 == o.startContainer.nodeType) {
                                        var n = o.startContainer.nodeValue.charAt(o.startOffset) || "";
                                        n = n.replace(t.domUtils.fillCharReg, ""), n && (a = o.startContainer);
                                    }
                                    a || (a = d(o.startContainer, "Next"));
                                }
                                if (a && l(a) === !0) return this.selection.getRange().selectNode(a).select(!0), r.stopPropagation ? (r.stopPropagation(),
                                    r.preventDefault()) : r.cancelBubble = !0, !1;
                            }
                        }
                    }
                });
            }
        },
        cancelHighline: function () {
            this._g.highlineTimeoutId && (clearTimeout(this._g.highlineTimeoutId), this._g.highlineTimeoutId = null);
            var e = this;
            this._g.highlineTimeoutId = setTimeout(function () {
                e.highLineIframe(!1), e._g.highlineTarget = null, e._g.highlineCacheIframe = [];
            }, 100);
        },
        getContainer: function () {
            return this._o.container;
        },
        getTitle: function () {
            return "添加商品";
        },
        beforeSetContent: function (e, t) {
            return i.beforeSetContent({
                isPreview: t,
                html: e,
                clearProduct: this._o.clearProduct
            });
        },
        afterSetContent: function () {
            i.afterSetContent({
                $dom: $(this.editor.getUeditor().body)
            });
        },
        getPluginData: function (e) {
            var t = e.init(), r = t.get("content");
            if (r = r.replace(y.iframeReg, y.iframeRegReplace), this._o.clearProduct === !0) {
                var i = $("<div>").html(r);
                return i = this.filterData(i), r = i.html(), t.set("content", r), t;
            }
            if (/<mpproduct\s/.test(r)) {
                var i = $("<div>").html(r), o = [];
                i.find("mpproduct").each(function () {
                    var e = $(this), t = e.parents("p");
                    if (t && t.length > 0) for (var r = 0, i = t.length; i > r; r++) o.push(t[r]);
                    e.attr("style", y.productStyleText), e.removeAttr("src");
                });
                for (var a = 0, n = o.length; n > a; a++) {
                    var c = o[a];
                    c && 1 == c.nodeType && "p" == c.nodeName.toLowerCase() && c.parentNode && $(c).replaceTagName("section");
                }
                r = i.html();
            }
            return t.set("content", r), t;
        },
        filterData: function (e) {
            return r(e);
        },
        highLineIframe: function (e) {
            var t = this._g.highlineCacheIframe;
            if (t) {
                {
                    this.initHighlineDom();
                }
                e ? (this.showHighlineDom(), this.attachToHighline(t)) : this.hideHighlineDom();
            }
        },
        initHighlineDom: function () {
            if (this._g.highlineDom) return this._g.highlineDom;
            var e = this.editor.getUeditor(), t = document.createElement("div");
            return t.id = e.ui.id + "_product_highline", t.style.cssText = "position: absolute;left: 72px;border: 2px solid #43b548;box-sizing: border-box;right: 72px;display:none;z-index:" + e.options.zIndex + ";",
                e.ui.getDom().appendChild(t), this._g.highlineDom = t, t;
        },
        showHighlineDom: function () {
            this._g.highlineDom.style.display = "block";
        },
        hideHighlineDom: function () {
            this._g.highlineDom.style.display = "none";
        },
        attachToHighline: function (e) {
            if (e && 0 != e.length) {
                var t = UE.ui.uiUtils, r = this.editor.getUeditor(), i = this.editor.getDomUtils(), o = this._g.highlineDom, a = e[0], n = e[e.length - 1], c = i.getXY(a), d = t.getClientRect(a), l = t.getClientRect(n), s = i.getXY(r.iframe), u = i.getXY(this._g.highlineDom.parentNode);
                i.setStyles(o, {
                    height: l.bottom - d.top + "px",
                    top: s.y + c.y - r.document.body.scrollTop - u.y - parseInt(o.style.borderTopWidth) + "px"
                });
            }
        },
        pickColor: function (e, t, r) {
            if (m.validColor(t)) {
                e.find("input").val(t), e.find(".js_fail").hide();
                var i = _.get(y.cacheProductKey) || {}, o = [];
                i.color && (o = i.color || []);
                var a = o.length > 0 ? "," + o.join(",") + "," : "", n = "," + y.defaultColorList.join(",") + ",", c = "," + t + ",";
                return -1 != n.indexOf(c) || a && -1 != a.indexOf(c) || (o.unshift(t), o.length > y.colorCacheMax && o.splice(y.colorCacheMax),
                    i.color = o, _.set(y.cacheProductKey, i)), this.changeProductColor(t, r), !0;
            }
            return !1;
        },
        changeProductColor: function (e, t) {
            var r = m.validColor(e);
            if (r) {
                y.curColor = e;
                var i = $(this.editor.getUeditor().body), o = 0, a = 0, n = [];
                i.find("." + y.className).each(function () {
                    var r = $(this);
                    r.attr("data-color", e), n.push(r), t && this === t && (a = o), o++;
                });
                var c = [];
                if (a > 0) {
                    c.push(n[a]);
                    for (var d = a - 1, l = a + 1; d >= 0 || l < n.length;) n[d] && c.push(n[d]), n[l] && c.push(n[l]), d--,
                        l++;
                } else c = n;
                this.editor.fireEvent("saveScene"), f.createAsynIframeReload(c);
            }
        },
        createIframeReadyFunc: function () {
            var e = this.editor.getUeditor().uid;
            f.createIframeReadyFunc({
                uid: y.iframeUid,
                force: !0,
                editorId: e,
                notClear: !0,
                iframeSelect: !0,
                onIframeReadyFunc: function (e, t, r) {
                    return function (i) {
                        var o = function () {
                            var o = t(i.iframe);
                            o && (i.doc.body.innerHTML = o, r(i.iframe, i.doc.body, e));
                        };
                        y.hasTemplateData === !0 ? o() : y.afterTemplateQueue.push(o);
                    };
                }(e, m.getIframeContentByIframe, m.addIframeImgLoadEvent)
            });
        },
        insertHtml: function (e) {
            var t = m.getTemplateDataById(e.templateId);
            if (t && t.loop) {
                var r = _.get(y.cacheProductKey) || {};
                r.templateId = e.templateId, _.set(y.cacheProductKey, r), y.curTemplateId = e.templateId;
                var i = [], o = [], a = [], n = [];
                if (2 == e.type) i = [].concat(e.productData.splice(0, e.smartNum)), a.push(i), n.push(e.productId); else for (i = [].concat(e.productData),
                                                                                                                                   o = [].concat(e.productId); i.length > 0;) a.push(i.splice(0, t.loop)), n.push(o.splice(0, t.loop));
                for (var c = [], d = 0, l = a.length; l > d; d++) {
                    var s = ["<section>", "", "</section>"];
                    s[1] = this.createLocalIframe({
                        type: e.type,
                        productData: a[d],
                        templateId: e.templateId,
                        productId: n[d],
                        packId: e.packId,
                        smartNum: e.smartNum,
                        color: e.color || y.curColor
                    }), c.push(s.join(""));
                }
                c = c.join("").replace(/<iframe /g, "<mpproduct ").replace(/<\/iframe>/g, "</mpproduct>");
                var u = this.editor.execCommand("insertHtml", c), p = [];
                $(u).find("mpproduct").each(function () {
                    var e = $(this), t = e.attr("data-uid") || "";
                    t || (t = f.getuid(), e.attr("data-uid", t)), e.attr("src", f.getIframeSrc(t, y.iframeUid)),
                        p.push(e);
                }), f.createAsynRenderIframe(p);
            }
        },
        createLocalIframe: function (e) {
            return function (e, t, r) {
                return f.createLocalIframe({
                    noSrc: !0,
                    uid: t,
                    attr: {
                        " frameborder": "0",
                        "class": r,
                        "data-product": encodeURIComponent(JSON.stringify({
                            productData: e.productData
                        })),
                        "data-pid": encodeURIComponent(e.productId.join(m.pidSplitKey)),
                        "data-type": e.type,
                        "data-templateid": e.templateId,
                        "data-packid": e.packId,
                        "data-smartnum": e.smartNum,
                        "data-color": e.color,
                        style: y.productStyleText
                    }
                });
            }(e, y.iframeUid, y.className);
        },
        getCurProductCount: function () {
            var e = $(this.editor.getUeditor().body), t = 0;
            return e.find("." + y.className).each(function () {
                var e = $(this), r = e.attr("data-type"), i = 1 * e.attr("data-smartnum"), o = e.attr("data-pid") || "";
                try {
                    o = decodeURIComponent(o);
                } catch (a) {
                }
                t += 2 == r ? i : o.split(m.pidSplitKey).length;
            }), t;
        },
        getNotRenderProductCount: function () {
            return $(this.editor.getUeditor().body).find("mpproduct").length;
        },
        showPopup: function (e) {
            e.getUeditor();
            e.addListener("mouseover_common_popup", function (e, t, r) {
                var i = r.target || r.srcElement;
                if (l(i) === !0) {
                    var o = _.get(y.cacheProductKey) || {};
                    o = o.color ? o.color || [] : [], o = [].concat(o, y.defaultColorList);
                    var a = y.PopupIconTplCompile({
                        list: o
                    });
                    t.html += y.PopupTplCompile({
                        colorList: a
                    }), t.adjust = !0, t.node = i;
                }
            });
        },
        getProductIframeFromRange: function (e, t) {
            if (e) {
                var r = e[t + "Container"];
                if (r && 1 == r.nodeType) {
                    var i = r.childNodes[e[t + "Offset"]];
                    if (i && 1 == i.nodeType) {
                        if (l(i) === !0) return i;
                        for (var o, a = i.getElementsByTagName("iframe"), n = 0, c = a.length; c > n; n++) {
                            var d = a[n];
                            if (l(d) === !0) {
                                o = d;
                                break;
                            }
                        }
                        return o;
                    }
                }
            }
        },
        showProductTemplateDialog: function (e) {
            var t = m.getOptionsFromIframe(e);
            if (t && t.templateId) {
                var r = t.productData;
                if (r && r.length > 0) {
                    {
                        var i = this;
                        t.type;
                    }
                    new m.myclass({
                        color: y.curColor || "",
                        templateId: t.templateId,
                        productData: r[0],
                        editor: this.editor,
                        callback: function (t) {
                            var r = i.editor.getDomUtils(), o = i.getNeighbor(e);
                            if (o && o.opts && o.iframeList && 0 != o.iframeList.length) {
                                o.opts.templateId = t.id;
                                for (var a = this.editor.getUeditor(), n = o.iframeList.length - 1; n >= 0; n--) {
                                    var d = o.iframeList[n];
                                    if (0 == n) {
                                        var l = a.selection.getRange().selectNode(d).select();
                                        l && l.collapse(!0);
                                    }
                                    var s = d.parentNode;
                                    if ($(d).remove(), s && !r.isBody(s)) {
                                        var u = c()(s);
                                        if (u === !1) {
                                            if (0 == n) {
                                                var l = a.selection.getRange().selectNode(s).select();
                                                l && l.collapse(!0);
                                            }
                                            $(s).remove();
                                        }
                                    }
                                }
                                i.insertHtml(o.opts);
                            }
                        }
                    });
                }
            }
        },
        getNeighbor: function (e) {
            var t = (this.editor.getDomUtils(), {
                iframeList: [],
                opts: null
            });
            if (!e) return t;
            var r = e.getAttribute("data-uid"), i = $(this.editor.getUeditor().body);
            if (e = i.find("." + y.className + "[data-uid=" + r + "]"), !r || !e || 0 == e.length) return t;
            if (e = e[0], t.opts = m.getOptionsFromIframe(e), !t.opts) return t;
            var a = 1 * e.getAttribute("data-type");
            if (2 === a) return t.iframeList.push(e), t;
            var n = 0, c = void 0, d = [];
            if (i.find("." + y.className).each(function () {
                this === e && (c = n), n++, d.push(this);
            }), "undefined" == typeof c) return t;
            for (var l = [], s = c - 1; s >= 0 && 1 * d[s].getAttribute("data-type") !== 2; s--) l.push(d[s]);
            l.reverse();
            for (var u = [], s = c + 1, p = d.length; p > s && 1 * d[s].getAttribute("data-type") !== 2; s++) u.push(d[s]);
            var f = [].concat(l, d[c], u);
            c = l.length;
            var h = {}, g = {
                Previous: {
                    ratio: -1
                },
                Next: {
                    ratio: 1
                }
            };
            for (var v in g) {
                var a = v;
                h[a] = [];
                for (var _ = g[v].ratio, n = c + _, C = f[c], I = f[n]; I && o(C, I, a) === !0;) h[a].push(I), C = I, n += _,
                    I = f[n];
            }
            h.Previous.reverse(), t.iframeList = [].concat(h.Previous, f[c], h.Next), t.opts.productData = this.mergeProduct(t.iframeList);
            for (var T = [], s = 0, p = t.opts.productData.length; p > s; s++) T.push(t.opts.productData[s].pid);
            return t.opts.productId = T, t;
        },
        mergeProduct: function (e) {
            for (var t = [], r = 0, i = e.length; i > r; r++) {
                var o = m.getOptionsFromIframe(e[r]);
                o && o.productData && (t = t.concat(o.productData));
            }
            return t;
        }
    }, f.initEventInterface(i), i;
});
define("common/wx/mpEditor/plugin/insertTemplate.js", ["media/template_common.js", "common/wx/media/templateDialog.js", "common/wx/Tips.js"], function (e) {
    "use strict";

    function n(e) {
        this._o = {
            token: "",
            appmsg_template_cnt: 0,
            can_use_vote: !1,
            can_use_card: !1,
            biz_uin: "",
            can_use_voice: !1,
            qqmusic_flag: !1,
            can_use_weapp_card: !1,
            can_use_txvideo: !1,
            can_use_hyperlink: !1,
            can_use_appmsg_outer_url: !1,
            can_see_ad: !1
        }, this._extend(e), this.editor = null;
    }

    var t = e("media/template_common.js"), a = e("common/wx/media/templateDialog.js"), _ = e("common/wx/Tips.js");
    return n.prototype = {
        _extend: function (e) {
            for (var n in e) this._o[n] = e[n];
        },
        getName: function () {
            return "inserttemplate";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var e = this, n = this._o;
            return function (c, o) {
                var i = e.editor;
                if (i) {
                    if (t.maxTemplateNum - n.appmsg_template_cnt <= 0) return void _.err("最多只能添加%s个模版".sprintf(t.maxTemplateNum));
                    var o = i.getEditorData(null, "range");
                    new a({
                        content: o.content || "",
                        can_use_txvideo: n.can_use_txvideo,
                        can_use_hyperlink: n.can_use_hyperlink,
                        can_use_appmsg_outer_url: n.can_use_appmsg_outer_url,
                        can_use_vote: n.can_use_vote,
                        can_use_card: n.can_use_card,
                        biz_uin: n.biz_uin,
                        can_use_voice: n.can_use_voice,
                        qqmusic_flag: n.qqmusic_flag,
                        can_use_weapp_card: n.can_use_weapp_card,
                        can_see_ad: n.can_see_ad,
                        token: n.token,
                        onSuccess: function () {
                            i.fireEvent("templateDialogClosed");
                        }
                    });
                }
            };
        },
        getType: function () {
            return 1;
        },
        getTitle: function () {
            return "添加图文模版";
        }
    }, n;
});
define("common/wx/mpEditor/plugin/emotion.js", ["common/wx/mpEditor/plugin/emotionButton.js"], function (t) {
    "use strict";

    function e() {
        this.__o = {}, this.editor = null;
    }

    var n = (t("common/wx/mpEditor/plugin/emotionButton.js"), {
        defaultImg: "https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif"
    });
    return e.beforeSetContent = function (t) {
        return t.html;
    }, e.prototype = {
        getName: function () {
            return "mpemotion";
        },
        noCommandReprot: function () {
            return !0;
        },
        beforeSetContent: function (t) {
            return e.beforeSetContent({
                html: t
            });
        },
        getExecCommand: function () {
            var t = this;
            return function (e, n) {
                var o = t.editor;
                if (o && n && n.name) {
                    var i = o.execCommand("insertHtml", t.formatHtml(n.name)), r = $(i[0]), m = r.css("backgroundImage").match(/url\(([^\)]+)\)/);
                    if (m && m[1]) {
                        m = m[1].replace(/^['"]|['"]$/g, "");
                        var a = 6;
                        /^http(s)?:\/\/.+\.mp.weixin.qq.com(\:\d+)?/.test(m) && (a = 0), m = m.replace(/^http(s)?:\/\/.*\.mp.weixin.qq.com(\:\d+)?/, "https://res.wx.qq.com"),
                            m = m.split(".");
                        var c = m[m.length - 2];
                        m[m.length - 2] = c.substring(0, c.length - a), r.removeAttr("class").removeAttr("_src").attr({
                            src: m.join("."),
                            style: "display:inline-block;width:20px;vertical-align:text-bottom;"
                        });
                    }
                }
            };
        },
        getType: function () {
            return 1;
        },
        getTitle: function () {
            return "表情";
        },
        formatHtml: function (t) {
            return '<img class="' + t + '" src="' + n.defaultImg + '" data-ratio="1" data-w="20" style="width:20px;height:20px;vertical-align:middle;display:inline-block;-webkit-background-size:20px auto;background-size:20px auto;" />';
        },
        initToolBar: function (t) {
            var e = t.getUi(), n = this.getTitle(), o = this.getName();
            e[o] = function (t) {
                return function (o) {
                    var i = new e.EmotionButton({
                        useArrow: !1,
                        title: n,
                        editor: o,
                        _onEmotionSelect: function (t) {
                            o.execCommand("mpemotion", t);
                        }
                    });
                    return e.buttons[t] = i, o.addListener("selectionchange", function () {
                        i.setDisabled(-1 == o.queryCommandState(t));
                    }), i;
                };
            }(o);
        }
    }, e;
});
define("common/wx/mpEditor/plugin/unlink.js", [], function () {
    "use strict";

    function t() {
        this.editor = null, this.__g = {
            name: "unlink",
            title: "取消超链接"
        };
    }

    return t.beforeSetContent = function (t) {
        return t.html;
    }, t.prototype = {
        getName: function () {
            return this.__g.name;
        },
        getExecCommand: function () {
            var t = this;
            return function () {
                if (t.editor) {
                    var e, n = t.editor, i = n.getSelectionRange(), r = n.getDomUtils();
                    (!i.collapsed || r.findParentByTagName(i.startContainer, "a", !0)) && (e = i.createBookmark(),
                        n.fireEvent("link_optimize", i), i.removeInlineStyle("a").moveToBookmark(e).select());
                }
            };
        },
        beforeSetContent: function (e) {
            return t.beforeSetContent({
                html: e
            });
        },
        getType: function () {
            return 1;
        },
        getTitle: function () {
            return this.__g.title;
        },
        getQueryCommandState: function () {
            var t = this;
            return function () {
                var e = t.editor;
                return e && !e.isHighlight() && e.queryCommandValue("link") ? 0 : -1;
            };
        },
        getContextMenu: function () {
            var t = this.__g, e = {
                label: t.title,
                cmdName: t.name
            };
            return e;
        }
    }, t;
});
define("common/wx/mpEditor/plugin/link.js", ["common/wx/popup.js", "biz_web/ui/checkbox.js", "biz_common/jquery.validate.js", "common/wx/Cgi.js", "tpl/mpEditor/plugin/link_dialog.html.js", "tpl/mpEditor/plugin/link_appmsg.html.js", "tpl/mpEditor/plugin/link_acc_item.html.js", "tpl/mpEditor/plugin/link_popup.html.js", "biz_common/moment.js", "common/wx/Tips.js", "common/wx/popover.js", "common/wx/ban.js", "common/wx/pagebar.js"], function (e) {
    "use strict";

    function t(e) {
        this.editor = null, this.__g = {
            dom: {},
            form: {},
            canWriteBack: !1,
            articlePerPage: 5,
            accPerPage: 5,
            can_use_hyperlink: e.can_use_hyperlink,
            can_use_appmsg_outer_url: e.can_use_appmsg_outer_url
        }, i.addMethod("inner_link", function (e) {
            return /http(s)?:\/\/mp\.weixin\.qq\.com\/(s\?|s\/|mp\/appmsg\/show\?)/.test(e) ? !0 : !1;
        }, "请输入公众号文章链接"), i.addMethod("temp_link", function (e) {
            return /^https?\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/.test(e) ? !1 : !0;
        }, "不能输入公众号文章的预览链接");
    }

    e("common/wx/popup.js"), e("biz_web/ui/checkbox.js");
    var i = e("biz_common/jquery.validate.js"), a = e("common/wx/Cgi.js"), n = e("tpl/mpEditor/plugin/link_dialog.html.js"), r = e("tpl/mpEditor/plugin/link_appmsg.html.js"), c = e("tpl/mpEditor/plugin/link_acc_item.html.js"), s = e("tpl/mpEditor/plugin/link_popup.html.js"),
        o = e("biz_common/moment.js"), l = e("common/wx/Tips.js"), _ = (e("common/wx/popover.js"),
            e("common/wx/ban.js")), d = e("common/wx/pagebar.js"), u = {
            service_type: {
                0: "订阅号",
                1: "订阅号",
                2: "服务号",
                "-1": "服务号"
            }
        };
    return t.beforeSetContent = function (e) {
        return e.html;
    }, t.prototype = {
        getName: function () {
            return "link";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var e = this;
            return function () {
                e.editor && e.__openDialog();
            };
        },
        addListener: function (e) {
            var t = this;
            e.addListener("link_optimize", function (e, i) {
                t.__optimize(i);
            }), e.addListener("handle_common_popup", function (t, i) {
                var a, n = e.queryCommandValue("link", i.node || null);
                if (n && (a = n.getAttribute("_href") || n.getAttribute("href", 2))) {
                    var r = a;
                    a.length > 30 && (r = a.substring(0, 20) + "..."), i.html += wx.T(s, {
                        needBreak: i.html ? !0 : !1,
                        url: a,
                        txt: r
                    }), i.node = n;
                }
            });
        },
        beforeSetContent: function (e) {
            return t.beforeSetContent({
                html: e
            });
        },
        getType: function () {
            return 1;
        },
        getTitle: function () {
            return "超链接";
        },
        getQueryCommandState: function () {
            var e = this;
            return function () {
                var t = e.editor;
                if (!t) return 0;
                var i = t.getSelectionRange().getClosedNode(), a = i && "edui-faked-video" == i.className;
                return a ? -1 : 0;
            };
        },
        getQueryCommandValue: function () {
            var e = this;
            return function (t, i) {
                var a = e.editor;
                if (a) {
                    var n, r, c = a.getDomUtils();
                    if (i || (n = a.getSelectionRange()), n && n.collapsed) {
                        if (r = n.startContainer, r = 1 == r.nodeType ? r : r.parentNode, r && (r = c.findParentByTagName(r, "a", !0)) && !c.isInNodeEndBoundary(n, r)) return r;
                    } else {
                        if (n) {
                            n.shrinkBoundary();
                            var s = 3 != n.startContainer.nodeType && n.startContainer.childNodes[n.startOffset] ? n.startContainer.childNodes[n.startOffset] : n.startContainer, o = 3 == n.endContainer.nodeType || 0 == n.endOffset ? n.endContainer : n.endContainer.childNodes[n.endOffset - 1],
                                l = n.getCommonAncestor();
                            if (r = c.findParentByTagName(l, "a", !0), !r && 1 == l.nodeType) for (var _, d, u, p = l.getElementsByTagName("a"), h = 0; u = p[h++];) if (_ = c.getPosition(u, s),
                                d = c.getPosition(u, o), (_ & c.POSITION_FOLLOWING || _ & c.POSITION_CONTAINS) && (d & c.POSITION_PRECEDING || d & c.POSITION_CONTAINS)) {
                                r = u;
                                break;
                            }
                            return r;
                        }
                        if (i) {
                            if (r = c.findParentByTagName(i, "a", !0), !r && 1 == i.nodeType) {
                                var p = i.getElementsByTagName("a");
                                if (p && p[0]) return p[0];
                            }
                            return r;
                        }
                    }
                }
            };
        },
        __openDialog: function () {
            this.__DialogInit(), this.__initDialogData(), this.__DialogEvent();
        },
        __DialogEvent: function () {
            {
                var e = this, t = this.__g, i = t.dom, a = t._linkDialog;
                t._perPage;
            }
            i.$innerMain.find("input[name=link_type][type=radio]").checkbox({
                onChanged: function (e) {
                    var t = e.val();
                    i.$innerMain.find(".js_link_type").hide(), i.$innerMain.find(".js_link_type_" + t).show(),
                        a.popup("resetPosition");
                }
            }), t.form = i.$dialogDom.find("#myform").validate({
                rules: {
                    innerLink: {
                        required: function () {
                            return i.$innerTabItem.hasClass("selected") && i.$innerMain.find("input[name=link_type][type=radio][value=1]").prop("checked") ? !0 : !1;
                        },
                        url: !0,
                        inner_link: !0,
                        temp_link: !0
                    },
                    outerLink: {
                        required: function () {
                            return i.$outerTabItem.hasClass("selected") ? !0 : !1;
                        },
                        url: !0
                    },
                    outerTitle: {
                        required: function () {
                            return i.$outerTabItem.hasClass("selected") ? !0 : !1;
                        }
                    },
                    innerTitle: {
                        required: function () {
                            return i.$innerTabItem.hasClass("selected") ? !0 : !1;
                        }
                    }
                },
                messages: {
                    innerLink: {
                        required: "链接地址不能为空",
                        url: "请输入公众号文章链接，且必须以http://或https://开头",
                        inner_link: "请输入公众号文章链接，且必须以http://或https://开头",
                        temp_link: "不能输入公众号文章的预览链接"
                    },
                    outerLink: {
                        required: "链接地址不能为空",
                        url: "请输入有效的链接(必须以http://或https://开头)"
                    },
                    outerTitle: {
                        required: "请输入链接标题"
                    },
                    innerTitle: {
                        required: "请输入链接标题"
                    }
                }
            }), i.$tabMain.on("click", ".js_tab_item", function () {
                var e = $(this), a = e.data("tab");
                "inner" == a ? (i.$innerTabItem.addClass("selected"), i.$outerTabItem.removeClass("selected"),
                    i.$innerMain.show(), i.$outerMain.hide(), t._linkDialog.popup("resetPosition")) : (i.$innerTabItem.removeClass("selected"),
                    i.$outerTabItem.addClass("selected"), i.$innerMain.hide(), i.$outerMain.show(), t._linkDialog.popup("resetPosition"));
            }), i.$jsSelfAcc.click(function () {
                e.__selectAcc({
                    nickname: wx.data.nick_name || wx.data.user_name || "",
                    fakeid: ""
                });
            }), i.$dialogDom.find(".js_reset_acc").click(function () {
                e.__resetAcc();
            }), i.$accSearchDel.click(function () {
                $(this).hide(), e.__resetAcc();
            }), i.$accSearchInput.keyup(function (t) {
                i.$accSearchInput.val().trim() ? i.$accSearchDel.show() : (i.$accSearchDel.hide(), e.__resetAcc());
                var a = t.keyCode || t.which || 0;
                13 == a && i.$accSearchBtn.trigger("click");
            }), i.$accSearchBtn.click(function () {
                var t = i.$accSearchInput.val().trim();
                t && e.__searchAcc(t);
            }), i.$articleSearchDel.click(function () {
                $(this).hide(), e.__resetArticle();
            }), i.$articleSearchInput.keyup(function (t) {
                i.$articleSearchInput.val().trim() ? i.$articleSearchDel.show() : (i.$articleSearchDel.hide(),
                    e.__resetArticle());
                var a = t.keyCode || t.which || 0;
                13 == a && i.$articleSearchBtn.trigger("click");
            }), i.$articleSearchBtn.click(function () {
                var t = i.$articleSearchInput.val().trim() || "";
                e.__searchArticle(t);
            }), i.$accList.on("click", ".js_acc_item", function () {
                var t = $(this), i = t.data("fakeid"), a = t.data("nickname");
                e.__selectAcc({
                    fakeid: i,
                    nickname: a
                });
            });
        },
        __searchAcc: function (e) {
            var t = this.__g.dom;
            t.$accSearchTips.hide(), t.$jsSelfAcc.parent().hide(), this.__getAccList({
                searchKey: e,
                page: 0
            });
        },
        __searchArticle: function (e) {
            this.__getArticleList({
                searchKey: e,
                page: 0
            });
        },
        __checkAccLoading: function (e) {
            return this.__g["getting_" + e + "_data"];
        },
        __showLoading: function (e) {
            var t = this.__g, i = t.dom;
            t["getting_" + e + "_data"] = !0, i["$" + e + "Content"].show(), i["$" + e + "Loading"].show(), i["$" + e + "List"].hide(),
                i["$" + e + "Pagebar"].hide();
        },
        __hideLoading: function (e) {
            var t = this.__g, i = t.dom;
            t["getting_" + e + "_data"] = !1, i["$" + e + "Loading"].hide();
        },
        __getArticleList: function (e) {
            var t = this, i = this.__g;
            t.__checkAccLoading("article") !== !0 && (t.__showLoading("article"), e.searchKey = e.searchKey || "",
                a.get({
                    url: "/cgi-bin/appmsg",
                    data: {
                        action: "list_ex",
                        begin: e.page * i.articlePerPage,
                        count: i.articlePerPage,
                        query: e.searchKey,
                        fakeid: i.currentFakeid || "",
                        type: 9
                    },
                    mask: !1
                }, {
                    done: function (a) {
                        if (i._linkDialog) if (t.__hideLoading("article"), a && a.base_resp && 0 == a.base_resp.ret) t.__renderArticleList({
                            code: 0,
                            list: a.app_msg_list || [],
                            total: 1 * a.app_msg_cnt,
                            page: e.page,
                            searchKey: e.searchKey
                        }); else {
                            var n = "";
                            a && a.base_resp && 200013 == a.base_resp.ret && (n = "操作太频繁，请稍后再试"), t.__renderArticleList({
                                code: -1,
                                msg: n,
                                searchKey: e.searchKey
                            });
                        }
                    },
                    fail: function () {
                        i._linkDialog && (t.__hideLoading("article"), t.__renderArticleList({
                            code: -1,
                            searchKey: e.searchKey
                        }));
                    }
                }));
        },
        __getAccList: function (e) {
            var t = this, i = this.__g;
            e.searchKey && t.__checkAccLoading("acc") !== !0 && (t.__showLoading("acc"), a.get({
                url: "/cgi-bin/searchbiz?action=search_biz",
                data: {
                    query: e.searchKey,
                    begin: e.page * i.accPerPage,
                    count: i.accPerPage
                },
                mask: !1
            }, {
                done: function (a) {
                    if (i._linkDialog) if (t.__hideLoading("acc"), a && a.base_resp && 0 == a.base_resp.ret) t.__renderAccList({
                        code: 0,
                        list: a.list || [],
                        total: 1 * a.total,
                        page: e.page,
                        searchKey: e.searchKey
                    }); else {
                        var n = "";
                        a && a.base_resp && 200013 == a.base_resp.ret && (n = "操作太频繁，请稍后再试"), t.__renderAccList({
                            code: -1,
                            msg: n,
                            searchKey: e.searchKey
                        });
                    }
                },
                fail: function () {
                    i._linkDialog && (t.__hideLoading("acc"), t.__renderAccList({
                        code: -1,
                        searchKey: e.searchKey
                    }));
                }
            }));
        },
        __renderArticleList: function (e) {
            var t = this.__g, i = t.dom;
            t._linkDialog && (0 == e.code || e.msg ? 0 != e.code || e.list && 0 != e.list.length || e.msg || (e.msg = "暂无搜索结果") : e.msg = "系统繁忙，请稍后再试",
                t.curArticleList = e.list || [], t.selectedArticle = void 0, t.curArticleList.each(function (e) {
                e.update_time_str = o.unix(e.update_time).format("YYYY-MM-DD"), e.link = $.trim(e.link.replace("#rd", "&scene=21#wechat_redirect")),
                    e.title = $.trim(e.title || "无标题");
            }), i.$articleList.html(template.compile(r)({
                list: t.curArticleList,
                service_type: u.service_type,
                msg: e.msg
            })).show(), i.$articleLoading.hide(), t.curArticleList.length > 0 && i.$articleList.on("click", ".js_article_i", function () {
                var e = $(this);
                i.$articleList.find(".js_article_label.selected").removeClass("selected").find("input[type=radio]").attr("checked", !1).prop("checked", !1),
                    e.parents(".js_article_label").addClass("selected").find("input[type=radio]").attr("checked", !0).prop("checked", !0),
                    t.selectedArticle = e.data("index");
            }), 0 == e.code && e.total > 0 && "undefined" != typeof e.page ? this.__initPageBar({
                type: "article",
                curPage: e.page + 1,
                total: e.total,
                searchKey: e.searchKey
            }) : i.$accPagebar.hide(), t._linkDialog.popup("resetPosition"));
        },
        __renderAccList: function (e) {
            var t = this.__g, i = t.dom;
            t._linkDialog && (0 == e.code || e.msg ? 0 != e.code || e.list && 0 != e.list.length || e.msg || (e.msg = "不存在该公众号") : e.msg = "系统繁忙，请稍后再试",
                e.msg ? (i.$accSearchTips.show().find("span").text(e.msg), i.$accContent.hide()) : (i.$accSearchTips.hide(),
                    i.$accContent.show(), i.$accList.html(template.compile(c)({
                    list: e.list,
                    service_type: u.service_type
                })).show()), i.$accLoading.hide(), 0 == e.code && e.total > 0 && "undefined" != typeof e.page ? this.__initPageBar({
                type: "acc",
                curPage: e.page + 1,
                total: e.total,
                searchKey: e.searchKey
            }) : i.$accPagebar.hide(), t._linkDialog.popup("resetPosition"));
        },
        __initPageBar: function (e) {
            var t = this, i = this.__g, a = i.dom, n = e.type + "_pagebar";
            i[n] && i[n].destroy(), i[n] = new d({
                container: a["$" + e.type + "Pagebar"],
                perPage: i[e.type + "PerPage"],
                initShowPage: e.curPage,
                totalItemsNum: Math.min(e.total, 2e3),
                first: !1,
                last: !1,
                isSimple: !0,
                callback: function (i) {
                    var a = e.type.substr(0, 1).toUpperCase() + e.type.substr(1);
                    t["__get" + a + "List"]({
                        searchKey: e.searchKey,
                        page: 1 * i.currentPage - 1
                    });
                }
            });
        },
        __resetArticle: function () {
            var e = this.__g.dom;
            e.$articleSearchInput.val("");
        },
        __resetAcc: function () {
            var e = this.__g, t = e.dom;
            e.currentFakeid = "", e.curArticleList = [], e.selectedArticle = void 0, t.$accText.html(""),
                t.$accDesc.hide(), t.$accSearchInput.val(""), t.$accSearchTips.hide().find("span").text(""),
                t.$accSearchMain.show().parents(".frm_control_group").removeClass("show_value"),
                t.$jsSelfAcc.parent().show(), t.$accContent.hide(), t.$articleContent.hide(), e._linkDialog.popup("resetPosition");
        },
        __selectAcc: function (e) {
            this.__g.currentFakeid = e.fakeid || "";
            var t = this.__g.dom;
            t.$accSearchMain.hide().parents(".frm_control_group").addClass("show_value"), t.$jsSelfAcc.parent().hide(),
                t.$accContent.hide(), t.$accText.html((e.nickname || "").html(!0)), t.$accDesc.show(),
                t.$articleContent.show(), t.$articleList.hide(), t.$articlePagebar.hide(), this.__resetArticle(),
                this.__getArticleList({
                    searchKey: "",
                    page: 0
                });
        },
        __initDialogData: function () {
            var e = this.__g, t = e.dom, i = (e._linkDialog, this.editor), a = i.getDomUtils(), n = i.getSelectionRange(), r = n.collapsed ? i.queryCommandValue("link") : i.getSelectionStart();
            if (e.tempLinkWarn = !0, e.getting_acc_data = !1, e.getting_article_data = !1, r) {
                a.findParentByTagName(r, "a", !0) && (r = a.findParentByTagName(r, "a", !0));
                var c = r.text || "你已选中了添加链接的文本内容";
                t.$outerTitle.val(c).attr("disabled", !0).parent().addClass("disabled"), t.$innerTitle.val(c).attr("disabled", !0).parent().addClass("disabled"),
                    t.$outerLinkInput.val(r.href || "http://"), t.$innerLinkInput.val(r.href || "http://"),
                    e.canWriteBack = !1;
            } else e.canWriteBack = !0;
            if (window.wx && window.wx.cgiData && "undefined" != typeof window.wx.cgiData.func_ban_info && !_(wx.cgiData.func_ban_info, "outer-url")) {
                var s, o = 18;
                $.each(wx.cgiData.func_ban_info, function (e, t) {
                    return t.func_id == o ? (s = t, !1) : void 0;
                });
                var l = _.getReason(s.reason_id), d = '你的帐号<a target="_blank" href="' + (l.pc_url ? l.pc_url : defaultReason.pc_url) + '">' + l.reason_description + "</a>，", u = new Date(1e3 * s.unlock_time);
                s.ban_time == s.unlock_time ? d += "已被永久屏蔽图文消息外链功能。" : (d += "已被屏蔽图文消息外链功能至", d += u.getFullYear() + "/" + (u.getMonth() + 1) + "/" + u.getDate(),
                    d += "，期间图文消息外链功能将不可用。"), t.$outerLinkInput.attr("disabled", !0).parent().addClass("disabled"),
                    t.$ok.disable(), t.$warnTips.show().find(".js_tips").html(d);
            }
            e._linkDialog.popup("show");
        },
        __destroy: function () {
            var e = this.__g;
            e._linkDialog && (e._linkDialog.popup("remove"), e._linkDialog = null), this._popover && (this._popover.remove(),
                this._popover = null), e.acc_pagebar && (e.acc_pagebar.destroy(), e.acc_pagebar = null),
            e.article_pagebar && (e.article_pagebar.destroy(), e.article_pagebar = null), e.dom = {},
                e.form = {}, e.currentFakeid = "", e.selectedArticle = void 0, e.curArticleList = [];
        },
        __DialogInit: function () {
            var e = this, t = this.__g, i = wx.T(n, {
                flag: t.can_use_hyperlink && 0 != t.can_use_appmsg_outer_url
            });
            t._linkDialog = $(i).popup({
                title: "编辑超链接",
                className: "align_edge link_dialog_wrap",
                width: "800",
                autoShow: !1,
                buttons: [{
                    text: "确定",
                    type: "primary",
                    click: function () {
                        t._linkDialog;
                        if (e.__checkAccLoading("acc") !== !0 && e.__checkAccLoading("article") !== !0) {
                            if (!t.form.form()) return void l.err("请完善表单内容");
                            if (t.dom.$innerTabItem.hasClass("selected")) {
                                var i;
                                if (t.dom.$innerMain.find("input[name=link_type][type=radio][value=1]").prop("checked")) i = {
                                    href: t.dom.$innerLinkInput.val().trim(),
                                    target: "_blank"
                                }, t.canWriteBack && (i.textValue = t.dom.$innerTitle.val().trim()); else {
                                    if (!t.curArticleList || 0 == t.curArticleList.length) return void l.err("请搜索公众号文章");
                                    if ("undefined" == typeof t.selectedArticle || !t.curArticleList[t.selectedArticle]) return void l.err("请选择公众号文章");
                                    var a = t.curArticleList[t.selectedArticle];
                                    i = {
                                        href: a.link,
                                        target: "_blank"
                                    }, t.canWriteBack && (i.textValue = a.title.replace(/<em>/g, "").replace(/<\/em>/g, ""));
                                }
                                i && e.__insertLink(i);
                            } else t.dom.$outerTabItem.hasClass("selected") && (i = {
                                href: t.dom.$outerLinkInput.val().trim(),
                                target: "_blank"
                            }, t.canWriteBack && (i.textValue = t.dom.$outerTitle.val().trim()), e.__insertLink(i));
                            e.__destroy();
                        }
                    }
                }, {
                    text: "取消",
                    click: function () {
                        e.__destroy();
                    }
                }],
                onHide: function () {
                    e.__destroy();
                }
            });
            var a = t._linkDialog.popup("get");
            t.dom = {
                $dialogDom: a,
                $ok: a.find(".js_btn").eq(0),
                $tabMain: a.find(".js_tab_main"),
                $innerTabItem: a.find(".js_tab_item[data-tab=inner]"),
                $outerTabItem: a.find(".js_tab_item[data-tab=outer]"),
                $innerMain: a.find(".js_inner_main"),
                $outerMain: a.find(".js_outer_main"),
                $accPagebar: a.find(".js_acc_pagebar"),
                $articlePagebar: a.find(".js_article_pagebar"),
                $accLoading: a.find(".js_acc_loading"),
                $articleLoading: a.find(".js_article_loading"),
                $articleContent: a.find(".js_article_content"),
                $accContent: a.find(".js_acc_content"),
                $articleList: a.find(".js_article_list"),
                $accList: a.find(".js_acc_list"),
                $warnTips: a.find(".js_warn_tips"),
                $outerTitle: a.find(".js_outer_title"),
                $innerTitle: a.find(".js_inner_title"),
                $innerLinkInput: a.find(".js_inner_link_input"),
                $outerLinkInput: a.find(".js_outer_link_input"),
                $accSearchMain: a.find(".js_acc_search_main"),
                $jsSelfAcc: a.find(".js_self_acc"),
                $accSearchBtn: a.find(".js_acc_search_btn"),
                $accSearchDel: a.find(".js_acc_search_del"),
                $accSearchInput: a.find(".js_acc_search_input"),
                $accSearchTips: a.find(".js_acc_search_tips"),
                $articleSearchBtn: a.find(".js_article_search_btn"),
                $articleSearchDel: a.find(".js_article_search_del"),
                $articleSearchInput: a.find(".js_article_search_input"),
                $accDesc: a.find(".js_acc_desc"),
                $accText: a.find(".js_acc_Text")
            };
        },
        __insertLink: function (e) {
            var t, i = this.editor, a = i.getUtils();
            i.fireEvent("funcPvUvReport", "link"), e._href && (e._href = a.unhtml(e._href, /[<">]/g)),
            e.href && (e.href = a.unhtml(e.href, /[<">]/g)), e.textValue && (e.textValue = a.unhtml(e.textValue, /[<">]/g)),
                this.__doLink(t = i.getSelectionRange(), e), t.collapse().select(!0);
        },
        __optimize: function (e) {
            var t = this.editor.getDomUtils(), i = e.startContainer, a = e.endContainer;
            (i = t.findParentByTagName(i, "a", !0)) && e.setStartBefore(i), (a = t.findParentByTagName(a, "a", !0)) && e.setEndAfter(a);
        },
        __doLink: function (e, t) {
            var i = this.editor, a = e.cloneRange(), n = i.getBrowser(), r = i.getDomUtils(), c = i.queryCommandValue("link"), s = i.getUtils();
            this.__optimize(e = e.adjustmentBoundary());
            var o = e.startContainer;
            if (1 == o.nodeType && c && (o = o.childNodes[e.startOffset], o && 1 == o.nodeType && "A" == o.tagName && /^(?:https?|ftp|file)\s*:\s*\/\//.test(o[n.ie ? "innerText" : "textContent"]) && (o[n.ie ? "innerText" : "textContent"] = s.html(t.textValue || t.href))),
            (!a.collapsed || c) && (e.removeInlineStyle("a"), a = e.cloneRange()), a.collapsed) {
                var l = e.document.createElement("a"), _ = "";
                t.textValue ? (_ = s.html(t.textValue), delete t.textValue) : _ = s.html(t.href), r.setAttributes(l, t),
                    o = r.findParentByTagName(a.startContainer, "a", !0), o && r.isInNodeEndBoundary(a, o) && e.setStartAfter(o).collapse(!0),
                    l[n.ie ? "innerText" : "textContent"] = _, e.insertNode(l).selectNode(l);
            } else e.applyInlineStyle("a", t);
        }
    }, t;
});
define("common/wx/mpEditor/plugin/shop.js", ["common/wx/Tips.js", "common/wx/pagebar.js", "shop/shopDialog.js", "common/wx/Cgi.js"], function (o) {
    "use strict";
    var i = (o("common/wx/Tips.js"), o("common/wx/pagebar.js"), o("shop/shopDialog.js")), n = (o("common/wx/Cgi.js"),
        function (o) {
            this.domid = o.container, this.biz_uin = o.biz_uin || "";
            this.container = $(o.container).show();
        });
    return n.prototype = {
        getName: function () {
            return "insertshop";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var o = this;
            return function () {
                var i = this, n = o.editor;
                n && o.openShopPopup(i);
            };
        },
        doCommand: function (o, i, n) {
            n && console.log("insert shop");
        },
        getContainer: function () {
            return this.domid;
        },
        __insertShop: function (o) {
            var i = this.editor;
            i.execCommand("inserthtml", o, !0), i.funcPvUvReport("insertshop");
        },
        beforeSetContent: function (o) {
            return o = o.replace(/<mpshop([^>]*?)js_editor_shop([^>]*?)><\/mpshop>/g, "<iframe $1js_editor_shop$2></iframe>");
        },
        getPluginData: function (o) {
            var i = o.init();
            i.set("content", i.get("content").replace(/<iframe([^>]*?)js_editor_shop([^>]*?)><\/iframe>/g, "<mpshop $1js_editor_shop$2></mpshop>"));
        },
        openShopPopup: function () {
            var o = this;
            this.shopDialog = new i({
                onOk: function (i) {
                    var n = i.pid, t = o.biz_uin;
                    o.__insertShop('<p><iframe class="res_iframe js_editor_shop shopcard_iframe" src="/cgi-bin/readtemplate?t=shop/appmsg_shop_tmpl&action=show&__biz={biz_uin}&pid={pid}#wechat_redirect" data-pid={pid} data-biz_uin={biz_uin}></iframe></p>'.format({
                        pid: n,
                        biz_uin: t
                    }));
                }
            });
        }
    }, n;
});
define("common/wx/mpEditor/plugin/card.js", ["common/wx/Tips.js", "cardticket/send_card.js", "common/wx/Cgi.js", "cardticket/parse_data.js"], function (t) {
    "use strict";

    function e(t) {
        var e = t.key, r = t.content, a = (t.ifrmName, new RegExp("<iframe[^>]*?" + t.ifrmName + "[^>]*?" + e + "=('|\")(.*?)('|\").*?>", "g"));
        return a.test(r) ? RegExp.$2 : null;
    }

    function r(t) {
        return t.replace(/<iframe class="res_iframe card_iframe js_editor_card"[^>]*>[^<>]*?<\/iframe>/g, function (t) {
            var r = e({
                content: t,
                key: "data-cardid",
                ifrmName: "js_editor_card"
            }), a = e({
                content: t,
                key: "data-num",
                ifrmName: "js_editor_card"
            }), i = e({
                content: t,
                key: "data-display-src",
                ifrmName: "js_editor_card"
            }), n = e({
                content: t,
                key: "src",
                ifrmName: "js_editor_card"
            }), d = e({
                content: t,
                key: "data-src",
                ifrmName: "js_editor_card"
            });
            i = n || i, i = i ? i.indexOf("cardid=") >= 0 ? i : i + "&cardid=" + r : "";
            var c = "";
            return window.wx && window.wx.data && window.wx.data.t && (c = window.wx.data.t), i = i ? i.indexOf("token=") >= 0 ? i.replace(/token=([^&]*|$)/, "token=" + c) : i + "&token=" + c : "",
                '<iframe class="res_iframe card_iframe js_editor_card" data-cardid="%s"                 data-num="%s" %s %s></iframe>'.sprintf(r, a, i ? 'src="' + i + '"' : "", d ? 'data-src="' + d + '"' : "");
        });
    }

    var a = t("common/wx/Tips.js"), i = t("cardticket/send_card.js"), n = t("common/wx/Cgi.js"), d = wx.cgiData, c = t("cardticket/parse_data.js"), o = function (t) {
        t && t.container && (this.domid = t.container, this.container = $(t.container).show()), this.biz_uin = t.biz_uin || "",
            this.can_use_card = t.can_use_card || !1;
        var e = this;
        e.report_vid_type = [], e._init();
    };
    return o.beforeSetContent = function (t) {
        return t.html ? r(t.html) : "";
    }, o.prototype = {
        getName: function () {
            return "insertcard";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var t = this;
            return function () {
                var e = t.editor, r = this;
                if (e) {
                    {
                        e.getDocument();
                    }
                    t._openCardSelect(r);
                }
            };
        },
        _init: function () {
            var t = this;
            d.cardid && n.get({
                url: "/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(d.cardid)
            }, function (e) {
                e.base_resp && 0 == e.base_resp.ret && (t.card_data = $.parseJSON(e.card_detail), t.card_data = c.parse_cardticket(t.card_data),
                    t._initCard());
            });
        },
        _initCard: function () {
            if (this.hasSetContent && this.card_data && !this.isInit) {
                var t = this.editor.getUeditor().getContent(), e = /<iframe [^>]*?class=\"res_iframe card_iframe js_editor_card\"[^>]*?data-cardid=\"\"[^>]*?><\/iframe>/gi;
                if (e.test(t)) return void(this.isInit = !0);
                this._insertCard(this.editor, this.card_data, d.cardnum), this.isInit = !0;
            }
        },
        _checkCard: function (t, e) {
            var r = $(t).find("iframe"), i = 0, n = 5;
            return $.each(r, function (t, e) {
                $(e).hasClass("js_editor_card") && i++;
            }), i > n || e && i >= n ? (a.err("正文只能包含%s个卡券".sprintf(n)), !1) : !0;
        },
        _getCardIframe: function (t, e) {
            return ['<iframe class="res_iframe card_iframe js_editor_card" scrolling="no" frameborder="0" ', 'data-cardid="%s" data-num="%s" '.sprintf(t.id, e), 'src="/cgi-bin/readtemplate?t=cardticket/card_preview_tmpl&logo_url=%s&brand_name=%s&title=%s&color=%s&lang=zh_CN&cardid=%s&token=%s&lang=zh_CN"'.sprintf(encodeURIComponent(t.logo_url), encodeURIComponent(t.brand_name), encodeURIComponent(t.title), encodeURIComponent(t.color), t.id, wx.data.t), ' data-src="http://mp.weixin.qq.com/bizmall/appmsgcard?action=show&biz=%s&cardid=%s&wechat_card_js=1#wechat_redirect" '.sprintf(this.biz_uin, t.id), "></iframe>"].join("");
        },
        _insertCard: function (t, e, r) {
            var a = this._getCardIframe(e, r);
            t.execCommand("inserthtml", a, !0), this.editor.fireEvent("funcPvUvReport", "insertcard");
        },
        _openCardSelect: function (t) {
            if (this._checkCard(this.editor.getDocument(), !0)) {
                var e = this, r = new i({
                    multi: !1,
                    param: {
                        need_member_card: 1
                    },
                    selectComplete: function (r, a) {
                        e._insertCard(t, r, a);
                    },
                    source: "嵌入图文消息素材"
                });
                r.show();
            }
        },
        check: function (t) {
            return this._checkCard(t);
        },
        getQueryCommandState: function () {
            return function () {
                var t = this, e = t.selection.getRange().getClosedNode(), r = e && "edui-faked-video" == e.className;
                return r ? 1 : 0;
            };
        },
        getContainer: function () {
            return this.domid;
        },
        initPluginData: function () {
            return ["cardid", "cardquantity", "cardlimit"];
        },
        getPluginData: function (t) {
            var r = t.init(this.initPluginData()), a = e({
                content: r.get("content"),
                key: "data-cardid",
                ifrmName: "js_editor_card"
            });
            if (a) {
                var i = e({
                    content: r.get("content"),
                    key: "data-num",
                    ifrmName: "js_editor_card"
                });
                r.set("cardid", a), r.set("cardquantity", i), r.set("cardlimit", 0 == i ? 0 : 1);
            }
        },
        addListener: function (t) {
            this.__g;
            this.can_use_card && t.addListener("beforepaste", function (t, e) {
                e.html = r(e.html);
            });
        },
        beforeSetContent: function (t) {
            return o.beforeSetContent({
                html: t
            });
        },
        afterSetContent: function () {
            this.hasSetContent = !0, this._initCard();
        }
    }, o;
});
define("common/wx/mpEditor/plugin/vote.js", ["biz_web/widget/date_range.css", "page/vote/dialog_vote_table.css", "widget/date_select.css", "common/wx/Tips.js", "common/wx/pagebar.js", "common/wx/Cgi.js", "tpl/vote/vote_table.html.js"], function (require, exports, module) {
    "use strict";

    function iframeUrlSwitcher(e) {
        for (var t = e.content, o = e.returnValue || "content", n = e.wrapper || "add", i = t.split(/<\/?iframe/), a = "", r = " TMP_NAME=", s = [], c = [], l = [], d = 0; d < i.length; d++) {
            if (-1 !== i[d].indexOf("js_editor_vote_card") || -1 !== i[d].indexOf("js_editor_card")) {
                i[d] = i[d].replace(" src=", r).replace(" data-display-src=", " src=").replace(r, " data-display-src="),
                    i[d] = i[d].replace(" style=", r).replace(" data-display-style=", " style=").replace(r, " data-display-style=");
                var u = i[d].match(/data-voteid=\"([^\"]*)/);
                u && u[1] && s.push(u[1]);
                var p = i[d].match(/isMlt=(\d)/);
                p && p[1] && c.push(p[1]), i[d] = i[d].replace(/token=(\d+)&/gi, "token=" + wx.getUrl("token") + "&");
                var m = i[d].match(/data-supervoteid=\"([^\"]*)/);
                m && m[1] && l.push(m[1]);
            }
            a += i[d], d < i.length - 1 && (a += (d % 2 ? "</" : "<") + "iframe");
        }
        switch (a = "add" === n ? a.replace(/(<iframe[^>]*?js_editor_vote_card[^<]*?<\/iframe>)/gi, function (e) {
            return ['<span class="vote_area">', e, '<span class="vote_box skin_help po_left"></span>', '<span class="vote_box skin_help po_right"></span>', "</span>"].join("");
        }) : a.replace(/<span class="vote_area">/g, "").replace(/<span class="vote_box skin_help po_left"><\/span><span class="vote_box skin_help po_right"><\/span><\/span>/g, "").replace(/<span class="vote_box skin_help po_left"><\/span><span class="vote_box skin_help po_right"><\/span>/g, ""),
            o) {
            case"voteid":
                return s;

            case"isMlt":
                return c;

            case"supervoteid":
                return l;

            case"content":
            default:
                return a;
        }
    }

    function setVoteIframeHeight(e) {
        var t = e.getDocument();
        $(t).find("iframe").each(function () {
            var t = this;
            $(t).hasClass("js_editor_vote_card") && $(t).on("load", function () {
                $(t.contentWindow.document).on("finished", function () {
                    var o = $(this).height();
                    t.contentDocument && t.contentDocument.body.offsetHeight ? o = t.contentDocument.body.offsetHeight : t.Document && t.Document.body && t.Document.body.scrollHeight ? o = t.Document.body.scrollHeight : t.document && t.document.body && t.document.body.scrollHeight && (o = t.document.body.scrollHeight),
                        $(t).height(o).off("finished"), e.fireEvent("contentchange");
                }), $(t).off("load");
            });
        });
    }

    require("biz_web/widget/date_range.css"), require("page/vote/dialog_vote_table.css"),
        require("widget/date_select.css");
    var Tips = require("common/wx/Tips.js"), Pagebar = require("common/wx/pagebar.js"), Cgi = require("common/wx/Cgi.js");
    template.helper("datestring", function (e) {
        function t(e, t) {
            for (var o = 0, n = t - (e + "").length; n > o; o++) e = "0" + e;
            return e + "";
        }

        var o = new Date(e), n = ["日", "一", "二", "三", "四", "五", "六"],
            i = "yyyy-mm-dd".replace(/yyyy|YYYY/, o.getFullYear()).replace(/yy|YY/, t(o.getFullYear() % 100, 2)).replace(/mm|MM/, t(o.getMonth() + 1, 2)).replace(/m|M/g, o.getMonth() + 1).replace(/dd|DD/, t(o.getDate(), 2)).replace(/d|D/g, o.getDate()).replace(/hh|HH/, t(o.getHours(), 2)).replace(/h|H/g, o.getHours()).replace(/ii|II/, t(o.getMinutes(), 2)).replace(/i|I/g, o.getMinutes()).replace(/ss|SS/, t(o.getSeconds(), 2)).replace(/s|S/g, o.getSeconds()).replace(/w/g, o.getDay()).replace(/W/g, n[o.getDay()]);
        return i;
    });
    var Vote = function (e) {
        e && e.container && (this.domid = e.container, this.container = $(e.container).show()), this.can_use_vote = e.can_use_vote || !1;
    };
    return Vote.beforeSetContent = function (e) {
        var t = iframeUrlSwitcher({
            content: e.html,
            wrapper: "remove"
        });
        return t;
    }, Vote.prototype = {
        getName: function () {
            return "insertvote";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var e = this;
            return function () {
                var t = this, o = e.editor;
                o && e.openVotePopup(t);
            };
        },
        doCommand: function (e, t, o) {
            o && console.log("insert vote");
        },
        getContainer: function () {
            return this.domid;
        },
        initPluginData: function () {
            return ["voteid", "voteismlt", "supervoteid"];
        },
        getPluginData: function (e) {
            var t = e.init(this.initPluginData());
            t.set("content", iframeUrlSwitcher({
                content: t.get("content"),
                wrapper: "add"
            }));
            var o = iframeUrlSwitcher({
                content: t.get("content"),
                returnValue: "voteid"
            })[0], n = iframeUrlSwitcher({
                content: t.get("content"),
                returnValue: "isMlt"
            })[0], i = iframeUrlSwitcher({
                content: t.get("content"),
                returnValue: "supervoteid"
            });
            o && "undefined" != typeof n && (t.set("voteid", o), t.set("voteismlt", n || store.get("appmsg_vote_" + o))),
            i && t.set("supervoteid", i[0] || "");
        },
        beforeSetContent: function (e) {
            return Vote.beforeSetContent({
                html: e
            });
        },
        afterSetContent: function () {
            setVoteIframeHeight(this.editor);
        },
        insertVoteIframe: function (e, t) {
            var o = this.editor;
            e.execCommand("inserthtml", t.join(""), !0), o.fireEvent("funcPvUvReport", "insertvote");
        },
        _setIframeHeight: function () {
            var e = this;
            setTimeout(function () {
                var t = e.editor.getDocument().getElementsByTagName("iframe");
                if (t && t.length > 0) for (var o = 0; o < t.length; o++) if ($(t[o]).hasClass("js_editor_vote_card")) {
                    var n = t[o], i = $(n).height();
                    n.contentDocument && n.contentDocument.body.offsetHeight ? i = n.contentDocument.body.offsetHeight : n.Document && n.Document.body && n.Document.body.scrollHeight ? i = n.Document.body.scrollHeight : n.document && n.document.body && n.document.body.scrollHeight && (i = n.document.body.scrollHeight),
                        n.style.height = i + "px";
                }
            }, 5e3);
        },
        _checkIframe: function (e, t) {
            var o = $(e).find("iframe"), n = 0;
            return $.each(o, function (e, t) {
                $(t).hasClass("js_editor_vote_card") && n++;
            }), n > 1 || t && n >= 1 ? (Tips.err("正文只能包含%s个投票".sprintf(1)), !1) : !0;
        },
        check: function (e) {
            return this._checkIframe(e);
        },
        openVotePopup: function (ueditor) {
            function renderList(begin) {
                $.ajax({
                    url: wx.url("/cgi-bin/newoperatevote?action=list&vote_status=1&is_editing=0&f=json&count=6&begin=" + begin),
                    type: "get",
                    dataType: "json",
                    success: function (data) {
                        if (data.data) {
                            for (var voteData = eval("(" + data.data + ")"), iframeH = 0, i = 0; i < voteData.super_vote_info.length; i++) voteData.super_vote_info[i].height = 150 * voteData.super_vote_info[i].vote_id_list.vote_id.length,
                                voteData.super_vote_info[i].title = voteData.super_vote_info[i].title.html(!1);
                            $(".js_vote_list").html(compile_html({
                                loading: !1,
                                data: voteData,
                                iframeH: iframeH,
                                biz: data.bizuin,
                                token: wx.data.param
                            })), $(".js_select").checkbox({
                                multi: !1
                            });
                            var total_count = voteData.total_count, count = 6, showpage = begin / count + 1, pagebar = new Pagebar({
                                container: ".js_pager",
                                perPage: count,
                                first: !1,
                                last: !1,
                                isSimple: !0,
                                initShowPage: showpage,
                                totalItemsNum: total_count,
                                callback: function (e) {
                                    var t = e.currentPage;
                                    if (t != showpage) return t--, renderList(t * count), !1;
                                }
                            });
                        } else $(".js_vote_list").html(compile_html({
                            loading: !1,
                            data: {
                                super_vote_info: []
                            }
                        }));
                    },
                    error: function () {
                    }
                });
            }

            var that = this;
            if (!that._checkIframe(this.editor.getDocument(), !0)) return null;
            document.body.style.overflow = document.documentElement.style.overflow = "hidden";
            var pop = $("<div class='' id='js_vote_menu'><div class='vote_list js_vote_list'></div></div>").popup({
                title: "发起投票",
                className: "vote_edit tc_dialog dialog_normal_form",
                buttons: [{
                    text: "确定",
                    click: function () {
                    },
                    type: "primary"
                }],
                close: function () {
                    this.remove(), document.body.style.overflow = document.documentElement.style.overflow = "auto";
                }
            }), _vote_list_tpl = require("tpl/vote/vote_table.html.js"), compile_html = template.compile(_vote_list_tpl);
            $(".js_vote_list").html(compile_html({
                loading: !0
            })), $("#js_vote_list").parent().addClass("selected"), renderList(0), $(".js_vote_list").on("click", ".js_new_vote", function () {
                window.open(wx.url("/cgi-bin/newoperatevote?action=create&t=vote/vote_edit"));
            }), $(".js_vote_list").on("click", ".js_manage_vote", function () {
                window.open(wx.url("/cgi-bin/newoperatevote?action=list"));
            }), $(".vote_edit button").click(function () {
                var iframeH = 0, saveBtn = pop.find(":button").last();
                saveBtn.removeClass("btn_loading");
                var supervoteid = 0, biz = 0;
                if ("none" == $(".js_vote_list").css("display")) {
                    var data = vote.getFullData();
                    if (data) {
                        var tempData = eval("(" + data + ")"), optionL = 0;
                        iframeH += 70 * tempData.vote_subject.length;
                        for (var i = 0; i < tempData.vote_subject.length; i++) optionL += tempData.vote_subject[i].options.length;
                        iframeH += 30 * optionL, saveBtn.btn(!1), Cgi.post({
                            url: wx.url("/cgi-bin/newoperatevote?action=create"),
                            dataType: "json",
                            data: {
                                action: "create",
                                json: data
                            },
                            mask: !1
                        }, function (e) {
                            0 == e.base_resp.ret ? (Tips.suc("操作成功"), supervoteid = e.super_vote_id, biz = e.bizuin, that.insertVoteIframe(ueditor, ['<iframe scrolling="no" frameborder="0" class="vote_iframe js_editor_vote_card" style="height:0px;" ', 'src="', wx.url("/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz=" + biz + "&supervoteid=%s".sprintf(supervoteid)), '"', 'data-src="', "/mp/newappmsgvote?action=show&__biz=", biz, "&supervoteid=%s#wechat_redirect".sprintf(supervoteid), '"', 'data-supervoteid="%s"'.sprintf(supervoteid), " allowfullscreen >", "</iframe>"]),
                                setVoteIframeHeight(that.editor), pop.remove(), document.body.style.overflow = document.documentElement.style.overflow = "auto",
                                $(".mask").hide()) : (Tips.err(e.base_resp.err_msg), saveBtn.btn(!0));
                        });
                    }
                } else saveBtn.btn(!1), 1 == $(".js_select:checked").length ? (supervoteid = $(".js_select:checked").val(),
                    biz = $(".js_select:checked").data("biz"), iframeH = $(".js_select:checked").data("height"),
                    that.insertVoteIframe(ueditor, ['<iframe scrolling="no" frameborder="0" class="vote_iframe js_editor_vote_card" style="height:0px;" ', 'src="', wx.url("/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz=" + biz + "&supervoteid=%s".sprintf(supervoteid)), '"', 'data-src="', "/mp/newappmsgvote?action=show&__biz=", biz, "&supervoteid=%s#wechat_redirect".sprintf(supervoteid), '"', 'data-supervoteid="%s"'.sprintf(supervoteid), " allowfullscreen >", "</iframe>"]),
                    setVoteIframeHeight(that.editor), pop.remove(), document.body.style.overflow = document.documentElement.style.overflow = "auto",
                    saveBtn.btn(!0), $(".mask").hide()) : (Tips.err("请选择投票"), saveBtn.btn(!0));
            });
        }
    }, Vote;
});
define("common/wx/pagebar.js", ["widget/pagination.css", "tpl/pagebar.html.js", "common/qq/Class.js", "common/wx/Tips.js"], function (t, e) {
    "use strict";
    var i, n, s, a = (t("widget/pagination.css"), t("tpl/pagebar.html.js")), r = t("common/qq/Class.js"), h = t("common/wx/Tips.js");
    s = template.compile(a), i = e, n = {
        first: "首页",
        last: "末页",
        prev: "上页",
        next: "下页",
        startPage: 1,
        initShowPage: 1,
        perPage: 10,
        startRange: 1,
        midRange: 3,
        endRange: 1,
        totalItemsNum: 0,
        container: "",
        callback: null,
        isNavHide: !1,
        isSimple: !0
    };
    var o = function (t, e, i) {
        var n;
        return n = t + (e - 1), n = n > i ? i : n;
    }, g = function (t, e, i) {
        var n;
        return n = i % 2 === 0 ? e - (i / 2 - 1) : e - (i - 1) / 2, n = t > n ? t : n;
    }, u = function (t, e, i) {
        var n;
        return n = e % 2 === 0 ? parseInt(t) + e / 2 : parseInt(t) + (e - 1) / 2, n = n > i ? i : n;
    }, c = function (t, e, i) {
        var n;
        return n = e - (i - 1), n = t > n ? t : n;
    }, l = function (t, e) {
        if (e[t] && isNaN(e[t])) throw new Error("Invalid arguments: " + t + " should be a number");
    }, p = function (t) {
        if (l("perPage", t), l("totalItemsNum", t), l("startPage", t), l("startRange", t), l("midRange", t),
            l("endRange", t), l("initShowPage", t), void 0 !== t.callback && null !== t.callback && !$.isFunction(t.callback)) throw new Error("Invalid arguments: callback should be a function");
    }, d = function (t, e, i) {
        var n = t.container.find(".page_" + i);
        if ("string" == typeof e) {
            var s = $(e);
            0 !== s.length && (n = s);
        } else {
            if (e !== !1) throw new Error("Invalid Paramter: '" + i + "' should be a string or false");
            n.hide();
        }
        return n;
    }, P = r.declare({
        init: function (t) {
            if (t.totalItemsNum) {
                var e;
                if (p(t), e = $.extend(!0, {}, n, t), this._init(e), e.initShowPage < e.startPage) throw new Error("Invalid arguments: initShowPage should be larger than startPage");
                if (e.initShowPage > e.endPage) throw new Error("Invalid arguments: initShowPage should be smaller than endPage");
                this.paginate();
            }
        },
        _init: function (t) {
            this.currentPage = t.initShowPage, this._isNextButtonShow = !0, this._isPrevButtonShow = !0,
                this.uid = "wxPagebar_" + +new Date, this.initEventCenter(), this.optionsForTemplate = {},
                $.extend(this, t), this.container = $(t.container), this.optionsForTemplate.isSimple = t.isSimple,
                this.optionsForTemplate.firstButtonText = 0 === $(t.first).length ? t.first : n.first, this.optionsForTemplate.lastButtonText = 0 === $(t.last).length ? t.last : n.last,
                this.optionsForTemplate.nextButtonText = 0 === $(t.next).length ? t.next : n.next, this.optionsForTemplate.prevButtonText = 0 === $(t.prev).length ? t.prev : n.prev,
                this.optionsForTemplate.isNavHide = t.isNavHide, this.generatePages(parseInt(this.totalItemsNum)),
                this.gapForStartRange = this.container.find(".gap_prev"), this.gapForEndRange = this.container.find(".gap_next"),
                this.firstButton = d(this, t.first, "first"), this.lastButton = d(this, t.last, "last"), this.prevButton = d(this, t.prev, "prev"),
                this.nextButton = d(this, t.next, "next"), this.bindEvent();
        },
        initEventCenter: function () {
            this.eventCenter = {
                eventList: [],
                bind: function (t, e) {
                    this.eventList[t] || (this.eventList[t] = []), this.eventList[t].push(e);
                },
                trigger: function (t) {
                    var e, i;
                    this.eventList[t] || (this.eventList[t] = []), e = this.eventList[t];
                    for (var n = 0; n < e.length; n++) if (i = Array.prototype.slice.call(arguments, 1), e[n].apply(this, i) === !1) return !1;
                },
                unbind: function (t, e) {
                    if (!this.eventList) throw new Error("The eventList was undefined");
                    if (!this.eventList[t]) throw new Error("The event type " + t + " was not found");
                    if (void 0 === e) this.eventList[t] = []; else for (var i = this.eventList[t], n = i.length, s = 0; n > s; s++) if (i[s] === e) {
                        i.splice(s, 1);
                        break;
                    }
                }
            };
        },
        generatePages: function (t) {
            var e, i, n, a, r, h;
            for (this.pageNum = Math.ceil(t / this.perPage), this.endPage = this.startPage + this.pageNum - 1,
                     this.gapForStartRange = null, this.gapForEndRange = null, this.optionsForTemplate.startRange = [],
                     this.optionsForTemplate.midRange = [], this.optionsForTemplate.endRange = [], i = o(this.startPage, this.startRange, this.endPage),
                     n = g(this.startPage, this.currentPage, this.midRange), a = u(this.currentPage, this.midRange, this.endPage),
                     r = c(this.startPage, this.endPage, this.endRange), i >= r && (r = i + 1), e = this.startPage; i >= e; e += 1) this.optionsForTemplate.startRange.push(e);
            for (var l = 0, e = n; l < this.midRange; l += 1, e += 1) this.optionsForTemplate.midRange.push(e);
            for (e = r; e <= this.endPage; e += 1) this.optionsForTemplate.endRange.push(e);
            this.optionsForTemplate.endPage = this.endPage, this.optionsForTemplate.initShowPage = this.initShowPage,
                h = s(this.optionsForTemplate), this.container.html(h), 1 == this.pageNum ? this.container.hide() : this.container.show(),
                this.pages = this.container.find(".page_nav"), this.midPages = this.container.find(".js_mid"),
                this.labels = this.container.find(".page_num label"), this.container.find(".pagination").attr("id", this.uid);
        },
        paginate: function () {
            var t, e, i, n, s, a, r, h, l, p;
            if (this.isSimple === !0) for (var d = 0, P = this.labels.length; P > d; d++) d % 2 === 0 && $(this.labels[d]).html(this.currentPage); else {
                e = o(this.startPage, this.startRange, this.endPage), a = g(this.startPage, this.currentPage, this.midRange),
                    r = u(this.currentPage, this.midRange, this.endPage), h = c(this.startPage, this.endPage, this.endRange),
                e >= h && (h = e + 1), e >= a && (a = e + 1), r >= h && (r = h - 1), this.pages.show(), this.pages.removeClass("current"),
                    p = parseInt(this.midPages.length / this.midRange);
                for (var d = 0, P = p; P > d; d++) {
                    for (s = 0, t = a; r >= t; t += 1) n = this.midRange * d + (t - a), l = $(this.midPages[n]), l.html(t), s += 1,
                    t == this.currentPage && l.addClass("current");
                    for (n = this.midRange * d + s; s < this.midRange; s += 1) l = $(this.midPages[n]), l.hide(), l.removeClass("current"),
                        n += 1;
                }
                for (var d = 0, P = this.pages.length; P >= d; d++) i = $(this.pages[d]), t = parseInt(i.html()),
                t === parseInt(this.currentPage) && i.addClass("current");
                if (a > e + 1 ? this.gapForStartRange.show() : this.gapForStartRange.hide(), h > r + 1 ? this.gapForEndRange.show() : this.gapForEndRange.hide(),
                    this.isNavHide) {
                    for (var d = this.startPage; d <= this.endPage; d += 1) this.pages.hide();
                    this.gapForStartRange.hide(), this.gapForEndRange.hide();
                }
            }
            this.checkButtonShown();
        },
        destroy: function () {
            this.container.off("click", "#" + this.uid + " a.page_nav"), this.container.off("click", "#" + this.uid + " a.page_go"),
                this.container.off("keydown", "#" + this.uid + " .goto_area input"), this.nextButton.off("click"),
                this.prevButton.off("click"), this.firstButton.off("click"), this.lastButton.off("click");
        },
        bindEvent: function () {
            this.container.on("click", "#" + this.uid + " a.page_nav", this.proxy(function (t) {
                var e = $(t.target);
                return e.hasClass("current") ? !1 : (this.clickPage(parseInt(e.html())), !1);
            }, this)), this.nextButton.on("click", this.proxy(function (t) {
                $(t.target);
                return this.nextPage(), !1;
            }, this)), this.prevButton.on("click", this.proxy(function (t) {
                $(t.target);
                return this.prevPage(), !1;
            }, this)), this.firstButton.on("click", this.proxy(function (t) {
                $(t.target);
                return this.goFirstPage(), !1;
            }, this)), this.lastButton.on("click", this.proxy(function (t) {
                $(t.target);
                return this.goLastPage(), !1;
            }, this)), this.container.on("click", "#" + this.uid + " a.page_go", this.proxy(function (t) {
                var e = $(t.target).prev();
                return this.goPage(e.val()), !1;
            }, this)), this.container.on("keydown", "#" + this.uid + " .goto_area input", this.proxy(function (t) {
                return wx.isHotkey(t, "enter") ? (this.container.find("a.page_go").click(), !1) : void 0;
            }, this));
        },
        on: function (t, e) {
            this.eventCenter.bind(t, this.proxy(e, this));
        },
        callbackFunc: function (t) {
            var e = {
                currentPage: this.currentPage,
                perPage: this.perPage,
                count: this.pageNum
            };
            return $.isFunction(this.callback) && this.callback(e) === !1 ? !1 : this.eventCenter.trigger(t, e) === !1 ? !1 : void this.paginate();
        },
        proxy: function (t, e) {
            return function () {
                var i = Array.prototype.slice.call(arguments, 0);
                return t.apply(e, i);
            };
        },
        nextPage: function () {
            this.currentPage !== this.endPage && (this.currentPage++, this.callbackFunc("next") === !1 && this.currentPage--);
        },
        prevPage: function () {
            this.currentPage !== this.startPage && (this.currentPage--, this.callbackFunc("prev") === !1 && this.currentPage++);
        },
        goFirstPage: function () {
            var t = this.currentPage;
            this.currentPage = this.startPage, this.callbackFunc("goFirst") === !1 && (this.currentPage = t);
        },
        goLastPage: function () {
            var t = this.currentPage;
            this.currentPage = this.endPage, this.callbackFunc("goLast") === !1 && (this.currentPage = t);
        },
        checkButtonShown: function () {
            +this.currentPage === +this.startPage ? this.hidePrevButton() : this.showPrevButton(),
                +this.currentPage === +this.endPage ? this.hideNextButton() : this.showNextButton();
        },
        goPage: function (t) {
            var e = this.currentPage, t = Math.round(t);
            return t === this.currentPage ? !1 : isNaN(t) ? (h.err("请输入正确的页码"), !1) : "" === t ? !1 : t < this.startPage ? (h.err("请输入正确的页码"),
                !1) : t > this.endPage ? (h.err("请输入正确的页码"), !1) : (this.currentPage = t, void(this.callbackFunc("go") === !1 && (this.currentPage = e)));
        },
        clickPage: function (t) {
            var e = this.currentPage;
            isNaN(t) && (t = this.startPage), this.currentPage = t < this.startPage ? this.startPage : t > this.endPage ? this.endPage : t,
            this.callbackFunc("click") === !1 && (this.currentPage = e);
        },
        showNextButton: function () {
            this.nextButton && this._isNextButtonShow === !1 && (this.nextButton.show(), this._isNextButtonShow = !0);
        },
        showPrevButton: function () {
            this.prevButton && this._isPrevButtonShow === !1 && (this.prevButton.show(), this._isPrevButtonShow = !0);
        },
        hideNextButton: function () {
            this.nextButton && this._isNextButtonShow === !0 && (this.nextButton.hide(), this._isNextButtonShow = !1);
        },
        hidePrevButton: function () {
            this.prevButton && this._isPrevButtonShow === !0 && (this.prevButton.hide(), this._isPrevButtonShow = !1);
        }
    });
    return e = P;
});
define("original/whitelist_dialog.js", ["original/MultiStepDialog.js", "original/whitepop.js", "common/wx/Cgi.js", "common/wx/Tips.js", "original/tpl/whitelist.html.js", "original/tpl/whitelist_record.html.js", "original/tpl/whitelist_search.html.js"], function (e) {
    "use strict";

    function t(e) {
        this.data = e.data || [], this.onOK = e.onOK || function () {
        }, this.opt = e, this.isAllowReprint = e.isAllowReprint,
            this.init();
    }

    var i = e("original/MultiStepDialog.js"), s = e("original/whitepop.js"), a = e("common/wx/Cgi.js"), n = e("common/wx/Tips.js"), c = e("original/tpl/whitelist.html.js"), d = e("original/tpl/whitelist_record.html.js"), r = e("original/tpl/whitelist_search.html.js");
    return t.prototype = {
        construtor: t,
        init: function () {
            var e = this, t = this.msg = new i({
                title: "添加转载帐号",
                className: this.opt.className || "account_dialog align_edge"
            });
            t.register({
                stepName: "填写公众号",
                init: function (i) {
                    function s() {
                        var t = $.trim(i.find(".js_input_search").val());
                        if (!t) return void n.err("请输入公众号/微信名称");
                        if (!o) {
                            o = !0, i.find(".js_search_msg").text("正在搜索中").show(), i.find(".js_search_item").each(function () {
                                $(this).data("record", null);
                            }), i.find(".js_search_list").html("");
                            var s = {
                                username: t
                            };
                            e.data.id && (s.id = e.data.id), e.data.idx && (s.idx = e.data.idx), a.post({
                                url: "/cgi-bin/appmsgcopyright?action=searchacct",
                                data: s,
                                complete: function () {
                                    o = !1;
                                }
                            }, function (e) {
                                if (e.base_resp && 0 == e.base_resp.ret && e.search_list) {
                                    var t = e.search_list;
                                    $.each(t, function (e, t) {
                                        t.pic_url = t.pic_url ? t.pic_url.endsWith("/0") ? t.pic_url : t.pic_url + "/0" : "http://mmbiz.qpic.cn/mmbiz/a5icZrUmbV8p5jb6RZ8aYfjfS2AVle8URwBt8QIu6XbGewB9wiaWYWkPwq4R7pfdsFibuLkic16UcxDSNYtB8HnC1Q/0";
                                    });
                                    var s = template.compile(r)({
                                        list: t
                                    });
                                    i.find(".js_search_list").html(s), 0 === t.length ? i.find(".js_search_msg").text("无搜索结果").show() : i.find(".js_search_msg").hide();
                                } else e.base_resp && 200013 == e.base_resp.ret ? (i.find(".js_search_fail").text("操作频繁，请稍后重试").show(),
                                    i.find(".js_search_msg").hide()) : (i.find(".js_search_fail").text("系统错误，请稍候再试").show(),
                                    i.find(".js_search_msg").hide());
                            });
                        }
                    }

                    var o = !1;
                    i.html(c);
                    var l = {};
                    e.data.id && (l.id = e.data.id), e.data.idx && (l.idx = e.data.idx), a.get({
                        url: "/cgi-bin/appmsgcopyright?action=get_recently_add",
                        data: l
                    }, function (e) {
                        if (e.base_resp && 0 == e.base_resp.ret && e.white_list) {
                            var t = e.white_list;
                            $.each(t, function (e, t) {
                                if (t.nickname) {
                                    var s = (i.find(".js_record_item"), $($.parseHTML(template.compile(d)(t))));
                                    s.length && (i.find(".js_record_list").append(s).css("zoom", 0).css("zoom", 1), i.find(".js_record_list").find(".js_empty").remove(),
                                        i.find(".js_select_all").show()), 1 == t.status && s.addClass("disabled");
                                }
                            });
                        }
                    }), i.on("keypress", ".js_input_search ", function (e) {
                        13 === e.keyCode && s();
                    }), i.on("click", ".js_btn_search", s), i.on("click", ".js_search_item", function () {
                        if (!$(this).hasClass("disabled")) if ($(this).hasClass("selected")) $(this).removeClass("selected"),
                        $(this).data("record") && ($(this).data("record").remove(), $(this).data("record", null)),
                        i.find(".js_record_item.selected").length <= 0 && t.disableBtn(0, 1); else {
                            $(this).addClass("selected");
                            var e = $(this).attr("data-openid"), s = null;
                            if (i.find(".js_record_item").each(function () {
                                e === $(this).attr("data-openid") && (s = $(this));
                            }), s) s.hasClass("disabled") || (s.find("input").prop("checked") && n.suc("已存在右侧转载帐号记录中"),
                                s.find("input").prop("checked", !0).trigger("change"), $(this).data("record", s)); else {
                                var a = template.compile(d)({
                                    selected: !0,
                                    openid: $(this).attr("data-openid"),
                                    nickname: $(this).find(".js_nickname").text() || $(this).find(".js_wx_name").text()
                                }), c = $($.parseHTML(a));
                                $(this).data("record", c), i.find(".js_record_list").prepend(c).css("zoom", 1).css("zoom", 0),
                                    i.find(".js_record_list").find(".js_empty").remove(), i.find(".js_select_all").show();
                            }
                            t.enableBtn(0, 1);
                        }
                    }), i.on("change", ".js_record_checkbox", function () {
                        var e = $(this).closest(".js_record_item");
                        e.hasClass("disabled") || ($(this).prop("checked") ? (e.addClass("selected"), t.enableBtn(0, 1)) : (e.removeClass("selected"),
                        i.find(".js_record_item.selected").length <= 0 && t.disableBtn(0, 1)));
                    }), i.on("click", ".js_select_all", function () {
                        var e = !0;
                        $(this).text("取消全选"), i.find(".js_record_item").not(".disabled").length === i.find(".js_record_item.selected").not(".disabled").length && (e = !1,
                            $(this).text("全选")), i.find(".js_record_checkbox").each(function () {
                            $(this).closest(".js_record_item").hasClass("disabled") || $(this).prop("checked", e).trigger("change");
                        });
                    });
                },
                buttons: [{
                    text: "取消",
                    click: function () {
                        t.remove();
                    },
                    type: "default"
                }, {
                    text: "下一步",
                    click: function () {
                        var e = this.$btns[1].dom;
                        return e.hasClass("btn_disabled") ? !1 : void t.next();
                    },
                    type: "disabled"
                }]
            }), t.register({
                stepName: "设置该帐号权限",
                init: function (i) {
                    new s({
                        dom: i,
                        showAllowRe: !e.isAllowReprint,
                        done: function (e) {
                            t.can_modify = 1 * e.can_modify, t.can_hide_source = 1 * e.can_hide_source, t.enableBtn(1, 1);
                        },
                        bad: function () {
                            t.disableBtn(1, 1);
                        }
                    });
                },
                buttons: [{
                    text: "上一步",
                    click: function () {
                        t.pre();
                    },
                    type: "default"
                }, {
                    text: "确定",
                    type: "disabled",
                    click: function () {
                        var i = this.$btns[3].dom;
                        if (i.hasClass("btn_disabled")) return !1;
                        var s = [];
                        t.$stepDom[0].find(".js_record_item.selected").each(function () {
                            s.push({
                                nickname: $(this).find(".lbl_content").text(),
                                openid: $(this).attr("data-openid"),
                                can_modify: t.can_modify || 0,
                                can_hide_source: t.can_hide_source || 0
                            });
                        }), e.onOK.call(this, s, i);
                    }
                }]
            }), t.show();
        },
        remove: function () {
            this.msg.remove();
        }
    }, t;
});
define("common/wx/ban.js", ["tpl/ban/highlight_box.html.js", "tpl/ban/page_msg.html.js", "common/wx/dialog.js"], function (e, a, n) {
    "use strict";
    var i = e("tpl/ban/highlight_box.html.js"), o = e("tpl/ban/page_msg.html.js"), t = e("common/wx/dialog.js"), r = {
        "mass-send": {
            func_id: 1,
            name: "群发功能"
        },
        copyright: {
            func_id: 2,
            name: "原创功能"
        },
        reward: {
            func_id: 3,
            name: "赞赏功能"
        },
        seller: {
            func_id: 4,
            name: "流量主功能"
        },
        comment: {
            func_id: 5,
            name: "留言功能"
        },
        follow: {
            func_id: 6,
            name: "被关注"
        },
        search: {
            func_id: 7,
            name: "被搜索"
        },
        outlink: {
            func_id: 8,
            name: "外链功能"
        },
        share: {
            func_id: 9,
            name: "文章分享至朋友圈可见"
        },
        reply: {
            func_id: 10,
            name: "自动回复功能",
            highlight: "已禁用自动回复|你的帐号{=reason}，已被{forever}屏蔽自动回复功能{date}，期间用户将不会收到自动回复消息。",
            hide: "all"
        },
        menu: {
            func_id: 11,
            name: "自定义菜单功能",
            highlight: "已禁用自定义菜单|你的帐号{=reason}，已被{forever}屏蔽自定义菜单功能{date}，期间自定义菜单将不可见。",
            hide: "all"
        },
        "single-send": {
            func_id: 12,
            name: "聊天功能",
            pagemsg: "你的帐号{=reason}，已被{forever}屏蔽聊天功能{date}，期间将不可和粉丝互动聊天。"
        },
        preview: {
            func_id: 13,
            name: "消息预览功能",
            dialogmsg: "你的帐号{=reason}，已被{forever}屏蔽消息预览功能{date}，期间消息预览功能将不可用。"
        },
        "jssdk-share": {
            func_id: 14,
            name: "JS-SDK分享接口"
        },
        template: {
            func_id: 15,
            name: "模版消息接口"
        },
        "customer-service": {
            func_id: 16,
            name: "客服接口"
        },
        "source-url": {
            func_id: 17,
            name: "原文链接功能"
        },
        "outer-url": {
            func_id: 18,
            name: "图文编辑外链功能"
        },
        "callback-message": {
            func_id: 20,
            name: "开发者模式下消息管理功能"
        },
        "jump-home": {
            func_id: 21,
            name: "跳转小主页"
        },
        "follow-home": {
            func_id: 22,
            name: "关注小主页"
        },
        "online-temp-qrcode": {
            func_id: 25,
            name: "（线上）临时二维码扫码关注"
        },
        "online-forever-qrcode": {
            func_id: 26,
            name: "（线上）永久二维码扫码关注"
        }
    }, p = [{
        illegal_reason_id: 3,
        reason_id: 1e4,
        reason_name: "涉嫌违规",
        reason_type: 0,
        reason_description: "涉嫌违规",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 3
    }, {
        illegal_reason_id: 3,
        reason_id: 90004,
        reason_name: "滥用原创声明",
        reason_type: 0,
        reason_description: "涉嫌滥用原创声明功能",
        reason_rule: "《微信公众平台运营规范》3.6条规定",
        wap_url: "",
        pc_url: "",
        level: 3
    }, {
        illegal_reason_id: 4,
        reason_id: 90005,
        reason_name: "滥用赞赏",
        reason_type: 0,
        reason_description: "涉嫌滥用赞赏功能",
        reason_rule: "《微信公众平台运营规范》3.7条规定",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_7",
        level: 3
    }, {
        illegal_reason_id: 10,
        reason_id: 10001,
        reason_name: "垃圾广告",
        reason_type: 0,
        reason_description: "涉嫌发布垃圾广告",
        reason_rule: "《微信公众平台运营规范》4.8条规定-广告类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
        level: 2
    }, {
        illegal_reason_id: 11,
        reason_id: 20001,
        reason_name: "政治敏感",
        reason_type: 0,
        reason_description: "涉嫌违反相关法律法规和政策",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 3
    }, {
        illegal_reason_id: 12,
        reason_id: 20002,
        reason_name: "色情",
        reason_type: 0,
        reason_description: "涉及低俗、性暗示或色情信息",
        reason_rule: "《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2",
        level: 1
    }, {
        illegal_reason_id: 13,
        reason_id: 20004,
        reason_name: "社会事件",
        reason_type: 0,
        reason_description: "涉嫌违反相关法律法规和政策",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 3
    }, {
        illegal_reason_id: 14,
        reason_id: 20006,
        reason_name: "违法犯罪",
        reason_type: 0,
        reason_description: "涉嫌违反相关法律法规和政策",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 15,
        reason_id: 20008,
        reason_name: "欺诈",
        reason_type: 0,
        reason_description: "涉嫌欺诈",
        reason_rule: "《微信公众平台运营规范》4.8.1条规定-欺诈虚假广告类",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
        level: 1
    }, {
        illegal_reason_id: 16,
        reason_id: 20012,
        reason_name: "低俗",
        reason_type: 0,
        reason_description: "涉及低俗、性暗示或色情信息",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 2
    }, {
        illegal_reason_id: 18,
        reason_id: 20013,
        reason_name: "冒名侵权",
        reason_type: 0,
        reason_description: "涉嫌侵犯他人合法权益",
        reason_rule: "《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
        level: 1
    }, {
        illegal_reason_id: 21,
        reason_id: 20106,
        reason_name: "骚扰",
        reason_type: 0,
        reason_description: "涉及骚扰信息",
        reason_rule: "《微信公众平台运营规范》4.10条规定-搔扰类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=26&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_10",
        level: 3
    }, {
        illegal_reason_id: 22,
        reason_id: 21e3,
        reason_name: "默认",
        reason_type: 0,
        reason_description: "涉嫌违规",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 3
    }, {
        illegal_reason_id: 23,
        reason_id: 90001,
        reason_name: "侵犯隐私",
        reason_type: 0,
        reason_description: "涉嫌侵犯他人隐私",
        reason_rule: "《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
        level: 3
    }, {
        illegal_reason_id: 35,
        reason_id: 20104,
        reason_name: "造遥",
        reason_type: 0,
        reason_description: "涉嫌造谣或传谣",
        reason_rule: "《微信公众平台运营规范》4.9条规定-谣言类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=25&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_9",
        level: 2
    }, {
        illegal_reason_id: 36,
        reason_id: 20105,
        reason_name: "诱导分享",
        reason_type: 0,
        reason_description: "涉嫌诱导分享",
        reason_rule: "《微信公众平台运营规范》3.3.1条规定-诱导分享",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
        level: 2
    }, {
        illegal_reason_id: 40,
        reason_id: 90002,
        reason_name: "抄袭",
        reason_type: 0,
        reason_description: "涉嫌抄袭他人内容",
        reason_rule: "《微信公众平台运营规范》4.1.2条规定-内容侵权",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
        level: 3
    }, {
        illegal_reason_id: 41,
        reason_id: 90003,
        reason_name: "诱导关注 ",
        reason_type: 0,
        reason_description: "涉嫌诱导关注",
        reason_rule: "《微信公众平台运营规范》3.3.2条规定-诱导关注",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
        level: 2
    }, {
        illegal_reason_id: 42,
        reason_id: 1,
        reason_name: "默认",
        reason_type: 1,
        reason_description: "其他",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 43,
        reason_id: 2,
        reason_name: "政治敏感",
        reason_type: 1,
        reason_description: "涉嫌违反相关法律法规",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 44,
        reason_id: 3,
        reason_name: "色情",
        reason_type: 1,
        reason_description: "涉及低俗或色情信息",
        reason_rule: "《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2",
        level: 1
    }, {
        illegal_reason_id: 45,
        reason_id: 4,
        reason_name: "虚假认证",
        reason_type: 1,
        reason_description: "涉嫌虚假认证",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 46,
        reason_id: 5,
        reason_name: "侵权",
        reason_type: 1,
        reason_description: "涉嫌侵犯他人合法权益",
        reason_rule: "《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
        level: 1
    }, {
        illegal_reason_id: 47,
        reason_id: 4,
        reason_name: "政治敏感",
        reason_type: 2,
        reason_description: "涉嫌违反相关法律法规",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 3
    }, {
        illegal_reason_id: 48,
        reason_id: 1,
        reason_name: "色情",
        reason_type: 2,
        reason_description: "涉嫌低俗或色情",
        reason_rule: "《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2",
        level: 1
    }, {
        illegal_reason_id: 49,
        reason_id: 3,
        reason_name: "欺诈",
        reason_type: 2,
        reason_description: "涉嫌欺诈",
        reason_rule: "《微信公众平台运营规范》4.8.1条规定-欺诈虚假广告类",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
        level: 1
    }, {
        illegal_reason_id: 50,
        reason_id: 5,
        reason_name: "诱导分享",
        reason_type: 2,
        reason_description: "涉嫌诱导分享",
        reason_rule: "《微信公众平台运营规范》3.3.1条规定-诱导分享",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
        level: 2
    }, {
        illegal_reason_id: 51,
        reason_id: 19,
        reason_name: "诱导关注",
        reason_type: 2,
        reason_description: "涉嫌诱导关注",
        reason_rule: "《微信公众平台运营规范》3.3.2条规定-诱导关注",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
        level: 2
    }, {
        illegal_reason_id: 52,
        reason_id: 7,
        reason_name: "侵犯隐私",
        reason_type: 2,
        reason_description: "涉嫌侵犯隐私",
        reason_rule: "《微信公众平台运营规范》4.1.2条规定-内容侵权",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
        level: 3
    }, {
        illegal_reason_id: 53,
        reason_id: 6,
        reason_name: "侵权",
        reason_type: 2,
        reason_description: "涉嫌侵犯他人合法权益",
        reason_rule: "《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
        level: 1
    }, {
        illegal_reason_id: 54,
        reason_id: 11,
        reason_name: "外挂",
        reason_type: 2,
        reason_description: "涉嫌使用外挂",
        reason_rule: "《微信公众平台运营规范》3.1条规定－使用外挂行为",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_1",
        level: 1
    }, {
        illegal_reason_id: 55,
        reason_id: 8,
        reason_name: "造遥",
        reason_type: 2,
        reason_description: "涉嫌造谣或传谣",
        reason_rule: "《微信公众平台运营规范》4.9条规定-谣言类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=25&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_9",
        level: 2
    }, {
        illegal_reason_id: 56,
        reason_id: 12,
        reason_name: "骚扰",
        reason_type: 2,
        reason_description: "涉嫌骚扰他人",
        reason_rule: "《微信公众平台运营规范》4.10条规定-搔扰类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_10",
        level: 3
    }, {
        illegal_reason_id: 57,
        reason_id: 14,
        reason_name: "刷粉",
        reason_type: 2,
        reason_description: "涉嫌刷粉",
        reason_rule: "《微信公众平台运营规范》3.2条规定－刷粉行为",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
        level: 3
    }, {
        illegal_reason_id: 58,
        reason_id: 13,
        reason_name: "互推",
        reason_type: 2,
        reason_description: "涉嫌互推",
        reason_rule: "《微信公众平台运营规范》3.2条规定－刷粉行为",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
        level: 2
    }, {
        illegal_reason_id: 59,
        reason_id: 16,
        reason_name: "抄袭",
        reason_type: 2,
        reason_description: "涉嫌抄袭",
        reason_rule: "《微信公众平台运营规范》4.1.2条规定-内容侵权",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
        level: 3
    }, {
        illegal_reason_id: 60,
        reason_id: 9,
        reason_name: "垃圾广告",
        reason_type: 2,
        reason_description: "涉嫌发送垃圾广告",
        reason_rule: "《微信公众平台运营规范》4.8条规定-广告类内容",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
        level: 2
    }, {
        illegal_reason_id: 61,
        reason_id: 10,
        reason_name: "恶意注册",
        reason_type: 2,
        reason_description: "涉嫌恶意注册",
        reason_rule: "《微信公众平台运营规范》1条规定－ 注册规范",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot1",
        level: 1
    }, {
        illegal_reason_id: 62,
        reason_id: 17,
        reason_name: "恶意投诉",
        reason_type: 2,
        reason_description: "涉嫌恶意投诉",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 2
    }, {
        illegal_reason_id: 63,
        reason_id: 18,
        reason_name: "违规分销",
        reason_type: 2,
        reason_description: "涉嫌多级分销",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 64,
        reason_id: 90007,
        reason_name: "违规声明原创",
        reason_type: 0,
        reason_description: "涉嫌违规使用原创声明功能",
        reason_rule: "微信公众平台运营规范》3.6条规定-滥用原创声明功能",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_6",
        level: 1
    }, {
        illegal_reason_id: 65,
        reason_id: 90011,
        reason_name: "刷粉",
        reason_type: 0,
        reason_description: "涉嫌刷粉",
        reason_rule: "微信公众平台运营规范》3.2条规定－刷粉行为",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
        level: 1
    }, {
        illegal_reason_id: 66,
        reason_id: 90010,
        reason_name: "侵犯名誉/商誉/隐私/肖像",
        reason_type: 0,
        reason_description: "涉嫌侵犯名誉/商誉/隐私/肖像",
        reason_rule: "《微信公众平台运营规范》4.1.2条规定",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
        level: 1
    }, {
        illegal_reason_id: 69,
        reason_id: 90013,
        reason_name: "滥用模版消息接口",
        reason_type: 0,
        reason_description: "涉嫌滥用模版消息接口",
        reason_rule: "《微信公众平台运营规范》3.9条规定-滥用模版消息接口行为",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=33&t=operation/faq_index&nettype=WIFI&fontScale=100&from=singlemessage&isappinstalled=0#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_9",
        level: 1
    }, {
        illegal_reason_id: 70,
        reason_id: 90012,
        reason_name: "滥用客服消息",
        reason_type: 0,
        reason_description: "涉嫌滥用客服消息",
        reason_rule: "《微信公众平台运营规范》3.10条规定-滥用客服消息行为",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=34&t=operation/faq_index&nettype=WIFI&fontScale=100&from=singlemessage&isappinstalled=0#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_10",
        level: 1
    }, {
        illegal_reason_id: 71,
        reason_id: 90008,
        reason_name: "互推",
        reason_type: 0,
        reason_description: "涉嫌互推",
        reason_rule: "《微信公众平台运营规范》3.2条规定－刷粉行为",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
        level: 2
    }, {
        illegal_reason_id: 72,
        reason_id: 90014,
        reason_name: "广告恶意点击",
        reason_type: 0,
        reason_description: "恶意点击公众号文章底部广告",
        reason_rule: "《广告展示违规行为处理细则》-作弊行为",
        wap_url: "http://mp.weixin.qq.com/promotion/readtemplate?t=faq/ad_host_faq_5_tmpl#5dot4",
        pc_url: "http://mp.weixin.qq.com/promotion/readtemplate?t=faq/ad_host_faq_5_tmpl#5dot4",
        level: 1
    }, {
        illegal_reason_id: 73,
        reason_id: 20011,
        reason_name: "暴力血腥",
        reason_type: 0,
        reason_description: "涉嫌发布暴力信息",
        reason_rule: "《微信公众平台运营规范》4.3条规定",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=19&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?token=2010733288&t=business/faq_operation_tmpl&type=info#3dot4_3",
        level: 1
    }, {
        illegal_reason_id: 74,
        reason_id: 90016,
        reason_name: "侵犯知识产权",
        reason_type: 0,
        reason_description: "涉嫌侵犯他人版权/商标/专利等知识产权",
        reason_rule: "《微信公众平台运营规范》4.1.2条规定",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
        level: 1
    }, {
        illegal_reason_id: 75,
        reason_id: 90009,
        reason_name: "其他侵权",
        reason_type: 0,
        reason_description: "涉嫌侵犯他人合法权益",
        reason_rule: "《微信公众平台运营规范》4.1条规定",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
        level: 1
    }, {
        illegal_reason_id: 76,
        reason_id: 90017,
        reason_name: "恶意投诉",
        reason_type: 0,
        reason_description: "涉嫌恶意投诉他人",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 77,
        reason_id: 25,
        reason_name: "假货",
        reason_type: 2,
        reason_description: "制作/售卖/传播假货",
        reason_rule: "《微信公众平台运营规范》4.1条规定",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 78,
        reason_id: 26,
        reason_name: "网赚刷单",
        reason_type: 2,
        reason_description: "诱导用户转发文章、下载app等",
        reason_rule: "《微信公众平台运营规范》禁止诱导类行为的规定",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 85,
        reason_id: 90018,
        reason_name: "阅读原文违规",
        reason_type: 0,
        reason_description: "涉嫌阅读原文跳转至恶意链接",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 86,
        reason_id: 90019,
        reason_name: "违反微信链接内容管理规范",
        reason_type: 0,
        reason_description: "涉嫌违反微信链接内容管理规范",
        reason_rule: "《微信外部链接内容管理规范》",
        wap_url: "http://weixin.qq.com/cgi-bin/readtemplate?t=weixin_external_links_content_management_specification",
        pc_url: "http://weixin.qq.com/cgi-bin/readtemplate?t=weixin_external_links_content_management_specification",
        level: 1
    }, {
        illegal_reason_id: 88,
        reason_id: 90020,
        reason_name: "无证经营",
        reason_type: 0,
        reason_description: "涉嫌无证经营",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 90,
        reason_id: 90021,
        reason_name: "多级分销",
        reason_type: 0,
        reason_description: "涉嫌多级分销经营行为",
        reason_rule: "《微信公众平台运营规范》",
        wap_url: "http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
        pc_url: "https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
        level: 1
    }, {
        illegal_reason_id: 99,
        reason_id: 30001,
        reason_name: "涉嫌恶意篡改广告",
        reason_type: 0,
        reason_description: "涉嫌恶意篡改广告",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 100,
        reason_id: 30002,
        reason_name: "涉嫌宣传销售假冒伪劣商品",
        reason_type: 0,
        reason_description: "涉嫌宣传销售假冒伪劣商品",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 101,
        reason_id: 30003,
        reason_name: "涉嫌宣传销售易对用户易产生损害用品",
        reason_type: 0,
        reason_description: "涉嫌宣传销售易对用户易产生损害用品",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 102,
        reason_id: 30004,
        reason_name: "涉嫌其他违规",
        reason_type: 0,
        reason_description: "涉嫌其他违规",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 103,
        reason_id: 30005,
        reason_name: "涉嫌未经授权使用或冒用第三方名义投放广告",
        reason_type: 0,
        reason_description: "涉嫌未经授权使用或冒用第三方名义投放广告",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 104,
        reason_id: 30006,
        reason_name: "涉嫌使用绝对化用语",
        reason_type: 0,
        reason_description: "涉嫌使用绝对化用语",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 105,
        reason_id: 30007,
        reason_name: "涉嫌贬低其他生产经营者的商品或服务",
        reason_type: 0,
        reason_description: "涉嫌贬低其他生产经营者的商品或服务",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 106,
        reason_id: 30008,
        reason_name: "涉嫌推广虚假广告",
        reason_type: 0,
        reason_description: "涉嫌推广虚假广告",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 107,
        reason_id: 30009,
        reason_name: "涉嫌虚假宣传官方合作",
        reason_type: 0,
        reason_description: "涉嫌虚假宣传官方合作",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 108,
        reason_id: 30010,
        reason_name: "涉嫌违反广告代言相关规则",
        reason_type: 0,
        reason_description: "涉嫌违反广告代言相关规则",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 109,
        reason_id: 30011,
        reason_name: "涉嫌其他违规",
        reason_type: 0,
        reason_description: "涉嫌其他违规",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 110,
        reason_id: 30012,
        reason_name: "涉嫌存在违规营销行为",
        reason_type: 0,
        reason_description: "涉嫌存在违规营销行为",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 111,
        reason_id: 30013,
        reason_name: "涉嫌推广不符合行业资质要求的产品或服务",
        reason_type: 0,
        reason_description: "涉嫌推广不符合行业资质要求的产品或服务",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 112,
        reason_id: 30014,
        reason_name: "涉嫌广告主公众号存在非腾讯许可的推广行为",
        reason_type: 0,
        reason_description: "涉嫌广告主公众号存在非腾讯许可的推广行为",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 113,
        reason_id: 30015,
        reason_name: "涉嫌恶意删除历史消息",
        reason_type: 0,
        reason_description: "涉嫌恶意删除历史消息",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 114,
        reason_id: 30016,
        reason_name: "涉嫌广告素材与文案不关联",
        reason_type: 0,
        reason_description: "涉嫌广告素材与文案不关联",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 115,
        reason_id: 30017,
        reason_name: "涉嫌推广微信广告不支持投放的产品或服务",
        reason_type: 0,
        reason_description: "涉嫌推广微信广告不支持投放的产品或服务",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 116,
        reason_id: 30018,
        reason_name: "涉嫌其他违规",
        reason_type: 0,
        reason_description: "涉嫌其他违规",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 117,
        reason_id: 30019,
        reason_name: "涉嫌虚假宣传",
        reason_type: 0,
        reason_description: "涉嫌虚假宣传",
        reason_rule: "《微信广告投放违规行为处理细则》",
        wap_url: "http://ad.weixin.qq.com/learn/n59",
        pc_url: "http://ad.weixin.qq.com/learn/n59",
        level: 0
    }, {
        illegal_reason_id: 118,
        reason_id: 36,
        reason_name: "帐号迁移冻结",
        reason_type: 2,
        reason_description: "已申请公众号帐号迁移流程，被冻结/回收",
        reason_rule: "公众号帐号迁移说明",
        wap_url: "https://kf.qq.com/touch/scene_faq.html?scene_id=kf3414",
        pc_url: "https://kf.qq.com/touch/scene_faq.html?scene_id=kf3368",
        level: 0
    }], _ = function (e) {
        return e.getFullYear() + "/" + (e.getMonth() + 1) + "/" + e.getDate();
    }, l = function (e, a) {
        for (var n = $(".main_bd"), r = 0, l = 0; l < p.length; l++) p[l].reason_id == e.reason_id && (r = l);
        var s = {};
        if (s.reason = '<a href="' + (p[r].pc_url ? p[r].pc_url : p[0].pc_url) + '">' + p[r].reason_description + "</a>",
            e.ban_time === e.unlock_time ? (s.forever = "永久", s.date = "") : (s.forever = "", s.date = "至" + _(new Date(1e3 * e.unlock_time))),
        a.hide && ("all" === a.hide ? n.children().hide() : $(a.hide).hide()), a.highlight) {
            a.highlight = template.compile(a.highlight)(s);
            var c = {
                title: a.highlight.split("|")[0],
                desc: template.compile(a.highlight.split("|")[1])()
            };
            $(template.compile(i)(c)).prependTo(n);
        }
        if (a.pagemsg) {
            var d = {
                content: template.compile(a.pagemsg)(s)
            };
            0 == n.find(".ban_page_msg").length && $(template.compile(o)(d)).prependTo(n);
        }
        return a.dialogmsg && t.show({
            type: "warn",
            title: "提示",
            msg: "能力封禁提示|" + template.compile(a.dialogmsg)(s),
            buttons: [{
                text: "确定",
                type: "primary",
                click: function () {
                    this.remove();
                }
            }]
        }), !1;
    }, s = function (e, a, n) {
        var i = !0;
        if (!r[a]) return !0;
        for (var o = 0, t = e.length; t > o; o++) if (e[o].func_id == r[a].func_id) {
            var p = l(e[o], r[a]);
            i = p && i;
        }
        return !i && n && "function" == typeof n && n(), i;
    };
    s.getReason = function (e) {
        if ("default" == e) return p[0];
        for (var a = 0; a < p.length; a++) if (p[a].reason_id == e) return p[a];
        return p[0];
    }, s.getTypeName = function (e) {
        for (var a in r) if (r[a].func_id == e) return r[a].name;
    }, n.exports = s;
});