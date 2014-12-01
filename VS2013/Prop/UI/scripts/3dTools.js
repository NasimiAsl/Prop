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


        if (op.flip) {
            geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
        }
        else {
            geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
        }

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

        function exch(p) { return (p.x || p.x == 0.0); }
        if (!op.uv) { op.uv = "0123"; }

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


        if (op.flip) {
            geo.faces.push(op.p1Ind, op.p2Ind, op.p3Ind);
            geo.faces.push(op.p2Ind, op.p4Ind, op.p3Ind);
        }
        else {
            geo.faces.push(op.p1Ind, op.p3Ind, op.p2Ind);
            geo.faces.push(op.p2Ind, op.p3Ind, op.p4Ind);
        }

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

    geometryBase: function (firstp, builder, exgeo) {
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

        return exgeo;
    },

    svg: {
        getpoints: function (op) {

            if (!def(op.path)) throw "not found any path";

            op.push = def(op.push, function (result, point) {
                result.push(point);
            });

            op.step = def(op.step, 0.5);

            var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", op.path);

            var len = path.getTotalLength();
            var plen = 0.0
            var s = path.getPointAtLength(0);


            var p = s;
            var c = path.getPointAtLength(op.step);
            plen += op.step;

            var result = [];
            op.push(result, s);

            for (var i = op.step * 2; i < len; i += op.step) {

                var n = path.getPointAtLength(i);
                plen += op.step;

                var m1 = ((c.y - p.y) != 0 ? (c.x - p.x) / (c.y - p.y) : 'nan');
                var m2 = ((n.y - c.y) != 0 ? (n.x - c.x) / (n.y - c.y) : 'nan');

                if (m1 != m2) {
                    if (i == op.step * 2)
                        op.push(result, c);

                    if (plen > def(op.min, 10.)) {
                        op.push(result, n); plen =  0.0;
                    }

                }

                p = c;
                c = n;
            }
            op.push(result, path.getPointAtLength(len));

            return result;
        }
    }
}


// samples

$3d.sampleGeo = function (op) {
    // pre : { p1,p2,p3,p4,p5,p6,p7,p8  }
    var builder = function (pre, geo) {
        $3d.tools.face(geo, pre.p1, pre.p2, pre.p3, pre.p4);
        $3d.tools.face(geo, pre.p1, pre.p2, pre.p3, pre.p4, { flip: 1 });
    };

    return new $3d.geometryInstance($3d.tools.geometryBase(op, builder));
}


$3d.tools.wall = function (op) {
    // pre : { p1,p2 }

    op.d = def(op.d, 1.0);
    op.h = def(op.h, 5.0);


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

    var geo = $3d.tools.geometryBase({ i: 0, n_1: (op.closed ? op.path[op.path.length - 1] : null), n: op.path[0], n1: op.path[1], bu: builder }, builder, op.exgeo);

    if (op.buildGeo) {
        return geo;
    }

    return new $3d.geometryInstance(geo);
}

