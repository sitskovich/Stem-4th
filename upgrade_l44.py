import codecs
import re

def upgrade_l44():
    with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
        html = f.read()

    # Define the new 14-slide curriculum
    l44_replacement = """'lesson44': {
                    title: `Reflection & Refraction (Rigorous Edition)`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Broken Pencil`,
                            content: `<div class="journal-box"><strong>Look at a clear glass of water with a pencil resting in it.</strong><br><br>📓 <strong>Task:</strong> Draw exactly what you see happening to the pencil where the air meets the water.<ol style="line-height:1.8; margin-top:10px;"><li>Does the pencil look straight?</li><li>What illusion is happening?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain how a polished surface causes <strong>Reflection</strong>.</li><li>Explain how light bends, or <strong>Refracts</strong>, when it changes medium.</li><li>Predict the angle of reflection based on the angle of incidence.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#e91e63; background:rgba(233,30,99,0.15);"><strong>🛰️ Mission Context:</strong> We can manipulate light to solve our line-of-sight problems! We can use mirrors to bounce our signal, or lenses to focus a weak light into a powerful beam!</div>`,
                            vocabulary: [
                                { term: `Reflection`, definition: `When a light wave strikes an object and bounces off.` },
                                { term: `Refraction`, definition: `The bending of a wave as it enters a new medium at an angle.` },
                                { term: `Law of Reflection`, definition: `The angle of incidence equals the angle of reflection.` },
                                { term: `Index of Refraction`, definition: `A measure of how much a ray of light bends when it enters a material.` }
                            ]
                        },
                        {
                            title: `📜 Perspective: Why is an Apple Red?`,
                            content: `<div style="line-height:1.7;">White light from the sun actually contains every color of the rainbow.</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.1);">When white light hits an apple, the skin of the apple absorbs the blue, green, and yellow light. It <strong>Reflects</strong> only the red light back to your eyeball! We only see things because light bounces off them.</div>`
                        },
                        {
                            title: `🔍 Discovery: The Mirror Bounce`,
                            content: `<div style="line-height:1.7;">Most objects scatter light in every direction because they are microscopically bumpy.</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 Why does a mirror create a perfect image?</div><div class="reveal-content">A mirror is completely smooth. When light hits it, all the light rays bounce off at the exact same, perfect angle! It’s like throwing a bouncy ball against a perfectly flat wall vs a rocky cliff.</div></div>`
                        },
                        {
                            title: `🧮 Math Moment: Angle of Reflection`,
                            content: `<div class="journal-box" style="background:rgba(33,150,243,0.1); border-left-color:#2196f3;"><strong>Law of Reflection:</strong><br>θ<sub>in</sub> = θ<sub>out</sub><br><br>If a laser beam hits a flat mirror at a 30° angle from the normal line, what angle will it bounce off at?<br><br><strong>Calculate:</strong><br>Since the angle of incidence is exactly equal to the angle of reflection, the laser will bounce off exactly at a 30° angle on the opposite side!</div>`
                        },
                        {
                            title: `📈 Analysis: Refraction Diagrams`,
                            content: `<div style="margin-bottom:15px; font-weight:bold;">Visualizing the Bend:</div>
                            <svg viewBox="0 0 500 200" style="width:100%; height:200px; background:#111; border-radius:10px;">
                                <!-- Air/Water Boundary -->
                                <rect x="0" y="100" width="500" height="100" fill="#1b2a47" />
                                <text x="10" y="90" fill="#fff" font-size="16">Air (Fast)</text>
                                <text x="10" y="190" fill="#fff" font-size="16">Water (Slow)</text>
                                <!-- Normal Line -->
                                <line x1="250" y1="20" x2="250" y2="180" stroke="#888" stroke-dasharray="5,5" stroke-width="2"/>
                                <!-- Incident Ray -->
                                <line x1="100" y1="20" x2="250" y2="100" stroke="#ff0000" stroke-width="4"/>
                                <polygon points="175,60 160,50 165,65" fill="#ff0000" />
                                <!-- Refracted Ray (bends toward normal) -->
                                <line x1="250" y1="100" x2="330" y2="180" stroke="#ff0000" stroke-width="4"/>
                                <polygon points="290,140 275,130 280,145" fill="#ff0000" />
                            </svg>
                            <div style="font-size:0.9em; margin-top:10px; color:#aaa;">When going from thin air to dense water, light slows down and bends <u>TOWARD</u> the normal line.</div>`
                        },
                        {
                            title: `🤔 What If Scenario: The Bending Spear`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An ancient fisherman is trying to spear a fish in a river. He aims perfectly straight at where he sees the fish, but he keeps missing. Why?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 Hint: The water is tricking him!</div><div class="reveal-content"><strong>Refraction!</strong> As light from the fish leaves the water and hits the air, the light bends. The fish isn’t actually where he sees it. He needs to aim slightly lower to catch the fish!</div></div>`
                        },
                        {
                            title: `🦇 Case Study: The Hubble Space Telescope`,
                            content: `<div style="line-height:1.7;">How do we see galaxies billions of light-years away?</div><div class="journal-box" style="border-left-color:#673ab7; background:rgba(103,58,183,0.1);"><strong>Precision Optics.</strong> The Hubble Space Telescope doesn't just use glass lenses; it relies on a massive, perfectly curved primary <strong>Mirror</strong> (2.4 meters across). This mirror acts like a giant bucket, collecting faint, ancient light beams and perfectly <em>reflecting</em> them into a focused point so the sensors can take crystal-clear pictures of the cosmos!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Prism & Rainbows`,
                            content: `<div style="line-height:1.7;">Why do prisms make rainbows?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 Hint: Colors travel at slightly different speeds in glass!</div><div class="reveal-content">Because violet light is a tighter wave, it gets slowed down MORE by the heavy glass than loose red light does. Therefore, violet <strong>refracts (bends)</strong> at a sharper angle than red. This physically splits the white beam apart into a rainbow!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Focus and Bounce`,
                            content: `<div style="line-height:1.7;">We can build tools to control our light signals.</div><div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.15);">A magnifying glass uses <strong>Refraction</strong> to bend light to a single, powerful point. A periscope uses <strong>Reflection</strong> to bounce the light signal over a wall!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Optics Bench`,
                            content: `<div style="margin-bottom:15px;"><strong>Bend & Bounce the Laser:</strong> Drag mirrors and glass blocks to hit the target!</div><div id="threejs-container-l44" style="width:100%; height:450px; background:rgba(0,0,0,0.8); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls" onmousedown="window.L44.stop(event)" ontouchstart="window.L44.stop(event)" onclick="window.L44.click(event)"><button class="btn-debug" id="l44-btn-init">🛠️ Ignite Laser</button><button class="btn-drop" id="l44-btn-mirror" style="background:#555;">🪞 Add Mirror</button><button class="btn-slow" id="l44-btn-rotate" style="background:#ff9800; color:black;">🔄 Rotate Mirror</button><button class="btn-drop" id="l44-btn-prism" style="background:#2196f3;">💎 Add Glass Prism</button><button class="btn-reset" id="l44-btn-reset">🗑️ Clear Bench</button></div>`
                        },
                        {
                            title: `📝 Concept Check: Optics`,
                            content: `<div class="journal-box">True or False?<br><br>1. Reflection causes a wave to bounce back.<br>2. Refraction causes a wave to speed up and fly straight.</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">Eye on the prize...</div><div class="reveal-content">1. TRUE<br>2. FALSE (Refraction occurs when a wave enters a new medium, changes speed, and BENDS).</div></div>`
                        },
                        {
                            title: `🗣️ Discussion: Optical Illusions`,
                            content: `<div style="line-height:1.7;"><strong>Pair Share:</strong> Have you ever seen a mirage on a hot road? It looks like a puddle of water, but disappears when you get close.</div><div class="journal-box" style="border-left-color:#e91e63; background:rgba(233,30,99,0.1);"><strong>The Science:</strong> Extreme heat from the asphalt changes the density of the air right above it. Light from the blue sky comes down, hits that hot air, and severely <strong>refracts</strong> (bends) upward into your eye! You are literally seeing a reflection of the sky on the ground!</div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> Explain the difference between Reflection and Refraction to a friend.<br><br>1. Reflection is when light ________.<br><br>2. Refraction is when light ________.</div>`
                        }
                    ]
                }"""

    # Replace the old lesson44 block
    # We use regex to find 'lesson44': { ... slides: [...] } strictly before 'lesson45':
    html = re.sub(
        r"(?s)('lesson44'\s*:\s*\{.*?\}\s*)(?=\s*,\s*'lesson45')",
        l44_replacement,
        html,
        count=1
    )

    # Now let's add the L44 Safe Handler and JS Engine injections
    # Look for L43 handler
    l44_handler = """
// --- L44 SAFE CONTROLS ---
window.L44 = {
    stop: function(e) {
        if (!e) return;
        e.stopPropagation();
    },
    click: function(e) {
        if (!e) return;
        e.stopPropagation();
        var id = e.target.id;
        if (id === 'l44-btn-init') {
            if (window.initSim) window.initSim('l44');
        } else if (id === 'l44-btn-mirror') {
            if (window.spawnMirror) window.spawnMirror();
        } else if (id === 'l44-btn-rotate') {
            if (window.rotateMirror) window.rotateMirror();
        } else if (id === 'l44-btn-prism') {
            if (window.spawnPrism) window.spawnPrism();
        } else if (id === 'l44-btn-reset') {
            if (window.resetOpticsBench) window.resetOpticsBench();
        }
    }
};

function bindL44Controls() {
    console.log("L44 controls bound!");
}
"""
    if "window.L44 =" not in html:
        html = html.replace("// --- L43 SAFE CONTROLS ---", l44_handler + "\n// --- L43 SAFE CONTROLS ---")

    
    # 3JS Optics Bench overrides to fix the spinning torus logic for L44
    l44_sim = """
function setupOpticsBench() {
    var sim = window.b4Sim;
    if (!sim) return;
    sim.camera.position.set(0, 15, 0); // Top-down view
    sim.camera.lookAt(0, 0, 0);
    
    sim.scene.add(new THREE.AmbientLight(0x444444));
    
    // Floor of the optics bench
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), new THREE.MeshPhongMaterial({color: 0x111122}));
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    sim.scene.add(floor);
    
    // Laser Emitter Box
    var emitter = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshPhongMaterial({color: 0x444444}));
    emitter.position.set(-12, 0, 0);
    sim.scene.add(emitter);

    // Initial Laser Beam going straight right
    var beamMat = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending});
    sim.laserBeams = [];
    sim.mirrors = [];
    sim.prisms = [];
    sim.beamState = { mat: beamMat };

    window.updateLaserPaths();
}

// Function to calculate and draw the laser segments dynamically based on mirrors
window.updateLaserPaths = function() {
    var sim = window.b4Sim;
    if(!sim || !sim.scene) return;
    
    // Clear old beams
    sim.laserBeams.forEach(b => sim.scene.remove(b));
    sim.laserBeams = [];

    // Raycast logic: Start from emitter (-11, 0, 0) going positive X direction
    var origin = new THREE.Vector3(-11, 0, 0);
    var dir = new THREE.Vector3(1, 0, 0);
    
    // Check intersections up to 3 bounces
    for(var bounce = 0; bounce < 3; bounce++) {
        var ray = new THREE.Raycaster(origin, dir);
        var intersects = ray.intersectObjects([...sim.mirrors, ...sim.prisms]);
        
        var distance = 30; // Default beam length if nothing hit
        var nextOrigin = null;
        var nextDir = null;
        var hitType = null;
        
        if (intersects.length > 0) {
            var hit = intersects[0];
            distance = hit.distance;
            
            if (hit.object.userData.type === 'mirror') {
                hitType = 'mirror';
                // Calculate reflection
                var normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize();
                var incoming = dir.clone();
                var dot = incoming.dot(normal);
                nextDir = incoming.sub(normal.multiplyScalar(2 * dot)).normalize();
                nextOrigin = hit.point.clone().add(nextDir.clone().multiplyScalar(0.01)); // offset slightly
            } else if (hit.object.userData.type === 'prism') {
                hitType = 'prism';
                // Simple refraction simulation: bends downward 30 degrees
                nextDir = dir.clone().applyAxisAngle(new THREE.Vector3(0,1,0), -Math.PI/6);
                nextOrigin = hit.point.clone().add(nextDir.clone().multiplyScalar(0.01));
            }
        }
        
        // Draw the beam segment
        var segmentLength = distance;
        var geo = new THREE.CylinderGeometry(0.1, 0.1, segmentLength);
        geo.translate(0, segmentLength/2, 0); // Pivot at start
        var beam = new THREE.Mesh(geo, sim.beamState.mat);
        
        // Align beam to direction vector
        var axis = new THREE.Vector3(0, 1, 0);
        beam.quaternion.setFromUnitVectors(axis, dir);
        beam.position.copy(origin);
        
        sim.scene.add(beam);
        sim.laserBeams.push(beam);
        
        if (!nextOrigin) break; // End if nothing hit
        
        origin = nextOrigin;
        dir = nextDir;
    }
};

window.spawnMirror = function() {
    var sim = window.b4Sim;
    if(!sim) return;
    
    // Create a flat silver mirror object angled at 45 degrees
    var mirror = new THREE.Mesh(new THREE.BoxGeometry(0.5, 3, 6), new THREE.MeshPhongMaterial({color: 0xcccccc, shininess: 100}));
    mirror.position.set(0, 0, 0);
    mirror.rotation.y = Math.PI / 4; // 45 deg angle
    mirror.userData = {type: 'mirror'};
    sim.scene.add(mirror);
    sim.mirrors.push(mirror);
    
    window.updateLaserPaths();
};

window.rotateMirror = function() {
    var sim = window.b4Sim;
    if(!sim || sim.mirrors.length === 0) return;
    
    // Rotate the last spawned mirror by 15 degrees
    sim.mirrors[sim.mirrors.length-1].rotation.y += Math.PI / 12;
    
    window.updateLaserPaths();
};

window.spawnPrism = function() {
    var sim = window.b4Sim;
    if(!sim) return;
    
    // Create a glass triangular prism
    var prismGeo = new THREE.CylinderGeometry(2, 2, 4, 3);
    var prismMat = new THREE.MeshPhysicalMaterial({color: 0xaaccff, transmission: 0.9, transparent: true, opacity: 0.6});
    var prism = new THREE.Mesh(prismGeo, prismMat);
    prism.position.set(10, 0, 0);
    prism.userData = {type: 'prism'};
    sim.scene.add(prism);
    sim.prisms.push(prism);
    
    window.updateLaserPaths();
};

window.resetOpticsBench = function() {
    var sim = window.b4Sim;
    if(!sim) return;
    sim.mirrors.forEach(m => sim.scene.remove(m));
    sim.prisms.forEach(p => sim.scene.remove(p));
    sim.mirrors = [];
    sim.prisms = [];
    window.updateLaserPaths();
};
"""
    
    # Inject logic hooked to initSim for 'l44' (using the same hook block I wrote earlier which patches window.initSim)
    # The previous patch I injected added a hook at the bottom. I will just prepend to it.
    hook_injection = """
<script>
    """ + l44_sim + """
    
    if (window.initSim) {
        var opticsOldInitSim = window.initSim;
        window.initSim = function(id) {
            opticsOldInitSim(id);
            if (id === 'l44') {
                var sim = window.b4Sim;
                if (sim && sim.scene) {
                    var objectsToRemove = [];
                    sim.scene.traverse(function(child) {
                        if (child.isMesh || child.isLight || child.isLine || child.isPoints) {
                            objectsToRemove.push(child);
                        }
                    });
                    objectsToRemove.forEach(function(obj) { sim.scene.remove(obj); });
                    setupOpticsBench();
                }
            }
        };
    }
</script>
"""
    if "setupOpticsBench()" not in html:
        html = html.replace("</body>", hook_injection + "\n</body>")

    with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
        f.write(html)
    print("Successfully upgraded L44 and fixed 3JS Optics Bench!")

if __name__ == "__main__":
    upgrade_l44()
