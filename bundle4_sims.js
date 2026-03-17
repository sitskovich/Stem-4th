// Custom Bundle 4 STEM Simulators
let b4Sim = {
    renderer: null, scene: null, camera: null, animationId: null,
    cubes: [], speeds: [], speed: 1, isPlaying: false, frame: 0, uniforms: { amp: 2, freq: 0.5 },
    currentLesson: null
};

window.initSim = function(lessonId) {
    b4Sim.currentLesson = lessonId;
    let container = document.getElementById("threejs-container-" + lessonId);
    if (!container) return;
    
    if (b4Sim.renderer) {
        cancelAnimationFrame(b4Sim.animationId);
        container.innerHTML = '';
    }
    
    b4Sim.scene = new THREE.Scene();
    b4Sim.scene.background = new THREE.Color(0x1a1a2e);
    b4Sim.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    b4Sim.renderer = new THREE.WebGLRenderer({ antialias: true });
    b4Sim.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(b4Sim.renderer.domElement);
    
    b4Sim.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    let dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    b4Sim.scene.add(dirLight);

    b4Sim.cubes = [];
    b4Sim.speeds = [];
    b4Sim.frame = 0;
    b4Sim.isPlaying = false;
    b4Sim.speed = 1;

    if (lessonId === 'l39' || lessonId === 'l40') {
        setupWave(lessonId);
    } else if (lessonId === 'l42') {
        setupRace();
    } else {
        setupGenericOrbit();
    }
    
    function animate() {
        b4Sim.animationId = requestAnimationFrame(animate);
        if (b4Sim.isPlaying) {
            b4Sim.frame += 0.05 * b4Sim.speed;
        }
        updateSim(lessonId);
        b4Sim.renderer.render(b4Sim.scene, b4Sim.camera);
    }
    animate();
};

function setupWave(id) {
    b4Sim.camera.position.z = 15;
    let geo = new THREE.SphereGeometry(0.3, 16, 16);
    let mat = new THREE.MeshPhongMaterial({ color: 0x00d4aa });
    let highlight = new THREE.MeshPhongMaterial({ color: 0xff4444 });
    for(let i = 0; i < 40; i++) {
        let mesh = new THREE.Mesh(geo, i === 20 ? highlight : mat);
        mesh.position.x = -10 + i * 0.5;
        b4Sim.scene.add(mesh);
        b4Sim.cubes.push(mesh);
    }
}

function setupRace() {
    b4Sim.camera.position.z = 20;
    let geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    let mats = [
        new THREE.MeshPhongMaterial({ color: 0xff4444 }), // Gas
        new THREE.MeshPhongMaterial({ color: 0x4444ff }), // Liquid
        new THREE.MeshPhongMaterial({ color: 0x44ff44 })  // Solid
    ];
    for (let i=0; i<3; i++) {
        let m = new THREE.Mesh(geo, mats[i]);
        m.position.set(-10, 5 - i*5, 0);
        b4Sim.scene.add(m);
        b4Sim.cubes.push(m);
    }
    b4Sim.speeds = [0.1, 0.8, 4.0]; // Slow (Gas), Medium (Liquid), Fast (Solid)
}

function setupGenericOrbit() {
    b4Sim.camera.position.z = 12;
    let geo = new THREE.TorusGeometry(3, 0.5, 16, 100);
    let mat = new THREE.MeshPhongMaterial({ color: 0x667eea, wireframe: true });
    let m = new THREE.Mesh(geo, mat);
    b4Sim.scene.add(m);
    b4Sim.cubes.push(m);
}

function updateSim(id) {
    if (!b4Sim.scene) return;
    if (id === 'l39' || id === 'l40') {
        b4Sim.cubes.forEach((cube, i) => {
            cube.position.y = Math.sin(b4Sim.frame - i * b4Sim.uniforms.freq) * b4Sim.uniforms.amp;
        });
    } else if (id === 'l42') {
        b4Sim.cubes.forEach((cube, i) => {
            let p = -10 + b4Sim.frame * b4Sim.speeds[i];
            cube.position.x = Math.min(10, p);
        });
    } else {
        if (b4Sim.cubes.length) {
            b4Sim.cubes[0].rotation.x += 0.01 * b4Sim.speed;
            b4Sim.cubes[0].rotation.y += 0.02 * b4Sim.speed;
        }
    }
}

// Rope Wave Global Hooks
window.startRopeWave = function() { b4Sim.isPlaying = true; b4Sim.speed = 1; };
window.pauseRopeWave = function() { b4Sim.isPlaying = false; };
window.slowMoRopeWave = function() { b4Sim.isPlaying = true; b4Sim.speed = 0.2; };

// Amplitude Hooks
window.waveIncAmp = function() { b4Sim.uniforms.amp = Math.min(5, b4Sim.uniforms.amp + 0.5); };
window.waveDecAmp = function() { b4Sim.uniforms.amp = Math.max(0.5, b4Sim.uniforms.amp - 0.5); };
window.waveIncLength = function() { b4Sim.uniforms.freq = Math.max(0.1, b4Sim.uniforms.freq - 0.1); };
window.waveDecLength = function() { b4Sim.uniforms.freq = Math.min(2.0, b4Sim.uniforms.freq + 0.1); };

// Sound Race Hooks
window.startSoundRace = function() { b4Sim.isPlaying = true; b4Sim.frame = 0; };
window.pauseSoundRace = function() { b4Sim.isPlaying = false; };
window.resetSoundRace = function() { b4Sim.isPlaying = false; b4Sim.frame = 0; if(b4Sim.currentLesson) updateSim(b4Sim.currentLesson); };

// Catchalls for the rest
window.startZenWave = function() { b4Sim.isPlaying = true; };
window.pauseZenWave = function() { b4Sim.isPlaying = false; };
window.resetLightScene = function() { b4Sim.isPlaying = false; b4Sim.frame = 0; };
