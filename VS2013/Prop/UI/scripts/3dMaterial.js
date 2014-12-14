var shdrIndex = 0;

function _cs(i) {
    if (i.toString().indexOf('.') == -1) return i + ".";
    return i.toString();
}
var k = 0
var sh_global = function () {
    return [
        "precision highp float;",

        "uniform mat4 worldViewProjection;",
        "uniform mat4 worldView;          ",
        "uniform mat4 world; ",
    ].join('\n');
};
var sh_uniform = function () {
    return [
        "uniform vec3 camera;",
        "uniform vec3 p1;    ",
        "uniform vec3 p2;    ",
        "uniform vec3 p3;    ",
        "uniform vec2 mouse; ",
        "uniform float time; ",

        "uniform samplerCube refc; ",
        "uniform samplerCube refc2; ",
        "uniform samplerCube refc3; ",
        "uniform sampler2D ref2; ",
        "uniform vec3 vrefi; ",
        "uniform mat4 refmat; ",
        "uniform mat4 view;"
    ].join('\n');
};
var sh_varing = function () {
    return [
        "varying vec3 pos;  ",
        "varying vec3 vpos; ",
        "varying vec3 _pos;  ",
        "varying vec3 _vpos; ",
        "varying vec3 pr;   ",
        "varying vec3 nrm;  ",
        "varying vec3 _nrm;  ",
        "varying vec2 u;    ",
        "varying mat4 wvp;  ",
    ].join('\n');
};
var sh_tools = function () {
    return [
        "vec3 random3(vec3 c) {   float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));   vec3 r;   r.z = fract(512.0*j); j *= .125;  r.x = fract(512.0*j); j *= .125; r.y = fract(512.0*j);  return r-0.5;  } ",
        "float rand(vec2 co){   return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); } ",
        "const float F3 =  0.3333333;const float G3 =  0.1666667;",
        "float simplex3d(vec3 p) {   vec3 s = floor(p + dot(p, vec3(F3)));   vec3 x = p - s + dot(s, vec3(G3));  vec3 e = step(vec3(0.0), x - x.yzx);  vec3 i1 = e*(1.0 - e.zxy);  vec3 i2 = 1.0 - e.zxy*(1.0 - e);   vec3 x1 = x - i1 + G3;   vec3 x2 = x - i2 + 2.0*G3;   vec3 x3 = x - 1.0 + 3.0*G3;   vec4 w, d;    w.x = dot(x, x);   w.y = dot(x1, x1);  w.z = dot(x2, x2);  w.w = dot(x3, x3);   w = max(0.6 - w, 0.0);   d.x = dot(random3(s), x);   d.y = dot(random3(s + i1), x1);   d.z = dot(random3(s + i2), x2);  d.w = dot(random3(s + 1.0), x3);  w *= w;   w *= w;  d *= w;   return dot(d, vec4(52.0));     }  ",
        "float noise(vec3 m) {  return   0.5333333*simplex3d(m)   +0.2666667*simplex3d(2.0*m) +0.1333333*simplex3d(4.0*m) +0.0666667*simplex3d(8.0*m);   } ",
        "float dim(vec3 p1 , vec3 p2){   return sqrt((p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y)+(p2.z-p1.z)*(p2.z-p1.z)); }",
    ].join('\n');
};
var sh_main_vertex = function (content) {
    return [
        "attribute vec3 position; ",
        "attribute vec3 normal;   ",
        "attribute vec2 uv;       ",
        "void main(void) { ",
        "   vec4 result; result = vec4(position.x,position.y,position.z,1.0) ;",
         "   pos = vec3(position.x,position.y,position.z);",
         "   nrm = vec3(normal.x,normal.y,normal.z);",
        content,
        "   ",
         "   gl_Position = worldViewProjection * vec4( result );",
         "    vpos  = vec3(result.x,result.y,result.z);",
         "    _pos = vec3(world * vec4(position, 1.0));",
         "    _vpos = vec3(world * vec4(vpos, 1.0));",
         "    _nrm = normalize(vec3(world * vec4(nrm, 0.0)));",
        "}"
    ].join('\n');
};
var sh_main_fragment = function (content) {
    return [
        "void main(void) { ",
        "   vec4 result; result = vec4(1.,0.,0.,0.);",
        "   ",
        content,
        "   ",
        "   gl_FragColor = vec4( result );",
        "}"
    ].join('\n');
};
// [{r:result,e:efficacy} , .. ]
var sh_multi = function (contents, scaled) {
    k++;
    var pre = "", ps = ["", "", "", ""], psh = 0.0;
    for (var i = 0; i < contents.length; i++) {

        pre += " vec4 result_" + k + "_" + i + ";result_" + k + "_" + i + " = vec4(0.,0.,0.,0.); float rp_" + k + "_" + i + " = " + _cs(contents[i].e) + "; \n";
        pre += contents[i].r + "\n";
        pre += " result_" + k + "_" + i + " = result; \n";

        ps[0] += (i == 0 ? "" : " + ") + "result_" + k + "_" + i + ".x*rp_" + k + "_" + i;
        ps[1] += (i == 0 ? "" : " + ") + "result_" + k + "_" + i + ".y*rp_" + k + "_" + i;
        ps[2] += (i == 0 ? "" : " + ") + "result_" + k + "_" + i + ".z*rp_" + k + "_" + i;
        ps[3] += (i == 0 ? "" : " + ") + "result_" + k + "_" + i + ".w*rp_" + k + "_" + i;

        psh += contents[i].e;
    }

    if (def(scaled, false)) {
        ps[0] = "(" + ps[0] + ")/" + _cs(psh);
        ps[1] = "(" + ps[1] + ")/" + _cs(psh);
        ps[2] = "(" + ps[2] + ")/" + _cs(psh);
        ps[3] = "(" + ps[3] + ")/" + _cs(psh);
    }

    pre += "result = vec4(" + ps[0] + "," + ps[1] + "," + ps[2] + "," + ps[3] + ");";

    return pre;
};
var sh_range = function (op) {
    k++;
    op = def(op, {});

    op.pos = def(op.pos, "_pos");
    op.point = def(op.point, "camera");
    op.start = def(op.start, 50.1);
    op.end = def(op.end, 75.1);
    op.mat1 = def(op.mat1, "result = vec4(1.0,0.,0.,1.);");
    op.mat2 = def(op.mat2, "result = vec4(0.0,0.,1.,1.);");


    return [
         "float s_r_dim_" + k + "_ = " + (!def(op.custom) ? " dim(" + op.pos + "," + op.point + ")" : op.custom) + ";",
         "if(s_r_dim_" + k + "_ > " + _cs(op.end) + "){",
             op.mat2,
         "}",
         "else { ",
            op.mat1,
         "   vec4 mat1_" + k + "_; mat1_" + k + "_  = result;",
         "   if(s_r_dim_" + k + "_ > " + _cs(op.start) + "){ ",
              op.mat2,
         "       vec4 mati2_" + k + "_;mati2_" + k + "_ = result;",
         "       float s_r_cp_" + k + "_  = (s_r_dim_" + k + "_ - (" + _cs(op.start) + "))/(" + _cs(op.end) + "-" + _cs(op.start) + ");",
         "       float s_r_c_" + k + "_  = 1.0 - s_r_cp_" + k + "_;",
         "       result = vec4(mat1_" + k + "_.x*s_r_c_" + k + "_+mati2_" + k + "_.x*s_r_cp_" + k + "_,mat1_" + k + "_.y*s_r_c_" + k + "_+mati2_" + k + "_.y*s_r_cp_" + k + "_,mat1_" + k + "_.z*s_r_c_" + k + "_+mati2_" + k + "_.z*s_r_cp_" + k + "_,mat1_" + k + "_.w*s_r_c_" + k + "_+mati2_" + k + "_.w*s_r_cp_" + k + "_);",
         "   }",
         "   else { result = mat1_" + k + "_; }",
         "}"
    ].join('\n');
};
var sh_frensel = function (op) {
    k++;
    op = def(op, {});
    op.color = def(op.color, 0xffffff);
    op.e = def(op.e, 0.6);

    var co = recolor(op.color);


    return [
        "vec3 color_" + k + "_ = vec3(" + _cs(co.r) + ", " + _cs(co.g) + ", " + _cs(co.b) + ");",
        "vec3 viewDirectionW_" + k + "_ = normalize(camera - pos);",
        "float fresnelTerm_" + k + "_ = dot(viewDirectionW_" + k + "_, nrm);",
        def(op.clamp, true) ? "fresnelTerm_" + k + "_ = clamp(1.0 - fresnelTerm_" + k + "_, 0., 1.);" : "",
        "fresnelTerm_" + k + "_ *=" + _cs(op.e) + ";",
        def(op.alpha, true) ? "float afren_" + k + "_ = fresnelTerm_" + k + "_; " : "float afren_" + k + "_ = 1.0;",
        "result = vec4(color_" + k + "_ * fresnelTerm_" + k + "_, afren_" + k + "_);",
        def(op.custom, ''),
    ].join('\n');
};
var sh_phonge = function (op) {
    k++;
    op = def(op, {});
    op.light = def(op.light, { x: 1300, y: 1300, z: 1300 }); // | p1 , p2 , p3
    op.colori = def(op.color, 0xffffff);
    op.colorPower = def(op.colorPower, 1.0);
    op.colorMin = def(op.colorMin, 0.0);
    var c_c = recolor(op.colori);
    op.back = def(op.back, 0x000123);
    op.backPower = def(op.backPower, 1.0);
    op.backMin = def(op.backMin, 0.0);

    var b_c = recolor(op.back);
    //op.colorMap = def(op.color, 0xffffff);
    // op.backMap = def(op.back, 0x000000);
    op.reduce = def(op.reduce, false);

    if (def(op.light.x)) {
        op.light = " vec3(" + _cs(op.light.x) + "," + _cs(op.light.y) + "," + _cs(op.light.z) + ")";
    }

    return [
        "vec3 lightVectorW_" + k + "_ = normalize(" + op.light + " - _pos);",
        "vec3 colori_" + k + "_  = " + (def(op.colorMap) ? op.colorMap : "vec3(" + _cs(c_c.r) + "," + _cs(c_c.g) + "," + _cs(c_c.b) + ") ") + ";",
        "vec3 back_" + k + "_ = " + (def(op.backMap) ? op.backMap : "vec3(" + _cs(b_c.r) + "," + _cs(b_c.g) + "," + _cs(b_c.b) + ") ") + ";",
        "float ndl_" + k + "_ = max(0.,  dot(_nrm, lightVectorW_" + k + "_) )*" + _cs(op.colorPower) + "+" + _cs(op.colorMin) + ";",
        "float nnl_" + k + "_ = max(0., -1.* dot(_nrm, lightVectorW_" + k + "_) )*" + _cs(op.backPower) + "+" + _cs(op.backMin) + ";",
        "vec3 cli_" + k + "_ = colori_" + k + "_ * ndl_" + k + "_ " + (op.reduce ? "-" : "+") + " back_" + k + "_ * nnl_" + k + "_;",
         def(op.clamp, false) ? "cli_" + k + "_.x = clamp(1.0 - cli_" + k + "_.x , 0., 1.);" : "cli_" + k + "_.x =1.0- clamp(1.0 - cli_" + k + "_.x , 0., 1.);",
         def(op.clamp, false) ? "cli_" + k + "_.y = clamp(1.0 - cli_" + k + "_.y , 0., 1.);" : "cli_" + k + "_.y =1.0- clamp(1.0 - cli_" + k + "_.y , 0., 1.);",
         def(op.clamp, false) ? "cli_" + k + "_.z = clamp(1.0 - cli_" + k + "_.z , 0., 1.);" : "cli_" + k + "_.z =1.0- clamp(1.0 - cli_" + k + "_.z , 0., 1.);",
         def(op.alpha, false) ? "float acli_" + k + "_ =1.0- clamp(1.0 - (cli_" + k + "_.x+cli_" + k + "_.y+cli_" + k + "_.z) , 0., 1.);" : "float acli_" + k + "_ = 1.;",
         "result = vec4(  cli_" + k + "_  , acli_" + k + "_);",
    ].join('\n');
};
var sh_cubmat = function (op) {
    return [
        "vec3 viewDir = pos - camera;                          ",
        "vec3 coords = reflect(viewDir, nrm);                  ",
        "vec3 vReflectionUVW = vec3(refmat * vec4(coords, 0)); ",
        "vec3 rc= textureCube(refc, vReflectionUVW).rgb  ;      ",
        "result = vec4(rc.x,rc.y,rc.z,1.0);                    "
    ].join('\n');
};

