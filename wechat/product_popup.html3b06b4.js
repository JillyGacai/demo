define("common/wx/media/adDialog.js", ["common/wx/popup.js", "common/wx/Cgi.js", "biz_common/moment.js", "common/wx/pagebar.js", "common/wx/Step.js", "common/wx/Tips.js", "biz_web/ui/checkbox.js", "common/wx/tooltips.js", "tpl/media/dialog/admsg_dialog.html.js", "tpl/media/admsg.html.js", "tpl/media/adtips.html.js", "tpl/media/adcpc.html.js", "tpl/media/adcpc_cat.html.js", "tpl/media/adcpc_catitem.html.js", "tpl/media/adcpc_singleitem.html.js"], function (t) {
    "use strict";
    t("common/wx/popup.js");
    var e = t("common/wx/Cgi.js"), i = t("biz_common/moment.js"), a = t("common/wx/pagebar.js"), s = t("common/wx/Step.js"), n = t("common/wx/Tips.js"), _ = (t("biz_web/ui/checkbox.js"),
            t("common/wx/tooltips.js")), d = t("tpl/media/dialog/admsg_dialog.html.js"), o = t("tpl/media/admsg.html.js"), c = t("tpl/media/adtips.html.js"), r = t("tpl/media/adcpc.html.js"), l = t("tpl/media/adcpc_cat.html.js"), p = t("tpl/media/adcpc_catitem.html.js"),
        h = t("tpl/media/adcpc_singleitem.html.js");
    template.helper("$changeTime", function (t) {
        return i.unix(t).format("YYYY年MM月DD日");
    });
    var g = function (t) {
        var e = document.createElement("div");
        return $(e).text(t), $(e).html();
    }, m = function (t) {
        this.onOK = t.onOK, this.idx = t.idx, this.cpc_edit_data = t.cpc_edit_data, this.ad = {}, this.init();
    };
    return m.prototype.init = function () {
        var t = this;
        this.data = {}, this.dialog && this.dialog.remove(), this.dialog = $(d).popup({
            title: "选择广告",
            width: 960,
            className: "admsg_dialog_wrp",
            onShow: function () {
                t.$dom = this.$dialogWrp.eq(0), t._popup = this, t._initEvent(), t.cpc_edit_data && t.cpc_edit_data.single_aids ? t._getEditAgainData() : t._getAdList(0, 10, function () {
                    t._initPagebar();
                });
            },
            onHide: function () {
                this.remove(), t.dialog = null;
            }
        });
    }, m.prototype._getAdList = function (t, i, a) {
        var s = this;
        s.$dom.find(".js_loading").show(), s.$dom.find(".js_ad_list").hide(), e.get({
            url: "/merchant/ad_seller_manager?action=get_agreetment_ad",
            data: {
                begin: t,
                count: i
            }
        }, function (t) {
            s.$dom.find(".js_loading").hide(), t && t.base_resp && 0 == t.base_resp.ret ? (s._parseCpc(t),
            s.cpc_edit_data || s._parseSponsor(t), a && a()) : n.err("系统错误");
        });
    }, m.prototype._getEditAgainData = function () {
        var t = this;
        t.$dom.find(".js_loading").show(), t.$dom.find(".js_ad_list").hide(), e.get({
            url: "/merchant/ad_seller_manager?action=get_editagain_data&category_id=" + this.cpc_edit_data.single_category_id + "&aids=" + this.cpc_edit_data.single_aids
        }, function (e) {
            t.$dom.find(".js_loading").hide(), 0 == e.base_resp.ret && (t._getEditAgainDataOK = !0,
                e.can_use_single_ad = 1, t._getEditAgainDataData = e, t._parseCpc(e)), console.log(e);
        });
    }, m.prototype._parseCpc = function (t) {
        !t.category_list || t.category_list.length < 1 || (this.category_list = t.category_list,
            this.can_use_single_ad = t.can_use_single_ad, t.ad_info_list.length > 0 && !this.cpc_edit_data ? this._renderCpc("step1") : (this.$dom.find(".js_prev").hide(),
            this._renderCpc("step2")), console.log(t.selected_single_ad_info, t.single_ad_info));
    }, m.prototype._renderCpc = function (t) {
        var e = this;
        if ("step1" == t) this.$dom.find(".js_cpc_area").show(), this.$dom.find(".js_cpc_area .js_admsg_item")[0].category_list = this.category_list; else if ("step2" == t) {
            var i = this.$dom;
            if (this.$dom.find(".js_step2_view").show(), this.ad_type = 0, this.cpc_edit_data) {
                var a = [];
                this.cpc_edit_data.category_id_list ? a = String(this.cpc_edit_data.category_id_list).split("|") : (a.push(this.cpc_edit_data.single_category_id),
                    this.ad_type = 1);
                for (var s = 0; s < this.category_list.length; s++) for (var n = 0; n < a.length; n++) a[n] == this.category_list[s].category_id && (this.category_list[s].selected = !0);
            }
            i.find(".js_adtips").html(wx.T(r, {
                category_list: this.category_list,
                ad_type: this.ad_type,
                can_use_single_ad: this.can_use_single_ad
            }));
            var d = i.find(".js_cpc_type");
            d.filter("[value=" + this.ad_type + "]").attr("checked", !0);
            var o = d.checkbox({
                type: "radio",
                onChanged: function () {
                    var t = o.values()[0];
                    e.cpc_edit_data = void 0;
                    for (var i = 0; i < e.category_list.length; i++) e.category_list[i].selected = !1;
                    e.ad_type = t, e._renderCpcCat();
                }
            });
            new _({
                container: "#js_ad_mini_ask",
                content: "仅限定商品类目指的是展示在文章内的广告卡片被限定在流量主选择的类目内",
                reposition: !0,
                type: "hover",
                position: {
                    left: -50
                },
                onshow: function () {
                    this.show();
                }
            }), this._renderCpcCat();
        }
    }, m.prototype._renderCpcCat = function () {
        var t = this.$dom, e = this, i = 0 == this.ad_type ? "checkbox" : "radio";
        t.find(".js_cpc_cat_container").html(wx.T(l, {
            category_list: this.category_list,
            ad_type: this.ad_type,
            checkbox_type: i
        })), t.find(".js_single_ad_container").hide();
        var a = 0;
        this.cpc_edit_data && this.cpc_edit_data.single_aids && (a = this.cpc_edit_data.single_aids.split("|").length),
            1 == this.ad_type ? this._changeMiniTips(!0, a) : this._changeMiniTips(!1);
        var s = t.find(".js_cat_choose_dp"), n = t.find(".js_cpc_cat_item");
        s.show();
        var _ = n.checkbox({
            type: i,
            onChanged: function () {
                var t = _.values();
                0 == e.ad_type ? e._renderCpcCatItem(t) : (e._changeMiniTips(!0, 0), e._renderCpcItemDetail(t));
            }
        });
        if (this.cpc_edit_data) {
            {
                _.values();
            }
            0 == e.ad_type ? e._renderCpcCatItem(this.cpc_edit_data.category_id_list) : e._renderCpcItemDetail(this.cpc_edit_data.single_category_id);
        }
    }, m.prototype._changeMiniTips = function (t, e) {
        t ? $(".js_dialog_mini_tips").html("已选择%s个，可选择5个".sprintf(e)).show() : $(".js_dialog_mini_tips").html("").hide();
    }, m.prototype._renderCpcItemDetail = function (t) {
        var i = this.$dom, a = this;
        i.find(".js_single_ad_container").show(), "string" == typeof t && (t = t.split("|"));
        var s = this.category_list.filter(function (e) {
            return t.indexOf(String(e.category_id)) > -1;
        });
        if ($(".js_cat_choose_list").html('<span class="js_single_category_id" data-single_category_id="' + s[0].category_id + '">' + s[0].name + "</span>"),
            $(".js_cat_choose_dp").hide(), this._getEditAgainDataOK) {
            this._getEditAgainDataOK = void 0;
            for (var n = a._getEditAgainDataData, _ = [], d = [], o = 0; o < n.selected_single_ad_info.length; o++) n.selected_single_ad_info[o].selected = !0,
                d.push(n.selected_single_ad_info[o]), _.push(n.selected_single_ad_info[o].aid);
            for (var o = 0; o < n.single_ad_info.length; o++) -1 == _.indexOf(n.single_ad_info[o].aid) && d.push(n.single_ad_info[o]);
            d = d.slice(0, 20);
            for (var o = 0; o < d.length; o++) d[o].path_encode = encodeURIComponent(d[o].path);
            i.find(".js_single_ad_container").html(wx.T(h, {
                single_ad_list: d,
                token: wx.data.t
            }));
        } else a.$dom.find(".js_single_loading").show(), a.$dom.find(".js_single_ad_container").hide(),
            e.get({
                url: "/merchant/ad_seller_manager?action=get_single_ad_list&category_id=" + s[0].category_id,
                success: function (t) {
                    a.$dom.find(".js_single_loading").hide();
                    for (var e = t.single_ad_info, s = 0; s < e.length; s++) e[s].path_encode = encodeURIComponent(e[s].path);
                    i.find(".js_single_ad_container").html(wx.T(h, {
                        single_ad_list: e,
                        token: wx.data.t
                    })).show();
                }
            });
    }, m.prototype._renderCpcCatItem = function (t) {
        var e = this.$dom;
        "string" == typeof t && (t = t.split("|"));
        var i = this.category_list.filter(function (e) {
            return t.indexOf(String(e.category_id)) > -1;
        });
        e.find(".js_cat_choose_list").html(wx.T(p, {
            sel_item: i
        })), i && 0 != i.length || e.find(".js_cat_choose_list").html('<span class="tips_global">若不限定具体商品类目则按全类目展示广告</span>');
    }, m.prototype._renderCpcItem = function () {
        console.log("render cpc_item");
    }, m.prototype._parseSponsor = function (t) {
        var e = t.ad_info_list;
        if (!(e.length < 1)) {
            for (var i = this, a = 0; a < e.length; a++) if (e[a].ad_tips = e[a].ad_tips.replace(/(\r\n|\n|\r)/gm, "<br />"),
                e[a].background = e[a].background.replace(/(\r\n|\n|\r)/gm, "<br />"), e[a].video_info && (e[a].ad_img = e[a].video_info.thumbUrl),
            e[a].ad_request.length > 0) {
                e[a].ad_request = JSON.parse(e[a].ad_request);
                for (var s = 0; s < e[a].ad_request.length; s++) e[a].ad_request[s].title = g(e[a].ad_request[s].title),
                    e[a].ad_request[s].content = g(e[a].ad_request[s].content), ("no_compete" == e[a].ad_request[s].field || "no_policy" == e[a].ad_request[s].field) && (e[a].ad_request[s].content = e[a].ad_request[s].content.split(", "));
            } else e[a].ad_request = [];
            i.total_num = t.total_num, i._initStep(), i._setStep(1), i._renderSponsor(e), i.$dom.find(".js_ad_list").show();
        }
    }, m.prototype._renderSponsor = function (t) {
        var e = this.$dom, i = e.find(".admsg_col");
        e.find(".js_step1_view").show(), i.empty();
        for (var a = 0; a < t.length; a++) {
            t[a].insert_status = t[a].idx != this.idx + 1 ? 1 : 3 == t[a].status ? 4 : 3 == t[a].ad_status || 4 == t[a].ad_status ? 2 : 0;
            var s = $(wx.T(o, t[a]));
            s[0].ad_data = t[a], i.eq(a % 2).append(s[0]);
        }
    }, m.prototype._setStep = function (t) {
        this.stepNav.setStep(t), this.$dom.find(".js_step" + (3 - t) + "_view").hide(), this.$dom.find(".js_step" + t + "_view").show();
    }, m.prototype._initStep = function () {
        this.stepNav = new s({
            container: ".js_step",
            selected: 1,
            names: ["1.选择广告", "2.广告详情"]
        });
    }, m.prototype._initPagebar = function () {
        var t = this;
        t.total_num > 10 && new a({
            container: t.$dom.find(".js_pagebar").show(),
            perPage: 10,
            first: !1,
            last: !1,
            isSimple: !0,
            totalItemsNum: t.total_num,
            callback: function (e) {
                t.ad = {};
                var i = e.currentPage;
                t._getAdList(10 * (i - 1), 10);
            }
        });
    }, m.prototype._initEvent = function () {
        var t = this, e = this.$dom;
        e.on("click", ".js_admsg_item", function () {
            $(".js_admsg_item.selected").removeClass("selected"), $(this).addClass("selected"),
                t.ad = $(this)[0].ad_data, t.ad || (t.ad = $(this)[0].category_list);
        }), e.on("click", ".js_next", function () {
            return $.isEmptyObject(t.ad) ? (n.err("请选择广告"), !1) : (t._setStep(2), void(t.ad.ad_id ? e.find(".js_adtips").html(wx.T(c, {
                ad_info: t.ad,
                title: wx.cgiData.nick_name
            })) : t._renderCpc("step2")));
        }), e.on("click", ".js_prev", function () {
            t._setStep(1);
        }), e.on("click", ".js_submit", function () {
            if (!t.ad.ad_id) if (0 == t.ad_type) {
                for (var i = e.find(".js_cpc_cat_item[checked=checked]"), a = [], s = 0; s < i.length; s++) a.push($(i[s]).attr("data-category_id"));
                if (a.length < 1) for (var i = e.find(".js_cpc_cat_item"), a = [], s = 0; s < i.length; s++) a.push($(i[s]).attr("data-category_id"));
                t.ad = {
                    ad_type: 0,
                    category_id_list: a
                };
            } else {
                var _ = e.find(".js_single_category_id").attr("data-single_category_id"), d = "", o = e.find(".js_cpc_single_item.selected");
                if (o.each(function () {
                    d += $(this).attr("data-single_aid") + "|";
                }), !d) return void n.err("请至少选择一个单品");
                d = d.substring(0, d.length - 1), t.ad = {
                    ad_type: 1,
                    single_category_id: _,
                    single_aids: d,
                    single_aids_length: o.length,
                    image_url: o.attr("data-image_url")
                };
            }
            t._popup.remove(), t.dialog = null, t.onOK && t.onOK(t.ad);
        }), e.on("click", ".js_cat_choose_del", function (t) {
            1 == $(this).parent().parent().find(".js_cat_choose_del").length ? $(this).parent().parent().html('<span class="tips_global">若不限定具体商品类目则按全类目展示广告</span>') : $(this).parent().remove();
            var i = $(t.target).attr("data-category_id");
            e.find(".js_cpc_cat_item[value=" + i + "]").checkbox("checked", !1);
        }), e.on("click", ".js_clear_all", function () {
            return $(this).parent().html('<span class="tips_global">若不限定具体商品类目则按全类目展示广告</span>'),
                e.find(".js_cpc_cat_item[checked=checked]").checkbox("checked", !1), !1;
        }), e.on("click", ".js_cat_choose_list", function (t) {
            t.target && t.target.className.indexOf("js_cat_choose_del") > -1 || (e.find(".js_cat_choose_dp").is(":hidden") ? e.find(".js_cat_choose_dp").show() : e.find(".js_cat_choose_dp").hide());
        }), e.on("click", ".js_cpc_single_item", function () {
            var i = e.find(".js_cpc_single_item.selected"), a = i.length;
            if ($(this).hasClass("selected")) $(this).removeClass("selected"), a -= 1; else {
                if (a >= 5) return void n.err("最多只能选择5个单品");
                $(this).addClass("selected"), a += 1;
            }
            t._changeMiniTips(!0, a);
        });
    }, m;
});
define("common/wx/mpEditor/plugin/filter.js", [], function () {
    "use strict";
    var t = function (t, e) {
        if (e) {
            t = $(t);
            var r = t.attr("style");
            if (r) {
                var a = "(^|;|\\b)[^;]*#attr#\\s*:[^;]*[$;]";
                "[object String]" == Object.prototype.toString.call(e) && (e = [e]);
                for (var n = 0, l = e.length; l > n; n++) {
                    var i = new RegExp(a.replace("#attr#", e[n]), "g");
                    r = r.replace(i, "$1");
                }
                t.attr("style", r);
            }
        }
    }, e = function (t) {
        var e = "(<[^<>]*?)\\sstyle=(?:(?:\"([^\"]*?)\")|(?:'([^']*?)')|([^'\"\\s=<>]*?))([\\s\\/>])", r = new RegExp(e, "g");
        return t = t.replace(r, function (t, e, r, a, n, l) {
            var i = r || a || n || "";
            if (i) {
                for (var i = i.split(";"), c = [], o = 0, s = i.length; s > o; o++) {
                    var p = i[o].replace(/^\s+/, "").replace(/\s+$/, "");
                    p && c.push(p);
                }
                return e + ' style="' + c.join(";") + ';"' + l || "";
            }
            return t;
        });
    }, r = function (t, e) {
        for (var r = "(<#tagName#[^<>]*?)\\s#attribute#=(?:(?:\"([^\"]*?)\")|(?:'([^']*?)')|([^'\"\\s=<>]*?))([\\s\\/>])", a = "$1$5", n = 0, l = e.length; l > n; n++) {
            var i = e[n], c = i[0], o = i[1], s = "";
            s = "*" === c ? r.replace("#tagName#", "") : r.replace("#tagName#", c);
            for (var p = new RegExp(s.replace("#attribute#", o), "g"); p.test(t);) t = t.replace(p, a);
        }
        return t;
    };
    return {
        formatStyle: e,
        filterStyleAttr: t,
        removeAttribute: r
    };
});
define("common/wx/media/videoDialog.js", ["common/wx/popup.js", "page/smallvideo/dialog_select_video.css", "widget/media/media_dialog.css", "common/wx/getVinfo.js", "common/wx/top.js", "common/wx/Tips.js", "common/wx/media/video.js", "common/wx/pagebar.js", "common/wx/time.js", "media/media_cgi.js", "common/wx/Cgi.js", "tpl/media/dialog/videomsg_layout.html.js", "tpl/media/videocard.html.js"], function (e) {
    "use strict";

    function i(e) {
        return e && e.substr && "04" == e.substr(1, 2) ? !0 : !1;
    }

    function t(e, i, t, o) {
        e = e.replace(/^\s+|\s+$/g, ""), e = e.replace(/^http:/, "https:"), e = e.replace(/^v\.qq\.com/, "https://v.qq.com");
        var n = t || {};
        -1 != e.indexOf("http://v.qq.com") || -1 != e.indexOf("https://v.qq.com") || -1 != e.indexOf("v.qq.com") ? d(e, i, n, o) : /mp\.weixin\.qq\.com\/s/.test(e) ? s(e, i) : /mp\.weixin\.qq\.com\/mp\/video\?/.test(e) && a(e, i);
    }

    function o(e, i) {
        var i = i || document.location.toString(), t = e + "=", o = i.indexOf(t);
        if (-1 != o) {
            var n = i.indexOf("&", o), d = i.indexOf("?", o);
            return -1 != d && (-1 == n || n > d) && (n = d), d = i.indexOf("#", o), -1 != d && (-1 == n || n > d) && (n = d), -1 == n ? i.substring(o + t.length) : i.substring(o + t.length, n);
        }
        return "";
    }

    function n(e) {
        e = e || window.location.toString();
        var i, t = o("vid", e);
        return t || (i = e.match(/\/\w{15}\/(\w+)\.html/)) && (t = i[1]), t || ((i = e.match(/\/page\/\w{1}\/\w{1}\/\w{1}\/(\w+)\.html/)) ? t = i[1] : (i = e.match(/\/(page|play)\/+(\w{11})\.html/)) ? t = i[2] : (i = e.match(/\/(page)\/(\w+)\.html/)) && (t = i[2])),
        t || (i = e.match(/\/boke\/gplay\/\w+_\w+_(\w+)\.html/)) && (t = i[1]), encodeURIComponent(t);
    }

    function d(e, i, t, o) {
        var d, s = "", a = t.width, r = t.height;
        if (d = e.match(new RegExp("(^|&|\\\\?)vid=([^&]*)(&|$|#)"))) s = encodeURIComponent(d[2]),
        -1 != s.indexOf("_") && (s = s.split("_")[0]), /[a-zA-Z0-9]{11}/.test(s) || BJ_REPORT.monitor(94, "vid:" + s + ";url=" + e, 39),
            t.vid = s, t.return_url = "https://v.qq.com/iframe/preview.html?vid=" + s + "&width=" + a + "&height=" + r + "&auto=0",
            i(t); else if ((d = e.match(new RegExp("(http://)?v\\.qq\\.com/cover[^/]*/\\w+/([^/]*)\\.html"))) || (d = e.match(new RegExp("(http://)?v\\.qq\\.com/prev[^/]*/\\w+/([^/]*)\\.html"))) || (d = e.match(/\/(\w{15})\.html/))) {
            if (d.length >= 3) var m = encodeURIComponent(d[2]); else var m = encodeURIComponent(d[1]);
            var l = "https://data.video.qq.com/fcgi-bin/data?tid=554&appid=20001184&appkey=85a707e3a07cc44d&otype=json&idlist=" + m, c = document.getElementsByTagName("head")[0], _ = document.createElement("script");
            _.type = "text/javascript", _.src = l, _.async = !0, void 0 !== _.onreadystatechange ? _.onreadystatechange = function () {
                if ("loaded" == _.readyState) try {
                    s = QZOutputJson.results[0].fields.video_ids[0], -1 != s.indexOf("_") && (s = s.split("_")[0]),
                    /[a-zA-Z0-9]{11}/.test(s) || BJ_REPORT.monitor(94, "vid:" + s + ";url=" + e, 39), t.vid = s, t.return_url = "https://v.qq.com/iframe/preview.html?vid=" + s + "&width=" + a + "&height=" + r + "&auto=0",
                        i(t);
                } catch (o) {
                }
            } : _.onload = function () {
                try {
                    s = QZOutputJson.results[0].fields.video_ids[0], -1 != s.indexOf("_") && (s = s.split("_")[0]),
                    /[a-zA-Z0-9]{11}/.test(s) || BJ_REPORT.monitor(94, "vid:" + s + ";url=" + e, 39), t.vid = s, t.return_url = "https://v.qq.com/iframe/preview.html?vid=" + s + "&width=" + a + "&height=" + r + "&auto=0",
                        i(t);
                } catch (o) {
                }
            }, c.appendChild(_);
        } else s = n(e), "" != s ? (-1 != s.indexOf("_") && (s = s.split("_")[0]), /[a-zA-Z0-9]{11}/.test(s) || BJ_REPORT.monitor(94, "vid:" + s + ";url=" + e, 39),
            t.vid = s, t.return_url = "https://v.qq.com/iframe/preview.html?vid=" + s + "&width=" + a + "&height=" + r + "&auto=0",
            i(t)) : !!o && o(-1);
    }

    function s(e, i) {
        u.get({
            url: "/cgi-bin/video_mgr?action=get_vid_list&url=" + window.encodeURIComponent(e),
            success: function (e) {
                i({
                    vid: e.vid_list
                });
            }
        });
    }

    function a(e, i) {
        var t = e.match(/[\?&]vid\=([^&]*)/);
        if (null != t && t[1]) {
            var o = t[1];
            i({
                vid: o
            });
        }
    }

    function r(e, i, t, o) {
        i.hide();
        var n = t[o], d = e.eq(o % 2), s = $("<div></div>").appendTo(d);
        s.html(wx.T(w, n)), n.err_msg && s.find(".warn").text(n.err_msg).show();
    }

    function m(e) {
        e = parseInt(e, 10);
        var i = "";
        if (60 > e) 10 > e && (e = "0" + e), i = "00:" + e; else if (e >= 60) {
            var t = Math.floor(e / 60), o = (e - 60 * t) % 60;
            10 > t && (t = "0" + t), 10 > o && (o = "0" + o), i = t + ":" + o;
        }
        return i;
    }

    e("common/wx/popup.js"), e("page/smallvideo/dialog_select_video.css"), e("widget/media/media_dialog.css");
    var l = e("common/wx/getVinfo.js"), c = e("common/wx/top.js"), _ = e("common/wx/Tips.js"), v = e("common/wx/media/video.js"), p = e("common/wx/pagebar.js"), h = e("common/wx/time.js"), f = e("media/media_cgi.js"), u = e("common/wx/Cgi.js"), g = e("tpl/media/dialog/videomsg_layout.html.js"),
        w = e("tpl/media/videocard.html.js"), j = 15, q = 21, x = 0, b = {};
    b[j] = "video_msg_cnt", b[q] = "short_video_cnt";
    var O = function (e, i) {
        var t = $.extend({}, i.multi_item ? i.multi_item[0] : i);
        t.selector = e, t.id = i.app_id, t.app_id = i.app_id, t.tpl = "videomsg", t.for_selection = 1 != t.is_new_video ? !0 : 3 == t.status,
            t.for_transfer = !!t.content, t.hide_transfer = !!t.content, t.video_id = t.content, t.source = "file",
            1 == t.is_new_video ? (t.time = i.create_time ? h.timeFormat(i.create_time) : "", t.before_original_video = i.create_time < 1453914e3 ? 1 : 0,
                e.html(wx.T(w, t))) : (t.create_time = i.create_time, t.img_url = i.img_url, new v(t)), $("#wxVideoBox" + t.id).data("opt", t);
    }, y = function (e) {
        console.log(e), this.scene = e.scene || "default", this.onOK = e.onOK, this.can_use_txvideo = e.can_use_txvideo,
            this.allowLinks = "ueditor" === e.scene || "masssend" === e.scene, this.create();
    }, T = {
        create: function () {
            var e = this, t = $.parseHTML(wx.T(g, {
                scene: e.scene,
                token: wx.data.t
            }));
            e.dialog && e.dialog.popup("remove"), e.dialog = $(t[0]).popup({
                title: "选择视频",
                className: "dialog_select_video",
                width: 960,
                onOK: function () {
                    var t = this, o = e.$dom.find(".js_top.selected").data("id"), n = e.$dom.find(".Js_videomsg.selected").data("opt") || e.$dom.find(".Js_videomsg.selected").parent().data("opt"), d = e.$dom.find(".js_video_url").val();
                    if (o && n && 1 == n.is_new_video && 3 != n.status) return _.err("该视频目前无法被选择，请选择其它视频"), !0;
                    if (o && n && 0 == n.is_new_video && (0 != n.is_new_video || !n.content_url)) return _.err("该视频转码未完成，请选择其它视频"),
                        !0;
                    if (o) {
                        if (!n) return _.err("请选择视频"), !0;
                        if (e.onOK && !e.onOK(o, n)) return !0;
                        t.remove(), e.dialog = null;
                    } else {
                        if (o = 15, !d) return _.err("请输入视频网址"), !0;
                        if (!/v\.qq\.com/.test(d.replace("http://", "").replace("https://", "")) && !/mp\.weixin\.qq\.com\/s/.test(d) && !/mp\.weixin\.qq\.com\/mp\/video\?/.test(d)) return _.err("只支持已发布的微信公众号链接、视频详情页链接和腾讯视频链接"),
                            !0;
                        var s = e.$dom.find(".js_video_search").find(".Js_videomsg.selected"), a = s.data("vid");
                        if (!a) return _.err("请选择视频"), !0;
                        if (0 == d.indexOf("http://v.qq.com/") || 0 == d.indexOf("https://v.qq.com/")) {
                            if (i(a)) return _.err("该链接为腾讯微博视频网址，此处引用视频只支持已发布的微信公众号链接、视频详情链接或者腾讯视频链接"), !1;
                            e.onOK && e.onOK(o, {
                                align: "none",
                                height: 375,
                                width: 500,
                                vid: a,
                                subtype: 0,
                                url: "https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid=" + a,
                                title: s.data("title"),
                                duration: s.data("duration"),
                                cover: s.data("cover"),
                                video_id: a,
                                content: a
                            });
                        } else e.onOK && e.onOK(o, {
                            align: "none",
                            height: 375,
                            width: 500,
                            vid: a,
                            subtype: /mp\.weixin\.qq\.com\/mp\/video\?/.test(d) ? 1 : 2,
                            url: "https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid=" + a,
                            title: s.data("title"),
                            duration: s.data("duration"),
                            cover: s.data("cover"),
                            video_id: a,
                            content: a
                        }), t.remove(), e.dialog = null;
                    }
                },
                onCancel: function () {
                    this.remove(), e.dialog = null;
                },
                onHide: function () {
                    this.remove(), e.dialog = null;
                }
            }), e.$dom = e.dialog.popup("get"), e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"),
                e.init(), e.dialog.popup("resetPosition");
        },
        init: function () {
            var e = this, i = [];
            e.allowLinks && (i.unshift({
                name: "视频链接"
            }), e.initVideoUrl(), e.$dom.find(".js_video_search").hide()), "ueditor" == e.scene ? x = 1 : (i.unshift({
                name: "素材库",
                id: j
            }), e.getList(j, 0, 10)), "ueditor" == e.scene && 1 == e.can_use_txvideo ? (i.unshift({
                name: "素材库",
                id: j
            }), e.getList(j, 0, 10)) : $(".js_video_status").find(".frm_tips").html("只支持已发布的微信公众号链接、视频详情页链接和腾讯视频链接"),
                e.tab = new c(e.$dom.find(".js_videotab"), i), e.tab.selected(0), e.tab.dom.find("a").on("click", function (e) {
                e.preventDefault();
            }), e.$dom.on("click", ".js_top", function () {
                var i = $(this).data("id");
                e.$dom.find(".js_video_status").hide(), e.$dom.find(".js_video_create").hide(), e.$dom.find(".js_pagebar").empty(),
                    e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"), i ? (i == j && e.$dom.find(".js_video_create").show(),
                    e.getList(i, 0, 10)) : e.$dom.find(".js_video_search").show(), e.tab.selected($(this).data("index"));
            }), e.$dom.on("click", ".Js_videomsg", function () {
                $(this).data("errmsg") ? _.err("无法选择该视频") : (e.$dom.find(".Js_videomsg.selected").removeClass("selected"),
                    e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"), $(this).addClass("selected"));
            }), e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"), e.$dom.on("mousewheel", "#js_videomsg_list, #js_video_search_list", function (e) {
                this.scrollTop -= e.originalEvent.wheelDelta > 0 ? 60 : -60, e.preventDefault();
            }).on("DOMMouseScroll", "#js_videomsg_list, #js_video_search_list", function (e) {
                this.scrollTop += e.originalEvent.detail > 0 ? 60 : -60, e.preventDefault();
            });
        },
        initVideoUrl: function () {
            var e = this, i = e.$dom.find(".js_video_loading").hide();
            e.$dom.find(".js_video_search").show();
            var o = null;
            e.$dom.find(".js_video_url").on("input propertychange", function () {
                i.show(), e.$dom.find(".js_video_url_tip").hide();
                var n = $(this).val(), d = e.$dom.find("#js_video_search_list").find(".inner").empty();
                n ? (clearTimeout(o), o = setTimeout(function () {
                    return -1 == n.indexOf("v.qq.com/") && !/mp\.weixin\.qq\.com\/s/.test(n) && !/mp\.weixin\.qq\.com\/mp\/video\?/.test(n) || -1 != n.indexOf("v.qq.com/") && /(.+)\.v\.qq\.com/.test(n) ? (i.hide(),
                        e.$dom.find(".js_video_url_tip").show(), !0) : void clearTimeout(o);
                }, 1e3), i.show(), e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"), t(n, function (t) {
                    var o = t.vid, n = {
                        title: "",
                        cover: "",
                        duration: "",
                        for_operation: !1,
                        for_selection: !0,
                        for_transfer: !0,
                        hide_transfer: !0,
                        is_new_video: !0,
                        video_ori_status: 4,
                        status: 3,
                        source: "file"
                    };
                    if ("string" == typeof o && (o = [o]), !o || 0 == o.length) return _.err("查无视频"), i.hide(), !0;
                    for (var s = 0, a = [], c = 0; c < o.length; c++) !function (t) {
                        l.getInfoByVid({
                            vid: o[t],
                            onSuccess: function (l) {
                                s++, a.push($.extend({}, n, {
                                    id: s,
                                    title: l.data.title,
                                    duration: m(l.data.time),
                                    cover: l.data.p4_3,
                                    video_id: o[t],
                                    err_msg: l.err_msg
                                })), 80 == l.ret_code && 1 == l.oriData.exem && (a[a.length - 1].err_msg = ""), r(d, i, a, a.length - 1),
                                1 === o.length && d.find(".Js_videomsg").eq(0).trigger("click"), e.dialog.popup("resetPosition");
                            },
                            onError: function () {
                                s++, wx.jslog({
                                    src: "common/wx/media/videoDialog.js"
                                }, null, 52), s == o.length && 0 == a.length && (_.err("获取视频失败，请重试"), i.hide());
                            }
                        });
                    }(c);
                }, null, function () {
                    i.hide(), _.err("该网址存在错误，请填写正确的腾讯视频网址");
                })) : (i.hide(), e.$dom.find("#js_video_search_list").find(".inner").empty(), e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"));
            });
        },
        initPagebar: function (e, i, t) {
            var o = this, n = e / i + 1;
            return i >= t ? void o.$dom.find(".js_pagebar").hide() : void new p({
                container: o.$dom.find(".js_pagebar").show(),
                perPage: i,
                first: !1,
                last: !1,
                isSimple: !0,
                initShowPage: n,
                totalItemsNum: t,
                callback: function (t) {
                    var d = t.currentPage, s = o.$dom.find(".js_top.selected").data("id");
                    d != n && s && (e = i * --d, o.getList(s, e, i));
                }
            });
        },
        getList: function (e, i, t) {
            var o = this, n = e == j ? f.appmsg : f;
            o.$dom.find(".js_video_content").hide(), o.$dom.find(".js_video_loading").show(),
                n.getList(e, i, t, function (n) {
                    if (o.dialog && e == o.$dom.find(".js_top.selected").data("id")) {
                        var d = n.file_item || n.item, s = o.$dom.find("#js_videomsg_list").find(".inner").empty();
                        d.length ? (d.each(function (e, i) {
                            var t = s.eq(i % 2), o = $('<div id="appmsg%s"></div>'.sprintf(e.app_id || e.file_id), t).appendTo(t);
                            O(o, e);
                        }), o.$dom.find(".js_video_content").show(), o.dialog.popup("resetPosition")) : o.$dom.find(".js_video_none").show().find(".js_empty_tips").html(e == q ? "暂无素材<br />（素材来源：通过微信用户上传给公众帐号）" : "暂无素材"),
                            o.$dom.find(".js_video_loading").hide(), o.initPagebar(i, t, n.file_cnt[b[e]] || n.file_cnt.video_cnt);
                    }
                }, "", x);
        }
    };
    return $.extend(y.prototype, T), y;
});
define("common/wx/getVinfo.js", ["common/wx/Cgi.js", "common/wx/loadscript.js"], function (e) {
    "use strict";

    function a(e, a) {
        var t = "视频加载失败", r = "";
        switch (1 * e) {
            case-4:
                r = "因版权限制，该视频不支持添加";
                break;

            case-5:
                r = "因版权限制，该视频不支持添加";
                break;

            case-3:
                r = "因版权限制，该视频不支持添加";
                break;

            case 61:
                r = "该视频不存在";
                break;

            case 62:
                r = "该视频已下架";
                break;

            case 63:
                r = "视频加载失败";
                break;

            case 65:
                r = "视频加载失败";
                break;

            case 67:
                r = "视频加载失败";
                break;

            case 69:
                r = "视频格式不支持移动端观看";
                break;

            case 71:
                r = "视频加载失败";
                break;

            case 73:
                r = "视频加载失败";
                break;

            case 74:
                r = "视频加载失败";
                break;

            case 80:
                switch (1 * a) {
                    case 1:
                        r = "IP地址所在地区暂不支持播放";
                        break;

                    case 2:
                        r = "因版权限制，该视频不支持添加";
                        break;

                    default:
                        r = "因版权限制，该视频不支持添加";
                }
                break;

            case 81:
                r = "视频加载失败";
                break;

            case 82:
                r = "视频加载失败";
                break;

            case 83:
                switch (1 * a) {
                    case-1:
                        r = t;
                        break;

                    case-2:
                        r = "因版权限制，该视频不支持添加";
                        break;

                    default:
                        r = "因版权限制，该视频不支持添加";
                }
                break;

            case 84:
                r = "视频加载失败";
                break;

            default:
                r = t;
        }
        return r;
    }

    function t(e) {
        document.domain = "qq.com";
        var a = "", t = encodeURIComponent(top.window.location.href.replace(/(\?|&)(key|uin)=([\S\s]*?)(&|$)/g, "$1").replace(/&$/, "")),
            r = ["http://btrace.qq.com/kvcollect?BossId=2973&Pwd=1557019983&step=1009&vid=", "undefined" != typeof e.vid ? e.vid : "", "&platform=", "&val=", "undefined" != typeof e.val ? e.val : "", "&val1=", "undefined" != typeof e.val1 ? e.val1 : "", "&vurl=", encodeURIComponent(e.vurl), "&t=", Math.random(), "&url=", t, "&wx_openid=", a].join(""),
            c = new Image;
        c.src = r.substr(0, 1024);
    }

    function r(e) {
        var a, t;
        a = "function" == typeof e.onSuccess ? e.onSuccess : function () {
        }, t = "function" == typeof e.onError ? e.onError : function () {
        },
            o.post({
                url: wx.url("/cgi-bin/getvideockey?"),
                data: {
                    vid: e.vid
                }
            }, {
                done: function (r) {
                    r && r.base_resp && 0 == r.base_resp.ret && r.ckey ? n({
                        vid: e.vid,
                        ckey: r.ckey,
                        onSuc: function (t) {
                            t = t || {}, t.data || (t.data = {}), t.data.p4_3 = c(e.vid, 4 / 3), t.data.p16_9 = c(e.vid, 16 / 9),
                                a(t);
                        },
                        onError: function () {
                            t({
                                code: 3
                            });
                        }
                    }) : t({
                        code: 2,
                        ckeyResp: r
                    });
                },
                fail: function () {
                    t({
                        code: 1
                    });
                }
            });
    }

    function c(e, a) {
        return a && a != 16 / 9 ? "http://shp.qpic.cn/qqvideo/0/" + e + "/400" : "http://shp.qpic.cn/qqvideo_ori/0/" + e + "_496_280/0";
    }

    var o = e("common/wx/Cgi.js"), i = e("common/wx/loadscript.js"), n = function (e) {
        var r = "https://h5vv.video.qq.com/getvinfo?vid=#vid#&dtype=1&otype=json&callback=video_dynamic_callback&appVer=1&encryptVer=6.3&platform=61001&cKey=#ckey#&sdtfrom=v3060";
        r = r.replace("#vid#", e.vid).replace("#ckey#", e.ckey), r += "&device=60401&use_proxy_sdk=0";
        var c = +new Date;
        i({
            url: r,
            timeout: 1e4,
            callbackName: "video_dynamic_callback",
            callback: function (r) {
                var o = +new Date, i = o - c;
                r = r || {}, "undefined" == typeof r.em && (r.em = 0);
                var n, v = "", l = r.em;
                if (0 == r.em) {
                    if (r.exem > 0 ? l = -4 : 0 == r.exem && r.vl && r.vl.vi && r.vl.vi[0] && 8 == r.vl.vi[0].st && (l = r.preview > 0 ? -5 : -3),
                    0 != l || r.vl && r.vl.vi && r.vl.vi[0] || (l = -2), 0 != l && (v = a(1 * l, 1 * r.exem)), r.vl && r.vl.vi && r.vl.vi[0]) {
                        var d = r.vl.vi[0];
                        if (n = {
                            newVid: d.lnk,
                            time: d.td,
                            title: d.ti,
                            width: d.vw,
                            height: d.vh,
                            file_size: d.fs,
                            rate: Math.round(d.fs / 1024 * 8 / d.td)
                        }, d.ul && d.ul.ui && d.ul.ui[0]) {
                            var s = d.ul.ui[0], f = s.url + d.fn, u = r.fl, m = "";
                            if (u && u.cnt > 0) for (var p = u.fi, k = 0, b = p.length; b > k; k++) if (1 * p[k].sl === 1) {
                                m = p[k].name, n.resolution = (p[k].cname || "").replace(/^.*;\((:?.*)P\)$/, "$1") || 0;
                                break;
                            }
                            n.format = m, n.vt = s.vt, n.totalUrl = [f, -1 != f.indexOf("?") ? "&" : "?", "vkey=", d.fvkey, "&sdtfrom=", "&type=", 1 == s.dt ? "tflv" : 2 == s.dt || 0 == s.dt ? "mp4" : "", "&platform=", "&fmt=", m, "&level=", d.level, "&br=", d.br, "&sp=", d.sp].join("");
                        }
                    }
                } else v = a(1 * l, 1 * r.exem);
                t({
                    vid: e.vid,
                    val: i,
                    val1: r.em,
                    vurl: n && n.totalUrl ? n.totalUrl : ""
                }), e.onSuc({
                    data: n,
                    oriData: r,
                    c_time: i,
                    err_msg: v || "",
                    ret_code: l
                });
            },
            onerror: function (a) {
                var r, o = +new Date, i = o - c;
                switch (1 * a) {
                    case 400:
                        r = -22;
                        break;

                    case 500:
                        r = -21;
                        break;

                    default:
                        r = -23;
                }
                "function" == typeof e.onError && e.onError(r, {
                    ret_code: r,
                    c_time: i,
                    err_msg: ""
                }), t({
                    vid: e.vid,
                    val: i,
                    val1: r,
                    vurl: ""
                });
            }
        });
    };
    return {
        get: n,
        getInfoByVid: r
    };
});
define("biz_common/utils/url/parse.js", [], function () {
    function r(r) {
        var e = r.length, n = r.indexOf("?"), t = r.indexOf("#");
        t = -1 == t ? e : t, n = -1 == n ? t : n;
        var a = r.substr(0, n), i = r.substr(n + 1, t - n - 1), o = r.substr(t + 1);
        return {
            host: a,
            query_str: i,
            hash: o
        };
    }

    function e(e, n) {
        var t = r(e), a = t.query_str, i = [];
        for (var o in n) n.hasOwnProperty(o) && i.push(o + "=" + encodeURIComponent(n[o]));
        return i.length > 0 && (a += ("" != a ? "&" : "") + i.join("&")), t.host + ("" != a ? "?" + a : "") + ("" != t.hash ? "#" + t.hash : "");
    }

    function n(r, e, n, t) {
        r = r || location.href;
        var a = r.indexOf("&"), i = r.length, o = r.replace(/^[\w\d]+:[\/\\]+/g, "").split("").reverse();
        Array.prototype.indexOf || (Array.prototype.indexOf = function (r, e) {
            var n;
            if (null == this) throw new TypeError('"this" is null or not defined');
            var t = Object(this), a = t.length >>> 0;
            if (0 === a) return -1;
            var i = +e || 0;
            if (1 / 0 === Math.abs(i) && (i = 0), i >= a) return -1;
            for (n = Math.max(i >= 0 ? i : a - Math.abs(i), 0); a > n;) {
                if (n in t && t[n] === r) return n;
                n++;
            }
            return -1;
        });
        var s = i - 1 - o.indexOf("/");
        -1 != a && -1 == r.indexOf("?") && a > s && (r = r.replace("&", "?"));
        var u = new RegExp("([\\?&]" + e + "=)[^&#]*");
        if (!r.match(u)) {
            var h = r.indexOf("?");
            return -1 == h ? r + "?" + e + "=" + n : h == r.length - 1 ? r + e + "=" + n : r + "&" + e + "=" + n;
        }
        return t === !0 ? r.replace(u, "$1" + n) : r;
    }

    function t(r) {
        var e = arguments[1] || window.location.search, n = new RegExp("(^|&)" + r + "=([^&]*)(&|$)"), t = e.substr(e.indexOf("?") + 1).match(n);
        return null != t ? t[2] : "";
    }

    return {
        parseUrl: r,
        join: e,
        addParam: n,
        getQuery: t
    };
});
define("common/wx/mpEditor/plugin/remoteimg.js", ["common/wx/Tips.js", "media/report.js", "common/wx/mpEditor/plugin/filter.js"], function (require, exports, module) {
    "use strict";

    function Remoteimg(e) {
        this.init(e), this.addEvent();
    }

    var Tips = require("common/wx/Tips.js"), Report = require("media/report.js"), Filter = require("common/wx/mpEditor/plugin/filter.js"), g = {
        appmsgTmpImg: "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
        defaultRemoteImg: "http://mmbiz.qpic.cn/mmbiz/G1lssUsxJOsVVJNUIuKfUP7bLm5EVWxXl5znicMum6Os0CMJHPdeHicicZ4W5MGOVa8ooSXYuE61Ek/0"
    };
    return Remoteimg.defaultRemoteImg = g.defaultRemoteImg, Remoteimg.prototype.init = function (e) {
        var t = this;
        this.uploadUrl = (~location.hostname.search(/^mp/) ? "https://mp.weixin.qq.com" : "") + "/cgi-bin/filetransfer?action=upload_material&f=json&scene=8&writetype=doublewrite&groupid=3&ticket_id=" + wx.data.user_name + "&ticket=" + wx.data.ticket + "&svr_time=" + wx.data.time,
            this.uploadUrl = wx.url(this.uploadUrl), this.mpeditor = e, this.editor = e.getUeditor(),
            this.domUtils = UE.dom.domUtils, this.ajax = UE.ajax, this.localDomain = ["127.0.0.1", "localhost", "mmbiz.qpic.cn", "mmbiz.qlogo.cn", "m.qpic.cn", /^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g, "mmsns.qpic.cn"],
            this.catcherUrl = this.editor.options.catcherUrl, this.catchFieldName = "imgurl", this.separater = "ue_separate_ue",
            this.id = +new Date, this.remoteList = {}, this.Blob_obj_support = function () {
            try {
                return !!window.Blob && Boolean(new Blob);
            } catch (e) {
                return !1;
            }
        }(), this.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder,
            this.dataURLtoBlobSupport = function () {
                return (t.BlobBuilder || t.Blob_obj_support) && window.atob && window.ArrayBuffer && window.Uint8Array ? !0 : !1;
            }(), this.Blob_Uint8Array_support = function () {
            try {
                return !!t.Blob_obj_support && !!window.Uint8Array && 100 === new Blob([new Uint8Array(100)]).size;
            } catch (e) {
                return !1;
            }
        }();
    }, Remoteimg.prototype.addEvent = function () {
        var _t = this, me = this.editor, mpeditor = this.mpeditor;
        me.addListener("onpasting", function (e, t) {
            var r = null, o = t.clipboardData ? t.clipboardData : t.originalEvent && t.originalEvent.clipboardData ? t.originalEvent.clipboardData : {}, i = o.items;
            if (i && i.length > 0) {
                Report.addNum(Report.reportId[2], 5, 1), 1 == i.length && /image/i.test(i[0].type) && (r = i[0].getAsFile());
                for (var a = 0, n = i.length; n > a; a++) /text\/rtf/i.test(i[a].type) && Report.addNum(Report.reportId[2], 6, 100);
            }
            return _t.catchObjectBlob(r);
        }), me.addListener("afterpaste aftersetcontent afterinserthtml", function (e, t, r) {
            for (var o, i, a, n, m = [], s = 0; n = r[s++];) if (n.tagName) {
                o = "img" == n.tagName.toLowerCase() ? [n] : _t.domUtils.getElementsByTagName(n, "img");
                for (var c, p = 0; c = o[p++];) {
                    if (_t.handleDataSrc(c), i = c.getAttribute("style") || c.style.cssText || "", c.getAttribute("src") && /;?\s*(background|background-image)\s*\:/.test(i) && ($(c).css({
                        "background-image": "none"
                    }).removeClass("img_loading"), Filter.filterStyleAttr(c, ["background-image"])), c.src === g.appmsgTmpImg) {
                        var d = c.getAttribute("data-src");
                        d && _t.isLocalDomain(d) && (c.src = d, c.removeAttribute("data-src"));
                    }
                    _t.http2https("img", c), a = c.getAttribute("_src") || c.src || "", /^(https?|ftp):/i.test(a) && !_t.isLocalDomain(a) ? me.fireEvent("catchRemoteImage", c, "img", a) : /^data:image/i.test(a) ? _t.catchDataUrl(a, c) : /^blob:/i.test(a) && _t.catchObjectUrl(c, a);
                }
                for ("afterpaste" == e && o.length > 0 && me.fireEvent("afterpasteimg", "", o), m = [n], m.push.apply(m, _t.domUtils.getElementsByTagName(n, "*")),
                         p = 0; c = m[p++];) if (i = c.getAttribute("style") || c.style.cssText || "", i = i.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),
                i && i[2]) {
                    a = i[2].replace(/^['"]|['"]$/g, "");
                    var l = _t.http2https("bg", c, a);
                    a = l && l.url ? l.url : a, /^(https?|ftp):/i.test(a) && !_t.isLocalDomain(a) ? me.fireEvent("catchRemoteImage", c, "bg", a) : /^data:image/i.test(a) ? _t.catchDataUrl(a, c) : /^blob:/i.test(a) && _t.catchObjectUrl(c, a);
                }
                for (p = 0; c = m[p++];) c.style && (c.style.borderImage = "", c.style.borderImageSource = "");
            }
        }), me.addListener("catchRemoteImage", function (cmd, ci, type, url) {
            var remoteObj = _t.setRemoteTag({
                dom: ci,
                uid: "c" + _t.getuid()
            });
            if (remoteObj) {
                var uid = remoteObj.uid;
                "bg" == type ? me.fireEvent("funcPvUvReport", "remoteimg_style") : "img" == type && me.fireEvent("funcPvUvReport", "remoteimg_img"),
                    _t.catchremoteimage([url], {
                        success: function (xhr) {
                            !!_t.remoteList[uid] && delete _t.remoteList[uid];
                            try {
                                var info = eval("(" + xhr.responseText + ")");
                            } catch (e) {
                                return me.fireEvent("funcPvUvReport", "remoteimgerr"), me.fireEvent("catchremoteerror", remoteObj, ""),
                                    void _t.checkRemoteList(!0);
                            }
                            info && 0 == info.errcode && info.url ? (me.fireEvent("funcPvUvReport", "remoteimgsuc"), me.fireEvent("catchremotesuccess", remoteObj, info.url, info.img_format)) : (me.fireEvent("funcPvUvReport", "remoteimgerr"),
                                me.fireEvent("catchremoteerror", remoteObj, "")), _t.checkRemoteList(!0);
                        },
                        error: function () {
                            !!_t.remoteList[uid] && delete _t.remoteList[uid], me.fireEvent("funcPvUvReport", "remoteimgerr"),
                                me.fireEvent("catchremoteerror", remoteObj, ""), _t.checkRemoteList(!0);
                        }
                    });
            }
        }), me.addListener("checkRemoteList", function (e, t) {
            return _t.checkRemoteList(t === !0 ? !0 : !1);
        }), me.addListener("getRemoteList", function () {
            return _t.remoteList;
        });
    }, Remoteimg.prototype.catchObjectBlob = function (e, t) {
        var r = this, o = this.editor, i = !1;
        if (null !== e && (i = r.filterImgSize(e)), null !== e && i !== !0) return r.pasteImageError({
            msg: i.msg ? i.msg : "图片粘贴失败",
            dom: t
        }), !0;
        if (null !== e && i === !0) {
            var a, n = e.type.split("/")[1] || "";
            if (a = o.window.URL || o.window.webkitURL) {
                var m = a.createObjectURL(e);
                if ("string" == typeof m) return t ? r.uploadPasteImg({
                    image: m,
                    blob: e,
                    type: n,
                    dom: t
                }) : r.pasteImageInserted({
                    image: m,
                    blob: e,
                    type: n
                }), !0;
            }
            if ("function" != typeof FileReader) return !1;
            var s = new FileReader;
            return s.onload = function (o) {
                o.target && 2 == o.target.readyState && (t ? r.uploadPasteImg({
                    image: m,
                    blob: e,
                    type: n,
                    dom: t
                }) : r.pasteImageInserted({
                    image: o.target.result,
                    blob: e,
                    type: n
                }));
            }, s.onerror = function () {
                r.pasteImageError({
                    msg: "图片粘贴失败",
                    dom: t
                });
            }, s.readAsDataURL(e), !0;
        }
    }, Remoteimg.prototype.catchObjectUrl = function (e, t) {
        var r = this, o = this.editor, i = r.setRemoteTag({
            dom: e,
            uid: "p" + r.getuid()
        });
        if (i) {
            var a = i.uid, n = new Image;
            n.onerror = function () {
                !!r.remoteList[a] && delete r.remoteList[a], o.fireEvent("catchremoteerror", i, ""), r.checkRemoteList(!0);
            }, n.onload = function () {
                !!r.remoteList[a] && delete r.remoteList[a], n.onerror = null, n.onload = null;
                var t = n.width || n.naturalWidth, i = n.height || n.naturalHeight, m = o.document.createElement("canvas"), s = m.getContext("2d");
                m.width = t, m.height = i, s.drawImage(n, 0, 0, t, i);
                var c = m.toDataURL();
                r.catchDataUrl(c, e);
            }, n.src = t;
        }
    }, Remoteimg.prototype.catchDataUrl = function (e, t) {
        var r = this, o = r.dataURLtoBlob(e), i = !1;
        if (o && !r.validImg(o) && (o = null), o) if (i = r.filterImgSize(o), i === !0) {
            var a = o.type.split("/")[1] || "";
            r.uploadPasteImg({
                image: e,
                blob: o,
                dom: t,
                type: a
            });
        } else r.pasteImageError({
            msg: i.msg ? i.msg : "图片粘贴失败",
            dom: t
        }); else r.pasteImageError({
            msg: "图片粘贴失败",
            dom: t
        });
    }, Remoteimg.prototype.objectUrl2Blob = function (e, t, r) {
        var o = new XMLHttpRequest;
        o.onerror = function () {
            "function" == typeof r && r();
        }, o.onreadystatechange = function () {
            4 === o.readyState && (o.onreadystatechange = null, o.onerror = null, o.status >= 200 && o.status < 300 ? "function" == typeof t && t(this.response) : "function" == typeof r && r());
        }, o.responseType = "blob", o.open("GET", e, !0), o.send();
    }, Remoteimg.prototype.pasteImageError = function (e) {
        var t = this, r = this.editor;
        if (!e.dom) return void r.fireEvent("catchremoteerror", null, e.msg || "");
        var o = t.setRemoteTag({
            dom: e.dom,
            force: !0,
            uid: "p_" + this.getuid()
        });
        !!t.remoteList[o.uid] && delete t.remoteList[o.uid], r.fireEvent("catchremoteerror", o, e.msg || "");
    }, Remoteimg.prototype.pasteImageInserted = function (e) {
        for (var t = this, r = this.editor, o = r.fireEvent("insertMaterialImg", [{
            format: e.type,
            src: e.image
        }]), i = 0, a = o.length; a > i; i++) {
            var n = o[i];
            if (/^img$/i.test(n.nodeName)) {
                e.dom = n;
                break;
            }
            var m = n.getElementsByTagName("img");
            if (m && m.length > 0) {
                e.dom = m[0];
                break;
            }
        }
        e.dom && /^img$/i.test(e.dom.nodeName) && t.uploadPasteImg(e);
    }, Remoteimg.prototype.dataURLtoBlob = function (e) {
        if (!this.dataURLtoBlobSupport) return !1;
        try {
            var t, r = e.split(",");
            t = r[0].indexOf("base64") >= 0 ? window.atob(r[1]) : decodeURIComponent(r[1]);
            for (var o = new ArrayBuffer(t.length), i = new Uint8Array(o), a = 0, n = t.length; n > a; a++) i[a] = t.charCodeAt(a);
            var m = r[0].split(":")[1].split(";")[0];
            if (this.Blob_obj_support) return this.Blob_Uint8Array_support ? new Blob([i], {
                type: m
            }) : new Blob([o], {
                type: m
            });
            var s = new BlobBuilder;
            return s.append(o), s.getBlob(m);
        } catch (c) {
            return !1;
        }
    }, Remoteimg.prototype.setRemoteTag = function (e) {
        var t = this, r = this.editor, o = r.fireEvent("get_current_article");
        if (!e.dom || !e.uid) return !1;
        var i = e.dom.getAttribute("data-remoteid");
        if (i && t.remoteList[i]) {
            if (e.force !== !0) return !1;
            delete t.remoteList[i];
        }
        i = i || e.uid;
        var a = t.remoteList[i] = {
            article: o,
            uid: i,
            defaultRemoteImg: g.defaultRemoteImg
        };
        return t.domUtils.setAttributes(e.dom, {
            "data-remoteid": i
        }), a;
    }, Remoteimg.prototype.uploadPasteImg = function (opt) {
        var _t = this, me = this.editor;
        if ("function" != typeof FormData) return _t.pasteImageError({
            msg: "粘贴图片失败",
            dom: opt.dom
        }), !1;
        var id = this.getuid(), remoteObj = _t.setRemoteTag({
            dom: opt.dom,
            uid: "p_" + id
        });
        if (remoteObj) {
            var uid = remoteObj.uid, form = new FormData, extensions = opt.blob.type.split("/")[1] || "", url = this.uploadUrl + "&seq=" + id, filename = "粘贴图片_" + this.formatDate(new Date, "YYYYMMDDHHIISS") + (extensions ? "." + extensions : "");
            form.append("id", id), form.append("name", filename), form.append("type", opt.blob.type),
                form.append("lastModifiedDate", new Date), form.append("size", opt.blob.size), form.append("file", opt.blob, filename);
            var xhr = new XMLHttpRequest;
            xhr.onerror = function () {
                !!_t.remoteList[uid] && delete _t.remoteList[uid], me.fireEvent("funcPvUvReport", "screen_shot_fail"),
                    me.fireEvent("catchremoteerror", remoteObj, ""), _t.checkRemoteList(!0);
            }, xhr.onreadystatechange = function (error) {
                if (4 === xhr.readyState) if (xhr.upload.onprogress = null, xhr.onreadystatechange = null,
                    xhr.onerror = null, !!_t.remoteList[uid] && delete _t.remoteList[uid], xhr.status >= 200 && xhr.status < 300) {
                    try {
                        var info = eval("(" + xhr.responseText + ")");
                    } catch (e) {
                        return me.fireEvent("funcPvUvReport", "screen_shot_fail"), me.fireEvent("catchremoteerror", remoteObj, ""),
                            void _t.checkRemoteList(!0);
                    }
                    if (info && info.base_resp && 0 == info.base_resp.ret && info.cdn_url) {
                        var cdnUrl = info.cdn_url.http2https();
                        me.fireEvent("funcPvUvReport", "screen_shot_suc"), me.fireEvent("catchremotesuccess", remoteObj, cdnUrl, extensions);
                    } else info && info.base_resp && 220001 == info.base_resp.ret ? Tips.err('"素材管理"中的存储数量已达到上限，请删除后再操作。') : info && info.base_resp && 220002 == info.base_resp.ret ? Tips.err("你的图片库已达到存储上限，请进行清理。") : (me.fireEvent("funcPvUvReport", "screen_shot_fail"),
                        me.fireEvent("catchremoteerror", remoteObj, ""));
                    _t.checkRemoteList(!0);
                } else me.fireEvent("funcPvUvReport", "screen_shot_fail"), me.fireEvent("catchremoteerror", remoteObj, ""),
                    _t.checkRemoteList(!0);
            }, xhr.open("POST", url), xhr.send(form);
        }
    }, Remoteimg.prototype.validImg = function (e) {
        return e.size < 1024 ? !1 : !0;
    }, Remoteimg.prototype.filterImgSize = function (e) {
        var t = 5242880, r = ",bmp,png,jpeg,jpg,gif,", o = "," + (e.type.split("/")[1] || "") + ",";
        return e.size > t ? {
            type: 1,
            msg: "截图的图片大小不能超过5M"
        } : -1 == r.indexOf(o) ? {
            type: 2,
            msg: "截图的图片必须为以下格式：bmp,png,jpeg,jpg,gif"
        } : !0;
    }, Remoteimg.prototype.checkRemoteList = function (e) {
        var t = 0;
        for (var r in this.remoteList) this.remoteList.hasOwnProperty(r) && t++;
        return t > 0 ? !1 : (e === !0 && (this.editor.fireEvent("draft_force_save"), this.editor.fireEvent("remoteimg_all_complete")),
            !0);
    }, Remoteimg.prototype.handleDataSrc = function (e) {
        var t = e.getAttribute("src") || "", r = e.getAttribute("data-src") || "";
        /^data:image/i.test(t) && (/^http:\/\/mmbiz\.qpic\.cn/.test(r) || /^https:\/\/mmbiz\.qlogo\.cn/.test(r)) && (e.setAttribute("src", r),
            e.removeAttribute("data-src"));
    }, Remoteimg.prototype.http2https = function (e, t, r) {
        if ("img" == e) {
            var o = t.getAttribute("src") || "";
            if (!this.isCdnImg(o)) return;
            var i = this.formatUrl(o);
            return t.setAttribute("src", i.url), !!i.format && t.setAttribute("data-type", i.format),
                t.removeAttribute("_src"), t.removeAttribute("data-src"), i;
        }
        if ("bg" == e && r && this.isCdnImg(r)) {
            var i = this.formatUrl(r);
            return t.style.backgroundImage = i.url, i;
        }
        return null;
    }, Remoteimg.prototype.formatUrl = function (e) {
        e = e || "";
        var t = e.match(/(?:\?|&)wx_fmt=(.*?)(?:&|$)/) || [];
        return t = t[1] || "", e = e.http2https().replace(/\?.*$/, "?"), t && e && (e = e + "wx_fmt=" + t),
            {
                url: e,
                format: t
            };
    }, Remoteimg.prototype.catchremoteimage = function (e, t) {
        var r = e.join(this.separater), o = (this.editor, {
            timeout: 6e4,
            onsuccess: function () {
                "function" == typeof t.success && t.success.apply(this, arguments);
            },
            onerror: function () {
                "function" == typeof t.error && t.error.apply(this, arguments);
            }
        });
        try {
            var i = decodeURIComponent(r);
            o[this.catchFieldName] = encodeURI(i);
        } catch (a) {
            o[this.catchFieldName] = r;
        }
        o.t = "ajax-editor-upload-img";
        var n = this;
        setTimeout(function () {
            n.ajax.request(n.catcherUrl, o);
        }, 2e3);
    }, Remoteimg.prototype.getuid = function () {
        return this.id++;
    }, Remoteimg.isCdnImg = Remoteimg.prototype.isCdnImg = function (e) {
        for (var t, r = [/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i, /^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i, /^http(s)?:\/\/mmsns\.qpic\.cn([\/?].*)*$/i], o = 0; t = r[o++];) if (t.test(e)) return !0;
        return !1;
    }, Remoteimg.isLocalDomain = Remoteimg.prototype.isLocalDomain = function (e) {
        for (var t, r = [/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i, /^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i, /^http(s)?:\/\/m\.qpic\.cn([\/?].*)*$/i, /^http(s)?:\/\/mmsns\.qpic\.cn([\/?].*)*$/i, /^http(s)?:\/\/mp\.weixin\.qq\.com([\/?].*)*$/i, /^http(s)?:\/\/res\.wx\.qq\.com([\/?].*)*$/i, /^http(s)?:\/\/(a|b)(\d)+\.photo\.store\.qq\.com([\/?].*)*$/i], o = 0; t = r[o++];) if (t.test(e)) return !0;
        return !1;
    }, Remoteimg.prototype.formatDate = function (e, t) {
        var r = t.replace(/yyyy|YYYY/, e.getFullYear()).replace(/yy|YY/, this.addZero(e.getFullYear() % 100, 2)).replace(/mm|MM/, this.addZero(e.getMonth() + 1, 2)).replace(/m|M/g, e.getMonth() + 1).replace(/dd|DD/, this.addZero(e.getDate(), 2)).replace(/d|D/g, e.getDate()).replace(/hh|HH/, this.addZero(e.getHours(), 2)).replace(/h|H/g, e.getHours()).replace(/ii|II/, this.addZero(e.getMinutes(), 2)).replace(/i|I/g, e.getMinutes()).replace(/ss|SS/, this.addZero(e.getSeconds(), 2)).replace(/s|S/g, e.getSeconds());
        return r;
    }, Remoteimg.prototype.addZero = function (e, t) {
        for (var r = 0, o = t - (e + "").length; o > r; r++) e = "0" + e;
        return e + "";
    }, Remoteimg;
});
define("tpl/mpEditor/plugin/img_popup.html.js", [], function () {
    return '<div class="js_img_popup edui_mask_edit_group">\n    {if hasCropimg}\n    <div class="edui-clickable edui_mask_edit_meta first_child" onclick="$$._cropImg()">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_img_crop"></i>\n            裁剪        </div>\n    </div>\n    {/if}\n    <div class="edui-clickable edui_mask_edit_meta" onclick="$$._imgReplace()">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_img_replace"></i>\n            图片替换        </div>\n    </div>\n	<div class="js_canceladapt edui-clickable edui_mask_edit_meta tips_global" onclick="$$._imgAutoWidth(false)" style="{if !hasadapt}display:none;{/if}">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_img_canceladapt"></i>\n            取消自适应        </div>\n    </div>\n	<div class="js_adapt edui-clickable edui_mask_edit_meta" onclick="$$._imgAutoWidth(true)" style="{if hasadapt}display:none;{/if}">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_img_adapt"></i>\n            自适应手机屏幕宽度        </div>\n    </div>\n</div>\n\n\n';
});
define("common/wx/media/weappDialog.js", ["common/wx/popup.js", "biz_web/ui/checkbox.js", "common/lib/jquery.Jcrop.js", "tpl/media/weapp_dialog.html.js", "tpl/media/weapp_dialog_content.html.js", "common/wx/Cgi.js", "common/wx/mpEditor/common/cropImgCgi.js", "common/wx/upload.js", "common/wx/Step.js", "common/wx/Tips.js"], function (e) {
    "use strict";
    e("common/wx/popup.js"), e("biz_web/ui/checkbox.js"), e("common/lib/jquery.Jcrop.js");
    var i = e("tpl/media/weapp_dialog.html.js"), t = e("tpl/media/weapp_dialog_content.html.js"), n = e("common/wx/Cgi.js"), s = e("common/wx/mpEditor/common/cropImgCgi.js"), a = e("common/wx/upload.js"), _ = e("common/wx/Step.js"), p = e("common/wx/Tips.js"), l = function (e, l) {
        var r = void 0, c = null, o = {
            appid: e.appid,
            main_page: e.main_page,
            nick_name: e.nick_name,
            content: e.content,
            image: e.image
        };
        void 0 !== e.selected && (r = e.selected);
        var d = $(i).popup({
            title: "选择小程序",
            width: 960,
            className: "weapp_select_dialog",
            buttons: [],
            onOK: function () {
            },
            onCancel: function () {
                this.remove();
            },
            onHide: function () {
                this.remove();
            }
        }), w = new _({
            container: ".js_weapp_select_step",
            selected: e.step || 1,
            names: ["选择小程序", "填写详细信息"]
        });
        d.find(".dialog_ft").hide(), d.find(".js_weapp_select_cancel").click(function () {
            d.find(".pop_closed").click(), l();
        });
        var m, f, h, g = function (e) {
            if (parseInt(e.w) > 0) {
                j.c = e;
                var i = $(".js_after_preview").width() / e.w, t = $(".js_after_preview").height() / e.h;
                console.log(e.w, e.h), $(".js_after_preview_img").css({
                    width: Math.round(i * m) + "px",
                    height: Math.round(t * f) + "px",
                    marginLeft: "-" + Math.round(i * e.x) + "px",
                    marginTop: "-" + Math.round(t * e.y) + "px"
                });
            }
        }, j = {
            fid: null,
            share: null,
            c: {},
            lar: {}
        };
        a.uploadCdnFile({
            container: "#weapp_select_upload_reset",
            multi: !1,
            type: 2,
            fileSingleSizeLimit: 2097152,
            imageSize: !0,
            onComplete: function (e, i, t, n) {
                var s = n.content, a = new Image;
                a.onload = function () {
                    h && h.destroy(), d.find("[name=imageUrl]").val(s), d.find(".js_weapp_select_step4").find(".js_weapp_select_cover").show(),
                        d.find(".js_weapp_select_step4").find(".js_weapp_select_cover_preview").css("background-image", 'url("' + s + '")'),
                        d.find(".js_review-image-url").removeAttr("style"), d.find(".js_review-image-url").attr("src", s),
                        d.find(".js_after_preview_img").attr("src", s), d.find(".js_js_review-box").show();
                    var e, i, t, n, a, _, p, l = $(".js_review-image-url").width() / 5 * 4;
                    e = l > $(".js_review-image-url").height() ? $(".js_review-image-url").height() / 4 * 5 : $(".js_review-image-url").width(),
                        _ = ($(".js_review-image-url").width() - e) / 2, p = ($(".js_review-image-url").height() - l) / 2,
                        i = _, t = p, n = $(".js_review-image-url").width() - _, a = $(".js_review-image-url").height() - p,
                        console.log(i, t, n, a), $(".js_review-image-url").Jcrop({
                        onChange: g,
                        onSelect: g,
                        setSelect: [i, t, n, a],
                        createHandles: ["nw", "ne", "se", "sw"],
                        aspectRatio: 1.25,
                        boxWidth: $(".js_review-image-url").width(),
                        boxHeight: $(".js_review-image-url").height(),
                        allowSelect: !1,
                        allowResize: !0,
                        shade: !0,
                        bgOpacity: .5,
                        bgColor: "black"
                    }, function () {
                        var e = this.getBounds();
                        m = e[0], f = e[1], h = this, $(".js_before_preview").hide(), $(".js_after_preview").show(),
                            console.log(h.tellSelect()), console.log(h.tellScaled());
                        var i = $(".js_after_preview").width() / h.tellSelect().w, t = $(".js_after_preview").height() / h.tellSelect().h;
                        $(".js_after_preview_img").css({
                            width: Math.round(i * m) + "px",
                            height: Math.round(t * f) + "px",
                            marginLeft: "-" + Math.round(i * h.tellSelect().x) + "px",
                            marginTop: "-" + Math.round(t * h.tellSelect().y) + "px"
                        }), $(".jcrop-handle", this.ui.selection).css({
                            width: "7px",
                            height: "7px"
                        });
                    });
                }, a.onerror = function () {
                    p.err("图片上传失败");
                }, a.src = s;
            }
        });
        var u = function () {
            a.uploadCdnFile({
                container: "#weapp_select_upload",
                multi: !1,
                type: 2,
                fileSingleSizeLimit: 2097152,
                imageSize: !0,
                onComplete: function (e, i, t, n) {
                    var s = n.content, a = new Image;
                    a.onload = function () {
                        h && h.destroy(), d.find("[name=imageUrl]").val(s), d.find(".js_weapp_select_step4").find(".js_weapp_select_cover").show(),
                            d.find(".js_weapp_select_step4").find(".js_weapp_select_cover_preview").css("background-image", 'url("' + s + '")'),
                            d.find(".js_review-image-url").removeAttr("style"), d.find(".js_review-image-url").attr("src", s),
                            d.find(".js_after_preview_img").attr("src", s), d.find(".js_js_review-box").show();
                        var e, i, t, n, a, _, p, l = $(".js_review-image-url").width() / 5 * 4;
                        e = l > $(".js_review-image-url").height() ? $(".js_review-image-url").height() / 4 * 5 : $(".js_review-image-url").width(),
                            _ = ($(".js_review-image-url").width() - e) / 2, p = ($(".js_review-image-url").height() - l) / 2,
                            i = _, t = p, n = $(".js_review-image-url").width() - _, a = $(".js_review-image-url").height() - p,
                            console.log(i, t, n, a), $(".js_review-image-url").Jcrop({
                            onChange: g,
                            onSelect: g,
                            setSelect: [i, t, n, a],
                            createHandles: ["nw", "ne", "se", "sw"],
                            aspectRatio: 1.25,
                            boxWidth: $(".js_review-image-url").width(),
                            boxHeight: $(".js_review-image-url").height(),
                            allowSelect: !1,
                            allowResize: !0,
                            shade: !0,
                            bgOpacity: .5,
                            bgColor: "black"
                        }, function () {
                            var e = this.getBounds();
                            m = e[0], f = e[1], h = this, $(".js_before_preview").hide(), $(".js_after_preview").show(),
                                console.log(h.tellSelect()), console.log(h.tellScaled());
                            var i = $(".js_after_preview").width() / h.tellSelect().w, t = $(".js_after_preview").height() / h.tellSelect().h;
                            $(".js_after_preview_img").css({
                                width: Math.round(i * m) + "px",
                                height: Math.round(t * f) + "px",
                                marginLeft: "-" + Math.round(i * h.tellSelect().x) + "px",
                                marginTop: "-" + Math.round(t * h.tellSelect().y) + "px"
                            }), $(".jcrop-handle", this.ui.selection).css({
                                width: "7px",
                                height: "7px"
                            });
                        });
                    }, a.onerror = function () {
                        p.err("图片上传失败");
                    }, a.src = s;
                }
            });
        }, v = function () {
            a.uploadCdnFile({
                container: "#js_weapp_link_image_upload",
                multi: !1,
                type: 2,
                fileSingleSizeLimit: 2097152,
                imageSize: !0,
                onComplete: function (e, i, t, n) {
                    var s = n.content;
                    d.find("[name=image]").val(s), d.find(".js_weapp_select_step4").find(".js_weapp_link_image_cover").show(),
                        d.find(".js_weapp_select_step4").find(".js_weapp_link_image_preview").css("background-image", 'url("' + s + '")');
                }
            });
        }, x = function () {
            d.find(".js_weapp_select_step1").show(), d.find(".js_weapp_select_step2").hide(),
                d.find(".js_weapp_select_step4").hide(), w.setStep(1);
            var e = d.find(".js_weapp_select_step1");
            r || e.find(".js_weapp_select_next_step").addClass("btn_disabled");
            var i = function (e) {
                if (e.find(".js_weapplink_loading").hide(), c.length) {
                    $.each(c, function (e, i) {
                        i.pic_url = i.pic_url || "http://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";
                    }), e.find(".js_weapplink_hint_select").show(), e.find(".js_weapplink_list").html(wx.T(t, {
                        list: c
                    })).show();
                    var i = e.find(".js_weapplink_item_inner").click(function () {
                        i.find(".js_weapplink_select_mask").hide(), $(this).find(".js_weapplink_select_mask").show(),
                            r = $(this).data("appid");
                        for (var t = 0; t < c.length; t++) c[t].appid === r && (o = c[t]);
                        4 == o.service_type ? d.find(".js_weapp_select_step4 .js_weapp_type4").show() : d.find(".js_weapp_select_step4 .js_weapp_type4").hide(),
                            e.find(".js_weapp_select_next_step").removeClass("btn_disabled");
                    }).each(function () {
                        r === $(this).data("appid") && $(this).find(".js_weapplink_select_mask").show();
                    });
                } else e.find(".js_weapplink_hint_none").show();
            };
            c ? i(e, l) : n.get({
                url: "/advanced/operselfmenu?action=get_bind_wxopen_info"
            }, function (t) {
                return 0 == t.base_resp.ret && t.bind_info ? (c = JSON.parse(t.bind_info).bind_list, void i(e, l)) : (n.handleRet(t, {
                    id: "64524",
                    key: "2",
                    msg: "系统繁忙"
                }), l());
            });
        }, k = function () {
            d.find(".js_weapp_select_step1").hide(), d.find(".js_weapp_select_step2").hide(),
                d.find(".js_weapp_select_step4").show(), w.setStep(2);
            var e = d.find(".js_weapp_select_step4");
            console.log(o), e.find('[name="path"]').val(o.main_page), e.find(".js_name").text(o.nick_name),
                o.image ? (e.find(".js_weapp_display_way").eq(1).click(), e.find("[name=image]").val(o.image),
                    e.find(".js_weapp_link_image_cover").show(), e.find(".js_weapp_link_image_preview").css("background-image", 'url("' + o.image + '")')) : e.find("[name=content]").val(o.content || ""),
                d.find(".js_weapp_icon").attr("src", o.pic_url), d.find(".js_weapp_name").text(o.nick_name),
                d.find(".js_weapp_card_title").text("");
        };
        d.find(".js_weapp_select_step4").find(".js_weapp_select_cover_remove").click(function () {
            d.find("[name=imageUrl]").val(""), d.find(".js_weapp_select_step4").find(".js_weapp_select_cover").hide(),
                d.find(".js_weapp_select_step4").find(".js_weapp_select_cover_preview").css("background-image", "");
        }), d.find(".js_weapp_select_step4").find(".js_weapp_select_cover").hide(), d.find(".js_weapp_select_step4").find(".js_weapp_link_image_remove").click(function () {
            d.find("[name=image]").val(""), d.find(".js_weapp_select_step4").find(".js_weapp_link_image_cover").hide(),
                d.find(".js_weapp_select_step4").find(".js_weapp_link_image_preview").css("background-image", "");
        }), d.find(".js_weapp_select_step4").find(".js_weapp_link_image_cover").hide(), d.find(".js_weapp_select_step1").find(".js_weapp_select_next_step").click(function () {
            $(this).hasClass("btn_disabled") || k();
        }), d.find("#js_weapp_card_title_input").keyup(function () {
            $(".js_weapp_card_title").text($(this).val());
        }), d.find(".js_weapp_select_step2").find(".js_weapp_select_prev_step").click(x),
            d.find(".js_weapp_select_step2").find(".js_weapp_select_next_step").click(k), d.find(".js_weapp_select_step4").find(".js_weapp_select_prev_step").click(x),
            d.find(".js_weapp_select_step4").find(".js_weapp_select_confirm").click(function () {
                var e = d.find(".js_weapp_display_way:checked").val(), i = d.find("[name=path]").val(), t = this;
                if ("card" == e) {
                    var n = d.find("[name=title]").val(), a = d.find("[name=imageUrl]").val();
                    if (!n) return p.err("标题不能为空");
                    if (n.length > 35) return p.err("标题不能多于35个字");
                    if (!a) return p.err("请上传卡片图片");
                } else if ("text" == e) {
                    var _ = $.trim(d.find("[name=content]").val());
                    if (!_) return p.err("文字内容不能为空");
                } else if ("image" == e) {
                    var c = d.find("[name=image]").val();
                    if (!c) return p.err("请上传图片");
                }
                return i || 4 == o.service_type ? 4 == o.service_type && i && !/^\?/.test(i) ? p.err("小程序路径参数请以?开头") : i.length > 1024 ? p.err("小程序路径长度不能大于1024字符") : void("card" == e ? ($(t).btn(!1),
                    s.getUrl({
                        imgurl: a,
                        x1: j.c.x / $(".js_review-image-url").width(),
                        y1: j.c.y / $(".js_review-image-url").height(),
                        x2: j.c.x2 / $(".js_review-image-url").width(),
                        y2: j.c.y2 / $(".js_review-image-url").height(),
                        onerror: function (e) {
                            $(t).btn(!0), console.error(e);
                        },
                        onsuccess: function (s) {
                            console.info(s), $(t).btn(!0), d.popup("hide"), l(o.appid || r, o, {
                                title: n,
                                description: "",
                                path: i,
                                imageUrl: s.url,
                                image: c,
                                content: _,
                                type: e
                            });
                        }
                    })) : (d.popup("hide"), l(o.appid || r, o, {
                    title: n,
                    description: "",
                    path: i,
                    imageUrl: a,
                    image: c,
                    content: _,
                    type: e
                }))) : p.err("小程序路径不能为空");
            }), d.find(".js_weapp_select_step4").find(".js_weapp_display_way").checkbox({
            multi: !1,
            onChanged: function (e) {
                var i = d.find(".js_weapp_select_step4"), t = e.val();
                i.find(".js_weapp_way").hide(), i.find(".js_weapp_" + t + "_way").show(), "image" == t ? setTimeout(function () {
                    v(), v = function () {
                    };
                }, 100) : "card" == t && setTimeout(function () {
                    u(), u = function () {
                    };
                }, 100);
            }
        }), 4 == e.step ? k() : x();
    };
    return {
        show: l
    };
});
define("common/wx/media/audioMusicDialog.js", ["tpl/media/audioMusicDialog.html.js", "tpl/media/plugin/audioItem.html.js", "tpl/media/dialog/audiomsg_layout.html.js", "common/wx/Cgi.js", "biz_common/moment.js", "common/wx/media/audio.js", "common/wx/pagebar.js", "common/wx/Tips.js"], function (e, i, a) {
    "use strict";
    var t = e("tpl/media/audioMusicDialog.html.js"), n = e("tpl/media/plugin/audioItem.html.js"), o = e("tpl/media/dialog/audiomsg_layout.html.js"), s = e("common/wx/Cgi.js"), c = e("biz_common/moment.js"), l = e("common/wx/media/audio.js"), d = e("common/wx/pagebar.js"), u = e("common/wx/Tips.js"),
        r = {
            qqsearchInfo: {},
            curSearchKey: "",
            musicLoading: !1,
            musicList: [],
            musicPerpage: 10
        }, _ = 10, m = null, f = function (e) {
            $("#audio_music_dialog_content").closest(".dialog").find(".dialog_ft .js_btn_p").eq(0).toggleClass("btn_disabled", e);
        }, h = [], g = function (e) {
            return e ? /K$/i.test(e) ? 1 * e.replace(/K$/i, "") : /M$/i.test(e) ? 1024 * e.replace(/M$/i, "") : /G$/i.test(e) ? 1024 * e.replace(/G$/i, "") * 1024 : 0 : 0;
        }, p = function (e, i, a, t, o, u) {
            f(!0), s.get({
                url: "/cgi-bin/filepage?action=select",
                dataType: "json",
                data: {
                    type: 3,
                    begin: i,
                    count: a
                },
                mask: !1
            }, function (i) {
                if (0 == i.base_resp.ret) {
                    var a = i.page_info.file_item;
                    h = [], a.each(function (e) {
                        if (1 == e.trans_state) {
                            var i = {
                                is_aac: 1 * e.accept_aac ? 1 : 0,
                                name: e.name,
                                title: e.title || e.name,
                                update_time: c.unix(e.update_time).format("YYYY-MM-DD"),
                                play_length: e.play_length,
                                file_id: e.file_id,
                                voice_encode_fileid: e.voice_encode_fileid,
                                disabled: o || t && e.play_length > 6e4,
                                format_play_length: c.unix(e.play_length / 1e3).format("mm:ss"),
                                low_size: 1 * (1 * e.voice_low_media_size / 1024).toFixed(2) || 0,
                                high_size: 1 * (1 * e.voice_high_media_size / 1024).toFixed(2) || 0,
                                source_size: g(e.size)
                            };
                            1 * i.high_size === 0 && 1 * i.source_size !== 0 && (i.high_size = i.source_size), 1 * i.low_size === 0 && 1 * i.source_size !== 0 && (i.low_size = i.source_size),
                                h.push(i);
                        }
                    });
                    var r = wx.T(n, {
                        list: h
                    });
                    e.find(".jsPluginAudioList").html(r), e.find(".jsPluginAudioRadio").checkbox(), t && $(".jsAudioTips").show(),
                        e.find(".jsPluginAudioPlay").each(function (e, i) {
                            var a = h[e];
                            return a.selector = "#" + $(i).attr("id"), a.source = "file", new l($.extend({}, a, {
                                qqmusictpl: !0
                            }));
                        }), u || new d({
                        container: ".jsPluginAudioPage",
                        totalItemsNum: i.page_info.file_cnt.voice_cnt,
                        callback: function (i) {
                            p(e, (i.currentPage - 1) * _, _, t, o, !0);
                        }
                    });
                } else s.show(i);
            });
        }, v = null, b = function (e) {
            var i = "";
            if (60 > e) i = "00:" + (10 > e ? "0" : "") + e; else {
                var a = Math.floor(e / 60), t = e - 60 * a;
                i = (10 > a ? "0" : "") + a + ":" + (10 > t ? "0" : "") + t;
            }
            return i;
        }, y = function (e) {
            e.find(".js_qqmusic_audioplay").each(function () {
                var e = 1 * $(this).data("index"), i = r.musicList[e];
                new l({
                    selector: $(this),
                    qqmusicurl: i.playurl,
                    id: i.docID,
                    qqmusictpl: !0
                });
            }), e.find(".js_audio_music_item_radio").checkbox({
                multi: !1,
                onChanged: function (e) {
                    var i = r.musicList[e.val()];
                    i && (v = {
                        musictype: i.vendor,
                        musicid: i.docID,
                        songname: i.songname,
                        singername: i.singername,
                        albumname: i.albumname || "",
                        url: i.playurl,
                        mid: 1 == i.vendor ? i.otherID : "",
                        play_length: i.duration,
                        albumurl: i.picurl,
                        albumid: i.albumID || "",
                        otherid: i.otherID,
                        jumpurlkey: i.jumpurlkey
                    });
                }
            });
        }, j = function (e) {
            e && (r.qqsearchInfo[encodeURIComponent(e)] = {
                hasReport: !1,
                hasRetData: !1,
                hasSelected: !1
            });
        }, w = function (e) {
            var i = encodeURIComponent(e);
            return r.qqsearchInfo[i] ? r.qqsearchInfo[i] : null;
        }, k = function (e) {
            var i = encodeURIComponent(e);
            r.qqsearchInfo.hasOwnProperty(i) && delete r.qqsearchInfo[i];
        }, x = function () {
            var e = r.qqsearchInfo;
            if (!m) {
                r.curSearchKey = "", r.musicLoading = !1;
                var i = [], a = 0, t = 0, n = 0;
                for (var o in e) e[o].hasReport === !0 ? delete e[o] : e[o].hasRetData === !0 && e[o].hasSelected === !0 ? (a += 1,
                    t += 1, e[o].hasReport = !0, delete e[o]) : e[o].hasRetData === !0 && e[o].hasSelected === !1 && (a += 1,
                    n += 1, e[o].hasReport = !0, delete e[o]);
                a > 0 && i.push("67292_18_" + a), t > 0 && i.push("67292_21_" + t), n > 0 && i.push("67292_23_" + n),
                i && z(i.join(";"));
            }
        }, I = function (e) {
            m && e && (r.musicLoading = !0, e.find(".js_music_loading").show(), e.find("#dialog_audio_container").hide(),
                f(!0), v = {});
        }, q = function (e) {
            m && e && (r.musicLoading = !1, e.find(".js_music_loading").hide(), e.find("#dialog_audio_container").show());
        }, C = function () {
            return r.musicLoading;
        }, z = function (e) {
            var i = new Image;
            i.src = "//mp.weixin.qq.com/mp/jsmonitor?idkey=" + e + "&t=" + Math.random();
        }, D = function (e) {
            return 500 >= e ? "67292_25_1" : e > 500 && 1e3 >= e ? "67292_27_1" : e > 1e3 && 2e3 >= e ? "67292_29_1" : e > 2e3 && 5e3 >= e ? "67292_31_1" : e > 5e3 ? "67292_33_1" : void 0;
        }, P = function (e) {
            r.musicPageBar && r.musicPageBar.destroy();
            var i = e.nextOffset;
            r.musicPageBar = new d({
                container: e.$dom.find(".js_music_pagebar"),
                perPage: r.musicPerpage,
                initShowPage: Math.floor(i / r.musicPerpage),
                totalItemsNum: e.total,
                first: !1,
                last: !1,
                isSimple: !0,
                callback: function (i) {
                    R(e.$dom, {
                        keyword: e.searchKey,
                        offset: (i.currentPage - 1) * r.musicPerpage,
                        searchId: e.searchId
                    });
                }
            });
        }, K = function (e) {
            if (!m) return void x();
            var i = "";
            0 == e.code || e.msg ? 0 != e.code || e.list && 0 != e.list.length || e.msg || (i = "暂无搜索结果") : i = "系统繁忙，请稍后再试",
                r.musicList = e.list || [];
            for (var a = 0, t = r.musicList.length; t > a; a++) {
                var n = r.musicList[a];
                n.duration_str = b(n.duration), n.singername = ($("<div>").html(n.singername).html() || "").html(!1),
                    n.songname = ($("<div>").html(n.songname).html() || "").html(!1), n.albumname = ($("<div>").html(n.albumname).html() || "").html(!1),
                n.albumname && (n.singername = n.singername + " - " + n.albumname), n.vendor_str = 1 * n.vendor == 2 ? "酷狗音乐" : "QQ音乐";
            }
            v = {}, e.$dom.find("#dialog_audio_container").html(wx.T(o, {
                list: r.musicList,
                msg: i
            })), 0 == e.code && r.musicList.length > 0 && (y(e.$dom), P({
                $dom: e.$dom,
                total: e.total,
                nextOffset: e.nextOffset,
                searchKey: e.searchKey,
                searchId: e.searchId
            }));
        }, R = function (e, i) {
            if (!C()) {
                I(e);
                var a = i.keyword || "";
                r.curSearchKey = a, w(a) || j(a);
                var t = +new Date;
                s.get({
                    url: "/cgi-bin/searchmpmusic?",
                    dataType: "json",
                    data: {
                        query: a,
                        offset: i.offset || 0,
                        size: r.musicPerpage,
                        search_id: i.searchId || ""
                    }
                }, {
                    done: function (i) {
                        q(e);
                        var n = new Date - t, o = "67292_13_1;67292_14_1;" + D(n), s = w(a);
                        if (s.hasReport === !1 && (i && i.base_resp && 0 == i.base_resp.ret && i.count > 0 ? s.hasRetData = !0 : (s.hasRetData = !1,
                            s.hasReport = !0, o += ";67292_18_1;67292_19_1", k(a))), z(o), i && i.base_resp && 0 == i.base_resp.ret) K({
                            code: 0,
                            list: i.items || [],
                            total: 1 * i.total_count,
                            nextOffset: i.offset,
                            searchKey: a,
                            $dom: e,
                            searchId: i.search_id
                        }); else {
                            var c = "";
                            i && i.base_resp && 200013 == i.base_resp.ret && (c = "操作太频繁，请稍后再试"), K({
                                msg: c,
                                code: -1,
                                searchKey: a,
                                $dom: e
                            });
                        }
                    },
                    fail: function () {
                        q(e), r.curSearchKey = "";
                        var i = new Date - t, n = "67292_13_1;67292_16_1;" + D(i);
                        z(n), K({
                            code: -1,
                            searchKey: a,
                            $dom: e
                        });
                    }
                });
            }
        }, L = {
            show: function (e) {
                if (!m) {
                    var i = wx.T(t, e);
                    m = $(i).popup({
                        className: "align_edge audio_dialog js_audio_music_dialog",
                        width: "960",
                        title: "选择音频",
                        buttons: [{
                            text: "确定",
                            click: function () {
                                var i = this, t = L.getCurrentValue();
                                if (t) {
                                    var n = a.closest(".js_audio_music_dialog").find(".js_btn_p").eq(0);
                                    if (n.hasClass("btn_loading")) return;
                                    if (n.btn(0), "audio" === t.type) e.onOK && e.onOK.call(m, t), m = null, x(), i.remove(); else {
                                        if (r.curSearchKey) {
                                            var o = w(r.curSearchKey);
                                            o && o.hasReport === !1 && o.hasRetData === !0 && (o.hasSelected = !0);
                                        }
                                        e.onOK && e.onOK.call(m, t), m = null, x(), i.remove();
                                    }
                                } else u.err("请选择需要插入的语音或音乐");
                            },
                            type: "primary"
                        }, {
                            text: "取消",
                            click: function () {
                                m = null, x(), this.remove(), e.onCancel && e.onCancel.call(m);
                            }
                        }],
                        onHide: function () {
                            m = null, x(), this.remove(), e.onCancel && e.onCancel.call(m);
                        }
                    });
                    var a = $("#audio_music_dialog_content");
                    if (f(!0), a.on("change", "input.js_audio_music_item_radio", function () {
                        f(!1);
                    }), e.allowAudio && (a.find(".jsPluginAudioNew").click(function () {
                        window.open(wx.url("/cgi-bin/operate_voice?oper=voice_get&t=media/audio_add"), "_blank");
                    }), p(a, 0, _, e.hasAudioLengthLimit, e.audioDisabled)), e.allowMusic) {
                        v = {};
                        var n = a.find("#searchDiv");
                        n.find("#keyInput").keydown(function (e) {
                            var i = "which" in e ? e.which : e.keyCode;
                            13 == i && n.find("#searchBt").trigger("click");
                        }), n.find("#searchCloseBt").click(function () {
                            n.find("#keyInput").val(""), r.curSearchKey = "", a.find("#dialog_audio_container").html(""),
                                q(a), v = {}, f(!0);
                        }), n.find("#searchBt").click(function () {
                            var e = n.find("#keyInput").val();
                            e.length > 0 ? R(a, {
                                keyword: e,
                                offset: 0
                            }) : u.err("请输入搜索条件");
                        }), n.find("#reload").click(function () {
                            n.find("#searchCloseBt").trigger("click");
                        });
                    }
                    a.find(".js_audio_tab_btn").click(L.selectAudio), a.find(".js_music_tab_btn").click(L.selectMusic),
                        e.allowAudio ? L.selectAudio() : e.allowMusic && L.selectMusic();
                }
            },
            selectAudio: function () {
                var e = $("#audio_music_dialog_content");
                e.find(".js_audio_block").show(), e.find(".js_music_block").hide(), e.find(".js_audio_tab_btn").addClass("selected"),
                    e.find(".js_music_tab_btn").removeClass("selected"), f(!L.getCurrentValue());
            },
            selectMusic: function () {
                var e = $("#audio_music_dialog_content");
                e.find(".js_music_block").show(), e.find(".js_audio_block").hide(), e.find(".js_music_tab_btn").addClass("selected"),
                    e.find(".js_audio_tab_btn").removeClass("selected"), f(!L.getCurrentValue());
            },
            getCurrentValue: function () {
                var e = $("#audio_music_dialog_content");
                if (e.find(".js_audio_tab_btn").hasClass("selected")) {
                    var i = e.find(".jsPluginAudioRadio[checked=checked]").data("index"), a = h[i];
                    if (!a) return;
                    return a = {
                        type: "audio",
                        is_aac: a.is_aac,
                        name: a.name,
                        title: a.title,
                        update_time: a.update_time,
                        play_length: a.play_length,
                        file_id: a.file_id,
                        voice_encode_fileid: a.voice_encode_fileid,
                        duration: a.format_play_length,
                        format_play_length: a.format_play_length,
                        low_size: a.low_size,
                        high_size: a.high_size,
                        source_size: a.source_size
                    };
                }
                if (e.find(".js_music_tab_btn").hasClass("selected")) {
                    if ("undefined" == typeof v.musicid) return;
                    return v.type = "music", v;
                }
            }
        };
    a.exports = L;
});
define("common/wx/media/templateListDialog.js", ["common/wx/popup.js", "media/template_common.js", "common/wx/Tips.js", "common/wx/Cgi.js", "tpl/media/templateListDialog.html.js", "tpl/media/templateListContent.html.js", "common/wx/pagebar.js"], function (t) {
    "use strict";

    function e(t) {
        this._o = {
            token: "",
            onSuccess: function () {
            }
        }, this._g = {
            perPage: 4,
            dom: {}
        }, this._extend(t), this.initDialog();
    }

    t("common/wx/popup.js");
    var o = t("media/template_common.js"), i = t("common/wx/Tips.js"), a = (t("common/wx/Cgi.js"),
        t("tpl/media/templateListDialog.html.js")), n = t("tpl/media/templateListContent.html.js"), s = t("common/wx/pagebar.js");
    return e.prototype = {
        _extend: function (t) {
            if (t) for (var e in t) this._o[e] = t[e];
        },
        initDialog: function () {
            var t = this, e = this._o, o = this._g, n = o.dom;
            document.body.style.overflow = document.documentElement.style.overflow = "hidden", n.$dialog = $(wx.T(a, {
                token: e.token || ""
            })).popup({
                width: 680,
                title: "图文模版",
                autoShow: !0,
                className: "align_edge weui-desktop-appmsg-dialog appmsg_tmpl_select_dialog",
                buttons: [{
                    text: "添加到正文",
                    type: "primary",
                    classWrap: "js_save_btn",
                    click: function () {
                        if (!o.selectedId) return void i.err("请选择图文模版");
                        var a = t.getSelectData();
                        e.onSuccess({
                            content: a ? a.content : ""
                        }), t.destory(this);
                    }
                }, {
                    text: "取消",
                    type: "default",
                    click: function () {
                        t.destory(this);
                    }
                }],
                onHide: function () {
                    t.destory(this);
                }
            }), n.$js_loading = n.$dialog.find(".js_loading"), n.$js_content = n.$dialog.find(".js_content"),
                n.$js_pagebar = n.$dialog.find(".js_pagebar"), this.getList({
                page: 0
            });
        },
        showLoading: function () {
            var t = this._g, e = t.dom;
            t.gettingData = !0, e.$js_loading.show(), e.$js_content.hide(), e.$js_pagebar.hide();
        },
        checkDialogAlive: function () {
            var t = this._g.dom;
            return t && t.$dialog ? !0 : !1;
        },
        hideLoading: function () {
            var t = this._g, e = t.dom;
            t.gettingData = !1, e.$js_loading.hide();
        },
        checkAccLoading: function () {
            return this._g.gettingData;
        },
        getList: function (t) {
            var e = this, i = this._g;
            e.checkAccLoading() !== !0 && (e.showLoading(), o.getTemplateList({
                page: t.page,
                perPage: i.perPage,
                callback: function (t) {
                    e.checkDialogAlive() && (e.hideLoading(), e.renderContent(t));
                }
            }));
        },
        getSelectData: function () {
            var t = this._g;
            if (!t.selectedId) return null;
            for (var e = 0, o = t.curData.length; o > e; e++) {
                var i = t.curData[e];
                if (i.appmsgid == t.selectedId) return i;
            }
            return null;
        },
        renderContent: function (t) {
            var e = this._g, i = e.dom;
            i && i.$dialog && (0 == t.code || t.msg ? 0 != t.code || t.list && 0 != t.list.length || t.msg || (t.msg = "暂无数据") : t.msg = "系统繁忙，请稍后再试",
                e.curData = t.list || [], e.selectedId = void 0, o.formatTemplateData(e.curData, {
                canPreview: !1,
                showUpdateTime: !0,
                showEdit: !1,
                highLine: !1
            }), i.$js_content.html(template.compile(n)({
                list: e.curData,
                msg: t.msg
            })).show(), i.$js_loading.hide(), 0 == t.code && t.total > 0 && "undefined" != typeof t.page ? (this.initPageBar({
                curPage: t.page + 1,
                total: t.total
            }), i.$js_content.on("click", ".js_appmsg", function () {
                var t = $(this);
                e.selectedId = t.data("id"), i.$js_content.find(".js_appmsg").removeClass("selected"),
                    t.addClass("selected");
            })) : i.$js_pagebar.hide(), i.$dialog.popup("resetPosition"));
        },
        initPageBar: function (t) {
            var e = this, o = this._g, i = o.dom;
            o.myPagebar && o.myPagebar.destroy(), o.myPagebar = new s({
                container: i.$js_pagebar,
                perPage: o.perPage,
                initShowPage: t.curPage,
                totalItemsNum: t.total,
                first: !1,
                last: !1,
                isSimple: !0,
                callback: function (t) {
                    e.getList({
                        page: 1 * t.currentPage - 1
                    });
                }
            });
        },
        destory: function (t) {
            t && t.remove(), document.body.style.overflow = document.documentElement.style.overflow = "auto",
                this._g.dom = null;
        }
    }, e;
});
define("biz_web/lib/store.js", ["biz_web/lib/json.js"], function (e, t, r) {
    function n() {
        try {
            return f in window && window[f];
        } catch (e) {
            return !1;
        }
    }

    function i(e) {
        return function () {
            var t = Array.prototype.slice.call(arguments, 0);
            t.unshift(a), d.appendChild(a), a.addBehavior("#default#userData"), a.load(f);
            var r = e.apply(u, t);
            return d.removeChild(a), r;
        };
    }

    function o(e) {
        return e.replace(b, "___");
    }

    var a, c = e("biz_web/lib/json.js"), u = {}, l = window.document, f = "localStorage", s = "__storejs__";
    if (u.disabled = !1, u.set = function () {
    }, u.get = function () {
    }, u.remove = function () {
    }, u.clear = function () {
    },
        u.transact = function (e, t, r) {
            var n = u.get(e);
            null == r && (r = t, t = null), "undefined" == typeof n && (n = t || {}), r(n), u.set(e, n);
        }, u.getAll = function () {
    }, u.serialize = function (e) {
        return c.stringify2(e);
    }, u.deserialize = function (e) {
        if ("string" != typeof e) return void 0;
        try {
            return c.parse(e);
        } catch (t) {
            return e || void 0;
        }
    }, n()) a = window[f], u.set = function (e, t, r) {
        if (void 0 === t) return u.remove(e);
        try {
            a.setItem(e, u.serialize(t));
        } catch (n) {
            a.clear();
            try {
                a.setItem(e, u.serialize(t));
            } catch (i) {
                "function" == typeof r && r(i);
            }
        }
        return t;
    }, u.get = function (e, t) {
        try {
            return u.deserialize(a.getItem(e));
        } catch (r) {
            return void("function" == typeof t && t(r));
        }
    }, u.remove = function (e, t) {
        try {
            a.removeItem(e);
        } catch (r) {
            "function" == typeof t && t(r);
        }
    }, u.clear = function (e) {
        try {
            a.clear();
        } catch (t) {
            "function" == typeof e && e(t);
        }
    }, u.getAll = function () {
        for (var e = {}, t = 0; t < a.length; ++t) {
            var r = a.key(t);
            e[r] = u.get(r);
        }
        return e;
    }; else if (l.documentElement.addBehavior) {
        var d, m;
        try {
            m = new ActiveXObject("htmlfile"), m.open(), m.write('<script>document.w=window</script><iframe src="/favicon.ico"></iframe>'),
                m.close(), d = m.w.frames[0].document, a = d.createElement("div");
        } catch (v) {
            a = l.createElement("div"), d = l.body;
        }
        var b = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
        u.set = i(function (e, t, r) {
            return t = o(t), void 0 === r ? u.remove(t) : (e.setAttribute(t, u.serialize(r)), e.save(f),
                r);
        }), u.get = i(function (e, t) {
            return t = o(t), u.deserialize(e.getAttribute(t));
        }), u.remove = i(function (e, t) {
            t = o(t), e.removeAttribute(t), e.save(f);
        }), u.clear = i(function (e) {
            var t = e.XMLDocument.documentElement.attributes;
            e.load(f);
            for (var r, n = 0; r = t[n]; n++) e.removeAttribute(r.name);
            e.save(f);
        }), u.getAll = i(function (e) {
            for (var t, r = e.XMLDocument.documentElement.attributes, n = {}, i = 0; t = r[i]; ++i) {
                var a = o(t.name);
                n[t.name] = u.deserialize(e.getAttribute(a));
            }
            return n;
        });
    }
    try {
        u.set(s, s), u.get(s) != s && (u.disabled = !0), u.remove(s);
    } catch (v) {
        u.disabled = !0;
    }
    u.isLocalStorageNameSupported = n, u.enabled = !u.disabled, r.exports = u;
});
define("tpl/mpEditor/plugin/product_popup_icon.html.js", [], function () {
    return '{each list as item}\n<span data-color="{item}" class="js_color_icon product-color__item" style="background-color: {item}"></span>\n{/each}';
});
define("tpl/mpEditor/plugin/product_popup.html.js", [], function () {
    return '<div class="js_product_popup edui_mask_edit_group with_line edui-product-popup">\n    <div class="js_template primary edui_mask_edit_meta no_extra edui-clickable" onclick="$$._fireEventAndHide(\'show_product_template_dialog\',this);">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_product_theme"></i>\n        选择模板        </div>\n    </div>\n	<div class="js_toggle primary edui_mask_edit_meta edui-clickable" onclick="$$._fireEvent(\'toggle_product_color\',arguments[0]||event,this);">\n        <div class="js_toggle edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_product_color"></i>\n        选择配色        </div>\n        <div class="js_color_picker product-color" style="display: none;">\n            <div class="product-color__list" onclick="$$._fireEvent(\'product_color_pick\',arguments[0]||event,this);">\n                {=colorList}\n            </div>\n            <div>\n                <span class="frm_input_box">\n                    <input type="text" class="js_color_input frm_input" placeholder="请输入色值，如#666666" onkeyup="$$._fireEvent(\'product_color_change\',arguments[0]||event,this);">\n                </span>\n            </div>\n            <p class="js_fail frm_msg fail" style="display: none;">\n                <span class="js_fail_msg frm_msg_content" style="display: inline;"></span>\n            </p>\n            <div class="product-color__description">一篇文章中只能使用一种自定义颜色，对所有默认模板生效</div>\n            <div class="product-color__opr"><a href="javascript:;" onclick="$$._fireEvent(\'product_color_change\',arguments[0]||event,this);return false;" class="btn btn_primary">确定</a></div>\n        </div>\n    </div>\n</div>\n';
});