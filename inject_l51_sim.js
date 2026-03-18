const fs = require('fs');
let html = fs.readFileSync('interactive-teacher-portal.html', 'utf-8');

const insertAfter = 'window.animateL50Sim = function(sim) {';
const idx = html.indexOf(insertAfter);
if (idx === -1) { console.error("Could not find L50 animate function"); process.exit(1); }

// Find the closing of the animateL50Sim function block  
// It ends with `};` after the function body
const afterIdx = html.indexOf('};', idx) + 2;

const l51Code = `

// ============================================
// LESSON 51: Communication Wave Sim
// ============================================
window.L51 = {
    isInit: false,
    medium: 'air',
    scene: null,
    camera: null,
    renderer: null,
    particles: [],
    animId: null,
    time: 0,

    init: function() {
        const container = document.getElementById('threejs-container-l51');
        if (!container) return;
        container.innerHTML = '';

        // Cancel any previous animation
        if (this.animId) cancelAnimationFrame(this.animId);

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0a0a1a);
        const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(renderer.domElement);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        // Lights
        scene.add(new THREE.AmbientLight(0x404060));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(5, 10, 5);
        scene.add(dirLight);

        // Grid
        const grid = new THREE.GridHelper(60, 60, 0x111133, 0x080818);
        scene.add(grid);

        camera.position.set(0, 8, 25);
        camera.lookAt(0, 0, 0);

        this.isInit = true;
        this.buildMedium('air');
        this.animate();
    },

    buildMedium: function(type) {
        // Clear old particles
        this.particles.forEach(p => this.scene.remove(p));
        this.particles = [];
        this.time = 0;

        let color, wireColor, count, gap, speed, label;

        if (type === 'air') {
            color = 0x88bbff; wireColor = 0x334466; count = 40; gap = 0.7; speed = 0.03; label = 'Medium: AIR (Sound ~ 767 mph)';
        } else if (type === 'copper') {
            color = 0xffaa44; wireColor = 0x885522; count = 50; gap = 0.55; speed = 0.12; label = 'Medium: COPPER WIRE (⚡ ~670M mph)';
        } else {
            color = 0x00ffcc; wireColor = 0x006644; count = 60; gap = 0.45; speed = 0.25; label = 'Medium: FIBER OPTIC (💡 670M mph)';
        }

        // Update HUD
        const hud = document.getElementById('l51-hud');
        if (hud) {
            hud.textContent = label;
            hud.style.color = '#' + color.toString(16).padStart(6, '0');
        }

        // Build the wire/medium line
        const wireGeo = new THREE.CylinderGeometry(0.08, 0.08, count * gap, 8);
        const wireMat = new THREE.MeshStandardMaterial({ color: wireColor, metalness: 0.6 });
        const wire = new THREE.Mesh(wireGeo, wireMat);
        wire.rotation.z = Math.PI / 2;
        wire.position.y = 0.3;
        this.scene.add(wire);
        this.particles.push(wire);

        // Build signal particles along the wire
        for (let i = 0; i < count; i++) {
            const geo = new THREE.SphereGeometry(0.25, 12, 12);
            const mat = new THREE.MeshPhongMaterial({ color: color, emissive: 0x000000 });
            const sphere = new THREE.Mesh(geo, mat);
            sphere.position.x = (i - count / 2) * gap;
            sphere.position.y = 0.3;
            sphere.userData = { baseX: sphere.position.x, index: i, color: color, speed: speed };
            this.scene.add(sphere);
            this.particles.push(sphere);
        }

        // Source transmitter
        const txGeo = new THREE.BoxGeometry(1.5, 2, 1.5);
        const txMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8 });
        const tx = new THREE.Mesh(txGeo, txMat);
        tx.position.set((-count / 2) * gap - 2, 1, 0);
        this.scene.add(tx);
        this.particles.push(tx);

        // Receiver
        const rxGeo = new THREE.BoxGeometry(1.5, 2, 1.5);
        const rxMat = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8 });
        const rx = new THREE.Mesh(rxGeo, rxMat);
        rx.position.set((count / 2) * gap + 2, 1, 0);
        this.scene.add(rx);
        this.particles.push(rx);

        // Transmitter label
        const txLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 0.8),
            new THREE.MeshBasicMaterial({ color: 0x22cc66, transparent: true, opacity: 0.9 })
        );
        txLabel.position.set(tx.position.x, 3, 0);
        this.scene.add(txLabel);
        this.particles.push(txLabel);

        // Receiver label
        const rxLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(3, 0.8),
            new THREE.MeshBasicMaterial({ color: 0xcc2244, transparent: true, opacity: 0.9 })
        );
        rxLabel.position.set(rx.position.x, 3, 0);
        this.scene.add(rxLabel);
        this.particles.push(rxLabel);
    },

    setMedium: function(type) {
        if (!this.isInit) return;
        this.medium = type;
        this.buildMedium(type);
    },

    animate: function() {
        const self = this;
        function loop() {
            self.animId = requestAnimationFrame(loop);
            if (!self.isInit) return;
            self.time += 1;

            self.particles.forEach(p => {
                if (p.userData && p.userData.index !== undefined) {
                    const i = p.userData.index;
                    const speed = p.userData.speed;
                    const wave = Math.sin(speed * (i * 3) - self.time * speed * 2);
                    p.position.y = 0.3 + wave * 1.5;

                    // Glow effect: brighter at crest
                    const brightness = (wave + 1) / 2;
                    p.material.emissive.setHex(
                        p.userData.color === 0x88bbff ? Math.floor(brightness * 0x334488) :
                        p.userData.color === 0xffaa44 ? Math.floor(brightness * 0x885500) :
                        Math.floor(brightness * 0x006644)
                    );
                    p.scale.setScalar(0.8 + brightness * 0.6);
                }
            });

            self.renderer.render(self.scene, self.camera);
        }
        loop();
    }
};
`;

const newHtml = html.substring(0, afterIdx) + l51Code + html.substring(afterIdx);
fs.writeFileSync('interactive-teacher-portal.html', newHtml);
console.log("SUCCESS: L51 sim code injected (" + l51Code.length + " chars)");
