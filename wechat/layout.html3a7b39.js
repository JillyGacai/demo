define("tpl/media/product_dropdown_item.html.js", [], function () {
    return '{each data as o index}\n<li class="js_dropdown_item_li dropdown_data_item {if o.className}{o.className}{/if}">\n  <a onclick="return false;" class="jsDropdownItem" href="javascript:void(0);" data-value="{o.value}" data-index="{index}" data-name="{o.name}">\n      {o.name}\n      {if loading_img}\n      <img style="display:none;" class="js_loading dropdown_item_loading" src="{loading_img}" alt="">\n      {/if}\n      <i {if o.canDel!==true}style="display:none;"{/if} class="js_del icon14_common del_gray dropdown_item_del" data-value="{o.value}" data-index="{index}" data-name="{o.name}"></i>\n  </a>\n</li>\n{/each}';
});
define("tpl/media/product_dropdown.html.js", [], function () {
    return '<div class="dropdown_menu">\n    <a href="javascript:void(0);" class="jsDropdownBt btn dropdown_switch">\n        <label class="jsBtLabel" {if search}contenteditable="true"{/if}>{label}</label>\n        <i class="arrow"></i>\n    </a>\n    <div class="dropdown_data_container jsDropdownList" style="display:none;">\n        <ul class="dropdown_data_list">\n            {=itemHtml}\n            {if search}\n            <li class="jsDropdownItem js_empty empty" style="display:none;"></li>\n            {/if}\n            {if canadd}\n            <div class="dropdown_extra js_addform">\n                <a href="javascript:void(0);" class="js_btn btn_custom_property">新建类目</a>\n                <div class="js_additem" style="display:none;">\n                    <span class="frm_input_box with_counter counter_in append">\n                        <input type="text" class="frm_input" placeholder="新建类目">\n                        <em class="frm_input_append frm_counter js_addnum">0/15</em>\n                    </span>\n                    <div class="dropdown_btn_wrp">            \n                        <a class="btn btn_primary js_sure" href="javascript:void(0);">确定</a>\n                        <a class="btn btn_default js_cancel" href="javascript:void(0);">取消</a>\n                    </div>\n                </div>\n            </div>\n            {/if}\n        </ul>\n        \n    </div>\n</div>';
});
define("tpl/cardticket/select_sub_merchant_table.html.js", [], function () {
    return '{if loading}<i class="icon_loading_small white"></i>\n{else}\n<div class="sub_title_bar">\n    <span class="frm_input_box search append l">\n        <a href="javascript:void(0);" class="js_search_btn frm_input_append">\n            <i class="icon16_common search_gray">\n                搜索            </i>\n            &nbsp;\n        </a>\n        <input type="text" placeholder="请输入商户名" value="{param.keyword}" class="frm_input js_search_input">\n    </span>\n    <div class="tr">\n        <a data-actionid="2014" class="btn btn_primary r" href="{wx_url \'/merchant/cardhelpmakesend?action=addpage\'}" target="_blank"><i class="icon14_common add_white"></i>添加子商户</a>\n    </div>\n</div>\n<div class="in_bd">\n	{if !data.length}\n	<div class="account_list empty js_empty">\n		{if param.keyword}\n		你输入的名称未搜索到，请确认否输入正确或未添加该子商户。		{else}\n		您还没有添加子商户，请点击右上角按钮添加子商户		{/if}\n		<!-- 抱歉，未找到符合公众号 -->\n	</div>\n	{else}\n	<ul class="account_list js_merchant_item_p">\n		{each data as sub i}\n		<li class="list_item js_merchant_item{if check_remain_quota && (sub.remain_quota==0||sub.can_not_use_sns_card)} js_merchant_disabled disabled{/if}" data-id="{sub.Id}">\n	        <div class="inner_list_item">\n	            <img class="pic" src="{http2https sub.Logo}" width="100px">\n				<div class="item_txt">\n					<p class="nick_name">{sub.BrandName}</p>\n                    {if check_remain_quota}{if max_card===0}<p>账号违规，暂停制券</p>{else}{if sub.remain_quota==0}<p>已超出制券量</p>{else if sub.can_not_use_sns_card}<p>该商户类目不可创建朋友的券</p>{/if}{/if}{/if}\n				</div>\n			</div>\n			<a href="javascript:;" class="account_selected"></a>\n			<div class="list_mask"></div>\n	    </li>\n	    {/each}\n	</ul>\n	<div class="js_pager"></div>\n	{/if}\n	<!-- <div class="loading_box empty dn" id="js_loading">\n		<img src="<%@GetResFullName($images_comm_path$icon/common/icon32_loading_light.gif)%>">\n		<p>加载中，请稍候</p>\n	</div> -->\n</div>\n{/if}\n';
});
define("tpl/media/cardmsg.html.js", [], function () {
    return '<div class="msg_card{if _className} {_className}{/if}">\n	<div class="card_content" style="background-color: {color};">\n		<img class="logo js_logourl" data-src="{logo_url}" />\n		<div class="card_info">\n			<h4 class="card_title">{title}</h4>\n		</div>\n		<div class="deco"></div>\n	</div>\n	<p class="store">{brand_name}</p>\n</div>\n';
});
define("media/productDropdown.js", ["biz_web/widget/dropdown.css", "tpl/media/product_dropdown.html.js", "tpl/media/product_dropdown_item.html.js", "common/wx/Tips.js"], function (e) {
    "use strict";

    function t(e) {
        e.render && (e.renderHtml = "", $.each(e.data, function (t, a) {
            e.renderHtml += e.render(a);
        })), e = $.extend(!0, {}, d, e);
        var t = this;
        if (t.container = $(e.container), t.container.addClass(e.search ? o + " search" : o), this.isDisabled = e.disabled,
        e.disabled && t.container.addClass("disabled"), t.opt = e, e.itemHtml = template.compile(n)(e),
            t.container.html(template.compile(a)(e)), t.bt = t.container.find(".jsDropdownBt"),
            t.dropdown = t.container.find(".jsDropdownList"), t.addform = t.container.find(".js_addform"),
            $.each(e.data, function (e, a) {
                $.data(t.dropdown.find(".jsDropdownItem")[e], "value", a.value), $.data(t.dropdown.find(".jsDropdownItem")[e], "name", a.name),
                    $.data(t.dropdown.find(".jsDropdownItem")[e], "item", a);
            }), "undefined" != typeof e.index && 0 !== e.data.length && (t.bt.find(".jsBtLabel").text(e.data[e.index].name || e.label),
            t.value = e.data[e.index].value), t.hideDropdowns = function (e) {
            t.container.find(e.target).length || t.hideMenu();
        }, t.bt.on("click", function () {
            t.hideMenu(), t.isDisabled || t.showMenu();
        }), e.search && t.bt.find(".jsBtLabel").on("keyup", function (a) {
            if (!t.isDisabled) {
                var n = $(this);
                if (13 == a.keyCode) if (t.value) {
                    var i = n.data("name"), d = n.data("index");
                    if (n.removeClass("error"), t.hideMenu(), n.find("div").remove(), e.callback && "function" == typeof e.callback) {
                        var o = t.value;
                        e.callback(o, i, d);
                    }
                } else n.find("div").remove(); else {
                    var s = n.text().trim(), r = [];
                    t.value = null, n.data("name", ""), n.data("index", ""), t.dropdown.show().find(".jsDropdownItem").each(function () {
                        var e = $(this);
                        e.hasClass("js_empty") || (e.data("name").indexOf(s) > -1 ? (e.parent().show(), r.push({
                            name: e.data("name"),
                            value: e.data("value"),
                            index: e.data("index")
                        })) : e.parent().hide());
                    }), 0 == r.length ? (t.dropdown.find(".js_empty").text("未找到" + s).show(), n.addClass("error")) : (t.dropdown.find(".js_empty").hide(),
                        n.removeClass("error"), 1 == r.length && r[0].name == s && (n.data("name", r[0].name), n.data("index", r[0].index),
                        t.value = r[0].value));
                }
            }
        }).on("blur", function () {
            if (!t.isDisabled) {
                var a = $(this);
                t.value ? $(this).html() != $(this).data("name") && ($(this).data("name", ""), $(this).data("index", ""),
                    a.addClass("error"), t.value = null) : "" != a.html() ? a.addClass("error") : a.html(e.label).removeClass("error");
            }
        }).on("focus", function () {
            if (!t.isDisabled) {
                var a = $(this), n = $(this).html().trim();
                n == e.label && a.html("").removeClass("error"), "" == n && a.removeClass("error"), t.showMenu();
            }
        }), e.canadd) {
            var s = t.addform;
            s.find(".js_btn").on("click", function () {
                if (!t.isDisabled) {
                    var e = t.container.find(".js_addform");
                    e.find(".js_btn").hide(), e.find(".js_additem").show(), e.parent().scrollTop(e.parent().scrollTop() + 60);
                }
            }), s.find(".js_cancel").on("click", function () {
                if (!t.isDisabled) {
                    var e = t.container.find(".js_addform");
                    e.find(".js_additem").hide(), e.find(".js_btn").show();
                }
            }), s.find("input").on("click", function () {
            }), s.find("input").on("keyup", function (e) {
                var a = $(this), n = a.val().trim(), i = n.bytes(), d = (i + i % 2) / 2, o = a.siblings(".js_addnum");
                o.text(d + "/15"), d > 15 ? !o.hasClass("error") && o.addClass("error") : (o.hasClass("error") && o.removeClass("error"),
                13 == e.keyCode && t.addform.find(".js_sure").trigger("click"));
            }), s.find(".js_sure").on("click", function () {
                if (!t.isDisabled) {
                    var a = t.container.find(".js_addform"), n = a.find(".js_addnum");
                    if (n.hasClass("error")) i.err("超过长度限制"); else {
                        var d = a.find("input").val();
                        d || i.err("类目不能为空");
                        var o = e.add(d, t);
                        o === !0 && t.addform.find(".js_cancel").trigger("click");
                    }
                }
            });
        }
        t.container.on("click", ".js_del", function (a) {
            if (!t.isDisabled) {
                var n = $(this);
                e.del(n.attr("data-value"), n.attr("data-name"), n.attr("data-index"), n);
            }
            return a.stopPropagation(), a.preventDefault(), !1;
        }), $(document).on("click", t.hideDropdowns), t.dropdown.on("click", ".jsDropdownItem", function (a) {
            if (!t.isDisabled && !$(a.target).hasClass("js_empty") && !$(a.target).hasClass("js_del")) {
                var n = $(this).data("value") + "", i = $(this).data("name") + "", d = $(this).data("index");
                if ((!t.value || t.value && t.value != n) && (t.value = n, t.name = i, e.callback && "function" == typeof e.callback)) {
                    var o = e.callback(n, i, d, $(this).data("item")) || i;
                    e.search ? t.bt.find(".jsBtLabel").text(o).data("name", i).data("index", d).removeClass("error") : t.bt.find(".jsBtLabel").text(o);
                }
                t.hideMenu();
            }
        });
    }

    e("biz_web/widget/dropdown.css");
    var a = e("tpl/media/product_dropdown.html.js"), n = e("tpl/media/product_dropdown_item.html.js"), i = e("common/wx/Tips.js"), d = {
        label: "请选择",
        data: [],
        callback: $.noop,
        render: $.noop,
        delay: 500,
        disabled: !1,
        search: !1,
        canadd: !1,
        add: $.noop,
        del: $.noop
    }, o = "dropdown_menu";
    return t.prototype = {
        selected: function (e) {
            var t = this;
            if ("number" == typeof e) {
                if (this.opt.data && this.opt.data[e]) {
                    var a = this.opt.data[e].name, n = this.opt.data[e].value;
                    this.dropdown.find(".jsDropdownItem:eq(" + e + ")").trigger("click", n), this.bt.find(".jsBtLabel").text(a);
                }
            } else $.each(this.opt.data, function (i, d) {
                return e == d.value || e == d.name ? (t.dropdown.find(".jsDropdownItem:eq(" + i + ")").trigger("click", n),
                    t.bt.find(".jsBtLabel").text(a), !1) : void 0;
            });
            return this;
        },
        hideMenu: function () {
            this.dropdown.hide(), this.container.removeClass("open");
        },
        showMenu: function () {
            this.dropdown.show(), this.container.addClass("open");
        },
        hide: function () {
            this.container.hide();
        },
        show: function () {
            this.container.show();
        },
        reset: function () {
            return this.bt.find(".jsBtLabel").text(this.opt.label), this.value = null, this;
        },
        add: function (e) {
            this.opt.data.push(e);
            var t = template.compile(n)({
                data: [e],
                loading_img: this.opt.loading_img
            });
            this.container.find(".js_empty").before(t);
        },
        hidegreater: function (e) {
            var t = this;
            return "number" == typeof e && t.opt.data && t.opt.data[e] && (t.dropdown.find(".jsDropdownItem").show(),
                t.dropdown.find(".jsDropdownItem:gt(" + e + ")").hide()), this;
        },
        destroy: function () {
            return $(document).off("click", this.hideDropdowns), this.isDisabled && this.container.removeClass("disabled"),
                this.container.children().remove(), this.container.off(), this;
        },
        enable: function () {
            return this.hideMenu(), this.isDisabled = !1, this.container.removeClass("disabled"),
            this.opt.search && this.bt.find(".jsBtLabel").attr("contenteditable", !0), this;
        },
        disable: function () {
            return this.isDisabled = !0, this.container.addClass("disabled"), this.opt.search && this.bt.find(".jsBtLabel").attr("contenteditable", !1),
                this;
        }
    }, t;
});
define("tpl/media/product_category_frame.html.js", [], function () {
    return '<span id="category_{index}"></span>\n<input type="hidden" id="category_{index}_hidden" name="category_{index}_hidden" value="{value}" />';
});
define("tpl/cardticket/card_quantity.html.js", [], function () {
    return '<div class="pop_store">\n	{if !data.is_sns_card}\n	{if data.quantity==0}\n	<p class="frm_msg fail" style="display:block;">库存为0，请先增加库存</p>\n	{/if}\n	<!-- 普通卡券增减库存 -->\n	<div class="pop_card_normal">\n		<!--增减库存-->\n		{if setquantity}\n		<!-- 这一部分貌似要废弃掉 -->\n		<div class="frm_control_group">\n			<div class="frm_controls">\n				<label class="frm_radio_label selected">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">增加</span>\n					<input type="radio" name="isadd" checked value="1" class="frm_radio js_quantity_type">\n				</label>\n				<label class="frm_radio_label">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">减少</span>\n					<input type="radio" name="isadd" value="0" class="frm_radio js_quantity_type">\n				</label>\n			</div>\n		</div>\n		{/if}\n		<div class="frm_control_group">                        \n			<div class="frm_controls">\n				<div class="frm_controls_hint group">\n					<span class="frm_input_box"><input type="text" class="frm_input js_value"></span>\n					<span class="frm_hint">份</span>\n				</div>\n				<p class="frm_tips fail">库存不能少于1</p>\n			</div>\n		</div>\n		<!--增减库存 end-->\n	</div>\n	{else}\n	<!-- 朋友券增加库存 -->\n	<!-- message fail-->\n	<div class="js_state_5 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg info"></i>\n            </span>\n            <div class="msg_content">\n                <h4> 当前未开通券点账户，暂时无法添加库存 </h4>\n            </div>\n        </div>\n        <div class="popover_bar tc">\n			<a href="javascript:;" class="btn btn_primary js_go_activate">去开通</a>\n        </div>\n    </div>\n	<i class="loading js_satate_0 js_state_quantity" style="display:none"></i>\n	<div class="js_state_1 js_state_quantity pop_card_quantity" style="display:none">\n		{if data.quantity==0}\n		<p class="frm_msg fail" style="display:block;">库存为0，请先增加库存</p>\n		{/if}\n		<div class="pop_hd">\n			<div class="frm_control_group frm_card_extend">                        \n				<label for="" class="frm_label">\n					<span class="title">库存单价</span>\n				</label>\n				<div class="frm_preview"><span class="js_price">0.2</span>券点/张				</div>\n			</div>\n			<div class="frm_control_group frm_card_extend">                        \n				<label for="" class="frm_label">\n					<span class="title">增加库存</span>\n				</label>\n				<div class="">\n					<span class="frm_input_box"><input type="text" class="frm_input js_value"></span>\n					<span class="frm_hint">张</span>\n				</div>\n				<!-- <p class="frm_tips fail">库存不能少于1</p> -->\n			</div>\n		</div>\n		<div class="frm_control_group frm_card_extend js_total_price_container">                        \n			<label for="" class="frm_label">\n				所需券点			</label>\n			<div class="frm_preview">\n				<span class="js_total_price card_fee_quantity">0</span>券点			</div>\n		</div>\n		<p class="js_error frm_msg fail"></p>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_primary js_confirm">确认添加</a>\n			<a href="javascript:;" class="btn btn_default js_cancel">取消</a>\n        </div>\n	</div>\n	<!-- 朋友券 确认预览 -->\n	<div class="js_state_2 js_state_quantity pop_card_quantity" style="display:none">\n		<div class="pop_hd">\n			<div class="frm_control_group frm_card_extend">                        \n				<label for="" class="frm_label">\n					卡券名称				</label>\n                <div class="frm_preview js_cardname">{data.title}\n				</div>\n			</div>\n			<div class="frm_control_group frm_card_extend">                        \n				<label for="" class="frm_label">\n					库存单价				</label>\n                <div class="frm_preview"><span class="js_price"></span>券点/张				</div>\n			</div>\n			<div class="frm_control_group frm_card_extend">                        \n				<label for="" class="frm_label">\n					增加库存				</label>\n                <div class="frm_preview"><span class="js_quantity"></span>张				</div>\n			</div>\n		</div>\n		<div class="frm_control_group frm_card_extend">                        \n			<label for="" class="frm_label">\n				支出券点			</label>\n			<div class="frm_preview">\n				免费券点<span class="js_freecoin"></span> ，付费券点<span class="js_paycoin"></span>\n			</div>\n		</div>\n		<div class="popover_bar">\n			<a href="javascript:;" class="btn btn_primary js_confirm">确定</a>\n			<a href="javascript:;" class="btn btn_default js_cancel">取消</a>\n        </div>\n	</div>\n	<!-- message success-->\n	<div class="js_state_3 js_state_quantity pop_card_quantity page_msg small msg_success default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg success"></i>\n                <!-- loging gif也可以放到这里 -->\n            </span>\n            <div class="msg_content">\n                <h4> 已添加成功 </h4>\n            </div>\n        </div>\n    </div>\n	<!-- message success-->\n	<div class="js_state_9 js_state_quantity pop_card_quantity page_msg small msg_success default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg success"></i>\n                <!-- loging gif也可以放到这里 -->\n            </span>\n            <div class="msg_content">\n                <h4> 已购买成功 </h4>\n                <p class="tl">请通知适用商户登录微信支付平台审核，通过库存生效。若不通过，将退回券点。</p>\n            </div>\n        </div>\n        <div class="plant_msg">\n        	总库存：        	<span class="frm_preview js_cardname"><span class="js_total_price mini_tips weak_text js_current_quantity">{data.quantity}</span>\n			</span>\n			<div class="mini_tips weak_text">(<span class=\'js_quantity\'></span>库存审核通过后生效)</div>\n        </div>\n        <!--\n        <div class="frm_control_group frm_card_extend">                        \n			<label for="" class="frm_label">\n				总库存：			</label>\n            <div class="frm_preview js_cardname"><span class="js_total_price card_fee_quantity mini_tips weak_text js_current_quantity">{data.quantity}</span><span class="mini_tips weak_text">(<span class=\'js_quantity\'></span>库存审核通过后生效)</span>\n			</div>\n			<p class="frm_msg" style="display:block">少于100时，将通过公众号通知核销员 <a href="">修改</a></p>\n		</div>-->\n        <div class="popover_bar tc">\n			<a href="javascript:;" class="btn btn_primary js_close_quantity">完成</a>\n        </div>\n    </div>\n	<!-- message fail-->\n	<div class="js_state_4 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg info"></i>\n            </span>\n            <div class="msg_content">\n                <h4> 库存添加中，可前往流水记录查看本次添加进度 </h4>\n            </div>\n        </div>\n        <div class="popover_bar tc">\n			<a href="javascript:;" class="btn btn_primary js_close_quantity">我知道了</a>\n        </div>\n    </div>\n    <!-- 子商户库存提示-->\n	<div class="js_state_8 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg info"></i>\n            </span>\n            <div class="msg_content js_quantity_exceed_msg">\n                <h4> 子商户每张券累计只可发放10000份 </h4>\n            </div>\n        </div>\n        <div class="popover_bar tc">\n			<a href="javascript:;" class="btn btn_primary js_close_quantity">我知道了</a>\n        </div>\n    </div>\n	<!-- message fail-->\n	<div class="js_state_7 js_state_quantity pop_card_quantity page_msg small default" style="display:none">\n        <div class="inner group">\n            <span class="msg_icon_wrp">\n                <i class="icon_msg warn"></i>\n            </span>\n            <div class="msg_content">\n                <h4> 库存添加失败，请稍后再试 </h4>\n                <p> 所扣币值将退回你的账户，请耐心等待 </p>\n            </div>\n        </div>\n        <div class="popover_bar tc">\n			<a href="javascript:;" class="btn btn_primary js_close_quantity">我知道了</a>\n        </div>\n    </div>\n    {/if}\n</div>\n';
});
define("tpl/cardticket/choose_card_type.html.js", [], function () {
    return '{if is_sns_card}<div class="proc_put_tick">\n	<div class="choose_card_friend">\n	    <div class="frm_control_group">\n	        <label class="frm_radio_label selected">\n	            <i class="icon_radio"></i>\n	            <span class="lbl_content">创建朋友共享的优惠券</span> <i class="icon_common new" style=""></i>\n	            <input type="radio" value="1" checked class="frm_radio js_is_friend">\n	        </label>\n	        <div class="frm_tips js_is_friend_tips js_is_friend_support_tips">用户领取一张优惠券后，他的好友无需领取即可在优惠券列表看到和使用该张优惠券。这将为你的优惠券带来更多的曝光和使用。</div>\n	        <div style="display:none;" class="frm_tips js_is_friend_tips js_is_friend_view_mode2_tips">所选子商户类目不支持制作朋友的券，<a target="_blank" href="/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#0dot2">查看类目要求</a></div>\n	        <div style="display:none;" class="frm_tips js_is_friend_tips js_is_friend_view_mode1_tips">当前商户类目不支持制作朋友的券，<a target="_blank" href="/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#0dot2">查看类目要求</a></div>\n	    </div>\n	</div>\n    <div class="choose_card_type js_is_friend_type js_is_friend_type_1">\n	    <div class="frm_control_group radio_row frm_tab">\n			<div class="frm_controls frm_vertical_lh">\n				<label class="frm_radio_label selected">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">无使用门槛代金券</span>\n					<input type="radio" value="4" data-not_has_condition="1" class="frm_radio js_card_type" checked="checked">\n	                <p class="frm_tips">可抵扣现金，无使用门槛</p>\n				</label>\n				<label class="frm_radio_label selected">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">满减代金券/指定品类代金券</span>\n					<input type="radio" value="4" class="frm_radio js_card_type">\n	                <p class="frm_tips">可抵扣现金，需消费指定金额或品类</p>\n				</label>\n				<label class="frm_radio_label">\n					<i class="icon_radio"></i>\n					<span class="lbl_content">兑换券</span>\n					<input type="radio" value="3" class="frm_radio js_card_type">\n					<p class="frm_tips">可兑换商品或服务</p>\n				</label>\n			</div>\n		</div>\n		<div class="frm_tab_content">\n			<div class="tab_items">\n				<div class="frm_tab_item js_tabed_item_4">\n					<div class="tab_inner">\n						<ul class="prom_list">\n							<li>消费者体验好</li>\n							<li>使用转化率高</li>\n							<li>引流效果较好</li>\n							{if view_mode==1}\n							<li>支持微信买单</li>\n							{/if}\n						</ul>\n						<p>查看案例：<a href="http://mp.weixin.qq.com/s?__biz=MjM5NDQ5Njk3OA==&mid=407898139&idx=1&sn=f3ea0f070d756d8d2f61d496aeb35286#rd" target="_blank">广州某百货公司无门槛代金券活动 ></a></p>\n					</div>\n				</div>\n				<div class="frm_tab_item js_tabed_item_4">\n					<div class="tab_inner">\n						<ul class="prom_list">\n							<li>成本可控</li>\n							<li>提升客单价</li>\n							<li>多种优惠使用条件组合</li>\n							{if view_mode==1}\n							<li>支持微信买单</li>\n							{/if}\n						</ul>\n					</div>\n				</div>\n				<div class="frm_tab_item js_tabed_item_3">\n					<div class="tab_inner">\n						<ul class="prom_list">\n							<li>成本可控</li>\n							<li>推广新品效果佳</li>\n							<li>引流到店效果好</li>\n							<li>方便组合促销</li>\n						</ul>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n	{if show_all_card}\n	<div class="choose_card_normal">\n	    <div class="frm_control_group frm_card_normal">\n	        <label class="frm_radio_label">\n	            <i class="icon_radio"></i>\n	            <span class="lbl_content">我要创建普通优惠券</span>\n	            <input type="radio" value="2" class="frm_radio js_is_friend">\n	        </label>\n	        <div class="frm_tips">传统优惠券的电子版，可在微信中收纳、传播和使用。只可领取到我的卡券自己使用</div>\n	        <div class="frm_control_group radio_row js_is_friend_type js_is_friend_type_2" style="display:none">\n				<div class="frm_controls frm_vertical_lh">\n					{if flag==0}\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">折扣券</span>\n						<input type="radio" value="2" class="frm_radio js_card_type">\n		                <p class="frm_tips">可为用户提供消费折扣{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n					</label>\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">代金券</span>\n						<input type="radio" value="4" class="frm_radio js_card_type">\n		                <p class="frm_tips">可为用户提供抵扣现金服务。可设置成为“满*元，减*元”{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n					</label>\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">兑换券</span>\n						<input type="radio" value="3" class="frm_radio js_card_type">\n						<p class="frm_tips">可为用户提供消费送赠品服务</p>\n					</label>\n					{/if}\n					<label class="frm_radio_label selected">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">团购券</span>\n						<input type="radio" value="1" class="frm_radio js_card_type">\n						<p class="frm_tips">可为用户提供团购套餐服务</p>\n					</label>\n					<label class="frm_radio_label">\n						<i class="icon_radio"></i>\n						<span class="lbl_content">优惠券</span>\n						<input type="radio" value="0" class="frm_radio js_card_type">\n						<p class="frm_tips">{if flag==0}即“通用券”，建议当以上四种无法满足需求时采用{else}即“通用券”，建议当团购券无法满足需求时适用{/if}</p>\n					</label>\n				</div>\n			</div>\n	    </div>\n    </div>\n{/if}    \n</div>\n{else}<div class="proc_put_tick js_is_friend_type_2">\n<div class="choose_card_normal">\n	<div class="frm_control_group radio_row frm_card_normal">\n		<label for="" class="frm_label">选择你要创建的卡券类型</label>\n		<div class="frm_controls frm_vertical_lh">\n		{if flag==0}\n			<label class="frm_radio_label selected">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">折扣券</span>\n				<input type="radio" value="2" class="frm_radio js_card_type">\n                <p class="frm_tips">可为用户提供消费折扣{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n			</label>\n			<label class="frm_radio_label">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">代金券</span>\n				<input type="radio" value="4" class="frm_radio js_card_type">\n                <p class="frm_tips">可为用户提供抵扣现金服务。可设置成为“满*元，减*元”{if is_paycard()}，支持优惠抵扣快速买单{/if}</p>\n			</label>\n			<label class="frm_radio_label">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">兑换券</span>\n				<input type="radio" value="3" class="frm_radio js_card_type">\n				<p class="frm_tips">可为用户提供消费送赠品服务</p>\n			</label>\n		{/if}\n			<label class="frm_radio_label selected">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">团购券</span>\n				<input type="radio" value="1" class="frm_radio js_card_type">\n				<p class="frm_tips">可为用户提供团购套餐服务</p>\n			</label>\n		\n			<label class="frm_radio_label">\n				<i class="icon_radio"></i>\n				<span class="lbl_content">优惠券</span>\n				<input type="radio" value="0" class="frm_radio js_card_type">\n				<p class="frm_tips">{if flag==0}即“通用券”，建议当以上四种无法满足需求时采用{else}即“通用券”，建议当团购券无法满足需求时适用{/if}</p>\n			</label>\n		</div>\n	</div>\n</div>\n</div>\n{/if}';
});
define("cardticket/select_sub_merchant_table.js", ["tpl/cardticket/select_sub_merchant_table.html.js", "common/wx/popup.js", "common/wx/Cgi.js", "common/wx/pagebar.js", "common/wx/Tips.js", "biz_web/ui/checkbox.js", "page/cardticket/dialog_choose_sub_store.css", "cardticket/common_template_helper.js"], function (t) {
    "use strict";

    function e(t) {
        var e, a = t.opt;
        e = t.$container, e.html(c({
            loading: !0,
            param: a.param
        })), a.resetPosition && a.resetPosition();
    }

    function a(t, a) {
        var o = a.opt, r = $.extend(!0, {
            action: "list",
            offset: o.pageInfo.begin,
            limit: o.pageInfo.count
        }, o.param);
        f = !0, e(a), l.get({
            url: o.url || "/merchant/cardhelpmakesend",
            data: r,
            complete: function () {
                f = !1;
            }
        }, function (t) {
            if (0 == t.base_resp.ret || -1 == t.base_resp.ret) {
                var e = $.parseJSON(t.bind_list), r = $.parseJSON(t.sub_merchant_remain_quota);
                if (o.data = e.List, o.remain_data = r.list, o.is_sns_card) for (var i = 0; i < e.List.length; i++) {
                    var s = e.List[i];
                    s.can_not_use_sns_card = !p.can_category_use_sns_card(s.PrimaryCategoryId, s.SecondaryCategoryId);
                }
                o.pageInfo.total_count = t.total_count || 0, n(o.pageInfo, a);
            } else l.show(t);
        });
    }

    function n(t, e) {
        for (var a, n = e.opt, s = 0; s < n.data.length; s++) $.extend(n.data[s], n.remain_data[s]);
        return a = e.$container, a.html(c(n)), n.resetPosition && n.resetPosition(), n.data.length ? (e.pagebar = null,
            i(n.pageInfo, e), r(e, n.data, a), o(e, a), void(n.getDataComplete && n.getDataComplete(n.data))) : (r(e, n.data, a),
            void o(e, a));
    }

    function o(t, e) {
        function n(e) {
            o.param.keyword = e, a(o.pageInfo, t);
        }

        var o = t.opt, r = $(".js_search_input", e).on("keyup", function (t) {
            var e = $.trim($(this).val());
            wx.isHotkey(t, "enter") && n(e);
        });
        $(".js_search_btn", e).click(function () {
            var t = $.trim(r.val());
            n(t);
        });
    }

    function r(t) {
        var e = t.opt;
        $(".js_merchant_item").click(function () {
            var t = $(this).hasClass("js_merchant_disabled");
            t || ($(".js_merchant_item").removeClass("selected"), $(this).addClass("selected"));
        }), e.resetPosition && e.resetPosition();
    }

    function i(t, e) {
        var n = t.total_count, o = e.$container;
        if (t.count && n > t.count) {
            var r = t.begin / t.count;
            e.pagebar = new u({
                container: $(".js_pager", o),
                first: !1,
                last: !1,
                midRange: 5,
                initShowPage: r + 1,
                perPage: t.count,
                totalItemsNum: n,
                callback: function (n) {
                    if (f) return !1;
                    var o = n.currentPage;
                    return o != r + 1 && (t.begin = (o - 1) * t.count, a(t, e)), !0;
                }
            });
        }
    }

    function s(t, e) {
        for (var a = 0; a < t.length; a++) if (t[a].Id == e) return t[a];
        return null;
    }

    {
        var c = t("tpl/cardticket/select_sub_merchant_table.html.js"), l = (t("common/wx/popup.js"),
            t("common/wx/Cgi.js")), u = t("common/wx/pagebar.js"), m = t("common/wx/Tips.js");
        t("biz_web/ui/checkbox.js");
    }
    t("page/cardticket/dialog_choose_sub_store.css");
    var p = t("cardticket/common_template_helper.js");
    c = template.compile(c);
    var _ = {
        pageInfo: {
            begin: 0,
            count: 12,
            total_count: 0
        },
        param: {
            status_list: 1,
            keyword: ""
        },
        url: null,
        data: null,
        is_sns_card: !1,
        selectComplete: $.noop,
        onHide: $.noop
    }, d = function (t) {
        this.opt = $.extend(!0, {}, _, t), this.init();
    }, f = !1;
    return d.prototype = {
        init: function () {
            var t = this.opt, e = this;
            e.$container = $(t.container), t.data ? n(t.pageInfo, e) : a(t.pageInfo, e);
        },
        get: function () {
            return this.$container;
        },
        selectedValue: function () {
            var t = this.opt;
            if (!t.data || !t.data.length) return !1;
            var e = this.get(), a = e.find(".js_merchant_item.selected");
            if (!a.length) return m.err("请选择子商户"), !1;
            var n = a.attr("data-id"), o = s(t.data, n);
            return o;
        }
    }, d;
});
define("cardticket/add/msg_operate_type_html.js", ["tpl/media/cardmsg.html.js"], function (a) {
    "use strict";
    var s = {
        1: '{if msg_operation.appmsg_title}<div class="appmsg single">                <div class="appmsg_content">                    <div class="appmsg_info">                        <em class="appmsg_date">{msg_operation.appmsg_update_time}</em>                    </div>                    <div class="appmsg_item">                        <h4 class="appmsg_title">                            <a href="{msg_operation.url}" target="_blank">{msg_operation.appmsg_title}</a>                        </h4>                        <div class="appmsg_thumb_wrp" style="background-image:url(\'{msg_operation.appmsg_cover}\')"></div>                        <p class="appmsg_desc">{msg_operation.appmsg_digest}</p>                    </div>                    {if msg_operation.appmsg_type == 10}<a href="" class="edit_mask preview_mask js_preview" data-msgid="{msg_operation.appmsg_appmsgid}" data-idx="{msg_operation.appmsg_itemidx-1}">                        <div class="edit_mask_content">                            <p class="">                                预览文章                            </p>                        </div>                        <span class="vm_box"></span>                    </a>{/if}                </div>             </div>             {else}            <a href="{msg_operation.url}" target="_blank">{msg_operation.text}</a>             {/if}',
        2: '<a target="_blank" href="{msg_operation.url}">{msg_operation.url}</a>',
        5: a("tpl/media/cardmsg.html.js"),
        4: '<a target="_blank" href="{msg_operation.url}">{msg_operation.url}</a>',
        0: ""
    };
    return s;
});
define("common/wx/tooltipsManager.js", ["common/wx/tooltips.js"], function (t) {
    "use strict";
    var o = t("common/wx/tooltips.js"), i = {
        tooltips: [],
        init: function (t, i) {
            var n = this;
            $(t).each(function () {
                i.container = this, n.add(new o(i));
            });
        },
        add: function (t) {
            this.tooltips.push(t);
        },
        hideAll: function () {
            for (var t = 0; t < this.tooltips.length; t++) this.tooltips[t].hide();
        },
        removeItem: function (t) {
            for (var o = 0; o < this.tooltips.length; o++) if (this.tooltips[o] === t) return this.tooltips.splice(o, 1),
                t.$dom.remove(), !0;
            return !1;
        },
        removeIndex: function (t) {
            if (!(t >= this.tooltips.length || 0 > t)) {
                var o = this.tooltips[t];
                this.tooltips.splice(t, 1), o.$dom.remove();
            }
        },
        current: function () {
        },
        hide: function () {
        },
        removeAll: function () {
            for (var t = 0; t < this.tooltips.length; t++) this.tooltips[t].$dom.remove();
            this.tooltips = [];
        }
    };
    return i;
});
define("tpl/media/preview/layout.html.js", [], function () {
    return '<div class="wx_phone_preview_wrp jsPhoneView">\n    <div class="wx_phone_preview">\n        <span class="btn btn_default btn_phone_preview_closed jsPhoneViewClose">关闭</span>\n        <div class="wx_phone jsPhoneViewMain">\n            {=content} \n        </div>\n        <!--jsPhoneViewMain-->\n        {if plugin}<div class="wx_view_container jsPhoneViewPlugin">{=plugin}</div>\n        {else}<div class="wx_view_container jsPhoneViewPlugin dn">{=plugin}</div>\n        {/if}\n    </div>\n    <div class="mask"></div>\n</div>\n';
});