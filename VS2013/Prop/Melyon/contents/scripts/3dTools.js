var isInOp;
var deb = false;
var pis = "";
$3d.tools = {
    importGeo: function (geo, v, f, op) {
        var st = 0;
        st = geo.vertices.length;

        if (!op) op = {};

        if (!op.t) {
            op.t = { x: 0, y: 0, z: 0 };
        }

        for (var i = 0; i < v.length ; i++) {
            geo.vertices.push({ x: v[i].x + (op.t.x), y: v[i].y + (op.t.y), z: v[i].z + (op.t.z) });
            geo.positions.push(v[i].x + (op.t.x), v[i].y + (op.t.y), v[i].z + (op.t.z));
        }

        for (var i = 0; i < f.length; i++) {
            if (!op || !op.checkFace || op.face(i, f[i]))
                geo.faces.push(f[i].a + st, f[i].b + st, f[i].c + st);
        }
    },
    face3: function (geo, p1, p2, p3, op) {
        if (!op) { op = {}; }

        function exch(p) { return (p.x || p.x == 0.0); }
        if (!op.uv) { op.uv = "0123"; }

        //if (def(op.noUV, false)) op.uv = ".....";

        function addUv(i) {
            if (op.uv[i].toString() == "0") geo.uvs.push(0.0, 0.0);
            if (op.uv[i].toString() == "1") geo.uvs.push(0.0, op.vp);
            if (op.uv[i].toString() == "2") geo.uvs.push(op.up, 0.0);
        };

        if (!op.up) { op.up = 1.0; }
        if (!op.vp) { op.vp = 1.0; }


        if (exch(p1)) { geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z); addUv(0); op.p1Ind = geo.vertices.length - 1; }
        if (exch(p2)) { geo.vertices.push(p2); geo.positions.push(p2.x, p2.y, p2.z); addUv(1); op.p2Ind = geo.vertices.length - 1; }
        if (exch(p3)) { geo.vertices.push(p3); geo.positions.push(p3.x, p3.y, p3.z); addUv(2); op.p3Ind = geo.vertices.length - 1; }


        if (op.p1Ind == null || op.p1Ind == undefined) op.p1Ind = p1;
        if (op.p2Ind == null || op.p2Ind == undefined) op.p2Ind = p2;
        if (op.p3Ind == null || op.p3Ind == undefined) op.p3Ind = p3;

        if (!def(isInOp)) {
            if (op.flip) {
                geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
            }
            else {
                geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
            }
        }
        else {
            if (op.flip) {
                if (isInOp.a && isInOp.b && isInOp.c) geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
            }
            else {
                if (isInOp.a && isInOp.c && isInOp.b) geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
            }
        }

        isInOp = null;

        return [op.p1Ind, op.p2Ind, op.p3Ind];
    },
    push1: function (geo, p1, uv) {
        uv = def(uv, true);
        geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z);
        if (uv) geo.uvs.push(0.0, 0.0);
        return geo.vertices.length - 1;
    },
    push3: function (geo, p1, p2, p3, op) {
        if (!op) { op = {}; }

        if (!op.uv) { op.uv = "0123"; }

        function addUv(i) {
            if (op.uv[i].toString() == "0") geo.uvs.push(0.0, 0.0);
            if (op.uv[i].toString() == "1") geo.uvs.push(0.0, op.vp);
            if (op.uv[i].toString() == "2") geo.uvs.push(op.up, 0.0);
        };

        if (!op.up) { op.up = 1.0; }
        if (!op.vp) { op.vp = 1.0; }

        geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z); addUv(0); op.p1Ind = geo.vertices.length - 1;
        geo.vertices.push(p2); geo.positions.push(p2.x, p2.y, p2.z); addUv(1); op.p2Ind = geo.vertices.length - 1;
        geo.vertices.push(p3); geo.positions.push(p3.x, p3.y, p3.z); addUv(2); op.p3Ind = geo.vertices.length - 1;

        return [op.p1Ind, op.p2Ind, op.p3Ind];
    },
    face: function (geo, p1, p2, p3, p4, op) {
        if (!op) { op = {}; }

        function exch(p) { if (!def(p)) return false; return (p.x || p.x == 0.0); }
        if (!op.uv) { op.uv = "0132"; }

        function addUv(i) {
            if (op.uv[i].toString() == "0") geo.uvs.push(0.0, 0.0);
            if (op.uv[i].toString() == "1") geo.uvs.push(0.0, op.vp);
            if (op.uv[i].toString() == "2") geo.uvs.push(op.up, 0.0);
            if (op.uv[i].toString() == "3") geo.uvs.push(op.up, op.vp);
        };

        if (!op.up) { op.up = 1.0; }
        if (!op.vp) { op.vp = 1.0; }


        if (exch(p1)) { geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z); addUv(0); op.p1Ind = geo.vertices.length - 1; }
        if (exch(p2)) { geo.vertices.push(p2); geo.positions.push(p2.x, p2.y, p2.z); addUv(1); op.p2Ind = geo.vertices.length - 1; }
        if (exch(p3)) { geo.vertices.push(p3); geo.positions.push(p3.x, p3.y, p3.z); addUv(2); op.p3Ind = geo.vertices.length - 1; }
        if (exch(p4)) { geo.vertices.push(p4); geo.positions.push(p4.x, p4.y, p4.z); addUv(3); op.p4Ind = geo.vertices.length - 1; }


        if (op.p1Ind == null || op.p1Ind == undefined) op.p1Ind = p1;
        if (op.p2Ind == null || op.p2Ind == undefined) op.p2Ind = p2;
        if (op.p3Ind == null || op.p3Ind == undefined) op.p3Ind = p3;
        if (op.p4Ind == null || op.p4Ind == undefined) op.p4Ind = p4;

        if (!def(isInOp)) {
            if (op.flip) {

                geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
                geo.faces.push(op.p2Ind, op.p4Ind, op.p3Ind);
            }
            else {
                geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
                geo.faces.push(op.p2Ind, op.p3Ind, op.p4Ind);
            }
        }
        else {
            if (op.flip) {
                if (isInOp.a && isInOp.b && isInOp.c) geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
                if (isInOp.b && isInOp.d && isInOp.c) geo.faces.push(op.p2Ind, op.p4Ind, op.p3Ind);
            }
            else {
                if (isInOp.a && isInOp.c && isInOp.b) geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
                if (isInOp.b && isInOp.c && isInOp.d) geo.faces.push(op.p2Ind, op.p3Ind, op.p4Ind);
            }
        }

        isInOp = null;
        return [op.p1Ind, op.p2Ind, op.p3Ind, op.p4Ind];
    },
    push: function (geo, p1, p2, p3, p4, op) {
        if (!op) { op = {}; }

        if (!op.uv) { op.uv = "0123"; }

        function addUv(i) {
            //if (op.uv[i].toString() == "0") geo.uvs.push(0.0, 0.0);
            //if (op.uv[i].toString() == "1") geo.uvs.push(0.0, op.vp);
            //if (op.uv[i].toString() == "2") geo.uvs.push(op.up, 0.0);
            //if (op.uv[i].toString() == "3") geo.uvs.push(op.up, op.vp);
        };

        if (!op.up) { op.up = 1.0; }
        if (!op.vp) { op.vp = 1.0; }

        geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z); addUv(0); op.p1Ind = geo.vertices.length - 1;
        geo.vertices.push(p2); geo.positions.push(p2.x, p2.y, p2.z); addUv(1); op.p2Ind = geo.vertices.length - 1;
        geo.vertices.push(p3); geo.positions.push(p3.x, p3.y, p3.z); addUv(2); op.p3Ind = geo.vertices.length - 1;
        geo.vertices.push(p4); geo.positions.push(p4.x, p4.y, p4.z); addUv(3); op.p4Ind = geo.vertices.length - 1;

        return [op.p1Ind, op.p2Ind, op.p3Ind, op.p4Ind];
    },

    geometryBase: function (firstp, builder, exgeo, custom) {
        var geo = {
            faces: [],
            vertices: [],
            normals: [],
            positions: [],
            uvs: []
        };

        if (!exgeo)
            exgeo = geo;

        if (builder) {
            builder(firstp, exgeo);
        }

        if (custom) {
            exgeo = custom(exgeo);
        }


        return exgeo;
    },
    cache: {
        items: [],
        one_cache: {},
        get: function (op, val) {
            if (def(val)) {
                if (op == -1) {
                    $3d.tools.cache.one_cache = val;
                    return -1;
                } else {
                    $3d.tools.cache.items.push({ op: op, val: val });

                    return $3d.tools.cache.items.length - 1;
                }
            } else {
                if (op == -1 || op.i == -1) {
                    return $3d.tools.cache.one_cache;
                }
                //  return $3d.tools.cache.items[op.i].val;
                return op;
            }
        },

        getItem: function (na, val) {
            if (def(val)) {

                $3d.tools.cache.items[na] = val;

            } else {

                return $3d.tools.cache.items[na];
            }
        },

    },
    svg: {
        svgCalibration: 0.00001,
        getPoints: function (op) {
            var h1 = 1;
            function getLenRounded(pat, i) {
                var i = pat.getPointAtLength(i);
                // ik = 1;

                return i;//{ x: round(i.x * ik) / ik, y: round(i.y * ik) / ik };
            }

            //if (!def(op.path)) throw "not found any path";

            op.push = def(op.push, function (result, point) {
                result.push(point);
            });

            if (def(op.path) && op.path != '-1') {
                op.path = $3d.tools.cache.get(op.path);
            }
            else {
                $3d.tools.cache.get(-1, op.path);
            }

            op.step = def(op.step, 0.5);

            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", op.path);

            var result = [];


            var len = path.getTotalLength();

            if (def(op.inLine) && (!def(op.pointLength) || op.pointLength < 1000)) {
                op.step = 0.3;
            }

            if (def(op.pointLength)) {
                op.min = len / op.pointLength;
            }

            var plen = 0.0
            var s = getLenRounded(path, 0);

            op.density = def(op.density, [1]);

            function getDensityMapStep(index) {
                var ps = floor(op.density.length * (index / len));

                return op.step / op.density[ps];
            }

            var p = s;
            var c = getLenRounded(path, op.step);
            plen += op.step;


            op.push(result, s);

            var p_o = 0;
            var oo_p = { x: 0, y: 0 };
            for (var i = op.step * 2; i < len; i += getDensityMapStep(i)) {
                h1++;
                var n = getLenRounded(path, i);
                plen += op.step;

                if (def(op.inLine, true)) {
                    if (i == op.step * 2)
                        op.push(result, c);

                    if (plen > def(op.min, 10.)) {
                        op.push(result, n); plen = 0.0;
                    }
                }
                else {

                    var d1 = dim(p, c);
                    var d2 = dim(c, n);
                    var d3 = dim(p, n);

                    var d4 = 0;
                    var d5 = 0;

                    if (def(p_o)) {
                        d4 = dim(p_o, c);
                        d5 = dim(p_o, n);
                    }

                    var iilen = abs(d3 - (d2 + d1));
                    var lll = $3d.tools.svg.svgCalibration;



                    if (iilen > lll || p_o > lll) {

                        if (dim(n, oo_p) > 4.0) {
                            op.push(result, n); oo_p = n;
                        }
                        plen = 0.0;

                        p_o = 0;
                    }
                    else {
                        p_o += iilen;
                    }
                }

                p = c;
                c = n;
            }

            //alert(h1 + "  a25");

            result = op.push(result, getLenRounded(path, len), true);

            var sr = [];

            for (var i = def(op.start, 0) ; i < result.length - def(op.end, 0) ; i++) {
                sr.push(result[i]);
            }

            return sr;
        },
    }
}

