define("common/wx/media/imgsDialogByUrls.js", ["common/wx/popup.js", "tpl/media/imgsDialogByUrls.html.js", "common/wx/Step.js", "common/wx/media/cropimg.js", "common/wx/Tips.js"], function (t) {
    "use strict";
    t("common/wx/popup.js");
    var i = t("tpl/media/imgsDialogByUrls.html.js"), o = t("common/wx/Step.js"), s = t("common/wx/media/cropimg.js"), e = t("common/wx/Tips.js");
    "function" != typeof window.__titleImgLoaded && (window.__titleImgLoaded = function (t) {
        var i = $(t), o = new window.Image;
        o.onload = function () {
            o.onload = null, this.width >= 200 && this.height >= 200 ? i.parents(".js_imgItem").show() : i.parents(".js_imgItem").remove();
        }, o.src = t.src;
    });
    var n = function (t) {
        this.opt = t, this.hasInitCrop = !1, this.cropRatio = t.cropRatio || 1.8, this.selectUrls = [],
            this._initDialog(), this._initImg(), this._initEvent();
    };
    return n.prototype = {
        _initDialog: function () {
            var t = this;
            this.$dialog = $(wx.T(i, t.opt)).popup({
                width: 800,
                title: "选择封面",
                autoShow: !1,
                className: "appmsg_content_img_dialog",
                buttons: [{
                    text: "下一步",
                    type: "primary",
                    isHide: !0,
                    classWrap: "js_crop_next_btn",
                    click: function () {
                        return 0 == t.selectUrls.length ? void e.err("请选择封面图片") : void t._cropGoStep(2);
                    }
                }, {
                    text: "上一步",
                    type: "default",
                    isHide: !0,
                    classWrap: "js_crop_pre_btn",
                    click: function () {
                        t._cropGoStep(1);
                    }
                }, {
                    text: "完成",
                    type: "primary",
                    classWrap: "js_crop_done_btn",
                    isHide: !0,
                    click: function () {
                        if (!t.croping) {
                            var i = this, o = t.$doneBtn;
                            t.croping = !0, o.btn(!1), t._ImgCropper.getUrl({
                                onsuccess: function (s) {
                                    t.$dialog && (t.croping = !1, o.btn(!0), i.remove(), t.opt.onOk && t.opt.onOk([{
                                        oriUrl: s.oriUrl,
                                        file_id: s.file_id || "",
                                        url: s.url
                                    }]));
                                },
                                onerror: function (i) {
                                    t.$dialog && (t.croping = !1, o.btn(!0), e.err(-1 == i.retcode ? "请选择裁剪区域" : "系统繁忙，请稍后再试"));
                                }
                            });
                        }
                    }
                }],
                onHide: function () {
                    this.remove(), "function" == typeof t.opt.onHide && (t.opt.onHide(), t.$dialog = null);
                }
            }), t.$preBtn = t.$dialog.find(".js_crop_pre_btn"), t.$nextBtn = t.$dialog.find(".js_crop_next_btn"),
                t.$doneBtn = t.$dialog.find(".js_crop_done_btn"), t.$step1 = t.$dialog.find(".js_step1"),
                t.$step2 = t.$dialog.find(".js_step2"), t.stepBar = new o({
                container: t.$dialog.find(".js_step_wrp"),
                names: ["1 从正文选择封面", "2 裁切封面"]
            }), t.$dialog.popup("show"), t.$dialog.popup("resetPosition");
        },
        _cropGoStep: function (t) {
            var i = "hide", o = "show";
            1 == t ? (this.stepBar.setStep(1), i = "hide", o = "show") : 2 == t && (this.stepBar.setStep(2),
                i = "show", o = "hide"), this.$nextBtn[o](), this.$preBtn[i](), this.$doneBtn[i](), this.$step2[i](),
                this.$step1[o](), 2 == t && this._initCrop();
        },
        _initCrop: function () {
            var t = this, i = this.selectUrls[0];
            t._ImgCropper = new s({
                container: t.$step2,
                cropRatio: t.cropRatio,
                url: i.url,
                tips: this.opt.cropImgtips
            });
        },
        _initImg: function () {
            for (var t = this, i = 0, o = t.opt.urls.length; o > i; i++) {
                var s = t.opt.urls[i], e = new window.Image;
                e.onload = function () {
                    if (this.onload = null, t.$dialog) {
                        var i = t.$dialog.find('.js_imgItem[data-src="' + this.src + '"]');
                        this.width >= 200 && this.height >= 200 ? (i.show().find(".js_imgItemSrc").css({
                            "background-image": "url(" + this.src + ")"
                        }).attr({
                            "data-width": this.width,
                            "data-ratio": this.width / this.height
                        }), t.$nextBtn.show()) : i.remove();
                    }
                }, e.src = s.url;
            }
        },
        _initEvent: function () {
            var t = this;
            this.$dialog.on("click", ".js_imgItem", function () {
                var i = $(this), o = i.find(".js_imgItemSrc");
                o.data("remoteid") || o.hasClass("js_catchremoteimageerror") || (t.$dialog.find(".js_imgItem").removeClass("selected"),
                    i.addClass("selected"), t.selectUrls = [{
                    url: o.css("background-image").replace(/url\([\"\']?([^\)\'\"]+)[\"\']?\)/, "$1"),
                    width: o.attr("data-width") || "",
                    ratio: o.attr("data-ratio") || ""
                }]);
            });
        }
    }, n;
});
define("common/wx/popover.js", ["tpl/popover.html.js"], function (o, t, e) {
    "use strict";

    function i(o) {
        if (o = $.extend(!0, {}, h, o), this.opt = o, this.$dom = $(o.dom), this.$dom.data("popover")) {
            var t = this.$dom.data("popover");
            return p(o, t), t.$pop.show(), t.opt.defaultOpen ? t.$pop.show() : t.$pop.hide(), t;
        }
        return o.buttons && o.buttons && o.buttons.each(function (o) {
            o.type = o.type || "default";
        }), this.$pop = $(template.compile(s)(o)), o.addCls && this.$pop.addClass(o.addCls), $("body").append(this.$pop),
            n(this, o), p(o, this), this.opt.defaultOpen ? this.$pop.show() : this.$pop.hide(), this.$dom.data("popover", this),
            this.clickIn = !0, this;
    }

    function n(o, t) {
        function e() {
            clearTimeout(n), o.show();
        }

        function i() {
            n = setTimeout(function () {
                o.hide();
            }, p);
        }

        if (t.buttons && t.buttons.length > 0 && o.$pop.find(".jsPopoverBt").each(function (e, i) {
            t.buttons[e] && "function" == typeof t.buttons[e].click && $(i).click(function (i) {
                t.buttons[e].click.call(o, i);
            });
        }), o.$pop.find(".jsPopoverClose").click(function () {
            t.close === !0 ? o.hide() : "function" == typeof t.close && t.close.call(o);
        }), t.hover && (o.$dom.hover(function () {
            o.hoverTime && clearTimeout(o.hoverTime);
        }, function () {
            o.hoverTime = o.hide.delay(1, o);
        }), o.$pop.hover(function () {
            o.hoverTime && clearTimeout(o.hoverTime);
        }, function () {
            o.hoverTime && clearTimeout(o.hoverTime), o.hoverTime = o.hide.delay(1, o);
        })), t.isToggle) {
            var n = null, p = 300;
            o.$dom.hover(e, i), o.$pop.hover(e, i);
        }
        t.hideIfBlur && (o._onBlur = function (o) {
            var t = o.data.context, e = o.target, i = t.$dom.get(0), n = t.$pop.get(0);
            t.clickIn ? t.clickIn = !1 : $.contains(i, e) || i === e || $.contains(n, e) || n === e || o.data.context.hide();
        }, $(document).on("click", {
            context: o
        }, o._onBlur)), o._onResize = function (o) {
            o.data.context.resetPosition();
        }, $(window).on("resize", {
            context: o
        }, o._onResize);
    }

    function p(o, t) {
        var e = t.$dom.offset();
        "left" == o.margin ? (console.log(e.top), console.log(t.$dom.height()), t.$pop.css({
            top: e.top + t.$dom.height(),
            left: e.left - 28
        }).addClass("pos_left")) : "right" == o.margin ? t.$pop.css({
            top: e.top + t.$dom.height(),
            left: e.left + t.$dom.width() - t.$pop.width() + 28
        }).addClass("pos_right") : t.$pop.css({
            top: e.top + t.$dom.height(),
            left: e.left + t.$dom.outerWidth() / 2 - t.$pop.width() / 2
        }).addClass("pos_center");
    }

    var s = o("tpl/popover.html.js"), h = {
        dom: "",
        content: "",
        place: "bottom",
        margin: "center",
        hideIfBlur: !1,
        hover: !1,
        addCls: "",
        width: "",
        isToggle: !1,
        defaultOpen: !0,
        onHide: !1,
        onShow: !1,
        onRemove: !1
    };
    i.prototype = {
        remove: function () {
            this.$pop.remove(), this.$dom.removeData("popover"), this._onBlur && $(document).off("click", this._onBlur),
                $(window).off("resize", this._onResize), "function" == typeof this.opt.onRemove && this.opt.onRemove.call(this);
        },
        hide: function () {
            this.$pop.hide(), "function" == typeof this.opt.onHide && this.opt.onHide.call(this);
        },
        show: function () {
            this.$pop.show(), "function" == typeof this.opt.onShow && this.opt.onShow.call(this);
        },
        resetPosition: function () {
            return p(this.opt, this);
        }
    }, e.exports = i;
});
define("common/wx/preview.js", ["common/wx/Tips.js", "widget/img_preview.css", "tpl/preview.html.js"], function (t, n, i) {
    "use strict";
    var e = t("common/wx/Tips.js"), r = (t("widget/img_preview.css"), t("tpl/preview.html.js")), m = function (t) {
        this._initData(t), this._render(), this._initEvent();
    };
    m.prototype = {
        _moImgData: [],
        _msTmplHtml: r,
        _moCurrentImgIdx: 0,
        _initData: function (t) {
            return this._moImgData = t.imgdata || [], this._moCurrentImgIdx = "undefined" == typeof t.current ? 0 : "number" == typeof t.current ? t.current : this._inArray(t.current, t.imgdata),
                this._moImgData.length < 1 ? void this._throwErr() : ((this._moCurrentImgIdx < 0 || this._moCurrentImgIdx >= this._moImgData.length) && (this._moCurrentImgIdx = 0),
                    void(this._moCfg = {
                        view: this._moImgData.length > 1 ? !0 : !1,
                        imgsrc: this._moImgData[this._moCurrentImgIdx].imgsrc,
                        downsrc: this._moImgData[this._moCurrentImgIdx].downsrc,
                        prev: this._moCurrentImgIdx - 1 > -1 ? !0 : !1,
                        next: this._moCurrentImgIdx + 1 < this._moImgData.length ? !0 : !1
                    }));
        },
        _render: function () {
            $(template.compile(this._msTmplHtml)(this._moCfg)).appendTo("body");
        },
        _prev: function () {
            this._moCurrentImgIdx > 0 && ($.extend(this._moCfg, {
                imgsrc: this._moImgData[this._moCurrentImgIdx - 1].imgsrc,
                downsrc: this._moImgData[this._moCurrentImgIdx - 1].downsrc,
                prev: this._moCurrentImgIdx - 1 > 0 ? !0 : !1,
                next: !0
            }), this._changeImg(), this._moCurrentImgIdx--);
        },
        _next: function () {
            this._moCurrentImgIdx + 1 < this._moImgData.length && ($.extend(this._moCfg, {
                imgsrc: this._moImgData[this._moCurrentImgIdx + 1].imgsrc,
                downsrc: this._moImgData[this._moCurrentImgIdx + 1].downsrc,
                next: this._moCurrentImgIdx + 2 < this._moImgData.length ? !0 : !1,
                prev: !0
            }), this._moCurrentImgIdx++, this._changeImg());
        },
        _changeImg: function () {
            var t = $("#img_opr_container");
            this._moCfg.next ? t.removeClass("next_disabled") : t.addClass("next_disabled"), this._moCfg.prev ? t.removeClass("prev_disabled") : t.addClass("prev_disabled"),
                $("#img_dom").hide(), $("#loading_dom").show(), $("#img_dom").find("img").attr("src", ""),
                $("#img_dom").find("img").attr("src", this._moCfg.imgsrc), $("#btndown").attr("href", this._moCfg.downsrc);
        },
        _destory: function () {
            $(".preview_mask").remove(), $("#preview_container").remove();
        },
        _throwErr: function () {
            alert("系统错误，请重试");
        },
        _initEvent: function () {
            var t = this;
            $("#preview_container").on("click", function (n) {
                var i = n.srcElement || n.target;
                $.contains($("#img_container")[0], i) || $.contains($("#img_opr_container")[0], i) || t._destory();
            }), $("#closebtn").on("click", function () {
                return t._destory(), !1;
            }), $("#btnview").on("click", function () {
                return "" != t._moCfg.imgsrc ? window.open(t._moCfg.imgsrc) : e.err("图片资源加载失败。"), !1;
            }), $("#btnnext").on("click", function () {
                t._next();
            }), $("#btnprev").on("click", function () {
                t._prev();
            }), $(document).keyup(function (n) {
                27 == n.keyCode && t._destory(), 37 == n.keyCode && t._prev(), 39 == n.keyCode && t._next();
            }), $("#img_dom").find("img").on("load", function () {
                $("#img_dom").show(), $("#loading_dom").hide();
            });
        },
        _inArray: function (t, n) {
            for (var i, e = 0; i = n[e]; e++) if (t == i.imgsrc) return e;
            return -1;
        }
    }, i.exports = {
        close: function () {
            m._destory();
        },
        show: function (t) {
            return new m(t);
        }
    };
});
define("common/wx/media/imageDialog.js", ["biz_web/ui/checkbox.js", "common/wx/popover.js", "common/wx/Cgi.js", "common/wx/Tips.js", "common/wx/popup.js", "common/wx/pagebar.js", "biz_web/utils/upload.js", "common/wx/tooltips.js", "tpl/media/dialog/image_layout.html.js", "tpl/media/dialog/image_list.html.js", "tpl/media/dialog/image_group.html.js", "common/wx/media/cropimg.js", "tpl/media/dialog/add_group.html.js", "tpl/media/dialog/image_water.html.js", "common/wx/Step.js", "page/media/dialog_img_pick.css"], function (e) {
    "use strict";
    var i = (e("biz_web/ui/checkbox.js"), e("common/wx/popover.js")), t = e("common/wx/Cgi.js"), o = e("common/wx/Tips.js"), r = (e("common/wx/popup.js"),
            e("common/wx/pagebar.js")), n = e("biz_web/utils/upload.js"), a = e("common/wx/tooltips.js"), s = e("tpl/media/dialog/image_layout.html.js"), p = e("tpl/media/dialog/image_list.html.js"), l = e("tpl/media/dialog/image_group.html.js"), c = e("common/wx/media/cropimg.js"),
        d = e("tpl/media/dialog/add_group.html.js"), g = e("tpl/media/dialog/image_water.html.js"), u = (template.render,
            template.compile(d)), m = template.compile(l), f = template.compile(p), _ = e("common/wx/Step.js"), h = {
            popover: null
        };
    e("page/media/dialog_img_pick.css");
    var v = function (e) {
        return new j(e);
    }, j = function (e) {
        this.options = e, this.events = [], this.imgArr = [], this.converting = 0, this.cropObj = {}, this.fromUpload = [],
            b.init.call(this);
    }, b = {
        init: function () {
            var e = this, i = e.options = $.extend(!0, {
                cropImgtips: "",
                cropImg: !1,
                cropRatio: 1,
                tpl: s,
                title: "选择图片",
                scene: "cdn",
                maxSelect: 1,
                perPage: 10,
                group: 0,
                uploadGroupId: 1,
                coverPicCheckbox: !1,
                coverPic: 0,
                onOK: null,
                onCancel: null
            }, e.options);
            i.cropImg && (i.maxSelect = 1, e.cropObj.cropRatio = i.cropRatio), i.tpl = template.compile(i.tpl)(i),
                e.on("ok", function (e) {
                    !!h.popover && h.popover.remove(), this.destroy(), "function" == typeof i.onOK && i.onOK.call(this, e);
                }), e.on("cancel", function () {
                !!h.popover && h.popover.remove(), this.destroy(), "function" == typeof i.onCancel ? i.onCancel.call(this) : "function" == typeof i.onHide && i.onHide.call(this);
            }), e.on("hide", function () {
                !!h.popover && h.popover.remove(), this.destroy(), "function" == typeof i.onHide && i.onHide.call(this);
            });
            var t;
            t = i.cropImg ? [{
                text: "下一步",
                classWrap: "js_crop_next_btn",
                type: "disabled",
                click: function () {
                    return 0 != e.imgArr.length && e.imgArr[0].url ? void b.cropGoStep.call(e, 2) : void o.err("请选择封面图片");
                }
            }, {
                text: "上一步",
                type: "default",
                isHide: !0,
                classWrap: "js_crop_pre_btn",
                click: function () {
                    b.cropGoStep.call(e, 1);
                }
            }, {
                text: "完成",
                classWrap: "js_crop_done_btn",
                isHide: !0,
                type: "primary",
                click: function () {
                    var i = e.cropObj;
                    if (!i.croping) {
                        var t = i.$doneBtn;
                        i.croping = !0, t.btn(!1), i._ImgCropper.getUrl({
                            onsuccess: function (o) {
                                if (e.dialog) {
                                    i.croping = !1, t.btn(!0);
                                    var r = "";
                                    e.options.coverPicCheckbox && (r = e.dialog.find(".js_show_cover_pic").checkbox("value") || "");
                                    var n = e.imgArr[0];
                                    e.trigger("ok", [{
                                        oriUrl: o.oriUrl,
                                        oriFormat: n.format,
                                        url: o.url,
                                        file_id: o.file_id || "",
                                        source: "lib",
                                        coverPic: r
                                    }]);
                                }
                            },
                            onerror: function (r) {
                                e.dialog && (i.croping = !1, t.btn(!0), o.err(-1 == r.retcode ? "请选择裁剪区域" : "系统繁忙，请稍后再试"));
                            }
                        });
                    }
                }
            }] : [{
                text: "确定",
                type: "disabled",
                click: function () {
                    var t = this.get().find(".js_btn").eq(0).parent();
                    return t.hasClass("btn_disabled") ? void o.err("请选择图片") : (e.popup = this, $.each(e.imgArr, function (i, t) {
                        t.source = -1 != e.fromUpload.indexOf(t.file_id + "") ? "upload" : "lib", e.options.coverPicCheckbox && (t.coverPic = e.popup.get().find(".js_show_cover_pic").checkbox("value") || "");
                    }), void("cdn" == i.scene && e.converting > 0 ? (t.btn(!1), e.on("converted", function () {
                        0 == e.converting && (e.trigger("ok", [{
                            url: url
                        }]), t.btn(!0));
                    })) : e.trigger("ok", e.imgArr || [])));
                }
            }, {
                text: "取消",
                click: function () {
                    e.trigger("cancel");
                }
            }], e.dialog = $(i.tpl.trim()).popup({
                title: i.title,
                className: "img_dialog_wrp",
                width: 846,
                buttons: t,
                onHide: function () {
                    e.trigger("hide");
                }
            });
            var r = e.dialog.popup("get");
            i.cropImg && (e.cropObj.stepBar = new _({
                container: r.find(".js_step_wrp"),
                names: ["1 从素材库选择封面", "2 裁切封面"]
            }), e.cropObj.$preBtn = r.find(".js_crop_pre_btn"), e.cropObj.$nextBtn = r.find(".js_crop_next_btn"),
                e.cropObj.$doneBtn = r.find(".js_crop_done_btn"), e.cropObj.$selectFrame = r.find(".js_select_frame"),
                e.cropObj.$cropFrame = r.find(".js_crop_frame")), r.find(".js_show_cover_pic").checkbox(),
                r.find(".js_loading").show(), w.getImagesByGroupId({
                group_id: i.group,
                count: i.perPage
            }, function (t) {
                if (e.dialog) {
                    var o = t.page_info;
                    o.scene = i.scene, o.group = i.group;
                    var r = e.dialog.popup("get"), n = m(o);
                    r.find(".js_loading").hide(), r.find(".js_group").append(n).find(".js_total").text("(%s)".sprintf(o.file_cnt.img_cnt)),
                        b.renderImageList(r.find(".js_list"), o, e.imgArr), b.initEvent.call(e, t), b.initWater.call(e, o),
                        b.initPageBar.call(e, o, i.group), e.dialog.popup("resetPosition");
                }
            }), b.initUpload.call(e, i.group);
        },
        cropGoStep: function (e) {
            var i = this.cropObj, t = "hide", o = "show";
            1 == e ? (i.stepBar.setStep(1), t = "hide", o = "show") : 2 == e && (i.stepBar.setStep(2), t = "show",
                o = "hide"), i.$nextBtn[o](), i.$preBtn[t](), i.$doneBtn[t](), i.$cropFrame[t](), i.$selectFrame[o](),
            2 == e && b.initCrop.call(this);
        },
        initCrop: function () {
            var e = this.cropObj;
            0 != this.imgArr.length && this.imgArr[0].url && (e._ImgCropper = new c({
                container: e.$cropFrame,
                cropRatio: e.cropRatio,
                width: 400,
                height: 400,
                url: this.imgArr[0].url,
                tips: this.options.cropImgtips
            }));
        },
        initEvent: function () {
            var e = this, i = e.dialog.popup("get"), t = e.options;
            i.on("click", ".js_imageitem", function () {
                var r, n = $(this), a = n.find("label"), s = i.find(".js_btn_p").eq(0), p = n.data("url"), l = n.data("id"), c = n.data("oristatus"), d = n.data("format");
                a.hasClass("selected") ? (p || e.converting--, a.removeClass("selected"), r = x.indexOf(e.imgArr, l),
                r >= 0 && e.imgArr.splice(r, 1), i.find(".js_selected").text(e.imgArr.length)) : 1 == t.maxSelect ? (p || (e.converting = 1),
                    a.addClass("selected"), n.siblings().find("label").removeClass("selected"), e.imgArr = [{
                    url: p,
                    file_id: l,
                    format: d,
                    copyright_status: c
                }], i.find(".js_selected").text(e.imgArr.length)) : t.maxSelect > e.imgArr.length ? (p || e.converting++,
                    a.addClass("selected"), e.imgArr.push({
                    url: p,
                    file_id: l,
                    format: d,
                    copyright_status: c
                }), i.find(".js_selected").text(e.imgArr.length)) : o.err("最多可选%s张".sprintf(t.maxSelect)),
                    e.imgArr.length > 0 ? s.enable().addClass("btn_primary") : s.disable(), "cdn" == t.scene && a.hasClass("selected") && !p && w.getCdnUrlByFileId({
                    file_id: l,
                    group_id: i.find(".js_groupitem.selected").data("groupid")
                }, function (i) {
                    0 == i.errcode ? (e.converting--, n.data("url", i.url), r = x.indexOf(e.imgArr, l), r >= 0 && (e.imgArr[r].url = i.url),
                        e.trigger("converted")) : (o.err("转存失败"), n.click());
                });
            }), i.on("click", ".js_creategroup", function () {
                b.createPopover.call(e, {
                    dom: this,
                    content: u({}),
                    ok: function () {
                        b.createGroup.call(e);
                    }
                });
            }), i.on("click", ".js_groupitem", function (o, r) {
                var n = $(this), a = i.find(".js_list"), s = i.find(".js_loading"), p = i.find(".js_pagebar"), l = n.data("groupid");
                n.hasClass("selected") || (n.addClass("selected").siblings(".selected").removeClass("selected"),
                    $(".js_imageupload").data("groupid", l), a.hide(), p.hide(), s.show(), w.getImagesByGroupId({
                    group_id: l,
                    count: t.perPage
                }, function (o) {
                    if (e.dialog && l == i.find(".js_groupitem.selected").data("groupid")) {
                        o = o.page_info, o.scene = t.scene, s.hide(), p.show(), b.renderImageList(a, o, e.imgArr),
                            b.initPageBar.call(e, o, l), b.initUpload.call(e);
                        for (var n = 0; r && "upload" == r.source && n < r.count; ++n) a.children().eq(n).click();
                    }
                }));
            });
        },
        createPopover: function (e) {
            !!h.popover && h.popover.remove(), h.popover = new i({
                dom: e.dom,
                content: e.content,
                margin: "center",
                place: "bottom",
                buttons: [{
                    text: "确定",
                    type: "primary",
                    click: function () {
                        this.remove(), e.ok.call(this);
                    }
                }, {
                    text: "取消",
                    click: function () {
                        this.remove();
                    }
                }]
            });
        },
        createGroup: function () {
            var e = this, i = h.popover.$pop, r = i.find(".jsPopoverBt").eq(0), n = i.find("input").val().trim();
            return n.length < 1 || n.length > 6 ? void o.err("分组名字为1-6个字符") : (r.btn(0), void t.post({
                url: wx.url("/cgi-bin/filepage"),
                data: {
                    action: "create_group",
                    name: n
                },
                mask: !1
            }, function (i) {
                var t = i.base_resp.ret;
                if (0 == t) {
                    var a = e.options;
                    w.getImagesByGroupId({
                        group_id: a.group,
                        count: a.perPage
                    }, function (i) {
                        if (e.dialog) {
                            var t = i.page_info;
                            t.group = 1;
                            for (var o = 0, r = t.file_group_list.file_group.length; r > o; o++) {
                                var a = t.file_group_list.file_group[o];
                                a.name == n && (t.group = a.id);
                            }
                            var s = e.dialog.popup("get"), p = s.find(".js_list"), l = m(t);
                            s.find(".js_group").html(l), b.renderImageList(p, {
                                file_item: []
                            }, e.imgArr), b.initPageBar.call(e, t, t.group), s.find(".js_imageupload").data("groupid", t.group),
                                b.initUpload.call(e, t.group);
                        }
                    });
                } else 15006 == t ? (o.err("已经超过100个分组，不能再创建新的分组。"), r.btn(!0)) : (o.err("创建失败，请重试"), r.btn(!0));
            }));
        },
        initPageBar: function (e, i) {
            var t = this, o = t.dialog.popup("get"), n = t.options;
            b.pagebar && b.pagebar.destroy();
            var a = 0;
            return 0 == i ? a = e.file_cnt.img_cnt : e.file_group_list.file_group.each(function (e) {
                e.id == i && (a = e.count);
            }), n.perPage >= a ? void o.find(".js_pagebar").empty() : void(b.pagebar = new r({
                container: o.find(".js_pagebar"),
                perPage: n.perPage,
                initShowPage: 1,
                totalItemsNum: a,
                first: !1,
                last: !1,
                isSimple: !0,
                callback: function (e) {
                    var i = o.find(".js_groupitem.selected").data("groupid"), r = o.find(".js_list"), a = o.find(".js_loading"), s = o.find(".js_pagebar");
                    r.hide(), s.hide(), a.show(), w.getImagesByGroupId({
                        group_id: i,
                        begin: e.perPage * (e.currentPage - 1),
                        count: n.perPage
                    }, function (e) {
                        e = e.page_info, e.scene = n.scene, a.hide(), s.show(), b.renderImageList(r, e, t.imgArr);
                    });
                }
            }));
        },
        initUpload: function (e) {
            var i = this, t = i.dialog.popup("get"), r = t.find(".js_imageupload"), a = "js_imageupload" + Math.random().toString().substr(2), s = i.options, p = t.find(".js_groupitem.selected").data("groupid") || e;
            p = p ? p : s.uploadGroupId, r.attr("id", a).off().children().remove(), n.uploadImageLibFile({
                container: "#" + a,
                only_cdn: s.only_cdn,
                multi: !0,
                type: 2,
                scene: s.uploadScene,
                doublewrite: !0,
                groupid: p,
                onComplete: function (e, t, r, n) {
                    0 == n.base_resp.ret && o.suc("上传成功"), i.fromUpload.push(n.content);
                },
                onAllComplete: function (e, i) {
                    var o = t.find(".js_groupitem.selected"), r = t.find(".js_groupitem[data-groupid=" + p + "]");
                    if (i.filesUploaded > 0) if (!s.doselected || s.doselected && i.filesUploaded <= 1 * s.completeUploadMinSelectNum ? o.removeClass("selected").trigger("click", {
                        source: "upload",
                        count: i.filesUploaded
                    }) : o.removeClass("selected").trigger("click", {
                        source: "upload",
                        count: 0
                    }), r.length > 0 && o.length > 0 && r[0] === o[0]) {
                        var n = +o.find("span").text();
                        o.find("span").text(n + i.filesUploaded);
                    } else {
                        var n = +o.find("span").text();
                        o.find("span").text(n + i.filesUploaded);
                        var a = +r.find("span").text();
                        r.find("span").text(a + i.filesUploaded);
                    }
                },
                showError: !0
            });
        },
        initWater: function (e) {
            var i = this, t = i.options, o = i.dialog.popup("get"), r = e.watermark_status, n = template.compile(g)({
                status: r,
                set_water_url: wx.url("/cgi-bin/settingpage?t=setting/function&action=function&set_water=1")
            });
            o.find(".js_water").text((t.desc ? "，" : "") + (3 == r ? "已关闭" : "已开启") + "图片水印"), new a({
                container: o.find(".js_water_tips"),
                content: n,
                parentClass: "js_water img_water",
                position: {
                    left: -138,
                    top: 2
                },
                reposition: !0,
                type: "hover"
            });
        },
        renderImageList: function (e, i, t) {
            i.file_item.each(function (e) {
                e.img_url = e.cdn_url ? e.cdn_url : wx.url("/cgi-bin/getimgdata?mode=small&source=file&fileId=%s".sprintf(e.file_id)),
                -1 != x.indexOf(t, e.file_id) && (e.selected = 1);
            }), e.html(f(i)).show();
            var o = 0, r = 0, n = 28308, a = 28308, s = 9, p = 10, l = 0, c = 117, d = $(".js_pic"), g = d.length, u = "";
            d.each(function () {
                var e = $(this);
                e.on("error", function () {
                    ++o, ++l, u = u + e.attr("src") + " ", l === g && ((new Image).src = "/mp/jsmonitor?idkey=" + n + "_" + s + "_" + o + ";" + a + "_" + p + "_" + r + "&lc=1&log0=[errorurl][" + encodeURIComponent(u) + "]");
                }), e.on("load", function () {
                    ++r, ++l;
                    var i = parseInt(e.css("width")), t = parseInt(e.css("height"));
                    if (t > i ? e.css("width", c) : e.css("height", c), l === g) {
                        var d = "/mp/jsmonitor?idkey=" + n + "_" + s + "_" + o + ";" + a + "_" + p + "_" + r;
                        o > 0 && (d = d + "&lc=1&log0=[errorurl][" + encodeURIComponent(u) + "]"), (new Image).src = d;
                    }
                }), e.attr("src", e.attr("data-src"));
            });
        }
    }, w = {
        getImagesByGroupId: function (e, i) {
            e = $.extend({
                group_id: 1,
                begin: 0,
                count: 8,
                type: 2
            }, e), t.get({
                url: wx.url("/cgi-bin/filepage?action=select"),
                data: e,
                mask: !1
            }, function (e) {
                0 != e.base_resp.ret ? t.show(e) : i(e);
            });
        },
        getCdnUrlByFileId: function (e, i) {
            e.group_id = e.group_id || 1, t.post({
                url: wx.url("/cgi-bin/uploadimg2cdn?action=duplicate"),
                data: e,
                mask: !1
            }, function (e) {
                i(e);
            });
        }
    }, x = {
        indexOf: function (e, i) {
            for (var t = 0, o = e.length; o > t; ++t) if (e[t].file_id == i) return t;
            return -1;
        }
    }, y = {
        on: function (e, i) {
            if (i) {
                var t = this.events;
                return t[e] = t[e] || [], t[e].push(i), this;
            }
        },
        trigger: function (e) {
            var i = this, t = arguments, o = i.events[e];
            return o ? ($.each(o, function (e, o) {
                o.apply(i, Array.prototype.slice.call(t, 1));
            }), this) : void 0;
        },
        hide: function () {
            return this.dialog.popup("hide"), this;
        },
        show: function () {
            return this.dialog.popup("show"), this;
        },
        destroy: function () {
            !!this.dialog && this.dialog.popup("remove"), this.dialog = null;
        }
    };
    return $.extend(j.prototype, y), v;
});
define("biz_common/moment.js", [], function (t, e, n) {
    function i() {
        return xi.apply(null, arguments);
    }

    function r(t) {
        xi = t;
    }

    function s(t) {
        return "[object Array]" === Object.prototype.toString.call(t);
    }

    function a(t) {
        return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t);
    }

    function o(t, e) {
        var n, i = [];
        for (n = 0; n < t.length; ++n) i.push(e(t[n], n));
        return i;
    }

    function u(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }

    function d(t, e) {
        for (var n in e) u(e, n) && (t[n] = e[n]);
        return u(e, "toString") && (t.toString = e.toString), u(e, "valueOf") && (t.valueOf = e.valueOf),
            t;
    }

    function l(t, e, n, i) {
        return Ce(t, e, n, i, !0).utc();
    }

    function c() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        };
    }

    function h(t) {
        return null == t._pf && (t._pf = c()), t._pf;
    }

    function f(t) {
        if (null == t._isValid) {
            var e = h(t);
            t._isValid = !(isNaN(t._d.getTime()) || !(e.overflow < 0) || e.empty || e.invalidMonth || e.invalidWeekday || e.nullInput || e.invalidFormat || e.userInvalidated),
            t._strict && (t._isValid = t._isValid && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour);
        }
        return t._isValid;
    }

    function m(t) {
        var e = l(0 / 0);
        return null != t ? d(h(e), t) : h(e).userInvalidated = !0, e;
    }

    function _(t, e) {
        var n, i, r;
        if ("undefined" != typeof e._isAMomentObject && (t._isAMomentObject = e._isAMomentObject),
        "undefined" != typeof e._i && (t._i = e._i), "undefined" != typeof e._f && (t._f = e._f), "undefined" != typeof e._l && (t._l = e._l),
        "undefined" != typeof e._strict && (t._strict = e._strict), "undefined" != typeof e._tzm && (t._tzm = e._tzm),
        "undefined" != typeof e._isUTC && (t._isUTC = e._isUTC), "undefined" != typeof e._offset && (t._offset = e._offset),
        "undefined" != typeof e._pf && (t._pf = h(e)), "undefined" != typeof e._locale && (t._locale = e._locale),
        Ai.length > 0) for (n in Ai) i = Ai[n], r = e[i], "undefined" != typeof r && (t[i] = r);
        return t;
    }

    function y(t) {
        _(this, t), this._d = new Date(null != t._d ? t._d.getTime() : 0 / 0), zi === !1 && (zi = !0, i.updateOffset(this),
            zi = !1);
    }

    function p(t) {
        return t instanceof y || null != t && null != t._isAMomentObject;
    }

    function g(t) {
        return 0 > t ? Math.ceil(t) : Math.floor(t);
    }

    function D(t) {
        var e = +t, n = 0;
        return 0 !== e && isFinite(e) && (n = g(e)), n;
    }

    function v(t, e, n) {
        var i, r = Math.min(t.length, e.length), s = Math.abs(t.length - e.length), a = 0;
        for (i = 0; r > i; i++) (n && t[i] !== e[i] || !n && D(t[i]) !== D(e[i])) && a++;
        return a + s;
    }

    function M() {
    }

    function Y(t) {
        return t ? t.toLowerCase().replace("_", "-") : t;
    }

    function w(t) {
        for (var e, n, i, r, s = 0; s < t.length;) {
            for (r = Y(t[s]).split("-"), e = r.length, n = Y(t[s + 1]), n = n ? n.split("-") : null; e > 0;) {
                if (i = S(r.slice(0, e).join("-"))) return i;
                if (n && n.length >= e && v(r, n, !0) >= e - 1) break;
                e--;
            }
            s++;
        }
        return null;
    }

    function S(e) {
        var i = null;
        if (!Zi[e] && "undefined" != typeof n && n && n.exports) try {
            i = Ii._abbr, t("./locale/" + e), k(i);
        } catch (r) {
        }
        return Zi[e];
    }

    function k(t, e) {
        var n;
        return t && (n = "undefined" == typeof e ? b(t) : T(t, e), n && (Ii = n)), Ii._abbr;
    }

    function T(t, e) {
        return null !== e ? (e.abbr = t, Zi[t] = Zi[t] || new M, Zi[t].set(e), k(t), Zi[t]) : (delete Zi[t],
            null);
    }

    function b(t) {
        var e;
        if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return Ii;
        if (!s(t)) {
            if (e = S(t)) return e;
            t = [t];
        }
        return w(t);
    }

    function O(t, e) {
        var n = t.toLowerCase();
        ji[n] = ji[n + "s"] = ji[e] = t;
    }

    function U(t) {
        return "string" == typeof t ? ji[t] || ji[t.toLowerCase()] : void 0;
    }

    function W(t) {
        var e, n, i = {};
        for (n in t) u(t, n) && (e = U(n), e && (i[e] = t[n]));
        return i;
    }

    function C(t, e) {
        return function (n) {
            return null != n ? (F(this, t, n), i.updateOffset(this, e), this) : G(this, t);
        };
    }

    function G(t, e) {
        return t._d["get" + (t._isUTC ? "UTC" : "") + e]();
    }

    function F(t, e, n) {
        return t._d["set" + (t._isUTC ? "UTC" : "") + e](n);
    }

    function P(t, e) {
        var n;
        if ("object" == typeof t) for (n in t) this.set(n, t[n]); else if (t = U(t), "function" == typeof this[t]) return this[t](e);
        return this;
    }

    function H(t, e, n) {
        var i = "" + Math.abs(t), r = e - i.length, s = t >= 0;
        return (s ? n ? "+" : "" : "-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + i;
    }

    function L(t, e, n, i) {
        var r = i;
        "string" == typeof i && (r = function () {
            return this[i]();
        }), t && (qi[t] = r), e && (qi[e[0]] = function () {
            return H(r.apply(this, arguments), e[1], e[2]);
        }), n && (qi[n] = function () {
            return this.localeData().ordinal(r.apply(this, arguments), t);
        });
    }

    function x(t) {
        return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") : t.replace(/\\/g, "");
    }

    function I(t) {
        var e, n, i = t.match(Ei);
        for (e = 0, n = i.length; n > e; e++) i[e] = qi[i[e]] ? qi[i[e]] : x(i[e]);
        return function (r) {
            var s = "";
            for (e = 0; n > e; e++) s += i[e] instanceof Function ? i[e].call(r, t) : i[e];
            return s;
        };
    }

    function A(t, e) {
        return t.isValid() ? (e = z(e, t.localeData()), Vi[e] = Vi[e] || I(e), Vi[e](t)) : t.localeData().invalidDate();
    }

    function z(t, e) {
        function n(t) {
            return e.longDateFormat(t) || t;
        }

        var i = 5;
        for (Ni.lastIndex = 0; i >= 0 && Ni.test(t);) t = t.replace(Ni, n), Ni.lastIndex = 0, i -= 1;
        return t;
    }

    function Z(t) {
        return "function" == typeof t && "[object Function]" === Object.prototype.toString.call(t);
    }

    function j(t, e, n) {
        or[t] = Z(e) ? e : function (t) {
            return t && n ? n : e;
        };
    }

    function E(t, e) {
        return u(or, t) ? or[t](e._strict, e._locale) : new RegExp(N(t));
    }

    function N(t) {
        return t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (t, e, n, i, r) {
            return e || n || i || r;
        }).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }

    function V(t, e) {
        var n, i = e;
        for ("string" == typeof t && (t = [t]), "number" == typeof e && (i = function (t, n) {
            n[e] = D(t);
        }), n = 0; n < t.length; n++) ur[t[n]] = i;
    }

    function q(t, e) {
        V(t, function (t, n, i, r) {
            i._w = i._w || {}, e(t, i._w, i, r);
        });
    }

    function J(t, e, n) {
        null != e && u(ur, t) && ur[t](e, n._a, n, t);
    }

    function $(t, e) {
        return new Date(Date.UTC(t, e + 1, 0)).getUTCDate();
    }

    function R(t) {
        return this._months[t.month()];
    }

    function B(t) {
        return this._monthsShort[t.month()];
    }

    function Q(t, e, n) {
        var i, r, s;
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []),
                 i = 0; 12 > i; i++) {
            if (r = l([2e3, i]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"),
                this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")),
            n || this._monthsParse[i] || (s = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), this._monthsParse[i] = new RegExp(s.replace(".", ""), "i")),
            n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i;
            if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i;
            if (!n && this._monthsParse[i].test(t)) return i;
        }
    }

    function X(t, e) {
        var n;
        return "string" == typeof e && (e = t.localeData().monthsParse(e), "number" != typeof e) ? t : (n = Math.min(t.date(), $(t.year(), e)),
            t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, n), t);
    }

    function K(t) {
        return null != t ? (X(this, t), i.updateOffset(this, !0), this) : G(this, "Month");
    }

    function te() {
        return $(this.year(), this.month());
    }

    function ee(t) {
        var e, n = t._a;
        return n && -2 === h(t).overflow && (e = n[lr] < 0 || n[lr] > 11 ? lr : n[cr] < 1 || n[cr] > $(n[dr], n[lr]) ? cr : n[hr] < 0 || n[hr] > 24 || 24 === n[hr] && (0 !== n[fr] || 0 !== n[mr] || 0 !== n[_r]) ? hr : n[fr] < 0 || n[fr] > 59 ? fr : n[mr] < 0 || n[mr] > 59 ? mr : n[_r] < 0 || n[_r] > 999 ? _r : -1,
        h(t)._overflowDayOfYear && (dr > e || e > cr) && (e = cr), h(t).overflow = e), t;
    }

    function ne(t) {
        i.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + t);
    }

    function ie(t, e) {
        var n = !0;
        return d(function () {
            return n && (ne(t + "\n" + (new Error).stack), n = !1), e.apply(this, arguments);
        }, e);
    }

    function re(t, e) {
        gr[t] || (ne(e), gr[t] = !0);
    }

    function se(t) {
        var e, n, i = t._i, r = Dr.exec(i);
        if (r) {
            for (h(t).iso = !0, e = 0, n = vr.length; n > e; e++) if (vr[e][1].exec(i)) {
                t._f = vr[e][0];
                break;
            }
            for (e = 0, n = Mr.length; n > e; e++) if (Mr[e][1].exec(i)) {
                t._f += (r[6] || " ") + Mr[e][0];
                break;
            }
            i.match(rr) && (t._f += "Z"), Se(t);
        } else t._isValid = !1;
    }

    function ae(t) {
        var e = Yr.exec(t._i);
        return null !== e ? void(t._d = new Date(+e[1])) : (se(t), void(t._isValid === !1 && (delete t._isValid,
            i.createFromInputFallback(t))));
    }

    function oe(t, e, n, i, r, s, a) {
        var o = new Date(t, e, n, i, r, s, a);
        return 1970 > t && o.setFullYear(t), o;
    }

    function ue(t) {
        var e = new Date(Date.UTC.apply(null, arguments));
        return 1970 > t && e.setUTCFullYear(t), e;
    }

    function de(t) {
        return le(t) ? 366 : 365;
    }

    function le(t) {
        return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
    }

    function ce() {
        return le(this.year());
    }

    function he(t, e, n) {
        var i, r = n - e, s = n - t.day();
        return s > r && (s -= 7), r - 7 > s && (s += 7), i = Ge(t).add(s, "d"), {
            week: Math.ceil(i.dayOfYear() / 7),
            year: i.year()
        };
    }

    function fe(t) {
        return he(t, this._week.dow, this._week.doy).week;
    }

    function me() {
        return this._week.dow;
    }

    function _e() {
        return this._week.doy;
    }

    function ye(t) {
        var e = this.localeData().week(this);
        return null == t ? e : this.add(7 * (t - e), "d");
    }

    function pe(t) {
        var e = he(this, 1, 4).week;
        return null == t ? e : this.add(7 * (t - e), "d");
    }

    function ge(t, e, n, i, r) {
        var s, a = 6 + r - i, o = ue(t, 0, 1 + a), u = o.getUTCDay();
        return r > u && (u += 7), n = null != n ? 1 * n : r, s = 1 + a + 7 * (e - 1) - u + n, {
            year: s > 0 ? t : t - 1,
            dayOfYear: s > 0 ? s : de(t - 1) + s
        };
    }

    function De(t) {
        var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == t ? e : this.add(t - e, "d");
    }

    function ve(t, e, n) {
        return null != t ? t : null != e ? e : n;
    }

    function Me(t) {
        var e = new Date;
        return t._useUTC ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()] : [e.getFullYear(), e.getMonth(), e.getDate()];
    }

    function Ye(t) {
        var e, n, i, r, s = [];
        if (!t._d) {
            for (i = Me(t), t._w && null == t._a[cr] && null == t._a[lr] && we(t), t._dayOfYear && (r = ve(t._a[dr], i[dr]),
            t._dayOfYear > de(r) && (h(t)._overflowDayOfYear = !0), n = ue(r, 0, t._dayOfYear), t._a[lr] = n.getUTCMonth(),
                t._a[cr] = n.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e) t._a[e] = s[e] = i[e];
            for (; 7 > e; e++) t._a[e] = s[e] = null == t._a[e] ? 2 === e ? 1 : 0 : t._a[e];
            24 === t._a[hr] && 0 === t._a[fr] && 0 === t._a[mr] && 0 === t._a[_r] && (t._nextDay = !0, t._a[hr] = 0),
                t._d = (t._useUTC ? ue : oe).apply(null, s), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
            t._nextDay && (t._a[hr] = 24);
        }
    }

    function we(t) {
        var e, n, i, r, s, a, o;
        e = t._w, null != e.GG || null != e.W || null != e.E ? (s = 1, a = 4, n = ve(e.GG, t._a[dr], he(Ge(), 1, 4).year),
            i = ve(e.W, 1), r = ve(e.E, 1)) : (s = t._locale._week.dow, a = t._locale._week.doy, n = ve(e.gg, t._a[dr], he(Ge(), s, a).year),
            i = ve(e.w, 1), null != e.d ? (r = e.d, s > r && ++i) : r = null != e.e ? e.e + s : s), o = ge(n, i, r, a, s), t._a[dr] = o.year,
            t._dayOfYear = o.dayOfYear;
    }

    function Se(t) {
        if (t._f === i.ISO_8601) return void se(t);
        t._a = [], h(t).empty = !0;
        var e, n, r, s, a, o = "" + t._i, u = o.length, d = 0;
        for (r = z(t._f, t._locale).match(Ei) || [], e = 0; e < r.length; e++) s = r[e], n = (o.match(E(s, t)) || [])[0],
        n && (a = o.substr(0, o.indexOf(n)), a.length > 0 && h(t).unusedInput.push(a), o = o.slice(o.indexOf(n) + n.length),
            d += n.length), qi[s] ? (n ? h(t).empty = !1 : h(t).unusedTokens.push(s), J(s, n, t)) : t._strict && !n && h(t).unusedTokens.push(s);
        h(t).charsLeftOver = u - d, o.length > 0 && h(t).unusedInput.push(o), h(t).bigHour === !0 && t._a[hr] <= 12 && t._a[hr] > 0 && (h(t).bigHour = void 0),
            t._a[hr] = ke(t._locale, t._a[hr], t._meridiem), Ye(t), ee(t);
    }

    function ke(t, e, n) {
        var i;
        return null == n ? e : null != t.meridiemHour ? t.meridiemHour(e, n) : null != t.isPM ? (i = t.isPM(n),
        i && 12 > e && (e += 12), i || 12 !== e || (e = 0), e) : e;
    }

    function Te(t) {
        var e, n, i, r, s;
        if (0 === t._f.length) return h(t).invalidFormat = !0, void(t._d = new Date(0 / 0));
        for (r = 0; r < t._f.length; r++) s = 0, e = _({}, t), null != t._useUTC && (e._useUTC = t._useUTC), e._f = t._f[r],
            Se(e), f(e) && (s += h(e).charsLeftOver, s += 10 * h(e).unusedTokens.length, h(e).score = s, (null == i || i > s) && (i = s,
            n = e));
        d(t, n || e);
    }

    function be(t) {
        if (!t._d) {
            var e = W(t._i);
            t._a = [e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond], Ye(t);
        }
    }

    function Oe(t) {
        var e = new y(ee(Ue(t)));
        return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e;
    }

    function Ue(t) {
        var e = t._i, n = t._f;
        return t._locale = t._locale || b(t._l), null === e || void 0 === n && "" === e ? m({
            nullInput: !0
        }) : ("string" == typeof e && (t._i = e = t._locale.preparse(e)), p(e) ? new y(ee(e)) : (s(n) ? Te(t) : n ? Se(t) : a(e) ? t._d = e : We(t),
            t));
    }

    function We(t) {
        var e = t._i;
        void 0 === e ? t._d = new Date : a(e) ? t._d = new Date(+e) : "string" == typeof e ? ae(t) : s(e) ? (t._a = o(e.slice(0), function (t) {
            return parseInt(t, 10);
        }), Ye(t)) : "object" == typeof e ? be(t) : "number" == typeof e ? t._d = new Date(e) : i.createFromInputFallback(t);
    }

    function Ce(t, e, n, i, r) {
        var s = {};
        return "boolean" == typeof n && (i = n, n = void 0), s._isAMomentObject = !0, s._useUTC = s._isUTC = r,
            s._l = n, s._i = t, s._f = e, s._strict = i, Oe(s);
    }

    function Ge(t, e, n, i) {
        return Ce(t, e, n, i, !1);
    }

    function Fe(t, e) {
        var n, i;
        if (1 === e.length && s(e[0]) && (e = e[0]), !e.length) return Ge();
        for (n = e[0], i = 1; i < e.length; ++i) (!e[i].isValid() || e[i][t](n)) && (n = e[i]);
        return n;
    }

    function Pe() {
        var t = [].slice.call(arguments, 0);
        return Fe("isBefore", t);
    }

    function He() {
        var t = [].slice.call(arguments, 0);
        return Fe("isAfter", t);
    }

    function Le(t) {
        var e = W(t), n = e.year || 0, i = e.quarter || 0, r = e.month || 0, s = e.week || 0, a = e.day || 0, o = e.hour || 0, u = e.minute || 0, d = e.second || 0, l = e.millisecond || 0;
        this._milliseconds = +l + 1e3 * d + 6e4 * u + 36e5 * o, this._days = +a + 7 * s, this._months = +r + 3 * i + 12 * n,
            this._data = {}, this._locale = b(), this._bubble();
    }

    function xe(t) {
        return t instanceof Le;
    }

    function Ie(t, e) {
        L(t, 0, 0, function () {
            var t = this.utcOffset(), n = "+";
            return 0 > t && (t = -t, n = "-"), n + H(~~(t / 60), 2) + e + H(~~t % 60, 2);
        });
    }

    function Ae(t) {
        var e = (t || "").match(rr) || [], n = e[e.length - 1] || [], i = (n + "").match(br) || ["-", 0, 0], r = +(60 * i[1]) + D(i[2]);
        return "+" === i[0] ? r : -r;
    }

    function ze(t, e) {
        var n, r;
        return e._isUTC ? (n = e.clone(), r = (p(t) || a(t) ? +t : +Ge(t)) - +n, n._d.setTime(+n._d + r), i.updateOffset(n, !1),
            n) : Ge(t).local();
    }

    function Ze(t) {
        return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
    }

    function je(t, e) {
        var n, r = this._offset || 0;
        return null != t ? ("string" == typeof t && (t = Ae(t)), Math.abs(t) < 16 && (t = 60 * t), !this._isUTC && e && (n = Ze(this)),
            this._offset = t, this._isUTC = !0, null != n && this.add(n, "m"), r !== t && (!e || this._changeInProgress ? sn(this, Ke(t - r, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
            i.updateOffset(this, !0), this._changeInProgress = null)), this) : this._isUTC ? r : Ze(this);
    }

    function Ee(t, e) {
        return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) : -this.utcOffset();
    }

    function Ne(t) {
        return this.utcOffset(0, t);
    }

    function Ve(t) {
        return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Ze(this), "m")),
            this;
    }

    function qe() {
        return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(Ae(this._i)),
            this;
    }

    function Je(t) {
        return t = t ? Ge(t).utcOffset() : 0, (this.utcOffset() - t) % 60 === 0;
    }

    function $e() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
    }

    function Re() {
        if ("undefined" != typeof this._isDSTShifted) return this._isDSTShifted;
        var t = {};
        if (_(t, this), t = Ue(t), t._a) {
            var e = t._isUTC ? l(t._a) : Ge(t._a);
            this._isDSTShifted = this.isValid() && v(t._a, e.toArray()) > 0;
        } else this._isDSTShifted = !1;
        return this._isDSTShifted;
    }

    function Be() {
        return !this._isUTC;
    }

    function Qe() {
        return this._isUTC;
    }

    function Xe() {
        return this._isUTC && 0 === this._offset;
    }

    function Ke(t, e) {
        var n, i, r, s = t, a = null;
        return xe(t) ? s = {
            ms: t._milliseconds,
            d: t._days,
            M: t._months
        } : "number" == typeof t ? (s = {}, e ? s[e] = t : s.milliseconds = t) : (a = Or.exec(t)) ? (n = "-" === a[1] ? -1 : 1,
            s = {
                y: 0,
                d: D(a[cr]) * n,
                h: D(a[hr]) * n,
                m: D(a[fr]) * n,
                s: D(a[mr]) * n,
                ms: D(a[_r]) * n
            }) : (a = Ur.exec(t)) ? (n = "-" === a[1] ? -1 : 1, s = {
            y: tn(a[2], n),
            M: tn(a[3], n),
            d: tn(a[4], n),
            h: tn(a[5], n),
            m: tn(a[6], n),
            s: tn(a[7], n),
            w: tn(a[8], n)
        }) : null == s ? s = {} : "object" == typeof s && ("from" in s || "to" in s) && (r = nn(Ge(s.from), Ge(s.to)),
            s = {}, s.ms = r.milliseconds, s.M = r.months), i = new Le(s), xe(t) && u(t, "_locale") && (i._locale = t._locale),
            i;
    }

    function tn(t, e) {
        var n = t && parseFloat(t.replace(",", "."));
        return (isNaN(n) ? 0 : n) * e;
    }

    function en(t, e) {
        var n = {
            milliseconds: 0,
            months: 0
        };
        return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months,
            n.milliseconds = +e - +t.clone().add(n.months, "M"), n;
    }

    function nn(t, e) {
        var n;
        return e = ze(e, t), t.isBefore(e) ? n = en(t, e) : (n = en(e, t), n.milliseconds = -n.milliseconds,
            n.months = -n.months), n;
    }

    function rn(t, e) {
        return function (n, i) {
            var r, s;
            return null === i || isNaN(+i) || (re(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period)."),
                s = n, n = i, i = s), n = "string" == typeof n ? +n : n, r = Ke(n, i), sn(this, r, t), this;
        };
    }

    function sn(t, e, n, r) {
        var s = e._milliseconds, a = e._days, o = e._months;
        r = null == r ? !0 : r, s && t._d.setTime(+t._d + s * n), a && F(t, "Date", G(t, "Date") + a * n), o && X(t, G(t, "Month") + o * n),
        r && i.updateOffset(t, a || o);
    }

    function an(t, e) {
        var n = t || Ge(), i = ze(n, this).startOf("day"), r = this.diff(i, "days", !0), s = -6 > r ? "sameElse" : -1 > r ? "lastWeek" : 0 > r ? "lastDay" : 1 > r ? "sameDay" : 2 > r ? "nextDay" : 7 > r ? "nextWeek" : "sameElse";
        return this.format(e && e[s] || this.localeData().calendar(s, this, Ge(n)));
    }

    function on() {
        return new y(this);
    }

    function un(t, e) {
        var n;
        return e = U("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = p(t) ? t : Ge(t),
        +this > +t) : (n = p(t) ? +t : +Ge(t), n < +this.clone().startOf(e));
    }

    function dn(t, e) {
        var n;
        return e = U("undefined" != typeof e ? e : "millisecond"), "millisecond" === e ? (t = p(t) ? t : Ge(t),
        +t > +this) : (n = p(t) ? +t : +Ge(t), +this.clone().endOf(e) < n);
    }

    function ln(t, e, n) {
        return this.isAfter(t, n) && this.isBefore(e, n);
    }

    function cn(t, e) {
        var n;
        return e = U(e || "millisecond"), "millisecond" === e ? (t = p(t) ? t : Ge(t), +this === +t) : (n = +Ge(t),
        +this.clone().startOf(e) <= n && n <= +this.clone().endOf(e));
    }

    function hn(t, e, n) {
        var i, r, s = ze(t, this), a = 6e4 * (s.utcOffset() - this.utcOffset());
        return e = U(e), "year" === e || "month" === e || "quarter" === e ? (r = fn(this, s), "quarter" === e ? r /= 3 : "year" === e && (r /= 12)) : (i = this - s,
            r = "second" === e ? i / 1e3 : "minute" === e ? i / 6e4 : "hour" === e ? i / 36e5 : "day" === e ? (i - a) / 864e5 : "week" === e ? (i - a) / 6048e5 : i),
            n ? r : g(r);
    }

    function fn(t, e) {
        var n, i, r = 12 * (e.year() - t.year()) + (e.month() - t.month()), s = t.clone().add(r, "months");
        return 0 > e - s ? (n = t.clone().add(r - 1, "months"), i = (e - s) / (s - n)) : (n = t.clone().add(r + 1, "months"),
            i = (e - s) / (n - s)), -(r + i);
    }

    function mn() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }

    function _n() {
        var t = this.clone().utc();
        return 0 < t.year() && t.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : A(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : A(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
    }

    function yn(t) {
        var e = A(this, t || i.defaultFormat);
        return this.localeData().postformat(e);
    }

    function pn(t, e) {
        return this.isValid() ? Ke({
            to: this,
            from: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
    }

    function gn(t) {
        return this.from(Ge(), t);
    }

    function Dn(t, e) {
        return this.isValid() ? Ke({
            from: this,
            to: t
        }).locale(this.locale()).humanize(!e) : this.localeData().invalidDate();
    }

    function vn(t) {
        return this.to(Ge(), t);
    }

    function Mn(t) {
        var e;
        return void 0 === t ? this._locale._abbr : (e = b(t), null != e && (this._locale = e), this);
    }

    function Yn() {
        return this._locale;
    }

    function wn(t) {
        switch (t = U(t)) {
            case"year":
                this.month(0);

            case"quarter":
            case"month":
                this.date(1);

            case"week":
            case"isoWeek":
            case"day":
                this.hours(0);

            case"hour":
                this.minutes(0);

            case"minute":
                this.seconds(0);

            case"second":
                this.milliseconds(0);
        }
        return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)),
            this;
    }

    function Sn(t) {
        return t = U(t), void 0 === t || "millisecond" === t ? this : this.startOf(t).add(1, "isoWeek" === t ? "week" : t).subtract(1, "ms");
    }

    function kn() {
        return +this._d - 6e4 * (this._offset || 0);
    }

    function Tn() {
        return Math.floor(+this / 1e3);
    }

    function bn() {
        return this._offset ? new Date(+this) : this._d;
    }

    function On() {
        var t = this;
        return [t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond()];
    }

    function Un() {
        var t = this;
        return {
            years: t.year(),
            months: t.month(),
            date: t.date(),
            hours: t.hours(),
            minutes: t.minutes(),
            seconds: t.seconds(),
            milliseconds: t.milliseconds()
        };
    }

    function Wn() {
        return f(this);
    }

    function Cn() {
        return d({}, h(this));
    }

    function Gn() {
        return h(this).overflow;
    }

    function Fn(t, e) {
        L(0, [t, t.length], 0, e);
    }

    function Pn(t, e, n) {
        return he(Ge([t, 11, 31 + e - n]), e, n).week;
    }

    function Hn(t) {
        var e = he(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
        return null == t ? e : this.add(t - e, "y");
    }

    function Ln(t) {
        var e = he(this, 1, 4).year;
        return null == t ? e : this.add(t - e, "y");
    }

    function xn() {
        return Pn(this.year(), 1, 4);
    }

    function In() {
        var t = this.localeData()._week;
        return Pn(this.year(), t.dow, t.doy);
    }

    function An(t) {
        return null == t ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (t - 1) + this.month() % 3);
    }

    function zn(t, e) {
        return "string" != typeof t ? t : isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t : null) : parseInt(t, 10);
    }

    function Zn(t) {
        return this._weekdays[t.day()];
    }

    function jn(t) {
        return this._weekdaysShort[t.day()];
    }

    function En(t) {
        return this._weekdaysMin[t.day()];
    }

    function Nn(t) {
        var e, n, i;
        for (this._weekdaysParse = this._weekdaysParse || [], e = 0; 7 > e; e++) if (this._weekdaysParse[e] || (n = Ge([2e3, 1]).day(e),
            i = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""),
            this._weekdaysParse[e] = new RegExp(i.replace(".", ""), "i")), this._weekdaysParse[e].test(t)) return e;
    }

    function Vn(t) {
        var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != t ? (t = zn(t, this.localeData()), this.add(t - e, "d")) : e;
    }

    function qn(t) {
        var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return null == t ? e : this.add(t - e, "d");
    }

    function Jn(t) {
        return null == t ? this.day() || 7 : this.day(this.day() % 7 ? t : t - 7);
    }

    function $n(t, e) {
        L(t, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), e);
        });
    }

    function Rn(t, e) {
        return e._meridiemParse;
    }

    function Bn(t) {
        return "p" === (t + "").toLowerCase().charAt(0);
    }

    function Qn(t, e, n) {
        return t > 11 ? n ? "pm" : "PM" : n ? "am" : "AM";
    }

    function Xn(t, e) {
        e[_r] = D(1e3 * ("0." + t));
    }

    function Kn() {
        return this._isUTC ? "UTC" : "";
    }

    function ti() {
        return this._isUTC ? "Coordinated Universal Time" : "";
    }

    function ei(t) {
        return Ge(1e3 * t);
    }

    function ni() {
        return Ge.apply(null, arguments).parseZone();
    }

    function ii(t, e, n) {
        var i = this._calendar[t];
        return "function" == typeof i ? i.call(e, n) : i;
    }

    function ri(t) {
        var e = this._longDateFormat[t], n = this._longDateFormat[t.toUpperCase()];
        return e || !n ? e : (this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function (t) {
            return t.slice(1);
        }), this._longDateFormat[t]);
    }

    function si() {
        return this._invalidDate;
    }

    function ai(t) {
        return this._ordinal.replace("%d", t);
    }

    function oi(t) {
        return t;
    }

    function ui(t, e, n, i) {
        var r = this._relativeTime[n];
        return "function" == typeof r ? r(t, e, n, i) : r.replace(/%d/i, t);
    }

    function di(t, e) {
        var n = this._relativeTime[t > 0 ? "future" : "past"];
        return "function" == typeof n ? n(e) : n.replace(/%s/i, e);
    }

    function li(t) {
        var e, n;
        for (n in t) e = t[n], "function" == typeof e ? this[n] = e : this["_" + n] = e;
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
    }

    function ci(t, e, n, i) {
        var r = b(), s = l().set(i, e);
        return r[n](s, t);
    }

    function hi(t, e, n, i, r) {
        if ("number" == typeof t && (e = t, t = void 0), t = t || "", null != e) return ci(t, e, n, r);
        var s, a = [];
        for (s = 0; i > s; s++) a[s] = ci(t, s, n, r);
        return a;
    }

    function fi(t, e) {
        return hi(t, e, "months", 12, "month");
    }

    function mi(t, e) {
        return hi(t, e, "monthsShort", 12, "month");
    }

    function _i(t, e) {
        return hi(t, e, "weekdays", 7, "day");
    }

    function yi(t, e) {
        return hi(t, e, "weekdaysShort", 7, "day");
    }

    function pi(t, e) {
        return hi(t, e, "weekdaysMin", 7, "day");
    }

    function gi() {
        var t = this._data;
        return this._milliseconds = Xr(this._milliseconds), this._days = Xr(this._days), this._months = Xr(this._months),
            t.milliseconds = Xr(t.milliseconds), t.seconds = Xr(t.seconds), t.minutes = Xr(t.minutes),
            t.hours = Xr(t.hours), t.months = Xr(t.months), t.years = Xr(t.years), this;
    }

    function Di(t, e, n, i) {
        var r = Ke(e, n);
        return t._milliseconds += i * r._milliseconds, t._days += i * r._days, t._months += i * r._months,
            t._bubble();
    }

    function vi(t, e) {
        return Di(this, t, e, 1);
    }

    function Mi(t, e) {
        return Di(this, t, e, -1);
    }

    function Yi(t) {
        return 0 > t ? Math.floor(t) : Math.ceil(t);
    }

    function wi() {
        var t, e, n, i, r, s = this._milliseconds, a = this._days, o = this._months, u = this._data;
        return s >= 0 && a >= 0 && o >= 0 || 0 >= s && 0 >= a && 0 >= o || (s += 864e5 * Yi(ki(o) + a), a = 0, o = 0), u.milliseconds = s % 1e3,
            t = g(s / 1e3), u.seconds = t % 60, e = g(t / 60), u.minutes = e % 60, n = g(e / 60), u.hours = n % 24, a += g(n / 24),
            r = g(Si(a)), o += r, a -= Yi(ki(r)), i = g(o / 12), o %= 12, u.days = a, u.months = o, u.years = i, this;
    }

    function Si(t) {
        return 4800 * t / 146097;
    }

    function ki(t) {
        return 146097 * t / 4800;
    }

    function Ti(t) {
        var e, n, i = this._milliseconds;
        if (t = U(t), "month" === t || "year" === t) return e = this._days + i / 864e5, n = this._months + Si(e),
            "month" === t ? n : n / 12;
        switch (e = this._days + Math.round(ki(this._months)), t) {
            case"week":
                return e / 7 + i / 6048e5;

            case"day":
                return e + i / 864e5;

            case"hour":
                return 24 * e + i / 36e5;

            case"minute":
                return 1440 * e + i / 6e4;

            case"second":
                return 86400 * e + i / 1e3;

            case"millisecond":
                return Math.floor(864e5 * e) + i;

            default:
                throw new Error("Unknown unit " + t);
        }
    }

    function bi() {
        return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * D(this._months / 12);
    }

    function Oi(t) {
        return function () {
            return this.as(t);
        };
    }

    function Ui(t) {
        return t = U(t), this[t + "s"]();
    }

    function Wi(t) {
        return function () {
            return this._data[t];
        };
    }

    function Ci() {
        return g(this.days() / 7);
    }

    function Gi(t, e, n, i, r) {
        return r.relativeTime(e || 1, !!n, t, i);
    }

    function Fi(t, e, n) {
        var i = Ke(t).abs(), r = ms(i.as("s")), s = ms(i.as("m")), a = ms(i.as("h")), o = ms(i.as("d")), u = ms(i.as("M")), d = ms(i.as("y")),
            l = r < _s.s && ["s", r] || 1 === s && ["m"] || s < _s.m && ["mm", s] || 1 === a && ["h"] || a < _s.h && ["hh", a] || 1 === o && ["d"] || o < _s.d && ["dd", o] || 1 === u && ["M"] || u < _s.M && ["MM", u] || 1 === d && ["y"] || ["yy", d];
        return l[2] = e, l[3] = +t > 0, l[4] = n, Gi.apply(null, l);
    }

    function Pi(t, e) {
        return void 0 === _s[t] ? !1 : void 0 === e ? _s[t] : (_s[t] = e, !0);
    }

    function Hi(t) {
        var e = this.localeData(), n = Fi(this, !t, e);
        return t && (n = e.pastFuture(+this, n)), e.postformat(n);
    }

    function Li() {
        var t, e, n, i = ys(this._milliseconds) / 1e3, r = ys(this._days), s = ys(this._months);
        t = g(i / 60), e = g(t / 60), i %= 60, t %= 60, n = g(s / 12), s %= 12;
        var a = n, o = s, u = r, d = e, l = t, c = i, h = this.asSeconds();
        return h ? (0 > h ? "-" : "") + "P" + (a ? a + "Y" : "") + (o ? o + "M" : "") + (u ? u + "D" : "") + (d || l || c ? "T" : "") + (d ? d + "H" : "") + (l ? l + "M" : "") + (c ? c + "S" : "") : "P0D";
    }

    var xi, Ii, Ai = i.momentProperties = [], zi = !1, Zi = {}, ji = {}, Ei = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Ni = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        Vi = {}, qi = {}, Ji = /\d/, $i = /\d\d/, Ri = /\d{3}/, Bi = /\d{4}/, Qi = /[+-]?\d{6}/, Xi = /\d\d?/, Ki = /\d{1,3}/, tr = /\d{1,4}/, er = /[+-]?\d{1,6}/, nr = /\d+/, ir = /[+-]?\d+/, rr = /Z|[+-]\d\d:?\d\d/gi, sr = /[+-]?\d+(\.\d{1,3})?/,
        ar = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, or = {}, ur = {}, dr = 0, lr = 1, cr = 2, hr = 3, fr = 4, mr = 5, _r = 6;
    L("M", ["MM", 2], "Mo", function () {
        return this.month() + 1;
    }), L("MMM", 0, 0, function (t) {
        return this.localeData().monthsShort(this, t);
    }), L("MMMM", 0, 0, function (t) {
        return this.localeData().months(this, t);
    }), O("month", "M"), j("M", Xi), j("MM", Xi, $i), j("MMM", ar), j("MMMM", ar), V(["M", "MM"], function (t, e) {
        e[lr] = D(t) - 1;
    }), V(["MMM", "MMMM"], function (t, e, n, i) {
        var r = n._locale.monthsParse(t, i, n._strict);
        null != r ? e[lr] = r : h(n).invalidMonth = t;
    });
    var yr = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), pr = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), gr = {};
    i.suppressDeprecationWarnings = !1;
    var Dr = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        vr = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]],
        Mr = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], Yr = /^\/?Date\((\-?\d+)/i;
    i.createFromInputFallback = ie("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function (t) {
        t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
    }), L(0, ["YY", 2], 0, function () {
        return this.year() % 100;
    }), L(0, ["YYYY", 4], 0, "year"), L(0, ["YYYYY", 5], 0, "year"), L(0, ["YYYYYY", 6, !0], 0, "year"),
        O("year", "y"), j("Y", ir), j("YY", Xi, $i), j("YYYY", tr, Bi), j("YYYYY", er, Qi), j("YYYYYY", er, Qi),
        V(["YYYYY", "YYYYYY"], dr), V("YYYY", function (t, e) {
        e[dr] = 2 === t.length ? i.parseTwoDigitYear(t) : D(t);
    }), V("YY", function (t, e) {
        e[dr] = i.parseTwoDigitYear(t);
    }), i.parseTwoDigitYear = function (t) {
        return D(t) + (D(t) > 68 ? 1900 : 2e3);
    };
    var wr = C("FullYear", !1);
    L("w", ["ww", 2], "wo", "week"), L("W", ["WW", 2], "Wo", "isoWeek"), O("week", "w"), O("isoWeek", "W"),
        j("w", Xi), j("ww", Xi, $i), j("W", Xi), j("WW", Xi, $i), q(["w", "ww", "W", "WW"], function (t, e, n, i) {
        e[i.substr(0, 1)] = D(t);
    });
    var Sr = {
        dow: 0,
        doy: 6
    };
    L("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), O("dayOfYear", "DDD"), j("DDD", Ki), j("DDDD", Ri),
        V(["DDD", "DDDD"], function (t, e, n) {
            n._dayOfYear = D(t);
        }), i.ISO_8601 = function () {
    };
    var kr = ie("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function () {
        var t = Ge.apply(null, arguments);
        return this > t ? this : t;
    }), Tr = ie("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function () {
        var t = Ge.apply(null, arguments);
        return t > this ? this : t;
    });
    Ie("Z", ":"), Ie("ZZ", ""), j("Z", rr), j("ZZ", rr), V(["Z", "ZZ"], function (t, e, n) {
        n._useUTC = !0, n._tzm = Ae(t);
    });
    var br = /([\+\-]|\d\d)/gi;
    i.updateOffset = function () {
    };
    var Or = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ur = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/;
    Ke.fn = Le.prototype;
    var Wr = rn(1, "add"), Cr = rn(-1, "subtract");
    i.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    var Gr = ie("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (t) {
        return void 0 === t ? this.localeData() : this.locale(t);
    });
    L(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100;
    }), L(0, ["GG", 2], 0, function () {
        return this.isoWeekYear() % 100;
    }), Fn("gggg", "weekYear"), Fn("ggggg", "weekYear"), Fn("GGGG", "isoWeekYear"), Fn("GGGGG", "isoWeekYear"),
        O("weekYear", "gg"), O("isoWeekYear", "GG"), j("G", ir), j("g", ir), j("GG", Xi, $i), j("gg", Xi, $i),
        j("GGGG", tr, Bi), j("gggg", tr, Bi), j("GGGGG", er, Qi), j("ggggg", er, Qi), q(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, n, i) {
        e[i.substr(0, 2)] = D(t);
    }), q(["gg", "GG"], function (t, e, n, r) {
        e[r] = i.parseTwoDigitYear(t);
    }), L("Q", 0, 0, "quarter"), O("quarter", "Q"), j("Q", Ji), V("Q", function (t, e) {
        e[lr] = 3 * (D(t) - 1);
    }), L("D", ["DD", 2], "Do", "date"), O("date", "D"), j("D", Xi), j("DD", Xi, $i), j("Do", function (t, e) {
        return t ? e._ordinalParse : e._ordinalParseLenient;
    }), V(["D", "DD"], cr), V("Do", function (t, e) {
        e[cr] = D(t.match(Xi)[0], 10);
    });
    var Fr = C("Date", !0);
    L("d", 0, "do", "day"), L("dd", 0, 0, function (t) {
        return this.localeData().weekdaysMin(this, t);
    }), L("ddd", 0, 0, function (t) {
        return this.localeData().weekdaysShort(this, t);
    }), L("dddd", 0, 0, function (t) {
        return this.localeData().weekdays(this, t);
    }), L("e", 0, 0, "weekday"), L("E", 0, 0, "isoWeekday"), O("day", "d"), O("weekday", "e"), O("isoWeekday", "E"),
        j("d", Xi), j("e", Xi), j("E", Xi), j("dd", ar), j("ddd", ar), j("dddd", ar), q(["dd", "ddd", "dddd"], function (t, e, n) {
        var i = n._locale.weekdaysParse(t);
        null != i ? e.d = i : h(n).invalidWeekday = t;
    }), q(["d", "e", "E"], function (t, e, n, i) {
        e[i] = D(t);
    });
    var Pr = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), Hr = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), Lr = "Su_Mo_Tu_We_Th_Fr_Sa".split("_");
    L("H", ["HH", 2], 0, "hour"), L("h", ["hh", 2], 0, function () {
        return this.hours() % 12 || 12;
    }), $n("a", !0), $n("A", !1), O("hour", "h"), j("a", Rn), j("A", Rn), j("H", Xi), j("h", Xi), j("HH", Xi, $i),
        j("hh", Xi, $i), V(["H", "HH"], hr), V(["a", "A"], function (t, e, n) {
        n._isPm = n._locale.isPM(t), n._meridiem = t;
    }), V(["h", "hh"], function (t, e, n) {
        e[hr] = D(t), h(n).bigHour = !0;
    });
    var xr = /[ap]\.?m?\.?/i, Ir = C("Hours", !0);
    L("m", ["mm", 2], 0, "minute"), O("minute", "m"), j("m", Xi), j("mm", Xi, $i), V(["m", "mm"], fr);
    var Ar = C("Minutes", !1);
    L("s", ["ss", 2], 0, "second"), O("second", "s"), j("s", Xi), j("ss", Xi, $i), V(["s", "ss"], mr);
    var zr = C("Seconds", !1);
    L("S", 0, 0, function () {
        return ~~(this.millisecond() / 100);
    }), L(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10);
    }), L(0, ["SSS", 3], 0, "millisecond"), L(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond();
    }), L(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond();
    }), L(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond();
    }), L(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond();
    }), L(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond();
    }), L(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond();
    }), O("millisecond", "ms"), j("S", Ki, Ji), j("SS", Ki, $i), j("SSS", Ki, Ri);
    var Zr;
    for (Zr = "SSSS"; Zr.length <= 9; Zr += "S") j(Zr, nr);
    for (Zr = "S"; Zr.length <= 9; Zr += "S") V(Zr, Xn);
    var jr = C("Milliseconds", !1);
    L("z", 0, 0, "zoneAbbr"), L("zz", 0, 0, "zoneName");
    var Er = y.prototype;
    Er.add = Wr, Er.calendar = an, Er.clone = on, Er.diff = hn, Er.endOf = Sn, Er.format = yn, Er.from = pn,
        Er.fromNow = gn, Er.to = Dn, Er.toNow = vn, Er.get = P, Er.invalidAt = Gn, Er.isAfter = un, Er.isBefore = dn,
        Er.isBetween = ln, Er.isSame = cn, Er.isValid = Wn, Er.lang = Gr, Er.locale = Mn, Er.localeData = Yn,
        Er.max = Tr, Er.min = kr, Er.parsingFlags = Cn, Er.set = P, Er.startOf = wn, Er.subtract = Cr, Er.toArray = On,
        Er.toObject = Un, Er.toDate = bn, Er.toISOString = _n, Er.toJSON = _n, Er.toString = mn, Er.unix = Tn,
        Er.valueOf = kn, Er.year = wr, Er.isLeapYear = ce, Er.weekYear = Hn, Er.isoWeekYear = Ln, Er.quarter = Er.quarters = An,
        Er.month = K, Er.daysInMonth = te, Er.week = Er.weeks = ye, Er.isoWeek = Er.isoWeeks = pe, Er.weeksInYear = In,
        Er.isoWeeksInYear = xn, Er.date = Fr, Er.day = Er.days = Vn, Er.weekday = qn, Er.isoWeekday = Jn,
        Er.dayOfYear = De, Er.hour = Er.hours = Ir, Er.minute = Er.minutes = Ar, Er.second = Er.seconds = zr,
        Er.millisecond = Er.milliseconds = jr, Er.utcOffset = je, Er.utc = Ne, Er.local = Ve, Er.parseZone = qe,
        Er.hasAlignedHourOffset = Je, Er.isDST = $e, Er.isDSTShifted = Re, Er.isLocal = Be, Er.isUtcOffset = Qe,
        Er.isUtc = Xe, Er.isUTC = Xe, Er.zoneAbbr = Kn, Er.zoneName = ti, Er.dates = ie("dates accessor is deprecated. Use date instead.", Fr),
        Er.months = ie("months accessor is deprecated. Use month instead", K), Er.years = ie("years accessor is deprecated. Use year instead", wr),
        Er.zone = ie("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", Ee);
    var Nr = Er, Vr = {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L"
    }, qr = {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A"
    }, Jr = "Invalid date", $r = "%d", Rr = /\d{1,2}/, Br = {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years"
    }, Qr = M.prototype;
    Qr._calendar = Vr, Qr.calendar = ii, Qr._longDateFormat = qr, Qr.longDateFormat = ri, Qr._invalidDate = Jr,
        Qr.invalidDate = si, Qr._ordinal = $r, Qr.ordinal = ai, Qr._ordinalParse = Rr, Qr.preparse = oi,
        Qr.postformat = oi, Qr._relativeTime = Br, Qr.relativeTime = ui, Qr.pastFuture = di, Qr.set = li,
        Qr.months = R, Qr._months = yr, Qr.monthsShort = B, Qr._monthsShort = pr, Qr.monthsParse = Q, Qr.week = fe,
        Qr._week = Sr, Qr.firstDayOfYear = _e, Qr.firstDayOfWeek = me, Qr.weekdays = Zn, Qr._weekdays = Pr,
        Qr.weekdaysMin = En, Qr._weekdaysMin = Lr, Qr.weekdaysShort = jn, Qr._weekdaysShort = Hr, Qr.weekdaysParse = Nn,
        Qr.isPM = Bn, Qr._meridiemParse = xr, Qr.meridiem = Qn, k("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (t) {
            var e = t % 10, n = 1 === D(t % 100 / 10) ? "th" : 1 === e ? "st" : 2 === e ? "nd" : 3 === e ? "rd" : "th";
            return t + n;
        }
    }), i.lang = ie("moment.lang is deprecated. Use moment.locale instead.", k), i.langData = ie("moment.langData is deprecated. Use moment.localeData instead.", b);
    var Xr = Math.abs, Kr = Oi("ms"), ts = Oi("s"), es = Oi("m"), ns = Oi("h"), is = Oi("d"), rs = Oi("w"), ss = Oi("M"), as = Oi("y"), os = Wi("milliseconds"), us = Wi("seconds"), ds = Wi("minutes"), ls = Wi("hours"), cs = Wi("days"), hs = Wi("months"), fs = Wi("years"), ms = Math.round, _s = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, ys = Math.abs, ps = Le.prototype;
    ps.abs = gi, ps.add = vi, ps.subtract = Mi, ps.as = Ti, ps.asMilliseconds = Kr, ps.asSeconds = ts,
        ps.asMinutes = es, ps.asHours = ns, ps.asDays = is, ps.asWeeks = rs, ps.asMonths = ss, ps.asYears = as,
        ps.valueOf = bi, ps._bubble = wi, ps.get = Ui, ps.milliseconds = os, ps.seconds = us, ps.minutes = ds,
        ps.hours = ls, ps.days = cs, ps.weeks = Ci, ps.months = hs, ps.years = fs, ps.humanize = Hi, ps.toISOString = Li,
        ps.toString = Li, ps.toJSON = Li, ps.locale = Mn, ps.localeData = Yn, ps.toIsoString = ie("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Li),
        ps.lang = Gr, L("X", 0, 0, "unix"), L("x", 0, 0, "valueOf"), j("x", ir), j("X", sr), V("X", function (t, e, n) {
        n._d = new Date(1e3 * parseFloat(t, 10));
    }), V("x", function (t, e, n) {
        n._d = new Date(D(t));
    }), i.version = "2.10.6", r(Ge), i.fn = Nr, i.min = Pe, i.max = He, i.utc = l, i.unix = ei, i.months = fi,
        i.isDate = a, i.locale = k, i.invalid = m, i.duration = Ke, i.isMoment = p, i.weekdays = _i, i.parseZone = ni,
        i.localeData = b, i.isDuration = xe, i.monthsShort = mi, i.weekdaysMin = pi, i.defineLocale = T,
        i.weekdaysShort = yi, i.normalizeUnits = U, i.relativeTimeThreshold = Pi;
    var gs = i;
    return gs;
});
define("biz_common/jquery.validate.js", [], function () {
    !function (t) {
        t.extend(t.fn, {
            validate: function (e) {
                if (!this.length) return void(e && e.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
                var i = t.data(this[0], "validator");
                return i ? i : (this.attr("novalidate", "novalidate"), i = new t.validator(e, this[0]), t.data(this[0], "validator", i),
                i.settings.onsubmit && (this.validateDelegate(":submit", "click", function (e) {
                    i.settings.submitHandler && (i.submitButton = e.target), t(e.target).hasClass("cancel") && (i.cancelSubmit = !0),
                    void 0 !== t(e.target).attr("formnovalidate") && (i.cancelSubmit = !0);
                }), this.submit(function (e) {
                    function r() {
                        var r;
                        return i.settings.submitHandler ? (i.submitButton && (r = t("<input type='hidden'/>").attr("name", i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),
                            i.settings.submitHandler.call(i, i.currentForm, e), i.submitButton && r.remove(), !1) : !0;
                    }

                    return i.settings.debug && e.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0,
                        !1) : r() : (i.focusInvalid(), !1);
                })), i);
            },
            valid: function () {
                if (t(this[0]).is("form")) return this.validate().form();
                var e = !0, i = t(this[0].form).validate();
                return this.each(function () {
                    e = e && i.element(this);
                }), e;
            },
            removeAttrs: function (e) {
                var i = {}, r = this;
                return t.each(e.split(/\s/), function (t, e) {
                    i[e] = r.attr(e), r.removeAttr(e);
                }), i;
            },
            rules: function (e, i) {
                var r = this[0];
                if (e) {
                    var n = t.data(r.form, "validator").settings, s = n.rules, a = t.validator.staticRules(r);
                    switch (e) {
                        case"add":
                            t.extend(a, t.validator.normalizeRule(i)), delete a.messages, s[r.name] = a, i.messages && (n.messages[r.name] = t.extend(n.messages[r.name], i.messages));
                            break;

                        case"remove":
                            if (!i) return delete s[r.name], a;
                            var o = {};
                            return t.each(i.split(/\s/), function (t, e) {
                                o[e] = a[e], delete a[e];
                            }), o;
                    }
                }
                var u = t.validator.normalizeRules(t.extend({}, t.validator.classRules(r), t.validator.attributeRules(r), t.validator.dataRules(r), t.validator.staticRules(r)), r);
                if (u.required) {
                    var l = u.required;
                    delete u.required, u = t.extend({
                        required: l
                    }, u);
                }
                return u;
            }
        }), t.extend(t.expr[":"], {
            blank: function (e) {
                return !t.trim("" + t(e).val());
            },
            filled: function (e) {
                return !!t.trim("" + t(e).val());
            },
            unchecked: function (e) {
                return !t(e).prop("checked");
            }
        }), t.validator = function (e, i) {
            this.settings = t.extend(!0, {}, t.validator.defaults, e), this.currentForm = i, this.init();
        }, t.validator.format = function (e, i) {
            return 1 === arguments.length ? function () {
                var i = t.makeArray(arguments);
                return i.unshift(e), t.validator.format.apply(this, i);
            } : (arguments.length > 2 && i.constructor !== Array && (i = t.makeArray(arguments).slice(1)),
            i.constructor !== Array && (i = [i]), t.each(i, function (t, i) {
                e = e.replace(new RegExp("\\{" + t + "\\}", "g"), function () {
                    return i;
                });
            }), e);
        }, t.extend(t.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusInvalid: !0,
                errorContainer: t([]),
                errorLabelContainer: t([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function (t) {
                    this.lastActive = t, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass),
                        this.addWrapper(this.errorsFor(t)).hide());
                },
                onfocusout: function (t) {
                    this.checkable(t) || this.element(t);
                },
                onkeyup: function (t, e) {
                    (9 !== e.which || "" !== this.elementValue(t)) && (t.name in this.submitted || t === this.lastElement) && this.element(t);
                },
                onclick: function (t) {
                    t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode);
                },
                highlight: function (e, i, r) {
                    "radio" === e.type ? this.findByName(e.name).addClass(i).removeClass(r) : t(e).addClass(i).removeClass(r);
                },
                unhighlight: function (e, i, r) {
                    "radio" === e.type ? this.findByName(e.name).removeClass(i).addClass(r) : t(e).removeClass(i).addClass(r);
                }
            },
            setDefaults: function (e) {
                t.extend(t.validator.defaults, e);
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: t.validator.format("Please enter no more than {0} characters."),
                minlength: t.validator.format("Please enter at least {0} characters."),
                rangelength: t.validator.format("Please enter a value between {0} and {1} characters long."),
                range: t.validator.format("Please enter a value between {0} and {1}."),
                max: t.validator.format("Please enter a value less than or equal to {0}."),
                min: t.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    function e(e) {
                        var i = t.data(this[0].form, "validator"), r = "on" + e.type.replace(/^validate/, "");
                        i.settings[r] && i.settings[r].call(i, this[0], e);
                    }

                    this.labelContainer = t(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || t(this.currentForm),
                        this.containers = t(this.settings.errorContainer).add(this.settings.errorLabelContainer),
                        this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {},
                        this.reset();
                    var i = this.groups = {};
                    t.each(this.settings.groups, function (e, r) {
                        "string" == typeof r && (r = r.split(/\s/)), t.each(r, function (t, r) {
                            i[r] = e;
                        });
                    });
                    var r = this.settings.rules;
                    t.each(r, function (e, i) {
                        r[e] = t.validator.normalizeRule(i);
                    }), t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", e).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", e),
                    this.settings.invalidHandler && t(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                },
                form: function () {
                    return this.checkForm(), t.extend(this.submitted, this.errorMap), this.invalid = t.extend({}, this.errorMap),
                    this.valid() || t(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(),
                        this.valid();
                },
                checkForm: function () {
                    this.prepareForm();
                    for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++) this.check(e[t]);
                    return this.valid();
                },
                element: function (e) {
                    e = this.validationTargetFor(this.clean(e)), this.lastElement = e, this.prepareElement(e),
                        this.currentElements = t(e);
                    var i = this.check(e) !== !1;
                    return i ? delete this.invalid[e.name] : this.invalid[e.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                        this.showErrors(), i;
                },
                showErrors: function (e) {
                    if (e) {
                        t.extend(this.errorMap, e), this.errorList = [];
                        for (var i in e) this.errorList.push({
                            message: e[i],
                            element: this.findByName(i)[0]
                        });
                        this.successList = t.grep(this.successList, function (t) {
                            return !(t.name in e);
                        });
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors();
                },
                resetForm: function () {
                    t.fn.resetForm && t(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null,
                        this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
                },
                numberOfInvalids: function () {
                    return this.objectLength(this.invalid);
                },
                objectLength: function (t) {
                    var e = 0;
                    for (var i in t) e++;
                    return e;
                },
                hideErrors: function () {
                    this.addWrapper(this.toHide).hide();
                },
                valid: function () {
                    return 0 === this.size();
                },
                size: function () {
                    return this.errorList.length;
                },
                focusInvalid: function () {
                    if (this.settings.focusInvalid) try {
                        t(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin");
                    } catch (e) {
                    }
                },
                findLastActive: function () {
                    var e = this.lastActive;
                    return e && 1 === t.grep(this.errorList, function (t) {
                        return t.element.name === e.name;
                    }).length && e;
                },
                elements: function () {
                    var e = this, i = {};
                    return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                        return !this.name && e.settings.debug && window.console && console.error("%o has no name assigned", this),
                            this.name in i || !e.objectLength(t(this).rules()) ? !1 : (i[this.name] = !0, !0);
                    });
                },
                clean: function (e) {
                    return t(e)[0];
                },
                errors: function () {
                    var e = this.settings.errorClass.replace(" ", ".");
                    return t(this.settings.errorElement + "." + e, this.errorContext);
                },
                reset: function () {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = t([]), this.toHide = t([]),
                        this.currentElements = t([]);
                },
                prepareForm: function () {
                    this.reset(), this.toHide = this.errors().add(this.containers);
                },
                prepareElement: function (t) {
                    this.reset(), this.toHide = this.errorsFor(t);
                },
                elementValue: function (e) {
                    var i = t(e).attr("type"), r = t(e).val();
                    return "radio" === i || "checkbox" === i ? t("input[name='" + t(e).attr("name") + "']:checked").val() : "string" == typeof r ? r.replace(/\r/g, "") : r;
                },
                check: function (e) {
                    e = this.validationTargetFor(this.clean(e));
                    var i, r = t(e).rules(), n = !1, s = this.elementValue(e);
                    for (var a in r) {
                        var o = {
                            method: a,
                            parameters: r[a]
                        };
                        try {
                            if (i = t.validator.methods[a].call(this, s, e, o.parameters), "dependency-mismatch" === i) {
                                n = !0;
                                continue;
                            }
                            if (n = !1, "pending" === i) return void(this.toHide = this.toHide.not(this.errorsFor(e)));
                            if (!i) return this.formatAndAdd(e, o), !1;
                        } catch (u) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + e.id + ", check the '" + o.method + "' method.", u),
                                u;
                        }
                    }
                    return n ? void 0 : (this.objectLength(r) && this.successList.push(e), !0);
                },
                customDataMessage: function (e, i) {
                    return t(e).data("msg-" + i.toLowerCase()) || e.attributes && t(e).attr("data-msg-" + i.toLowerCase());
                },
                customMessage: function (t, e) {
                    var i = this.settings.messages[t];
                    return i && (i.constructor === String ? i : i[e]);
                },
                findDefined: function () {
                    for (var t = 0; t < arguments.length; t++) if (void 0 !== arguments[t]) return arguments[t];
                    return void 0;
                },
                defaultMessage: function (e, i) {
                    return this.findDefined(this.customMessage(e.name, i), this.customDataMessage(e, i), !this.settings.ignoreTitle && e.title || void 0, t.validator.messages[i], "<strong>Warning: No message defined for " + e.name + "</strong>");
                },
                formatAndAdd: function (e, i) {
                    var r = this.defaultMessage(e, i.method), n = /\$?\{(\d+)\}/g;
                    "function" == typeof r ? r = r.call(this, i.parameters, e) : n.test(r) && (r = t.validator.format(r.replace(n, "{$1}"), i.parameters)),
                        this.errorList.push({
                            message: r,
                            element: e
                        }), this.errorMap[e.name] = r, this.submitted[e.name] = r;
                },
                addWrapper: function (t) {
                    return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))), t;
                },
                defaultShowErrors: function () {
                    var t, e;
                    for (t = 0; this.errorList[t]; t++) {
                        var i = this.errorList[t];
                        this.settings.highlight && this.settings.highlight.call(this, i.element, this.settings.errorClass, this.settings.validClass),
                            this.showLabel(i.element, i.message);
                    }
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success) for (t = 0; this.successList[t]; t++) this.showLabel(this.successList[t]);
                    if (this.settings.unhighlight) for (t = 0, e = this.validElements(); e[t]; t++) this.settings.unhighlight.call(this, e[t], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show();
                },
                validElements: function () {
                    return this.currentElements.not(this.invalidElements());
                },
                invalidElements: function () {
                    return t(this.errorList).map(function () {
                        return this.element;
                    });
                },
                showLabel: function (e, i) {
                    var r = this.errorsFor(e);
                    r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
                        r.html(i)) : (r = t("<" + this.settings.errorElement + ">").attr("for", this.idOrName(e)).addClass(this.settings.errorClass).html(i || ""),
                    this.settings.wrapper && (r = r.hide().show().wrap("<" + this.settings.wrapper + " class='frm_msg fail'/>").parent()),
                    this.labelContainer.append(r).length || (this.settings.errorPlacement ? this.settings.errorPlacement(r, t(e)) : r.insertAfter(e))),
                    !i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, e)),
                        this.toShow = this.toShow.add(r);
                },
                errorsFor: function (e) {
                    var i = this.idOrName(e);
                    return this.errors().filter(function () {
                        return t(this).attr("for") === i;
                    });
                },
                idOrName: function (t) {
                    return this.groups[t.name] || (this.checkable(t) ? t.name : t.id || t.name);
                },
                validationTargetFor: function (t) {
                    return this.checkable(t) && (t = this.findByName(t.name).not(this.settings.ignore)[0]),
                        t;
                },
                checkable: function (t) {
                    return /radio|checkbox/i.test(t.type);
                },
                findByName: function (e) {
                    return t(this.currentForm).find("[name='" + e + "']");
                },
                getLength: function (e, i) {
                    switch (i.nodeName.toLowerCase()) {
                        case"select":
                            return t("option:selected", i).length;

                        case"input":
                            if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length;
                    }
                    return e.length;
                },
                depend: function (t, e) {
                    return this.dependTypes[typeof t] ? this.dependTypes[typeof t](t, e) : !0;
                },
                dependTypes: {
                    "boolean": function (t) {
                        return t;
                    },
                    string: function (e, i) {
                        return !!t(e, i.form).length;
                    },
                    "function": function (t, e) {
                        return t(e);
                    }
                },
                optional: function (e) {
                    var i = this.elementValue(e);
                    return !t.validator.methods.required.call(this, i, e) && "dependency-mismatch";
                },
                startRequest: function (t) {
                    this.pending[t.name] || (this.pendingRequest++, this.pending[t.name] = !0);
                },
                stopRequest: function (e, i) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[e.name],
                        i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (t(this.currentForm).submit(),
                            this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (t(this.currentForm).triggerHandler("invalid-form", [this]),
                            this.formSubmitted = !1);
                },
                previousValue: function (e) {
                    return t.data(e, "previousValue") || t.data(e, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(e, "remote")
                    });
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function (e, i) {
                e.constructor === String ? this.classRuleSettings[e] = i : t.extend(this.classRuleSettings, e);
            },
            classRules: function (e) {
                var i = {}, r = t(e).attr("class");
                return r && t.each(r.split(" "), function () {
                    this in t.validator.classRuleSettings && t.extend(i, t.validator.classRuleSettings[this]);
                }), i;
            },
            attributeRules: function (e) {
                var i = {}, r = t(e), n = r[0].getAttribute("type");
                for (var s in t.validator.methods) {
                    var a;
                    "required" === s ? (a = r.get(0).getAttribute(s), "" === a && (a = !0), a = !!a) : a = r.attr(s), /min|max/.test(s) && (null === n || /number|range|text/.test(n)) && (a = Number(a)),
                        a ? i[s] = a : n === s && "range" !== n && (i[s] = !0);
                }
                return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength,
                    i;
            },
            dataRules: function (e) {
                var i, r, n = {}, s = t(e);
                for (i in t.validator.methods) r = s.data("rule-" + i.toLowerCase()), void 0 !== r && (n[i] = r);
                return n;
            },
            staticRules: function (e) {
                var i = {}, r = t.data(e.form, "validator");
                return r.settings.rules && (i = t.validator.normalizeRule(r.settings.rules[e.name]) || {}),
                    i;
            },
            normalizeRules: function (e, i) {
                return t.each(e, function (r, n) {
                    if (n === !1) return void delete e[r];
                    if (n.param || n.depends) {
                        var s = !0;
                        switch (typeof n.depends) {
                            case"string":
                                s = !!t(n.depends, i.form).length;
                                break;

                            case"function":
                                s = n.depends.call(i, i);
                        }
                        s ? "string" != typeof n && (e[r] = void 0 !== n.param ? n.param : !0) : delete e[r];
                    }
                }), t.each(e, function (r, n) {
                    e[r] = t.isFunction(n) ? n(i) : n;
                }), t.each(["minlength", "maxlength"], function () {
                    e[this] && (e[this] = Number(e[this]));
                }), t.each(["rangelength", "range"], function () {
                    var i;
                    e[this] && (t.isArray(e[this]) ? e[this] = [Number(e[this][0]), Number(e[this][1])] : "string" == typeof e[this] && (i = e[this].split(/[\s,]+/),
                        e[this] = [Number(i[0]), Number(i[1])]));
                }), t.validator.autoCreateRanges && (e.min && e.max && (e.range = [e.min, e.max], delete e.min,
                    delete e.max), e.minlength && e.maxlength && (e.rangelength = [e.minlength, e.maxlength],
                    delete e.minlength, delete e.maxlength)), e;
            },
            normalizeRule: function (e) {
                if ("string" == typeof e) {
                    var i = {};
                    t.each(e.split(/\s/), function () {
                        i[this] = !0;
                    }), e = i;
                }
                return e;
            },
            addMethod: function (e, i, r) {
                t.validator.methods[e] = i, t.validator.messages[e] = void 0 !== r ? r : t.validator.messages[e],
                i.length < 3 && t.validator.addClassRules(e, t.validator.normalizeRule(e));
            },
            methods: {
                required: function (e, i, r) {
                    if (!this.depend(r, i)) return "dependency-mismatch";
                    if ("select" === i.nodeName.toLowerCase()) {
                        var n = t(i).val();
                        return n && n.length > 0;
                    }
                    return this.checkable(i) ? this.getLength(e, i) > 0 : t.trim(e).length > 0;
                },
                email: function (t, e) {
                    return this.optional(e) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t);
                },
                url: function (t, e) {
                    return this.optional(e) || /^(https?|s?ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t);
                },
                date: function (t, e) {
                    return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString());
                },
                dateISO: function (t, e) {
                    return this.optional(e) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t);
                },
                number: function (t, e) {
                    return this.optional(e) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t);
                },
                digits: function (t, e) {
                    return this.optional(e) || /^\d+$/.test(t);
                },
                creditcard: function (t, e) {
                    if (this.optional(e)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(t)) return !1;
                    var i = 0, r = 0, n = !1;
                    t = t.replace(/\D/g, "");
                    for (var s = t.length - 1; s >= 0; s--) {
                        var a = t.charAt(s);
                        r = parseInt(a, 10), n && (r *= 2) > 9 && (r -= 9), i += r, n = !n;
                    }
                    return i % 10 === 0;
                },
                minlength: function (e, i, r) {
                    var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || n >= r;
                },
                maxlength: function (e, i, r) {
                    var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || r >= n;
                },
                rangelength: function (e, i, r) {
                    var n = t.isArray(e) ? e.length : this.getLength(t.trim(e), i);
                    return this.optional(i) || n >= r[0] && n <= r[1];
                },
                min: function (t, e, i) {
                    return this.optional(e) || t >= i;
                },
                max: function (t, e, i) {
                    return this.optional(e) || i >= t;
                },
                range: function (t, e, i) {
                    return this.optional(e) || t >= i[0] && t <= i[1];
                },
                equalTo: function (e, i, r) {
                    var n = t(r);
                    return this.settings.onfocusout && n.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        t(i).valid();
                    }), e === n.val();
                },
                remote: function (e, i, r) {
                    if (this.optional(i)) return "dependency-mismatch";
                    var n = this.previousValue(i);
                    if (this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), n.originalMessage = this.settings.messages[i.name].remote,
                        this.settings.messages[i.name].remote = n.message, r = "string" == typeof r && {
                        url: r
                    } || r, n.old === e) return n.valid;
                    n.old = e;
                    var s = this;
                    this.startRequest(i);
                    var a = {};
                    return a[i.name] = e, t.ajax(t.extend(!0, {
                        url: r,
                        mode: "abort",
                        port: "validate" + i.name,
                        dataType: "json",
                        data: a,
                        success: function (r) {
                            s.settings.messages[i.name].remote = n.originalMessage;
                            var a = r === !0 || "true" === r;
                            if (a) {
                                var o = s.formSubmitted;
                                s.prepareElement(i), s.formSubmitted = o, s.successList.push(i), delete s.invalid[i.name],
                                    s.showErrors();
                            } else {
                                var u = {}, l = r || s.defaultMessage(i, "remote");
                                u[i.name] = n.message = t.isFunction(l) ? l(e) : l, s.invalid[i.name] = !0, s.showErrors(u);
                            }
                            n.valid = a, s.stopRequest(i, a);
                        }
                    }, r)), "pending";
                }
            }
        }), t.format = t.validator.format;
    }(jQuery), function (t) {
        var e = {};
        if (t.ajaxPrefilter) t.ajaxPrefilter(function (t, i, r) {
            var n = t.port;
            "abort" === t.mode && (e[n] && e[n].abort(), e[n] = r);
        }); else {
            var i = t.ajax;
            t.ajax = function (r) {
                var n = ("mode" in r ? r : t.ajaxSettings).mode, s = ("port" in r ? r : t.ajaxSettings).port;
                return "abort" === n ? (e[s] && e[s].abort(), e[s] = i.apply(this, arguments), e[s]) : i.apply(this, arguments);
            };
        }
    }(jQuery), function (t) {
        t.extend(t.fn, {
            validateDelegate: function (e, i, r) {
                return this.bind(i, function (i) {
                    var n = t(i.target);
                    return n.is(e) ? r.apply(n, arguments) : void 0;
                });
            }
        });
    }(jQuery), function (t) {
        t.validator.defaults.errorClass = "frm_msg_content", t.validator.defaults.errorElement = "span",
            t.validator.defaults.errorPlacement = function (t, e) {
                e.parent().after(t);
            }, t.validator.defaults.wrapper = "p", t.validator.messages = {
            required: "必选字段",
            remote: "请修正该字段",
            email: "请输入正确格式的电子邮件",
            url: "请输入合法的网址",
            date: "请输入合法的日期",
            dateISO: "请输入合法的日期 (ISO).",
            number: "请输入合法的数字",
            digits: "只能输入整数",
            creditcard: "请输入合法的信用卡号",
            equalTo: "请再次输入相同的值",
            accept: "请输入拥有合法后缀名的字符串",
            maxlength: t.validator.format("请输入一个长度最多是 {0} 的字符串"),
            minlength: t.validator.format("请输入一个长度最少是 {0} 的字符串"),
            rangelength: t.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
            range: t.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
            max: t.validator.format("请输入一个最大为 {0} 的值"),
            min: t.validator.format("请输入一个最小为 {0} 的值")
        }, function () {
            function e(t) {
                var e, i = 0;
                "x" == t[17].toLowerCase() && (t[17] = 10);
                for (var r = 0; 17 > r; r++) i += n[r] * t[r];
                return e = i % 11, t[17] == s[e] ? !0 : !1;
            }

            function i(t) {
                var e = t.substring(6, 10), i = t.substring(10, 12), r = t.substring(12, 14), n = new Date(e, parseFloat(i) - 1, parseFloat(r));
                return (new Date).getFullYear() - parseInt(e) < 18 ? !1 : n.getFullYear() != parseFloat(e) || n.getMonth() != parseFloat(i) - 1 || n.getDate() != parseFloat(r) ? !1 : !0;
            }

            function r(r) {
                if (r = t.trim(r.replace(/ /g, "")), 15 == r.length) return !1;
                if (18 == r.length) {
                    var n = r.split("");
                    return i(r) && e(n) ? !0 : !1;
                }
                return !1;
            }

            var n = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1], s = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            t.validator.addMethod("idcard", function (t) {
                return r(t);
            }, "身份证格式不正确，或者年龄未满18周岁，请重新填写"), t.validator.addMethod("mobile", function (e) {
                return e = t.trim(e), /^1\d{10}$/.test(e);
            }, "请输入正确的手机号码"), t.validator.addMethod("telephone", function (e) {
                return e = t.trim(e), /^\d{1,4}(-\d{1,12})+$/.test(e);
            }, "请输入正确的座机号码，如020-12345678"), t.validator.addMethod("verifycode", function (e) {
                return e = t.trim(e), /^\d{6}$/.test(e);
            }, "验证码应为6位数字"), t.validator.addMethod("byteRangeLength", function (t, e, i) {
                return this.optional(e) || t.len() <= i[1] && t.len() >= i[0];
            }, "_(必须为{0}到{1}个字节之间)");
        }();
    }(jQuery);
    var t = {
        optional: function () {
            return !1;
        },
        getLength: function (t) {
            return t ? t.length : 0;
        }
    }, e = $.validator;
    return e.rules = {}, $.each(e.methods, function (i, r) {
        e.rules[i] = function (e, i) {
            return r.call(t, e, null, i);
        };
    }), e;
});
define("common/wx/tooltips.js", ["tpl/tooltips.html.js"], function (o, t, n) {
    "use strict";
    var i = {
        position: {},
        container: "",
        type: "hover",
        buttons: [],
        delay: 300,
        disabled: !1,
        reposition: !1,
        container_close: !1,
        parentClass: "",
        container_mode: "absolute"
    }, s = wx.T, e = o("tpl/tooltips.html.js"), c = "btn_disabled", p = "hover", h = "show", l = function (o) {
        if (this.options = o = $.extend(!0, {}, i, o), this.$container = $(this.options.container),
        this.$container && 0 != this.$container.length) {
            var t = this.$container.offset(), n = this.$container.height(), l = this.options.position.left || this.$container.data("x") || 0, a = n + (this.options.position.top || this.$container.data("y") || 0);
            this.options.offset = {
                left: t.left + l,
                top: t.top + a,
                left_x: l,
                top_y: a
            }, !o.content && (o.content = this.$container.data("tips") || ""), this.$dom = $(s(e, o)).appendTo("body"),
            this.options.disabled && this.$container.addClass(c);
            var d = this, f = this.options.type === p || "click" === this.options.type ? this.options.type : p;
            if (f == p) {
                var r = null;
                this.$container.hover(function () {
                    d.options.onshow && "function" == typeof d.options.onshow ? d.options.onshow.apply(d) : !d.options.disabled && d.show();
                }, function () {
                    r = window.setTimeout(function () {
                        d.hide();
                    }, d.options.delay);
                }), this.$dom.hover(function () {
                    r && window.clearTimeout(r);
                }, function () {
                    d.hide();
                });
            } else this.$container.click(function () {
                return d.options.disabled || d.options.onbeforeclick && "function" == typeof d.options.onbeforeclick && d.options.onbeforeclick.apply(d) === !1 ? void 0 : (d.$dom.data(h) ? d.options.onclose && "function" == typeof d.options.onclose ? d.options.onclose.apply(d) : d.hide() : d.options.onshow && "function" == typeof d.options.onshow ? d.options.onshow.apply(d) : d.show(),
                    !1);
            });
            d.documentClickEvent = function (o) {
                d.$dom.find(o.target).length || (d.options.onclose && "function" == typeof d.options.onclose ? d.options.onclose.apply(d, [o]) : d.hide());
            }, $(document).on("click", d.documentClickEvent), d.$dom.find(".js_popover_close").on("click", function (o) {
                return d.options.onclose && "function" == typeof d.options.onclose ? d.options.onclose.apply(d, [o]) : d.hide(),
                    !1;
            }), this.$dom.hide(), function () {
                $.each(d.$dom.find(".js_btn"), function (o, t) {
                    d.options.buttons[o].click && $(t).on("click", function () {
                        d.options.buttons[o].click.apply(d);
                    });
                });
            }();
        }
    };
    l.prototype = {
        constructor: l,
        show: function () {
            if (this.options.reposition) {
                var o = this.$container.offset(), t = o.left + this.options.offset.left_x, n = o.top + this.options.offset.top_y;
                this.$dom.css({
                    left: t,
                    top: n
                }).show();
            } else this.$dom.show();
            this.$dom.data(h, !0);
        },
        hide: function () {
            this.$dom.hide(), this.$dom.data(h, !1);
        },
        enable: function () {
            return this.options.disabled = !1, this.$container.removeClass(c), this;
        },
        disable: function () {
            return this.options.disabled = !0, this.$container.addClass(c), this;
        },
        destroy: function () {
            this.$dom.remove(), $(document).off("click", this.documentClickEvent);
        }
    }, n.exports = l;
});
define("biz_web/ui/dropdown.js", ["biz_web/widget/dropdown.css", "tpl/biz_web/ui/dropdown.html.js"], function (e) {
    "use strict";

    function t(e) {
        e.render && (e.renderHtml = "", $.each(e.data, function (t, a) {
            e.renderHtml += e.render(a);
        })), e = $.extend(!0, {}, d, e);
        var t = this;
        t.container = $(e.container), t.container.addClass(e.search ? i + " search" : i), this.isDisabled = e.disabled,
            e.disabled ? t.container.addClass("disabled") : t.container.removeClass("disabled"),
            t.opt = e, t.container.html(template.compile(n)(e)).find(".jsDropdownList").hide(),
            t.bt = t.container.find(".jsDropdownBt"), t.dropdown = t.container.find(".jsDropdownList"),
            $.each(e.data, function (e, a) {
                $.data(t.dropdown.find(".jsDropdownItem")[e], "value", a.value), $.data(t.dropdown.find(".jsDropdownItem")[e], "name", a.name),
                    $.data(t.dropdown.find(".jsDropdownItem")[e], "item", a);
            }), "undefined" != typeof e.index && 0 !== e.data.length && (t.bt.find(".jsBtLabel").html(e.data[e.index].name || e.label),
            t.value = e.data[e.index].value), t.bt.on("click", function () {
            return a(), e.disabled || (t.dropdown.show(), t.container.addClass("open")), !1;
        }), e.search && t.bt.find(".jsBtLabel").on("keyup", function (e) {
            if (!t.disabled) {
                var a = $(this);
                if (13 == e.keyCode) t.value ? (a.html(a.data("name")).removeClass("error"), t.dropdown.hide()) : a.find("div").remove(); else {
                    var n = a.html().trim(), d = [];
                    t.value = null, t.dropdown.show().find(".jsDropdownItem").each(function () {
                        var e = $(this);
                        e.hasClass("js_empty") || (e.data("name").indexOf(n) > -1 ? (e.parent().show(), d.push({
                            name: e.data("name"),
                            value: e.data("value")
                        })) : e.parent().hide());
                    }), 0 == d.length ? 0 == t.dropdown.find(".js_empty").length && t.dropdown.append('<li class="jsDropdownItem js_empty empty">未找到"' + n + '"</li>') : (t.dropdown.find(".js_empty").remove(),
                    1 == d.length && (d[0].name == n ? a.removeClass("error") : a.data("name", d[0].name), t.value = d[0].value));
                }
            }
        }).on("blur", function () {
            if (!t.disabled) {
                var a = $(this);
                t.value ? $(this).html() != $(this).data("name") && (a.addClass("error"), t.value = null) : "" != a.html() ? a.addClass("error") : (a.html(e.label).removeClass("error"),
                    t.value = null);
            }
        }).on("focus", function () {
            if (!t.disabled) {
                var a = $(this), n = $(this).html().trim();
                n == e.label && a.html("").removeClass("error"), "" == n && a.removeClass("error"), t.dropdown.show(),
                    t.container.addClass("open");
            }
        }), $(document).on("click", a), t.dropdown.on("click", ".jsDropdownItem", function () {
            if ("disabled" == $(this).attr("disabled")) return !1;
            var a = $(this).data("value"), n = $(this).data("name"), d = $(this).data("index"), i = $(this).parents(".jsDropdownList").siblings(".jsDropdownBt").find(".jsBtLabel").attr("data-value");
            if ((!t.value || t.value && t.value != a) && (t.value = a, t.name = n, e.callback && "function" == typeof e.callback)) {
                var o = e.callback(a, n, d, $(this).data("item"), i) || n, s = $(this).data("value");
                e.search ? t.bt.find(".jsBtLabel").html(o).data("name", o).removeClass("error") : t.bt.find(".jsBtLabel").attr("data-value", s).html(o);
            }
            t.dropdown.hide();
        });
    }

    function a() {
        $(".jsDropdownList").hide(), $(".dropdown_menu").each(function () {
            !$(this).hasClass("dropdown_checkbox") && $(this).removeClass("open");
        });
    }

    e("biz_web/widget/dropdown.css");
    var n = e("tpl/biz_web/ui/dropdown.html.js"), d = {
        label: "请选择",
        data: [],
        callback: $.noop,
        render: $.noop,
        delay: 500,
        disabled: !1,
        search: !1
    }, i = "dropdown_menu";
    return t.prototype = {
        selected: function (e, t) {
            var a = this;
            if ("number" == typeof e) {
                if (this.opt.data && this.opt.data[e]) {
                    var n = this.opt.data[e].name, d = this.opt.data[e].value;
                    0 == t || this.dropdown.find(".jsDropdownItem:eq(" + e + ")").trigger("click", d), this.bt.find(".jsBtLabel").html(n);
                }
            } else $.each(this.opt.data, function (n, i) {
                return e == i.value || e == i.name ? (0 == t || a.dropdown.find(".jsDropdownItem:eq(" + n + ")").trigger("click", d),
                    a.bt.find(".jsBtLabel").html(i.name), !1) : void 0;
            });
            return this;
        },
        reset: function () {
            return this.bt.find(".jsBtLabel").html(this.opt.label), this.value = null, this;
        },
        hidegreater: function (e) {
            var t = this;
            return "number" == typeof e && t.opt.data && t.opt.data[e] && (t.dropdown.find(".jsDropdownItem").show(),
                t.dropdown.find(".jsDropdownItem:gt(" + e + ")").hide()), this;
        },
        destroy: function () {
            return this.isDisabled && this.container.removeClass("disabled"), this.container.children().remove(),
                this.container.off(), this;
        },
        enable: function () {
            return this.opt.disabled = !1, this.container.removeClass("disabled"), this.opt.search && this.bt.find(".jsBtLabel").attr("contenteditable", !0),
                this;
        },
        disable: function () {
            return this.opt.disabled = !0, this.container.addClass("disabled"), this.opt.search && this.bt.find(".jsBtLabel").attr("contenteditable", !1),
                this;
        }
    }, t;
});
define("common/wx/Step.js", ["widget/processor_bar.css", "tpl/step.html.js"], function (e, t, s) {
    "use strict";

    function n(e) {
        this.opts = $.extend(!0, {}, i, e), this.init();
    }

    var r = wx.T, o = (e("widget/processor_bar.css"), e("tpl/step.html.js")), i = {
        selected: 1
    }, p = function () {
        var e = navigator.userAgent.toLowerCase(), t = /(msie) ([\w.]+)/.exec(e) || [], s = t[1] || "";
        return "msie" == s;
    };
    n.prototype.init = function () {
        var e, t, s = this.opts, i = s.names.length, a = parseInt(s.selected, 10), c = [];
        for (a = 0 > a ? 0 : a > i ? i : a, e = 0; i > e; e++) t = n.getClass(e + 1, a), c.push({
            name: s.names[e],
            cls: t
        });
        this.$dom = $(r(o, {
            stepArr: c,
            length: i
        })).appendTo(s.container), p() && this.$dom.addClass("ie");
    }, n.prototype.setStep = n.prototype.go = function (e) {
        var t = this.$dom.find("li.weui-desktop-step"), s = t.length;
        return e = 0 > e ? 0 : e > s ? s : e, t.each(function (t, s) {
            s.className = t + 1 == e ? "weui-desktop-step current " : "weui-desktop-step";
        }), this;
    }, n.getClass = function (e, t) {
        var s;
        return t - 1 > e ? s = "pprev" : e === t - 1 ? s = "prev" : e === t ? s = "current" : e === t + 1 ? s = "next" : e > t + 1 && (s = "nnext"),
            s;
    }, s.exports = n;
});
define("common/wx/inputCounter.js", [], function (t, n, e) {
    "use strict";

    function o(t, n) {
        this.$input = $(t), this.opts = $.extend(!0, {}, i, n), this._init();
    }

    var i = {
        minLength: 0,
        maxLength: 20,
        showCounter: !0,
        useGBKLength: !1,
        GBKBased: !1
    };
    o.prototype._init = function () {
        var t = this;
        t.$input && t.$input.length > 0 ? (t.$inputBox = t.$input.parent("textarea" == t.$input.prop("tagName").toLowerCase() ? ".frm_textarea_box" : ".frm_input_box"),
            t.count = t._getLen(t.getValue()), t.$counter = t.$inputBox.find(".frm_counter"), t.counterExist = !0,
        0 == t.$counter.length && (t.counterExist = !1, t.$counter = $('<em class="frm_input_append frm_counter"></em>'),
            t.$inputBox.append(t.$counter)), 1 == t.opts.showCounter ? t.show() : t.hide(), t.setCount(t.count),
            t.inputEvent = function () {
                t.setCount(t._getLen(t.getValue()));
            }, t.$input.on("keydown keyup", t.inputEvent)) : console.log("inputCounter Err: input does not exist.");
    }, o.prototype.getValue = function () {
        var t = "";
        switch (this.$input.prop("tagName")) {
            case"INPUT":
            case"TEXTAREA":
                t = this.$input.val();
                break;

            default:
                t = this.$input.text();
        }
        return t;
    }, o.prototype._getLen = function (t) {
        var n = 0;
        return t = t || "", n = this.opts.useGBKLength ? t.replace(/[^\x00-\xff]/g, "**").length : t.length,
        this.opts.GBKBased && (n = Math.ceil(n / 2)), n;
    }, o.prototype.getCount = function () {
        return this.count || 0;
    }, o.prototype.setCount = function (t) {
        this.count = t, this.$counter.html(this.count + "&#47;" + this.opts.maxLength), this.count > this.opts.maxLength ? (this.overflowed = !0,
            this.$inputBox.addClass("warn")) : this.count > 0 && this.count < this.opts.minLength ? (this.overflowed = !0,
            this.$inputBox.addClass("warn")) : (this.overflowed = !1, this.$inputBox.removeClass("warn"));
    }, o.prototype.hasOverflowed = function () {
        return this.overflowed;
    }, o.prototype.show = function () {
        this.$inputBox.addClass("with_counter counter_in append count"), this.$counter.show();
    }, o.prototype.hide = function () {
        this.$inputBox.removeClass("with_counter counter_in append count warn"), this.$counter.hide();
    }, o.prototype.destroy = function () {
        this.$input.off("keydown keyup", this.inputEvent), 0 == this.counterExist && (this.hide(),
            this.$counter.remove());
    }, e.exports = o;
});
define("biz_web/ui/checkbox.js", ["tpl/biz_web/ui/checkbox.html.js"], function (t) {
    "use strict";

    function e(t) {
        var e = $(t);
        e.each(function () {
            var t = $(this), e = t.prop("checked"), n = t.parent();
            e ? n.addClass("selected") : n.removeClass("selected");
        });
    }

    function n(t) {
        var e = $(t);
        e.each(function () {
            var t = $(this).prop("disabled"), e = $(this).parent();
            t ? e.addClass("disabled") : e.removeClass("disabled");
        });
    }

    function i() {
        return "checkbox" + s++;
    }

    var a = {
        container: null,
        label: "",
        name: "",
        type: "checkbox"
    }, c = t("tpl/biz_web/ui/checkbox.html.js"), r = wx.T, s = 1, o = 1, p = function (t) {
        this.options = $.extend(!0, {}, a, t), this.options.index = o++, this.$container = $(this.options.container),
            this.$dom = $(r(c, this.options)).appendTo(this.$container), this.$input = this.$dom.find("input"),
            this.$input.checkbox();
    };
    return p.prototype = {
        checked: function (t) {
            return "undefined" != typeof t && (this.$input.prop("checked", t), e(this.$input)), this.$input.prop("checked");
        },
        disabled: function (t) {
            return "undefined" != typeof t && (this.$input.prop("disabled", t), n(this.$input)), this.$input.prop("disabled");
        }
    }, $.fn.checkbox = function (t) {
        var a, c, r, s, o = !1;
        "boolean" == typeof t ? a = t : $.isPlainObject(t) ? (a = t.multi, c = t.onChanged) : "string" == typeof t ? (o = !0,
            r = t, s = [].slice.call(arguments, 1)) : "undefined" == typeof t && (t = {}), "undefined" == typeof a && (a = this.is("input[type=checkbox]"));
        var p = this, d = a ? "checkbox" : "radio", h = {
            checked: function (t) {
                return p.attr("checked", t), p.prop("checked", t), e(p), p;
            },
            disabled: function (t) {
                return p.attr("disabled", t), p.prop("disabled", t), n(p), p;
            },
            value: function () {
                var t = p.eq(0);
                return t.prop("checked") ? t.val() : "";
            },
            values: function () {
                var t = [];
                return p.each(function () {
                    $(this).prop("checked") && t.push($(this).val());
                }), t;
            },
            adjust: function (t) {
                var n;
                return n = "string" == typeof t ? t.split(",") : t, n && n.length > 0 && p.each(function () {
                    var t = $(this);
                    n.indexOf(t.val()) >= 0 && (t.attr("checked", !0), e(t));
                }), this;
            },
            disable: function (t) {
                var e;
                return e = "string" == typeof t ? t.split(",") : t, e && e.length > 0 && p.each(function () {
                    var t = $(this);
                    e.indexOf(t.val()) >= 0 && (t.attr("disabled", !0), n(t));
                }), this;
            },
            setall: function (t) {
                p.each(function () {
                    var e = $(this);
                    e.attr("disabled", t ? !1 : !0), n(e);
                });
            },
            enable: function (t) {
                var e;
                return e = "string" == typeof t ? t.split(",") : t, e && e.length > 0 && p.each(function () {
                    var t = $(this);
                    e.indexOf(t.val()) >= 0 && (t.attr("disabled", !1), n(t));
                }), this;
            },
            label: function (t) {
                return t && (p.parent().find(".lbl_content").text(t), p.attr("data-label", t)), p;
            }
        };
        return o && "function" == typeof h[r] ? h[r].apply(h, s) : (this.addClass("frm_" + d).each(function () {
            var t = $(this), e = t.parent();
            if (!e.is("label")) {
                var n = t.attr("data-label") || "";
                e = $('<label class="frm_{type}_label"><i class="icon_{type}"></i></label>'.format({
                    type: d
                })).append("<span class='lbl_content'>{content}</span>".format({
                    content: n.html(!0)
                })), e.insertBefore(t).prepend(t);
            }
            if (!this.id) {
                var a = i();
                this.id = a;
            }
            e.attr("for", this.id);
        }), e(this), n(this), t && t.initOnChanged && "function" == typeof c && p.parent().find("input[type=checkbox],input[type=radio]").each(function () {
            c.call(h, $(this));
        }), this.parent().delegate("input[type=checkbox],input[type=radio]", "click", function () {
            var t = $(this), n = t.prop("checked");
            a ? (t.attr("checked", n), e(t)) : (p.attr("checked", !1), t.attr("checked", !0).prop("checked", !0),
                e(p)), "function" == typeof c && c.call(h, t);
        }).addClass("frm_" + d + "_label"), h);
    }, p;
});
define("biz_web/utils/upload.js", ["widget/upload.css", "biz_web/lib/webuploader.js", "common/wx/dialog.js", "common/wx/Tips.js", "tpl/uploader.html.js"], function (e) {
    "use strict";

    function i(e) {
        g.src = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=4&flag3=5&1=" + e;
    }

    e("widget/upload.css");
    var n = e("biz_web/lib/webuploader.js"), a = e("common/wx/dialog.js"), t = e("common/wx/Tips.js"), o = e("tpl/uploader.html.js"), r = wx.T, s = wx.path.webuploader, p = ~location.hostname.search(/^mp/) ? "https://mp.weixin.qq.com" : "", l = {
        2: {
            accept: {
                extensions: "bmp,png,jpeg,jpg,gif",
                mimeTypes: "image/bmp,image/png,image/jpeg,image/jpg,image/gif"
            },
            fileSingleSizeLimit: 5242880
        },
        3: {
            accept: {
                extensions: "mp3,wma,wav,amr",
                mimeTypes: "audio/mp3,audio/wma,audio/wav,audio/amr"
            },
            fileSingleSizeLimit: 5242880
        },
        4: {
            accept: {
                extensions: "rm,rmvb,wmv,avi,mpg,mpeg,mp4",
                mimeTypes: "video/rm,video/rmvb,video/wmv,video/avi,video/mpg,video/mpeg,video/mp4"
            },
            fileSingleSizeLimit: 20971520
        },
        5: {
            accept: {
                extensions: "pdf",
                mimeTypes: "application/pdf"
            },
            fileSingleSizeLimit: 10485760
        },
        6: {
            accept: {
                extensions: "bmp,png,jpeg,jpg,gif,pdf",
                mimeTypes: "image/bmp,image/png,image/jpeg,image/jpg,image/gif,application/pdf"
            },
            fileSingleSizeLimit: 5242880
        },
        7: {
            accept: {
                extensions: "bmp,png,jpeg,jpg,gif",
                mimeTypes: "image/bmp,image/png,image/jpeg,image/jpg,image/gif"
            },
            fileSingleSizeLimit: 5242880
        },
        8: {
            accept: {
                extensions: "bmp,png,jpeg,jpg",
                mimeTypes: "image/bmp,image/png,image/jpeg,image/jpg"
            },
            fileSingleSizeLimit: 5242880
        },
        9: {
            accept: {
                extensions: "xls",
                mimeTypes: "application/vnd.ms-excel"
            },
            fileSingleSizeLimit: 204800
        },
        10: {
            accept: {
                extensions: "xls",
                mimeTypes: "application/vnd.ms-excel"
            },
            fileSingleSizeLimit: 5242880
        },
        11: {
            accept: {
                extensions: "bmp,png,jpeg,jpg",
                mimeTypes: "image/bmp,image/png,image/jpeg,image/jpg"
            },
            fileSingleSizeLimit: 5242880
        },
        12: {
            accept: {
                extensions: "mp3,wma,wav,amr",
                mimeTypes: "audio/mp3,audio/wma,audio/wav,audio/amr"
            },
            fileSingleSizeLimit: 31457280
        },
        13: {
            accept: {
                extensions: "png,bmp,jpeg,jpg,gif",
                mimeTypes: "image/png,image/bmp,image/jpeg,image/jpg,image/gif"
            },
            fileSingleSizeLimit: 2097152
        }
    };
    l[15] = l[4];
    var m = function (e) {
        a.show({
            type: "warn",
            msg: "警告|" + e,
            mask: !0,
            buttons: [{
                text: "确定",
                click: function () {
                    this.remove();
                }
            }]
        });
    }, c = function (e) {
        var i = n.Uploader;
        0 == i.support("flash") ? m("<p>未安装或未正确配置flash插件，请检查后重试。<br><a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>到adobe去下载flash插件</a></p>") : 0 == i.support() ? m("<p>您的浏览器不支持上传</p>") : e.refresh();
    }, d = function (e) {
        e && wx.jslog({
            src: "common/wx/upload.js"
        }, null, e);
    }, u = {
        swf: s,
        auto: !0,
        pick: {
            multiple: !0
        },
        fileNumLimit: 20,
        threads: 3,
        sendAsBinary: !1,
        runtimeOrder: "html5,flash",
        compress: {
            width: 1280,
            height: 1e8,
            quality: 90,
            afterCompressSizeLimit: 2097152,
            compressSize: 0,
            resizeSize: 2097152,
            maxResolution: 6e6,
            noCompressIfLarger: !0
        },
        imageSize: !0,
        chunked: !1,
        duplicate: !0
    }, g = new Image, f = {}, h = function (e) {
        if (!e.url) throw"missing url";
        var a, s, p, m = $('<ul class="upload_file_box" style="display:none"></ul>'), g = $(e.container);
        g.on("click", function () {
            Math.random() < .1 && d(12), c(a);
        }).parent().append(m), function () {
            n && 0 == n.Uploader.support("html5") && 0 == n.Uploader.support("flash") && ((new Image).src = "/misc/jslog?level=error&id=36&content=[pageurl:" + encodeURIComponent(location.href) + ",ua:" + encodeURIComponent(window.navigator.userAgent) + "]");
        }(), e.only_cdn && (e.url += "&only_cdn=1"), s = {
            server: wx.url(e.url + "&ticket_id=" + wx.data.user_name + "&ticket=" + wx.data.ticket + "&svr_time=" + wx.data.time),
            pick: {
                id: g,
                multiple: e.multi
            },
            fileNumLimit: e.queueSizeLimit
        }, p = l[e.type] || l[2], e = $.extend(!0, {}, u, s, p, e);
        e.server;
        n && 0 == n.Uploader.support("html5") && e.compress && (e.compress.quality = 70);
        try {
            a = n.create(e);
        } catch (h) {
            if (!a) return;
        }
        return m.on("click", ".js_cancel", function () {
            var e = $(this).data("id");
            a.cancelFile(e), $(this).hide();
        }), a.on("beforeFileQueued", function (i) {
            return Math.random() < .1 && d(13), e.canContinueUpload && !e.canContinueUpload() ? !1 : !(e.onSelect && e.onSelect(null, i.id, i) === !1);
        }), a.on("fileQueued", function (e) {
            var i = {
                id: e.id,
                fileName: e.name,
                size: n.formatSize(e.size)
            };
            m.append(r(o, i)).show();
        }), a.on("fileDequeued", function () {
            Math.random() < .1 && d(14), e.onCancel && e.onCancel();
        }), a.on("uploadProgress", function (i, n) {
            var a = "#uploadItem%s".sprintf(i.id), t = m.find(a).find(".progress_bar_thumb");
            t.width("%s%".sprintf(100 * n)), 1 == n && m.find(a).find(".js_cancel").remove(), e.onProgress && e.onProgress(null, i.id, i, {
                percentage: n
            });
        }), a.on("uploadStart", function (e) {
            f[e.id] = +new Date;
        }), a.on("uploadSuccess", function (n, a, o) {
            if (Math.random() < .1 && d(16), a && a.base_resp) {
                var r = +a.base_resp.ret;
                if (0 == r) Math.random() < .1 && (d(17), f[n.id] && i(+new Date - f[n.id])); else switch (n.setStatus("invalid"),
                    r) {
                    case-18:
                    case 200018:
                        t.err("页面停留时间过久，请刷新页面后重试！");
                        break;

                    case-20:
                    case 200020:
                        t.err("无法解释该图片，请使用另一图片或截图另存");
                        break;

                    case-13:
                    case 200013:
                        t.err("上传文件过于频繁，请稍后再试");
                        break;

                    case-10:
                    case 200010:
                        t.err("上传文件过大");
                        break;

                    case-22:
                    case 200022:
                        t.err("上传音频文件不能超过60秒");
                        break;

                    case-39:
                    case 200039:
                        t.err("上传图片高度（像素）与宽度（像素）的乘积不能超过600万");
                        break;

                    case 220001:
                        t.err('"素材管理"中的存储数量已达到上限，请删除后再操作。');
                        break;

                    case 220002:
                        t.err("你的图片库已达到存储上限，请进行清理。");
                        break;

                    default:
                        t.err("上传文件发送出错，请刷新页面后重试！");
                }
            }
            e.onComplete && e.onComplete(null, n.id, n, a, {
                fileCount: o.numOfProgress + o.numOfQueue
            });
        }), a.on("uploadFinished", function (i) {
            this.reset(), m.fadeOut().html(""), f = {}, 0 == i.numOfInvalid && i.numOfSuccess > 0 && e.onAllComplete && e.onAllComplete(null, {
                errors: i.numOfCancel + i.numOfInvalid + i.numOfUploadFailed + i.numofDeleted + i.numofInterrupt,
                filesUploaded: i.numOfSuccess
            });
        }), a.on("uploadError", function () {
            Math.random() < .1 && d(15), e.onError && e.onError();
        }), a.on("error", function (i, a, o) {
            switch ("object" == typeof a && (o = a), i) {
                case"Q_EXCEED_NUM_LIMIT":
                    t.err("一次上传最多只能上传%s个文件".sprintf(a));
                    break;

                case"F_EXCEED_SIZE":
                    t.err("文件大小不能超过%s".sprintf(n.formatSize(a, "0")));
                    break;

                case"F_EXCEED_COMPRESS_SIZE":
                    t.err("图片尺寸太大，压缩后不能超过%s，请缩小图片尺寸再试".sprintf(e.compress.afterCompressSizeLimit ? e.compress.afterCompressSizeLimit / 1048576 + "M" : "2M")),
                        d(42);
                    break;

                case"Q_TYPE_DENIED":
                    t.err(e.errTypeMsg || "文件必须为以下格式：%s".sprintf(e.accept.extensions).replace(/,/g, ", "));
            }
        }), a;
    }, b = function (e) {
        return function (i) {
            return i.url = e, h(i);
        };
    }, w = function (e) {
        return function (i) {
            return wx.url(e + "&ticket_id=" + wx.data.user_name + "&ticket=" + wx.data.ticket + "&id=" + i);
        };
    };
    return {
        uploadFile: h,
        uploadBizFile: b(p + "/cgi-bin/filetransfer?action=upload_material&f=json"),
        uploadTmpFile: b(p + "/cgi-bin/filetransfer?action=preview&f=json"),
        uploadCdnFile: b(p + "/cgi-bin/filetransfer?action=upload_cdn&f=json"),
        uploadShopFile: b(p + "/merchant/goodsimage?action=uploadimage"),
        uploadShopUnsaveFile: b(p + "/merchant/goodsimage?action=uploadimage&save=0"),
        uploadVideoCdnFile: b(p + "/cgi-bin/filetransfer?action=upload_video_cdn&f=json"),
        uploadRegisterFile: b(p + "/acct/realnamesubmit?type=2&action=file_set"),
        uploadUpgradeFile: b(p + "/acct/servicetypeupgrade?type=2&action=file_set"),
        uploadPoiFile: b(p + "/misc/setlocation?action=upload"),
        mediaFile: b(p + "/cgi-bin/filetransfer?action=bizmedia"),
        uploadBbsCdnFile: b(p + "/filetransfer?action=upload_cdn&f=json"),
        uploadCdnFileFromAd: function (e) {
            return b(p + "/cgi-bin/filetransfer?action=upload_cdn_check_size&f=json&width=" + e.w + "&height=" + e.h + "&limit_size=" + e.size);
        },
        uploadImageLibFile: function (e) {
            return e.url = p + "/cgi-bin/filetransfer?action=upload_material&f=json", "undefined" != typeof e.scene && (e.url += "&scene=" + e.scene),
            1 == e.doublewrite && (e.url += "&writetype=doublewrite&groupid=" + (e.groupid || 1)), h(e);
        },
        uploadCdnFileWithCheck: function (e) {
            var i = {
                height: 0,
                width: 0,
                size: 0,
                min_height: 0,
                min_width: 0,
                min_size: 0
            };
            e = $.extend(!0, i, e);
            var n = [];
            for (var a in e) n.push(encodeURIComponent(a) + "=" + encodeURIComponent(e[a]));
            return b(p + "/cgi-bin/filetransfer?action=upload_cdn_check_range&f=json&" + n.join("&"), "tmpfile");
        },
        uploadTmpFileWithCheck: function (e) {
            var i = {
                height: 0,
                width: 0,
                size: 0,
                min_height: 0,
                min_width: 0,
                min_size: 0
            };
            e = $.extend(!0, i, e);
            var n = [];
            for (var a in e) n.push(encodeURIComponent(a) + "=" + encodeURIComponent(e[a]));
            return b(p + "/cgi-bin/filetransfer?action=preview_check_range&f=json&" + n.join("&"));
        },
        tmpFileUrl: w(p + "/cgi-bin/filetransfer?action=preview"),
        mediaFileUrl: w(p + "/cgi-bin/filetransfer?action=bizmedia"),
        multimediaFileUrl: w(p + "/cgi-bin/filetransfer?action=multimedia")
    };
});
define("common/wx/media/cropimg.js", ["common/lib/jquery.Jcrop.js", "common/wx/mpEditor/common/cropImgCgi.js", "tpl/media/dialog/image_crop.html.js"], function (o) {
    "use strict";

    function r(o) {
        var r = this;
        this.$cotainer = $(o.container), this.url = o.url, this.cropRatio = o.cropRatio || 1, this.$cotainer.html(wx.T(i, {
            url: o.url,
            tips: o.tips || ""
        })), this.$cropWrp = this.$cotainer.find(".js_crop_wrp"), this.$cropWrp.find("img").Jcrop({
            allowSelect: !1,
            createHandles: ["nw", "ne", "se", "sw"],
            aspectRatio: this.cropRatio,
            boxWidth: this.$cropWrp.width(),
            boxHeight: this.$cropWrp.height()
        }, function () {
            r._ImgCropper = this, $(".jcrop-handle", this.ui.selection).css({
                width: "7px",
                height: "7px"
            }), r._ImgCropper.setImage(r.url, function () {
                var o = r._ImgCropper.getBounds();
                r._ImgCropper.setSelect([0, 0, o[0], o[1] / r.cropRatio]);
            });
        });
    }

    o("common/lib/jquery.Jcrop.js");
    var t = o("common/wx/mpEditor/common/cropImgCgi.js"), i = o("tpl/media/dialog/image_crop.html.js");
    return r.prototype = {
        getUrl: function (o) {
            if (!this._ImgCropper) return void("function" == typeof o.onerror && o.onerror({
                retcode: -1
            }));
            var r = this._ImgCropper.tellSelect(), i = this._ImgCropper.getScaleFactor(), e = this._ImgCropper.ui.botImg.width() * i[0], p = this._ImgCropper.ui.botImg.height() * i[1];
            t.getUrl({
                imgurl: this.url,
                x1: r.x / e,
                y1: r.y / p,
                x2: r.x2 / e,
                y2: r.y2 / p,
                onerror: function (r) {
                    o.onerror(r || {});
                },
                onsuccess: function (r) {
                    o.onsuccess(r);
                }
            });
        }
    }, r;
});
define("biz_web/ui/jquery.scrollbar.js", ["biz_web/widget/jquery.scrollbar.css"], function (l) {
    "use strict";

    function e(l) {
        if (t.webkit && !l) return {
            height: 0,
            width: 0
        };
        if (!t.data.outer) {
            var e = {
                border: "none",
                "box-sizing": "content-box",
                height: "200px",
                margin: "0",
                padding: "0",
                width: "200px"
            };
            t.data.inner = $("<div>").css($.extend({}, e)), t.data.outer = $("<div>").css($.extend({
                left: "-1000px",
                overflow: "scroll",
                position: "absolute",
                top: "-1000px"
            }, e)).append(t.data.inner).appendTo("body");
        }
        return t.data.outer.scrollLeft(1e3).scrollTop(1e3), {
            height: Math.ceil(t.data.outer.offset().top - t.data.inner.offset().top || 0),
            width: Math.ceil(t.data.outer.offset().left - t.data.inner.offset().left || 0)
        };
    }

    function s() {
        var l = e(!0);
        return !(l.height || l.width);
    }

    function o(l) {
        var e = l.originalEvent;
        return e.axis && e.axis === e.HORIZONTAL_AXIS ? !1 : e.wheelDeltaX ? !1 : !0;
    }

    l("biz_web/widget/jquery.scrollbar.css");
    var r = !1, t = {
        data: {
            index: 0,
            name: "scrollbar"
        },
        macosx: /mac/i.test(navigator.platform),
        mobile: /android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
        overlay: null,
        scroll: null,
        scrolls: [],
        webkit: /webkit/i.test(navigator.userAgent) && !/edge\/\d+/i.test(navigator.userAgent)
    };
    t.scrolls.add = function (l) {
        this.remove(l).push(l);
    }, t.scrolls.remove = function (l) {
        for (; $.inArray(l, this) >= 0;) this.splice($.inArray(l, this), 1);
        return this;
    };
    var i = {
        autoScrollSize: !0,
        autoUpdate: !0,
        debug: !1,
        disableBodyScroll: !1,
        duration: 200,
        ignoreMobile: !1,
        ignoreOverlay: !1,
        scrollStep: 30,
        showArrows: !1,
        stepScrolling: !0,
        scrollx: null,
        scrolly: null,
        onDestroy: null,
        onInit: null,
        onScroll: null,
        onUpdate: null
    }, n = function (l) {
        t.scroll || (t.overlay = s(), t.scroll = e(), a(), $(window).resize(function () {
            var l = !1;
            if (t.scroll && (t.scroll.height || t.scroll.width)) {
                var s = e();
                (s.height !== t.scroll.height || s.width !== t.scroll.width) && (t.scroll = s, l = !0);
            }
            a(l);
        })), this.container = l, this.namespace = ".scrollbar_" + t.data.index++, this.options = $.extend({}, i, window.jQueryScrollbarOptions || {}),
            this.scrollTo = null, this.scrollx = {}, this.scrolly = {}, l.data(t.data.name, this), t.scrolls.add(this);
    };
    n.prototype = {
        destroy: function () {
            if (this.wrapper) {
                this.container.removeData(t.data.name), t.scrolls.remove(this);
                var l = this.container.scrollLeft(), e = this.container.scrollTop();
                this.container.insertBefore(this.wrapper).css({
                    height: "",
                    margin: "",
                    "max-height": ""
                }).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(l).scrollTop(e),
                    this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace),
                    this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace),
                    this.wrapper.remove(), $(document).add("body").off(this.namespace), $.isFunction(this.options.onDestroy) && this.options.onDestroy.apply(this, [this.container]);
            }
        },
        init: function (l) {
            var e = this, s = this.container, r = this.containerWrapper || s, i = this.namespace, n = $.extend(this.options, l || {}), c = {
                x: this.scrollx,
                y: this.scrolly
            }, a = this.wrapper, d = {
                scrollLeft: s.scrollLeft(),
                scrollTop: s.scrollTop()
            };
            if (t.mobile && n.ignoreMobile || t.overlay && n.ignoreOverlay || t.macosx && !t.webkit) return !1;
            if (a) r.css({
                height: "auto",
                "margin-bottom": -1 * t.scroll.height + "px",
                "margin-right": -1 * t.scroll.width + "px",
                "max-height": ""
            }); else {
                if (this.wrapper = a = $("<div>").addClass("scroll-wrapper").addClass(s.attr("class")).css("position", "absolute" == s.css("position") ? "absolute" : "relative").insertBefore(s).append(s),
                s.is("textarea") && (this.containerWrapper = r = $("<div>").insertBefore(s).append(s),
                    a.addClass("scroll-textarea")), r.addClass("scroll-content").css({
                    height: "auto",
                    "margin-bottom": -1 * t.scroll.height + "px",
                    "margin-right": -1 * t.scroll.width + "px",
                    "max-height": ""
                }), s.on("scroll" + i, function () {
                    $.isFunction(n.onScroll) && n.onScroll.call(e, {
                        maxScroll: c.y.maxScrollOffset,
                        scroll: s.scrollTop(),
                        size: c.y.size,
                        visible: c.y.visible
                    }, {
                        maxScroll: c.x.maxScrollOffset,
                        scroll: s.scrollLeft(),
                        size: c.x.size,
                        visible: c.x.visible
                    }), c.x.isVisible && c.x.scroll.bar.css("left", s.scrollLeft() * c.x.kx + "px"), c.y.isVisible && c.y.scroll.bar.css("top", s.scrollTop() * c.y.kx + "px");
                }), a.on("scroll" + i, function () {
                    a.scrollTop(0).scrollLeft(0);
                }), n.disableBodyScroll) {
                    var h = function (l) {
                        o(l) ? c.y.isVisible && c.y.mousewheel(l) : c.x.isVisible && c.x.mousewheel(l);
                    };
                    a.on("MozMousePixelScroll" + i, h), a.on("mousewheel" + i, h), t.mobile && a.on("touchstart" + i, function (l) {
                        var e = l.originalEvent.touches && l.originalEvent.touches[0] || l, o = {
                            pageX: e.pageX,
                            pageY: e.pageY
                        }, r = {
                            left: s.scrollLeft(),
                            top: s.scrollTop()
                        };
                        $(document).on("touchmove" + i, function (l) {
                            var e = l.originalEvent.targetTouches && l.originalEvent.targetTouches[0] || l;
                            s.scrollLeft(r.left + o.pageX - e.pageX), s.scrollTop(r.top + o.pageY - e.pageY), l.preventDefault();
                        }), $(document).on("touchend" + i, function () {
                            $(document).off(i);
                        });
                    });
                }
                $.isFunction(n.onInit) && n.onInit.apply(this, [s]);
            }
            $.each(c, function (l, r) {
                var t = null, a = 1, d = "x" === l ? "scrollLeft" : "scrollTop", h = n.scrollStep, p = function () {
                    var l = s[d]();
                    s[d](l + h), 1 == a && l + h >= u && (l = s[d]()), -1 == a && u >= l + h && (l = s[d]()), s[d]() == l && t && t();
                }, u = 0;
                r.scroll || (r.scroll = e._getScroll(n["scroll" + l]).addClass("scroll-" + l), n.showArrows && r.scroll.addClass("scroll-element_arrows_visible"),
                    r.mousewheel = function (t) {
                        if (!r.isVisible || "x" === l && o(t)) return !0;
                        if ("y" === l && !o(t)) return c.x.mousewheel(t), !0;
                        var i = -1 * t.originalEvent.wheelDelta || t.originalEvent.detail, n = r.size - r.visible - r.offset;
                        return (i > 0 && n > u || 0 > i && u > 0) && (u += i, 0 > u && (u = 0), u > n && (u = n), e.scrollTo = e.scrollTo || {},
                            e.scrollTo[d] = u, setTimeout(function () {
                            e.scrollTo && (s.stop().animate(e.scrollTo, 240, "linear", function () {
                                u = s[d]();
                            }), e.scrollTo = null);
                        }, 1)), t.preventDefault(), !1;
                    }, r.scroll.on("MozMousePixelScroll" + i, r.mousewheel).on("mousewheel" + i, r.mousewheel).on("mouseenter" + i, function () {
                    u = s[d]();
                }), r.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown" + i, function (o) {
                    if (1 != o.which) return !0;
                    a = 1;
                    var i = {
                        eventOffset: o["x" === l ? "pageX" : "pageY"],
                        maxScrollValue: r.size - r.visible - r.offset,
                        scrollbarOffset: r.scroll.bar.offset()["x" === l ? "left" : "top"],
                        scrollbarSize: r.scroll.bar["x" === l ? "outerWidth" : "outerHeight"]()
                    }, c = 0, f = 0;
                    return $(this).hasClass("scroll-arrow") ? (a = $(this).hasClass("scroll-arrow_more") ? 1 : -1,
                        h = n.scrollStep * a, u = a > 0 ? i.maxScrollValue : 0) : (a = i.eventOffset > i.scrollbarOffset + i.scrollbarSize ? 1 : i.eventOffset < i.scrollbarOffset ? -1 : 0,
                        h = Math.round(.75 * r.visible) * a, u = i.eventOffset - i.scrollbarOffset - (n.stepScrolling ? 1 == a ? i.scrollbarSize : 0 : Math.round(i.scrollbarSize / 2)),
                        u = s[d]() + u / r.kx), e.scrollTo = e.scrollTo || {}, e.scrollTo[d] = n.stepScrolling ? s[d]() + h : u,
                    n.stepScrolling && (t = function () {
                        u = s[d](), clearInterval(f), clearTimeout(c), c = 0, f = 0;
                    }, c = setTimeout(function () {
                        f = setInterval(p, 40);
                    }, n.duration + 100)), setTimeout(function () {
                        e.scrollTo && (s.animate(e.scrollTo, n.duration), e.scrollTo = null);
                    }, 1), e._handleMouseDown(t, o);
                }), r.scroll.bar.on("mousedown" + i, function (o) {
                    if (1 != o.which) return !0;
                    var t = o["x" === l ? "pageX" : "pageY"], n = s[d]();
                    return r.scroll.addClass("scroll-draggable"), $(document).on("mousemove" + i, function (e) {
                        var o = parseInt((e["x" === l ? "pageX" : "pageY"] - t) / r.kx, 10);
                        s[d](n + o);
                    }), e._handleMouseDown(function () {
                        r.scroll.removeClass("scroll-draggable"), u = s[d]();
                    }, o);
                }));
            }), $.each(c, function (l, e) {
                var s = "scroll-scroll" + l + "_visible", o = "x" == l ? c.y : c.x;
                e.scroll.removeClass(s), o.scroll.removeClass(s), r.removeClass(s);
            }), $.each(c, function (l, e) {
                $.extend(e, "x" == l ? {
                    offset: parseInt(s.css("left"), 10) || 0,
                    size: s.prop("scrollWidth"),
                    visible: a.width()
                } : {
                    offset: parseInt(s.css("top"), 10) || 0,
                    size: s.prop("scrollHeight"),
                    visible: a.height()
                });
            }), this._updateScroll("x", this.scrollx), this._updateScroll("y", this.scrolly), $.isFunction(n.onUpdate) && n.onUpdate.apply(this, [s]),
                $.each(c, function (l, e) {
                    var o = "x" === l ? "left" : "top", r = "x" === l ? "outerWidth" : "outerHeight", t = "x" === l ? "width" : "height", i = parseInt(s.css(o), 10) || 0, c = e.size, a = e.visible + i, d = e.scroll.size[r]() + (parseInt(e.scroll.size.css(o), 10) || 0);
                    n.autoScrollSize && (e.scrollbarSize = parseInt(d * a / c, 10), e.scroll.bar.css(t, e.scrollbarSize + "px")),
                        e.scrollbarSize = e.scroll.bar[r](), e.kx = (d - e.scrollbarSize) / (c - a) || 1, e.maxScrollOffset = c - a;
                }), s.scrollLeft(d.scrollLeft).scrollTop(d.scrollTop);
        },
        _getScroll: function (l) {
            var e = {
                advanced: ['<div class="scroll-element">', '<div class="scroll-element_corner"></div>', '<div class="scroll-arrow scroll-arrow_less"></div>', '<div class="scroll-arrow scroll-arrow_more"></div>', '<div class="scroll-element_outer">', '<div class="scroll-element_size"></div>', '<div class="scroll-element_inner-wrapper">', '<div class="scroll-element_inner scroll-element_track">', '<div class="scroll-element_inner-bottom"></div>', "</div>", "</div>", '<div class="scroll-bar">', '<div class="scroll-bar_body">', '<div class="scroll-bar_body-inner"></div>', "</div>", '<div class="scroll-bar_bottom"></div>', '<div class="scroll-bar_center"></div>', "</div>", "</div>", "</div>"].join(""),
                simple: ['<div class="scroll-element">', '<div class="scroll-element_outer">', '<div class="scroll-element_size"></div>', '<div class="scroll-element_track"></div>', '<div class="scroll-bar"></div>', "</div>", "</div>"].join("")
            };
            return e[l] && (l = e[l]), l || (l = e.simple), l = "string" == typeof l ? $(l).appendTo(this.wrapper) : $(l),
                $.extend(l, {
                    bar: l.find(".scroll-bar"),
                    size: l.find(".scroll-element_size"),
                    track: l.find(".scroll-element_track")
                }), l;
        },
        _handleMouseDown: function (l, e) {
            var s = this.namespace;
            return $(document).on("blur" + s, function () {
                $(document).add("body").off(s), l && l();
            }), $(document).on("dragstart" + s, function (l) {
                return l.preventDefault(), !1;
            }), $(document).on("mouseup" + s, function () {
                $(document).add("body").off(s), l && l();
            }), $("body").on("selectstart" + s, function (l) {
                return l.preventDefault(), !1;
            }), e && e.preventDefault(), !1;
        },
        _updateScroll: function (l, e) {
            var s = this.container, o = this.containerWrapper || s, r = "scroll-scroll" + l + "_visible", i = "x" === l ? this.scrolly : this.scrollx, n = parseInt(this.container.css("x" === l ? "left" : "top"), 10) || 0, c = this.wrapper, a = e.size, d = e.visible + n;
            e.isVisible = a - d > 1, e.isVisible ? (e.scroll.addClass(r), i.scroll.addClass(r), o.addClass(r)) : (e.scroll.removeClass(r),
                i.scroll.removeClass(r), o.removeClass(r)), "y" === l && o.css(s.is("textarea") || d > a ? {
                height: d + t.scroll.height + "px",
                "max-height": "none"
            } : {
                "max-height": d + t.scroll.height + "px"
            }), (e.size != s.prop("scrollWidth") || i.size != s.prop("scrollHeight") || e.visible != c.width() || i.visible != c.height() || e.offset != (parseInt(s.css("left"), 10) || 0) || i.offset != (parseInt(s.css("top"), 10) || 0)) && ($.extend(this.scrollx, {
                offset: parseInt(s.css("left"), 10) || 0,
                size: s.prop("scrollWidth"),
                visible: c.width()
            }), $.extend(this.scrolly, {
                offset: parseInt(s.css("top"), 10) || 0,
                size: this.container.prop("scrollHeight"),
                visible: c.height()
            }), this._updateScroll("x" === l ? "y" : "x", i));
        }
    };
    var c = n;
    $.fn.scrollbar = function (l, e) {
        return "string" != typeof l && (e = l, l = "init"), "undefined" == typeof e && (e = []), $.isArray(e) || (e = [e]),
            this.not("body, .scroll-wrapper").each(function () {
                var s = $(this), o = s.data(t.data.name);
                (o || "init" === l) && (o || (o = new c(s)), o[l] && o[l].apply(o, e));
            }), this;
    }, $.fn.scrollbar.options = i;
    var a = $.fn.scrollbar.updateScrollbars = function () {
        var l = 0, e = 0;
        return function (s) {
            var o, i, n, c, d, h, p;
            for (o = 0; o < t.scrolls.length; o++) c = t.scrolls[o], i = c.container, n = c.options, d = c.wrapper,
                h = c.scrollx, p = c.scrolly, (s || n.autoUpdate && d && d.is(":visible") && (i.prop("scrollWidth") != h.size || i.prop("scrollHeight") != p.size || d.width() != h.visible || d.height() != p.visible)) && (c.init(),
            r && (window.console && console.log({
                scrollHeight: i.prop("scrollHeight") + ":" + c.scrolly.size,
                scrollWidth: i.prop("scrollWidth") + ":" + c.scrollx.size,
                visibleHeight: d.height() + ":" + c.scrolly.visible,
                visibleWidth: d.width() + ":" + c.scrollx.visible
            }, !0), e++));
            r && e > 10 ? (window.console && console.log("Scroll updates exceed 10"), a = function () {
            }) : (clearTimeout(l),
                l = setTimeout(a, 300));
        };
    }();
});