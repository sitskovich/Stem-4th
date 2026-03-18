
// Custom Bundle 4 STEM Simulators
let b4Sim = {
    renderer: null, scene: null, camera: null, animationId: null,
    pointsGeo: null, pointsMat: null, points: null, cubes: [], speeds: [], speed: 1, isPlaying: false, frame: 0, 
    uniforms: { amp: 2.0, targetAmp: 2.0, freq: 1.0, targetFreq: 1.0, earthquakePulse: 0.0, pulseX: -15.0 },
    currentLesson: null
};

window.initSim = function(lessonId) {
    b4Sim.currentLesson = lessonId;
    let container = document.getElementById("threejs-container-" + lessonId);
    if (!container) return;
    
    if (b4Sim.renderer) {
        cancelAnimationFrame(b4Sim.animationId);
        container.innerHTML = '';
        b4Sim.cubes = [];
        b4Sim.points = null;
    }
    
    b4Sim.scene = new THREE.Scene();
    b4Sim.scene.background = new THREE.Color(0x0a0f1e);
    b4Sim.camera = new THREE.PerspectiveCamera(65, container.clientWidth / container.clientHeight, 0.1, 1000);
    b4Sim.renderer = new THREE.WebGLRenderer({ antialias: true });
    b4Sim.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(b4Sim.renderer.domElement);
    
    b4Sim.scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    let dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    b4Sim.scene.add(dirLight);

    b4Sim.frame = 0;
    b4Sim.isPlaying = true;
    b4Sim.speed = 1;

    if (lessonId === 'l39' || lessonId === 'l40') {
        setupWave(lessonId);
    } else if (lessonId === 'l42') {
        b4Sim.isPlaying = false;
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
    b4Sim.camera.position.z = 12;
    b4Sim.camera.position.y = 1;
    
    b4Sim.pointsGeo = new THREE.BufferGeometry();
    let numPoints = 150;
    let positions = new Float32Array(numPoints * 3);
    for(let i=0; i<numPoints; i++) {
        let x = -15 + i * 0.2;
        positions[i*3] = x;
        positions[i*3+1] = 0;
        positions[i*3+2] = 0;
    }
    b4Sim.pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    b4Sim.pointsMat = new THREE.PointsMaterial({ color: 0x00d4aa, size: 0.3 });
    b4Sim.points = new THREE.Points(b4Sim.pointsGeo, b4Sim.pointsMat);
    b4Sim.scene.add(b4Sim.points);
}

function setupRace() {
    b4Sim.camera.position.z = 20;
    let geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    let mats = [
        new THREE.MeshPhongMaterial({ color: 0xff4444 }), 
        new THREE.MeshPhongMaterial({ color: 0x4444ff }), 
        new THREE.MeshPhongMaterial({ color: 0x44ff44 })  
    ];
    for (let i=0; i<3; i++) {
        let m = new THREE.Mesh(geo, mats[i]);
        m.position.set(-10, 5 - i*5, 0);
        b4Sim.scene.add(m);
        b4Sim.cubes.push(m);
    }
    b4Sim.speeds = [0.1, 0.8, 4.0]; 
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
        b4Sim.uniforms.amp += (b4Sim.uniforms.targetAmp - b4Sim.uniforms.amp) * 0.05;
        b4Sim.uniforms.freq += (b4Sim.uniforms.targetFreq - b4Sim.uniforms.freq) * 0.05;
        
        let positions = b4Sim.points.geometry.attributes.position.array;
        
        if (b4Sim.uniforms.earthquakePulse > 0.1) {
            b4Sim.uniforms.pulseX += 0.3 * b4Sim.speed; 
            b4Sim.uniforms.earthquakePulse *= 0.98; 
        } else {
            b4Sim.uniforms.pulseX = -15;
            b4Sim.uniforms.earthquakePulse = 0;
            b4Sim.points.material.color.setHex(0x00d4aa);
        }
        
        for(let i=0; i<150; i++) {
            let x = positions[i*3];
            let y = Math.sin(b4Sim.frame - x * b4Sim.uniforms.freq) * b4Sim.uniforms.amp;
            
            let dist = Math.abs(x - b4Sim.uniforms.pulseX);
            if (dist < 4) {
               let force = Math.exp(-dist*dist) * b4Sim.uniforms.earthquakePulse;
               y += force * Math.sin(b4Sim.frame * 2 - x * 4);
            }
            positions[i*3+1] = y;
        }
        b4Sim.points.geometry.attributes.position.needsUpdate = true;
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

window.triggerEarthquake = function() {
    b4Sim.uniforms.earthquakePulse = 18.0; 
    b4Sim.uniforms.pulseX = -15.0; 
    if(b4Sim.points) b4Sim.points.material.color.setHex(0xff4444); 
};

window.waveIncAmp = function() { b4Sim.uniforms.targetAmp = Math.min(10, b4Sim.uniforms.targetAmp + 1.0); };
window.waveDecAmp = function() { b4Sim.uniforms.targetAmp = Math.max(0.5, b4Sim.uniforms.targetAmp - 1.0); };
window.waveIncLength = function() { b4Sim.uniforms.targetFreq = Math.max(0.2, b4Sim.uniforms.targetFreq - 0.2); };
window.waveDecLength = function() { b4Sim.uniforms.targetFreq = Math.min(5.0, b4Sim.uniforms.targetFreq + 0.2); };

window.startSoundRace = function() { b4Sim.isPlaying = true; b4Sim.frame = 0; };
window.pauseSoundRace = function() { b4Sim.isPlaying = false; };
window.resetSoundRace = function() { b4Sim.isPlaying = false; b4Sim.frame = 0; if(b4Sim.currentLesson) updateSim(b4Sim.currentLesson); };
window.startZenWave = function() { b4Sim.isPlaying = true; };
window.pauseZenWave = function() { b4Sim.isPlaying = false; };
window.resetLightScene = function() { b4Sim.isPlaying = false; b4Sim.frame = 0; };

