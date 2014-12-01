prop.svg = {
    pathToPoints: function (path) {
        var paths = path.split(/z|Z/), points = new Array();
        for (var i = 0; i < paths.length - 1; i++) {
            path = paths[i].split(/l|L/);
            path[0] = path[0].replace(/m|M/, '');
            for (var j in path) {
                path[j] = path[j].split(',');
                for (var k in path[j]) {
                    path[j][k] = parseFloat(path[j][k]);
                    if (j != 0) {
                        path[j][k] += path[j - 1][k];
                    }
                }
            }
            for (var j in path) {
                path[j] = path[j].join(',');
            }
            points[i] = path.join(' ');
        }
        return points;
    },
    getPointsByLen: function (d, l, s, t) {

        if (!t) { t = function (p) { return p; } }
        else { t = function (p) { return { x: p.x, y: 0., z: p.y }; } }

        if (!s) s = 0;
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", d);

        var c = path.getTotalLength() / l;

        var result = [];
        for (var i = 0; i < c; i++) {

            var ps;            

            result.push(t(path.getPointAtLength(i * l + s)));
        }

        return result;
    }, 
    getPathSegAtRange: function (path, min, max) {
        var sr = path.getPathSegAtLength(min);
        var sl = path.getPathSegAtLength(max) - sr;
        var array = new Array();
        var sg = path.pathSegList;
        if (sl > 0) {
            for (var i = 0; i < sl; i++) {
                var sgx = sg.getItem(sr + i);

                array.push({ x: sgx.x, y: sgx.y });
            }
        }
        return array;

    }, 

};