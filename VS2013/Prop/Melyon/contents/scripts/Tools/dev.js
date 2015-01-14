
function mat_sample(cl) {
    cl = def(cl, 0x000000);
    return sh_range({
        start: 10, end: 1000,
        mat1: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.20 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
            { r: sh_phonge({ color: cl, back: cl }), e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.015 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
            // { r: 'float pi2 =((pos.x )- floor((pos.x )/10.)*10.)*8.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,1.0);', e: 0.50 },
            // { r: 'float pi3 =((pos.z )- floor((pos.z )/10.)*10.)*8.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,1.0);', e: 0.50 },
            // { r: 'float pi4 =((pos.y )- floor((pos.y )/10.)*10.)*8.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,1.0);', e: 1.0 },
            // { r: 'float pp;pp = abs( noise(vec3(pos.x/2.,pos.y/2.,pos.z/2.)));if(pp < 0.05 || pp > 0.1) pp  = -1.*pp/3.0 ;else pp = -0.2;result = vec4(pp,pp,pp,1.0);', e: 0.15 },
            { r: sh_frensel(), e: 0.3 }]),
        mat2: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.020 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
             { r: sh_phonge({ color: cl, back: cl }), e: 0.5 }, { r: 'result = vec4(1.,1.,1.,1.0);', e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.15 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
          //  { r: 'float pi2 =((pos.x )- floor((pos.x)/10.)*10.)*15.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,0.30);', e: 0.2 },
          //  { r: 'float pi3 =((pos.z)- floor((pos.z)/10.)*10.)*15.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,0.30);', e: 0.2 },
          //  { r: 'float pi4 =((pos.y)- floor((pos.y)/10.)*10.)*15.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,0.30);', e: 0.2 },
            { r: sh_frensel(), e: 0.3 }])
    });
}
function mat_noise(cl) {
    cl = def(cl, 0x000000);
    return sh_range({
        start: 10, end: 1000,
        mat1: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.20 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
            { r: sh_phonge({ color: cl, back: cl }), e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.015 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
            //{ r: 'float pi2 =((pos.x )- floor((pos.x )/10.)*10.)*8.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,1.0);', e: 0.50 },
           // { r: 'float pi3 =((pos.z )- floor((pos.z )/10.)*10.)*8.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,1.0);', e: 0.50 },
            // { r: 'float pi4 =((pos.y )- floor((pos.y )/10.)*10.)*8.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,1.0);', e: 1.0 },
              { r: 'float pp;pp = abs( noise(vec3(pos.x/2.,pos.y/2.,pos.z/2.)));if(pp < 0.05 || pp > 0.1) pp  = -1.*pp/3.0 ;else pp = -0.2;result = vec4(pp,pp,pp,1.0);', e: 0.15 },
            { r: sh_frensel(), e: 0.3 }]),
        mat2: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.020 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
             { r: sh_phonge({ color: cl, back: cl }), e: 0.5 }, { r: 'result = vec4(1.,1.,1.,1.0);', e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.15 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
          //  { r: 'float pi2 =((pos.x )- floor((pos.x)/10.)*10.)*15.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,0.30);', e: 0.2 },
          //  { r: 'float pi3 =((pos.z)- floor((pos.z)/10.)*10.)*15.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,0.30);', e: 0.2 },
          //  { r: 'float pi4 =((pos.y)- floor((pos.y)/10.)*10.)*15.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,0.30);', e: 0.2 },
            { r: sh_frensel(), e: 0.3 }])
    });
}
function mat_noise1(cl) {
    cl = def(cl, 0x000000);
    return sh_range({
        start: 10, end: 1000,
        mat1: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.20 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
            { r: sh_phonge({ color: cl, back: cl }), e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.015 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
            //{ r: 'float pi2 =((pos.x )- floor((pos.x )/10.)*10.)*8.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,1.0);', e: 0.50 },
           // { r: 'float pi3 =((pos.z )- floor((pos.z )/10.)*10.)*8.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,1.0);', e: 0.50 },
            // { r: 'float pi4 =((pos.y )- floor((pos.y )/10.)*10.)*8.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,1.0);', e: 1.0 },
              { r: 'float pp;pp = abs( noise(vec3(pos.x/2.,pos.y/2.,pos.z/2.)));if(pp < 0.05 || pp > 0.1) pp  = -1.*pp/3.0 ;else pp = -0.2;result = vec4(pp,pp,pp,1.0);', e: 0.15 },
            { r: sh_frensel(), e: 0.3 }]),
        mat2: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.020 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
             { r: sh_phonge({ color: cl, back: cl }), e: 0.5 }, { r: 'result = vec4(1.,1.,1.,1.0);', e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.15 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
          //  { r: 'float pi2 =((pos.x )- floor((pos.x)/10.)*10.)*15.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,0.30);', e: 0.2 },
          //  { r: 'float pi3 =((pos.z)- floor((pos.z)/10.)*10.)*15.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,0.30);', e: 0.2 },
          //  { r: 'float pi4 =((pos.y)- floor((pos.y)/10.)*10.)*15.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,0.30);', e: 0.2 },
            { r: sh_frensel(), e: 0.3 }])
    });
}
function mat_block(cl) {
    cl = def(cl, 0x000000);
    return sh_range({
        start: 10, end: 1000,
        mat1: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.20 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.005 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.0035 },
            { r: sh_phonge({ color: cl, back: cl }), e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.005 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.0015 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.0025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.0015 },
            { r: 'float pi2 =((pos.x )- floor((pos.x )/10.)*10.)*8.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,1.0);', e: 0.50 },
            { r: 'float pi3 =((pos.z )- floor((pos.z )/10.)*10.)*8.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,1.0);', e: 0.50 },
            // { r: 'float pi4 =((pos.y )- floor((pos.y )/10.)*10.)*8.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,1.0);', e: 1.0 },
            // { r: 'float pp;pp = abs( noise(vec3(pos.x/2.,pos.y/2.,pos.z/2.)));if(pp < 0.05 || pp > 0.1) pp  = -1.*pp/3.0 ;else pp = -0.2;result = vec4(pp,pp,pp,1.0);', e: 0.15 },
            { r: sh_frensel(), e: 0.3 }]),
        mat2: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.020 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
             { r: sh_phonge({ color: cl, back: cl }), e: 0.5 }, { r: 'result = vec4(1.,1.,1.,1.0);', e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.15 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
          //  { r: 'float pi2 =((pos.x )- floor((pos.x)/10.)*10.)*15.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,0.30);', e: 0.2 },
          //  { r: 'float pi3 =((pos.z)- floor((pos.z)/10.)*10.)*15.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,0.30);', e: 0.2 },
          //  { r: 'float pi4 =((pos.y)- floor((pos.y)/10.)*10.)*15.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,0.30);', e: 0.2 },
            { r: sh_frensel(), e: 0.3 }])
    });
}
function mat_table(cl) {
    cl = def(cl, 0x000000);
    mgop = { alpha: true };
    return sh_range({
        start: 10, end: 1000,
        mat1: sh_multi([
            { r: 'float pi2 =((pos.x )- floor((pos.x )/10.)*10.)*8.  ; if(pi2 <= 1.0)  result = vec4(0.,0.,0.,0.4); else result = vec4(0.0); '+
                 'float pi3 =((pos.z )- floor((pos.z )/10.)*10.)*8.  ;  if(pi3 <= 1.0)  result = vec4(0.,0.,0.,0.3); ', e: 0.5 },
            { r: 'float pi4 =(abs(pos.x ))/10.0 +(abs(pos.z ))/10.0   ; if(pi4 < 1.0) pi4 = 0.2; else pi4 =  0.; result = vec4(0.,0.,0.,pi4);', e: 0.5 }
        ]),
        mat2: sh_multi([
            { r: 'float pi2 =(abs(pos.x ))    ; if(pi2 < 1.0) pi2 = 0.2; else pi2 =  0.; result = vec4(0.,0.,0.,pi2);', e: 0.5 },
            { r: 'float pi3 =(abs(pos.z ))    ; if(pi3 < 1.0) pi3 = 0.2; else pi3 =  0.; result = vec4(0.,0.,0.,pi3);', e: 0.5 }])
    });
}

