
var controlType = {
    pointerLock: "PLK",
    floatMouse: "FLT",
    dragMouse: "DRG",
    touch: "TCH"
};

var controls;

var h3, h6, h9;
var fix = 1, append = 2;
var refreshViewPort;
function initControls(container, mousepad, touchpad) {
    controls = {
        width: 1024,
        height: 736,
        initialize: function () {
            container.addEventListener('keydown', controls.events.keywords.onKeyDown, false);
            container.addEventListener('keyup', controls.events.keywords.onKeyUp, false);
            container.addEventListener('keyup', controls.events.keywords.onKeyUp, false);
            mousepad.addEventListener('contextmenu', function (event) { event.preventDefault(); controls.events.mouse.contextmenu }, false);
            mousepad.addEventListener('mousedown', controls.events.mouse.onMouseDown, false);
            document.addEventListener('mouseup', controls.events.mouse.onMouseUp, false);
            mousepad.addEventListener('mousewheel', controls.events.mouse.onMouseWheel, false);
            mousepad.addEventListener('DOMMouseScroll', controls.events.mouse.onMouseWheel, false); // firefox
            mousepad.addEventListener('mousemove', controls.events.mouse.onMouseMove, false);

            touchpad.addEventListener('touchstart', controls.events.touch.touchstart, false);
            touchpad.addEventListener('touchend', controls.events.touch.touchend, false);
            touchpad.addEventListener('touchmove', controls.events.touch.touchmove, false);

            controls.width = $(window).width();
            controls.height = $(window).height();
        },
        events: {
            keywords: {
                onKeyDown: function (event) {
                    var op = (controls.inputStructer.keys
                         .replace(" " + event.keyCode + " ", " ")
                         + " " + event.keyCode + " ")
                         .replace(/  /g, " ");

                    controls.inputStructer.set({ keys: op });
                },
                onKeyUp: function (event) {
                    var op = (controls.inputStructer.keys
                         .replace(" " + event.keyCode + " ", " "))
                         .replace(/  /g, " ");

                    controls.inputStructer.set({ keys: op });
                    event.preventDefault();
                },
                onKeyPress: function (event) {
                    controls.inputStructer.set();
                     event.preventDefault();
                },
            },
            mouse: {
                getLockInfo: function (event) {
                    var movementX = event.movementX ||
                         event.mozMovementX ||
                         event.webkitMovementX ||
                         0;

                    var movementY = event.movementY ||
                        event.mozMovementY ||
                        event.webkitMovementY ||
                        0;
                    return { x: movementX, y: movementY };
                },
                getMouseInfo: function (event, b) {
                    var op = {
                        x: event.clientX,
                        y: event.clientY,
                        ox: controls.inputStructer.cursor.x,
                        oy: controls.inputStructer.cursor.x,
                        button: (b ? controls.inputStructer.cursor.button : event.button),
                        lock: controls.events.mouse.getLockInfo(event)
                    };

                    op.d = Math.sqrt(Math.pow(op.ox - op.x, 2) + Math.pow(op.oy - op.y, 2));

                    return op;
                },
                onContextmenu: function (event) {

                    controls.inputStructer.set({ cursor: controls.events.mouse.getMouseInfo(event) });

                    event.preventDefault();
                },
                onMouseMove: function (event) {
                    controls.inputStructer.set({ cursor: controls.events.mouse.getMouseInfo(event, true) });
                },
                onMouseDown: function (event) {
                    controls.inputStructer.set({ cursor: controls.events.mouse.getMouseInfo(event) });
                },
                onMouseUp: function (event) {
                    controls.inputStructer.set({ cursor: controls.events.mouse.getMouseInfo(event) });
                    controls.inputStructer.cursor.button = -1;
                },
                onMouseWheel: function (event) {


                    event.preventDefault();
                    event.stopPropagation();

                    if (event.wheelDelta !== undefined) { // WebKit / Opera / Explorer 9

                        controls.inputStructer.set({ wheel: event.wheelDelta });

                    } else if (event.detail !== undefined) { // Firefox

                        controls.inputStructer.set({ wheel: - event.detail });

                    }
                },
                pointerLock: {
                    isLocked : false,
                    init: function (canvas) {
                        canvas.requestPointerLock = canvas.requestPointerLock ||
                              canvas.mozRequestPointerLock ||
                              canvas.webkitRequestPointerLock;
                        document.exitPointerLock = document.exitPointerLock ||
                             document.mozExitPointerLock ||
                             document.webkitExitPointerLock;


                        pointerLockElement().onclick = function () {
                            canvas.requestPointerLock();
                        }


                        document.addEventListener('pointerlockchange', controls.events.mouse.pointerLock.lockChangeAlert, false);
                        document.addEventListener('mozpointerlockchange', controls.events.mouse.pointerLock.lockChangeAlert, false);
                        document.addEventListener('webkitpointerlockchange', controls.events.mouse.pointerLock.lockChangeAlert, false);
                    },
                    lockChangeAlert: function () {
                        if (document.pointerLockElement === canvas ||
                            document.mozPointerLockElement === canvas ||
                            document.webkitPointerLockElement === canvas) {
                            //console.log('The pointer lock status is now locked');
                            controls.events.mouse.pointerLock.isLocked = true;
                            refreshMenu();
                          

                        } else {
                            //console.log('The pointer lock status is now unlocked'); 
                            controls.events.mouse.pointerLock.isLocked = false;
                            refreshMenu()


                        }
                    }
                }
            },
            touch: {
                touchstart: function (event) { controls.inputStructer.set(); },
                touchend: function (event) { controls.inputStructer.set(); },
                touchmove: function (event) { controls.inputStructer.set(); }
            },
            geo: {},
            window: {
                onResize: function (event) {
                    controls.width = $(window).width();
                    controls.height = $(window).height();
                      initViewport(null, qualityMode); 
                }
            }
        },
        inputStructer: {
            controlMode: controlType.floatMouse,
            windowsActive: true,
            keys: "",
            key: {
                cond: function (keyCode) { return controls.inputStructer.keys.toString().indexOf(keyCode.toString()) != -1; },
                up: function () { return controls.inputStructer.key.cond(38) || controls.inputStructer.key.cond(87); },
                down: function () { return controls.inputStructer.key.cond(40) || controls.inputStructer.key.cond(83); },
                left: function () { return controls.inputStructer.key.cond(37) || controls.inputStructer.key.cond(65); },
                right: function () { return controls.inputStructer.key.cond(39) || controls.inputStructer.key.cond(68); },
                plus: function () { return controls.inputStructer.key.cond(189) || controls.inputStructer.key.cond(109); },
                minus: function () { return controls.inputStructer.key.cond(187) || controls.inputStructer.key.cond(107); },
                shift: function () { return controls.inputStructer.key.cond(16)  },

            },
            cursor: { x: 0, y: 0, button: -1, d: 0, ox: 0, oy: 0, state: function (p) { return "x:" + p.x + " y:" + p.y + " b:" + p.button; } },
            wheel: 0,
            touch: {  /* !under Construction */ },
            set: function (op) {
                if (!op) return;

                if (op.mode)
                    controls.inputStructer.controlMode = op.mode;
                if (op.windowsActive)
                    controls.inputStructer.windowsActive = op.windowsActive;
                if (op.keys)
                    controls.inputStructer.keys = op.keys;
                var stateCursor = controls.inputStructer.cursor.state;
                if (op.cursor)
                    controls.inputStructer.cursor = op.cursor;
                if (op.wheel)
                    controls.inputStructer.wheel = op.wheel;

                controls.inputStructer.cursor.state = stateCursor;
                if (op.touch)
                    controls.inputStructer.touch = op.touch;
                if (controls.inputStructer.onCustomized)
                    controls.inputStructer.onCustomized(controls.inputStructer);
                if (controls.inputStructer.onChange)
                    controls.inputStructer.onChange(controls.inputStructer);
            },
            onCustomized: function () { },
            checkKey: function (p, a) {
                if (p.length && p.length > 1) {
                    var pr = a;
                    for (var i = 0; i < p.length; i++) {
                        if (a) pr = pr && controls.inputStructer.checkKey(p[i]);
                        else pr = pr || controls.inputStructer.checkKey(p[i]);
                    }

                    return pr;
                }

                if (controls.inputStructer.keys.indexOf(" " + p + " ") != -1) {
                    return true;
                }
                return false;
            },
            onChange: function () {
                try { if (onChange) onChange(); } catch (e) { }
               // controls.inputStructer.showState();
            },
            showState: function () {
                state("mode:" + controls.inputStructer.controlMode + " " +
                    " active:" + controls.inputStructer.windowsActive, "mode");
                state(controls.inputStructer.cursor.state(controls.inputStructer.cursor), "infic");
                state(controls.inputStructer.keys, "keys");
                state(controls.inputStructer.wheel, "wheel");
                state(controls.width + " " + controls.height, "size");
            }
        },


    };

    controls.initialize();
}


$(document).ready(function () {
    initControls(document, $('body')[0], $('body')[0]);

   // controls.events.mouse.pointerLock.init(canvas);

   //// initViewport(null, 3);

   // window.addEventListener('resize', onWindowResize, false);

   //// setTimeout(function () { refreshMenu();}, 500);

   // function onWindowResize(event) {
   //    // controls.events.window.onResize(event);
   // }
});