// points

// [{x,y,z},{x,y,z},...] , {path,seg,fun:{start , end , call },svg}
$3d.points = function (op) {

}

$3d.points.prototype = {
    list: [],
    // [{x,y,z}] | [x1,y1,z1,x2,...] | {x,y,z} | x,y,z

    // call
    each: function (op) {
        for (var i = 0; i < this.list.length; i++) {
            var r = op(i, this.list[i]);
            if (def(r)) {
                this.list[i] = r;
            }
        }
        return this;
    },
    // {x,y,z}
    move: function (op) {
        this.each(function (i, it) { return { x: it.x + op.x, y: it.y + op.y, z: it.z + op.z } });
    },
    // deg {x,y,z,center:{x,y,z}} 
    rotate: function (op) {
        this.each(function (i, it) {
            this.applyAxisAngle(it, { x: 1, y: 0, z: 0 }, def(x, 0) * deg);
            this.applyAxisAngle(it, { x: 0, y: 1, z: 0 }, def(y, 0) * deg);
            this.applyAxisAngle(it, { x: 0, y: 0, z: 1 }, def(z, 0) * deg);
        });
    },
    applyAxisAngle: function (th, axis, angle) {

        var _qt;

        return function (axis, angle) {

            if (_qt === undefined) _qt = new qt();

            th = applyQuaternion(th, qt.setFromAxisAngle(axis, angle));

            return th;
        };

    }(),
    // {x,y,z}
    look: function (op) { },
    scale: function (op) { },
    noise: function (op) { },


    applyQuaternion: function (th, q) {

        var x = th.x;
        var y = th.y;
        var z = th.z;

        var qx = q.x;
        var qy = q.y;
        var qz = q.z;
        var qw = q.w;

        // calculate quat * vector

        var ix = qw * x + qy * z - qz * y;
        var iy = qw * y + qz * x - qx * z;
        var iz = qw * z + qx * y - qy * x;
        var iw = -qx * x - qy * y - qz * z;

        // calculate result * inverse quat

        th.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        th.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        th.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return th;

    },
}


