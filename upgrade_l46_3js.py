import codecs
import re

def upgrade_l46_to_3js():
    with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
        html = f.read()

    # 1. Update L46 Slide Content to include a THREE.js container instead of just a DOM bulb
    old_slide_pattern = r"title: `🔬 STEM Interactive: The Signal Matcher`,\s*content: `.*?`\s*\}"
    
    new_slide_content = """title: `🔬 STEM Interactive: The 3D Signal Matcher`,
                            content: `<div style="margin-bottom:15px;"><strong>Can you repeat the alien beacon sequence?</strong> Watch the 3D beacon and repeat the pattern!</div><div id="threejs-container-l46" style="width:100%; height:450px; background:rgba(0,0,0,0.8); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div id="l46-matcher-status" style="text-align:center; font-size:1.4em; font-weight:bold; height:30px; color:#aaa; margin-bottom:10px;">Click Debug to load the 3D Engine.</div><div class="energy-controls" onmousedown="window.L46.stop(event)" ontouchstart="window.L46.stop(event)" onclick="window.L46.click(event)"><button class="btn-debug" id="l46-btn-init">🛠️ Debug</button><button class="btn-drop" id="l46-btn-play" style="background:#2196f3;">▶️ Play Pattern</button><button class="btn-drop" id="l46-btn-short" style="background:#e91e63;">⚫ Short Pulse</button><button class="btn-slow" id="l46-btn-long" style="background:#4caf50;">▬ Long Pulse</button></div>`
                        }"""
    
    html, count = re.subn(old_slide_pattern, new_slide_content, html, flags=re.DOTALL)
    if count > 0:
        print("Updated L46 slide to use THREE.js container")
    else:
        print("Could not find old L46 slide.")

    # 2. Add window.L46 object to handle the clicks safely
    l46_obj_js = """
// --- L46 SAFE CONTROLS ---
window.L46 = {
    stop: function(e) {
        if (!e) return;
        e.stopPropagation();
    },
    click: function(e) {
        if (!e) return;
        e.stopPropagation();
        var id = e.target.id;
        
        if (id === 'l46-btn-init') {
            if (window.initSim) window.initSim('l46');
        } else if (id === 'l46-btn-play') {
            if (window.startL46Pattern) window.startL46Pattern();
        } else if (id === 'l46-btn-short') {
            if (window.inputL46Pattern) window.inputL46Pattern('short');
        } else if (id === 'l46-btn-long') {
            if (window.inputL46Pattern) window.inputL46Pattern('long');
        }
    }
};

window.l46Pattern = [];
window.l46UserInput = [];
window.l46IsPlaying = false;
window.l46BeaconMat = null;

window.startL46Pattern = async function() {
    if (window.l46IsPlaying || !window.l46BeaconMat) return;
    window.l46IsPlaying = true;
    window.l46UserInput = [];
    var status = document.getElementById('l46-matcher-status');
    if (status) status.innerHTML = 'Watch closely... 👀';
    
    window.l46Pattern = [];
    for(let i=0; i<4; i++) {
        window.l46Pattern.push(Math.random() > 0.5 ? 'long' : 'short');
    }
    
    await new Promise(r => setTimeout(r, 1000));
    
    for(let i=0; i<window.l46Pattern.length; i++) {
        window.l46BeaconMat.emissive.setHex(0x00ffff);
        window.l46BeaconMat.emissiveIntensity = 2.0;
        
        let duration = window.l46Pattern[i] === 'long' ? 600 : 200;
        await new Promise(r => setTimeout(r, duration));
        
        window.l46BeaconMat.emissive.setHex(0x000000);
        window.l46BeaconMat.emissiveIntensity = 0;
        await new Promise(r => setTimeout(r, 300));
    }
    
    if (status) status.innerHTML = 'Your turn! Repeat the pattern.';
    window.l46IsPlaying = false;
};

window.inputL46Pattern = function(type) {
    if (window.l46IsPlaying || window.l46Pattern.length === 0 || !window.l46BeaconMat) return;
    
    window.l46UserInput.push(type);
    
    window.l46BeaconMat.emissive.setHex(0x00ffff);
    window.l46BeaconMat.emissiveIntensity = 2.0;
    setTimeout(() => {
        window.l46BeaconMat.emissive.setHex(0x000000);
        window.l46BeaconMat.emissiveIntensity = 0;
    }, type === 'long' ? 400 : 150);
    
    var status = document.getElementById('l46-matcher-status');
    let currentIndex = window.l46UserInput.length - 1;
    
    if (window.l46UserInput[currentIndex] !== window.l46Pattern[currentIndex]) {
        if (status) status.innerHTML = '<span style="color:#ff4444;">❌ Incorrect pattern. Try again!</span>';
        window.l46Pattern = [];
    } else if (window.l46UserInput.length === window.l46Pattern.length) {
        if (status) status.innerHTML = '<span style="color:#4caf50;">✅ Perfect match! Access Granted.</span>';
        window.l46Pattern = [];
    }
};

window.setupL46Sim = function(sim) {
    sim.camera.position.set(0, 5, 12);
    sim.camera.lookAt(0, 0, 0);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    sim.scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 10, 5);
    sim.scene.add(pointLight);
    
    // Abstract Beacon structure
    const baseGeo = new THREE.CylinderGeometry(2, 2.5, 1, 32);
    const baseMat = new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.8, metalness: 0.5 });
    const base = new THREE.Mesh(baseGeo, baseMat);
    base.position.y = -2;
    sim.scene.add(base);
    
    const pillarGeo = new THREE.CylinderGeometry(0.5, 1, 4, 16);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.8 });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.y = 0.5;
    sim.scene.add(pillar);
    
    const beaconGeo = new THREE.SphereGeometry(1.5, 32, 32);
    window.l46BeaconMat = new THREE.MeshStandardMaterial({ 
        color: 0x111111,
        emissive: 0x000000,
        emissiveIntensity: 0,
        transparent: true,
        opacity: 0.9,
        roughness: 0.1,
        metalness: 0.1
    });
    const beacon = new THREE.Mesh(beaconGeo, window.l46BeaconMat);
    beacon.position.y = 3.5;
    sim.scene.add(beacon);
    
    // Rings
    const ringGeo = new THREE.TorusGeometry(2, 0.1, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0xffaa00, emissiveIntensity: 0.5 });
    
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.position.y = 3.5;
    ring1.rotation.x = Math.PI / 2;
    sim.scene.add(ring1);
    
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.position.y = 3.5;
    sim.scene.add(ring2);
    
    sim.l46Objects = { ring1: ring1, ring2: ring2, beacon: beacon };
    
    document.getElementById('l46-matcher-status').innerHTML = "Alien Beacon Online. Click Play Pattern.";
};

window.animateL46Sim = function(sim) {
    if(sim.l46Objects) {
        sim.l46Objects.ring1.rotation.y += 0.02;
        sim.l46Objects.ring2.rotation.x += 0.02;
        sim.l46Objects.ring2.rotation.y += 0.01;
        sim.l46Objects.beacon.rotation.y -= 0.005;
    }
};
"""

    # Inject L46 JS
    if "window.L46 = {" not in html:
        html = html.replace("// --- L47 SAFE CONTROLS ---", l46_obj_js + "\n// --- L47 SAFE CONTROLS ---")
        if "window.L46 = {" not in html:
            # Fallback
            html = html.replace("window.L44 = {", l46_obj_js + "\nwindow.L44 = {")
        print("Injected L46 JS logic")

    # 3. Modify initSim to call our setupL46Sim
    initsim_old = "if (id === 'l44') {"
    initsim_new = """if (id === 'l46') {
        if(window.setupL46Sim) window.setupL46Sim(sim);
        sim.customRender = function() {
            if(window.animateL46Sim) window.animateL46Sim(sim);
        };
    } else if (id === 'l44') {"""
    
    # only replace if not already there
    if "if (id === 'l46') {" not in html:
        html = html.replace(initsim_old, initsim_new)
        print("Hooked L46 into initSim")

    with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
        f.write(html)
    print("3JS functionality added back to L46!")

if __name__ == "__main__":
    upgrade_l46_to_3js()