function mat_block1(cl) {
    cl = def(cl, 0x000000);
    return sh_range({
        start: 10, end: 1000,
        mat1: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.20 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
            { r: sh_phonge({ color: cl, back: cl }), e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.015 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
            { r: 'float pi2 =((pos.x )- floor((pos.x )/2.)*2.)*8.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,1.0);', e: 0.50 },
            { r: 'float pi3 =((pos.z )- floor((pos.z )/2.)*2.)*8.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,1.0);', e: 0.50 },
            // { r: 'float pi4 =((pos.y )- floor((pos.y )/10.)*10.)*8.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,1.0);', e: 1.0 },
            { r: 'float pp;pp = abs( noise(vec3(pos.x/2.,pos.y/2.,pos.z/2.)));if(pp < 0.05 || pp > 0.1) pp  = -1.*pp/3.0 ;else pp = -0.2;result = vec4(pp,pp,pp,1.0);', e: 0.15 },
            { r: sh_frensel(), e: 0.3 }]),
        mat2: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.020 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
             { r: sh_phonge({ color: cl, back: cl }), e: 0.5 }, { r: 'result = vec4(1.,1.,1.,1.0);', e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.15 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
          //  { r: 'float pi2 =((pos.x )- floor((pos.x)/10.)*10.)*15.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,0.30);', e: 0.2 },
          //  { r: 'float pi3 =((pos.z)- floor((pos.z)/10.)*10.)*15.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,0.30);', e: 0.2 },
          //  { r: 'float pi4 =((pos.y)- floor((pos.y)/10.)*10.)*15.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,0.30);', e: 0.2 },
            { r: sh_frensel(), e: 0.3 }])
    });
}


