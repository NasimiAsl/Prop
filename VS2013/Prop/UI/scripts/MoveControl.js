
var controlType = {
    pointerLock: "PLK",
    floatMouse: "FLT",
    dragMouse: "DRG",
    touch: "TCH"
};

var controls;

var h3, h6, h9;
var fix = 1, append = 2;

function initControls(container, mousepad, touchpad) {
    controls = {
        width: 1024,
        height: 736,
        initialize: function () {
            container.addEventListener('keydown', events.keywords.onKeyDown, false);
            container.addEventListener('keyup', events.keywords.onKeyUp, false);
            container.addEventListener('keyup', events.keywords.onKeyUp, false);
            mousepad.addEventListener('contextmenu', function (event) { event.preventDefault(); events.mouse.contextmenu }, false);
            mousepad.addEventListener('mousedown', events.mouse.onMouseDown, false);
            document.addEventListener('mouseup', events.mouse.onMouseUp, false);
            mousepad.addEventListener('mousewheel', events.mouse.onMouseWheel, false);
            mousepad.addEventListener('DOMMouseScroll', events.mouse.onMouseWheel, false); // firefox
            mousepad.addEventListener('mousemove', events.mouse.onMouseMove, false);

            touchpad.addEventListener('touchstart', events.touch.touchstart, false);
            touchpad.addEventListener('touchend', events.touch.touchend, false);
            touchpad.addEventListener('touchmove', events.touch.touchmove, false);

            controls.width = $(window).width();
            controls.height = $(window).height();


        },
        events: {
            keywords: {
                onKeyDown: function (event) {
                    var op = (iStr.keys
                         .replace(" " + event.keyCode + " ", " ")
                         + " " + event.keyCode + " ")
                         .replace(/  /g, " ");

                    iStr.set({ keys: op });
                },
                onKeyUp: function (event) {
                    var op = (iStr.keys
                         .replace(" " + event.keyCode + " ", " "))
                         .replace(/  /g, " ");

                    iStr.set({ keys: op });
                },
                onKeyPress: function (event) {
                    iStr.set();
                    event.preventDefault();
                },
            },
            mouse: {
                getMouseInfo: function (event, b) {
                    var op = {
                        x: event.clientX,
                        y: event.clientY,
                        ox: iStr.cursor.x,
                        oy: iStr.cursor.x,
                        button: (b ? iStr.cursor.button : event.button)
                    };

                    op.d = Math.sqrt(Math.pow(op.ox - op.x, 2) + Math.pow(op.oy - op.y, 2));

                    return op;
                },
                onContextmenu: function (event) {

                    iStr.set({ cursor: events.mouse.getMouseInfo(event) });

                    event.preventDefault();
                },
                onMouseMove: function (event) {
                    iStr.set({ cursor: events.mouse.getMouseInfo(event, true) });
                },
                onMouseDown: function (event) {
                    iStr.set({ cursor: events.mouse.getMouseInfo(event) });
                },
                onMouseUp: function (event) {
                    iStr.set({ cursor: events.mouse.getMouseInfo(event) });
                    iStr.cursor.button = -1;
                },
                onMouseWheel: function (event) {


                    event.preventDefault();
                    event.stopPropagation();

                    if (event.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9

                        iStr.set({ wheel: event.wheelDelta });

                    } else if (event.detail !== undefined) { // Firefox

                        iStr.set({ wheel: - event.detail });

                    }
                },
            },
            touch: {
                touchstart: function (event) { iStr.set(); },
                touchend: function (event) { iStr.set(); },
                touchmove: function (event) { iStr.set(); }
            },
            geo: {},
        },
        iStr: {
            controlMode: controlType.floatMouse,
            windowsActive: true,
            keys: "",
            cursor: { x: 0, y: 0, button: -1, d: 0, ox: 0, oy: 0, state: function (p) { return "x:" + p.x + " y:" + p.y + " b:" + p.button; } },
            wheel: 0,
            touch: {  /* !under Construction */ },
            set: function (op) {
                if (!op) return;

                if (op.mode)
                    iStr.controlMode = op.mode;
                if (op.windowsActive)
                    iStr.windowsActive = op.windowsActive;
                if (op.keys)
                    iStr.keys = op.keys;
                var stateCursor = iStr.cursor.state;
                if (op.cursor)
                    iStr.cursor = op.cursor;
                if (op.wheel)
                    iStr.wheel = op.wheel;

                iStr.cursor.state = stateCursor;
                if (op.touch)
                    iStr.touch = op.touch;
                if (iStr.onCustomized)
                    iStr.onCustomized(iStr);
                if (iStr.onChange)
                    iStr.onChange(iStr);
            },
            onCustomized: function () { },
            checkKey: function (p, a) {
                if (p.length && p.length > 1) {
                    var pr = a;
                    for (var i = 0; i < p.length; i++) {
                        if (a) pr = pr && iStr.checkKey(p[i]);
                        else pr = pr || iStr.checkKey(p[i]);
                    }

                    return pr;
                }

                if (iStr.keys.indexOf(" " + p + " ") != -1) {
                    return true;
                }
                return false;
            },
            onChange: function () {
                iStr.showState();

                if (iStr.checkKey([107, 187]))
                    controls.normalParameter.height += 2;
                if (iStr.checkKey([109, 189]))
                    controls.normalParameter.height -= 2;



            },
            showState: function () {
                state("mode:" + iStr.controlMode + " " +
                    " active:" + iStr.windowsActive, "mode");
                state(iStr.cursor.state(iStr.cursor), "infic");
                state(iStr.keys, "keys");
                state(iStr.wheel, "wheel");
                state(controls.width + " " + controls.height, "size");
            }
        },

        normalParameter: {
            restriction: true,
            lookAt: new THREE.Vector3(),
            Object: new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial()),
            pitchObject: null,
            yawObject: null,
            moveVelocity: new THREE.Vector3(),
            moveAcceleration: new THREE.Vector3(),
            rotateVelocity: new THREE.Vector3(),
            rotateOldPos: new THREE.Vector3(),
            rotateMode: { x: append, y: fix },
            rotateAcceleration: new THREE.Vector3(),
            height: 126,
            moveForward: function (op, d, h, alpha) {
                var k = helper.rotatePr2({ x: 0, y: 0 }, { x: 0, y: 10 }, op.yawObject.rotation.y);
                var k2 = helper.rotatePr2({ x: 0, y: 0 }, { x: 0, y: 10 }, op.yawObject.rotation.y - alpha * (Math.abs(op.yawObject.rotation.x) > 3 ? -1 : 1));
                var k3 = helper.rotatePr2({ x: 0, y: 0 }, { x: 0, y: 10 }, op.yawObject.rotation.y + alpha * (Math.abs(op.yawObject.rotation.x) > 3 ? -1 : 1));


                return {
                    forward: {
                        x: k.x * d,
                        z: -1 * k.y * d * ((Math.abs(op.yawObject.rotation.x) > 3 ? -1 : 1)),
                        y: h
                    },
                    left: {
                        x: k2.x * d,
                        z: -1 * k2.y * d * ((Math.abs(op.yawObject.rotation.x) > 3 ? -1 : 1)),
                        y: h
                    },
                    right: {
                        x: k3.x * d,
                        z: -1 * k3.y * d * ((Math.abs(op.yawObject.rotation.x) > 3 ? -1 : 1)),
                        y: h
                    }
                };
            },
            fillNormal: function (inputStruct) {
                switch (inputStruct.controlMode) {
                    case controlType.floatMouse:
                        {

                            controls.normalParameter.fillFloatMode(inputStruct);
                            break;
                        }
                }
            },
            fillFloatMode: function (ins) {
                // mouse 
                var op = controls.normalParameter;
                var maxAlpha = Math.PI / 2;
                var alpha = maxAlpha;
                var vp = 1.0;
                if (iStr.checkKey([16]))
                    vp *= 8.0;
                if (iStr.checkKey([17]))
                    vp /= 8.0;


                var absx = function (x, l) {
                    if (x > 0 && x - l > 0) return x - l;
                    if (x < 0 && x + l < 0) return x + l;

                    return 0;
                }


                var result = controls.normalParameter.moveForward(op, 0.3 * vp, 0, alpha);

                if (iStr.checkKey([81])) {
                    op.restriction = false;
                }


                if (iStr.checkKey([27])) {
                    // escape
                    op.restriction = true;
                }


                if (iStr.checkKey([38, 87])) {
                    op.moveVelocity.x = result.forward.x;
                    op.moveVelocity.y = result.forward.y;
                    op.moveVelocity.z = result.forward.z;
                }
                else if (iStr.checkKey([40, 83])) {
                    op.moveVelocity.x = -1 * result.forward.x;
                    op.moveVelocity.y = -1 * result.forward.y;
                    op.moveVelocity.z = -1 * result.forward.z;
                }
                else if (ins.cursor.button == 0 || ins.cursor.button == 2) {

                    op.moveVelocity.x = result.forward.x;
                    op.moveVelocity.y = result.forward.y;
                    op.moveVelocity.z = result.forward.z;

                    if (ins.cursor.button == 2) {
                        op.moveVelocity.x = -1 * result.forward.x;
                        op.moveVelocity.y = -1 * result.forward.y;
                        op.moveVelocity.z = -1 * result.forward.z;
                    }

                    op.moveAcceleration.x = 0.0;// op.moveVelocity.x / 2;
                    op.moveAcceleration.y = 0.0;
                    op.moveAcceleration.z = 0.0;// op.moveVelocity.z / 2;
                }
                else {
                    op.moveVelocity.x = 0;
                    op.moveVelocity.y = 0;
                    op.moveVelocity.z = 0;
                }

                if (iStr.checkKey([37, 65])) { // left
                    // op.rotateVelocity.x =  deg(1);

                    op.moveVelocity.x = result.right.x;
                    op.moveVelocity.y = result.right.y;
                    op.moveVelocity.z = result.right.z;

                }
                else if (iStr.checkKey([39, 68])) { // right
                    op.moveVelocity.x = result.left.x;
                    op.moveVelocity.y = result.left.y;
                    op.moveVelocity.z = result.left.z;
                }
                else {
                    var rx = deg((ins.cursor.x - controls.width / 2) / (600 + (controls.width / 2 - Math.abs(ins.cursor.x - controls.width / 2)) * 2));

                    if (absx(rx, 0.005) != 0) {
                        op.rotateVelocity.x = -1 * rx;
                        op.rotateMode.y = append;

                    }
                    else {
                        op.rotateVelocity.x = -1 * rx * 5;
                        op.rotateMode.y = fix;
                    }
                }


                op.rotateVelocity.z = ((window.innerHeight - (ins.cursor.y - controls.height / 2)) * 0.4) / window.innerHeight - 0.4;
                op.rotateMode.x = fix;

                var fastArea = function () {
                    return Math.abs(ins.cursor.y - controls.height / 2) < 50 && (ins.cursor.x < 50 || controls.width - ins.cursor.x < 50);
                }
                //if (fastArea()) {
                //}
                //else {
                //    op.rotateVelocity.x = ((window.innerWidth - (ins.cursor.x - controls.width / 2)) * 1.5) / window.innerWidth - 1.5;
                //    op.rotateMode.y = fix;
                //} 



            }
        },
        configCamera: function (camera) {

            h3 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshNormalMaterial());
            h3.position.y = 2;
            scene.add(h3);

            h6 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshNormalMaterial());
            h3.position.y = 2;
            scene.add(h6);


            h9 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshNormalMaterial());
            h9.position.y = 2;
            scene.add(h9);

            camera.rotation.set(0, 0, 0);

            controls.normalParameter.pitchObject = new THREE.Object3D();
            controls.normalParameter.pitchObject.add(camera);

            controls.normalParameter.yawObject = new THREE.Object3D();
            controls.normalParameter.yawObject.position.y = 10;
            controls.normalParameter.yawObject.add(controls.normalParameter.pitchObject);

            scene.add(controls.normalParameter.yawObject);

        },
        index: 0,
        update: function (fun, casters) {

            controls.normalParameter.fillNormal(iStr);

            var op = controls.normalParameter;

            var oldYawMove = op.yawObject.position.clone();
            var oldYawRotate = op.yawObject.rotation.clone();

            var oldPicMove = op.pitchObject.position.clone();
            var oldPicRotate = op.pitchObject.rotation.clone();


            op.yawObject.position.x += op.moveVelocity.x;
            op.yawObject.position.y += op.moveVelocity.y;
            op.yawObject.position.z += op.moveVelocity.z;


            if (op.rotateMode.y == append) {
                op.yawObject.rotateY(op.rotateVelocity.x);
                op.rotateOldPos.y = op.yawObject.rotation.y;
            }
            else {
                op.yawObject.rotation.y = op.rotateOldPos.y + op.rotateVelocity.x;
            }

            if (op.rotateMode.x == append) {
                op.pitchObject.rotateX(op.rotateVelocity.z);
                op.rotateOldPos.x = op.yawObject.rotation.x;
            }
            else {
                op.pitchObject.rotation.x = op.rotateOldPos.x + op.rotateVelocity.z;
            }

            op.yawObject.position.y = op.height;


            if (op.moveVelocity.x != 0) op.moveVelocity.x -= op.moveAcceleration.x;

            if (op.moveVelocity.y != 0) op.moveVelocity.y -= op.moveAcceleration.y;

            if (op.moveVelocity.z != 0) op.moveVelocity.z -= op.moveAcceleration.z;

            var undo = function (ol, ol2) {
                if (!op.restriction) return;

                op.yawObject.position.x = ol.x;
                op.yawObject.position.y = ol.y;
                op.yawObject.position.z = ol.z;

                op.pitchObject.position.x = ol2.x;
                op.pitchObject.position.y = ol2.y;
                op.pitchObject.position.z = ol2.z;

                //return;

                var hm1_h = caster.getHeight(0, hm1, function () { return true; });
                var hm2_h = caster.getHeight(0, hm2, function () { return true; });
                var hm3_h = caster.getHeight(0, hm3, function () { return true; });



                fun2 = function (x, y) {
                    if (x > y) return x- (x - y) /2;
                    return x+ (y-x) /2;
                }
                fun3 = function (hs) {
                    op.yawObject.position.x = fun2(op.yawObject.position.x, hs.position.x);
                    op.yawObject.position.y = fun2(op.yawObject.position.y, hs.position.y);
                    op.yawObject.position.z = fun2(op.yawObject.position.z, hs.position.z);
                }

                if (hm2_h > 0 && hm2_h < 50) { 
                    fun3(hm2);
                } else {
                    if ((hm1_h > 0 && hm1_h < 50) && !(hm3_h > 0 && hm3_h < 50)) {
                        fun3(hm1);
                      //  op.pitchObject.rotateZ(Math.PI / 3);
                    }
                    else if (hm3_h > 0 && hm3_h < 50) {
                        fun3(hm3);
                     //   op.pitchObject.rotateZ(-1*Math.PI / 3);
                    }
                }  
            }

            var undoR = function () {

                if (!op.restriction) return;


                op.yawObject.rotation = oldYawRotate.clone();
                op.pitchObject.rotation = oldPicRotate.clone();

            }


            var next = controls.normalParameter.moveForward(op, 1.0, 0, Math.PI / 3);

            hm1.position.set(next.left.x + op.yawObject.position.x, op.height, next.left.z + op.yawObject.position.z);
            hm2.position.set(next.forward.x + op.yawObject.position.x, op.height, next.forward.z + op.yawObject.position.z);
            hm3.position.set(next.right.x + op.yawObject.position.x, op.height, next.right.z + op.yawObject.position.z);




            if (caster.raycasterCallBack) {

                var p2 = { x: op.yawObject.position.x, y: op.yawObject.position.y, z: op.yawObject.position.z };

                var p1 = { x: op.yawObject.position.x, y: op.yawObject.position.y, z: op.yawObject.position.z };
                p1.x += -10 * Math.sin(op.yawObject.rotation.y);
                p1.z += -10 * Math.cos(op.yawObject.rotation.y);


                var u = new THREE.Vector3(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z).normalize();

                try {
                    var st = caster.raycasterCallBack(u, op, function () {
                        return true;//(Math.abs(pMove.x) > 0.02 || Math.abs(pMove.y) > 0.02 || Math.abs(pMove.z) > 0.02);
                    });

                    var h = caster.getHeight(0, op.yawObject, function () { return true; });
                    if (h > 30 && h < 50) {
                        controls.normalParameter.height -= (h - 30) / 3;
                    }
                    else if (h > 0 && h < 30) {
                        controls.normalParameter.height += (30 - h) / 3;
                    }
                    else {
                        undo(oldYawMove, oldPicMove);
                    }


                    if (st[0] + st[1] + st[2] != 0) {

                        if (st[0] + st[1] == 0 || st[2] + st[1] == 0) {

                        }
                        else if (st[2] + st[0] == 0) {
                            // middle stop
                            // undo(pMove);
                        }
                        else if (st[0] == 0) {
                            // undo(pMove);
                        }
                        else if (st[2] == 0) {
                            // undo(pMove);
                        }
                        else {
                            // undo(pMove);
                        }
                    }
                } catch (e) {
                    state('error', "raycaster")
                }
            }

        }
    };

    controls.initialize();
}
$(document).ready(function () {
    initControls(document, $('body')[0], $('body')[0]);
    controls.configCamera(camera);

});


