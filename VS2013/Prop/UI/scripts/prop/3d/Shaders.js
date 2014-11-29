var shdrIndex = 0;


prop.$3d.color = function (p1, p2, p3, p4) {
    var c = {
        r: 0.0,
        g: 0.0,
        b: 0.0,
        a: 0.0
    };

    if (p1 >= 0 && (p3 == null || p3 == undefined) && (p4 == null || p4 == undefined)) { // color | color alpha
        var c1 = Color(p1);

        if (p2 == null || p2 == undefined) p2 = 1.0;

        c.r = c1.r * 1.0;
        c.g = c1.g * 1.0;
        c.b = c1.b * 1.0;
        c.a = p2;

        return c;
    }
    else {
        c.r = (p1 == null || p1 == undefined) ? 0 * 1.0 : p1 * 1.0;
        c.g = (p2 == null || p2 == undefined) ? 0 * 1.0 : p2 * 1.0;
        c.b = (p3 == null || p3 == undefined) ? 0 * 1.0 : p3 * 1.0;
        c.a = (p4 == null || p4 == undefined) ? 0 * 1.0 : p4 * 1.0;

        return c;

    }
};
var c = prop.$3d.color;
function _cs(i) {

    if (i.toString().indexOf('.') == -1) return i + ".";
    return i.toString();
}
var cs = function (p1, p2, p3, p4) {
    var co = c(p1, p2, p3, p4);

    return {
        r: _cs(co.r),
        g: _cs(co.g),
        b: _cs(co.b),
        a: _cs(co.a),
    }
}
var Color = function (color) {

    if (arguments.length === 3) {

        return this.setRGB(arguments[0], arguments[1], arguments[2]);

    }

    return ColorPs.set(color)

};
var recolor = function (zn2, a) {
    var _zn2;
    a = def(a, 1.0);
    if (def(zn2.r) && def(zn2.g) && def(zn2.b))
        _zn2 = cs(zn2.r, zn2.g, zn2.b, a);
    else _zn2 = cs(zn2, a);
    return _zn2;
}

