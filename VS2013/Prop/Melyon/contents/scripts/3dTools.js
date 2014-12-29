var isInOp;
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
                if(isInOp.a && isInOp.b && isInOp.c) geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
            }
            else {
                if (isInOp.a && isInOp.c && isInOp.b) geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
            }
        }

        isInOp = null;

        return [op.p1Ind, op.p2Ind, op.p3Ind];
    },
    push1: function (geo, p1) {
        geo.vertices.push(p1); geo.positions.push(p1.x, p1.y, p1.z); geo.uvs.push(0.0, 0.0);
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
            if (op.uv[i].toString() == "0") geo.uvs.push(0.0, 0.0);
            if (op.uv[i].toString() == "1") geo.uvs.push(0.0, op.vp);
            if (op.uv[i].toString() == "2") geo.uvs.push(op.up, 0.0);
            if (op.uv[i].toString() == "3") geo.uvs.push(op.up, op.vp);
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

    svg: {
        getPoints: function (op) {

            //if (!def(op.path)) throw "not found any path";

            op.push = def(op.push, function (result, point) {
                result.push(point);
            });

            op.step = def(op.step, 0.5);

            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", op.path);

            var len = path.getTotalLength();

            if (def(op.pointLength)) {
                op.min = len / op.pointLength;
            }

            var plen = 0.0
            var s = path.getPointAtLength(0);

            op.density = def(op.density, [1]);

            function getDencityMapStep(index) {
                var ps = floor(op.density.length * (index / len));

                return op.step / op.density[ps];
            }

            var p = s;
            var c = path.getPointAtLength(op.step);
            plen += op.step;

            var result = [];
            op.push(result, s);

            for (var i = op.step * 2; i < len; i += getDencityMapStep(i)) {

                var n = path.getPointAtLength(i);
                plen += op.step;

                var m1 = ((c.y - p.y) != 0 ? (c.x - p.x) / (c.y - p.y) : 'nan');
                var m2 = ((n.y - c.y) != 0 ? (n.x - c.x) / (n.y - c.y) : 'nan');

                if (m1 != m2 || def(op.inLine, true)) {
                    if (i == op.step * 2)
                        op.push(result, c);

                    if (plen > def(op.min, 10.)) {
                        op.push(result, n); plen = 0.0;
                    }

                }

                p = c;
                c = n;
            }
            op.push(result, path.getPointAtLength(len));

            var sr = [];

            for (var i = def(op.start, 0) ; i < result.length - def(op.end, 0) ; i++) {
                sr.push(result[i]);
            }

            return sr;
        },
        getPoints_ex: function (op) {
            if (!def(op.path)) throw "not found any path";

            op.push = def(op.push, function (result, point) {
                result.push(point);
            });

            var j, len1;
            var path, mesh, color, simpleShapes, simpleShape, shape3d, results = [];

            path = $d3g.transformSVGPath(op.path);
            results = new Array();
            amount = -100;
            simpleShapes = path.toShapes(true);
            len1 = simpleShapes.length;
            for (j = 0; j < len1; ++j) {
                simpleShape = simpleShapes[j];
                shape3d = simpleShape.extrude({
                    amount: 0.0,
                    bevelEnabled: false
                });

                shape3d.computeFaceNormals();

                results[j] = new Array();
                h = 0;
                for (i = 0; i < shape3d.vertices.length / 2  ; i++) {
                    op.push(results[j], { x: shape3d.vertices[i].x, y: shape3d.vertices[i].y }, i);
                }
            }

            var sr = [];

            for (var i = def(op.start, 0) ; i < results[0].length - def(op.end, 0) ; i++) {
                sr.push(results[0][i]);
            }

            return sr;

        },
        extrudeShape_ex: function (op) {
            if (!def(op.path)) throw "not found any path";
            op.full = def(op.full, false);
            var j, len1;
            var path, mesh, simpleShapes, simpleShape, shape3d;

            path = $d3g.transformSVGPath(op.path);

            simpleShapes = path.toShapes(true);
            len1 = simpleShapes.length;

            var geo;

            for (j = 0; j < len1; ++j) {
                simpleShape = simpleShapes[j];
                shape3d = simpleShape.extrude({
                    amount: def(op.amount, 10.0),
                    bevelEnabled: false
                });

                var poss = [];

                for (var i = 0; i < shape3d.vertices.length / 2.0 ; i++) {
                    var np = [];
                    op.push(np, shape3d.vertices[i], i);
                    poss.push(np[np.length - 1].x);
                    poss.push(np[np.length - 1].y);
                    poss.push(np[np.length - 1].z);
                }

                var fc = [];

                for (var i = 0; i < shape3d.faces.length / (op.full ? 1.0 : 2.0) - (op.full ? 0. : 2) ; i++) {
                    if (shape3d.faces[i].a < poss.length && shape3d.faces[i].b < poss.length && shape3d.faces[i].c < poss.length) {

                        if (def(op.flip, false)) {
                            fc.push(shape3d.faces[i].a);
                            fc.push(shape3d.faces[i].c);
                            fc.push(shape3d.faces[i].b);
                        }
                        else {
                            fc.push(shape3d.faces[i].a);
                            fc.push(shape3d.faces[i].b);
                            fc.push(shape3d.faces[i].c);
                        }


                    }
                }

                geo = new $3d.geometryInstance({ faces: fc, positions: poss });
            }

            return geo;
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
    add: function (op, op2, op3) {

        function append(x, y, z) {
            list.push({ x: def(x, 0.), y: def(x, 0.), z: def(x, 0.) });
        }

        if (def(op.x) || def(op.y) || def(op.z)) {
            append(op.x, op.y, op.z);
        }
        else if (def(op) && def(op2) && def(op3)) {
            append(op, op2, op3);
        }
        else if (op.length > 0) {
            if (def(op[0].x) || def(op[0].x) || def(op[0].x)) {
                for (var i = 0; i < op.length; i++) {
                    append(op[i].x, op[i].y, op[i].z);
                }
            }
            else if (op.length % 3 == 0) {
                for (var i = 0; i < op.length; i += 3) {
                    append(op[i], op[i + 1], op[i + 2]);
                }
            }
        }

        return this;
    },
    // call
    each: function (op) {
        for (var i = 0; i < this.list.length; i++) {
            var r = op(i, this.list[i]);
            if (def(r)) {
                this.list[i] = r;
            }
        }
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


        nhu = { x: nxu.x, y: nxu.y + op.h, z: nxu.z };
        nhd = { x: nxd.x, y: nxd.y + op.h, z: nxd.z };




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

            if ( def(op.conds) && op.conds.length - 1 <= re.curlevel) {
                isInOp = { a: isIn(re.curlevel - 1, i), b: isIn(re.curlevel - 1, i + 1), c: isIn(re.curlevel, i), d: isIn(re.curlevel  , i+1) };
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
                    isInOp.b = isIn(re.curlevel  , i  );
                    isInOp.c = isIn(re.curlevel  , i + 1);
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


// extension

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

function d3threeD(exports) {

    const DEGS_TO_RADS = Math.PI / 180, UNIT_SIZE = 100;

    const DIGIT_0 = 48, DIGIT_9 = 57, COMMA = 44, SPACE = 32, PERIOD = 46, MINUS = 45;

    exports.transformSVGPath =
    function transformSVGPath(pathStr) {
        var path = new THREE.Shape();

        var idx = 1, len = pathStr.length, activeCmd,
            x = 0, y = 0, nx = 0, ny = 0, firstX = null, firstY = null,
            x1 = 0, x2 = 0, y1 = 0, y2 = 0,
            rx = 0, ry = 0, xar = 0, laf = 0, sf = 0, cx, cy;

        function eatNum() {
            var sidx, c, isFloat = false, s;
            // eat delims
            while (idx < len) {
                c = pathStr.charCodeAt(idx);
                if (c !== COMMA && c !== SPACE)
                    break;
                idx++;
            }
            if (c === MINUS)
                sidx = idx++;
            else
                sidx = idx;
            // eat number
            while (idx < len) {
                c = pathStr.charCodeAt(idx);
                if (DIGIT_0 <= c && c <= DIGIT_9) {
                    idx++;
                    continue;
                }
                else if (c === PERIOD) {
                    idx++;
                    isFloat = true;
                    continue;
                }

                s = pathStr.substring(sidx, idx);
                return isFloat ? parseFloat(s) : parseInt(s);
            }

            s = pathStr.substring(sidx);
            return isFloat ? parseFloat(s) : parseInt(s);
        }

        function nextIsNum() {
            var c;
            // do permanently eat any delims...
            while (idx < len) {
                c = pathStr.charCodeAt(idx);
                if (c !== COMMA && c !== SPACE)
                    break;
                idx++;
            }
            c = pathStr.charCodeAt(idx);
            return (c === MINUS || (DIGIT_0 <= c && c <= DIGIT_9));
        }

        var canRepeat;
        activeCmd = pathStr[0].replace(/  /g, ' ').trim();
        while (idx <= len) {
            canRepeat = true;
            switch (activeCmd) {
                // moveto commands, become lineto's if repeated
                case 'M':
                    x = eatNum();
                    y = eatNum();
                    path.moveTo(x, y);
                    activeCmd = 'L';
                    firstX = x;
                    firstY = y;
                    break;
                case 'm':
                    x += eatNum();
                    y += eatNum();
                    path.moveTo(x, y);
                    activeCmd = 'l';
                    firstX = x;
                    firstY = y;
                    break;
                case 'Z':
                case 'z':
                    canRepeat = false;
                    if (x !== firstX || y !== firstY)
                        path.lineTo(firstX, firstY);
                    break;
                    // - lines!
                case 'L':
                case 'H':
                case 'V':
                    nx = (activeCmd === 'V') ? x : eatNum();
                    ny = (activeCmd === 'H') ? y : eatNum();
                    path.lineTo(nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'l':
                case 'h':
                case 'v':
                    nx = (activeCmd === 'v') ? x : (x + eatNum());
                    ny = (activeCmd === 'h') ? y : (y + eatNum());
                    path.lineTo(nx, ny);
                    x = nx;
                    y = ny;
                    break;
                    // - cubic bezier
                case 'C':
                    x1 = eatNum(); y1 = eatNum();
                case 'S':
                    if (activeCmd === 'S') {
                        x1 = 2 * x - x2; y1 = 2 * y - y2;
                    }
                    x2 = eatNum();
                    y2 = eatNum();
                    nx = eatNum();
                    ny = eatNum();
                    path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
                    x = nx; y = ny;
                    break;
                case 'c':
                    x1 = x + eatNum();
                    y1 = y + eatNum();
                case 's':
                    if (activeCmd === 's') {
                        x1 = 2 * x - x2;
                        y1 = 2 * y - y2;
                    }
                    x2 = x + eatNum();
                    y2 = y + eatNum();
                    nx = x + eatNum();
                    ny = y + eatNum();
                    path.bezierCurveTo(x1, y1, x2, y2, nx, ny);
                    x = nx; y = ny;
                    break;
                    // - quadratic bezier
                case 'Q':
                    x1 = eatNum(); y1 = eatNum();
                case 'T':
                    if (activeCmd === 'T') {
                        x1 = 2 * x - x1;
                        y1 = 2 * y - y1;
                    }
                    nx = eatNum();
                    ny = eatNum();
                    path.quadraticCurveTo(x1, y1, nx, ny);
                    x = nx;
                    y = ny;
                    break;
                case 'q':
                    x1 = x + eatNum();
                    y1 = y + eatNum();
                case 't':
                    if (activeCmd === 't') {
                        x1 = 2 * x - x1;
                        y1 = 2 * y - y1;
                    }
                    nx = x + eatNum();
                    ny = y + eatNum();
                    path.quadraticCurveTo(x1, y1, nx, ny);
                    x = nx; y = ny;
                    break;
                    // - elliptical arc
                case 'A':
                    rx = eatNum();
                    ry = eatNum();
                    xar = eatNum() * DEGS_TO_RADS;
                    laf = eatNum();
                    sf = eatNum();
                    nx = eatNum();
                    ny = eatNum();
                    if (rx !== ry) {
                        console.warn("Forcing elliptical arc to be a circular one :(",
                            rx, ry);
                    }
                    // SVG implementation notes does all the math for us! woo!
                    // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes
                    // step1, using x1 as x1'
                    x1 = Math.cos(xar) * (x - nx) / 2 + Math.sin(xar) * (y - ny) / 2;
                    y1 = -Math.sin(xar) * (x - nx) / 2 + Math.cos(xar) * (y - ny) / 2;
                    // step 2, using x2 as cx'
                    var norm = Math.sqrt(
                         (rx * rx * ry * ry - rx * rx * y1 * y1 - ry * ry * x1 * x1) /
                         (rx * rx * y1 * y1 + ry * ry * x1 * x1));
                    if (laf === sf)
                        norm = -norm;
                    x2 = norm * rx * y1 / ry;
                    y2 = norm * -ry * x1 / rx;
                    // step 3
                    cx = Math.cos(xar) * x2 - Math.sin(xar) * y2 + (x + nx) / 2;
                    cy = Math.sin(xar) * x2 + Math.cos(xar) * y2 + (y + ny) / 2;

                    var u = new THREE.Vector2(1, 0),
                        v = new THREE.Vector2((x1 - x2) / rx,
                                              (y1 - y2) / ry);
                    var startAng = Math.acos(u.dot(v) / u.length() / v.length());
                    if (u.x * v.y - u.y * v.x < 0)
                        startAng = -startAng;

                    // we can reuse 'v' from start angle as our 'u' for delta angle
                    u.x = (-x1 - x2) / rx;
                    u.y = (-y1 - y2) / ry;

                    var deltaAng = Math.acos(v.dot(u) / v.length() / u.length());
                    // This normalization ends up making our curves fail to triangulate...
                    if (v.x * u.y - v.y * u.x < 0)
                        deltaAng = -deltaAng;
                    if (!sf && deltaAng > 0)
                        deltaAng -= Math.PI * 2;
                    if (sf && deltaAng < 0)
                        deltaAng += Math.PI * 2;

                    path.absarc(cx, cy, rx, startAng, startAng + deltaAng, sf);
                    x = nx;
                    y = ny;
                    break;
                default:
                    break;//throw new Error("weird path command: " + activeCmd);
            }
            // just reissue the command
            if (canRepeat && nextIsNum())
                continue;
            activeCmd = pathStr[idx++];
        }

        return path;
    }
}
var $d3g = {};
d3threeD($d3g);