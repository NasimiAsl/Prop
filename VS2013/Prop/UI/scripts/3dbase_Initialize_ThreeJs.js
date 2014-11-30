var id = 0;
function createThreeJsEngine() {
    id++;
    var threejs = new $3d.iEngine();
    threejs.id = id;
    threejs.scene = { clearColor: 0x0d4a6f };
    threejs.cameras = { main: new $3d.iCamera() };
    threejs.lights = { hemi: new $3d.iLight(), dir: new $3d.iLight() };
    threejs.renderer = new $3d.iRenderer();
    threejs.postProcess = { /*!!! under construction*/ };


    // initializer

    threejs.onCreateScene = function (o) {
        threejs.instance.scene = new threejs.Scene(threejs.instance.renderer);
        var c = cs(threejs.scene.clearColor);// !!!! convert to color
        threejs.instance.scene.clearColor = new threejs.Color4(c.r, c.g, c.b, def(c.a, 1.0));
    }
    threejs.onCreateCamera = function (o) {
        // !!  build orthographic camera
        var pos = threejs.cameras.main.position;
        threejs.instance.cameras.main = new threejs.FreeCamera("Camera", new threejs.Vector3(pos.x, pos.y, pos.z), threejs.instance.scene);
        threejs.instance.cameras.main.lowerRadiusLimit = 10;
        threejs.instance.cameras.main.minZ = threejs.cameras.main.near;
        threejs.instance.cameras.main.maxZ = threejs.cameras.main.far;
        threejs.instance.cameras.main.fov = threejs.cameras.main.fov;
    }
    threejs.onCreateLights = function (o) {

        if (threejs.lights.hemi != null && threejs.lights.hemi != undefined) {
            var dir = threejs.lights.hemi.dir;
            var dc = cs(threejs.lights.hemi.diffuse);// !!!! convert to color
            var gc = cs(threejs.lights.hemi.ground);// !!!! convert to color

            threejs.instance.lights.hemi = new threejs.HemisphericLight("Hemi0", new threejs.Vector3(dir.x, dir.y, dir.z), threejs.instance.scene);
            threejs.instance.lights.hemi.diffuse = new threejs.Color4(dc.r, dc.g, dc.b, def(dc.a, 1.0));
            threejs.instance.lights.hemi.groundColor = new threejs.Color3(gc.r, gc.g, gc.b);
        }

        if (threejs.lights.dir != null && threejs.lights.dir != undefined) {
            var dir = threejs.lights.dir.dir;
            var dc = cs(threejs.lights.dir.diffuse);// !!!! convert to color
            var gc = cs(threejs.lights.dir.specular);// !!!! convert to color

            threejs.instance.lights.dir = new threejs.HemisphericLight("dir0", new threejs.Vector3(dir.x, dir.y, dir.z), threejs.instance.scene);
            threejs.instance.lights.dir.diffuse = new threejs.Color4(dc.r, dc.g, dc.b, def(dc.a, 1.0));
           // threejs.instance.lights.dir.specular = new threejs.Color3(gc.r, gc.g, gc.b);
        }
    }
    threejs.onCreateRenderer = function (o) {
        var quality = def(threejs.renderer.quality, 1.0);
        threejs.instance.qualityMode = quality;

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

        threejs.instance.renderer = new threejs.Engine(threejs.instance.canvas, true);

        //canvas.style.width = '100%';
        //canvas.style.height = '100%'; 
    }
    threejs.onCreatePostProcess = function (o) { }
    threejs.render = function () { }
    threejs.onFrame = function () { }
    threejs.onStartAnimation = function () {
        var th = this;
        this.instance.renderer.runRenderLoop(function () {
            threejs.onRequestFrame();
            th.instance.scene.render();
        });
    }

    return threejs;
}


// starter