ColorPs = {

    constructor: Color,

    r: 1, g: 1, b: 1,

    set: function (value) {

        if (typeof value === 'number') {

            this.setHex(value);

        } else if (typeof value === 'string') {

            this.setStyle(value);

        }

        return this;

    },

    setHex: function (hex) {

        hex = Math.floor(hex);

        this.r = (hex >> 16 & 255) / 255;
        this.g = (hex >> 8 & 255) / 255;
        this.b = (hex & 255) / 255;

        return this;

    },

    setRGB: function (r, g, b) {

        this.r = r;
        this.g = g;
        this.b = b;

        return this;

    },

    setHSL: function (h, s, l) {

        // h,s,l ranges are in 0.0 - 1.0

        if (s === 0) {

            this.r = this.g = this.b = l;

        } else {

            var hue2rgb = function (p, q, t) {

                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * 6 * (2 / 3 - t);
                return p;

            };

            var p = l <= 0.5 ? l * (1 + s) : l + s - (l * s);
            var q = (2 * l) - p;

            this.r = hue2rgb(q, p, h + 1 / 3);
            this.g = hue2rgb(q, p, h);
            this.b = hue2rgb(q, p, h - 1 / 3);

        }

        return this;

    },

    setStyle: function (style) {

        // rgb(255,0,0)

        if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(style)) {

            var color = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(style);

            this.r = Math.min(255, parseInt(color[1], 10)) / 255;
            this.g = Math.min(255, parseInt(color[2], 10)) / 255;
            this.b = Math.min(255, parseInt(color[3], 10)) / 255;

            return this;

        }

        // rgb(100%,0%,0%)

        if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(style)) {

            var color = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(style);

            this.r = Math.min(100, parseInt(color[1], 10)) / 100;
            this.g = Math.min(100, parseInt(color[2], 10)) / 100;
            this.b = Math.min(100, parseInt(color[3], 10)) / 100;

            return this;

        }

        // #ff0000

        if (/^\#([0-9a-f]{6})$/i.test(style)) {

            var color = /^\#([0-9a-f]{6})$/i.exec(style);

            this.setHex(parseInt(color[1], 16));

            return this;

        }

        // #f00

        if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(style)) {

            var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(style);

            this.setHex(parseInt(color[1] + color[1] + color[2] + color[2] + color[3] + color[3], 16));

            return this;

        }




    },

    copy: function (color) {

        this.r = color.r;
        this.g = color.g;
        this.b = color.b;

        return this;

    },

    copyGammaToLinear: function (color) {

        this.r = color.r * color.r;
        this.g = color.g * color.g;
        this.b = color.b * color.b;

        return this;

    },

    copyLinearToGamma: function (color) {

        this.r = Math.sqrt(color.r);
        this.g = Math.sqrt(color.g);
        this.b = Math.sqrt(color.b);

        return this;

    },

    convertGammaToLinear: function () {

        var r = this.r, g = this.g, b = this.b;

        this.r = r * r;
        this.g = g * g;
        this.b = b * b;

        return this;

    },

    convertLinearToGamma: function () {

        this.r = Math.sqrt(this.r);
        this.g = Math.sqrt(this.g);
        this.b = Math.sqrt(this.b);

        return this;

    },

    getHex: function () {

        return (this.r * 255) << 16 ^ (this.g * 255) << 8 ^ (this.b * 255) << 0;

    },

    getHexString: function () {

        return ('000000' + this.getHex().toString(16)).slice(-6);

    },

    getHSL: function (optionalTarget) {

        // h,s,l ranges are in 0.0 - 1.0

        var hsl = optionalTarget || { h: 0, s: 0, l: 0 };

        var r = this.r, g = this.g, b = this.b;

        var max = Math.max(r, g, b);
        var min = Math.min(r, g, b);

        var hue, saturation;
        var lightness = (min + max) / 2.0;

        if (min === max) {

            hue = 0;
            saturation = 0;

        } else {

            var delta = max - min;

            saturation = lightness <= 0.5 ? delta / (max + min) : delta / (2 - max - min);

            switch (max) {

                case r: hue = (g - b) / delta + (g < b ? 6 : 0); break;
                case g: hue = (b - r) / delta + 2; break;
                case b: hue = (r - g) / delta + 4; break;

            }

            hue /= 6;

        }

        hsl.h = hue;
        hsl.s = saturation;
        hsl.l = lightness;

        return hsl;

    },

    getStyle: function () {

        return 'rgb(' + ((this.r * 255) | 0) + ',' + ((this.g * 255) | 0) + ',' + ((this.b * 255) | 0) + ')';

    },

    offsetHSL: function (h, s, l) {

        var hsl = this.getHSL();

        hsl.h += h; hsl.s += s; hsl.l += l;

        this.setHSL(hsl.h, hsl.s, hsl.l);

        return this;

    },

    add: function (color) {

        this.r += color.r;
        this.g += color.g;
        this.b += color.b;

        return this;

    },

    addColors: function (color1, color2) {

        this.r = color1.r + color2.r;
        this.g = color1.g + color2.g;
        this.b = color1.b + color2.b;

        return this;

    },

    addScalar: function (s) {

        this.r += s;
        this.g += s;
        this.b += s;

        return this;

    },

    multiply: function (color) {

        this.r *= color.r;
        this.g *= color.g;
        this.b *= color.b;

        return this;

    },

    multiplyScalar: function (s) {

        this.r *= s;
        this.g *= s;
        this.b *= s;

        return this;

    },

    lerp: function (color, alpha) {

        this.r += (color.r - this.r) * alpha;
        this.g += (color.g - this.g) * alpha;
        this.b += (color.b - this.b) * alpha;

        return this;

    },

    equals: function (c) {

        return (c.r === this.r) && (c.g === this.g) && (c.b === this.b);

    },

    fromArray: function (array) {

        this.r = array[0];
        this.g = array[1];
        this.b = array[2];

        return this;

    },

    toArray: function () {

        return [this.r, this.g, this.b];

    },

    clone: function () {

        return new THREE.Color().setRGB(this.r, this.g, this.b);

    }

};



