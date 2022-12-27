define("tpl/media/preview/card.html.js", [], function () {
    return '<div class="wx_phone_hd">\n    {nickName}\n</div>\n<div class="wx_phone_bd wx_phone_preview_card_wrp" > \n{if list}\n<div class="msg_card wx_phone_preview_multi_card {if (list[0].img)}has_first_cover{/if}">\n        <div class="msg_card_inner">\n            <div class="card_cover_appmsg_item jsPhoneViewCard" data-index="0">\n                {if (list[0].img)}\n                <div class="card_cover_appmsg_inner" style="background-image:url(\'{list[0].img}\');">\n                    <!--<img class="card_cover_thumb" src="">-->\n                </div>\n                {/if}\n                <strong class="card_cover_title" title="{list[0].title}">{list[0].title}</strong>\n                {if (!list[0].img && list[0].digest)}\n                <div class="msg_card_cover_desc" title="{list[0].digest}">{list[0].digest}</div>\n                {/if}\n            </div>\n            {each list as d i }\n            <div class="card_appmsg_item {if i==0}dn{/if} jsPhoneViewCard" data-index="{i}">\n                {if d.img}<img class="card_appmsg_thumb" src="{d.img}">{/if}\n                <div class="card_appmsg_content" title="{d.title}">{d.title}</div>\n            </div>\n            {/each}\n        </div>\n    </div>\n{else}\n    <div class="msg_card wx_phone_preview_card jsPhoneViewCard" data-index="0">\n        <div class="msg_card_inner">\n            <div class="msg_card_bd">\n                <h4 class="msg_card_title" title="{title}">{title}</h4>\n                <div class="msg_card_info">\n                    {date}\n                </div>\n                {if img}\n                <div class="msg_card_extra_info" style="background-image:url(\'{img}\');">\n                    <!--<img class="appmsg_thumb" src="">-->\n                </div>\n                {/if}\n                <div class="msg_card_desc" title="{digest}">{digest}</div>\n            </div>\n            <div class="msg_card_ft">\n                <i class="icon_arrow_default"></i>\n                阅读原文            </div>\n        </div>\n    </div>\n{/if}\n</div>\n<!--pulgin-->\n<div>\n    <ul class="wx_view_list">\n        <li class="wx_view_item jsPhoneViewLink selected" data-id="card">图文消息</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="appmsg">消息正文</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="moments">分享到朋友圈</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="chat">发送给朋友</li>\n    </ul>\n    <div class="btn_wx_phone_preview_wrp">\n        <a class="btn btn_default btn_wx_phone_preview jsPhoneViewPub">发送到手机预览</a>\n    </div>\n</div>\n\n\n\n\n\n\n';
});
define("tpl/media/preview/appmsg.html.js", [], function () {
    return '<div class="wx_phone_hd">\n    {data.nickName}\n</div>\n<div class="wx_phone_bd">\n    <div class="wx_phone_preview_appmsg appmsg_wap">\n        <div class="rich_media">\n            <div class="rich_media_area_primary">\n                {if data.is_share_copyright*1==1}\n                <div class="flex_context account_info">\n                    <div class="flex_hd">\n                        <span class="radius_avatar account_avatar">\n                            <img class="account_avatar" src="{data.avatar}" alt="{data.nickName}">\n                        </span>\n                    </div>\n                    <div class="flex_bd">\n                        <div class="account_nickname">\n                            <strong class="account_nickname_inner">{data.nickName}</strong>\n                        </div>\n                        <div class="account_desc">\n                            <div class="account_desc_inner">\n                                <span>{data.time}</span>\n                                分享                            </div>\n                        </div>\n                    </div>\n                </div>\n                {else}\n                <h2 class="rich_media_title" title="{data.title}">{data.title}</h2>\n                <div class="rich_media_meta_list">\n                    <!-- <span class="rich_media_meta meta_original_tag dn">原创</span>\n                    <a class="rich_media_meta meta_enterprise_tag" href="javascript:;"><img src="{data.img}"></a> -->\n                    <em class="rich_media_meta rich_media_meta_text">{data.time}</em>\n                    <em class="rich_media_meta rich_media_meta_text">{data.author}</em>\n                    <span class="rich_media_meta rich_media_meta_link" title="请发送到手机查看完整效果">{data.nickName}</span>\n                </div>\n                {if (data.show_cover==1 && data.img)}\n                <div class="rich_media_thumb_wrp">\n                    <img src="{data.img}" class="rich_media_thumb" onerror="this.parentNode.removeChild(this)"/>\n                </div>\n                {/if}\n                {/if}              \n                <div class="rich_media_content">\n                    {if data.is_share_copyright*1==1}\n                    {=data.guide_words.html(true).replace(/\\r/g,"").replace(/\\n/g,"<br>").replace(/\\s/g,"&nbsp;")}\n                    {else}\n                    {=data.content}\n                    {/if}\n                </div>\n                {if data.is_share_copyright*1==1}\n                <div class="rich_media_origin_preview">\n                    <div class="original_panel" lang="en">\n                        <div class="flex_context original_account">\n                            <div class="flex_hd">\n                                <span class="radius_avatar original_account_avatar">\n                                    <img class="account_avatar" src="{data.copyright_headimg}" alt="{data.copyright_nickname}">\n                                </span>\n                            </div>\n                            <div class="flex_bd">\n                                <div class="original_account_nickname">{data.copyright_nickname}</div>\n                            </div>\n                        </div>\n                        <div class="original_panel_title">\n                            {data.title}\n                            <span class="icon_original_tag_primary">原创</span>\n                        </div>\n                        <div class="original_panel_content">\n                            {=data.content}\n                        </div>\n                        <div class="original_panel_tool">\n                            <a target="_blank" href="{data.share_copyright_url}">阅读全文</a>\n                        </div>\n                    </div>\n                </div>\n                {/if}\n                {if data.ad_info && data.ad_info.ad_id}\n                <div class="rich_media_mpda">\n                    <div class="mpda_box">\n                        <div class="mpda_desc tips_global"></div>\n                        <div class="mpda_content">\n                            <div class="mpda_wrp">\n                                <div class="mpda_area show">\n                                    <div class="mpda_placeholder">\n                                        <p class="mpda_tips">广告，也是生活的一部分</p>\n                                    </div>\n                                    <div class="mpda_inner">\n                                        <div class="mpda_hd">\n                                            <span class="mpda_main_img img_bg_cover" id="" style="background-image:url({data.ad_info.ad_img})"></span> \n                                        </div>\n                                        <div class="mpda_bd"> \n                                            <span class="mpda_logo img_bg_cover" style="background-image:url({data.ad_info.img})"></span>\n                                            <div class="mpda_desc_box" id="">\n                                                <p class="mpda_title">{data.ad_info.nick_name}</p>\n                                                <p class="mpda_details">提供的广告</p>\n                                            </div>\n                                            <a class="mpda_btn_more">\n                                                {if data.ad_info.pt == 108||data.ad_info.pt==116}\n                                                查看详情                                                {else if data.ad_info.pt == 109}\n                                                下载应用                                                {else if data.ad_info.pt == 110 || data.ad_info.pt==117}\n                                                了解公众号                                                {/if}\n                                            </a>\n                                            <a class="mpda_btn_about" href="javascript:void(0);">关于赞助广告</a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                {/if}\n                {if data.sourceurl}\n                <div class="rich_media_tool">\n                    <a class="media_tool_meta meta_primary" href="{data.sourceurl}" target="_blank">阅读原文</a>\n                </div>\n                {/if}\n            </div>\n        </div>\n    </div>\n</div>\n<!--wx_phone_bd-->\n<!--pulgin-->\n<div>\n    <ul class="wx_view_list">\n        <li class="wx_view_item jsPhoneViewLink" data-id="card">图文消息</li>\n        <li class="wx_view_item jsPhoneViewLink selected" data-id="appmsg">消息正文</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="moments">分享到朋友圈</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="chat">发送给朋友</li>\n    </ul>\n    {if length>1}\n    <ul class="wx_article_crtl">        \n        <li class="crtl_btn crtl_pre_btn {if (index-1)<0}disabled{/if} jsPhoneViewCard" data-index="{index-1}">上一篇</li>        \n        <li class="crtl_btn crtl_next_btn {if (index+1)>=length}disabled{/if} jsPhoneViewCard" data-index="{index+1}">下一篇</li>\n    </ul>\n    {/if}\n    <div class="btn_wx_phone_preview_wrp">\n        <a class="btn btn_default btn_wx_phone_preview jsPhoneViewPub">发送到手机预览</a>\n    </div>\n</div>\n\n';
});
define("common/wx/phoneView.js", ["tpl/media/preview/layout.html.js", "widget/wx_phone_preview/wx_phone_preview.css"], function (t, e) {
    "use strict";

    function i(t) {
        var e = t.html.split("<!--pulgin-->")[0], i = t.html.split("<!--pulgin-->")[1], p = template.compile(n)({
            content: e,
            plugin: i
        });
        this.$dom = $(template.compile(p)(t.data)).appendTo("body"), o(), t.todo && "function" == typeof t.todo && t.todo.apply(this, [t.data, t.html]);
        var l = this;
        this.$dom.find(".jsPhoneViewClose").click(function () {
            l.remove();
        });
    }

    function o() {
        $("img").each(function () {
            $(this).data("src") && $(this).attr("src", $(this).data("src"));
        });
    }

    {
        var n = t("tpl/media/preview/layout.html.js");
        t("widget/wx_phone_preview/wx_phone_preview.css");
    }
    return i.prototype.hide = function () {
        this.$dom.hide();
    }, i.prototype.remove = function () {
        this.$dom.remove();
    }, i.prototype.render = function (t, e) {
        var i = t.split("<!--pulgin-->")[0], o = t.split("<!--pulgin-->")[1];
        this.$dom.find(".jsPhoneViewMain").html(template.compile(i)(e)), this.$dom.find(".jsPhoneViewMain").on("click", "a.weapp_text_link,a.weapp_image_link", function () {
            return alert("将在微信端打开小程序"), !1;
        }), o && this.$dom.find(".jsPhoneViewPlugin").html(template.compile(o)(e)).show();
    }, e.module = i;
});
!function (n) {
    "use strict";

    function t(n, t) {
        var r = (65535 & n) + (65535 & t), u = (n >> 16) + (t >> 16) + (r >> 16);
        return u << 16 | 65535 & r;
    }

    function r(n, t) {
        return n << t | n >>> 32 - t;
    }

    function u(n, u, e, o, c, f) {
        return t(r(t(t(u, n), t(o, f)), c), e);
    }

    function e(n, t, r, e, o, c, f) {
        return u(t & r | ~t & e, n, t, o, c, f);
    }

    function o(n, t, r, e, o, c, f) {
        return u(t & e | r & ~e, n, t, o, c, f);
    }

    function c(n, t, r, e, o, c, f) {
        return u(t ^ r ^ e, n, t, o, c, f);
    }

    function f(n, t, r, e, o, c, f) {
        return u(r ^ (t | ~e), n, t, o, c, f);
    }

    function i(n, r) {
        n[r >> 5] |= 128 << r % 32, n[(r + 64 >>> 9 << 4) + 14] = r;
        var u, i, h, a, g, l = 1732584193, d = -271733879, v = -1732584194, C = 271733878;
        for (u = 0; u < n.length; u += 16) i = l, h = d, a = v, g = C, l = e(l, d, v, C, n[u], 7, -680876936), C = e(C, l, d, v, n[u + 1], 12, -389564586),
            v = e(v, C, l, d, n[u + 2], 17, 606105819), d = e(d, v, C, l, n[u + 3], 22, -1044525330), l = e(l, d, v, C, n[u + 4], 7, -176418897),
            C = e(C, l, d, v, n[u + 5], 12, 1200080426), v = e(v, C, l, d, n[u + 6], 17, -1473231341), d = e(d, v, C, l, n[u + 7], 22, -45705983),
            l = e(l, d, v, C, n[u + 8], 7, 1770035416), C = e(C, l, d, v, n[u + 9], 12, -1958414417), v = e(v, C, l, d, n[u + 10], 17, -42063),
            d = e(d, v, C, l, n[u + 11], 22, -1990404162), l = e(l, d, v, C, n[u + 12], 7, 1804603682), C = e(C, l, d, v, n[u + 13], 12, -40341101),
            v = e(v, C, l, d, n[u + 14], 17, -1502002290), d = e(d, v, C, l, n[u + 15], 22, 1236535329), l = o(l, d, v, C, n[u + 1], 5, -165796510),
            C = o(C, l, d, v, n[u + 6], 9, -1069501632), v = o(v, C, l, d, n[u + 11], 14, 643717713), d = o(d, v, C, l, n[u], 20, -373897302),
            l = o(l, d, v, C, n[u + 5], 5, -701558691), C = o(C, l, d, v, n[u + 10], 9, 38016083), v = o(v, C, l, d, n[u + 15], 14, -660478335),
            d = o(d, v, C, l, n[u + 4], 20, -405537848), l = o(l, d, v, C, n[u + 9], 5, 568446438), C = o(C, l, d, v, n[u + 14], 9, -1019803690),
            v = o(v, C, l, d, n[u + 3], 14, -187363961), d = o(d, v, C, l, n[u + 8], 20, 1163531501), l = o(l, d, v, C, n[u + 13], 5, -1444681467),
            C = o(C, l, d, v, n[u + 2], 9, -51403784), v = o(v, C, l, d, n[u + 7], 14, 1735328473), d = o(d, v, C, l, n[u + 12], 20, -1926607734),
            l = c(l, d, v, C, n[u + 5], 4, -378558), C = c(C, l, d, v, n[u + 8], 11, -2022574463), v = c(v, C, l, d, n[u + 11], 16, 1839030562),
            d = c(d, v, C, l, n[u + 14], 23, -35309556), l = c(l, d, v, C, n[u + 1], 4, -1530992060), C = c(C, l, d, v, n[u + 4], 11, 1272893353),
            v = c(v, C, l, d, n[u + 7], 16, -155497632), d = c(d, v, C, l, n[u + 10], 23, -1094730640), l = c(l, d, v, C, n[u + 13], 4, 681279174),
            C = c(C, l, d, v, n[u], 11, -358537222), v = c(v, C, l, d, n[u + 3], 16, -722521979), d = c(d, v, C, l, n[u + 6], 23, 76029189),
            l = c(l, d, v, C, n[u + 9], 4, -640364487), C = c(C, l, d, v, n[u + 12], 11, -421815835), v = c(v, C, l, d, n[u + 15], 16, 530742520),
            d = c(d, v, C, l, n[u + 2], 23, -995338651), l = f(l, d, v, C, n[u], 6, -198630844), C = f(C, l, d, v, n[u + 7], 10, 1126891415),
            v = f(v, C, l, d, n[u + 14], 15, -1416354905), d = f(d, v, C, l, n[u + 5], 21, -57434055), l = f(l, d, v, C, n[u + 12], 6, 1700485571),
            C = f(C, l, d, v, n[u + 3], 10, -1894986606), v = f(v, C, l, d, n[u + 10], 15, -1051523), d = f(d, v, C, l, n[u + 1], 21, -2054922799),
            l = f(l, d, v, C, n[u + 8], 6, 1873313359), C = f(C, l, d, v, n[u + 15], 10, -30611744), v = f(v, C, l, d, n[u + 6], 15, -1560198380),
            d = f(d, v, C, l, n[u + 13], 21, 1309151649), l = f(l, d, v, C, n[u + 4], 6, -145523070), C = f(C, l, d, v, n[u + 11], 10, -1120210379),
            v = f(v, C, l, d, n[u + 2], 15, 718787259), d = f(d, v, C, l, n[u + 9], 21, -343485551), l = t(l, i), d = t(d, h),
            v = t(v, a), C = t(C, g);
        return [l, d, v, C];
    }

    function h(n) {
        var t, r = "";
        for (t = 0; t < 32 * n.length; t += 8) r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255);
        return r;
    }

    function a(n) {
        var t, r = [];
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
        for (t = 0; t < 8 * n.length; t += 8) r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
        return r;
    }

    function g(n) {
        return h(i(a(n), 8 * n.length));
    }

    function l(n, t) {
        var r, u, e = a(n), o = [], c = [];
        for (o[15] = c[15] = void 0, e.length > 16 && (e = i(e, 8 * n.length)), r = 0; 16 > r; r += 1) o[r] = 909522486 ^ e[r],
            c[r] = 1549556828 ^ e[r];
        return u = i(o.concat(a(t)), 512 + 8 * t.length), h(i(c.concat(u), 640));
    }

    function d(n) {
        var t, r, u = "0123456789abcdef", e = "";
        for (r = 0; r < n.length; r += 1) t = n.charCodeAt(r), e += u.charAt(t >>> 4 & 15) + u.charAt(15 & t);
        return e;
    }

    function v(n) {
        return unescape(encodeURIComponent(n));
    }

    function C(n) {
        return g(v(n));
    }

    function s(n) {
        return d(C(n));
    }

    function A(n, t) {
        return l(v(n), v(t));
    }

    function m(n, t) {
        return d(A(n, t));
    }

    n.md5 = function (n, t, r) {
        return t ? r ? A(t, n) : m(t, n) : r ? C(n) : s(n);
    };
}("function" == typeof jQuery ? jQuery : this);
define("resp_types/file_cnt.rt.js", [], function () {
    "use strict";
    return {
        file_cnt_R: {
            total: "number",
            img_cnt: "number",
            voice_cnt: "number",
            video_cnt: "number",
            app_msg_cnt: "number",
            commondity_msg_cnt: "number",
            video_msg_cnt: "number",
            short_video_cnt: "number",
            app_msg_sent_cnt: "number"
        }
    };
});
define("resp_types/base_resp.rt.js", [], function () {
    "use strict";
    return {
        base_resp_R: {
            ret_R: "number",
            err_msg: "string"
        }
    };
});
define("tpl/media/keyword_dialog.html.js", [], function () {
    return '<div class="keywords_dialog">\n    <div class="msg_area">\n        <div class="icon_area">\n            <i class="icon_msg info"></i>\n        </div>\n        <div class="text_area">\n            <h4 class="keyword_tips_title">{=title}</h4>\n            <p class="keyword_tips_desc">{=desc}</p>\n        </div>\n    </div>\n    <div class="keyword_list">\n        {each words as w}\n        <span class="match_keyword">{w}</span>\n        {/each}\n    </div>\n    <div class="keyword_choose">\n        <div class="weui-desktop-form__control-group weui-desktop-form__control-group_offset">\n            <div class="weui-desktop-form__controls">\n                <label class="weui-desktop-form__check-label">\n                <input type="radio" class="weui-desktop-form__radio js_checkbox" value="1">\n                <i class="weui-desktop-icon-radio"></i>\n                <span class="weui-desktop-form__check-content">\n                    关键词打码<br>\n                    <span class="keyword_choose_desc">图文消息中命中内容将被替换为"*****"。你可以继续保存或修改此内容。</span>\n                </span>\n                </label>\n            </div>\n        </div>\n        <div class="weui-desktop-form__control-group weui-desktop-form__control-group_offset">\n            <div class="weui-desktop-form__controls">\n                <label class="weui-desktop-form__check-label">\n                <input type="radio" class="weui-desktop-form__radio js_checkbox" value="0">\n                <i class="weui-desktop-icon-radio"></i>\n                <span class="weui-desktop-form__check-content">\n                    继续保存或发布该图文消息<br>\n                    <span class="keyword_choose_desc">将不会替换图文消息中的命中内容，发出后将可能因此被屏蔽、删除。</span>\n                </span>\n                </label>\n            </div>\n        </div>\n    </div>\n</div>';
});
define("tpl/media/sharecopyright_item.html.js", [], function () {
    return '{each data as item index}\n<label class="share_article_item frm_radio_label">\n    <i class="icon_radio"></i>\n    <span class="lbl_content">\n        <div class="flex_context original_account">\n            <div class="flex_hd">\n                <span class="radius_avatar original_account_avatar">\n                    <img class="account_avatar" src="{item.head_img_url}" alt="{item.nickname}">\n                </span>\n            </div>\n            <div class="flex_bd">\n                <div class="original_account_nickname">{item.nickname}</div>\n            </div>\n        </div>\n        <div class="original_panel_title">\n            {item.title}\n        </div>\n        <div class="original_panel_tool">\n            <a target="_blank" href="{item.url}">阅读全文</a>\n        </div>\n    </span>\n    <input type="radio" name="ori_article_item" data-index="{index}" class="frm_radio">\n</label>\n{/each}\n';
});
define("tpl/media/sharecopyright_dialog.html.js", [], function () {
    return '<div class="share_appmsg_dialog">\n    <div class="frm_control_group share_appmsg_search_form">\n        <label for="" class="frm_label">\n            查找文章        </label>\n        <div class="frm_controls">\n            <div class="search_wrapper">\n                <span class="frm_input_box search with_del append ">\n                    <a class="del_btn js_search_del" href="javascript:" style="display: none;">\n                        <i class="icon_search_del"></i>&nbsp;\n                    </a>\n                    <a href="javascript:void(0);" class="js_search_btn frm_input_append">\n                        <i class="icon16_common search_gray">\n                            搜索                        </i>\n                        &nbsp;\n                    </a>\n                    <input type="text" class="js_search_input frm_input" placeholder="输入原创文章链接/标题/关键字，按回车查找">\n                </span>\n            </div>\n            <p class="frm_tips mini_tips icon_after">只能分享成功声明原创的文章链接<span class="js_tooltips" data-tips=\'原创特指自己写的、独立完成创作的作品。公众平台鼓励用户发表原创文章，平台会对原创声明的文章在群发后进行审核，审核通过后文章会被标识为原创文章。\'><i class="icon_msg_mini ask"></i></span></p>\n            <p class="js_tips_main frm_msg fail">\n                <span class="js_search_tips frm_msg_content"></span>\n            </p>\n        </div>\n    </div>\n\n    <div class="share_article_area">\n        <div style="display:none;" class="share_article_loading js_loading">\n            <i class="icon_loading_small white"></i>\n            <span class="vm_box"></span>\n        </div>\n        <div class="js_article_content share_article_list"></div>\n    </div>\n    <div class="pagination_wrp js_pagebar"></div>\n</div>\n';
});
define("tpl/media/appmsg_edit/previewDialog.html.js", [], function () {
    return '<div class="js_preview_dialog_content simple_dialog_content send_preview">\n    <div class="preview_form_box">\n        <form class="form"  onSubmit="return false;">\n            <div class="frm_control_group">\n                <label class="frm_label">关注公众号后，才能接收图文消息预览</label>\n                <span class="frm_input_box">\n                    <input type="text" class="frm_input jsAccountInput" placeholder="请输入微信号/QQ号/手机号"/>\n                </span>\n                <p class="frm_tips">预览功能仅用于公众号查看文章效果，不适用于公众传播，预览链接会在短期内失效                </p>\n                <p class="frm_msg fail jsAccountFail" style="display:none"></p>\n            </div>\n            {if accounts.length>0}\n            <div class="user_list jsAccountList">\n            {each accounts as o i}\n                <div class="user jsAccount" data-value="{o}">\n                    {o}\n                    <a href="javascript:;" class="opt jsAccountDel" data-index="{i}">x</a>\n                </div>\n            {/each}\n            </div>\n            {/if}\n        </form>\n    </div>\n    <div class="preview_qrcheck_box">\n        <img class="preview_qrcheck_img" src="/misc/getqrcode?fakeid={uin}&token={token}&style=1">\n        <p>扫描关注{nickname}</p>\n    </div>\n</div>';
});
define("tpl/mpEditor/plugin/crop_img.html.js", [], function () {
    return '<div class="js_crop_img_wrap img_edit_area" style="position:absolute">\n  <div class="js_crop_area img_edit_wrp" style="overflow:hidden;">\n    <div class="js_img_scale_cover" style="position:absolute;background-color: #fff;" draggable="false">\n    </div>\n    <img src="{url}">\n    <div class="js_img_scale edui-editor-imagescale img_edit_scale" draggable="false" style="display:block;z-index:500;">\n      <span draggable="false" class="edui-editor-imagescale-hand0"></span>\n      <span draggable="false" class="edui-editor-imagescale-hand2"></span>\n      <span draggable="false" class="edui-editor-imagescale-hand5"></span>\n      <span draggable="false" class="edui-editor-imagescale-hand7"></span>\n    </div>\n  </div>\n  <div class="js_tool_bar img_edit_toolbar" style="z-index:{zIndex}">    \n    <div class="weui-slider-box">\n      <div class="weui-slider">\n        <div class="js_drag_bar weui-slider__inner">\n          <div style="width: 0%;" class="js_progress weui-slider__track"></div>\n          <div style="left: 0%;" class="js_dot weui-slider__handler__wrp">\n            <div class="weui-slider__handler"></div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <a class="js_ok btn btn_primary" href="javascript:;">完成</a>\n    <a class="js_cancel btn btn_default" href="javascript:;">放弃裁剪</a>\n  </div>\n</div>\n';
});
define("common/wx/mpEditor/plugin/wheelEventAdapter.js", [], function () {
    "use strict";

    function e() {
        if (r.isIe) {
            var e = window.navigator.userAgent.toLowerCase(), t = e.match(/(?:msie\s([\w.]+))/), o = e.match(/(?:trident.*rv:([\w.]+))/), n = 0;
            n = t && o && t[1] && o[1] ? Math.max(1 * t[1], 1 * o[1]) : t && t[1] ? 1 * t[1] : o && o[1] ? 1 * o[1] : 0, r.ieVersion = n;
        }
        try {
            return new WheelEvent("wheel"), void(r.support = "wheel");
        } catch (i) {
        }
        if (void 0 !== document.onmousewheel) return void(r.support = "mousewheel");
        try {
            return document.createEvent("MouseScrollEvents"), void(r.support = "DOMMouseScroll");
        } catch (i) {
        }
    }

    function t(e) {
        var t = {
            myDeltaY: void 0,
            myWheel: void 0
        };
        return e = e || window.event, "deltaY" in e ? (t.myDeltaY = e.deltaY, t.myWheel = e.deltaY / Math.abs(e.deltaY),
            t) : "wheelDelta" in e ? (t.myWheel = -1 * e.wheelDelta / Math.abs(e.wheelDelta), (window.opera && opera.version() < 10 || r.isIe && r.ieVersion <= 9) && (t.myWheel = -1 * e.myWheel),
            t) : "detail" in e ? (t.myWheel = -1 * e.detail / Math.abs(e.detail), t) : t;
    }

    var r = {
        support: "",
        isIe: /(msie\s|trident.*rv:)([\w.]+)/.test(window.navigator.userAgent.toLowerCase()),
        ieVersion: 0
    };
    return e(), {
        supportEvent: r.support,
        eventAdapter: t
    };
});
define("common/wx/mpEditor/zh_CN.js", ["common/wx/mpEditor/editor_all_min.js"], function (e) {
    "use strict";
    e("common/wx/mpEditor/editor_all_min.js"), UE.I18N.zh_CN = {
        labelMap: {
            anchor: "锚点",
            undo: "撤销",
            redo: "重做",
            bold: "加粗",
            indent: "首行缩进",
            snapscreen: "截图",
            italic: "斜体",
            underline: "下划线",
            strikethrough: "删除线",
            subscript: "下标",
            fontborder: "字符边框",
            superscript: "上标",
            formatmatch: "格式刷",
            source: "源代码",
            blockquote: "引用",
            pasteplain: "纯文本粘贴模式",
            selectall: "全选",
            print: "打印",
            preview: "预览",
            horizontal: "分隔线",
            removeformat: "清除格式",
            time: "时间",
            date: "日期",
            insertrow: "前插入行",
            insertcol: "前插入列",
            mergeright: "右合并单元格",
            mergedown: "下合并单元格",
            deleterow: "删除行",
            deletecol: "删除列",
            splittorows: "拆分成行",
            splittocols: "拆分成列",
            splittocells: "完全拆分单元格",
            mergecells: "合并多个单元格",
            deletetable: "删除表格",
            cleardoc: "清空文档",
            insertparagraphbeforetable: "表格前插入行",
            insertcode: "代码语言",
            fontfamily: "字体",
            fontsize: "字号 10~36px",
            letterspacing: "字间距",
            justifyindent: "两端缩进",
            paragraph: "段落格式",
            edittable: "表格属性",
            edittd: "单元格属性",
            emotion: "表情",
            spechars: "特殊字符",
            searchreplace: "查询替换",
            map: "Baidu地图",
            gmap: "Google地图",
            insertvideo: "视频",
            help: "帮助",
            justifyleft: "居左对齐",
            justifyright: "居右对齐",
            justifycenter: "居中对齐",
            justifyjustify: "两端对齐",
            forecolor: "字体颜色",
            backcolor: "背景色",
            insertorderedlist: "有序列表",
            insertunorderedlist: "无序列表",
            fullscreen: "全屏",
            directionalityltr: "从左向右输入",
            directionalityrtl: "从右向左输入",
            rowspacingtop: "段前距",
            rowspacingbottom: "段后距",
            highlightcode: "插入代码",
            pagebreak: "分页",
            insertframe: "插入Iframe",
            imagenone: "默认",
            imageleft: "左浮动",
            imageright: "右浮动",
            attachment: "附件",
            imagecenter: "居中",
            wordimage: "图片转存",
            lineheight: "行间距",
            edittip: "编辑提示",
            customstyle: "自定义标题",
            autotypeset: "自动排版",
            webapp: "百度应用",
            touppercase: "字母大写",
            tolowercase: "字母小写",
            background: "背景",
            template: "模版",
            scrawl: "涂鸦",
            music: "音乐",
            inserttable: "插入表格"
        },
        insertorderedlist: {
            num: "1,2,3...",
            num1: "1),2),3)...",
            num2: "(1),(2),(3)...",
            cn: "一,二,三....",
            cn1: "一),二),三)....",
            cn2: "(一),(二),(三)....",
            decimal: "1,2,3...",
            "lower-alpha": "a,b,c...",
            "lower-roman": "i,ii,iii...",
            "upper-alpha": "A,B,C...",
            "upper-roman": "I,II,III..."
        },
        insertunorderedlist: {
            circle: "○ 大圆圈",
            disc: "● 小黑点",
            square: "■ 小方块 ",
            dash: "— 破折号",
            dot: " 。 小圆圈"
        },
        paragraph: {
            p: "段落",
            h1: "标题 1",
            h2: "标题 2",
            h3: "标题 3",
            h4: "标题 4",
            h5: "标题 5",
            h6: "标题 6"
        },
        fontfamily: {
            songti: '"宋体"',
            kaiti: '"楷体"',
            heiti: '"黑体"',
            lishu: '"隶书"',
            yahei: '"微软雅黑"',
            andaleMono: "andale mono",
            arial: "arial",
            arialBlack: "arial black",
            comicSansMs: "comic sans ms",
            impact: "impact",
            timesNewRoman: "times new roman"
        },
        insertcode: {
            as3: "ActionScript3",
            bash: "Bash/Shell",
            cpp: "C/C++",
            css: "Css",
            cf: "CodeFunction",
            "c#": "C#",
            delphi: "Delphi",
            diff: "Diff",
            erlang: "Erlang",
            groovy: "Groovy",
            html: "Html",
            java: "Java",
            jfx: "JavaFx",
            js: "Javascript",
            pl: "Perl",
            php: "Php",
            plain: "Plain Text",
            ps: "PowerShell",
            python: "Python",
            ruby: "Ruby",
            scala: "Scala",
            sql: "Sql",
            vb: "Vb",
            xml: "Xml"
        },
        customstyle: {
            tc: "标题居中",
            tl: "标题居左",
            im: "强调",
            hi: "明显强调"
        },
        elementPathTip: "元素路径",
        wordCountTip: "字数统计",
        wordCountMsg: "当前已输入{#count}个字符, 您还可以输入{#leave}个字符。 ",
        wordOverFlowMsg: '<span style="color:red;">字数超出最大允许值，服务器可能拒绝保存！</span>',
        ok: "确认",
        cancel: "取消",
        closeDialog: "关闭对话框",
        tableDrag: "表格拖动必须引入uiUtils.js文件！",
        autofloatMsg: "工具栏浮动依赖编辑器UI，您首先需要引入UI文件!",
        snapScreen_plugin: {
            browserMsg: "仅支持IE浏览器！",
            callBackErrorMsg: "服务器返回数据有误，请检查配置项之后重试。",
            uploadErrorMsg: "截图上传失败，请检查服务器端环境! "
        },
        confirmClear: "确定清空当前文档么？",
        contextMenu: {
            "delete": "删除",
            selectall: "全选",
            deletecode: "删除代码",
            cleardoc: "清空文档",
            confirmclear: "确定清空当前文档么？",
            unlink: "删除超链接",
            paragraph: "段落格式",
            edittable: "表格属性",
            aligntd: "单元格对齐方式",
            aligntable: "表格对齐方式",
            tableleft: "左浮动",
            tablecenter: "居中显示",
            tableright: "右浮动",
            edittd: "单元格属性",
            justifyleft: "左对齐",
            justifyright: "右对齐",
            justifycenter: "居中对齐",
            justifyjustify: "两端对齐",
            table: "表格",
            inserttable: "插入表格",
            deletetable: "删除表格",
            insertparagraphbefore: "前插入段落",
            insertparagraphafter: "后插入段落",
            deleterow: "删除当前行",
            deletecol: "删除当前列",
            insertrow: "前插入行",
            insertcol: "左插入列",
            insertrownext: "后插入行",
            insertcolnext: "右插入列",
            insertcaption: "插入表格名称",
            deletecaption: "删除表格名称",
            inserttitle: "插入表格标题行",
            deletetitle: "删除表格标题行",
            averageDiseRow: "平均分布各行",
            averageDisCol: "平均分布各列",
            mergeright: "向右合并",
            mergeleft: "向左合并",
            mergedown: "向下合并",
            mergecells: "合并单元格",
            splittocells: "完全拆分单元格",
            splittocols: "拆分成列",
            splittorows: "拆分成行",
            tablesort: "表格排序",
            reversecurrent: "逆序当前",
            orderbyasc: "按ASCII字符升序",
            reversebyasc: "按ASCII字符降序",
            orderbynum: "按数值大小升序",
            reversebynum: "按数值大小降序",
            borderbk: "边框底纹",
            setcolor: "表格隔行变色",
            unsetcolor: "取消表格隔行变色",
            setbackground: "选区背景隔行",
            unsetbackground: "取消选区背景",
            redandblue: "红蓝相间",
            threecolorgradient: "三色渐变",
            copy: "复制(Ctrl + c)",
            copymsg: '请使用 "Ctrl + c"执行复制操作',
            paste: "粘贴(Ctrl + v)",
            pastemsg: '请使用 "Ctrl + v"执行粘贴操作',
            highlightcode: "插入代码"
        },
        anthorMsg: "链接",
        clearColor: "清空颜色",
        standardColor: "标准颜色",
        themeColor: "主题颜色",
        basicColor: "基本色",
        recentlyColor: "最近使用颜色",
        property: "属性",
        "default": "默认",
        modify: "修改",
        justifyleft: "左对齐",
        justifyright: "右对齐",
        justifycenter: "居中",
        justify: "默认",
        clear: "清除",
        anchorMsg: "锚点",
        "delete": "删除",
        clickToUpload: "点击上传",
        unset: "尚未设置语言文件",
        t_row: "行",
        t_col: "列",
        pasteOpt: "粘贴选项",
        pasteSourceFormat: "保留源格式",
        tagFormat: "只保留标签",
        pasteTextFormat: "只保留文本",
        autoTypeSet: {
            mergeLine: "合并空行",
            delLine: "清除空行",
            removeFormat: "清除格式",
            indent: "首行缩进",
            alignment: "对齐方式",
            imageFloat: "图片浮动",
            removeFontsize: "清除字号",
            removeFontFamily: "清除字体",
            removeHtml: "清除冗余HTML代码",
            pasteFilter: "粘贴过滤",
            run: "执行"
        },
        background: {
            "static": {
                lang_background_normal: "背景设置",
                lang_background_local: "本地图片",
                lang_background_set: "选项",
                lang_background_none: "无",
                lang_background_color: "颜色设置",
                lang_background_netimg: "网络图片",
                lang_background_align: "对齐方式",
                lang_background_position: "精确定位",
                repeatType: {
                    options: ["居中", "横向重复", "纵向重复", "平铺", "自定义"]
                }
            },
            noUploadImage: "当前未上传过任何图片！",
            toggleSelect: "单击可切换选中状态\n原图尺寸: "
        },
        insertimage: {
            "static": {
                lang_tab_remote: "远程图片",
                lang_tab_local: "本地上传",
                lang_tab_imgManager: "在线管理",
                lang_tab_imgSearch: "图片搜索",
                lang_input_url: "地 址：",
                lang_input_width: "宽 度：",
                lang_input_height: "高 度：",
                lang_input_border: "边 框：",
                lang_input_vhspace: "边 距：",
                lang_input_title: "描 述：",
                lang_input_remoteAlign: "对 齐：",
                lang_imgLoading: "　图片加载中……",
                lock: {
                    title: "锁定宽高比例"
                },
                imgType: {
                    title: "图片类型",
                    options: ["新闻", "壁纸", "表情", "头像"]
                },
                imgSearchTxt: {
                    value: "请输入搜索关键词"
                },
                imgSearchBtn: {
                    value: "百度一下"
                },
                imgSearchReset: {
                    value: "清空搜索"
                },
                upload: {
                    style: "background: url(upload.png);"
                },
                duiqi: {
                    style: "background: url(imglabel.png) -12px 2px no-repeat;"
                },
                lang_savePath: "选择保存目录"
            },
            netError: "网络链接错误，请检查配置后重试！",
            noUploadImage: "当前未上传过任何图片！",
            imageLoading: "图片加载中，请稍后……",
            tryAgain: " :( ，抱歉，没有找到图片！请重试一次！",
            toggleSelect: "单击可切换选中状态\n原图尺寸: ",
            searchInitInfo: "请输入搜索关键词",
            numError: "请输入正确的长度或者宽度值！例如：123，400",
            fileType: "图片",
            imageUrlError: "不允许的图片格式或者图片域！",
            imageLoadError: "图片加载失败！请检查链接地址或网络状态！",
            flashError: "Flash插件初始化失败，请更新您的FlashPlayer版本之后重试！",
            floatDefault: "默认",
            floatLeft: "左浮动",
            floatRight: "右浮动",
            floatCenter: "居中",
            flashI18n: {}
        },
        webapp: {
            tip1: "本功能由百度APP提供，如看到此页面，请各位站长首先申请百度APPKey!",
            tip2: "申请完成之后请至ueditor.config.js中配置获得的appkey! ",
            applyFor: "点此申请",
            anthorApi: "百度API"
        },
        template: {
            "static": {
                lang_template_bkcolor: "背景颜色",
                lang_template_clear: "保留原有内容",
                lang_template_select: "选择模版"
            },
            blank: "空白文档",
            blog: "博客文章",
            resume: "个人简历",
            richText: "图文混排",
            sciPapers: "科技论文"
        },
        scrawl: {
            "static": {
                lang_input_previousStep: "上一步",
                lang_input_nextsStep: "下一步",
                lang_input_clear: "清空",
                lang_input_addPic: "添加背景",
                lang_input_ScalePic: "缩放背景",
                lang_input_removePic: "删除背景",
                J_imgTxt: {
                    title: "添加背景图片"
                }
            },
            noScarwl: "尚未作画，白纸一张~",
            scrawlUpLoading: "涂鸦上传中,别急哦~",
            continueBtn: "继续",
            imageError: "糟糕，图片读取失败了！",
            backgroundUploading: "背景图片上传中,别急哦~"
        },
        music: {
            "static": {
                lang_input_tips: "输入歌手/歌曲/专辑，搜索您感兴趣的音乐！",
                J_searchBtn: {
                    value: "搜索歌曲"
                }
            },
            emptyTxt: "未搜索到相关音乐结果，请换一个关键词试试。",
            chapter: "歌曲",
            singer: "歌手",
            special: "专辑",
            listenTest: "试听"
        },
        anchor: {
            "static": {
                lang_input_anchorName: "锚点名字："
            }
        },
        attachment: {
            "static": {
                lang_input_fileStatus: " 当前未上传文件",
                startUpload: {
                    style: "background:url(upload.png) no-repeat;"
                }
            },
            browseFiles: "文件浏览…",
            uploadSuccess: "上传成功!",
            delSuccessFile: "从成功队列中移除",
            delFailSaveFile: "移除保存失败文件",
            statusPrompt: " 个文件已上传！ ",
            flashVersionError: "当前Flash版本过低，请更新FlashPlayer后重试！",
            flashLoadingError: "Flash加载失败!请检查路径或网络状态",
            fileUploadReady: "等待上传……",
            delUploadQueue: "从上传队列中移除",
            limitPrompt1: "单次不能选择超过",
            limitPrompt2: "个文件！请重新选择！",
            delFailFile: "移除失败文件",
            fileSizeLimit: "文件大小超出限制！",
            emptyFile: "空文件无法上传！",
            fileTypeError: "文件类型错误！",
            unknownError: "未知错误！",
            fileUploading: "上传中，请等待……",
            cancelUpload: "取消上传",
            netError: "网络错误",
            failUpload: "上传失败!",
            serverIOError: "服务器IO错误！",
            noAuthority: "无权限！",
            fileNumLimit: "上传个数限制",
            failCheck: "验证失败，本次上传被跳过！",
            fileCanceling: "取消中，请等待……",
            stopUploading: "上传已停止……"
        },
        highlightcode: {
            "static": {
                lang_input_selectLang: "选择语言"
            },
            importCode: "请输入代码"
        },
        emotion: {
            "static": {
                lang_input_choice: "精选",
                lang_input_Tuzki: "兔斯基",
                lang_input_BOBO: "BOBO",
                lang_input_lvdouwa: "绿豆蛙",
                lang_input_babyCat: "baby猫",
                lang_input_bubble: "泡泡",
                lang_input_youa: "有啊"
            }
        },
        gmap: {
            "static": {
                lang_input_address: "地址",
                lang_input_search: "搜索",
                address: {
                    value: "北京"
                }
            },
            searchError: "无法定位到该地址!"
        },
        help: {
            "static": {
                lang_input_about: "关于UEditor",
                lang_input_shortcuts: "快捷键",
                lang_input_version: "版本:1.2.6",
                lang_input_introduction: "UEditor是由百度web前端研发部开发的所见即所得富文本web编辑器，具有轻量，可定制，注重用户体验等特点。开源基于BSD协议，允许自由使用和修改代码。",
                lang_Txt_shortcuts: "快捷键",
                lang_Txt_func: "功能",
                lang_Txt_bold: "给选中字设置为加粗",
                lang_Txt_copy: "复制选中内容",
                lang_Txt_cut: "剪切选中内容",
                lang_Txt_Paste: "粘贴",
                lang_Txt_undo: "重新执行上次操作",
                lang_Txt_redo: "撤销上一次操作",
                lang_Txt_italic: "给选中字设置为斜体",
                lang_Txt_underline: "给选中字加下划线",
                lang_Txt_selectAll: "全部选中",
                lang_Txt_visualEnter: "软回车",
                lang_Txt_fullscreen: "全屏"
            }
        },
        insertframe: {
            "static": {
                lang_input_address: "地址：",
                lang_input_width: "宽度：",
                lang_input_height: "高度：",
                lang_input_isScroll: "允许滚动条：",
                lang_input_frameborder: "显示框架边框：",
                lang_input_alignMode: "对齐方式：",
                align: {
                    title: "对齐方式",
                    options: ["默认", "左对齐", "右对齐", "居中"]
                }
            },
            enterAddress: "请输入地址!"
        },
        map: {
            "static": {
                lang_city: "城市",
                lang_address: "地址",
                city: {
                    value: "北京"
                },
                lang_search: "搜索"
            },
            cityMsg: "请选择城市",
            errorMsg: "抱歉，找不到该位置！"
        },
        searchreplace: {
            "static": {
                lang_tab_search: "查找",
                lang_tab_replace: "替换",
                lang_search1: "查找",
                lang_search2: "查找",
                lang_replace: "替换",
                lang_searchReg: "支持正则表达式，添加前后斜杠标示为正则表达式，例如“/表达式/”",
                lang_searchReg1: "支持正则表达式，添加前后斜杠标示为正则表达式，例如“/表达式/”",
                lang_case_sensitive1: "区分大小写",
                lang_case_sensitive2: "区分大小写",
                nextFindBtn: {
                    value: "下一个"
                },
                preFindBtn: {
                    value: "上一个"
                },
                nextReplaceBtn: {
                    value: "下一个"
                },
                preReplaceBtn: {
                    value: "上一个"
                },
                repalceBtn: {
                    value: "替换"
                },
                repalceAllBtn: {
                    value: "全部替换"
                }
            },
            getEnd: "已经搜索到文章末尾！",
            getStart: "已经搜索到文章头部",
            countMsg: "总共替换了{#count}处！"
        },
        snapscreen: {
            "static": {
                lang_showMsg: "截图功能需要首先安装UEditor截图插件！ ",
                lang_download: "点此下载",
                lang_step1: "第一步，下载UEditor截图插件并运行安装。",
                lang_step2: "第二不，插件安装完成后即可使用，如不生效，请重启浏览器后再试！"
            }
        },
        insertvideo: {
            "static": {
                lang_tab_insertV: "插入视频",
                lang_video_url: "视频网址",
                lang_video_size: "视频尺寸",
                lang_videoW: "宽度",
                lang_videoH: "高度",
                lang_alignment: "对齐方式",
                videoSearchTxt: {
                    value: "请输入搜索关键字！"
                },
                videoType: {
                    options: ["全部", "热门", "娱乐", "搞笑", "体育", "科技", "综艺"]
                },
                videoSearchBtn: {
                    value: "百度一下"
                },
                videoSearchReset: {
                    value: "清空结果"
                }
            },
            numError: "请输入正确的数值，如123,400",
            floatLeft: "左浮动",
            floatRight: "右浮动",
            "default": "默认",
            block: "独占一行",
            urlError: "输入的视频地址有误，请检查后再试！",
            loading: " &nbsp;视频加载中，请等待……",
            clickToSelect: "点击选中",
            goToSource: "访问源视频",
            noVideo: " &nbsp; &nbsp;抱歉，找不到对应的视频，请重试！"
        },
        spechars: {
            "static": {},
            tsfh: "特殊字符",
            lmsz: "罗马字符",
            szfh: "数学字符",
            rwfh: "日文字符",
            xlzm: "希腊字母",
            ewzm: "俄文字符",
            pyzm: "拼音字母",
            zyzf: "注音及其他"
        },
        edittable: {
            "static": {
                lang_tableStyle: "表格样式",
                lang_insertCaption: "添加表格标题行",
                lang_insertTitle: "添加表格名称行",
                lang_orderbycontent: "使表格内容可排序",
                lang_tableSize: "自动调整表格尺寸",
                lang_autoSizeContent: "按表格文字自适应",
                lang_autoSizePage: "按页面宽度自适应",
                lang_example: "示例",
                lang_borderStyle: "表格边框",
                lang_color: "颜色:"
            },
            captionName: "表格名称",
            titleName: "标题",
            cellsName: "内容"
        },
        edittip: {
            "static": {
                lang_delRow: "删除整行",
                lang_delCol: "删除整列"
            }
        },
        edittd: {
            "static": {
                lang_tdBkColor: "背景颜色:"
            }
        },
        formula: {
            "static": {}
        },
        wordimage: {
            "static": {
                lang_resave: "转存步骤",
                uploadBtn: {
                    src: "upload.png",
                    alt: "上传"
                },
                clipboard: {
                    style: "background: url(copy.png) -153px -1px no-repeat;"
                },
                lang_step: "1、点击顶部复制按钮，将地址复制到剪贴板；2、点击添加照片按钮，在弹出的对话框中使用Ctrl+V粘贴地址；3、点击打开后选择图片上传流程。"
            },
            fileType: "图片 ",
            flashError: "FLASH初始化失败，请检查FLASH插件是否正确安装！ ",
            netError: "网络连接错误，请重试！ ",
            copySuccess: "图片地址已经复制！ ",
            flashI18n: {}
        }
    };
});