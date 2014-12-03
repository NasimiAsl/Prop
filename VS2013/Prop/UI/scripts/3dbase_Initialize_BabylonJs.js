var id = 0;
function createBabylonJsEngine() {
    id++;
    var babylon = new $3d.iEngine();
    babylon.id = id;
    babylon.scene = { clearColor: [0., 0., 0., 0.5] };
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
        babylon.instance.cameras.main = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(pos.x, pos.y, pos.z), babylon.instance.scene);
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

        for (index = 0; index < geo.indices.length  ; index += 3) {

            try {
                var a = { x: geo.positions[geo.indices[index]], y: geo.positions[geo.indices[index] + 1], z: geo.positions[geo.indices[index] + 2] };
                var b = { x: geo.positions[geo.indices[index + 1]], y: geo.positions[geo.indices[index + 1] + 1], z: geo.positions[geo.indices[index + 1] + 2] };
                var c = { x: geo.positions[geo.indices[index + 2]], y: geo.positions[geo.indices[index + 2] + 1], z: geo.positions[geo.indices[index + 2] + 2] };

                var n = new vec3(a, b).pageNormal(a, b, c).normal();

                geo.normals[index] = n.d.x;
                geo.normals[index + 1] = n.d.y;
                geo.normals[index + 2] = n.d.z;
            }
            catch (e) {
                geo.normals[index] = 0;
                geo.normals[index + 1] = 1;
                geo.normals[index + 2] = 0;
            }
        }
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



