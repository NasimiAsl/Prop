var paternSize = { w: 200, h: 200 };

var melyon = {
    pattern: {
        beachScale: 50,
        beach: [
            {
                name: 'plane',
                path: "m -14.647212,-0.01020409 c 0,0 39.395949,19.69797509 44.446712,32.32488109 5.050763,12.626907 4.04061,99.500023 4.04061,99.500023 0,0 -1.010152,18.68783 11.616755,31.81981 12.626906,13.13198 23.233508,21.2132 66.670065,20.20305 43.43656,-1.01015 87.88327,-1.01015 87.88327,-1.01015",
                pointLength: 50,
                position: { x: 0, y: 1.0, z: 0 },
            },
            {
                name: 'beach1',
                path: "m 50.357143,-3.1658166e-7 c 0,0 8.571429,6.78571431658166 8.571429,12.85714331658166 0,6.071428 -0.714286,8.214285 -2.857143,15.357142 -2.142857,7.142858 1.071428,9.642858 -0.714286,17.857143 C 53.571429,54.285714 53.928572,60 58.214286,65.357143 62.5,70.714286 60.357143,73.214286 62.5,79.285714 64.642857,85.357143 76.785714,83.214286 77.142857,90 77.5,96.785714 67.5,100.71429 70.714286,104.64286 c 3.214286,3.92857 12.857143,3.57143 14.642857,8.92857 1.785714,5.35714 0.714286,24.28571 11.071429,23.57143 10.357138,-0.71429 19.999998,-5 24.285718,-5.71429 C 125,130.71429 127.5,135.35714 132.85714,135 c 5.35715,-0.35714 15.35715,-7.85714 19.28572,-12.85714 3.92857,-5 2.12358,2.23115 7.5,-9.64286 1.08937,-2.40591 1.96728,-8.52031 5,-7.85714 3.87892,0.84821 0,17.5 5,20 5,2.5 6.07143,3.57143 9.28571,7.5 3.21429,3.92857 12.85714,0.35714 14.64286,2.85714 1.78571,2.5 6.42857,1.07143 6.42857,1.07143",
                pointLength: 200.,
                position: { x: 0, y: 0, z: 0 },

            },
            {
                name: 'beach2',
                path: "m 56.921968,0.11606477 c 0,0 2.13792,5.51251033 3.148072,11.44715723 1.010153,5.934646 -3.538765,14.607959 -3.086477,18.879083 0.695905,6.571692 6.529778,7.049404 5.01455,12.98405 -1.515228,5.934646 -2.237663,9.109647 -3.279279,13.711027 -2.019734,8.922252 7.520124,6.196158 9.287891,10.615575 1.767767,4.419417 -6.212246,7.63742 -2.802981,9.783994 3.409265,2.146574 16.640277,2.668058 18.029237,7.971359 1.388959,5.303301 -9.060736,14.129445 -8.808198,16.02348 0.252538,1.89404 12.52756,0.90554 15.052941,4.06227 2.525381,3.15673 0.718002,23.20288 5.263689,24.46557 4.545686,1.26269 19.109967,-6.7229 25.297147,-6.84917 6.18718,-0.12627 10.93814,10.24131 14.12944,6.32242 9.91638,-12.17722 14.11521,-8.38606 15.88298,-13.31055 1.76777,-4.92449 5.63878,0.44008 6.64893,-7.89368 1.01016,-8.333753 6.31346,-13.637053 8.96511,-13.384515 2.65165,0.252538 2.68601,5.503535 4.45377,10.933105 1.76777,5.42957 1.22834,10.2801 4.6376,13.18429 3.40927,2.90418 4.92449,3.40926 8.08122,6.56599 3.15673,3.15672 4.67196,-1.89404 8.5863,-1.38896 3.91434,0.50507 8.71256,1.89403 8.71256,1.89403",
                pointLength: 200.,
                position: { x: 0, y: -0.5, z: 0 },
            },
            {
                name: 'beach3',
                path: "m 66.643037,0.60968058 c 0,0 4.642858,9.64285742 2.142858,13.21428542 -2.5,3.571429 -3.085744,6.174775 -2.500001,10.714285 0.714286,5.535715 3.077756,5.718255 4.464287,10.892858 2.819279,10.521692 -9.23025,15.840647 -0.714286,22.5 11.116413,8.692864 17.577149,8.140327 21.438967,13.456706 3.861819,5.316379 1.257429,20.917374 1.508989,24.320126 0.25157,3.402753 6.037663,4.607269 6.323313,7.559239 0.28565,2.95199 -0.05169,6.26621 3.912376,10.23029 7.80624,4.50694 13.31146,-2.42386 18.13289,-2.24529 11.32038,5.1977 5.18005,9.63929 26.06617,-1.74765 6.64655,-4.58082 10.16588,-18.586556 10.16588,-18.586556 3.20579,-16.432484 11.51118,3.818865 18.86204,11.102966 0,0 -0.0919,3.68283 3.83665,7.25427 3.92858,3.57142 5.35715,1.42857 8.57143,0.71428 3.21429,-0.71428 10.71429,1.60714 10.71429,1.60714",
                pointLength: 100.,
                position: { x: 0, y: -3, z: 0 },

            },
            {
                name: 'beachend',
                path: "m 91.923882,-0.01020419 c 0,0 0.401503,25.90943119 5.808377,35.35533919 8.131131,14.205237 32.571081,72.949535 45.204331,38.133259 9.47815,-27.650605 29.32776,-20.503319 39.39595,-8.081221 13.36656,16.491604 18.68782,9.091373 18.68782,9.091373",
                pointLength: 50.,
                position: { x: 0, y: -4, z: 0 },

            },
            {
                name: 'deepsea',
                path: "m 120.46069,1.2524865 c -0.33282,26.2735265 5.66564,29.4110665 10.35406,37.6281825 9.44819,9.448189 24.94696,-14.343239 43.18402,-6.81853 20.08995,11.337796 20.23612,4.144046 25.7589,0.252538",
                pointLength: 10.,
                position: { x: 0, y: -25, z: 0 },

            },
             {
                 name: 'deepsea',
                 path: "m 152.78557,0.49487208 c 1.01016,0.25253814 46.71956,0.25253814 46.71956,0.25253814",
                 pointLength: 5.,
                 position: { x: 0, y: -25, z: 0 },

             }],

        appShop: [
            {
                name: 'ground',
                path: "m 60,80.17065 5.533646,0 c 0,0 5.555839,2.904193 8.20749,10.227799 2.65165,7.323606 2.399112,18.309011 2.399112,18.309011 l -38.638335,0 0,-28.53681 z",
                pointLength: 100.,
                position: { x: 0, y: -0.6, z: 0 },

            },
             {
                 name: 'ground',
                 path: "m 60,80.17065 5.533646,0 c 0,0 5.555839,2.904193 8.20749,10.227799 2.65165,7.323606 2.399112,18.309011 2.399112,18.309011 l -38.638335,0 0,-28.53681 z",
                 pointLength: 100.,
                 position: { x: 0, y: 2, z: 0 },

             }],

        appShop_plan: [
            {
                name: 'ground',
                path: "m 60,80.17065 5.533646,0 c 0,0 5.555839,2.904193 8.20749,10.227799 2.65165,7.323606 2.399112,18.309011 2.399112,18.309011 l -38.638335,0 0,-28.53681 z",
                pointLength: 100.,
                position: { x: 0, y: 2, z: 0 },
            },
            {
                name: 'ground',
                path: "m 64.017857,88.303571 c 0,0 3.928572,3.839286 4.553572,6.964286 0.625,3.125 0.714285,8.035713 0.714285,8.035713 l -25.982142,0.0893 -0.357143,-16.785717 17.232143,-0.625 z",
                inline: false,
                position: { x: 0, y: 2, z: 0 },
            },
            {
                points: [{ z: 53.125 - 100, y: 2, x: 95 - 100 }],
                position: { x: 0, y: 2, z: 0 },
            }],
        road: {
            path: "m -21.213203,2.5151773 c 0,0 48.992398,13.6370597 53.538085,34.8502627 4.545686,21.213204 -1.010153,77.27667 3.030457,100.51018 4.04061,23.23351 20.708127,42.93148 41.921331,43.94163 21.213203,1.01016 49.49747,13.13199 50.00255,34.85027 0.50508,21.71828 0,21.2132 0,21.2132",
            inline: false,
            pointLength: 200.,
            position: { x: 0, y: 1.5, z: 0 },
        },
        around: {
            mountion: [               
                {
                    path: "m -6125.7143,-1811.4286 c 0,0 114.2857,2651.4286 1257.1429,3405.7143 1142.8571,754.2857 434.2857,1211.4286 1440,2148.5714 C -2422.8571,4680 -480,5297.1428 1325.7143,4931.4286",
                    inline: false,
                    pointLength: 30.,
                    position: { x: 0, y: 0, z: 0 },
                }, 
                {
                    path: "m -7840,2988.5714 c 0,0 251.4286,274.2857 685.7143,594.2857 434.2857,320 1783.2825,410.1803 1840,1005.7143 160,1680 -285.7143,754.2857 948.5714,845.7143 196.0873,14.525 640,868.5714 640,868.5714",
                    inline: false,
                    pointLength: 20.,
                    position: { x: 0, y: 600, z: 0 },
                }, 

                 {
                     path: "m -8708.5714,4177.1429 c 0,0 320,297.1428 342.8571,480 22.8572,182.8571 274.2857,891.4285 274.2857,891.4285 0,0 1028.5715,-68.5714 1531.4286,-205.7143 502.8572,-137.1428 251.4286,1211.4286 320,1348.5714 68.5715,137.1429 708.5714,274.2858 708.5714,274.2858",
                     inline: false,
                     pointLength: 20.,
                     position: { x: 0, y: 1200, z: 0 },
                 },  
                 {
                     path: "m -8971.4285,6851.4286 c 0,0 548.5713,102.8571 708.5713,102.8571 160,0 285.7143,-125.7143 468.5715,0 189.292,130.1381 160,422.8571 205.7143,514.2857",
                     inline: false,
                     pointLength: 5.,
                     position: { x: 0, y: 2500, z: 0 },
                 }]
                }
    },



    initBeach: function (eng, ary) {

        function addGeo(paths, scale, color, flip, w) {
            var b1 = $3d.tools.surface({
                paths: paths,
                flip: flip
            });

            ary.push(b1.toMesh(eng));

            var vc = cs(color);

            ary[b.length - 1].material = new BABYLON.StandardMaterial('dd', eng.engine.instance.scene);
            ary[b.length - 1].material.diffuseColor = new BABYLON.Color3(vc.r, vc.g, vc.b);
            if (def(w)) {
                ary[b.length - 1].material.wireframe = true;
                ary[b.length - 1].material.alpha = 0.1;
                ary[b.length - 1].material.needAlphaBlending = function () { return true; }
                ary[b.length - 1].material.needAlphaTesting = function () { return true; }
            }

            scale = def(scale, 1.0);

            ary[b.length - 1].scaling.x *= scale;
            ary[b.length - 1].scaling.y *= scale;
            ary[b.length - 1].scaling.z *= scale;


            return ary[b.length - 1];
        }

        function addWall(path, scale, color, flip, w) {
            var b1 = $3d.tools.wall({
                d: 3.6,
                h: 0.3,
                path: path,
                flip: flip,
                left: function (p) { return true; },
                right: function (p) { return true; },
                top: function (p) { return true; },
                bottom: function (p) { return true; },
                lr: function (p) { return true; },
            });

            ary.push(b1.toMesh(eng));

            var vc = cs(color);

            ary[b.length - 1].material = new BABYLON.StandardMaterial('dd', eng.engine.instance.scene);
            ary[b.length - 1].material.diffuseColor = new BABYLON.Color3(vc.r, vc.g, vc.b);
            if (def(w)) {
                ary[b.length - 1].material.wireframe = true;
                ary[b.length - 1].material.alpha = 0.1;
                ary[b.length - 1].material.needAlphaBlending = function () { return true; }
                ary[b.length - 1].material.needAlphaTesting = function () { return true; }
            }

            scale = def(scale, 1.0);

            ary[b.length - 1].scaling.x *= scale;
            ary[b.length - 1].scaling.y *= scale;
            ary[b.length - 1].scaling.z *= scale;


            return ary[b.length - 1];

        }
        var ob = melyon.pattern.beach;
        var paths = [];

        for (i = 0; i < ob.length; i++) {
            paths.push(def(ob[i].points) ? ob[i].points : $3d.tools.svg.getPoints({
                pointLength: ob[i].pointLength,
                push: function (r, n, j) {
                    r.push({
                        x: n.y - paternSize.w / 2 + ob[i].position.x,
                        y: 0 + ob[i].position.y,
                        z: n.x - paternSize.h / 2 + ob[i].position.z
                    });
                },
                path: ob[i].path,
                density: ob[i].density,
                inline: ob[i].inLine
            }));
        }

        addGeo(paths, melyon.pattern.beachScale, 0x999999, false);
        //addGeo(paths, melyon.pattern.beachScale, 0xff5500, false);
        addGeo(paths, melyon.pattern.beachScale, 0xffffff, true, true);




        ob = melyon.pattern.appShop;
        paths = [];

        for (i = 0; i < ob.length; i++) {
            paths.push(def(ob[i].points) ? ob[i].points : $3d.tools.svg.getPoints({
                pointLength: ob[i].pointLength,
                push: function (r, n, j) {
                    r.push({
                        x: n.y - paternSize.w / 2 + ob[i].position.x,
                        y: 0 + ob[i].position.y,
                        z: n.x - paternSize.h / 2 + ob[i].position.z
                    });
                },
                path: ob[i].path,
                density: ob[i].density,
                inline: ob[i].inLine
            }));
        }


        addGeo(paths, melyon.pattern.beachScale, 0x990000, true);
        //addGeo(paths, melyon.pattern.beachScale, 0xff5500, false);
         addGeo(paths, melyon.pattern.beachScale, 0xffffff, true, true);

        //

        var ob = melyon.pattern.around.mountion;
        var paths = [];

        for (i = 0; i < ob.length; i++) {
            paths.push(def(ob[i].points) ? ob[i].points : $3d.tools.svg.getPoints({
                pointLength: ob[i].pointLength,
                push: function (r, n, j) {
                    r.push({
                        x: (n.y - paternSize.w / 2 + ob[i].position.x            )/(j>1 ? 5.: 1.0),
                        y: (0 + ob[i].position.y + noise.simplex2(n.x,n.y)*30*(i ) )/(j>1 ? 5.: 1.0),
                        z: (n.x - paternSize.h / 2 + ob[i].position.z            )/(j>1 ? 5.: 1.0) 
                    });
                },
                path: ob[i].path,
                density: ob[i].density,
                inline: ob[i].inLine
            }));
        }

       //addGeo(paths, melyon.pattern.beachScale, 0x999999, false);
         addGeo(paths, melyon.pattern.beachScale/8. , 0x112222, true);
         addGeo(paths, melyon.pattern.beachScale/8. , 0xffffff, true, true);


        ob = melyon.pattern.appShop_plan;
        paths = [];

        for (i = 0; i < ob.length; i++) {
            paths.push(def(ob[i].points) ? ob[i].points : $3d.tools.svg.getPoints({
                pointLength: ob[i].pointLength,
                push: function (r, n, j) {
                    r.push({
                        x: n.y - paternSize.w / 2 + ob[i].position.x,
                        y: 0 + ob[i].position.y,
                        z: n.x - paternSize.h / 2 + ob[i].position.z
                    });
                },
                path: ob[i].path,
                density: ob[i].density,
                inline: ob[i].inLine
            }));
        }


        addGeo(paths, melyon.pattern.beachScale, 0x990000, true);
        //addGeo(paths, melyon.pattern.beachScale, 0xff5500, false);
        addGeo(paths, melyon.pattern.beachScale, 0xffffff, true, true);

        ob = melyon.pattern.road;
        var points = (def(ob.points) ? ob.points : $3d.tools.svg.getPoints({
            pointLength: ob.pointLength,
            push: function (r, n, j) {
                r.push({
                    x: n.y - paternSize.w / 2 + ob.position.x,
                    y: 0 + ob.position.y,
                    z: n.x - paternSize.h / 2 + ob.position.z
                });
            },
            path: ob.path,
            density: ob.density,
            inline: ob.inLine
        }));


        addWall(points, melyon.pattern.beachScale, 0x555555, true);



    }
};