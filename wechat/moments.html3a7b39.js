define("tpl/richEditor/emotion.html.js", [], function () {
    return '<span class="hook">\n	<span class="hook_dec hook_top"></span>\n	<span class="hook_dec hook_btm"></span>\n</span>\n<ul class="emotions" onselectstart="return false;">\n    {each edata as e index}\n        <li class="emotions_item">\n            <span class="icon_emotion_sprite js_emotion_i" data-name=\'{e.name}\'\n                data-title=\'{e.title}\' style=\'{e.bp}\'></span>\n        </li>\n    {/each}\n</ul>\n<span class="emotions_preview js_emotionPreviewArea"></span>\n';
});
define("biz_common/utils/emoji_panel_data.js", [], function () {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39, 40, 41, 42, 44, 45, 46, 47, 48, 49, 50, 51, 52, 54, 55, 56, 57, 60, 62, 63, 64, 65, 66, 67, 68, 70, 74, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 89, 92, 93, 94, 95, 300, 301, 302, 303, 304, 305, 306, 307, 204, 205, 202, 206, 212, 211, 308, 309, 310, 311, 312, 209, 214];
});
define("biz_common/utils/emoji_data.js", [], function () {
    return [{
        id: 0,
        cn: "[微笑]",
        hk: "[微笑]",
        us: "[Smile]",
        code: "/::)",
        web_code: "/微笑",
        style: "icon_smiley_0"
    }, {
        id: 1,
        cn: "[撇嘴]",
        hk: "[撇嘴]",
        us: "[Grimace]",
        code: "/::~",
        web_code: "/撇嘴",
        style: "icon_smiley_1"
    }, {
        id: 2,
        cn: "[色]",
        hk: "[色]",
        us: "[Drool]",
        code: "/::B",
        web_code: "/色",
        style: "icon_smiley_2"
    }, {
        id: 3,
        cn: "[发呆]",
        hk: "[發呆]",
        us: "[Scowl]",
        code: "/::|",
        web_code: "/发呆",
        style: "icon_smiley_3"
    }, {
        id: 4,
        cn: "[得意]",
        hk: "[得意]",
        us: "[CoolGuy]",
        code: "/:8-)",
        web_code: "/得意",
        style: "icon_smiley_4"
    }, {
        id: 5,
        cn: "[流泪]",
        hk: "[流淚]",
        us: "[Sob]",
        code: "/::<",
        web_code: "/流泪",
        style: "icon_smiley_5"
    }, {
        id: 6,
        cn: "[害羞]",
        hk: "[害羞]",
        us: "[Shy]",
        code: "/::$",
        web_code: "/害羞",
        style: "icon_smiley_6"
    }, {
        id: 7,
        cn: "[闭嘴]",
        hk: "[閉嘴]",
        us: "[Silent]",
        code: "/::X",
        web_code: "/闭嘴",
        style: "icon_smiley_7"
    }, {
        id: 8,
        cn: "[睡]",
        hk: "[睡]",
        us: "[Sleep]",
        code: "/::Z",
        web_code: "/睡",
        style: "icon_smiley_8"
    }, {
        id: 9,
        cn: "[大哭]",
        hk: "[大哭]",
        us: "[Cry]",
        code: "/::'(",
        web_code: "/大哭",
        style: "icon_smiley_9"
    }, {
        id: 10,
        cn: "[尴尬]",
        hk: "[尷尬]",
        us: "[Awkward]",
        code: "/::-|",
        web_code: "/尴尬",
        style: "icon_smiley_10"
    }, {
        id: 11,
        cn: "[发怒]",
        hk: "[發怒]",
        us: "[Angry]",
        code: "/::@",
        web_code: "/发怒",
        style: "icon_smiley_11"
    }, {
        id: 12,
        cn: "[调皮]",
        hk: "[調皮]",
        us: "[Tongue]",
        code: "/::P",
        web_code: "/调皮",
        style: "icon_smiley_12"
    }, {
        id: 13,
        cn: "[呲牙]",
        hk: "[呲牙]",
        us: "[Grin]",
        code: "/::D",
        web_code: "/呲牙",
        style: "icon_smiley_13"
    }, {
        id: 14,
        cn: "[惊讶]",
        hk: "[驚訝]",
        us: "[Surprise]",
        code: "/::O",
        web_code: "/惊讶",
        style: "icon_smiley_14"
    }, {
        id: 15,
        cn: "[难过]",
        hk: "[難過]",
        us: "[Frown]",
        code: "/::(",
        web_code: "/难过",
        style: "icon_smiley_15"
    }, {
        id: 16,
        cn: "[酷]",
        hk: "[酷]",
        us: "[Ruthless]",
        code: "/::+",
        web_code: "/酷",
        style: "icon_smiley_16"
    }, {
        id: 17,
        cn: "[冷汗]",
        hk: "[冷汗]",
        us: "[Blush]",
        code: "/:--b",
        web_code: "/冷汗",
        style: "icon_smiley_17"
    }, {
        id: 18,
        cn: "[抓狂]",
        hk: "[抓狂]",
        us: "[Scream]",
        code: "/::Q",
        web_code: "/抓狂",
        style: "icon_smiley_18"
    }, {
        id: 19,
        cn: "[吐]",
        hk: "[吐]",
        us: "[Puke]",
        code: "/::T",
        web_code: "/吐",
        style: "icon_smiley_19"
    }, {
        id: 20,
        cn: "[偷笑]",
        hk: "[偷笑]",
        us: "[Chuckle]",
        code: "/:,@P",
        web_code: "/偷笑",
        style: "icon_smiley_20"
    }, {
        id: 21,
        cn: "[愉快]",
        hk: "[愉快]",
        us: "[Joyful]",
        code: "/:,@-D",
        web_code: "/可爱",
        style: "icon_smiley_21"
    }, {
        id: 22,
        cn: "[白眼]",
        hk: "[白眼]",
        us: "[Slight]",
        code: "/::d",
        web_code: "/白眼",
        style: "icon_smiley_22"
    }, {
        id: 23,
        cn: "[傲慢]",
        hk: "[傲慢]",
        us: "[Smug]",
        code: "/:,@o",
        web_code: "/傲慢",
        style: "icon_smiley_23"
    }, {
        id: 24,
        cn: "[饥饿]",
        hk: "[饑餓]",
        us: "[Hungry]",
        code: "/::g",
        web_code: "/饥饿",
        style: "icon_smiley_24"
    }, {
        id: 25,
        cn: "[困]",
        hk: "[累]",
        us: "[Drowsy]",
        code: "/:|-)",
        web_code: "/困",
        style: "icon_smiley_25"
    }, {
        id: 26,
        cn: "[惊恐]",
        hk: "[驚恐]",
        us: "[Panic]",
        code: "/::!",
        web_code: "/惊恐",
        style: "icon_smiley_26"
    }, {
        id: 27,
        cn: "[流汗]",
        hk: "[流汗]",
        us: "[Sweat]",
        code: "/::L",
        web_code: "/流汗",
        style: "icon_smiley_27"
    }, {
        id: 28,
        cn: "[憨笑]",
        hk: "[大笑]",
        us: "[Laugh]",
        code: "/::>",
        web_code: "/憨笑",
        style: "icon_smiley_28"
    }, {
        id: 29,
        cn: "[悠闲]",
        hk: "[悠閑]",
        us: "[Commando]",
        code: "/::,@",
        web_code: "/大兵",
        style: "icon_smiley_29"
    }, {
        id: 30,
        cn: "[奋斗]",
        hk: "[奮鬥]",
        us: "[Determined]",
        code: "/:,@f",
        web_code: "/奋斗",
        style: "icon_smiley_30"
    }, {
        id: 31,
        cn: "[咒骂]",
        hk: "[咒罵]",
        us: "[Scold]",
        code: "/::-S",
        web_code: "/咒骂",
        style: "icon_smiley_31"
    }, {
        id: 32,
        cn: "[疑问]",
        hk: "[疑問]",
        us: "[Shocked]",
        code: "/:?",
        web_code: "/疑问",
        style: "icon_smiley_32"
    }, {
        id: 33,
        cn: "[嘘]",
        hk: "[噓]",
        us: "[Shhh]",
        code: "/:,@x",
        web_code: "/嘘",
        style: "icon_smiley_33"
    }, {
        id: 34,
        cn: "[晕]",
        hk: "[暈]",
        us: "[Dizzy]",
        code: "/:,@@",
        web_code: "/晕",
        style: "icon_smiley_34"
    }, {
        id: 35,
        cn: "[疯了]",
        hk: "[瘋了]",
        us: "[Tormented]",
        code: "/::8",
        web_code: "/折磨",
        style: "icon_smiley_35"
    }, {
        id: 36,
        cn: "[衰]",
        hk: "[衰]",
        us: "[Toasted]",
        code: "/:,@!",
        web_code: "/衰",
        style: "icon_smiley_36"
    }, {
        id: 37,
        cn: "[骷髅]",
        hk: "[骷髏頭]",
        us: "[Skull]",
        code: "/:!!!",
        web_code: "/骷髅",
        style: "icon_smiley_37"
    }, {
        id: 38,
        cn: "[敲打]",
        hk: "[敲打]",
        us: "[Hammer]",
        code: "/:xx",
        web_code: "/敲打",
        style: "icon_smiley_38"
    }, {
        id: 39,
        cn: "[再见]",
        hk: "[再見]",
        us: "[Wave]",
        code: "/:bye",
        web_code: "/再见",
        style: "icon_smiley_39"
    }, {
        id: 40,
        cn: "[擦汗]",
        hk: "[擦汗]",
        us: "[Speechless]",
        code: "/:wipe",
        web_code: "/擦汗",
        style: "icon_smiley_40"
    }, {
        id: 41,
        cn: "[抠鼻]",
        hk: "[摳鼻]",
        us: "[NosePick]",
        code: "/:dig",
        web_code: "/抠鼻",
        style: "icon_smiley_41"
    }, {
        id: 42,
        cn: "[鼓掌]",
        hk: "[鼓掌]",
        us: "[Clap]",
        code: "/:handclap",
        web_code: "/鼓掌",
        style: "icon_smiley_42"
    }, {
        id: 43,
        cn: "[糗大了]",
        hk: "[羞辱]",
        us: "[Shame]",
        code: "/:&-(",
        web_code: "/糗大了",
        style: "icon_smiley_43"
    }, {
        id: 44,
        cn: "[坏笑]",
        hk: "[壞笑]",
        us: "[Trick]",
        code: "/:B-)",
        web_code: "/坏笑",
        style: "icon_smiley_44"
    }, {
        id: 45,
        cn: "[左哼哼]",
        hk: "[左哼哼]",
        us: "[Bah！L]",
        code: "/:<@",
        web_code: "/左哼哼",
        style: "icon_smiley_45"
    }, {
        id: 46,
        cn: "[右哼哼]",
        hk: "[右哼哼]",
        us: "[Bah！R]",
        code: "/:@>",
        web_code: "/右哼哼",
        style: "icon_smiley_46"
    }, {
        id: 47,
        cn: "[哈欠]",
        hk: "[哈欠]",
        us: "[Yawn]",
        code: "/::-O",
        web_code: "/哈欠",
        style: "icon_smiley_47"
    }, {
        id: 48,
        cn: "[鄙视]",
        hk: "[鄙視]",
        us: "[Pooh-pooh]",
        code: "/:>-|",
        web_code: "/鄙视",
        style: "icon_smiley_48"
    }, {
        id: 49,
        cn: "[委屈]",
        hk: "[委屈]",
        us: "[Shrunken]",
        code: "/:P-(",
        web_code: "/委屈",
        style: "icon_smiley_49"
    }, {
        id: 50,
        cn: "[快哭了]",
        hk: "[快哭了]",
        us: "[TearingUp]",
        code: "/::'|",
        web_code: "/快哭了",
        style: "icon_smiley_50"
    }, {
        id: 51,
        cn: "[阴险]",
        hk: "[陰險]",
        us: "[Sly]",
        code: "/:X-)",
        web_code: "/阴险",
        style: "icon_smiley_51"
    }, {
        id: 52,
        cn: "[亲亲]",
        hk: "[親親]",
        us: "[Kiss]",
        code: "/::*",
        web_code: "/亲亲",
        style: "icon_smiley_52"
    }, {
        id: 53,
        cn: "[吓]",
        hk: "[嚇]",
        us: "[Wrath]",
        code: "/:@x",
        web_code: "/吓",
        style: "icon_smiley_53"
    }, {
        id: 54,
        cn: "[可怜]",
        hk: "[可憐]",
        us: "[Whimper]",
        code: "/:8*",
        web_code: "/可怜",
        style: "icon_smiley_54"
    }, {
        id: 55,
        cn: "[菜刀]",
        hk: "[菜刀]",
        us: "[Cleaver]",
        code: "/:pd",
        web_code: "/菜刀",
        style: "icon_smiley_55"
    }, {
        id: 56,
        cn: "[西瓜]",
        hk: "[西瓜]",
        us: "[Watermelon]",
        code: "/:<W>",
        web_code: "/西瓜",
        style: "icon_smiley_56"
    }, {
        id: 57,
        cn: "[啤酒]",
        hk: "[啤酒]",
        us: "[Beer]",
        code: "/:beer",
        web_code: "/啤酒",
        style: "icon_smiley_57"
    }, {
        id: 58,
        cn: "[篮球]",
        hk: "[籃球]",
        us: "[Basketball]",
        code: "/:basketb",
        web_code: "/篮球",
        style: "icon_smiley_58"
    }, {
        id: 59,
        cn: "[乒乓]",
        hk: "[乒乓]",
        us: "[PingPong]",
        code: "/:oo",
        web_code: "/乒乓",
        style: "icon_smiley_59"
    }, {
        id: 60,
        cn: "[咖啡]",
        hk: "[咖啡]",
        us: "[Coffee]",
        code: "/:coffee",
        web_code: "/咖啡",
        style: "icon_smiley_60"
    }, {
        id: 61,
        cn: "[饭]",
        hk: "[飯]",
        us: "[Rice]",
        code: "/:eat",
        web_code: "/饭",
        style: "icon_smiley_61"
    }, {
        id: 62,
        cn: "[猪头]",
        hk: "[豬頭]",
        us: "[Pig]",
        code: "/:pig",
        web_code: "/猪头",
        style: "icon_smiley_62"
    }, {
        id: 63,
        cn: "[玫瑰]",
        hk: "[玫瑰]",
        us: "[Rose]",
        code: "/:rose",
        web_code: "/玫瑰",
        style: "icon_smiley_63"
    }, {
        id: 64,
        cn: "[凋谢]",
        hk: "[枯萎]",
        us: "[Wilt]",
        code: "/:fade",
        web_code: "/凋谢",
        style: "icon_smiley_64"
    }, {
        id: 65,
        cn: "[嘴唇]",
        hk: "[嘴唇]",
        us: "[Lips]",
        code: "/:showlove",
        web_code: "/示爱",
        style: "icon_smiley_65"
    }, {
        id: 66,
        cn: "[爱心]",
        hk: "[愛心]",
        us: "[Heart]",
        code: "/:heart",
        web_code: "/爱心",
        style: "icon_smiley_66"
    }, {
        id: 67,
        cn: "[心碎]",
        hk: "[心碎]",
        us: "[BrokenHeart]",
        code: "/:break",
        web_code: "/心碎",
        style: "icon_smiley_67"
    }, {
        id: 68,
        cn: "[蛋糕]",
        hk: "[蛋糕]",
        us: "[Cake]",
        code: "/:cake",
        web_code: "/蛋糕",
        style: "icon_smiley_68"
    }, {
        id: 69,
        cn: "[闪电]",
        hk: "[閃電]",
        us: "[Lightning]",
        code: "/:li",
        web_code: "/闪电",
        style: "icon_smiley_69"
    }, {
        id: 70,
        cn: "[炸弹]",
        hk: "[炸彈]",
        us: "[Bomb]",
        code: "/:bome",
        web_code: "/炸弹",
        style: "icon_smiley_70"
    }, {
        id: 71,
        cn: "[刀]",
        hk: "[刀]",
        us: "[Dagger]",
        code: "/:kn",
        web_code: "/刀",
        style: "icon_smiley_71"
    }, {
        id: 72,
        cn: "[足球]",
        hk: "[足球]",
        us: "[Soccer]",
        code: "/:footb",
        web_code: "/足球",
        style: "icon_smiley_72"
    }, {
        id: 73,
        cn: "[瓢虫]",
        hk: "[甲蟲]",
        us: "[Ladybug]",
        code: "/:ladybug",
        web_code: "/瓢虫",
        style: "icon_smiley_73"
    }, {
        id: 74,
        cn: "[便便]",
        hk: "[便便]",
        us: "[Poop]",
        code: "/:shit",
        web_code: "/便便",
        style: "icon_smiley_74"
    }, {
        id: 75,
        cn: "[月亮]",
        hk: "[月亮]",
        us: "[Moon]",
        code: "/:moon",
        web_code: "/月亮",
        style: "icon_smiley_75"
    }, {
        id: 76,
        cn: "[太阳]",
        hk: "[太陽]",
        us: "[Sun]",
        code: "/:sun",
        web_code: "/太阳",
        style: "icon_smiley_76"
    }, {
        id: 77,
        cn: "[礼物]",
        hk: "[禮物]",
        us: "[Gift]",
        code: "/:gift",
        web_code: "/礼物",
        style: "icon_smiley_77"
    }, {
        id: 78,
        cn: "[拥抱]",
        hk: "[擁抱]",
        us: "[Hug]",
        code: "/:hug",
        web_code: "/拥抱",
        style: "icon_smiley_78"
    }, {
        id: 79,
        cn: "[强]",
        hk: "[強]",
        us: "[ThumbsUp]",
        code: "/:strong",
        web_code: "/强",
        style: "icon_smiley_79"
    }, {
        id: 80,
        cn: "[弱]",
        hk: "[弱]",
        us: "[ThumbsDown]",
        code: "/:weak",
        web_code: "/弱",
        style: "icon_smiley_80"
    }, {
        id: 81,
        cn: "[握手]",
        hk: "[握手]",
        us: "[Shake]",
        code: "/:share",
        web_code: "/握手",
        style: "icon_smiley_81"
    }, {
        id: 82,
        cn: "[胜利]",
        hk: "[勝利]",
        us: "[Peace]",
        code: "/:v",
        web_code: "/胜利",
        style: "icon_smiley_82"
    }, {
        id: 83,
        cn: "[抱拳]",
        hk: "[抱拳]",
        us: "[Fight]",
        code: "/:@)",
        web_code: "/抱拳",
        style: "icon_smiley_83"
    }, {
        id: 84,
        cn: "[勾引]",
        hk: "[勾引]",
        us: "[Beckon]",
        code: "/:jj",
        web_code: "/勾引",
        style: "icon_smiley_84"
    }, {
        id: 85,
        cn: "[拳头]",
        hk: "[拳頭]",
        us: "[Fist]",
        code: "/:@@",
        web_code: "/拳头",
        style: "icon_smiley_85"
    }, {
        id: 86,
        cn: "[差劲]",
        hk: "[差勁]",
        us: "[Pinky]",
        code: "/:bad",
        web_code: "/差劲",
        style: "icon_smiley_86"
    }, {
        id: 87,
        cn: "[爱你]",
        hk: "[愛你]",
        us: "[RockOn]",
        code: "/:lvu",
        web_code: "/爱你",
        style: "icon_smiley_87"
    }, {
        id: 88,
        cn: "[NO]",
        hk: "[NO]",
        us: "[Nuh-uh]",
        code: "/:no",
        web_code: "/NO",
        style: "icon_smiley_88"
    }, {
        id: 89,
        cn: "[OK]",
        hk: "[OK]",
        us: "[OK]",
        code: "/:ok",
        web_code: "/OK",
        style: "icon_smiley_89"
    }, {
        id: 90,
        cn: "[爱情]",
        hk: "[愛情]",
        us: "[InLove]",
        code: "/:love",
        web_code: "/爱情",
        style: "icon_smiley_90"
    }, {
        id: 91,
        cn: "[飞吻]",
        hk: "[飛吻]",
        us: "[Blowkiss]",
        code: "/:<L>",
        web_code: "/飞吻",
        style: "icon_smiley_91"
    }, {
        id: 92,
        cn: "[跳跳]",
        hk: "[跳跳]",
        us: "[Waddle]",
        code: "/:jump",
        web_code: "/跳跳",
        style: "icon_smiley_92"
    }, {
        id: 93,
        cn: "[发抖]",
        hk: "[發抖]",
        us: "[Tremble]",
        code: "/:shake",
        web_code: "/发抖",
        style: "icon_smiley_93"
    }, {
        id: 94,
        cn: "[怄火]",
        hk: "[噴火]",
        us: "[Aaagh!]",
        code: "/:<O>",
        web_code: "/怄火",
        style: "icon_smiley_94"
    }, {
        id: 95,
        cn: "[转圈]",
        hk: "[轉圈]",
        us: "[Twirl]",
        code: "/:circle",
        web_code: "/转圈",
        style: "icon_smiley_95"
    }, {
        id: 96,
        cn: "[磕头]",
        hk: "[磕頭]",
        us: "[Kotow]",
        code: "/:kotow",
        web_code: "/磕头",
        style: "icon_smiley_96"
    }, {
        id: 97,
        cn: "[回头]",
        hk: "[回頭]",
        us: "[Dramatic]",
        code: "/:turn",
        web_code: "/回头",
        style: "icon_smiley_97"
    }, {
        id: 98,
        cn: "[跳绳]",
        hk: "[跳繩]",
        us: "[JumpRope]",
        code: "/:skip",
        web_code: "/跳绳",
        style: "icon_smiley_98"
    }, {
        id: 99,
        cn: "[投降]",
        hk: "[投降]",
        us: "[Surrender]",
        code: "/:oY",
        web_code: "/挥手",
        style: "icon_smiley_99"
    }, {
        id: 100,
        cn: "[激动]",
        hk: "[激動]",
        us: "[Hooray]",
        code: "/:#-0",
        web_code: "/激动",
        style: "icon_smiley_100"
    }, {
        id: 101,
        cn: "[乱舞]",
        hk: "[亂舞]",
        us: "[Meditate]",
        code: "/:hiphot",
        web_code: "/街舞",
        style: "icon_smiley_101"
    }, {
        id: 102,
        cn: "[献吻]",
        hk: "[獻吻]",
        us: "[Smooch]",
        code: "/:kiss",
        web_code: "/献吻",
        style: "icon_smiley_102"
    }, {
        id: 103,
        cn: "[左太极]",
        hk: "[左太極]",
        us: "[TaiChi L]",
        code: "/:<&",
        web_code: "/左太极",
        style: "icon_smiley_103"
    }, {
        id: 104,
        cn: "[右太极]",
        hk: "[右太極]",
        us: "[TaiChi R]",
        code: "/:&>",
        web_code: "/右太极",
        style: "icon_smiley_104"
    }, {
        id: 204,
        cn: "[嘿哈]",
        hk: "[吼嘿]",
        us: "[Hey]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_4"
    }, {
        id: 205,
        cn: "[捂脸]",
        hk: "[掩面]",
        us: "[Facepalm]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_5"
    }, {
        id: 202,
        cn: "[奸笑]",
        hk: "[奸笑]",
        us: "[Smirk]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_2"
    }, {
        id: 206,
        cn: "[机智]",
        hk: "[機智]",
        us: "[Smart]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_6"
    }, {
        id: 212,
        cn: "[皱眉]",
        hk: "[皺眉]",
        us: "[Moue]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_12"
    }, {
        id: 211,
        cn: "[耶]",
        hk: "[歐耶]",
        us: "[Yeah!]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_11"
    }, {
        id: 207,
        cn: "[茶]",
        hk: "[茶]",
        us: "[Tea]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_7"
    }, {
        id: 209,
        cn: "[红包]",
        hk: "[Packet]",
        us: "[Packet]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_9"
    }, {
        id: 210,
        cn: "[蜡烛]",
        hk: "[蠟燭]",
        us: "[Candle]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_10"
    }, {
        id: 215,
        cn: "[福]",
        hk: "[福]",
        us: "[Blessing]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_15"
    }, {
        id: 214,
        cn: "[鸡]",
        hk: "[小雞]",
        us: "[Chick]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_14"
    }, {
        id: 300,
        cn: "[笑脸]",
        emoji: "😄",
        hk: "",
        us: "",
        code: "\\ue415",
        web_code: "",
        style: "icon_emoji_ios_0"
    }, {
        id: 301,
        cn: "[生病]",
        emoji: "😷",
        hk: "",
        us: "",
        code: "\\ue40c",
        web_code: "",
        style: "icon_emoji_ios_1"
    }, {
        id: 302,
        cn: "[破涕为笑]",
        emoji: "😂",
        hk: "",
        us: "",
        code: "\\ue412",
        web_code: "",
        style: "icon_emoji_ios_2"
    }, {
        id: 303,
        cn: "[吐舌]",
        emoji: "😝",
        hk: "",
        us: "",
        code: "\\ue409",
        web_code: "",
        style: "icon_emoji_ios_3"
    }, {
        id: 304,
        cn: "[脸红]",
        emoji: "😳",
        hk: "",
        us: "",
        code: "\\ue40d",
        web_code: "",
        style: "icon_emoji_ios_4"
    }, {
        id: 305,
        cn: "[恐惧]",
        emoji: "😱",
        hk: "",
        us: "",
        code: "\\ue107",
        web_code: "",
        style: "icon_emoji_ios_5"
    }, {
        id: 306,
        cn: "[失望]",
        emoji: "😔",
        hk: "",
        us: "",
        code: "\\ue403",
        web_code: "",
        style: "icon_emoji_ios_6"
    }, {
        id: 307,
        cn: "[无语]",
        emoji: "😒",
        hk: "",
        us: "",
        code: "\\ue40e",
        web_code: "",
        style: "icon_emoji_ios_7"
    }, {
        id: 308,
        cn: "[鬼魂]",
        emoji: "👻",
        hk: "",
        us: "",
        code: "\\ue11b",
        web_code: "",
        style: "icon_emoji_ios_8"
    }, {
        id: 309,
        cn: "[合十]",
        emoji: "🙏",
        hk: "",
        us: "",
        code: "\\ue41d",
        web_code: "",
        style: "icon_emoji_ios_9"
    }, {
        id: 310,
        cn: "[强壮]",
        emoji: "💪",
        hk: "",
        us: "",
        code: "\\ue14c",
        web_code: "",
        style: "icon_emoji_ios_10"
    }, {
        id: 311,
        cn: "[庆祝]",
        emoji: "🎉",
        hk: "",
        us: "",
        code: "\\ue312",
        web_code: "",
        style: "icon_emoji_ios_11"
    }, {
        id: 312,
        cn: "[礼物]",
        hk: "",
        us: "",
        code: "\\ue112",
        web_code: "",
        style: "icon_emoji_ios_12"
    }, {
        id: "17_1",
        cn: "[囧]",
        hk: "[囧]",
        us: "[Blush]",
        code: "",
        web_code: "",
        style: "icon_smiley_17"
    }, {
        id: "39_1",
        cn: "[再见]",
        hk: "[再見]",
        us: "[Bye]",
        code: "",
        web_code: "",
        style: "icon_smiley_39"
    }, {
        id: "83_1",
        cn: "[抱拳]",
        hk: "[抱拳]",
        us: "[Salute]",
        code: "",
        web_code: "",
        style: "icon_smiley_83"
    }, {
        id: "212_1",
        cn: "[皱眉]",
        hk: "[皺眉]",
        us: "[Concerned]",
        code: "",
        web_code: "",
        style: "icon_emoji_wx_12"
    }];
});
define("common/qq/emoji.js", ["widget/emoji.css", "biz_common/utils/emoji_data.js"], function (f) {
    f("widget/emoji.css");
    var e = '<span class="emoji emoji%s"></span>', a = f("biz_common/utils/emoji_data.js"), b = '<img class="icon_emotion_single %s" src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif"></img>', c = {
        "☀": "2600",
        "☁": "2601",
        "☔": "2614",
        "⛄": "26c4",
        "⚡": "26a1",
        "🌀": "1f300",
        "🌁": "1f301",
        "🌂": "1f302",
        "🌃": "1f303",
        "🌄": "1f304",
        "🌅": "1f305",
        "🌆": "1f306",
        "🌇": "1f307",
        "🌈": "1f308",
        "❄": "2744",
        "⛅": "26c5",
        "🌉": "1f309",
        "🌊": "1f30a",
        "🌋": "1f30b",
        "🌌": "1f30c",
        "🌏": "1f30f",
        "🌑": "1f311",
        "🌔": "1f314",
        "🌓": "1f313",
        "🌙": "1f319",
        "🌕": "1f315",
        "🌛": "1f31b",
        "🌟": "1f31f",
        "🌠": "1f320",
        "🕐": "1f550",
        "🕑": "1f551",
        "🕒": "1f552",
        "🕓": "1f553",
        "🕔": "1f554",
        "🕕": "1f555",
        "🕖": "1f556",
        "🕗": "1f557",
        "🕘": "1f558",
        "🕙": "1f559",
        "🕚": "1f55a",
        "🕛": "1f55b",
        "⌚": "231a",
        "⌛": "231b",
        "⏰": "23f0",
        "⏳": "23f3",
        "♈": "2648",
        "♉": "2649",
        "♊": "264a",
        "♋": "264b",
        "♌": "264c",
        "♍": "264d",
        "♎": "264e",
        "♏": "264f",
        "♐": "2650",
        "♑": "2651",
        "♒": "2652",
        "♓": "2653",
        "⛎": "26ce",
        "🍀": "1f340",
        "🌷": "1f337",
        "🌱": "1f331",
        "🍁": "1f341",
        "🌸": "1f338",
        "🌹": "1f339",
        "🍂": "1f342",
        "🍃": "1f343",
        "🌺": "1f33a",
        "🌻": "1f33b",
        "🌴": "1f334",
        "🌵": "1f335",
        "🌾": "1f33e",
        "🌽": "1f33d",
        "🍄": "1f344",
        "🌰": "1f330",
        "🌼": "1f33c",
        "🌿": "1f33f",
        "🍒": "1f352",
        "🍌": "1f34c",
        "🍎": "1f34e",
        "🍊": "1f34a",
        "🍓": "1f353",
        "🍉": "1f349",
        "🍅": "1f345",
        "🍆": "1f346",
        "🍈": "1f348",
        "🍍": "1f34d",
        "🍇": "1f347",
        "🍑": "1f351",
        "🍏": "1f34f",
        "👀": "1f440",
        "👂": "1f442",
        "👃": "1f443",
        "👄": "1f444",
        "👅": "1f445",
        "💄": "1f484",
        "💅": "1f485",
        "💆": "1f486",
        "💇": "1f487",
        "💈": "1f488",
        "👤": "1f464",
        "👦": "1f466",
        "👧": "1f467",
        "👨": "1f468",
        "👩": "1f469",
        "👪": "1f46a",
        "👫": "1f46b",
        "👮": "1f46e",
        "👯": "1f46f",
        "👰": "1f470",
        "👱": "1f471",
        "👲": "1f472",
        "👳": "1f473",
        "👴": "1f474",
        "👵": "1f475",
        "👶": "1f476",
        "👷": "1f477",
        "👸": "1f478",
        "👹": "1f479",
        "👺": "1f47a",
        "👻": "1f47b",
        "👼": "1f47c",
        "👽": "1f47d",
        "👾": "1f47e",
        "👿": "1f47f",
        "💀": "1f480",
        "💁": "1f481",
        "💂": "1f482",
        "💃": "1f483",
        "🐌": "1f40c",
        "🐍": "1f40d",
        "🐎": "1f40e",
        "🐔": "1f414",
        "🐗": "1f417",
        "🐫": "1f42b",
        "🐘": "1f418",
        "🐨": "1f428",
        "🐒": "1f412",
        "🐑": "1f411",
        "🐙": "1f419",
        "🐚": "1f41a",
        "🐛": "1f41b",
        "🐜": "1f41c",
        "🐝": "1f41d",
        "🐞": "1f41e",
        "🐠": "1f420",
        "🐡": "1f421",
        "🐢": "1f422",
        "🐤": "1f424",
        "🐥": "1f425",
        "🐦": "1f426",
        "🐣": "1f423",
        "🐧": "1f427",
        "🐩": "1f429",
        "🐟": "1f41f",
        "🐬": "1f42c",
        "🐭": "1f42d",
        "🐯": "1f42f",
        "🐱": "1f431",
        "🐳": "1f433",
        "🐴": "1f434",
        "🐵": "1f435",
        "🐶": "1f436",
        "🐷": "1f437",
        "🐻": "1f43b",
        "🐹": "1f439",
        "🐺": "1f43a",
        "🐮": "1f42e",
        "🐰": "1f430",
        "🐸": "1f438",
        "🐾": "1f43e",
        "🐲": "1f432",
        "🐼": "1f43c",
        "🐽": "1f43d",
        "😠": "1f620",
        "😩": "1f629",
        "😲": "1f632",
        "😞": "1f61e",
        "😵": "1f635",
        "😰": "1f630",
        "😒": "1f612",
        "😍": "1f60d",
        "😤": "1f624",
        "😜": "1f61c",
        "😝": "1f61d",
        "😋": "1f60b",
        "😘": "1f618",
        "😚": "1f61a",
        "😷": "1f637",
        "😳": "1f633",
        "😃": "1f603",
        "😅": "1f605",
        "😆": "1f606",
        "😁": "1f601",
        "😂": "1f602",
        "😊": "1f60a",
        "☺": "263a",
        "😄": "1f604",
        "😢": "1f622",
        "😭": "1f62d",
        "😨": "1f628",
        "😣": "1f623",
        "😡": "1f621",
        "😌": "1f60c",
        "😖": "1f616",
        "😔": "1f614",
        "😱": "1f631",
        "😪": "1f62a",
        "😏": "1f60f",
        "😓": "1f613",
        "😥": "1f625",
        "😫": "1f62b",
        "😉": "1f609",
        "😺": "1f63a",
        "😸": "1f638",
        "😹": "1f639",
        "😽": "1f63d",
        "😻": "1f63b",
        "😿": "1f63f",
        "😾": "1f63e",
        "😼": "1f63c",
        "🙀": "1f640",
        "🙅": "1f645",
        "🙆": "1f646",
        "🙇": "1f647",
        "🙈": "1f648",
        "🙊": "1f64a",
        "🙉": "1f649",
        "🙋": "1f64b",
        "🙌": "1f64c",
        "🙍": "1f64d",
        "🙎": "1f64e",
        "🙏": "1f64f",
        "🏠": "1f3e0",
        "🏡": "1f3e1",
        "🏢": "1f3e2",
        "🏣": "1f3e3",
        "🏥": "1f3e5",
        "🏦": "1f3e6",
        "🏧": "1f3e7",
        "🏨": "1f3e8",
        "🏩": "1f3e9",
        "🏪": "1f3ea",
        "🏫": "1f3eb",
        "⛪": "26ea",
        "⛲": "26f2",
        "🏬": "1f3ec",
        "🏯": "1f3ef",
        "🏰": "1f3f0",
        "🏭": "1f3ed",
        "⚓": "2693",
        "🏮": "1f3ee",
        "🗻": "1f5fb",
        "🗼": "1f5fc",
        "🗽": "1f5fd",
        "🗾": "1f5fe",
        "🗿": "1f5ff",
        "👞": "1f45e",
        "👟": "1f45f",
        "👠": "1f460",
        "👡": "1f461",
        "👢": "1f462",
        "👣": "1f463",
        "👓": "1f453",
        "👕": "1f455",
        "👖": "1f456",
        "👑": "1f451",
        "👔": "1f454",
        "👒": "1f452",
        "👗": "1f457",
        "👘": "1f458",
        "👙": "1f459",
        "👚": "1f45a",
        "👛": "1f45b",
        "👜": "1f45c",
        "👝": "1f45d",
        "💰": "1f4b0",
        "💱": "1f4b1",
        "💹": "1f4b9",
        "💲": "1f4b2",
        "💳": "1f4b3",
        "💴": "1f4b4",
        "💵": "1f4b5",
        "💸": "1f4b8",
        "🇨🇳": "1f1e81f1f3",
        "🇩🇪": "1f1e91f1ea",
        "🇪🇸": "1f1ea1f1f8",
        "🇫🇷": "1f1eb1f1f7",
        "🇬🇧": "1f1ec1f1e7",
        "🇮🇹": "1f1ee1f1f9",
        "🇯🇵": "1f1ef1f1f5",
        "🇰🇷": "1f1f01f1f7",
        "🇷🇺": "1f1f71f1fa",
        "🇺🇸": "1f1fa1f1f8",
        "🔥": "1f525",
        "🔦": "1f526",
        "🔧": "1f527",
        "🔨": "1f528",
        "🔩": "1f529",
        "🔪": "1f52a",
        "🔫": "1f52b",
        "🔮": "1f52e",
        "🔯": "1f52f",
        "🔰": "1f530",
        "🔱": "1f531",
        "💉": "1f489",
        "💊": "1f48a",
        "🅰": "1f170",
        "🅱": "1f171",
        "🆎": "1f18e",
        "🅾": "1f17e",
        "🎀": "1f380",
        "🎁": "1f381",
        "🎂": "1f382",
        "🎄": "1f384",
        "🎅": "1f385",
        "🎌": "1f38c",
        "🎆": "1f386",
        "🎈": "1f388",
        "🎉": "1f389",
        "🎍": "1f38d",
        "🎎": "1f38e",
        "🎓": "1f393",
        "🎒": "1f392",
        "🎏": "1f38f",
        "🎇": "1f387",
        "🎐": "1f390",
        "🎃": "1f383",
        "🎊": "1f38a",
        "🎋": "1f38b",
        "🎑": "1f391",
        "📟": "1f4df",
        "☎": "260e",
        "📞": "1f4de",
        "📱": "1f4f1",
        "📲": "1f4f2",
        "📝": "1f4dd",
        "📠": "1f4e0",
        "✉": "2709",
        "📨": "1f4e8",
        "📩": "1f4e9",
        "📪": "1f4ea",
        "📫": "1f4eb",
        "📮": "1f4ee",
        "📰": "1f4f0",
        "📢": "1f4e2",
        "📣": "1f4e3",
        "📡": "1f4e1",
        "📤": "1f4e4",
        "📥": "1f4e5",
        "📦": "1f4e6",
        "📧": "1f4e7",
        "🔠": "1f520",
        "🔡": "1f521",
        "🔢": "1f522",
        "🔣": "1f523",
        "🔤": "1f524",
        "✒": "2712",
        "💺": "1f4ba",
        "💻": "1f4bb",
        "✏": "270f",
        "📎": "1f4ce",
        "💼": "1f4bc",
        "💽": "1f4bd",
        "💾": "1f4be",
        "💿": "1f4bf",
        "📀": "1f4c0",
        "✂": "2702",
        "📍": "1f4cd",
        "📃": "1f4c3",
        "📄": "1f4c4",
        "📅": "1f4c5",
        "📁": "1f4c1",
        "📂": "1f4c2",
        "📓": "1f4d3",
        "📖": "1f4d6",
        "📔": "1f4d4",
        "📕": "1f4d5",
        "📗": "1f4d7",
        "📘": "1f4d8",
        "📙": "1f4d9",
        "📚": "1f4da",
        "📛": "1f4db",
        "📜": "1f4dc",
        "📋": "1f4cb",
        "📆": "1f4c6",
        "📊": "1f4ca",
        "📈": "1f4c8",
        "📉": "1f4c9",
        "📇": "1f4c7",
        "📌": "1f4cc",
        "📒": "1f4d2",
        "📏": "1f4cf",
        "📐": "1f4d0",
        "📑": "1f4d1",
        "🎽": "1f3bd",
        "⚾": "26be",
        "⛳": "26f3",
        "🎾": "1f3be",
        "⚽": "26bd",
        "🎿": "1f3bf",
        "🏀": "1f3c0",
        "🏁": "1f3c1",
        "🏂": "1f3c2",
        "🏃": "1f3c3",
        "🏄": "1f3c4",
        "🏆": "1f3c6",
        "🏈": "1f3c8",
        "🏊": "1f3ca",
        "🚃": "1f683",
        "🚇": "1f687",
        "Ⓜ": "24c2",
        "🚄": "1f684",
        "🚅": "1f685",
        "🚗": "1f697",
        "🚙": "1f699",
        "🚌": "1f68c",
        "🚏": "1f68f",
        "🚢": "1f6a2",
        "✈": "2708",
        "⛵": "26f5",
        "🚉": "1f689",
        "🚀": "1f680",
        "🚤": "1f6a4",
        "🚕": "1f695",
        "🚚": "1f69a",
        "🚒": "1f692",
        "🚑": "1f691",
        "🚓": "1f693",
        "⛽": "26fd",
        "🅿": "1f17f",
        "🚥": "1f6a5",
        "🚧": "1f6a7",
        "🚨": "1f6a8",
        "♨": "2668",
        "⛺": "26fa",
        "🎠": "1f3a0",
        "🎡": "1f3a1",
        "🎢": "1f3a2",
        "🎣": "1f3a3",
        "🎤": "1f3a4",
        "🎥": "1f3a5",
        "🎦": "1f3a6",
        "🎧": "1f3a7",
        "🎨": "1f3a8",
        "🎩": "1f3a9",
        "🎪": "1f3aa",
        "🎫": "1f3ab",
        "🎬": "1f3ac",
        "🎭": "1f3ad",
        "🎮": "1f3ae",
        "🀄": "1f004",
        "🎯": "1f3af",
        "🎰": "1f3b0",
        "🎱": "1f3b1",
        "🎲": "1f3b2",
        "🎳": "1f3b3",
        "🎴": "1f3b4",
        "🃏": "1f0cf",
        "🎵": "1f3b5",
        "🎶": "1f3b6",
        "🎷": "1f3b7",
        "🎸": "1f3b8",
        "🎹": "1f3b9",
        "🎺": "1f3ba",
        "🎻": "1f3bb",
        "🎼": "1f3bc",
        "〽": "303d",
        "📷": "1f4f7",
        "📹": "1f4f9",
        "📺": "1f4fa",
        "📻": "1f4fb",
        "📼": "1f4fc",
        "💋": "1f48b",
        "💌": "1f48c",
        "💍": "1f48d",
        "💎": "1f48e",
        "💏": "1f48f",
        "💐": "1f490",
        "💑": "1f491",
        "💒": "1f492",
        "🔞": "1f51e",
        "©": "a9",
        "®": "ae",
        "™": "2122",
        "ℹ": "2139",
        "#⃣": "2320e3",
        "1⃣": "3120e3",
        "2⃣": "3220e3",
        "3⃣": "3320e3",
        "4⃣": "3420e3",
        "5⃣": "3520e3",
        "6⃣": "3620e3",
        "7⃣": "3720e3",
        "8⃣": "3820e3",
        "9⃣": "3920e3",
        "0⃣": "3020e3",
        "🔟": "1f51f",
        "📶": "1f4f6",
        "📳": "1f4f3",
        "📴": "1f4f4",
        "🍔": "1f354",
        "🍙": "1f359",
        "🍰": "1f370",
        "🍜": "1f35c",
        "🍞": "1f35e",
        "🍳": "1f373",
        "🍦": "1f366",
        "🍟": "1f35f",
        "🍡": "1f361",
        "🍘": "1f358",
        "🍚": "1f35a",
        "🍝": "1f35d",
        "🍛": "1f35b",
        "🍢": "1f362",
        "🍣": "1f363",
        "🍱": "1f371",
        "🍲": "1f372",
        "🍧": "1f367",
        "🍖": "1f356",
        "🍥": "1f365",
        "🍠": "1f360",
        "🍕": "1f355",
        "🍗": "1f357",
        "🍨": "1f368",
        "🍩": "1f369",
        "🍪": "1f36a",
        "🍫": "1f36b",
        "🍬": "1f36c",
        "🍭": "1f36d",
        "🍮": "1f36e",
        "🍯": "1f36f",
        "🍤": "1f364",
        "🍴": "1f374",
        "☕": "2615",
        "🍸": "1f378",
        "🍺": "1f37a",
        "🍵": "1f375",
        "🍶": "1f376",
        "🍷": "1f377",
        "🍻": "1f37b",
        "🍹": "1f379",
        "↗": "2197",
        "↘": "2198",
        "↖": "2196",
        "↙": "2199",
        "⤴": "2934",
        "⤵": "2935",
        "↔": "2194",
        "↕": "2195",
        "⬆": "2b06",
        "⬇": "2b07",
        "➡": "27a1",
        "⬅": "2b05",
        "▶": "25b6",
        "◀": "25c0",
        "⏩": "23e9",
        "⏪": "23ea",
        "⏫": "23eb",
        "⏬": "23ec",
        "🔺": "1f53a",
        "🔻": "1f53b",
        "🔼": "1f53c",
        "🔽": "1f53d",
        "⭕": "2b55",
        "❌": "274c",
        "❎": "274e",
        "❗": "2757",
        "⁉": "2049",
        "‼": "203c",
        "❓": "2753",
        "❔": "2754",
        "❕": "2755",
        "〰": "3030",
        "➰": "27b0",
        "➿": "27bf",
        "❤": "2764",
        "💓": "1f493",
        "💔": "1f494",
        "💕": "1f495",
        "💖": "1f496",
        "💗": "1f497",
        "💘": "1f498",
        "💙": "1f499",
        "💚": "1f49a",
        "💛": "1f49b",
        "💜": "1f49c",
        "💝": "1f49d",
        "💞": "1f49e",
        "💟": "1f49f",
        "♥": "2665",
        "♠": "2660",
        "♦": "2666",
        "♣": "2663",
        "🚬": "1f6ac",
        "🚭": "1f6ad",
        "♿": "267f",
        "🚩": "1f6a9",
        "⚠": "26a0",
        "⛔": "26d4",
        "♻": "267b",
        "🚲": "1f6b2",
        "🚶": "1f6b6",
        "🚹": "1f6b9",
        "🚺": "1f6ba",
        "🛀": "1f6c0",
        "🚻": "1f6bb",
        "🚽": "1f6bd",
        "🚾": "1f6be",
        "🚼": "1f6bc",
        "🚪": "1f6aa",
        "🚫": "1f6ab",
        "✔": "2714",
        "🆑": "1f191",
        "🆒": "1f192",
        "🆓": "1f193",
        "🆔": "1f194",
        "🆕": "1f195",
        "🆖": "1f196",
        "🆗": "1f197",
        "🆘": "1f198",
        "🆙": "1f199",
        "🆚": "1f19a",
        "🈁": "1f201",
        "🈂": "1f202",
        "🈲": "1f232",
        "🈳": "1f233",
        "🈴": "1f234",
        "🈵": "1f235",
        "🈶": "1f236",
        "🈚": "1f21a",
        "🈷": "1f237",
        "🈸": "1f238",
        "🈹": "1f239",
        "🈯": "1f22f",
        "🈺": "1f23a",
        "㊙": "3299",
        "㊗": "3297",
        "🉐": "1f250",
        "🉑": "1f251",
        "➕": "2795",
        "➖": "2796",
        "✖": "2716",
        "➗": "2797",
        "💠": "1f4a0",
        "💡": "1f4a1",
        "💢": "1f4a2",
        "💣": "1f4a3",
        "💤": "1f4a4",
        "💥": "1f4a5",
        "💦": "1f4a6",
        "💧": "1f4a7",
        "💨": "1f4a8",
        "💩": "1f4a9",
        "💪": "1f4aa",
        "💫": "1f4ab",
        "💬": "1f4ac",
        "✨": "2728",
        "✴": "2734",
        "✳": "2733",
        "⚪": "26aa",
        "⚫": "26ab",
        "🔴": "1f534",
        "🔵": "1f535",
        "🔲": "1f532",
        "🔳": "1f533",
        "⭐": "2b50",
        "⬜": "2b1c",
        "⬛": "2b1b",
        "▫": "25ab",
        "▪": "25aa",
        "◽": "25fd",
        "◾": "25fe",
        "◻": "25fb",
        "◼": "25fc",
        "🔶": "1f536",
        "🔷": "1f537",
        "🔸": "1f538",
        "🔹": "1f539",
        "❇": "2747",
        "💮": "1f4ae",
        "💯": "1f4af",
        "↩": "21a9",
        "↪": "21aa",
        "🔃": "1f503",
        "🔊": "1f50a",
        "🔋": "1f50b",
        "🔌": "1f50c",
        "🔍": "1f50d",
        "🔎": "1f50e",
        "🔒": "1f512",
        "🔓": "1f513",
        "🔏": "1f50f",
        "🔐": "1f510",
        "🔑": "1f511",
        "🔔": "1f514",
        "☑": "2611",
        "🔘": "1f518",
        "🔖": "1f516",
        "🔗": "1f517",
        "🔙": "1f519",
        "🔚": "1f51a",
        "🔛": "1f51b",
        "🔜": "1f51c",
        "🔝": "1f51d",
        " ": "2003",
        " ": "2002",
        " ": "2005",
        "✅": "2705",
        "✊": "270a",
        "✋": "270b",
        "✌": "270c",
        "👊": "1f44a",
        "👍": "1f44d",
        "☝": "261d",
        "👆": "1f446",
        "👇": "1f447",
        "👈": "1f448",
        "👉": "1f449",
        "👋": "1f44b",
        "👏": "1f44f",
        "👌": "1f44c",
        "👎": "1f44e",
        "👐": "1f450",
        "": "2600",
        "": "2601",
        "": "2614",
        "": "26c4",
        "": "26a1",
        "": "1f300",
        "[霧]": "1f301",
        "": "1f302",
        "": "1f30c",
        "": "1f304",
        "": "1f305",
        "": "1f306",
        "": "1f307",
        "": "1f308",
        "[雪結晶]": "2744",
        "": "26c5",
        "": "1f30a",
        "[火山]": "1f30b",
        "[地球]": "1f30f",
        "●": "1f311",
        "": "1f31b",
        "○": "1f315",
        "": "1f31f",
        "☆彡": "1f320",
        "": "1f550",
        "": "1f551",
        "": "1f552",
        "": "1f553",
        "": "1f554",
        "": "1f555",
        "": "1f556",
        "": "1f557",
        "": "1f558",
        "": "23f0",
        "": "1f55a",
        "": "1f55b",
        "[腕時計]": "231a",
        "[砂時計]": "23f3",
        "": "2648",
        "": "2649",
        "": "264a",
        "": "264b",
        "": "264c",
        "": "264d",
        "": "264e",
        "": "264f",
        "": "2650",
        "": "2651",
        "": "2652",
        "": "2653",
        "": "26ce",
        "": "1f33f",
        "": "1f337",
        "": "1f341",
        "": "1f338",
        "": "1f339",
        "": "1f342",
        "": "1f343",
        "": "1f33a",
        "": "1f33c",
        "": "1f334",
        "": "1f335",
        "": "1f33e",
        "[とうもろこし]": "1f33d",
        "[キノコ]": "1f344",
        "[栗]": "1f330",
        "[さくらんぼ]": "1f352",
        "[バナナ]": "1f34c",
        "": "1f34f",
        "": "1f34a",
        "": "1f353",
        "": "1f349",
        "": "1f345",
        "": "1f346",
        "[メロン]": "1f348",
        "[パイナップル]": "1f34d",
        "[ブドウ]": "1f347",
        "[モモ]": "1f351",
        "": "1f440",
        "": "1f442",
        "": "1f443",
        "": "1f444",
        "": "1f61d",
        "": "1f484",
        "": "1f485",
        "": "1f486",
        "": "1f487",
        "": "1f488",
        "〓": "2005",
        "": "1f466",
        "": "1f467",
        "": "1f468",
        "": "1f469",
        "[家族]": "1f46a",
        "": "1f46b",
        "": "1f46e",
        "": "1f46f",
        "[花嫁]": "1f470",
        "": "1f471",
        "": "1f472",
        "": "1f473",
        "": "1f474",
        "": "1f475",
        "": "1f476",
        "": "1f477",
        "": "1f478",
        "[なまはげ]": "1f479",
        "[天狗]": "1f47a",
        "": "1f47b",
        "": "1f47c",
        "": "1f47d",
        "": "1f47e",
        "": "1f47f",
        "": "1f480",
        "": "1f481",
        "": "1f482",
        "": "1f483",
        "[カタツムリ]": "1f40c",
        "": "1f40d",
        "": "1f40e",
        "": "1f414",
        "": "1f417",
        "": "1f42b",
        "": "1f418",
        "": "1f428",
        "": "1f412",
        "": "1f411",
        "": "1f419",
        "": "1f41a",
        "": "1f41b",
        "[アリ]": "1f41c",
        "[ミツバチ]": "1f41d",
        "[てんとう虫]": "1f41e",
        "": "1f420",
        "": "1f3a3",
        "[カメ]": "1f422",
        "": "1f423",
        "": "1f426",
        "": "1f427",
        "": "1f436",
        "": "1f42c",
        "": "1f42d",
        "": "1f42f",
        "": "1f431",
        "": "1f433",
        "": "1f434",
        "": "1f435",
        "": "1f43d",
        "": "1f43b",
        "": "1f439",
        "": "1f43a",
        "": "1f42e",
        "": "1f430",
        "": "1f438",
        "": "1f463",
        "[辰]": "1f432",
        "[パンダ]": "1f43c",
        "": "1f620",
        "": "1f64d",
        "": "1f632",
        "": "1f61e",
        "": "1f62b",
        "": "1f630",
        "": "1f612",
        "": "1f63b",
        "": "1f63c",
        "": "1f61c",
        "": "1f60a",
        "": "1f63d",
        "": "1f61a",
        "": "1f637",
        "": "1f633",
        "": "1f63a",
        "": "1f605",
        "": "1f60c",
        "": "1f639",
        "": "263a",
        "": "1f604",
        "": "1f63f",
        "": "1f62d",
        "": "1f628",
        "": "1f64e",
        "": "1f4ab",
        "": "1f631",
        "": "1f62a",
        "": "1f60f",
        "": "1f613",
        "": "1f625",
        "": "1f609",
        "": "1f645",
        "": "1f646",
        "": "1f647",
        "(/_＼)": "1f648",
        "(・×・)": "1f64a",
        "|(・×・)|": "1f649",
        "": "270b",
        "": "1f64c",
        "": "1f64f",
        "": "1f3e1",
        "": "1f3e2",
        "": "1f3e3",
        "": "1f3e5",
        "": "1f3e6",
        "": "1f3e7",
        "": "1f3e8",
        "": "1f3e9",
        "": "1f3ea",
        "": "1f3eb",
        "": "26ea",
        "": "26f2",
        "": "1f3ec",
        "": "1f3ef",
        "": "1f3f0",
        "": "1f3ed",
        "": "1f6a2",
        "": "1f376",
        "": "1f5fb",
        "": "1f5fc",
        "": "1f5fd",
        "[日本地図]": "1f5fe",
        "[モアイ]": "1f5ff",
        "": "1f45f",
        "": "1f460",
        "": "1f461",
        "": "1f462",
        "[メガネ]": "1f453",
        "": "1f45a",
        "[ジーンズ]": "1f456",
        "": "1f451",
        "": "1f454",
        "": "1f452",
        "": "1f457",
        "": "1f458",
        "": "1f459",
        "[財布]": "1f45b",
        "": "1f45c",
        "[ふくろ]": "1f45d",
        "": "1f4b5",
        "": "1f4b1",
        "": "1f4c8",
        "[カード]": "1f4b3",
        "￥": "1f4b4",
        "[飛んでいくお金]": "1f4b8",
        "": "1f1e81f1f3",
        "": "1f1e91f1ea",
        "": "1f1ea1f1f8",
        "": "1f1eb1f1f7",
        "": "1f1ec1f1e7",
        "": "1f1ee1f1f9",
        "": "1f1ef1f1f5",
        "": "1f1f01f1f7",
        "": "1f1f71f1fa",
        "": "1f1fa1f1f8",
        "": "1f525",
        "[懐中電灯]": "1f526",
        "[レンチ]": "1f527",
        "": "1f528",
        "[ネジ]": "1f529",
        "[包丁]": "1f52a",
        "": "1f52b",
        "": "1f52f",
        "": "1f530",
        "": "1f531",
        "": "1f489",
        "": "1f48a",
        "": "1f170",
        "": "1f171",
        "": "1f18e",
        "": "1f17e",
        "": "1f380",
        "": "1f4e6",
        "": "1f382",
        "": "1f384",
        "": "1f385",
        "": "1f38c",
        "": "1f386",
        "": "1f388",
        "": "1f389",
        "": "1f38d",
        "": "1f38e",
        "": "1f393",
        "": "1f392",
        "": "1f38f",
        "": "1f387",
        "": "1f390",
        "": "1f383",
        "[オメデトウ]": "1f38a",
        "[七夕]": "1f38b",
        "": "1f391",
        "[ポケベル]": "1f4df",
        "": "1f4de",
        "": "1f4f1",
        "": "1f4f2",
        "": "1f4d1",
        "": "1f4e0",
        "": "1f4e7",
        "": "1f4eb",
        "": "1f4ee",
        "[新聞]": "1f4f0",
        "": "1f4e2",
        "": "1f4e3",
        "": "1f4e1",
        "[送信BOX]": "1f4e4",
        "[受信BOX]": "1f4e5",
        "[ABCD]": "1f520",
        "[abcd]": "1f521",
        "[1234]": "1f522",
        "[記号]": "1f523",
        "[ABC]": "1f524",
        "[ペン]": "2712",
        "": "1f4ba",
        "": "1f4bb",
        "[クリップ]": "1f4ce",
        "": "1f4bc",
        "": "1f4be",
        "": "1f4bf",
        "": "1f4c0",
        "": "2702",
        "[画びょう]": "1f4cc",
        "[カレンダー]": "1f4c6",
        "[フォルダ]": "1f4c2",
        "": "1f4d2",
        "[名札]": "1f4db",
        "[スクロール]": "1f4dc",
        "[グラフ]": "1f4c9",
        "[定規]": "1f4cf",
        "[三角定規]": "1f4d0",
        "": "26be",
        "": "26f3",
        "": "1f3be",
        "": "26bd",
        "": "1f3bf",
        "": "1f3c0",
        "": "1f3c1",
        "[スノボ]": "1f3c2",
        "": "1f3c3",
        "": "1f3c4",
        "": "1f3c6",
        "": "1f3c8",
        "": "1f3ca",
        "": "1f683",
        "": "24c2",
        "": "1f684",
        "": "1f685",
        "": "1f697",
        "": "1f699",
        "": "1f68c",
        "": "1f68f",
        "": "2708",
        "": "26f5",
        "": "1f689",
        "": "1f680",
        "": "1f6a4",
        "": "1f695",
        "": "1f69a",
        "": "1f692",
        "": "1f691",
        "": "1f6a8",
        "": "26fd",
        "": "1f17f",
        "": "1f6a5",
        "": "26d4",
        "": "2668",
        "": "26fa",
        "": "1f3a1",
        "": "1f3a2",
        "": "1f3a4",
        "": "1f4f9",
        "": "1f3a6",
        "": "1f3a7",
        "": "1f3a8",
        "": "1f3ad",
        "[イベント]": "1f3aa",
        "": "1f3ab",
        "": "1f3ac",
        "[ゲーム]": "1f3ae",
        "": "1f004",
        "": "1f3af",
        "": "1f3b0",
        "": "1f3b1",
        "[サイコロ]": "1f3b2",
        "[ボーリング]": "1f3b3",
        "[花札]": "1f3b4",
        "[ジョーカー]": "1f0cf",
        "": "1f3b5",
        "": "1f3bc",
        "": "1f3b7",
        "": "1f3b8",
        "[ピアノ]": "1f3b9",
        "": "1f3ba",
        "[バイオリン]": "1f3bb",
        "": "303d",
        "": "1f4f7",
        "": "1f4fa",
        "": "1f4fb",
        "": "1f4fc",
        "": "1f48b",
        "": "1f48c",
        "": "1f48d",
        "": "1f48e",
        "": "1f48f",
        "": "1f490",
        "": "1f491",
        "": "1f492",
        "": "1f51e",
        "": "a9",
        "": "ae",
        "": "2122",
        "[ｉ]": "2139",
        "": "2320e3",
        "": "3120e3",
        "": "3220e3",
        "": "3320e3",
        "": "3420e3",
        "": "3520e3",
        "": "3620e3",
        "": "3720e3",
        "": "3820e3",
        "": "3920e3",
        "": "3020e3",
        "[10]": "1f51f",
        "": "1f4f6",
        "": "1f4f3",
        "": "1f4f4",
        "": "1f354",
        "": "1f359",
        "": "1f370",
        "": "1f35c",
        "": "1f35e",
        "": "1f373",
        "": "1f366",
        "": "1f35f",
        "": "1f361",
        "": "1f358",
        "": "1f35a",
        "": "1f35d",
        "": "1f35b",
        "": "1f362",
        "": "1f363",
        "": "1f371",
        "": "1f372",
        "": "1f367",
        "[肉]": "1f356",
        "[なると]": "1f365",
        "[やきいも]": "1f360",
        "[ピザ]": "1f355",
        "[チキン]": "1f357",
        "[アイスクリーム]": "1f368",
        "[ドーナツ]": "1f369",
        "[クッキー]": "1f36a",
        "[チョコ]": "1f36b",
        "[キャンディ]": "1f36d",
        "[プリン]": "1f36e",
        "[ハチミツ]": "1f36f",
        "[エビフライ]": "1f364",
        "": "1f374",
        "": "2615",
        "": "1f379",
        "": "1f37a",
        "": "1f375",
        "": "1f37b",
        "": "2934",
        "": "2935",
        "": "2196",
        "": "2199",
        "⇔": "2194",
        "↑↓": "1f503",
        "": "2b06",
        "": "2b07",
        "": "27a1",
        "": "1f519",
        "": "25b6",
        "": "25c0",
        "": "23e9",
        "": "23ea",
        "▲": "1f53c",
        "▼": "1f53d",
        "": "2b55",
        "": "2716",
        "": "2757",
        "！？": "2049",
        "！！": "203c",
        "": "2753",
        "": "2754",
        "": "2755",
        "～": "27b0",
        "": "27bf",
        "": "2764",
        "": "1f49e",
        "": "1f494",
        "": "1f497",
        "": "1f498",
        "": "1f499",
        "": "1f49a",
        "": "1f49b",
        "": "1f49c",
        "": "1f49d",
        "": "1f49f",
        "": "2665",
        "": "2660",
        "": "2666",
        "": "2663",
        "": "1f6ac",
        "": "1f6ad",
        "": "267f",
        "[旗]": "1f6a9",
        "": "26a0",
        "": "1f6b2",
        "": "1f6b6",
        "": "1f6b9",
        "": "1f6ba",
        "": "1f6c0",
        "": "1f6bb",
        "": "1f6bd",
        "": "1f6be",
        "": "1f6bc",
        "[ドア]": "1f6aa",
        "[禁止]": "1f6ab",
        "[チェックマーク]": "2705",
        "[CL]": "1f191",
        "": "1f192",
        "[FREE]": "1f193",
        "": "1f194",
        "": "1f195",
        "[NG]": "1f196",
        "": "1f197",
        "[SOS]": "1f198",
        "": "1f199",
        "": "1f19a",
        "": "1f201",
        "": "1f202",
        "[禁]": "1f232",
        "": "1f233",
        "[合]": "1f234",
        "": "1f235",
        "": "1f236",
        "": "1f21a",
        "": "1f237",
        "": "1f238",
        "": "1f239",
        "": "1f22f",
        "": "1f23a",
        "": "3299",
        "": "3297",
        "": "1f250",
        "[可]": "1f251",
        "[＋]": "2795",
        "[－]": "2796",
        "[÷]": "2797",
        "": "1f4a1",
        "": "1f4a2",
        "": "1f4a3",
        "": "1f4a4",
        "[ドンッ]": "1f4a5",
        "": "1f4a7",
        "": "1f4a8",
        "": "1f4a9",
        "": "1f4aa",
        "[フキダシ]": "1f4ac",
        "": "2747",
        "": "2734",
        "": "2733",
        "": "1f534",
        "": "25fc",
        "": "1f539",
        "": "2b50",
        "[花丸]": "1f4ae",
        "[100点]": "1f4af",
        "←┘": "21a9",
        "└→": "21aa",
        "": "1f50a",
        "[電池]": "1f50b",
        "[コンセント]": "1f50c",
        "": "1f50e",
        "": "1f510",
        "": "1f513",
        "": "1f511",
        "": "1f514",
        "[ラジオボタン]": "1f518",
        "[ブックマーク]": "1f516",
        "[リンク]": "1f517",
        "[end]": "1f51a",
        "[ON]": "1f51b",
        "[SOON]": "1f51c",
        "": "1f51d",
        "": "270a",
        "": "270c",
        "": "1f44a",
        "": "1f44d",
        "": "261d",
        "": "1f446",
        "": "1f447",
        "": "1f448",
        "": "1f449",
        "": "1f44b",
        "": "1f44f",
        "": "1f44c",
        "": "1f44e",
        "": "1f450"
    };
    String.prototype.emoji = function () {
        for (var f = this.toString(), d = 0; d < a.length; d++) {
            for (; a[d].cn && -1 != f.indexOf(a[d].cn);) f = f.replace(a[d].cn, b.sprintf(a[d].style));
            for (; a[d].hk && -1 != f.indexOf(a[d].hk);) f = f.replace(a[d].hk, b.sprintf(a[d].style));
            for (; a[d].us && -1 != f.indexOf(a[d].us);) f = f.replace(a[d].us, b.sprintf(a[d].style));
            for (; a[d].code && -1 != f.indexOf(a[d].code);) f = f.replace(a[d].code, b.sprintf(a[d].style));
            for (; a[d].web_code && -1 != f.indexOf(a[d].web_code);) f = f.replace(a[d].web_code, b.sprintf(a[d].style));
            for (; a[d].emoji && -1 != f.indexOf(a[d].emoji);) f = f.replace(a[d].emoji, b.sprintf(a[d].style));
        }
        for (var i in c) for (; -1 != f.indexOf(i);) f = f.replace(i, e.sprintf(c[i]));
        return f;
    };
});
define("common/lib/colorpicker.js", ["widget/colorpicker/colorpicker.css"], function (t) {
    t("widget/colorpicker/colorpicker.css");
    var e;
    return function (t, o, i) {
        function s(e) {
            if (t.event && t.event.contentOverflow !== i) return {
                x: t.event.offsetX,
                y: t.event.offsetY
            };
            if (e.offsetX !== i && e.offsetY !== i) return {
                x: e.offsetX,
                y: e.offsetY
            };
            var o = e.target.parentNode.parentNode;
            return {
                x: e.layerX - o.offsetLeft,
                y: e.layerY - o.offsetTop
            };
        }

        function r(t, e, i) {
            t = o.createElementNS(y, t);
            for (var s in e) t.setAttribute(s, e[s]);
            "[object Array]" != Object.prototype.toString.call(i) && (i = [i]);
            for (var r = 0, n = i[0] && i.length || 0; n > r; r++) t.appendChild(i[r]);
            return t;
        }

        function n(t) {
            var e, o, i, s, r, n = t.h % 360 / 60;
            r = t.v * t.s, s = r * (1 - Math.abs(n % 2 - 1)), e = o = i = t.v - r, n = ~~n, e += [r, s, 0, 0, s, r][n], o += [s, r, r, s, 0, 0][n],
                i += [0, 0, s, r, r, s][n];
            var l = Math.floor(255 * e), a = Math.floor(255 * o), c = Math.floor(255 * i);
            return {
                r: l,
                g: a,
                b: c,
                hex: "#" + (16777216 | c | a << 8 | l << 16).toString(16).slice(1)
            };
        }

        function l(t) {
            var e = t.r, o = t.g, i = t.b;
            (t.r > 1 || t.g > 1 || t.b > 1) && (e /= 255, o /= 255, i /= 255);
            var s, r, n, l;
            return n = Math.max(e, o, i), l = n - Math.min(e, o, i), s = 0 == l ? null : n == e ? (o - i) / l + (i > o ? 6 : 0) : n == o ? (i - e) / l + 2 : (e - o) / l + 4,
                s = s % 6 * 60, r = 0 == l ? 0 : l / n, {
                h: s,
                s: r,
                v: n
            };
        }

        function a(e, o, r) {
            return function (l) {
                l = l || t.event;
                var a = s(l);
                e.h = a.y / o.offsetHeight * 360 + g;
                var c = n({
                    h: e.h,
                    s: 1,
                    v: 1
                }), f = n({
                    h: e.h,
                    s: e.s,
                    v: e.v
                });
                return r.style.backgroundColor = c.hex, e.callback && e.callback(f.hex, {
                    h: e.h - g,
                    s: e.s,
                    v: e.v
                }, {
                    r: f.r,
                    g: f.g,
                    b: f.b
                }, i, a), l.stopPropagation ? (l.stopPropagation(), l.preventDefault()) : l.cancelBubble = !0,
                    !1;
            };
        }

        function c(e, o) {
            return function (i) {
                i = i || t.event;
                var r = s(i), l = o.offsetWidth, a = o.offsetHeight;
                e.s = r.x / l, e.v = (a - r.y) / a;
                var c = n(e);
                return e.callback && e.callback(c.hex, {
                    h: e.h - g,
                    s: e.s,
                    v: e.v
                }, {
                    r: c.r,
                    g: c.g,
                    b: c.b
                }, r), i.stopPropagation ? (i.stopPropagation(), i.preventDefault()) : i.cancelBubble = !0,
                    !1;
            };
        }

        function f(t, e, o) {
            t.attachEvent ? t.attachEvent("on" + e, o) : t.addEventListener && t.addEventListener(e, o, !1);
        }

        function p(t, e, o) {
            var i = !1;
            f(e, "mousedown", function () {
                i = !0;
            }), f(e, "mouseup", function () {
                i = !1;
            }), f(e, "mouseout", function () {
                i = !1;
            }), f(e, "mousemove", function (t) {
                i && o(t);
            });
        }

        function h(t, e, o, i) {
            t.h = e.h % 360, t.s = e.s, t.v = e.v;
            var s = n(t), r = {
                y: t.h * t.slideElement.offsetHeight / 360,
                x: 0
            }, l = t.pickerElement.offsetHeight, a = {
                x: t.s * t.pickerElement.offsetWidth,
                y: l - t.v * l
            };
            return t.pickerElement.style.backgroundColor = n({
                h: t.h,
                s: 1,
                v: 1
            }).hex, t.callback && t.callback(i || s.hex, {
                h: t.h,
                s: t.s,
                v: t.v
            }, o || {
                r: s.r,
                g: s.g,
                b: s.b
            }, a, r), t;
        }

        var d, v, u = t.SVGAngle || o.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", g = 15, y = "http://www.w3.org/2000/svg",
            m = ['<div class="picker-wrapper">', '<div class="picker"></div>', '<div class="picker-indicator"></div>', "</div>", '<div class="slide-wrapper">', '<div class="slide"></div>', '<div class="slide-indicator"></div>', "</div>"].join("");
        "SVG" == u ? (v = r("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1",
            width: "100%",
            height: "100%"
        }, [r("defs", {}, r("linearGradient", {
            id: "gradient-hsv",
            x1: "0%",
            y1: "100%",
            x2: "0%",
            y2: "0%"
        }, [r("stop", {
            offset: "0%",
            "stop-color": "#FF0000",
            "stop-opacity": "1"
        }), r("stop", {
            offset: "13%",
            "stop-color": "#FF00FF",
            "stop-opacity": "1"
        }), r("stop", {
            offset: "25%",
            "stop-color": "#8000FF",
            "stop-opacity": "1"
        }), r("stop", {
            offset: "38%",
            "stop-color": "#0040FF",
            "stop-opacity": "1"
        }), r("stop", {
            offset: "50%",
            "stop-color": "#00FFFF",
            "stop-opacity": "1"
        }), r("stop", {
            offset: "63%",
            "stop-color": "#00FF40",
            "stop-opacity": "1"
        }), r("stop", {
            offset: "75%",
            "stop-color": "#0BED00",
            "stop-opacity": "1"
        }), r("stop", {
            offset: "88%",
            "stop-color": "#FFFF00",
            "stop-opacity": "1"
        }), r("stop", {
            offset: "100%",
            "stop-color": "#FF0000",
            "stop-opacity": "1"
        })])), r("rect", {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: "url(#gradient-hsv)"
        })]), d = r("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            version: "1.1",
            width: "100%",
            height: "100%"
        }, [r("defs", {}, [r("linearGradient", {
            id: "gradient-black",
            x1: "0%",
            y1: "100%",
            x2: "0%",
            y2: "0%"
        }, [r("stop", {
            offset: "0%",
            "stop-color": "#000000",
            "stop-opacity": "1"
        }), r("stop", {
            offset: "100%",
            "stop-color": "#CC9A81",
            "stop-opacity": "0"
        })]), r("linearGradient", {
            id: "gradient-white",
            x1: "0%",
            y1: "100%",
            x2: "100%",
            y2: "100%"
        }, [r("stop", {
            offset: "0%",
            "stop-color": "#FFFFFF",
            "stop-opacity": "1"
        }), r("stop", {
            offset: "100%",
            "stop-color": "#CC9A81",
            "stop-opacity": "0"
        })])]), r("rect", {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: "url(#gradient-white)"
        }), r("rect", {
            x: "0",
            y: "0",
            width: "100%",
            height: "100%",
            fill: "url(#gradient-black)"
        })])) : "VML" == u && (v = ['<DIV style="position: relative; width: 100%; height: 100%">', '<v:rect style="position: absolute; top: 0; left: 0; width: 100%; height: 100%" stroked="f" filled="t">', '<v:fill type="gradient" method="none" angle="0" color="red" color2="red" colors="8519f fuchsia;.25 #8000ff;24903f #0040ff;.5 aqua;41287f #00ff40;.75 #0bed00;57671f yellow"></v:fill>', "</v:rect>", "</DIV>"].join(""),
            d = ['<DIV style="position: relative; width: 100%; height: 100%">', '<v:rect style="position: absolute; left: -1px; top: -1px; width: 101%; height: 101%" stroked="f" filled="t">', '<v:fill type="gradient" method="none" angle="270" color="#FFFFFF" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>', "</v:rect>", '<v:rect style="position: absolute; left: 0px; top: 0px; width: 100%; height: 101%" stroked="f" filled="t">', '<v:fill type="gradient" method="none" angle="0" color="#000000" opacity="100%" color2="#CC9A81" o:opacity2="0%"></v:fill>', "</v:rect>", "</DIV>"].join(""),
        o.namespaces.v || o.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"));
        var b = 0;
        e = function (t, o, i) {
            if (!(this instanceof e)) return new e(t, o, i);
            if (this.h = 0, this.s = 1, this.v = 1, i) this.callback = i, this.pickerElement = o, this.slideElement = t; else {
                var s = t;
                s.innerHTML = m, this.slideElement = s.getElementsByClassName("slide")[0], this.pickerElement = s.getElementsByClassName("picker")[0];
                var r = s.getElementsByClassName("slide-indicator")[0], n = s.getElementsByClassName("picker-indicator")[0];
                e.fixIndicators(r, n), this.callback = function (t, i, s, l, a) {
                    e.positionIndicators(r, n, a, l), o(t, i, s);
                };
            }
            if ("SVG" == u) {
                var l = v.cloneNode(!0), h = d.cloneNode(!0), g = l.getElementById("gradient-hsv"), y = l.getElementsByTagName("rect")[0];
                g.id = "gradient-hsv-" + b, y.setAttribute("fill", "url(#" + g.id + ")");
                var x = [h.getElementById("gradient-black"), h.getElementById("gradient-white")], k = h.getElementsByTagName("rect");
                x[0].id = "gradient-black-" + b, x[1].id = "gradient-white-" + b, k[0].setAttribute("fill", "url(#" + x[1].id + ")"),
                    k[1].setAttribute("fill", "url(#" + x[0].id + ")"), this.slideElement.appendChild(l), this.pickerElement.appendChild(h),
                    b++;
            } else this.slideElement.innerHTML = v, this.pickerElement.innerHTML = d;
            f(this.slideElement, "click", a(this, this.slideElement, this.pickerElement)), f(this.pickerElement, "click", c(this, this.pickerElement)),
                p(this, this.slideElement, a(this, this.slideElement, this.pickerElement)), p(this, this.pickerElement, c(this, this.pickerElement));
        }, e.hsv2rgb = function (t) {
            var e = n(t);
            return delete e.hex, e;
        }, e.hsv2hex = function (t) {
            return n(t).hex;
        }, e.rgb2hsv = l, e.rgb2hex = function (t) {
            return n(l(t)).hex;
        }, e.hex2hsv = function (t) {
            return l(e.hex2rgb(t));
        }, e.hex2rgb = function (t) {
            return {
                r: parseInt(t.substr(1, 2), 16),
                g: parseInt(t.substr(3, 2), 16),
                b: parseInt(t.substr(5, 2), 16)
            };
        }, e.prototype.setHsv = function (t) {
            return h(this, t);
        }, e.prototype.setRgb = function (t) {
            return h(this, l(t), t);
        }, e.prototype.setHex = function (t) {
            return h(this, e.hex2hsv(t), i, t);
        }, e.positionIndicators = function (t, e, o, i) {
            o && (t.style.top = o.y - t.offsetHeight / 2 + "px"), i && (e.style.top = i.y - e.offsetHeight / 2 + "px",
                e.style.left = i.x - e.offsetWidth / 2 + "px");
        }, e.fixIndicators = function (t, e) {
            e.style.pointerEvents = "none", t.style.pointerEvents = "none";
        };
    }(window, window.document), e;
});
define("cardticket/card_quantity.js", ["common/wx/Cgi.js", "common/wx/Tips.js", "biz_web/ui/checkbox.js", "cardticket/common_template_helper.js", "tpl/cardticket/card_quantity.html.js", "common/wx/tooltips.js", "common/wx/tooltipsManager.js"], function (t) {
    "use strict";
    var e = t("common/wx/Cgi.js"), a = t("common/wx/Tips.js"), i = (t("biz_web/ui/checkbox.js"),
        t("cardticket/common_template_helper.js")), o = template.compile(t("tpl/cardticket/card_quantity.html.js")), s = {
        container: "",
        quantityChange: $.noop,
        max_sku_for_eachcard: 1e4,
        setquantity: !0
    }, n = t("common/wx/tooltips.js"), r = t("common/wx/tooltipsManager.js"), c = function (t) {
        t = $.extend(!0, {}, s, t), this.opt = t;
        var c = this;
        t.data || (t.data = {}), $(t.container).on("click", function (s) {
            function l(i, o) {
                $(".js_state_quantity", c.tooltip.$dom).hide();
                var s = $(".js_state_" + i, c.tooltip.$dom).show(), n = s.attr("isinit");
                if (0 == i) e.get({
                    url: "/merchant/cardmoneymgr?action=get_card_price",
                    data: {
                        card_id: _
                    },
                    success: function (t) {
                        if (0 == t.base_resp.ret) {
                            var a = $.parseJSON(t.result_json);
                            a.items[0].total_coin_balance = t.total_coin_balance, l(1, a.items[0]);
                        } else e.show(t);
                    }
                }); else if (1 == i) {
                    var d = o.price, m = o.total_coin_balance;
                    if (!n) {
                        var p = $(".js_error", s), f = $(".js_total_price", s), h = $(".js_total_price_container", s), y = $(".js_value", s).keyup(function () {
                            var t = $(this), e = $.trim($(this).val());
                            if (!/^[0-9]+$/.test(e) || isNaN(e) || 0 >= e) return p.text("库存必须是不小于1的整数").show().addClass("fail"),
                                t.focus(), h.hide(), !1;
                            var a = 1e9;
                            return e >= a ? (p.text("库存不能大于10亿").show().addClass("fail"), t.focus(), !1) : d * e > m ? (p.html('券点余额：%s 余额不足，<a target="_blank" href="%s">去充值</a>'.sprintf(m / 100, wx.url("/merchant/cardmoneymgr?action=get_order_flow"))).show().addClass("fail"),
                                t.focus(), h.show(), f.text(d * e / 100), !1) : (p.text("券点余额：%s，优先使用免费券点".sprintf(m / 100)).show().removeClass("fail"),
                                h.show(), void f.text(d * e / 100));
                        });
                        $(".js_confirm", s).click(function () {
                            var t = $.trim(y.val());
                            if (!/^[0-9]+$/.test(t) || isNaN(t) || 0 >= t) return p.text("库存必须是不小于1的整数").show().addClass("fail"),
                                y.focus(), h.hide(), !1;
                            var a = 1e9;
                            return t >= a ? (p.text("库存不能大于10亿").show().addClass("fail"), y.focus(), !1) : d * t > m ? (p.html('券点余额：%s 余额不足，<a target="_blank" href="%s">去充值</a>'.sprintf(m / 100, wx.url("/merchant/cardmoneymgr?action=get_order_flow"))).show().addClass("fail"),
                                y.focus(), !1) : ($(this).btn(!1), t = parseInt(t), void e.get({
                                url: "/merchant/cardmoneymgr?action=get_card_pay_price",
                                data: {
                                    card_id: _,
                                    quantity: t
                                },
                                success: function (a) {
                                    0 == a.base_resp.ret ? (a.quantity = t, l(2, a)) : e.show(a);
                                }
                            }));
                        }), $(".js_cancel", s).click(function () {
                            c.tooltip.hide(), r.removeAll(), c.tooltip = null;
                        });
                    }
                    s.find(".js_price").text(o.price / 100);
                } else if (2 == i) {
                    if (!n) {
                        var v = !1;
                        $(".js_confirm", s).click(function () {
                            v || ($(this).btn(!1), v = !0, e.post({
                                url: "/merchant/cardmoneymgr?action=confirm_card_coin_pay",
                                data: {
                                    card_id: _,
                                    quantity: o.quantity,
                                    free_coin: o.free_coin,
                                    pay_coin: o.pay_coin,
                                    order_id: o.order_id,
                                    price: o.price
                                },
                                complete: function () {
                                    v = !1;
                                },
                                success: function (t) {
                                    $(this).btn(!0), 0 == t.base_resp.ret ? (t.addquantity = o.quantity, u.pay_info.is_swipe_card ? l(9, t) : l(3, t)) : 26 == t.base_resp.ret ? (t.is_fail = !1,
                                        l(4, t)) : 10039 == t.base_resp.ret || 76 == t.base_resp.ret ? l(8, t) : (t.is_fail = !0, l(4, t));
                                }
                            }));
                        }), $(".js_cancel", s).click(function () {
                            c.tooltip.hide(), r.removeAll(), c.tooltip = null;
                        });
                    }
                    s.find(".js_price").text(o.price / 100), s.find(".js_quantity").text(o.quantity), s.find(".js_freecoin").text(o.free_coin / 100),
                        s.find(".js_paycoin").text(o.pay_coin / 100);
                } else if (3 == i || 9 == i) {
                    n || $(".js_close_quantity", s).click(function () {
                        r.removeAll();
                    });
                    var w = o.addquantity;
                    s.find(".js_quantity").text(w), $(t.container).data("isswipe") || a.suc("设置库存成功"), setTimeout(function () {
                        3 == i && r.removeAll();
                    }, 1500), t.quantityChange && t.quantityChange.call(c, _, w);
                } else 4 == i || 7 == i || 8 == i ? (n || $(".js_close_quantity", s).click(function () {
                    r.removeAll();
                }), 8 == i && $(".js_quantity_exceed_msg h4", s).text(t.max_sku_for_eachcard > 0 ? " 子商户每张券累计只可发放%s份 ".sprintf(t.max_sku_for_eachcard) : " 账号违规，不能改动库存，详请查看通知中心 ")) : 5 == i ? n || $(".js_go_activate", s).click(function () {
                    r.removeAll(), location.href = wx.url("/merchant/cardstat?action=overviewpage");
                }) : 6 == i && e.get({
                    url: "/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
                }, function (t) {
                    0 == t.base_resp.ret ? l(1 == t.is_acct_open ? 0 : 5) : e.handleRet(t, {
                        id: 64463,
                        key: 25,
                        url: "/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
                    });
                });
                s.attr("isinit", 1);
            }

            var d, _ = $(this).data("cid");
            if (t.before && t.before(_) === !1) return !1;
            var u = t.data;
            if (t.cache_card && (u = t.cache_card[_]), u.is_sns_card && 3 != u.status && 5 != u.status && 6 != u.status) return a.err("审核中的朋友的券无法修改库存"),
                !1;
            if (u.is_sns_card) {
                if (c.tooltip = new n({
                    container: this,
                    content: o({
                        setquantity: t.setquantity,
                        data: u
                    }),
                    container_mode: t.mode || "absolute",
                    reposition: !0,
                    type: "click",
                    onclose: function (t) {
                        if (t) {
                            for (var e = this.$dom.get(0), a = t.target, i = !1; a && a !== document.body;) {
                                if (a == e) {
                                    i = !0;
                                    break;
                                }
                                a = a.parentNode;
                            }
                            i ? this.show() : this.hide();
                        }
                    }
                }), l(6), c.tooltip.show(), r.removeAll(), r.add(c.tooltip), $(".popover").css({
                    "z-index": "10000",
                    width: "326px"
                }), "fixed" == t.mode) {
                    var m = parseInt(c.tooltip.$dom.css("top")) || 0;
                    c.tooltip.$dom.css("top", m - ($(document.body).scrollTop() || 0));
                }
                s.stopPropagation();
            } else {
                var p = new n({
                    container: this,
                    content: o({
                        setquantity: t.setquantity,
                        data: u
                    }),
                    container_mode: t.mode || "absolute",
                    type: "click",
                    reposition: !0,
                    onclose: function (t) {
                        if (t) {
                            for (var e = this.$dom.get(0), a = t.target, i = !1; a && a !== document.body;) {
                                if (a == e) {
                                    i = !0;
                                    break;
                                }
                                a = a.parentNode;
                            }
                            i ? this.show() : this.hide();
                        }
                    },
                    buttons: [{
                        text: "确定",
                        type: "btn_primary",
                        click: function () {
                            var o = p.$dom, s = o.find(".js_value"), n = parseInt($.trim(s.val()));
                            if (isNaN(n) || 0 >= n) return a.err("库存必须是不能小于1的整数"), !1;
                            var l = 1e9;
                            return n >= l ? (a.err("库存不能大于10亿"), s.focus(), !1) : void e.post({
                                url: "/merchant/electroniccardmgr",
                                data: {
                                    action: t.setquantity ? "modifyquantity" : "setquantity",
                                    card_id: _,
                                    value: n,
                                    isadd: d.value()
                                }
                            }, function (o) {
                                if (0 == o.base_resp.ret) $(t.container).data("isswipe") || a.suc("设置库存成功"), r.removeAll(),
                                t.quantityChange && t.quantityChange.call(c, _, !t.setquantity || d.value() ? n : -n); else if (10039 == o.base_resp.ret || 76 == o.base_resp.ret) {
                                    var s = $.parseJSON(o.biz_quota_json), l = i.parse_assistsend_quota(s.quota_list);
                                    a.err(l.max_sku > 0 ? "子商户每张券累计只可发放%s份".sprintf(l.max_sku) : "账号违规，不能改动库存，详请查看通知中心");
                                } else 1e4 == o.base_resp.ret ? a.err("库存不能小于0") : e.show(o);
                            });
                        }
                    }, {
                        text: "取消",
                        type: "btn_default",
                        click: function () {
                            r.removeAll();
                        }
                    }]
                });
                if (p.show(), r.removeAll(), r.add(p), $(".popover").css({
                    "z-index": "10000",
                    width: "326px"
                }), d = p.$dom.find(".js_quantity_type").checkbox(), p.$dom.find(".js_value").focus(),
                "fixed" == t.mode) {
                    var m = parseInt(p.$dom.css("top")) || 0;
                    p.$dom.css("top", m - ($(document.documentElement || document.body).scrollTop() || 0));
                }
                s.stopPropagation();
            }
            window.report_click_ele && window.report_click_ele(this);
        });
    };
    return c;
});
define("tpl/cardticket/card_preview.html.js", [], function () {
    return '<div class="pop_card_preview js_pop_card_preview">\n	<span class="hook hook_right_top js_arrow">\n	<!--\n		箭头位置 \n		hook_right_top      右偏上\n		\n	-->\n		<span class="hook_top"></span>\n		<span class="hook_btm"></span>\n	</span>\n	<div class="card_preview">\n		<div class="client_side">\n			<div class="banner">{convert_type card.type}</div>\n			<div class="wrp">\n				<div class="top" style="background-color: {card.color};border-bottom-color: {card.color};">\n					<div class="logo group">\n						<div class="avartar l"><img src="{http2https card.logo_url}"></div>\n						<p>{card.brand_name}</p>\n					</div>\n					<div class="msg">\n						<div class="main_msg">\n							<p>{card.title}</p>\n							<p class="title_sub">{card.sub_title}</p>\n						</div>\n						<p class="time">有效期 {validtime card \'YYYY-MM-DD\'}</p>\n					</div>\n					<div class="deco"></div>\n				</div>\n				<div class="wrp_content">\n					<div class="wrp_section section_dispose">\n						{if card.code_type==0}\n							<div class="main_msg sn">1513-2290-1878</div>\n						{else if card.code_type==1}\n							<div class="bar_code_panel">\n								<div class="main_msg bar_code"></div>\n								<p class="sn">1513-2290-1878</p>\n							</div>\n						{else if card.code_type==2}\n							<div class="qr_code_panel">\n								<div class="main_msg qr_code"></div>\n								<p class="sn">1513-2290-1878</p>\n							</div>\n						{/if}\n						<p>{card.notice}</p>\n					</div>\n					<div class="wrp_section">\n						<ul class="info_list">\n							<li class="info_li">\n								<p class="info">{convert_type card.type}详情</p>\n								<span class="supply_area"><i class="ic ic_go"></i></span>\n							</li>\n							<li class="info_li">\n								<p class="info">适用门店</p>\n								<span class="supply_area">{card.location_id_list.length}家<i class="ic ic_go"></i></span>\n							</li>\n						</ul>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>';
});
define("tpl/cardticket/card_table.html.js", [], function () {
    return '<div class="release_method js_card_container send_card">\n	{if loading}\n	<div class="loading"><i class="icon_loading_small white">loading...</i></div>\n	{else}\n	<div class="sub_title_bar group">\n		{if sns_card_type==2}<a href="javascript:void(0);" class="js_add_card_link r btn btn_primary">新建朋友的券 </a>{/if}\n		<!-- <span class="frm_input_box search append">\n			<a href="javascript:void(0);" class="js_search frm_input_append">\n				<i class="icon16_common search_gray">搜索</i>\n				&nbsp;\n			</a>\n			<input type="text" placeholder="请输入卡券名称" class="frm_input js_keyword">\n		</span>  -->\n	</div>\n	<div class="table_wrp release_method_select_table_wrp">\n		<table class="table" cellspacing="0">\n			<thead class="thead">\n				<tr>\n					<th class="table_cell release_method_select_box">&nbsp;</th>\n					{if view_mode==2}\n					<th class="table_cell">商户名</th>\n					{/if}\n					<th class="table_cell release_method_kind"><div class="td_panel">卡券类型</div></th>\n					<th class="table_cell release_method_name"><div class="td_panel"><div class="js_filter_tag">卡券名称</div></div></th>\n					{if !hide_valid_date}\n					<th class="table_cell release_method_time"><div class="td_panel">卡券有效期</div></th>\n					{/if}\n					<th class="table_cell release_method_stock"><div class="td_panel">库存</div></th>\n					{if (payflag==1||payflag==2) && sns_card_type!=2}<th class="table_cell release_method_price"><div class="td_panel">微信价(元)</div></th>{/if}\n					<!-- <th class="table_cell release_method_preview"><div class="td_panel">预览</div></th> -->\n					<th class="table_cell release_method_state"><div class="td_panel">卡券状态</div></th>\n				</tr>\n			</thead>\n			<tbody class="tbody">\n			{if !data.length}\n				<tr>\n					<td class="empty_tips" colspan="6">暂无卡券</td>\n				</tr>\n			{else}\n			{each data as card i}\n            <tr  class="{if hasdata && (i<pageInfo.begin||i>=pageInfo.begin+pageInfo.count)}dn{/if}{if (sns_card_type==2 && !card.is_sns_card) || (sns_card_type==1 && card.is_sns_card) || card.is_sub_merchant_disabled} disabled_item{/if}" id="js_ct_tr_{card.id}">\n					<td class="table_cell release_method_select_box"><div class="td_panel">\n						{if !multi}\n						<label class="frm_radio_label">\n							<i class="icon_radio"></i>\n							<input type="radio" data-id="{card.id}" value="{card.id}" class="frm_radio js_select{if sns_card_type}{if card.is_sns_card} js_select_disabled_1{else} js_select_disabled_2{/if}{/if}">\n						</label>\n						{else}\n						<label class="frm_checkbox_label">\n							<i class="icon_checkbox"></i>\n							<input type="checkbox" data-id="{card.id}" value="{card.id}" class="frm_checkbox js_select{if sns_card_type}{if card.is_sns_card} js_select_disabled_1{else} js_select_disabled_2{/if}{/if}">\n						</label>\n						{/if}\n					</div></td>\n					{if view_mode==2}\n					<td class="table_cell release_method_kind"><div class="td_panel">{card.brand_name}</div></td>\n					{/if}\n					<td class="table_cell release_method_kind"><div class="td_panel">{convert_type card.type}</div></td>\n					<td class="table_cell release_method_name"><div class="td_panel">{card.title}{if card.is_sns_card}<i class="ic_social">共享</i>{/if}{if card.is_intercomm}<i class="icon18 ic_intercomm"></i>{/if}</div></td>\n					{if !hide_valid_date}\n					<td class="table_cell release_method_time"><div class="td_panel">{validtime card \'YYYY-MM-DD\'}</div></td>\n					{/if}\n					<td class="table_cell release_method_stock"><div class="td_panel"><span class="js_sendcard_quantity{if card.quantity==0} text_weak{/if}">{card.quantity}</span>\n						{if editquantity && !card.is_from_intercomm && card.can_edit_quantity}<a class="icon14_common edit_gray js_modify_quantity" href="javascript:;" data-new="{if card.isnew}1{/if}" data-cid="{card.id}" data-x="-161" title="修改库存"></a>{else}<span class="w20"></span>{/if}</div>\n					</td>\n					{if (payflag==1||payflag==2) && sns_card_type!=2}<td class="table_cell release_method_price"><div class="td_panel">{if card.ispay}{card.price}{else}--{/if}</div></td>{/if}\n					<!-- <td class="table_cell release_method_preview"><div class="td_panel"><a data-cid="{card.id}" data-x="-125" class="js_card_preview" href="javascript:void(0);">预览</a></div></td> -->\n					<td class="table_cell release_method_state"><div class="td_panel"><span class="fail pass"><i></i>{convert_state card.status}</span></div></td></td>\n				</tr>\n			{/each}\n			{/if}\n			</tbody>\n		</table>\n		{if !hide_tips}\n			{if tips_wording}\n				<div class="mini_tips l">{=tips_wording}</div>\n			{else if sns_card_type==1}\n				<div class="mini_tips l">只能投放普通券</div>\n			{else if sns_card_type==2}\n				<div class="mini_tips l">\n					{if use_scene==2}\n						只能投放商户的其它可共享优惠券					{else}\n						只能投放可共享优惠券					{/if}\n				</div>\n			{/if}\n		{/if}\n        <div class="js_pager"></div>\n        {if multi}\n        <p class="dialog_bt_tip">已选<span class="js_selectcount">{defaultValues.length||0}</span>个</p>\n        {/if}\n	</div>\n	{/if}\n</div>\n';
});
define("cardticket/create_card_select.js", ["biz_web/ui/checkbox.js", "common/wx/Tips.js", "common/wx/popup.js", "common/wx/dialog.js", "cardticket/select_sub_merchant_table.js", "cardticket/common_template_helper.js", "tpl/cardticket/choose_card_type.html.js", "common/wx/Step.js"], function (e) {
    "use strict";

    function t(e) {
        return 1 == window.view_mode && (1 == c || 2 == c) || 2 == window.view_mode && e && h.can_category_use_sns_card(e.PrimaryCategoryId, e.SecondaryCategoryId);
    }

    function i(e, t) {
        var i = $(e.step2container).html(f({
            flag: e.ispay,
            is_sns_card: e.is_sns_card,
            show_all_card: e.show_all_card,
            view_mode: window.view_mode
        })), n = $(".frm_tab").height();
        $(".js_is_friend_type_1 .js_card_type", i).checkbox({
            onChanged: function (e) {
                t.card_type1 = $(e).val();
                var s = $(e).attr("data-not_has_condition");
                t.has_condition = 1 == s ? !1 : !0;
                var o = $(".frm_tab .selected", i).index(), _ = 0 - o * n;
                $(".tab_items", i).css("top", _);
            }
        }), $(".js_is_friend_type_2 .js_card_type", i).checkbox({
            onChanged: function (e) {
                t.card_type2 = $(e).val();
                var i = $(e).attr("data-not_has_condition");
                t.has_condition = 1 == i ? !1 : !0;
            }
        }), i.find(".js_is_friend").checkbox({
            onChanged: function (e) {
                $(".js_is_friend_type", i).hide(), $(".js_is_friend_type_" + $(e).val(), i).show(), 1 == $(e).val() ? (t.is_friend = !0,
                    setTimeout(function () {
                        n = $(".frm_tab", i).height();
                        var e = $(".js_is_friend_type_1 .frm_radio_label", i).length;
                        $(".choose_card_type,.frm_tab_item", i).css("height", n), $(".tab_items", i).css("height", n * e);
                    })) : t.is_friend = !1, $(".js_is_friend_type_" + $(e).val(), i).find(".js_card_type:checked").click(),
                    t.$popup.popup("resetPosition");
            }
        }), "undefined" != typeof c && _(e, t, i);
    }

    function n(e, i) {
        var n = $(m()).popup({
            title: "创建优惠券",
            autoShow: !1,
            width: 956,
            buttons: [{
                text: "取消",
                type: "default",
                click: function () {
                    this.hide();
                }
            }, {
                text: "下一步",
                type: "primary",
                click: function () {
                    var e = i.merchantSelector.selectedValue();
                    e && (i.merchant_data = e, o(i));
                }
            }, {
                text: "上一步",
                type: "default",
                click: function () {
                    s(i);
                }
            }, {
                text: "确定",
                type: "primary",
                click: function () {
                    return i.is_friend && "undefined" == typeof c ? !0 : (i.is_friend && !t(i.merchant_data) && (p.show({
                        msg: '本公众号子商户类目不支持制作朋友的券|<a href="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#1dot1" target="_blank">查看朋友的券类目开放范围</a>',
                        type: "info",
                        buttons: [{
                            text: "取消",
                            click: function (e) {
                                this.remove(e);
                            },
                            type: "normal"
                        }, {
                            text: "配置子商户",
                            click: function (e) {
                                window.open(wx.url("/merchant/cardhelpmakesend?action=list")), this.remove(e);
                            },
                            type: "primary"
                        }]
                    }), this.hide()), i.is_friend && i.card_type1 || !i.is_friend && i.card_type2 ? (window.open(wx.url("/merchant/electroniccardmgr?action=%s&type=%s&flag=%s&is_sns_card=%s&has_condition=%s%s".sprintf(i.is_friend ? "addsnspage" : "addpage", i.is_friend ? i.card_type1 : i.card_type2, 1 == e.ispay ? 1 : "0", i.is_friend ? 1 : "0", i.has_condition ? 1 : "0", i.merchant_data ? "&sub_merchant_id=" + i.merchant_data.Id : ""))),
                        void this.hide()) : void d.err("请选择卡券类型"));
                }
            }],
            onHide: function () {
                e.onHide && e.onHide.call(i), this.remove();
            },
            className: "align_edge"
        });
        i.$popup = n, i.step = new l({
            container: n.find(".js_step_container"),
            names: ["1 选择代制的子商户", "2 选择券类型"]
        }), i.$popup.popup("show");
        var _ = n.popup("get").find(".js_step_content");
        i.opt.step2container = _[1], i.opt.container = $(_[0]).find(".js_sub_merchant_list");
    }

    function s(e) {
        var t = e.$popup, i = t.popup("get").find(".js_step_content"), n = t.popup("get").find(".js_btn_p");
        $(n[0]).show(), $(n[1]).show(), $(n[2]).hide(), $(n[3]).hide(), e.step.go(1), $(i[0]).show(),
            $(i[1]).hide(), t.popup("resetPosition");
    }

    function o(e) {
        var t = e.$popup, n = t.popup("get").find(".js_step_content"), s = t.popup("get").find(".js_btn_p");
        $(s[0]).hide(), $(s[1]).hide(), $(s[2]).show(), $(s[3]).show(), $(n[0]).hide(), $(n[1]).show(),
            e.step.go(2), e.opt.merchant_data = e.merchant_data, i(e.opt, e), t.popup("resetPosition");
    }

    function _(e, i, n) {
        $(".js_is_friend_tips", n).hide(), !t(i.merchant_data) && e.show_all_card ? ($(n.find(".js_is_friend")[1]).click(),
            $(n.find(".js_is_friend")[0]).checkbox().disabled(!0), $(".js_is_friend_view_mode" + (window.view_mode || 1) + "_tips", n).show()) : ($(n.find(".js_is_friend")[0]).checkbox().disabled(!1),
            $(n.find(".js_is_friend")[0]).click(), $(".js_is_friend_support_tips", n).show());
    }

    function a(e) {
        var t = this;
        this.opt = e, n(e, t);
        var i = t.$popup.popup("get");
        if (1 == window.view_mode) {
            o(t);
            var i = t.$popup.popup("get");
            i.find(".js_step_container").hide();
            var a = i.find(".js_btn_p");
            $(a[2]).hide();
        } else s(t);
        var d = {
            resetPosition: function () {
                t.$popup.popup("resetPosition");
            },
            getDataComplete: function (e) {
                var i = t.$popup.popup("get");
                e && e.length ? $(i.find(".js_btn_p")[0]).removeClass("btn_disabled") : $(i.find(".js_btn_p")[0]).addClass("btn_disabled");
            },
            container: e.container,
            is_sns_card: !1,
            max_card: e.max_card
        };
        t.merchantSelector = new r(d), "undefined" == typeof c && h.check_assist_brand_name_type(function (n) {
            c = n, _(e, t, i);
        });
    }

    var c, d = (e("biz_web/ui/checkbox.js"), e("common/wx/Tips.js")), p = (e("common/wx/popup.js"),
            e("common/wx/dialog.js")), r = e("cardticket/select_sub_merchant_table.js"), h = e("cardticket/common_template_helper.js"), f = template.compile(e("tpl/cardticket/choose_card_type.html.js")),
        m = template.compile('<div>			<div class="wrp_processor js_step_container"></div>			<div class="first_step js_step_content js_step1">				<div class="js_sub_merchant_list select_subshop"></div>			</div>			<div class="second_step js_step_content js_step2"></div>			</div>'),
        l = e("common/wx/Step.js");
    return window.view_mode || (window.view_mode = 1), a;
});
define("cardticket/common_template_helper.js", ["common/wx/upload.js", "common/wx/Cgi.js", "biz_common/moment.js", "cardticket/add/msg_operate_type_html.js"], function (e) {
    "use strict";

    function t(e) {
        for (var t, r, n, a, i = [], _ = 0; _ < e.length; _++) {
            var s = e[_];
            "object" == typeof s && (s = d[s.type]), a = h[s], s ? _ == e.length - 1 ? n && s - n != 1 ? (i.push(t + (r ? "至" + r : "")),
                i.push(a)) : i.push(t ? t + "至" + a : a) : n && s - n != 1 ? (i.push(t + (r ? "至" + r : "")), t = a, r = "", n = s) : (t ? r = a : t = a,
                n = s) : (s = 8, _ == e.length - 1 && t && i.push(t + "至" + r), i.push(a), t = r = n = "");
        }
        return i.join("、");
    }

    function r(e) {
        return e.replace(/\r\n|\\n|\n/g, "<br/>");
    }

    function n(e) {
        var t = "YYYY-MM-DD HH:mm:ss", r = l(e, t);
        return r ? r.format("YYYY-MM-DD") : "";
    }

    function a(e) {
        return 1 == e || 3 == e || 2 == e;
    }

    function i(e, t) {
        return 1 == e && 119 >= t ? !0 : (2 != e || 215 != t && 210 != t && 208 != t && 207 != t && 206 != t && 204 != t && 203 != t && 211 != t && 201 != t && 202 != t) && (3 != e || 308 != t && 309 != t && 306 != t && 305 != t && 304 != t && 303 != t && 314 != t && 316 != t && 317 != t) && (6 != e || 601 != t && 602 != t && 603 != t) ? 4 == e && 402 == t ? !0 : 7 == e && 701 == t ? !0 : (5 != e || 501 != t && 502 != t && 503 != t) && (8 != e || 812 != t && 811 != t && 808 != t && 817 != t && 818 != t && 827 != t && 804 != t && 803 != t && 802 != t && 801 != t && 824 != t && 822 != t && 823 != t && 821 != t && 828 != t && 814 != t && 825 != t && 826 != t && 809 != t && 807 != t && 816 != t && 819 != t && 813 != t) ? !1 : !0 : !0;
    }

    function _(e) {
        for (var t = 0; t < M.length; t++) {
            var r = M[t];
            "function" != typeof r && (r = $.noop), r(e);
        }
        M = [];
    }

    function s(e) {
        return M.push(e), "undefined" != typeof I ? (_(I), !0) : U ? !1 : (U = !0, u.get({
            url: "/merchant/cardhelpmakesend",
            data: {
                action: "list",
                begin: 0,
                count: 9999999,
                status_list: 1
            },
            complete: function () {
                U = !1;
            }
        }, function (e) {
            if (0 == e.base_resp.ret || -1 == e.base_resp.ret) {
                for (var t = $.parseJSON(e.bind_list), r = t.List, n = !1, a = !1, s = 0; s < r.length; s++) {
                    var p = r[s];
                    if (i(p.PrimaryCategoryId, p.SecondaryCategoryId)) {
                        a = !0;
                        break;
                    }
                }
                e.attr && e.attr.merchant_info && (n = i(e.attr.merchant_info.primary_category_id, e.attr.merchant_info.secondary_category_id)),
                n && a && (I = 1), n && !a && (I = 2), !n && a && (I = 3), n || a || (I = 4), 4 == I && e.is_can_use_sns_card && !e.is_can_use_help_make_and_send && (I = 5),
                    _(I);
            }
        }), !1);
    }

    function p(e, t) {
        var r = !1;
        e.create_time && e.create_time < 1463648400 && (r = !0), "undefined" == typeof t && (t = !0);
        var n = "", a = !1;
        return 4 == e.type || 2 == e.type ? (t && e.reduce_cost && (n = "价值%s元代金券一张".sprintf(e.reduce_cost)),
            r ? n : (e.use_condition_least_cost ? (n && (n += "，"), n += "消费满%s元可用".sprintf(e.use_condition_least_cost)) : 4 != e.type || "1" != e.is_sns_card && e.is_sns_card !== !0 || (n && (n += "；"),
                n += "无最低消费限制"), e.accept_category && (n && (n += "；"), n += "适用于%s".sprintf(e.accept_category),
                a = !0), e.reject_category && (n && (n += "；"), n += "不适用于%s".sprintf(e.reject_category), a = !0),
            "1" != e.is_sns_card && e.is_sns_card !== !0 || 4 != e.type || a || (n && (n += "；"), n += "全场通用，不限品类"),
                !(4 != e.type || "1" != e.is_sns_card && e.is_sns_card !== !0 || e.has_condition || "0" != e.uncheckcount && !e.id),
                n)) : 3 == e.type ? (t && (e.title || e.gift_title) && (n = "%s%s%s%s".sprintf("1" == e.is_sns_card || e.is_sns_card === !0 ? "兑换" : "", e.gift_title || e.title, e.gift_num || "", e.gift_unit || "")),
            r ? n : (2 == e.use_condition_least_cost_type && e.object_use_for && (n && (n += "；"), n += "购买%s可用".sprintf(e.object_use_for),
                a = !0), 1 == e.use_condition_least_cost_type && e.use_condition_least_cost && (n && (n += "，"),
                n += "消费满%s元可用".sprintf(e.use_condition_least_cost), a = !0), "1" != e.is_sns_card && e.is_sns_card !== !0 || a || (n && (n += "；"),
                n += "无最低消费限制"), n)) : void 0;
    }

    function o(e) {
        if (!e.begin_time || !e.end_time) return "";
        var t = "YYYY.MM.DD";
        return l.unix(e.begin_time).format(t) + "-" + l.unix(e.end_time).format(t);
    }

    var c = e("common/wx/upload.js"), u = e("common/wx/Cgi.js"), l = e("biz_common/moment.js"), m = {
        10: "会员卡",
        21: "门票",
        22: "电影票",
        4: "代金券",
        1: "团购券",
        2: "折扣券",
        3: "兑换券",
        0: "优惠券"
    }, f = {
        1: "审核中",
        2: "未通过",
        3: "待投放",
        4: "已删除",
        5: "待投放",
        6: "已投放",
        8: "已过期",
        7: "违规下架"
    }, d = {
        MONDAY: "1",
        TUESDAY: "2",
        WEDNESDAY: "3",
        THURSDAY: "4",
        FRIDAY: "5",
        SATURDAY: "6",
        SUNDAY: "7"
    };
    template.helper("$has_day", function (e, t) {
        if (!e) return "";
        for (var r = 0; r < e.length; r++) {
            var n = d[e[r].type];
            if (n || (n = 8), n == t) return "checked";
        }
        return "";
    });
    var h = {
        1: "周一",
        2: "周二",
        3: "周三",
        4: "周四",
        5: "周五",
        6: "周六",
        7: "周日",
        8: "节假日"
    };
    template.helper("convert_time_limit", function (e) {
        return t(e);
    });
    var v = {
        1: "免费WIFI",
        2: "可带宠物",
        4: "免费停车",
        8: "可外卖"
    };
    template.helper("convert_business_service", function (e) {
        if (!e) return "无";
        var t = [];
        for (var r in v) {
            var n = parseInt(r);
            (e & n) > 0 && t.push(v[r]);
        }
        return t.join("&nbsp;&nbsp;");
    });
    var l = e("biz_common/moment.js");
    template.helper("convert_state", function (e) {
        return f[e] || e;
    }), template.helper("convert_type", function (e) {
        return m[e] || e;
    }), template.helper("card_type_map", function (e) {
        return e;
    }), template.helper("unixFormat", function (e, t) {
        return t && (t = t.replace(",", " ")), l.unix(e).format(t);
    }), template.helper("validtime", function (e, t) {
        if (1 == e.time_type) {
            var r = l.unix(e.begin_time).format(t) + "至" + l.unix(e.end_time).format(t);
            return e.end_time < l().unix() && (r += "(已过期)"), r;
        }
        return 2 == e.time_type ? 0 == e.from_day ? "领取后当天生效%s天有效".sprintf(e.fixed_term) : "领取后%s天生效%s天有效".sprintf(e.from_day, e.fixed_term) : "";
    }), template.helper("addtoken", function (e) {
        return wx.url(e);
    }), template.helper("nl2br", function (e) {
        return r(e.html(!0));
    });
    var g = {
        1: "50万以下",
        2: "50-100万",
        3: "100-500万",
        4: "500-1000万",
        5: "1000万以上"
    };
    template.helper("convert_business_volume_type", function (e) {
        return g[e] || e;
    });
    var y = {
        0: "已提交",
        2: "已提交",
        3: "生效",
        4: "不通过"
    };
    template.helper("convert_store_state", function (e) {
        return y[e] || e;
    }), template.helper("$preview", function (e) {
        if (!e) return "无";
        var t;
        return 0 === e.indexOf("temp_") ? (e = e.replace(/^temp_/, ""), t = c.tmpFileUrl(e)) : t = c.multimediaFileUrl(e),
            "<a href='%s' target='_blank'><img src='%s' /></a>".sprintf(t, t);
    }), template.helper("$upload_preview", function (e) {
        if (!e) return "";
        var t;
        return 0 === e.indexOf("temp_") ? (e = e.replace(/^temp_/, ""), t = c.tmpFileUrl(e)) : t = c.multimediaFileUrl(e),
            "<img src='%s' style='width:260px;' />".sprintf(t);
    }), template.helper("$preview_stuffs", function (e) {
        for (var t = [], r = e.stuffs, n = 0; n < r.length; n++) {
            var a = r[n] + "_preview_tpl";
            $("#" + a).length && t.push(template.render(a, e));
        }
        return t.join("");
    });
    var x = {
        2: "女",
        1: "男"
    };
    template.helper("convert_gender", function (e) {
        return x[e] || "未知";
    }), template.helper("percentage", function (e, t, r, n) {
        var r = e / t * 100;
        return n && r > n && (r = n), r.toFixed(2);
    });
    var b = {
        "": "全部",
        0: "API渠道",
        1: "嵌入图文消息",
        2: "直接群发卡券",
        3: "下载二维码"
    };
    template.helper("convert_channel", function (e) {
        return b[e] || e;
    }), template.helper("convert_provide_time", n), template.helper("http2https", function (e) {
        return e ? (e + "").http2https() : "";
    }), template.helper("https2http", function (e) {
        return e ? (e + "").https2http() : "";
    }), template.helper("codepad", function (e) {
        var t = new RegExp("([^s]{4})(?=([^s])+$)", "ig");
        return e.replace(t, "$1-");
    }), template.helper("yuan", function (e) {
        if (!e) return "--";
        var e = e / 100;
        return e.toFixed(2);
    }), template.helper("is_paycard", function () {
        return window.wx_is_paycard;
    });
    var w = {
        0: "等待接收",
        1: "已接收",
        3: "过期退回",
        2: "已拒绝"
    }, j = {
        0: "等待接收",
        2: "已拒绝",
        1: "已接收",
        3: "过期退回"
    };
    template.helper("convert_intercard_status", function (e) {
        return w[e] || e;
    }), template.helper("convert_intercard_rec_status", function (e) {
        return j[e] || e;
    });
    var Y = {
        0: "无",
        1: "图文消息",
        2: "卡券货架",
        3: "小店货架",
        4: "网页链接",
        5: "卡券"
    };
    template.helper("convert_msg_operate_type", function (e) {
        return Y[e] || "无";
    });
    var k = e("cardticket/add/msg_operate_type_html.js"), u = e("common/wx/Cgi.js");
    template.helper("msg_operate_content", function (e) {
        return 5 === e._type ? "" : e._notexist ? "无" : template.compile(k[e._type])({
            msg_operation: e
        }) || "";
    });
    var D = {
        CHECKING: "审核中",
        APPROVED: "已通过",
        REJECTED: "未通过",
        EXPIRED: "已过期"
    };
    template.helper("convert_sub_merchant_status", function (e) {
        return D[e] || e;
    }), template.helper("$is_can_use_help_make_and_send", function () {
        return 1 == window.wx_is_can_use_help_make_and_send;
    }), template.helper("wx_url", function (e) {
        return wx.url(e);
    });
    var A = {
        ".*?_4": "激活"
    };
    template.helper("convert_use_source", function (e, t) {
        var r = e + "_" + t;
        return 4 == t ? "激活" : 1 == t || 6 == t || 7 == t ? "自助买单" : 5 == t ? "自助核销" : 2 == t ? "收款" : 3 == e ? "手机核销" : 1 == e ? "网页核销" : 2 == e ? "API核销" : 3 == t ? "积分变更" : A[r] || "";
    }), template.helper("convert_fee_coin", function (e, t) {
        return 0 == t ? "--" : a(e) ? '<span class="number_add">+%s</span>'.sprintf(t / 100) : '<span class="number_degress">-%s</span>'.sprintf(t / 100);
    });
    var E = {
        1: "平台赠送",
        2: "充值",
        3: "退还券点",
        4: "支出",
        5: "平台扣减"
    };
    template.helper("convert_fee_order_type", function (e) {
        return E[e] || e;
    });
    var F = {
        2: {
            1: "等待确认",
            2: "充值成功",
            3: "充值成功",
            8: "充值成功"
        },
        3: "已退券点",
        4: {
            1: "等待确认",
            3: "库存发放中",
            4: "库存已发放",
            7: "库存添加失败, 已返还券点",
            6: "库存已发放",
            5: "库存已发放"
        }
    };
    template.helper("convert_fee_order_status", function (e, t) {
        var r = F[t];
        return r ? "string" == typeof r ? r : r[e] || e : e;
    }), template.helper("addhttp", function (e) {
        return /^http:\/\//.test(e) ? e : "http://" + e;
    });
    var I, C = [], U = !1, M = [];
    template.helper("$fix_abstract4friendcard", function (e, t) {
        return p(e, t);
    }), template.helper("$gen_use_time", function (e) {
        return o(e);
    });
    var R = {
        0: "生效",
        1: "已使用",
        2: "过期",
        3: "转赠中",
        4: "已转赠",
        5: "转赠过期",
        6: "已删除"
    };
    template.helper("convert_user_card_state", function (e) {
        return R[e] || e;
    });
    var S = {
        0: "审核通过",
        1: "待商户审核",
        2: "审核不通过",
        3: "待激活",
        4: "请添加库存"
    };
    return template.helper("convert_swipe_card_status", function (e) {
        return S[e] || e;
    }), {
        type_map: m,
        status_map: f,
        store_status: y,
        gender_map: x,
        source_map: b,
        convert_provide_time: n,
        nl2br: r,
        sub_merchant_status_map: D,
        fix_money: function (e) {
            var t = /(\.\d{2}).+$/, r = e;
            return r = parseFloat((r + "").replace(t, "$1"));
        },
        parse_assistsend_quota: function (e, t) {
            for (var r = 0, n = 0, a = 0; a < e.length; a++) {
                var i = e[a];
                i.quota_name == (t || "merchant_auth_create_card") && (r = i.value), i.quota_name == (t ? t + "_max_sku" : "merchant_auth_create_card_max_sku") && (n = i.value);
            }
            return {
                max_card: r,
                max_sku: n
            };
        },
        check_friend_card_word: function (e, t) {
            if (!e) return !0;
            for (var r = 0; r < C.length; r++) if (e.indexOf(C[r]) >= 0) return t ? t() : !0;
            return !0;
        },
        check_assist_brand_name_type: s,
        can_category_use_sns_card: i,
        fix_abstract4friendcard: p,
        strlen: function (e) {
            for (var t = 0, r = 0; r < e.length; r++) {
                var n = e.charCodeAt(r);
                128 > n ? t++ : t += 2;
            }
            return t;
        },
        gen_use_time: o,
        gen_time_limit: t
    };
});
define("cardticket/store_cgi.js", ["common/wx/Cgi.js", "common/wx/Tips.js", "common/wx/tooltips.js", "common/wx/tooltipsManager.js", "common/wx/dialog.js"], function (t) {
    "use strict";
    var e = t("common/wx/Cgi.js"), s = t("common/wx/Tips.js"), o = t("common/wx/tooltips.js"), c = t("common/wx/tooltipsManager.js"), n = (t("common/wx/dialog.js"),
        {
            deleteStore: function (t) {
                e.post({
                    url: "/merchant/entityshop?action=delete",
                    data: {
                        id: t.store_id
                    },
                    btn: t.btn
                }, function (o) {
                    0 == o.base_resp.ret ? (s.suc("删除门店成功"), t.success && t.success()) : e.show(o);
                });
            },
            deleteWithConfirm: function (t) {
                if (3 == t.state || 4 == t.state) {
                    var e = new o({
                        container: t.container,
                        content: "删除将影响在用此门店的卡券功能、微信连Wi-Fi、摇一摇周边、LBS广告等相关业务。<br />你确定要删除吗？",
                        type: "click",
                        buttons: [{
                            text: "确定",
                            type: "btn_primary",
                            click: function () {
                                if (t.success) {
                                    var e = t.success;
                                    t.success = function () {
                                        e && e(), c.removeAll();
                                    };
                                }
                                n.deleteStore(t);
                            }
                        }, {
                            text: "取消",
                            type: "btn_default",
                            click: function () {
                                c.removeAll();
                            }
                        }]
                    });
                    e.show(), c.removeAll(), c.add(e);
                }
            },
            listStore: function (t) {
                var s = $.extend({}, {
                    action: "list",
                    begin: 0,
                    count: 9999999,
                    keyword: t.keyword,
                    task_id: t.task_id,
                    audit_state: t.audit_state || 3
                }, t.getDataExtra);
                e.get({
                    url: "/merchant/entityshop",
                    data: s
                }, function (s) {
                    var o, c = s ? 1 * s.base_resp.ret : -1;
                    if (0 === c) {
                        var n = $.parseJSON(s.data);
                        o = {
                            shop_list: n.store_location,
                            total_num: s.total_count,
                            is_from_wxapoi: "true" === s.is_from_wxapoi
                        };
                    } else {
                        if (-7 !== c && 200007 !== c) return void e.show(s);
                        o = {
                            shop_list: [],
                            total_num: 0,
                            access_deny: !0
                        };
                    }
                    t.success && t.success(o), wx.cgiData && !wx.cgiData._store_data && (wx.cgiData._store_data = o);
                });
            },
            canSendCard: function (t) {
                t.success && t.success(!0);
            }
        });
    return n;
});
define("tpl/media/preview/chat.html.js", [], function () {
    return '<div class="wx_phone_hd">\n	微信团队</div>\n<div class="wx_phone_bd wx_phone_preview_chat_wrp">\n    {each list as item index}\n    <div class="wx_phone_preview_chat">\n        <img class="chat_user_avatar" src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_avatar_wechat.jpg">\n        <div class="chat_content">\n            <div class="chat_appmsg_msg jsPhoneViewCard" data-index="{index}">\n                <div class="chat_appmsg_title" title="{item.title}">{item.title}</div>\n                <div class="chat_appmsg_content">\n                    <img class="chat_appmsg_thumb" src="{item.img||item.avatar}">\n                    <div class="chat_appmsg_desc" title="{item.digest}">{item.digest}</div>\n                </div>\n                <span class="chat_arrow_wrp">\n                    <i class="chat_arrow arrow_out"></i>\n                    <i class="chat_arrow arrow_in"></i>\n                </span>\n            </div>\n        </div>\n    </div>\n    {/each}\n</div>\n<!--pulgin-->\n<div>\n    <ul class="wx_view_list">\n        <li class="wx_view_item jsPhoneViewLink" data-id="card">图文消息</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="appmsg">消息正文</li>\n        <li class="wx_view_item jsPhoneViewLink " data-id="moments">分享到朋友圈</li>\n        <li class="wx_view_item jsPhoneViewLink selected" data-id="chat">发送给朋友</li>\n    </ul>\n    <div class="btn_wx_phone_preview_wrp">\n        <a class="btn btn_default btn_wx_phone_preview jsPhoneViewPub">发送到手机预览</a>\n    </div>\n</div>\n\n\n\n\n\n';
});
define("tpl/media/preview/moments.html.js", [], function () {
    return '<div class="wx_phone_hd">\n    朋友圈</div>\n<div class="wx_phone_bd">\n    {each list as item index}\n    <div class="wx_phone_preview_moments">\n        <img class="moments_user_avatar" src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_avatar_wechat.jpg" alt="">\n        <div class="moments_content_wrp">\n            <p class="moments_nickname">微信团队</p>\n            <div class="moments_content jsPhoneViewCard" data-index="{index}">\n                <img class="moments_appmsg_thumb" src="{item.img||item.avatar}">\n                <div class="moments_appmsg_title" title="{item.title}">{item.title}</div>\n            </div>\n        </div>\n    </div>\n    {/each}\n</div>\n<!--pulgin-->\n<div>\n    <ul class="wx_view_list">\n        <li class="wx_view_item jsPhoneViewLink" data-id="card">图文消息</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="appmsg">消息正文</li>\n        <li class="wx_view_item jsPhoneViewLink selected" data-id="moments">分享到朋友圈</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="chat">发送给朋友</li>\n    </ul>\n    <div class="btn_wx_phone_preview_wrp">\n        <a class="btn btn_default btn_wx_phone_preview jsPhoneViewPub">发送到手机预览</a>\n    </div>\n</div>\n\n\n';
});