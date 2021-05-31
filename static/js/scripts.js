/* breakpoints.js v1.0 | @ajlkn | MIT licensed */
let breakpoints = function() {
    "use strict";
    function e(e) {
        t.init(e)
    }
    let t = {
        list: null,
        media: {},
        events: [],
        init: function(e) {
            t.list = e,
                window.addEventListener("resize", t.poll),
                window.addEventListener("orientationchange", t.poll),
                window.addEventListener("load", t.poll),
                window.addEventListener("fullscreenchange", t.poll)
        },
        active: function(e) {
            let n, a, s, i, r, d, c;
            if (!(e in t.media)) {
                if (">=" == e.substr(0, 2) ? (a = "gte",
                    n = e.substr(2)) : "<=" == e.substr(0, 2) ? (a = "lte",
                    n = e.substr(2)) : ">" == e.substr(0, 1) ? (a = "gt",
                    n = e.substr(1)) : "<" == e.substr(0, 1) ? (a = "lt",
                    n = e.substr(1)) : "!" == e.substr(0, 1) ? (a = "not",
                    n = e.substr(1)) : (a = "eq",
                    n = e),
                n && n in t.list)
                    if (i = t.list[n],
                        Array.isArray(i)) {
                        if (r = parseInt(i[0]),
                            d = parseInt(i[1]),
                            isNaN(r)) {
                            if (isNaN(d))
                                return;
                            c = i[1].substr(String(d).length)
                        } else
                            c = i[0].substr(String(r).length);
                        if (isNaN(r))
                            switch (a) {
                                case "gte":
                                    s = "screen";
                                    break;
                                case "lte":
                                    s = "screen and (max-width: " + d + c + ")";
                                    break;
                                case "gt":
                                    s = "screen and (min-width: " + (d + 1) + c + ")";
                                    break;
                                case "lt":
                                    s = "screen and (max-width: -1px)";
                                    break;
                                case "not":
                                    s = "screen and (min-width: " + (d + 1) + c + ")";
                                    break;
                                default:
                                    s = "screen and (max-width: " + d + c + ")"
                            }
                        else if (isNaN(d))
                            switch (a) {
                                case "gte":
                                    s = "screen and (min-width: " + r + c + ")";
                                    break;
                                case "lte":
                                    s = "screen";
                                    break;
                                case "gt":
                                    s = "screen and (max-width: -1px)";
                                    break;
                                case "lt":
                                    s = "screen and (max-width: " + (r - 1) + c + ")";
                                    break;
                                case "not":
                                    s = "screen and (max-width: " + (r - 1) + c + ")";
                                    break;
                                default:
                                    s = "screen and (min-width: " + r + c + ")"
                            }
                        else
                            switch (a) {
                                case "gte":
                                    s = "screen and (min-width: " + r + c + ")";
                                    break;
                                case "lte":
                                    s = "screen and (max-width: " + d + c + ")";
                                    break;
                                case "gt":
                                    s = "screen and (min-width: " + (d + 1) + c + ")";
                                    break;
                                case "lt":
                                    s = "screen and (max-width: " + (r - 1) + c + ")";
                                    break;
                                case "not":
                                    s = "screen and (max-width: " + (r - 1) + c + "), screen and (min-width: " + (d + 1) + c + ")";
                                    break;
                                default:
                                    s = "screen and (min-width: " + r + c + ") and (max-width: " + d + c + ")"
                            }
                    } else
                        s = "(" == i.charAt(0) ? "screen and " + i : i;
                t.media[e] = !!s && s
            }
            return t.media[e] !== !1 && window.matchMedia(t.media[e]).matches
        },
        on: function(e, n) {
            t.events.push({
                query: e,
                handler: n,
                state: !1
            }),
            t.active(e) && n()
        },
        poll: function() {
            let e, n;
            for (e = 0; e < t.events.length; e++)
                n = t.events[e],
                    t.active(n.query) ? n.state || (n.state = !0,
                        n.handler()) : n.state && (n.state = !1)
        }
    };
    return e._ = t,
        e.on = function(e, n) {
            t.on(e, n)
        }
        ,
        e.active = function(e) {
            return t.active(e)
        }
        ,
        e
}();
!function(e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.breakpoints = t()
}(this, function() {
    return breakpoints
});