function mat_glass(cl) {
    cl = def(cl, 0x000000);
    mgop = { alpha: true };
    return sh_range({
        start: 10, end: 1000,
        mat1: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.20 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
            { r: sh_phonge({ color: cl, back: cl }), e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.015 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
            //{ r: 'float pi2 =((pos.x )- floor((pos.x )/10.)*10.)*8.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,1.0);', e: 0.50 },
           // { r: 'float pi3 =((pos.z )- floor((pos.z )/10.)*10.)*8.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,1.0);', e: 0.50 },
            // { r: 'float pi4 =((pos.y )- floor((pos.y )/10.)*10.)*8.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,1.0);', e: 1.0 },
           // { r: 'float pp;pp = abs( noise(vec3(pos.x/2.,pos.y/2.,pos.z/2.)));if(pp < 0.05 || pp > 0.1) pp  = -1.*pp/3.0 ;else pp = -0.2;result = vec4(pp,pp,pp,1.0);', e: 0.15 },
            { r: sh_frensel(), e: 0.3 }]),
        mat2: sh_multi([
            { r: sh_specular({ glass: true }), e: 0.020 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ glass: true, pos: 'vec3(10.,100.,0.)' }), e: 0.035 },
             { r: sh_phonge({ color: cl, back: cl }), e: 0.5 }, { r: 'result = vec4(1.,1.,1.,1.0);', e: 1.0 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,0.)' }), e: 0.05 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,100.,0.)' }), e: 0.15 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,0.,100.)' }), e: 0.025 },
            { r: sh_specular({ refc: 'refc2', pos: 'vec3(10.,20.,0.)' }), e: 0.015 },
          //  { r: 'float pi2 =((pos.x )- floor((pos.x)/10.)*10.)*15.  ; if(pi2 > 1.0) pi2 = 0.0; else pi2 = -0.1; result = vec4(pi2,pi2,pi2,0.30);', e: 0.2 },
          //  { r: 'float pi3 =((pos.z)- floor((pos.z)/10.)*10.)*15.  ; if(pi3 > 1.0) pi3 = 0.0; else pi3 = -0.1; result = vec4(pi3,pi3,pi3,0.30);', e: 0.2 },
          //  { r: 'float pi4 =((pos.y)- floor((pos.y)/10.)*10.)*15.  ; if(pi4 > 1.0) pi4 = 0.0; else pi4 = -0.1; result = vec4(pi4,pi4,pi4,0.30);', e: 0.2 },
            { r: sh_frensel(), e: 0.3 }])
    });
}