// samples

$3d.sampleGeo = function (op) {
    // pre : { p1,p2,p3,p4,p5,p6,p7,p8  }
    var builder = function (pre, geo) {
        $3d.tools.face(geo, pre.p1, pre.p2, pre.p3, pre.p4);
        $3d.tools.face(geo, pre.p1, pre.p2, pre.p3, pre.p4, { flip: 1 });
    };

    return new $3d.geometryInstance($3d.tools.geometryBase(op, builder, op.custom));
}

// path :points array ,d:wall deep ,h:height 
$3d.tools.wall = function (op) {
    // pre : { p1,p2 }

    op = def(op, {
        d: 2,
        h: 2,
        path: [{ x: 10, y: 0, z: 10 }, { x: -10, y: 0, z: 10 }, { x: -10, y: 0, z: -10 }, { x: 10, y: 0, z: -10 }],
        left: function (p) { return true; },
        right: function (p) { return true; },
        top: function (p) { return true; },
        bottom: function (p) { return true; },
        lr: function (p) { return true; },
        closed: true,
    });

    if (op.lr == 'default') {
        op.lr = function (p) { return true; };
        op.left = def(op.left, function (p) { return true; });
        op.right = def(op.right, function (p) { return true; });
        op.top = def(op.top, function () { return true; });
        op.bottom = def(op.bottom, function (p) { return true; });
        op.front = def(op.front, function (p) { return true; });
        op.back = def(op.back, function (p) { return true; });
    }

    // op.path.push({ x: 0.1, y: 0.1, z: 0.1 });

    op.d = def(op.d, 1.0);
    op.h = def(op.h, 35.0);

    var builder = function (p, geo) {


        ag = function (a, b) {
            return { x: (a.x + b.x) / 2.0, y: (a.y + b.y) / 2.0, z: (a.z + b.z) / 2.0 };
        }

        rt = function (a, b, c, u) {
            if (!u) u = 1.0;
            nn = nrm({ x: (a.z - b.z), y: 0.0, z: (a.x - b.x) });
            return { x: c.x + nn.x * op.d * u, y: c.y, z: c.z - nn.z * op.d * u };
        }

        nxu = rt(p.n, p.n1, p.n);
        nxd = rt(p.n, p.n1, p.n, -1.0);

        if (p.n_1 != null && p.n_1 != undefined) {

            npu = rt(p.n_1, p.n, p.n);
            npd = rt(p.n_1, p.n, p.n, -1.0);

            nxu = ag(nxu, npu);
            nxd = ag(nxd, npd);
        }
        if (op.t) { nxu.y += op.t.y; nxd.y += op.t.y; }


        nhu = { x: nxu.x, y: nxu.y + (op.h - def(p.n.hgt, 0)), z: nxu.z };
        nhd = { x: nxd.x, y: nxd.y + (op.h - def(p.n.hgt, 0)), z: nxd.z };


        if (op.front && op.front(p)) $3d.tools.face(geo, nxu, nxd, nhu, nhd, {});
        if (op.back && op.back(p))
            $3d.tools.face(geo, nxu, nxd, nhu, nhd, { flip: 1.0 });


        if (op.start && (p.i == 0)) {
            $3d.tools.face(geo, nxu, nxd, nhu, nhd, { flip: 1.0 });
        }

        if (op.end && (p.i == op.path.length - 2)) {
            $3d.tools.face(geo, nxu, nxd, nhu, nhd, {});
        }

        if (op.smooth) {
            var x = $3d.tools.push(geo, nxu, nxd, nhu, nhd);
            nxu = x[0];
            nxd = x[1];
            nhu = x[2];
            nhd = x[3];
        }

        if (p.fold && op.lr != null && op.lr != undefined && op.lr(p)) {

            if (op.right) $3d.tools.face(geo, p.fold[1], nxd, p.fold[3], nhd, { flip: 1.0 });
            if (op.left) $3d.tools.face(geo, nxu, p.fold[0], nhu, p.fold[2], { flip: 1.0 });

            if (op.top) $3d.tools.face(geo, p.fold[2], p.fold[3], nhu, nhd, { flip: 1.0 });
            if (op.bottom) $3d.tools.face(geo, nxu, nxd, p.fold[0], p.fold[1], { flip: 1.0 });
        }

        if (p.fs == null || p.fs == undefined)
            p.fs = [nxu, nxd, nhu, nhd];

        p.i++;

        if (op.path.length > p.i + 1)
            builder({ i: p.i, fold: [nxu, nxd, nhu, nhd], fs: p.fs, n_1: op.path[p.i - 1], n: op.path[p.i], n1: op.path[p.i + 1], bu: p.bu }, geo);
        else if (op.closed && op.lr != null && op.lr != undefined && op.lr(p)) {

            if (op.right) $3d.tools.face(geo, p.fs[1], nxd, p.fs[3], nhd, { flip: 0.0 });
            if (op.left) $3d.tools.face(geo, nxu, p.fs[0], nhu, p.fs[2], { flip: 0.0 });

            if (op.top) $3d.tools.face(geo, p.fs[2], p.fs[3], nhu, nhd, { flip: 0.0 });
            if (op.bottom) $3d.tools.face(geo, nxu, nxd, p.fs[0], p.fs[1], { flip: 0.0 });
        }
    };

    var geo = $3d.tools.geometryBase({ i: 0, n_1: (op.closed ? op.path[op.path.length - 1] : null), n: op.path[0], n1: op.path[1], bu: builder }, builder, op.exgeo, op.custom);

    if (op.buildGeo) {
        return geo;
    }

    return new $3d.geometryInstance(geo);
}

