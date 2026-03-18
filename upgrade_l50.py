import codecs
import re
import json

def upgrade_l50():
    with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
        html = f.read()

    # --- 1. SLIDE REPLACEMENT FOR L50 ---
    new_slides_js = """                'lesson50': {
                    title: `Lenses, Cameras & Digital Devices (Rigorous Edition)`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Human Camera`,
                            content: `<div class="journal-box"><strong>Gently place your hand over one eye. Keep the other eye open.</strong><br><br>📓 <strong>Task:</strong> Look at an object far away, then quickly look at an object very close to your face (like a pencil).<ol style="line-height:1.8; margin-top:10px;"><li>Did the far away object get blurry when you looked at the pencil?</li><li>Did you feel your eye physically adjust or "strain" slightly to bring the close object into clear view?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain how a <strong>Lens</strong> uses refraction to focus light.</li><li>Understand how the human eye uses a lens to see.</li><li>Identify how digital devices convert light waves into digital data (0s and 1s).</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#e91e63; background:rgba(233,30,99,0.15);"><strong>🛰️ Mission Context:</strong> We know how to SEND light signals. But how does a modern computer actually "SEE" and RECEIVE a light signal? It uses a lens to catch the light, and a sensor to convert it to digital data!</div>`,
                            vocabulary: [
                                { term: `Lens`, definition: `A curved piece of glass or plastic that refracts (bends) light to a specific focal point.` },
                                { term: `Retina / Image Sensor`, definition: `The surface that catches the light image (in your eye, or in a digital camera).` },
                                { term: `Digitize`, definition: `The process of converting a physical wave (like light or sound) into a digital computer file of 1s and 0s.` },
                                { term: `Focal Point`, definition: `The exact spot where refracted light rays cross and create a sharp, clear image.` }
                            ]
                        },
                        {
                            title: `📜 Perspective: Anatomy of an Eyeball`,
                            content: `<div style="line-height:1.7;">Your eye is an organic camera.</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.1);">Light bounces off the world and enters your pupil (the dark hole). Right behind it is a squishy clear <strong>Lens</strong>. This lens bends the light waves so they crash perfectly against the back of your eyeball (the Retina). The retina turns that light into an electrical signal and zaps it to your brain!</div>`
                        },
                        {
                            title: `🔍 Discovery: Flipping Reality`,
                            content: `<div style="line-height:1.7;">Wait, how does a curved lens bend the light?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 If light criss-crosses in a lens, what happens to the picture?</div><div class="reveal-content">The image is turned completely UPSIDE DOWN! The lenses in your eyeballs project an upside-down movie onto the back of your eye. Your amazing brain automatically flips the image right-side-up, so you don't walk around seeing the world upside down!</div></div>`
                        },
                        {
                            title: `🧮 Math Moment: Megapixels`,
                            content: `<div class="journal-box" style="background:rgba(33,150,243,0.1); border-left-color:#2196f3;"><strong>Calculating Resolution:</strong><br><br>A digital camera sensor is made of millions of tiny microscopic light detectors called "pixels."<br><br>If a camera sensor is <strong>4,000 pixels wide</strong> and <strong>3,000 pixels tall</strong>, how many total pixels does it have?<br>4,000 × 3,000 = 12,000,000 pixels.<br><br>We call 1 million pixels a "Megapixel." So this is a <strong>12-Megapixel</strong> camera!</div>`
                        },
                        {
                            title: `📈 Analysis: Eye vs Camera`,
                            content: `<div style="margin-bottom:15px; font-weight:bold;">Compare the parts:</div><div style="display:flex; justify-content:center; gap:20px;"><div style="text-align:center; flex:1;"><div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:10px;"><strong style="font-size:1.3em; color:#4caf50;">Human Eye</strong><br><br>Iris & Pupil (Lets light in)<br>↓<br>Squishy Organic Lens (Focuses light)<br>↓<br>Retina (Detects light)<br>↓<br>Optic Nerve (Sends to Brain)</div></div><div style="text-align:center; flex:1;"><div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:10px;"><strong style="font-size:1.3em; color:#2196f3;">Digital Camera</strong><br><br>Aperture (Lets light in)<br>↓<br>Glass Lens (Focuses light)<br>↓<br>Silicon Image Sensor (Detects light)<br>↓<br>Processor (Saves to Memory Card)</div></div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Glasses and Contacts`,
                            content: `<div class="what-if-box"><strong>What If:</strong> Someone is "nearsighted," meaning their eyeball is shaped a little too long. The lens in their eye bends the light, but the light crosses (the Focal Point) <em>before</em> it hits the back of the eyeball. Everything far away looks blurry!</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 How do glasses fix this?</div><div class="reveal-content">Glasses add a SECOND artificial lens in front of the eye. This extra lens pre-bends the light just perfectly, so that when it goes through the eye’s natural lens, it lands sharp and clear exactly on the back wall (the retina)!</div></div>`
                        },
                        {
                            title: `🦇 Case Study: The Hubble Space Telescope`,
                            content: `<div style="line-height:1.7;">Hubble was launched in 1990 as a giant camera in space.</div><div class="journal-box" style="border-left-color:#673ab7; background:rgba(103,58,183,0.1);">When it took its first picture, it was slightly blurry! Why? The 8-foot-wide mirror/lens had been ground to the wrong shape by just 1/50th the thickness of a human hair. The light rays weren't hitting the sensor perfectly. NASA had to send astronauts on a space shuttle to give the telescope "glasses" to fix the focal point!</div>`
                        },
                        {
                            title: `🛠️ Engineering Challenge: The Blurry Photo`,
                            content: `<div style="line-height:1.7;">Why does a camera lens physically move in and out when it focuses?</div><div style="background:rgba(255,255,255,0.1); padding:15px; border-radius:10px; margin:15px 0;"><strong>Finding the Focal Point!</strong><br>Light waves coming from a faraway mountain enter the camera at a different angle than light waves coming from a bug right in front of the lens.<br>To ensure BOTH images land perfectly sharp on the sensor, the glass lens must slide forward or backward on a tiny motor until the criss-crossing light rays line up perfectly on the sensor wall!</div>`
                        },
                        {
                            title: `🛰️ Mission Connection: The Smartphone Sensor`,
                            content: `<div style="line-height:1.7;">A smartphone camera works exactly like an eyeball.</div><div class="journal-box" style="border-left-color:#9c27b0; background:rgba(156,39,176,0.15);">It has a glass lens to focus the light. But instead of a retina, it has a digital microchip! The chip senses the light wave, completely <strong>Digitizes</strong> it into millions of Binary 0s and 1s, and saves it as a JPEG photo on your phone screen! This means a photo is just a huge math file!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: 3D Optics Bench`,
                            content: `<div style="margin-bottom:15px;"><strong>Focus the Digital Camera:</strong> Slide the lens back and forth. Can you get the 3 light beams (lasers) to refract and cross <strong>exactly</strong> on the digital sensor wall?</div><div id="threejs-container-l50" style="width:100%; height:380px; background:rgba(0,0,0,0.8); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div id="l50-hud" style="text-align:center; font-family:sans-serif; font-weight:bold; height:30px; color:#ff4444; margin-bottom:10px; font-size:1.5em; letter-spacing:1px; text-transform:uppercase;">Status: BLURRY</div><div class="energy-controls"><button class="btn-debug" onclick="window.L50.init()">🛠️ Initialize Optics</button><input type="range" id="l50-lens-slider" min="0" max="100" value="10" oninput="window.L50.moveLens(this.value)" style="width:70%; margin:10px 20px; accent-color:#2196f3; cursor:pointer;" disabled></div>`
                        },
                        {
                            title: `📝 Concept Check: Lenses`,
                            content: `<div class="journal-box">True or False?<br><br>1. An image that passes through a camera lens or human eye is turned upside down.<br>2. A modern digital camera sensor saves the light exactly as it is without changing it into math.</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">Check your optical knowledge...</div><div class="reveal-content">1. TRUE! Lenses invert images.<br>2. FALSE! Digital sensors must "digitize" the light into billions of 1s and 0s (binary data) to be saved on a computer memory chip.</div></div>`
                        },
                        {
                            title: `🗣️ Discussion: Eyes vs Machine`,
                            content: `<div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.1);"><strong>Class Discussion:</strong><br><br>Human eyes are incredibly advanced, but they have limits. What is an example of a type of camera or machine sensor that can "see" something that human eyes cannot see?<br><br><em>(Hint: Think about doctors, or people searching for heat in the dark...)</em></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong><br><br>1. What does the squishy lens in your eye do to light waves?<br><br>2. Match the human eye part to the camera part:<br>A. Retina = _______<br>B. Pupil = _______</div>`
                        }
                    ]
                },"""
    
    start_idx = html.find("'lesson50': {")
    end_idx = html.find("'lesson51': {")
    
    if start_idx != -1 and end_idx != -1:
        # Check if there is a trailing comma or formatting before lesson49
        html = html[:start_idx] + new_slides_js + "\n" + html[end_idx:]
        print("Successfully replaced L50 slide content.")
    else:
        print("L50 slide content hook failed.")
        return


    # --- 2. JS LOGIC INJECTION FOR L50 ---
    js_code = """
// --- L50 OPTICS BENCH INTERACTIVE ---
window.L50 = {
    lensZ: 10,
    targetFocusZ: -30, // Where the sensor is located
    focalLength: 20, // distance from lens to crossing point
    isInit: false,
    
    init: function() {
        if (window.initSim) window.initSim('l50');
    },
    
    moveLens: function(val) {
        if (!this.isInit) return;
        
        // Map slider 0-100 to Z axis limits
        // Lens starts near light source (z=20) and moves towards sensor (z=-10)
        let minZ = -10;
        let maxZ = 20;
        
        // Calculate raw Z based on slider interpolation
        let percentage = val / 100.0;
        this.lensZ = maxZ - (percentage * (maxZ - minZ)); 
        
        // Move the physical 3D lens mesh
        if (window.l50LensMesh) {
            window.l50LensMesh.position.z = this.lensZ;
            window.updateL50Lasers();
        }
    }
};

window.setupL50Sim = function(sim) {
    sim.camera.position.set(25, 10, 0);
    sim.camera.lookAt(0, 0, 0);
    
    const ambientLight = new THREE.AmbientLight(0x333333);
    sim.scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    sim.scene.add(dirLight);

    // Dark grid
    const grid = new THREE.GridHelper(80, 80, 0x222222, 0x111111);
    sim.scene.add(grid);
    
    // --- 1. LIGHT SOURCE (Flashlight) ---
    const sourceGeo = new THREE.BoxGeometry(4, 4, 4);
    const sourceMat = new THREE.MeshStandardMaterial({color: 0x333333, metalness: 0.8});
    const sourceMesh = new THREE.Mesh(sourceGeo, sourceMat);
    sourceMesh.position.set(0, 0, 30);
    sim.scene.add(sourceMesh);
    
    // Glowing emitter face
    const emitGeo = new THREE.PlaneGeometry(3, 3);
    const emitMat = new THREE.MeshBasicMaterial({color: 0xff4444});
    const emitMesh = new THREE.Mesh(emitGeo, emitMat);
    emitMesh.rotation.y = Math.PI; // point towards -z
    emitMesh.position.set(0, 0, 27.9);
    sim.scene.add(emitMesh);
    
    // --- 2. THE LENS ---
    // A squashed sphere to look like a convex lens
    const lensGeo = new THREE.SphereGeometry(6, 32, 16);
    lensGeo.scale(1, 1, 0.2); // flatten it
    const lensMat = new THREE.MeshPhysicalMaterial({
        color: 0x88ccff,
        transmission: 0.9,
        opacity: 0.5,
        metalness: 0.1,
        roughness: 0.1,
        ior: 1.5,
        thickness: 0.5,
        transparent: true
    });
    window.l50LensMesh = new THREE.Mesh(lensGeo, lensMat);
    window.l50LensMesh.position.set(0, 0, window.L50.lensZ);
    sim.scene.add(window.l50LensMesh);
    
    // Lens holder ring
    const ringGeo = new THREE.TorusGeometry(6.2, 0.5, 8, 50);
    const ringMat = new THREE.MeshStandardMaterial({color: 0x555555, metalness: 0.9});
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    window.l50LensMesh.add(ringMesh); // make ring child of lens so they move together
    
    // --- 3. THE SENSOR WALL ---
    const sensorGeo = new THREE.PlaneGeometry(15, 15);
    window.l50SensorMat = new THREE.MeshBasicMaterial({color: 0x222222, side: THREE.DoubleSide});
    window.l50SensorMesh = new THREE.Mesh(sensorGeo, window.l50SensorMat);
    window.l50SensorMesh.position.set(0, 0, window.L50.targetFocusZ);
    sim.scene.add(window.l50SensorMesh);
    
    // Sensor bracket
    const bracketGeo = new THREE.BoxGeometry(16, 16, 1);
    const bracketMat = new THREE.MeshStandardMaterial({color: 0x111111});
    const bracketMesh = new THREE.Mesh(bracketGeo, bracketMat);
    bracketMesh.position.set(0, 0, window.L50.targetFocusZ - 0.6);
    sim.scene.add(bracketMesh);

    // --- 4. THE LASERS (3 Rays) ---
    window.l50Lasers = [];
    const laserOffsets = [
        {y: 2, label: 'top'},
        {y: 0, label: 'mid'},
        {y: -2, label: 'bot'}
    ];
    
    laserOffsets.forEach((offset) => {
        // Line material
        const mat = new THREE.LineBasicMaterial({
            color: 0xff0000,
            linewidth: 3,
            transparent: true,
            opacity: 0.8
        });
        
        // We need 3 points: [Source] -> [LensSurface] -> [FocusPoint OR SensorWall]
        const geo = new THREE.BufferGeometry();
        // pre-allocate 3 vertices (x,y,z each)
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(9), 3));
        
        const line = new THREE.Line(geo, mat);
        sim.scene.add(line);
        
        window.l50Lasers.push({
            line: line,
            offsetY: offset.y
        });
    });

    window.L50.isInit = true;
    document.getElementById('l50-lens-slider').disabled = false;
    
    // Run initial laser calculation
    window.updateL50Lasers();
};

window.updateL50Lasers = function() {
    if (!window.L50.isInit) return;
    
    const sourceZ = 28; // slightly in front of flashlight box
    const lensZ = window.L50.lensZ;
    const sensorZ = window.L50.targetFocusZ;
    const focalLength = window.L50.focalLength;
    
    // The exact point where they cross on the Z axis
    // If lens is at Z=10, focal point is at Z = (10 - 20) = -10
    const crossingZ = lensZ - focalLength;
    
    // Check if crossingZ perfectly aligns with sensorZ
    // Add a tiny bit of tolerance margin (e.g. +/- 1.0 unit)
    const tolerance = 1.0;
    const distToSensor = Math.abs(crossingZ - sensorZ);
    const isFocused = distToSensor <= tolerance;
    
    // Update Sensor Visuals and HUD
    const hud = document.getElementById('l50-hud');
    if (isFocused) {
        window.l50SensorMat.color.setHex(0x00ff00); // Bright green
        hud.innerHTML = "PERFECT FOCUS!";
        hud.style.color = "#00ff00";
        hud.style.textShadow = "0 0 15px #00ff00";
    } else {
        window.l50SensorMat.color.setHex(0x222222); // Dark
        hud.innerHTML = "STATUS: BLURRY";
        hud.style.color = "#ff4444";
        hud.style.textShadow = "none";
    }
    
    // Update actual laser geometry line vertex positions
    window.l50Lasers.forEach((laser) => {
        const positions = laser.line.geometry.attributes.position.array;
        
        // Point 0: Source
        positions[0] = 0;
        positions[1] = laser.offsetY;
        positions[2] = sourceZ;
        
        // Point 1: Hit the Lens face
        // Light travels perfectly straight until it hits the lens
        positions[3] = 0;
        positions[4] = laser.offsetY;
        positions[5] = lensZ;
        
        // Point 2: Hit the Sensor wall (or go past it if focus is behind it)
        // We must calculate the Y position at the sensor based on the crossing point.
        // Similar triangles calculation:
        
        // Total distance from lens to crossing point
        const distLensToCross = Math.abs(crossingZ - lensZ);
        
        // Total distance from lens to sensor
        const distLensToSensor = Math.abs(sensorZ - lensZ);
        
        let finalY = 0;
        
        if (Math.abs(distLensToCross) > 0.001) { // avoid div by 0
            // Ratio of how far the sensor is compared to the crossing point
            const ratio = distLensToSensor / distLensToCross;
            
            if (sensorZ > crossingZ) {
                // Sensor is IN FRONT of the crossing point. (Rays haven't crossed yet)
                // They are converging, so Y value gets smaller.
                finalY = laser.offsetY - (laser.offsetY * ratio);
            } else {
                // Sensor is BEHIND the crossing point. (Rays have crossed)
                // They went to 0, and are now expanding negatively.
                finalY = laser.offsetY - (laser.offsetY * ratio);
            }
        }
        
        positions[6] = 0;
        positions[7] = finalY;
        positions[8] = sensorZ;
        
        // Force ThreeJS to update the graphics card
        laser.line.geometry.attributes.position.needsUpdate = true;
    });
};

window.animateL50Sim = function(sim) {
    if (window.L50.isInit) {
        // Optional: Make lasers pulse slightly to look alive
        let time = Date.now() * 0.005;
        let pulseIntensity = 0.8 + (Math.sin(time) * 0.2); // oscillates between 0.6 and 1.0
        
        window.l50Lasers.forEach((laser) => {
            laser.line.material.opacity = pulseIntensity;
        });
    }
};
"""
    
    # Inject JS methods before "// --- L46 SAFE CONTROLS ---"
    hook = "// --- L46 SAFE CONTROLS ---"
    if hook in html:
        html = html.replace(hook, js_code + "\n\n" + hook)
        print("Successfully injected L50 JS Control logic.")
    else:
        print("JS injection hook not found.")

    # Apply patch to initSim
    patch_pattern = r"\} else if \(lessonId === 'l48'\) \{"
    patch_replace = """} else if (lessonId === 'l50') {
        sim.isPlaying = true;
        if(window.setupL50Sim) window.setupL50Sim(sim);
        sim.customRender = function() {
            if(window.animateL50Sim) window.animateL50Sim(sim);
        };
    } else if (lessonId === 'l48') {"""
    
    html, count = re.subn(patch_pattern, patch_replace, html)
    if count > 0:
        print("Successfully patched initSim logic.")
    else:
        print("initSim patch failed.")


    with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
        f.write(html)

if __name__ == "__main__":
    upgrade_l50()