function mat_s(ms) {

    var p = new $3d.iMaterial($3d.mat.shd(ms), eng1).build();
    //p.material.wireframe = true;

    ref = new BABYLON.CubeTexture("/images/skybox/d2/skybox", eng1.get().scene);
    ref.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
    var ref2 = new BABYLON.CubeTexture("/images/skybox/d/skybox", eng1.get().scene);
    ref2.coordinatesMode = BABYLON.Texture.CUBIC_MODE;


    p.setTexture("refc", ref);
    p.setTexture("refc2", ref2);
    p.setMatrix("refmat", ref.getReflectionTextureMatrix());

    return p;
}

function mat(ms) {

    var p = new $3d.iMaterial($3d.mat.frg(def(ms, mat_sample(0xededed))), eng1).build();
    //p.material.wireframe = true;

    ref = new BABYLON.CubeTexture("/images/skybox/d2/skybox", eng1.get().scene);
    ref.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
    var ref2 = new BABYLON.CubeTexture("/images/skybox/d/skybox", eng1.get().scene);
    ref2.coordinatesMode = BABYLON.Texture.CUBIC_MODE;


    p.setTexture("refc", ref);
    p.setTexture("refc2", ref2);
    p.setMatrix("refmat", ref.getReflectionTextureMatrix());

    return p;
}

var curr = 0;
function createPointElement() {
    var ct = create(get('point-template').innerHTML); ct.setAttribute('index', inds++); get('.cntr', get('cntr')).appendChild(ct);
}

var helperJs;
function createStorageElement(at, i) {
    var ct = create(get('storage-sub-template').innerHTML.replace('#[name]', kb(at.length)));
    ct.addEventListener("click", function (ev) {
        try {
            js("helperJs = " + at.replace(/density: ,/g, 'density: [1,1,1] ,'));
            var w = new $3d.tools.surface(helperJs).toMesh(eng1);

            w.material = new $3d.iMaterial($3d.mat.frg(mat_sample()), eng1).build();

            ref = new BABYLON.CubeTexture("/images/skybox/d2/skybox", eng1.get().scene);
            ref.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
            var ref2 = new BABYLON.CubeTexture("/images/skybox/d/skybox", eng1.get().scene);
            ref2.coordinatesMode = BABYLON.Texture.CUBIC_MODE;

            w.material.setTexture("refc", ref);
            w.material.setTexture("refc2", ref2);
            w.material.setMatrix("refmat", ref.getReflectionTextureMatrix());

            b[storageId()] = w;
        }
        catch (e) { alert('content incorrect : ' + e.message); }
    });
    ct.setAttribute('index', inds++); get('.cntr', get('cntr')).appendChild(ct);
}
function minall() {
    all('#density > input[type=range]', function (it, i) {
        it.value = 0.0;
    }, function () {
        test();
    });
}
function refall() {
    all('#density > input[type=range]', function (it, i) {
        it.value = 50.0;
    }, function () {

        test();
    });
}
function setCondTo(cond, mx, pts, dns, hgt, op) {

    get('pointsChose').setAttribute('pts', pts);
    get('pointsChose').setAttribute('dns', dns);
    get('pointsChose').setAttribute('hgt', hgt);

    var push = function (r, n) { r.push({ x: -n.x + 100, y: 1.0, z: n.y - 100 }); };

    var ptsi = $3d.tools.svg.getPoints({ path: pts, density: js(dns), pointLength: mx * 1.0, push: push });

    get('pointsChose').setAttribute('max', ptsi.length);
    get('pointsChose').setAttribute('len', mx);
    if (!def(op)) {

        get('condscript').textContent = 'var isIn = true;';
        get('customscript').textContent = '';
        return
    };
    var st = js(op.replace(/\n/g, '&eslahn;'));
    get('condscript').textContent = st.rest.toString().replace(/&eslahn;/g, '\n');
    get('customscript').textContent = st.custom.toString().replace(/&eslahn;/g, '\n');
}
function setTo(ar) {

    minall();
    var th = first('#density > input[type=range]');
    _for(ar, function (it, i) {
        try {
            th.value = it * 50.;

            th = th.nextElementSibling;
        }
        catch (e) { }
    });
}
inds = 1;
lstg = 1;
function storageId(i) {

    if (def(localStorage.getItem("obj_key"))) {
        lstg = localStorage.getItem("obj_key");
    }

    localStorage.setItem("obj_key", def(i, lstg));

    return lstg;
}



