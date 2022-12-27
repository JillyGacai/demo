define("tpl/media/weapp_dialog.html.js", [], function () {
    return '<div class="menu_link_weapp js_weapp_select">\n    <div class="processor_bar_wrp js_weapp_select_step">\n        <!-- 初始化进度条 -->\n    </div>\n    <div class="processor_step_content js_weapp_select_step1" style="display: block"><!-- 第一步：选择小程序卡片 -->\n        <div class="step_content_bd">\n            <div class="link_weapp_desc">\n                <span class="js_weapplink_hint_select" style="display: none">请选择已关联的小程序</span><!--\n                --><span class="js_weapplink_hint_none link_weapp_empty_desc" style="display: none">无已关联的小程序</span> &nbsp;\n            </div>\n            <div class="link_weapp_wrp">\n                <div class="link_weapp_loading js_weapplink_loading" style="display: block">\n                    <i class="icon_loading_small white"></i>\n                </div>\n                <div class="link_weapp_box weapplinks_box">\n                    <ul class="wechat_list weapplink_list js_weapplink_list" style="display: none">\n                    </ul>\n                </div>\n            </div>\n        </div>\n        <div class="step_content_ft">\n            <span class="btn btn_primary btn_input js_weapp_select_next_step">\n                <button type="button">下一步</button>\n            </span>\n            <span class="btn btn_default btn_input js_weapp_select_cancel">\n                <button type="button">取消</button>\n            </span>\n        </div>\n    </div>\n    <div class="processor_step_content step2 js_weapp_select_step2" style="display: none"><!-- 第二步：选择插入卡片的样式 -->\n        <div class="step_content_bd">\n            <div class="" style="display:none">\n                <span class="">请确认插入卡片的样式</span>\n            </div>\n            <div class="weapp_type_select_area" style="text-align: center;margin-right: 0;">\n                <!-- <div class="weapp_type_box">\n                    <label class="frm_radio_label">\n                        <i class="icon_radio"></i>\n                        <span class="lbl_content">小程序首页</span>\n                        <input type="radio" name="add_type" class="frm_radio" value="1">\n                        <span class="type_preview" style="background-image: url(\'https://mmbiz.qlogo.cn/mmbiz_jpg/pxoYvTCGD3UHyRf2omC3RY6g1wVwSDx1qJhy1XZ8UllRFXlvaVO2J3uic2W2qLsjEH8a2qUtHXlicibSN5nk9rgdw/0?wx_fmt=jpeg\');"></span>\n                    </label>\n                </div> -->\n                <span class="type_preview" style="background-image: url(\'https://mmbiz.qlogo.cn/mmbiz_png/0PGibvic5Lia7q2q7KEP2A216OUmc6WjpXq3kuCOINOJ0tVEibrVVhWX4CUc12VrgjibsN0ibeuM10IicNsCsibxx2picww/0?wx_fmt=png\');"></span>\n                <!-- <div class="weapp_type_box">\n                    <label class="frm_radio_label">\n                        <i class="icon_radio"></i>\n                        <span class="lbl_content">自定义路径</span>\n                        <input type="radio" name="add_type" class="frm_radio" value="1">\n                        <span class="type_preview" style="background-image: url(\'https://mmbiz.qlogo.cn/mmbiz_png/pxoYvTCGD3UHyRf2omC3RY6g1wVwSDx1pvgrFExpicZB8pxEhxAv6RaPRyjaD6IYHJ7yUHYFsjA1kx2Ptr5eXgg/0?wx_fmt=png\');"></span>\n                    </label>\n                </div> -->\n            </div>\n        </div>\n        <div class="step_content_ft">\n            <span class="btn btn_default btn_input js_weapp_select_prev_step">\n                <button type="button">上一步</button>\n            </span>\n            <span class="btn btn_primary btn_input js_weapp_select_next_step">\n                <button type="button">下一步</button>\n            </span>\n        </div>\n    </div>\n    <!-- <div class="processor_step_content step3 js_weapp_select_step3" style="display: none">\n        <div class="step_content_bd">\n            <div class="link_weapp_desc">\n                <span class="">订阅者点击小程序卡片会打开小程序首页</span>\n            </div>\n            <div class="frm_control_group show_value">\n                <label for="" class="frm_label">小程序首页</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box">\n                        /weixin/app/com\n                    </span>\n                </div>\n            </div>\n            <div class="frm_control_group">\n                <label for="" class="frm_label">备用网页</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box">\n                        <input type=\'text\' id=\'\' value="" class=\'frm_input\' name=\'\' placeholder=\'请输入网页链接\'>\n                    </span>\n                    <p class=\'frm_msg fail\' id=\'\'>\n                        <span class=\'frm_msg_content\'></span>\n                    </p>\n                    <p class=\'frm_tips\'>旧版微信客户端无法支持小程序，用户点击菜单时将会打开备用网页</p>\n                </div>\n            </div>\n        </div>\n        <div class="step_content_ft">\n            <span class="btn btn_default btn_input js_weapp_select_prev_step">\n                <button type="button">上一步</button>\n            </span>\n            <span class="btn btn_primary btn_input js_weapp_select_confirm">\n                <button type="button">确定</button>\n            </span>\n        </div>\n    </div> -->\n    <div class="processor_step_content step4 js_weapp_select_step4" style="display: none"><!-- 第三步：填写详细信息 打开自定义页面的情况 -->\n        <div class="step_content_bd">\n            <div class="step_content_bd_inner">\n                <div class="link_weapp_desc">\n                    <span class="">点击小程序卡片会打开小程序路径指定的页面</span>\n                </div>\n                <div class="frm_control_group">\n                    <label for="" class="frm_label">小程序名称</label>\n                    <div class="frm_controls frm_vertical_pt js_name"></div>\n                </div>\n                <div class="frm_control_group">\n                    <label for="" class="frm_label">小程序路径<span class="js_weapp_type4">(选填)</span></label>\n                    <div class="frm_controls">\n                        <span class="frm_input_box">\n                            <input type=\'text\' id=\'\' value="" class=\'frm_input\' name=\'path\' placeholder=\'\'>\n                        </span>\n                        <p class=\'frm_msg fail\' id=\'\'>\n                            <span class=\'frm_msg_content\'></span>\n                        </p>\n                        <p class=\'frm_tips js_weapp_type4\' style="display: none;">小程序可按“？参数”格式填入参数或不填写此信息</p>\n                    </div>\n                </div>\n                <div class="frm_control_group">\n                    <label for="" class="frm_label">展示方式</label>\n                    <div class="frm_controls frm_vertical_pt">\n                        <input data-label="文字" class="frm_radio js_weapp_display_way" type="radio" value="text" checked>\n                        <input data-label="图片" class="frm_radio js_weapp_display_way" type="radio" value="image">\n                        <input data-label="小程序卡片" class="frm_radio js_weapp_display_way" type="radio" value="card">\n                        <p class=\'frm_msg fail\' id=\'\'>\n                            <span class=\'frm_msg_content\'></span>\n                        </p>\n                        <p class=\'frm_tips\'></p>\n                    </div>\n                </div>\n                <div class="frm_control_group js_weapp_text_way js_weapp_way">\n                    <label for="" class="frm_label">文字内容</label>\n                    <div class="frm_controls">\n                        <span class="frm_input_box">\n                            <input type=\'text\' id=\'\' value="" class=\'frm_input\' name=\'content\' placeholder=\'\'>\n                        </span>\n                        <p class=\'frm_msg fail\' id=\'\'>\n                            <span class=\'frm_msg_content\'></span>\n                        </p>\n                        <p class=\'frm_tips\'>点击文字会打开小程序指定路径的页面</p>\n                    </div>\n                </div>\n                <div class="frm_control_group js_weapp_image_way js_weapp_way" style="display:none;">\n                    <label for="" class="frm_label">上传图片</label>\n                    <div class="frm_controls file-control frm_vertical_pt">\n                        <div class="upload_box">\n                            <p class="upload_tips">点击图片会打开小程序指定路径的页面。图片规格不限，大小限制为2M。</p>\n                            <span class="upload_area">\n                                <a href="javascript:;" id="js_weapp_link_image_upload" class="btn btn_upload btn_default">上传图片</a>\n                                <input type=\'hidden\' value="" class=\'frm_input\' name=\'image\'>\n                            </span>\n                        </div>\n                        <div class="upload_preview_area js_weapp_link_image_cover" style="display:none">\n                            <span class="cover_preview js_weapp_link_image_preview" style="background-image: url(\'\');" style="display: none;">\n                                <div class="card_mask_global hover_mask">\n                                    <a class="icon20_common del_media_white js_weapp_link_image_remove" href="javascript:;" onclick="return false;">删除</a>\n                                </div>\n                            </span>\n                        </div>\n                    </div>\n                </div>\n                <div class="frm_control_group js_weapp_card_way js_weapp_way" style="display:none;">\n                    <label for="" class="frm_label">卡片标题</label>\n                    <div class="frm_controls">\n                        <span class="frm_input_box">\n                            <input type=\'text\' id=\'js_weapp_card_title_input\' value="" class=\'frm_input\' name=\'title\' placeholder=\'\'>\n                        </span>\n                        <p class=\'frm_msg fail\' id=\'\'>\n                            <span class=\'frm_msg_content\'></span>\n                        </p>\n                        <p class=\'frm_tips\'></p>\n                    </div>\n                </div>\n                <!-- <div class="frm_control_group js_weapp_card_way js_weapp_way" style="display:none;">\n                    <label for="" class="frm_label">卡片图片</label>\n                    <div class="frm_controls file-control frm_vertical_pt">\n                        <div class="upload_box">\n                            <p class="upload_tips">图片尺寸必须为1080*864像素，文件大小限制为2M</p>\n                            <span class="upload_area">\n                                <a href="javascript:;" data-key="" id="weapp_select_upload" class="btn btn_upload btn_default">上传图片</a>\n                                <input type=\'hidden\' value="" class=\'frm_input\' name=\'imageUrl\'>\n                            </span>\n                        </div>\n                        <div class="upload_preview_area js_weapp_select_cover" style="display:none">\n                            <img id="review-image-url" src="" style="height: 140px; width: 180px;">\n                            <span class="cover_preview js_weapp_select_cover_preview" style="background-image: url(\'\');" style="display: none;">\n                                <div class="card_mask_global hover_mask">\n                                    <a class="js_removeCover icon20_common del_media_white js_weapp_select_cover_remove" title="删除封面图" href="javascript:void(0);" onclick="return false;">删除</a>\n                                </div>\n                            </span>\n                        </div>\n                    </div>\n                </div> -->\n                <div class="frm_control_group frm_weapp-card js_weapp_card_way js_weapp_way" style="display: none;">\n                    <label class="frm_label">卡片样式</label>\n                    <div class="frm_controls">\n                        <div class="card-preview__area">\n                            <span class="weapp_card app_context appmsg_card_context">\n                                <span class="weapp_card_bd">\n                                    <span class="weapp_card_profile flex_context">\n                                        <span class="radius_avatar weapp_card_avatar">\n                                            <img class="js_weapp_icon" src="">\n                                        </span>\n                                        <span class="weapp_card_nickname flex_bd js_weapp_name"></span>\n                                    </span>\n                                    <span class="weapp_card_info">\n                                        <span class="weapp_card_title js_weapp_card_title"></span>\n                                        <!-- 图片预览区域 -->\n                                        <!-- 上传图片前: 显示上传按钮和提示-->\n                                        <span class="weapp_card_thumb_wrp js_before_preview">\n                                            <span class="upload-image_before__wrp">\n                                                <span class="upload_area">\n                                                    <a href="javascript:;" data-key="" id="weapp_select_upload" class="btn btn_primary">上传图片</a>\n                                                    <input type=\'hidden\' value="" class=\'frm_input\' name=\'imageUrl\'>\n                                                </span>\n                                                <p class="upload_tips">建议图片尺寸为5:4，图片不超过2M</p>\n                                            </span>\n                                        </span>\n                                        <!-- 上传图片后(默认加了display:none): 显示预览图片, hover显示重新上传按钮 -->\n                                        <span class="weapp_card_thumb_after_wrp js_after_preview" style="display: none; overflow: hidden; width: 240px; height: 180px;">\n                                            <img class="weapp_card_thumb_preview js_after_preview_img" src="http://mmbiz.qpic.cn/mmbiz_jpg/cVgP5bCElFiaydp22DKRJtIZJrjDzvY68ESXv50m84IsdV0cx8p7h9I4gNWLHBCRKmp15uDvicdCLZqicN1DhB3yw/0?wx_fmt=jpeg" alt="">\n                                            <span class="upload-image_after__wrp">\n                                                <span class="upload_area">\n                                                    <a href="javascript:;" data-key="" id="weapp_select_upload_reset" class="btn btn_default">重新上传</a>\n                                                    <input type=\'hidden\' value="" class=\'frm_input\' name=\'imageUrl\'>\n                                                </span>\n                                                <span class="vm_box"></span>\n                                            </span>\n                                        </span>\n                                        <!-- 图片预览区域 end -->\n                                    </span>\n                                </span>\n                                <span class="weapp_card_ft">\n                                    <span class="weapp_card_logo"><img class="icon_weapp_logo_mini" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEUAAAB4it11h9x2h9x2h9x2htx8j+R8i+B1h9x2h9x3h92Snv91htt2h9x1h9x4h9x1h9x1h9x2idx1h9t2h9t1htt1h9x1h9x1htx2h9x1h912h9x4h913iN17juOOjuN1iNx2h9t4h958i+B1htvejBiPAAAAJHRSTlMALPLcxKcVEOXXUgXtspU498sx69DPu5+Yc2JeRDwbCYuIRiGBtoolAAAA3ElEQVQoz62S1xKDIBBFWYiFYImm2DWF///G7DJEROOb58U79zi4O8iOo8zuCRfV8EdFgbYE49qFQs8ksJInajOA1wWfYvLcGSueU/oUGBtPpti09uNS68KTMcrQ5jce4kmN/HKn9XVPAo702JEdx9hTUrWUqVrI3KwUmM1NhIWMKdwiGvpGMWZOAj1PZuzAxHwhVSplrajoseBnbyDHAwvrtvKKhdqTtFBkL8wO5ijcsS3G1JMNvQ5mdW7fc0x0+ZcnlJlZiflAomdEyFaM7qeK2JahEjy5ZyU7jC/q/Rz/DgqEuAAAAABJRU5ErkJggg==" alt="">小程序</span>\n                                </span>\n                            </span>\n                        </div>\n\n                        <!-- 图片编辑区域，默认隐藏，上传图片之后才显示 -->\n                        <div class="edit-image__area js_js_review-box" style="display: none;">\n                            <p class="tips_global edit-image__tips">裁剪图片</p>\n                            <img class="edit-image__preview js_review-image-url" src="http://mmbiz.qpic.cn/mmbiz_jpg/cVgP5bCElFiaydp22DKRJtIZJrjDzvY68ESXv50m84IsdV0cx8p7h9I4gNWLHBCRKmp15uDvicdCLZqicN1DhB3yw/0?wx_fmt=jpeg">\n                        </div>\n                    </div>\n                </div>\n                <!-- <div class="frm_control_group">\n                    <label for="" class="frm_label">备用网页</label>\n                    <div class="frm_controls">\n                        <span class="frm_input_box">\n                            <input type=\'text\' id=\'\' value="" class=\'frm_input\' name=\'\' placeholder=\'请输入网页链接\'>\n                        </span>\n                        <p class=\'frm_msg fail\' id=\'\'>\n                            <span class=\'frm_msg_content\'></span>\n                        </p>\n                        <p class=\'frm_tips\'>旧版微信客户端无法支持小程序，用户点击菜单时将会打开备用网页</p>\n                    </div>\n                </div> -->\n            </div>\n        </div>\n        <div class="step_content_ft">\n            <span class="btn btn_default btn_input js_weapp_select_prev_step">\n                <button type="button">上一步</button>\n            </span>\n            <span class="btn btn_primary btn_input js_weapp_select_confirm">\n                <button type="button">确定</button>\n            </span>\n        </div>\n    </div>\n</div>\n';
});
define("common/wx/media/audio.js", ["biz_web/lib/soundmanager2.js", "tpl/media/audio.html.js", "tpl/media/qqmusicaudio.html.js", "widget/media.css", "common/qq/Class.js", "biz_common/moment.js"], function (i, s, t) {
    "use strict";
    var e = wx.T, o = i("biz_web/lib/soundmanager2.js"), n = i("tpl/media/audio.html.js"), d = i("tpl/media/qqmusicaudio.html.js"), l = (i("widget/media.css"),
        i("common/qq/Class.js")), u = i("biz_common/moment.js"), a = null, m = null, h = "wxAudioPlaying", c = function () {
        m = o, m.setup({
            url: "/mpres/zh_CN/htmledition/plprecorder/biz_web/",
            preferFlash: !1,
            debugMode: !1
        });
    };
    $(window).load(function () {
        c();
    });
    var r = {
        id: "",
        source: "",
        file_id: ""
    }, f = l.declare({
        init: function (i) {
            var s = this;
            $.extend(!0, s, r, i), this.soundId = this.id || this.file_id, this.title = this.title || this.name,
                this.play_length = "undefined" == typeof this.play_length || 0 == this.play_length ? "未知时长" : u.unix(this.play_length / 1e3).format("mm:ss");
            var t;
            t = $(this.qqmusictpl ? e(d, s) : e(n, s)), s.dom = $(i.selector).append(t).data("opt", i), t.click(function () {
                s.toggle();
            });
        },
        getAudioURL: function () {
            if (this.qqmusicurl) return this.qqmusicurl;
            var i = this.source, s = this.id, t = this.file_id;
            return i && (i = "&source=" + i), wx.url(this.voice_encode_fileid ? "https://res.wx.qq.com/voice/getvoice?mediaid=" + this.voice_encode_fileid : "/cgi-bin/getvoicedata?msgid={id}&fileid={fileid}{source}".format({
                id: s,
                fileid: t,
                source: i
            }));
        },
        isPlaying: function () {
            return null != a && this == a;
        },
        toggle: function () {
            this.isPlaying() ? this.stop() : (a && a.stop(), this.play());
        },
        play: function (i) {
            var s = this;
            this.isPlaying() || (this.dom.addClass(h), !!a && a.dom.removeClass(h), a = this, this.sound || (!m && c(),
                this.sound = m.createSound({
                    id: s.soundId,
                    url: s.getAudioURL(),
                    onfinish: function () {
                        a && (a.dom.removeClass(h), a = null);
                    },
                    onload: function (i) {
                        i || m.unload(s.soundId), !i && a && (a.dom.removeClass(h), a.sound = null, a = null);
                    }
                })), m.play(this.soundId), i && i(this));
        },
        stop: function (i) {
            this.isPlaying() && (a = null, this.dom.removeClass(h), m.stop(this.soundId), i && i(this));
        }
    });
    t.exports = f;
});
define("tpl/media/dialog/audiomsg_layout.html.js", [], function () {
    return '{if msg}\n<div class="media_list_tips_wrp tips_global">\n    <span class="tips">{msg}</span>\n    <span class="vm_box"></span>\n</div>\n{else}\n<div class="qqmusic_list">\n    <div class="thead group">\n        <span class="table_cell qqmusic_thumb_info">歌曲</span>\n        <span class="table_cell qqmusic_songtime">时长</span>\n        <span class="table_cell qqmusic_source">版权来源</span>\n        <span class="table_cell last_child no_extra qqmusic_audioplay">试听</span>\n    </div>\n    {each list as item index}\n    <label class="frm_radio_label qqmusic_item">\n        <i class="icon_radio"></i>\n        <span class="lbl_content">\n            <span class="qqmusic_meta qqmusic_thumb_info">\n                <span class="songname">{item.songname}</span>\n                <span class="singername">{item.singername}</span>\n            </span>\n            <span class="qqmusic_meta qqmusic_songtime">{item.duration_str}</span>\n            <!--begin 版权来源-->\n            <span class="qqmusic_meta qqmusic_source">{item.vendor_str}</span>\n            <!--end 版权来源-->\n            <span class=\'js_qqmusic_audioplay qqmusic_meta qqmusic_audioplay\' data-index="{index}"></span>\n        </span>\n        <input type="radio" class="frm_radio js_audio_music_item_radio" value=\'{index}\'>\n    </label>\n    {/each}\n</div>\n<div class="js_music_pagebar pagination_wrp"></div>\n{/if}\n';
});
define("tpl/media/plugin/audioItem.html.js", [], function () {
    return '{each list as data i}\n<label class="frm_radio_label audio_item {if data.enable==true}disabled{/if}">\n    <i class="icon_radio"></i>\n    <span class="lbl_content">\n        <span class="audio_meta audio_title">{data.title}</span>\n        <span class="audio_meta audio_date">{data.update_time}</span>\n        <span class="audio_meta audio_length">{data.format_play_length}</span>\n        <span class=\'audio_meta audio_play jsPluginAudioPlay audio_default\' id="pluginAudioPlay_{i}">\n        </span>\n    </span>\n    <input type="radio" {if data.disabled}disabled="disabled"{/if}  data-label="{data.name}" data-value="{data.file_id}" data-index="{i}" class="frm_radio jsPluginAudioRadio js_audio_music_item_radio" >\n</label>\n{/each}\n';
});
define("tpl/media/audioMusicDialog.html.js", [], function () {
    return '<div id="audio_music_dialog_content" class="audio_music_dialog_content">\n  <div class="weui-desktop-tab weui-desktop-tab_title weui-desktop-tab_dialog title_tab">\n    <ul class="weui-desktop-tab__navs">\n      {if allowAudio}<li class="js_audio_tab_btn weui-desktop-tab__nav first js_top"><a href="javascript:;">素材库</a></li>{/if}\n      {if allowMusic}<li class="js_music_tab_btn weui-desktop-tab__nav first js_top"><a href="javascript:;">音乐</a></li>{/if}\n    </ul>\n  </div>\n  <div>\n\n    {if allowAudio}<div class="js_audio_block audio_box" style="display:none">\n        {if audioDisabled}\n        <div class="page_msg mini audio_global_msg">\n            <div class="inner">\n                <span class="msg_icon_wrp"><i class="icon_msg_mini info"></i></span>\n                <div class="msg_content">\n                    <p>每篇图文消息只能添加一个语音</p>\n                </div>\n            </div>\n        </div>\n        {/if}\n      <div class="global_mod audio_box_hd float_layout gap_top" id="">\n          <p class="global_info gap_top_item tips_global jsAudioTips" {if !hasAudioLengthLimit}style="display:none;"{/if}>由于版本兼容的原因,你暂时只可以选择60秒内的语音发送</p>\n          <p class="global_extra">\n              <a class="btn btn_primary btn_add jsPluginAudioNew" href="javascript:;"><i class="icon14_common add_white"></i>新建语音</a>\n          </p>\n      </div>\n      <div class="audio_box_bd audio_list_container" id="">\n          <div class="media_list_tips_wrp tips_global" style="display:none;">\n              <span class="tips">暂无素材</span>\n              <span class="vm_box"></span>\n          </div>\n          <div class="media_list_tips_wrp" style="display:none;">\n              <i class="icon_loading_small white">loading...</i>\n              <span class="vm_box"></span>\n          </div>\n          <div class="audio_list jsPluginAudioList"></div>\n          <div class="pagination_wrp jsPluginAudioPage"></div>\n      </div>\n    </div>{/if}\n\n    {if allowMusic}<div class="js_music_block" style="display:none">\n      <div class="global_mod qqmusic_box_hd float_layout gap_top" id="searchDiv">\n          <span class="global_info frm_input_box search with_del append">\n              <a class="del_btn" onclick="return false" href="javascript:;" id="searchCloseBt"><i class="icon_search_del"></i>&nbsp;</a>\n              <a onclick="return false" id="searchBt" href="javascript:;" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n              <input id="keyInput" type="text" placeholder="歌名/作者" value="" class="frm_input">\n          </span>\n      </div>\n      <div class="qqmusic_box_bd qqmusic_list_container">\n        <div class="media_list_tips_wrp js_music_loading" style="display:none;">\n          <i class="icon_loading_small white">loading...</i>\n          <span class="vm_box"></span>\n        </div>\n        <div id="dialog_audio_container">\n        </div>\n      </div>\n    </div>{/if}\n\n  </div>\n</div>\n';
});
define("tpl/media/templateListContent.html.js", [], function () {
    return '{if !!msg}\n<p class="weui-desktop-media-tips">{msg}</p>\n{else}\n<div class="weui-desktop-media__list tj">\n  <div class="weui-desktop-media__list-col tj_item">\n  {each list as item index}\n  {if index%2==0} \n  {=item.contentHtml}\n  {/if}\n  {/each}\n  </div>&nbsp;\n  <div class="weui-desktop-media__list-col tj_item">\n  {each list as item index}\n  {if index%2==1} \n  {=item.contentHtml}\n  {/if}\n  {/each}\n  </div>\n</div>\n{/if}';
});
define("tpl/media/templateListDialog.html.js", [], function () {
    return '<div class="dialog_media_container">\n  <div class="weui-desktop-global-mod weui-desktop-media-global-bar">\n    <div class="weui-desktop-global__extra">\n      <a class="btn btn_default" target="_blank" href=\'/cgi-bin/appmsgtemplate?action=list&begin=0&count=6&lang=zh_CN&token={token}\'>管理模版</a>\n    </div>\n  </div>\n  <div class="weui-desktop-media-list-wrp">\n    <p class="js_loading icon_loading_small white">加载中</p>\n    <div class="js_content" style="display: none;"></div>\n  </div>\n  <div class="js_pagebar pagination_wrp"></div>\n</div>';
});
define("biz_web/lib/json.js", [], function (require, exports, module) {
    return "object" != typeof JSON && (JSON = {}), function () {
        "use strict";

        function f(t) {
            return 10 > t ? "0" + t : t;
        }

        function quote(t) {
            return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function (t) {
                var e = meta[t];
                return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + t + '"';
        }

        function str(t, e) {
            var r, n, o, f, u, i = gap, p = e[t];
            switch (p && "object" == typeof p && "function" == typeof p.toJSON && (p = p.toJSON(t)), "function" == typeof rep && (p = rep.call(e, t, p)),
                typeof p) {
                case"string":
                    return quote(p);

                case"number":
                    return isFinite(p) ? String(p) : "null";

                case"boolean":
                case"null":
                    return String(p);

                case"object":
                    if (!p) return "null";
                    if (gap += indent, u = [], "[object Array]" === Object.prototype.toString.apply(p)) {
                        for (f = p.length, r = 0; f > r; r += 1) u[r] = str(r, p) || "null";
                        return o = 0 === u.length ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + i + "]" : "[" + u.join(",") + "]",
                            gap = i, o;
                    }
                    if (rep && "object" == typeof rep) for (f = rep.length, r = 0; f > r; r += 1) "string" == typeof rep[r] && (n = rep[r],
                        o = str(n, p), o && u.push(quote(n) + (gap ? ": " : ":") + o)); else for (n in p) Object.prototype.hasOwnProperty.call(p, n) && (o = str(n, p),
                    o && u.push(quote(n) + (gap ? ": " : ":") + o));
                    return o = 0 === u.length ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + i + "}" : "{" + u.join(",") + "}",
                        gap = i, o;
            }
        }

        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null;
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
            return this.valueOf();
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;
        JSON.stringify2 = function (t, e, r) {
            var n;
            if (gap = "", indent = "", "number" == typeof r) for (n = 0; r > n; n += 1) indent += " "; else "string" == typeof r && (indent = r);
            if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
            return str("", {
                "": t
            });
        }, "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
            function walk(t, e) {
                var r, n, o = t[e];
                if (o && "object" == typeof o) for (r in o) Object.prototype.hasOwnProperty.call(o, r) && (n = walk(o, r),
                    void 0 !== n ? o[r] = n : delete o[r]);
                return reviver.call(t, e, o);
            }

            var j;
            if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (t) {
                return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
            })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
                "function" == typeof reviver ? walk({
                    "": j
                }, "") : j;
            throw new SyntaxError("JSON.parse");
        });
    }(), JSON;
});
define("tpl/media/product_iframe_smart_tips.html.js", [], function () {
    return '<section style="position: relative;z-index: 1;margin-bottom: -32px">\n  <div style="height: 32px;background-color: #1AAD19;background-color: rgba(26,173,25,.9);display: inline-block;border-radius: 0 0 10px 10px;font-size: 12px;color: #fff;line-height: 32px;padding: 0 16px;"><span style="display: inline-block;vertical-align: -2px;background: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAARCAYAAAFfvTeYAAAABGdBTUEAALGPC/xhBQAAAmdJREFUOBGNlEtIVVEUhr23dw0qR6FJDzCLkiyhJs0CB4EEYUUDqUnvQRjOhAZNkhooDUKCoiAjkCYJRYGDBj0hgyKzouwl9CRKyazs9v3rrn3c96TVD99ej732Ovvsfc8tKkopoziHPJ9NzadDKq+oHJ1O5ghKLcD5LAe7F/pBsoco+Qs2K+NqTVr4qgnpRLFXPsa+df+cbZigDyo8aSabQbRoh3UwAJVwEmxXFeaMN9CjJmo3Eb8XdkLBuWRJLAWpjGaXvaG6v4duWA0jzK+Cn7CF2LbQSPAcFoFUBa9hkoJII7YgDEwsjyYX4k+B/fAhyuevISwKVsXB/6el+Lp3PIs9AudhyR8LSR4E6ZkmsdstyuVOuZV5CXWa/AG7oQuku1Bi3uhp9hDvU04LjsMLeAjSEBwzb3RQ7iZcte15vhT7Bc6A7mAmhCa4Jt2P7Xm9Qvfr83O5r27tDsK8LfBCFXyHGx6vwL+kQtdgUhwcJoqDH1vy0+J4XJ9C3fgueADXYEEoxv/vCy74JasBixdDO+h9h2AqtMBKaCW/DHRG32RdOoLbcAjWwizmC0VyIzwCaSBvbNQX0QZHQb/fcrgI0h51wW5VEEl/HrFqVKTPUBeha17jC3XtsU54vi5O4g+n4g6vm09eb6oNz1NODyqDdyDpc50Nc6AfJNm50KsA3Yc75v19aLIHhIHaGXDP17zBPoUO0AO2QQNIH6EadHevIEjHWgs9nniCnR76J5ZkBjq96AJWd9ACt0Bvchi0ER1tWl0kDkD4S96UNB7L8WJ9q32wAyaPVacccyWwAfQm+mw/QXNc/xvj7PMZChXlSwAAAABJRU5ErkJggg==\')  0 0 no-repeat;width: 25px;height: 16px;-webkit-background-size: cover;background-size: cover;margin-right: 5px;"></span>非该位置最终商品，以实际推荐为准</div>\n</section>\n';
});
define("tpl/media/product_highline_style.html.js", [], function () {
    return '<style>body{margin:0;font-family:"Helvetica Neue","Hiragino Sans GB","Microsoft YaHei","\\9ED1\\4F53",Arial,sans-serif;}</style>';
});
define("tpl/media/product_style_dialog_content.html.js", [], function () {
    return '<div class="js_content dialog_media_container">\n  <div class="mpui-media-list-wrp">\n    <p class="js_loading icon_loading_small white">加载中</p>\n  </div>\n</div>';
});
define("tpl/media/product_style_dialog_list.html.js", [], function () {
    return '{each list as item index}\n<label for="product_style_{index}" class="product-style">\n  <div class="js_checkbox_parent product-style__meta">\n    <i class="icon_radio"></i>\n    <span class="product-style__name">{item.name}</span>\n    <input type="radio" class="frm_radio" name="productstyle" data-id="{item.id}" id="product_style_{index}">\n  </div>\n  <div class="product-style__container">\n  	{if item.cover}\n    <img src="{item.cover}" alt="">\n    {else}\n    {=html}\n    {/if}\n  </div>\n</label>\n{/each}';
});