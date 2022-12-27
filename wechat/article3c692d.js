define("tpl/shop/shopDialog.html.js",[],function(){
return'<div>\n    <div class="global_mod float_layout shopcard_box_hd">\n        <span class="global_info frm_input_box search with_del append" style="display:none;">\n            <a class="del_btn" onclick="return false" href="javascript:;" id="searchCloseBt"><i class="icon_search_del"></i>&nbsp;</a>\n            <a onclick="return false" id="searchBt" href="javascript:;" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n            <input id="keyInput" type="text" placeholder="商品名称/编号" value="" class="frm_input">\n        </span>\n        <div class="global_extra">\n            <a target="__blank" href="/merchant/goods?type=11&t=shop/precreate&token={token}&lang={lang}" class="btn btn_default btn_add">\n                <i class="icon14_common add_gray"></i>\n                添加商品            </a>\n        </div>\n    </div>\n    <div class="shopcard_box_bd">\n        <div class="js_shoploading media_list_tips_wrp">\n            <i class="icon_loading_small white">loading...</i>\n            <span class="vm_box"></span>\n        </div>\n        <ul class="js_shopcard_list wx_shopcard_list" style="display:none;">\n        </ul>\n        <div class="js_pagination pagination_wrp"></div>\n    </div>\n</div>\n';
});define("cardticket/add/member_info_flag.js",[],function(){
"use strict";
function n(n,f){
for(var i=0;i<n.length;i++)if(n[i]===f)return i;
return-1;
}
var f=[1,4096,2,4,8,0,32,64,128,256,512,1024,2048];
return{
sys_info:["手机号","姓名","性别","所在地区","生日","身份证号","邮箱","详细地址","学历","职业","行业","收入","爱好"],
info_flag:f,
flag2info:function(n){
for(var f=[],i=0;i<this.info_flag.length;i++){
var r=this.info_flag[i];
r&n&&f.push(this.sys_info[i]);
}
return f;
},
info2flag:function(f){
for(var i=0,r=0;r<f.length;r++){
var t=n(this.sys_info,f[r]);
t>=0&&(i|=this.info_flag[t]);
}
return i;
}
};
});define("tpl/cardticket/send_card.html.js",[],function(){
return'<div>\n	<div class="wrp_processor js_step_container"></div>\n	<div class="first_step js_step_content js_step1">\n	    <!--选择投放方式弹窗-->\n		<div class="js_card_list"></div>\n		<!--选择投放方式弹窗 end-->\n	</div>\n	<div class="second_step js_step_content js_step2">\n	</div>\n</div>';
});define("cardticket/send_card_table.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/Step.js","common/wx/pagebar.js","cardticket/parse_data.js","biz_web/ui/dropdown.js","cardticket/store_cgi.js","cardticket/common_template_helper.js","cardticket/create_card_select.js","tpl/cardticket/card_table.html.js","tpl/cardticket/card_preview.html.js","page/cardticket/dialog_choose_card.css","biz_web/ui/checkbox.js","cardticket/card_quantity.js"],function(t){
"use strict";
function e(t){
{
var e;
t.opt;
}
e=t.$container,e.find(".js_card_list").html(k({
loading:!0
}));
}
function a(t,a){
var r=a.opt,c=$.extend(!0,{
action:"batch",
begin:t.begin,
count:t.count,
tag_filter:r.tag_filter,
filter_out_expired_card:r.filter_out_expired_card
},r.param);
1==r.view_mode&&(c.sub_merchant_id=0),w=!0,e(a),o.get({
url:r.url||"/merchant/electroniccardmgr",
data:c,
complete:function(){
w=!1;
}
},function(t){
if(0==t.base_resp.ret){
var e=t,n=t.card_dispatching_list;
t="string"==typeof t.batch_card?$.parseJSON(t.batch_card):t.batch_card,r.data=t.card_list;
var s=l.parse_cardlist(r.data);
if(b=s.card_cache,r.data=s.card_list,r.cache_data=b,r.acl={
is_can_shake:e.is_can_shake_card,
is_can_use_sns_card:e.is_can_use_sns_card,
is_intercomm_card:e.is_intercomm_card,
is_can_card_friend:e.is_can_use_sns_card
},n)try{
var _=$.parseJSON(e.card_dispatching_list);
if(_){
_=_.card_dispatching_list;
for(var d=0;d<_.length;d++){
var u=_[d],p=b[u.card_id];
p&&(p.cansend=!u.is_dispatching);
}
}
}catch(h){}
if(r.pageInfo.total_count=t.total_num,e.biz_quota_json){
var m=$.parseJSON(e.biz_quota_json);
m=f.parse_assistsend_quota(m.quota_list),a._quota=m;
}
i(r.pageInfo,a);
}else o.handleRet(t,{
id:64463,
key:33,
url:"/merchant/electroniccardmgr"
}),(new Image).src="https://badjs.weixinbridge.com/badjs?id=33&level=4&from="+encodeURIComponent(location.host)+"&msg="+encodeURIComponent("[card][sendout_err][cgi=/merchant/electroniccardmgr][data="+JSON.stringify(c)+"][ret="+(t?t.base_resp.ret:"null")+"]");
});
}
function i(t,e,a){
var i,_=e.opt;
if(_.payflag=_.param.flag,i=e.$container,a){
var o=i.find(".js_select");
return o.each(function(e){
e>=t.begin&&e<t.begin+t.count?$(this).closest("tr").show():$(this).closest("tr").hide();
}),e.pagebar=null,s(_.pageInfo,e),void(e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a));
}
if(_.data&&"undefined"!=typeof _.sub_merchant_id)for(var d=0;d<_.data.length;d++)_.sub_merchant_id?_.data[d].sub_merchant_id!=_.sub_merchant_id&&(_.data[d].is_sub_merchant_disabled=!0):_.data[d].sub_merchant_id&&(_.data[d].is_sub_merchant_disabled=!0);
i.find(".js_card_list").html(k(_));
var l=_.defaultValues,o=i.find(".js_select");
l.length&&o.each(function(){
for(var t=$(this),e=0;e<l.length;e++)if(l[e]==t.attr("data-id")){
t.prop("checked",!0);
break;
}
}),e.select_card_checkbox=o.checkbox({
onChanged:function(){
if(_.multi){
var t=0;
o.each(function(){
$(this).prop("checked")&&t++;
}),$(".js_selectcount",i).text(t);
}
}
}),e.pagebar=null,s(_.pageInfo,e),c(e),n(e),1==_.no_filter||r(e);
var u,p=[];
1==_.sns_card_type?u=o.filter(".js_select_disabled_1"):2==_.sns_card_type&&(u=o.filter(".js_select_disabled_2")),
u&&(u.each(function(){
p.push($(this).val());
}),e.select_card_checkbox.disable(p)),$(".js_add_card_link",i).click(function(){
return new h({
ispay:_.payflag,
is_sns_card:window.wx_is_can_use_sns_card
}),e.opt.hidePopup&&e.opt.hidePopup(),!1;
}),e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a);
}
function r(t){
var e=t.opt;
if("2"!=e.sns_card_type){
var i=[];
1==e.sns_card_type?i=[{
name:"全部卡券",
value:"friends,0"
}]:0==e.sns_card_type&&(i=[{
name:"全部卡券",
value:""
}],e.acl.is_can_card_friend&&i.push({
name:"朋友共享的券",
value:"friends,1"
})),e.acl.is_can_shake&&i.push({
name:"摇一摇",
value:"shake,1"
}),e.acl.is_intercomm_card;
var r=t.base_tag_filter?"|":"",c={};
if(c[t.base_tag_filter+r+"task,1"]="互通",c[t.base_tag_filter+r+"shake,1"]="摇一摇",c[t.base_tag_filter+r+"friends,1"]="朋友的券",
i.length>1){
new u({
container:$(".js_filter_tag",t.$container),
label:c[e.tag_filter]||"全部卡券",
data:i,
callback:function(i){
var r=t.base_tag_filter+(t.base_tag_filter&&i?"|"+i:i);
r!=e.tag_filter&&(e.tag_filter=r,a(e.pageInfo,t));
}
});
}
}
}
function c(t){
function e(e){
var i=$.trim(c.val());
(!e||e&&wx.isHotkey(e,"enter"))&&(n.param.keyword=i,a(n.pageInfo,t));
}
var i=t.$container,r=$(".js_search",i),c=$(".js_keyword",i),n=t.opt;
r.click(function(){
e();
}),c.keyup(function(t){
e(t);
}),c.val(n.param.keyword);
}
function n(t){
var e=t.$container,a=e.find(".js_modify_quantity");
a.each(function(){
var e=$(this),a=1*e.attr("data-new")||0;
new y({
container:e,
mode:"fixed",
cache_card:t.opt.cache_data,
setquantity:a?!0:!1,
max_sku_for_eachcard:t._quota&&t._quota.max_sku||1e4,
quantityChange:function(t,a){
var i=b[t];
if(i){
if(i.pay_info.is_swipe_card)return i.pay_info.swipe_card_status=1,void e.hide();
i.quantity=this.opt.setquantity?i.quantity+a:a,e.attr("data-new",1),i.isnew=!0,this.opt.setquantity=!0,
$("#js_ct_tr_"+t).find(".js_sendcard_quantity").text(i.quantity);
}
}
});
});
}
function s(t,e){
var r=t.total_count,c=e.$container;
if(t.count&&r>t.count){
var n=t.begin/t.count;
e.pagebar=new d({
container:$(".js_pager",c),
first:!1,
last:!1,
midRange:5,
initShowPage:n+1,
perPage:t.count,
totalItemsNum:r,
callback:function(r){
if(w)return!1;
var c=r.currentPage;
return c!=n+1&&(t.begin=(c-1)*t.count,e.opt.hasdata&&e.opt.data?i(t,e,!0):a(t,e)),
e.opt.pageChanged&&e.opt.pageChanged.call(e),!0;
}
});
}
}
var _=t("common/wx/Tips.js"),o=t("common/wx/Cgi.js"),d=(t("common/wx/Step.js"),t("common/wx/pagebar.js")),l=t("cardticket/parse_data.js"),u=t("biz_web/ui/dropdown.js"),p=t("cardticket/store_cgi.js"),f=t("cardticket/common_template_helper.js"),h=t("cardticket/create_card_select.js"),m={
multi:!1,
pageInfo:{
begin:0,
count:5,
total_count:0
},
param:{
keyword:"",
status:"3|6",
flag:2
},
neednew:!0,
noexpire:!0,
editquantity:!0,
onHide:$.noop,
selectComplete:$.noop,
data:null,
hasdata:!1,
maxcount:10,
sns_card_type:1,
defaultValues:[],
url:"",
removeOnHide:!0,
source:"",
has_sendout:!1,
acl:{},
view_mode:0,
sub_merchant_id:void 0,
filter_out_expired_card:1
},g=t("tpl/cardticket/card_table.html.js"),b=(template.compile(t("tpl/cardticket/card_preview.html.js")),
{});
t("page/cardticket/dialog_choose_card.css"),t("biz_web/ui/checkbox.js");
var v=function(t){
this.opt=$.extend(!0,{},m,t),this.opt.tag_filter=0==this.opt.sns_card_type?"":2==this.opt.sns_card_type?"friends,1":"friends,0",
this.init();
},k=template.compile(g),w=!1,y=t("cardticket/card_quantity.js");
return v.prototype={
_html:g,
init:function(){
var t=this.opt,e=this;
if(this.$container=$(t.container),e.base_tag_filter="",2==t.view_mode&&(e.base_tag_filter="sub_merchant,1",
t.tag_filter=t.tag_filter?e.base_tag_filter+"|"+t.tag_filter:e.base_tag_filter),
t.hasdata&&t.data){
t.pageInfo.total_count=t.data.length,b={};
for(var r=0;r<t.data.length;r++){
var c=t.data[r];
b[c.id]=c;
}
i(t.pageInfo,this);
}else a(t.pageInfo,this);
},
show:function(){
this.$container.show();
},
select:function(){
if(!w){
var t=this,e=this.opt,a=t.select_card_checkbox.values()[0],i=this.$container,r=b[a];
if(!a||!r)return void _.err("请选择卡券");
if(!e.neednew||!r.pay_info.is_swipe_card||0==r.pay_info.swipe_card_status||0!=r.quantity){
if(e.multi)for(var c=t.select_card_checkbox.values(),n=0;n<c.length;n++){
var s=b[c[n]];
if(e.neednew&&(!s.isnew||0==s.quantity))return void _.err("卡券库存不能为0，请先设置库存再投放");
}else if(e.neednew&&(!r.isnew||0==r.quantity))return _.err("卡券库存不能为0，请先设置库存再投放"),
void setTimeout(function(){
var t=i.find("input[data-id="+a+"]");
$(t.closest("tr").find(".js_modify_quantity")[0]).click();
},50);
if(!e.multi&&e.noexpire&&r.is_expire)return void _.err(r.is_sns_card?"卡券已过期":"卡券已过期，无法投放，请到卡券详情去延长有效期再投放");
if(e.multi&&e.noexpire)for(var c=t.select_card_checkbox.values(),n=0;n<c.length;n++){
var s=b[c[n]];
if(s.is_expire)return void _.err("不能选择已过期的卡券，请先到卡券详情去延长有效期");
}
var c=t.select_card_checkbox.values();
return c.length>e.maxcount?void _.err("最多只能选择%s个卡券".sprintf(e.maxcount)):2!=e.sns_card_type||r.is_sns_card?1==e.sns_card_type&&r.is_sns_card?void _.err("朋友的券只能进行社交投放, 请重新选择"):"undefined"!=typeof e.sub_merchant_id&&r.is_sub_merchant_disabled?void _.err("不支持赠送其他商户的“朋友的券”，请重新选择。"):void p.canSendCard({
card_id:a,
success:function(a){
if(a===!1)_.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行投放。");else if(a===!0){
var i=t.select_card_checkbox.values(),r=e.multi?i:i,c=[];
if(e.multi)for(var n=0;n<r.length;n++)b[r[n]].cardid=b[r[n]].id,c.push(b[r[n]]);else c=b[r],
c.cardid=b[r].id;
e.selectComplete&&e.selectComplete(c,0);
}
}
}):void _.err("朋友的券才能进行社交投放, 请重新选择");
}
switch(r.pay_info.swipe_card_status){
case 1:
_.err("添加库存暂未生效，待商户审核完成");
break;

case 3:
_.err("请先激活本券");
break;

case 2:
case 4:
_.err("卡券库存不能为0，请先设置库存再投放");
}
}
},
isLoading:function(){
return w;
},
hide:function(){
this.$container.hide();
},
destroy:function(){
this.$container.remove();
}
},v;
});define("original/tpl/whitepop.html.js",[],function(){
return'<div class="setting_panel">\n    <div class="dialog_bd_inner">\n        <p class="tips">设置该帐号的转载权限，仅对设置后再转载的文章生效，不会影响历史已转载的文章：</p>\n        <ul class="permission_list">\n            {if showAllowRe}\n            <li class="list_item gray">\n                <label class="frm_checkbox_label selected">\n                    <i class="icon_checkbox"></i>\n                    <span class="lbl_content">可转载</span>\n                    <input type="checkbox" class="frm_checkbox" checked="checked">\n                </label>\n            </li>\n            {/if}\n            <li class="list_item">\n            {if showModify}\n                <label class="frm_checkbox_label selected">\n                    <i class="icon_checkbox"></i>\n                    <span class="lbl_content">可修改文章</span>\n                    <input type="checkbox" class="frm_checkbox js_popinput" value="md" checked="checked">\n                </label>\n                <p class="desc">该帐号可以修改文章的内容、格式、排版等。勾选后，原公众号再行投诉修改并转载的文章侵犯著作权将不被支持。腾讯不会也无法介入该文章修改事宜的纠纷解决。建议你与该帐号事先沟通后再行选择。</p>\n            {else}\n                <label class="frm_checkbox_label">\n                    <i class="icon_checkbox"></i>\n                    <span class="lbl_content">可修改文章</span>\n                    <input type="checkbox" class="frm_checkbox js_popinput" value="md">\n                </label>\n                <p class="desc">该帐号可以修改文章的内容、格式、排版等。勾选后，原公众号再行投诉修改并转载的文章侵犯著作权将不被支持。腾讯不会也无法介入该文章修改事宜的纠纷解决。建议你与该帐号事先沟通后再行选择。</p>\n            {/if}\n            </li>\n            <li class="list_item">\n            {if showHideSor}\n                <label class="frm_checkbox_label selected">\n                    <i class="icon_checkbox"></i>\n                    <span class="lbl_content">可不显示转载来源</span>\n                    <input type="checkbox" class="frm_checkbox js_popinput" value="hs" checked="checked">\n                </label>\n                <p class="desc">该帐号转载文章将不再由系统注明出处。</p>\n            {else}\n                <label class="frm_checkbox_label">\n                    <i class="icon_checkbox"></i>\n                    <span class="lbl_content">可不显示转载来源</span>\n                    <input type="checkbox" class="frm_checkbox js_popinput" value="hs">\n                </label>\n                <p class="desc">该帐号转载文章将不再由系统注明出处。</p>\n            {/if}\n            </li>\n        </ul>\n    </div>\n</div>\n';
});define("original/tpl/MultiStepDialog.html.js",[],function(){
return'<div class="whitelist_dialog">\n    <div class="processor_wrp js_process"></div>\n    {each steps as item idx}\n    {if idx==0}\n    <div class="processor_panel step{idx} js_step{idx}"></div>\n    {else}\n    <div class="processor_panel step{idx} js_step{idx}" style="display:none;"></div>\n    {/if}\n    {/each}\n</div>\n';
});define("biz_web/lib/spin.js",[],function(){
var t=function(){
function t(t,n){
for(var e=~~((t[f]-1)/2),r=1;e>=r;r++)n(t[2*r-1],t[2*r]);
}
function n(n){
var e=document.createElement(n||"div");
return t(arguments,function(t,n){
e[t]=n;
}),e;
}
function e(t,n,r){
return r&&!r[z]&&e(t,r),t.insertBefore(n,r||null),t;
}
function r(t,n){
var e,r=[h,n,~~(100*t)].join("-"),i="{"+h+":"+t+"}";
if(!A[r]){
for(e=0;e<T[f];e++)try{
D.insertRule("@"+(T[e]&&"-"+T[e].toLowerCase()+"-"||"")+"keyframes "+r+"{0%{"+h+":1}"+n+"%"+i+"to"+i+"}",D.cssRules[f]);
}catch(o){}
A[r]=1;
}
return r;
}
function i(t,n){
var e,r,i=t[g];
if(void 0!==i[n])return n;
for(n=n.charAt(0).toUpperCase()+n.slice(1),r=0;r<T[f];r++)if(e=T[r]+n,void 0!==i[e])return e;
}
function o(n){
return t(arguments,function(t,e){
n[g][i(n,t)||t]=e;
}),n;
}
function s(n){
return t(arguments,function(t,e){
void 0===n[t]&&(n[t]=e);
}),n;
}
var a,u="width",f="length",l="radius",c="lines",d="trail",p="color",h="opacity",v="speed",m="shadow",g="style",w="height",b="left",x="top",y="px",k="childNodes",$="firstChild",z="parentNode",C="position",M="relative",R="absolute",j="animation",B="transform",N="Origin",E="Timeout",L="coord",O="#000",S=g+"Sheets",T="webkit0Moz0ms0O".split(0),A={};
e(document.getElementsByTagName("head")[0],n(g));
var D=document[S][document[S][f]-1],H=function(t){
this.opts=s(t||{},c,12,d,100,f,7,u,5,l,10,p,O,h,.25,v,1);
},I=H.prototype={
spin:function(t){
var n=this,r=n.el=n[c](n.opts);
if(t&&e(t,o(r,b,~~(t.offsetWidth/2)+y,x,~~(t.offsetHeight/2)+y),t[$]),!a){
var i=n.opts,s=0,u=20/i[v],f=(1-i[h])/(u*i[d]/100),l=u/i[c];
!function p(){
s++;
for(var t=i[c];t;t--){
var e=Math.max(1-(s+t*l)%u*f,i[h]);
n[h](r,i[c]-t,e,i);
}
n[E]=n.el&&window["set"+E](p,50);
}();
}
return n;
},
stop:function(){
var t=this,n=t.el;
return window["clear"+E](t[E]),n&&n[z]&&n[z].removeChild(n),t.el=void 0,t;
}
};
I[c]=function(t){
function i(e,r){
return o(n(),C,R,u,t[f]+t[u]+y,w,t[u]+y,"background",e,"boxShadow",r,B+N,b,B,"rotate("+~~(360/t[c]*k)+"deg) translate("+t[l]+y+",0)","borderRadius","100em");
}
for(var s,a=o(n(),C,M),g=r(t[h],t[d]),k=0;k<t[c];k++)s=o(n(),C,R,x,1+~(t[u]/2)+y,B,"translate3d(0,0,0)",j,g+" "+1/t[v]+"s linear infinite "+(1/t[c]/t[v]*k-1/t[v])+"s"),
t[m]&&e(s,o(i(O,"0 0 4px "+O),x,2+y)),e(a,e(s,i(t[p],"0 0 1px rgba(0,0,0,.1)")));
return a;
},I[h]=function(t,n,e){
t[k][n][g][h]=e;
};
var U="behavior",V="url(#default#VML)",W="group0roundrect0fill0stroke".split(0);
return function(){
var t,r=o(n(W[0]),U,V);
if(!i(r,B)&&r.adj){
for(t=0;t<W[f];t++)D.addRule(W[t],U+":"+V);
I[c]=function(){
function t(){
return o(n(W[0],L+"size",d+" "+d,L+N,-a+" "+-a),u,d,w,d);
}
function r(r,i,f){
e(v,e(o(t(),"rotation",360/s[c]*r+"deg",b,~~i),e(o(n(W[1],"arcsize",1),u,a,w,s[u],b,s[l],x,-s[u]/2,"filter",f),n(W[2],p,s[p],h,s[h]),n(W[3],h,0))));
}
var i,s=this.opts,a=s[f]+s[u],d=2*a,v=t(),g=~(s[f]+s[l]+s[u])+y;
if(s[m])for(i=1;i<=s[c];i++)r(i,-2,"progid:DXImage"+B+".Microsoft.Blur(pixel"+l+"=2,make"+m+"=1,"+m+h+"=.3)");
for(i=1;i<=s[c];i++)r(i);
return e(o(n(),"margin",g+" 0 0 "+g,C,M),v);
},I[h]=function(t,n,e,r){
r=r[m]&&r[c]||0,t[$][k][n+r][$][$][h]=e;
};
}else a=i(r,j);
}(),H;
}();
$.fn.spin=function(n,e){
return this.each(function(){
var r=$(this),i=r.data();
i.spinner&&(i.spinner.stop(),delete i.spinner),n!==!1&&(n=$.extend({
color:e||r.css("color")
},$.fn.spin.presets[n]||n),i.spinner=new t(n).spin(this));
});
},$.fn.spin.presets={
tiny:{
lines:8,
length:2,
width:2,
radius:3
},
small:{
lines:8,
length:4,
width:3,
radius:5
},
large:{
lines:10,
length:8,
width:4,
radius:8
}
};
});define("tpl/popup.html.js",[],function(){
return'<div class="dialog_wrp {className}" style="{if width}width:{width}px;{/if}{if height}height:{height}px;{/if}">\n	<div class="dialog">\n		<div class="dialog_hd">\n			<h3>{title}</h3>\n      <button onclick="return false;" class="weui-desktop-icon-btn weui-desktop-dialog__close-btn pop_closed">\n        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><title>Element / Icon - Close</title><path d="M10.01 8.996l7.922-7.922c.086-.086.085-.21.008-.289l-.73-.73c-.075-.074-.208-.075-.29.007L9 7.984 1.077.062C.995-.02.863-.019.788.055l-.73.73c-.078.078-.079.203.007.29l7.922 7.92-7.922 7.922c-.086.086-.085.212-.007.29l.73.73c.075.074.207.074.29-.008l7.92-7.921 7.922 7.921c.082.082.215.082.29.008l.73-.73c.077-.078.078-.204-.008-.29l-7.921-7.921z"/></svg>\n      </button>\n      <!--\n      <a href="javascript:;" onclick="return false" class="icon16_opr closed pop_closed">关闭</a>\n      -->\n		</div>\n		<div class="dialog_bd">{=content}</div>\n		{if buttons && buttons.length}\n		<div class="dialog_ft">\n			{if miniTips}\n			<div class="js_mini_tips dialog_tool_tips">\n                {=miniTips.text}\n            </div>\n			{/if}            \n			{each buttons as bt index}\n            <span style="{if bt.isHide}display:none;{/if}" class="{bt.classWrap} btn {bt.type} btn_input js_btn_p"><button type="button" class="js_btn" data-index="{index}">{bt.text}</button></span>\n	        {/each}\n		</div>\n		{/if}\n	</div>\n</div>{if mask}<div class="mask"><iframe frameborder="0" style="filter:progid:DXImageTransform.Microsoft.Alpha(opacity:0);position:absolute;top:0px;left:0px;width:100%;height:100%;" src="about:blank"></iframe></div>{/if}\n';
});define("common/wx/widgetBridge.js",[],function(){
"use strict";
$.widgetBridge||($.widgetBridge=function(t,e){
var i=t,n=i.split("."),t=n.length>1?n[1]:n[0];
$.fn[t]=function(n){
var o="string"==typeof n,r=[].slice.call(arguments,1),a=this;
if(n=n||{},o){
var s;
return 0!==n.indexOf("_")&&this.each(function(){
var e=$.data(this,i);
return e?"instance"===n?(s=e,!1):"option"===n?(s=e.options,!1):(s||(s=(e[n]||jQuery.noop).apply(e,r)),
void("destroy"===n&&(e.elements=null))):$.error("cannot call methods on "+t+" prior to initialization; attempted to call method '"+n+"'");
}),s;
}
var d=this;
return this.each(function(){
var t=this,o=$.data(this,i);
if(!o){
o=$.extend(!0,{},e),o.destroy||(o.destroy=function(){
$.removeData(t,i);
}),o.options=$.extend(!0,o.options||{},n),o.element=$(this),o.elements=d,o._create&&(a=o._create.call(o,n));
var r=a&&a.length&&a.get(0)||this;
$.data(r,i,o);
}
}),a;
};
});
});define("biz_common/utils/monitor.js",[],function(){
var n=[],t={};
return t.setAvg=function(i,e,o){
return n.push(i+"_"+e+"_"+o),n.push(i+"_"+(e-1)+"_1"),t;
},t.setSum=function(i,e,o){
return n.push(i+"_"+e+"_"+o),t;
},t.send=function(){
if(0!=n.length){
var t=new Image;
t.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+n.join(";")+"&t="+Math.random(),n=[];
}
},t;
});define("media/preview.js",["common/qq/events.js","common/wx/phoneView.js","biz_common/moment.js","tpl/media/preview/appmsg.html.js","tpl/media/preview/card.html.js","tpl/media/preview/moments.html.js","tpl/media/preview/chat.html.js"],function(e,t){
"use strict";
function i(e,t){
var i=wx.data.time;
wx.cgiData.appmsg_data&&wx.cgiData.appmsg_data.create_time&&(i=wx.cgiData.appmsg_data.create_time);
for(var a=[],n=0;8>n&&e["title"+n];n++)a.push({
copyright_headimg:t[n].copyright_headimg,
copyright_nickname:t[n].copyright_nickname,
title:e["title"+n],
time:d.unix(i).format("YYYY-MM-DD"),
unix:i,
avatar:wx.url("/misc/getheadimg?fakeid="+wx.data.uin),
author:e["author"+n],
nickName:wx.data.nick_name,
content:e["content"+n],
digest:e["digest"+n],
img:e["cdn_url"+n]||e["fileid"+n]&&wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId="+e["fileid"+n])||"",
show_cover:e["show_cover_pic"+n],
sourceurl:e["sourceurl"+n],
ad_info:e["ad_info"+n],
is_share_copyright:e["is_share_copyright"+n],
guide_words:e["guide_words"+n],
share_copyright_url:e["share_copyright_url"+n]
});
return a;
}
var a=e("common/qq/events.js")(!0),n=e("common/wx/phoneView.js"),d=e("biz_common/moment.js"),s=null,m={
appmsg:e("tpl/media/preview/appmsg.html.js"),
card:e("tpl/media/preview/card.html.js"),
moments:e("tpl/media/preview/moments.html.js"),
chat:e("tpl/media/preview/chat.html.js")
};
t.show=function(t,r,o,c){
if(r=r||0,s=i(t,o),s.index=r,0!=s.length){
s[0].date=d.unix(s[0].unix).format("MM月DD日");
{
new n({
html:e("tpl/media/preview/card.html.js"),
data:s.length>1?{
list:s,
nickName:wx.data.nick_name
}:s[0],
todo:function(){
var e=this;
e.$dom.find(".jsPhoneViewPlugin").on("click",".jsPhoneViewLink",function(){
$(this).hasClass("selected")||($(this).addClass("selected").siblings().removeClass("selected"),
"appmsg"==$(this).data("id")?(e.render(m.appmsg,{
data:s[r],
index:r,
length:s.length
}),c.afterSetContent(e.$dom)):"card"==$(this).data("id")?s.length>1?e.render(m.card,{
list:s,
nickName:wx.data.nick_name
}):e.render(m.card,s[0]):"moments"==$(this).data("id")?e.render(m.moments,{
list:s
}):"chat"==$(this).data("id")&&e.render(m.chat,{
list:s
}));
}),e.$dom.on("click",".jsPhoneViewCard",function(){
var t=$(this);
t.hasClass("disabled")||("undefined"!=typeof t.data("index")&&(r=t.data("index")),
e.render(m.appmsg,{
data:s[r],
index:r,
length:s.length
}));
}),e.$dom.on("click",".jsPhoneViewPub",function(){
a.trigger("_preview");
});
}
});
}
}
};
});define("tpl/media/appmsg_edit/article_list_item.html.js",[],function(){
return'<div id="appmsgItem{id}" data-fileId="{file_id}" data-id="{id}" data-msgindex="{msg_index}" class="js_appmsg_item appmsg_item_wrp {if cover}has_thumb{/if}">\n    <div class="first_appmsg_item" {if !isFirst}style="display:none;"{/if} title="{title_tips}">\n        <div class="cover_appmsg_item">\n            <h4 class="appmsg_title"><a class="js_appmsg_title" href="javascript:void(0);" onclick="return false;">{title || \'标题\'}</a></h4>\n            <div class="appmsg_thumb_wrp js_appmsg_thumb" style="background-image:url(\'{cover.nogif()}\');">\n                <!--<img class="js_appmsg_thumb appmsg_thumb" src="{cover}">-->\n                <div class="appmsg_thumb default">\n                    <i class="icon_appmsg_thumb">封面图片</i>\n                </div>\n            </div>        \n        </div>\n        <div class="appmsg_edit_mask js_readonly">\n            <a onclick="return false;" class="icon20_common sort_down_white js_down" data-id="{id}" href="javascript:;" title="下移">向下</a>\n        </div>\n    </div>\n    <div class="appmsg_item has_cover" {if isFirst}style="display:none;"{/if} title="{title_tips}">\n        <div class="appmsg_thumb_wrp js_appmsg_thumb" style="background-image:url(\'{cover.nogif()}\');">\n            <div class="appmsg_thumb default">\n                <i class="icon_appmsg_thumb_small">缩略图</i>\n            </div>\n        </div>\n        <h4 class="appmsg_title js_appmsg_title">{title || \'标题\'}</h4>\n        <div class="appmsg_edit_mask js_readonly">\n            <a onclick="return false;" class="icon20_common sort_up_white   js_up"   data-id="{id}" href="javascript:;" title="上移">向上</a>\n            <a onclick="return false;" class="icon20_common sort_down_white js_down" data-id="{id}" href="javascript:;" title="下移">向下</a>\n            <a onclick="return false;" class="icon20_common del_media_white js_del"  data-id="{id}" href="javascript:;" title="删除">删除</a>\n        </div>\n    </div>\n</div>\n';
});define("media/draft.js",["biz_common/jquery.md5.js","media/common.js","common/qq/Class.js","biz_web/lib/store.js","biz_common/moment.js","media/report.js"],function(t){
"use strict";
function e(t,e){
return"draft_ls|%s|bizuin:%s|appid:%s|ua:%s|start_write:%s|start_read:%s|start_write_err_STK:%s|start_read_err_STK:%s".sprintf(t||"",wx.data.uin||"",e||0,window.navigator.userAgent,h.lsStartWriteEnable,h.lsStartReadEnable,h.lsStartWriteErrLog,h.lsStartReadErrLog);
}
function a(t){
var e=t.stack||t.toString()||"";
try{
e=e.replace(/http(s)?:\/\/res\.wx\.qq\.com/g,"");
for(var a=/\/([^.]+)\/js\/(\S+?)\.js(\,|:)?/g;a.test(e);)e=e.replace(a,"$2$3");
}catch(t){
e=t.stack?t.stack:"";
}
return e.replace(/\n/g,"");
}
function r(){
if(!u.isLocalStorageNameSupported()){
var t=e("notsupport");
return v.logReport("65080_44_1;65080_45_1",t,"img"),void(h.lsSupport=!1);
}
v.logReport("65080_44_1","","img"),h.lsSupport=!0;
var r=+new Date+"";
try{
window.localStorage.setItem(h.namespace,r);
}catch(i){
h.lsStartWriteEnable=0,h.lsStartWriteErrLog=a(i);
}
var s="";
try{
s=window.localStorage.getItem(h.namespace);
}catch(i){
h.lsStartReadEnable=0,h.lsStartReadErrLog=a(i);
}
window.localStorage.removeItem(h.namespace),s==r&&(h.lsStartWriteEnable=1,h.lsStartWriteErrLog="",
h.lsStartReadEnable=1,h.lsStartReadErrLog="");
}
function i(t,e,a,r){
return d(t,e,a,3,0,r);
}
function s(t,e,a){
return d(t,e,a,4);
}
function n(t){
var e=c(t);
e.appKey+=h.readOnlyDraftName;
var a=_(e.appKey);
return a&&a.list?a.list||!1:!1;
}
function o(t){
var e=c(t);
e.appKey+=h.readOnlyDraftName,u.remove(e.appKey);
}
function _(t){
var e=!1,a=!1;
if(e=u.get(t,function(){
a=!0;
}),a===!0||!e||"v2"!=e.v)return!1;
if(e.md5===$.md5(e.data)){
try{
e=JSON.parse(e.data);
}catch(r){
return!1;
}
return e?(e.seq=(e.seq||"0")+"",e):!1;
}
return!1;
}
function d(t,r,i,s,n,o){
if(h.lsSupport!==!0||!t)return!1;
i=i+""||"0",o=o+""||"0";
var _=c(r);
3==s&&(_.appKey+=h.conflictName),4==s&&(_.appKey+=h.readOnlyDraftName);
var d=1,l=[],p="65080_31_1",f="",m={
data:"",
md5:"",
v:g
},S=+new Date,y={
list:t,
seq:i,
write_t:S,
active_id:n
};
3==s&&(y.ls_seq=o);
try{
m.data=JSON.stringify(y),m.md5=$.md5(m.data);
}catch(q){
d=-6,p+=";65080_86_1",l.push("serialize_err_STK:"+a(q));
}
if(1==d&&u.set(_.appKey,m,function(t){
d=-1,p+=";65080_34_1",l.push("write_err_STK:"+a(t));
}),1==d&&(f=u.get(_.appKey,function(t){
d=-2,p+=";65080_36_1",l.push("read_err_STK:"+a(t));
})),1==d&&m.md5!=f.md5&&(p+=";65080_38_1",d=-3),1==d)return 2==s&&(p+=";65080_47_1"),
3==s?(p+=";65080_88_1",v.logReport(p,e("conflict_data",r)+("|data:"+m.data),"ajax")):v.logReport(p,"","img"),
$("#js_autosave").attr("title"," 已自动保存").fadeIn(500),!0;
var K=e("writeerr",r)+"|handle_type："+d+"|"+l.join("|");
return p+=";65080_32_1",p+=h.lsStartWriteEnable&&h.lsStartReadEnable?";65080_40_1":";65080_42_1",
2==s?(p+=";65080_48_1",K+="|leave_data:"+m.data):3==s&&(p+=";65080_88_1",K+="|conflict_data:"+m.data),
v.logReport(p,K,"ajax"),!1;
}
function l(t){
if(h.lsSupport!==!0)return!1;
var r=c(t);
u.remove(r.timeKey);
var i=1,s=[],n="65080_63_1";
u.remove(r.appKey,function(t){
n+=";65080_70_1",i=-4,s.push("clear_err_STK:"+a(t));
});
var o="";
if(1==i&&(o=u.get(r.appKey,function(t){
n+=";65080_72_1",i=-2,s.push("read_err_STK:"+a(t));
})),1==i&&o&&(n+=";65080_74_1",i=-3),1==i)return v.logReport(n,"","img"),!0;
n+=";65080_64_1",n+=h.lsStartWriteEnable&&h.lsStartReadEnable?";65080_66_1":";65080_68_1";
var _=e("clearerr",t)+"|handle_type："+i+"|"+s.join("|");
return v.logReport(n,_,"ajax"),!1;
}
function c(t){
var e={
draftId:wx.data.uin+(t?t:"")
};
return e.timeKey="Time"+e.draftId,e.appKey="App"+e.draftId,e;
}
t("biz_common/jquery.md5.js");
var p=t("media/common.js"),f=t("common/qq/Class.js"),u=t("biz_web/lib/store.js"),m=t("biz_common/moment.js"),v=t("media/report.js"),g="v2",h={
lsStartWriteEnable:0,
lsStartReadEnable:0,
lsStartWriteErrLog:"",
lsStartReadErrLog:"",
namespace:"__editordraft__",
conflictName:"__conflict",
readOnlyDraftName:"__readonlydraft",
lsSupport:!1,
diffTime:Math.floor(wx.cgiData.svr_time-new Date/1e3)
};
r();
var S=f.declare({
init:function(t,e,a){
var r=this;
r.app_id=t;
var i=c(t);
r.draftId=i.draftId,r.timeKey=i.timeKey,r.appKey=i.appKey,r.seq=e+"",r.editor=a,
r.isDropped=!1,r.conflict=!1,r.activeId=0,r.data=r.get();
},
_updateAppid:function(t,e){
this.app_id=t;
var a=c(t);
this.draftId=a.draftId,this.timeKey=a.timeKey,this.appKey=a.appKey,this.seq=e;
},
_supportUserData:function(){
try{
var t=document.createElement("input");
t.addBehavior("#default#userData");
}catch(e){
return!1;
}
return!0;
},
_getSaveTime:function(){
return u.get(this.timeKey);
},
_showTips:function(t){
$("#js_autosave").attr("title",t+" 已自动保存").show(),$("#js_draft_tips").show().find(".js_msg_content").html("已从本地读取' + time + '的草稿");
},
_getDefaultLog:function(t){
return e(t,this.app_id);
},
_getErrorMessage:function(t){
return a(t);
},
_validateMutilWin:function(t,e){
"undefined"==typeof e&&(e=this.activeId);
var a=this,r=_(this.appKey);
return a.editor.fireEvent("reportAddNum",65080,104,1),r&&r.list?"gt"==p.dataSeqCompare(this.seq,r.seq)?!0:"lt"==!p.dataSeqCompare(this.seq,r.seq)?(this.data=r.list||!1,
this.seq=r.seq+"",t!==!0&&a.editor.fireEvent("syn_draft"),!1):!r.active_id||1*r.active_id<1*e?!0:1*r.active_id>1*e?(this.data=r.list||!1,
this.seq=r.seq+"",t!==!0&&a.editor.fireEvent("syn_draft"),!1):!0:!0;
},
showTips:function(){
$("#js_draft_tips").show().find(".js_msg_content").html('<span class="js_msg_content">点击<span class="link_global" id="js_draft_cancel">撤消</span>刚刚的导入操作。</span>');
},
active:function(t){
var e=this;
return this.activeId>0?!0:(this.activeId=+new Date,this.editor.fireEvent("active_state_change"),
setTimeout(function(){
e._validateMutilWin(t,0);
},1e3),!0);
},
silent:function(){
this.activeId=0,this.editor.fireEvent("active_state_change");
},
clear:function(){
return l(this.app_id);
},
save:function(t,e){
var a=this._validateMutilWin();
return a===!1?(this.silent(),!1):d(t,this.app_id,this.seq,e,this.activeId);
},
forceSave:function(t,e){
return d(t,this.app_id,this.seq,1,e||+new Date);
},
get:function(){
if(h.lsSupport!==!0)return!1;
var t=this,e=1,a=[],r="65080_50_1",i=!1,s="",n="";
if(s=u.get(t.appKey,function(i){
e=-2,r+=";65080_76_1",a.push("read_err_STK:"+t._getErrorMessage(i));
}),1==e&&s)if(r+=";65080_57_1","v2"==s.v)if(r+=";65080_82_1",n="",s.md5===$.md5(s.data)){
try{
s=JSON.parse(s.data);
}catch(o){
r+=";65080_80_1",e=-5;
}
1==e&&("gt"==p.dataSeqCompare(s.seq,t.seq)?(i=!1,e=-8,r+=";65080_90_1"):"gt"==p.dataSeqCompare(t.seq,s.seq)?(t.conflict=!0,
t.conflict_ls_seq=s.seq+"",i=s.list||!1):(t.conflict_ls_seq=s.seq+"",i=s.list||!1));
}else e=-3,r+=";65080_78_1";else"v1"==s.v?(r+=";65080_59_1",n=s.t||"",i=s.list||!1,
t.conflict_ls_seq="0"):(n=u.get(t.timeKey),r+=";65080_61_1",i=s||!1,t.conflict_ls_seq="0");
if(1==e&&n)try{
Number(wx.cgiData.updateTime)>m(n,"YYYY-MM-DD HH:mm:ss").unix()+h.diffTime&&(t.conflict=!0);
}catch(o){}
if(t.conflict===!0&&(r+=";65080_84_1"),1==e)return v.logReport(r,"","img"),i||!1;
r+=";65080_51_1",r+=h.lsStartWriteEnable&&h.lsStartReadEnable?";65080_53_1":";65080_55_1";
var _=t._getDefaultLog("readerr")+"|handle_type："+e+"|"+a.join("|");
return v.logReport(r,_,"ajax"),!1;
}
});
return{
constructor:S,
clear:l,
saveConflict:i,
saveReadOnlyDraft:s,
getReadOnlyDraft:n,
clearReadOnlyDraft:o
};
});define("media/article.js",["media/common.js","common/qq/Class.js","biz_common/jquery.validate.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/mpEditor/plugin/remoteimg.js","common/wx/popover.js"],function(e){
"use strict";
var t=e("media/common.js"),i=e("common/qq/Class.js"),r=e("biz_common/jquery.validate.js"),s=e("common/wx/Tips.js"),n=(e("common/wx/dialog.js"),
e("common/wx/mpEditor/plugin/remoteimg.js")),o=(e("common/wx/popover.js"),r.rules),a=wx.cgiData,_=["一","二","三","四","五","六","七","八","九","十"],d=i.declare({
init:function(e){
this.opt=e,this.$dom=$(e.dom),this.ueditor=e.ueditor,this.data=this._initData(e.data,e.index),
this.freeUEditor=e.freeUEditor,this.scrollTop=Math.min($(".js_main_title").offset().top,$(".main_bd").offset().top),
this._initDigest();
},
_initDigest:function(){
{
var e=this.data,t=e.get("digest");
e.get("content"),e.get("is_share_copyright");
}
return!this.opt.app_id||this.opt.isNew?void(this.autoDigest=!0):this.getDigestFromContent()==t?void(this.autoDigest=!0):void(this.autoDigest=!1);
},
_initData:function(e,t){
var i={};
if(i=$.extend({
is_new_video:0,
can_reward:0,
tags:[],
title:"",
title_tips:"",
author:"",
file_id:"",
digest:"",
content:"",
source_url:"",
cover:"",
releasetime:0,
need_open_comment:1,
only_fans_can_comment:0,
isFirst:0==t,
cdn_url:"",
cdn_url_back:"",
reward_money:0,
seq:t,
reward_wording:"",
msg_index:t,
source_url_checked:0,
show_cover_pic:0,
link_count:0,
copyright_type:0,
releasefirst:"",
platform:"",
reprint_permit_type:"",
original_article_type:"",
ori_white_list:"",
free_content:"",
fee:0,
ad_info:{
ad_id:"",
ad_img:"",
img:"",
nick_name:"",
pt:"",
trade_mode:""
},
copyright_headimg:"",
copyright_nickname:"",
guide_words:"",
is_share_copyright:0,
share_copyright_url:""
},e),i.only_fans_can_comment=1*i.only_fans_can_comment,i.file_id=1*i.file_id===0?"":i.file_id+"",
wx&&wx.cgiData&&0==wx.cgiData.can_use_comment&&(i.need_open_comment=0),0==i.need_open_comment&&(i.only_fans_can_comment=0),
i.title_tips="第%s篇图文".sprintf(_[t]),i.cdn_url_back||(i.cdn_url_back=i.cdn_url),i.cdn_url?i.cover=i.cdn_url=i.cdn_url.nogif():i.file_id&&(wx.cgiData.appmsg_data.multi_item&&$.each(wx.cgiData.appmsg_data.multi_item,function(e,t){
t.file_id==i.file_id&&(i.cover=t.cover);
}),i.cover||(i.cover=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(i.file_id)))),
i.source_url_checked=i.source_url?1:0,1*i.is_share_copyright==1){
i.guide_words=i.guide_words||"分享一篇文章。",i.cdn_url=i.cover,i.author="",i.file_id="";
var r=i.content.html(!1).replace(/<img[^>]*>/g,"<p>[图片]</p>").replace(/<iframe [^>]*?class=\"res_iframe card_iframe js_editor_card\"[^>]*?data-cardid=\"\"[^>]*?><\/iframe>/gi,"<p>[卡券]</p>").replace(/<mpvoice([^>]*?)js_editor_audio([^>]*?)><\/mpvoice>/g,"<p>[语音]</p>").replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<p>[音乐]</p>").replace(/<mpgongyi([^>]*?)js_editor_gy([^>]*?)><\/mpgongyi>/g,"<p>[公益]</p>").replace(/<mpshop([^>]*?)js_editor_shop([^>]*?)><\/mpshop>/g,"<p>[小店]</p>").replace(/<iframe([^>]*?)class=[\'\"][^\'\"]*video_iframe([^>]*?)><\/iframe>/g,"<p>[视频]</p>").replace(/(<iframe[^>]*?js_editor_vote_card[^<]*?<\/iframe>)/gi,"<p>[投票]</p>").replace(/<mp-weapp([^>]*?)weapp_element([^>]*?)><\/mp-weapp>/g,"<p>[小程序]</p>"),s=document.createElement("div");
s.innerHTML=r,r=s.innerText.trim().substr(0,140),r=r.split("\n").map(function(e){
return"<p>"+e+"</p>";
}),i.content=r.join("");
}
return i=this.ueditor.initPluginData(i),{
set:function(e,t){
"undefined"!=typeof i[e]&&(i[e]=t);
},
get:function(e){
return i[e];
},
getData:function(){
return i;
},
setData:function(e){
i=e;
}
};
},
updateIndex:function(e){
this.data.set("seq",e),this.data.set("msg_index",e),this.data.set("isFirst",0==e),
this.data.set("title_tips","第%s篇图文".sprintf(_[e]));
},
getIndex:function(){
return 1*this.data.get("seq");
},
setListItem:function(e){
this.$item=$(e);
},
showErrMsg:function(e,t){
this.ueditor.fireEvent("showErrMsg",e,t);
},
scrollIntoView:function(e,t){
this.ueditor.fireEvent("scrollIntoView",e,t);
},
hideAllErrMsg:function(){
this.ueditor.fireEvent("hideAllErrMsg");
},
_setEditorContent:function(){
var e=this,t=e.data.getData();
e.ueditor.ready(function(){
e.ueditor.setContent("");
try{
e.ueditor.setContent(t.content);
}catch(i){
t.content&&""==e.ueditor.getUeditor().getContent()&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=editor_setcontent_error;errmsg:%s,uin:%s".sprintf(28308,0,i.message,wx.data.uin),
window.BJ_REPORT&&"function"==typeof window.BJ_REPORT.report&&i&&i.stack&&(i.stack="editor_setcontent_error|"+i.stack,
window.BJ_REPORT.report(i)),i.stack&&console&&console.error&&console.error("[BJ-REPORT]",i.stack));
}
e.ueditor.setHistory(e.undoHistory);
});
},
_setOriginal:function(){
var e=this,t=e.data.getData(),i=e.$dom,r=$("#js_original");
if(r.find(".js_original_type").hide().eq(t.copyright_type||0).show(),t.copyright_type){
if(r.find(".js_original_content").show(),r.find(".js_original_publish").val(t.releasefirst),
r.find(".js_reprint_frm").val(t.reprint_permit_type),r.find(".js_url").text(t.source_url).closest("li")[t.source_url?"show":"hide"](),
r.find(".js_author").text(t.author),r.find(".js_platform").text(+t.releasefirst?"微信公众平台":t.platform),
r.find(".js_classify").text(t.original_article_type),i.find(".js_author").closest(".appmsg_edit_item").eq(0).hide(),
i.find(".js_reward").checkbox("disabled",!1),$("#js_pay").checkbox("disabled",1==t.reprint_permit_type),
1==t.reprint_permit_type?r.find(".js_pay_tips").text("（只有“禁止转载”的原创文章才可以设置付费阅读）").show():r.find(".js_pay_tips").text("（每月可群发10篇付费阅读文章）"),
"object"!=typeof t.ori_white_list)try{
t.ori_white_list=$.parseJSON(t.ori_white_list.html(!1)).white_list;
}catch(s){
t.ori_white_list=[];
}
$.each(t.ori_white_list,function(e,i){
i.title=[],1!=t.reprint_permit_type&&i.title.push("可转载"),1*i.can_modify&&i.title.push("可修改文章"),
1*i.can_hide_source&&i.title.push("可不显示转载来源"),i.title=i.title.join("、");
});
var n=template.render("tpl_whitelist",{
list:t.ori_white_list
});
r.find(".js_whitelist").html(n);
}else r.find(".js_original_content").hide(),i.find(".js_author").closest(".appmsg_edit_item").eq(0).show(),
i.find(".js_reward").checkbox("disabled",!0),i.find(".js_reward_div.js_reward_ios_wrap").hide(),
$("#js_pay").checkbox("disabled",!0),r.find(".js_pay_tips").show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),
r.find(".js_pay_setting").hide(),r.find(".js_whitelist").empty();
},
_setPay:function(){
var e=this,t=e.data.getData(),i=e.$dom;
$("#js_pay").checkbox("checked",!!t.payforread_enabled),i.find(".js_pay_setting")[t.payforread_enabled?"show":"hide"]().find(".js_fee").text(t.fee?(t.fee/100).toFixed(2):""),
i.find(".js_pay_tips")[t.payforread_enabled?"hide":"show"](),e.freeUEditor.val(t.free_content||"").trigger("keydown");
},
_setReprintArticle:function(){
var e=this.data,t=$("#reprint_article_main");
t.find(".js_title").text(e.get("title")),t.find(".js_nickname").text(e.get("copyright_nickname")),
t.find(".js_headimg").attr("src",e.get("copyright_headimg")).attr("alt",e.get("copyright_nickname")),
t.find(".js_content").html(e.get("content")),t.find(".js_link").attr("href",e.get("share_copyright_url")),
t.show();
},
_setAd:function(){
var e=this,t=e.data.getData(),i=e.$dom;
if(t.ad_info&&t.ad_info.ad_id){
t.ad_info.video_info&&(t.ad_info.ad_img=t.ad_info.video_info.thumbUrl);
var r=template.render("js_ad_preview_tpl",{
ad_id:t.ad_info.ad_id,
ad_img:t.ad_info.ad_img,
img:t.ad_info.img,
nick_name:t.ad_info.nick_name,
pt:t.ad_info.pt
});
i.find(".js_ad_preview").html(r),i.find(".js_tag").text(0==t.ad_info.trade_mode?"广告推荐":"内容定制");
}
},
hideErrorTips:function(){
this.$dom.find(".js_title_error,.js_author_error,.js_desc_error,.js_tip_mask_msg,.js_cover_error,.js_url_error,.js_content_error,.js_platform_error,.js_ad_error_tips,.js_reward_money_error").hide(),
this.$dom.find(".js_tip_mask").removeClass("error_mask").addClass("hover_mask");
},
setAutoDigest:function(e){
this.autoDigest=!!e;
},
getDigestFromContent:function(){
var e=this.data;
return $.trim(1*e.get("is_share_copyright")==1?e.get("guide_words").substr(0,54):e.get("content").text().html(!1).substr(0,54));
},
setDigest:function(){
var e=this.data,t=$.trim(e.get("digest"));
this.autoDigest&&!t?e.set("digest",this.getDigestFromContent()):e.set("digest",t);
},
flush:function(){
var e=this,t=e.data,i=e.$dom;
i.find(".js_field").each(function(){
var e=$(this),i=e.attr("name"),r=e.attr("type");
"checkbox"==r?t.set(i,e.checkbox("value")?1:0):"checkbox"==e.data("type")?t.set(i,1*e.val()?1:0):"guide_words"==i?t.set(i,e.val()):t.set(i,$.trim(e.val()));
}),1*t.get("is_share_copyright")==1?(t.set("guide_words",t.get("guide_words")||"分享一篇文章。"),
e.setDigest(),t.set("file_id",""),t.set("author","")):(t.setData(e.ueditor.getEditorData(t.getData())),
e.setDigest()),i.find('.js_desc[name="digest"]').val(t.get("digest")),t.set("source_url",t.get("source_url_checked")?t.get("source_url"):"");
var r=t.get("source_url");
r&&!/:\/\//.test(r)&&t.set("source_url","http://"+r),0==i.find(".js_reward_ios:checked").val()&&t.set("reward_money",0);
var s=i.find("#js_original");
if(t.set("copyright_type",$(".js_original_type:visible").index()),t.set("copyright_type",t.get("copyright_type")<0?0:t.get("copyright_type")),
t.get("copyright_type")){
t.set("releasefirst",s.find(".js_original_publish").val()),t.set("author",s.find(".js_author").text()),
t.set("platform",+t.get("releasefirst")?"":s.find(".js_platform").text()),t.set("reprint_permit_type",s.find(".js_reprint_frm").val()),
t.set("original_article_type",s.find(".js_classify").text());
var n=[];
s.find(".js_whitelist").children().each(function(){
n.push({
nickname:$.trim($(this).text()),
openid:$(this).attr("data-openid"),
can_modify:$(this).attr("data-can_modify"),
can_hide_source:$(this).attr("data-can_hide_source")
});
}),t.set("ori_white_list",JSON.stringify2({
white_list:n
}));
}
var o=$(".js_ad_msg");
if(t.set("ad_info",{
ad_id:o.data("ad_id")||"",
ad_img:o.data("ad_img")||"",
img:o.data("img")||"",
nick_name:o.data("nick_name")||"",
pt:o.data("pt")||"",
trade_mode:o.data("trade_mode")||""
}),0==t.get("need_open_comment")?t.set("only_fans_can_comment",0):t.set("only_fans_can_comment",1*$(".js_comment_setting:checked").val()||0),
1==a.can_use_hyperlink){
var _=t.get("content").match(/<a([^>]*)>(.*?)<\/a>/g);
_&&t.set("link_count",_.length);
}
return t.set("isFirst",0==e.$item.index()),t.set("free_content",this.freeUEditor.val()||""),
t.set("fee",100*i.find(".js_fee").text()),e.scrollTop=Math.max($(window).scrollTop(),$(".js_main_title").offset().top),
e.undoHistory=e.ueditor.getHistory(),this;
},
setHistory:function(e){
this.undoHistory=e;
},
getHistory:function(){
return this.undoHistory;
},
getData:function(e,t){
var i=this,r=i.data.getData(),s={},n=["title","content","digest","author","fileid","cdn_url","cdn_url_back","music_id","video_id","show_cover_pic","shortvideofileid","vid_type","copyright_type","releasefirst","platform","reprint_permit_type","original_article_type","can_reward","reward_wording","reward_money","need_open_comment","only_fans_can_comment","sourceurl","payforread_enabled","free_content","fee","voteid","voteismlt","supervoteid","cardid","cardquantity","cardlimit","isbn","ori_white_list","ad_info","guide_words","is_share_copyright","share_copyright_url"];
$.each(n,function(e,t){
switch(t){
case"fileid":
s.fileid=r.file_id;
break;

case"sourceurl":
s.sourceurl=r.source_url;
break;

case"cdn_url":
s.cdn_url=(r.cdn_url||"").https2http().nogif();
break;

case"cover":
break;

case"ad_info":
s.ad_id=r.ad_info&&r.ad_info.ad_id||"";
break;

default:
s[t]=r[t];
}
});
var o=e?t?i.validateStrictly(s):i.validate(s):$.extend(!0,{},r);
return!!o&&(o.cover=void 0),o;
},
getAllImgData:function(){
var e=this.ueditor.fireEvent("getRemoteList"),t=[];
for(var i in e){
var r=e[i];
t.push(r.uid);
}
t=0==t.length?"":","+t.join(",")+",";
for(var s=this.ueditor.getDocument(),n=s.getElementsByTagName("*"),o=",",a=[],i=0,_=n.length;_>i;i++){
var r=n[i];
if(/img/i.test(r.nodeName)){
var d=r.getAttribute("_src")||r.src||"",c=r.getAttribute("data-remoteid")||"";
if($(r).hasClass("js_catchremoteimageerror"))continue;
if(!d)continue;
if(o.indexOf(","+d+",")>=0)continue;
var l=!1;
t&&c&&t.indexOf(","+c+",")>=0&&(l=!0),o+=d+",",a.push({
url:this.git2Img(d),
uid:c,
isRemote:l
});
}else{
var u=r.getAttribute("style")||r.style.cssText||"";
if(u=u.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),u&&u[2]){
var d=u[2].replace(/^['"]|['"]$/g,""),c=r.getAttribute("data-remoteid")||"";
if($(r).hasClass("js_catchremoteimageerror"))continue;
if(!d)continue;
if(o.indexOf(","+d+",")>=0)continue;
var l=!1;
t&&c&&t.indexOf(","+c+",")>=0&&(l=!0),o+=d+",",a.push({
url:this.git2Img(d),
uid:c,
isRemote:l
});
}
}
}
return a;
},
git2Img:function(e){
return/\/0\?(.*&)?wx_fmt=gif/.test(e)?e.replace(/\/0\?/,"/s640?"):e;
},
validate:function(e){
var i,r=this,n=r.data.getData(),a=r.$dom,_=$("<div>").html(e.content),d=!0,c=null,l="",u=$(_).find(".js_catchremoteimageerror").length;
if(u)return i=a.find(".js_content_error"),this.showErrMsg(i,"正文有%s张图片粘贴失败".sprintf(u)),
this.scrollIntoView(i,200),null;
e.title||e.content||e.fileid||(this.showErrMsg(a.find(".js_content_error"),"请先输入一段正文（或者标题），再点击保存按钮。"),
r.ueditor.getUeditor().focus(),c=c||".js_content_error",d=null),wx.cgiData.is_no_cover_open&&(e.cdn_url&&!e.fileid||wx.cgiData.cover_restrict&&e.fileid);
var f=t.validate({
key:"title",
content:e.title
});
if(f&&f.msg&&(this.showErrMsg(a.find(".js_title_error"),f.msg),c=c||".js_title_error",
d=null,2==f.type&&((new Image).src="https://mp.weixin.qq.com/misc/jslog?id=115&content=badjs&level=error")),
1*e.is_share_copyright==1)o.rangelength(e.guide_words,[0,140])||(this.showErrMsg(a.find(".js_content_error"),"推荐语长度不能超过140字"),
c=c||".js_content_error",d=null);else{
0==e.copyright_type&&e.author.len()>16&&(this.showErrMsg(a.find(".js_author_error"),"作者不能超过8个字"),
c=c||".js_author_error",d=null);
var m=t.validate({
key:"content",
content:e.content,
editor:r.ueditor
});
m&&m.msg&&(4==m.errType?d=null:(this.showErrMsg(a.find(".js_content_error"),m.msg),
c=c||".js_content_error",d=null));
}
if(n.source_url_checked&&""==e.sourceurl&&(a.find(".js_url_error").text("请输入原文链接").show(),
c=c||".js_url",l=l||"请输入原文链接",d=null),e.sourceurl&&!o.url(e.sourceurl)&&(a.find(".js_url_error").text("链接不合法").show(),
c=c||".js_url",l=l||"链接不合法",d=null),o.rangelength(e.digest,[0,120])||(a.find(".js_desc_error").text("摘要长度不能超过120字").show(),
c=c||".js_desc",d=null),1==e.can_reward&&e.reward_wording.len()>30&&(l=l||"赞赏引导语不能超过15个字",
c=c||".js_reward_div",d=null),1==e.can_reward&&e.reward_money>0&&(e.reward_money<1||e.reward_money>256||e.reward_money.toString().indexOf(".")>-1)&&(a.find(".js_reward_money_error").text("赞赏金额范围为1-256，只能是整数").show(),
l=l||"赞赏金额范围为1-256",c=c||".js_reward_ios_money",d=null),!d)return c&&this.scrollIntoView(a.find(c),150),
null;
if(e.payforread_enabled){
if(!/\d+(\.\d+)?/.test(e.fee))return s.err("请输入正确的付费金额"),null;
if(""==e.free_content)return s.err("请输入免费区域内容"),null;
}
return this.hideAllErrMsg(),e;
},
validateStrictly:function(e){
var i,r=this,n=r.data.getData(),a=r.$dom,_=$("<div>").html(e.content),d=!0,c=null,l="",u=$(_).find(".js_catchremoteimageerror").length;
if(u)return i=a.find(".js_content_error"),this.showErrMsg(i,"正文有%s张图片粘贴失败".sprintf(u)),
this.scrollIntoView(i,200),null;
var f=t.validate({
key:"title",
content:e.title,
strict:!0
});
if(f&&f.msg&&(this.showErrMsg(a.find(".js_title_error"),f.msg),c=c||".js_title_error",
d=null,2==f.type&&((new Image).src="https://mp.weixin.qq.com/misc/jslog?id=115&content=badjs&level=error")),
1*e.is_share_copyright==1)o.rangelength(e.guide_words,[0,140])||(this.showErrMsg(a.find(".js_content_error"),"推荐语长度不能超过140字"),
c=c||".js_content_error",d=null);else{
0==e.copyright_type&&e.author.len()>16&&(this.showErrMsg(a.find(".js_author_error"),"作者不能超过8个字"),
c=c||".js_author_error",d=null);
var m=t.validate({
key:"content",
content:e.content,
strict:!0,
editor:r.ueditor
});
m&&m.msg&&(4==m.errType?d=null:(this.showErrMsg(a.find(".js_content_error"),m.msg),
c=c||".js_content_error",d=null));
}
if(e.fileid||e.cdn_url||(this.showErrMsg(a.find(".js_cover_error"),"必须插入一张图片"),c=c||".js_cover_error",
d=null),n.source_url_checked&&""==e.sourceurl&&(a.find(".js_url_error").text("请输入原文链接").show(),
c=c||".js_url",l=l||"请输入原文链接",d=null),0==e.copyright_type&&e.sourceurl&&!o.url(e.sourceurl)&&(a.find(".js_url_error").text("链接不合法").show(),
c=c||".js_url",l=l||"链接不合法",d=null),o.rangelength(e.digest,[0,120])||(a.find(".js_desc_error").text("摘要长度不能超过120字").show(),
c=c||".js_desc",d=null),1==e.can_reward&&e.reward_wording.len()>30&&(l=l||"赞赏引导语不能超过15个字",
d=null),1==e.can_reward&&e.reward_money>0&&(e.reward_money<1||e.reward_money>256||e.reward_money.toString().indexOf(".")>-1)&&(a.find(".js_reward_money_error").text("赞赏金额范围为1-256，只能是整数").show(),
l=l||"赞赏金额范围为1-256",c=c||".js_reward_ios_money",d=null),!d)return c&&this.scrollIntoView(a.find(c),150),
null;
if(e.payforread_enabled){
if(!/\d+(\.\d+)?/.test(e.fee))return s.err("请输入正确的付费金额"),null;
if(""==e.free_content)return s.err("请输入免费区域内容"),null;
}
return e;
},
modifyEditingData:function(e){
this.setEditingData(e),"undefined"!=typeof e.content&&this.ueditor.setContent(e.content);
},
setEditingData:function(e){
this.$dom.find(".js_field").each(function(){
var t=$(this),i=t.attr("name"),r=t.attr("type");
"undefined"!=typeof e[i]&&("checkbox"==r?t.checkbox("checked",!!e[i]):t.val(e[i]||"").trigger("blur keydown "));
});
},
render:function(){
{
var e=this,t=e.$dom,i=e.data.getData();
0==e.$item.index();
}
if(e.setEditingData(i),i.reward_money?(t.find(".js_reward_ios_money").show().find("input").val(i.reward_money),
t.find(".js_reward_ios").eq(1).checkbox("checked",!0)):(t.find(".js_reward_ios_money").hide(),
t.find(".js_reward_ios").eq(0).checkbox("checked",!0)),1*t.find(".js_show_cover_pic").val()===1,
t.find("textarea.js_guide_words,input.js_title,input.js_author,input.js_reward_wording,input.js_reward_ios_money.js_desc,textarea.js_desc").trigger("keydown"),
t.find("textarea.js_guide_words,input.js_title,input.js_author,textarea.js_desc").trigger("blur"),
t.find(".js_comment").checkbox("checked",0==i.need_open_comment?!1:!0),t.find(".js_comment_setting").each(function(e){
e==Number(i.only_fans_can_comment||0)?$(this).checkbox("checked",!0):$(this).checkbox("checked",!1);
}),i.cdn_url){
var r=i.cdn_url.http2https().nogif();
if(t.find(".js_cover").find("img").remove(),n.isLocalDomain(r)){
var s=t.find(".js_cover").show().find(".js_cover_preview").css("backgroundImage",'url("'+r+'")');
s.find(".js_tip_mask_msg").hide(),s.find(".js_tip_mask").removeClass("error_mask").addClass("hover_mask");
}else $(".js_appmsg_item.current").removeClass("has_thumb").find(".js_appmsg_thumb").css("backgroundImage",'url("")'),
t.find(".js_cover").hide(),t.find(".js_cdn_url").val("");
}else if(i.file_id){
var r=i.cover||wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s>".sprintf(i.file_id));
t.find(".js_cover").find("img").remove(),n.isLocalDomain(r)?t.find(".js_cover").prepend('<img src="%s">'.sprintf(r)).show():(t.find(".js_cover").hide(),
$(".js_appmsg_item.current").removeClass("has_thumb").find(".js_appmsg_thumb").css("backgroundImage",'url("")'),
t.find(".js_file_id").val(""));
}else t.find(".js_cover").hide().find("img").remove();
i.source_url_checked?t.find(".js_url_area .frm_input_box").show():t.find(".js_url_area .frm_input_box").hide(),
1==i.can_reward?(t.find(".js_reward").checkbox("checked",!0),t.find(".js_reward_div,.js_reward_ios_wrap").show()):(t.find(".js_reward").checkbox("checked",!1),
t.find(".js_reward_div,.js_reward_ios_wrap").hide()),0==i.need_open_comment?$("#js_comment_setting_wrp").hide():$("#js_comment_setting_wrp").show(),
i.ad_info&&i.ad_info.ad_id?($("#js_editor_insertad").addClass("disabled"),t.find(".js_ad_preview").empty(),
t.find(".js_ad_preview").parent().show()):($("#js_editor_insertad").removeClass("disabled"),
t.find(".js_ad_preview").empty(),t.find(".js_ad_preview").parent().hide()),e._setOriginal(),
e._setPay(),e._setAd(),1*i.is_share_copyright==1?(t.find(".js_cover_tip").html("分享图文不可设置封面"),
e.ueditor.fireEvent("renderEditorByType",2),$("#guide_words_main").show(),e._setReprintArticle()):(e.ueditor.fireEvent("renderEditorByType",1),
$("#guide_words_main").hide(),$("#reprint_article_main").hide(),e._setEditorContent()),
e.ueditor.getUeditor().focus();
}
});
return d;
});