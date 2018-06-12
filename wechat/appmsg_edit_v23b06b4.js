define("media/appmsg_edit_v2.js", ["biz_web/ui/jquery.scrollbar.js", "common/wx/media/cropimg.js", "common/qq/Class.js", "biz_web/utils/upload.js", "biz_web/ui/checkbox.js", "common/wx/inputCounter.js", "common/wx/Step.js", "biz_web/ui/dropdown.js", "common/wx/tooltips.js", "biz_common/jquery.validate.js", "common/wx/Tips.js", "biz_common/moment.js", "common/wx/media/imageDialog.js", "common/wx/preview.js", "common/wx/dialog.js", "common/wx/popover.js", "common/wx/media/imgsDialogByUrls.js", "common/wx/ban.js", "common/wx/Cgi.js", "original/whitelist_dialog.js", "common/wx/pagebar.js", "common/wx/mpEditor/plugin/vote.js", "common/wx/mpEditor/plugin/card.js", "common/wx/mpEditor/plugin/shop.js", "common/wx/mpEditor/plugin/link.js", "common/wx/mpEditor/plugin/unlink.js", "common/wx/mpEditor/plugin/emotion.js", "common/wx/mpEditor/plugin/insertTemplate.js", "common/wx/mpEditor/plugin/insert_product.js", "common/wx/mpEditor/plugin/templateList.js", "common/wx/mpEditor/plugin/audio_music.js", "common/wx/mpEditor/plugin/weapp.js", "common/wx/mpEditor/plugin/img.js", "common/wx/mpEditor/plugin/video.js", "common/wx/mpEditor/plugin/adv.js", "common/wx/mpEditor/editor.js", "tpl/media/appmsg_edit/article.html.js", "media/article_list.js", "media/media_static_data.js", "media/report.js", "biz_common/utils/wxgspeedsdk.js"], function (i) {
    "use strict";

    function e(i, e, t) {
        (e || 1) > N && $.post("/misc/jslog?1=1" + wx.data.param, {
            id: i,
            val: 1,
            level: t || "error",
            content: "[file=media/appmsg_edit]"
        });
    }

    i("biz_web/ui/jquery.scrollbar.js");
    var t, n = i("common/wx/media/cropimg.js"), o = i("common/qq/Class.js"), s = (i("biz_web/utils/upload.js"),
            i("biz_web/ui/checkbox.js"), i("common/wx/inputCounter.js")), a = i("common/wx/Step.js"), r = i("biz_web/ui/dropdown.js"), d = (i("common/wx/tooltips.js"),
            i("biz_common/jquery.validate.js").rules), _ = i("common/wx/Tips.js"), c = i("biz_common/moment.js"), l = i("common/wx/media/imageDialog.js"), p = i("common/wx/preview.js"), u = i("common/wx/dialog.js"), m = i("common/wx/popover.js"), h = i("common/wx/media/imgsDialogByUrls.js"),
        f = i("common/wx/ban.js"), g = i("common/wx/Cgi.js"), w = i("original/whitelist_dialog.js"), j = i("common/wx/pagebar.js"), v = i("common/wx/mpEditor/plugin/vote.js"), b = i("common/wx/mpEditor/plugin/card.js"), x = (i("common/wx/mpEditor/plugin/shop.js"),
            i("common/wx/mpEditor/plugin/link.js")), y = i("common/wx/mpEditor/plugin/unlink.js"), k = i("common/wx/mpEditor/plugin/emotion.js"), C = i("common/wx/mpEditor/plugin/insertTemplate.js"), E = i("common/wx/mpEditor/plugin/insert_product.js"),
        D = i("common/wx/mpEditor/plugin/templateList.js"), L = i("common/wx/mpEditor/plugin/audio_music.js"), q = i("common/wx/mpEditor/plugin/weapp.js"), T = i("common/wx/mpEditor/plugin/img.js"), I = i("common/wx/mpEditor/plugin/video.js"), z = i("common/wx/mpEditor/plugin/adv.js"),
        U = i("common/wx/mpEditor/editor.js"), S = i("tpl/media/appmsg_edit/article.html.js"), P = i("media/article_list.js"), O = i("media/media_static_data.js"), R = i("media/report.js"), B = (O.URL_PLATFORM_MAP,
            O.article_type), M = wx.cgiData, A = document.referrer;
    !function (i) {
        i.fn.placeholder2 = function () {
            if (!("placeholder" in document.createElement("input"))) {
                var e = i(this).siblings(".tips_global");
                i(this).on("focus", function () {
                    e.hide();
                }).on("blur", function () {
                    "" === this.value ? e.show() : e.hide();
                }).trigger("blur");
            }
        }, i.extend(i.easing, {
            easeOutCubic: function (i, e, t, n, o) {
                return n * ((e = e / o - 1) * e * e + 1) + t;
            }
        });
    }(jQuery);
    var N = Math.random(), Y = o.declare({
        init: function (i) {
            var e = this;
            e.opt = i, $.extend(!0, e, i), e.$editor = $(e.editor_selector).html(wx.T(S, {
                can_use_copyright: M.can_use_copyright,
                can_use_reward: M.can_use_reward,
                can_use_payforread: M.can_use_payforread,
                can_use_comment: M.can_use_comment,
                can_use_appmsg_source_url: M.can_use_appmsg_source_url,
                is_ios_reward_open: M.is_ios_reward_open,
                has_invited_original: M.has_invited_original,
                orginal_apply_stat: M.orginal_apply_stat,
                token: wx.data.t,
                is_illegal: 1 * e.appmsg_data.is_illegal || 0
            })), e._initUEditor(), $(".js_scrollbar").scrollbar({
                autoUpdate: !1
            });
        },
        _renderReadOnly: function (i) {
            var e = i.type, n = i.time, o = i.name, s = i.ua, a = $("#read_only_container"), r = a.find(".js_close");
            if (5 == e) {
                var d = location.href + "&conflict=1", _ = "你有未保存的草稿，%s点击查看%s".sprintf("<a href='javascript:;'>", "</a>");
                return a.find("p").html(_), a.find("a").click(function () {
                    a.hide(), window.open(d);
                }), i.showTips === !0 && u.show({
                    type: "warn",
                    msg: "你有未保存的草稿",
                    buttons: [{
                        text: "查看草稿",
                        click: function () {
                            a.hide(), window.open(d), this.remove();
                        }
                    }, {
                        text: "编辑当前内容",
                        type: "normal",
                        click: function () {
                            this.remove();
                        }
                    }]
                }), a.show(), void r.show();
            }
            if (1 == e || 2 == e) a.find("p").text("此素材有文章存在违规，无法编辑"), a.show(), r.hide(); else if (4 == e) {
                var _ = "当前素材并非最新内容，你可以%s打开最新素材%s".sprintf("<a target='_blank' href='" + location.href + "'>", "</a>");
                a.find("p").html(_);
                var c = "当前素材非最新内容，是否打开重新编辑？";
                n && (c += "<br />最新素材更新时间：%s".sprintf(n)), o && (c += "<br />操作人：%s".sprintf(o.html(!0))),
                s && (c += "<br />保存于：%s".sprintf((s + "浏览器").html(!0))), u.show({
                    type: "warn",
                    msg: c,
                    buttons: [{
                        text: "编辑新内容",
                        click: function () {
                            window.open(location.href), this.remove();
                        }
                    }, {
                        text: "查看当前内容",
                        type: "normal",
                        click: function () {
                            this.remove();
                        }
                    }]
                }), a.show(), r.hide();
            } else (3 == e || 6 == e) && (a.hide(), r.hide());
            t.fireEvent("stop_toolbar_float");
            var l = $(this.editor_selector);
            l.find(".js_title_main").addClass("without_margin"), l.find(".js_readonly").hide(),
                $(this.appmsg_selector).find(".js_readonly").hide(), $("#editor_pannel").addClass("appmsg_input_area_pull_right"),
                $("#js_add_appmsg").hide(), $("#bottom_main").hide(), $("#right_pannel").hide(), $("#guide_words_main").find(".js_guide_words").attr("readonly", "true"),
            this.ueditor && this.ueditor.fireEvent("scrollIntoView", $("#read_only_container"), 150);
        },
        _renderEditorByType: function (i) {
            function e() {
                _.err("分享图文中不能插入多媒体素材");
            }

            {
                var t = this.ueditor;
                t.getUeditor();
            }
            if (2 == i) {
                t.fireEvent("stop_toolbar_float");
                var n = $(this.editor_selector);
                n.find(".js_title_main").addClass("without_margin"), n.find(".js_reprint_hide").hide(),
                    $(this.appmsg_selector).find(".js_reprint_hide").hide(), $("#bottom_main").find(".js_reprint_hide").hide(),
                    $("#title").attr("readonly", "true"), $("#js_media_list").find("li").addClass("disabled"),
                    $("#media_list_mask").show().on("click", e), $("#js_cover_mask").removeClass("hover_mask");
            } else if (1 == i) {
                var n = $(this.editor_selector);
                n.find(".js_title_main").removeClass("without_margin"), n.find(".js_reprint_hide").show(),
                    t.fireEvent("star_toolbar_float"), $(this.appmsg_selector).find(".js_reprint_hide").show(),
                    $("#bottom_main").find(".js_reprint_hide").show(), $("#title").removeAttr("readonly"),
                    $("#js_media_list").find("li").removeClass("disabled"), $("#media_list_mask").hide().off("click", e),
                    $("#js_cover_mask").addClass("hover_mask");
            }
        },
        _initEditArea: function () {
            var i = this, e = i.$editor;
            e.find(".js_field").each(function () {
                {
                    var i = $(this).attr("name");
                    $(this).attr("keyup");
                }
                $(this).on("keyup", function () {
                    e.find(".js_%s_error".sprintf(i)).hide();
                });
            }), e.find(".js_url").on("change", function () {
                $(".js_warn.frm_msg").hide();
            }), e.find(".js_title").on("keyup", function () {
                var t = $.trim($(this).val()).html(!0), n = i.articleList.$current;
                n && n.find(".js_appmsg_title").html(t || "标题"), e.find(".js_title_error").hide(), $("#js_draft_tips").hide();
            }).on("focus", function () {
                i.ueditor.fireEvent("title_focus"), i.ueditor.disableToolbar(), $(this).siblings("em").show();
            }).on("blur", function () {
                $(this).parent().hasClass("warn") || $(this).siblings("em").hide();
            }).placeholder2(), e.find(".js_author").on("focus", function () {
                i.ueditor.fireEvent("author_focus"), i.ueditor.disableToolbar(), $(this).siblings("em").show();
            }).on("blur", function () {
                $(this).parent().hasClass("warn") || $(this).siblings("em").hide();
            }).on("keyup", function () {
                $("#js_draft_tips").hide();
            }).placeholder2(), e.find(".js_guide_words").on("focus", function () {
                $(this).siblings("em").show();
            }).on("blur", function () {
                $(this).parent().hasClass("warn") || $(this).siblings("em").hide();
            }).on("keyup", function () {
                $("#js_draft_tips").hide();
            }), e.find(".js_desc").on("keyup", function () {
                var t = $.trim($(this).val()).html(!0), n = i.articleList.$current;
                n && n.find(".appmsg_desc").html(t), e.find(".js_desc_error").hide();
            }), e.find("textarea.js_desc[name='digest']").on("change", function () {
                var e, t = i.articleList.$current;
                t && (e = t.data("article")) && e.setAutoDigest(!1);
            }), e.find(".js_comment").checkbox({
                multi: !0,
                initOnChanged: !0,
                onChanged: function (i) {
                    i.checkbox("value") ? $("#js_comment_setting_wrp").show() : $("#js_comment_setting_wrp").hide();
                }
            }), e.find(".js_comment_setting").checkbox({
                multi: !1
            }), e.find(".js_url_checkbox").checkbox({
                multi: !0,
                onChanged: function (t) {
                    t.checkbox("value") ? (e.find(".js_url_area .frm_input_box").show(), i.ueditor.funcPvUvReport("showlink")) : (e.find(".js_url_area .frm_input_box").hide(),
                        i.ueditor.funcPvUvReport("hidelink")), e.find(".js_url_error").hide(), e.find(".frm_msg.js_warn").hide();
                }
            }), e.find(".js_url").on("input change", function () {
                var i = $(this), e = i.val();
                e.match(/\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/) && new m({
                    dom: this,
                    content: "检测到此链接为预览链接，将在短期内失效，是否仍然使用此链接？",
                    hideIfBlur: !0,
                    buttons: [{
                        text: "仍然使用",
                        type: "primary",
                        click: function () {
                            this.remove();
                        }
                    }, {
                        text: "取消",
                        type: "default",
                        click: function () {
                            i.val(""), this.remove();
                        }
                    }]
                });
            }), e.find(".js_reward").checkbox({
                multi: !0,
                onChanged: function (i) {
                    i.checkbox("value") ? (i.checkbox("checked", !1), $("#tpl_reward_statement").popup({
                        title: "文章赞赏须知",
                        width: 960,
                        className: "reward_qrcode_dialog",
                        buttons: [{
                            text: "确定",
                            type: "primary",
                            click: function () {
                                i.checkbox("checked", !0), e.find(".js_reward_div,.js_reward_ios_wrap").show(), this.remove();
                            }
                        }, {
                            text: "取消",
                            click: function () {
                                this.remove();
                            }
                        }]
                    })) : e.find(".js_reward_div,.js_reward_ios_wrap").hide();
                }
            }), e.find(".js_reward_ios").checkbox({
                multi: !1,
                onChanged: function (i) {
                    1 == i.checkbox("value") ? e.find(".js_reward_ios_money").show() : e.find(".js_reward_ios_money").hide();
                }
            }), e.find(".js_reward_notice").on("click", function () {
                $("#tpl_reward_statement").popup({
                    title: "文章赞赏须知",
                    width: 960,
                    className: "reward_qrcode_dialog",
                    buttons: [{
                        text: "确定",
                        type: "primary",
                        click: function () {
                            this.remove();
                        }
                    }]
                });
            }), i._initUploadCover(), e.find(".js_counter").each(function () {
                $(this).hasClass("js_author") || $(this).hasClass("js_reward_wording") ? new s(this, {
                    maxLength: $(this).attr("max-length"),
                    useGBKLength: !0,
                    GBKBased: !0
                }) : new s(this, {
                    maxLength: $(this).attr("max-length")
                });
            }), i._initOriginal(), i.freeUEditor = e.find(".js_fp_editor_empty_none"), i._initBan(),
                i._initAd();
        },
        _initUploadCover: function () {
            var i = this, t = i.$editor;
            $("#js_selectCoverFromContent").on("click", function () {
                var t = i.ueditor.fireEvent("get_current_article_all_img") || [];
                document.body.style.overflow = document.documentElement.style.overflow = "hidden";
                var n = i.articleList._getCurrentIndex();
                new h({
                    cropImgtips: i._getCropImgTips(n),
                    cropRatio: i._getCropImgRatio(n),
                    urls: t,
                    onOk: function (t) {
                        document.body.style.overflow = document.documentElement.style.overflow = "auto";
                        var n = t.length > 0 ? t[0] : "";
                        n && (i._coverChange(n), R.addNum(R.reportId[2], 0, 1), R.addNum(R.reportId[2], 1, 100)),
                            e(38, 1, "trace");
                    },
                    onHide: function () {
                        document.body.style.overflow = document.documentElement.style.overflow = "auto";
                    }
                });
            }), $("#js_imagedialog").on("click", function () {
                document.body.style.overflow = document.documentElement.style.overflow = "hidden";
                var n = i.articleList._getCurrentIndex();
                l({
                    cropImg: !0,
                    cropImgtips: i._getCropImgTips(n),
                    cropRatio: i._getCropImgRatio(n),
                    coverPicCheckbox: !0,
                    coverPic: 1 * t.find(".js_show_cover_pic").val() || 0,
                    scene: "biz",
                    only_cdn: !1,
                    maxSelect: 1,
                    desc: "建议尺寸：900像素 * 500像素",
                    onOK: function (t) {
                        var n = t[0];
                        i._coverChange(n), R.addNum(R.reportId[2], 0, 1), R.addNum(R.reportId[2], 2, 100), e(38, 1, "trace"),
                            this.destroy(), document.body.style.overflow = document.documentElement.style.overflow = "auto";
                    },
                    onHide: function () {
                        document.body.style.overflow = document.documentElement.style.overflow = "auto";
                    }
                });
            }), t.on("click", ".js_removeCover", function () {
                var e = $(this), t = e.parents(".js_cover");
                t.hide().find("input").val(""), t.find(".js_show_cover_pic").val("0");
                var n = i.articleList.$current;
                n && (n.find("div.js_appmsg_thumb").css("backgroundImage", 'url("")'), n.removeClass("has_thumb"));
            }), t.on("click", ".js_modifyCover", function () {
                var e, o, s = !1, a = !0, r = $('<div class="js_main">').popup({
                    width: 800,
                    title: "选择封面",
                    autoShow: !1,
                    className: "appmsg_content_img_dialog",
                    onHide: function () {
                        this.remove(), a = !1;
                    },
                    buttons: [{
                        text: "完成",
                        type: "primary",
                        classWrap: "js_crop_done_btn",
                        click: function () {
                            if (!s) {
                                var t = this;
                                s = !0, o.btn(!1), e.getUrl({
                                    onsuccess: function (e) {
                                        a && (s = !1, o.btn(!0), t.remove(), i._coverChange({
                                            oriUrl: e.oriUrl,
                                            file_id: e.file_id || "",
                                            url: e.url
                                        }));
                                    },
                                    onerror: function (i) {
                                        a && (s = !1, o.btn(!0), _.err(-1 == i.retcode ? "请选择裁剪区域" : "系统繁忙，请稍后再试"));
                                    }
                                });
                            }
                        }
                    }, {
                        text: "取消",
                        type: "default",
                        click: function () {
                            this.remove(), a = !1;
                        }
                    }]
                });
                o = r.find(".js_crop_done_btn");
                var d = i.articleList._getCurrentIndex(), c = t.find(".js_cover"), l = c.find("input.js_cdn_url").val(), p = c.find("input.js_cdn_url_back").val();
                p || (p = l), e = new n({
                    container: r.find(".js_main"),
                    cropRatio: i._getCropImgRatio(d),
                    url: p,
                    tips: i._getCropImgTips(d)
                }), r.popup("show"), r.popup("resetPosition");
            });
        },
        _getCropImgRatio: function (i) {
            return 0 == i ? 16 / 9 : 1;
        },
        _changeCoverCss: function (i) {
            if ("undefined" == typeof i && this.articleList && this.articleList.$current && (i = this.articleList.$current.index()),
            "undefined" != typeof i) {
                var e = this.$editor.find(".js_cover").find(".js_cover_preview");
                0 == i ? e.addClass("first_appmsg_cover") : e.removeClass("first_appmsg_cover");
            }
        },
        _coverChange: function (i) {
            var e = this.$editor, t = i.url, n = i.file_id, o = "";
            o = t ? t.http2https().nogif() : wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(n));
            var s = i.oriUrl || o;
            e.find(".js_cover").find("img").remove();
            var a = e.find(".js_cover").show(), r = a.find(".js_cover_preview").css("backgroundImage", 'url("' + o + '")');
            if (r.find(".js_tip_mask_msg").hide(), r.find(".js_tip_mask").addClass("hover_mask").removeClass("error_mask"),
                a.find("input.js_file_id").val(n), a.find("input.js_cdn_url").val(t.https2http().nogif()),
                a.find("input.js_cdn_url_back").val(s), 1 * i.coverPic === 1) {
                var d = this.ueditor.getUeditor(), _ = d.selection.getRange(), c = _.createBookmark(), l = d.body.firstChild;
                _.setEndBefore(l), _.setStartBefore(l), d.fireEvent("insertMaterialImg", {
                    format: i.oriFormat,
                    src: i.oriUrl
                }), _.moveToBookmark(c), _.select(), d.fireEvent("contentchange", !0), d.fireEvent("scrollIntoView", $("#author"), 200);
            }
            if (e.find(".js_show_cover_pic").val("0"), this.articleList && this.articleList.$current) {
                var p = this.articleList.$current;
                p.find("img.js_appmsg_thumb").attr("src", o), p.find("div.js_appmsg_thumb").css("backgroundImage", 'url("' + o + '")'),
                    p.addClass("has_thumb");
            }
            e.find(".js_cover_error").hide(), this._changeCoverCss();
        },
        _getCropImgTips: function (i) {
            return 0 == i ? "首篇图文封面图片长宽比只能为16：9，拖拽裁剪框调整展示区域" : "次篇图文封面图片长宽比只能为1：1，拖拽裁剪框调整展示区域";
        },
        _initUEditor: function () {
            var i = this, e = [], n = ["undo", "redo", "|", "fontsize", "|", "blockquote", "horizontal", "|", "removeformat", "formatmatch", "inserttemplate", "templatelist", "|", "link", "unlink", "mpemotion"],
                o = ["bold", "italic", "underline", "forecolor", "backcolor", "|", "indent", "|", "justifyleft", "justifycenter", "justifyright", "justifyjustify", "justifyindent", "|", "rowspacingtop", "rowspacingbottom", "lineheight", "letterspacing", "|", "insertorderedlist", "insertunorderedlist", "|", "imagenone", "imageleft", "imageright", "imagecenter"];
            e.push(new T({
                container: "#js_editor_insertimage"
            })), e.push(new I({
                container: "#js_editor_insertvideo",
                can_use_txvideo: wx.cgiData.can_use_txvideo
            })), e.push(new v({
                container: wx.cgiData.can_use_vote ? "#js_editor_insertvote" : "",
                can_use_vote: wx.cgiData.can_use_vote
            })), e.push(new b({
                container: wx.cgiData.can_use_card ? "#js_editor_insertcard" : "",
                biz_uin: M.biz_uin,
                can_use_card: wx.cgiData.can_use_card
            })), e.push(new z({
                container: wx.cgiData.can_see_ad ? "#js_editor_insertad" : "",
                has_ad: wx.cgiData.has_ad,
                can_see_ad: wx.cgiData.can_see_ad
            })), e.push(new L({
                container: wx.cgiData.can_use_voice || wx.cgiData.qqmusic_flag ? "#audio_music_plugin_btn" : "",
                allowAudio: wx.cgiData.can_use_voice,
                allowMusic: wx.cgiData.qqmusic_flag
            })), e.push(new q({
                container: wx.cgiData.can_use_weapp_card ? "#js_editor_insertweapp" : "",
                can_use_weapp_card: wx.cgiData.can_use_weapp_card
            })), e.push(new x({
                can_use_hyperlink: wx.cgiData.can_use_hyperlink,
                can_use_appmsg_outer_url: wx.cgiData.can_use_appmsg_outer_url
            })), e.push(new y), e.push(new k), e.push(new C({
                token: wx.data.t,
                appmsg_template_cnt: wx.cgiData.appmsg_template_cnt,
                can_use_vote: wx.cgiData.can_use_vote,
                can_use_card: wx.cgiData.can_use_card,
                biz_uin: M.biz_uin,
                can_use_voice: wx.cgiData.can_use_voice,
                qqmusic_flag: wx.cgiData.qqmusic_flag,
                can_use_weapp_card: wx.cgiData.can_use_weapp_card,
                can_use_txvideo: wx.cgiData.can_use_txvideo,
                can_use_hyperlink: wx.cgiData.can_use_hyperlink,
                can_use_appmsg_outer_url: wx.cgiData.can_use_appmsg_outer_url,
                can_see_ad: !1
            })), e.push(new D({
                token: wx.data.t
            })), e.push(new E({
                container: $("#editor_insertproduct"),
                can_see_product: 1 === wx.cgiData.can_see_product ? !0 : !1,
                can_use_smart: 1 === wx.cgiData.can_use_smart ? !0 : !1,
                can_use_product: 1 === wx.cgiData.can_use_product ? !0 : !1,
                can_use_wxopen_link: 1 === wx.cgiData.can_use_wxopen_link ? !0 : !1
            })), t = i.ueditor = new U({
                plugins: e,
                autoHeightEnabled: !0,
                topOffset: 62,
                is_illegal: 1 * i.appmsg_data.is_illegal || 0,
                toolbars: [n, o]
            }), t.render("js_editor"), t.addListener("begincatchimage", function () {
                _.suc("内容已上传完成");
            }), t.addListener("showEditorMsgTips", function (e, t) {
                $(".js_catch_tips", i.$editor).show().find(".js_msg_content").text(t.msg);
            }), t.addListener("catchremotesuccess", function (e, n, o, s) {
                t.fireEvent("update_remote_img", {
                    article: n.article,
                    remoteType: "success",
                    uid: n.uid,
                    format: s,
                    img_url: o
                });
                var a = $(t.getDocument()).find(".js_catchremoteimageerror").length;
                0 == a ? $(".js_catch_tips", i.$editor).hide() : $(".js_catch_tips", i.$editor).show().find(".js_msg_content").text("有%s张图片粘贴失败".sprintf(a));
            }), t.addListener("catchremoteerror", function (e, n, o) {
                if (n && t.fireEvent("update_remote_img", {
                    article: n.article,
                    remoteType: "error",
                    uid: n.uid,
                    img_url: n.defaultRemoteImg
                }), o) $(".js_catch_tips", i.$editor).show().find(".js_msg_content").text(o); else {
                    var s = $(t.getDocument()).find(".js_catchremoteimageerror").length;
                    0 == s ? $(".js_catch_tips", i.$editor).hide() : $(".js_catch_tips", i.$editor).show().find(".js_msg_content").text("有%s张图片粘贴失败".sprintf(s));
                }
            }), t.addListener("scrollIntoView", function (i, e, t) {
                setTimeout(function () {
                    $("html, body").animate({
                        scrollTop: $(e).offset().top - (t || 50)
                    });
                }, 100);
            }), t.addListener("showErrMsg", function (i, e, t) {
                $(e).show().find(".js_msg_content").text(t);
            }), t.addListener("hideAllErrMsg", function () {
                i.$editor.find(".js_error_msg,.js_tip_mask_msg").hide(), i.$editor.find(".js_tip_mask").removeClass("error_mask").addClass("hover_mask"),
                    $("#js_labels_error").hide();
            }), t.addListener("keyup aftersetcontent", function () {
                var e = t.getDocument(), n = $(e).find(".js_catchremoteimageerror").length;
                n > 0 ? $(".js_catch_tips", i.$editor).show().find(".js_msg_content").text("有%s张图片粘贴失败".sprintf(n)) : $(".js_catch_tips", i.$editor).hide();
            }), t.addListener("keyup", function () {
                $(".js_content_error", i.$editor).hide(), $(".page_msg.js_warn").hide(), $("#js_draft_tips").hide();
            }), t.addListener("heightChanged", function () {
                $(window).trigger("scroll", !1);
            }), t.addListener("focus", function () {
                $(".page_msg.js_warn").hide(), t.enableToolbar();
            }), t.addListener("renderReadOnly", function (e, t) {
                i._renderReadOnly(t);
            }), t.addListener("renderEditorByType", function (e, t) {
                i._renderEditorByType(t);
            }), t.addListener("afterArticleSelect afterArticleMove", function (e, t) {
                i._changeCoverCss(t);
            }), t.ready(function () {
                i._initEditArea(), i.articleList = new P($.extend({
                    maxNum: 8,
                    ueditor: i.ueditor,
                    freeUEditor: i.freeUEditor,
                    is_illegal: 1 * i.appmsg_data.is_illegal || 0,
                    is_rumor: 1 * i.appmsg_data.is_rumor || 0
                }, i.opt)), i._bindEvent();
            });
        },
        _initOriginal: function () {
            var i = this, e = i.$editor;
            $(document).on("click", ".js_original_apply", function () {
                var t = $("#js_original"), n = $("#tpl_original").popup({
                    title: "声明原创",
                    width: 960,
                    className: "simple align_edge original_dialog",
                    data: {
                        author: t.find(".js_author").text() || e.find(".js_author").val(),
                        frm: t.find(".js_reprint_frm").val() || 1,
                        can_use_appmsg_source_url: M.can_use_appmsg_source_url
                    },
                    buttons: [{
                        text: "下一步",
                        type: "primary",
                        click: function () {
                            o.find(".js_step_panel").hide().eq(1).show();
                            var i = new r({
                                container: "#js_original_article_type",
                                label: "请选择",
                                data: B
                            });
                            i.selected(t.find(".js_classify").text()), o.find(".js_btn_p").eq(0).hide(), o.find(".js_btn_p").eq(1).show(),
                                o.find(".js_btn_p").eq(2).show(), d.setStep(2);
                        }
                    }, {
                        text: "上一步",
                        click: function () {
                            o.find(".js_step_panel").hide().eq(0).show(), o.find(".js_btn_p").eq(0).show(), o.find(".js_btn_p").eq(1).hide(),
                                o.find(".js_btn_p").eq(2).hide(), d.setStep(1);
                        }
                    }, {
                        text: "确定",
                        type: "primary",
                        click: function () {
                            i._checkOriginal(o) && ($(".js_original_type").hide().eq(1).show(), $(".js_original_content").show(),
                                e.find(".js_author").closest(".appmsg_edit_item").eq(0).hide(), e.find(".js_reward").checkbox("disabled", !1).checkbox("checked", !1),
                                "checked" == o.find(".js_forIEbug_frm").attr("checked") ? ($("#js_pay").checkbox("disabled", !0),
                                    $("#js_pay").checkbox("checked", !1), e.find(".js_pay_tips").show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),
                                    e.find(".js_pay_setting").hide()) : ($("#js_pay").checkbox("disabled", !1), e.find(".js_pay_tips").show().text("（每月可群发10篇付费阅读文章）")),
                                this.remove());
                        }
                    }],
                    onHide: function () {
                        this.remove();
                    }
                }), o = n.popup("get");
                o.find(".js_btn_p").eq(1).hide(), o.find(".js_btn_p").eq(2).hide();
                var d = new a({
                    container: o.find(".js_step"),
                    selected: 1,
                    names: ["1 须知", "2 原创声明信息"]
                });
                o.find("#js_copyright_agree").checkbox({
                    onChanged: function (i) {
                        i.prop("checked") ? o.find(".js_btn_p").enable() : o.find(".js_btn_p").disable();
                    }
                }), o.find(".js_reprint_frm").checkbox({
                    multi: !1
                }), $($(".popover")[$(".popover").length - 1]).css("z-index", "9999"), $($(".popover")[$(".popover").length - 1]).children(".popover_arrow").css("left", "8%"),
                    o.find(".js_counter").each(function () {
                        $(this).hasClass("js_author") ? new s($(this), {
                            maxLength: 8,
                            useGBKLength: !0,
                            GBKBased: !0
                        }) : new s($(this), {
                            maxLength: 10
                        });
                    }), o.on("keyup", ".js_platform,.js_url,.js_author", function () {
                    $(this).closest(".frm_controls").find(".fail").hide();
                });
            }), $(".js_original_cancel").on("click", function () {
                $("#js_original");
                e.find(".js_original_type").hide().eq(0).show(), e.find(".js_original_content").hide(),
                    e.find(".js_author").closest(".appmsg_edit_item").eq(0).show(), e.find(".js_reward").checkbox("disabled", !0),
                    e.find(".js_reward").checkbox("checked", !1), e.find(".js_reward_div,.js_reward_ios_wrap").hide(),
                    e.find(".js_reward_wording").val(), $("#js_pay", e).checkbox("disabled", !0), $("#js_pay", e).checkbox("checked", !1),
                    $(".js_pay_tips", i.$editor).show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"), $(".js_pay_setting", e).hide();
            }), $("#js_original").on("click", ".js_add_whitelist,.js_edit_whitelist", function () {
                var i = $("#js_original").find(".js_whitelist").children(), e = [];
                i.each(function () {
                    e.push($(this).attr("data-openid"));
                }), new w({
                    data: e,
                    isAllowReprint: !0,
                    onOK: function (i) {
                        g.post({
                            url: "/cgi-bin/appmsgcopyright?action=appmsg_add_ori_whitelist",
                            data: {
                                whitelist: JSON.stringify2({
                                    white_list: i
                                })
                            }
                        }, function () {
                        }), $.each(i, function (i, e) {
                            e.title = [], e.can_modify && e.title.push("可修改文章"), e.can_hide_source && e.title.push("可不显示转载来源"),
                                e.title = e.title.join("、");
                        });
                        var e = template.render("tpl_whitelist", {
                            list: i
                        });
                        $("#js_original").find(".js_whitelist").append(e), this.remove();
                    }
                });
            }), $("#js_original").find(".js_whitelist_tips").length && new m({
                dom: $("#js_original").find(".js_whitelist_tips"),
                content: "<p>通过添加白名单，授予某些公众帐号对该篇文章具有可修改，或不显示转载来源的转载权限。在文章群发后生效</p>",
                isToggle: !0,
                onShow: function () {
                    this.resetPosition();
                }
            }).hide(), $(".js_reward_ios_tips").length && new m({
                dom: $(".js_reward_ios_tips"),
                content: "<p>赞赏功能在iOS上将改为转账，iOS用户可以向你转账任意金额或你设置的固定金额，固定金额只对此篇图文生效。仍保持T+7结算到原收款人的微信零钱包，仍可在赞赏功能里查看流水。</p>",
                isToggle: !0,
                onShow: function () {
                    this.resetPosition();
                }
            }).hide(), $("#js_original").on("click", ".js_del_whitelist", function () {
                $(this).parent().remove();
            }), $("#js_original_detail").on("click", function () {
                $(this).parent().toggleClass("open"), $(this).siblings("ul").toggle();
            });
            var t = !0, n = M.orginal_apply_stat, o = 1 == M.has_invited_original ? "/acct/copyrightapply?action=apply" : "/acct/selfapply?action=apply";
            o = wx.url(o);
            var d = $("#js_original_func_open").closest(".js_original_type"), _ = function () {
                g.post({
                    url: "/cgi-bin/appmsg?action=get_original_stat"
                }, function (i) {
                    if (i.base_resp && 0 == i.base_resp.ret) {
                        var e = "";
                        switch (+i.orginal_apply_stat) {
                            case 0:
                                e = "原创声明：未开通";
                                break;

                            case 1:
                                e = "原创声明：审核中", d.find(".opt").hide();
                                break;

                            case 2:
                                e = "原创声明：申请失败", d.find(".opt").hide();
                                break;

                            case 3:
                                e = "原创：未声明", d.find(".opt").html('<a href="javascript:;" onclick="return false;" class="btn btn_default js_original_apply">声明原创</a>').show();
                        }
                        d.find(".subtitle").text(e), n = i.orginal_apply_stat;
                    }
                    3 != i.orginal_apply_stat && setTimeout(_, 2e3);
                });
            };
            $("#js_original_func_open").on("click", function () {
                0 == n && window.open(o), t && (t = !1, setTimeout(_, 2e3));
            });
        },
        _initPay: function () {
            var i = this, e = i.$editor, t = i._createPayDialog();
            $("#js_pay", e).checkbox({
                multi: !0,
                onChanged: function (n) {
                    n.checkbox("value") ? i._showPayDialog(t) : (t.popup("hide"), $(".js_pay_setting", e).hide());
                }
            }), $(".js_pay_edit", e).on("click", function () {
                i._showPayDialog(t);
            });
        },
        _initBan: function () {
            var i = this.$editor, e = i.find(".js_url_area"), t = 17, n = function () {
                var i;
                $.each(M.func_ban_info, function (e, n) {
                    n.func_id == t && (i = n);
                });
                var n = f.getReason(i.reason_id), o = '你的帐号<a href="' + (n.pc_url ? n.pc_url : defaultReason.pc_url) + '">' + n.reason_description + "</a>，", s = new Date(1e3 * i.unlock_time);
                i.ban_time == i.unlock_time ? o += "已被永久屏蔽阅读原文功能。" : (o += "已被屏蔽阅读原文功能至", o += s.getFullYear() + "/" + (s.getMonth() + 1) + "/" + s.getDate(),
                    o += "，期间阅读原文将不可用。"), e.find(".js_url_checkbox").attr("disabled", !0).attr("checked", !1).parent().addClass("disabled"),
                    e.find(".js_url").attr("disabled", !0).parent().addClass("disabled"), e.find(".js_url_ban_wording").html(o);
            };
            f(M.func_ban_info, "source-url") ? M.can_use_appmsg_source_url || e.hide() : n();
        },
        _initAd: function () {
            var i = this.$editor;
            i.on("click", ".js_del_ad", function () {
                i.find(".js_ad_preview").html(""), i.find(".js_ad_preview").parent().hide(), $("#js_editor_insertad").removeClass("disabled");
            });
        },
        _showPayDialog: function (i) {
            var e = this, t = e.$editor, n = i.popup("get");
            n.find(".js_fee").val($(".js_fee", t).text()), n.find(".js_step_panel").hide().eq(0).show(),
                n.find(".js_btn_p").hide(), n.find(".js_btn_p").eq(0).show(), n.find(".js_btn_p").eq(1).show(),
                i._step.setStep(1), i.popup("show");
        },
        _createPayDialog: function () {
            var i = this, e = i.$editor, t = $("#tpl_pay").popup({
                title: "付费阅读设置",
                width: 960,
                className: "simple align_edge pay_dialog",
                autoShow: !1,
                data: {},
                buttons: [{
                    text: "取消",
                    click: function () {
                        $(".js_pay_setting", e).is(":visible") || $("#js_pay", e).checkbox("checked", !1), this.hide();
                    }
                }, {
                    text: "下一步",
                    type: "primary",
                    click: function () {
                        var t = i.freeUEditor.val(), s = n.find(".js_fee").val();
                        return "" == t ? void _.err("免费区域不能为空") : d.rangelength(t, [20, 200]) ? !s || !/^\d*(\.\d+)?$/.test(s) || s.toString().match(/\.\d{3,}/) || .01 > s ? void _.err("请输入正确的金额") : .01 > s ? void _.err("金额必须大于零") : s > 200 ? void _.err("金额不能超过200元") : (n.find(".js_content").html(t),
                            n.find(".js_content_count").text(i.ueditor.getUeditor().getContent().text().length),
                            n.find(".js_fee_preview").text(parseFloat(s).toFixed(2)), n.find(".js_nickname").text(wx.data.nick_name),
                            n.find(".js_title").text($.trim($(".js_title", e).val())), n.find(".js_author").text($.trim($(".js_author", e).val())),
                            n.find(".js_date").text(c().format("YYYY-MM-DD")), n.find(".js_step_panel").hide().eq(1).show(),
                            n.find(".js_btn_p").hide(), n.find(".js_btn_p").eq(2).show(), n.find(".js_btn_p").eq(3).show(),
                            n.find(".js_preview").scrollTop(1e8), o.setStep(2), void this.resetPosition()) : void _.err("正文字数要多于20字且不能超过200字");
                    }
                }, {
                    text: "上一步",
                    click: function () {
                        n.find(".js_step_panel").hide().eq(0).show(), n.find(".js_btn_p").hide(), n.find(".js_btn_p").eq(0).show(),
                            n.find(".js_btn_p").eq(1).show(), o.setStep(1), this.resetPosition();
                    }
                }, {
                    text: "确定",
                    type: "primary",
                    click: function () {
                        $(".js_pay_setting", e).show().find(".js_fee").text((+n.find(".js_fee").val()).toFixed(2)),
                            $(".js_pay_tips", e).hide(), this.hide();
                    }
                }],
                onClose: function () {
                    $(".js_pay_setting", e).is(":visible") || $("#js_pay", e).checkbox("checked", !1), t.popup("hide");
                },
                onShow: function () {
                    this.resetPosition();
                }
            }), n = t.popup("get");
            n.find(".js_btn_p").eq(2).hide(), n.find(".js_btn_p").eq(3).hide();
            var o = new a({
                container: n.find(".js_step"),
                selected: 1,
                names: ["设置", "预览并确认"]
            });
            return i.freeUEditor = n.find(".js_editor"), new s(i.freeUEditor, {
                minLength: 20,
                maxLength: 200
            }), n.find(".js_fee").on("input propertychange", function () {
                var i = $(this).val();
                i && /^\d*(\.\d+)?$/.test(i) && !i.toString().match(/\.\d{3,}/) ? .01 > i ? $(this).parent().addClass("error") : i > 200 ? $(this).parent().addClass("error") : $(this).parent().removeClass("error") : $(this).parent().addClass("error");
            }), t.popup("resetPosition"), t._step = o, t;
        },
        _checkOriginal: function (i) {
            var e = !0, t = "checked" == i.find(".js_forIEbug_frm").attr("checked") ? 1 : i.find(".js_reprint_frm:checked").val(), n = i.find(".js_author").val(), o = i.find("#js_original_article_type .dropdown_switch label").text();
            n.len() > 16 || n.len() <= 0 ? (i.find(".js_author_error").show(), e = !1) : i.find(".js_author_error").hide();
            for (var s = !1, a = 0; a < B.length; a++) o == B[a].name && (s = !0);
            if (0 == s ? (i.find(".js_article_type_error").show(), e = !1) : i.find(".js_article_type_error").hide(),
                e) {
                var r = $("#js_original");
                r.find(".js_author").text(n), r.find(".js_reprint_frm").val(t), $("#original_type_msg").hide(),
                    r.find(".js_classify").text(o), this._updateWhitelist(t);
            }
            return e;
        },
        _updateWhitelist: function (i) {
            $("#js_original").find(".js_whitelist").children().each(function () {
                var e = 1 * $(this).attr("data-can_modify"), t = 1 * $(this).attr("data-can_hide_source");
                1 == i && (e || t || $(this).remove());
            });
        },
        _updateCurUrl: function (i) {
            if (i) {
                wx.cgiData.app_id = i, window.history && history.replaceState ? history.replaceState(history.state, document.title, wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(i))) : 1 == M.isNew && (location.href = wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(i)));
                var e = new RegExp("^" + location.protocol + "//" + location.hostname + "(:8080)?" + location.pathname + "?.*action=(list_card|list_list)");
                A.match(e) && window.opener && opener.location && (opener.location = A);
            }
        },
        _bindEvent: function () {
            function i(e, t, n) {
                g.post({
                    url: "/cgi-bin/appmsg?action=get_appmsg_update_history&appmsgid=" + wx.cgiData.app_id + "&offset=" + e + "&limit=" + t
                }, function (e) {
                    if (0 == e.base_resp.ret) {
                        var t = e.list;
                        t.each(function (i) {
                            i.time = c.unix(i.update_time).format("YYYY-MM-DD HH:mm:ss"), i.action = 0 == i.operate_type ? "保存" : "群发",
                            "" == i.operator_name && (i.operator_name = "未知"), wx.cgiData.bizmediaid && wx.cgiData.bizmediaid == i.bizmediaid && (i.current = !0),
                                i.url = wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=get_history_appmsg&bizmediaid=" + i.bizmediaid + "&type=" + wx.cgiData.type + "&appmsgid=" + wx.cgiData.app_id);
                        }), $("#history_list").html(template.render("history_tpl", {
                            list: t
                        })), n && new j({
                            container: "#history_page",
                            perPage: 4,
                            first: !1,
                            last: !1,
                            isSimple: !0,
                            totalItemsNum: e.total,
                            callback: function (e) {
                                i(4 * (e.currentPage - 1), 4);
                            }
                        }), $("#history_bt").addClass("appmsg_history_active"), $("#history_pop").show();
                    }
                });
            }

            var e = this;
            $("#history_bt").click(function () {
                $(this).hasClass("appmsg_history_active") ? ($(this).removeClass("appmsg_history_active"),
                    $("#history_pop").hide()) : i(0, 4, !0);
            }), $("#history_list").on("click", ".js_history_link", function () {
                wx.cgiData.bizmediaid ? window.location = $(this).data("url") + "&idx" + wx.cgiData.idx : window.open($(this).data("url") + "&idx" + wx.cgiData.idx);
            }), $(document).on("click", function (i) {
                var e = i.target;
                $.contains($("#history_bt")[0], e) || $.contains($("#history_pop")[0], e) ? ($("#history_pop").show(),
                    $("#history_bt").addClass("appmsg_history_active")) : ($("#history_pop").hide(), $("#history_bt").removeClass("appmsg_history_active"));
            }), $("#read_only_container").find(".js_close").click(function () {
                $("#read_only_container").hide();
            }), e.$editor.on("click", ".js_msg_close", function () {
                $(this).closest(".page_msg").hide();
            }), e.$editor.find(".js_cover").on("click", "img", function () {
                var i = $(this).attr("src");
                i && p.show({
                    imgdata: [{
                        imgsrc: i
                    }]
                });
            });
            var n = !1;
            $("#js_fold").on("click", function () {
                e.ueditor.fireEvent(n ? "adjustheight" : "foldcontentarea");
            }), e.$editor.on("click", ".js_unfold_editor", function () {
                e.ueditor.fireEvent("adjustheight");
            }), e.ueditor.addListener("heightChanged", function (i, t) {
                60 == t ? ($("#js_fold").children("span").text("展开正文"), e.$editor.find(".js_unfold_editor").show(),
                    n = !0, $(window).scrollTop($(".js_title").parent().offset().top - $(".js_main_title").height() - $(".edui-editor-toolbarbox").height())) : ($("#js_fold").children("span").text("收起正文"),
                    e.$editor.find(".js_unfold_editor").hide(), n = !1);
            }), $("#js_submit").on("click", function () {
                if (1 * e.appmsg_data.is_illegal != 1) {
                    var i = $(this);
                    $("#js_import_tips,#js_draft_tips").hide(), $(".js_warn").hide(), $(".js_ad_error_tips").hide(),
                        e.articleList.save(i, function (t, n) {
                            for (var o = 0, s = 0; s < n.count; s++) if (n["ad_id" + s]) {
                                o = 1;
                                break;
                            }
                            i.btn(!0), _.remove(), t.is_ad_optioal ? $("#js_save_success_with_ad_op").show().delay(2e3).fadeOut(300) : o ? $("#js_save_success_with_ad").show().delay(2e3).fadeOut(300) : $("#js_save_success").show().delay(2e3).fadeOut(300),
                                e._updateCurUrl(t.appMsgId);
                        }, !1, t);
                }
            }), $("#js_submit_close").on("click", function () {
                var i = $(this);
                e.articleList.save(i, function () {
                    _.suc("保存成功"), window.close();
                }, !1, t);
            }), $("#js_send").on("click", function () {
                if (1 * e.appmsg_data.is_illegal != 1) {
                    var i = $(this);
                    $("#js_import_tips,#js_draft_tips").hide(), $(".js_warn").hide(), e.articleList.save(i, function (i) {
                        e.articleList.draft.isDropped = !0, e._updateCurUrl(i.appMsgId), location.href = wx.url("/cgi-bin/masssendpage?t=mass/send&type=10&appmsgid=%s".sprintf(i.appMsgId));
                    }, !1, t, void 0, !0);
                }
            }), $("#js_preview").on("click", function () {
                if (1 * e.appmsg_data.is_illegal != 1 && ($("#js_import_tips,#js_draft_tips").hide(), $(".js_warn").hide(),
                    f(M.func_ban_info, "preview"))) {
                    {
                        $(this);
                    }
                    e.articleList.preview(t, function (i) {
                        e._updateCurUrl(i.appMsgId);
                    });
                }
            }), e.$editor.on("click", ".js_jumpToOrder", function () {
                u.show({
                    type: "info",
                    msg: "是否保存文章并跳转至广告订单页面？",
                    buttons: [{
                        text: "确定",
                        click: function () {
                            $("#js_import_tips,#js_draft_tips").hide(), $(".js_warn").hide(), $(".js_ad_error_tips").hide();
                            var i = $("#js_submit"), n = this, o = $(".js_ad_msg").data("ad_id");
                            n.remove(), e.articleList.save(i, function (i) {
                                e._updateCurUrl(i.appMsgId), window.location.href = wx.url("/cgi-bin/frame?t=ad_system/common_simple_frame&t1=publisher/freetrade_item_detail&aid=" + o);
                            }, !1, t);
                        }
                    }, {
                        text: "取消",
                        type: "normal",
                        click: function () {
                            this.remove();
                        }
                    }]
                });
            });
            var o, s, a = $(".main_bd"), r = $(".js_aside"), d = $(".js_main_title"), l = $(".js_main_inner"), m = d.offset().top, h = d.outerHeight(), w = $("body"), v = "edit_fixed";
            $(window).on("scroll", function () {
                s && (clearTimeout(s), s = null);
                var i = $(window).scrollTop(), t = a[0].getBoundingClientRect(), n = t.bottom - h;
                i > m ? (w.addClass(v), r.height(n).find(".js_scrollbar").css("max-height", n), d.width(l.width())) : (w.removeClass(v),
                    r.height(t.height)), arguments[1] !== !1 && (!!o && window.clearTimeout(o), o = window.setTimeout(function () {
                    $("div.appmsg_edit_box").css({
                        overflow: "hidden"
                    }), setTimeout(function () {
                        $("div.appmsg_edit_box").css({
                            overflow: ""
                        });
                    }, 0);
                }, 200)), s = setTimeout(function () {
                    e.ueditor && e.ueditor.fireEvent("toolbar_fixed_change");
                }, 100), setTimeout(function () {
                    $(".js_scrollbar").scrollbar.updateScrollbars(!0);
                });
            }).trigger("scroll", !1), $.support.leadingWhitespace && setInterval(function () {
                $(window).trigger("scroll", !1);
            }, 1e3);
            var b = $(window).width();
            1200 > b && $("#body").width(b), $(window).on("resize", function () {
                var i = $(window).width();
                1200 > i ? $("#body").width(i).find(".js_main_title").width(i) : $("#body").width(1200).css({
                    "margin-left": "auto",
                    "margin-right": "auto"
                }).find(".js_main_title").width(1200), e.ueditor.fireEvent("star_toolbar_float"),
                    $(window).trigger("scroll", !1);
            }), $(window).on("unload", function () {
                R.setData(1), R.send(1);
            });
        }
    }), H = (new Y({
        app_id: M.app_id,
        editor_selector: "#js_appmsg_editor",
        appmsg_selector: "#js_appmsg_preview",
        appmsg_data: M.appmsg_data
    }), i("biz_common/utils/wxgspeedsdk.js"));
    H.setBasicTime({
        uin: wx && wx.data && wx.data.uin || 0,
        pid: 34
    }), H.send();
});