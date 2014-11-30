
var qualityMode = 1, canvas, meshes = [];

initViewport = function (container, quality) {

    if (!quality) quality = 1;

    canvas = document.getElementById("renderCanvas");
    // canvas.style.backgroundColor = "#000000";

    qualityMode = quality;
    var q_state = " ... ";
    if (quality && (quality != 1 && quality < 22)) {
         
        var ps = 1.7778;// 16 × 9 
        var W = document.body.offsetWidth;
         
        try {

            if (controls) {
                ps = controls.width / controls.height;
                W = controls.width;
            } 

        } catch (e) { }

        var w = (W) - (2 * quality - 3) * ((W / 3) * 2) / 34.0;
        var h = w / ps;
        if (w < 200) w = 200;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        q_state = " w: " + Math.floor(w) + " h: " + Math.floor(h);
    }

    renderer = new BABYLON.Engine(canvas, true);

    canvas.style.width = '100%';
    canvas.style.height = '100%';

    return q_state;
};
 
initCamera = function () {
    camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 0, -150), scene);
    camera.lowerRadiusLimit = 10;
    camera.minZ = 8.0;
    camera.maxZ = 500000.0;
    camera.fov = 0.5;  

    //camera._update = function (x, y) {


    //  //  if (!controls) controls = {};

    //    var op = controls.inputStructer;

    //    if (op == null) return null;


    //    if ($3d && $3d.actions) {
    //        if ($3d.actions.move) {
    //            for (var i = 0; i < $3d.actions.move.length ; i++) {
    //                if ($3d.actions.move[i] != null) {




    //                    $3d.camera.move($3d.actions.move[i].o, $3d.actions.move[i]);

    //                    $3d.actions.move[i].d = $3d.actions.move[i].d - $3d.actions.move[i].a;

    //                    if (Math.abs($3d.actions.move[i].d) < 0.1) {
    //                        $3d.actions.move[i] = null;
    //                    }
    //                }
    //            }
    //        }
    //        if ($3d.actions.rotate) {
    //            for (var i = 0; i < $3d.actions.rotate.length ; i++) {
    //                if ($3d.actions.rotate[i] != null) {
    //                    $3d.camera.rotate($3d.actions.rotate[i].o, $3d.actions.rotate[i]);

    //                    var k = 0;

    //                    if ($3d.actions.rotate[i].float) {
    //                        if (Math.abs($3d.actions.rotate[i].float.x) >= 0.1) {
    //                            $3d.actions.rotate[i].float.x = $3d.actions.rotate[i].float.x - $3d.actions.rotate[i].a;
    //                        } else k++;
    //                        if (Math.abs($3d.actions.rotate[i].float.y) >= 0.1) {
    //                            $3d.actions.rotate[i].float.y = $3d.actions.rotate[i].float.y - $3d.actions.rotate[i].a;
    //                        } else k++;
    //                        if (Math.abs($3d.actions.rotate[i].float.z) >= 0.1) {
    //                            $3d.actions.rotate[i].float.z = $3d.actions.rotate[i].float.z - $3d.actions.rotate[i].a;
    //                        } else k++;
    //                        if (k == 3) {
    //                            $3d.actions.rotate[i] = null;
    //                        }
    //                    }



    //                }
    //            }
    //        }
    //    }
    //};
};

initScene = function () {
    scene = new BABYLON.Scene(renderer);
    scene.clearColor = new BABYLON.Color4(0.0, 0.0, 0.0, 0.0);
};

refreshViewport = function () {

    //renderer.resize();
};

initAnimate = function () {

    renderer.runRenderLoop(function () {
        if (perRender) perRender();
        if (perSysRender) perSysRender();

        scene.render();
    });
}

initLight = function () {
    if (hemiLight == null || hemiLight == undefined) {
        hemiLight = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
        hemiLight.diffuse = new BABYLON.Color4(0.0, 0.0, 0.0, 0.1);
        hemiLight.groundColor = new BABYLON.Color3(0.13, 0.13, 0.13);
    }

    if (dirLight == null || dirLight == undefined) {
        dirLight = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
        dirLight.diffuse = new BABYLON.Color3(0.9, 0.9, 0.9);
        //  dirLight.specular = new BABYLON.Color3(1, 1, 1); 
    }
}

defShader = function (op) {

    // Compile
    shaderMaterial = new BABYLON.ShaderMaterial("shader", scene, {
        vertexElement: op.v,
        fragmentElement: op.f,
    }, op.u);

    defTextureDefaultPath = '/contents/3d/textures/';
    function defTexture(txop, name) {

        if (!txop) return;

        txop.name = name;

        var tx;

        if (txop.path)
            tx = new BABYLON.Texture(defTextureDefaultPath + txop.path, scene);
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

    defTexture(op.map, "tx1");
    defTexture(op.reflect, "tx2");
    defTexture(op.opacity, "tx3");
    defTexture(op.bump, "tx4");
    defTexture(op.light, "tx5");


    if (!op.alpha) {
        shaderMaterial.needAlphaBlending = function () { return false; };
    }
    else {
        shaderMaterial.needAlphaBlending = function () { return true; };
    };
    if (!op.back) op.back = false;


    shaderMaterial.needAlphaTesting = function () { return true; };

    shaderMaterial.setFloat("time", 0);
    shaderMaterial.setVector3("camera", BABYLON.Vector3.Zero());
    shaderMaterial.setVector3("p1", BABYLON.Vector3.Zero());
    shaderMaterial.setVector3("p2", BABYLON.Vector3.Zero());
    shaderMaterial.setVector3("p3", BABYLON.Vector3.Zero());
    shaderMaterial.setVector2("mouse", BABYLON.Vector2.Zero());

    shaderMaterial.backFaceCulling = !op.back;


    shaderMaterial.onCompiled = function () {
    }
    shaderMaterial.onError = function (sender, errors) {
    };
    return shaderMaterial;
}

initMesh = function (name, geo, scene, updatable) {
    var mesh = new BABYLON.Mesh(name, scene);

    var vertexData = new BABYLON.VertexData();

    vertexData.indices = geo.faces;
    vertexData.positions = geo.positions;
    vertexData.normals = geo.normals;
    vertexData.uvs = geo.uvs;

    BABYLON.VertexData.ComputeNormals(geo.positions, geo.faces, geo.normals);

    vertexData.applyToMesh(mesh, updatable); 

    return mesh;
};

lookAt = function (cam, op) {
    if (!op) return camera._currentTarget;

    camera._currentTarget = new BABYLON.Vector3(op.look.x, op.look.y, op.look.z);
}

raycaster = function (ray, objs) {
    var n = $3d.math.nrm(ray.d);
    var r = new BABYLON.Ray(new BABYLON.Vector3(ray.p.x, ray.p.y, ray.p.z), new BABYLON.Vector3(n.x, n.y, n.z));
    var meshFound = scene.pickWithRay(r, function (item) {
        return true;
    });

    if (meshFound != null && meshFound.pickedPoint != null) {


        return { d: $3d.math.dim(meshFound.pickedPoint, ray.p), o: meshFound.pickedMesh, p: meshFound.pickedPoint };

    }
    return { d: -1 };
}



