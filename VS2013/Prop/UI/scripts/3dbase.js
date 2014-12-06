

var $3d = function (op) {
    this.engine = def(op.engine, this.engine);
    this.geometry = def(op.geometry, this.geometry);

}

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
    position: { x: 0, y: 20, z: -1350 },
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
    scene: { clearColor: 0x00000099 },
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
    toMesh: function (eng) {
        return eng.geometry.onRequestMesh({ scene: eng.engine.instance.scene, geo: this });
    }
}

$3d.iController = function (op) {
}

$3d.iController.prototype = {
    onRayCaster: function (op) { }, 
}

$3d.prototype = {
    material: {},
    geometry: new $3d.iGeometry(),
    engine: new $3d.iEngine(),
    controller: {}
};