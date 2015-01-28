// {path,push,density,pointLength}
function pathToPoint(op) {

    if (!def(op.path)) { op = js(op); }

    if (typeof (op.push.toString().toLowerCase() == "string")) {
        op.push = js('function(r,n,e){' + op.push + ' return r;}');
    }

    if (typeof (op.push.toString().toLowerCase() == "string")) {
        op.density = js(op.density);
    }

    op.pointLength = def(op.pointLength, 80);


    return $3d.tools.svg.getPoints(op);
}

var path_fixedControl = "";
var path_sel = 10;
var path_sel_mode = 0;

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

        get('paths_list').setAttribute('walloption', def(ssc.walloption, '{left:true,afb:true,top:true,left:true,h:35,d:1.0}'));
        loadWallOption();

        get('path-befor').textContent = ssc.befor;
        get('path-rest').textContent = ssc.rest;
        get('path-after').textContent = ssc.after;

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




        });

        doEvent(first('#paths_list > div #__act'), 'click');
        doEvent(first('#path-tabPath'), 'click');
        doEvent(first('#path-tabPush'), 'click');
        path_resetPush();

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
function doCustomOnPath(points, befor, rest, after, r) {
    var result = [];
    var bef = js('function(r,p,i){ ' + befor + ' if(def(isIn) && isIn ) r.push({x:p.x,y:p.y,z:p.z,j:i});}');
    var res = js('function(p,i,j){ ' + rest + ' return def(isIn,false); }');
    var aft = js('function(r,p,i){ ' + after + '  r.push({x:p.x,y:p.y,z:p.z,j:p.j,hgt:p.hgt});}');

    var loop = _each;
    if (def(r, false)) loop = _each_r;

    var new_points = loop(points, function (ap, ii) {
        bef(result, ap, ii);
    }, function () {
        return result;
    });
    result = [];
    var last_points = loop(new_points, function (ap, ii) {
        aft(result, ap, ii);
    }, function () {
        return result;
    });

    return { points: last_points, rest: res };
}
function getCurrentPointsBeforRestrict() {

    var points = [], pis = [];
    var point_script = "{paths:[";

    pis = all('#paths_list > div', function (it, i) {
        if (def(it.getAttribute('struct'))) {
            points = join([pathToPoint(it.getAttribute('struct')), points]);
            point_script += "{base:" + it.getAttribute('struct') + "},";
        }
    }, function () {
        point_script += "],name:'" + def(get('point-name') && get('point-name').value, 'unknown') + "',after:'" + get('path-after').textContent + "',rest:'" + get('path-rest').textContent + "',befor:'" + get('path-befor').textContent + "',walloption:'" + get('paths_list').getAttribute('walloption') + "'}"; return points;
    });


    points = doCustomOnPath(pis, get('path-befor').textContent, get('path-rest').textContent, get('path-after').textContent);

    get('path-befor-curr').setAttribute('max', pis.length);
    get('path-rest-curr').setAttribute('max', points.points.length);
    get('path-after-curr').setAttribute('max', points.points.length);

    return { points: points.points, orginal: pis, rest: points.rest, script: point_script }
}

function getCurrentPoints_mainStruct(str, id, pointedScript) {

    var points = [];
    var point_script = "";

    if (def(id) && def($3d.tools.cache.getItem('point_' + id))) {
        points = $3d.tools.cache.getItem('point_' + id);
    } else {

        points = _each(str.paths, function (it, i) {
            points = join([pathToPoint(it.base), points]);

        }, function () {
            return points;
        });
        if (def(id))
            $3d.tools.cache.getItem('point_' + id, points);
    }

    if (pointedScript) {
        point_script = JSON.stringify(points);
    }

    points = doCustomOnPath(points, str.befor, str.rest, str.after);

    return { points: points.points, rest: points.rest, script: point_script }
}

