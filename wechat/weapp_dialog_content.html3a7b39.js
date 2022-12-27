define("tpl/media/adcpc_singleitem.html.js", [], function () {
    return '<label for="" class="frm_label">选择广告</label>\n<div class="frm_controls">\n    <div class="mpda_cpc_list ">\n        {each single_ad_list as item idx}\n        <div class="appmsg_card_context mpda_cpc_context tj_item js_cpc_single_item {if item.selected} selected {/if} " data-single_aid="{item.aid}" data-image_url="{if item.status==1}{item.image_url}{else}/mpres/htmledition/images/pic/media/mpda/pic_mpda_cpc_thumb.png{/if}">\n            <div class="appmsg_card_bd mpda_cpc_bd" style="background-image:url({if item.status==1}{item.image_url}{else}/mpres/htmledition/images/pic/media/mpda/pic_mpda_cpc_thumb.png{/if});"></div>\n            <div class="appmsg_card_ft mpda_cpc_ft">\n                <span class="dropdown_opr_tips">\n                    广告\n                    <span class="dropdown_opr_popover">xxxxx</span>\n                </span>\n                <a href="javascript:void(0);" class="appmsg_card_btn">\n                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAV1BMVEUAAAB2h9x4id51iNx1h9x1h9x2h9x2h912iNx9jOB2htx1htx1h9x1htx2h9x3iN94h9yDkup1h9x1htt2htx1h912ht14h9x2id58i+B3iNyAmeZ1htuK6q6xAAAAHHRSTlMAmS969uOvhWYY9/Dn1cw3Pwvp3MJvYVFFIToKgBX0wAAAALVJREFUKM+t0NsKgzAQhGFNk5h4tmfb//2fs2m3i0Txzrka+GBZpjgiU7i29aWctzI4frGntRiLZm0d4O+PqoF6yOSZJHxLdOAzOkEvLcA5oxJKaSPYHaqg25BeptKvb6+FTJ+kjQI+9ag0OaAxIk3q7q0UAS8S29R7sxwcbwLpG51FaUmn32zJwrhDZwjS+vXgHlz8D8czo6GGpnrcPbJOPrjGmmJtVsQNxSZzeanba5iKA/IBYyoQUSgoEyQAAAAASUVORK5CYII=" alt="">\n                    去逛逛                </a>\n            </div>\n            <div class="mpda_cpc_qrcode">\n                <img class="pic_mpda_cpc_qrcode_mini" src="/mpres/htmledition/images/pic/media/mpda/pic_mpda_cpc_qrcode.jpg" alt="">\n                <div class="mpda_cpc_qrcode_pop">\n                    <img class="pic_mpda_cpc_qrcode" src="/merchant/ad_seller_manager?action=get_ad_qrcode&gh_id={item.gh_id}&path={item.path_encode}&token={token}" alt="">\n                    <strong class="mpda_cpc_qrcode_title">扫码查看广告详情页</strong>\n                </div>\n            </div>\n            <div class="card_mask_global vm_helper">\n                <div class="card_mask_content">\n                <i class="icon_card_selected_global"></i>\n                <p>{if item.status==1}  {else} 广告素材尚未审核通过 {/if}</p>\n                </div>\n            </div>\n        </div>&nbsp;\n        {/each}\n        \n        {if single_ad_list.length==0}\n        <p class="empty_tips" >该类目下暂无可选广告卡片</p>\n        {/if}\n        <p class="empty_tips" style="display:none">\n          <i class="icon_loading_small white"></i>\n        </p>\n    </div>\n</div>\n';
});
define("tpl/media/adcpc_catitem.html.js", [], function () {
    return '<div class="tag_choose_list">\n    {each sel_item as item idx}\n    <span class="tag_choose">{item.name}<span class="tag_choose_del js_cat_choose_del" data-category_id="{item.category_id}">删除</span></span>\n    {/each}\n    {if sel_item.length > 0}\n    <a class="global_link_opr js_clear_all" href="javascript:;" >清空</a>\n    {/if}\n</div>\n';
});
define("tpl/media/adcpc_cat.html.js", [], function () {
    return '<div class="frm_control_group">\n    <label for="" class="frm_label">商品类目</label>\n    <div class="frm_controls">\n        <div class="tag_choose_dropdown">\n            <div class="tag_choose_dropdown_hd js_cat_choose_list">\n            {if checkbox_type == \'checkbox\'}\n            <span class="tips_global">若不限定具体商品类目则按全类目展示广告</span>\n            {/if}\n            {if checkbox_type == \'radio\'}\n            <p class="tips_global">先单选类目，再选择该类目下广告卡片</p>\n            {/if}\n            </div>\n            <div class="tag_choose_dropdown_bd js_cat_choose_dp">\n                {each category_list as item i}\n                <label class="frm_{checkbox_type}_label tag_choose_label">\n                    <i class="icon_{checkbox_type}"></i>\n                    <span class="lbl_content">{item.name}</span>\n                    <input type="{checkbox_type}" class="frm_{checkbox_type} js_cpc_cat_item" data-category_id="{item.category_id}" value="{item.category_id}" {if item.selected}checked=\'checked\'{/if}>\n                </label>\n                {/each}\n                {if checkbox_type == \'radio\'}\n                <p class="tips_global">仅支持选择同类目下单品，更换类目后会清空已选单品</p>\n                {/if}   \n            </div>\n        </div>\n    </div>\n</div>\n';
});
define("tpl/media/adcpc.html.js", [], function () {
    return '<div class="mpda_cpc_choose_context">\n    <div class="frm_control_group">\n        <label for="" class="frm_label">广告位内容</label>\n        <div class="frm_controls frm_vertical_pt">\n            <label class="frm_radio_label">\n                <i class="icon_radio"></i>\n                <span class="lbl_content mini_tips icon_after" id="js_ad_mini_ask">仅限定商品类目 <i class="icon_msg_mini ask"></i> </span>\n                <input type="radio" class="frm_radio js_cpc_type" value="0">\n            </label>\n            {if can_use_single_ad == 1}\n            <label class="frm_radio_label selected">\n                <i class="icon_radio"></i>\n                <span class="lbl_content">精选单个商品</span>\n                <input type="radio" class="frm_radio js_cpc_type" value="1">\n            </label>\n            {/if}\n        </div>\n    </div>\n\n    <div class="js_cpc_cat_container"></div>\n\n    <div class="frm_control_group js_single_ad_container"></div>\n    \n    <p class="empty_tips js_single_loading" style="display:none;">\n        <i class="icon_loading_small white"></i>\n    </p>\n</div>\n';
});
define("tpl/media/adtips.html.js", [], function () {
    return '<div class="mpda_preview_area">\n    <div class="wx_preview_default">\n        <div class="wx_preview_default_hd">\n            <h3 class="wx_preview_default_title">{title}</h3>\n        </div>\n        <div class="mpda_tips_box">\n            <p class="tips_global">{=ad_info.ad_tips}</p>\n        </div>\n        <div class="mpda_wrp">\n            <div class="mpda_area show">\n                <div class="mpda_placeholder">\n                    <p class="mpda_tips">广告，也是生活的一部分</p>\n                </div>\n                <div class="mpda_inner">\n                    <div class="mpda_hd">\n                        <span class="mpda_main_img img_bg_cover" style="background-image:url({ad_info.ad_img})"></span> \n                    </div>\n                    <div class="mpda_bd"> \n                        <span class="mpda_logo img_bg_cover" style="background-image:url({ad_info.img})"></span>\n                        <div class="mpda_desc_box">\n                            <p class="mpda_title">{ad_info.nick_name}</p>\n                            <p class="mpda_details">提供的广告</p>\n                        </div>\n                        <a class="mpda_btn_more">\n                        {if ad_info.pt == 108 || ad_info.pt==116}\n                        查看详情                        {else if ad_info.pt == 109}\n                        下载应用                        {else if ad_info.pt == 110 || ad_info.pt==117}\n                        了解公众号                        {/if}\n                        </a>\n                        <a class="mpda_btn_about" href="javascript:void(0);">关于赞助广告</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n<div class="mpda_msg_area">\n    <div class="admsg_confirm_info">\n        <div class="admsg_info_key">推广要求</div>\n        <div class="admsg_info_value">\n            <!-- {if ad_info.background}\n            {=ad_info.background}\n            {else}\n            无            {/if} -->\n            {if ad_info.background}\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_bd">\n                    {=ad_info.background}\n                </div>\n            </div>\n            {/if}\n\n            {if ad_info.ad_request.length}\n            {each ad_info.ad_request as a}\n            {if a.field == \'no_compete\' || a.field == \'no_policy\'}\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_hd">\n                    {a.title}\n                </div>\n                <div class="admsg_info_faq_bd">\n                    {each a.content as c}\n                    <span class="radius_tag">{c}</span>\n                    {/each}\n                </div>\n            </div>\n            {else}\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_hd">\n                    {a.title}\n                </div>\n                <div class="admsg_info_faq_bd">\n                    {a.content}\n                </div>\n            </div>\n            {/if}\n            {/each}\n            {/if}\n\n            <!-- \n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_bd">\n                    xxxxxxxxxxxxxxxxxxxxxxx\n                </div>\n            </div>\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_hd">\n                    禁止出现竞品\n                </div>\n                <div class="admsg_info_faq_bd">\n                    <span class="radius_tag">华为</span>\n                    <span class="radius_tag">小米</span>\n                </div>\n            </div>\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_hd">\n                    禁止涉及敏感内容\n                </div>\n                <div class="admsg_info_faq_bd">\n                    <span class="radius_tag">政治</span>\n                    <span class="radius_tag">宗教</span>\n                </div>\n            </div>\n            <div class="admsg_info_faq">\n                <div class="admsg_info_faq_hd">\n                    其它\n                </div>\n                <div class="admsg_info_faq_bd">\n                    xxxxxxxxxxxxxxxxxxxxxxx\n                </div>\n            </div>\n            -->\n        </div>\n    </div>\n    <!--\n    {if ad_info.ad_request.length}\n    <div class="admsg_confirm_info">\n        <div class="admsg_info_key">服务要求</div>\n        <ol class="admsg_info_value">\n            {each ad_info.ad_request as a}\n            <li class="admsg_value_item">{a.title}：{a.content}</li>\n            {/each}\n        </ol>\n    </div>\n    {/if}\n    -->\n    <div class="admsg_confirm_info">\n        <div class="admsg_info_key">\n            {if ad_info.trade_mode == 1} <!-- 软文广告 -->\n            撰文要点            {else}\n            广告宣传语            {/if}\n        </div>\n        <div class="admsg_info_value">\n            {if ad_info.ad_tips}\n            {=ad_info.ad_tips}\n            {else}\n            无            {/if}\n        </div>\n    </div>\n</div>\n';
});
define("tpl/media/admsg.html.js", [], function () {
    return '<div class="admsg_item js_admsg_item" data-aid="{ad_id}">\n    <div class="admsg_item_hd">\n        <p class="admsg_info disabled_desc" {if insert_status == 0 || insert_status == 2}style="display: none;"{/if}>\n        {if insert_status == 1}\n            该广告卡片与图文消息位置不一致        {else if insert_status == 3 || insert_status == 4}\n            该广告卡片素材优化中        {/if}\n        </p>\n        <p class="admsg_info start_time">\n            投放时间：<span>{$changeTime play_time}</span>      \n            <span class="radius_tag">\n                {if trade_mode == 0}\n                广告推荐                {else}\n                内容定制                {/if}\n            </span>\n        </p>\n    </div>\n    <div class="admsg_item_bd">\n        <div class="mpda_wrp">\n            <div class="mpda_area show">\n                <div class="mpda_placeholder">\n                    <p class="mpda_tips">广告，也是生活的一部分</p>\n                </div>\n                <div class="mpda_inner">\n                    <div class="mpda_hd">\n                        <span class="mpda_main_img img_bg_cover" style="background-image:url({ad_img})"></span> \n                    </div>\n                    <div class="mpda_bd"> \n                        <span class="mpda_logo img_bg_cover" style="background-image:url({img})"></span>\n                        <div class="mpda_desc_box">\n                            <p class="mpda_title">{nick_name}</p>\n                            <p class="mpda_details">提供的广告</p>\n                        </div>\n                        <a class="mpda_btn_more">\n                        {if pt == 108||pt==116}\n                        了解详情                        {else if pt == 109}\n                        下载应用                        {else if pt == 110||pt==117}\n                        了解公众号                        {/if}\n                        </a>\n                        <a class="mpda_btn_about" href="javascript:void(0);">关于赞助广告</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="admsg_item_ft {if insert_status == 0 || insert_status == 2}js_cover{/if}">\n        <div class="cover_choosable icon_card_selected" {if insert_status != 0 && insert_status != 2}style="display: none;"{/if}></div>\n        <div class="cover_un_choosable" {if insert_status == 0 || insert_status == 2}style="display: none;"{/if}>\n        {if insert_status == 1}\n            该广告卡片与图文消息位置不一致        {else if insert_status == 3 || insert_status == 4}\n            该广告卡片素材优化中        {/if}\n        </div>\n    </div>\n</div> \n';
});
define("tpl/media/dialog/admsg_dialog.html.js", [], function () {
    return '<div><!-- popup组件也是感人，debug了一个多钟，发现外层没有div会调用3次 -->\n    <div class="processor_bar_wrp js_step">\n        <!-- 初始化进度条 -->\n    </div>\n    <div class="processor_panel">\n        <!-- 第一步：选择广告 -->\n        <div class="loading_box js_loading" style="display: none;">\n            <i class="icon_loading_small white"></i>\n            <span class="vm_box"></span>\n        </div>\n        <div class="processor_content_step admsg_choose js_step1_view" style="display: none;">\n            <div class="admsg_choose_bd">\n                \n                <div class="mpda_list_area">\n                    <div class="js_cpc_area" style="display:none;">\n                        <strong class="mpda_list_title">选择文中广告</strong>\n                        <div class="cpc_area ">\n                            <div class="appmsg_card_context mpda_cpc_context js_admsg_item">\n                                <div class="appmsg_card_bd mpda_cpc_bd" style="background-image:url(/mpres/htmledition/images/pic/media/mpda/pic_mpda_cpc_thumb.png);"></div>\n                                <div class="appmsg_card_ft mpda_cpc_ft">\n                                    <span class="dropdown_opr_tips">\n                                        广告\n                                        <span class="dropdown_opr_popover">xxxxx</span>\n                                    </span>\n                                </div>\n                                <a href="javascript:void(0);" class="appmsg_card_btn">\n                                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAV1BMVEUAAAB2h9x4id51iNx1h9x1h9x2h9x2h912iNx9jOB2htx1htx1h9x1htx2h9x3iN94h9yDkup1h9x1htt2htx1h912ht14h9x2id58i+B3iNyAmeZ1htuK6q6xAAAAHHRSTlMAmS969uOvhWYY9/Dn1cw3Pwvp3MJvYVFFIToKgBX0wAAAALVJREFUKM+t0NsKgzAQhGFNk5h4tmfb//2fs2m3i0Txzrka+GBZpjgiU7i29aWctzI4frGntRiLZm0d4O+PqoF6yOSZJHxLdOAzOkEvLcA5oxJKaSPYHaqg25BeptKvb6+FTJ+kjQI+9ag0OaAxIk3q7q0UAS8S29R7sxwcbwLpG51FaUmn32zJwrhDZwjS+vXgHlz8D8czo6GGpnrcPbJOPrjGmmJtVsQNxSZzeanba5iKA/IBYyoQUSgoEyQAAAAASUVORK5CYII=" alt="">\n                                    去逛逛                                </a>\n                                <div class="card_mask_global"><i class="icon_card_selected_global"></i></div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="js_ad_list" style="display: none;">\n                        <strong class="mpda_list_title">选择互选广告</strong>\n                        <div class="admsg_list">\n                        <!-- \n                            admsg_item在js/tpl/media/admsg.html\n                            admsg_col有两列需要像视频消息一样依次堆到这两列中 \n                            ！！示例：\n                            <div class="admsg_col">\n                                <div class="admsg_item">第一个item</div>\n                                <div class="admsg_item">第三个item</div>\n                            </div>\n                            <div class="admsg_col">\n                                <div class="admsg_item">第二个item</div>\n                                <div class="admsg_item">第四个item</div>\n                            </div>\n                            哈哈哈哈这里Radeon你get了就可以删掉了\n                        -->\n                            <div class="admsg_col">\n\n                            </div>\n                            <div class="admsg_col">\n                                \n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="admsg_choose_ft">\n                <div class="pagination_wrp js_pagebar"></div>\n            </div>\n            <div class="processor_step_opr">\n                <span class="btn btn_primary btn_input js_next">\n                    <button type="button">下一步</button>\n                </span>\n            </div>\n        </div>\n        <!-- 第二步：广告条款 -->\n        <div class="processor_content_step admsg_confirm js_step2_view" style="display: none;">\n            <div class="mpda_send_panel js_adtips"></div>\n            <div class="processor_step_opr">\n                <div class="dialog_tool_tips js_dialog_mini_tips" style="display:none;"></div>\n                <span class="btn btn_default btn_input js_prev">\n                    <button type="button">上一步</button>\n                </span>\n                <span class="btn btn_primary btn_input js_submit">\n                    <button type="button">确定</button>\n                </span>\n            </div>\n        </div>\n    </div>\n</div>\n';
});
define("tpl/media/videocard.html.js", [], function () {
    return '<div id="wxVideoBox{id}" data-errmsg=\'{err_msg}\' class="richvideo with_msg_box Js_videomsg" {if video_ori_status == 1 && is_new_video && status == 3}data-original="1"{else}data-original="0"{/if} data-vid={video_id} data-title={title} data-duration={duration} data-cover={cover}>\n    <div class="richvideo_content" style="z-index: 0">\n        <h4 class="title">\n            {if video_ori_status == 1 && is_new_video && (status == 3 || for_selection)}\n            <i class="icon_tag_default original"></i>\n            {else if video_ori_status == 2 && is_new_video && (status == 3 || for_selection)}\n            <i class="icon_tag_default republish"></i>\n            {/if}\n            {title}\n        </h4>\n        <div class="video_info">\n            <em class="time">{time}</em>\n            <em class="res">{from}</em>\n        </div>\n        <div class="video_extra_info" data-seq="{seq}">\n            <img class="video_thumb" src="{if !cover}{if !!multi_item}{each multi_item as value}{value.cover}{/each}{/if}{else}{cover}{/if}" alt="">\n            {if is_new_video && status != 4}\n            <span class="video_length">{duration}</span>\n            {/if}\n            {if status == 0 || (status == 3 && video_ori_status == 0 && !before_original_video)}\n            <div class="status_mask">\n            <span class="status_msg">\n                审核中            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if err_msg}\n            <div class="status_mask">\n            <span class="status_msg">\n                {err_msg}\n            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 1}\n            <div class="status_mask">\n            <span class="status_msg">\n                资料不完整            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 2}\n            <div class="status_mask">\n            <span class="status_msg mini_tips icon_after">\n                审核不通过                <i class="icon_mini_tips ask_white js_fail_reason" data-seq="{seq}"></i>\n            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 3 && applyori == 1 && ((video_ori_status == 3 && (ori_fail_reason == 1 || ori_fail_reason == 3 || ori_fail_reason == 5) && is_new_video) || video_ori_status == 2) }\n            <div class="status_mask">\n            <span class="status_msg">\n                原创声明失败<i class="icon_mini_tips ask_white js_declare_fail" data-seq="{seq}" data-url="{url}" data-ori="{video_ori_status}" data-reason="{ori_fail_reason}" data-vid="{content}" data-name="{hit_nickname}"></i>\n            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 3 && is_new_video}\n            <div class="play_mask">\n                <i class="icon_video_play"> </i>\n                <span class="vm_box"></span>\n            </div>\n\n            {else if status == 4}\n            <div class="status_mask">\n            <span class="status_msg">\n                转码中            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 5}\n            <div class="status_mask">\n            <span class="status_msg">\n                转码失败<i class="icon_mini_tips ask_white js_fail_code" data-seq="{seq}"></i>\n            </span>\n            <span class="vm_box"></span>\n            </div>            \n            {/if}\n        </div>\n        <div class="video_desc" data-digest="{digest}">{digest}</div>\n    </div>\n\n    {if for_operation}\n    <div class="richvideo_opr">\n        <ul class="grid_line" >\n            {if is_new_video}\n            <li class="richvideo_opr_item grid_item size1of2">\n            <a class="js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-seq="{seq}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of2 no_extra">\n            <a class="js_del js_tooltip" href="javascript:void(0);" data-id="{app_id}" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n            {else if is_new_video==0 && video_url!=""} <!-- 微信视频 -->\n            <li class="richvideo_opr_item grid_item size1of3">\n            <a class="js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-seq="{seq}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of3">\n                <a {if for_transfer}href="javascript:;" class="js_tooltip js_download"{else}href="{video_download_url}" class="js_tooltip"{/if} data-tooltip="下载">\n                    <i class="icon18_common download_gray">下载</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of3 no_extra">\n            <a class="js_del js_tooltip" href="javascript:void(0);" data-id="{app_id}" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n            {else } <!-- 微视视频 -->\n            <li class="richvideo_opr_item grid_item size1of2">\n            <a class="js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-seq="{seq}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of2 no_extra">\n            <a class="js_del js_tooltip" href="javascript:void(0);" data-id="{app_id}" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n            {/if}\n        </ul>\n    </div>\n    {/if}\n    {if for_selection && !(status == 3 && video_ori_status == 0 && !before_original_video) && !err_msg}\n    <div class="richvideo_mask"></div>\n    <i class="icon_card_selected">已选择</i>\n    {/if}\n</div>\n<div class="richvideo_msg_box">\n    <p class="mini_tips warn" style="display: none;">\n    {err_msg}\n    </p>\n</div>';
});
define("tpl/media/dialog/videomsg_layout.html.js", [], function () {
    return '<div class="dialog_media_container">\n    <div class="sub_title_bar in_dialog">\n        <div class="title_tab js_videotab weui-desktop-tab_dialog"></div>\n        <div class="search_bar dn">\n            <span class="frm_input_box search with_del append">\n                <a class="del_btn" href="javascript:"><i class="icon_search_del"></i>&nbsp;</a>\n                <a id="msgSearchBtn" href="javascript:" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input id="msgSearchInput" type="text" placeholder="关键字" value="" class="frm_input">\n            </span>\n        </div>\n        <div class="richvideo_create js_video_create">\n            <a class="btn btn_primary btn_add" target="_blank" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&type=15&lang=zh_CN&token={token}">\n                <i class="icon14_common add_white"></i>新建视频            </a>\n        </div>\n    </div>\n    <div class="js_video_status js_video_content dn">\n        <div class="richvideo_list media_dialog" id="js_videomsg_list">\n            <div class="richvideo_col"><div class="inner"></div></div>&nbsp;\n            <div class="richvideo_col"><div class="inner"></div></div>\n        </div>\n    </div>\n    <div class="js_video_status js_video_tencent link_search_video_box dn js_video_search">\n        <div class="video">\n            <div class="frm_control_group">\n                <label for="" class="frm_label">视频/图文网址</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box">\n                        <input type="text" class="frm_input js_video_txurl js_video_url" placeholder="支持插入微信公众号文章链接、视频详情页链接和腾讯视频链接">\n                    </span>\n                    <p class="frm_msg fail js_video_url_tip">只支持已发布的微信公众号链接、视频详情页链接和腾讯视频链接</p>\n                </div>\n            </div>\n			<!-- <div class="video_preview js_video_preview"></div> --><!-- 原来的js_video_preview去掉改成和素材库、小视频一样的方式通过richvideo_list插入视频@lulu -->\n		</div>\n        <div class="richvideo_list media_dialog" id="js_video_search_list">\n            <div class="richvideo_col"><div class="inner"></div></div><!-- 这里能否控制如果是腾讯视频的链接则只显示一个richvideo_col，如需支持多视频才显示两个richvideo_col？@lulu\n            肯定可以啊！ @radeonwu -->\n            <div class="richvideo_col"><div class="inner"></div></div>\n            <!--<div class="pagination_wrp pageNavigator js_video_tencent_pagebar"></div>--><!-- 如果有多视频的情况下才显示分页，视频搜索这里用单独的分页组件，不要使用外面的分页（js_pagebar） @lulu-->\n            <!--图文消息最多出现3个视频，这里不需要分页 @radeonwu-->\n        </div>\n    </div>\n    <div class="js_video_status js_video_loading">\n        <i class="icon_loading_small white">loading...</i>\n    </div>\n    <div class="js_video_status js_video_none dn">\n        <div class="no_media_wrp">\n            <p class="empty_tips js_empty_tips"></p>\n            <!--\n            <div class="richvideo_create js_video_create">\n                <a class="" target="_blank" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&type=15&lang=zh_CN&token={token}">\n                    <i class="icon_richvideo_small"></i><strong>新建视频消息</strong>\n                </a>\n            </div>\n            -->\n        </div>\n        <span class="vm_box"></span>\n    </div>\n    \n    <div class="pagination_wrp pageNavigator js_pagebar"></div><!-- 在视频搜索的tab下不要使用这个分页组件 @lulu-->\n</div>\n\n';
});
define("common/wx/media/video.js", ["widget/media/richvideo.css", "widget/media.css", "biz_web/lib/video.js", "common/wx/Cgi.js", "common/wx/time.js", "common/qq/Class.js", "biz_web/lib/swfobject.js", "tpl/media/video.html.js", "tpl/media/simple_videomsg.html.js", "tpl/media/wxvideo.html.js", "tpl/media/videomsg.html.js"], function (e) {
    "use strict";
    e("widget/media/richvideo.css"), e("widget/media.css");
    var i, o = e("biz_web/lib/video.js"), t = e("common/wx/Cgi.js"), d = e("common/wx/time.js"), s = e("common/qq/Class.js"), n = e("biz_web/lib/swfobject.js"), a = e("tpl/media/video.html.js"), r = wx.T, l = wx.data.t, m = document, c = !!n.ua.pv[0], f = m.createElement("video"),
        u = navigator.userAgent.toLowerCase(), v = /msie/.test(u), p = /firefox/.test(u);
    o.options.flash.swf = wx.path.video;
    var w = {
        id: "",
        source: "",
        type: "",
        file_id: ""
    }, h = 5e3, g = function (e) {
        if (e.video_url) {
            {
                var i = "tmp" + (1e5 * Math.random() | 0);
                $('<video id="%s"></video>'.sprintf(i)).appendTo("body");
            }
            o("#" + i).ready(function () {
                $("#" + i).hide();
                var o = this;
                this.on("error", function () {
                    o.dispose(), e.dom.find(".loading_tips").show(), e.video_url = "", setTimeout(function () {
                        g(e);
                    }, h);
                }), this.on("loadedmetadata", function () {
                    o.dispose(), $(e.selector).children().remove(), e.for_transfer = !1, e.digest = e.digest ? e.digest.html(!1) : "",
                        new x(e);
                });
                var t = e.video_url;
                o.src(f.canPlayType ? t : [{
                    type: "video/x-flv",
                    src: t + "&trans=1"
                }]), o.play();
            });
        } else t.get({
            url: wx.url("/cgi-bin/appmsg?action=get_video_url&videoid=%s".sprintf(e.video_id)),
            error: function () {
                setTimeout(function () {
                    g(e);
                }, h);
            }
        }, function (i) {
            e.video_url = i.video_url || "", e.video_download_url = i.video_download_url || "", setTimeout(function () {
                g(e);
            }, h);
        });
    }, x = s.declare({
        init: function (o) {
            function t() {
                var e = window.navigator.userAgent;
                return e.toLowerCase().indexOf("firefox") > -1 ? !0 : e.toLowerCase().indexOf("msie ") > -1 && "Microsoft Internet Explorer" == navigator.appName ? !0 : !1;
            }

            var s = this;
            if ($(o.selector).data("opt", o), o = $.extend(!0, {}, w, o), s.id = o.id, s.source = o.source,
                s.file_id = o.file_id, s.type = o.type, s.video_url = o.video_url, s.tpl = o.tpl, s.ff_must_flash = o.ff_must_flash,
                o.src = s.getVideoURL(), o.token = l || wx.data.t, o.time = o.create_time ? d.timeFormat(o.create_time) : "",
                o.digest = o.digest ? o.digest.replace(/<br.*>/g, "\n").html() : "", o.for_network = "string" == typeof o.video_url ? !o.video_url : !o.content,
            !o.file_id && o.multi_item && o.multi_item.length > 0) {
                var n = o.multi_item[0];
                n && n.cover && (o.img_url = n.cover);
            }
            i = e(o.sent ? "tpl/media/simple_videomsg.html.js" : 21 == +o.type || 9 == +o.type || 11 == +o.type ? "tpl/media/wxvideo.html.js" : "tpl/media/videomsg.html.js");
            var m = $("videomsg" == o.tpl ? r(i, o) : r(a, o));
            s.dom = o.dom = $(o.selector).append(m), "videomsg" == o.tpl && o.for_transfer && g(o, s.dom),
            s.dom.find(".video_desc").length && s.dom.find(".video_desc").html(s.dom.find(".video_desc").attr("data-digest").replace(/\n/g, "<br>")),
                s.dom.find(".wxVideoScreenshot").on("click", function () {
                    s.dom.find(".mediaContent").css({
                        height: "auto"
                    }), t() ? (s.dom.addClass("wxVideoPlaying"), s.dom.find(".wxVideoPlayer").hide(), s.dom.find(".wxVideoNoSupport").show()) : s.play(o.play);
                }), s.dom.find(".wxNetworkVideo").on("click", function () {
                window.open($(this).attr("data-contenturl"));
            }), s.dom.find(".video_switch").click(function () {
                s.dom.find(".mediaContent").css({
                    height: "104px"
                }), t() ? s.dom.removeClass("wxVideoPlaying") : s.pause(o.pause);
            });
        },
        getVideoURL: function () {
            var e = this.source, i = this.id, o = (this.msg_id || "", this.file_id);
            return e && (e = "&source=" + e), this.video_url || "/cgi-bin/getvideodata?msgid={msgid}&fileid={fileid}&token={token}{source}".format({
                msgid: i,
                fileid: o,
                source: e,
                token: wx.data.t
            });
        },
        canPlayType: function () {
            this.type;
            return !f.canPlayType && !c;
        },
        play: function (e) {
            var i = this;
            if (i.canPlayType()) return void alert("您当前浏览器无法播放视频，请安装Flash插件/更换Chrome浏览器");
            var t = this.id, d = this.player;
            if (d) return $("#wxVideoBox" + t).addClass("wxVideoPlaying").find(".wxVideoPlayContent").show(),
                d.play(), e && e(this);
            var s = i.getVideoURL();
            $("#wxVideoBox" + t).addClass("wxVideoPlaying").find(".wxVideoPlayContent").show();
            var n = "videomsg" == i.tpl ? {
                width: "100%",
                height: "100%"
            } : {};
            o("#wxVideo" + t, n).ready(function () {
                d = this;
                var o = 0;
                return d.on("fullscreenchange", function () {
                    o ? ($("#wxVideoPlayer" + t).css({
                        overflow: "hidden",
                        zoom: "1"
                    }), $("#wxVideoBox" + t).css({
                        "z-index": "0"
                    })) : ($("#wxVideoPlayer" + t).css({
                        overflow: "visible",
                        zoom: "normal"
                    }), $("#wxVideoBox" + t).css({
                        "z-index": "1"
                    })), o = ~o;
                }), d.on("ended", function () {
                    this.currentTime(0);
                }), d.src(v || !f.canPlayType || i.ff_must_flash && p ? [{
                    type: "video/x-flv",
                    src: s + "&trans=1"
                }] : s), d.play(), i.player = d, e && e(this);
            });
        },
        pause: function (e) {
            var i = this.player;
            i && i.pause(), $("#wxVideoBox" + this.id).removeClass("wxVideoPlaying").find(".wxVideoPlayContent").hide(),
            e && e(this);
        }
    });
    return x;
});
define("common/wx/top.js", ["tpl/top.html.js"], function (a, e, t) {
    "use strict";

    function i(a, e, t) {
        return this.dom = $(a), this.dom.addClass("title_tab"), e && "string" == typeof e && (e = [{
            name: "",
            url: "javascript:;",
            className: "selected"
        }]), $.each(e, function (a, e) {
            e.url = e.url && [e.url, wx.data.param].join("") || "javascript:;";
        }), this.dom.html(template.compile(n)({
            data: e
        })), t && t.render && "function" == typeof t.render ? $.each(this.dom.find("li"), function (a, i) {
            t.render.apply($(i), [e[a], t && t.data]);
        }) : this.dom.html(template.compile(n)({
            data: e
        })), this.dom.on("click", ".top_item", function () {
            $(this).addClass("selected").siblings().removeClass("selected");
        }), this;
    }

    var n = a("tpl/top.html.js"), s = wx.acl;
    i.prototype.selected = function (a) {
        this.dom.find(".js_top").removeClass("selected"), "number" == typeof a ? this.dom.find(".js_top:eq(" + a + ")").addClass("selected") : this.dom.find(".js_top[data-id=" + a + "]").addClass("selected");
    }, i.DATA = {
        setting: [{
            id: "info",
            name: "帐号详情",
            url: "/cgi-bin/settingpage?t=setting/index&action=index"
        }, {
            id: "function",
            name: "功能设置",
            url: "/cgi-bin/settingpage?t=setting/function&action=function"
        }],
        mass: [{
            id: "send",
            name: "新建群发消息",
            url: "/cgi-bin/masssendpage?t=mass/send"
        }, {
            id: "jurisdiction",
            name: "授权申请",
            acl: s && s.msg_acl && s.msg_acl.can_use_reprintapply_list,
            url: "/cgi-bin/copyrightlib?action=reprint_article&begin=0&count=10&auth_status=0&lang=zh_CN"
        }],
        message: [{
            id: "total",
            name: "全部消息",
            url: "/cgi-bin/message?t=message/list&count=20&day=7"
        }, {
            id: "star",
            name: "已收藏的消息",
            url: "/cgi-bin/message?t=message/list&count=20&action=star"
        }, {
            id: "search",
            name: "搜索结果"
        }],
        media: [{
            id: "media11",
            name: "商品消息",
            acl: s && s.material_acl && s.material_acl.can_commodity_app_msg,
            url: "/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list&type=11&action=list"
        }, {
            id: "media10",
            name: "图文消息",
            acl: s && s.material_acl && s.material_acl.can_app_msg,
            url: "/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list2&type=10&action=list_card"
        }, {
            id: "media2",
            name: "图片",
            acl: s && s.material_acl && s.material_acl.can_image_msg,
            url: "/cgi-bin/filepage?type=2&begin=0&count=12&t=media/img_list"
        }, {
            id: "media3",
            name: "语音",
            acl: s && s.material_acl && s.material_acl.can_voice_msg,
            url: "/cgi-bin/filepage?type=3&begin=0&count=21&t=media/list"
        }, {
            id: "media15",
            name: "视频",
            acl: s && s.material_acl && s.material_acl.can_video_msg,
            url: "/cgi-bin/appmsg?begin=0&count=9&t=media/video_list&action=list_video&type=15"
        }, {
            id: "product",
            name: "商品",
            acl: s && s.product_acl && s.product_acl.can_see_product,
            url: "/cgi-bin/productmaterial?action=product_list"
        }],
        business: [{
            id: "overview",
            name: "数据概览",
            url: "/merchant/business?t=business/overview&action=overview"
        }, {
            id: "order",
            name: "订单流水",
            url: "/merchant/business?t=business/order&action=order"
        }, {
            id: "info",
            name: "商户信息",
            url: "/merchant/business?t=business/info&action=info"
        }, {
            id: "test",
            name: "支付测试",
            url: "/merchant/business?t=business/whitelist&action=whitelist"
        }, {
            id: "rights",
            name: "维权仲裁",
            url: "/merchant/shop_rights?t=business/rights_list&action=batchgetpayfeedback"
        }, {
            id: "course",
            name: "使用教程",
            url: "/merchant/business?t=business/course&action=course"
        }],
        user: [{
            id: "useradmin",
            name: "已关注",
            url: "/cgi-bin/contactmanage?t=user/index&pagesize=10&pageidx=0&type=0&groupid=0"
        }],
        statistics: {
            user: [{
                id: "summary",
                name: "用户增长",
                url: "/misc/pluginloginpage?action=stat_user_summary&pluginid=luopan&t=statistics/index"
            }, {
                id: "attr",
                name: "用户属性",
                url: "/misc/pluginloginpage?action=stat_user_attr&pluginid=luopan&t=statistics/index"
            }],
            article: [{
                id: "detail",
                name: "图文群发",
                url: "/misc/pluginloginpage?action=stat_article_detail&pluginid=luopan&t=statistics/index"
            }, {
                id: "analyse",
                name: "图文统计",
                url: "/misc/pluginloginpage?action=stat_article_analyse&pluginid=luopan&t=statistics/index"
            }],
            message: [{
                id: "message",
                name: "消息分析",
                url: "/misc/pluginloginpage?action=stat_message&pluginid=luopan&t=statistics/index"
            }, {
                id: "key",
                name: "消息关键词",
                url: "/misc/pluginloginpage?action=ctr_keyword&pluginid=luopan&t=statistics/index"
            }],
            "interface": [{
                id: "interface",
                name: "接口分析",
                url: "/misc/pluginloginpage?action=stat_interface&pluginid=luopan&t=statistics/index"
            }]
        },
        notification: [{
            id: "notification",
            name: "通知中心",
            url: "/cgi-bin/frame?t=notification/index_frame"
        }],
        templateMessage: [{
            id: "my_template",
            name: "我的模版",
            url: "/advanced/tmplmsg?action=list&t=tmplmsg/list"
        }, {
            id: "template_message",
            name: "模版库",
            url: "/advanced/tmplmsg?action=tmpl_store&t=tmplmsg/store"
        }],
        assistant: [{
            id: "mphelper",
            name: "公众号助手",
            url: "/misc/assistant?t=setting/mphelper&action=mphelper"
        }, {
            id: "warning",
            name: "接口告警",
            url: "/misc/assistant?t=setting/warning&action=warning"
        }],
        shop: [{
            id: "shopoverview",
            name: "小店概况",
            url: "/merchant/merchantstat?t=shop/overview&action=getoverview"
        }, {
            id: "addGoods",
            name: "添加商品",
            url: "/merchant/goods?type=11&t=shop/precreate",
            target: "_blank"
        }, {
            id: "goodsManagement",
            name: "商品管理",
            url: "/merchant/goodsgroup?t=shop/category&type=1"
        }, {
            id: "shelfManagement",
            name: "货架管理",
            url: "/merchant/shelf?status=0&action=get_shelflist&t=shop/myshelf&offset=0&count=5"
        }, {
            id: "orderManagement",
            name: "订单管理",
            url: "/merchant/productorder?action=getlist&t=shop/order_list&last_days=30&count=10&offset=0"
        }, {
            id: "deliverylist",
            name: "运费管理",
            url: "/merchant/delivery?action=globalfee&t=shop/delivery_global"
        }, {
            id: "images",
            name: "图片库",
            url: "/merchant/goodsimage?action=getimage&t=shop/shop_img&count=20&offset=0"
        }],
        adClient: [{
            id: "adclientreport",
            name: "报表统计",
            url: "/merchant/ad_client_report?t=ad_system/client_report&action=list"
        }, {
            id: "adclientmanage",
            name: "广告管理",
            url: "/merchant/advert?t=ad_system/promotion_list&action=get_advert_count"
        }, {
            id: "materialmanage",
            name: "推广页管理",
            url: "/merchant/ad_material?t=material/list&action=get_material_list"
        }, {
            id: "adclientpay",
            name: "财务管理",
            url: "/cgi-bin/frame?nav=10026&t=ad_system/host_frame"
        }, {
            id: "adservice",
            name: "广告服务商",
            acl: s && s.ad_system && s.ad_system.can_use_sp,
            url: "/cgi-bin/frame?nav=10026&t=ad_system/client_service_frame"
        }],
        adHost: [{
            id: "adhostreport",
            name: "报表统计",
            url: "/merchant/ad_host_report?t=ad_system/host_report"
        }, {
            id: "adhostmanage",
            name: "流量管理",
            url: "/merchant/ad_host_manage?t=ad_system/host_manage"
        }, {
            id: "adhostpay",
            name: "财务管理",
            url: "/merchant/ad_host_pay?action=ad_host_pay&t=ad_system/host_pay"
        }],
        advanced: [{
            id: "dev",
            name: "日志查询",
            url: "/advanced/advanced?action=log_home"
        }, {
            id: "group-alert",
            name: "接口报警",
            url: "/advanced/advanced?action=alarm&t=advanced/alarm"
        }],
        cardticket: [{
            id: "cardmgr",
            name: "卡券管理",
            url: "/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card"
        }, {
            id: "permission",
            name: "卡券核销",
            url: "/merchant/carduse?action=listchecker&t=cardticket/permission"
        }, {
            id: "carduse",
            name: "核销记录",
            url: "/merchant/carduserecord?action=listrecord&t=cardticket/carduse_record"
        }, {
            id: "cardreport",
            name: "数据报表",
            url: "/merchant/ecardreport?action=overviewpage&t=cardticket/overviewpage"
        }],
        infringement: [{
            id: "infringement",
            name: "我要投诉",
            url: "/acct/infringement?action=getmanual&t=infringement/manual&type=1"
        }, {
            id: "antiinfringement",
            name: "我要申诉",
            url: "/acct/infringement?action=getmanual&t=infringement/manual&type=2"
        }, {
            id: "list",
            name: "提交记录",
            url: "/acct/infringement?action=getlist&t=infringement/ingringement_list&type=1&begin=0&count=10"
        }],
        scan: [{
            id: "overview",
            name: "数据概况",
            url: "/merchant/scandataoverview?action=keydata"
        }, {
            id: "product_list",
            name: "商品管理",
            url: "/merchant/scanproductlist?action=list&page=1&status=1"
        }, {
            id: "firmcat_list",
            name: "资质管理",
            url: "/merchant/scanqualification?action=firmcatpage"
        }],
        rumor: [{
            id: "list",
            name: "谣言池",
            url: "/misc/rumor?action=rumorlist&t=rumor/list"
        }, {
            id: "result",
            name: "辟谣数据",
            url: "/misc/rumor?action=summarylist&t=rumor/result"
        }],
        reward: [{
            id: "list",
            name: "数据概况",
            url: "/merchant/rewardstat?action=getoverview&t=reward/overview"
        }, {
            id: "setting",
            name: "赞赏设置",
            url: "/merchant/reward?action=rewardsetting"
        }],
        discuss: [{
            id: "list_latest",
            name: "留言列表",
            url: "/misc/appmsgcomment?action=list_latest_comment&begin=0&count=10&mp_version=7"
        }, {
            id: "index",
            name: "群发消息管理",
            url: "/misc/appmsgcomment?action=list_app_msg&begin=0&count=10"
        }],
        search: [{
            id: "search",
            name: "搜索",
            url: "/advanced/componentsearch?action=search"
        }, {
            id: "authorized",
            name: "已添加",
            url: "/cgi-bin/component_unauthorize?action=list&t=service/auth_plugins"
        }],
        kf: [{
            id: "account",
            name: "账号管理",
            url: "/misc/kf?t=services/list&action=list"
        }, {
            id: "state",
            name: "客服数据",
            url: "/misc/kf?t=services/kf_stat&action=getstatpage"
        }, {
            id: "media",
            name: "客服素材",
            url: "/misc/kf?t=services/kf-public-text&action=publicreplypage"
        }],
        ibeacon: [{
            id: "deviceManagement",
            name: "设备管理",
            url: "/merchant/beacongetdevices?action=list"
        }, {
            id: "pageManagement",
            name: "页面管理",
            url: "/merchant/beaconlistpage?action=list&need_dc=1"
        }, {
            id: "dataReport",
            name: "数据报表",
            url: "/merchant/beaconstatsummary?action=list"
        }]
    }, s && s.ad_system && s.ad_system.can_use_new_ad && (i.DATA.adClient[0].url = "/cgi-bin/frame?nav=10026&t=ad_system/client_report_frame",
        i.DATA.adClient[1].url = "/cgi-bin/frame?nav=10026&t=ad_system/promotion_list_frame"),
    s && s.merchant_acl && s.merchant_acl.can_use_account_manage && i.DATA.adClient.push({
        id: "adclientaccountmanage",
        name: "账户管理",
        acl: s && s.ad_system && s.ad_system.can_use_account_manage,
        url: "/cgi-bin/frame?nav=10026&t=ad_system/account_frame"
    }), s && s.merchant_acl && s.merchant_acl.can_use_pay_tmpl && i.DATA.templateMessage.push({
        id: "template_pay_list",
        name: "支付模板消息",
        url: "/advanced/tmplmsg?action=pay_list&t=tmplmsg/payment"
    }), s && s.merchant_acl && 2 == s.merchant_acl.wxa_mall_status && i.DATA.shop.push({
        id: "weapp_shop_weapp_management",
        name: "小程序管理",
        url: "/misc/wxaadmin?action=index"
    }), i.RENDER = {
        setting: function (a, e) {
            "meeting" == a.id && 15 != e.role && this.remove();
        },
        message: function (a, e) {
            "search" != a.id || e && "search" == e.action || this.remove();
        },
        assistant: function (a, e) {
            "warning" != a.id || e && 0 != e.have_service_package || this.remove();
        },
        reward: function (a, e) {
            "invite" != a.id || e && 0 != e.invite_authority || this.remove();
        }
    }, t.exports = i;
});
define("common/wx/loadscript.js", [], function () {
    "use strict";

    function e(t) {
        e.counter || (e.counter = 1);
        var n = "number" != typeof t.retry ? 1 : t.retry, o = document.createElement("script"), r = document.head || document.getElementsByTagName("head")[0] || document.documentElement, d = t.url + "&t=" + Math.random(), i = t.callbackName, a = "uninitialized",
            u = "undefined" == typeof t.successCode ? 200 : t.successCode, c = "undefined" == typeof t.timeoutCode ? 500 : t.timeoutCode, l = "undefined" == typeof t.scriptErrorCode ? 400 : t.scriptErrorCode, s = !1, f = null, m = function (e) {
                o && !s && (s = !0, f && (clearTimeout(f), f = null), o.onload = o.onreadystatechange = o.onerror = null,
                r && o.parentNode && r.removeChild(o), o = null, i && -1 == i.indexOf(".") && (window[i] = null),
                e != u && "loaded" != a && "function" == typeof t.onerror && t.onerror(e));
            };
        if (i && "function" == typeof t.callback) {
            var p = i;
            -1 == i.indexOf(".") && (i = window[i] ? i + e.counter++ : i, window[i] = function () {
                a = "loaded", t.callback.apply(null, arguments);
            }), d = d.replace("=" + p, "=" + i);
        }
        o.onload = o.onreadystatechange = function () {
            var e = navigator.userAgent.toLowerCase();
            (-1 != e.indexOf("opera") || -1 == e.indexOf("msie") || /loaded|complete/i.test(this.readyState)) && m("loaded" == a ? u : l);
        }, o.onerror = function () {
            return n > 0 ? (t.retry = n - 1, f && (clearTimeout(f), f = null), void e(t)) : void m(l);
        }, t.timeout && (f = setTimeout(function () {
            m(c);
        }, parseInt(t.timeout, 10))), a = "loading", o.charset = "utf-8", setTimeout(function () {
            o.src = d;
            try {
                r.insertBefore(o, r.lastChild);
            } catch (e) {
            }
        }, 0);
    }

    return e;
});
define("common/wx/upload.js", ["widget/upload.css", "biz_web/lib/webuploader.js", "common/wx/dialog.js", "common/wx/Tips.js", "tpl/uploader.html.js"], function (e) {
    "use strict";

    function i(e) {
        f.src = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=4&flag3=5&1=" + e;
    }

    e("widget/upload.css");
    var n = e("biz_web/lib/webuploader.js"), a = e("common/wx/dialog.js"), t = e("common/wx/Tips.js"), o = e("tpl/uploader.html.js"), r = wx.T, s = wx.path.webuploader, l = ~location.hostname.search(/^mp/) ? "https://mp.weixin.qq.com" : "", p = {
        2: {
            accept: {
                extensions: "bmp,png,jpeg,jpg,gif",
                mimeTypes: "image/bmp,image/png, image/jpeg, image/jpg, image/gif"
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
                mimeTypes: "image/bmp,image/png, image/jpeg, image/jpg, image/gif,application/pdf"
            },
            fileSingleSizeLimit: 5242880
        },
        7: {
            accept: {
                extensions: "bmp,jpeg,jpg,gif",
                mimeTypes: "image/bmp, image/jpeg, image/jpg, image/gif"
            },
            fileSingleSizeLimit: 5242880
        },
        8: {
            accept: {
                extensions: "bmp,png,jpeg,jpg",
                mimeTypes: "image/bmp,image/png, image/jpeg, image/jpg"
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
                mimeTypes: "image/bmp,image/png, image/jpeg, image/jpg"
            },
            fileSingleSizeLimit: 5242880
        },
        12: {
            accept: {
                extensions: "mp3,wma,wav,amr",
                mimeTypes: "audio/mp3,audio/wma,audio/wav,audio/amr"
            },
            fileSingleSizeLimit: 31457280
        }
    };
    p[15] = p[4];
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
    }, f = new Image, g = {}, h = function (e) {
        if (!e.url) throw"missing url";
        var a, s, l, m = $('<ul class="upload_file_box" style="display:none"></ul>'), f = $(e.container);
        f.on("click", function () {
            Math.random() < .1 && d(12), c(a);
        }).parent().append(m), function () {
            0 == n.Uploader.support("html5") && 0 == n.Uploader.support("flash") && ((new Image).src = "/misc/jslog?level=error&id=36&content=[pageurl:" + encodeURIComponent(location.href) + ",ua:" + encodeURIComponent(window.navigator.userAgent) + "]");
        }(), s = {
            server: wx.url(e.url + "&ticket_id=" + wx.data.user_name + "&ticket=" + wx.data.ticket + "&svr_time=" + wx.data.time),
            pick: {
                id: f,
                multiple: e.multi
            },
            fileNumLimit: e.queueSizeLimit
        }, l = p[e.type] || p[2], e = $.extend(!0, {}, u, s, l, e);
        e.server;
        0 == n.Uploader.support("html5") && e.compress && (e.compress.quality = 70);
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
            g[e.id] = +new Date;
        }), a.on("uploadSuccess", function (n, a, o) {
            if (Math.random() < .1 && d(16), a && a.base_resp) {
                var r = +a.base_resp.ret;
                if (0 == r) Math.random() < .1 && (d(17), g[n.id] && i(+new Date - g[n.id])); else switch (n.setStatus("invalid"),
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
            this.reset(), m.fadeOut().html(""), g = {}, 0 == i.numOfInvalid && i.numOfSuccess > 0 && e.onAllComplete && e.onAllComplete(null, {
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
                    t.err("图片压缩后过大，请缩小图片尺寸再试"), d(42);
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
        uploadBizFile: b(l + "/cgi-bin/filetransfer?action=upload_material&f=json"),
        uploadTmpFile: b(l + "/cgi-bin/filetransfer?action=preview&f=json"),
        uploadCdnFile: b(l + "/cgi-bin/filetransfer?action=upload_cdn&f=json"),
        uploadShopFile: b(l + "/merchant/goodsimage?action=uploadimage"),
        uploadShopUnsaveFile: b(l + "/merchant/goodsimage?action=uploadimage&save=0"),
        uploadVideoCdnFile: b(l + "/cgi-bin/filetransfer?action=upload_video_cdn&f=json"),
        uploadRegisterFile: b(l + "/acct/realnamesubmit?type=2&action=file_set"),
        uploadUpgradeFile: b(l + "/acct/servicetypeupgrade?type=2&action=file_set"),
        uploadPoiFile: b(l + "/misc/setlocation?action=upload"),
        mediaFile: b(l + "/cgi-bin/filetransfer?action=bizmedia"),
        uploadCdnFileFromAd: function (e) {
            return b(l + "/cgi-bin/filetransfer?action=upload_cdn_check_size&f=json&width=" + e.w + "&height=" + e.h + "&limit_size=" + e.size);
        },
        uploadImageLibFile: function (e) {
            return e.url = l + "/cgi-bin/filetransfer?action=upload_material&f=json", "undefined" != typeof e.scene && (e.url += "&scene=" + e.scene),
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
            return b(l + "/cgi-bin/filetransfer?action=upload_cdn_check_range&f=json&" + n.join("&"), "tmpfile");
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
            return b(l + "/cgi-bin/filetransfer?action=preview_check_range&f=json&" + n.join("&"));
        },
        tmpFileUrl: w(l + "/cgi-bin/filetransfer?action=preview"),
        mediaFileUrl: w(l + "/cgi-bin/filetransfer?action=bizmedia"),
        multimediaFileUrl: w(l + "/cgi-bin/filetransfer?action=multimedia")
    };
});
define("tpl/media/weapp_dialog_content.html.js", [], function () {
    return '{each list as item}\n<li class="weapplink_item selected">\n    <div class="weapplink_item_inner js_weapplink_item_inner" data-appid="{item.appid}">\n        <div class="weapplink_info">\n            <img class="weapplink_avatar" src="{item.pic_url}">\n            <strong class="weapplink_name" title="">{item.nick_name}</strong>\n        </div>\n        <div class="weapplink_select_mask js_weapplink_select_mask" style="display: none;">\n            <i class="icon_card_selected">已选择</i>\n        </div>\n    </div>\n</li>\n{/each}';
});