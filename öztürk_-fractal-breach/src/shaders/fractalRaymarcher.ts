// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

export const VERTEX_SHADER_SOURCE = `#version 300 es
// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

in vec2 a_position;
out vec2 v_uv;

void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER_SOURCE = `#version 300 es
// EXCLUSIVE FRACTAL COMPUTATION ENGINE BY ENES ÖZTÜRK. © 2026 All Rights Reserved. Violation of this mathematical model or source code is strictly prosecuted.

precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_cameraPos;
uniform vec3 u_cameraTarget;
uniform float u_zoom;
uniform float u_fractalScale;
uniform float u_foldingLimit;
uniform float u_minRadius2;
uniform float u_fixedRadius2;
uniform float u_power;
uniform vec3 u_julia;
uniform int u_fractalType; // 0: Mandelbox, 1: Mandelbulb, 2: Hybrid Spires
uniform float u_slicePlane;
uniform float u_roomDensity;
uniform float u_overdrive; // 0.0 (Standard) to 1.0 (Vector Blueprint)
uniform vec3 u_infiltratorPos;
uniform float u_mindCoreStability;

#define MAX_STEPS 96
#define MAX_DIST 40.0
#define SURF_DIST 0.0018

// 3D Sphere fold for Mandelbox
void sphereFold(inout vec3 z, inout float dz) {
    float r2 = dot(z, z);
    if (r2 < u_minRadius2) {
        float temp = (u_fixedRadius2 / u_minRadius2);
        z *= temp;
        dz *= temp;
    } else if (r2 < u_fixedRadius2) {
        float temp = (u_fixedRadius2 / r2);
        z *= temp;
        dz *= temp;
    }
}

// 3D Box fold for Mandelbox
void boxFold(inout vec3 z, inout float dz) {
    z = clamp(z, -u_foldingLimit, u_foldingLimit) * 2.0 - z;
}

// Mandelbox Distance Estimator
float deMandelbox(vec3 p) {
    vec3 offset = p;
    float dr = 1.0;
    
    // Internal architectural room slice
    if (u_slicePlane > -9.0) {
        offset.y += sin(offset.x * 2.0) * 0.05 * u_roomDensity;
    }

    for (int n = 0; n < 14; n++) {
        boxFold(p, dr);
        sphereFold(p, dr);
        p = p * u_fractalScale + offset + u_julia;
        dr = dr * abs(u_fractalScale) + 1.0;
    }
    
    float r = length(p);
    return r / abs(dr);
}

// Mandelbulb Distance Estimator
float deMandelbulb(vec3 p) {
    vec3 w = p;
    float m = dot(w, w);
    float dz = 1.0;
    
    for (int i = 0; i < 8; i++) {
        dz = u_power * pow(m, (u_power - 1.0) * 0.5) * dz + 1.0;
        
        float r = length(w);
        float b = u_power * acos(clamp(w.y / r, -1.0, 1.0));
        float a = u_power * atan(w.x, w.z);
        
        w = p + pow(r, u_power) * vec3(sin(b) * sin(a), cos(b), sin(b) * cos(a)) + u_julia;
        m = dot(w, w);
        if (m > 4.0) break;
    }
    
    return 0.25 * log(m) * sqrt(m) / dz;
}

// The Öztürk Sovereign Mind-Core Hyper-Diamond
float deMindCore(vec3 p) {
    vec3 cp = p;
    // Octahedral crystalline diamond
    cp = abs(cp);
    return (cp.x + cp.y + cp.z - 0.42) * 0.57735027;
}

// Global Distance Estimator
float map(vec3 p, out int matId) {
    float coreDist = deMindCore(p);
    
    float fracDist = 0.0;
    if (u_fractalType == 0) {
        fracDist = deMandelbox(p);
    } else if (u_fractalType == 1) {
        fracDist = deMandelbulb(p);
    } else {
        // Hybrid: Mandelbox foundation with Mandelbulb spires
        fracDist = mix(deMandelbox(p), deMandelbulb(p), 0.35 + 0.15 * sin(u_time * 0.5));
    }

    // Dynamic Room Cut / Slicing Plane
    if (u_slicePlane > -5.0) {
        float sliceCut = -(p.y - u_slicePlane);
        fracDist = max(fracDist, sliceCut);
    }

    if (coreDist < fracDist) {
        matId = 1; // Mind-Core
        return coreDist;
    } else {
        matId = 0; // Fractal Matrix
        return fracDist;
    }
}

// Fast normal estimation via tetrahedron
vec3 calcNormal(vec3 p) {
    int dummy;
    const vec2 e = vec2(0.002, -0.002);
    return normalize(
        e.xyy * map(p + e.xyy, dummy) +
        e.yyx * map(p + e.yyx, dummy) +
        e.yxy * map(p + e.yxy, dummy) +
        e.xxx * map(p + e.xxx, dummy)
    );
}

