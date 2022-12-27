define("tpl/media/dialog/image_crop.html.js", [], function () {
    return '<!-- 步骤条同级加个img_crop_panel把两个步骤的内容都包起来 -->\n<div class="img_crop_area group">\n    <div class="img_crop_origin_area">\n        <div class="img_crop_hd">\n            <h4 class="img_crop_title">原图</h4>\n        </div>\n        <div class="img_crop_wrp">\n            <img class="img_crop_origin" src="{url}">\n        </div>\n    </div>\n    <div class="img_crop_edit_area">\n        <div class="img_crop_hd">\n            <h4 class="img_crop_title">封面展示区域</h4>\n            <p class="tips_global img_crop_tips">{tips}</p>\n        </div>\n        <div class="js_crop_wrp img_crop_wrp">\n            <img src="{url}">\n        </div>\n    </div>\n</div>\n\n';
});
define("common/wx/mpEditor/common/cropImgCgi.js", ["common/wx/Cgi.js"], function (o) {
    "use strict";

    function r(o) {
        n.post({
            url: "/cgi-bin/cropimage?",
            data: {
                imgurl: o.imgurl,
                x1: o.x1,
                y1: o.y1,
                x2: o.x2,
                y2: o.y2
            }
        }, {
            done: function (r) {
                r && r.base_resp && 0 == r.base_resp.ret && r.imgurl ? "function" == typeof o.onsuccess && o.onsuccess({
                    oriUrl: o.imgurl,
                    url: r.imgurl,
                    file_id: r.file_id || ""
                }) : "function" == typeof o.onerror && o.onerror(r || {});
            },
            fail: function () {
                "function" == typeof o.onerror && o.onerror({
                    retcode: -2
                });
            }
        });
    }

    var n = o("common/wx/Cgi.js");
    return {
        getUrl: r
    };
});
define("common/lib/jquery.Jcrop.js", ["jquery.Jcrop.min.css"], function (e) {
    e("jquery.Jcrop.min.css"), function (e) {
        e.Jcrop = function (t, n) {
            function o(e) {
                return Math.round(e) + "px";
            }

            function r(e) {
                return R.baseClass + "-" + e;
            }

            function a() {
                return e.fx.step.hasOwnProperty("backgroundColor");
            }

            function i(t) {
                var n = e(t).offset();
                return [n.left, n.top];
            }

            function s(e) {
                return [e.pageX - A[0] + R.offsetX, e.pageY - A[1] + R.offsetY];
            }

            function c(t) {
                "object" != typeof t && (t = {}), R = e.extend(R, t), e.each(["onChange", "onSelect", "onRelease", "onDblClick"], function (e, t) {
                    "function" != typeof R[t] && (R[t] = function () {
                    });
                });
            }

            function u(e, t, n) {
                if (A = i(N), Ct.setCursor("move" === e ? e : e + "-resize"), "move" === e) return Ct.activateHandlers(l(t), b, n);
                var o = yt.getFixed(), r = f(e), a = yt.getCorner(f(r));
                yt.setPressed(yt.getCorner(r)), yt.setCurrent(a), Ct.activateHandlers(d(e, o), b, n);
            }

            function d(e, t) {
                return function (n) {
                    if (R.aspectRatio) switch (e) {
                        case"e":
                            n[1] = t.y + 1;
                            break;

                        case"w":
                            n[1] = t.y + 1;
                            break;

                        case"n":
                            n[0] = t.x + 1;
                            break;

                        case"s":
                            n[0] = t.x + 1;
                    } else switch (e) {
                        case"e":
                            n[1] = t.y2;
                            break;

                        case"w":
                            n[1] = t.y2;
                            break;

                        case"n":
                            n[0] = t.x2;
                            break;

                        case"s":
                            n[0] = t.x2;
                    }
                    yt.setCurrent(n), xt.update();
                };
            }

            function l(e) {
                var t = e;
                return St.watchKeys(), function (e) {
                    yt.moveOffset([e[0] - t[0], e[1] - t[1]]), t = e, xt.update();
                };
            }

            function f(e) {
                switch (e) {
                    case"n":
                        return "sw";

                    case"s":
                        return "nw";

                    case"e":
                        return "nw";

                    case"w":
                        return "ne";

                    case"ne":
                        return "sw";

                    case"nw":
                        return "se";

                    case"se":
                        return "nw";

                    case"sw":
                        return "ne";
                }
            }

            function h(e) {
                return function (t) {
                    return R.disabled ? !1 : "move" !== e || R.allowMove ? (A = i(N), lt = !0, u(e, s(t)), t.stopPropagation(),
                        t.preventDefault(), !1) : !1;
                };
            }

            function p(e, t) {
                var n = e.width(), o = e.height();
                n = t, o = t / e.width() * e.height(), ut = e.width() / n, dt = e.height() / o, e.width(n).height(o);
            }

            function g(e) {
                return {
                    x: e.x * ut,
                    y: e.y * dt,
                    x2: e.x2 * ut,
                    y2: e.y2 * dt,
                    w: e.w * ut,
                    h: e.h * dt
                };
            }

            function b() {
                var e = yt.getFixed();
                e.w > R.minSelect[0] && e.h > R.minSelect[1] ? (xt.enableHandles(), xt.done()) : xt.release(),
                    Ct.setCursor(R.allowSelect ? "crosshair" : "default");
            }

            function w(e) {
                if (R.disabled) return !1;
                if (!R.allowSelect) return !1;
                lt = !0, A = i(N), xt.disableHandles(), Ct.setCursor("crosshair");
                var t = s(e);
                return yt.setPressed(t), xt.update(), Ct.activateHandlers(v, b, "touch" === e.type.substring(0, 5)),
                    St.watchKeys(), e.stopPropagation(), e.preventDefault(), !1;
            }

            function v(e) {
                yt.setCurrent(e), xt.update();
            }

            function y() {
                var t = e("<div></div>").addClass(r("tracker"));
                return K && t.css({
                    opacity: 0,
                    backgroundColor: "white"
                }), t;
            }

            function m(e) {
                et.removeClass().addClass(r("holder")).addClass(e);
            }

            function x(e, t) {
                function n() {
                    window.setTimeout(v, l);
                }

                var o = e[0] / ut, r = e[1] / dt, a = e[2] / ut, i = e[3] / dt;
                if (!ft) {
                    var s = yt.flipCoords(o, r, a, i), c = yt.getFixed(), u = [c.x, c.y, c.x2, c.y2], d = u, l = R.animationDelay, f = s[0] - u[0], h = s[1] - u[1], p = s[2] - u[2], g = s[3] - u[3], b = 0, w = R.swingSpeed;
                    o = d[0], r = d[1], a = d[2], i = d[3], xt.animMode(!0);
                    var v = function () {
                        return function () {
                            b += (100 - b) / w, d[0] = Math.round(o + b / 100 * f), d[1] = Math.round(r + b / 100 * h), d[2] = Math.round(a + b / 100 * p),
                                d[3] = Math.round(i + b / 100 * g), b >= 99.8 && (b = 100), 100 > b ? (S(d), n()) : (xt.done(), xt.animMode(!1),
                            "function" == typeof t && t.call(kt));
                        };
                    }();
                    n();
                }
            }

            function C(e) {
                S([e[0] / ut, e[1] / dt, e[2] / ut, e[3] / dt]), R.onSelect.call(kt, g(yt.getFixed())), xt.enableHandles();
            }

            function S(e) {
                yt.setPressed([e[0], e[1]]), yt.setCurrent([e[2], e[3]]), xt.update();
            }

            function k() {
                var e = yt.getFixed();
                return g({
                    x: e.x - R.offsetX,
                    y: e.y - R.offsetY,
                    x2: e.x2 - R.offsetX,
                    y2: e.y2 - R.offsetY,
                    w: e.w,
                    h: e.h
                });
            }

            function M() {
                var e = yt.getFixed();
                return {
                    x: e.x - R.offsetX,
                    y: e.y - R.offsetY,
                    x2: e.x2 - R.offsetX,
                    y2: e.y2 - R.offsetY,
                    w: e.w,
                    h: e.h
                };
            }

            function z(e, t) {
                c(e), t !== !0 && X();
            }

            function O() {
                R.disabled = !0, xt.disableHandles(), xt.setCursor("default"), Ct.setCursor("default");
            }

            function j() {
                R.disabled = !1, X();
            }

            function B() {
                xt.done(), Ct.activateHandlers(null, null);
            }

            function F() {
                et.remove(), W.show(), W.css("visibility", "visible"), e(t).removeData("Jcrop");
            }

            function H() {
                return {
                    w: N.width(),
                    h: N.height()
                };
            }

            function I() {
                var e = H(), t = e.w, n = e.h, o = R.offsetX, r = R.offsetY, a = o + t, i = r + n;
                U = o, Z = r, $ = a, _ = i, R.maxBound && 4 == R.maxBound.length && (U = Math.max(U, R.maxBound[0]), Z = Math.max(Z, R.maxBound[1]),
                    $ = Math.min($, R.maxBound[2]), _ = Math.min(_, R.maxBound[3]));
            }

            function P(e) {
                R.offsetX = e.offsetX, R.offsetY = e.offsetY, I();
            }

            function D(e) {
                ut = e.xscale, dt = e.yscale, I(), yt.setPressed([e.selectionPos[0], e.selectionPos[1]]),
                    yt.setCurrent([e.selectionPos[2], e.selectionPos[3]]), X();
            }

            function J(e, t) {
                xt.release(), O();
                var n = new Image;
                n.onload = function () {
                    var o = n.width, r = n.height, a = R.boxWidth, i = R.boxHeight;
                    N.width(o).height(r), N.attr("src", e), tt.attr("src", e), p(N, a, i);
                    var s = N.width(), c = N.height();
                    tt.width(s).height(c), gt.width(s + 2 * pt).height(c + 2 * pt), et.width(s).height(c), I(),
                        mt.resize(s, c), j(), "function" == typeof t && t.call(kt);
                }, n.src = e;
            }

            function Y(e, t, n) {
                var o = t || R.bgColor;
                R.bgFade && a() && R.fadeTime && !n ? e.animate({
                    backgroundColor: o
                }, {
                    queue: !1,
                    duration: R.fadeTime
                }) : e.css("backgroundColor", o);
            }

            function X(e) {
                if (R.allowResize ? e ? xt.enableOnly() : xt.enableHandles() : xt.disableHandles(), Ct.setCursor(R.allowSelect ? "crosshair" : "default"),
                    xt.setCursor(R.allowMove ? "move" : "default"), R.hasOwnProperty("trueSize")) {
                    var t = H();
                    ut = R.trueSize[0] / t.w, dt = R.trueSize[1] / t.h;
                }
                R.hasOwnProperty("setSelect") && (C(R.setSelect), xt.done(), delete R.setSelect), mt.refresh(),
                R.bgColor != bt && (Y(R.shade ? mt.getShades() : et, R.shade ? R.shadeColor || R.bgColor : R.bgColor),
                    bt = R.bgColor), wt != R.bgOpacity && (wt = R.bgOpacity, R.shade ? mt.refresh() : xt.setBgOpacity(wt)),
                    at = R.maxSize[0] || 0, it = R.maxSize[1] || 0, st = R.minSize[0] || 0, ct = R.minSize[1] || 0, R.hasOwnProperty("outerImage") && (N.attr("src", R.outerImage),
                    delete R.outerImage), xt.refresh();
            }

            var A, R = e.extend({}, e.Jcrop.defaults), T = navigator.userAgent.toLowerCase(), K = /msie/.test(T), q = /msie [1-6]\./.test(T);
            "object" != typeof t && (t = e(t)[0]), "object" != typeof n && (n = {}), c(n);
            var E = {
                border: "none",
                visibility: "visible",
                margin: 0,
                padding: 0,
                position: "absolute",
                top: 0,
                left: 0
            }, W = e(t), L = !0;
            if ("IMG" == t.tagName) {
                if (0 != W[0].width && 0 != W[0].height) W.width(W[0].width), W.height(W[0].height); else {
                    var G = new Image;
                    G.src = W[0].src, W.width(G.width), W.height(G.height);
                }
                var N = W.clone().removeAttr("id").css(E).show();
                N.width(W.width()), N.height(W.height()), W.after(N).hide();
            } else N = W.css(E).show(), L = !1, null === R.shade && (R.shade = !0);
            p(N, R.boxWidth, R.boxHeight);
            var V = N.width(), Q = N.height(), U = 0, Z = 0, $ = V + U, _ = Q + Z, et = e("<div />").width(V).height(Q).addClass(r("holder")).css({
                position: "relative",
                backgroundColor: R.bgColor
            }).insertAfter(W).append(N);
            I(), R.addClass && et.addClass(R.addClass);
            var tt = e("<div />"), nt = e("<div />").width("100%").height("100%").css({
                zIndex: 310,
                position: "absolute",
                overflow: "hidden"
            }), ot = e("<div />").width("100%").height("100%").css("zIndex", 320), rt = e("<div />").css({
                position: "absolute",
                zIndex: 600
            }).dblclick(function () {
                var e = yt.getFixed();
                R.onDblClick.call(kt, e);
            }).insertBefore(N).append(nt, ot);
            L && (tt = e("<img />").attr("src", N.attr("src")).css(E).width(V).height(Q), nt.append(tt)),
            q && rt.css({
                overflowY: "hidden"
            });
            var at, it, st, ct, ut, dt, lt, ft, ht, pt = R.boundary, gt = y().width(V + 2 * pt).height(Q + 2 * pt).css({
                position: "absolute",
                top: o(-pt),
                left: o(-pt),
                zIndex: 290
            }).mousedown(w), bt = R.bgColor, wt = R.bgOpacity;
            A = i(N);
            var vt = function () {
                function e() {
                    var e, t = {}, n = ["touchstart", "touchmove", "touchend"], o = document.createElement("div");
                    try {
                        for (e = 0; e < n.length; e++) {
                            var r = n[e];
                            r = "on" + r;
                            var a = r in o;
                            a || (o.setAttribute(r, "return;"), a = "function" == typeof o[r]), t[n[e]] = a;
                        }
                        return t.touchstart && t.touchend && t.touchmove;
                    } catch (i) {
                        return !1;
                    }
                }

                function t() {
                    return R.touchSupport === !0 || R.touchSupport === !1 ? R.touchSupport : e();
                }

                return {
                    createDragger: function (e) {
                        return function (t) {
                            return R.disabled ? !1 : "move" !== e || R.allowMove ? (A = i(N), lt = !0, u(e, s(vt.cfilter(t)), !0),
                                t.stopPropagation(), t.preventDefault(), !1) : !1;
                        };
                    },
                    newSelection: function (e) {
                        return w(vt.cfilter(e));
                    },
                    cfilter: function (e) {
                        return e.pageX = e.originalEvent.changedTouches[0].pageX, e.pageY = e.originalEvent.changedTouches[0].pageY,
                            e;
                    },
                    isSupported: e,
                    support: t()
                };
            }(), yt = function () {
                function e(e) {
                    e = i(e), p = f = e[0], g = h = e[1];
                }

                function t(e) {
                    e = i(e), d = e[0] - p, l = e[1] - g, p = e[0], g = e[1];
                }

                function n() {
                    return [d, l];
                }

                function o(e) {
                    var t = e[0], n = e[1];
                    U > f + t && (t = U - f), Z > h + n && (n = Z - h), g + n > _ && (n = _ - g), p + t > $ && (t = $ - p), f += t, p += t, h += n, g += n;
                }

                function r(e) {
                    var t = a();
                    switch (e) {
                        case"ne":
                            return [t.x2, t.y];

                        case"nw":
                            return [t.x, t.y];

                        case"se":
                            return [t.x2, t.y2];

                        case"sw":
                            return [t.x, t.y2];
                    }
                }

                function a() {
                    if (!R.aspectRatio) return c();
                    var e, t, n, o, r = R.aspectRatio, a = R.minSize[0] / ut, i = R.maxSize[0] / ut, d = R.maxSize[1] / dt, l = p - f, b = g - h, w = Math.abs(l), v = Math.abs(b), y = w / v;
                    return 0 === i && (i = 10 * ($ - U)), 0 === d && (d = 10 * (_ - Z)), r > y ? (t = g, n = v * r, e = 0 > l ? f - n : n + f, 0 > e ? (e = 0,
                        o = Math.abs((e - f) / r), t = 0 > b ? h - o : o + h) : e > $ && (e = $, o = Math.abs((e - f) / r), t = 0 > b ? h - o : o + h)) : (e = p,
                        o = w / r, t = 0 > b ? h - o : h + o, 0 > t ? (t = 0, n = Math.abs((t - h) * r), e = 0 > l ? f - n : n + f) : t > _ && (t = _, n = Math.abs(t - h) * r,
                        e = 0 > l ? f - n : n + f)), e > f ? (a > e - f ? e = f + a : e - f > i && (e = f + i), t = t > h ? h + (e - f) / r : h - (e - f) / r) : f > e && (a > f - e ? e = f - a : f - e > i && (e = f - i),
                        t = t > h ? h + (f - e) / r : h - (f - e) / r), 0 > e ? (f -= e, e = 0) : e > $ && (f -= e - $, e = $), 0 > t ? (h -= t, t = 0) : t > _ && (h -= t - _,
                        t = _), u(s(f, h, e, t));
                }

                function i(e) {
                    return e[0] < U && (e[0] = U), e[1] < Z && (e[1] = Z), e[0] > $ && (e[0] = $), e[1] > _ && (e[1] = _), [Math.round(e[0]), Math.round(e[1])];
                }

                function s(e, t, n, o) {
                    var r = e, a = n, i = t, s = o;
                    return e > n && (r = n, a = e), t > o && (i = o, s = t), [r, i, a, s];
                }

                function c() {
                    var e, t = p - f, n = g - h;
                    return at && Math.abs(t) > at && (p = t > 0 ? f + at : f - at), it && Math.abs(n) > it && (g = n > 0 ? h + it : h - it),
                    ct / dt && Math.abs(n) < ct / dt && (g = n > 0 ? h + ct / dt : h - ct / dt), st / ut && Math.abs(t) < st / ut && (p = t > 0 ? f + st / ut : f - st / ut),
                    p > $ && (e = p - $, f -= e, p -= e), g > _ && (e = g - _, h -= e, g -= e), f > $ && (e = f - _, g -= e, h -= e), h > _ && (e = h - _,
                        g -= e, h -= e), u(s(f, h, p, g));
                }

                function u(e) {
                    return {
                        x: e[0],
                        y: e[1],
                        x2: e[2],
                        y2: e[3],
                        w: e[2] - e[0],
                        h: e[3] - e[1]
                    };
                }

                var d, l, f = 0, h = 0, p = 0, g = 0;
                return {
                    flipCoords: s,
                    setPressed: e,
                    setCurrent: t,
                    getOffset: n,
                    moveOffset: o,
                    getCorner: r,
                    getFixed: a
                };
            }(), mt = function () {
                function t(e, t) {
                    p.left.css({
                        height: o(t)
                    }), p.right.css({
                        height: o(t)
                    });
                }

                function n() {
                    return r(yt.getFixed());
                }

                function r(e) {
                    p.top.css({
                        left: o(e.x),
                        width: o(e.w),
                        height: o(e.y)
                    }), p.bottom.css({
                        top: o(e.y2),
                        left: o(e.x),
                        width: o(e.w),
                        height: o(_ - e.y2)
                    }), p.right.css({
                        left: o(e.x2),
                        width: o($ - e.x2)
                    }), p.left.css({
                        width: o(e.x)
                    });
                }

                function a() {
                    return e("<div />").css({
                        position: "absolute",
                        backgroundColor: R.shadeColor || R.bgColor
                    }).appendTo(h);
                }

                function i() {
                    f || (f = !0, h.insertBefore(N), n(), xt.setBgOpacity(1, 0, 1), tt.hide(), s(R.shadeColor || R.bgColor, 1),
                        xt.isAwake() ? u(R.bgOpacity, 1) : u(1, 1));
                }

                function s(e, t) {
                    Y(l(), e, t);
                }

                function c() {
                    f && (h.remove(), tt.show(), f = !1, xt.isAwake() ? xt.setBgOpacity(R.bgOpacity, 1, 1) : (xt.setBgOpacity(1, 1, 1),
                        xt.disableHandles()), Y(et, 0, 1));
                }

                function u(e, t) {
                    f && (R.bgFade && !t ? h.animate({
                        opacity: 1 - e
                    }, {
                        queue: !1,
                        duration: R.fadeTime
                    }) : h.css({
                        opacity: 1 - e
                    }));
                }

                function d() {
                    R.shade ? i() : c(), xt.isAwake() && u(R.bgOpacity);
                }

                function l() {
                    return h.children();
                }

                var f = !1, h = e("<div />").css({
                    position: "absolute",
                    zIndex: 240,
                    opacity: 0
                }), p = {
                    top: a(),
                    left: a().height(_ - Z),
                    right: a().height(_ - Z),
                    bottom: a()
                };
                return {
                    update: n,
                    updateRaw: r,
                    getShades: l,
                    setBgColor: s,
                    enable: i,
                    disable: c,
                    resize: t,
                    refresh: d,
                    opacity: u
                };
            }(), xt = function () {
                function t(t) {
                    var n = e("<div />").css({
                        position: "absolute",
                        opacity: R.borderOpacity
                    }).addClass(r(t));
                    return nt.append(n), n;
                }

                function n(t, n) {
                    var o = e("<div />").mousedown(h(t)).css({
                        cursor: t + "-resize",
                        position: "absolute",
                        zIndex: n
                    }).addClass("ord-" + t);
                    return vt.support && o.bind("touchstart.jcrop", vt.createDragger(t)), ot.append(o), o;
                }

                function a(e) {
                    var t = R.handleSize, o = n(e, O++).css({
                        opacity: R.handleOpacity
                    }).addClass(r("handle"));
                    return t && o.width(t).height(t), o;
                }

                function i(e) {
                    return n(e, O++).addClass("jcrop-dragbar");
                }

                function s(e) {
                    var t;
                    for (t = 0; t < e.length; t++) F[e[t]] = i(e[t]);
                }

                function c(e) {
                    var n, o;
                    for (o = 0; o < e.length; o++) {
                        switch (e[o]) {
                            case"n":
                                n = "hline";
                                break;

                            case"s":
                                n = "hline bottom";
                                break;

                            case"e":
                                n = "vline right";
                                break;

                            case"w":
                                n = "vline";
                        }
                        j[e[o]] = t(n);
                    }
                }

                function u(e) {
                    var t;
                    for (t = 0; t < e.length; t++) B[e[t]] = a(e[t]);
                }

                function d(e, t) {
                    R.shade || tt.css({
                        top: o(-t + R.offsetY || 0),
                        left: o(-e + R.offsetX || 0)
                    }), rt.css({
                        top: o(t),
                        left: o(e)
                    });
                }

                function l(e, t) {
                    rt.width(Math.round(e)).height(Math.round(t));
                }

                function f() {
                    var e = yt.getFixed();
                    yt.setPressed([e.x, e.y]), yt.setCurrent([e.x2, e.y2]), p();
                }

                function p(e) {
                    return z ? b(e) : void 0;
                }

                function b(e) {
                    var t = yt.getFixed();
                    l(t.w, t.h), d(t.x, t.y), R.shade && mt.updateRaw(t), z || v(), e ? R.onSelect.call(kt, g(t)) : R.onChange.call(kt, g(t), t);
                }

                function w(e, t, n) {
                    (z || t) && (R.bgFade && !n ? N.animate({
                        opacity: e
                    }, {
                        queue: !1,
                        duration: R.fadeTime
                    }) : N.css("opacity", e));
                }

                function v() {
                    rt.show(), R.shade ? mt.opacity(wt) : w(wt, !0), z = !0;
                }

                function m() {
                    S(), rt.hide(), R.shade ? mt.opacity(1) : w(1), z = !1, R.onRelease.call(kt);
                }

                function x() {
                    H && ot.show();
                }

                function C() {
                    return H = !0, R.allowResize ? (ot.show(), !0) : void 0;
                }

                function S() {
                    H = !1, ot.hide();
                }

                function k(e) {
                    e ? (ft = !0, S()) : (ft = !1, C());
                }

                function M() {
                    k(!1), f();
                }

                var z, O = 370, j = {}, B = {}, F = {}, H = !1;
                R.dragEdges && e.isArray(R.createDragbars) && s(R.createDragbars), e.isArray(R.createHandles) && u(R.createHandles),
                R.drawBorders && e.isArray(R.createBorders) && c(R.createBorders), e(document).bind("touchstart.jcrop-ios", function (t) {
                    e(t.currentTarget).hasClass("jcrop-tracker") && t.stopPropagation();
                });
                var I = y().mousedown(h("move")).css({
                    cursor: "move",
                    position: "absolute",
                    zIndex: 360
                });
                return vt.support && I.bind("touchstart.jcrop", vt.createDragger("move")), nt.append(I),
                    S(), {
                    updateVisible: p,
                    update: b,
                    release: m,
                    refresh: f,
                    isAwake: function () {
                        return z;
                    },
                    setCursor: function (e) {
                        I.css("cursor", e);
                    },
                    enableHandles: C,
                    enableOnly: function () {
                        H = !0;
                    },
                    showHandles: x,
                    disableHandles: S,
                    animMode: k,
                    setBgOpacity: w,
                    done: M
                };
            }(), Ct = function () {
                function t(t) {
                    gt.css({
                        zIndex: 450
                    }), t ? e(document).bind("touchmove.jcrop", i).bind("touchend.jcrop", c) : f && e(document).bind("mousemove.jcrop", o).bind("mouseup.jcrop", r);
                }

                function n() {
                    gt.css({
                        zIndex: 290
                    }), e(document).unbind(".jcrop");
                }

                function o(e) {
                    return d && d(s(e)), !1;
                }

                function r(e) {
                    return e.preventDefault(), e.stopPropagation(), lt && (lt = !1, l && l(s(e)), xt.isAwake() && R.onSelect.call(kt, g(yt.getFixed())),
                        n(), d = function () {
                    }, l = function () {
                    }), !1;
                }

                function a(e, n, o) {
                    return lt = !0, d = e, l = n, t(o), !1;
                }

                function i(e) {
                    return d && d(s(vt.cfilter(e))), !1;
                }

                function c(e) {
                    return r(vt.cfilter(e));
                }

                function u(e) {
                    gt.css("cursor", e);
                }

                var d = function () {
                }, l = function () {
                }, f = R.trackDocument;
                return f || gt.mousemove(o).mouseup(r).mouseout(r), N.before(gt), {
                    activateHandlers: a,
                    setCursor: u
                };
            }(), St = function () {
                function t() {
                    R.keySupport && (a.show(), a.focus());
                }

                function n() {
                    a.hide();
                }

                function o(e, t, n) {
                    R.allowMove && (yt.moveOffset([t, n]), xt.updateVisible(!0)), e.preventDefault(), e.stopPropagation();
                }

                function r(e) {
                    if (e.ctrlKey || e.metaKey) return !0;
                    ht = e.shiftKey ? !0 : !1;
                    var t = ht ? 10 : 1;
                    switch (e.keyCode) {
                        case 37:
                            o(e, -t, 0);
                            break;

                        case 39:
                            o(e, t, 0);
                            break;

                        case 38:
                            o(e, 0, -t);
                            break;

                        case 40:
                            o(e, 0, t);
                            break;

                        case 27:
                            R.allowSelect && xt.release();
                            break;

                        case 9:
                            return !0;
                    }
                    return !1;
                }

                var a = e('<input type="radio" />').css({
                    position: "fixed",
                    left: "-120px",
                    width: "12px"
                }).addClass("jcrop-keymgr"), i = e("<div />").css({
                    position: "absolute",
                    overflow: "hidden"
                }).append(a);
                return R.keySupport && (a.keydown(r).blur(n), q || !R.fixedSupport ? (a.css({
                    position: "absolute",
                    left: "-20px"
                }), i.append(a).insertBefore(N)) : a.insertBefore(N)), {
                    watchKeys: t
                };
            }();
            vt.support && gt.bind("touchstart.jcrop", vt.newSelection), ot.hide(), X(!0);
            var kt = {
                updateOffset: P,
                changeImgScale: D,
                setImage: J,
                animateTo: x,
                setSelect: C,
                setOptions: z,
                tellSelect: k,
                tellScaled: M,
                setClass: m,
                disable: O,
                enable: j,
                cancel: B,
                release: xt.release,
                destroy: F,
                focus: St.watchKeys,
                getBounds: function () {
                    return [($ - U) * ut, (_ - Z) * dt];
                },
                getWidgetSize: function () {
                    return [$ - U, _ - Z];
                },
                getScaleFactor: function () {
                    return [ut, dt];
                },
                getOptions: function () {
                    return R;
                },
                ui: {
                    botImg: N,
                    topImg: tt,
                    trk: gt,
                    holder: et,
                    selection: rt
                }
            };
            return K && et.bind("selectstart", function () {
                return !1;
            }), W.data("Jcrop", kt), kt;
        }, e.fn.Jcrop = function (t, n) {
            var o;
            return this.each(function () {
                if (e(this).data("Jcrop")) {
                    if ("api" === t) return e(this).data("Jcrop");
                    e(this).data("Jcrop").setOptions(t);
                } else "IMG" == this.tagName ? e.Jcrop.Loader(this, function () {
                    e(this).css({
                        display: "block",
                        visibility: "hidden"
                    }), o = e.Jcrop(this, t), e.isFunction(n) && n.call(o);
                }) : (e(this).css({
                    display: "block",
                    visibility: "hidden"
                }), o = e.Jcrop(this, t), e.isFunction(n) && n.call(o));
            }), this;
        }, e.Jcrop.Loader = function (t, n, o) {
            function r() {
                i.complete ? (a.unbind(".jcloader"), e.isFunction(n) && n.call(i)) : window.setTimeout(r, 50);
            }

            var a = e(t), i = a[0];
            a.bind("load.jcloader", r).bind("error.jcloader", function () {
                a.unbind(".jcloader"), e.isFunction(o) && o.call(i);
            }), i.complete && e.isFunction(n) && (a.unbind(".jcloader"), n.call(i));
        }, e.Jcrop.defaults = {
            allowSelect: !0,
            allowMove: !0,
            allowResize: !0,
            trackDocument: !0,
            offsetX: 0,
            offsetY: 0,
            baseClass: "jcrop",
            addClass: null,
            bgColor: "transparent",
            bgOpacity: .6,
            bgFade: !1,
            borderOpacity: .4,
            handleOpacity: .5,
            handleSize: null,
            aspectRatio: 0,
            keySupport: !0,
            createHandles: ["n", "s", "e", "w", "nw", "ne", "se", "sw"],
            createDragbars: ["n", "s", "e", "w"],
            createBorders: ["n", "s", "e", "w"],
            drawBorders: !0,
            dragEdges: !0,
            fixedSupport: !0,
            touchSupport: null,
            shade: null,
            boxWidth: 0,
            boxHeight: 0,
            boundary: 2,
            fadeTime: 400,
            animationDelay: 20,
            swingSpeed: 3,
            minSelect: [0, 0],
            maxSize: [0, 0],
            minSize: [0, 0],
            maxBound: null,
            onChange: function () {
            },
            onSelect: function () {
            },
            onDblClick: function () {
            },
            onRelease: function () {
            }
        };
    }(jQuery);
});
define("biz_common/utils/wxgspeedsdk.js", [], function () {
    function e(e) {
        if (!e.pid || !e.speeds) return -1;
        if (!e.speeds.length > 0) {
            var n = e.speeds;
            e.speeds = [], e.speeds.push(n);
        }
        for (var t = d(e), o = 0; o < e.speeds.length; o++) {
            var r = e.speeds[o];
            r.time = parseInt(r.time), r.sid > 20 && r.time >= 0 && i(t, r.sid, r.time);
        }
    }

    function n() {
        s(function () {
            setTimeout(function () {
                for (var e in p) r({
                    pid_uin_rid: e,
                    speeds: p[e]
                }, c);
                p = {};
            }, 100);
        });
    }

    function t(e) {
        s(function () {
            if (!e.pid || !e.time) return -1;
            var n = d(e);
            i(n, 9, e.time);
        });
    }

    function o(e) {
        s(function () {
            var n = d(e);
            p[n] || (p[n] = []);
            var t = window.performance || window.msPerformance || window.webkitPerformance || {};
            if (t && t.timing) {
                var o = t.timing || {};
                i(n, 1, o.domainLookupEnd - o.domainLookupStart), i(n, 2, "https:" == location.protocol && 0 != o.secureConnectionStart ? o.connectEnd - o.secureConnectionStart : 0),
                    i(n, 3, o.connectEnd - o.connectStart), i(n, 4, o.responseStart - o.requestStart), i(n, 5, o.responseEnd - o.responseStart),
                    i(n, 6, o.domContentLoadedEventStart - o.domLoading), i(n, 7, 0 == o.domComplete ? 0 : o.domComplete - o.domLoading),
                    i(n, 8, 0 == o.loadEventEnd ? 0 : o.loadEventEnd - o.loadEventStart), function () {
                    setTimeout(function () {
                        o.loadEventEnd && (i(n, 7, 0 == o.domComplete ? 0 : o.domComplete - o.domLoading), i(n, 8, 0 == o.loadEventEnd ? 0 : o.loadEventEnd - o.loadEventStart));
                    }, 0);
                }(p), p[n][9] || i(n, 9, o.domContentLoadedEventStart - o.navigationStart), i(n, 10, o.redirectEnd - o.redirectStart),
                    i(n, 11, o.domainLookupStart - o.fetchStart), i(n, 12, o.domLoading - o.responseStart);
            }
        });
    }

    function i(e, n, t) {
        p[e] = p[e] || [], p[e][n] = p[e][n] || [], 0 > t || (21 > n ? p[e][n][0] = t : p[e][n].push(t));
    }

    function d(e) {
        return e && e.pid ? e.pid + "_" + (e.uin || 0) + "_" + (e.rid || 0) : void(console && console.error("Must provide a pid"));
    }

    function r(e, n) {
        var t = e.pid_uin_rid.split("_");
        if (3 != t.length) return void(console && console.error("pid,uin,rid, invalid args"));
        for (var o = "pid=" + t[0] + "&uin=" + t[1] + "&rid=" + t[2], i = n + o + "&speeds=", d = "", r = [], s = 1; s < e.speeds.length; s++) if (e.speeds[s]) {
            for (var a = 0; a < e.speeds[s].length; a++) {
                var p = s + "_" + e.speeds[s][a];
                i.length + d.length + p.length < 1024 ? d = d + p + ";" : (d.length && r.push(i + d.substring(0, d.length - 1)),
                    d = p + ";");
            }
            s == e.speeds.length - 1 && r.push(i + d.substring(0, d.length - 1));
        }
        for (var s = 0; s < r.length; s++) (new Image).src = r[s];
    }

    function s(e) {
        "complete" == document.readyState ? e() : u.push(e);
    }

    function a() {
        for (var e = 0; e < u.length; e++) u[e]();
        u = [];
    }

    var p = {}, c = "https://badjs.weixinbridge.com/frontend/reportspeed?", u = [];
    return window.addEventListener ? window.addEventListener("load", a, !1) : window.attachEvent && window.attachEvent("onload", a),
        {
            saveSpeeds: e,
            send: n,
            setFirstViewTime: t,
            setBasicTime: o
        };
});
define("media/report.js", ["biz_common/utils/monitor.js", "common/wx/Cgi.js"], function (e) {
    "use strict";

    function t(e, t) {
        s.pv[e] && (t = t || 1, s.pv[e].count += t, s.debug && console.log("addpv:" + e + " count:" + s.pv[e].count));
    }

    function o(e) {
        s.uv[e] && (s.uv[e].count = 1, s.debug && console.log("addUv:" + e + " count:" + s.uv[e].count));
    }

    function n(e, n) {
        t(e, n), o(e);
    }

    function i(e) {
        var t = s.id[e] || s.id[0];
        for (var o in s.pv) {
            var n = s.pv[o];
            n.count > 0 && c.setSum(t, n.key, n.count);
        }
        for (var o in s.uv) {
            var n = s.uv[o];
            n.count > 0 && c.setSum(t, n.key, n.count);
        }
        for (var o in s.ohterData) {
            var n = s.ohterData[o];
            if (n.count > 0) {
                var i = o.split("_");
                c.setSum(i[0], i[1], n.count);
            }
        }
    }

    function r() {
        c.send();
    }

    function a(e, t, o) {
        s.ohterData[e + "_" + t] || (s.ohterData[e + "_" + t] = {
            count: 0
        }), s.ohterData[e + "_" + t].count += o || 1, s.debug && console.log("addNum:" + (e + "_" + t + "_" + s.ohterData[e + "_" + t].count));
    }

    function u(e, t, o) {
        var n = 0, i = [], r = {};
        if (t && "[object String]" == Object.prototype.toString.call(t)) n = 1, "img" == o && (t = encodeURIComponent(t)),
            i.push("log0=" + t), r.log0 = t; else if (t && "[object Array]" == Object.prototype.toString.call(t)) {
            n = t.length;
            for (var a = 0; n > a; a++) {
                var u = "img" == o ? encodeURIComponent(t[a]) : t[a];
                i.push("log" + a + "=" + u), r["log" + a] = u;
            }
        }
        if ("img" == o) {
            var c = new Image, s = "//mp.weixin.qq.com/mp/jsmonitor?idkey=" + e;
            n > 0 && (s += "&lc=" + n + "&" + i.join("&")), s += "&t=" + Math.random(), c.src = s;
        } else {
            var l = {};
            n > 0 && (l = r), l.idkey = e, l.lc = n, m.post({
                url: "//mp.weixin.qq.com/mp/jsmonitor?",
                data: l,
                dataType: "json"
            });
        }
    }

    var c = e("biz_common/utils/monitor.js"), m = e("common/wx/Cgi.js"), s = {
        debug: window.location.href.indexOf("&_debug=1") > -1 ? !0 : !1,
        id: ["28146", "28305", "65080"],
        keyConf: ["autowidth", "fontsize", "blockquote", "horizontal", "removeformat", "link", "unlink", "mpvideo", "qqvideo", "wxvideo", "insertimage", "insertvote", "insertmusic", "insertaudio", "insertcard", "bold", "italic", "underline", "forecolor", "backcolor", "justifyleft", "justifycenter", "justifyright", "rowspacingtop", "rowspacingbottom", "lineheight", "insertorderedlist", "insertunorderedlist", "imagefloatnone", "imagefloatleft", "imagefloatright", "imagefloatcenter", "usecache", "cover_from_article", "showlink", "hidelink", "remoteimgsuc", "remoteimgerr", "cancel_autowidth", "paste", "formatmatch", "contextmenu", "menu_selectall", "menu_cleardoc", "menu_justifyleft", "menu_justifyright", "menu_justifycenter", "menu_justifyjustify", "menu_inserttable", "menu_copy", "menu_paste", "menu_unlink", "insertshop", "menu_insertparagraphtrue", "menu_insertparagraph", "img_popup", "link_popup", "del_img", "remoteimg_img", "remoteimg_style", "screen_shot_suc", "screen_shot_fail", "not_cur_img_count", "save_remoting_img"],
        pv: {},
        uv: {},
        ohterData: {}
    };
    return function () {
        for (var e = 0, t = s.keyConf.length; t > e; e++) {
            var o = 2 * e, n = 2 * e + 1, i = s.keyConf[e];
            s.pv[i] = {
                key: o,
                count: 0
            }, s.uv[i] = {
                key: n,
                count: 0
            };
        }
    }(), {
        logReport: u,
        addPv: t,
        addUv: o,
        addPvUv: n,
        setData: i,
        addNum: a,
        send: r,
        reportId: s.id
    };
});
define("media/media_static_data.js", [], function (w, e) {
    "use strict";
    e.article_type = [{
        name: "文学",
        value: "文学"
    }, {
        name: "金融财经",
        value: "金融财经"
    }, {
        name: "房产",
        value: "房产"
    }, {
        name: "时事政治",
        value: "时事政治"
    }, {
        name: "社会新闻",
        value: "社会新闻"
    }, {
        name: "工业农业",
        value: "工业农业"
    }, {
        name: "汽车",
        value: "汽车"
    }, {
        name: "科技互联网",
        value: "科技互联网"
    }, {
        name: "教育培训",
        value: "教育培训"
    }, {
        name: "艺术文化",
        value: "艺术文化"
    }, {
        name: "美妆时尚",
        value: "美妆时尚"
    }, {
        name: "娱乐",
        value: "娱乐"
    }, {
        name: "旅游",
        value: "旅游"
    }, {
        name: "健康医疗",
        value: "健康医疗"
    }, {
        name: "体育",
        value: "体育"
    }, {
        name: "餐饮美食",
        value: "餐饮美食"
    }, {
        name: "母婴育儿",
        value: "母婴育儿"
    }, {
        name: "情感",
        value: "情感"
    }, {
        name: "历史",
        value: "历史"
    }, {
        name: "军事",
        value: "军事"
    }, {
        name: "宗教",
        value: "宗教"
    }, {
        name: "星座占卜",
        value: "星座占卜"
    }, {
        name: "幽默笑话",
        value: "幽默笑话"
    }, {
        name: "图片",
        value: "图片"
    }, {
        name: "视频",
        value: "视频"
    }, {
        name: "其他",
        value: "其他"
    }], e.URL_PLATFORM_MAP = {
        "www.guokr.com": "果壳",
        "www.zhihu.com": "知乎",
        "blog.sina.com.cn": "新浪博客",
        "www.huxiu.com": "虎嗅网",
        "www.dreamore.com": "追梦网",
        "cn.engadget.com": "瘾科技",
        "www.cnbeta.com": "cnBeta",
        "www.199it.com": "199IT",
        "www.36kr.com": "36氪",
        "www.tmtpost.com": "钛媒体",
        "www.iheima.com": "i黑马",
        "www.cyzone.cn": "创业邦",
        "www.ikanchai.com": "砍柴网",
        "www.iresearch.cn": "艾瑞网",
        "xianguo.com": "鲜果网",
        "www.myzaker.com": "ZAKER",
        "jandan.net": "煎蛋网",
        "pianke.me": "片刻网",
        "www.techweb.com.cn": " TechWeb",
        "www.leiphone.com": "雷锋网",
        "www.douban.com": "豆瓣",
        "www.mop.com": "猫扑",
        "www.tianya.cn": "天涯",
        "jingyan.baidu.com": "百度经验",
        "baike.baidu.com": "百度百科",
        "wenku.baidu.com": "百度文库",
        "tieba.baidu.com": "百度贴吧",
        "zhidao.baidu.com": "百度知道",
        "news.sina.com.cn": " 新浪新闻",
        "news.qq.com": "腾讯新闻",
        "news.ifeng.com": "凤凰资讯",
        "news.163.com": "网易新闻",
        "www.xinhuanet.com": "新华社",
        "www.people.com.cn": "人民网",
        "www.huanqiu.com": "环球时报",
        "www.gov.cn": "中国政府网",
        "www.china.com": "中华网",
        "www.takungpao.com": "大公网",
        "www.81.cn": "中国军网",
        "www.zaobao.com": "联合早报",
        "d.weibo.com": "新浪微博",
        "weibo.com": "新浪微博",
        "www.baidu.com": "百度",
        "www.sina.com.cn": "新浪",
        "www.163.com": "网易",
        "news.sohu.com": "搜狐新闻",
        "www.sohu.com": "搜狐",
        "www.ifeng.com": "凤凰网",
        "qzone.qq.com": "QQ空间"
    };
});
define("media/article_list.js", ["common/wx/media/previewDialog.js", "media/common.js", "common/wx/media/shareCopyrightDialog.js", "common/wx/media/keywordDialog.js", "biz_common/utils/wxgspeedsdk.js", "common/qq/events.js", "common/qq/Class.js", "common/wx/time.js", "biz_web/lib/store.js", "common/wx/Tips.js", "common/wx/dialog.js", "common/wx/popover.js", "common/wx/mpEditor/plugin/remoteimg.js", "common/wx/mpEditor/plugin/filter.js", "biz_common/moment.js", "media/media_cgi.js", "media/article.js", "media/draft.js", "media/report.js", "tpl/media/appmsg_edit/article_list_item.html.js", "media/preview.js"], function (e) {
    "use strict";

    function t() {
        if ("-1" == T.navigatorType) return "";
        if (!T.navigatorType) {
            var e = window.navigator.userAgent;
            T.navigatorType = /360se/i.test(e) ? "360" : /metasr/i.test(e) ? "搜狗" : /LBBROWSER/i.test(e) ? "猎豹" : /QQBrowser/i.test(e) ? "QQ" : /Edge/i.test(e) ? "Edge" : /Opera/i.test(e) || /Opr\//i.test(e) ? "Opera" : /chrome/i.test(e) ? "Chrome" : /Safari/i.test(e) ? "Safari" : /Firefox/i.test(e) ? "Firefox" : /MSIE/i.test(e) || /Trident\//i.test(e) ? "IE" : "-1";
        }
        return T.navigatorType;
    }

    function i(e) {
        var t = e && e.multi_item;
        return t && t.length ? ($.each(t, function (e, t) {
            $.each(t, function (e, i) {
                i.html && (t[e] = i.html(!1));
            });
        }), t) : null;
    }

    function a(e, t, i) {
        (t || 1) > q && $.post("/misc/jslog?1=1" + wx.data.param, {
            id: e,
            level: i || "error",
            content: "[file=media/appmsg_edit]"
        });
    }

    var r = e("common/wx/media/previewDialog.js"), n = e("media/common.js"), o = e("common/wx/media/shareCopyrightDialog.js"), s = e("common/wx/media/keywordDialog.js"), c = e("biz_common/utils/wxgspeedsdk.js"), l = e("common/qq/events.js")(!0), f = e("common/qq/Class.js"),
        u = e("common/wx/time.js"), _ = e("biz_web/lib/store.js"), m = e("common/wx/Tips.js"), p = e("common/wx/dialog.js"), g = e("common/wx/popover.js"), h = e("common/wx/mpEditor/plugin/remoteimg.js"), v = (e("common/wx/mpEditor/plugin/filter.js"),
            e("biz_common/moment.js")), w = e("media/media_cgi.js"), y = e("media/article.js"), x = e("media/draft.js"), b = e("media/report.js"), j = e("tpl/media/appmsg_edit/article_list_item.html.js"), D = e("media/preview.js"), k = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"], T = {
            navigatorType: "",
            debug: window.location.href.indexOf("&_debug=1") > 0 ? !0 : !1,
            isshare: window.location.href.indexOf("&share=1") > 0 ? !0 : !1,
            draftTipsreportList: ["2397429400", "3086281409", "2398460220"]
        }, q = Math.random(), E = n.eq, I = f.declare({
            init: function (e) {
                var t = this;
                if ($.extend(!0, t, e), t.opt = e, t.data_seq = (e.appmsg_data.data_seq || "0") + "", t.activeData = !1,
                    t.crop_img_ing = !1, t.$list = $(e.appmsg_selector), t.canAddArticleMoveLog = -1, t.gid = 0,
                    t.readOnlyType = 0, t.is_illegal) t.draft = null, t.readOnlyType = "3_1", t.list = i(e.appmsg_data); else if (t.is_rumor) t.draft = null,
                    t.readOnlyType = "3_2", t.list = i(e.appmsg_data); else if (1 == wx.cgiData.conflict) {
                    t.readOnlyType = "3_3", t.draft = null, t.list = x.getReadOnlyDraft(e.app_id), x.clearReadOnlyDraft(e.app_id);
                    var a = "65080_99_1";
                    t.list || (a += ";65080_100_1"), b.logReport(a, "", "img");
                } else wx.cgiData.bizmediaid ? (t.draft = null, t.readOnlyType = "1_6", t.list = i(e.appmsg_data)) : (t.ueditor.fireEvent("reportAddNum", 65080, 107, 1),
                    t.draft = new x.constructor(e.app_id, t.data_seq, t.ueditor), e.app_id || t.data_seq && "0" != t.data_seq ? (t.list = i(e.appmsg_data),
                    t.draft.seq = t.data_seq, t.conflict_ls_seq = t.conflict_ls_seq) : t.list = !1);
                t._bindEvent(), t.list ? $.each(t.list, function (e, i) {
                    t.add({
                        data: i,
                        isNew: !1
                    }), t.select(e, 0, 1);
                }) : (t.add({
                    isNew: !0
                }), !T.isshare || e.app_id || t.data_seq && "0" != t.data_seq || t._addShareCopyright(function () {
                    t.remove(0, !0);
                })), wx.cgiData.bizmediaid ? (t.select(wx.cgiData.idx, 0, 1), $("#nav").text(wx.cgiData.appmsg_data.history_time ? "正在查看历史版本：" + v.unix(wx.cgiData.appmsg_data.update_time).format("YYYY-MM-DD HH:mm:ss") + "由" + (wx.cgiData.appmsg_data.operator_name || "未知") + "保存" : "正在查看历史版本")) : t.select(0, 0, 1),
                    t.lastData = t.getData() || !1, t.hasConfirmed = !1, t._renderReadOnly(), t._warnDraft(),
                    t._initDraftSyn();
            },
            _deserializeReadOnlyType: function () {
                var e = {
                    right: 0,
                    index: 0
                };
                if (this.readOnlyType) {
                    var t = this.readOnlyType.split("_");
                    return e.right = 1 * t[0], e.index = 1 * t[1], e;
                }
                return e;
            },
            _warnDraft: function () {
                var e = this;
                if (this.draft && this.draft.data) {
                    if (E(this.lastData, this.draft.data)) return void e.draft.clear();
                    e.ueditor.fireEvent("reportAddNum", 65080, 108, 1);
                    var t = !0;
                    1 * !e.app_id && 1 * !e.draft.seq && T.isshare && (t = !1), e.readOnlyType = "0_5";
                    {
                        x.saveReadOnlyDraft(this.draft.data, e.app_id || 0, e.draft.seq || 0);
                    }
                    e.draft.clear();
                    var i = e._deserializeReadOnlyType();
                    e.ueditor.fireEvent("renderReadOnly", {
                        right: i.right,
                        type: i.index,
                        showTips: t
                    });
                    try {
                        var a = window.wx.data.uin;
                        if (T.debug || 50 == Math.floor(100 * Math.random()) || ("," + T.draftTipsreportList.join(",") + ",").indexOf("," + a + ",") >= 0) {
                            var r = ["draft_tips_", a, ";time:", +new Date, ";uin:", window.wx.data.uin || "", ";app_id:", e.app_id || "", ";service_ori:", JSON.stringify(e.list), ";service:", JSON.stringify(e.lastData), ";draft:", JSON.stringify(d)].join("");
                            b.logReport("", r, "ajax"), _.set("draft_tips", r), console.log("draft_tips,service:"),
                                console.log(e.lastData), console.log("draft_tips,draft:"), console.log(d);
                        }
                    } catch (n) {
                    }
                }
            },
            _initDraftSyn: function () {
                function e() {
                    a.surportFocusReport || (a.ueditor.fireEvent("reportAddNum", 65080, 95, 1), a.surportFocusReport = !0),
                        a.surportWinFocus = !0, t();
                }

                function t() {
                    o && (clearTimeout(o), o = null), a.draft && a.draft.active();
                }

                function i() {
                    o || (o = setTimeout(function () {
                        if (o = null, a.draft && 0 != a.draft.activeId && ("function" != typeof document.hasFocus || document.hasFocus() !== !0 && a.ueditor.getDocument().hasFocus() !== !0)) {
                            var e = a.activeData || !1, t = a.getData() || !1, i = a.ueditor.fireEvent("checkRemoteList"), r = a.ueditor.fireEvent("checkdomAsynList");
                            if (a._saving === !0 || a.crop_img_ing === !0 || i !== !0 || r !== !0) ; else if (!E(e, t)) {
                                a.draft.save(t, 1);
                            }
                            a.draft.silent(), a.activeData = !1;
                        }
                    }, 200));
                }

                var a = this, r = a.ueditor.getWindow(), o = null;
                if (a.draft) {
                    this.ueditor.fireEvent("reportAddNum", 65080, 94, 1), a.ueditor.addListener("syn_draft", function () {
                        if (a.draft && a.draft.data) {
                            var e = a.draft.data || !1, t = a.ueditor.fireEvent("checkRemoteList"), i = a.ueditor.fireEvent("checkdomAsynList");
                            if (!T.debug && a.draft && a._saving !== !0 && a.crop_img_ing !== !0 && 0 != a.draft.activeId && t === !0 && i === !0 && !E(a.activeData || !1, e) && "gt" != n.dataSeqCompare(a.data_seq, a.draft.seq)) {
                                a.ueditor.fireEvent("reportAddNum", 65080, 105, 1);
                                var r, o = 0;
                                a.$current && (o = a.$current.index() || 0, r = a.ueditor.getSelectionRange().createDomAddress(!1, !0));
                                for (var s = a.$list.find(".js_appmsg_item"), d = [], c = []; s.length > 0;) {
                                    a.select(0), a.ueditor.fireEvent("saveScene");
                                    var l = a.remove(0, !0);
                                    d.push(l.getHistory() || null), c.push(l.scrollTop || 0), s = a.$list.find(".js_appmsg_item");
                                }
                                a.list = a.draft.data, a.data_seq = a.draft.seq, a.lastData = a.list, $.each(a.list, function (e, t) {
                                    var i = a.add({
                                        data: t,
                                        isNew: !1
                                    }), r = i.data("article");
                                    r && (d && d[e] && r.setHistory(d[e]), c && "undefined" != typeof c[e] && (r.scrollTop = c[e])),
                                        i.data("article", r), a.select(e), a.ueditor.fireEvent("saveScene");
                                });
                                var f = a.$list.find(".js_appmsg_item").length;
                                a.select(Math.min(o, f - 1)), setTimeout(function () {
                                    a.activeData = a.getData(), r && a.ueditor.getSelectionRange().moveToDomAddress(r, !1).select(!0);
                                }, 0);
                            }
                        }
                    }), this.ueditor.addListener("active_state_change", function () {
                        a.draft && (0 == a.draft.activeId ? a._clearIntervalSave() : a.draft.activeId > 0 && (a._activeIntervalSave(),
                            a.activeData = a.getData()));
                    });
                    var s, d;
                    "undefined" != typeof document.hidden ? (s = "hidden", d = "visibilitychange") : "undefined" != typeof document.msHidden ? (s = "msHidden",
                        d = "msvisibilitychange") : "undefined" != typeof document.webkitHidden ? (s = "webkitHidden",
                        d = "webkitvisibilitychange") : "undefined" != typeof document.mozHidden && (s = "mozHidden",
                        d = "mozvisibilitychange"), s && a.ueditor.fireEvent("reportAddNum", 65080, 102, 1), $(document).on("visibilitychange", function () {
                        document[s] && i();
                    }), $(window).on("focus", e), $(r).on("focus", e), $(window).on("blur", i), $(r).on("blur", i);
                    var c = "before_add_article before_del_article focus mousedown keydown";
                    a.ueditor.addListener(c, t), a.ueditor.addListener("blur", i), "function" == typeof document.hasFocus ? (a.ueditor.fireEvent("reportAddNum", 65080, 97, 1),
                        a.surportHasFocus = !0, setTimeout(function () {
                        try {
                            (a.draft && document.hasFocus() === !0 || a.ueditor.isReady && a.ueditor.getDocument().hasFocus() === !0) && (a.draft.active(!0),
                                a.activeData = a.getData());
                        } catch (e) {
                            a.surportHasFocus = !1;
                        }
                    }, 0)) : (a.activeData = a.getData(), a.surportHasFocus = !1);
                }
            },
            _renderReadOnly: function (e, t, i) {
                var a = this, r = a._deserializeReadOnlyType();
                if (4 == r.index) {
                    var n = a.getData() || !1;
                    a.draft = null, x.clear(a.app_id), x.saveConflict(n, a.app_id, a.data_seq, a.conflict_ls_seq);
                }
                1 & r.right && a.ueditor.fireEvent("renderReadOnly", {
                    right: r.right,
                    type: r.index,
                    time: e || "",
                    name: t || "",
                    ua: i || ""
                });
            },
            _clearIntervalSave: function () {
                this.draftSaveId && clearInterval(this.draftSaveId);
            },
            _activeIntervalSave: function () {
                var e = this;
                e._clearIntervalSave(), this.draftSaveId = setInterval(function () {
                    if (e._clearIntervalSave(), e.draft) {
                        var t = e.getData() || !1;
                        E(e.lastData, t) || e.draft.save(t);
                    }
                    e._activeIntervalSave();
                }, 6e4);
            },
            _addShareCopyright: function (e) {
                var t = this;
                new o({
                    onOK: function (i) {
                        if (i) {
                            "function" == typeof e && e();
                            var a = t.add({
                                data: {
                                    title: i.title,
                                    cover: i.cover_url,
                                    cdn_url: i.cover_url,
                                    content: i.content,
                                    copyright_headimg: i.head_img_url,
                                    copyright_nickname: i.nickname,
                                    is_share_copyright: 1,
                                    share_copyright_url: i.url
                                },
                                isNew: !0
                            });
                            if (a && (t.select(a.index()), t.app_id)) {
                                var r = new Image;
                                r.src = "/cgi-bin/reportmaterialoper?oper=0&idx=" + a.index() + "&msgid=" + t.app_id + "&token=" + wx.data.t;
                            }
                        }
                    }
                });
            },
            _bindEvent: function () {
                var e = this;
                $("#js_add_polo_appmsg").on("click", function () {
                    if (e._saving !== !0 && e.ueditor.fireEvent("before_add_article") !== !1) {
                        var t = e.add({
                            isNew: !0
                        });
                        if (t && (e.select(t.index()), e.app_id)) {
                            var i = new Image;
                            i.src = "/cgi-bin/reportmaterialoper?oper=0&idx=" + t.index() + "&msgid=" + e.app_id + "&token=" + wx.data.t;
                        }
                    }
                }), $("#js_add_share_appmsg").on("click", function () {
                    e._saving !== !0 && e.ueditor.fireEvent("before_add_article") !== !1 && e._addShareCopyright();
                }), e.$list.on("click", ".js_appmsg_item", function () {
                    var t = $(this).closest(".js_appmsg_item").index();
                    t != e.$current.index() && e.select(t), wx.cgiData.idx = t;
                }), e.$list.on("click", ".js_del", function () {
                    if (e._saving !== !0 && e.ueditor.fireEvent("before_del_article") !== !1) {
                        var t = $(this).closest(".js_appmsg_item").index();
                        return t != e.$current.index() && e.select(t), e.remove(t), !1;
                    }
                }), e.$list.on("click", ".js_up", function () {
                    if (e._saving !== !0) {
                        var t = $(this).closest(".js_appmsg_item"), i = t.prev();
                        0 == i.index() && (i.find(".first_appmsg_item").hide().siblings().show(), t.find(".first_appmsg_item").show().siblings().hide()),
                            t.insertBefore(i), e._updateTitleTips(), e.$list.children().find(".js_down").show(),
                            e.$list.children().last().find(".js_down").hide(), e.ueditor.fireEvent("afterArticleMove");
                    }
                }), e.$list.on("click", ".js_down", function () {
                    if (e._saving !== !0) {
                        var t = $(this).closest(".js_appmsg_item"), i = t.next();
                        0 == t.index() && i.length && (t.find(".first_appmsg_item").hide().siblings().show(), i.find(".first_appmsg_item").show().siblings().hide()),
                            i.insertBefore(t), e._updateTitleTips(), e.$list.children().find(".js_down").show(),
                            e.$list.children().last().find(".js_down").hide(), e.ueditor.fireEvent("afterArticleMove");
                    }
                }), $("body").on("click", "a", function (t) {
                    var i = $(this).attr("href"), a = $(this).attr("target");
                    if ("_blank" !== a && "string" == typeof i && 0 !== i.indexOf("javascript:") && 0 !== i.indexOf("#")) {
                        var r = e.getData() || !1, n = e._deserializeReadOnlyType();
                        if (2 & n.right) return t.preventDefault(), void p.show({
                            type: "warn",
                            msg: "如果离开此页面，当前页面数据将丢失！",
                            buttons: [{
                                text: "留在此页面",
                                click: function () {
                                    this.remove();
                                }
                            }, {
                                text: "离开此页面",
                                type: "normal",
                                click: function () {
                                    window.onbeforeunload = null, 4 == n.index && x.saveConflict(r, e.app_id, e.data_seq, e.conflict_ls_seq),
                                        location.href = i, this.remove();
                                }
                            }]
                        });
                        if (E(r, e.lastData)) return void(e.draft && e.draft.clear());
                        t.preventDefault();
                        var o = 1 == wx.cgiData.isNew ? "是否保存当前图文消息内容？" : "是否保存此次修改？";
                        p.show({
                            type: "info",
                            msg: o,
                            buttons: [{
                                text: "保存",
                                click: function () {
                                    e.save($("#js_submit"), function () {
                                        window.onbeforeunload = null, m.remove(), $("#js_save_success").show(), location.href = i;
                                    }), this.remove();
                                }
                            }, {
                                text: "不保存",
                                type: "normal",
                                click: function () {
                                    e.draft && e.draft.clear(), window.onbeforeunload = null, location.href = i, this.remove();
                                }
                            }]
                        });
                    }
                }), e.ueditor.addListener("contentchange", function () {
                    $("#js_import_tips,#js_draft_tips").hide();
                }), e._activeIntervalSave(), window.onbeforeunload = function (t) {
                    var i = e.getData() || !1, a = "--------------------------------------------\n如果离开此页面，当前页面数据将丢失！\n--------------------------------------------", r = e._deserializeReadOnlyType();
                    if (2 & r.right) {
                        4 == r.index && x.saveConflict(i, e.app_id, e.data_seq, e.conflict_ls_seq);
                        try {
                            t.returnValue = a;
                        } catch (t) {
                        }
                        return a;
                    }
                    if (e.draft) {
                        if (E(i, e.lastData)) return void e.draft.clear();
                        try {
                            t.returnValue = a;
                        } catch (t) {
                        }
                        return a;
                    }
                }, $(window).on("unload", function () {
                    e.draft && e.draft.clear();
                }), e.ueditor.addListener("is_article_alive", function (e, t) {
                    return t && t.data("article") && t.data("article").data && "function" == typeof t.data("article").data.getData ? !0 : !1;
                }), e.ueditor.addListener("is_article_editing", function (e, t) {
                    return t.hasClass("current") ? !0 : !1;
                }), e.ueditor.addListener("draft_force_save", function () {
                    if (e.draft) {
                        var t = e.getData();
                        e.draft.activeId > 0 && (e.activeData = t), e.draft.forceSave(t, e.draft.activeId);
                    }
                }), e.ueditor.addListener("get_current_article", function () {
                    return e.$current || null;
                }), e.ueditor.addListener("get_current_article_all_img", function () {
                    var t = e.$current ? e.$current.data("article") : null;
                    return t && "function" == typeof t.getAllImgData ? t.getAllImgData() : [];
                }), e.ueditor.addListener("update_remote_img", function (t, i) {
                    e.updateRemoteImg(i);
                }), e.ueditor.addListener("end_crop_img", function () {
                    e.crop_img_ing = !1;
                }), e.ueditor.addListener("start_crop_img", function () {
                    e.crop_img_ing = !0;
                }), l.on("_preview", function () {
                    e._preview();
                });
            },
            _getArticleDiffData: function () {
                var e = 200, t = this.getData(), i = [], a = null;
                if (t) {
                    for (var r = !0, n = 0, o = t.length; o > n; n++) i.push({
                        content: t[n].content.text().substr(0, e),
                        title: t[n].title
                    });
                    for (var n = 0, o = i.length; o > n; n++) {
                        var s = i[n];
                        if (!s.title || !s.content || s.content.length != e) {
                            r = !1;
                            break;
                        }
                        for (var d = n + 1; o > d; d++) {
                            var c = i[d];
                            if (!c.title || !c.content || c.content.length != e) {
                                r = !1;
                                break;
                            }
                            if (s.title == c.title || s.content == c.content) {
                                r = !1;
                                break;
                            }
                        }
                        if (r === !1) break;
                    }
                    r === !0 && i.length > 0 && (a = i);
                }
                return a;
            },
            _getCurrentIndex: function () {
                return this.$current && this.$current.data("article") ? this.$current.data("article").getIndex() : 0;
            },
            _updateTitleTips: function () {
                var e = 0;
                this.$list.children().each(function () {
                    var t = $(this);
                    t.data("msgindex", e), t.children().attr("title", "第%s篇图文".sprintf(k[e]));
                    var i = t.data("article");
                    i && i.updateIndex(e), e++;
                });
            },
            _checkHmltDeep: function (e) {
                function t(e, r) {
                    var n = e.children(), o = n.length;
                    if (0 == o) return void(r >= i && a.push({
                        sid: 21,
                        time: r - 1
                    }));
                    for (var s = 0, d = o; d > s; s++) t(n.eq(s), r + 1);
                }

                try {
                    var i = 31, a = [], r = $.map(e, function (e, t) {
                        return 0 == t.indexOf("content") ? e : void 0;
                    });
                    $.each(r, function (e, i) {
                        t($("<div></div>").html(i), 1);
                    }), a.length > 0 && (c.saveSpeeds({
                        uin: window.wx.uin,
                        pid: 34,
                        speeds: a
                    }), c.send());
                } catch (n) {
                }
            },
            _checkExternalLink: function (e) {
                var t = [], i = $.map(e, function (e, t) {
                    return 0 == t.indexOf("content") ? e : void 0;
                });
                if ($.each(i, function (e, i) {
                    for (var a = /http\:\/\/([\w-]+\.)+[\w-]+(\:\d*)?(\/[\w\- \.\/\?%&=]*)?/gi, r = null, n = ""; null != (r = a.exec(i));) n = i.substring(r.index, a.lastIndex),
                    h.isLocalDomain(n) || t.push(i.substring(Math.max(0, r.index - 20), a.lastIndex));
                }), t.length) {
                    var a = (t.length, {
                        lc: t.length
                    });
                    $.each(t, function (e, t) {
                        a["log" + e] = encodeURIComponent(t);
                    }), $.post("//mp.weixin.qq.com/mp/jsmonitor?idkey=28308_7_1", a);
                }
            },
            add: function (e) {
                var t = this, i = t.$list.children().length;
                if (i >= t.maxNum) return void m.err("你最多只可以加入%s条图文消息".sprintf(t.maxNum));
                i == t.maxNum - 1 && t.$list.parent().siblings("a").hide();
                var a = new y({
                    isNew: e.isNew === !1 ? !1 : !0,
                    app_id: t.app_id || "",
                    dom: t.opt.editor_selector,
                    data: e.data,
                    index: i,
                    ueditor: t.ueditor,
                    freeUEditor: t.freeUEditor
                }), r = $.parseHTML(wx.T(j, a.data.getData()))[0], n = $(r).appendTo(t.$list);
                return a.setListItem(n), n.data("article", a), $(".js_scrollbar").scrollbar.updateScrollbars(!0),
                    t.$list.children().find(".js_down").show(), t.$list.children().last().find(".js_down").hide(),
                    n;
            },
            remove: function (e, t) {
                var i = this, a = i.$list.children().eq(e);
                i.$current && e != i.$current.index() && i.select(e);
                var r = a.data("article").flush();
                return t === !0 ? i.drop(e) : (a.find(".appmsg_edit_mask").css("display", "block"), new g({
                    dom: a.find(".js_del"),
                    content: "确定删除此篇图文？",
                    hideIfBlur: !0,
                    buttons: [{
                        text: "确定",
                        click: function () {
                            if (i.drop(e), i.app_id) {
                                var t = new Image;
                                t.src = "/cgi-bin/reportmaterialoper?oper=1&idx=" + e + "&msgid=" + i.app_id + "&token=" + wx.data.t;
                            }
                            this.remove();
                        },
                        type: "primary"
                    }, {
                        text: "取消",
                        click: function () {
                            a.find(".appmsg_edit_mask").css("display", ""), this.remove();
                        }
                    }]
                })), r;
            },
            drop: function (e) {
                var t = this;
                0 != e && t.select(Math.max(0, e - 1)), t.$list.children().eq(e).remove(), t.$list.parent().siblings("a").show(),
                    t.$list.children().find(".js_down").show(), t.$list.children().last().find(".js_down").hide(),
                    $(".js_scrollbar").scrollbar.updateScrollbars(!0), t._updateTitleTips();
            },
            select: function (e, t, i) {
                var a = this, r = "number" != typeof e ? e : a.$list.find(".js_appmsg_item").eq(e);
                r.addClass("current");
                var n = null;
                if (r.siblings().removeClass("current"), a.$current) {
                    if (e == a.$current.index()) return;
                    n = a.$current.data("article"), n && n.flush(), a._checkRepeat();
                }
                n = r.data("article"), n && (!t && n.hideErrorTips(), a.$current = r, n.render()), i || setTimeout(function () {
                    $(window).scrollTop(n.scrollTop), $("div.appmsg_edit_box").css({
                        overflow: "hidden"
                    }), setTimeout(function () {
                        $("div.appmsg_edit_box").css({
                            overflow: ""
                        });
                    }, 0);
                }, 100), $("#js_appmsg_upload_cover").siblings("ul").hide(), a.ueditor.fireEvent("afterArticleSelect", e);
            },
            updateRemoteImg: function (e) {
                var t = e.article;
                if (this.ueditor.fireEvent("is_article_alive", t) === !0) {
                    var i, a = t.data("article").data, r = t.hasClass("current") ? !0 : !1, o = $("<div>"), s = (e.type,
                        e.uid);
                    if (r) i = $(this.ueditor.getDocument()).find("[data-remoteid=" + s + "]"); else {
                        if (this.ueditor.funcPvUvReport("not_cur_img_count"), !a.get("content")) return;
                        i = o.html(a.get("content")).find("[data-remoteid=" + s + "]");
                    }
                    if (i) {
                        n.changeRemoteImgUrl({
                            imgDom: i,
                            remoteType: e.remoteType,
                            format: e.format,
                            img_url: e.img_url,
                            editor: this.ueditor
                        });
                        var d = $("body").find("div.dialog_wrp").find(".js_imgItemSrc[data-remoteid=" + s + "]");
                        d && d.length > 0 && (n.changeRemoteImgUrl({
                            imgDom: d,
                            remoteType: e.remoteType,
                            img_url: e.img_url,
                            errDefaultStyle: !0,
                            editor: this.ueditor
                        }), d.parents(".js_imgItem").removeClass("loading_item"), d.siblings(".js_title_img_mask").remove()),
                        r || (a.set("content", o.html()), t.data("article").data.setData(a.getData()));
                    }
                }
            },
            _checkRepeat: function () {
                try {
                    var e = function (e, t, i) {
                        var a = {};
                        return e = $.extend(e, t), $.each(i, function (t, i) {
                            a[i] = e[i];
                        }), a;
                    }, t = this, i = t.$current.index(), a = t.$current.data("article").data, r = ["author", "digest", "file_id", "source_url", "title", "content"], n = e({}, a.getData(), r);
                    if ("" == a.get("content") || "" == a.get("title")) return;
                    var o = !0;
                    if ($.each(r, function (e, t) {
                        n[t] && (o = !1);
                    }), o) return;
                    t.$list.find(".js_appmsg_item").each(function (a) {
                        if (a != i) {
                            var o = e({}, $(this).data("article").data.getData(), r);
                            E(n, o, null, null, !0) && ((new Image).src = "//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=[repeat][appid:%s,idx:%s,bizuin:%s]".sprintf(28308, 1, t.app_id || 0, a, wx.data.uin));
                        }
                    });
                } catch (s) {
                }
            },
            getData: function (e, t) {
                var i = this, a = [], r = null, n = i.$current;
                n && (r = n.data("article"), r && r.flush());
                var o = !0;
                return i.$list.find(".js_appmsg_item").each(function (r) {
                    var n = $(this).data("article");
                    if (n) {
                        var s = n.getData(e, t);
                        return null == s ? (i.select(r, !0, !0), o = !1, !1) : void a.push(s);
                    }
                }), 0 == a.length ? !1 : o && a;
            },
            getPostData: function (e) {
                var i = this, a = i.getData(!0, e);
                if (!a) return null;
                var r = {
                    AppMsgId: i.app_id,
                    count: a.length,
                    data_seq: (i.data_seq || "0") + "",
                    operate_from: t()
                };
                return $.each(a, function (e, t) {
                    var i = {};
                    $.each(t, function (t, a) {
                        i[t + e] = a;
                    }), $.extend(r, i);
                }), r;
            },
            _checkSeqError: function (e, t) {
                try {
                    if (!t || 0 == t.length) return;
                    for (var i = [], a = 0; a < e.count; a++) {
                        var r = e["content" + a];
                        i.push(r ? r.text() : "");
                    }
                    for (var a = 0, n = t.length; n > a; a++) {
                        var r = t[a];
                        if (r && "undefined" != typeof r.content) {
                            var o = r.content.text();
                            if (o && i[a] && o != i[a]) for (var s = 0, d = i.length; d > s; s++) if (s != a && i[s] && o == i[s]) {
                                var c = new Image, l = ["appmsgid:", e.AppMsgId || "", ";operate_from:", e.operate_from, ";web_index:", s, ";cgi_index:", a, ";title:", e["title" + s] || ""];
                                c.src = ["https://badjs.weixinbridge.com/badjs?level=4&id=114&msg=", encodeURIComponent(l.join("")), "&uin=", window.wx.data.uin || "", "&from=1&t=", Math.random()].join("");
                            }
                        }
                    }
                } catch (f) {
                }
            },
            update: function (e) {
                if (e && 0 != e.length) {
                    var t;
                    this.$current && (t = this.$current.index() || 0);
                    for (var i = ["content", "title", "author", "digest"], a = 0, r = e.length; r > a; a++) {
                        var n = e[a];
                        if (n) {
                            for (var o = !1, s = {}, d = 0; d < i.length; d++) "undefined" != typeof n[i[d]] && (o = !0, s[i[d]] = n[i[d]]);
                            if (o !== !1) if (this.$current && this.$current.index() == a) {
                                var c = this.$current.data("article");
                                c && c.data && "function" == typeof c.data.get && 1 * c.data.get("is_share_copyright") != 1 && c.modifyEditingData(s);
                            } else {
                                var c = this.$list.find(".js_appmsg_item").eq(a).data("article");
                                if (c && c.data && "function" == typeof c.data.set && 1 * c.data.get("is_share_copyright") != 1) {
                                    for (var l in s) c.data.set(l, s[l]);
                                    this.select(a, 0, 0);
                                }
                            }
                        }
                    }
                    this.$current && this.$current.index() != t && this.select(t, 0, 0);
                }
            },
            save: function (e, t, i, r, o, d) {
                var c = this._deserializeReadOnlyType();
                if (!(1 & c.right || this._saving === !0)) {
                    var l = 0, f = this;
                    try {
                        l = 3;
                        {
                            f.getData();
                        }
                        l = 4;
                        var _ = f.getPostData(i || d);
                        if (l = 5, !_) return;
                        f.hasConfirmed && (f.hasConfirmed = !1, _.confirm = 1), "undefined" != typeof f.confirm_treatment && (_.confirm_treatment = f.confirm_treatment),
                        "undefined" != typeof f.cover_word && (_.cover_word = f.cover_word), "undefined" != typeof f.hint_word && (_.hint_word = f.hint_word),
                            e.btn(!1), f._saving = !0, a(30, .1, "error"), n.waitAsynAction({
                            editor: f.ueditor,
                            callback: function () {
                                var n = f.getPostData(i || d);
                                return n ? (1 === _.confirm && (n.confirm = 1), _.confirm_treatment && (n.confirm_treatment = _.confirm_treatment),
                                _.cover_word && (n.cover_word = _.cover_word), _.hint_word && (n.hint_word = _.hint_word),
                                    n = f.filtercharCode(n), a(31, .1, "error"), f.ueditor.fireEvent("reportAddNum", 65080, 91, 1),
                                    void w.appmsg.save(!0, 10, n, function (i) {
                                        f.confirm_treatment = void 0, f.cover_word = void 0, f._saving = !1, e.btn(!0), f.app_id = i.appMsgId,
                                            f.data_seq = i.data_seq + "", f.update(i.filter_content_html), f.lastData = f.getData() || !1,
                                        f.draft && (f.draft.clear(), f.draft._updateAppid(f.app_id, f.data_seq)), t(i, n), f._checkExternalLink(n),
                                            f._checkHmltDeep(n), f._checkSeqError(n, i.filter_content_html);
                                    }, function (t, a, n, o) {
                                        switch (f._saving = !1, e.btn(!0), 0 != t && f.select(1 * t), +a) {
                                            case 64515:
                                                f.ueditor.fireEvent("reportAddNum", 65080, 92, 1), f.readOnlyType = "3_4", f.conflict_ls_seq = f.data_seq + "",
                                                    f.data_seq = o.data_seq + "", f._renderReadOnly(u.timeFormat(o.update_time), o.operator_name, o.operate_from);
                                                break;

                                            case 200041:
                                                m.err(o.myErrMsg), f.draft = null, f.readOnlyType = "3_1", f._renderReadOnly();
                                                break;

                                            case 1530503:
                                                $(".frm_msg.js_warn").text(o.myErrMsg).show(), $("input[name='source_url']").focus();
                                                break;

                                            case 1530504:
                                                $(".page_msg.js_warn").show().find(".profile_link_msg_global").text(o.myErrMsg),
                                                    $(window).scrollTop(0);
                                                break;

                                            case 1530510:
                                                $(".frm_msg.js_warn").text(o.myErrMsg).show(), $("input[name='source_url']").focus();
                                                break;

                                            case 1530511:
                                                $(".page_msg.js_warn").show().find(".profile_link_msg_global").text(o.myErrMsg),
                                                    $(window).scrollTop(0);
                                                break;

                                            case 153007:
                                            case 153008:
                                            case 153009:
                                            case 200042:
                                            case 200043:
                                            case 64601:
                                            case 64602:
                                            case 64603:
                                            case 64604:
                                            case 64605:
                                            case 153010:
                                                p.show({
                                                    width: 750,
                                                    type: "warn",
                                                    msg: o.myErrMsg,
                                                    buttons: [{
                                                        text: "确定",
                                                        click: function () {
                                                            this.remove();
                                                        }
                                                    }]
                                                });
                                                break;

                                            case 10811:
                                            case 10812:
                                            case 10813:
                                            case 10814:
                                                f.hint_word = o.hint_word.join("|"), new s({
                                                    hint_word: o.hint_word,
                                                    remind_wording: o.remind_wording,
                                                    onHide: function () {
                                                        f.confirm_treatment = void 0, f.cover_word = void 0;
                                                    },
                                                    onChange: function (e, t) {
                                                        e.find(".js_btn_p").eq(0).enable(), f.cover_word = 0 == t.checkbox("value") ? 0 : 1;
                                                    },
                                                    buttons: [{
                                                        text: "继续保存",
                                                        type: "primary",
                                                        click: function () {
                                                            this.remove(), f.confirm_treatment = o.confirm_treatment, e.trigger("click");
                                                        }
                                                    }, {
                                                        text: "取消",
                                                        click: function () {
                                                            f.confirm_treatment = void 0, f.cover_word = void 0, this.remove();
                                                        }
                                                    }]
                                                });
                                                break;

                                            case 13002:
                                                $(".js_ad_tips_wording").text(o.myErrMsg), $(".js_ad_error_tips").parent().show(),
                                                    $(".js_ad_error_tips").show(), r && r.fireEvent("scrollIntoView", $(".js_ad_preview"), $(window).height() - $(".js_ad_preview").height() - 72 - 30);
                                                break;

                                            case 13003:
                                                var d = "/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&lang=zh_CN&token=" + wx.data.t + "&type=10&appmsgid=" + o.ad_article_msgid + "&isMul=1";
                                                $(".js_ad_tips_wording").html('已有文章<a href="%s" target="_blank">《%s》</a>过该广告卡片，一个广告卡片仅可插入一篇文章'.sprintf(d, o.ad_article_title)),
                                                    $(".js_ad_error_tips").parent().show(), $(".js_ad_error_tips").show(), r && r.fireEvent("scrollIntoView", $(".js_ad_preview"), $(window).height() - $(".js_ad_preview").height() - 72 - 30);
                                                break;

                                            case 13004:
                                                $(".js_ad_tips_wording").text(o.myErrMsg), $(".js_ad_error_tips").parent().show(),
                                                    $(".js_ad_error_tips").show(), r && r.fireEvent("scrollIntoView", $(".js_ad_preview"), $(window).height() - $(".js_ad_preview").height() - 72 - 30);
                                                break;

                                            case 15801:
                                            case 15802:
                                            case 15803:
                                            case 15804:
                                            case 15805:
                                            case 15806:
                                                p.show({
                                                    type: "warn",
                                                    msg: n || "你所编辑的图文消息可能含有违反微信公众平台平台协议、相关法律法规和政策的内容|你可以继续保存或发布该图文消息，若保存或发布后，经核实涉嫌含有上述相关内容的，将可能被作删除、屏蔽等处理。<br/><a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN&token=2056316619' target='_blank'>对应规则</a>",
                                                    buttons: [{
                                                        text: i ? "继续预览" : "继续保存",
                                                        click: function () {
                                                            this.remove(), f.hasConfirmed = !0, f.confirm_treatment = o.confirm_treatment, e.trigger("click");
                                                        }
                                                    }, {
                                                        text: "取消",
                                                        type: "normal",
                                                        click: function () {
                                                            f.confirm_treatment = void 0, f.cover_word = void 0, this.remove();
                                                        }
                                                    }],
                                                    close: function () {
                                                        f.confirm_treatment = void 0, f.cover_word = void 0;
                                                    }
                                                });
                                                break;

                                            case 153012:
                                                setTimeout(function () {
                                                    $("html, body").animate({
                                                        scrollTop: $(".origined").offset().top - 60
                                                    });
                                                }, 100), $("#original_type_msg").show();
                                                break;

                                            case 64518:
                                                m.err("保存失败，不允许包含多个投票");
                                                break;

                                            case 64519:
                                                m.err("保存失败，包含了不属于该公众号的投票");
                                                break;

                                            case 64520:
                                                m.err("保存失败，包含了未发布的投票");
                                                break;

                                            default:
                                                var t = o && o.myErrMsg ? o.myErrMsg : "保存失败";
                                                m.err(t);
                                        }
                                    })) : (f._saving = !1, void e.btn(!0));
                            }
                        }), l = 6;
                    } catch (g) {
                        f._saving = !1, e.btn(!0), m.err("保存失败，请稍后再试"), l && ((new Image).src = "//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=editor_save_error;errmsg:%s,appid:%s,bizuin:%s".sprintf(28308, l, g.message, f.app_id || 0, wx.data.uin)),
                        window.BJ_REPORT && "function" == typeof window.BJ_REPORT.report && g && g.stack && (g.stack = "editor_save_error|" + g.stack,
                            window.BJ_REPORT.report(g)), g.stack && console && console.error && console.error("[BJ-REPORT]", g.stack);
                    }
                }
            },
            filtercharCode: function (e) {
                var t = !1;
                for (var i in e) e.hasOwnProperty(i) && "function" == typeof e[i].replace && (e[i] = e[i].replace(/[\ud800-\uDFFF]/g, function (e, i, a) {
                    return /[\ud800-\udbff]/.test(e) && /[\uDC00-\uDFFF]/.test(a.charAt(i + 1) || "") ? e : /[\ud800-\udbff]/.test(a.charAt(i - 1) || "") && /[\uDC00-\uDFFF]/.test(e) ? e : (t = !0,
                        "");
                }));
                return t && ((new Image).src = "//mp.weixin.qq.com/mp/jsmonitor?idkey=28308_11_1"), e;
            },
            preview: function (e, t) {
                var i = this;
                i.save($("#js_preview"), function (a) {
                    for (var r = i.getPostData(), n = i.getData(), o = 0; 8 > o; o++) r["content" + o] && (r["content" + o] = e.handlerContent(r["content" + o], !0),
                        r["content" + o] = r["content" + o].replace("/cgi-bin/readtemplate?t=tmpl/cpc_tmpl", "/cgi-bin/readtemplate?t=tmpl/cpc_tmpl&preview=1")),
                    n && n[o] && (r["ad_info" + o] = n[o].ad_info);
                    D.show(r, i.$current.index(), n, e), "function" == typeof t && t(a);
                }, !0, e, i.$current.index());
            },
            _preview: function () {
                var e = this, t = e.getPostData();
                new r({
                    AppMsgId: t.AppMsgId,
                    type: 2,
                    hasConfirmed: e.hasConfirmed,
                    selectFun: e.select,
                    uin: wx.data.uin,
                    token: wx.data.t,
                    nickname: wx.data.nick_name
                });
            }
        });
    return I;
});
define("tpl/media/appmsg_edit/article.html.js", [], function () {
    return '<div id="read_only_container" class="page_msg mini" style="display:none;">\n    <div class="inner">\n        <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>\n        <div class="msg_content">\n            <p></p>\n            <span class="js_close msg_closed" style="display:none;">关闭</span>\n        </div>\n    </div>    \n</div>\n<div class="appmsg_editor">\n    <div class="appmsg_editor_inner">\n        <!-- BEGIN UEDITOR -->\n        <div id="js_ueditor" class="appmsg_edit_item content_edit">\n            <label for="" class="frm_label" style="display:none;">\n                <strong class="title">正文</strong>\n\n                <p class="tips l">\n                    <em id="js_auto_tips"></em>\n                    <a id="js_cancle" style="display:none;" href="javascript:void(0);"\n                       onclick="return false;">取消</a>\n                </p>\n            </label>\n<!--        <div class="frm_msg fail js_catch_tips" style="display:none;">有5张图片粘贴失败</div>\n            <div class="frm_msg fail js_content_error" style="display:none;">正文不能为空且长度不能超过20000字</div> -->\n            <div id="js_editor" class="edui_editor_wrp"></div>\n        </div>\n        <!-- END UEDITOR -->\n\n        <!-- BEGIN 原创文章预览 -->\n        <div id="reprint_article_main" style="display:none;" class="appmsg_edit_origin_preview">\n            <div class="share_media">\n                <div class="original_panel" lang="en">\n                    <div class="flex_context original_account">\n                        <div class="js_head_img flex_hd">\n                            <span class="radius_avatar original_account_avatar">\n                                <img class="js_headimg account_avatar" src="" alt="">\n                            </span>\n                        </div>\n                        <div class="flex_bd">\n                            <div class="js_nickname original_account_nickname"></div>\n                        </div>\n                    </div>\n                    <div class="js_title original_panel_title">\n                    </div>\n                    <div class="js_content original_panel_content"></div>\n                    <div class="original_panel_tool">\n                        <a class="js_link" target="_blank" href="javascript:;">阅读全文</a>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <!-- END 原创文章预览 -->\n\n        <!-- BEGIN 广告预览 -->\n        <div class="appmsg_edit_ad_preview js_readonly" style="display: none;">\n            <div class="page_msg mini js_ad_error_tips" style="display: none;">\n                <div class="inner">\n                    <span class="msg_icon_wrp"><i class="icon_msg_mini warn"></i></span>\n                    <div class="msg_content">\n                        <p class="js_ad_tips_wording">该广告为头条广告位，不能插入在非头条文章中。</p>\n                    </div>\n                </div>\n                <span class="msg_closed js_msg_close">关闭</span>\n            </div>\n            <div class="ad_preview_box js_ad_preview"></div>\n            <div class="mpda_preview_ft_tips">\n                <span class="radius_tag js_tag">广告推荐</span><span class="tips_global">文章编辑后需发送给广告主预览，操作请进入<a class="js_jumpToOrder" target="_blank" href="javascript:void(0);">广告订单页面</a></span>\n            </div>\n        </div>\n        <!-- END 广告预览-->\n\n        <div class="appmsg_edit_function_area js_readonly">\n            <!-- BEGIN 原文链接 -->\n            <div class="js_url_area appmsg_edit_item origin_url_area js_reprint_hide">\n                <label for="" class="frm_label">\n                    <label class="frm_checkbox_label" for="js_url_checkbox">\n                        <input type="checkbox" class="frm_checkbox js_url_checkbox js_field" name="source_url_checked">\n                        <i class="icon_checkbox"></i>\n                        <span class="lbl_content">\n                            原文链接                        </span>\n                    </label>\n                </label>\n                <span class="frm_input_box" style="display:none;"><input type="text" class="js_url frm_input js_field" name="source_url"></span>\n                <span class="js_url_ban_wording" style="position:relative; top:1em;"></span>\n                <div class="profile_link_msg_global source_url frm_msg fail js_warn" style="display:none;">请勿添加其他公众号的主页链接</div>\n                <div class="frm_msg fail js_url_error" style="display:none;">链接不合法</div>\n            </div>\n            <!-- END 原文链接 -->\n            <!--BEGIN 留言 -->\n            {if can_use_comment}\n            <div class="appmsg_edit_item ">\n                <label class="frm_checkbox_label comment_checkbox" for="">\n                    <input type="checkbox" class="frm_checkbox js_comment js_field" checked name="need_open_comment">\n                    <i class="icon_checkbox"></i>\n                    <span class="lbl_content">留言</span>\n                </label>\n                <div class="comment_radio_wrp" id="js_comment_setting_wrp" style="display:none;">\n                    <input data-label="所有人可留言" class="frm_radio js_comment_setting" type="radio" value="0">\n                    <input data-label="仅关注后可留言" class="frm_radio js_comment_setting" type="radio" value="1">\n                </div>\n            </div>\n            {/if}\n            <!-- END 留言-->\n            {if has_invited_original}\n            <!--如果可以使用原创功能-->\n            <div id="js_original" class="appmsg_edit_item original_area js_reprint_hide">\n                <!--BEGIN 未开通原创-->\n                {if can_use_copyright}\n                <div class="unorigin js_original_type">\n                    <div class="cont">\n                        <h4 class="subtitle">原创：未声明</h4>\n                        <!--\n                        <p class="tips_global original_title_tips">原创声明是公众平台关于支持原创者的功能</p>\n                        -->\n                    </div>\n                    <div class="opt">\n                        <a href="javascript:;" onclick="return false;" class="btn btn_default js_original_apply">声明原创</a>\n                    </div>\n                </div>\n                {else}\n                <div class="unorigin js_original_type">\n                    <div class="cont">\n                        {if orginal_apply_stat == 0}\n                        <h4 class="subtitle">原创声明：未开通</h4>\n                        {else if orginal_apply_stat == 1}\n                        <h4 class="subtitle">原创声明：审核中</h4>\n                        {else if orginal_apply_stat == 2}\n                        <h4 class="subtitle">原创声明：申请失败</h4>\n                        {else if orginal_apply_stat == 3}\n                        {/if}\n                    </div>\n                    {if orginal_apply_stat == 0}\n                    <div class="opt">\n                        <div class="description">\n                            <p class="desc">原创声明是公众平台为维护原创作者权益推出的功能。</p>\n                            <p class="desc">1. 开通后，你可以选择文章是否允许被转载；</p>\n                            <p class="desc">2. 声明原创的文章被转载时，系统会自动注明文章出处。</p>\n                        </div>\n                        <a href="javascript:;" onclick="return false;" class="btn btn_default" id="js_original_func_open">开通</a>\n                    </div>\n                    {/if}\n                </div>\n                {/if}\n                <!--END 未开通原创-->\n                <!--BEGIN 开通原创-->\n                <div class="origined js_original_type" style="display:none;">\n                    <label class="frm_label" id="js_original_open">\n                        <span class="mini_tips icon_before l">\n                            原创：已声明                        </span>\n                        <a href="javascript:;" onclick="return false;" class="js_original_cancel r">撤销声明</a>\n                        <a href="javascript:;" onclick="return false;" class="js_original_apply r">编辑声明</a>\n                    </label>\n\n                    <div class="normal_flow js_original_content" style="display:none">\n                        <!--添加.js_original_content元素 .open类名，小箭头向上，不添加则向下-->\n                        <div id="js_original_detail" class="preview_hd">\n                            原创详情<i class="icon_arrow"></i>\n                        </div>\n                        <ul class="simple_preview_list tips_global">\n                            <!--\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">原文链接</label>\n\n                                <div class="simple_preview_value js_url"></div>\n                            </li>\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">首发平台</label>\n\n                                <div class="simple_preview_value js_platform"></div>\n                            </li>\n                            -->\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">作者</label>\n\n                                <div class="simple_preview_value js_author"></div>\n                            </li>\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">文章类别</label>\n\n                                <div class="simple_preview_value js_classify"></div>\n                            </li>\n                            <!--\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">转载类型</label>\n\n                                <div class="simple_preview_value js_frm"></div>\n                            </li>\n                            -->\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label mini_tips icon_after" for="">白名单<i class="icon_msg_mini ask js_whitelist_tips"></i></label>\n                                <div class="simple_preview_value">\n                                    <div class="original_user_list js_whitelist"></div>\n                                    <a href="javascript:;" class="js_add_whitelist">添加白名单</a>\n                                </div>\n                            </li>\n                        </ul>\n                        {if can_use_reward}\n                        <!--如果可以使用赞赏功能-->\n                        <div class="reward_edit_item">\n\n                            <h4 class="reward_edit_title">赞赏设置</h4>\n                            <p class="reward_edit_tips tips_global">\n                                根据苹果公司规定，微信iOS版赞赏功能关闭，其他客户端版本仍可照常使用。                                <a onclick="return false;" href="javascript:;" class="js_reward_notice">查看须知</a>\n                            </p>\n\n                            <label class="frm_checkbox_label" for="reward">\n                                <input type="checkbox" name="can_reward" class="frm_checkbox js_reward js_field" value="1" checked>\n                                <i class="icon_checkbox"></i>\n                                <span class="lbl_content">\n                                    接受用户赞赏                                    <!--<span class="mini_tips weak_text">（申请原创声明后才可勾选）</span>-->\n                                </span>\n                            </label>\n\n                            <div class="frm_control_group js_reward_div">\n                                <label for="" class="frm_label">赞赏引导语（选填）</label>\n                                <div class="frm_controls">\n                                <span class="frm_input_box reward_wording"><input type="text" name="reward_wording" class="frm_input  js_counter js_reward_wording js_field"\n                                    max-length="15" placeholder="赞赏引导语（选填）"></span>\n                                </div>\n                            </div>\n                            {if is_ios_reward_open}\n                            <div class="frm_control_group js_reward_ios_wrap">\n                                <label for="" class="frm_label mini_tips icon_after">iOS转账金额设置<i class="icon_msg_mini ask js_reward_ios_tips"></i></label>\n                                <div class="frm_controls">\n                                    <div class="reward_radio_wrp frm_vertical_lh">\n                                        <label class="frm_radio_label">\n                                            <i class="icon_radio"></i>\n                                            <span class="lbl_content">任意金额</span>\n                                            <input type="radio" class="frm_radio js_reward_ios" value="0">\n                                        </label>\n                                        <label class="frm_radio_label">\n                                            <i class="icon_radio"></i>\n                                            <span class="lbl_content">固定金额</span>\n                                            <input type="radio" class="frm_radio js_reward_ios" value="1">\n                                        </label>\n                                    </div>\n                                    <div class="frm_input_box with_counter counter_in append fix_money_input js_reward_ios_money">\n                                        <input type="text" name="reward_money" class="frm_input js_field">\n                                        <em class="frm_input_append frm_counter">元</em>\n                                    </div>\n                                    <div class="frm_msg fail js_reward_money_error" style="display:none;"></div>\n                                    <!--\n                                    <div class="js_reward_ios_wrap" style="display: none;">\n                                        <input type="checkbox" name="reward_money" class="frm_checkbox js_reward_ios js_field" value="1" data-label="iOS转账固定金额" />\n                                        <i class="icon_msg_mini ask js_reward_ios_tips"></i>\n                                        <div class="appmsg_edit_item js_reward_ios_money" style="display: none;">\n                                            <span class="frm_input_box with_counter counter_in append">\n                                                <input type="text" name="reward_money" class="frm_input js_field">\n                                                <em class="frm_input_append frm_counter">元</em>\n                                            </span>\n                                        </div>\n                                    </div>\n                                    -->\n                                </div>\n                            </div>\n                            {/if}\n                        </div>\n\n\n                        </div>\n                        {/if}\n                        {if can_use_payforread}\n                        <!--如果可以使用付费阅读功能-->\n                        <div class="payread">\n                            <label class="frm_checkbox_label" for="js_pay">\n                                <input name="payforread_enabled" type="checkbox" id="js_pay" class="frm_checkbox js_field" value="1">\n                                <i class="icon_checkbox"></i>\n                                <span class="lbl_content">\n                                    付费阅读                                    <span class="mini_tips weak_text js_pay_tips">（只有“禁止转载”的原创文章才可以设置付费阅读）</span>\n                                </span>\n                                <p class="pay_seting js_pay_setting" style=\'display:none\'>\n                                    <label class="frm_fee">金额：<span class="js_fee"></span>元</label>\n                                    <a onclick="return false;" href="javascript:;" class="js_pay_edit">修改</a>\n                                </p>\n                            </label>\n                        </div>\n                        {/if}\n                        <!--<input type="hidden" class="js_original_publish">-->\n                        <input type="hidden" class="js_reprint_frm">\n                    </div>\n\n                    <p class="frm_msg fail js_error_msg" id="original_type_msg" style=\'display:none\'>请设置转载类型</p>\n                </div>\n                <!--END 开通原创-->\n            </div>\n            {/if}\n        </div>\n        \n        <div class="appmsg_edit_highlight_area js_readonly">\n\n            <div class="appmsg_edit_title">发布样式编辑</div>\n            <!-- EBGIN 封面 -->\n            <div class="appmsg_edit_item gap_left">\n                <label for="" class="frm_label">\n                    <strong class="title">封面</strong>\n\n                    <p class="js_cover_tip tips gap_left"></p>\n                </label>\n                <div class="upload_wrap">\n                    <div class="js_reprint_hide">\n                        <!--\n                        <div class="upload_box">\n                            <div class="upload_area">\n                                <a id="js_appmsg_upload_cover" href="javascript:void(0);" onclick="return false;"\n                                   class="btn btn_upload">\n                                    本地上传                                </a>\n                            </div>\n                        </div>-->\n                        <a id="js_selectCoverFromContent" href="javascript:void(0);" onclick="return false;"\n                           class="btn btn_upload">从正文选择</a>\n                        &nbsp;&nbsp;\n                        <a id="js_imagedialog" href="javascript:void(0);" onclick="return false;"\n                                       class="btn btn_upload">从图片库选择</a>\n                    </div>\n                    \n\n                    <div class="cover_preview_wrp js_cover">\n                        <!-- 20160415 -->\n                        <!-- 这里的js_cover先去掉了，要改dom，不能用img，改用span加背景图片方式 -->\n                        <!-- cover_preview默认隐藏，有数据了才显示 -->\n                        <span class="cover_preview js_cover_preview">\n                            <div id="js_cover_mask" class="card_mask_global js_tip_mask hover_mask">\n                                <!--\n                                <p class="js_tip_mask_msg cover_error_msg">源图片已被删除<br>请<a href="javascript:void(0);">重新设置</a>封面</p>\n                                -->\n                                <!--修改封面 -->\n                                <a class="js_modifyCover icon20_common edit_media_white" title="修改封面" href="javascript:void(0);" onclick="return false;">修改封面</a>\n                                \n                                <a class="js_removeCover icon20_common del_media_white" title="删除封面" href="javascript:void(0);" onclick="return false;">删除</a>\n                            </div>\n                        </span>\n                        <input type="hidden" class="js_field js_file_id" name="file_id">\n                        <input type="hidden" class="js_field js_cdn_url" name="cdn_url">\n                        <input type="hidden" class="js_field js_cdn_url_back" name="cdn_url_back">\n                        <input type="hidden" class="js_show_cover_pic js_field" data-type=\'checkbox\' name="show_cover_pic">\n                    </div>\n                </div>                \n\n                <!-- <p class="frm_tips">\n                    <label for="" class="frm_checkbox_label">\n                        <i class="icon_checkbox"></i>\n                        <input type="checkbox" class="frm_checkbox js_show_cover_pic js_field" name="show_cover_pic" checked>\n                        封面图片显示在正文中                    </label>\n                </p> -->\n                <div class="frm_msg js_show_cover_pic_tips" style="display: none;">\n                    <span class="tips js_msg_content">在正文顶部插入封面图原图片</span>\n                </div>\n                <div class="frm_msg fail js_cover_error js_error_msg" style="display:none;">\n                    <span class="js_msg_content"></span>\n                </div>\n            </div>\n            <!-- END 封面 -->\n            <!-- BEGIN 摘要 -->\n            <div class="js_desc_area appmsg_edit_item gap_left align_counter appmsg_description">\n                <label for="" class="frm_label">\n                    <strong class="title">摘要</strong>\n                </label>\n                <span class="frm_textarea_box with_counter counter_out">\n                    <textarea placeholder="选填，如果不填写会默认抓取正文前54个字" class="frm_textarea js_desc js_counter js_field" name="digest" max-length="120"></textarea>\n                    <em class="frm_input_append frm_counter">0/120</em>\n                </span>\n\n                <div class="frm_msg fail js_desc_error" style="display:none;"></div>\n            </div>\n            <!-- END 摘要 -->\n        </div>\n    </div>\n</div>\n';
});
define("common/wx/mpEditor/editor.js", ["widget/ueditor_new/themes/default/ueditor.css", "widget/ueditor_new/themes/default/css/ueditor.css", "widget/tooltip.css", "tpl/mpEditor/layout.html.js", "common/wx/mpEditor/plugin/filter.js", "common/wx/mpEditor/contextmenu.js", "common/wx/mpEditor/editor_options.js", "common/wx/mpEditor/plugin/popup.js", "common/wx/mpEditor/plugin/remoteimg.js", "common/wx/mpEditor/plugin/scaleimg.js", "common/wx/mpEditor/plugin/cropimg.js", "tpl/tooltip.html.js", "media/report.js", "biz_common/utils/monitor.js"], function (t) {
    "use strict";

    function e(t) {
        this.__o = {
            needPopup: !0,
            imgScale: !0,
            scaleimgWheelScroll: !1,
            cropimgWheelScroll: !1,
            plugins: [],
            onReady: function () {
            }
        }, this.__ueditor_config = {
            pluginsContainer: {},
            debug: 0,
            layout: "",
            is_illegal: 0,
            contextMenu: r,
            UEDITOR_HOME_URL: g.URL,
            isShow: !0,
            canChangeIframeHeight: !0,
            initialContent: "",
            autoClearinitialContent: !1,
            iframeCssUrl: wx.EditorRes.iframe,
            textarea: "editorValue",
            focus: !1,
            minFrameWidth: 800,
            minFrameHeight: 400,
            autoClearEmptyNode: !0,
            fullscreen: !1,
            readonly: !1,
            zIndex: 999,
            imagePopup: !0,
            enterTag: "p",
            pageBreakTag: "_baidu_page_break_tag_",
            customDomain: !0,
            lang: g.LANG,
            theme: "default",
            allHtmlEnabled: !1,
            scaleEnabled: !1,
            wordCount: !1,
            elementPathEnabled: !1,
            autoHeightEnabled: !1,
            autoFloatEnabled: !0,
            sourceEditor: "textarea",
            imageUrl: "/cgi-bin/uploadimg2cdn?t=ajax-editor-upload-img&lang=" + g.LANG + "&token=" + g.TOKEN,
            imagePath: "",
            compressSide: 1,
            catchRemoteImageEnable: !0,
            catcherUrl: "/cgi-bin/uploadimg2cdn?lang=" + g.LANG + "&token=" + g.TOKEN,
            separater: "",
            toolbars: [["more", "|", "fontsize", "|", "blockquote", "horizontal", "|", "removeformat"], ["bold", "italic", "underline", "forecolor", "backcolor", "|", "justifyleft", "justifycenter", "justifyright", "justifyindent", "|", "rowspacingtop", "rowspacingbottom", "lineheight", "letterspacing", "|", "insertorderedlist", "insertunorderedlist", "|", "imagenone", "imageleft", "imageright", "imagecenter"]],
            labelMap: {
                anchor: "",
                undo: ""
            },
            topOffset: 0
        }, this.__init(t);
    }

    function n(t) {
        if (!t) return null;
        for (var e = 0, n = g.allEditor.length; n > e; e++) if (t === g.allEditor[e].getWindow()) return g.allEditor[e];
        return null;
    }

    t("widget/ueditor_new/themes/default/ueditor.css"), t("widget/ueditor_new/themes/default/css/ueditor.css"),
        t("widget/tooltip.css");
    var i = t("tpl/mpEditor/layout.html.js"), o = t("common/wx/mpEditor/plugin/filter.js"), r = t("common/wx/mpEditor/contextmenu.js"), a = t("common/wx/mpEditor/editor_options.js"), u = t("common/wx/mpEditor/plugin/popup.js"), s = t("common/wx/mpEditor/plugin/remoteimg.js"),
        l = t("common/wx/mpEditor/plugin/scaleimg.js"), d = t("common/wx/mpEditor/plugin/cropimg.js"), c = t("tpl/tooltip.html.js"), f = t("media/report.js"), m = t("biz_common/utils/monitor.js"), g = {
            allEditor: [],
            LANG: window.wx.data.lang,
            TOKEN: window.wx.data.t,
            URL: /^dev/.test(location.host) ? "/mpres/htmledition/style/widget/ueditor_new/" : "//res.wx.qq.com/mpres/htmledition/style/widget/ueditor_new/"
        };
    return e.prototype = {
        __init: function (t) {
            this.__g = {
                id: +new Date,
                asynList: {}
            }, this.__extend(t), this.__extendPlugins(), this.__registerPlugins(), this.__createEditor(),
                this.__initReport(), this.__initPulginEvent(), new s(this), this.__customEventHandle(),
                g.allEditor.push(this);
        },
        __extendPlugins: function () {
            var t = this.__o;
            t.imgScale && t.plugins.push(new l({
                wheelScroll: t.scaleimgWheelScroll
            })), t.needPopup && t.plugins.push(new d({
                coverWheelScroll: t.cropimgWheelScroll
            }));
        },
        __initReport: function () {
            var t = this;
            this.addListener("funcPvUvReport", function (e, n, i) {
                t.funcPvUvReport(n, i);
            }), this.addListener("reportAddNum", function (t, e, n, i) {
                f.addNum(e, n, i);
            }), this.addListener("getCommonReportIDKey", function (e, n) {
                if (!n) return null;
                var i;
                i = "[object String]" == Object.prototype.toString.call(n) ? [n] : n;
                for (var o = t.getUeditor(), r = o.options.commonReportConf, a = r, u = 0, s = n.length; s > u && (a = a[n[u]],
                    a); u++) ;
                if (a) {
                    var l = a.split("_");
                    return {
                        id: l[0],
                        key: l[1]
                    };
                }
                return null;
            });
        },
        __extend: function (t) {
            var e = this.__ueditor_config, n = this.__o, o = a.getOptions();
            for (var r in o) o.hasOwnProperty(r) && (e[r] = o[r]);
            for (var r in t) n.hasOwnProperty(r) ? n[r] = t[r] : e.hasOwnProperty(r) && (e[r] = t[r]);
            e.layout || (e.layout = i), e.layout = template.compile(e.layout);
        },
        __registerPlugins: function () {
            for (var t = this, e = this.__o.plugins, n = 0, i = e.length; i > n; n++) {
                var o = e[n];
                !function (e) {
                    var n = e.getName();
                    t.__ueditor_config.pluginsContainer[n] = function () {
                        var i = this;
                        "function" == typeof e.beforeDefineCommand && e.beforeDefineCommand(i, t), "function" == typeof e.getExecCommand && (i.commands[n] = {
                            execCommand: e.getExecCommand(),
                            noCommandReprot: "function" == typeof e.noCommandReprot ? e.noCommandReprot() : !1
                        }), "function" == typeof e.getQueryCommandState && (i.commands[n].queryCommandState = e.getQueryCommandState()),
                        "function" == typeof e.getQueryCommandValue && (i.commands[n].queryCommandValue = e.getQueryCommandValue());
                    }, t.__setPluginMenu(e), t.__pluginPerformance(e);
                }(o);
            }
        },
        __setPluginMenu: function (t) {
            var e = this.__ueditor_config.contextMenu;
            "function" == typeof t.getContextMenu && e.push("-", t.getContextMenu());
        },
        __pluginPerformance: function (t) {
            var e = 0;
            switch ("function" == typeof t.getType && (e = t.getType() || 0), e) {
                case 0:
                    this.__ceateDefaultBtn(t);
                    break;

                case 1:
                    this.__createToolBarBtn(t);
            }
        },
        __ceateDefaultBtn: function (t) {
            var e = this;
            if ("function" == typeof t.getContainer) {
                var n = t.getContainer();
                if (n) {
                    var i = $(n), o = t.getName();
                    i && i.length > 0 && i.click(function () {
                        e.execCommand(o);
                    });
                }
            }
        },
        __createEditor: function () {
            var t = this, e = this.__o, n = this.__ueditor_config;
            this.ueditor = new UE.ui.Editor(n), this.ueditor.ready(function () {
                t.__initToolbarTips(), e.needPopup && (t.__g.editorPopup = new u(t)), "function" == typeof e.onReady && e.onReady.call(t, t.ueditor);
            });
        },
        __initToolbarTips: function () {
            if (this.__ueditor_config.toolbars && 0 != this.__ueditor_config.toolbars.length) {
                var t = this.__g;
                t.toolbarsTips = $(template.compile(c)({
                    content: ""
                })), t.toolbarsTips.hide(), $("body").append(t.toolbarsTips), $(this.ueditor.container).find("[id*=_toolbarboxouter]").on("mouseover", function (e) {
                    var n = $(e.target || e.srcElement), i = n.parents("div[data-tooltip]");
                    if (1 == i.length) {
                        var o = i.data("tooltip");
                        if (o) {
                            t.toolbarsTips.find(".tooltip_inner").html(o);
                            var r = i.offset();
                            t.toolbarsTips.css({
                                top: r.top - 5 - t.toolbarsTips.height(),
                                left: r.left + i.width() / 2 - t.toolbarsTips.width() / 2
                            }).show();
                        }
                    }
                }).on("mouseout", function (e) {
                    0 == $(e.toElement).parents("div[data-tooltip]").length && t.toolbarsTips.hide();
                });
            }
        },
        __initPulginEvent: function () {
            for (var t = this, e = this.__o.plugins, n = 0, i = e.length; i > n; n++) {
                var o = e[n];
                o.editor = this, "function" == typeof o.addListener && o.addListener(t);
            }
        },
        __createToolBarBtn: function (t) {
            if ("function" == typeof t.initToolBar) return void t.initToolBar(this);
            var e = "";
            "function" == typeof t.getTitle && (e = t.getTitle() || "");
            var n = t.getName(), i = this.getUi();
            i[n] = function (t) {
                return function (n) {
                    var o = new i.Button({
                        className: "edui-for-" + t,
                        title: e,
                        onclick: function () {
                            n.execCommand(t);
                        },
                        theme: n.options.theme,
                        showText: !1
                    });
                    return i.buttons[t] = o, n.addListener("selectionchange", function (e, i, r) {
                        var a = n.queryCommandState(t);
                        -1 == a ? (o.setDisabled(!0), o.setChecked(!1)) : r || (o.setDisabled(!1), o.setChecked(a));
                    }), o;
                };
            }(n);
        },
        __customEventHandle: function () {
            var t = this;
            t.addListener("focus keyup aftersetcontent", function (e, n) {
                if (t.getDom("contentplaceholder").style.display = "none", "keyup" === e) {
                    var i = n.charCode || n.keyCode;
                    switch (i) {
                        case 13:
                        case 49:
                        case 190:
                        case 191:
                            m.setSum(59475, 4, 1), m.send();
                    }
                }
            }), t.addListener("blur", function () {
                "" == t.ueditor.getContent().trim() && (t.getDom("contentplaceholder").style.display = "block");
            }), t.addListener("checkdomAsynList", function () {
                return t.checkdomAsynList();
            }), t.addListener("handleWinScroll", function (t, e) {
                document.body.style.overflow = document.documentElement.style.overflow = e ? "auto" : "hidden";
            });
        },
        destory: function () {
            for (var t = this.__o.plugins, e = 0, n = t.length; n > e; e++) "function" == typeof t[e].beforeEditorDestory && t[e].beforeEditorDestory();
            this.__g.editorPopup && this.__g.editorPopup.beforeEditorDestory();
            for (var e = 0, n = g.allEditor.length; n > e; e++) g.allEditor[e] === this && g.allEditor.splice(e, 1);
            this.hasDestory = !0;
        },
        ready: function (t) {
            if ("function" == typeof t) {
                {
                    var e = this;
                    this.__o;
                }
                this.ueditor.ready(function () {
                    t.call(e, e.ueditor), "" == e.ueditor.getContent().trim() && (e.getDom("contentplaceholder").style.display = "block");
                });
            }
        },
        addListener: function (t, e) {
            this.ueditor.addListener(t, e);
        },
        handlerContent: function (t, e) {
            for (var n = this.__o.plugins, i = 0, o = n.length; o > i; i++) {
                var r = n[i];
                "function" == typeof r.beforeSetContent && (t = r.beforeSetContent(t, e));
            }
            return t = t.replace(/background\-image:\s*url\(https\:\/\/mp\.weixin\.qq\.com\/cgi\-bin\/appmsg(.*?)\)/g, "");
        },
        insertTemplate: function (t, e) {
            e !== !0 && (t = this.handlerContent(t, !1)), this.execCommand("insertHtml", t), this.afterSetContent();
        },
        afterSetContent: function () {
            for (var t = this.__o.plugins, e = 0, n = t.length; n > e; e++) {
                var i = t[e];
                "function" == typeof i.afterSetContent && i.afterSetContent();
            }
        },
        setContent: function (t, e, n) {
            n !== !0 && (t = this.handlerContent(t, !1)), this.ueditor.setContent(t, e), this.afterSetContent();
        },
        initPluginData: function (t) {
            t = t || {};
            for (var e = this.__o.plugins, n = 0, i = e.length; i > n; n++) {
                var o = e[n];
                if ("function" == typeof o.initPluginData) {
                    var r = o.initPluginData();
                    r = r || [], "string" == typeof r && (r = [r]);
                    for (var a = 0, u = r.length; u > a; a++) "undefined" == typeof t[r[a]] && (t[r[a]] = "");
                }
            }
            return t;
        },
        getEditorData: function (t, e) {
            for (var n = this.__o.plugins, i = 0, r = n.length; r > i; i++) {
                var a = n[i];
                "function" == typeof a.beforeGetContent && a.beforeGetContent();
            }
            t = t || {}, t.content = this.ueditor.getContent(void 0, void 0, void 0, void 0, void 0, e);
            for (var i = 0, r = n.length; r > i; i++) {
                var a = n[i];
                if ("function" == typeof a.getPluginData) {
                    var u = this.getPluginDataTmpl(t);
                    a.getPluginData({
                        init: u.init
                    }), this.fillPluginData(u, t);
                }
            }
            return t.content = t.content.replace(/(<\w+[^>]*)\sid=\"([^\">]*)\"([^>]*>)/g, "$1$3"),
                t.content = t.content.replace(/(<[^>]+?style=([\'\"]))([^\2]*?text-decoration-line[\s]*:[^\2]*?)(\2)/gi, function () {
                    return arguments[1] + arguments[3].replace(/text-decoration-line[\s]*:/g, "text-decoration:") + arguments[4];
                }), t.content = o.formatStyle(t.content), t;
        },
        fillPluginData: function (t, e) {
            var n = t.getData();
            for (var i in n) n.hasOwnProperty(i) && "undefined" != typeof e[i] && (e[i] = n[i]);
        },
        getPluginDataTmpl: function (t) {
            var e = {
                content: t.content || ""
            };
            return {
                init: function (t) {
                    t = t || [], "string" == typeof t && (t = [t]);
                    for (var n = 0, i = t.length; i > n; n++) "undefined" == typeof e[t[n]] && (e[t[n]] = "");
                    return {
                        set: function (t, n) {
                            "undefined" != typeof e[t] && (e[t] = n);
                        },
                        get: function (t) {
                            return e[t];
                        }
                    };
                },
                getData: function () {
                    return e;
                }
            };
        },
        queryCommandValue: function (t) {
            return this.ueditor.queryCommandValue(t);
        },
        getSelection: function () {
            return this.ueditor.selection;
        },
        getSelectionRange: function () {
            return this.getSelection().getRange();
        },
        getSelectionStart: function () {
            return this.getSelection().getStart();
        },
        render: function (t) {
            this.ueditor.render(t);
        },
        getUeditor: function () {
            return this.ueditor;
        },
        getWindow: function () {
            return this.ueditor.window;
        },
        getDocument: function () {
            return this.getWindow().document;
        },
        execCommand: function () {
            var t = this.ueditor;
            return t.execCommand.apply(t, arguments);
        },
        fireEvent: function () {
            var t = this.ueditor;
            return t.fireEvent.apply(t, arguments);
        },
        removeListener: function () {
            var t = this.ueditor;
            return t.removeListener.apply(t, arguments);
        },
        funcPvUvReport: function (t, e) {
            f.addPvUv(t, e);
        },
        getUtils: function () {
            return UE.utils;
        },
        getDomUtils: function () {
            return UE.dom.domUtils;
        },
        getBrowser: function () {
            return UE.browser;
        },
        getUi: function () {
            return UE.ui;
        },
        getDom: function (t) {
            return this.ueditor.ui.getDom(t);
        },
        enableToolbar: function () {
            var t = this.ueditor.ui.getDom("toolbar_mask");
            return t && (t.style.display = "none"), t;
        },
        disableToolbar: function () {
            var t = this.ueditor.ui.getDom("toolbar_mask");
            return t && (t.style.display = "block"), t;
        },
        checkPlugins: function (t) {
            var e = this.__o.plugins, n = !0;
            return $.each(e, function (e, i) {
                return "function" == typeof i.check ? n = i.check(t) : !0;
            }), n;
        },
        isHighlight: function () {
            return this.ueditor.highlight;
        },
        getuid: function () {
            return this.__g.id++;
        },
        delegateDomAsyn: function (t) {
            function e() {
                var t, e, n = {
                    newDom: null,
                    tempDoc: null
                }, r = u.uid;
                if (u.article) {
                    var a = u.article;
                    if (o.fireEvent("is_article_alive", a) !== !0) return n;
                    var s = a.data("article").data, l = o.fireEvent("is_article_editing", a);
                    if (l) e = $(i.getDocument()).find("[data-asynid=" + r + "]"); else {
                        t = $("<div>");
                        var d = s.get("content");
                        if (!d) return n;
                        e = t.html(d).find("[data-asynid=" + r + "]");
                    }
                } else e = $(i.getDocument()).find("[data-asynid=" + r + "]");
                return e && 0 != e.length ? (n.newDom = e, n.tempDoc = t || null, n) : n;
            }

            function n() {
                if (u) {
                    var e = u.newDom;
                    try {
                        if (!e) return delete i.__g.asynList[u.uid], void(i.checkdomAsynList() === !0 && (o.fireEvent("draft_force_save"),
                            o.fireEvent("domasyn_all_complete")));
                        if (e.removeClass("js_asyningdom").removeAttr("data-asynid").data("asynid", ""), delete i.__g.asynList[u.uid],
                            u.tempDoc) {
                            var n = u.tempDoc.html();
                            if (n) {
                                var r = u.article.data("article").data;
                                r.set("content", n), r.setData(r.getData());
                            }
                        }
                        i.checkdomAsynList() === !0 && (o.fireEvent("draft_force_save"), o.fireEvent("domasyn_all_complete")),
                            t.requsetFailFun = null, t.requsetSucFun = null, t.requsetFun = null, u = null;
                    } catch (a) {
                    }
                }
            }

            var i = this, o = i.ueditor;
            if (t.dom && "function" == typeof t.requsetFun) {
                var r = t.requsetFailFun || function () {
                }, a = t.requsetSucFun || function () {
                }, u = this.setDomAsynTag({
                    dom: t.dom
                });
                u && (t.__hasHandle = !1, t.requsetSucFun = function () {
                    if (this.__timeoutid && clearTimeout(this.__timeoutid), this.__hasHandle !== !0) {
                        this.__hasHandle = !0;
                        try {
                            var i = Array.prototype.slice.call(arguments), o = e();
                            u.newDom = o.newDom, u.tempDoc = o.tempDoc, i.unshift(u), a.apply(t, i);
                        } catch (r) {
                            throw r;
                        }
                        n();
                    }
                }, t.requsetFailFun = function () {
                    if (this.__timeoutid && clearTimeout(this.__timeoutid), this.__hasHandle !== !0) {
                        this.__hasHandle = !0;
                        try {
                            var i = Array.prototype.slice.call(arguments), o = e();
                            u.newDom = o.newDom, u.tempDoc = o.tempDoc, i.unshift(u), r.apply(t, i);
                        } catch (a) {
                            throw a;
                        }
                        n();
                    }
                }, t.timeout && (t.__timeoutid = setTimeout(function () {
                    "function" == typeof t.requsetFailFun && t.requsetFailFun();
                }, 1 * t.timeout)), t.requsetFun());
            }
        },
        checkdomAsynList: function () {
            var t = 0;
            for (var e in this.__g.asynList) if (this.__g.asynList.hasOwnProperty(e)) return t++,
                !1;
            return t > 0 ? !1 : !0;
        },
        setDomAsynTag: function (t) {
            var e = this.ueditor, n = this.getuid() + "", i = this.__g.asynList, o = e.fireEvent("get_current_article");
            if (!t.dom) return !1;
            var r = $(t.dom), a = r.attr("data-asynid") || r.data("asynid") || "";
            if (a && i[a]) {
                if (t.force !== !0) return !1;
                delete i[a];
            }
            n = a || n;
            var u = i[n] = {
                article: o,
                uid: n
            };
            return r.addClass("js_asyningdom").attr("data-asynid", n), u;
        },
        setHistory: function (t) {
            var e = this.getUeditor().undoManger;
            if (!e) return !1;
            if (!t) return e.reset(), this.fireEvent("saveScene"), !0;
            var n = t.list;
            if ("[object Array]" !== Object.prototype.toString.call(n) || 0 == n.length) return e.reset(),
                !0;
            var i = t.index;
            return ("undefined" == typeof i || 0 > i || i > n.length - 1) && (i = n.length - 1), e.list = n, e.index = i,
                e.clearKey(), e.update(), !0;
        },
        getHistory: function () {
            var t = this.getUeditor().undoManger;
            return t ? {
                list: JSON.parse(JSON.stringify2(t.list)),
                index: t.index
            } : null;
        },
        changeUeditorConf: function (t) {
            if (t.key && t.value && t.key.length == t.value.length) for (var e = 0, n = t.key.length; n > e; e++) "undefined" != typeof this.ueditor.options[t.key[e]] && this.ueditor.options[t.key[e]] !== t.value[e] && ("function" == typeof this["beforeUeditorConf_" + t.key[e] + "_change"] && this["beforeUeditorConf_" + t.key[e] + "_change"](),
                this.ueditor.options[t.key[e]] = t.value[e], "function" == typeof this["afterUeditorConf_" + t.key[e] + "_change"] && this["afterUeditorConf_" + t.key[e] + "_change"]());
        },
        afterUeditorConf_debug_change: function () {
            this.ueditor.eventLog = this.ueditor.eventLog ? null : [];
        }
    }, function (t) {
        t.__editorIframeSelect = function (t) {
            if (t && t.parent && t.parent.window) {
                var e = n(t.parent.window);
                if (e) for (var i = e.getDocument(), o = i.getElementsByTagName("iframe"), r = 0, a = o.length; a > r; r++) {
                    var u = o[r];
                    if (u.contentWindow === t) {
                        var s = new UE.dom.Range(i);
                        s.selectNode(u).select(), e.fireEvent("iframeSelected"), e.fireEvent("selectionchange", !0);
                        break;
                    }
                }
            }
        };
    }(window), e;
});
define("common/wx/mpEditor/plugin/adv.js", ["common/wx/media/adDialog.js", "common/wx/Tips.js"], function (e) {
    "use strict";
    var t = e("common/wx/media/adDialog.js"), i = e("common/wx/Tips.js"), a = function (e) {
        e && e.container && (this.domid = e.container, this.container = $(e.container).show()), 0 == e.has_ad && this.container && this.container.length > 0 && this.container.addClass("disabled"),
            this.can_see_ad = e.can_see_ad || !1;
        var t = this;
        document.addEventListener("EditorCpcEdit", function () {
            console.log("触发iframe EditorCpcEdit"), t._editCpc();
        }), document.addEventListener("EditorCpcDel", function () {
            console.log("触发iframe EditorCpcDel"), t._delCpc();
        });
    };
    return a.beforeSetContent = function (e) {
        if (!e.html) return "";
        var t = e.html.replace(/<mpcpc([^>]*?)js_editor_cpcad([^>]*?)><\/mpcpc>/g, "<iframe $1js_editor_cpcad$2></iframe>"), i = $("<div>" + t + "</div>");
        return e.can_see_ad || (i = a.filterData(i)), i.html();
    }, a.filterData = function (e) {
        return e.find("mpcpc").remove(), e.find("iframe.js_cpc_area").remove(), e;
    }, a.prototype = {
        getName: function () {
            return "insertad";
        },
        getContainer: function () {
            return this.domid;
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var e = this;
            return function () {
                console.log("insert ad");
                var a = e.editor, r = this;
                return a ? $(a.ueditor.getContent()).find("iframe.js_cpc_area").length > 0 || "block" == $(".appmsg_edit_ad_preview").css("display") ? (i.err("每篇图文消息只可插入一个广告卡片"),
                    !1) : wx.cgiData.has_ad ? void new t({
                    idx: $(".js_appmsg_item.current").data("msgindex"),
                    onOK: function (t) {
                        e.doCommand(r, t);
                    }
                }) : (i.err("暂无可插入的广告卡片"), !1) : !1;
            };
        },
        doCommand: function (e, t) {
            var i = this;
            t.ad_id ? i._insertSponsor(e, t) : 0 == t.ad_type ? this._insertCpcCatsItems(e, t.category_id_list) : 1 == t.ad_type && this._insertCpcSingleItem(e, t);
        },
        initPluginData: function () {
        },
        beforeSetContent: function (e) {
            return a.beforeSetContent({
                html: e,
                can_see_ad: this.can_see_ad
            });
        },
        addListener: function (e) {
            var t = this;
            e.addListener("beforepaste", function (e, i) {
                var a = $("<div>" + i.html + "</div>");
                a = t._filterData(a), i.html = a.html();
            });
        },
        getPluginData: function (e) {
            var t = e.init(this.initPluginData()), i = t.get("content");
            if (i) {
                var a = $("<div>" + i + "</div>");
                this.can_see_ad || (a = this._filterData(a)), t.set("content", a.html().replace(/<iframe([^>]*?)js_editor_cpcad([^>]*?)><\/iframe>/g, "<mpcpc $1js_editor_cpcad$2></mpcpc>"));
            }
        },
        check: function (e) {
            if (-1 == e.html().indexOf("js_editor_cpcad")) return !0;
            var t = e.html().split("js_editor_cpcad")[0] + ">", i = "<" + e.html().split("js_editor_cpcad")[1];
            return t.replace(/<[^>]*>/g, "").replace(/ /g, "").length < 300 ? (this._showErrMsg("文中广告卡片前未满300个字符"),
                !1) : i.replace(/<[^>]*>/g, "").replace(/ /g, "").length < 300 ? (this._showErrMsg("文中广告卡片后未满300个字符"),
                !1) : !0;
        },
        _showErrMsg: function (e) {
            var t = $(this.editor.getDom()).find(".js_content_error");
            this.editor.fireEvent("showErrMsg", t, e), this.editor.fireEvent("scrollIntoView", t, 200);
        },
        _editCpc: function () {
            var e = this, i = (e.editor.getDom(), $(this.editor.getDocument()).find("iframe.js_cpc_area").attr("data-category_id_list") || ""), a = $(this.editor.getDocument()).find("iframe.js_cpc_area").attr("data-single_category_id") || "",
                r = $(this.editor.getDocument()).find("iframe.js_cpc_area").attr("data-single_aids") || "";
            new t({
                idx: $(".js_appmsg_item.current").data("msgindex"),
                cpc_edit_data: {
                    category_id_list: i,
                    single_category_id: a,
                    single_aids: r
                },
                onOK: function (t) {
                    $(e.editor.getDocument()).find("iframe.js_cpc_area").removeAttr("data-category_id_list"),
                        $(e.editor.getDocument()).find("iframe.js_cpc_area").removeAttr("data-single_category_id"),
                        $(e.editor.getDocument()).find("iframe.js_cpc_area").removeAttr("data-single_aids");
                    var i = "/cgi-bin/readtemplate?t=tmpl/cpc_tmpl";
                    if ($(e.editor.getDocument()).find("iframe.js_cpc_area").attr("src", i), 0 == t.ad_type) $(e.editor.getDocument()).find("iframe.js_cpc_area").attr("data-category_id_list", t.category_id_list.join("|")); else {
                        $(e.editor.getDocument()).find("iframe.js_cpc_area").attr("data-single_category_id", t.single_category_id),
                            $(e.editor.getDocument()).find("iframe.js_cpc_area").attr("data-single_aids", t.single_aids);
                        var i = "/cgi-bin/readtemplate?t=tmpl/cpc_tmpl&image_url=" + encodeURIComponent(t.image_url) + "&aids_length=" + t.single_aids_length;
                        $(e.editor.getDocument()).find("iframe.js_cpc_area").attr("src", i);
                    }
                }
            }), console.log("_editCpc");
        },
        _delCpc: function () {
            $(this.editor.getDocument()).find("iframe.js_cpc_area").remove(), console.log("_delCpc");
        },
        _filterData: function (e) {
            return a.filterData(e);
        },
        _insertCpcCatsItems: function (e, t) {
            var i = e, a = "/cgi-bin/readtemplate?t=tmpl/cpc_tmpl", r = t.join("|"), n = '<iframe js_editor_cpcad class="js_cpc_area res_iframe cpc_iframe" data-category_id_list="' + r + '" src="' + a + '"></iframe>';
            i.execCommand("insertHtml", n);
        },
        _insertCpcSingleItem: function (e, t) {
            var i = e, a = "/cgi-bin/readtemplate?t=tmpl/cpc_tmpl&image_url=" + encodeURIComponent(t.image_url) + "&aids_length=" + t.single_aids_length,
                r = '<iframe js_editor_cpcad class="js_cpc_area res_iframe cpc_iframe" data-single_category_id="' + t.single_category_id + '" data-single_aids="' + t.single_aids + '"  src="' + a + '"></iframe>';
            i.execCommand("insertHtml", r);
        },
        _insertSponsor: function (e, t) {
            var i = e, a = $(".js_ad_preview");
            a.html(template.render("js_ad_preview_tpl", t)).parent().show(), a.parent().find(".js_tag").text(0 == t.trade_mode ? "广告推荐" : "内容定制");
            var r = new UE.dom.Range(i.document);
            r.selectNode(i.body.childNodes[i.body.childNodes.length - 1]).select().setCursor(!0, !1);
            for (var n = $(i.body), c = n.height() - 16, o = "", d = 0; d < n.children().length; d++) c -= n.children().eq(d).outerHeight(!0);
            if (c >= 0) for (var d = 0; d < Math.floor(c / 25); d++) o += "<br/>";
            0 == t.trade_mode && i.execCommand("inserthtml", "<p>" + o + t.ad_tips + "</p>", !0), i.fireEvent("scrollIntoView", a, $(window).height() - a.height() - 72 - 30);
        }
    }, a;
});
define("common/wx/mpEditor/plugin/video.js", ["common/wx/popup.js", "biz_common/utils/url/parse.js", "common/wx/dialog.js", "common/wx/Tips.js", "common/wx/getVinfo.js", "common/wx/media/videoDialog.js", "common/wx/Cgi.js", "common/wx/mpEditor/plugin/filter.js"], function (t) {
    "use strict";

    function e(t) {
        var e = 27, r = wx.getBanInfo && wx.getBanInfo(e);
        return r && t && m.show({
            msg: "经用户投诉，你的帐号上传的视频%s，已封禁添加视频能力至%s。".sprintf(r.reason_desc, r.ban_time == r.unlock_time ? "永久" : i(r.unlock_time)),
            buttons: [{
                text: "返回",
                click: function () {
                    this.remove();
                }
            }]
        }), r;
    }

    function i(t) {
        var e = new Date(1e3 * t);
        return e.getFullYear() + "年" + (e.getMonth() + 1) + "月" + e.getDate() + "日";
    }

    function r(t) {
        if (t.editFrame) return ['<iframe class="video_iframe wx_video_iframe', t.className ? " " + t.className + '"' : '"', t.attr ? " " + t.attr + " " : "", ' allowfullscreen frameborder=0 style="position:relative; z-index:1;" ', " height=", t.height, " width=", t.width, '  src="/cgi-bin/readtemplate?t=tmpl/video_tmpl&vid=', t.vid, '"', " ></iframe><br/>"].join("");
        var e = 500, i = Math.round(e / (t.ratio || h.ratio));
        return ['<iframe class="wx_video_iframe ', t.className ? " " + t.className + '"' : '"', " frameborder=0 ", " height=", i, " width=", e, '  src="https://v.qq.com/iframe/preview.html?vid=' + t.vid + "&width=" + e + "&height=" + i + '&auto=1"', " ></iframe>"].join("");
    }

    function n(t) {
        if (!t) return h.ratio;
        for (var e = [4 / 3, 16 / 9], i = e[0], r = Math.abs(i - t), n = 1, o = e.length; o > n; n++) {
            var a = Math.abs(e[n] - t);
            r > a && (r = a, i = e[n]);
        }
        return i;
    }

    function o(t) {
        var e = arguments[1] || window.location.search, i = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"), r = e.substr(e.indexOf("?") + 1).match(i);
        return null != r ? r[2] : "";
    }

    function a(t, e) {
        var i, r = $(t).find("iframe");
        return r.each(function () {
            var t = $(this), r = t.attr("src") || t.attr("data-src");
            return o("vid", r) == e ? (i = t, !1) : void 0;
        }), i;
    }

    function d(t, e, i) {
        return t.find("iframe").each(function () {
            var t = $(this), r = s(t), a = t.attr("data-src") || t.attr("src") || "", d = t.attr("data-vidtype");
            if (1 == r) t.remove(); else if (2 == r) t.remove(); else if (3 == r) {
                var m = o("vid", a);
                if (m) {
                    var v = this.attributes;
                    if (v && v.length > 0) {
                        for (var c = [], u = "," + h.attrList.join(",") + ",", f = 0, l = v.length; l > f; f++) -1 == u.indexOf(v[f].name) && c.push(v[f].name);
                        for (var f = 0, l = c.length; l > f; f++) t.removeAttr(c[f]);
                    }
                    t.addClass("video_iframe wx_video_iframe"), t.removeAttr("data-src");
                    var w = i, p = 1 * t.data("ratio");
                    p = p ? n(p) : h.ratio;
                    var g = Math.round(w / p);
                    t.removeAttr("style"), e === !0 ? (t.attr("width", w), t.attr("height", "auto"), t.attr("src", "https://v.qq.com/iframe/preview.html?vid=" + m + "&width=" + w + "&height=auto&auto=0")) : (t.attr("width", w),
                        t.attr("height", g), t.attr("src", "/cgi-bin/readtemplate?t=tmpl/video_tmpl&vid=" + m)),
                    d || t.attr("data-vidtype", "-1");
                } else t.remove();
            } else t.removeClass("video_iframe");
        }), t;
    }

    function s(t) {
        var e = $(t), i = e.attr("data-src") || e.attr("src") || "";
        return i.indexOf("//mp.weixin.qq.com/mp/getcdnvideourl?") >= 0 ? 1 : /^http(s)*:\/\/z\.weishi\.com\/weixin\/player\.html/.test(i) ? 2 : /http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(i) || i.indexOf("/cgi-bin/readtemplate?t=tmpl/video_tmpl") >= 0 ? 3 : -1;
    }

    t("common/wx/popup.js");
    var m = (t("biz_common/utils/url/parse.js"), t("common/wx/dialog.js")), v = t("common/wx/Tips.js"), c = t("common/wx/getVinfo.js"), u = t("common/wx/media/videoDialog.js"), f = t("common/wx/Cgi.js"), l = t("common/wx/mpEditor/plugin/filter.js"), h = {
        ratio: 16 / 9,
        maxLength: 3,
        attrList: ["data-src", "class", "data-vidtype", "allowfullscreen", "frameborder", "style", "height", "width", "src", "data-ratio", "data-w", "scrolling", "data-vh", "data-vw"]
    }, w = (wx.cgiData, function (t) {
        t && t.container && (this.domid = t.container, this.container = $(t.container).show());
        var e = this;
        e.report_vid_type = [], e.can_use_txvideo = t.can_use_txvideo;
    });
    return w.beforeSetContent = function (t) {
        var e = d($("<div></div>").html(t.html), t.isPreview, t.width);
        return e.html();
    }, w.prototype = {
        getName: function () {
            return "insertvideo";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var t = this;
            return function () {
                var i = t.editor, r = this;
                if (i) {
                    var n = e(!0);
                    n || (t.getIframeLen() < h.maxLength ? new u({
                        can_use_txvideo: t.can_use_txvideo,
                        scene: "ueditor",
                        onOK: function (e, n) {
                            return 21 == e || (15 == e ? (n.height = 375, n.width = 500, n.vid = n.content, n.vidtype = 2, n.url = "https://v.qq.com/iframe/preview.html?vid=" + n.vid + "&width=500&height=375&auto=0",
                                t.doCommand(r, "insertvideo", n), i.funcPvUvReport("mpvideo")) : (0 == n.subtype ? n.vidtype = 1 : 1 == n.subtype ? n.vidtype = 4 : 2 == n.subtype && (n.vidtype = 5),
                                t.doCommand(r, "insertvideo", n), i.funcPvUvReport("qqvideo"))), !0;
                        }
                    }) : v.err("最多添加3个素材库视频，微信小视频（帐号需认证）或腾讯视频"));
                }
            };
        },
        doCommand: function (t, e, i) {
            console.log("insert video");
            var n = t;
            i = UE.utils.isArray(i) ? i : [i];
            for (var o, a = [], d = $(this.editor.getDocument().body).width(), s = Math.round(d / h.ratio), m = 0, v = i.length; v > m; m++) {
                o = i[m];
                var c = "";
                o.vidtype && (c = "data-vidtype='" + o.vidtype + "'"), a.push(r({
                    vid: o.vid,
                    width: d,
                    height: s,
                    attr: c,
                    editFrame: !0
                }));
            }
            n.execCommand("inserthtml", a.join(""), !0);
        },
        addListener: function (t) {
            var i = this;
            t.addListener("beforepaste", function (t, r) {
                var n = i.filterInputData($("<div></div>").html(r.html)), o = n.find("iframe.video_iframe").length;
                if (n.find(".img_loading[data-vid]").remove(), o) {
                    var a = e(!0);
                    if (a) return r.html = "", !0;
                }
                return i.getIframeLen() + o > h.maxLength ? (v.err("最多添加3个素材库视频，微信小视频（帐号需认证）或腾讯视频"), r.html = "",
                    !0) : void(r.html = n.html());
            }), t.addListener("afterpaste aftersetcontent afterinserthtml", function (e, r, n) {
                var a = $(n), d = a.filter("iframe.video_iframe").add(a.find("iframe.video_iframe"));
                d.each(function () {
                    var e = $(this);
                    if (!e.attr("data-ratio") || !e.attr("data-w")) {
                        var r = e.data("src") || e.attr("src") || "";
                        if (r) {
                            var n = o("vid", r);
                            n && !function (t, e) {
                                e.delegateDomAsyn({
                                    dom: t,
                                    timeout: 15e3,
                                    requsetFun: function () {
                                        var t = this;
                                        i.getCkeyByVid({
                                            vid: n,
                                            onSuccess: function (e) {
                                                e && e.base_resp && 0 == e.base_resp.ret && e.ckey ? c.get({
                                                    vid: n,
                                                    ckey: e.ckey,
                                                    onSuc: function (e) {
                                                        t.requsetSucFun(e);
                                                    },
                                                    onError: function () {
                                                        t.requsetFailFun();
                                                    }
                                                }) : t.requsetFailFun();
                                            },
                                            onError: function () {
                                                t.requsetFailFun();
                                            }
                                        });
                                    },
                                    requsetSucFun: function (t, e) {
                                        if (t && t.newDom) {
                                            var i, r;
                                            e && e.data && (i = e.data.width, r = e.data.height), 0 != i && 0 != r && (t.newDom.attr("data-ratio", i / r),
                                                t.newDom.attr("data-w", i));
                                        }
                                    },
                                    requsetFailFun: function (t) {
                                        t && t.newDom && t.newDom.removeAttr("data-ratio").removeAttr("data-w");
                                    }
                                });
                            }(e, t, n);
                        }
                    }
                });
            });
        },
        getIframeLen: function () {
            var t = this.editor.getDocument();
            return $(t).find("iframe.video_iframe").length;
        },
        getContainer: function () {
            return this.domid;
        },
        getQueryCommandState: function () {
            return function () {
                var t = this, e = t.selection.getRange().getClosedNode(), i = e && "edui-faked-video" == e.className;
                return i ? 1 : 0;
            };
        },
        initPluginData: function () {
            return ["video_id", "vid_type", "shortvideofileid"];
        },
        getPluginData: function (t) {
            var e = t.init(this.initPluginData());
            if (e.get("content")) {
                var i = this, r = $("<div></div>"), n = [], a = [], d = [];
                return r.html(e.get("content")).find("iframe").each(function () {
                    var t = $(this), e = i.getTypeByDom(t), r = (t.attr("data-shortvideofileid"), t.attr("src") || t.attr("data-src") || ""), d = t.attr("data-vidtype");
                    if (1 == e) t.remove(); else if (2 == e) t.remove(); else if (3 == e) {
                        var s = o("vid", r);
                        s && (t.attr("data-src", "https://v.qq.com/iframe/preview.html?vid=" + s + "&width=500&height=375&auto=0"),
                            t.removeAttr("src"), t.addClass("video_iframe"), t.removeClass("wx_video_iframe"),
                            t.removeAttr("width"), t.removeAttr("height"), t.removeAttr("data-vh"), t.removeAttr("data-vw"),
                            l.filterStyleAttr(t, ["width", "height"]), n.push(s), a.push(d || "-1"));
                    } else t.removeClass("video_iframe");
                }), e.set("content", r.html()), e.set("video_id", n.join(",")), e.set("vid_type", a.join(",")),
                    e.set("shortvideofileid", d.join("|")), e;
            }
        },
        getCkeyByVid: function (t) {
            f.post({
                url: wx.url("/cgi-bin/getvideockey?"),
                data: {
                    vid: t.vid
                }
            }, {
                done: function (e) {
                    "function" == typeof t.onSuccess && t.onSuccess(e);
                },
                fail: function () {
                    "function" == typeof t.onError && t.onError();
                }
            });
        },
        getTypeByDom: function (t) {
            return s(t);
        },
        filterInputData: function (t, e) {
            var i = $(this.editor.getDocument().body).width();
            return d(t, e, i);
        },
        beforeSetContent: function (t, e) {
            var i = $(this.editor.getDocument().body).width();
            return w.beforeSetContent({
                html: t,
                isPreview: e,
                width: i
            });
        }
    }, function () {
        top.window.__crossFun || (top.window.__crossFun = {});
        var t = top.window.__crossFun;
        t.__videoFrameClick || (t.__videoFrameClick = function (t) {
            var e = t.event.target || t.event.srcElement;
            if (e) {
                var i = $(e);
                if (i.hasClass("js_play_btn") && !h.previewVideo) {
                    var o, d;
                    t.win && t.win.parent && t.win.parent.document && (o = a(t.win.parent.document, t.vid)), o && o.length > 0 && (d = o.attr("data-ratio")),
                        d = n(d), h.previewVideo = !0, $(r({
                        vid: t.vid,
                        editFrame: !1,
                        ratio: d
                    })).popup({
                        title: "预览视频",
                        className: "align_edge wx_video_dialog",
                        width: "960",
                        buttons: [{
                            text: "关闭",
                            click: function () {
                                h.previewVideo = !1, this.remove(), setTimeout(function () {
                                    window.__editorIframeSelect(t.win);
                                }, 0);
                            }
                        }],
                        close: function () {
                            h.previewVideo = !1, this.remove(), setTimeout(function () {
                                window.__editorIframeSelect(t.win);
                            }, 0);
                        }
                    });
                } else !!window.__editorIframeSelect && window.__editorIframeSelect(t.win);
            }
        });
    }(), w;
});
define("common/wx/mpEditor/plugin/img.js", ["tpl/mpEditor/plugin/img_popup.html.js", "common/wx/media/imageDialog.js", "common/wx/mpEditor/plugin/remoteimg.js"], function (t) {
    "use strict";
    var e = t("tpl/mpEditor/plugin/img_popup.html.js"), i = t("common/wx/media/imageDialog.js"), o = t("common/wx/mpEditor/plugin/remoteimg.js"), n = function (t) {
        t && t.container && (this.domid = t.container, this.container = $(t.container).show());
    };
    return n.beforeSetContent = function (t) {
        var e = t.html.replace(/<img(.*?)\s+data\-src="/g, '<img$1 src="').replace(/http:\/\/mmbiz\.qpic\.cn\//g, "https://mmbiz.qlogo.cn/") || "";
        return e;
    }, n.formatHTML = function (t) {
        var e = "300,640";
        if (t = UE.utils.isArray(t) ? t : [t], t.length) {
            var i, o = [], n = "";
            if (i = t[0], 1 == t.length) {
                var r = i.format || "";
                "gif" == r && (i.src += "/mmbizgif");
                var a = ' data-s="' + e + '" ';
                i.src && /\/mmbizgif$/.test(i.src) && (i.src = i.src.replace(/\/mmbizgif$/, ""), a = " "),
                    a += r ? ' data-type="' + r + '" ' : "", n = "<img " + a + ' src="' + i.src + '"' + ("undefined" != typeof i.copyright_status ? ' data-copyright="' + i.copyright_status + '"' : "") + (i.title && "" != i.title ? ' title="' + i.title + '"' : "") + (i.border && "0" != i.border ? ' border="' + i.border + '"' : "") + (i.alt && "" != i.alt ? ' alt="' + i.alt + '"' : "") + (i.hspace && "0" != i.hspace ? ' hspace = "' + i.hspace + '"' : "") + (i.vspace && "0" != i.vspace ? ' vspace = "' + i.vspace + '"' : "") + ' style="' + (i.width ? "width:" + i.width + "px;" : "") + (i.height ? " height:" + i.height + "px;" : "") + ("left" == i.floatStyle || "right" == i.floatStyle ? "float:" + i.floatStyle + ";" : "") + '" />',
                    n = "center" == i.floatStyle ? '<p style="text-align: center">' + n + "</p>" : "<p>" + n + "</p>",
                    o.push(n);
            } else for (var s = 0; i = t[s++];) {
                "gif" == i.format && (i.src += "/mmbizgif");
                var a = ' data-s="' + e + '" ';
                i.src && /\/mmbizgif$/.test(i.src) && (i.src = i.src.replace(/\/mmbizgif$/, ""), a = " "),
                    a += i.format ? ' data-type="' + i.format + '" ' : "", n = "<p " + ("center" == i.floatStyle ? 'style="text-align: center" ' : "") + "><img " + a + ' src="' + i.src + '" ' + ("undefined" != typeof i.copyright_status ? ' data-copyright="' + i.copyright_status + '"' : "") + (i.title && "" != i.title ? ' title="' + i.title + '"' : "") + (i.border && "0" != i.border ? ' border="' + i.border + '"' : "") + (i.alt && "" != i.alt ? ' alt="' + i.alt + '"' : "") + (i.hspace && "0" != i.hspace ? ' hspace = "' + i.hspace + '"' : "") + (i.vspace && "0" != i.vspace ? ' vspace = "' + i.vspace + '"' : "") + ' style="' + (i.width ? "width:" + i.width + "px;" : "") + (i.height ? " height:" + i.height + "px;" : "") + ("left" == i.floatStyle || "right" == i.floatStyle ? "float:" + i.floatStyle + ";" : "") + '" /></p>',
                    o.push(n);
            }
            return o;
        }
    }, n.prototype = {
        getName: function () {
            return "insertimage";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var t = this;
            return function () {
                var e = this, o = t.editor;
                o && i({
                    maxSelect: 100,
                    doselected: !0,
                    uploadGroupId: 3,
                    completeUploadMinSelectNum: 1,
                    onOK: function (i) {
                        t.doCommand(e, "insertimage", i.map(function (t) {
                            return t.src = t.url, t;
                        }));
                        var n = 0, r = 0;
                        $.each(i, function (t, e) {
                            "upload" == e.source ? n++ : r++;
                        }), n > 0 && $.post("/misc/jslog?1=1" + wx.data.param, {
                            id: 39,
                            val: n,
                            level: "trace",
                            content: "[file=media/appmsg_edit]"
                        }), r > 0 && $.post("/misc/jslog?1=1" + wx.data.param, {
                            id: 40,
                            val: r,
                            level: "trace",
                            content: "[file=media/appmsg_edit]"
                        });
                        var a = i.length;
                        a > 0 && o.funcPvUvReport("insertimage", a), this.destroy(), document.body.style.overflow = document.documentElement.style.overflow = "auto";
                    },
                    onHide: function () {
                        this.destroy(), document.body.style.overflow = document.documentElement.style.overflow = "auto";
                    }
                });
            };
        },
        doCommand: function (t, e, i) {
            if (i) {
                console.log("insert image");
                var o = t, r = n.formatHTML(i);
                return o.execCommand("insertHtml", r.join(""));
            }
        },
        getContainer: function () {
            return this.domid;
        },
        getPluginData: function (t) {
            var e = t.init(), i = e.get("content");
            e.set("content", i.replace(/<img(.*?)\s+src="/g, '<img$1 data-src="').replace(/https:\/\/mmbiz\.qlogo\.cn\//g, "http://mmbiz.qpic.cn/"));
        },
        addListener: function (t) {
            var e = this, i = t.getUeditor();
            t.getBrowser().ie ? this._showPopup(t) : t.addListener("click", function (e, o) {
                var n = o.target || o.srcElement;
                if (n && "IMG" == n.tagName && "false" != i.body.contentEditable) {
                    var r = new UE.dom.Range(i.document);
                    r.selectNode(o.target).select(), t.fireEvent("img_selected", o, n);
                }
            }), t.addListener("get_img_popup_html", function (t, i) {
                return e._getImgPopupHtml(i);
            }), t.addListener("afterpaste", function (t, e, i) {
                $(i).find(".gif_bg_tips_wrp").each(function () {
                    $(this).remove();
                }), $(i).find(".gif_img_tips_group").each(function () {
                    $(this).remove();
                }), $(i).find(".gif_img_tips").each(function () {
                    $(this).remove();
                }), $(i).find(".load_img_tips").each(function () {
                    $(this).remove();
                }), $(i).find(".load_img_wrp").each(function () {
                    $(this).remove();
                }), $(i).find(".js_img_tips").each(function () {
                    $(this).remove();
                }), $.each(i, function () {
                    $(this).find("img").each(function () {
                        var t = $(this).attr("src") || "";
                        t.indexOf("/s640?") > -1 && t.indexOf("wx_fmt=gif") > -1 && $(this).parent().hasClass("gif_img_wrp") && $(this).parent().before(this).remove(),
                            $(this).removeAttr("data-forceheight").removeAttr("data-nopreviewclick");
                    }), $(this).hasClass("js_img_tips") && $(this).remove();
                });
            }), t.addListener("insertMaterialImg", function (t, o) {
                return e.doCommand(i, "insertimage", o);
            }), t.addListener("afterpasteimg aftersetcontent afterinserthtml afterCropImg", function (e, i, o) {
                var n = $(t.getDocument()).find("body").width(), r = $(o), a = r.filter("img").add(r.find("img"));
                a.each(function () {
                    var e = $(this);
                    e.attr("data-ratio") && e.attr("data-w") || !function (t, e) {
                        var i = new Image, o = t.attr("src");
                        e.delegateDomAsyn({
                            dom: t,
                            timeout: 1e4,
                            requsetFun: function () {
                                i.onload = this.requsetSucFun, i.onerror = this.requsetFailFun, i.src = o;
                            },
                            requsetSucFun: function (t) {
                                if (i) {
                                    if (t && t.newDom) {
                                        var e = i.naturalWidth || i.width || 0, o = i.naturalHeight || i.height || 0;
                                        0 != e && 0 != o && (t.newDom.attr("data-ratio", o / e), t.newDom.attr("data-w", n == e ? "" : e));
                                    }
                                    i.onload = null, i.onerror = null, i = null;
                                }
                            },
                            requsetFailFun: function (t) {
                                i && (t && t.newDom && t.newDom.removeAttr("data-ratio").removeAttr("data-w"), i.onload = null,
                                    i.onerror = null, i = null);
                            }
                        });
                    }(e, t);
                });
            });
        },
        beforeSetContent: function (t) {
            return n.beforeSetContent({
                html: t
            });
        },
        _showPopup: function (t) {
            var e = this, i = t.getUeditor();
            t.addListener("handle_common_popup", function (t, o) {
                var n = i.selection.getRange().getClosedNode(), r = e._getImgPopupHtml(n, o);
                r && (o.html += r, o.node = n);
            });
        },
        _getImgPopupHtml: function (t, i) {
            var n = $(t), r = "";
            if (t && /^img$/i.test(t.tagName) && !n.hasClass("js_noimgpopup") && !this._filterPopup(t)) {
                var a = !1;
                "100%" == t.style.width && "auto" == t.style.height && (a = !0);
                var s = !0, m = o.defaultRemoteImg.replace("http://", "").replace("https://", "");
                (!o.isCdnImg(t.src) || t.src.indexOf(m) > 0) && (s = !1), r = wx.T(e, {
                    hasCropimg: s,
                    needBreak: i && i.html ? !0 : !1,
                    hasadapt: a
                });
            }
            return r;
        },
        _filterPopup: function (t) {
            if (!t) return !1;
            var e = t.src || "";
            return /^http(s)?:\/\/res\.wx\.qq\.com\/mpres\/htmledition\/images\/icon\/common\/emotion_panel/.test(e) ? !0 : /http(s)?:\/\/res\.wx\.qq\.com\/mpres\/zh_CN\/htmledition\/comm_htmledition\/images\/pic\/common\/pic_blank\.gif/.test(e) ? !0 : void 0;
        }
    }, n;
});
define("common/wx/mpEditor/plugin/weapp.js", ["common/wx/popup.js", "biz_web/ui/checkbox.js", "common/wx/media/weappDialog.js", "tpl/mpEditor/plugin/link_popup.html.js", "common/wx/mpEditor/plugin/img.js"], function (a) {
    "use strict";

    function t(a, t) {
        var r = {};
        for (var i in t) r[i] = encodeURIComponent(t[i]);
        return a.replace(/\{(.+?)\}/g, function (a, t) {
            return r[t] || t;
        });
    }

    function r(a, t) {
        var r = t;
        for (var i in t) r[i] = (t[i] || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        return a.format(r);
    }

    function i(a) {
        var r = $("<div>" + a + "</div>");
        return r.find("mp-miniprogram,mp-weapp").replaceWith(function () {
            var a = $(this), r = a.attr("data-miniprogram-appid") || a.attr("data-weapp-appid") || "", i = a.attr("data-miniprogram-title") || a.attr("data-weapp-title") || "", e = a.attr("data-miniprogram-imageUrl") || a.attr("data-weapp-imageUrl") || "",
                n = a.attr("data-miniprogram-nickname") || a.attr("data-weapp-nickname") || "", p = a.attr("data-miniprogram-avatar") || a.attr("data-weapp-avatar") || "", m = a.attr("data-miniprogram-path") || a.attr("data-weapp-path") || "";
            return $('<iframe class="res_iframe weapp_app_iframe js_editor_weapp" frameborder="0">').attr("src", t("/cgi-bin/readtemplate?t=tmpl/weapp_tmpl&title={title}&imageUrl={imageUrl}&avatar={avatar}&nickname={nickname}", {
                nickname: n,
                avatar: p,
                title: i,
                imageUrl: e
            })).attr("data-miniprogram-appid", r).attr("data-miniprogram-path", m).attr("data-miniprogram-nickname", n).attr("data-miniprogram-avatar", p).attr("data-miniprogram-title", i).attr("data-miniprogram-imageUrl", e);
        }), r.find("a.weapp_text_link,a.weapp_image_link").each(function () {
            $(this).attr("href", ""), $(this).attr("_href", "");
        }), r.find("span.js_weapp_display_element").remove(), r.html();
    }

    function e(a) {
        var t = $("<div>" + a + "</div>");
        return t.find("iframe.js_editor_weapp").replaceWith(function () {
            var a = $(this), t = a.attr("data-miniprogram-appid"), r = a.attr("data-miniprogram-title"), i = a.attr("data-miniprogram-imageUrl"), e = a.attr("data-miniprogram-nickname"), n = a.attr("data-miniprogram-avatar"), p = a.attr("data-miniprogram-path");
            return $("<mp-miniprogram>").attr("class", "miniprogram_element").attr("data-miniprogram-appid", t).attr("data-miniprogram-path", p).attr("data-miniprogram-nickname", e).attr("data-miniprogram-avatar", n).attr("data-miniprogram-title", r).attr("data-miniprogram-imageUrl", i);
        }), t.html();
    }

    function n(a) {
        this.__o = {
            container: ""
        }, this.editor = null, this.__init(a || {}), a && a.container && $(a.container).show(), this.can_use_weapp_card = a.can_use_weapp_card || !1;
    }

    a("common/wx/popup.js"), a("biz_web/ui/checkbox.js"), a("common/wx/popup.js");
    var p = a("common/wx/media/weappDialog.js"), m = a("tpl/mpEditor/plugin/link_popup.html.js"), o = a("common/wx/mpEditor/plugin/img.js");
    return n.beforeSetContent = function (a) {
        if (!a.html) return "";
        var t = i(a.html);
        return t;
    }, n.prototype = {
        getName: function () {
            return "insertweapp";
        },
        noCommandReprot: function () {
            return !0;
        },
        getExecCommand: function () {
            var a = this;
            return function (t, r) {
                var i = a.editor.queryCommandValue("insertweapp"), e = {};
                if (i) {
                    {
                        i.getAttribute("data-miniprogram-appid");
                    }
                    e = {
                        content: i.innerText,
                        main_page: i.getAttribute("data-miniprogram-path"),
                        nick_name: i.getAttribute("data-miniprogram-nickname"),
                        appid: i.getAttribute("data-miniprogram-appid"),
                        image: $(i).find("img").attr("src"),
                        step: r || 1
                    };
                }
                p.show(e, function (t, i, e) {
                    t && a.__insert(i, e, 4 == r);
                });
            };
        },
        getContainer: function () {
            return this.__o.container;
        },
        getQueryCommandValue: function () {
            var a = this;
            return function () {
                var t = a.editor;
                if (t) {
                    var r, i = t.getSelectionRange(), e = t.getDomUtils();
                    if (!i.collapsed) {
                        i.shrinkBoundary();
                        var n = 3 != i.startContainer.nodeType && i.startContainer.childNodes[i.startOffset] ? i.startContainer.childNodes[i.startOffset] : i.startContainer, p = 3 == i.endContainer.nodeType || 0 == i.endOffset ? i.endContainer : i.endContainer.childNodes[i.endOffset - 1],
                            m = i.getCommonAncestor();
                        if (r = e.findParentByTagName(m, "a", !0), !r && 1 == m.nodeType) for (var o, d, c, g = m.getElementsByTagName("a"), l = 0; c = g[l++];) if (o = e.getPosition(c, n),
                            d = e.getPosition(c, p), (o & e.POSITION_FOLLOWING || o & e.POSITION_CONTAINS) && (d & e.POSITION_PRECEDING || d & e.POSITION_CONTAINS)) {
                            r = c;
                            break;
                        }
                        return r;
                    }
                    return r = i.startContainer, r = 1 == r.nodeType ? r : r.parentNode, r && (r = e.findParentByTagName(r, "a", !0)) && !e.isInNodeEndBoundary(i, r) ? r : void 0;
                }
            };
        },
        addListener: function (a) {
            a.addListener("beforepaste", function (a, t) {
                t.html = i(t.html);
            }), a.addListener("handle_common_popup", function (t, r) {
                var i = a.queryCommandValue("insertweapp");
                if (i && -1 == (i.href || "").indexOf("javascript:")) {
                    if (!i.getAttribute("data-miniprogram-appid")) return;
                    var e = i.getAttribute("data-miniprogram-nickname") || "";
                    e.length > 30 && (e = e.substring(0, 20) + "..."), r.html += wx.T(m, {
                        needBreak: r.html ? !0 : !1,
                        url: "javascript:;",
                        txt: e,
                        isWeapp: !0
                    }), r.node = i;
                }
            });
        },
        beforeSetContent: function (a) {
            return n.beforeSetContent({
                html: a
            });
        },
        getPluginData: function (a) {
            var t = a.init(), r = t.get("content");
            return r ? (r = e(r), t.set("content", r), t) : void 0;
        },
        __init: function (a) {
            var t = this.__o;
            for (var r in a) Object.prototype.hasOwnProperty.call(t, r) && (t[r] = a[r]);
        },
        __insert: function (a, i, e) {
            console.log(a, i);
            var n = i.type, p = "", m = {
                appid: a.appid,
                nickname: a.nick_name,
                avatar: a.pic_url,
                title: i.title,
                imageUrl: i.imageUrl,
                path: i.path,
                content: i.content
            };
            if (m.src = t("/cgi-bin/readtemplate?t=tmpl/weapp_tmpl&title={title}&imageUrl={imageUrl}&avatar={avatar}&nickname={nickname}", m),
            "card" == n) p = '<p><iframe class="res_iframe weapp_app_iframe js_editor_weapp" frameborder="0" src="{src}" data-miniprogram-appid="{appid}" data-miniprogram-nickname="{nickname}" data-miniprogram-title="{title}" data-miniprogram-imageUrl="{imageUrl}" data-miniprogram-avatar="{avatar}" data-miniprogram-path="{path}"></iframe></p>'; else if ("text" == n) {
                if (p = '<a class="weapp_text_link" data-miniprogram-appid="{appid}" data-miniprogram-path="{path}" data-miniprogram-nickname="{nickname}" href="">{content}</a>',
                    e) {
                    var d = this.editor.queryCommandValue("insertweapp");
                    if (d) return void $(d).replaceWith(function () {
                        return $(r(p, m));
                    });
                }
            } else "image" == n && (p = o.formatHTML({
                src: i.image,
                _src: i.image
            }).join(""), p = $(p).find("img").get(0).outerHTML, p = '<p><a class="weapp_image_link" data-miniprogram-appid="{appid}" data-miniprogram-path="{path}" data-miniprogram-nickname="{nickname}" href="">' + p + "</a></p>");
            p = r(p, m);
            var c = this.editor, g = c.execCommand("inserthtml", p, !0);
            console.log("execCommand", g);
        }
    }, n;
});