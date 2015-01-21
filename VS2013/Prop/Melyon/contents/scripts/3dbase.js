


var $3d = function (op) {
    this.engine = def(op.engine, this.engine);
    this.geometry = def(op.geometry, this.geometry);
    this.material = def(op.material, this.material);

}

$3d.current = {
    engine: null,
};

$3d.iLight = function (op) {
};

$3d.iLight.prototype = {
    diffuse: 0x909090,
    ground: 0x131313,
    specular: 0x000000,
    dir: { x: 0, y: 1, z: 0 }
};

$3d.iRenderer = function (op) {
}

$3d.iRenderer.prototype = {
    container: null,
    quality: 1
};

$3d.iCamera = function (op) {
}

$3d.iCamera.prototype = {
    position: { x: 0, y: 18, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    up: { x: 0, y: 1, z: 0 },
    near: 0.0,
    far: 500000.0,
    fov: 0.5,
    orthographic: false
};

$3d.iEngine = function (op) {
    op = def(op, {});
    op.canvas = def(op.canvas, null);

    this.instance = {
        scene: {},
        cameras: { main: {} },
        lights: { hemi: {}, dir: {} },
        renderer: {},
        canvas: null,
        qualityMode: 1
    },
    this.instance.canvas = op.canvas;
}

$3d.iEngine.prototype = {
    scene: { clearColor: 0x00000000 },
    cameras: { main: new $3d.iCamera() },
    lights: { hemi: new $3d.iLight(), dir: new $3d.iLight() },
    renderer: new $3d.iRenderer(),
    postProcess: { /*!!! under construction*/ },
    instance: {},
    // delegates
    onCreateScene: function (o) { throw 'non implementation scene.'; },
    onCreateCamera: function (o) { throw 'non implementation Camera.'; },
    onCreateLights: function (o) { throw 'non implementation Lights.'; },
    onCreateRenderer: function (o) { throw 'non implementation Renderer.'; },
    onCreatePostProcess: function (o) { },
    onInitScene: function (l1) { },
    onStartAnimation: function (o) {
        this.onFrame();
    },
    render: function () {
        this.instance.renderer.render(this.instance.scene, this.instance.cameras.main);
    },
    onFrame: function () {
        requestAnimationFrame(this.onFrame);
        this.onRequestFrame(o);
        this.render();
    },
    onRequestFrame: function (o) {

    },
    start: function (o) {
        this.onCreateRenderer(o);
        this.onCreateScene(o);
        this.onCreateCamera(o);
        this.onCreateLights(o);
        this.onInitScene(this);

        this.onCreatePostProcess(o);
        this.onStartAnimation(o);
    }
};

$3d.iGeometry = function (op) {
}
$3d.iGeometry.prototype = {
    onRequestMesh: function (op) { }
}

$3d.geometryInstance = function (op) {
    op = def(op, {});
    this.faces = def( op.faces , []);
    this.positions = def(op.positions,[]);
    this.normals = def(op.normals,[]);
    this.uvs = def(op.uvs,[]);
}

$3d.geometryInstance.prototype = {
    faces: {},
    positions: {},
    normals: {},
    uvs: {},
    // { alpha, diffuse , ambient , emissive , specular , specularPower , wireframe , back  } {shader:{vtx,frg,helper} {map:{...}}}
    toMesh: function (mat, eng) {
        if (!def(eng)) {
            eng = mat;
            mat = null;
        }

        var mesh = eng.geometry.onRequestMesh({ scene: eng.engine.instance.scene, geo: this });
        if (!def(mat)) return mesh;

        if (def(mat.shader)) {

            mat.engine = eng;
            mesh.material = new $3d.iMaterial(mat).build();
        }
        else {
            mesh.material = new $3d.iMaterial($3d.mat.frg(mat), eng).build();
        }
        return mesh;
    }
}



$3d.iMove = function (op) {
}
$3d.iMove.prototype = {
    dir: {}, look: {}, objects: [], velocity: 1.0, acceleration: 1.0,
    onChanges: function () { }
};
$3d.iRotate = function (op) {
}
$3d.iRotate.prototype = {
    dir: {}, center: {}, look: {}, objects: [], velocity: 1.0, acceleration: 1.0,
    onChanges: function () { }
};

// {objs:[], v_m : move , v_r :rotate,v_r_t: rt target , a_m : accse.. ,... }
$3d.iAction = function (op) {
    if (!def(op) && !def(op.bojs)) return null;

    this.v_m = def(op.v_m, { x: 0, y: 0, z: 0 });
    this.a_m = def(op.a_m, { x: 0.1, y: 0.1, z: 0.1 });
    this.v_r = def(op.v_r, { x: 0, y: 0, z: 0 });
    this.a_r = def(op.a_r, { x: 0.1, y: 0.1, z: 0.1 });
    this.v_r_t = def(op.v_r_t, { x: 0, y: 0, z: 0 });
    this.a_r_t = def(op.a_r_t, { x: 5, y: 5, z: 5 });
    this.r_c = def(op.r_c, { x: 0, y: 0, z: 0 });

    this.objs = def(op.objs, []);
}
$3d.iAction.prototype = {
    v_m: { x: 0, y: 0, z: 0 },
    a_m: { x: 0, y: 0, z: 0 },
    v_r_t: { x: 0, y: 0, z: 0 },
    a_r_t: { x: 0, y: 0, z: 0 },
    v_r: { x: 0, y: 0, z: 0 },
    a_r: { x: 0, y: 0, z: 0 },
    r_c: { x: 0, y: 0, z: 0 },
    objs: [],
    getNewPosition: function () {

        var pos = { x: 0, y: 0, z: 0 };

        function cp(c) { return c.x != 0 || c.y != 0 || c.z != 0; }

        if (cp(this.v_m)) {
            pos = add(pos, this.v_m);
        }

        return pos;
    },
    getNewRotation: function () {

        var rot = { x: 0, y: 0, z: 0 };

        function cp(c) { return c.x != 0 || c.y != 0 || c.z != 0; }

        if (cp(this.v_r)) {
            rot = add(rot, this.v_r);
        }
        return rot;
    },
    acceleration: function () {

        function cp(c) { return c.x != 0 || c.y != 0 || c.z != 0; }

        function a1(v, a) {
            var nv = { x: v.x, y: v.y, z: v.z };
            if (v.x != 0) { nv.x = v.x - (v.x / abs(v.x)) * a.x; if (nv.x * v.x < 0) nv.x = 0.0; }
            if (v.y != 0) { nv.y = v.y - (v.y / abs(v.y)) * a.y; if (nv.y * v.y < 0) nv.y = 0.0; }
            if (v.z != 0) { nv.z = v.z - (v.z / abs(v.z)) * a.z; if (nv.z * v.z < 0) nv.z = 0.0; }

            return nv;
        }

        function lt(p) {
            if (abs(p.x) < 0.05) p.x = 0.0;
            if (abs(p.y) < 0.05) p.y = 0.0;
            if (abs(p.z) < 0.05) p.z = 0.0;

            return p;
        }

        if (cp(this.v_m) && cp(this.a_m))
            this.v_m = a1(this.v_m, this.a_m);

        if (cp(this.v_r) && cp(this.a_r))
            this.v_r = a1(this.v_r, this.a_r);

        if (cp(this.v_r_t) && cp(this.a_r_t))
            this.v_r_t = a1(this.v_r_t, this.a_r_t);

        this.v_m = lt(this.v_m);
        this.v_r = lt(this.v_r);
        this.v_r_t = lt(this.v_r_t);

        if (!cp(this.v_m) && !cp(this.v_r) && !cp(this.v_r_t))
        { this.deactive = true; this.end(); }

        return !this.deactive;
    },
    end: function () { },
    deactive: false,
    doNext: function (raycast, collision) {
        if (this.deactive) return;
        function cp(c) { return c.x != 0 || c.y != 0 || c.z != 0; }

        var th = this;
        var pos = th.getNewPosition();
        var rot = th.getNewRotation();

        if (!cp(pos) && !cp(rot)) return;

        //function posrt(th, pos) {
        //    var ps = { x: pos.x, y: pos.y, z: pos.z };
        //    if (cp(th.v_r) && cp(th.r_c)) {

        //        if (th.v_r.x != 0) ps = r_x(ps, th.v_r.x, th.r_c);
        //        if (th.v_r.y != 0) ps = r_y(ps, th.v_r.y, th.r_c);
        //        if (th.v_r.z != 0) ps = r_z(ps, th.v_r.z, th.r_c);
        //    } else return null;

        //    return ps;
        //}

        return _each(this.objs, function (obj, i) {


            if (cp(pos) && raycast(obj, pos)) {
                obj.position.x += pos.x;
                obj.position.y += pos.y;
                obj.position.z += pos.z;

                if (def(obj.target)) {
                    obj.target.x += pos.x;
                    obj.target.y += pos.y;
                    obj.target.z += pos.z;
                }

            }
            else { collision(obj, pos); }

            //if (def(psr) && raycast(obj, psr)) {

            //    obj.position.x += psr.x;
            //    obj.position.y += psr.y;
            //    obj.position.z += psr.z;
            //    if (def(obj.target)) {
            //        obj.target.position.x += pos.x;
            //        obj.target.position.y += pos.y;
            //        obj.target.position.z += pos.z;
            //    }

            //} else { collision(obj, psr); }


            if (cp(rot) && def(obj.rotation)) {
                obj.rotation.x += rot.x * deg;
                obj.rotation.y += rot.y * deg;
                obj.rotation.z += rot.z * deg;
            }

            if (def(obj.target) && cp(th.v_r_t)) {
                var ps = add({ x: 0, y: 0, z: 0 }, obj.target );
                if (th.v_r_t.x != 0) ps = r_x(ps, obj.position, this.v_r_t.x);
                if (th.v_r_t.y != 0) ps = r_y(ps, obj.position, this.v_r_t.y);
                if (th.v_r_t.z != 0) ps = r_z(ps, obj.position, this.v_r_t.z);

                if (cp(ps)) {
                    obj.target.x += ps.x;
                    obj.target.y += ps.y;
                    obj.target.z += ps.z;
                }
            }

        }, function () {
            return th.acceleration();
        });
    }
};


$3d.iController = function (op) {

}

$3d.iController.prototype = {
    actions: [],
    addAction: function (ac) {
        this.actions.push(ac);
    },
    requestNextAction: function (eng) {
        var th = this;
        _each(this.actions, function (ac, i) {
            if (def(ac)) {
                var rs = ac.doNext(th.onRayCaster, th.onCollision);
                if (!rs) ac == null;
            }
        }, function () {
            var acts = [];
            th.actions = _each(th.actions, function (ac, i) {
                if (def(ac)) acts.push(ac);
            }, function () { return acts; });
        });
    },
    onRayCaster: function (obj, dir) { return true; },
    onCollision: function (obj, dir) { }
}

$3d.iShaderUniformData = function (op, dlg) {
    this.requestUpdate = dlg;
    this.set(op);
}
$3d.iShaderUniformData.prototype = {
    time: 0,
    camera: { pos: { x: 0, y: 0, z: 0 }, dir: { x: 0, y: 0, z: 0 } },
    points: [],
    mouse: { x: 0, y: 0 },
    requestUpdate: function (d) { },
    set: function (op) {
        if (def(op.time)) this.time = op.time;
        if (def(op.camera)) this.camera.pos = op.camera;
        if (def(op.dir)) this.camera.dir = op.dir;
        if (def(op.points)) this.points = op.points;
        if (def(op.point)) this.points.push(op.point);
        if (def(op.mouse)) this.mouse = op.mouse;

        this.requestUpdate(this);
    }
};

$3d.iMaterial = function (op, eng) {

    op = def(op, {});

    this.shader = def(op.shader) ? op.shader : null;
    this.standard = def(op.shader) ? null : op;
    this.map = def(op.map) ? op.map : null;

    if (def(eng))
        op.engine = def(op.engine, eng);

    if (!def(op.engine)) return;

    this.parent = op.engine

    this.onCreateShader = op.engine.material.onCreateShader;
    this.onCreateStandardMaterial = op.engine.material.onCreateStandardMaterial;
    this.onSetUniformsData = op.engine.material.onSetUniformsData;
    this.onCreateTexture = op.engine.material.onCreateTexture;
}

$3d.iMaterial.prototype = {
    standard: { alpha: 1.0, diffuse: 0x999999ff, ambient: 0xff0000ff, emissive: 0xff0000ff, specular: 0xffff00ff, specularPower: 1, wireframe: false, back: false },
    map: { reflect: null, bump: null, diffuse: null, ambient: null, emissive: null, specular: null },
    shader: { vtx: '', frg: '', helper: '', data: '' },
    onCreateTexture: function (op, im) { },
    onCreateStandardMaterial: function (op, im) { },
    onCreateShader: function (op, im) { },
    onSetUniformsData: function (d) { },
    parent: null,
    build: function () {
        if (this.shader)
            return this.onCreateShader(this.parent.get(), this);
        else
            return this.onCreateStandardMaterial(this.parent.get(), this);
    }
};

$3d.prototype = {
    material: new $3d.iMaterial(),
    geometry: new $3d.iGeometry(),
    engine: new $3d.iEngine(),
    controller: new $3d.iController(),
    get: function () {
        return this.engine.instance;
    },
    start: function (o) {
        this.engine.start(o);
        this.material.parent = this.get();
    }
};