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