var sh_specular = function (op) {
    op = def(op, {});
    k++;
    return [
        "vec3 viewDir_" + k + "_ =  vec4(_pos,1.0).xyz - camera ;",
        "vec3 coords_" + k + "_ = reflect(viewDir_" + k + "_" + (def(op.glass, false) ? "*vec3(1.0)" : "*vec3(-1.0)") + ", _nrm )+" + def(op.pos, 'vec3(0.0,0.0,0.0)') + "; ",
        "vec3 vReflectionUVW_" + k + "_ = vec3( refmat *  vec4(coords_" + k + "_, 0)); ",
        "vec3 rc_" + k + "_= textureCube(" + def(op.refc, "refc") + ", vReflectionUVW_" + k + "_*vec3(0.1)).rgb  ;      ",
        "result = vec4(rc_" + k + "_.x ,rc_" + k + "_.y,rc_" + k + "_.z, "+(def(op.alpha,false)? "1.":"(rc_" + k + "_.x+rc_" + k + "_.y+rc_" + k + "_.z)/3.0 ")+");  "
    ].join('\n');
};


$3d.mat = {

    shaderBase: {
        vertex: function (fun, hp, ops) {
            ops = def(ops, [sh_global(), hp, sh_uniform(), sh_varing(), sh_tools(), sh_main_vertex(fun)]);
            return ops.join('\n');
        },
        fragment: function (fun, hp, ops) {
            ops = def(ops, [sh_global(), hp, sh_uniform(), sh_varing(), sh_tools(), sh_main_fragment(fun)]);
            return ops.join('\n');
        },
        shader: function (op) {
            var shaderMaterial;

            if (op && !op.u) {
                op.u = {
                    attributes: ["position", "normal", "uv"],
                    uniforms: ["view", "world", "worldView", "viewProjection", "worldViewProjection"]
                };
            }

            shdrIndex++;

            var vtx = op.vtx;
            var frg = op.frg;

            op.vtx = "sh_v_" + shdrIndex;
            op.frg = "sh_f_" + shdrIndex;

            var vtxElement = document.createElement("Script");
            vtxElement.setAttribute("id", op.vtx);
            vtxElement.setAttribute("type", "x-shader/x-vertex");
            vtxElement.innerHTML = $3d.mat.shaderBase.vertex(vtx, op.helper, op.vtxops);
            document.getElementById('shaders').appendChild(vtxElement);

            var frgElement = document.createElement("Script");
            frgElement.setAttribute("id", op.frg);
            frgElement.setAttribute("type", "x-shader/x-fragment");
            frgElement.innerHTML = $3d.mat.shaderBase.fragment(frg, op.helper, op.frgops);
            document.getElementById('shaders').appendChild(frgElement);


            return { shader: op };

        },
    },
    frg: function (op) {
        return $3d.mat.shaderBase.shader({
            vtx: 'result = vec4(pos.x,pos.y,pos.z,1.0);',
            frg: op,
            helper: ''
        });
    },
    shd: function (op) {
        return $3d.mat.shaderBase.shader({
            vtx: op.vtx,
            frg: op.frg,
            helper: ''
        });
    },

    shaderSample: function () {
        return $3d.mat.shaderBase.shader({
            vtx: 'result = vec4(pos.x,pos.y,pos.z,1.0);',
            frg:
                  sh_multi([{
                      r: sh_range({
                          mat2: sh_range({
                              mat1: 'result = vec4(1.,0.,0.,1.0);',
                              mat2: sh_phonge({ color: 0xff0000, back: 0x550000 }),
                              start: 150,
                              end: 300,
                              custom: 'pos.y+150.',
                          }),
                          mat1: ['float pp = noise(vec3(pos.x/20.,pos.y/20.,pos.z/20.));',
                                  'result = vec4(pp+1.0,pp,pp,1.0);'].join('\n'),
                          start: 20,
                          end: 150,
                          custom: 'pos.y+150.',
                      }),
                      e: 1.
                  }])
               ,
            helper: ''
        });
    }

};



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
    else if (p1.length >= 3) {
        c.r = p1[0] * 1.0;
        c.g = p1[1] * 1.0;
        c.b = p1[2] * 1.0;
        c.a = def(p1[3], 1.0) * 1.0;

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

var cs = function (p1, p2, p3, p4) {
    var co = c(p1, p2, p3, p4);

    return {
        r: _cs(co.r),
        g: _cs(co.g),
        b: _cs(co.b),
        a: _cs(co.a),
    }
}

var cs256 = function (p1, p2, p3, p4) {
    var co = c(p1, p2, p3, p4);

    return {
        r: _cs(co.r * 256.),
        g: _cs(co.g * 256.),
        b: _cs(co.b * 256.),
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