function pathHelper() {

    path_fixedControl = "";
    getWallOption();
    if (def(helpers['path']))
        helpers['path'].dispose();

    if (def(helpers['path-step']))
        helpers['path-step'].dispose();

    if (def(helpers['path-sel']))
        helpers['path-sel'].dispose();
    if (def(helpers['path-org']))
        helpers['path-org'].dispose();

    var ps = getCurrentPointsBeforRestrict();

    helpers['path'] = $3d.tools.wall({
        path: ps.points,
        d: 0.2,
        h: 0.2,
        lr: function (p) { return ps.rest(p, p.i, p.n.j.valueOf() * 1.0); },
        left: function (p) { return ps.rest(p, p.i, p.n.j.valueOf() * 1.0); },
        right: function (p) { return ps.rest(p, p.i, p.n.j.valueOf() * 1.0); },
        top: function (p) { return ps.rest(p, p.i, p.n.j.valueOf() * 1.0); },
        bottom: function (p) { return ps.rest(p, p.i, p.n.j.valueOf() * 1.0); },
        front: function (p) {
            return ps.rest(p, p.i, p.n.j.valueOf() * 1.0);
        },
        back: function (p) { return ps.rest(p, p.i + 1, p.n.j.valueOf() * 1.0); },

    }).toMesh(sh_phonge({ color: 0x0000ff }), eng1);
    helpers['path'].position.y -= 0.1;
    helpers['path-step'] = $3d.tools.wall({
        path: ps.points,
        d: 1.5,
        h: 1.5,
        lr: always,
        front: always,
        back: always,
    }).toMesh('result = vec4(1.0,0.,0.,1.0);', eng1);
    helpers['path-step'].position.y -= 0.75;
    var fff = function (p) { if ((p.i - path_sel) < 1 && (p.i - path_sel) >= -1) return true; };
    var fffi = function (p) { if (((p.i + 1) - path_sel) < 1 && ((p.i + 1) - path_sel) >= -1) return true; };
    mgop = { alpha: true };
    helpers['path-sel'] = $3d.tools.wall({
        path: path_sel_mode == 0 ? ps.orginal : ps.points,
        d: 4,
        h: 4,
        lr: fff,
        front: fff,
        back: fffi,
        top: fff,
        bottom: fff,
        left: fff,
        right: fff
    }).toMesh(sh_multi([{ r: 'result = vec4(0.5,0.,1.,0.7);', e: 1. }, { r: sh_frensel(), e: 1 }]), eng1);
    helpers['path-sel'].position.y -= 2;
    helperBase(ps.script);
}

function clearHelper() {
    if (def(helpers['mesh-default'])) helpers['mesh-default'].dispose();
    if (def(helpers['mesh-defaultq'])) helpers['mesh-defaultq'].dispose();
    if (def(helpers['path'])) helpers['path'].dispose();
    if (def(helpers['path-step'])) helpers['path-step'].dispose();
    if (def(helpers['path-sel'])) helpers['path-sel'].dispose();
    if (def(helpers['path-org'])) helpers['path-org'].dispose();
}

function hideMesh(name) {

    var helper = "mesh_" + def(name, 'default');
    if (helpers[helper])
        helpers[helper].dispose();
    if (helpers[helper + "q"])
        helpers[helper + "q"].dispose();

    helpers[helper] = null;
    helpers[helper + "q"] = null;

    loadStorage();

}
function showMesh(name) {

    var helper = "mesh_" + def(name, 'default');

    var item = localStorage.getItem(helper);
    if (!def(item)) {
        return;
    }

    item = js(item);

    var st = prop.html.decode(item.st);
    var m = prop.html.decode(item.m);
    var op = prop.html.decode(item.op);
    var mt = prop.html.decode(item.mt);


    switch (mt) {
        case 'surface': buildSurfaceMesh(st, m, op, name); break;
        case 'wall': buildWallMesh(st, m, op, name); break;
    }

    loadStorage();
}

function showObject(index) {
    index = index.replaceAll('item-', '').valueOf() * 1.0;
    var fst = js('function(){' + get('obj-material').textContent + '}');
    objectsHelpers[index] = new $3d.geometryInstance(objectsHelpersGeos[index]).toMesh(fst(), eng1);

    ref = new BABYLON.CubeTexture("/images/skybox/d3/skybox", eng1.get().scene);
    ref.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
    var ref2 = new BABYLON.CubeTexture("/images/skybox/d/skybox", eng1.get().scene);
    ref2.coordinatesMode = BABYLON.Texture.CUBIC_MODE;

    objectsHelpers[index].scaling.x *= getv('object-scale') * 1.0;
    objectsHelpers[index].scaling.y *= getv('object-scale') * 1.0;
    objectsHelpers[index].scaling.z *= getv('object-scale') * 1.0;

    objectsHelpers[index].material.setTexture("refc", ref);
    objectsHelpers[index].material.setTexture("refc2", ref2);
    objectsHelpers[index].material.setMatrix("refmat", ref.getReflectionTextureMatrix());

}