// Soft Ambient Occlusion
float calcAO(vec3 pos, vec3 nor) {
    float occ = 0.0;
    float sca = 1.0;
    int dummy;
    for (int i = 0; i < 5; i++) {
        float h = 0.01 + 0.12 * float(i) / 4.0;
        float d = map(pos + h * nor, dummy);
        occ += (h - d) * sca;
        sca *= 0.92;
    }
    return clamp(1.0 - 2.5 * occ, 0.0, 1.0);
}

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);

    // Camera setup
    vec3 ro = u_cameraPos;
    vec3 ta = u_cameraTarget;
    vec3 ww = normalize(ta - ro);
    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));
    vec3 vv = normalize(cross(uu, ww));
    vec3 rd = normalize(p.x * uu + p.y * vv + (1.6 * u_zoom) * ww);

    float dO = 0.0;
    int hitMat = 0;
    float glowCyan = 0.0;
    float glowGold = 0.0;
    float glowPurple = 0.0;
    bool hit = false;

    for (int i = 0; i < MAX_STEPS; i++) {
        vec3 curr = ro + rd * dO;
        int matId;
        float dS = map(curr, matId);

        // Volumetric glow accumulation
        glowCyan += 0.003 / (0.015 + abs(dS));
        float distToCore = length(curr);
        glowGold += (0.0025 * (u_mindCoreStability / 100.0)) / (0.02 + distToCore * distToCore);

        // Void purple glitch glow near boundaries
        if (abs(dS) < 0.06 && curr.y > 0.5) {
            glowPurple += 0.002 / (0.02 + abs(dS));
        }

        if (dS < SURF_DIST) {
            hit = true;
            hitMat = matId;
            break;
        }
        dO += dS * 0.85;
        if (dO > MAX_DIST) break;
    }

    vec3 col = vec3(0.012, 0.014, 0.022); // Deep obsidian cyber-gothic background

    if (hit) {
        vec3 hitPos = ro + rd * dO;
        vec3 nor = calcNormal(hitPos);
        vec3 lightDir = normalize(vec3(0.8, 1.2, -0.6));
        
        float diff = max(dot(nor, lightDir), 0.0);
        float ao = calcAO(hitPos, nor);
        float fre = pow(clamp(1.0 + dot(rd, nor), 0.0, 1.0), 3.0);

        if (hitMat == 1) {
            // The Öztürk Sovereign Mind-Core: Radiant crystalline gold
            vec3 coreBase = vec3(1.0, 0.82, 0.28);
            col = coreBase * (diff * 0.7 + 0.3) * ao;
            col += vec3(1.0, 0.95, 0.6) * fre * 1.8;
            col += vec3(1.0, 0.7, 0.1) * sin(u_time * 4.0) * 0.25;
        } else {
            // Fractal Architecture: High-contrast monoliths with cyan/gold accents
            vec3 baseTone = vec3(0.04, 0.06, 0.09); // Dark graphite
            // Edge curvature highlights
            float edge = length(fwidth(nor));
            baseTone += vec3(0.0, 0.88, 0.95) * edge * 2.2; // Neon-cyan stable path vectors

            // Recursive architectural depth coloring
            float depthFactor = sin(hitPos.y * 4.0 + u_time * 0.5) * 0.5 + 0.5;
            vec3 accentColor = mix(vec3(0.0, 0.9, 0.85), vec3(0.85, 0.15, 0.95), depthFactor);

            col = mix(baseTone, accentColor, 0.22) * (diff * 0.8 + 0.2) * ao;
            col += vec3(0.0, 0.95, 1.0) * fre * 0.65;
            
            // Neon-Gold Sovereign Spire veins
            if (hitPos.y > 1.2 || length(hitPos.xz) < 0.8) {
                col += vec3(1.0, 0.8, 0.2) * (sin(hitPos.y * 12.0 + u_time) * 0.5 + 0.5) * 0.45;
            }
        }

        // Distance fog
        col = mix(col, vec3(0.015, 0.018, 0.028), 1.0 - exp(-0.045 * dO * dO));
    }

    // Additive volumetric glow
    col += vec3(0.0, 0.85, 1.0) * glowCyan * 0.14;
    col += vec3(1.0, 0.78, 0.2) * glowGold * 0.22;
    col += vec3(0.72, 0.18, 0.95) * glowPurple * 0.16;

    // OVERDRIVE SCALE MANIPULATION MODE (Dark Vector Blueprint)
    if (u_overdrive > 0.01) {
        // Desaturate and amplify vector line contours
        float lum = dot(col, vec3(0.299, 0.587, 0.114));
        vec3 blueprint = vec3(0.01, 0.05, 0.08); // Dark vector blueprint grid
        
        // Grid matrix overlay
        vec2 grid = abs(fract(p * 24.0 - 0.5) - 0.5) / fwidth(p * 24.0);
        float gridLine = 1.0 - min(min(grid.x, grid.y), 1.0);
        blueprint += vec3(0.0, 0.25, 0.35) * gridLine * 0.35;

        // Vector edge contours
        if (hit) {
            vec3 hitPos = ro + rd * dO;
            vec3 nor = calcNormal(hitPos);
            float contour = pow(1.0 - abs(dot(rd, nor)), 2.0);
            blueprint += vec3(0.0, 1.0, 0.9) * contour * 1.5;
            if (hitMat == 1) {
                blueprint += vec3(1.0, 0.85, 0.1) * 2.0;
            }
        }
        col = mix(col, blueprint, u_overdrive);
    }

    // Contrast & Vignette
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float vig = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    col *= clamp(pow(16.0 * vig, 0.22), 0.0, 1.0);

    // Subtle film grain
    float noise = fract(sin(dot(uv + u_time * 0.01, vec2(12.9898, 78.233))) * 43758.5453);
    col += (noise - 0.5) * 0.02;

    fragColor = vec4(col, 1.0);
}
`;
