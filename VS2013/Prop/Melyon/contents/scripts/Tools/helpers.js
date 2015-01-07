﻿// {path,push,density,pointLength}
function pathToPoint(op) {

    if (!def(op.path)) { op = js(op); }

    if (typeof (op.push.toString().toLowerCase() == "string")) {
        op.push = js('function(r,n){' + op.push + '}');
    }

    if (typeof (op.push.toString().toLowerCase() == "string")) {
        op.density = js(op.density);
    }

    op.pointLength = def(op.pointLength, 80);


    return $3d.tools.svg.getPoints(op);
}

var path_fixedControl = "";

function helperBase() { }

function path_new(at) {
    if (!def(at)) {
        css_r(get('paths_list').childNodes, 'act');
        var sc = create(get('path-tmp').innerHTML);
        css(sc, 'act');
        get('paths_list').appendChild(sc);
        path_load(); pathHelper();
    } else {
        get('paths_list').innerHTML = '';

        var ssc = js(at);

        get('point-name').value = ssc.name;

        _for(ssc.paths, function (it, i) {

            var sit = "{path:'@ph',push:'@ps',density:@dn,pointLength:@pl,inLine:@in}";

            sit = sit.replace('@ph', it.base.path)
            .replace('@ps', it.base.push)
                .replace('@dn', it.base.density)
                .replace('@pl', it.base.pointLength)
                .replace('@in', it.base.inLine);

            css_r(get('paths_list').childNodes, 'act');
            var sc = create(get('path-tmp').innerHTML);
            sc.setAttribute('struct', sit);
            get('paths_list').appendChild(sc);
            path_resetPush();

            doEvent(first('#paths_list > div #__act'), 'click');
            doEvent(first('#path-tabPath'), 'click');
            doEvent(first('#path-tabPush'), 'click');
        })

       

    }
}
function path_build(op) {
    try {
        path_fixed('path');
    } catch (e) { }

    var th = first('.act', null, get('paths_list'));

    if (!def(th)) return;

    var st = def(st, {});

    if (def(st) && def(st.push)) get('path-push').textContent = st.push + path_fixedControl;
    else st.push = get('path-push').textContent + path_fixedControl;

    if (def(st) && def(st.inLine)) setv('path-inLine', !st.inLine);
    else st.inLine = !getv('path-inLine');

    if (def(st) && def(st.density)) get('path-density').textContent = st.density;
    else st.density = get('path-density').textContent;

    if (def(st) && def(st.pointLength)) get('#path-pointLength', th).value = st.pointLength;
    else st.pointLength = get('#path-pointLength', th).value.valueOf() * 1.0;



    if (def(st) && def(st.path)) get('#path-path', th).value = st.path;
    else st.path = get('#path-path', th).value;
    var _st = "{";
    if (def(st.path)) _st += "path:'" + st.path + "',";

    if (def(st.push)) _st += "push:'" + st.push + "',";

    if (def(st.density)) _st += "density:'" + st.density + "',";

    if (def(st.pointLength)) _st += "pointLength:" + st.pointLength + ",";
    if (def(st.inLine)) _st += "inLine:" + st.inLine + ",";

    th.setAttribute('struct', _st + "}");
}
function path_load() {

    var th = first('.act', null, get('paths_list'));

    if (!def(th)) return;

    var st = js(th.getAttribute('struct'));

    // st = def(st, {});

    if (def(st) && def(st.push)) get('path-push').textContent = st.push;

    if (def(st) && def(st.inLine)) setv('path-inLine', !st.inLine);

    //else st.push = get('path-push').textContent;

    if (def(st) && def(st.density)) get('path-density').textContent = st.density;
    // else st.density= get('path-density').textContent ;

    if (def(st) && def(st.pointLength)) get('#path-pointLength', th).value = st.pointLength;
    //  else st.pointLength = get('#path-pointLength', th).value.valueOf()*1.0;

    if (def(st) && def(st.path)) get('#path-path', th).value = st.path;
    //  else st.path = get('#path-path', th).value;

    path_build(st);
}
function pathHelper() {

    if (def(helpers['path']))
        helpers['path'].dispose();

    if (def(helpers['path-step']))
        helpers['path-step'].dispose();

    var points = [];
    var point_script = "{paths:[";

    points = all('#paths_list > div', function (it, i) {
        if (def(it.getAttribute('struct'))) {
            points = join([pathToPoint(it.getAttribute('struct')), points]);
            point_script += "{base:" + it.getAttribute('struct') + "},";
        }

    }, function () {
        point_script += "],name:'" + def(get('point-name') && get('point-name').value, 'unknown') + "'}"; return points;
    });

    helpers['path'] = $3d.tools.wall({
        path: points,
        d: 0.2,
        h: 0.2,
        lr: 'default'
    }).toMesh(sh_phonge({ color: 0x0000ff }), eng1);

    helpers['path-step'] = $3d.tools.wall({
        path: points,
        d: 1.5,
        h: 1.5,
        lr: always,
        front: always,
        back: always,
    }).toMesh('result = vec4(1.0,0.,0.,1.0);', eng1);

    helperBase(point_script);
}

function buildSurface(st, helper) {
    if (def(helper) && def(helpers[helper])) {
        helpers[helper].dispose();
    }
    if (def(helper) && def(helpers[helper + "q"])) {
        helpers[helper + "q"].dispose();
    }

    st = js(st);

    var paths = [];

    if (st.length < 2) return;

    _for(st, function (at) {

        var points = [];
        points = _for(at.paths, function (it, i) {
            if (def(it)) {
                points = join([pathToPoint(it.base), points]);
            }
        }, function () { return points; });
        paths.push(points);

    }, function () {

        helpers[helper] = $3d.tools.surface({ paths: paths, flip: true }).toMesh(mat_block1(0xff0000), eng1);
        if (getv('wire')) {
            helpers[helper].material = mat('result= vec4(1.0,0.,0.,1.0);',eng1);
            helpers[helper].material.wireframe = true;

        }
        else {
            ref = new BABYLON.CubeTexture("/images/skybox/d2/skybox", eng1.get().scene);
            ref.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
            var ref2 = new BABYLON.CubeTexture("/images/skybox/d/skybox", eng1.get().scene);
            ref2.coordinatesMode = BABYLON.Texture.CUBIC_MODE;


            helpers[helper].material.setTexture("refc", ref);
            helpers[helper].material.setTexture("refc2", ref2);
            helpers[helper].material.setMatrix("refmat", ref.getReflectionTextureMatrix());

            helpers[helper + "q"] = $3d.tools.surface({ paths: paths }).toMesh(mat_noise(0xff0000), eng1);

            helpers[helper + "q"].material.setTexture("refc", ref);
            helpers[helper + "q"].material.setTexture("refc2", ref2);
            helpers[helper + "q"].material.setMatrix("refmat", ref.getReflectionTextureMatrix());
        }


    });
}