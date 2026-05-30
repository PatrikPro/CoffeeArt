/* =====================================================================
   CafeArt — 3D Hero Scene (three.js)
   A procedurally-built ceramic coffee cup with rising steam, floating
   beans, soft studio reflections, drag-to-spin + scroll parallax.
   ===================================================================== */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const PALETTE = {
    ceramic: 0xf3e7d6,
    ceramicShade: 0xd8c2a4,
    coffee: 0x3a2113,
    coffeeDeep: 0x1d0f08,
    bean: 0x4a2c1d,
    beanDark: 0x2c1810,
    gold: 0xe0b878,
    warm: 0xffb066,
    cool: 0x6a7fb8,
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function fail(reason) {
    console.warn('[CafeArt scene] falling back to CSS:', reason);
    document.getElementById('home')?.classList.add('no-webgl');
    window.dispatchEvent(new CustomEvent('scene:error', { detail: reason }));
}

function boot() {
    const canvas = document.getElementById('coffeeCanvas');
    if (!canvas) return fail('no canvas');

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        });
    } catch (e) {
        return fail('webgl unavailable');
    }

    const hero = document.getElementById('home');
    let width = hero.clientWidth;
    let height = hero.clientHeight;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();

    // Soft studio reflections (no external HDR needed)
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;

    // ---- Camera ----
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 8.2);
    camera.lookAt(0, 0.4, 0);

    // ===================================================================
    // LIGHTING
    // ===================================================================
    scene.add(new THREE.HemisphereLight(0xfff1dd, 0x2a160c, 0.55));

    const key = new THREE.DirectionalLight(0xffe9c7, 2.6);
    key.position.set(4, 7, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 25;
    key.shadow.camera.left = key.shadow.camera.bottom = -6;
    key.shadow.camera.right = key.shadow.camera.top = 6;
    key.shadow.bias = -0.0004;
    key.shadow.radius = 6;
    scene.add(key);

    const warmRim = new THREE.PointLight(PALETTE.warm, 22, 18, 2);
    warmRim.position.set(-3.5, 2.2, 2.5);
    scene.add(warmRim);

    const coolRim = new THREE.PointLight(PALETTE.cool, 12, 18, 2);
    coolRim.position.set(3.8, 0.4, -3);
    scene.add(coolRim);

    const fill = new THREE.DirectionalLight(0xffd9a8, 0.6);
    fill.position.set(-5, 1, 4);
    scene.add(fill);

    // ===================================================================
    // THE COFFEE CUP
    // ===================================================================
    const cupGroup = new THREE.Group();
    cupGroup.position.y = -0.2;
    scene.add(cupGroup);

    const ceramicMat = new THREE.MeshStandardMaterial({
        color: PALETTE.ceramic, roughness: 0.32, metalness: 0.04,
        envMapIntensity: 1.1,
    });
    const ceramicInner = new THREE.MeshStandardMaterial({
        color: PALETTE.ceramicShade, roughness: 0.5, metalness: 0.02,
        side: THREE.BackSide,
    });
    const coffeeMat = new THREE.MeshStandardMaterial({
        color: PALETTE.coffee, roughness: 0.12, metalness: 0.35,
        envMapIntensity: 1.4,
    });

    // Outer body (slightly tapered)
    const body = new THREE.Mesh(
        new THREE.CylinderGeometry(1.12, 0.84, 1.5, 64, 1, true),
        ceramicMat
    );
    body.castShadow = body.receiveShadow = true;
    cupGroup.add(body);

    // Inner wall
    const inner = new THREE.Mesh(
        new THREE.CylinderGeometry(1.06, 0.8, 1.5, 64, 1, true),
        ceramicInner
    );
    cupGroup.add(inner);

    // Rounded lip
    const lip = new THREE.Mesh(
        new THREE.TorusGeometry(1.09, 0.06, 18, 64),
        ceramicMat
    );
    lip.rotation.x = Math.PI / 2;
    lip.position.y = 0.75;
    lip.castShadow = true;
    cupGroup.add(lip);

    // Bottom cap
    const bottom = new THREE.Mesh(
        new THREE.CircleGeometry(0.84, 64),
        ceramicMat
    );
    bottom.rotation.x = -Math.PI / 2;
    bottom.position.y = -0.75;
    bottom.receiveShadow = true;
    cupGroup.add(bottom);

    // Coffee surface — a touch below the rim
    const coffee = new THREE.Mesh(
        new THREE.CircleGeometry(1.02, 64),
        coffeeMat
    );
    coffee.rotation.x = -Math.PI / 2;
    coffee.position.y = 0.6;
    cupGroup.add(coffee);

    // Crema ring on the coffee
    const crema = new THREE.Mesh(
        new THREE.RingGeometry(0.66, 0.98, 64),
        new THREE.MeshStandardMaterial({
            color: 0x6f4e37, roughness: 0.6, metalness: 0.1,
            transparent: true, opacity: 0.55,
        })
    );
    crema.rotation.x = -Math.PI / 2;
    crema.position.y = 0.605;
    cupGroup.add(crema);

    // Latte-art heart sitting in the crema (built from two discs + a tip)
    const artMat = new THREE.MeshStandardMaterial({ color: 0xe9d6bb, roughness: 0.7 });
    const heart = new THREE.Group();
    const lobeGeo = new THREE.CircleGeometry(0.2, 32);
    const lobeL = new THREE.Mesh(lobeGeo, artMat); lobeL.position.set(-0.13, 0, 0.1);
    const lobeR = new THREE.Mesh(lobeGeo, artMat); lobeR.position.set(0.13, 0, 0.1);
    const tip = new THREE.Mesh(new THREE.CircleGeometry(0.2, 3), artMat);
    tip.rotation.z = Math.PI; tip.position.set(0, -0.22, 0.1); tip.scale.set(1.35, 1.5, 1);
    heart.add(lobeL, lobeR, tip);
    heart.rotation.x = -Math.PI / 2;
    heart.position.y = 0.61;
    heart.scale.setScalar(0.9);
    cupGroup.add(heart);

    // Handle (open torus arc)
    const handle = new THREE.Mesh(
        new THREE.TorusGeometry(0.46, 0.11, 20, 48, Math.PI * 1.35),
        ceramicMat
    );
    handle.position.set(1.16, 0.0, 0);
    handle.rotation.z = -Math.PI * 0.32;
    handle.castShadow = true;
    cupGroup.add(handle);

    // Saucer
    const saucer = new THREE.Mesh(
        new THREE.CylinderGeometry(2.1, 1.7, 0.16, 64),
        ceramicMat
    );
    saucer.position.y = -1.05;
    saucer.castShadow = saucer.receiveShadow = true;
    cupGroup.add(saucer);

    const saucerWell = new THREE.Mesh(
        new THREE.CylinderGeometry(1.0, 0.95, 0.06, 64),
        ceramicInner
    );
    saucerWell.position.y = -0.95;
    cupGroup.add(saucerWell);

    // Soft contact shadow disc under the saucer
    const groundShadow = new THREE.Mesh(
        new THREE.CircleGeometry(3.2, 48),
        new THREE.MeshBasicMaterial({
            color: 0x000000, transparent: true, opacity: 0.32,
        })
    );
    groundShadow.rotation.x = -Math.PI / 2;
    groundShadow.position.y = -1.14;
    cupGroup.add(groundShadow);

    // ===================================================================
    // STEAM (GPU particles with a soft sprite + height-based fade)
    // ===================================================================
    function makePuffTexture() {
        const c = document.createElement('canvas');
        c.width = c.height = 64;
        const ctx = c.getContext('2d');
        const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.4, 'rgba(255,250,240,0.5)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 64);
        const tex = new THREE.CanvasTexture(c);
        tex.colorSpace = THREE.SRGBColorSpace;
        return tex;
    }

    const STEAM_COUNT = 90;
    const steamGeo = new THREE.BufferGeometry();
    const sPos = new Float32Array(STEAM_COUNT * 3);
    const sLife = new Float32Array(STEAM_COUNT);
    const sSpeed = new Float32Array(STEAM_COUNT);
    const sSeed = new Float32Array(STEAM_COUNT);
    for (let i = 0; i < STEAM_COUNT; i++) {
        sPos[i * 3] = (Math.random() - 0.5) * 0.9;
        sPos[i * 3 + 1] = 0.6 + Math.random() * 2.6;
        sPos[i * 3 + 2] = (Math.random() - 0.5) * 0.9;
        sLife[i] = Math.random();
        sSpeed[i] = 0.18 + Math.random() * 0.22;
        sSeed[i] = Math.random() * Math.PI * 2;
    }
    steamGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
    steamGeo.setAttribute('aLife', new THREE.BufferAttribute(sLife, 1));
    steamGeo.setAttribute('aSeed', new THREE.BufferAttribute(sSeed, 1));

    const steamMat = new THREE.ShaderMaterial({
        uniforms: {
            uTex: { value: makePuffTexture() },
            uSize: { value: height * 0.16 },
            uColor: { value: new THREE.Color(0xfff4e4) },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: /* glsl */`
            attribute float aLife;
            attribute float aSeed;
            uniform float uSize;
            varying float vLife;
            void main() {
                vLife = aLife;
                vec3 p = position;
                // wisp sideways as it rises
                p.x += sin(aSeed + aLife * 6.2831) * 0.35 * aLife;
                p.z += cos(aSeed + aLife * 4.7) * 0.28 * aLife;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_PointSize = uSize * (0.25 + aLife * 1.4) / -mv.z;
                gl_Position = projectionMatrix * mv;
            }
        `,
        fragmentShader: /* glsl */`
            uniform sampler2D uTex;
            uniform vec3 uColor;
            varying float vLife;
            void main() {
                float fade = smoothstep(0.0, 0.18, vLife) * (1.0 - smoothstep(0.55, 1.0, vLife));
                vec4 tex = texture2D(uTex, gl_PointCoord);
                gl_FragColor = vec4(uColor, tex.a * fade * 0.5);
            }
        `,
    });
    const steam = new THREE.Points(steamGeo, steamMat);
    steam.position.y = 0.6;
    cupGroup.add(steam);

    // ===================================================================
    // FLOATING COFFEE BEANS
    // ===================================================================
    const beanBodyMat = new THREE.MeshStandardMaterial({
        color: PALETTE.bean, roughness: 0.45, metalness: 0.1, envMapIntensity: 0.8,
    });
    const beanSeamMat = new THREE.MeshStandardMaterial({
        color: PALETTE.beanDark, roughness: 0.6,
    });

    function makeBean() {
        const g = new THREE.Group();
        const body = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 24), beanBodyMat);
        body.scale.set(1, 0.62, 0.78);
        body.castShadow = true;
        // seam: a thin flattened ellipsoid pressed across the bean
        const seam = new THREE.Mesh(new THREE.SphereGeometry(0.5, 24, 8), beanSeamMat);
        seam.scale.set(0.96, 0.08, 0.2);
        seam.position.y = 0.31;
        g.add(body, seam);
        return g;
    }

    const beans = [];
    const BEAN_COUNT = 9;
    for (let i = 0; i < BEAN_COUNT; i++) {
        const b = makeBean();
        const r = 3.0 + Math.random() * 2.2;
        const a = (i / BEAN_COUNT) * Math.PI * 2 + Math.random();
        b.position.set(
            Math.cos(a) * r,
            (Math.random() - 0.35) * 4,
            Math.sin(a) * r - 1.5
        );
        const s = 0.28 + Math.random() * 0.3;
        b.scale.setScalar(s);
        b.userData = {
            spin: new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(0.5),
            floatSeed: Math.random() * Math.PI * 2,
            floatAmp: 0.2 + Math.random() * 0.3,
            baseX: b.position.x,
            baseY: b.position.y,
        };
        beans.push(b);
        scene.add(b);
    }

    // ===================================================================
    // DUST MOTES (subtle background sparkle)
    // ===================================================================
    const MOTE = 70;
    const mPos = new Float32Array(MOTE * 3);
    for (let i = 0; i < MOTE; i++) {
        mPos[i * 3] = (Math.random() - 0.5) * 16;
        mPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
        mPos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute('position', new THREE.BufferAttribute(mPos, 3));
    const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({
        color: PALETTE.gold, size: 0.05, transparent: true, opacity: 0.5,
        depthWrite: false, blending: THREE.AdditiveBlending,
    }));
    scene.add(motes);

    // ===================================================================
    // INTERACTION
    // ===================================================================
    const pointer = { x: 0, y: 0 };           // -1..1 parallax target
    const drag = { active: false, lastX: 0, vel: 0 };
    let scrollFrac = 0;

    function onPointerMove(e) {
        const t = e.touches ? e.touches[0] : e;
        pointer.x = (t.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (t.clientY / window.innerHeight) * 2 - 1;
        if (drag.active) {
            const dx = t.clientX - drag.lastX;
            drag.lastX = t.clientX;
            drag.vel = dx * 0.01;
        }
    }
    function onDown(e) {
        drag.active = true;
        drag.lastX = (e.touches ? e.touches[0] : e).clientX;
        document.getElementById('dragHint')?.style.setProperty('opacity', '0');
    }
    function onUp() { drag.active = false; }

    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onUp);

    window.addEventListener('scroll', () => {
        scrollFrac = Math.min(1, window.scrollY / Math.max(height, 1));
    }, { passive: true });

    function resize() {
        width = hero.clientWidth;
        height = hero.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        steamMat.uniforms.uSize.value = height * 0.16;
    }
    window.addEventListener('resize', resize);

    // Pause rendering when the hero is off-screen
    let visible = true;
    const io = new IntersectionObserver(
        ([entry]) => { visible = entry.isIntersecting; },
        { threshold: 0 }
    );
    io.observe(hero);

    // ===================================================================
    // ANIMATION LOOP
    // ===================================================================
    const clock = new THREE.Clock();
    let ready = false;

    function tick() {
        requestAnimationFrame(tick);
        if (!visible) return;

        const dt = Math.min(clock.getDelta(), 0.05);
        const t = clock.elapsedTime;

        // Cup: auto-spin + drag momentum, gentle bob, scroll tilt
        cupGroup.rotation.y += (reduceMotion ? 0 : dt * 0.25) + drag.vel;
        if (!drag.active) drag.vel *= 0.94;        // momentum decay after release
        if (!reduceMotion) {
            cupGroup.position.y = -0.2 + Math.sin(t * 1.1) * 0.06;
            cupGroup.rotation.z = Math.sin(t * 0.6) * 0.015;
        }
        cupGroup.rotation.x = 0.04 + pointer.y * 0.08 + scrollFrac * 0.5;

        // Steam rises + recycles
        const life = steamGeo.attributes.aLife.array;
        const pos = steamGeo.attributes.position.array;
        for (let i = 0; i < STEAM_COUNT; i++) {
            life[i] += dt * sSpeed[i] * (reduceMotion ? 0.3 : 1);
            if (life[i] > 1) {
                life[i] = 0;
                pos[i * 3] = (Math.random() - 0.5) * 0.9;
                pos[i * 3 + 2] = (Math.random() - 0.5) * 0.9;
            }
            pos[i * 3 + 1] = life[i] * 3.0;
        }
        steamGeo.attributes.aLife.needsUpdate = true;
        steamGeo.attributes.position.needsUpdate = true;

        // Beans drift, bob, tumble
        for (const b of beans) {
            const u = b.userData;
            if (!reduceMotion) {
                b.rotation.x += u.spin.x * dt;
                b.rotation.y += u.spin.y * dt;
                b.rotation.z += u.spin.z * dt;
                b.position.y = u.baseY + Math.sin(t * 0.6 + u.floatSeed) * u.floatAmp;
            }
            // bounded parallax offset from the bean's home position
            b.position.x = u.baseX + pointer.x * 0.2;
        }

        if (!reduceMotion) motes.rotation.y += dt * 0.02;

        // Camera parallax + scroll drift
        camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.04;
        camera.position.y += ((1.6 - pointer.y * 0.4 - scrollFrac * 1.2) - camera.position.y) * 0.04;
        camera.lookAt(0, 0.4 - scrollFrac * 0.3, 0);

        renderer.render(scene, camera);

        if (!ready) {
            ready = true;
            window.dispatchEvent(new CustomEvent('scene:ready'));
        }
    }

    // Kick a resize once fonts/layout settle, then start
    resize();
    tick();
}

// Defer until DOM is parsed
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}
