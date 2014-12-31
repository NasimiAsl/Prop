var id = 0;
function createBabylonJsEngine() {
    id++;
    var babylon = new $3d.iEngine();
    babylon.id = id;
    babylon.scene = { clearColor: [0., 0., 0., 0.0] };
    babylon.cameras = { main: new $3d.iCamera() };
    babylon.lights = { hemi: new $3d.iLight(), dir: new $3d.iLight() };
    babylon.renderer = new $3d.iRenderer();
    babylon.postProcess = { /*!!! under construction*/ };


    // initializer

    babylon.onCreateScene = function (o) {
        babylon.instance.scene = new BABYLON.Scene(babylon.instance.renderer);
        var c = cs(babylon.scene.clearColor);// !!!! convert to color
        babylon.instance.scene.clearColor = new BABYLON.Color4(c.r, c.g, c.b, def(c.a, 1.0));
    }
    babylon.onCreateCamera = function (o) {
        // !!  build orthographic camera
        var pos = babylon.cameras.main.position;
        // babylon.instance.cameras.main = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(pos.x, pos.y, pos.z), babylon.instance.scene);
        babylon.instance.cameras.main = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(pos.x, pos.y, pos.z), babylon.instance.scene);;
        babylon.instance.scene.activeCamera.attachControl(babylon.instance.canvas);

        babylon.instance.cameras.main.lowerRadiusLimit = 10;
        babylon.instance.cameras.main.minZ = babylon.cameras.main.near;
        babylon.instance.cameras.main.maxZ = babylon.cameras.main.far;
        babylon.instance.cameras.main.fov = babylon.cameras.main.fov;
    }
    babylon.onCreateLights = function (o) {

        if (babylon.lights.hemi != null && babylon.lights.hemi != undefined) {
            var dir = babylon.lights.hemi.dir;
            var dc = cs(babylon.lights.hemi.diffuse);// !!!! convert to color
            var gc = cs(babylon.lights.hemi.ground);// !!!! convert to color

            babylon.instance.lights.hemi = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(dir.x, dir.y, dir.z), babylon.instance.scene);
            babylon.instance.lights.hemi.diffuse = new BABYLON.Color4(dc.r, dc.g, dc.b, def(dc.a, 1.0));
            babylon.instance.lights.hemi.groundColor = new BABYLON.Color3(gc.r, gc.g, gc.b);
        }

        if (babylon.lights.dir != null && babylon.lights.dir != undefined) {
            var dir = babylon.lights.dir.dir;
            var dc = cs(babylon.lights.dir.diffuse);// !!!! convert to color
            var gc = cs(babylon.lights.dir.specular);// !!!! convert to color

            babylon.instance.lights.dir = new BABYLON.HemisphericLight("dir0", new BABYLON.Vector3(dir.x, dir.y, dir.z), babylon.instance.scene);
            babylon.instance.lights.dir.diffuse = new BABYLON.Color4(dc.r, dc.g, dc.b, def(dc.a, 1.0));
            // babylon.instance.lights.dir.specular = new BABYLON.Color3(gc.r, gc.g, gc.b);
        }
    }
    babylon.onCreateRenderer = function (o) {
        var quality = def(babylon.renderer.quality, 1.0);
        babylon.instance.qualityMode = quality;

        //if (quality && (quality != 1 && quality < 22)) {

        //    var ps = 1.7778;// 16 × 9 
        //    var W = document.body.offsetWidth;

        //    try {

        //        if (controls) {
        //            ps = controls.width / controls.height;
        //            W = controls.width;
        //        }

        //    } catch (e) { }

        //    var w = (W) - (2 * quality - 3) * ((W / 3) * 2) / 34.0;
        //    var h = w / ps;
        //    if (w < 200) w = 200;
        //    canvas.style.width = w + 'px';
        //    canvas.style.height = h + 'px'; 
        //}

        babylon.instance.renderer = new BABYLON.Engine(babylon.instance.canvas, true);

        //canvas.style.width = '100%';
        //canvas.style.height = '100%'; 
    }
    babylon.onCreatePostProcess = function (o) { }
    babylon.render = function () { }
    babylon.onFrame = function () { }
    babylon.onStartAnimation = function () {
        var th = this;
        this.instance.renderer.runRenderLoop(function () {

            babylon.onRequestFrame();
            th.instance.scene.render();
        });
    }

    return babylon;
}

