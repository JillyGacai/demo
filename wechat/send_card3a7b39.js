define("common/wx/mpEditor/utils.js", [], function () {
    "use strict";

    function e() {
        return u.uid++;
    }

    function t(e, t) {
        return (u.ie && u.version < 9 ? "" : "<!DOCTYPE html>") + "<html xmlns='http://www.w3.org/1999/xhtml' style='overflow:hidden;'><head></head><body></body><script type='text/javascript'  id='_initialScript'>setTimeout(function(){top.window.__templateCardIframeReady(document,'" + e + "','" + (t || "") + "');var _tmpScript = document.getElementById('_initialScript');if(_tmpScript&&_tmpScript.parentNode){_tmpScript.parentNode.removeChild(_tmpScript);}},0)</script></html>";
    }

    function n(t) {
        var n = e();
        a(t, n);
        var i = "";
        if (t.attr) for (var d in t.attr) t.attr.hasOwnProperty(d) && (i += " " + d + '="' + t.attr[d] + '"');
        var o = "<iframe " + i + ' data-uid="' + n + '" src="#src#"></iframe>';
        return t.noSrc === !0 ? o.replace("#src#", "about:blank") : o.replace("#src#", r(n, t.uid));
    }

    function r(e, t) {
        return "javascript:void(function(){document.domain='qq.com';top.window.__templateCardIframeWrite(document,'" + e + "','" + (t || "") + "');}())";
    }

    function i(e) {
        try {
            delete u.iframeReadyFunc[e];
        } catch (t) {
        }
    }

    function a(e, t) {
        function n(e) {
            return function (t) {
                var n, r = t.uid, i = e.$dom;
                if (!i && "undefined" != typeof e.editorId) {
                    var a = window.UE.instants["ueditorInstant" + e.editorId];
                    a && (i = $(a.body));
                }
                return i && i.length > 0 && (n = i.find("iframe[data-uid=" + r + "]"), n = n && n.length > 0 ? n[0] : null),
                n || (n = $(document.body).find("iframe[data-uid=" + r + "]"), n = n && n.length > 0 ? n[0] : null),
                n && ("function" == typeof e.onIframeReadyFunc && e.onIframeReadyFunc({
                    doc: t.doc,
                    win: t.win,
                    iframe: n
                }), e.iframeSelect === !0 && top.window.__editorIframeSelect && $(t.doc.body).on("click", function () {
                    var e = this.ownerDocument, t = e ? e.defaultView || e.parentWindow : null;
                    t && top.window.__editorIframeSelect(t);
                })), e;
            };
        }

        e && (e.uid ? u.iframeReadyFunc[e.uid] && e.force !== !0 || (u.iframeReadyFunc[e.uid] = n(e)) : t && (u.iframeReadyFunc[t] = n(e)));
    }

    function d(e) {
        e.prototype.bindEventInterface = function (e) {
            return this.domUtils && this.editor ? ("domUtils" == e.type ? this.domUtils.on(e.dom, e.eventName, e.fun) : "editor" == e.type && this.editor.addListener(e.eventName, e.fun),
            this.__EventInterfaceCache || (this.__EventInterfaceCache = []), void this.__EventInterfaceCache.push(e)) : !1;
        }, e.prototype.unbindEventInterface = function () {
            if (!this.domUtils || !this.editor) return !1;
            if (this.__EventInterfaceCache) for (; this.__EventInterfaceCache.length > 0;) {
                var e = this.__EventInterfaceCache[0];
                "domUtils" == e.type ? this.domUtils.un(e.dom, e.eventName, e.fun) : "editor" == e.type && this.editor.removeListener(e.eventName, e.fun),
                    this.__EventInterfaceCache.shift();
            }
            this.__EventInterfaceCache = [];
        }, e.prototype.unbindSpecifyEvent = function (e) {
            if (!this.domUtils || !this.editor) return !1;
            if (this.__EventInterfaceCache && e) for (var t = 0, n = this.__EventInterfaceCache.length; n > t; t++) {
                var r = this.__EventInterfaceCache[t];
                if (r.type === e.type && r.eventName === e.eventName && r.fun === e.fun && (!e.dom || e.dom && r.dom === e.dom)) {
                    "domUtils" == r.type ? this.domUtils.un(r.dom, r.eventName, r.fun) : "editor" == r.type && this.editor.removeListener(r.eventName, r.fun),
                        this.__EventInterfaceCache.splice(t, 1);
                    break;
                }
            }
        };
    }

    function o(e) {
        if (e && 0 != e.length) {
            var t = u.asynRenderIframeKey++;
            u.asynRenderIframeId[t] = null, f(e, t, function (e) {
                e.replaceTagName("iframe");
            });
        }
    }

    function c(e) {
        if (e && 0 != e.length) {
            var t = u.asynRenderIframeKey++;
            u.asynRenderIframeId[t] = null, f(e, t, function (e) {
                e.attr("src", e.attr("src"));
            });
        }
    }

    function f(e, t, n) {
        if (u.asynRenderIframeId[t] && (clearTimeout(u.asynRenderIframeId[t]), u.asynRenderIframeId[t] = null),
        !e || 0 == e.length) try {
            delete u.asynRenderIframeId[t];
        } catch (r) {
        }
        u.asynRenderIframeId[t] = setTimeout(function () {
            for (var r = +new Date; e && e.length > 0;) {
                var i = +new Date;
                if (i - r > 16) {
                    f(e, t, n);
                    break;
                }
                var a = e.shift(), d = a.parent();
                d && d.length > 0 ? n(a) : e = [];
            }
            if (!e || 0 == e.length) try {
                delete u.asynRenderIframeId[t];
            } catch (o) {
            }
        }, 0);
    }

    var m = navigator.userAgent.toLowerCase(), u = {
        uid: +new Date,
        iframeReadyFunc: {},
        ie: /(msie\s|trident.*rv:)([\w.]+)/.test(m),
        version: 0,
        edge: /edge\/([\w.]+)/i.test(m),
        asynRenderIframeKey: +new Date,
        asynRenderIframeId: {}
    };
    return function (e, t) {
        if (e.ie) {
            var n = t.match(/(?:msie\s([\w.]+))/), r = t.match(/(?:trident.*rv:([\w.]+))/);
            e.version = n && r && n[1] && r[1] ? Math.max(1 * n[1], 1 * r[1]) : n && n[1] ? 1 * n[1] : r && r[1] ? 1 * r[1] : 0;
        }
    }(u, m, window), function (e, t) {
        "function" != typeof e.__templateCardIframeWrite && (e.__templateCardIframeWrite = function (e, n, r) {
            e.open(), e.domain = "qq.com", e.write(t(n, r)), e.close();
        });
    }(top.window, t), function (e, t) {
        "function" != typeof e.__templateCardIframeReady && (e.__templateCardIframeReady = function (e, n, r) {
            var i, a;
            if (a = r ? t[r] : t[n], "function" == typeof a && e) {
                var d = e.defaultView || e.parentWindow;
                d && (i = a({
                    uid: n,
                    customerUid: r,
                    doc: e,
                    win: d
                }));
            }
            if (!i || i.notClear !== !0) try {
                delete t[n];
            } catch (o) {
            }
        });
    }(top.window, u.iframeReadyFunc), {
        getuid: e,
        getIframeSrc: r,
        createIframeReadyFunc: a,
        createLocalIframe: n,
        clearIframeReadyFunc: i,
        initEventInterface: d,
        createAsynRenderIframe: o,
        createAsynIframeReload: c
    };
});
define("common/wx/media/productTemplateDialog.js", ["common/wx/popup.js", "common/wx/Tips.js", "common/wx/Cgi.js", "common/wx/mpEditor/utils.js", "tpl/media/product_style_dialog_list.html.js", "tpl/media/product_style_dialog_content.html.js", "tpl/media/product_highline_style.html.js", "tpl/media/product_iframe_smart_tips.html.js"], function (t) {
    "use strict";

    function e(t) {
        this._o = {
            color: g.defaultColor,
            templateId: "",
            productData: null,
            editor: null
        }, this._g = {
            dom: {}
        }, this._extend(t), this.initDialog();
    }

    function a(t) {
        return t = t || {}, g.templateData && "function" == typeof t.callback ? void t.callback(g.templateData) : void c.post({
            url: "/cgi-bin/productmaterial?action=get_template_list",
            mask: !1
        }, {
            done: function (e) {
                if (e && e.base_resp && 0 == e.base_resp.ret && e.template_info_list && e.template_info_list.template_list && e.template_info_list.template_list.length > 0) {
                    g.templateData = e.template_info_list, g.templateData.default_template_id || (g.templateData.default_template_id = g.templateData.template_list[0].template_id),
                    g.templateData.default_color || (g.templateData.default_color = g.defaultColor);
                    var a = !1;
                    0 == location.href.indexOf("http://dev") && (a = !0);
                    for (var o = 0, i = g.templateData.template_list.length; i > o; o++) {
                        var l = g.templateData.template_list[o];
                        l.name || (l.name = "模板" + (o + 1)), l.color = g.defaultColor, l.pic_cover_url = l.pic_cover_url || "",
                        0 == l.pic_cover_url.indexOf("http") || a || (l.pic_cover_url = "https://res.wx.qq.com" + l.pic_cover_url);
                    }
                    "function" == typeof t.callback && t.callback(g.templateData);
                }
            },
            fail: function () {
                "function" == typeof t.onError && t.onError();
            }
        });
    }

    function o(t) {
        if (!t) return null;
        var e = t.getAttribute("data-product") || "";
        try {
            e = decodeURIComponent(e), e = JSON.parse(e);
        } catch (a) {
            e = null;
        }
        if (e && e.productData) {
            e.type = t.getAttribute("data-type"), e.color = t.getAttribute("data-color"), e.smartNum = t.getAttribute("data-smartnum"),
                e.packId = t.getAttribute("data-packid"), e.productId = t.getAttribute("data-pid");
            try {
                e.productId = decodeURIComponent(e.productId).split(g.pidSplitKey);
            } catch (a) {
                e.productId = e.productId.split(g.pidSplitKey);
            }
            e.templateId = t.getAttribute("data-templateid");
        }
        return e;
    }

    function i(t) {
        if (!t) return "";
        var e = o(t), a = "";
        if (e && e.templateId) {
            var i = e.productData;
            if (i && i.length > 0) if (2 == e.type) {
                var l = s(e.templateId);
                if (l) {
                    var r = [];
                    for (i = [].concat(e.productData); i.length > 0;) r.push(i.splice(0, l.loop));
                    for (var p = 0, d = r.length; d > p; p++) {
                        var c = "";
                        c = g.smartTipsCompile({
                            smart_num: e.smartNum
                        }), a += c, a += n(r[p], e.templateId, e.color);
                    }
                }
            } else a = n(i, e.templateId, e.color);
        }
        return f + a;
    }

    function l(t, e, a) {
        $(e).find("img").each(function () {
            this.onload = r(t, e, a), this.onerror = r(t, e, a);
            var o = this.getAttribute("data-src");
            this.src = o;
        });
    }

    function r(t, e, a) {
        return function () {
            var o = this;
            o.onload = null, o.onerror = null, setTimeout(function () {
                var o = e.ownerDocument, i = o ? o.defaultView || o.parentWindow : null;
                if (i && t && t.contentWindow === i) {
                    var l = $(e).outerHeight();
                    if ($(t).css({
                        height: l + "px"
                    }), "undefined" != typeof a) {
                        var r = window.UE.instants["ueditorInstant" + a];
                        r && (g.adjustheightId && (clearTimeout(g.adjustheightId), g.adjustheightId = null), g.adjustheightId = setTimeout(function () {
                            r.fireEvent("adjustheight");
                        }, 50));
                    }
                }
            }, 0);
        };
    }

    function n(t, e, a) {
        var o = s(e);
        if (!o) return "";
        for (var i = o.template_xml, l = Math.min(o.loop, t.length), r = {
            url: "url",
            title: "title",
            img_url: "img_url",
            str_price: "str_price",
            str_original_price: "str_original_price",
            sub_title: "sub_title",
            color: a || g.defaultColor
        }, n = 0; l > n; n++) {
            var p = t[n];
            for (var d in r) {
                var c = new RegExp("\\{\\{" + d + (n + 1) + "\\}\\}", "g"), m = "";
                m = "undefined" != typeof p[r[d]] ? p[r[d]] : r[d], "str_original_price" == d && 1 * m === 0 ? m = "<span class='js_delparent'></span>" : "[object String]" == Object.prototype.toString.call(m) && (m = m.html(!0)),
                    i = i.replace(c, m);
            }
        }
        var u = $("<div>").html(i), _ = 1;
        return u.find("." + g.appmsgLoopClass).each(function () {
            _ > l && $(this).remove(), _++;
        }), u.find(".js_delparent").parent().remove(), u.html();
    }

    function s(t) {
        var e = g.templateData || null;
        if (!e || !e.template_list) return null;
        for (var a = null, o = 0, i = e.template_list.length; i > o; o++) if (e.template_list[o].template_id == t) {
            a = e.template_list[o];
            break;
        }
        return a && a.loop && a.template_xml ? a : null;
    }

    function p(t) {
        return t = (t || "").toLowerCase(), /^#[0-9a-f]{6}$/.test(t) ? !0 : !1;
    }

    t("common/wx/popup.js");
    var d = t("common/wx/Tips.js"), c = t("common/wx/Cgi.js"), m = t("common/wx/mpEditor/utils.js"), u = t("tpl/media/product_style_dialog_list.html.js"), _ = t("tpl/media/product_style_dialog_content.html.js"), f = t("tpl/media/product_highline_style.html.js"),
        h = t("tpl/media/product_iframe_smart_tips.html.js"), g = {
            smartTipsCompile: template.compile(h),
            appmsgContainerClass: "js_product_container",
            appmsgLoopClass: "js_product_loop_content",
            appmsgProductErrClass: "js_product_err_container",
            defaultColor: "#fa7834",
            pidSplitKey: ",#%$&",
            templateData: null,
            adjustheightId: null
        };
    return e.prototype = {
        _extend: function (t) {
            for (var e in t) this._o[e] = t[e];
        },
        renderList: function () {
            for (var t = [], e = 0, a = g.templateData.template_list.length; a > e; e++) {
                for (var o = g.templateData.template_list[e], i = o.template_id, r = o.loop, s = [], p = 0; r > p; p++) s.push(this._o.productData);
                t.push({
                    name: o.name,
                    id: i,
                    cover: o.pic_cover_url || "",
                    html: function (t, e, a) {
                        return m.createLocalIframe({
                            attr: {
                                style: "width:100%"
                            },
                            $dom: e,
                            onIframeReadyFunc: function (e) {
                                e.doc.body.innerHTML = t, a(e.iframe, e.doc.body);
                            }
                        });
                    }(n(s, i, this._o.color), this._g.dom.$content, l)
                });
            }
            this._g.dom.$content.html(wx.T(u, {
                list: t
            })), this.bindEvent();
        },
        initDialog: function () {
            var t = this, e = this._o, o = this._g, i = o.dom;
            e.editor && e.editor.fireEvent("handleWinScroll", !1), i.$dialog = $(wx.T(_, {})).popup({
                width: 960,
                title: "选择卡片模板",
                autoShow: !0,
                className: "dialog_product_template",
                buttons: [{
                    text: "确定",
                    type: "primary",
                    classWrap: "js_save_btn",
                    click: function () {
                        if (!t._g.selected) return void d.err("请选择卡片模板");
                        var e = this;
                        t.destory(e), t._o.callback({
                            id: t._g.selected
                        });
                    }
                }, {
                    text: "取消",
                    type: "default",
                    classWrap: "js_cancel_btn",
                    click: function () {
                        t.destory(this);
                    }
                }],
                onHide: function () {
                    t.destory(this);
                }
            }), i.$saveBtn = i.$dialog.find(".js_save_btn"), i.$cancelBtn = i.$dialog.find(".js_cancel_btn"),
                i.$content = i.$dialog.find(".js_content"), a({
                callback: function () {
                    t.hasLive && t.renderList();
                }
            });
        },
        bindEvent: function () {
            var t = this;
            this._g.dom.$content.on("click", "input[type=radio]", function () {
                t._g.dom.$content.find(".js_checkbox_parent").parents().closest(".product-style").removeClass("selected");
                var e = $(this);
                if (e.prop("checked")) {
                    e.parents().closest(".product-style").addClass("selected");
                    var a = e.attr("data-id");
                    t.select(a);
                }
            }), setTimeout(function () {
                var e = t._g.dom.$content.find('input[type=radio][data-id="' + t._o.templateId + '"]');
                e && 1 == e.length || (e = t._g.dom.$content.find("input[type=radio]").eq(0)), e.prop("checked", !0).trigger("click");
            }, 0);
        },
        select: function (t) {
            this._g.selected = t;
        },
        hasLive: function () {
            return this._g.dom && this._g.dom.$dialog ? !0 : !1;
        },
        destory: function (t) {
            t && t.remove(), this._g.dom = null, this._g.productListObj = null, this._o.editor && this._o.editor.fireEvent("handleWinScroll", !0);
        }
    }, {
        appmsgContainerClass: g.appmsgContainerClass,
        appmsgLoopClass: g.appmsgLoopClass,
        appmsgProductErrClass: g.appmsgProductErrClass,
        myclass: e,
        getTemplate: a,
        getIframeContentByIframe: i,
        getOptionsFromIframe: o,
        addIframeImgLoadEvent: l,
        validColor: p,
        defaultColor: g.defaultColor,
        getTemplateDataById: s,
        pidSplitKey: g.pidSplitKey
    };
});
define("common/wx/media/productDialog.js", ["common/wx/popup.js", "common/wx/Tips.js", "common/wx/Cgi.js", "tpl/media/product_select_dialog.html.js", "common/wx/media/productTemplateDialog.js", "media/product_list.js", "tpl/media/product_dialog_upload.html.js", "tpl/media/product_import_select_result.html.js", "common/wx/tooltips.js", "tpl/media/product_smart_tips.html.js"], function (t) {
    "use strict";

    function i(t) {
        this._o = {
            can_use_smart: !1,
            maxLen: 100,
            editor: null,
            callback: function () {
            }
        }, this._g = {
            dom: {}
        }, this._extend(t);
        var i = this;
        p.templateData ? this.initDialog() : n.getTemplate({
            callback: function (t) {
                p.templateData = t, i.initDialog();
            }
        });
    }

    t("common/wx/popup.js");
    var e = t("common/wx/Tips.js"), o = t("common/wx/Cgi.js"), a = t("tpl/media/product_select_dialog.html.js"), n = t("common/wx/media/productTemplateDialog.js"), s = t("media/product_list.js"), l = t("tpl/media/product_dialog_upload.html.js"),
        r = t("tpl/media/product_import_select_result.html.js"), d = t("common/wx/tooltips.js"), c = t("tpl/media/product_smart_tips.html.js"), p = {
            templateFileLink: wx.url("/cgi-bin/productmaterial?action=download_excel&type=2"),
            templateData: null,
            maxImportLen: 1e3
        };
    return i.prototype = {
        _extend: function (t) {
            for (var i in t) this._o[i] = t[i];
        },
        initDialog: function () {
            var t = this, i = this._o, e = this._g, o = e.dom;
            i.editor && i.editor.fireEvent("handleWinScroll", !1), o.$dialog = $(wx.T(a, {
                can_use_smart: this._o.can_use_smart,
                manageLink: wx.url("/cgi-bin/productmaterial?action=product_list")
            })).popup({
                width: 925,
                title: "选择商品",
                autoShow: !0,
                className: "dialog-select-product",
                buttons: [{
                    text: "确定",
                    type: "primary",
                    classWrap: "js_save_btn",
                    click: function () {
                        t.getResourceId({
                            dialog: this,
                            $btn: t._g.dom.$saveBtn,
                            callback: function (i) {
                                o.$saveBtn.btn(!1), t._o.callback(i);
                            }
                        });
                    }
                }, {
                    text: "取消",
                    type: "default",
                    classWrap: "js_cancel_btn",
                    click: function () {
                        t.destory(this);
                    }
                }],
                onHide: function () {
                    t.destory(this);
                }
            }), o.$saveBtn = o.$dialog.find(".js_save_btn"), o.$cancelBtn = o.$dialog.find(".js_cancel_btn"),
                o.$selectAllBtn = o.$dialog.find(".js_select_all"), o.$importBtn = o.$dialog.find(".js_import"),
                o.$smartBtn = o.$dialog.find(".js_smart_select"), o.$smartInput = o.$dialog.find(".js_smart_count"),
                o.$smartDesc = o.$dialog.find(".js_smart_desc"), o.$smartTotal = o.$dialog.find(".js_smart_total"),
                o.$imporSelectFailMain = o.$dialog.find(".js_impor_select_fail_main"), o.$imporSelectFailLink = o.$dialog.find(".js_link"),
                o.$pagebar = o.$dialog.find(".js_pagebar"), o.$listBody = o.$dialog.find(".js_list_body"),
                o.$categoryMain = o.$dialog.find(".js_category_main"), o.$selectedCount = o.$dialog.find(".js_selected_count"),
                o.$cancelSelectBtn = o.$dialog.find(".js_cancel_select"), this.beforeInitList(), this.initList(),
                this.afterInitList();
        },
        initList: function () {
            var t = this, i = this._g, e = i.dom;
            i.productListObj = new s({
                uploadDom: this._g.canUploadTips.$dom.find(".js_upload"),
                uploadInfoDom: e.$dialog.find(".js_des_container"),
                uploadInfoTpl: r,
                clearUploadBtnFilter: ".js_clear_import",
                pageSize: 5,
                listContainner: e.$listBody,
                categoryContianer: e.$categoryMain,
                pagebarContainer: e.$pagebar,
                selectAllDom: e.$selectAllBtn,
                selectedCountDom: e.$selectedCount,
                cancelSelectBtn: e.$cancelSelectBtn,
                jumpPageSelect: !0,
                disabledItem: !0,
                canDelCategory: !1,
                afterRenderList: function () {
                    e && e.$dialog && e.$dialog.popup("resetPosition");
                },
                onUploadEnd: function () {
                    t._g.dom.$importBtn.hide(), t._g.canUploadTips.hide();
                },
                onUploadClear: function () {
                    t._g.dom.$importBtn.show();
                },
                afterInitCategory: function () {
                    t._g.dom.$categoryMain.show();
                }
            });
        },
        beforeInitList: function () {
            var t = this;
            this._g.canUploadTips = new d({
                container: this._g.dom.$importBtn,
                position: {
                    left: -119
                },
                reposition: !0,
                content: template.compile(l)({
                    templateFileLink: p.templateFileLink
                }),
                onshow: function () {
                    this.show(), t._g.productListObj.refreshUpload();
                }
            });
        },
        afterInitList: function () {
            var t = this, i = this._g.dom;
            i.$smartBtn.checkbox({
                onChanged: function (i) {
                    i.prop("checked") ? t._g.dom.$smartDesc.show() : t._g.dom.$smartDesc.hide();
                }
            }), this._g.smartTips = new d({
                container: i.$dialog.find(".js_smart_tips"),
                position: {
                    left: -137
                },
                reposition: !0,
                content: template.compile(c)({})
            });
        },
        getData: function () {
            var t = this._g, i = t.dom, o = t.productListObj.getSelectedData();
            if (!o || 0 == o.length) return e.err("请选择商品"), !1;
            var a = o.length, n = 1, s = 0;
            if (i.$smartBtn.prop("checked")) {
                var l = o.length;
                if (s = parseInt(i.$smartInput.val()) || 0, 0 >= s) return e.err("个性化推荐的数量必须大于0"), !1;
                if (l > 200) return e.err("个性化推荐时，单次选择商品总数不能超过200"), !1;
                if (1 == l) return e.err("个性化推荐时，商品总数必须大于1"), !1;
                if (s > l) return e.err("个性化推荐展示商品数不能大于选择的商品总数"), !1;
                if (s > this._o.maxLen) return e.err("最多还能在文章中展示%s个推荐商品".sprintf(this._o.maxLen)), !1;
                n = 2;
            } else if (a > this._o.maxLen) return e.err("最多还能选择%s个商品插入文章".sprintf(this._o.maxLen)),
                !1;
            var r = {
                type: n,
                templateId: p.templateData.default_template_id,
                productData: o,
                productId: t.productListObj.getSelectedId(),
                packId: "",
                smartNum: ""
            };
            return 2 == n && (r.smartNum = s), r;
        },
        getResourceId: function (t) {
            var i = this;
            if (this._g.gettingResource !== !0) {
                var a = this.getData();
                if (a) {
                    if (1 == a.type) return t.callback(a), void i.destory(t.dialog);
                    i._g.gettingResource = !0, t.$btn.btn(!1), o.post({
                        url: "/cgi-bin/productmaterial?action=add_product_resource",
                        data: {
                            template_id: a.templateId,
                            product_list: a.productId.join(n.pidSplitKey),
                            typenum: a.smartNum
                        },
                        mask: !1
                    }, {
                        done: function (o) {
                            t.$btn.btn(!0), i._g.gettingResource = !1, o && o.base_resp && 0 == o.base_resp.ret && o.pack_info && o.pack_info.pack_id ? (a.packId = o.pack_info.pack_id,
                                t.callback(a), i.destory(t.dialog)) : e.err("系统繁忙，请稍后再试");
                        },
                        fail: function () {
                            t.$btn.btn(!0), i._g.gettingResource = !1, e.err("系统繁忙，获取资源ID失败，请稍后再试");
                        }
                    });
                }
            }
        },
        destory: function (t) {
            t && t.remove(), this._g.dom = null, this._g.smartTips && (this._g.smartTips.destroy(), this._g.smartTips = null),
            this._g.canUploadTips && (this._g.canUploadTips.destroy(), this._g.canUploadTips = null),
            this._g.productListObj && (this._g.productListObj.destroy(), this._g.productListObj = null),
            this._o.editor && this._o.editor.fireEvent("handleWinScroll", !0);
        }
    }, i;
});
define("common/wx/media/templateDialog.js", ["common/wx/popup.js", "common/wx/inputCounter.js", "media/common.js", "media/template_common.js", "common/wx/Tips.js", "tpl/media/templateDialog.html.js", "tpl/mpEditor/templateDialogLayout.html.js", "common/wx/mpEditor/plugin/vote.js", "common/wx/mpEditor/plugin/card.js", "common/wx/mpEditor/plugin/emotion.js", "common/wx/mpEditor/plugin/link.js", "common/wx/mpEditor/plugin/unlink.js", "common/wx/mpEditor/plugin/audio_music.js", "common/wx/mpEditor/plugin/weapp.js", "common/wx/mpEditor/plugin/img.js", "common/wx/mpEditor/plugin/video.js", "common/wx/mpEditor/plugin/insert_product.js", "common/wx/mpEditor/plugin/adv.js", "common/wx/mpEditor/editor.js"], function (t) {
    "use strict";

    function e(t) {
        this._o = {
            token: "",
            formatContent: !0,
            can_use_txvideo: !1,
            can_use_hyperlink: !1,
            can_use_appmsg_outer_url: !1,
            can_use_vote: !1,
            can_use_card: !1,
            biz_uin: "",
            can_use_voice: !1,
            qqmusic_flag: !1,
            can_use_weapp_card: !1,
            content: "",
            onSuccess: function () {
            }
        }, this._g = {
            dom: {}
        }, this._extend(t), this.initDialog();
    }

    t("common/wx/popup.js");
    var o = t("common/wx/inputCounter.js"), i = t("media/common.js"), n = t("media/template_common.js"), s = t("common/wx/Tips.js"), a = t("tpl/media/templateDialog.html.js"), r = t("tpl/mpEditor/templateDialogLayout.html.js"), c = t("common/wx/mpEditor/plugin/vote.js"),
        m = t("common/wx/mpEditor/plugin/card.js"), l = t("common/wx/mpEditor/plugin/emotion.js"), d = t("common/wx/mpEditor/plugin/link.js"), u = t("common/wx/mpEditor/plugin/unlink.js"), _ = t("common/wx/mpEditor/plugin/audio_music.js"), p = t("common/wx/mpEditor/plugin/weapp.js"),
        g = t("common/wx/mpEditor/plugin/img.js"), h = t("common/wx/mpEditor/plugin/video.js"), f = t("common/wx/mpEditor/plugin/insert_product.js"), w = t("common/wx/mpEditor/plugin/adv.js"), j = t("common/wx/mpEditor/editor.js");
    return e.prototype = {
        _extend: function (t) {
            for (var e in t) this._o[e] = t[e];
        },
        initDialog: function () {
            var t = this, e = this._o, o = this._g, i = o.dom;
            document.body.style.overflow = document.documentElement.style.overflow = "hidden", i.$dialog = $(wx.T(a, {
                token: e.token || ""
            })).popup({
                width: 865,
                title: "添加图文模版",
                autoShow: !0,
                className: "align_edge appmsg_tmpl_edit_dialog",
                buttons: [{
                    text: "保存",
                    type: "primary",
                    classWrap: "js_save_btn",
                    click: function () {
                        var o = this;
                        t.saveTemplate({
                            callback: function () {
                                "function" == typeof e.onSuccess && e.onSuccess(), t.destory(o);
                            }
                        });
                    }
                }, {
                    text: "取消",
                    type: "default",
                    classWrap: "js_cancel_btn",
                    click: function () {
                        t.destory(this);
                    }
                }],
                onHide: function () {
                    t.destory(this);
                }
            }), i.$js_editor = i.$dialog.find(".js_editor"), i.$js_title_fail = i.$dialog.find(".js_title_fail"),
                i.$js_content_fail = i.$dialog.find(".js_content_fail"), i.$title = i.$dialog.find(".js_title"),
                i.$saveBtn = i.$dialog.find(".js_save_btn"), i.$cancelBtn = i.$dialog.find(".js_cancel_btn"),
                this.initTitle(), this.createEditor();
        },
        initTitle: function () {
            new o(this._g.dom.$title, {
                maxLength: 64
            });
        },
        getPostData: function () {
            this.hideAllErrMsg();
            var t = this._g.dom, e = $(this.editor.getDocument()).find(".js_catchremoteimageerror").length;
            if (e) return this.showCatchError(), null;
            var o = this._g.dom.$title.val(), n = i.validate({
                key: "title",
                label: "名称",
                content: o,
                strict: !0
            });
            if (n && n.msg) return t.$js_title_fail.text(n.msg).show(), null;
            var s = this.editor.getEditorData();
            if (n = i.validate({
                key: "templateContent",
                content: s.content,
                strict: !1,
                editor: this.editor
            }), n && n.msg) return 4 == n.errType || t.$js_content_fail.text(n.msg).show(), null;
            var a = {
                content: s.content,
                title: o
            };
            return a;
        },
        saveTemplate: function (t) {
            var e = this, o = this, a = this._g.dom;
            if (!o.submiting) {
                var r = e.getPostData();
                r && (o.submiting = !0, a.$saveBtn.btn(!1), i.waitAsynAction({
                    editor: this.editor,
                    callback: function () {
                        if (e.checkDialogAlive()) {
                            var i = e.getPostData();
                            return i ? void n.handleTemplate({
                                action: "create",
                                postData: i,
                                onError: function (t) {
                                    e.checkDialogAlive() && (o.submiting = !1, a.$saveBtn.btn(!0), s.err(t));
                                },
                                onSuccess: function () {
                                    e.checkDialogAlive() && (o.submiting = !1, a.$saveBtn.btn(!0), s.suc("保存成功"), t.callback());
                                }
                            }) : (o.submiting = !1, void a.$saveBtn.btn(!0));
                        }
                    }
                }));
            }
        },
        checkDialogAlive: function () {
            var t = this._g.dom;
            return t && t.$dialog ? !0 : !1;
        },
        createEditor: function () {
            var t = this, e = this._o, o = this._g.dom, i = [new g, new h({
                can_use_txvideo: e.can_use_txvideo
            }), new d({
                can_use_hyperlink: e.can_use_hyperlink,
                can_use_appmsg_outer_url: e.can_use_appmsg_outer_url
            }), new u, new l, new c({
                can_use_vote: e.can_use_vote
            }), new m({
                biz_uin: e.biz_uin,
                can_use_card: e.can_use_card
            }), new w({
                can_see_ad: !1,
                has_ad: 0
            }), new _({
                allowAudio: e.can_use_voice,
                allowMusic: e.qqmusic_flag
            }), new p({
                can_use_weapp_card: e.can_use_weapp_card
            }), new f({
                clearProduct: !0
            })], n = t.editor = new j({
                needPopup: !1,
                imgScale: !1,
                canChangeIframeHeight: !1,
                scaleimgWheelScroll: !0,
                cropimgWheelScroll: !0,
                iframeCssUrl: wx.EditorRes.template_iframe,
                layout: r,
                plugins: i,
                autoHeightEnabled: !0,
                autoFloatEnabled: !1,
                toolbars: [],
                focus: !0
            });
            n.render(o.$js_editor[0]), n.addListener("catchremotesuccess", function (e, o, i, n) {
                o && t.updateRemoteImg({
                    remoteType: "success",
                    uid: o.uid,
                    format: n,
                    img_url: i
                }), t.showCatchError();
            }), n.addListener("catchremoteerror", function (e, i, n) {
                i && t.updateRemoteImg({
                    remoteType: "error",
                    uid: i.uid,
                    img_url: i.defaultRemoteImg
                }), n ? o.$js_content_fail.text(n).show() : t.showCatchError();
            }), n.addListener("hideAllErrMsg", function () {
                t.hideAllErrMsg();
            }), n.addListener("aftersetcontent", function () {
                t.showCatchError();
            }), n.addListener("keyup", function () {
                o.$js_content_fail.hide();
            }), n.addListener("before_show_img_replace_dialog", function () {
                n.hasDestory || (n.fireEvent("handleWinScroll", !1), o.$saveBtn.hide(), o.$cancelBtn.hide());
            }), n.addListener("after_close_show_img_replace_dialog", function () {
                n.hasDestory || (n.fireEvent("handleWinScroll", !1), o.$saveBtn.show(), o.$cancelBtn.show());
            }), n.ready(function () {
                try {
                    e.formatContent ? this.setContent(e.content) : this.setContent(e.content, !1, !0);
                } catch (t) {
                }
            });
        },
        hideAllErrMsg: function () {
            var t = this._g.dom;
            t.$js_content_fail.hide(), t.$js_title_fail.hide();
        },
        showCatchError: function () {
            if (this.checkDialogAlive()) {
                var t = this._g.dom, e = this.editor, o = $(e.getDocument()).find(".js_catchremoteimageerror").length;
                0 == o ? t.$js_content_fail.hide() : t.$js_content_fail.text("有%s张图片粘贴失败".sprintf(o)).show();
            }
        },
        updateRemoteImg: function (t) {
            if (this.checkDialogAlive()) {
                var e = $(this.editor.getDocument()).find("[data-remoteid=" + t.uid + "]");
                i.changeRemoteImgUrl({
                    imgDom: e,
                    remoteType: t.remoteType,
                    format: t.format,
                    img_url: t.img_url,
                    editor: this.editor
                });
            }
        },
        destory: function (t) {
            t && t.remove(), this.editor.fireEvent("handleWinScroll", !0), this.editor.destory(),
                this.editor = null, this._g.dom = null;
        }
    }, e;
});
define("media/template_common.js", ["media/common.js", "common/wx/Cgi.js", "common/wx/time.js", "tpl/media/appmsg_tmpl.html.js", "common/wx/mpEditor/utils.js", "common/wx/mpEditor/plugin/vote.js", "common/wx/mpEditor/plugin/card.js", "common/wx/mpEditor/plugin/emotion.js", "common/wx/mpEditor/plugin/link.js", "common/wx/mpEditor/plugin/unlink.js", "common/wx/mpEditor/plugin/audio_music.js", "common/wx/mpEditor/plugin/weapp.js", "common/wx/mpEditor/plugin/img.js", "common/wx/mpEditor/plugin/adv.js", "common/wx/mpEditor/plugin/video.js"], function (e) {
    "use strict";

    function t(e, t) {
        var o = t.canSelect === !1 ? !1 : !0, n = t.canPreview === !1 ? !1 : !0, i = t.showUpdateTime === !1 ? !1 : !0, m = t.showEdit === !1 ? !1 : !0, a = t.showEdit === !0 ? !0 : !1, p = t.token || "";
        !p && window.wx && window.wx.data && window.wx.data.t && (p = window.wx.data.t);
        for (var u = 0, g = e.length; g > u; u++) {
            var w = e[u];
            w.token = p, w.canSelect = o, w.canPreview = n, w.showUpdateTime = i, w.showEdit = m, w.highLine = a,
            w.update_time && (w.update_time_str = r.timeFormat(w.update_time)), w.title_encode = w.title,
                w.title_encode = a ? w.title_encode.replace(/<em>/g, "__em_start__").replace(/<\/em>/g, "__em_end__").html(!0).replace(/__em_start__/g, "<em>").replace(/__em_end__/g, "</em>") : w.title_encode.html(!0);
            for (var _ in d) d.hasOwnProperty(_) && ("Video" == _ ? w.content = d[_].beforeSetContent({
                isPreview: !1,
                html: w.content,
                width: l
            }) : "Ad" == _ ? w.content = d[_].beforeSetContent({
                html: w.content,
                can_see_ad: !1
            }) : "function" == typeof d[_].beforeSetContent && (w.content = d[_].beforeSetContent({
                html: w.content
            })));
            w.iframeHtml = function (e, t) {
                return c.createLocalIframe({
                    $dom: $(document.body),
                    onIframeReadyFunc: function (o) {
                        o.doc.body.innerHTML = e[t].content;
                    }
                });
            }(e, u), w.contentHtml = template.compile(s)(w);
        }
        return e;
    }

    function o(e) {
        var t = "";
        t = "undefined" != typeof e.postData.appmsgid ? "update" : "create", p.post({
            url: "/cgi-bin/appmsgtemplate?action=" + t,
            data: e.postData
        }, {
            done: function (t) {
                if (t && t.base_resp && 0 == t.base_resp.ret) return void e.onSuccess(t);
                var o;
                if (t && t.base_resp) {
                    var n = a.articleRetCode(t);
                    o = n.errmsg || "系统繁忙，请稍后再试";
                } else o = "系统繁忙，请稍后再试";
                e.onError(o, t || {});
            },
            fail: function (t) {
                e.onError("系统繁忙，请稍后再试", t || {});
            }
        });
    }

    function n(e) {
        var t = e.page || 0, o = e.perPage || 6;
        p.post({
            url: "/cgi-bin/appmsgtemplate?action=list",
            data: {
                begin: t * o,
                count: o
            },
            mask: !1
        }, {
            done: function (o) {
                if (o && o.base_resp && 0 == o.base_resp.ret) e.callback({
                    code: 0,
                    list: o.appmsg_template || [],
                    total: 1 * o.total,
                    page: t
                }); else {
                    var n = "";
                    o && o.base_resp && 200013 == o.base_resp.ret && (n = "操作太频繁，请稍后再试"), e.callback({
                        code: -1,
                        msg: n
                    });
                }
            },
            fail: function () {
                e.callback({
                    code: -1
                });
            }
        });
    }

    function i(e) {
        p.post({
            url: "/cgi-bin/appmsgtemplate?action=delete",
            data: {
                appmsgid: e.id
            },
            mask: !1
        }, {
            done: function (t) {
                t && t.base_resp && 0 == t.base_resp.ret ? e.onSuccess() : e.onError({
                    resp: t || {},
                    msg: "系统繁忙，请稍后再试"
                });
            },
            fail: function (t) {
                e.onError({
                    resp: t || {},
                    msg: "系统繁忙，请稍后再试"
                });
            }
        });
    }

    function m(e) {
        p.post({
            url: "/cgi-bin/appmsgtemplate?action=preview",
            data: e.postData,
            mask: !1
        }, {
            done: function (t) {
                if (t && t.base_resp && 0 == t.base_resp.ret) e.onSuccess(t); else {
                    var o = a.articleRetCode(t);
                    t.word = o.errmsg, t.antispam = o.index, e.onError(t);
                }
            },
            fail: function () {
                e.onError({
                    word: "系统繁忙，请稍后再试"
                });
            }
        });
    }

    var a = e("media/common.js"), p = e("common/wx/Cgi.js"), r = e("common/wx/time.js"), s = e("tpl/media/appmsg_tmpl.html.js"), c = e("common/wx/mpEditor/utils.js"), d = {
        Vote: e("common/wx/mpEditor/plugin/vote.js"),
        Card: e("common/wx/mpEditor/plugin/card.js"),
        Emotion: e("common/wx/mpEditor/plugin/emotion.js"),
        MyLink: e("common/wx/mpEditor/plugin/link.js"),
        Unlink: e("common/wx/mpEditor/plugin/unlink.js"),
        AudioMusicPlugin: e("common/wx/mpEditor/plugin/audio_music.js"),
        WeappPlugin: e("common/wx/mpEditor/plugin/weapp.js"),
        Img: e("common/wx/mpEditor/plugin/img.js"),
        Ad: e("common/wx/mpEditor/plugin/adv.js"),
        Video: e("common/wx/mpEditor/plugin/video.js")
    }, l = 400, u = 20;
    return {
        formatTemplateData: t,
        maxTemplateNum: u,
        handleTemplate: o,
        getTemplateList: n,
        delTemplateList: i,
        preview: m
    };
});
define("common/wx/mpEditor/plugin/emotionButton.js", ["widget/emotion_editor.css", "widget/emotion_panel.css", "common/wx/mpEditor/editor_all_min.js", "common/wx/richEditor/emotion.js", "tpl/mpEditor/plugin/emotion.html.js"], function (t) {
    "use strict";
    t("widget/emotion_editor.css"), t("widget/emotion_panel.css"), t("common/wx/mpEditor/editor_all_min.js");
    var i = t("common/wx/richEditor/emotion.js"), o = t("tpl/mpEditor/plugin/emotion.html.js"), n = window.baidu.editor, e = n.ui, s = n.utils, m = e.UIBase, r = e.Popup, p = e.EmotionPicker = function (t) {
        this.initOptions(t), this.init();
    };
    p.prototype = {
        getHtmlTpl: function () {
            return window.wx.T(o, {
                edata: i.getEdata()
            });
        },
        init: function () {
            this.initUIBase();
        },
        _onEmotionClick: function () {
            this.fireEvent("emotionclick");
        }
    }, s.inherits(p, m);
    var c = e.SplitButton, l = e.EmotionButton = function (t) {
        this.initOptions(t), this.init();
    };
    l.prototype = {
        init: function () {
            var t = this;
            this.popup = new r({
                content: new p({
                    editor: t.editor,
                    _onEmotionClick: function (i) {
                        var o = i.target || i.srcElement;
                        o = /^li/i.test(o.nodeName) ? $(o) : $(o).parents("li.js_emotion_li");
                        var n = o.data("title"), e = o.data("name");
                        t._onEmotionSelect({
                            title: n,
                            name: e
                        });
                    }
                }),
                contentClass: "emotion_wrp",
                editor: t.editor
            }), this.initSplitButton();
        },
        className: "edui-for-mpemotion",
        _SplitButton_postRender: c.prototype.postRender,
        postRender: function () {
            this._SplitButton_postRender();
        },
        _onButtonClick: function () {
            this.showPopup();
        },
        _onEmotionSelect: function (t) {
            this.fireEvent("emotionselect", t);
        }
    }, s.inherits(l, c);
});
define("tpl/mpEditor/plugin/link_popup.html.js", [], function () {
    return '{if needBreak}\n<div style="height:5px;display:none"></div>\n{/if}\n<div class="js_link_popup edui_mask_edit_group with_line">\n    <a class="edui_mask_edit_meta" target="_blank" href="{url}" {if !isWeapp}title="{url}"{/if}>{txt}</a>\n    <div class="primary edui_mask_edit_meta no_extra edui-clickable" \n        {if !isWeapp}onclick="$$._execCommandAndHide(\'link\');"{else}onclick="$$._execCommandAndHide(\'insertweapp\', 4);"{/if}>\n        <div class="edui_mask_edit_meta_inner">\n        修改        </div>\n    </div>\n	<div class="primary edui_mask_edit_meta edui-clickable" onclick="$$._execCommandAndHide(\'unlink\');">\n        <div class="edui_mask_edit_meta_inner">\n        清除        </div>\n    </div>\n</div>\n';
});
define("tpl/mpEditor/plugin/link_acc_item.html.js", [], function () {
    return '{each list as item}\n<div data-fakeid="{item.fakeid}" data-nickname="{item.nickname||item.alias}" class="js_acc_item search_biz_item">\n    <div class="search_biz_type">\n        <p>{service_type[item.service_type]||service_type[\'-1\']}</p>\n    </div>\n    <div class="search_biz_avatar">\n        <img src="{item.round_head_img}" alt="{item.nickname}">\n    </div>\n    <div class="search_biz_info">\n        <p class="search_biz_nickname">{item.nickname||item.alias}</p>\n        <p class="search_biz_id">微信号：{item.alias}</p>\n    </div>\n</div>\n{/each}';
});
define("tpl/mpEditor/plugin/link_appmsg.html.js", [], function () {
    return '{if !!msg}\n<div class="media_list_tips_wrp tips_global">\n	<span class="tips">{msg}</span>\n	<span class="vm_box"></span>\n</div>\n{else}\n<ul class=" my_link_list">\n	{each list as item index}\n	<li data-index="{index}" class="my_link_item">\n		<label class="frm_radio_label js_article_label" for="">\n			<span class="date">{item.update_time_str}</span>\n	        <i data-index="{index}" class="icon_radio js_article_i"></i>\n	        <input type="radio" data-index="{index}" name="article_item" class="frm_radio">\n	        <span class="lbl_content">\n	        	<a target="_blank" href="{item.link}">{=(item.title.replace(/<em>/g,"__em_start__").replace(/<\\/em>/g,"__em_end__").html(true).replace(/__em_start__/g,"<em>").replace(/__em_end__/g,"</em>"))}</a>\n	        </span>\n	    </label>\n	</li>\n	{/each}\n</ul>\n{/if}';
});
define("tpl/mpEditor/plugin/link_dialog.html.js", [], function () {
    return '<form id="myform" class="link_dialog">\n    <div class="title_tab">\n        <ul class="js_tab_main tab_navs title_tab">\n            <li data-tab="inner" class="js_tab_item tab_nav first selected">\n                <a href="javascript:;">公众号文章链接</a>\n            </li>\n            {if !!flag}\n            <li data-tab="outer" class="js_tab_item tab_nav">\n                <a href="javascript:;" >外部链接</a>\n            </li>\n            {/if}\n        </ul>\n    </div>\n    <div class="js_warn_tips page_msg mini" style="display:none;">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg_mini warn"></i>\n            </span>\n            <div class="msg_content">\n                <p class="js_tips"></p>\n            </div>\n        </div>\n    </div>\n    <!--BEGIN 公众号消息链接-->\n    <div class="js_inner_main biz_link_form" style="display: block;">\n        <div class="frm_control_group">\n            <label for="" class="frm_label">链接输入方式</label>\n            <div class="frm_controls frm_vertical_lh">\n                <label class="frm_radio_label">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">输入地址</span>\n                    <input type="radio" name="link_type" value="1" class="frm_radio" checked="true">\n                </label>\n                <label class="frm_radio_label selected">\n                    <i class="icon_radio"></i>\n                    <span class="lbl_content">查找文章</span>\n                    <input type="radio" name="link_type" value="2" class="frm_radio">\n                </label>\n            </div>\n        </div>\n        <!--BEGIN 输入文章链接-->\n        <div class="js_link_type js_link_type_1 input_address_tab">\n            <div class="frm_control_group">\n                <label for="" class="frm_label">链接标题</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box link_address_input">\n                        <input type="text" name="innerTitle" class="js_inner_title frm_input">\n                    </span>\n                </div>\n            </div>\n            <div class="frm_control_group">\n                <label for="" class="frm_label">链接地址</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box link_address_input">\n                        <input type="text" name="innerLink" class="js_inner_link_input frm_input" placeholder="http://">\n                    </span>\n                </div>\n            </div>\n        </div>\n        <!--END 输入文章链接-->\n        <!--BEGIN 搜索文章-->\n        <div style="display:none;" class="js_link_type js_link_type_2 search_article_tab">\n            <div class="frm_control_group">\n                <label for="" class="frm_label">公众号</label>\n                <div class="frm_controls">\n                    <span class="js_acc_search_main frm_input_box search_input_box search with_del append">\n                        <a style="display:none;" class="js_acc_search_del del_btn" href="javascript:">\n                            <i class="icon_search_del"></i>&nbsp;\n                        </a>\n                        <a href="javascript:void(0);" class="js_acc_search_btn frm_input_append">\n                            <i class="icon16_common search_gray">\n                                搜索                            </i>\n                            &nbsp;\n                        </a>\n                        <input type="text" placeholder="输入文章来源的公众号名称或微信号，回车进行搜索" value="" class="frm_input js_acc_search_input">\n                    </span>\n                    <!--选择了公众号之后，隐藏以上节点，show出以下节点，并给上面的 .frm_control_group 加上 show_value 类-->\n                    <span class="js_acc_desc frm_input_box" style="display: none;">\n                        <span class="js_acc_Text"></span>\n                        <a class="js_reset_acc" href="javascript:;">重新搜索</a>\n                    </span>\n                    <p class="frm_tips">\n                        <a class="js_self_acc" href="javascript:;">从本公众号已群发的消息中进行选择</a>\n                    </p>\n                    <p class="js_acc_search_tips frm_msg fail">\n                        <span class="frm_msg_content"></span>\n                    </p>\n                </div>\n            </div>\n            <div class="js_acc_content frm_control_group" style="display: none;">\n                <label for="" class="frm_label"></label>\n                <div class="frm_controls">\n                    <div class="search_biz_result_wrap">\n                        <!--loading-->\n                        <i style="display:none;" class="js_acc_loading icon_loading_small white"></i>\n                        <div class="search_biz_result js_acc_list"></div>\n                    </div>\n                    <div class="js_acc_pagebar pagination_wrp"></div>\n                </div>\n            </div>\n\n            <div class="js_article_content frm_control_group" style="display: none;">\n                <label for="" class="frm_label">公众号文章</label>\n                <div class="frm_controls">\n                    <div class="search_article_result">\n                        <div class="info_box">\n                            <div class="inner">\n                                <div class="info_hd">\n                                    <div class="ext_info"></div>\n                                    <h4>\n                                        <span class="frm_input_box search with_del append ">\n                                            <a style="display:none;" class="js_article_search_del del_btn" href="javascript:">\n                                                <i class="icon_search_del"></i>&nbsp;\n                                            </a>\n                                            <a href="javascript:" class="js_article_search_btn frm_input_append">\n                                                <i class="icon16_common search_gray">搜索</i>&nbsp;\n                                            </a>\n                                            <input type="text" value="" class="js_article_search_input frm_input" placeholder="输入文章名查找公众号群发过的文章">\n                                        </span>\n                                    </h4>\n                                </div>\n                                <div class="info_bd tc">\n                                    <i style="display:none;" class="js_article_loading icon_loading_small white"></i>\n                                    <div class="js_article_list">\n                                    </div>\n                                </div>\n                            </div>\n                            <!--BEGIN 分页-->\n                            <div class="js_article_pagebar pagination_wrp"></div>\n                            <!--END 分页-->\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!--END 搜索文章-->\n    </div>\n    <!--END 公众号消息链接-->\n    <!--BEGIN 外链-->\n    {if !!flag}\n    <div class="js_outer_main biz_link_form" style="display: none;">\n        <div class="frm_control_group">\n            <label for="" class="frm_label">链接标题</label>\n            <div class="frm_controls">\n                <span class="frm_input_box link_address_input">\n                    <input name="outerTitle" type="text" class="js_outer_title frm_input" placeholder="">\n                </span>\n            </div>\n        </div>\n        <div class="frm_control_group">\n                <label for="" class="frm_label">链接地址</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box link_address_input">\n                        <input name="outerLink" type="text" class="js_outer_link_input frm_input" placeholder="http://">\n                    </span>\n                </div>\n            </div>\n    </div>\n    {/if}\n    <!--END 外链-->\n</form>';
});
define("shop/shopDialog.js", ["common/wx/popup.js", "tpl/shop/shopDialog.html.js", "tpl/shop/shopDialogItem.html.js", "common/wx/Tips.js", "common/wx/pagebar.js", "common/wx/Cgi.js"], function (o) {
    "use strict";
    o("common/wx/popup.js");
    var t = o("tpl/shop/shopDialog.html.js"), e = o("tpl/shop/shopDialogItem.html.js"), s = o("common/wx/Tips.js"), n = o("common/wx/pagebar.js"), i = o("common/wx/Cgi.js");
    t = wx.T(t, {
        token: wx.data.t,
        lang: wx.data.lang
    });
    var l = function (o) {
        document.body.style.overflow = document.documentElement.style.overflow = "hidden", this.begin = 0,
            this.count = 10;
        var e = $(t).popup({
            title: "选择小店商品",
            className: "align_edge shopcard_dialog",
            buttons: [{
                text: "确定",
                click: function () {
                    var t = n.find(".js_item.selected");
                    return 1 != t.length ? (s.err("请选择一个商品"), !0) : (o.onOk && o.onOk(t.data()), document.body.style.overflow = document.documentElement.style.overflow = "auto",
                        void this.remove());
                },
                type: "primary"
            }, {
                text: "取消",
                click: function () {
                    document.body.style.overflow = document.documentElement.style.overflow = "auto", this.remove();
                },
                type: "default"
            }],
            close: function () {
                this.remove(), document.body.style.overflow = document.documentElement.style.overflow = "auto";
            }
        });
        this.pop = e, this.getList();
        var n = $(e.get()), i = n.find(".js_shopcard_list");
        i.on("click", ".js_item", function () {
            i.find(".js_item").removeClass("selected");
            var o = $(this);
            o.addClass("selected");
        });
    };
    return l.prototype.getList = function () {
        var o = this.pop, t = $(o.get()), l = this.begin, a = this.count, r = this, c = t.find(".js_shopcard_list"), p = t.find(".js_shoploading"), m = t.find(".js_pagination");
        c.hide(), p.show(), m.hide(), i.get("/merchant/goods?type=1&t=shop/list&offset=" + l + "&count=" + a, function (o) {
            if (o && o.base_resp && 0 == o.base_resp.ret) try {
                var t = $.parseJSON(o.data);
                console.log(t);
                var i = t.total, d = t.goods;
                p.hide(), c.html(wx.T(e, {
                    goods: d
                }));
                var h = l / a + 1;
                m.show();
                {
                    new n({
                        container: m,
                        perPage: a,
                        first: !1,
                        last: !1,
                        isSimple: !0,
                        initShowPage: h,
                        totalItemsNum: i,
                        callback: function (o) {
                            var t = o.currentPage;
                            if (t != h) return t--, r.begin = t * a, r.getList(), !1;
                        }
                    });
                }
                return void c.show();
            } catch (u) {
            }
            s.err("系统异常，请稍后重试");
        }, function () {
            s.err("系统异常，请稍后重试");
        });
    }, l.prototype.show = function () {
        this.pop.show();
    }, l.prototype.hide = function () {
        this.pop.hide();
    }, l;
});
define("cardticket/parse_data.js", ["cardticket/add/member_info_flag.js"], function (e) {
    "use strict";

    function _(e) {
        var _ = u[e.card_type] || e.card_type;
        switch (_ += "") {
            case"2":
                e = e.discount;
                break;

            case"1":
                e = e.groupon;
                break;

            case"3":
                e = e.gift;
                break;

            case"4":
                e = e.cash;
                break;

            case"0":
                e = e.general_coupon;
                break;

            case"10":
                e = e.member_card;
                break;

            case"21":
                e = e.scenic_ticket;
                break;

            case"22":
                e = e.movie_ticket;
                break;

            default:
                e = e.general_coupon || e.coupon;
        }
        return e ? (e.type = _, e) : null;
    }

    function t(e, _) {
        return "number" != typeof e && (e = praseFloat(e), isNaN(e)) ? 0 : (_ || (_ = 2), parseFloat(e.toFixed(_)));
    }

    function i(e) {
        var _ = /^https?:\/\/mp.weixin.qq.com\/s/, t = /^http:\/\/mp.weixin.qq.com\/bizmall\/cardshelf/, i = /^http:\/\/mp.weixin.qq.com\/bizmall\/mallshelf/;
        return _.test(e) ? 1 : t.test(e) ? 2 : i.test(e) ? 3 : 4;
    }

    function s(e) {
        return e ? (e + "").html(!1) : "";
    }

    function o(e) {
        var _ = e.url || "", t = e.url_type;
        return 4 == t ? _.replace("http://", "") : s(_);
    }

    function n(e) {
        var n = {}, e = _(e);
        if (!e) return null;
        a(n, e), a(n, e.base_info), n.background_pic_url = e.background_pic_url;
        var r = e.base_info.date_info || {};
        n.time_type = f[r.type] || r.type, 1 == n.time_type && (n.begin_time = r.begin_timestamp, n.end_time = r.end_timestamp),
            n.from_day = r.fixed_begin_term || 0, n.fixed_term = r.fixed_term || 30, n.quantity = e.base_info.sku.quantity,
            n.shop_id_list = e.base_info.shop_id_list, n.location_id_list = e.base_info.location_id_list;
        var u = l[n.code_type];
        if (n.code_type = "undefined" != typeof u ? u : n.code_type, "undefined" == typeof n.code_type && (n.code_type = 1),
            n.least_cost = e.least_cost && e.least_cost / 100, n.reduce_cost = e.reduce_cost && e.reduce_cost / 100,
        "0" == n.least_cost && (n.least_cost = ""), n.discount = n.discount && (100 - n.discount) / 10,
            n.detail = 1 == n.type ? n.deal_detail : n.default_detail, /^http/.test(n.logo_url) || (n.logo_url = ""),
        n.shop_type || (n.shop_type = n.location_id_list && n.location_id_list.length ? 2 : 3), n.auto_update_new_location && (n.shop_type = 1),
            n.isnew = n.func_flag ? !!(16 & n.func_flag) : !1, n.ispay = n.func_flag ? 64 & n.func_flag : !1,
        n.func_flag && (n.show_in_nearby = !1), n.ispay && (n.can_share = !0), n.ispay && (n.detail = n.detail ? n.detail.replace(/\n微信价：.*?元$/gm, "") : ""),
            n.price = t(e.base_info.sku.price / 100), n.original_price = t(e.base_info.sku.original_price / 100),
        1 == n.create_source && (n.isnew = !0), 1 == n.time_type && n.end_time < new Date / 1e3 && (n.is_expire = !0),
            n.is_intercomm = 16384 & n.func_flag, "undefined" != typeof e.base_info.task_info && (n.is_from_intercomm = !0,
            n.task_info = e.base_info.task_info), n.is_from_intercomm && (n.isnew = !0), n.status = m[n.status] || n.status,
        n.discount && (n.supply_discount = !0), 10 == n.type) {
            var d = [];
            if (n.promotion_url_name) {
                var p = {
                    name: n.promotion_url_name,
                    tips: n.promotion_url_sub_title,
                    url: n.promotion_url
                };
                p.url_type = i(p.url), p.url = o(p), d = [p];
            }
            e.custom_cell1 && (e.custom_cell1.url_type = i(e.custom_cell1.url), e.custom_cell1.url = o(e.custom_cell1),
                d.push(e.custom_cell1)), e.custom_cell2 && (e.custom_cell2.url_type = i(e.custom_cell2.url),
                e.custom_cell2.url = o(e.custom_cell2), d.push(e.custom_cell2)), n.config_url = d;
            var y = e.required_info || {
                info_flag: 0
            }, g = e.optional_info || {
                info_flag: 0
            };
            n.require_keywords = c.flag2info(y.info_flag), n.option_keywords = c.flag2info(g.info_flag),
                n.require_self_keywords = y.field_list, n.option_self_keywords = g.field_list, n.must_activate = !n.auto_activate,
            n.supply_discount && (n.prerogative = n.prerogative.replace(/^用卡可享受.*?折优惠\n/, "")), n.quantity = "--",
                n.can_modify = (e.required_info ? e.required_info.can_modify : !1) || (e.optional_info ? e.optional_info.can_modify : !1),
                n.supply_balance = e.supply_balance;
        } else {
            var d = [];
            if (n.custom_url_name) {
                var p = {
                    name: n.custom_url_name,
                    tips: n.custom_url_sub_title,
                    url: n.custom_url
                };
                p.url_type = i(p.url), p.url = o(p), d = [p];
            }
            n.config_url = d;
        }
        var b = e.base_info;
        if (10 == n.type) var h = e.modify_msg_operation || {
            _notexist: !0
        }; else var h = b.consume_msg_operation || {
            _notexist: !0
        };
        n.msg_operation = h.url_cell || h.card_cell || {
            _notexist: !0
        }, n.msg_operation._notexist || (n.msg_operation._type = n.msg_operation.card_id ? 5 : i(n.msg_operation.url),
        n.msg_operation.url && (n.msg_operation.url = s(n.msg_operation.url))), n.msg_operation.endtime = n.msg_operation.end_time,
            n.bonus_rule = e.bonus_rule || {}, n.bonus_rule.init_bonus = n.bonus_rule.init_increase_bonus,
            n.bonus_rule.cost_money_unit = n.bonus_rule.cost_money_unit && n.bonus_rule.cost_money_unit / 100,
            n.bonus_rule.reduce_money = n.bonus_rule.reduce_money && n.bonus_rule.reduce_money / 100,
            n.bonus_rule.least_money_to_use_bonus = n.bonus_rule.least_money_to_use_bonus && n.bonus_rule.least_money_to_use_bonus / 100,
        b.sub_merchant_info && (n.sub_merchant_id = b.sub_merchant_info.merchant_id);
        var v = e.advanced_info;
        if (n.use_hours = [], v) {
            n.is_sns_card = 1 == v.gen_type, n.orig_time_limit = v.time_limit || [], n.text_image_list = v.text_image_list || [],
                n.time_limit = [];
            var T = {};
            if (v.time_limit) for (var E = 0; E < v.time_limit.length; E++) {
                var w = v.time_limit[E];
                T[w.type] || (T[w.type] = !0, n.time_limit.push(w));
            }
            1 != n.create_source && v.time_limit && v.time_limit.length && v.time_limit[0].end_hour && (n.use_hours.push(v.time_limit[0]),
            v.time_limit.length > 1 && v.time_limit[0].type == v.time_limit[1].type && n.use_hours.push(v.time_limit[1])),
                n.consume_share_self_num = v.consume_share_self_num, n.consume_share_self_num > 0 ? (n.consume_is_share = !0,
                n.consume_share_type = 1) : v.consume_share_card_list && v.consume_share_card_list.length ? (n.consume_is_share = !0,
                n.consume_share_type = 2, n.consume_share_card_id = v.consume_share_card_list[0].card_id) : n.consume_is_share = !1,
                n.business_service = v.business_service;
            var A = v.abstract;
            A && ($(".section_card_intro").show(), n.abstract = A.abstract, n.cover_logo = A.icon_url_list ? A.icon_url_list[0] : "");
        }
        if (n.is_quit_money = n.func_flag & 1 << 22, n.can_edit_quantity = !(n.is_quit_money || 10 == n.type || n.is_from_intercomm || (3 != n.status && 5 != n.status && 6 != n.status || !n.is_sns_card || n.is_expire) && n.is_sns_card),
        n.is_sns_card && (n.isnew = !0), n.isnew || (n.quantity = "--"), 3 == n.type && n.is_sns_card) {
            n.gift_title = n.title;
            var k = v.use_condition;
            n.title = k ? k.least_cost ? "满%s送%s".sprintf(k.least_cost / 100, n.gift_title) : k.object_use_for ? "买%s送%s".sprintf(k.object_use_for, n.gift_title) : n.gift_title + (n.gift_num ? n.gift_num : "") + (n.gift_unit ? n.gift_unit : "") : n.gift_title + (n.gift_num ? n.gift_num : "") + (n.gift_unit ? n.gift_unit : "");
        }
        n.pay_info = b.pay_info && b.pay_info.swipe_card || {};
        var S = 65536 & n.func_flag;
        if (S) n.dispose_method = 1; else {
            var D = n.func_flag & 1 << 24;
            n.pay_info.is_swipe_card ? (n.dispose_method = 4, n.code_type = 1e4) : D ? (n.dispose_method = 2,
                n.code_type = 1e4) : n.dispose_method = 3;
        }
        var C = n.pay_info;
        if (C.auditing_info_list || (C.auditing_info_list = []), C.is_swipe_card) {
            var R = C.auditing_info_list;
            if (R.length) {
                var q = R[R.length - 1];
                if (C.swipe_card_status = 0 == q.mid_list.length ? 1 : 1 == q.ret ? C.is_active ? 0 : 3 : 2, q.trans_buff) {
                    var I = q.trans_buff.html(!1);
                    try {
                        I = $.parseJSON(I);
                    } catch (x) {
                        I = "";
                    }
                    q.trans_buff = I, C.last_audit_item = q;
                }
            } else C.swipe_card_status = 0 == n.quantity ? 4 : 0;
        }
        !C.is_swipe_card || 1 != C.swipe_card_status && 3 != C.swipe_card_status || (n.can_edit_quantity = !1),
        v && v.consume_cell_info && (n.need_verify_code = v.consume_cell_info.need_verify_code,
            n.need_remark = v.consume_cell_info.need_remark), n._can_global_edit = !n.is_from_intercomm && (!n.is_sns_card || n.is_sns_card && !n.is_expire && (3 == n.status || 5 == n.status || 6 == n.status) || n.is_sns_card && (1 == n.status || 2 == n.status));
        var k = v && v.use_condition;
        return k && (n.use_condition_least_cost = k.least_cost / 100 || "", n.accept_category = k.accept_category,
            n.reject_category = k.reject_category, n.can_use_with_other_discount = k.can_use_with_other_discount,
            n.can_use_with_membercard = k.can_use_with_membercard, n.object_use_for = k.object_use_for,
            n.has_condition = k.least_cost || k.object_use_for || k.accept_category || k.reject_category || !k.can_use_with_other_discount,
        3 == n.type && (n.use_condition_least_cost_type = n.object_use_for ? 2 : 1)), n.is_sns_card && 3 == n.type && (n.has_condition = !0),
            n;
    }

    function a(e, _) {
        for (var t in _) _.hasOwnProperty(t) && "object" != typeof _[t] && (e[t] = _[t]);
        return e;
    }

    function r(e) {
        for (var _ = {}, t = [], i = 0; i < e.length; i++) {
            var s = n(e[i]);
            s && (_[s.id] = s, t.push(s));
        }
        return {
            card_cache: _,
            card_list: t
        };
    }

    var c = e("cardticket/add/member_info_flag.js"), u = {
        DISCOUNT: "2",
        MEMBER_CARD: "10",
        GROUPON: "1",
        GIFT: "3",
        CASH: "4",
        GENERAL_COUPON: "0",
        SCENIC_TICKET: "21",
        MOVIE_TICKET: "22"
    }, l = {
        CODE_TYPE_TEXT: 0,
        CODE_TYPE_BARCODE: 1,
        CODE_TYPE_QRCODE: 2
    }, m = {
        CARD_STATUS_INIT: 0,
        CARD_STATUS_NOT_VERIFY: 1,
        CARD_STATUS_VERIFY_FAIL: 2,
        CARD_STATUS_VERIFY_OK: 3,
        CARD_STATUS_DELETE: 4,
        CARD_STATUS_SYS_DELETE: 5,
        CARD_STATUS_DISPATCH: 6,
        CARD_STATUS_SYS_OFF_SHELF: 7,
        CARD_STATUS_EXPIRED: 8
    }, f = {
        DATE_TYPE_FIX_TIME_RANGE: 1,
        DATE_TYPE_FIX_TERM: 2,
        DATE_TYPE_PERMANENT: 100
    };
    return {
        parse_cardticket: n,
        parse_cardlist: r,
        url_type: i
    };
});
define("cardticket/send_card.js", ["common/wx/popup.js", "common/wx/Step.js", "cardticket/send_card_table.js", "tpl/cardticket/send_card.html.js"], function (e) {
    "use strict";
    var t = (e("common/wx/popup.js"), {
        removeOnHide: !0,
        view_mode: window.view_mode || 0
    }), p = (e("common/wx/Step.js"), function (e) {
        this.opt = $.extend(!0, {}, t, e), this.init();
    }), o = e("cardticket/send_card_table.js");
    return p.prototype = {
        _html: e("tpl/cardticket/send_card.html.js"),
        init: function () {
            var e = this.opt, t = this, p = $(template.compile(this._html)()).popup({
                title: "选择卡券",
                autoShow: !1,
                buttons: [{
                    text: "确定",
                    type: "primary",
                    click: function () {
                        t.sendCardTable.select();
                    }
                }, {
                    text: "取消",
                    type: "default",
                    click: function () {
                        t.sendCardTable.isLoading() || this.hide();
                    }
                }],
                onHide: function () {
                    e.onHide && e.onHide.call(t), e.removeOnHide && this.remove();
                },
                className: "send_card align_edge",
                width: 960
            });
            if (this.$send_popup = p, e.container = this.$send_popup, e.pageChanged = function () {
                t.$send_popup.popup("resetPosition");
            }, e.getDataComplete = function () {
                t.$send_popup.popup("resetPosition");
            }, e.selectComplete) {
                var n = e.selectComplete;
                e.selectComplete = function () {
                    n.call(t, arguments[0], arguments[1], arguments[2]), t.hide();
                };
            } else e.selectComplete = function () {
                t.hide();
            };
            e.hidePopup = function () {
                t.$send_popup.popup("hide");
            }, this.sendCardTable = new o(e);
        },
        show: function () {
            this.$send_popup.popup("show"), this.$send_popup.popup("resetPosition");
        },
        hide: function () {
            this.$send_popup.popup("hide");
        },
        destroy: function () {
            this.$send_popup.popup("remove");
        }
    }, p;
});