if (!prop.$3d)
    throw 'Implement Error :look at the Interface.js or read documentation.';

var camera, scene, renderer;
var initViewport,
    refreshViewport,
    initCamera,
    initScene,
    initLight,
    initAnimate,
    perRender,
    perSysRender,
    initMesh,
    onChange,
    lookAt,
    pointerLockElement,
    pointerLockCursor,
    initCollisions,
    raycaster;

var hemiLight, dirLight;
var defShader, defMaterial, defTextureDefaultPath;
var lastLoop = new Date;
var fps;

var checkCool = false;
var coolViewPortIndexer = 0;
var fpslev = 0;
var q_level = 1;
var cool_level = 18;
var titleHelper; 


function cool() {
    titleHelper = document.title;
    cool_level = 1;
    q_level = 1;
    fpslev = 0;
    coolViewPortIndexer = 0;
    checkCool = true;
}

coolViewPort = function () {
    coolViewPortIndexer++;

    fpslev += fps;

    document.title = "cool: " + cool_level;

    if (coolViewPortIndexer % 40 == 0) {
        coolViewPortIndexer == 0.0;

        fpslev = fpslev / 40;

        if (fpslev < 54.0 && cool_level < 17) {
            initViewport(null, ++cool_level);
            qualityMode = cool_level;


            try { refreshMenu(); } catch (e) { };
        } else {
            var state = initViewport(null, cool_level);
            qualityMode = cool_level;
            checkCool = false;

            document.title = "quality : " + cool_level + state;
            setTimeout(function () { document.title = titleHelper; }, 3000);

            try { refreshMenu(); } catch (e) { };
        }

    }
}
var fps_vv;
var ivp = 0;
perSysRender = function () {
    var thisLoop = new Date;
    ivp++;
    fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    if (!fps_vv) fps_vv = document.getElementById('fps_v');
    if (fps_vv && ivp % 30 == 0 ) fps_vv.innerHTML = Math.floor(fps);
    if (checkCool)
        coolViewPort();
}

function renderInitialize() {
    return {
        camera: function () {
            if (initCamera)
                initCamera();
        },
        light: function () {
            if (initLight) initLight();
        },
        scene: function () {
            if (initScene)
                initScene();
        },
        refreshViewport: function () {
            if (refreshViewport)
                refreshViewport();
        },
        viewport: function (container) {
            if (initViewport)
                initViewport(container);
        },

        animate: function () {
            if (perRender) perRender();
            if (initAnimate) initAnimate(); 

            perSysRender();

        },

    };
}
prop.$3d.init = renderInitialize();
pointerLockElement = function () {
    return document.getElementById('pointerLockElement');

}

pointerLockCursor = function () {
    return document.getElementById('lockCursor');
}

var time = 0;

var c_float = 1;
var c_drag = 2;
var move = 0;
var rotate = 1;
var c_mix = 1;
var f_helper = 0;

var controlMode = c_drag;
var p_float = {};
var f_keymode = move;