function convertToPointedPatternMesh() {
    var name = getv('build-name');

    var helper = "mesh_" + def(name, 'default');

    var item = localStorage.getItem(helper);
    if (!def(item)) {
        return;
    }

    item = js(item);

    var st = prop.html.decode(item.st);
    var m = prop.html.decode(item.m);
    var op = prop.html.decode(item.op);
    var mt = prop.html.decode(item.mt);

    st = js(st);

    var newStr = "";

    _each(st, function (at, i) {
        var p = JSON.stringify(at);
        var st = at;

        var res = getCurrentPoints_mainStruct(at, null, true);
        newStr += res.script + "::sep::";

    }, function () {
        get('build-pointedPattern').value = kb(newStr.length);
        get('build-pointedPatternScript').textContent = newStr;
    });
}

function getRepeatStruct() {
    return {
        repeatCount: def(getv('r_count'), 5),
        pos: { x: getv('r_t_x'), y: getv('r_t_y'), z: getv('r_t_z') },
        rot: { x: getv('r_r_x'), y: getv('r_r_y'), z: getv('r_r_z') },
        sca: { x: getv('r_s_x'), y: getv('r_s_y'), z: getv('r_s_z') }

    };
}

function repeat_build(st) {

}

function repeatMesh(f, st) {
    var st = def(st, getRepeatStruct());

    function setStruct(mesh, i) {
        if (!def(mesh)) return;
        mesh.rotation.x += st.rot.x * i * deg;
        mesh.rotation.y += st.rot.y * i * deg;
        mesh.rotation.z += st.rot.z * i * deg;

        mesh.position.x += st.pos.x * i;
        mesh.position.y += st.pos.y * i;
        mesh.position.z += st.pos.z * i;

        mesh.scaling.x += st.sca.x * i;
        mesh.scaling.y += st.sca.y * i;
        mesh.scaling.z += st.sca.z * i;

    }


    if (st.repeatCount == 1) {
        var m = f(1);

        if (def(m.length) && m.length > 0)
            _each(m, function (at, j) { setStruct(at, 1); });
        else {
            setStruct(m, 1);
        }
    }
    else
        repeat(st.repeatCount, function (i) {
            var m = f(i);

            if (def(m.length) && m.length > 0)
                _each(m, function (at, j) { setStruct(at, i); });
            else {
                setStruct(m, i);
            }
        });
}

function initRepeatMesh(name) {
    var helper = "mesh_" + def(name, 'default');

    var item = localStorage.getItem(helper);
    if (!def(item)) {
        return;
    }

    item = js(item);

    var st = prop.html.decode(item.st);
    var m = prop.html.decode(item.m);
    var op = prop.html.decode(item.op);
    var mt = prop.html.decode(item.mt);

    var f = function () { }

    switch (mt) {
        case 'surface': f = function (i) { return buildSurfaceMesh(st, m, op, name, i); }; break;
        case 'wall': f = function (i) { return buildWallMesh(st, m, op, name, i); }; break;
    }

    repeat_build = function (st) {
        repeatMesh(f, st);
    }
}

function initRepeatPoints(name) {

}

function initRepeatPath(name) {

}


