import codecs
import re
import json

def upgrade_l48():
    with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
        html = f.read()

    # --- 1. SLIDE REPLACEMENT FOR L48 ---
    new_slides_js = """                'lesson48': {
                    title: `Binary & Digital Information (Rigorous Edition)`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Light Switch`,
                            content: `<div class="journal-box"><strong>Look at the light switch on the wall of your classroom.</strong><br><br>📓 <strong>Task:</strong> Answer these questions:<ol style="line-height:1.8; margin-top:10px;"><li>How many positions does the switch have?</li><li>Can the switch be "halfway" on?</li><li>If we assigned numbers to the switch, what number would "Off" be? What number would "On" be?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Understand the concept of <strong>Binary Code</strong> (0s and 1s).</li><li>Explain how computers use binary to store and send information.</li><li>Compare an <strong>Analog</strong> signal (continuous) to a <strong>Digital</strong> signal (on/off).</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#2196f3; background:rgba(33,150,243,0.15);"><strong>🛰️ Mission Context:</strong> Morse code has dots, dashes, and spaces (3 things). For modern computers to send emergency data across the world in milliseconds, they use an even simpler code that only has 2 things: ON and OFF!</div>`,
                            vocabulary: [
                                { term: `Binary Code`, definition: `A coding system using the binary digits 0 and 1 to represent a letter, digit, or other character in a computer.` },
                                { term: `Bit`, definition: `The smallest unit of data in a computer (a single 0 or 1).` },
                                { term: `Byte`, definition: `A group of 8 bits, enough to store a single letter like "A".` },
                                { term: `Logic Gate`, definition: `A microscopic switch inside a computer chip that makes simple True/False decisions.` },
                                { term: `Digital Signal`, definition: `A signal that is expressed as a series of the digits 0 and 1.` },
                                { term: `Analog Signal`, definition: `A continuous signal that has infinite possibilities (like a smooth wave).` }
                            ]
                        },
                        {
                            title: `📜 Perspective: 0 is Off, 1 is On`,
                            content: `<div style="line-height:1.7;">A computer is just a box filled with billions of microscopic switches.</div><div class="journal-box" style="border-left-color:#607d8b; background:rgba(96,125,139,0.1);">It doesn't understand English, or math, or pictures. All it understands is "Switch is OFF" (which we write as a 0) or "Switch is ON" (which we write as a 1). By combining millions of 0s and 1s, the computer can play a video game or send an email!</div>`
                        },
                        {
                            title: `🔍 Discovery: Translating Binary`,
                            content: `<div style="line-height:1.7;">How do you spell a word with just 0s and 1s?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 How do computers spell "HI"?</div><div class="reveal-content">Every letter on your keyboard is assigned an 8-digit binary code! The letter "H" always equals <strong>01001000</strong>. The letter "I" equals <strong>01001001</strong>. So to text your friend "HI", your phone shoots an invisible wave holding exactly 16 bits of data: 0100100001001001.</div></div>`
                        },
                        {
                            title: `🧮 Math Moment: Base-2 vs Base-10`,
                            content: `<div class="journal-box" style="background:rgba(33,150,243,0.1); border-left-color:#2196f3;"><strong>How to Count in Binary:</strong><br><br>Human math (Base-10) uses digits 0-9.<br>Computer math (Base-2) only uses 0 and 1.<br>In binary, each column doubles in value from right to left (1, 2, 4, 8, 16...).<br><br><strong>Example: What is the binary "0101" in normal numbers?</strong><br>8s column = 0<br>4s column = 1 (We have a 4!)<br>2s column = 0<br>1s column = 1 (We have a 1!)<br><strong>Total = 4 + 1 = 5.</strong></div>`
                        },
                        {
                            title: `📈 Analysis: Analog vs Digital`,
                            content: `<div style="margin-bottom:15px; font-weight:bold;">Telling the Difference:</div><div style="display:flex; gap:20px; text-align:center;"><div style="flex:1;"><svg viewBox="0 0 200 100" style="width:100%; border:1px solid #444; background:#111;"><path d="M 0 50 Q 50 100 100 50 T 200 50" fill="none" stroke="#2196f3" stroke-width="4"/></svg><div style="margin-top:10px;"><strong>Analog (Continuous)</strong><br><span style="font-size:0.8em;color:#aaa;">Examples: Vinyl Record, Human Voice</span></div></div><div style="flex:1;"><svg viewBox="0 0 200 100" style="width:100%; border:1px solid #444; background:#111;"><path d="M 0 80 L 40 80 L 40 20 L 80 20 L 80 80 L 120 80 L 120 20 L 160 20 L 160 80 L 200 80" fill="none" stroke="#4caf50" stroke-width="4"/></svg><div style="margin-top:10px;"><strong>Digital (Discrete 0s & 1s)</strong><br><span style="font-size:0.8em;color:#aaa;">Examples: MP3, DVD, Internet</span></div></div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: A Scratched DVD`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An old vinyl record gets scratched, and the music sounds fuzzy. BUT if a digital DVD gets a tiny scratch, the movie might skip a split second, but the rest of the picture looks perfectly clear. Why?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 Why is Digital better for storage?</div><div class="reveal-content">A vinyl record is <strong>Analog</strong>: the needle reads a continuous wavy groove. If it’s damaged, the exact shape of the wave is ruined. A DVD is <strong>Digital</strong>: it is microscopic pits (0s) and flat spots (1s). It is much easier for a computer to guess if a broken spot was supposed to be a 0 or a 1 than to guess the exact height of a wave! Digital is more reliable to copy.</div></div>`
                        },
                        {
                            title: `🦇 Case Study: The Voyager 1 Probe`,
                            content: `<div style="line-height:1.7;">Voyager 1 was launched into space in 1977. It is now outside our solar system, 15 BILLION miles away.</div><div class="journal-box" style="border-left-color:#673ab7; background:rgba(103,58,183,0.1);">Its radio signal takes 22.5 <em>hours</em> traveling at the speed of light just to reach Earth! The signal is incredibly weak by the time it gets here. If it used Analog waves to send pictures, it would just be static. Because it uses <strong>Digital Binary</strong> (0s and 1s), giant antennas on Earth can cleanly catch the exact sequence and rebuild perfect, crystal-clear pictures of Jupiter and Saturn!</div>`
                        },
                        {
                            title: `🛠️ Engineering Challenge: The Logic Gate`,
                            content: `<div style="line-height:1.7;">How does a computer actually "think" using 0s and 1s?</div><div style="background:rgba(255,255,255,0.1); padding:15px; border-radius:10px; margin:15px 0;"><strong>It uses Logic Gates!</strong><br>Imagine an electrical circuit with TWO light switches right next to each other, but only ONE lightbulb at the end.<br>If Switch A is ON (1), but Switch B is OFF (0), the electricity stops at B. The bulb stays OFF (0).<br>For the bulb to turn ON, Switch A <strong>AND</strong> Switch B must both be a 1!<br><br>This is called an "AND Gate", and millions of them working together let computers solve math problems!</div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Digital Emergency Transmissions`,
                            content: `<div style="line-height:1.7;">When a modern GPS rescue beacon is activated on a mountain...</div><div class="journal-box" style="border-left-color:#e91e63; background:rgba(233,30,99,0.15);">It does NOT send a voice pleading for help (which could sound like wind or static). It blasts a burst of radio waves into space containing billions of perfect 1s and 0s (digital binary data). The satellite catches those 1s and 0s, and decodes them straight into the hiker’s exact latitude and longitude coordinates!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The 3D Cyber Console`,
                            content: `<div style="margin-bottom:15px;"><strong>Align the Data Streams:</strong> Toggle the 8 switches to map the target binary sequence and transmit the data!</div><div id="threejs-container-l48" style="width:100%; height:430px; background:rgba(0,0,0,0.8); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div id="l48-hud" style="text-align:center; font-family:monospace; font-weight:bold; height:30px; color:#4caf50; margin-bottom:10px; font-size:1.5em; letter-spacing:2px; text-shadow:0 0 10px #4caf50;">TARGET: H [ 0 1 0 0 1 0 0 0 ]</div><div class="energy-controls" onmousedown="window.L48.stop(event)" ontouchstart="window.L48.stop(event)" onclick="window.L48.click(event)"><button class="btn-debug" id="l48-btn-init">🛠️ Initialize Rig</button><div style="display:flex; justify-content:center; gap:5px; margin:10px 0;"><button class="btn-slow" id="l48-b0" style="padding:10px 15px;">0</button><button class="btn-slow" style="padding:10px 15px;" id="l48-b1">0</button><button class="btn-slow" style="padding:10px 15px;" id="l48-b2">0</button><button class="btn-slow" style="padding:10px 15px;" id="l48-b3">0</button><button class="btn-slow" style="padding:10px 15px;" id="l48-b4">0</button><button class="btn-slow" style="padding:10px 15px;" id="l48-b5">0</button><button class="btn-slow" style="padding:10px 15px;" id="l48-b6">0</button><button class="btn-slow" style="padding:10px 15px;" id="l48-b7">0</button></div><button class="btn-drop" id="l48-submit" style="background:#ff9800; color:black; font-weight:bold; font-size:1.2em;">⬆️ Transmit Data</button></div>`
                        },
                        {
                            title: `📝 Concept Check: Reliability`,
                            content: `<div class="journal-box">True or False?<br><br>1. Digital signals are more reliable than analog signals over long distances because it is easier to read a 1 or 0 than the exact shape of a wave.<br>2. A Byte is made up of exactly 2 bits.</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">Check your logic...</div><div class="reveal-content">1. TRUE! The Voyager spacecraft proves this every day.<br>2. FALSE. A Byte is made of 8 bits!</div></div>`
                        },
                        {
                            title: `🗣️ Discussion: Why Base-2?`,
                            content: `<div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.1);"><strong>Class Discussion:</strong><br><br>Humans count using 10 numbers (0-9). Why don't computers? Why did engineers decide to build computers that ONLY use 0s and 1s? Why not build a computer that counts to 9 before resetting the column?<br><br><em>(Hint: Remember what basic electrical component makes up a computer processor, and how many states it has.)</em></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong><br><br>1. In your own words, what is Binary Code?<br><br>2. Look at the word "CAT". If every letter takes 8 bits (1 Byte) to spell in binary, how many bits total does the computer use to write the word "CAT"?</div>`
                        }
                    ]
                },"""
    
    # Surgical Regex replacement for 'lesson48': { ... }
    # This requires finding the start of 'lesson48' and matching brackets safely.
    # We will use string slicing to avoid regex complexity with huge JSON structures.
    start_idx = html.find("'lesson48': {")
    end_idx = html.find("'lesson49': {")
    
    if start_idx != -1 and end_idx != -1:
        # Check if there is a trailing comma or formatting before lesson49
        html = html[:start_idx] + new_slides_js + "\n" + html[end_idx:]
        print("Successfully replaced L48 slide content.")
    else:
        print("L48 slide content hook failed.")


    # --- 2. JS LOGIC INJECTION FOR L48 ---
    # We need to inject window.setupL48Sim, window.animateL48Sim, and window.L48

    js_code = """
// --- L48 SAFE CONTROLS & 3D CYBER CONSOLE ---
window.L48 = {
    stop: function(e) {
        if (!e) return;
        e.stopPropagation();
    },
    click: function(e) {
        if (!e) return;
        e.stopPropagation();
        var id = e.target.id;
        
        if (id === 'l48-btn-init') {
            if (window.initSim) window.initSim('l48');
        } else if (id.startsWith('l48-b')) {
            var bitIndex = parseInt(id.replace('l48-b', ''));
            if (!isNaN(bitIndex)) window.toggleL48Bit(bitIndex);
        } else if (id === 'l48-submit') {
            window.submitL48Data();
        }
    }
};

window.l48CurrentBits = [0,0,0,0,0,0,0,0];
window.l48TargetBits = [0,1,0,0,1,0,0,0]; // H
window.l48Objects = [];
window.l48CharSet = [
    {char: 'H', bits: [0,1,0,0,1,0,0,0]},
    {char: 'E', bits: [0,1,0,0,0,1,0,1]},
    {char: 'L', bits: [0,1,0,0,1,1,0,0]},
    {char: 'P', bits: [0,1,0,1,0,0,0,0]},
    {char: 'S', bits: [0,1,0,1,0,0,1,1]},
    {char: 'O', bits: [0,1,0,0,1,1,1,1]}
];

window.setupL48Sim = function(sim) {
    sim.camera.position.set(0, 5, 20);
    sim.camera.lookAt(0, 0, 0);
    
    const ambientLight = new THREE.AmbientLight(0x222222);
    sim.scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(5, 10, 5);
    sim.scene.add(dirLight);
    
    // Core Cyber Console layout
    window.l48Objects = [];
    
    const spacing = 2.5;
    const startX = -((8 - 1) * spacing) / 2;
    
    const nodeGeo = new THREE.BoxGeometry(1.5, 3, 1.5);
    const frameGeo = new THREE.EdgesGeometry(nodeGeo);
    
    for(let i = 0; i < 8; i++) {
        // glowing core
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0x330000, 
            emissive: 0x550000, 
            emissiveIntensity: 0.5,
            metalness: 0.8,
            roughness: 0.2
        });
        const node = new THREE.Mesh(nodeGeo, mat);
        node.position.x = startX + (i * spacing);
        node.position.y = 0;
        
        // wireframe box
        const frameMat = new THREE.LineBasicMaterial({ color: 0x222222, linewidth: 2 });
        const frame = new THREE.LineSegments(frameGeo, frameMat);
        frame.position.copy(node.position);
        
        sim.scene.add(node);
        sim.scene.add(frame);
        window.l48Objects.push({mesh: node, frame: frame});
    }
    
    // Sci-fi floor grid
    const grid = new THREE.GridHelper(50, 50, 0x004400, 0x002200);
    grid.position.y = -2;
    sim.scene.add(grid);
    
    // Reset state
    window.l48CurrentBits = [0,0,0,0,0,0,0,0];
    for (let i=0; i<8; i++) {
        let btn = document.getElementById('l48-b' + i);
        if(btn) { btn.textContent = '0'; btn.style.background = '#333'; }
    }
    window.pickNewL48Target();
};

window.pickNewL48Target = function() {
    let randIndex = Math.floor(Math.random() * window.l48CharSet.length);
    let target = window.l48CharSet[randIndex];
    window.l48TargetBits = target.bits;
    document.getElementById('l48-hud').innerHTML = 'TARGET: ' + target.char + ' [ ' + target.bits.join(' ') + ' ]';
    document.getElementById('l48-hud').style.color = '#4caf50';
    document.getElementById('l48-hud').style.textShadow = '0 0 10px #4caf50';
};

window.toggleL48Bit = function(index) {
    if (!window.l48Objects[index]) return;
    
    let currentVal = window.l48CurrentBits[index];
    let newVal = currentVal === 0 ? 1 : 0;
    window.l48CurrentBits[index] = newVal;
    
    // Update Button UI
    let btn = document.getElementById('l48-b' + index);
    if(btn) {
        btn.textContent = newVal;
        btn.style.background = newVal === 1 ? '#00e5ff' : '#333';
        btn.style.color = newVal === 1 ? 'black' : 'white';
    }
    
    // Update 3D Node
    let mesh = window.l48Objects[index].mesh;
    if (newVal === 1) {
        mesh.material.color.setHex(0x00ffff);
        mesh.material.emissive.setHex(0x00ffff);
        mesh.material.emissiveIntensity = 1.5;
        window.l48Objects[index].frame.material.color.setHex(0xffffff);
    } else {
        mesh.material.color.setHex(0x330000);
        mesh.material.emissive.setHex(0x550000);
        mesh.material.emissiveIntensity = 0.5;
        window.l48Objects[index].frame.material.color.setHex(0x222222);
    }
};

window.submitL48Data = function() {
    let match = true;
    for(let i=0; i<8; i++) {
        if(window.l48CurrentBits[i] !== window.l48TargetBits[i]) match = false;
    }
    
    let hud = document.getElementById('l48-hud');
    if (match) {
        hud.innerHTML = "DATA TRANSMITTED SUCCESSFULLY!";
        hud.style.color = "#00ff00";
        hud.style.textShadow = "0 0 20px #00ff00";
        
        // Success animation logic
        window.l48SuccessSpin = 60; // frames
        for(let i=0; i<8; i++) {
            window.l48Objects[i].mesh.material.emissive.setHex(0x00ff00);
        }
        
        setTimeout(() => {
            window.l48CurrentBits = [0,0,0,0,0,0,0,0];
            for (let i=0; i<8; i++) {
                let btn = document.getElementById('l48-b' + i);
                if(btn) { btn.textContent = '0'; btn.style.background = '#333'; btn.style.color = 'white';}
                let mesh = window.l48Objects[i].mesh;
                mesh.material.color.setHex(0x330000);
                mesh.material.emissive.setHex(0x550000);
                mesh.material.emissiveIntensity = 0.5;
                window.l48Objects[i].frame.material.color.setHex(0x222222);
            }
            window.pickNewL48Target();
        }, 2000);
        
    } else {
        hud.innerHTML = "ERROR: MISMATCHED BYTE";
        hud.style.color = "#ff0000";
        hud.style.textShadow = "0 0 10px #ff0000";
        setTimeout(() => {
            document.getElementById('l48-hud').innerHTML = 'TARGET: ' + window.l48TargetBits.join(' ');
            document.getElementById('l48-hud').style.color = '#4caf50';
            document.getElementById('l48-hud').style.textShadow = '0 0 10px #4caf50';
        }, 1500);
    }
};

window.animateL48Sim = function(sim) {
    if (window.l48Objects) {
        let time = Date.now() * 0.002;
        for (let i=0; i<window.l48Objects.length; i++) {
            let obj = window.l48Objects[i];
            
            // Success hyper-spin
            if (window.l48SuccessSpin && window.l48SuccessSpin > 0) {
                obj.mesh.rotation.y += 0.2;
                obj.frame.rotation.y += 0.2;
                if(i===7) window.l48SuccessSpin--; // decrement once per frame
            } else {
                // Gentle idle float
                obj.mesh.position.y = Math.sin(time + i) * 0.5;
                obj.frame.position.y = obj.mesh.position.y;
                obj.mesh.rotation.y += 0.01;
                obj.frame.rotation.y += 0.01;
            }
        }
    }
};
"""
    
    # Inject JS methods before "// --- L46 SAFE CONTROLS ---"
    hook = "// --- L46 SAFE CONTROLS ---"
    if hook in html:
        html = html.replace(hook, js_code + "\n\n" + hook)
        print("Successfully injected L48 JS Control logic.")
    else:
        print("JS injection hook not found.")

    # Apply patch to initSim
    # We must patch initSim to route 'l48' correctly
    patch_pattern = r"\} else if \(lessonId === 'l46'\) \{"
    patch_replace = """} else if (lessonId === 'l48') {
        sim.isPlaying = true; // to trigger animate loop
        if(window.setupL48Sim) window.setupL48Sim(sim);
        sim.customRender = function() {
            if(window.animateL48Sim) window.animateL48Sim(sim);
        };
    } else if (lessonId === 'l46') {"""
    
    html, count = re.subn(patch_pattern, patch_replace, html)
    if count > 0:
        print("Successfully patched initSim logic.")
    else:
        print("initSim patch failed.")


    with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
        f.write(html)

if __name__ == "__main__":
    upgrade_l48()