/* browser.js v1.0 | @ajlkn | MIT licensed */
let browser = function() {
    "use strict";
    let e = {
        name: null,
        version: null,
        os: null,
        osVersion: null,
        touch: null,
        mobile: null,
        _canUse: null,
        canUse: function(n) {
            e._canUse || (e._canUse = document.createElement("div"));
            let o = e._canUse.style
                , r = n.charAt(0).toUpperCase() + n.slice(1);
            return n in o || "Moz" + r in o || "Webkit" + r in o || "O" + r in o || "ms" + r in o
        },
        init: function() {
            let n, o, r, i, t = navigator.userAgent;
            for (n = "other",
                     o = 0,
                     r = [["firefox", /Firefox\/([0-9\.]+)/], ["bb", /BlackBerry.+Version\/([0-9\.]+)/], ["bb", /BB[0-9]+.+Version\/([0-9\.]+)/], ["opera", /OPR\/([0-9\.]+)/], ["opera", /Opera\/([0-9\.]+)/], ["edge", /Edge\/([0-9\.]+)/], ["safari", /Version\/([0-9\.]+).+Safari/], ["chrome", /Chrome\/([0-9\.]+)/], ["ie", /MSIE ([0-9]+)/], ["ie", /Trident\/.+rv:([0-9]+)/]],
                     i = 0; i < r.length; i++)
                if (t.match(r[i][1])) {
                    n = r[i][0],
                        o = parseFloat(RegExp.$1);
                    break
                }
            for (e.name = n,
                     e.version = o,
                     n = "other",
                     o = 0,
                     r = [["ios", /([0-9_]+) like Mac OS X/, function(e) {
                         return e.replace("_", ".").replace("_", "")
                     }
                     ], ["ios", /CPU like Mac OS X/, function(e) {
                         return 0
                     }
                     ], ["wp", /Windows Phone ([0-9\.]+)/, null], ["android", /Android ([0-9\.]+)/, null], ["mac", /Macintosh.+Mac OS X ([0-9_]+)/, function(e) {
                         return e.replace("_", ".").replace("_", "")
                     }
                     ], ["windows", /Windows NT ([0-9\.]+)/, null], ["bb", /BlackBerry.+Version\/([0-9\.]+)/, null], ["bb", /BB[0-9]+.+Version\/([0-9\.]+)/, null], ["linux", /Linux/, null], ["bsd", /BSD/, null], ["unix", /X11/, null]],
                     i = 0; i < r.length; i++)
                if (t.match(r[i][1])) {
                    n = r[i][0],
                        o = parseFloat(r[i][2] ? r[i][2](RegExp.$1) : RegExp.$1);
                    break
                }
            e.os = n,
                e.osVersion = o,
                e.touch = "wp" == e.os ? navigator.msMaxTouchPoints > 0 : !!("ontouchstart"in window),
                e.mobile = "wp" == e.os || "android" == e.os || "ios" == e.os || "bb" == e.os
        }
    };
    return e.init(),
        e
}();
!function(e, n) {
    "function" == typeof define && define.amd ? define([], n) : "object" == typeof exports ? module.exports = n() : e.browser = n()
}(this, function() {
    return browser
});

