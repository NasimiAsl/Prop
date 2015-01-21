
function request(str) {

}

var iStr = {
    windowsActive: true,
    keys: "",
    cursor: { x: 0, y: 0, button: -1, d: 0, ox: 0, oy: 0, state: function (p) { return "x:" + p.x + " y:" + p.y + " b:" + p.button; } },
    wheel: 0,
    touch: {  /* !under Construction */ },
    set: function (op) {
        if (!op) return;

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
    // p:[] a:and |  p:keyCode
    checkKey: function (p, a) {
        if (p.length && p.length > 1) {
            var pr = a;
            for (var i = 0; i < p.length; i++) {
                if (a) pr = pr && iStr.checkKey(p[i]);
                else pr = pr || iStr.checkKey(p[i]);
            }

            return pr;
        }

        if (iStr.keys.trim() == p.toString() || iStr.keys.indexOf(" " + p + " ") != -1) {
            return true;
        }
        return false;
    },
    onChange: function () {
        iStr.showState();
        request(iStr);
    },
    showState: function () {
        state(" active:" + iStr.windowsActive, "mode");
        state(iStr.cursor.state(iStr.cursor), "infic");
        state(iStr.keys, "keys");
        state(iStr.wheel, "wheel");
        if (!def(events.end))
            events.drag.state();
    },
    width: 0,
    height: 0
}


var events = {
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
                oy: iStr.cursor.y,
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
            if (!def(events.drag.end))
                events.drag.curr = { x: event.clientX, y: event.clientY };
            iStr.set({ cursor: events.mouse.getMouseInfo(event, true) });
        },
        onMouseDown: function (event) {
            events.drag.start = { x: event.clientX, y: event.clientY };
            events.drag.st = new Date().getDate();
            events.drag.end = null;
            iStr.set({ cursor: events.mouse.getMouseInfo(event) });
        },
        onMouseUp: function (event) {
            events.drag.end = { x: event.clientX, y: event.clientY };
            iStr.set({ cursor: events.mouse.getMouseInfo(event) });
            events.drag.ed = new Date().getDate();

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
    drag: {
        start: { x: 0, y: 0 },
        st: 0,
        curr: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
        ed: 0,
        len: function () {
            var eg = events.drag;
            return sqrt(pow(eg.curr.x - eg.start.x) + pow(eg.curr.y - eg.start.y));
        },
        time: function () {
            var eg = events.drag;
            return (eg.ed - eg.st);
        },
        len2: function () {
            var eg = events.drag;
            return { x: eg.curr.x - eg.start.x, y: eg.curr.y - eg.start.y };
        },
        lenp: function () {
            var eg = events.drag;
            return { x: (eg.curr.x - eg.start.x) / iStr.width, y: (eg.curr.y - eg.start.y) / iStr.height };
        },
        state: function () {
            var eg = events.drag;
            return state(r_2((eg.curr.x - eg.start.x) / iStr.width) + " " + r_2((eg.curr.y - eg.start.y) / iStr.height) + " " + events.drag.time(), "drag");
        }
    }

}

var eventInitialize = function (container, mousepad, touchpad) {
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

    iStr.height = mousepad.offsetHeight;
    iStr.width = mousepad.offsetWidth;

};

var v = 30;
ps = { x: 0, y: 0, z: 0 };
request = function (istr) {

    var cam = eng1.get().cameras.main;



    if (iStr.checkKey([107, 187])) { cam.target.y += 1; }
    if (iStr.checkKey([109, 189])) { cam.target.y -= 1; }

    if (iStr.checkKey(87)) {
        ps = nrm(sub(cam.position, cam.target));

        ps.y = 0;
        v = 30;
    }

    if (iStr.checkKey(83)) {
        ps = nrm(sub(cam.position, cam.target));

        ps = not(ps);
        ps.y = 0;
        v = 30;
    }

    if (iStr.checkKey(65)) {
        ps = nrm(sub(cam.position, cam.target));

        v = 30;
        ps = r_y(ps, -90*deg);

        ps = not(ps);
        ps.y = 0;
    }

    if (iStr.checkKey(68)) {
        ps = nrm(sub(cam.position, cam.target));

        v = 30;
        ps = r_y(ps, 90 * deg);

        ps = not(ps);
        ps.y = 0;
    }

    v -= 2.1;

    if (v < 0.2) v = 0;




    cam.position.x += ps.x * v / 60;
    cam.position.y += ps.y * v / 60;
    cam.position.z += ps.z * v / 60;

    cam.target.x += ps.x * v / 60;
    cam.target.y += ps.y * v / 60;
    cam.target.z += ps.z * v / 60; 

    if (iStr.checkKey([16, 67], true)) { cam.target.x = 0; cam.target.y = 6.0; cam.target.z = 0; } // shift + c


    //iStr.keys = "";

}