//{ paths , cond  }
$3d.tools.surface = function (op) {

    op = def(op, {});

    if (def(op.paths) && op.paths.length < 2) throw 'surface need paths.at least 2 path needed ';

    var process = function (pts1, pts2) {

        var n = pts1.length;
        var m = pts2.length;
        var r = max(n, m);

        var fy = function (i, n) {
            var f = function (ix) { return ceil((ix + 1) * (n / r)) - 1; }
            var f2 = function (ix) { return ceil(ix * (n / r)); }

            var fn = f(n);
            if (fn <= n) return f2(i);
            else f(i);
        }
        var p = { p1: [], p2: [] };
        for (var i = 1; i <= r; i++) {
            p.p1.push(fy(i, n) - 1);
            p.p2.push(fy(i, m) - 1);
        }

        return p;
    }
    var push = function (p, g) {
        var inds = [];
        for (var i = 0; i < p.length; i++) {
            inds.push($3d.tools.push1(g, p[i]));
        }
        return inds;
    };
    function isIn(l, i, p) {
        if (!def(op.conds) || op.conds.length - 1 < l) return true;

        return op.conds[l](i, null, p);
    }
    var curlevel = 0;
    var builder = function (re, geo) {

        if (re.curlevel > op.paths.length - 2) return;

        var helper = process(op.paths[re.curlevel], op.paths[re.curlevel + 1]);

        // push
        var i1 = [], i2 = [];
        if (re.curlevel == 0) i1 = push(op.paths[re.curlevel], geo);
        else i1 = re.preIndexs;
        i2 = push(op.paths[++re.curlevel], geo);

        // faces 



        for (var i = 0; i < helper.p1.length - 1; i++) {

            if (def(op.conds) && op.conds.length - 1 <= re.curlevel) {
                isInOp = { a: isIn(re.curlevel - 1, i), b: isIn(re.curlevel - 1, i + 1), c: isIn(re.curlevel, i), d: isIn(re.curlevel, i + 1) };
                // [1,1,2,2] level 
            }
            else {
                isInOp = null;
            }

            if (helper.p1[i] != helper.p1[i + 1] && helper.p2[i] != helper.p2[i + 1]) {
                if (def(op.flip, false)) {
                    $3d.tools.face(geo, i1[helper.p1[i]], i1[helper.p1[i + 1]], i2[helper.p2[i]], i2[helper.p2[i + 1]], {});
                }
                else {
                    $3d.tools.face(geo, i1[helper.p1[i]], i1[helper.p1[i + 1]], i2[helper.p2[i]], i2[helper.p2[i + 1]], { flip: 1 });
                }
            }

            else if (helper.p1[i] != helper.p1[i + 1] && helper.p2[i] == helper.p2[i + 1]) {
                if (def(isInOp))
                    isInOp.d = null;// [1,1,2]



                if (def(op.flip, false)) $3d.tools.face3(geo, i1[helper.p1[i]], i1[helper.p1[i + 1]], i2[helper.p2[i]], {});
                else $3d.tools.face3(geo, i1[helper.p1[i]], i1[helper.p1[i + 1]], i2[helper.p2[i]], { flip: 1 });
            }
            else if (helper.p1[i] == helper.p1[i + 1] && helper.p2[i] != helper.p2[i + 1]) {
                if (def(isInOp)) {
                    isInOp.d = null;// [1,2,2]
                    isInOp.b = isIn(re.curlevel, i);
                    isInOp.c = isIn(re.curlevel, i + 1);
                }

                if (def(op.flip, false)) $3d.tools.face3(geo, i1[helper.p1[i]], i2[helper.p2[i]], i2[helper.p2[i + 1]], { flip: 1 });
                else $3d.tools.face3(geo, i1[helper.p1[i]], i2[helper.p2[i]], i2[helper.p2[i + 1]], {});
            }

        }

        re.preIndexs = i2;

        builder(re, geo);
    };

    var geo = $3d.tools.geometryBase({ curlevel: 0 }, builder, op.exgeo, op.custom);

    if (op.buildGeo) {
        return geo;
    }

    return new $3d.geometryInstance(geo);
}