/* utils */
(function($) {
        $.fn.panel = function(userConfig) {
            $this._hide = function(event) {
                if (!config.target.hasClass(config.visibleClass)) {
                    return
                }
                if (event) {
                    event.preventDefault();
                    event.stopPropagation()
                }
                config.target.removeClass(config.visibleClass);
                window.setTimeout(function() {
                    if (config.resetScroll) {
                        $this.scrollTop(0)
                    }
                    if (config.resetForms) {
                        $this.find('form').each(function() {
                            this.reset()
                        })
                    }
                }, config.delay)
            }
            ;
            $this.css('-ms-overflow-style', '-ms-autohiding-scrollbar').css('-webkit-overflow-scrolling', 'touch');
            if (config.hideOnClick) {
                $this.find('a').css('-webkit-tap-highlight-color', 'rgba(0,0,0,0)');
                $this.on('click', 'a', function(event) {
                    let $a = $(this)
                        , href = $a.attr('href')
                        , target = $a.attr('target');
                    if (!href || href == '#' || href == '' || href == '#' + id) {
                        return
                    }
                    event.preventDefault();
                    event.stopPropagation();
                    $this._hide();
                    window.setTimeout(function() {
                        if (target == '_blank') {
                            window.open(href)
                        } else {
                            window.location.href = href
                        }
                    }, config.delay + 10)
                })
            }
            $this.on('touchstart', function(event) {
                $this.touchPosX = event.originalEvent.touches[0].pageX;
                $this.touchPosY = event.originalEvent.touches[0].pageY
            });
            $this.on('touchmove', function(event) {
                if ($this.touchPosX === null || $this.touchPosY === null) {
                    return
                }
                let diffX = $this.touchPosX - event.originalEvent.touches[0].pageX
                    , diffY = $this.touchPosY - event.originalEvent.touches[0].pageY
                    , th = $this.outerHeight()
                    , ts = ($this.get(0).scrollHeight - $this.scrollTop());
                if (config.hideOnSwipe) {
                    let result = false
                        , boundary = 20
                        , delta = 50;
                    switch (config.side) {
                        case 'left':
                            result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta);
                            break;
                        case 'right':
                            result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta));
                            break;
                        case 'top':
                            result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY > delta);
                            break;
                        case 'bottom':
                            result = (diffX < boundary && diffX > (-1 * boundary)) && (diffY < (-1 * delta));
                            break;
                        default:
                            break
                    }
                    if (result) {
                        $this.touchPosX = null;
                        $this.touchPosY = null;
                        $this._hide();
                        return false
                    }
                }
                if (($this.scrollTop() < 0 && diffY < 0) || (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {
                    event.preventDefault();
                    event.stopPropagation()
                }
            });
            $this.on('click touchend touchstart touchmove', function(event) {
                event.stopPropagation()
            });
            $this.on('click', 'a[href="#' + id + '"]', function(event) {
                event.preventDefault();
                event.stopPropagation();
                config.target.removeClass(config.visibleClass)
            });
            $body.on('click touchend', function(event) {
                $this._hide(event)
            });
            $body.on('click', 'a[href="#' + id + '"]', function(event) {
                event.preventDefault();
                event.stopPropagation();
                config.target.toggleClass(config.visibleClass)
            });
            return $this
        };
        $.prioritize = function($elements, condition) {
            let key = '__prioritize';
            if (typeof $elements != 'jQuery') {
                $elements = $($elements)
            }
            $elements.each(function() {
                let $e = $(this), $p, $parent = $e.parent();
                if ($parent.length == 0) {
                    return
                }
                if (!$e.data(key)) {
                    if (!condition) {
                        return
                    }
                    $p = $e.prev();
                    if ($p.length == 0) {
                        return
                    }
                    $e.prependTo($parent);
                    $e.data(key, $p)
                } else {
                    if (condition) {
                        return
                    }
                    $p = $e.data(key);
                    $e.insertAfter($p);
                    $e.removeData(key)
                }
            })
        }
    }
)(jQuery);