function toBabylonGeometry(op) {
    var vertexData = new BABYLON.VertexData();

    vertexData.indices = op.faces;
    vertexData.positions = op.positions;
    vertexData.normals = op.normals;
    vertexData.uvs = op.uvs;

    return vertexData;
}

function fromBabylonGeometry(op, ref) {
    ref.faces = op.indices;
    ref.positions = op.positions;
    ref.normals = op.normals;
    ref.uvs = op.uvs;

    return ref;
}

// {geo,scene}
function buildBabylonMesh(op) {

    var geo = toBabylonGeometry(op.geo);

    var mesh = new BABYLON.Mesh('def', op.scene);

    geo.normals = def(geo.normals, [])
    try {
        BABYLON.VertexData.ComputeNormals(geo.positions, geo.indices, geo.normals);
    } catch (e) {

        //for (index = 0; index < geo.indices.length  ; index += 3) {

        //    try {
        //        var a = { x: geo.positions[geo.indices[index]], y: geo.positions[geo.indices[index] + 1], z: geo.positions[geo.indices[index] + 2] };
        //        var b = { x: geo.positions[geo.indices[index + 1]], y: geo.positions[geo.indices[index + 1] + 1], z: geo.positions[geo.indices[index + 1] + 2] };
        //        var c = { x: geo.positions[geo.indices[index + 2]], y: geo.positions[geo.indices[index + 2] + 1], z: geo.positions[geo.indices[index + 2] + 2] };

        //        var n = new vec3(a, b).pageNormal(a, b, c).normal();

        //        geo.normals[index] = n.d.x;
        //        geo.normals[index + 1] = n.d.y;
        //        geo.normals[index + 2] = n.d.z;
        //    }
        //    catch (e) {
        //        geo.normals[index] = 0;
        //        geo.normals[index + 1] = 1;
        //        geo.normals[index + 2] = 0;
        //    }
        //}
    }

    geo.applyToMesh(mesh, false);

    return mesh;
}

function createBabylonJsGeometry() {
    var babylon = new $3d.iGeometry();
    babylon.onRequestMesh = function (op) {
        return buildBabylonMesh(op);
    };
    return babylon;
}

