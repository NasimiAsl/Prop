


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
    onRequestFrame: function (o) { },
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
    this.faces = op.faces;
    this.positions = op.positions;
    this.normals = op.normals;
    this.uvs = op.uvs;
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

$3d.iController = function (op) {

}

$3d.iController.prototype = {
    actions: [],
    onRayCaster: function (op) { },
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
    controller: {},
    get: function () {
        return this.engine.instance;
    },
    start: function () {
        this.engine.start();

        this.material.parent = this.get();
    }
};