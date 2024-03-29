define("tpl/popover.html.js", [], function () {
    return '<div class="popover {className}" style="{if width}width:{width}px;{/if}">\n    <div class="popover_inner">\n        <div class="popover_content jsPopOverContent">{=content}</div>\n		<!--#0001#-->\n        {if close}<a href="javascript:;" class="popover_close icon16_common close_flat jsPopoverClose">关闭</a>{/if}\n        <!--%0001%-->\n\n        <div class="popover_bar">{each buttons as bt index}<a href="javascript:;" class="btn btn_{bt.type} jsPopoverBt">{bt.text}</a>{if index < buttons.length-1}&nbsp;{/if}{/each}</div>\n    </div>\n    <i class="popover_arrow popover_arrow_out"></i>\n    <i class="popover_arrow popover_arrow_in"></i> \n</div>\n';
});
define("tpl/dialog.html.js", [], function () {
    return '<div class="dialog_wrp {className}" style="{if width}width:{width}px;{/if}{if height}height:{height}px;{/if};display:none;">\n  <div class="dialog" id="{id}">\n    <div class="dialog_hd">\n      <h3>{title}</h3>\n      {if !hideClose}\n      <button onclick="return false;" class="weui-desktop-icon-btn weui-desktop-dialog__close-btn pop_closed">\n        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><title>Element / Icon - Close</title><path d="M10.01 8.996l7.922-7.922c.086-.086.085-.21.008-.289l-.73-.73c-.075-.074-.208-.075-.29.007L9 7.984 1.077.062C.995-.02.863-.019.788.055l-.73.73c-.078.078-.079.203.007.29l7.922 7.92-7.922 7.922c-.086.086-.085.212-.007.29l.73.73c.075.074.207.074.29-.008l7.92-7.921 7.922 7.921c.082.082.215.082.29.008l.73-.73c.077-.078.078-.204-.008-.29l-7.921-7.921z"/></svg>\n      </button>\n      <!--\n      <a href="javascript:;" onclick="return false" class="icon16_opr closed pop_closed">关闭</a>\n      -->\n      {/if}\n    </div>\n    <div class="dialog_bd">\n      <div class="page_msg large simple default {msg.msgClass}">\n        <div class="inner group">\n          <span class="msg_icon_wrapper"><i class="icon_msg {icon} "></i></span>\n          <div class="msg_content ">\n          {if msg.title}<h4>{=msg.title}</h4>{/if}\n          {if msg.text}<p>{=msg.text}</p>{/if}\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class="dialog_ft">\n  	{if !hideClose&&!hideBt}\n      {each buttons as bt index}\n      <a href="javascript:;" class="btn {bt.type} js_btn" onclick="return false;">{bt.text}</a>\n      {/each}\n  	{/if}\n    </div>\n  </div>\n</div>\n{if mask}<div class="mask"></div>{/if}\n\n';
});
define("biz_common/jquery.ui/jquery.ui.draggable.js", [], function () {
    !function (t, e) {
        function i(e, i) {
            var o, n, r, a = e.nodeName.toLowerCase();
            return "area" === a ? (o = e.parentNode, n = o.name, e.href && n && "map" === o.nodeName.toLowerCase() ? (r = t("img[usemap=#" + n + "]")[0],
            !!r && s(r)) : !1) : (/input|select|textarea|button|object/.test(a) ? !e.disabled : "a" === a ? e.href || i : i) && s(e);
        }

        function s(e) {
            return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function () {
                return "hidden" === t.css(this, "visibility");
            }).length;
        }

        var o = 0, n = /^ui-id-\d+$/;
        t.ui = t.ui || {}, t.extend(t.ui, {
            version: "1.10.3"
        }), t.fn.extend({
            focus: function (e) {
                return function (i, s) {
                    return "number" == typeof i ? this.each(function () {
                        var e = this;
                        setTimeout(function () {
                            t(e).focus(), s && s.call(e);
                        }, i);
                    }) : e.apply(this, arguments);
                };
            }(t.fn.focus),
            scrollParent: function () {
                var e;
                return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
                    return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"));
                }).eq(0) : this.parents().filter(function () {
                    return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"));
                }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e;
            },
            zIndex: function (i) {
                if (i !== e) return this.css("zIndex", i);
                if (this.length) for (var s, o, n = t(this[0]); n.length && n[0] !== document;) {
                    if (s = n.css("position"), ("absolute" === s || "relative" === s || "fixed" === s) && (o = parseInt(n.css("zIndex"), 10),
                    !isNaN(o) && 0 !== o)) return o;
                    n = n.parent();
                }
                return 0;
            },
            uniqueId: function () {
                return this.each(function () {
                    this.id || (this.id = "ui-id-" + ++o);
                });
            },
            removeUniqueId: function () {
                return this.each(function () {
                    n.test(this.id) && t(this).removeAttr("id");
                });
            }
        }), t.extend(t.expr[":"], {
            data: t.expr.createPseudo ? t.expr.createPseudo(function (e) {
                return function (i) {
                    return !!t.data(i, e);
                };
            }) : function (e, i, s) {
                return !!t.data(e, s[3]);
            },
            focusable: function (e) {
                return i(e, !isNaN(t.attr(e, "tabindex")));
            },
            tabbable: function (e) {
                var s = t.attr(e, "tabindex"), o = isNaN(s);
                return (o || s >= 0) && i(e, !o);
            }
        }), t.extend(t.ui, {
            plugin: {
                add: function (e, i, s) {
                    var o, n = t.ui[e].prototype;
                    for (o in s) n.plugins[o] = n.plugins[o] || [], n.plugins[o].push([i, s[o]]);
                },
                call: function (t, e, i) {
                    var s, o = t.plugins[e];
                    if (o && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType) for (s = 0; s < o.length; s++) t.options[o[s][0]] && o[s][1].apply(t.element, i);
                }
            },
            hasScroll: function (e, i) {
                if ("hidden" === t(e).css("overflow")) return !1;
                var s = i && "left" === i ? "scrollLeft" : "scrollTop", o = !1;
                return e[s] > 0 ? !0 : (e[s] = 1, o = e[s] > 0, e[s] = 0, o);
            }
        });
    }(jQuery), function (t, e) {
        var i = 0, s = Array.prototype.slice, o = t.cleanData;
        t.cleanData = function (e) {
            for (var i, s = 0; null != (i = e[s]); s++) try {
                t(i).triggerHandler("remove");
            } catch (n) {
            }
            o(e);
        }, t.widget = function (e, i, s) {
            var o, n, r, a, l = {}, h = e.split(".")[0];
            e = e.split(".")[1], o = h + "-" + e, s || (s = i, i = t.Widget), t.expr[":"][o.toLowerCase()] = function (e) {
                return !!t.data(e, o);
            }, t[h] = t[h] || {}, n = t[h][e], r = t[h][e] = function (t, e) {
                return this._createWidget ? void(arguments.length && this._createWidget(t, e)) : new r(t, e);
            }, t.extend(r, n, {
                version: s.version,
                _proto: t.extend({}, s),
                _childConstructors: []
            }), a = new i, a.options = t.widget.extend({}, a.options), t.each(s, function (e, s) {
                return t.isFunction(s) ? void(l[e] = function () {
                    var t = function () {
                        return i.prototype[e].apply(this, arguments);
                    }, o = function (t) {
                        return i.prototype[e].apply(this, t);
                    };
                    return function () {
                        var e, i = this._super, n = this._superApply;
                        return this._super = t, this._superApply = o, e = s.apply(this, arguments), this._super = i,
                            this._superApply = n, e;
                    };
                }()) : void(l[e] = s);
            }), r.prototype = t.widget.extend(a, {
                widgetEventPrefix: n ? a.widgetEventPrefix : e
            }, l, {
                constructor: r,
                namespace: h,
                widgetName: e,
                widgetFullName: o
            }), n ? (t.each(n._childConstructors, function (e, i) {
                var s = i.prototype;
                t.widget(s.namespace + "." + s.widgetName, r, i._proto);
            }), delete n._childConstructors) : i._childConstructors.push(r), t.widget.bridge(e, r);
        }, t.widget.extend = function (i) {
            for (var o, n, r = s.call(arguments, 1), a = 0, l = r.length; l > a; a++) for (o in r[a]) n = r[a][o],
            r[a].hasOwnProperty(o) && n !== e && (i[o] = t.isPlainObject(n) ? t.isPlainObject(i[o]) ? t.widget.extend({}, i[o], n) : t.widget.extend({}, n) : n);
            return i;
        }, t.widget.bridge = function (i, o) {
            var n = o.prototype.widgetFullName || i;
            t.fn[i] = function (r) {
                var a = "string" == typeof r, l = s.call(arguments, 1), h = this;
                return r = !a && l.length ? t.widget.extend.apply(null, [r].concat(l)) : r, this.each(a ? function () {
                    var s, o = t.data(this, n);
                    return o ? t.isFunction(o[r]) && "_" !== r.charAt(0) ? (s = o[r].apply(o, l), s !== o && s !== e ? (h = s && s.jquery ? h.pushStack(s.get()) : s,
                        !1) : void 0) : t.error("no such method '" + r + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + r + "'");
                } : function () {
                    var e = t.data(this, n);
                    e ? e.option(r || {})._init() : t.data(this, n, new o(r, this));
                }), h;
            };
        }, t.Widget = function () {
        }, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function (e, s) {
                s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid,
                    this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(),
                    this.hoverable = t(), this.focusable = t(), s !== this && (t.data(s, this.widgetFullName, this),
                    this._on(!0, this.element, {
                        remove: function (t) {
                            t.target === s && this.destroy();
                        }
                    }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)),
                    this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
            },
            _getCreateOptions: t.noop,
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function () {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
                    this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
                    this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"),
                    this.focusable.removeClass("ui-state-focus");
            },
            _destroy: t.noop,
            widget: function () {
                return this.element;
            },
            option: function (i, s) {
                var o, n, r, a = i;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof i) if (a = {}, o = i.split("."), i = o.shift(), o.length) {
                    for (n = a[i] = t.widget.extend({}, this.options[i]), r = 0; r < o.length - 1; r++) n[o[r]] = n[o[r]] || {},
                        n = n[o[r]];
                    if (i = o.pop(), s === e) return n[i] === e ? null : n[i];
                    n[i] = s;
                } else {
                    if (s === e) return this.options[i] === e ? null : this.options[i];
                    a[i] = s;
                }
                return this._setOptions(a), this;
            },
            _setOptions: function (t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this;
            },
            _setOption: function (t, e) {
                return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e),
                    this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")),
                    this;
            },
            enable: function () {
                return this._setOption("disabled", !1);
            },
            disable: function () {
                return this._setOption("disabled", !0);
            },
            _on: function (e, i, s) {
                var o, n = this;
                "boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = o = t(i), this.bindings = this.bindings.add(i)) : (s = i,
                    i = this.element, o = this.widget()), t.each(s, function (s, r) {
                    function a() {
                        return e || n.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof r ? n[r] : r).apply(n, arguments) : void 0;
                    }

                    "string" != typeof r && (a.guid = r.guid = r.guid || a.guid || t.guid++);
                    var l = s.match(/^(\w+)\s*(.*)$/), h = l[1] + n.eventNamespace, c = l[2];
                    c ? o.delegate(c, h, a) : i.bind(h, a);
                });
            },
            _off: function (t, e) {
                e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e);
            },
            _delay: function (t, e) {
                function i() {
                    return ("string" == typeof t ? s[t] : t).apply(s, arguments);
                }

                var s = this;
                return setTimeout(i, e || 0);
            },
            _hoverable: function (e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function (e) {
                        t(e.currentTarget).addClass("ui-state-hover");
                    },
                    mouseleave: function (e) {
                        t(e.currentTarget).removeClass("ui-state-hover");
                    }
                });
            },
            _focusable: function (e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function (e) {
                        t(e.currentTarget).addClass("ui-state-focus");
                    },
                    focusout: function (e) {
                        t(e.currentTarget).removeClass("ui-state-focus");
                    }
                });
            },
            _trigger: function (e, i, s) {
                var o, n, r = this.options[e];
                if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(),
                    i.target = this.element[0], n = i.originalEvent) for (o in n) o in i || (i[o] = n[o]);
                return this.element.trigger(i, s), !(t.isFunction(r) && r.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented());
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function (e, i) {
            t.Widget.prototype["_" + e] = function (s, o, n) {
                "string" == typeof o && (o = {
                    effect: o
                });
                var r, a = o ? o === !0 || "number" == typeof o ? i : o.effect || i : e;
                o = o || {}, "number" == typeof o && (o = {
                    duration: o
                }), r = !t.isEmptyObject(o), o.complete = n, o.delay && s.delay(o.delay), r && t.effects && t.effects.effect[a] ? s[e](o) : a !== e && s[a] ? s[a](o.duration, o.easing, n) : s.queue(function (i) {
                    t(this)[e](), n && n.call(s[0]), i();
                });
            };
        });
    }(jQuery), function (t) {
        var e = !1;
        t(document).mouseup(function () {
            e = !1;
        }), t.widget("ui.mouse", {
            version: "1.10.3",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function () {
                var e = this;
                this.element.bind("mousedown." + this.widgetName, function (t) {
                    return e._mouseDown(t);
                }).bind("click." + this.widgetName, function (i) {
                    return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"),
                        i.stopImmediatePropagation(), !1) : void 0;
                }), this.started = !1;
            },
            _mouseDestroy: function () {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            },
            _mouseDown: function (i) {
                if (!e) {
                    this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                    var s = this, o = 1 === i.which, n = "string" == typeof this.options.cancel && i.target.nodeName ? t(i.target).closest(this.options.cancel).length : !1;
                    return o && !n && this._mouseCapture(i) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                        s.mouseDelayMet = !0;
                    }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1,
                        !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"),
                        this._mouseMoveDelegate = function (t) {
                            return s._mouseMove(t);
                        }, this._mouseUpDelegate = function (t) {
                        return s._mouseUp(t);
                    }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                        i.preventDefault(), e = !0, !0)) : !0;
                }
            },
            _mouseMove: function (e) {
                return t.ui.ie && (!document.documentMode || document.documentMode < 9) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e),
                    e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1,
                    this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted);
            },
            _mouseUp: function (e) {
                return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
                this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0),
                    this._mouseStop(e)), !1;
            },
            _mouseDistanceMet: function (t) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance;
            },
            _mouseDelayMet: function () {
                return this.mouseDelayMet;
            },
            _mouseStart: function () {
            },
            _mouseDrag: function () {
            },
            _mouseStop: function () {
            },
            _mouseCapture: function () {
                return !0;
            }
        });
    }(jQuery), function (t) {
        t.widget("ui.draggable", t.ui.mouse, {
            version: "1.10.3",
            widgetEventPrefix: "drag",
            options: {
                addClasses: !0,
                appendTo: "parent",
                axis: !1,
                connectToSortable: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                iframeFix: !1,
                opacity: !1,
                refreshPositions: !1,
                revert: !1,
                revertDuration: 500,
                scope: "default",
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                snap: !1,
                snapMode: "both",
                snapTolerance: 20,
                stack: !1,
                zIndex: !1,
                drag: null,
                start: null,
                stop: null
            },
            _create: function () {
                "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"),
                this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"),
                    this._mouseInit();
            },
            _destroy: function () {
                this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
                    this._mouseDestroy();
            },
            _mouseCapture: function (e) {
                var i = this.options;
                return this.helper || i.disabled || t(e.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(e),
                    this.handle ? (t(i.iframeFix === !0 ? "iframe" : i.iframeFix).each(function () {
                        t("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                            width: this.offsetWidth + "px",
                            height: this.offsetHeight + "px",
                            position: "absolute",
                            opacity: "0.001",
                            zIndex: 1e3
                        }).css(t(this).offset()).appendTo("body");
                    }), !0) : !1);
            },
            _mouseStart: function (e) {
                var i = this.options;
                return this.helper = this._createHelper(e), this.helper.addClass("ui-draggable-dragging"),
                    this._cacheHelperProportions(), t.ui.ddmanager && (t.ui.ddmanager.current = this), this._cacheMargins(),
                    this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(),
                    this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"),
                    this.offset = this.positionAbs = this.element.offset(), this.offset = {
                    top: this.offset.top - this.margins.top,
                    left: this.offset.left - this.margins.left
                }, this.offset.scroll = !1, t.extend(this.offset, {
                    click: {
                        left: e.pageX - this.offset.left,
                        top: e.pageY - this.offset.top
                    },
                    parent: this._getParentOffset(),
                    relative: this._getRelativeOffset()
                }), this.originalPosition = this.position = this._generatePosition(e), this.originalPageX = e.pageX,
                    this.originalPageY = e.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt),
                    this._setContainment(), this._trigger("start", e) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(),
                t.ui.ddmanager && !i.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this._mouseDrag(e, !0),
                t.ui.ddmanager && t.ui.ddmanager.dragStart(this, e), !0);
            },
            _mouseDrag: function (e, i) {
                if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()),
                    this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"),
                    !i) {
                    var s = this._uiHash();
                    if (this._trigger("drag", e, s) === !1) return this._mouseUp({}), !1;
                    this.position = s.position;
                }
                return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
                this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
                t.ui.ddmanager && t.ui.ddmanager.drag(this, e), !1;
            },
            _mouseStop: function (e) {
                var i = this, s = !1;
                return t.ui.ddmanager && !this.options.dropBehaviour && (s = t.ui.ddmanager.drop(this, e)),
                this.dropped && (s = this.dropped, this.dropped = !1), "original" !== this.options.helper || t.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !s || "valid" === this.options.revert && s || this.options.revert === !0 || t.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? t(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
                    i._trigger("stop", e) !== !1 && i._clear();
                }) : this._trigger("stop", e) !== !1 && this._clear(), !1) : !1;
            },
            _mouseUp: function (e) {
                return t("div.ui-draggable-iframeFix").each(function () {
                    this.parentNode.removeChild(this);
                }), t.ui.ddmanager && t.ui.ddmanager.dragStop(this, e), t.ui.mouse.prototype._mouseUp.call(this, e);
            },
            cancel: function () {
                return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
                    this;
            },
            _getHandle: function (e) {
                return this.options.handle ? !!t(e.target).closest(this.element.find(this.options.handle)).length : !0;
            },
            _createHelper: function (e) {
                var i = this.options, s = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e])) : "clone" === i.helper ? this.element.clone().removeAttr("id") : this.element;
                return s.parents("body").length || s.appendTo("parent" === i.appendTo ? this.element[0].parentNode : i.appendTo),
                s[0] === this.element[0] || /(fixed|absolute)/.test(s.css("position")) || s.css("position", "absolute"),
                    s;
            },
            _adjustOffsetFromHelper: function (e) {
                "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left),
                "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top);
            },
            _getParentOffset: function () {
                var e = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(),
                    e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                };
            },
            _getRelativeOffset: function () {
                if ("relative" === this.cssPosition) {
                    var t = this.element.position();
                    return {
                        top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    };
                }
                return {
                    top: 0,
                    left: 0
                };
            },
            _cacheMargins: function () {
                this.margins = {
                    left: parseInt(this.element.css("marginLeft"), 10) || 0,
                    top: parseInt(this.element.css("marginTop"), 10) || 0,
                    right: parseInt(this.element.css("marginRight"), 10) || 0,
                    bottom: parseInt(this.element.css("marginBottom"), 10) || 0
                };
            },
            _cacheHelperProportions: function () {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                };
            },
            _setContainment: function () {
                var e, i, s, o = this.options;
                return o.containment ? "window" === o.containment ? void(this.containment = [t(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, t(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, t(window).scrollLeft() + t(window).width() - this.helperProportions.width - this.margins.left, t(window).scrollTop() + (t(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : "document" === o.containment ? void(this.containment = [0, 0, t(document).width() - this.helperProportions.width - this.margins.left, (t(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]) : o.containment.constructor === Array ? void(this.containment = o.containment) : ("parent" === o.containment && (o.containment = this.helper[0].parentNode),
                    i = t(o.containment), s = i[0], void(s && (e = "hidden" !== i.css("overflow"), this.containment = [(parseInt(i.css("borderLeftWidth"), 10) || 0) + (parseInt(i.css("paddingLeft"), 10) || 0), (parseInt(i.css("borderTopWidth"), 10) || 0) + (parseInt(i.css("paddingTop"), 10) || 0), (e ? Math.max(s.scrollWidth, s.offsetWidth) : s.offsetWidth) - (parseInt(i.css("borderRightWidth"), 10) || 0) - (parseInt(i.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (e ? Math.max(s.scrollHeight, s.offsetHeight) : s.offsetHeight) - (parseInt(i.css("borderBottomWidth"), 10) || 0) - (parseInt(i.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
                    this.relative_container = i))) : void(this.containment = null);
            },
            _convertPositionTo: function (e, i) {
                i || (i = this.position);
                var s = "absolute" === e ? 1 : -1, o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
                return this.offset.scroll || (this.offset.scroll = {
                    top: o.scrollTop(),
                    left: o.scrollLeft()
                }), {
                    top: i.top + this.offset.relative.top * s + this.offset.parent.top * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * s,
                    left: i.left + this.offset.relative.left * s + this.offset.parent.left * s - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * s
                };
            },
            _generatePosition: function (e) {
                var i, s, o, n, r = this.options, a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, l = e.pageX, h = e.pageY;
                return this.offset.scroll || (this.offset.scroll = {
                    top: a.scrollTop(),
                    left: a.scrollLeft()
                }), this.originalPosition && (this.containment && (this.relative_container ? (s = this.relative_container.offset(),
                    i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment,
                e.pageX - this.offset.click.left < i[0] && (l = i[0] + this.offset.click.left), e.pageY - this.offset.click.top < i[1] && (h = i[1] + this.offset.click.top),
                e.pageX - this.offset.click.left > i[2] && (l = i[2] + this.offset.click.left), e.pageY - this.offset.click.top > i[3] && (h = i[3] + this.offset.click.top)),
                r.grid && (o = r.grid[1] ? this.originalPageY + Math.round((h - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY,
                    h = i ? o - this.offset.click.top >= i[1] || o - this.offset.click.top > i[3] ? o : o - this.offset.click.top >= i[1] ? o - r.grid[1] : o + r.grid[1] : o,
                    n = r.grid[0] ? this.originalPageX + Math.round((l - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX,
                    l = i ? n - this.offset.click.left >= i[0] || n - this.offset.click.left > i[2] ? n : n - this.offset.click.left >= i[0] ? n - r.grid[0] : n + r.grid[0] : n)),
                    {
                        top: h - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                        left: l - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
                    };
            },
            _clear: function () {
                this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
                    this.helper = null, this.cancelHelperRemoval = !1;
            },
            _trigger: function (e, i, s) {
                return s = s || this._uiHash(), t.ui.plugin.call(this, e, [i, s]), "drag" === e && (this.positionAbs = this._convertPositionTo("absolute")),
                    t.Widget.prototype._trigger.call(this, e, i, s);
            },
            plugins: {},
            _uiHash: function () {
                return {
                    helper: this.helper,
                    position: this.position,
                    originalPosition: this.originalPosition,
                    offset: this.positionAbs
                };
            }
        }), t.ui.plugin.add("draggable", "connectToSortable", {
            start: function (e, i) {
                var s = t(this).data("ui-draggable"), o = s.options, n = t.extend({}, i, {
                    item: s.element
                });
                s.sortables = [], t(o.connectToSortable).each(function () {
                    var i = t.data(this, "ui-sortable");
                    i && !i.options.disabled && (s.sortables.push({
                        instance: i,
                        shouldRevert: i.options.revert
                    }), i.refreshPositions(), i._trigger("activate", e, n));
                });
            },
            stop: function (e, i) {
                var s = t(this).data("ui-draggable"), o = t.extend({}, i, {
                    item: s.element
                });
                t.each(s.sortables, function () {
                    this.instance.isOver ? (this.instance.isOver = 0, s.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1,
                    this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(e),
                        this.instance.options.helper = this.instance.options._helper, "original" === s.options.helper && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", e, o));
                });
            },
            drag: function (e, i) {
                var s = t(this).data("ui-draggable"), o = this;
                t.each(s.sortables, function () {
                    var n = !1, r = this;
                    this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions,
                        this.instance.offset.click = s.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (n = !0,
                        t.each(s.sortables, function () {
                            return this.instance.positionAbs = s.positionAbs, this.instance.helperProportions = s.helperProportions,
                                this.instance.offset.click = s.offset.click, this !== r && this.instance._intersectsWith(this.instance.containerCache) && t.contains(r.instance.element[0], this.instance.element[0]) && (n = !1),
                                n;
                        })), n ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = t(o).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0),
                        this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                        return i.helper[0];
                    }, e.target = this.instance.currentItem[0], this.instance._mouseCapture(e, !0), this.instance._mouseStart(e, !0, !0),
                        this.instance.offset.click.top = s.offset.click.top, this.instance.offset.click.left = s.offset.click.left,
                        this.instance.offset.parent.left -= s.offset.parent.left - this.instance.offset.parent.left,
                        this.instance.offset.parent.top -= s.offset.parent.top - this.instance.offset.parent.top,
                        s._trigger("toSortable", e), s.dropped = this.instance.element, s.currentItem = s.element,
                        this.instance.fromOutside = s), this.instance.currentItem && this.instance._mouseDrag(e)) : this.instance.isOver && (this.instance.isOver = 0,
                        this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", e, this.instance._uiHash(this.instance)),
                        this.instance._mouseStop(e, !0), this.instance.options.helper = this.instance.options._helper,
                        this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(),
                        s._trigger("fromSortable", e), s.dropped = !1);
                });
            }
        }), t.ui.plugin.add("draggable", "cursor", {
            start: function () {
                var e = t("body"), i = t(this).data("ui-draggable").options;
                e.css("cursor") && (i._cursor = e.css("cursor")), e.css("cursor", i.cursor);
            },
            stop: function () {
                var e = t(this).data("ui-draggable").options;
                e._cursor && t("body").css("cursor", e._cursor);
            }
        }), t.ui.plugin.add("draggable", "opacity", {
            start: function (e, i) {
                var s = t(i.helper), o = t(this).data("ui-draggable").options;
                s.css("opacity") && (o._opacity = s.css("opacity")), s.css("opacity", o.opacity);
            },
            stop: function (e, i) {
                var s = t(this).data("ui-draggable").options;
                s._opacity && t(i.helper).css("opacity", s._opacity);
            }
        }), t.ui.plugin.add("draggable", "scroll", {
            start: function () {
                var e = t(this).data("ui-draggable");
                e.scrollParent[0] !== document && "HTML" !== e.scrollParent[0].tagName && (e.overflowOffset = e.scrollParent.offset());
            },
            drag: function (e) {
                var i = t(this).data("ui-draggable"), s = i.options, o = !1;
                i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (s.axis && "x" === s.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - e.pageY < s.scrollSensitivity ? i.scrollParent[0].scrollTop = o = i.scrollParent[0].scrollTop + s.scrollSpeed : e.pageY - i.overflowOffset.top < s.scrollSensitivity && (i.scrollParent[0].scrollTop = o = i.scrollParent[0].scrollTop - s.scrollSpeed)),
                s.axis && "y" === s.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - e.pageX < s.scrollSensitivity ? i.scrollParent[0].scrollLeft = o = i.scrollParent[0].scrollLeft + s.scrollSpeed : e.pageX - i.overflowOffset.left < s.scrollSensitivity && (i.scrollParent[0].scrollLeft = o = i.scrollParent[0].scrollLeft - s.scrollSpeed))) : (s.axis && "x" === s.axis || (e.pageY - t(document).scrollTop() < s.scrollSensitivity ? o = t(document).scrollTop(t(document).scrollTop() - s.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < s.scrollSensitivity && (o = t(document).scrollTop(t(document).scrollTop() + s.scrollSpeed))),
                s.axis && "y" === s.axis || (e.pageX - t(document).scrollLeft() < s.scrollSensitivity ? o = t(document).scrollLeft(t(document).scrollLeft() - s.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < s.scrollSensitivity && (o = t(document).scrollLeft(t(document).scrollLeft() + s.scrollSpeed)))),
                o !== !1 && t.ui.ddmanager && !s.dropBehaviour && t.ui.ddmanager.prepareOffsets(i, e);
            }
        }), t.ui.plugin.add("draggable", "snap", {
            start: function () {
                var e = t(this).data("ui-draggable"), i = e.options;
                e.snapElements = [], t(i.snap.constructor !== String ? i.snap.items || ":data(ui-draggable)" : i.snap).each(function () {
                    var i = t(this), s = i.offset();
                    this !== e.element[0] && e.snapElements.push({
                        item: this,
                        width: i.outerWidth(),
                        height: i.outerHeight(),
                        top: s.top,
                        left: s.left
                    });
                });
            },
            drag: function (e, i) {
                var s, o, n, r, a, l, h, c, p, u, f = t(this).data("ui-draggable"), d = f.options, g = d.snapTolerance, m = i.offset.left, v = m + f.helperProportions.width, _ = i.offset.top, b = _ + f.helperProportions.height;
                for (p = f.snapElements.length - 1; p >= 0; p--) a = f.snapElements[p].left, l = a + f.snapElements[p].width,
                    h = f.snapElements[p].top, c = h + f.snapElements[p].height, a - g > v || m > l + g || h - g > b || _ > c + g || !t.contains(f.snapElements[p].item.ownerDocument, f.snapElements[p].item) ? (f.snapElements[p].snapping && f.options.snap.release && f.options.snap.release.call(f.element, e, t.extend(f._uiHash(), {
                    snapItem: f.snapElements[p].item
                })), f.snapElements[p].snapping = !1) : ("inner" !== d.snapMode && (s = Math.abs(h - b) <= g, o = Math.abs(c - _) <= g,
                    n = Math.abs(a - v) <= g, r = Math.abs(l - m) <= g, s && (i.position.top = f._convertPositionTo("relative", {
                    top: h - f.helperProportions.height,
                    left: 0
                }).top - f.margins.top), o && (i.position.top = f._convertPositionTo("relative", {
                    top: c,
                    left: 0
                }).top - f.margins.top), n && (i.position.left = f._convertPositionTo("relative", {
                    top: 0,
                    left: a - f.helperProportions.width
                }).left - f.margins.left), r && (i.position.left = f._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left - f.margins.left)), u = s || o || n || r, "outer" !== d.snapMode && (s = Math.abs(h - _) <= g,
                    o = Math.abs(c - b) <= g, n = Math.abs(a - m) <= g, r = Math.abs(l - v) <= g, s && (i.position.top = f._convertPositionTo("relative", {
                    top: h,
                    left: 0
                }).top - f.margins.top), o && (i.position.top = f._convertPositionTo("relative", {
                    top: c - f.helperProportions.height,
                    left: 0
                }).top - f.margins.top), n && (i.position.left = f._convertPositionTo("relative", {
                    top: 0,
                    left: a
                }).left - f.margins.left), r && (i.position.left = f._convertPositionTo("relative", {
                    top: 0,
                    left: l - f.helperProportions.width
                }).left - f.margins.left)), !f.snapElements[p].snapping && (s || o || n || r || u) && f.options.snap.snap && f.options.snap.snap.call(f.element, e, t.extend(f._uiHash(), {
                    snapItem: f.snapElements[p].item
                })), f.snapElements[p].snapping = s || o || n || r || u);
            }
        }), t.ui.plugin.add("draggable", "stack", {
            start: function () {
                var e, i = this.data("ui-draggable").options, s = t.makeArray(t(i.stack)).sort(function (e, i) {
                    return (parseInt(t(e).css("zIndex"), 10) || 0) - (parseInt(t(i).css("zIndex"), 10) || 0);
                });
                s.length && (e = parseInt(t(s[0]).css("zIndex"), 10) || 0, t(s).each(function (i) {
                    t(this).css("zIndex", e + i);
                }), this.css("zIndex", e + s.length));
            }
        }), t.ui.plugin.add("draggable", "zIndex", {
            start: function (e, i) {
                var s = t(i.helper), o = t(this).data("ui-draggable").options;
                s.css("zIndex") && (o._zIndex = s.css("zIndex")), s.css("zIndex", o.zIndex);
            },
            stop: function (e, i) {
                var s = t(this).data("ui-draggable").options;
                s._zIndex && t(i.helper).css("zIndex", s._zIndex);
            }
        });
    }(jQuery);
});
define("tpl/preview.html.js", [], function () {
    return '<div class="mask preview_mask"></div>\n<div class="img_preview_container" id="preview_container">\n    <div class="img_preview_inner" id="img_container">\n        <img src="/mpres/htmledition/images/icon/common/icon32_loading_dark.gif" id="loading_dom">\n        <span class="img_preview_wrp" style="display:none;" id="img_dom">\n            <img src="{imgsrc}">\n            <!--#0001#-->\n            <a href="javascript:;" class="img_preview_close" id="closebtn" title="关闭"><i class="icon_img_preview_close">关闭</i></a>\n            <!--%0001%-->\n        </span>\n        <span class="vm_box"></span>\n    </div>\n    <span class="vm_box"></span>\n    {if !prev}\n    <div class="img_preview_opr_container prev_disabled" id="img_opr_container">\n    {else if !next}\n    <div class="img_preview_opr_container next_disabled" id="img_opr_container">\n    {else}\n    <div class="img_preview_opr_container" id="img_opr_container">\n    {/if}\n        <ul class="img_preview_opr_list">\n            <li class="img_preview_opr_item"><a href="javascript:;" id="btnview" title="查看原图"><i class="icon_img_preview origin">查看原图</i>&nbsp;</a></li>\n            {if view}<li class="img_preview_opr_item"><a href="javascript:;" id="btnprev" title="查看上一个"><i class="icon_img_preview prev">上一个</i>&nbsp;</a></li>{/if}\n            {if view}<li class="img_preview_opr_item"><a href="javascript:;" id="btnnext" title="查看下一个"><i class="icon_img_preview next">下一个</i>&nbsp;</a></li>{/if}\n            {if downsrc}<li class="img_preview_opr_item"><a href="{downsrc}" id="btndown" title="下载图片"><i class="icon_img_preview download">下载图片</i>&nbsp;</a></li>{/if}\n        </ul>\n    </div>\n</div>\n';
});
define("tpl/media/dialog/image_water.html.js", [], function () {
    return '<div>\n    {if status == 3}\n    <p>不添加水印</p>\n    {else if status == 2}\n    <p>水印类型：公众号名称</p>\n    {else if status == 1}\n    <p>水印类型：微信号</p>\n    {/if}\n\n    <p>\n        {if status == 3}\n        <span>已关闭水印，所有上传的图片都不会带有水印。</span>\n        {else}\n        <span>已开启水印，所有上传的图片都会带有水印。</span>\n        {/if}\n        若需修改请前往        <a target="_blank" href="{set_water_url}">公众号设置/功能设置</a>\n        设置图片水印    </p>\n</div>\n';
});
define("tpl/media/dialog/add_group.html.js", [], function () {
    return '<div class="popover_edit">\n    <label for="" class="frm_label">创建分组</label>\n\n    <div class="frm_controls">\n    <span class="frm_input_box">\n        <input type="text" class="frm_input js_name" value="">\n    </span>\n\n        <p class="frm_tips"></p>\n\n        <p class="frm_msg fail">\n            <span class="frm_msg_content">填错了！！！！</span>\n        </p>\n    </div>\n</div>\n';
});
define("tpl/media/dialog/image_group.html.js", [], function () {
    return '{each file_group_list.file_group as item}\n<dd id="js_group{item.id}" class="inner_menu_item js_groupitem{if item.id == group} selected{/if}" data-groupid="{item.id}">\n    <a href="javascript:;" class="inner_menu_link" title="{item.name}" onclick="return false">\n        <strong>{item.name}</strong><em class="num">(<span>{item.count}</span>)</em>\n    </a>\n</dd>\n{/each}\n';
});
define("tpl/media/dialog/image_list.html.js", [], function () {
    return '{if file_item.length == 0}\n<li class="empty_tips">该分组暂时没有图片素材</li>\n{else}\n{each file_item as item}\n<li class="img_item js_imageitem" data-id="{item.file_id}" data-url="{item.cdn_url}" data-oristatus="{item.copyright_status||0}" data-format="{item.img_format}">\n    <label class="frm_checkbox_label{if item.selected} selected{/if} img_item_bd">\n        {if scene == \'cdn\' && item.cdn_url}\n        <!-- <span class="pic cover js_pic" style="background-image:url({item.cdn_url});"></span> -->\n        <div class="pic_box">\n            <img class="pic js_pic" data-src="{item.cdn_url}"></img>\n        </div>\n        <!-- <img src="{item.cdn_url}" alt="{item.name}" class="pic"> -->\n        {else}\n        <div class="pic_box">\n            <img class="pic js_pic" data-src="{item.img_url}"></img>\n        </div>\n        <!-- <span class="pic cover js_pic" style="background-image:url({item.img_url});"></span> -->\n        <!-- <img src="{item.img_url}" alt="{item.name}" class="pic"> -->\n        {/if}\n        <span class="lbl_content">\n            {if item.copyright_status==2}\n            <i class="icon_original accessed"></i>\n            {/if}            \n            {item.name}\n        </span>\n        <div class="selected_mask">\n            <div class="selected_mask_inner"></div>\n            <div class="selected_mask_icon"></div>\n        </div>\n    </label>\n</li>\n{/each}\n{/if}\n';
});
define("tpl/media/dialog/image_layout.html.js", [], function () {
    return '<div>\n  {if cropImg}\n  <div class="js_step_wrp processor_wrp"></div>\n  {/if}\n  <div class="img_crop_panel">\n    <div class="js_select_frame img_pick_panel inner_container_box side_l cell_layout">\n        <div class="inner_side">\n            <div class="group_list">\n                <div class="inner_menu_box">\n                    <dl class="inner_menu js_group"></dl>\n                    <div class="inner_menu_item">\n                        <a href="javascript:;" class="inner_menu_link js_creategroup js_popover"><i\n                                class="icon14_common add_gray">新建分组</i>新建分组</a>\n                    </div>\n                </div>                    \n            </div>\n        </div>\n        <div class="inner_main">\n            <div class="img_pick_area">\n                <div class="sub_title_bar in_dialog">\n                    <div class="upload_box r align_right">\n                        <span class="upload_area"><a id="js_imageupload" class="btn btn_primary js_imageupload" data-groupid="">本地上传</a></span>\n                    </div>\n                    <div class="img_water_tips mini_tips icon_after r weak_text">\n                        {if desc}{desc}{/if}<span class="js_water"></span>\n                        <i class="js_water_tips icon_msg_mini ask"></i>\n                    </div>\n                </div>\n                <div class="img_pick_area_inner">\n                    <div class="img_pick">\n                        <i class="icon_loading_small white js_loading"></i>\n                        <ul class="group js_list img_list"></ul>\n                    </div>\n                    <div class="js_pagebar"></div>\n                    {if !!coverPicCheckbox}\n                    <p class="frm_tips">\n                        <label for="" class="frm_checkbox_label">\n                            <i class="icon_checkbox"></i>\n                            <input type="checkbox" class="frm_checkbox js_show_cover_pic" value="1" name="show_cover_pic" {if coverPic*1===1}checked{/if}>\n                            在正文顶部插入封面图原图片                        </label>\n                    </p>\n                    {/if}\n                </div>\n            </div>\n        </div>\n        <p class="dialog_ft_desc">已选<span class="js_selected">0</span>个，可选{maxSelect}个</p>\n    </div>\n    {if cropImg}\n    <div class="js_crop_frame" style="display:none;">\n    </div>\n    {/if}\n  </div>\n<div>\n';
});
define("tpl/tooltips.html.js", [], function () {
    return '<div class="popover {parentClass}" style="display:none;position:{container_mode};{if offset.left}left:{offset.left}px;top:{offset.top}px;{/if}">\n    <div class="popover_inner">\n        <div class="popover_content">{=content}</div>\n        {if container_close}\n        <!--#0001#-->\n        <a href="javascript:;" class="popover_close icon16_common close_flat js_popover_close">关闭</a>\n        <!--%0001%-->\n        {/if}\n        {if buttons.length > 0}\n        <div class="popover_bar">\n			{each buttons as o index}\n			<a onclick="return false;" href="javascript:;" class="js_btn btn {o.type}">{o.text}</a>\n			{/each}\n        </div>\n        {/if}\n    </div>\n    <i class="popover_arrow popover_arrow_out"></i>\n    <i class="popover_arrow popover_arrow_in"></i>\n</div>\n';
});
define("tpl/biz_web/ui/dropdown.html.js", [], function () {
    return '<a href="javascript:;" class="btn dropdown_switch jsDropdownBt"><label class="jsBtLabel" {if search}contenteditable="true"{/if}>{label}</label><i class="arrow"></i></a>\n<div class="dropdown_data_container jsDropdownList">\n    <ul class="dropdown_data_list">\n        {if renderHtml}\n        {=renderHtml}\n        {else}\n            {each data as o index}\n            <li class="dropdown_data_item {if o.className}{o.className}{/if}">  \n                <a onclick="return false;" href="javascript:;" class="jsDropdownItem" data-value="{o.value}" data-index="{index}" data-name="{o.name}">{o.name}</a>\n            </li>\n            {/each}        \n        {/if}\n    </ul>\n</div>\n';
});
define("tpl/step.html.js", [], function () {
    return '<ul class="weui-desktop-steps">\n    {each stepArr as item index}\n    <li class="weui-desktop-step {item.cls}">\n        {item.name}\n    </li>\n    {/each}\n</ul>\n';
});
define("tpl/biz_web/ui/checkbox.html.js", [], function () {
    return '<label for="_checkbox_{index}" class="frm_{type}_label">\n	<i class="icon_{type}"></i>\n	<input type="{type}" class="frm_{type}" name="{name}" id="_checkbox_{index}">\n	<span class="lbl_content">{label}</span>\n</label>';
});
define("tpl/uploader.html.js", [], function () {
    return '<li id="uploadItem{id}" data-status="{className}" class="upload_file">\n    <strong class="upload_file_name">{fileName}</strong>\n    <span class="upload_file_size">({size})</span>\n    <div class="progress_bar"><div class="progress_bar_thumb" style="width:0%"></div></div>\n    <a href="javascript:;" data-id="{id}" class="upload_file_cancel js_cancel">取消</a>\n</li>\n';
});