define("tpl/vote/vote_table.html.js", [], function () {
    return '\n<div class="">\n    <div class="mini_tips weak_text img_water_tips r">只可以选择已发布且在有效期内的投票，若投票未发布，请在<a href="javascript:;" class="js_manage_vote">投票管理</a>发布投票\n        <a class=" btn btn_default js_new_vote" target="_blank">新建投票</a>\n    </div>\n	<div class="table_wrp with_border">\n		<table class="table" cellspacing="0">\n			<thead class="thead">\n				<tr>\n					<th class="table_cell vote_check">&nbsp;</th>\n					<th class="table_cell vote_title tl"><div class="td_panel">投票名称</div></th>\n					<th class="table_cell vote_time tl"><div class="td_panel">截至时间</div></th>\n					<th class="table_cell vote_num"><div class="td_panel">投票人数</div></th>\n				</tr>\n			</thead>\n			<tbody class="tbody">\n            {if loading}\n                <tr>\n                    <td class="empty_tips" colspan="4"><i class="icon_loading_small white">loading...</i></td>\n                </tr>\n            {else}\n                {if !data.super_vote_info.length}\n                    <tr>\n                        <td class="empty_tips" colspan="4">暂无有效投票</td>\n                    </tr>\n                {else}\n                {each data.super_vote_info as vote i}\n                    <!--Begin 现在的-->\n                    <tr id="js_ct_tr_{vote.super_vote_id}">\n                        <td class="table_cell" colspan="4">\n                            <label class="frm_radio_label">\n                                <span class="td_panel vote_check">\n                                    <i class="icon_radio"></i>\n                                </span>\n                                <input type="radio" data-id="{vote.super_vote_id}" data-biz="{biz}" value="{vote.super_vote_id}" class="frm_radio js_select" data-height="{vote.height}">\n\n                                <span class="td_panel vote_title">\n                                    <a target="_blank" href="/cgi-bin/newoperatevote?action=show&supervoteid={vote.super_vote_id}{token}">{vote.title}</a>\n                                </span>\n                                <span class="td_panel vote_time">\n                                    {datestring vote.expire_time*1000}\n                                </span>\n                                <span class="td_panel vote_num">\n                                    {vote.person_count}\n                                </span>\n                            </label>\n                        </td>\n                    </tr>\n                    <!--End 现在的-->\n\n                    <!--Begin 原来的-->\n                    <!--<tr id="js_ct_tr_{vote.super_vote_id}">\n                        <td class="table_cell vote_check">\n                            <div class="td_panel">\n                                <label class="frm_radio_label">\n                                    <i class="icon_radio"></i>\n                                    <input type="radio" data-id="{vote.super_vote_id}" data-biz="{biz}" value="{vote.super_vote_id}" class="frm_radio js_select" data-height="{vote.height}">\n                                </label>\n                            </div>\n                        </td>\n                        <td class="table_cell vote_title"><div class="td_panel"><a target="_blank" href="/cgi-bin/newoperatevote?action=show&supervoteid={vote.super_vote_id}{token}">{vote.title}</a></div></td>\n                        <td class="table_cell vote_time"><div class="td_panel">{datestring vote.expire_time*1000}</div></td>\n                        <td class="table_cell vote_num"><div class="td_panel">{vote.person_count}</div></td>\n                    </tr>-->\n                    <!--End 原来的-->\n                {/each}\n                {/if}\n            {/if}\n			</tbody>\n		</table>\n		<div class="js_pager"></div>\n	</div>\n</div>\n';
});
define("tpl/pagebar.html.js", [], function () {
    return '<div class="pagination">\n    <span class="page_nav_area">\n        <a href="javascript:void(0);" class="btn page_first">{firstButtonText}</a>\n        <a href="javascript:void(0);" class="btn page_prev"><i class="arrow"></i></a>\n        {if isSimple}\n            <span class="page_num">\n                <label>{initShowPage}</label>\n                <span class="num_gap">/</span>\n                <label>{endPage}</label>\n            </span>\n        {else}\n            {each startRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav">{pageIndex}</a>\n            {/each}\n            <span class="gap_prev">...</span>\n            {each midRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav js_mid">{pageIndex}</a>\n            {/each}\n            <span class="gap_next">...</span>\n            {each endRange as pageIndex index}\n            <a href="javascript:void(0);" class="btn page_nav">{pageIndex}</a>\n            {/each}\n        {/if}\n        <a href="javascript:void(0);" class="btn page_next"><i class="arrow"></i></a>\n        <a href="javascript:void(0);" class="btn page_last">{lastButtonText}</a>            \n    </span>\n    {if (endPage>1)}\n    <span class="goto_area">\n        <input type="text">\n        <a href="javascript:void(0);" class="btn page_go">跳转</a>\n    </span>\n    {/if}\n</div>\n';
});
define("original/tpl/whitelist_search.html.js", [], function () {
    return '{each list as item}\n<div class="search_user_item tj_item js_search_item {if (item.status == 2 || item .status == 3)}disabled{/if}" data-openid="{item.openid}">\n    <img class="search_user_thumb" src="{item.pic_url}" alt="">\n    <div class="search_user_info">\n        <strong class="search_user_nickname js_nickname">{item.nickname}</strong>\n        <p class="search_user_desc js_wx_name">{item.wx_name}</p>\n    </div>\n    <!-- 3自己 2是已添加 -->\n    {if (item.status == 2)}\n    <div class="card_mask_global wording_container">\n        已添加过该账号    </div>\n    {else if (item.status == 3)}\n    <div class="card_mask_global wording_container">\n        不能添加本账号    </div>\n    {else}\n    <div class="card_mask_global">\n        <i class="icon_card_selected_global"></i>\n    </div>\n    {/if}\n</div>\n{/each}';
});
define("original/tpl/whitelist_record.html.js", [], function () {
    return '<label class="frm_checkbox_label tj_item js_record_item {selected ? \'selected\' : \'\'}" data-openid="{openid}">\n    <i class="icon_checkbox"></i>\n    <span class="lbl_content">{nickname}</span>\n    <input type="checkbox" class="frm_checkbox js_record_checkbox">\n</label>&nbsp;\n';
});
define("original/tpl/whitelist.html.js", [], function () {
    return '<div class="account_panel">\n    <div class="account_area search_account_area">\n        <div class="account_area_hd">请输入公众号的昵称或微信号</div>\n        <div class="account_area_bd">\n            <span class="frm_input_box search append">\n                <a href="javascript:;" class="frm_input_append js_btn_search"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input value="" name="query" type="text" class="frm_input js_input_search valid" placeholder="">\n            </span>\n            <div class="frm_msg fail js_search_fail">搜索失败提示</div>\n            <p class="empty_tips js_search_msg">暂无记录</p>\n            <div class="search_user_list js_search_list"></div>\n        </div>\n    </div>\n    <div class="account_area history_account_area">\n        <div class="account_area_hd"><span>添加记录</span><a href="javascript:;" class="global_link_opr js_select_all" style="display: none;">全选</a></div>\n        <div class="account_area_bd js_record_list"><p class="empty_tips js_empty">暂无记录</p></div>\n    </div>\n</div>\n';
});
define("original/whitepop.js", ["original/tpl/whitepop.html.js", "common/wx/popover.js"], function (o) {
    "use strict";

    function e(o) {
        var e = this;
        e.opt = $.extend(!0, {}, p, o);
        var n = e.opt.dom;
        n.html(template.compile(i)({
            showAllowRe: !1,
            showModify: !1,
            showHideSor: !1
        })), n.find(".js_popinput").checkbox({
            multi: !0,
            onChanged: function () {
                if (this.values().length > 0 || e.opt.showAllowRe) {
                    var o = this.values(), i = o.indexOf("md") > -1 ? "1" : "0", p = Number(i) && o.indexOf("hs") > -1 ? "1" : "0";
                    if (!Number(i)) return n.find(".js_popinput").eq(1).checkbox("disabled", !0), n.find(".js_popinput").eq(1).checkbox("checked", !1),
                        void e.opt.bad();
                    n.find(".js_popinput").eq(1).checkbox("disabled", !1), e.opt.done({
                        can_modify: i,
                        can_hide_source: p
                    });
                } else 0 == this.values().length ? (n.find(".js_popinput").eq(1).checkbox("disabled", !0),
                    n.find(".js_popinput").eq(1).checkbox("checked", !1), e.opt.bad()) : e.opt.bad();
            }
        }), n.find(".js_popinput").eq(1).checkbox("disabled", !0);
    }

    var i = o("original/tpl/whitepop.html.js"), p = (o("common/wx/popover.js"), {
        dom: null,
        showAllowRe: !1,
        done: $.noop,
        bad: $.noop
    });
    return e;
});
define("original/MultiStepDialog.js", ["common/wx/Step.js", "common/wx/popup.js", "original/tpl/MultiStepDialog.html.js"], function (t) {
    "use strict";

    function n(t) {
        var n = this;
        n.opt = $.extend(!0, {}, s, t), n.stepCount = 0, n.currentStep = 0, n.btnsConfig = [], n.btnCountMap = {
            0: 0
        }, n.steps = [], n.initer = [], n.dialog = null, n.$dialog = null, n.$step = null, n.$stepDom = [],
            n.$btns = [];
    }

    var e = t("common/wx/Step.js"), o = (t("common/wx/popup.js"), t("original/tpl/MultiStepDialog.html.js")), s = {
        title: "",
        className: ""
    };
    return n.prototype = {
        register: function (t) {
            var n = this;
            n.steps.push(t.stepName || "Step" + (n.stepCount + 1));
            for (var e = t.buttons.length, o = 0; e > o; o++) n.btnsConfig.push(t.buttons[o]);
            return n.btnCountMap[n.stepCount + 1] = n.btnCountMap[n.stepCount] + e, n.initer.push(t.init),
                n.stepCount++, n;
        },
        show: function () {
            for (var t = this, n = [], s = 0, i = t.btnsConfig.length; i > s; s++) {
                var r = {}, p = t.btnsConfig[s];
                for (var u in p) p.hasOwnProperty(u) && "click" != u && (r[u] = p[u]);
                r.click = function (n) {
                    return function () {
                        n && n.call(t);
                    };
                }(p.click), n.push(r), t.$btns.push({
                    click: p.click
                });
            }
            var a = template.compile(o)({
                steps: t.steps
            });
            t.dialog = $(a).popup({
                title: t.opt.title,
                className: t.opt.className,
                onShow: function () {
                    t.$dialog = this;
                },
                close: function () {
                    this.remove();
                },
                buttons: n
            });
            for (var l = [], s = 0; s < t.stepCount; s++) l.push(s + 1 + " " + t.steps[s]), t.$stepDom.push(t.dialog.find(".js_step" + s));
            t.$step = l.length > 1 ? new e({
                container: t.dialog.find(".js_process"),
                selected: 1,
                names: l
            }) : null;
            var c = t.dialog.find(".js_btn_p");
            c.hide();
            for (var s = 0, i = t.$btns.length; i > s; s++) t.$btns[s].dom = c.eq(s), s < t.btnCountMap[1] && t.$btns[s].dom.show();
            return t.initer[0](t.$stepDom[0]), t.$stepDom[0].data("inited", !0), t.$dialog.resetPosition(),
                t;
        },
        next: function () {
            var t = this;
            if (t.stepCount > t.currentStep + 1) {
                t.$step.go(t.currentStep + 2), t.$stepDom[t.currentStep].hide(), t.$stepDom[t.currentStep + 1].show();
                for (var n = 0, e = t.$btns.length; e > n; n++) n >= t.btnCountMap[t.currentStep + 1] && n < t.btnCountMap[t.currentStep + 2] ? t.$btns[n].dom.show() : t.$btns[n].dom.hide();
                t.$stepDom[t.currentStep + 1].data("inited") || (t.initer[t.currentStep + 1](t.$stepDom[t.currentStep + 1]),
                    t.$stepDom[t.currentStep + 1].data("inited", !0), t.$dialog.resetPosition()), t.currentStep++;
            }
            return this;
        },
        pre: function () {
            var t = this;
            if (t.currentStep > 0) {
                t.$step.go(t.currentStep), t.$stepDom[t.currentStep].hide(), t.$stepDom[t.currentStep - 1].show();
                for (var n = 0, e = t.$btns.length; e > n; n++) n >= t.btnCountMap[t.currentStep - 1] && n < t.btnCountMap[t.currentStep] ? t.$btns[n].dom.show() : t.$btns[n].dom.hide();
                t.currentStep--;
            }
            return this;
        },
        enableBtn: function (t, n) {
            var e = this, o = e.btnCountMap[t] + n;
            return e.$btns[o].dom.removeClass("btn_disabled").addClass("btn_primary"), e;
        },
        disableBtn: function (t, n) {
            var e = this, o = e.btnCountMap[t] + n;
            return e.$btns[o].dom.removeClass("btn_primary").addClass("btn_disabled"), e;
        },
        hide: function () {
            return this.$dialog && this.$dialog.hide(), !1;
        },
        remove: function () {
            this.dialog && (this.dialog.popup("remove"), this.dialog = null);
        }
    }, n;
});
define("common/qq/events.js", [], function (t, n, a) {
    "use strict";

    function i(t) {
        this.data = t === !0 ? window.wx.events || {} : {};
    }

    i.prototype = {
        on: function (t, n) {
            return this.data[t] = this.data[t] || [], this.data[t].push(n), this;
        },
        off: function (t, n) {
            return this.data[t] && this.data[t].length > 0 && (n && "function" == typeof n ? $.each(this.data[t], function (a, i) {
                i === n && this.data[t].splice(a, 1);
            }) : this.data[t] = []), this;
        },
        trigger: function (t) {
            var n = arguments;
            return this.data[t] && this.data[t].length > 0 && $.each(this.data[t], function (t, a) {
                var i = a.apply(this, Array.prototype.slice.call(n, 1));
                return i === !1 ? !1 : void 0;
            }), this;
        }
    }, a.exports = function (t) {
        return new i(t);
    };
});
define("common/lib/MockJax.js", [], function () {
    !function (e) {
        function t(t) {
            void 0 == window.DOMParser && window.ActiveXObject && (DOMParser = function () {
            }, DOMParser.prototype.parseFromString = function (e) {
                var t = new ActiveXObject("Microsoft.XMLDOM");
                return t.async = "false", t.loadXML(e), t;
            });
            try {
                var n = (new DOMParser).parseFromString(t, "text/xml");
                if (!e.isXMLDoc(n)) throw"Unable to parse XML";
                var s = e("parsererror", n);
                if (1 == s.length) throw"Error: " + e(n).text();
                return n;
            } catch (o) {
                var r = void 0 == o.name ? o : o.name + ": " + o.message;
                return void e(document).trigger("xmlParseError", [r]);
            }
        }

        function n(t, n, s) {
            (t.context ? e(t.context) : e.event).trigger(n, s);
        }

        function s(t, n) {
            var o = !0;
            return "string" == typeof n ? e.isFunction(t.test) ? t.test(n) : t == n : (e.each(t, function (r) {
                return void 0 === n[r] ? o = !1 : void(o = "object" == typeof n[r] ? o && s(t[r], n[r]) : e.isFunction(t[r].test) ? o && t[r].test(n[r]) : o && t[r] == n[r]);
            }), o);
        }

        function o(t, n) {
            if (e.isFunction(t)) return t(n);
            if (e.isFunction(t.url.test)) {
                if (!t.url.test(n.url)) return null;
            } else {
                var o = t.url.indexOf("*");
                if (t.url !== n.url && -1 === o || !new RegExp(t.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace(/\*/g, ".+")).test(n.url)) return null;
            }
            return t.data && n.data && !s(t.data, n.data) ? null : t && t.type && t.type.toLowerCase() != n.type.toLowerCase() ? null : t;
        }

        function r(n, s, o) {
            var r = function (r) {
                return function () {
                    return function () {
                        var r;
                        this.status = n.status, this.statusText = n.statusText, this.readyState = 4, e.isFunction(n.response) && n.response(o),
                            "json" == s.dataType && "object" == typeof n.responseText ? this.responseText = JSON.stringify(n.responseText) : "xml" == s.dataType ? "string" == typeof n.responseXML ? (this.responseXML = t(n.responseXML),
                                this.responseText = n.responseXML) : this.responseXML = n.responseXML : this.responseText = n.responseText,
                        ("number" == typeof n.status || "string" == typeof n.status) && (this.status = n.status), "string" == typeof n.statusText && (this.statusText = n.statusText),
                            r = this.onreadystatechange || this.onload, e.isFunction(r) ? (n.isTimeout && (this.status = -1),
                            r.call(this, n.isTimeout ? "timeout" : void 0)) : n.isTimeout && (this.status = -1);
                    }.apply(r);
                };
            }(this);
            n.proxy ? g({
                global: !1,
                url: n.proxy,
                type: n.proxyType,
                data: n.data,
                dataType: "script" === s.dataType ? "text/plain" : s.dataType,
                complete: function (e) {
                    n.responseXML = e.responseXML, n.responseText = e.responseText, n.status = e.status, n.statusText = e.statusText,
                        this.responseTimer = setTimeout(r, n.responseTime || 0);
                }
            }) : s.async === !1 ? r() : this.responseTimer = setTimeout(r, n.responseTime || 50);
        }

        function a(t, n, s, o) {
            return t = e.extend(!0, {}, e.mockjaxSettings, t), "undefined" == typeof t.headers && (t.headers = {}),
            t.contentType && (t.headers["content-type"] = t.contentType), {
                status: t.status,
                statusText: t.statusText,
                readyState: 1,
                open: function () {
                },
                send: function () {
                    o.fired = !0, r.call(this, t, n, s);
                },
                abort: function () {
                    clearTimeout(this.responseTimer);
                },
                setRequestHeader: function (e, n) {
                    t.headers[e] = n;
                },
                getResponseHeader: function (e) {
                    return t.headers && t.headers[e] ? t.headers[e] : "last-modified" == e.toLowerCase() ? t.lastModified || (new Date).toString() : "etag" == e.toLowerCase() ? t.etag || "" : "content-type" == e.toLowerCase() ? t.contentType || "text/plain" : void 0;
                },
                getAllResponseHeaders: function () {
                    var n = "";
                    return e.each(t.headers, function (e, t) {
                        n += e + ": " + t + "\n";
                    }), n;
                }
            };
        }

        function i(e, t, n) {
            if (u(e), e.dataType = "json", e.data && T.test(e.data) || T.test(e.url)) {
                c(e, t, n);
                var s = /^(\w+:)?\/\/([^\/?#]+)/, o = s.exec(e.url), r = o && (o[1] && o[1] !== location.protocol || o[2] !== location.host);
                if (e.dataType = "script", "GET" === e.type.toUpperCase() && r) {
                    var a = l(e, t, n);
                    return a ? a : !0;
                }
            }
            return null;
        }

        function u(e) {
            "GET" === e.type.toUpperCase() ? T.test(e.url) || (e.url += (/\?/.test(e.url) ? "&" : "?") + (e.jsonp || "callback") + "=?") : e.data && T.test(e.data) || (e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?");
        }

        function l(t, n, s) {
            var o = s && s.context || t, r = null;
            return n.response && e.isFunction(n.response) ? n.response(s) : e.globalEval("object" == typeof n.responseText ? "(" + JSON.stringify(n.responseText) + ")" : "(" + n.responseText + ")"),
                p(t, o, n), d(t, o, n), e.Deferred && (r = new e.Deferred, "object" == typeof n.responseText ? r.resolveWith(o, [n.responseText]) : r.resolveWith(o, [e.parseJSON(n.responseText)])),
                r;
        }

        function c(e, t, n) {
            var s = n && n.context || e, o = e.jsonpCallback || "jsonp" + m++;
            e.data && (e.data = (e.data + "").replace(T, "=" + o + "$1")), e.url = e.url.replace(T, "=" + o + "$1"),
                window[o] = window[o] || function (n) {
                    data = n, p(e, s, t), d(e, s, t), window[o] = void 0;
                    try {
                        delete window[o];
                    } catch (r) {
                    }
                    head && head.removeChild(script);
                };
        }

        function p(e, t, s) {
            e.success && e.success.call(t, s.responseText || "", status, {}), e.global && n(e, "ajaxSuccess", [{}, e]);
        }

        function d(t, s) {
            t.complete && t.complete.call(s, {}, status), t.global && n("ajaxComplete", [{}, t]), t.global && !--e.active && e.event.trigger("ajaxStop");
        }

        function f(t, n) {
            var s, r, u;
            "object" == typeof t ? (n = t, t = void 0) : n.url = t, r = e.extend(!0, {}, e.ajaxSettings, n);
            for (var l = 0; l < h.length; l++) if (h[l] && (u = o(h[l], r))) return y.push(r), e.mockjaxSettings.log(u, r),
                "jsonp" === r.dataType && (s = i(r, u, n)) ? s : (u.cache = r.cache, u.timeout = r.timeout, u.global = r.global,
                    x(u, n), function (t, n, o, r) {
                    s = g.call(e, e.extend(!0, {}, o, {
                        xhr: function () {
                            return a(t, n, o, r);
                        }
                    }));
                }(u, r, n, h[l]), s);
            return g.apply(e, [n]);
        }

        function x(e, t) {
            if (e.url instanceof RegExp && e.hasOwnProperty("urlParams")) {
                var n = e.url.exec(t.url);
                if (1 !== n.length) {
                    n.shift();
                    var s = 0, o = n.length, r = e.urlParams.length, a = Math.min(o, r), i = {};
                    for (s; a > s; s++) {
                        var u = e.urlParams[s];
                        i[u] = n[s];
                    }
                    t.urlParams = i;
                }
            }
        }

        var g = e.ajax, h = [], y = [], T = /=\?(&|$)/, m = (new Date).getTime();
        e.extend({
            ajax: f
        }), e.mockjaxSettings = {
            log: function (t, n) {
                if (t.logging !== !1 && ("undefined" != typeof t.logging || e.mockjaxSettings.logging !== !1) && window.console && console.log) {
                    var s = "MOCK " + n.type.toUpperCase() + ": " + n.url, o = e.extend({}, n);
                    if ("function" == typeof console.log) console.log(s, o); else try {
                        console.log(s + " " + JSON.stringify(o));
                    } catch (r) {
                        console.log(s);
                    }
                }
            },
            logging: !0,
            status: 200,
            statusText: "OK",
            responseTime: 500,
            isTimeout: !1,
            contentType: "text/plain",
            response: "",
            responseText: "",
            responseXML: "",
            proxy: "",
            proxyType: "GET",
            lastModified: null,
            etag: "",
            headers: {
                etag: "IJF@H#@923uf8023hFO@I#H#",
                "content-type": "text/plain"
            }
        }, e.mockjax = function (e) {
            var t = h.length;
            return h[t] = e, t;
        }, e.mockjaxClear = function (e) {
            1 == arguments.length ? h[e] = null : h = [], y = [];
        }, e.mockjax.handler = function (e) {
            return 1 == arguments.length ? h[e] : void 0;
        }, e.mockjax.mockedAjaxCalls = function () {
            return y;
        };
    }(jQuery);
});
define("common/wx/cgiReport.js", ["common/wx/Tips.js"], function (e, a) {
    "use strict";
    var r = e("common/wx/Tips.js");
    a.error = function (e, a, t) {
        t.responseText = t.responseText || "";
        var s = -1 !== location.href.indexOf("/cgi-bin/home") && (-1 !== a.url.indexOf("/misc/safeassistant") || -1 !== a.url.indexOf("/safe/safeuuid")), n = 11;
        switch (e) {
            case"timeout":
                n = 7;
                break;

            case"error":
                n = 8;
                break;

            case"notmodified":
                n = 9;
                break;

            case"parsererror":
                n = 10;
        }
        a.data.lang && delete a.data.lang, a.data.random && delete a.data.random, a.data.f && delete a.data.f,
        a.data.ajax && delete a.data.ajax, a.data.token && delete a.data.token, n += s ? 100 : 0, $.ajax({
            url: "/misc/jslog?1=1",
            data: {
                content: "[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}] [text={responseText}] [headers={headers}] [status={status}]".format({
                    uin: wx.data.uin,
                    useragent: window.navigator.userAgent,
                    page: location.href,
                    url: a.url,
                    param: $.param(a.data).substr(0, 50),
                    info: e,
                    responseText: t.responseText.substr(0, 500),
                    headers: (t.getAllResponseHeaders() || "").replace(/\s/g, ""),
                    status: t.status
                }),
                id: n,
                level: "error"
            },
            type: "POST"
        }), $.ajax({
            url: "/misc/jslog?1=1",
            data: {
                content: "[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}]".format({
                    uin: wx.data.uin,
                    useragent: window.navigator.userAgent,
                    page: location.href,
                    url: a.url,
                    param: $.param(a.data).substr(0, 50),
                    info: e
                }),
                id: 6 + (s ? 100 : 0),
                level: "error"
            },
            type: "POST"
        }), "timeout" == e && r.err("你的网络环境较差，请稍后重试");
    };
});
define("common/qq/mask.js", ["biz_web/lib/spin.js"], function (s, i) {
    "use strict";

    function n(s) {
        if (this.mask) this.mask.show(); else {
            var i = "body";
            s && s.parent && (i = $(s.parent)), this.mask = $(t).appendTo(i), this.mask.id = "wxMask_" + ++e,
                this.mask.spin("flower");
        }
        if (s) {
            if (s.spin === !1) return this;
            this.mask.spin(s.spin || "flower");
        }
        return this;
    }

    s("biz_web/lib/spin.js");
    var e = 0, t = '<div class="mask"></div>';
    n.prototype = {
        show: function () {
            this.mask.show();
        },
        hide: function () {
            this.mask.hide();
        },
        remove: function () {
            this.mask.remove();
        }
    }, i.show = function (s) {
        return new n(s);
    }, i.hide = function () {
        $(".mask").hide();
    }, i.remove = function () {
        $(".mask").remove();
    };
});
define("tpl/ban/page_msg.html.js", [], function () {
    return '<div class="page_msg mini ban_page_msg">\n    <div class="inner group">\n        <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>\n        <div class="msg_content">{=content}</div>\n    </div>\n</div>';
});
define("tpl/ban/highlight_box.html.js", [], function () {
    return '<div class="highlight_box icon_wrap icon_small border ban_highlight_box" id="div_stop">\n    <span class="icon lock"></span>\n    <h4 class="title">{title}</h4>\n    <p class="desc">{=desc}</p>\n</div>';
});
define("tpl/media/imgsDialogByUrls.html.js", [], function () {
    return '<div>\n  <div class="js_step_wrp processor_wrp"></div>\n  <div class="img_crop_panel">\n    <div class="js_step1 appmsg_conent_img_container">\n        {if (!urls || urls.length <= 0)}\n        <div class="page_msg large simple default">\n            <div class="inner">\n                <span class="msg_icon_wrp"><i class="icon_msg info"></i></span>\n                <div class="msg_content">\n                    <h4>正文中无可用做封面的图片</h4>\n                    <p>封面图片必须为正文中使用过的图片，图片尺寸需大于200*200px，请在正文中插入图文后再选择封面图片</p>\n                </div>\n            </div>\n        </div>\n        {else}\n        <div class="appmsg_content_img_hd">\n            <!--\n            <a id="js_imagedialog" href="javascript:void(0);" onclick="return false;" class="btn btn_upload">从图片库选择</a>\n            -->\n            <p class="appmsg_content_img_desc">请从正文使用过的图片中选择封面<span class="appmsg_content_img_tips">尺寸小于200*200的图片已被自动过滤</span></p>\n        </div>\n        <ul class="appmsg_content_img_list">\n            {each urls as a}\n            <li style="display:none;" data-src=\'{a.url}\' class="appmsg_content_img_item {if !!a.isRemote}loading_item{/if} js_imgItem">\n                <span class="appmsg_content_img cover js_imgItemSrc" {if !!a.isRemote&&!!a.uid}data-remoteid="{a.uid}"{/if} style="background-image: url();"></span>\n               <!--  <img class="appmsg_content_img js_imgItemSrc" onload="window.__titleImgLoaded(this);" {if !!a.isRemote&&!!a.uid}data-remoteid="{a.uid}"{/if} src="{a.url}" alt=""> -->\n                <div class="card_mask_global apmsg_content_img_mask">\n                    <i class="icon_card_selected_global"></i>\n                </div>\n                <!-- 如果图片还不能添加 -->\n                {if !!a.isRemote}\n                <div class="js_title_img_mask card_mask_global apmsg_content_loading_mask">\n                    <i class="icon32_loading dark"></i>\n                    <span class="vm_box"></span>\n                </div>\n                {/if}\n            </li>\n            {/each}\n        </ul>\n        {/if}\n    </div>\n    <div class="js_step2" style="display:none;">\n    </div>\n  </div>\n</div>\n';
});