function test() {

}

function surface() {

    if (def(b[storageId()]))
        b[storageId()].dispose();

    function AddNew() {
        var script = "{paths:@paths }";
        var script_ = "{paths:@paths }";
        var pts_s = [];
        var pts_s1 = [];
        var cond_s = [];
        all('#cntr .cntr > .pointitem',
          function (at, i) {
              var h = getv('#h', at);
              var push = function (r, n) { r.push({ x: -n.x + 100, y: h, z: n.y - 100 }); };

              var pts = getv('#ch', at) ? getj('#p', at) : getPoints(def(at.getAttribute("point-struct")) ? at.getAttribute("point-struct") : fillPointStruct({ path: getv('#p', at), height: h, density: getj('#d', at), pointLength: getv('#pl', at) * 1.0, push: 'function (r, n) { r.push({ x: -n.x + 100, y: ' + h + ', z: n.y - 100 }); }', custom: '', rest: 'var isIn = true;' }));
              var pts_1 = getv('#ch', at) ? getv('#p', at) : "$3d.tools.svg.getPoints({ path: \"" + getv('#p', at) + "\", density: " + getv('#d', at) + ", pointLength: " + getv('#pl', at) * 1.0 + ", push: function (r, n) { r.push({ x: -n.x + 100, y: " + h + ", z: n.y - 100 }); }  })";


              pts_s.push(pts.points);
              cond_s.push(pts.rest);
              pts_s1.push(pts_1);
          });
        script = script.replace("@paths", (pts_s).toString());
        script_ = script_.replace("@paths", (pts_s1).toString());
        get('sct').textContent = script;
        setv('#pts', kb(script.length), get('cntr'));
        get('ssct').textContent = script_;
        setv('#spts', kb(script_.length), get('cntr'));


        var w = new $3d.tools.surface({
            paths: pts_s,
            conds: cond_s,
            flip: getv('#flip', get('cntr'))
        }).toMesh(eng1);

        w.material = new $3d.iMaterial($3d.mat.frg(getj('#mat', get('cntr'))), eng1).build();
        w.material.wireframe = getv('#wire', get('cntr'));

        ref = new BABYLON.CubeTexture("/images/skybox/d2/skybox", eng1.get().scene);
        ref.coordinatesMode = BABYLON.Texture.CUBIC_MODE;
        var ref2 = new BABYLON.CubeTexture("/images/skybox/d/skybox", eng1.get().scene);
        ref2.coordinatesMode = BABYLON.Texture.CUBIC_MODE;

        w.material.setTexture("refc", ref);
        w.material.setTexture("refc2", ref2);
        w.material.setMatrix("refmat", ref.getReflectionTextureMatrix());

        b[storageId()] = w;
    }
    var s = '[';

    all('#density > input[type=range]', function (it, i) {
        if (it.value != 0)
            s += "," + (it.value * 2.0) / 100.;
    }, function () {
        s = s.replace("[,", "[") + "]";
        if (s == "[]") s = "[1,1,1]";

        var ctl = all('#cntr .cntr > .pointitem', function (at, i) {
            if (at.getAttribute("index") == curr.toString()) {
                setv('#d', s, at);
                return false;
            }
        });
        AddNew();
    });
}


function save() {


    storageId(++lstg);

    var val = getv('ssct');

    localStorage.setItem("obj_key" + lstg, val);

    back();
}
function back() {
    get('cntr').innerHTML = get('main-template').innerHTML;
}
function new_surface() {
    get('cntr').innerHTML = get('surface-template').innerHTML;
    get('.cntr', get('cntr')).innerHTML = "";
    createPointElement();
    createPointElement();
}

function new_wall() {
    get('cntr').innerHTML = get('wall-template').innerHTML;
    get('.cntr', get('cntr')).innerHTML = "";
    createPointElement();
}

function storage() {
    get('cntr').innerHTML = get('storage-template').innerHTML;
    get('.cntr', get('cntr')).innerHTML = "";

    _each(localStorage, function (at, i) {
        if (i.toString().indexOf("obj_key") == 0) {
            createStorageElement(at, i);
        }
    });

}

function material() {
    get('cntr').innerHTML = get('material-template').innerHTML;
    get('.cntr', get('cntr')).innerHTML = "";
}