function defTexture(op, im) {
    var defTextureDefaultPath = '/images/textures/';
    if (im.mirror) {
        im.dir = def(im.dir, { x: 0, y: -1, z: 0 });
        im.ref = def(im.ref, -5);

        var tx = new BABYLON.MirrorTexture("mirror", 1024, eng1.get().scene, true);
        tx.mirrorPlane = new BABYLON.Plane(im.dir.x, im.dir.y, im.dir.z, im.ref);
        tx.renderList = im.list;
        return tx;
    }
    else {
        var tx = new BABYLON.Texture(defTextureDefaultPath + im.path, op.scene);
        return tx;
    }
}
// { vفط:vertex,frg:fragment,helper,u:uniform,map:{path:'sample.jpg',} , alpha , back}
function defShader(op, im) {
     // im.alpha = true;
    // Compile


    if (def(mgop)) {

        im.alpha = def(im.alpha, def(mgop.alpha, false));
        im.back = def(im.alpha, def(mgop.back, false));

        if (!def(mgop.fix)) { mgop = null; }
    }

    shaderMaterial = new BABYLON.ShaderMaterial("shader", op.scene, {
        vertexElement: im.shader.vtx,
        fragmentElement: im.shader.frg,
    }, im.shader.u);

    defTextureDefaultPath = '/images/textures/';
    function defTexture(txop, name) {

        if (!txop) return;

        txop.name = name;

        var tx;

        if (txop.path)
            tx = new BABYLON.Texture(defTextureDefaultPath + txop.path, op.engine.scene);
        if (txop.w) {
            tx.wrapU = txop.w;
            tx.wrapV = txop.w;
        }

        txop.hasAlpha = true;

        shaderMaterial.setTexture(txop.name, tx);

        if (txop.r || (txop.rx && txop.ry)) {
            if (txop.r) {
                txop.rx = txop.r;
                txop.ry = txop.r;
            }

            shaderMaterial.setVector2(txop.name + "_r", new BABYLON.Vector2(txop.rx, txop.ry));
        }

    }

    //defTexture(im.map, "tx1");
    //defTexture(im.reflect, "tx2");
    //defTexture(im.opacity, "tx3");
    //defTexture(im.bump, "tx4");
    //defTexture(im.light, "tx5");


    if (!im.alpha) {
        shaderMaterial.needAlphaBlending = function () { return false; };
    }
    else {
        shaderMaterial.needAlphaBlending = function () { return true; };
    };
    if (!im.back) im.back = false;


    shaderMaterial.needAlphaTesting = function () { return true; };

    shaderMaterial.setFloat("time", 0);
    shaderMaterial.setVector3("camera", BABYLON.Vector3.Zero());
    shaderMaterial.setVector3("p1", BABYLON.Vector3.Zero());
    shaderMaterial.setVector3("p2", BABYLON.Vector3.Zero());
    shaderMaterial.setVector3("p3", BABYLON.Vector3.Zero());
    shaderMaterial.setVector2("mouse", BABYLON.Vector2.Zero());

    shaderMaterial.backFaceCulling = !im.back;


    shaderMaterial.onCompiled = function () {
    }
    shaderMaterial.onError = function (sender, errors) {
    };
    return shaderMaterial;
}

function createBabylonJsMaterial() {
    var im = new $3d.iMaterial();

    im.onCreateTexture = function (op, im) {
        return defTexture(op, im);
    };
    im.onCreateStandardMaterial = function (op, im) {
        var mat = new BABYLON.StandardMaterial('dfwd', op.scene);

        im.map = def(im.map, {});
        im.standard = def(im.standard, {});


        var ccolor = function (ci) {
            var cc = cs(ci);
            var color = new BABYLON.Color3(cc.r, cc.g, cc.b);
            return color;
        }
        if (def(im.standard.alpha)) mat.alpha = im.standard.alpha;
        if (def(im.standard.ambient)) mat.ambientColor = ccolor(im.standard.ambient);
        if (def(im.map.ambient)) mat.ambientTexture = im.onCreateTexture(op, im.map.ambient);
        if (def(im.standard.diffuse)) mat.diffuseColor = ccolor(im.standard.diffuse);
        if (def(im.map.diffuse)) mat.diffuseTexture = im.onCreateTexture(op, im.map.diffuse);
        if (def(im.standard.emissive)) mat.emissiveColor = ccolor(im.standard.emissive);
        if (def(im.map.emissive)) mat.emissiveTexture = im.onCreateTexture(op, im.map.emissive);
        if (def(im.standard.specular)) mat.specularColor = ccolor(im.standard.specular);
        if (def(im.standard.specularPower)) mat.specularPower = 1 / (im.standard.specularPower + 0.0000001);
        if (def(im.map.specular)) mat.specularTexture = im.onCreateTexture(op, im.map.specular);
        if (def(im.standard.wireframe)) mat.wireframe = ccolor(im.standard.wireframe);
        if (def(im.standard.back)) mat.backFaceCulling = ccolor(im.standard.back);

        if (def(im.map.reflect)) mat.reflectionTexture = im.onCreateTexture(op, im.map.reflect);
        if (def(im.map.bump)) mat.bumpTexture = im.onCreateTexture(op, im.map.bump);

        return mat;
    };
    im.onCreateShader = function (op, im) {
        return defShader(op, im)
    };
    im.onSetUniformsData = function (d) {

    };

    return im;
}

