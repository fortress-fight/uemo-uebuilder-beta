/* eslint-disable */
// @ts-nocheck
function l() {
    return "undefined" != typeof window;
}
function m() {
    return o || (l() && (o = window.gsap) && o.registerPlugin && o);
}
function p(e) {
    return Math.round(1e4 * e) / 1e4;
}
function q(e) {
    return parseFloat(e) || 0;
}
function r(e, t) {
    var n = q(e);
    return ~e.indexOf("%") ? (n / 100) * t : n;
}
function s(e, t) {
    return q(e.getAttribute(t));
}
function u(e, t, n, r, i, o) {
    return M(Math.pow((q(n) - q(e)) * i, 2) + Math.pow((q(r) - q(t)) * o, 2));
}
function v(e) {
    return console.warn(e);
}
function w(e) {
    return "non-scaling-stroke" === e.getAttribute("vector-effect");
}
function E(e) {
    if (!(e = x(e)[0])) return 0;
    var t,
        n,
        r,
        i,
        o,
        a,
        f,
        d = e.tagName.toLowerCase(),
        l = e.style,
        h = 1,
        c = 1;
    w(e) &&
        ((c = e.getScreenCTM()),
        (h = M(c.a * c.a + c.b * c.b)),
        (c = M(c.d * c.d + c.c * c.c)));
    try {
        n = e.getBBox();
    } catch (e) {
        v(
            "Some browsers won't measure invisible elements (like display:none or masks inside defs)."
        );
    }
    var g = n || {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        },
        z = g.x,
        y = g.y,
        _ = g.width,
        m = g.height;
    if (
        ((n && (_ || m)) ||
            !P[d] ||
            ((_ = s(e, P[d][0])),
            (m = s(e, P[d][1])),
            "rect" !== d && "line" !== d && ((_ *= 2), (m *= 2)),
            "line" === d &&
                ((z = s(e, "x1")),
                (y = s(e, "y1")),
                (_ = Math.abs(_ - z)),
                (m = Math.abs(m - y)))),
        "path" === d)
    )
        (i = l.strokeDasharray),
            (l.strokeDasharray = "none"),
            (t = e.getTotalLength() || 0),
            p(h) !== p(c) &&
                !k &&
                (k = 1) &&
                v(
                    "Warning: <path> length cannot be measured when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."
                ),
            (t *= (h + c) / 2),
            (l.strokeDasharray = i);
    else if ("rect" === d) t = 2 * _ * h + 2 * m * c;
    else if ("line" === d) t = u(z, y, z + _, y + m, h, c);
    else if ("polyline" === d || "polygon" === d)
        for (
            r = e.getAttribute("points").match(b) || [],
                "polygon" === d && r.push(r[0], r[1]),
                t = 0,
                o = 2;
            o < r.length;
            o += 2
        )
            t += u(r[o - 2], r[o - 1], r[o], r[o + 1], h, c) || 0;
    else
        ("circle" !== d && "ellipse" !== d) ||
            ((a = (_ / 2) * h),
            (f = (m / 2) * c),
            (t = Math.PI * (3 * (a + f) - M((3 * a + f) * (a + 3 * f)))));
    return t || 0;
}
function F(e, t) {
    if (!(e = x(e)[0])) return [0, 0];
    t = t || E(e) + 1;
    var n = f.getComputedStyle(e),
        r = n.strokeDasharray || "",
        i = q(n.strokeDashoffset),
        o = r.indexOf(",");
    return (
        o < 0 && (o = r.indexOf(" ")),
        t < (r = o < 0 ? t : q(r.substr(0, o))) && (r = t),
        [-i || 0, r - i || 0]
    );
}
function G() {
    l() &&
        ((f = window),
        (h1 = o = m()),
        (x = o.utils.toArray),
        (c = o.core.getStyleSaver),
        (g = o.core.reverting || function () {}),
        (d = -1 !== ((f.navigator || {}).userAgent || "").indexOf("Edge")));
}
let o,
    x,
    f,
    d,
    h1,
    k,
    c,
    g,
    b = /[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,
    P = {
        rect: ["width", "height"],
        circle: ["r", "r"],
        ellipse: ["rx", "ry"],
        line: ["x2", "y2"],
    },
    M = Math.sqrt,
    a = "DrawSVGPlugin",
    _ = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}:?\d*$/,
    S = true,
    t = {
        version: "3.11.6",
        name: "drawSVG",
        register: function register(e) {
            (o = e), G();
        },
        init: function init(e, t, n) {
            if (!e.getBBox) return !1;
            h1 || G();
            var i,
                o,
                s,
                a = E(e);
            return (
                (this.styles =
                    c &&
                    c(e, "strokeDashoffset,strokeDasharray,strokeMiterlimit")),
                (this.tween = n),
                (this._style = e.style),
                (this._target = e),
                t + "" == "true"
                    ? (t = "0 100%")
                    : t
                    ? -1 === (t + "").indexOf(" ") && (t = "0 " + t)
                    : (t = "0 0"),
                (o = (function _parse(e, t, n) {
                    var i,
                        o,
                        s = e.indexOf(" ");
                    return (
                        (o =
                            s < 0
                                ? ((i = void 0 !== n ? n + "" : e), e)
                                : ((i = e.substr(0, s)), e.substr(s + 1))),
                        (i = r(i, t)),
                        (o = r(o, t)) < i ? [o, i] : [i, o]
                    );
                })(t, a, (i = F(e, a))[0])),
                (this._length = p(a)),
                (this._dash = p(i[1] - i[0])),
                (this._offset = p(-i[0])),
                (this._dashPT = this.add(
                    this,
                    "_dash",
                    this._dash,
                    p(o[1] - o[0]),
                    0,
                    0,
                    0,
                    0,
                    0,
                    1
                )),
                (this._offsetPT = this.add(
                    this,
                    "_offset",
                    this._offset,
                    p(-o[0]),
                    0,
                    0,
                    0,
                    0,
                    0,
                    1
                )),
                d &&
                    (s = f.getComputedStyle(e)).strokeLinecap !==
                        s.strokeLinejoin &&
                    ((o = q(s.strokeMiterlimit)),
                    this.add(e.style, "strokeMiterlimit", o, o + 0.01)),
                (this._live = w(e) || ~(t + "").indexOf("live")),
                (this._nowrap = ~(t + "").indexOf("nowrap")),
                this._props.push("drawSVG"),
                S
            );
        },
        render: function render(e, t) {
            if (t.tween._time || !g()) {
                var n,
                    r,
                    i,
                    o,
                    s = t._pt,
                    a = t._style;
                if (s) {
                    for (
                        t._live &&
                        (n = E(t._target)) !== t._length &&
                        ((r = n / t._length),
                        (t._length = n),
                        t._offsetPT &&
                            ((t._offsetPT.s *= r), (t._offsetPT.c *= r)),
                        t._dashPT
                            ? ((t._dashPT.s *= r), (t._dashPT.c *= r))
                            : (t._dash *= r));
                        s;

                    )
                        s.r(e, s.d), (s = s._next);
                    (i = t._dash || (e && 1 !== e && 1e-4) || 0),
                        (n = t._length - i + 0.1),
                        (o = t._offset),
                        i &&
                            o &&
                            i + Math.abs(o % t._length) > t._length - 0.2 &&
                            (o += o < 0 ? 0.1 : -0.1) &&
                            (n += 0.1),
                        (a.strokeDashoffset = i ? o : o + 0.001),
                        (a.strokeDasharray =
                            n < 0.2
                                ? "none"
                                : i
                                ? i + "px," + (t._nowrap ? 999999 : n) + "px"
                                : "0px, 999999px");
                }
            } else t.styles.revert();
        },
        getLength: E,
        getPosition: F,
    };
m() && o.registerPlugin(t);

export const DrawSVGPlugin = t;