function editMesh(name) {

    var helper = "mesh_" + def(name, 'default');

    var item = localStorage.getItem(helper);
    if (!def(item)) {
        return;
    }

    item = js(item);

    get('obj-material').textContent = prop.html.decode(item.m);
    setv('build-struct', item.st);
    setv('build-option', item.op);
    setv('build-material', item.m);


    var st = prop.html.decode(item.st);
    var m = prop.html.decode(item.m);
    var op = prop.html.decode(item.op);
    var mt = prop.html.decode(item.mt);

    st = js(st);

    first('#Surface #Points').innerHTML = "";
    var points = [];


    var str = "";

    switch (mt) {
        case 'surface':
            str = 'Surface';
            break;
        case 'wall':
            str = 'Wall';
            break;
    }

    points = _each(st, function (at, i) {
        var p = JSON.stringify(at);
        var st = at;
        var tk = create(get('point-item-tmp').innerHTML.replaceAll('#[name]', st.name.replaceAll(' ', '-')).replaceAll('#[size]', kb(p.length)));
        tk.setAttribute('struct', p);
        tk.id = 'sr_pt_' + st.name.replaceAll(' ', '-');
        first('#' + str + ' #Points').appendChild(tk);
    }, function () {
        return points;
    });

}

function isShowMesh(name) {
    var helper = "mesh_" + def(name, 'default');
    return def(helpers[helper]);
}
function deleteMesh(name) {

    hideMesh(name);

    var helper = "mesh_" + def(name, 'default');
    localStorage.setItem(helper, "");
    localStorage.removeItem(helper);

    loadStorage();
}
function buildSurface(st) {


    buildMesh = function (_name) {
        if (!def(_name)) clearHelper();
        return buildSurfaceMesh(getv('build-struct'), getv('build-material'), getv('build-option'), def(_name, getv('build-name')));
    };
    setv('build-material', get('obj-material').textContent);
    setv('build-struct', st);
    setv('build-option', "{alpha:" + isSelect('alpha') + ",back:" + isSelect('back') + ",wire:" + isSelect('wire') + "}");
    setv('build-mesh', kb(getv('build-material').length + getv('build-struct').length + getv('build-option').length));

    return buildMesh('default');
}
function buildSurfaceMesh(st, m, op, name, rp) {
    var mt = 'surface';
    if (!def(m) && !def(op) && !def(name)) {
        var item = localStorage.getItem(st);
        if (!def(item)) {
            return;
        }

        item = js(item);

        name = st;
        st = item.st;
        m = item.m;
        op = item.op;
        mt = item.mt;
    }

    var helper = (def(rp) ? "rp" + rp : "") + "mesh_" + def(name, 'default');

    if (helpers[helper])
        helpers[helper].dispose();
    if (def(helper) && def(helpers[helper + "q"])) {
        helpers[helper + "q"].dispose();
    }

    if (!def(rp))
        localStorage.setItem(helper, "{ mt: 'surface', st:'" + prop.html.encode(st) + "', m:'" + prop.html.encode(m) + "', op:'" + prop.html.encode(op) + "' }");

    op = js(op);
    st = js(st);

    var paths = [];

    var meshs = [];

    if (st.length < 2) return;

    _for(st, function (at, j) {

        var res = getCurrentPoints_mainStruct(at, def(rp) ? name + "_" + j : null);
        paths.push(res.points);

    }, function () {

        var fst = js('function(){' + m + '}');
        if (def(op.alpha, false) || def(op.back, false)) {
            mgop = { alpha: def(op.alpha, false), back: def(op.back, false), fix: true };
        }

        helpers[helper] = $3d.tools.surface({ paths: paths, flip: true }).toMesh(fst(), eng1);
        if (def(op.wire, false)) {
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

            if (def(op.doubleSide, false)) {
                helpers[helper + "q"] = $3d.tools.surface({ paths: paths }).toMesh(fst(), eng1);
                helpers[helper + "q"].material.setTexture("refc", ref);
                helpers[helper + "q"].material.setTexture("refc2", ref2);
                helpers[helper + "q"].material.setMatrix("refmat", ref.getReflectionTextureMatrix());
            }

        }
    });

    meshs.push(helpers[helper]);
    meshs.push(helpers[helper + "q"]);

    mgop = null;

    return meshs;
}