/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function($) {
        let $window = $(window)
            , $body = $('body')
            , $wrapper = $('#wrapper')
            , $header = $('#header')
            , $footer = $('#footer')
            , $main = $('#main')
            , $main_articles = $main.children('article');
        breakpoints({
            xlarge: ['1281px', '1680px'],
            large: ['981px', '1280px'],
            medium: ['737px', '980px'],
            small: ['481px', '736px'],
            xsmall: ['361px', '480px'],
            xxsmall: [null, '360px']
        });
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload')
            }, 50)
        });
        if (browser.name == 'ie') {
            let flexboxFixTimeoutId;
            $window.on('resize.flexbox-fix', function() {
                clearTimeout(flexboxFixTimeoutId);
                flexboxFixTimeoutId = setTimeout(function() {
                    if ($wrapper.prop('scrollHeight') > $window.height()) {
                        $wrapper.css('height', 'auto')
                    } else {
                        $wrapper.css('height', '100vh')
                    }
                }, 250)
            }).triggerHandler('resize.flexbox-fix')
        }
        let $nav = $header.children('nav')
            , $nav_li = $nav.find('li');
        if ($nav_li.length % 2 == 0) {
            $nav.addClass('use-middle');
            $nav_li.eq(($nav_li.length / 2)).addClass('is-middle')
        }
        let delay = 325
            , locked = false;
        $main._show = function(id, initial) {
            let $article = $main_articles.filter('#' + id);
            if ($article.length == 0) {
                return
            }
            if (locked || (typeof initial != 'undefined' && initial === true)) {
                $body.addClass('is-switching');
                $body.addClass('is-article-visible');
                $main_articles.removeClass('active');
                $header.hide();
                $footer.hide();
                $main.show();
                $article.show();
                $article.addClass('active');
                locked = false;
                setTimeout(function() {
                    $body.removeClass('is-switching')
                }, (initial ? 1000 : 0));
                return
            }
            locked = true;
            if ($body.hasClass('is-article-visible')) {
                let $currentArticle = $main_articles.filter('.active');
                $currentArticle.removeClass('active');
                setTimeout(function() {
                    $currentArticle.hide();
                    $article.show();
                    setTimeout(function() {
                        $article.addClass('active');
                        $window.scrollTop(0).triggerHandler('resize.flexbox-fix');
                        setTimeout(function() {
                            locked = false
                        }, delay)
                    }, 25)
                }, delay)
            } else {
                $body.addClass('is-article-visible');
                setTimeout(function() {
                    $header.hide();
                    $footer.hide();
                    $main.show();
                    $article.show();
                    setTimeout(function() {
                        $article.addClass('active');
                        $window.scrollTop(0).triggerHandler('resize.flexbox-fix');
                        setTimeout(function() {
                            locked = false
                        }, delay)
                    }, 25)
                }, delay)
            }
        }
        ;
        $main._hide = function(addState) {
            let $article = $main_articles.filter('.active');
            if (!$body.hasClass('is-article-visible')) {
                return
            }
            if (typeof addState != 'undefined' && addState === true) {
                history.pushState(null, null, '#')
            }
            if (locked) {
                $body.addClass('is-switching');
                $article.removeClass('active');
                $article.hide();
                $main.hide();
                $footer.show();
                $header.show();
                $body.removeClass('is-article-visible');
                locked = false;
                $body.removeClass('is-switching');
                $window.scrollTop(0).triggerHandler('resize.flexbox-fix');
                return
            }
            locked = true;
            $article.removeClass('active');
            setTimeout(function() {
                $article.hide();
                $main.hide();
                $footer.show();
                $header.show();
                setTimeout(function() {
                    $body.removeClass('is-article-visible');
                    $window.scrollTop(0).triggerHandler('resize.flexbox-fix');
                    setTimeout(function() {
                        locked = false
                    }, delay)
                }, 25)
            }, delay)
        }
        ;
        $main_articles.each(function() {
            let $this = $(this);
            $('<div class="close">Close</div>').appendTo($this).on('click', function() {
                location.hash = ''
            });
            $this.on('click', function(event) {
                event.stopPropagation()
            })
        });
        $body.on('click', function(event) {
            if ($body.hasClass('is-article-visible')) {
                $main._hide(true)
            }
        });
        $window.on('keyup', function(event) {
            switch (event.keyCode) {
                case 27:
                    if ($body.hasClass('is-article-visible')) {
                        $main._hide(true)
                    }
                    break;
                default:
                    break
            }
        });
        $window.on('hashchange', function(event) {
            if (location.hash == '' || location.hash == '#') {
                event.preventDefault();
                event.stopPropagation();
                $main._hide()
            } else if ($main_articles.filter(location.hash).length > 0) {
                event.preventDefault();
                event.stopPropagation();
                $main._show(location.hash.substr(1))
            }
        });
        if ('scrollRestoration'in history) {
            history.scrollRestoration = 'manual'
        } else {
            let oldScrollPos = 0
                , scrollPos = 0
                , $htmlbody = $('html,body');
            $window.on('scroll', function() {
                oldScrollPos = scrollPos;
                scrollPos = $htmlbody.scrollTop()
            }).on('hashchange', function() {
                $window.scrollTop(oldScrollPos)
            })
        }
        $main.hide();
        $main_articles.hide();
        if (location.hash != '' && location.hash != '#') {
            $window.on('load', function() {
                $main._show(location.hash.substr(1), true)
            })
        }
    }
)(jQuery);

function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth - 1))
}
const items = document.querySelectorAll(".timeline li");
function callbackFunc() {
    for (let i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
            items[i].classList.add("in-view")
        }
    }
}
window.addEventListener("scroll", callbackFunc);