$3d.tools.obj = function (path, op) {
    op = def(op, {});
    op.array = def(op.array, []);


    prop.loader.xhr({
        path: path, prefix: '/objs/', postfix: '.js', success: function (th) {
            var ih = $3d.tools.objParse(th.content);

            if (isSelect('alpha'))
                mgop = { alpha: true };
            _each(ih, function (at, i) {

                if (def(op.index) && i != op.index) return;

                var fst = js('function(){' + gettxt('obj-material') + '}');
                op.array.push(new $3d.geometryInstance(at).toMesh(fst(), eng1));

                ref = new BABYLON.CubeTexture("/images/skybox/d3/skybox", eng1.get().scene);
                ref.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
                var ref2 = new BABYLON.CubeTexture("/images/skybox/d/skybox", eng1.get().scene);
                ref2.coordinatesMode = BABYLON.Texture.CUBIC_MODE;

                n_1(op.array).scaling.x *= 15;
                n_1(op.array).scaling.y *= 15;
                n_1(op.array).scaling.z *= 15;

                n_1(op.array).material.setTexture("refc", ref);
                n_1(op.array).material.setTexture("refc2", ref2);
                n_1(op.array).material.setMatrix("refmat", ref.getReflectionTextureMatrix());

            });
        }
    });

}