var ry = function () {
    return {
        obstacles: new Array(),
        floors: new Array(),
        step: 60, // گام
        stair: 360, // پله
        raycasterCallBack: function (u, pr, fn) {
            var c = pr.yawObject.position;

            var checkCast = function (pi, desc) {
                if (fn()) {

                    var casterin = new THREE.Raycaster(c, pi, 0, caster.step);

                    var po = casterin.intersectObjects(caster.obstacles);

                    if (po.length > 0) {
                        return po[0].distance;
                    }
                    else {

                    }
                }

                return 0;
            }
            var vc = { x: 0, y: 0, z: 0 };
            var rt = function (x, y, a) {
                return {
                    x: x * Math.cos(a) - y * Math.sin(a),
                    y: x * Math.sin(a) + y * Math.cos(a)
                }
            }
            var vec = function (mi, h) {
                return new THREE.Vector3(mi.x, h, mi.y);
            }
            //

            var al = Math.atan((u.z) / (u.x));
            if ((u.x) == 0) al = Math.PI / 2;

            var m = new Array();

            m[0] = vec(rt(u.x, u.z, Math.PI / 4), 0);
            m[1] = vec(rt(u.x, u.z, 0), 0);
            m[2] = vec(rt(u.x, u.z, -Math.PI / 4), 0);

            return [checkCast(m[0], "f"),
                    checkCast(m[1], "l"),
                    checkCast(m[2], "r")];
        },

        getHeight: function (level, pr, fn) {
            var c = pr.position;

            var checkCast = function (pi) {
                if (fn()) {
                    var casterin = new THREE.Raycaster(c, pi, 0, caster.stair);

                    var po = casterin.intersectObjects(caster.floors[level]);

                    if (po.length > 0) {
                        return po[0].distance;
                    }
                    else {
                    }
                }
                return 0;
            }
            return checkCast({ x: 0, y: -1, z: 0 });
        }
    };

}
var caster = ry();
caster.floors[0] = new Array();
ml = 0;
function render() {

    
    ml += 0.1;
   // geo2.material.uniforms.fl.value = new THREE.Vector3(Math.sin((ml)*Math.PI/180)*2.0, 0.0, 0.0);

    if (!isActiveWindow) return;

    try {

        renderer.gammaInput = true;
        renderer.gammaOutput = true;


        //renderer.autoClear = true;
        //mirrorSphereCamera.updateCubeMap(renderer, scene);
        //renderer.autoClear = false;


        renderer.render(scene, camera);

        if (!doMotions) {
            try { motions(); } catch (e) { }
        }
        doMotions != doMotions;
    } catch (e) { }

}