function buildWall(st) {


    buildMesh = function (_name) {
        if (!def(_name)) clearHelper();
        buildWallMesh(getv('build-struct'), getv('build-material'), getv('build-option'), def(_name, getv('build-name')));
    };
    setv('build-material', get('obj-material').textContent);
    setv('build-struct', st);
    setv('build-option', "{alpha:" + isSelect('alpha') + ",back:" + isSelect('back') + ",wire:" + isSelect('wire') + "}");
    setv('build-mesh', kb(getv('build-material').length + getv('build-struct').length + getv('build-option').length));

    buildMesh('default');
}
function buildWallMesh(st, m, op, name, rp) {
    var mt = 'wall';
    if (!def(m) && !def(op) && !def(name)) {
        var item = localStorage.getItem(st);
        if (!def(item)) {
            return;
        }

        item = js(item);

        name = st;
        st = item.st;
        m = item.m;
        op = item.op;
        mt = item.mt;
    }

    var helper = (def(rp) ? "rp" + rp : "") + "mesh_" + def(name, 'default');
    if (helpers[helper])
        helpers[helper].dispose();

    localStorage.setItem(helper, "{ mt: 'wall', st:'" + prop.html.encode(st) + "', m:'" + prop.html.encode(m) + "', op:'" + prop.html.encode(op) + "' }");

    op = js(op);
    st = js(st);

    var paths = [];
    var geo;

    _for(st, function (at, j) {
        wop = js(at.walloption);
        var res = getCurrentPoints_mainStruct(at, def(rp) ? name + "_" + j : null);
        paths.push(res.points);

        geo = $3d.tools.wall({
            path: res.points,
            lr: (wop.left ||
                 wop.right ||
                wop.top ||
                 wop.bottom) ? function (p) { return res.rest(p, p.i, p.n.j.valueOf() * 1.0); } : null,
            left: wop.left ? function (p) { return res.rest(p, p.i, p.n.j.valueOf() * 1.0); } : null,
            right: wop.right ? function (p) { return res.rest(p, p.i, p.n.j.valueOf() * 1.0); } : null,
            top: wop.top ? function (p) { return res.rest(p, p.i, p.n.j.valueOf() * 1.0); } : null,
            bottom: wop.bottom ? function (p) { return res.rest(p, p.i, p.n.j.valueOf() * 1.0); } : null,
            front: wop.front ? function (p) { return res.rest(p, p.i, p.n.j.valueOf() * 1.0); }
                : wop.afb ? function (p) {
                    if (res.points.length - 2 == p.i) {
                        return res.rest(p, p.i, p.n.j.valueOf() * 1.0);
                    }
                    return (res.rest(p, p.i, p.n.j.valueOf() * 1.0) && (p.n1 == null || !res.rest(p, p.i + 1, p.n1.j.valueOf() * 1.0)));
                } : null,
            back: wop.back ? function (p) { return res.rest(p, (p.i + 1), p.n.j.valueOf() * 1.0); }
                : wop.afb ? function (p) {
                    if (!wop.closed && p.i == 0) {
                        return res.rest(p, p.i, p.n.j.valueOf() * 1.0);
                    }
                    return (!res.rest(p, p.i, p.n.j.valueOf() * 1.0) && (p.n1 != null && res.rest(p, p.i + 1, p.n1.j.valueOf() * 1.0)));
                } : null,
            smooth: wop.smooth,
            closed: wop.closed,
            h: wop.h,
            d: wop.d,
            exgeo: geo,
            buildGeo: true
        });



    }, function () {

        var fst = js('function(){' + m + '}');

        if (def(op.alpha, false) || def(op.back, false)) {
            mgop = { alpha: def(op.alpha, false), back: def(op.back, false), fix: true };
        }

        helpers[helper] = new $3d.geometryInstance(geo).toMesh(fst(), eng1);

        if (def(op.wire, false)) {
            helpers[helper].material.wireframe = true;
        }
        else {

            ref = new BABYLON.CubeTexture("/images/skybox/d2/skybox", eng1.get().scene);
            ref.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
            var ref2 = new BABYLON.CubeTexture("/images/skybox/d/a", eng1.get().scene);
            ref2.coordinatesMode = BABYLON.Texture.CUBIC_MODE;

            helpers[helper].material.setTexture("refc", ref);
            helpers[helper].material.setTexture("refc2", ref2);
            helpers[helper].material.setMatrix("refmat", ref.getReflectionTextureMatrix());
        }
    });

    return helpers[helper];
}

function buildRepeat() { }
function buildRepeatMesh() { }