$3d.tools.objParse = function (text) {

    var objects = [];

    var uvsii = [], uvh = [];
    var geometry = null;
    var i0 = 0;
    function vector(x, y, z) {
        return { x: x, y: y, z: z };
    }

    function uv(u, v) {
        return { x: x, y: y };
    }

    function face3(a, b, c, normals) {
        return { x: a - oldIndex, y: b - oldIndex, z: c - oldIndex };
    }


    function parseVertexIndex(index) {

        index = parseInt(index);

        return index >= 0 ? index - 1 : index + vertices.length;

    }

    function parseNormalIndex(index) {

        index = parseInt(index);

        return index >= 0 ? index - 1 : index + normals.length;

    }

    function parseUVIndex(index) {

        index = parseInt(index);

        return index >= 0 ? index - 1 : 1.0;

    }

    function add_face(a, b, c, uvs) {

        //if (normals_inds === undefined) {
        a = parseVertexIndex(a - oldIndex);
        b = parseVertexIndex(b - oldIndex);
        c = parseVertexIndex(c - oldIndex);

        $3d.tools.face3(n_1(objects),
            a,
            b,
            c
        );

        if (!def(n_1(objects).uvs[a * 2])) n_1(objects).uvs[a * 2] = uvsii[parseUVIndex(uvs[0])].x;
        if (!def(n_1(objects).uvs[a * 2 + 1])) n_1(objects).uvs[a * 2 + 1] = uvsii[parseUVIndex(uvs[0])].y;

        if (!def(n_1(objects).uvs[b * 2])) n_1(objects).uvs[b * 2] = uvsii[parseUVIndex(uvs[1])].x;
        if (!def(n_1(objects).uvs[b * 2 + 1])) n_1(objects).uvs[b * 2 + 1] = uvsii[parseUVIndex(uvs[1])].y;

        if (!def(n_1(objects).uvs[c * 2])) n_1(objects).uvs[c * 2] = uvsii[parseUVIndex(uvs[2])].x;
        if (!def(n_1(objects).uvs[c * 2 + 1])) n_1(objects).uvs[c * 2 + 1] = uvsii[parseUVIndex(uvs[2])].y;


        n_1(objects).uvh = def(n_1(objects).uvh, []);

        n_1(objects).uvh[a * 2] = { i: uvsii[parseUVIndex(uvs[0])].x };
        n_1(objects).uvh[a * 2].a = -1;
        n_1(objects).uvh[a * 2].b = b;
        n_1(objects).uvh[a * 2].c = c;


        n_1(objects).uvh[a * 2 + 1] = { i: uvsii[parseUVIndex(uvs[0])].y };


        n_1(objects).uvh[b * 2] = { i: uvsii[parseUVIndex(uvs[1])].x };
        n_1(objects).uvh[b * 2].a = a;
        n_1(objects).uvh[b * 2].b = -1;
        n_1(objects).uvh[b * 2].c = c;


        n_1(objects).uvh[b * 2 + 1] = { i: uvsii[parseUVIndex(uvs[1])].y };

        n_1(objects).uvh[c * 2] = { i: uvsii[parseUVIndex(uvs[2])].x };
        n_1(objects).uvh[b * 2].a = a;
        n_1(objects).uvh[b * 2].b = b;
        n_1(objects).uvh[b * 2].c = -1;


        n_1(objects).uvh[c * 2 + 1] = { i: uvsii[parseUVIndex(uvs[2])].y };



        // } else {

        // faces.push(face3(
        //    vertices[parseVertexIndex(a)] - 1,
        //    vertices[parseVertexIndex(b)] - 1,
        //    vertices[parseVertexIndex(c)] - 1
        //    //,
        //    //[
        //    //    normals[parseNormalIndex(normals_inds[0])].clone(),
        //    //    normals[parseNormalIndex(normals_inds[1])].clone(),
        //    //    normals[parseNormalIndex(normals_inds[2])].clone()
        //    //]
        //));
        // }
    }

    function handle_face_line(faces, uvs, normals_inds) {

        uvs = def(uvs, [0, 0, 0, 0]);

        if (faces[3] === undefined) {

            add_face(faces[0], faces[1], faces[2], uvs);

        } else {
            add_face(faces[0], faces[1], faces[3], [uvs[0], uvs[1], uvs[3]]);
            add_face(faces[1], faces[2], faces[3], [uvs[1], uvs[2], uvs[3]]);
        }

    }

    // create mesh if no objects in text

    if (/^o /gm.test(text) === false) {

        geometry = $3d.tools.geometryBase();
        objects.push(geometry);
    }



    // v float float float

    var vertex_pattern = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

    // vn float float float

    var normal_pattern = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

    // vt float float

    var uv_pattern = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/;

    // f vertex vertex vertex ...

    var face_pattern1 = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/;

    // f vertex/uv vertex/uv vertex/uv ...

    var face_pattern2 = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/;

    // f vertex/uv/normal vertex/uv/normal vertex/uv/normal ...

    var face_pattern3 = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/;

    // f vertex//normal vertex//normal vertex//normal ... 

    var face_pattern4 = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/

    //

    var lines = text.split('\n');
    var oldIndex = 0;

    var lastchar = '';
    function newGeo() {
        if (objects.length == 0 || n_1(objects).vertices.length > 0) {
            oldIndex += objects.length > 0 ? n_1(objects).vertices.length : 0;


            geometry = $3d.tools.geometryBase();
            objects.push(geometry);
        }
    }
    for (var i = 0; i < lines.length; i++) {

        var line = lines[i];
        line = line.trim();

        var result;

        if (line.length === 0 || line.charAt(0) === '#') {

            continue;

        } else if ((result = vertex_pattern.exec(line)) !== null) {

            // ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

            if (lastchar == 'g') newGeo();

            $3d.tools.push1(n_1(objects), { x: result[1], y: result[2], z: result[3] }, false);
            lastchar = 'v';
        } else if ((result = normal_pattern.exec(line)) !== null) {

            // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

            // normals.push({ x: result[1], y: result[2], z: result[3] });
            lastchar = 'n';

        } else if ((result = uv_pattern.exec(line)) !== null) {

            // ["vt 0.1 0.2", "0.1", "0.2"]
            uvsii.push({ x: parseFloat(result[1]), y: parseFloat(result[2]) });
            // uvs.push({ x: result[1], y: result[2] });
            lastchar = 't';

        } else if ((result = face_pattern1.exec(line)) !== null) {

            // ["f 1 2 3", "1", "2", "3", undefined]

            handle_face_line(
                [result[1], result[2], result[3], result[4]]
            );
            lastchar = 'f';

        } else if ((result = face_pattern2.exec(line)) !== null) {

            // ["f 1/1 2/2 3/3", " 1/1", "1", "1", " 2/2", "2", "2", " 3/3", "3", "3", undefined, undefined, undefined]

            handle_face_line(
                [result[2], result[5], result[8], result[11]], //faces
                [result[3], result[6], result[9], result[12]] //uv
            );
            lastchar = 'f';

        } else if ((result = face_pattern3.exec(line)) !== null) {

            // ["f 1/1/1 2/2/2 3/3/3", " 1/1/1", "1", "1", "1", " 2/2/2", "2", "2", "2", " 3/3/3", "3", "3", "3", undefined, undefined, undefined, undefined]

            handle_face_line(
                [result[2], result[6], result[10], result[14]], //faces
                [result[3], result[7], result[11], result[15]], //uv
                [result[4], result[8], result[12], result[16]] //normal
            );
            lastchar = 'f';

        } else if ((result = face_pattern4.exec(line)) !== null) {

            // ["f 1//1 2//2 3//3", " 1//1", "1", "1", " 2//2", "2", "2", " 3//3", "3", "3", undefined, undefined, undefined]

            handle_face_line(
                [result[2], result[5], result[8], result[11]], //faces
                [], //uv
                [result[3], result[6], result[9], result[12]] //normal
            );
            lastchar = 'f';

        } else if (/^o /.test(line)) { // || /^g /.test(line)) {


            newGeo();
            lastchar = 'o';

        }
        else if (/^g /.test(line)) {
            lastchar = 'g';
        }
        else if (/^usemtl /.test(line)) {

            // material

            // material.name = line.substring( 7 ).trim();
            lastchar = 'u';
        } else if (/^mtllib /.test(line)) {

            // mtl file
            lastchar = 'm';
        } else if (/^s /.test(line)) {
            // smooth shading 
            lastchar = 's';
        } else {
            // console.log( "THREE.OBJLoader: Unhandled line " + line ); 

        }

    }


    var pis = [];
    pis = _each(objects[0].uvh, function (at, i) {
        if (objects[0].uvs[i] != at) {
            pis.push({ i: i, at: at });

            if (def(at.a) || def(at.b) || def(at.c)) {

                //$3d.tools.push1(objects[0], { x: objects[0].vertices[i].x, y: objects[0].vertices[i].y + 10, z: objects[0].vertices[i].z }, false);

             //   objects[0].vertices[i].y = objects[0].vertices[i].y.valueOf() + 10;

                //l = objects[0].vertices.length - 1;

                //if (at.a == -1) at.a = l;
                //if (at.b == -1) at.b = l;
                //if (at.c == -1) at.c = l;

                //$3d.tools.face3(objects[0], at.a, at.b, at.c);
                //objects[0].uvs.push(objects[0].uvh[i.valueOf() * 1.0].i);
                //objects[0].uvs.push(objects[0].uvh[i.valueOf() * 1.0 + 1].i);


            }


        }
    }, function () { return pis; });


    return objects;
}