prop.$3d.shaders = {
    vertex: function (fun, hp) {

        if (!hp) hp = "";
        return "precision highp float;                                                                                          \n" +
        "                                                                                                                \n" +
        "attribute vec3 position;                                                                                        \n" +
        "attribute vec3 normal;                                                                                          \n" +
        "attribute vec2 uv;                                                                                              \n" +
        "                                                                                                                \n" +
        "uniform mat4 worldViewProjection;                                                                               \n" +
        "uniform mat4 worldView;                                                                                         \n" +
        "                                                                                                                \n" +
        "uniform sampler2D tx1;                                                                                          \n" +
        "uniform sampler2D tx2;                                                                                          \n" +
        "uniform sampler2D tx3;                                                                                          \n" +
        "uniform sampler2D tx4;                                                                                          \n" +
        "                                                                                                                \n" +
        "uniform vec3 camera;                                                                                            \n" +
        "uniform vec3 p1;                                                                                                \n" +
        "uniform vec3 p2;                                                                                                \n" +
        "uniform vec3 p3;                                                                                                \n" +
        "uniform vec2 mouse;                                                                                             \n" +
        "uniform float time;                                                                                             \n" +
        "                                                                                                                \n" +
        "                                                                                                                \n" +
        "varying vec3 pos;                                                                                               \n" +
        "varying vec3 posi;                                                                                               \n" +
        "varying vec3 pr;                                                                                               \n" +
        "varying vec3 nrm;                                                                                               \n" +
        "varying vec2 u;                                                                                                 \n" +
        "varying mat4 wvp;                                                                                               \n" +
        "float rand(vec2 co){                                                                                            \n" +
         "    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);                                           \n" +
         "}                                                                                                               \n" +
         "                                                                                                                \n " +
         "   vec3 random3(vec3 c) {                                                                                        \n" +
	     "       float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));                                                      \n" +
         "           vec3 r;                                                                                               \n" +
         "           r.z = fract(512.0*j);                                                                                 \n" +
         "           j *= .125;                                                                                            \n" +
         "           r.x = fract(512.0*j);                                                                                 \n" +
         "           j *= .125;                                                                                            \n" +
         "           r.y = fract(512.0*j);                                                                                 \n" +
         "           return r-0.5;                                                                                         \n" +
         "       }                                                                                                         \n" +
         "                                                                                                                 \n" +
         "       /* skew constants for 3d simplex functions */                                                             \n" +
         "   const float F3 =  0.3333333;                                                                                  \n" +
         "   const float G3 =  0.1666667;                                                                                  \n" +
         "                                                                                                                 \n" +
         "   /* 3d simplex noise */                                                                                        \n" +
         "   float simplex3d(vec3 p) {                                                                                     \n" +
	     "        /* 1. find current tetrahedron T and it's four vertices */                                               \n" +
	     "        /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */                         \n" +
	     "        /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/                            \n" +
	     "                                                                                                                 \n" +
	     "        /* calculate s and x */                                                                                  \n" +
	     "        vec3 s = floor(p + dot(p, vec3(F3)));                                                                    \n" +
         "   vec3 x = p - s + dot(s, vec3(G3));                                                                            \n" +
	     "                                                                                                                 \n" +
         "   /* calculate i1 and i2 */                                                                                     \n" +
         "   vec3 e = step(vec3(0.0), x - x.yzx);                                                                          \n" +
         "   vec3 i1 = e*(1.0 - e.zxy);                                                                                    \n" +
         "   vec3 i2 = 1.0 - e.zxy*(1.0 - e);                                                                              \n" +
	 	 "                                                                                                                 \n" +
         "   /* x1, x2, x3 */                                                                                              \n" +
         "   vec3 x1 = x - i1 + G3;                                                                                        \n" +
         "   vec3 x2 = x - i2 + 2.0*G3;                                                                                    \n" +
         "   vec3 x3 = x - 1.0 + 3.0*G3;                                                                                   \n" +
	     "                                                                                                                 \n" +
         "   /* 2. find four surflets and store them in d */                                                               \n" +
         "   vec4 w, d;                                                                                                    \n" +
	     "                                                                                                                 \n" +
         "   /* calculate surflet weights */                                                                               \n" +
         "   w.x = dot(x, x);                                                                                              \n" +
         "   w.y = dot(x1, x1);                                                                                            \n" +
         "   w.z = dot(x2, x2);                                                                                            \n" +
         "   w.w = dot(x3, x3);                                                                                            \n" +
	     "                                                                                                                 \n" +
         "   /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */                                      \n" +
         "   w = max(0.6 - w, 0.0);                                                                                        \n" +
	     "                                                                                                                 \n" +
         "   /* calculate surflet components */                                                                            \n" +
         "   d.x = dot(random3(s), x);                                                                                     \n" +
         "   d.y = dot(random3(s + i1), x1);                                                                               \n" +
         "   d.z = dot(random3(s + i2), x2);                                                                               \n" +
         "   d.w = dot(random3(s + 1.0), x3);                                                                              \n" +
	     "                                                                                                                 \n" +
         "   /* multiply d by w^4 */                                                                                       \n" +
         "   w *= w;                                                                                                       \n" +
         "   w *= w;                                                                                                       \n" +
         "   d *= w;                                                                                                       \n" +
	     "                                                                                                                 \n" +
         "   /* 3. return the sum of the four surflets */                                                                  \n" +
         "   return dot(d, vec4(52.0));                                                                                    \n" +
         "   }                                                                                                             \n" +
         "                                                                                                                 \n" +
         "   float noise(vec3 m) {                                                                             \n" +
         "       return   0.5333333*simplex3d(m)                                                                           \n" +
		"	            +0.2666667*simplex3d(2.0*m)                                                                        \n" +
		"	            +0.1333333*simplex3d(4.0*m)                                                                        \n" +
		"	            +0.0666667*simplex3d(8.0*m);                                                                       \n" +
         "   }                                                                                                             \n" +
        "vec3 txColor(sampler2D _tx,vec2 rep, vec2 ts,float isWorldView){                                                \n" +
         "vec2 def;                                                                                                       \n" +
         "if(isWorldView != 1.0)                                                                                          \n" +
         "    def =  vec2(pos.x/rep.x+ts.x ,pos.y/ rep.y+ts.y);                                                           \n" +
         "else                                                                                                            \n" +
         "    def = rep;                                                                                                  \n" +
         "                                                                                                                \n" +
         "vec3 result  = texture2D( _tx,  def).rgb;                                                                       \n" +
         "                                                                                                                \n" +
         "return result;                                                                                                  \n" +
         "}                                                                                                               \n" +
         "                                                                                                                \n" +
         "float dim(vec3 p1 , vec3 p2){                                                                                   \n" +
         "    return sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y)+(p2.z-p1.z)*(p2.z-p1.z));                       \n" +
         "}                                                                                                               \n" +
                     hp +
         "\n                                                                                                                \n" +
         "void main(void) {                                                                                               \n" +
         "vec4 _p = vec4( position, 1. );                                                                             \n" +
         "                                                                                                            \n" +
         "pos = position;                                                                                             \n" +
         "nrm = normal;                                                                                               \n" +
         "u = uv;                                                                                                     \n" +
         "wvp = worldViewProjection;                                                                                  \n" +
         "                                                                                                            \n" +
         "vec3 e = normalize( vec3( worldView * vec4(pos , 1.0) ) );                                                  \n" +
         "vec3 n = normalize( worldView * vec4(nrm, 0.0) ).xyz;                                                       \n" +
         "vec3 r = reflect( e, n );                                                                                   \n" +
         "                                                                                                            \n" +
         "float m = 2. * sqrt(                                                                                        \n" +
         "pow( r.x, 2. ) +                                                                                            \n" +
         "pow( r.y, 2. ) +                                                                                            \n" +
         "pow( r.z + 1., 2. )                                                                                         \n" +
         ");                                                                                                          \n" +
         "                                                                                                            \n" +
         "vec2 ref = r.xy / m + .5;                                                                                   \n" +
       "   vec4 result1;result1 =vec4(0.,0.,0.,0.) ; float rp1 = 1.0;                                                                            \n" +
         "   vec4 result2;result2 =vec4(0.,0.,0.,0.)  ; float rp2 = 0.0;                                                                            \n" +
         "   vec4 result3;result3 =vec4(0.,0.,0.,0.) ; float rp3 = 0.0;                                                                            \n" +
   "                                                                                                            \n" +
         fun +
        "\n                                                                                                              \n" +
        "  posi = vec3(  result1.x*rp1+result2.x*rp2+result3.x*rp3 ,result1.y*rp1+result2.y*rp2+result3.y*rp3,result1.z*rp1+result2.z*rp2+result3.z*rp3  );                                                                                           \n" +
        "    gl_Position = worldViewProjection * vec4( result1.x*rp1+result2.x*rp2+result3.x*rp3 ,result1.y*rp1+result2.y*rp2+result3.y*rp3,result1.z*rp1+result2.z*rp2+result3.z*rp3 ,result1.w*rp1+result2.w*rp2+result3.w*rp3 );}";
    },
    fragment: function (fun, hp) {
        if (!hp) hp = "";
        return "precision highp float;                                                                                          \n" +
         "                                                                                                                \n" +
         "uniform mat4 worldView;                                                                                         \n" +
         "uniform mat4 world;                                                                                         \n" +
         "                                                                                                                \n" +
         "uniform sampler2D tx1;                                                                                          \n" +
         "uniform vec2 tx1_r;                                                                                             \n" +
         "                                                                                                                \n" +
         "uniform sampler2D tx2;                                                                                          \n" +
         "uniform vec2 tx2_r;                                                                                             \n" +
         "                                                                                                                \n" +
         "uniform sampler2D tx3;                                                                                          \n" +
         "uniform vec2 tx3_r;                                                                                             \n" +
         "                                                                                                                \n" +
         "uniform sampler2D tx4;                                                                                          \n" +
         "uniform vec2 tx4_r;                                                                                             \n" +
         "                                                                                                                \n" +
         "uniform sampler2D tx5;                                                                                          \n" +
         "uniform vec2 tx5_r;                                                                                             \n" +
         "                                                                                                                \n" +
         "uniform sampler2D tx6;                                                                                          \n" +
         "uniform vec2 tx6_r;                                                                                             \n" +
          "                                                                                                                \n" +
         "uniform vec3 camera;                                                                                            \n" +
         "uniform vec3 p1;                                                                                                \n" +
         "uniform vec3 p2;                                                                                                \n" +
         "uniform vec3 p3;                                                                                                \n" +
         "uniform vec2 mouse;                                                                                             \n" +
         "uniform float time;                                                                                             \n" +
         "                                                                                                                \n" +
         "                                                                                                                \n" +
        "varying vec3 posi;                                                                                               \n" +
         "varying vec3 pr;                                                                                               \n" +
        "varying vec3 pos;                                                                                               \n" +
         "varying vec3 nrm;                                                                                               \n" +
         "varying vec2 u;                                                                                                 \n" +
         "                                                                                                                \n" +
          "   vec3 random3(vec3 c) {                                                                                        \n" +
	     "       float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));                                                      \n" +
         "           vec3 r;                                                                                               \n" +
         "           r.z = fract(512.0*j);                                                                                 \n" +
         "           j *= .125;                                                                                            \n" +
         "           r.x = fract(512.0*j);                                                                                 \n" +
         "           j *= .125;                                                                                            \n" +
         "           r.y = fract(512.0*j);                                                                                 \n" +
         "           return r-0.5;                                                                                         \n" +
         "       }                                                                                                         \n" +
         "                                                                                                                 \n" +
         "       /* skew constants for 3d simplex functions */                                                             \n" +
         "   const float F3 =  0.3333333;                                                                                  \n" +
         "   const float G3 =  0.1666667;                                                                                  \n" +
         "                                                                                                                 \n" +
         "   /* 3d simplex noise */                                                                                        \n" +
         "   float simplex3d(vec3 p) {                                                                                     \n" +
	     "        /* 1. find current tetrahedron T and it's four vertices */                                               \n" +
	     "        /* s, s+i1, s+i2, s+1.0 - absolute skewed (integer) coordinates of T vertices */                         \n" +
	     "        /* x, x1, x2, x3 - unskewed coordinates of p relative to each of T vertices*/                            \n" +
	     "                                                                                                                 \n" +
	     "        /* calculate s and x */                                                                                  \n" +
	     "        vec3 s = floor(p + dot(p, vec3(F3)));                                                                    \n" +
         "   vec3 x = p - s + dot(s, vec3(G3));                                                                            \n" +
	     "                                                                                                                 \n" +
         "   /* calculate i1 and i2 */                                                                                     \n" +
         "   vec3 e = step(vec3(0.0), x - x.yzx);                                                                          \n" +
         "   vec3 i1 = e*(1.0 - e.zxy);                                                                                    \n" +
         "   vec3 i2 = 1.0 - e.zxy*(1.0 - e);                                                                              \n" +
	 	 "                                                                                                                 \n" +
         "   /* x1, x2, x3 */                                                                                              \n" +
         "   vec3 x1 = x - i1 + G3;                                                                                        \n" +
         "   vec3 x2 = x - i2 + 2.0*G3;                                                                                    \n" +
         "   vec3 x3 = x - 1.0 + 3.0*G3;                                                                                   \n" +
	     "                                                                                                                 \n" +
         "   /* 2. find four surflets and store them in d */                                                               \n" +
         "   vec4 w, d;                                                                                                    \n" +
	     "                                                                                                                 \n" +
         "   /* calculate surflet weights */                                                                               \n" +
         "   w.x = dot(x, x);                                                                                              \n" +
         "   w.y = dot(x1, x1);                                                                                            \n" +
         "   w.z = dot(x2, x2);                                                                                            \n" +
         "   w.w = dot(x3, x3);                                                                                            \n" +
	     "                                                                                                                 \n" +
         "   /* w fades from 0.6 at the center of the surflet to 0.0 at the margin */                                      \n" +
         "   w = max(0.6 - w, 0.0);                                                                                        \n" +
	     "                                                                                                                 \n" +
         "   /* calculate surflet components */                                                                            \n" +
         "   d.x = dot(random3(s), x);                                                                                     \n" +
         "   d.y = dot(random3(s + i1), x1);                                                                               \n" +
         "   d.z = dot(random3(s + i2), x2);                                                                               \n" +
         "   d.w = dot(random3(s + 1.0), x3);                                                                              \n" +
	     "                                                                                                                 \n" +
         "   /* multiply d by w^4 */                                                                                       \n" +
         "   w *= w;                                                                                                       \n" +
         "   w *= w;                                                                                                       \n" +
         "   d *= w;                                                                                                       \n" +
	     "                                                                                                                 \n" +
         "   /* 3. return the sum of the four surflets */                                                                  \n" +
         "   return dot(d, vec4(52.0));                                                                                    \n" +
         "   }                                                                                                             \n" +
         "                                                                                                                 \n" +
         "   float noise(vec3 m) {                                                                             \n" +
         "       return   0.5333333*simplex3d(m)                                                                           \n" +
		"	            +0.2666667*simplex3d(2.0*m)                                                                        \n" +
		"	            +0.1333333*simplex3d(4.0*m)                                                                        \n" +
		"	            +0.0666667*simplex3d(8.0*m);                                                                       \n" +
         "   }                                                                                                             \n" +
        "                                                                                                                \n" +
         "vec3 txColor(sampler2D _tx,vec2 uv,vec2 rep, vec2 ts ){                                                                \n" +
         "vec2  def =  vec2(uv.x/rep.x+ts.x ,uv.y/ rep.y+ts.y);                                                           \n" +
          "vec3 result  = texture2D( _tx,  def).rgb;                                                                       \n" +
         "                                                                                                                \n" +
         "return result;                                                                                                  \n" +
         "}                                                                                                               \n" +
         "float rand(vec2 co){                                                                                            \n" +
         "    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);                                           \n" +
         "}                                                                                                               \n" +
         "float dim(vec3 p1 , vec3 p2){                                                                                   \n" +
         "   return sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y)+(p2.z-p1.z)*(p2.z-p1.z));                        \n" +
         "}                                                                                                               \n" +
            hp +
         "\n void main(void) {                                                                                            \n" +
         "                                                                                                            \n" +
         "vec3 e = normalize( vec3( worldView * vec4(pos , 1.0) ) );                                                  \n" +
         "vec3 n = normalize( worldView * vec4(nrm, 0.0) ).xyz;                                                       \n" +
         "vec3 r = reflect( e, n );                                                                                   \n" +
         "                                                                                                            \n" +
         "float m = 2. * sqrt(                                                                                        \n" +
         "    pow( r.x, 2. ) +                                                                                        \n" +
         "    pow( r.y, 2. ) +                                                                                        \n" +
         "    pow( r.z + 1., 2. )                                                                                     \n" +
         ");                                                                                                          \n" +
         "                                                                                                            \n" +
         "                                                                                                            \n" +
         "   vec2 ref = r.xy / m + .5;                                                                                \n" +
        "   vec4 result1;result1 =vec4(0.,0.,0.,0.) ; float rp1 = 1.0;                                                                            \n" +
         "   vec4 result2;result2 =vec4(0.,0.,0.,0.)  ; float rp2 = 0.0;                                                                            \n" +
         "   vec4 result3;result3 =vec4(0.,0.,0.,0.) ; float rp3 = 0.0;                                                                            \n" +


         "                                                                                                            \n" +
          fun +
         "\n   gl_FragColor =vec4( result1.x*rp1+result2.x*rp2+result3.x*rp3 ,result1.y*rp1+result2.y*rp2+result3.y*rp3,result1.z*rp1+result2.z*rp2+result3.z*rp3 ,result1.w*rp1+result2.w*rp2+result3.w*rp3 );                                                                                   \n" +
         "   }";
    },


    shader: function (op) {
        var shaderMaterial;

        if (op && !op.u) {
            op.u = {
                attributes: ["position", "normal", "uv"],
                uniforms: ["world", "worldView", "worldViewProjection"]
            };
        }

        shdrIndex++;

        op.v = "sh_v_" + shdrIndex;
        op.f = "sh_f_" + shdrIndex;


        var vtxElement = document.createElement("Script");
        vtxElement.setAttribute("id", op.v);
        vtxElement.setAttribute("type", "x-shader/x-vertex");
        vtxElement.innerHTML = prop.$3d.shaders.vertex(op.vtx, op.vhp);
        document.getElementById('shaders').appendChild(vtxElement);

        var frgElement = document.createElement("Script");
        frgElement.setAttribute("id", op.f);
        frgElement.setAttribute("type", "x-shader/x-fragment");
        frgElement.innerHTML = prop.$3d.shaders.fragment(op.frg, op.fhp);
        document.getElementById('shaders').appendChild(frgElement);


        shaderMaterial = defShader(op);

        return shaderMaterial;

    },

    phong: {
        //{shader:{frg,vtx,helper},back,opacity,color,shiny,shinyPower,shadow,shadowPower,fresnel} 
        base: function (op) {

            if (!op) { op = {}; }

            if (!op.shader) { op.shader = {}; }


            var a = def(op.opacity, 1.0);
            var _c = recolor(def(op.color, 0x222222), a);
            var s = def(op.shiny, 200.);
            var sp = def(op.shinyPower, 1.);
            var g = def(op.shadow, 1.0);
            var g2 = def(op.shadowPower, 1.0);
            var f = def(op.fresnel, 1.0);
            var alpha = (a != 1.0 ? true : false); 

            return prop.$3d.shaders.shader({
                alpha: alpha,
                // map: { path: 'paving.jpg', r: 1.0, w: 1.0 },
                def: '',
                back: op.back,
                vtx: ['result1 = vec4(pos,1.0); '].join('\n') + (op.shader.vtx ? op.shader.vtx : ""),
                vhp: op.shader.helper,
                fhp: op.shader.helper,
                frg: [
                    '',
                    'vec3 p1 = vec3(  0.0,    2000.0,   1000.0);                                                           ',
                    'vec3 vPositionW = vec3(world * vec4(pos, 1.0));                                                 ',
                    'vec3 vNormalW = normalize(vec3(world * vec4(nrm, 0.0)));                                        ',
                    'vec3 viewDirectionW = normalize(camera - pos);                                                  ',
                    'vec3 lightVectorW = normalize(p1 - vPositionW);                                                 ',
                    'vec3 color = vec3(' + _cs(_c.r) + ',' + _cs(_c.g) + ',' + _cs(_c.b) + ' ) ;                                 ',
                    'float ndl = max(0., dot(vNormalW, lightVectorW));                                               ',
                    'vec3 angleW = normalize(viewDirectionW + lightVectorW);                                         ',
                    'float specComp = max(0., dot(vNormalW, angleW));                                                ',
                    'specComp = pow(specComp, max(1., ' + _cs(s) + ')) * 2.;                                         ',
                    'vec3 map = txColor(tx1,vec2(nrm.z*(pos.x+pos.y) ,pos.z*(nrm.x+nrm.y)),tx1_r,vec2(0.,0.));       ',
                    'vec3 lm = txColor(tx5,ref,tx5_r,vec2(0.,0.));                                                   ',
                    'vec3 color2 = vec3(1., 1., 1.);                                                                 ',
                    'float fresnelTerm = dot(viewDirectionW, nrm);                                                   ',
                    'fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);                                                 ',
                    'if(fresnelTerm-0.4 < 0.0 )fresnelTerm = 0.4;                                                    ',
                    'if(fresnelTerm-0.4 > 1.0 )fresnelTerm = 1.4;                                                    ',
                    'fresnelTerm =  (fresnelTerm*fresnelTerm*' + _cs(f) + ' );                                       ',
                    'if(ndl <=0.0) result1 = vec4(color * (ndl*' + _cs(g) + '+' + _cs(g2) + ')+ (map)  + vec3(specComp/' + _cs(sp) + '+(fresnelTerm - 0.4)/(' + _cs(sp) + '+3.0)), ' +  _c.a + '+(specComp/' + _cs(sp) + ')+ (fresnelTerm-0.4)/(' + _cs(sp) + '+3.0));             ',
                    'else result1 = vec4(color * (ndl*' + _cs(g) + '+' + _cs(g2) + ') + (map) + vec3(specComp/' + _cs(sp) + '+(fresnelTerm - 0.4)/(' + _cs(sp) + '+3.0)), ' +  _c.a + '+(specComp/' + _cs(sp) + ')+ (fresnelTerm-0.4)/(' + _cs(sp) + '+3.0));             ',

                ].join('\n') + (op.shader.frg ? op.shader.frg : "")
            });
        },

        // op: {fixedColor,floatColor,floatOpacity,level:{ top: 3., middle: 2., bottom: 8. },step:  { p1: 0.8, p2: 0.03 },deep:0.5}
        liquid: function (op) {

            if (!op) { op = {}; }

            var zn2 = recolor(def(op.fixedColor, 0x093956));
            var a = def(op.floatOpacity, 0.2);
            var _c = recolor(def(op.floatColor, 0x7ebde3), a);
            var lev = def(op.level, { top: 3., middle: 0.1, bottom: 14.1 });
            var step = def(op.step, { p1: 0.8, p2: 0.013 });
            var deep = def(op.deep, 0.4);

            op.shader = {
                helper: [
                    'varying float n_n1;',
                    'vec4 buildWater(vec4 result2){',
                    '  float n2 =   abs( noise(vec3(pos.x/80.+time/3.,pos.y/80.+time/3.,pos.z/80.+time/3.)));',
                    '  vec4 zn = vec4(' + _cs(_c.r) + ',' + _cs(_c.g) + ',' + _cs(_c.b) + ',' + _cs(_c.a) + ');',
                    '  vec4 zn2 = vec4( ' + _cs(zn2.r) + ',' + _cs(zn2.g) + ',' + _cs(zn2.b) + ',0.0);',
                    '  vec3 zn3 = vec3(' + _cs(lev.top) + ',' + _cs(lev.middle) + ',' + _cs(lev.bottom) + ' );',
                    '  vec2 zn4 = vec2(' + _cs(step.p1) + ',' + _cs(step.p2) + ');',

                    'float n3 = (n2 +n_n1*' + _cs(deep) + ' );',
                    'if(n2 > zn4.x )  result2 = vec4(n3 *zn.x*zn3.x+zn2.x    ,n3*zn.y*zn3.x+ zn2.y   ,n3*zn.z*zn3.x+ zn2.z  ,zn.w  );',
                    'else if(n2 >  zn4.y ) result2 = vec4(n3 *zn.x*zn3.y+ zn2.x   ,n3*zn.y*zn3.y+ zn2.y   ,n3*zn.z*zn3.y+zn2.z  ,zn.w );',
                    'else              result2 =  vec4(n3 *zn.x*zn3.z+ zn2.x      ,n3*zn.y*zn3.z+ zn2.y    ,n3*zn.z*zn3.z +zn2.z   ,zn.w ); return result2;} ',
                ].join('\n'),
                vtx: [
                      'float n2 = sin(pos.x/10.+time*2.)*10.0*sin(pos.z/18.+time*2.)*4.0+abs(noise(vec3(pos.x/20.+time/10.,pos.y/20.+time/10.,0)))*80.;',
                      'result2 = vec4(0,n2,0,1.0);rp2=0.3;',
                     'n_n1 = n2/90.;'
                ].join('\n'),
                frg: [
                     'float ca =   (dim(vPositionW,camera)/25000.);',
                     'if(ca > .4) {}',
                     'else if(ca > .02 ) { result2 = buildWater(result2); rp2=1.0-(ca-0.02)*2.6   ;rp1= 0.5+(ca-0.02)*2.6/2.0 ; }',
                     'else {result2 = buildWater(result2); rp2=1.0;rp1= 0.5;}'

                ].join('\n')
            };

            return prop.$3d.shaders.phong.base(op);
        } 
    }
}

