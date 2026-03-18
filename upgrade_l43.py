import re

def enhance_l43():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update the L43 JS safe-event handlers
    l43_js_block = """
// --- L43 SAFE CONTROLS ---
window.L43 = {
    stop: function(e) {
        if (!e) return;
        e.stopPropagation();
    },
    click: function(e) {
        if (!e) return;
        e.stopPropagation();
        var id = e.target.id;
        if (id === 'l43-btn-init') {
            if (window.initSim) window.initSim('l43');
        } else if (id === 'l43-btn-wall') {
            if (window.spawnBlock) window.spawnBlock();
        } else if (id === 'l43-btn-glass') {
            if (window.spawnGlass) window.spawnGlass();
        } else if (id === 'l43-btn-reset') {
            if (window.resetLightScene) window.resetLightScene();
        }
    }
};

function bindL43Controls() {
    console.log("L43 controls bound!");
}
"""

    if "window.L43 =" not in content:
        content = content.replace(
            "function bindL42Controls() {\n    console.log(\"L42 controls bound!\");\n}",
            "function bindL42Controls() {\n    console.log(\"L42 controls bound!\");\n}\n\n" + l43_js_block
        )

    # 2. Update the L43 JSON Data to the 14-slide Rigor standard
    l43_rigor_data = r"""'lesson43': {
                    title: `Light Waves (Rigorous Edition)`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Laser Pointer`,
                            content: `<div class="journal-box"><strong>Imagine shining a laser pointer across a dark, dusty room.</strong><br><br>📓 <strong>Task:</strong> In your journal, answer these two questions:<ol style="line-height:1.8; margin-top:10px;"><li>What does the beam of light look like? (Is it perfectly straight, wavy, or zig-zagged?)</li><li>How long does it take for the light to hit the wall?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Identify that <strong>Light</strong> travels in straight lines.</li><li>Explain that Light is an <strong>Electromagnetic Wave</strong> that does <em>not</em> require a medium.</li><li>Compare the Speed of Light to the Speed of Sound.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#ffeb3b; background:rgba(255,235,59,0.15);"><strong>🛰️ Mission Context:</strong> A siren (sound wave) only travels a few miles. But if we use light to send our emergency message, it can travel almost infinitely... as long as nothing gets in its way!</div>`,
                            vocabulary: [
                                { term: `Light Wave`, definition: `A type of wave that travels in straight lines and carries electromagnetic energy.` },
                                { term: `Electromagnetic Spectrum`, definition: `The entire range of light waves, including things we can't see like X-rays and radio waves.` },
                                { term: `Speed of Light`, definition: `The fastest speed in the universe: 186,282 miles per second!` }
                            ]
                        },
                        {
                            title: `📜 Perspective: Sunlight Journey`,
                            content: `<div style="line-height:1.7;">It takes 8 minutes for light to leave the Sun and reach Earth.</div><div class="journal-box" style="border-left-color:#f44336; background:rgba(244,67,54,0.1);">Unlike sound waves, which need air, water, or solid matter to travel through, light waves are perfectly happy traveling through the empty vacuum of space! This is why we can see the stars, but we can't hear them explode.</div>`
                        },
                        {
                            title: `🔍 Discovery: The Electromagnetic Spectrum`,
                            content: `<div style="line-height:1.7; margin-bottom:15px;">We only see a tiny fraction of the light waves around us!</div><div style="text-align:center; padding:20px; background:rgba(255,255,255,0.05); border-radius:12px; border:2px solid #ffeb3b; margin-bottom:15px;"><svg width="100%" height="150" viewBox="0 0 600 150" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="rainbow" x1="40%" y1="0%" x2="60%" y2="0%"><stop offset="0%" stop-color="#333" /><stop offset="40%" stop-color="#ff0000" /><stop offset="45%" stop-color="#ff7f00" /><stop offset="50%" stop-color="#00ff00" /><stop offset="55%" stop-color="#0000ff" /><stop offset="60%" stop-color="#8b00ff" /><stop offset="100%" stop-color="#333" /></linearGradient></defs><rect x="50" y="50" width="500" height="40" fill="url(#rainbow)" rx="10" /><path d="M 50 30 Q 75 10, 100 30 T 150 30 T 200 30 T 250 30 T 300 30 T 350 30 T 400 30 T 450 30 T 500 30 T 550 30" fill="none" stroke="white" stroke-width="2"><animate attributeName="d" values="M 50 30 Q 150 -50, 250 30 T 450 30 T 650 30; M 50 30 Q 60 10, 70 30 T 90 30 T 110 30 T 130 30 T 150 30 T 170 30 T 190 30 T 210 30 T 230 30 T 250 30 T 270 30 T 290 30 T 310 30 T 330 30 T 350 30 T 370 30 T 390 30 T 410 30 T 430 30 T 450 30 T 470 30 T 490 30 T 510 30 T 530 30 T 550 30;" dur="5s" repeatCount="indefinite" /></path><text x="70" y="120" fill="#aaa" font-size="12" font-family="sans-serif">Radio/Microwave</text><text x="240" y="120" fill="#fff" font-size="14" font-family="sans-serif" font-weight="bold">Visible Light</text><text x="440" y="120" fill="#aaa" font-size="12" font-family="sans-serif">X-Ray/Gamma</text></svg></div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 What are Radio Waves?</div><div class="reveal-content">Radio waves, Microwaves, and X-Rays are actually just invisible <strong>Light Waves</strong>! They behave exactly like the light from a flashlight, but their wavelength is either too long (Radio) or too short (X-Ray) for human eyes to detect!</div></div>`
                        },
                        {
                            title: `🧮 Math Moment: Light vs. Sound`,
                            content: `<div style="line-height:1.7;">Let's race the two waves from the Moon to the Earth (Distance: 238,900 miles).</div><div style="margin:20px 0; padding:25px; background:rgba(255,255,255,0.08); border-radius:12px; font-size:1.5rem; text-align:center;"><span style="color:#00bcd4; font-weight:bold;">Sound (767 mph)</span> = 13 Days non-stop!<br><br><span style="color:#ffbc00; font-weight:bold;">Light (186,000 miles/second)</span> = 1.3 Seconds!</div><div class="journal-box">📓 <strong>Your Turn:</strong> Without doing exact math, if an explosive asteroid hits Jupiter, would scientists on Earth see the flash first, or hear the boom first? Why?</div>`
                        },
                        {
                            title: `🔍 Discovery: Blocking the Path`,
                            content: `<div style="line-height:1.7;">Light is incredibly fast, but it has a physical weakness.</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 What happens if you stand in front of a flashlight?</div><div class="reveal-content">A shadow appears! Because light ONLY travels in perfectly straight lines, it cannot bend around your body. Sound waves can easily diffract (bend) around corners and go down hallways. Light is perfectly rigid.</div></div>`
                        },
                        {
                            title: `📊 Organizer: Obstacles in Light's Path`,
                            content: `<div style="margin-bottom:15px;">Not all materials block light the same way:</div><table style="width:100%; border-collapse: collapse; font-size:1.6rem; text-align:left;"><tr style="background:rgba(255,255,255,0.1);"><th style="padding:15px; border:1px solid #444;">Material Type</th><th style="padding:15px; border:1px solid #444;">What it does to Light</th><th style="padding:15px; border:1px solid #444;">Example</th></tr><tr><td style="padding:15px; border:1px solid #444;"><strong>Transparent</strong></td><td style="padding:15px; border:1px solid #444;">Lets all light rays pass straight through cleanly.</td><td style="padding:15px; border:1px solid #444;">Window Glass, Pure Water</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:15px; border:1px solid #444;"><strong>Translucent</strong></td><td style="padding:15px; border:1px solid #444;">Lets some light pass, but scatters the rays so image is blurry.</td><td style="padding:15px; border:1px solid #444;">Frosted Glass, Wax Paper</td></tr><tr><td style="padding:15px; border:1px solid #444;"><strong>Opaque</strong></td><td style="padding:15px; border:1px solid #444;">Blocks or absorbs ALL light. Forms sharp shadows.</td><td style="padding:15px; border:1px solid #444;">Wood, Brick, Steel</td></tr></table>`
                        },
                        {
                            title: `🤔 What If Scenario: The Laser Maze`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You need to shine a flashlight to a friend, but they are down a long, winding hallway around a corner?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 How can you get light to turn a corner?</div><div class="reveal-content">You have to force it to bounce! Since light travels in straight lines, you need to use <strong>MIRRORS</strong> to perfectly reflect the light beam cleanly around the 90-degree corners.</div></div>`
                        },
                        {
                            title: `🦇 Case Study: Fiber Optics (The Internet)`,
                            content: `<div style="line-height:1.7;">How are you reading this exact screen right now? Through light!</div><div class="journal-box" style="border-left-color:#2196f3; background:rgba(33,150,243,0.1);">To send the internet across oceans, engineers lay thousands of miles of <strong>Fiber Optic Cables</strong> underwater. These are long strings of perfectly clear glass. They shoot laser beams into the glass. The light wave bounces off the inside of the glass hundreds of times a second, traveling continuously forward until it hits your house carrying YouTube and video games!</div>`
                        },
                        {
                            title: `📞 Engineering Challenge: The Lighthouse`,
                            content: `<div style="line-height:1.7;">How do you make a light bulb visible from 20 miles away?</div><div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.1);">A normal lightbulb scatters light in every direction, weakening the wave instantly. In 1822, Augustin Fresnel invented a massive <strong>Prism Lens</strong> for lighthouses. This incredible glass tower curves and bends all the scattered light rays forward into a single, perfectly straight, extremely powerful "laser-like" beam!</div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Line of Sight`,
                            content: `<div style="line-height:1.7;">For our emergency signaling system, a flashlight is powerful but tricky.</div><div class="journal-box" style="border-left-color:#9c27b0; background:rgba(156,39,176,0.15);">If we use light to send a code from mountain A to mountain B, we need a perfectly clear <strong>Line of Sight</strong>. If an opaque tree, or a translucent fog cloud blocks the beam, the message dies instantly.</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Light Beams & Shadows`,
                            content: `<div style="margin-bottom:15px;"><strong>Test the Light Beam:</strong> Control the optics! Spawn blocks and glass in front of the laser beam. Notice the sharp shadows formed because light cannot curve!</div><div id="threejs-container-l43" style="width:100%; height:450px; background:rgba(0,0,0,0.8); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls" onmousedown="window.L43.stop(event)" ontouchstart="window.L43.stop(event)" onclick="window.L43.click(event)"><button class="btn-debug" id="l43-btn-init">🛠️ Ignite Laser</button><button class="btn-drop" id="l43-btn-wall" style="background:#555;">🧱 Spawn Opaque Wall</button><button class="btn-drop" id="l43-btn-glass" style="background:#2196f3;">🥃 Spawn Clear Glass</button><button class="btn-reset" id="l43-btn-reset">🔄 Clear Room</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> Compare Sound and Light:<br><br>1. Can sound travel through the empty vacuum of space? Why or why not?<br><br>2. Can light travel through the empty vacuum of space? Why or why not?</div>`
                        }
                    ]
                },"""

    pattern = re.compile(r"(\s*'lesson43':\s*\{\s*title: `Light Waves`,[\s\S]*?)(?=\s*'lesson44':\s*\{)", re.MULTILINE)
    
    if pattern.search(content):
        content = pattern.sub("\n" + l43_rigor_data + "\n", content)
        with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully upgraded Lesson 43 to 14-slide Rigor standard!")
    else:
        print("Error: Could not find the lesson43 JSON block to replace.")

if __name__ == "__main__":
    enhance_l43()
