import re
import sys

def enhance_l39():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update the L39 JS safe-event handlers
    l39_js_block = """
// --- L39 SAFE CONTROLS ---
window.L39 = {
    stop: function(e) {
        if (!e) return;
        e.stopPropagation();
    },
    input: function(e) {
        if (!e) return;
        e.stopPropagation();
    },
    click: function(e) {
        if (!e) return;
        e.stopPropagation();
        var id = e.target.id;
        var sim = window.b4Sim;
        if (id === 'l39-btn-init') {
            window.initSim('l39');
        } else if (id === 'l39-btn-pulse') {
            sim.uniforms.targetAmp = 5.0; // send a high amplitude pulse
            setTimeout(() => { sim.uniforms.targetAmp = 1.0; }, 300); // return to normal
        } else if (id === 'l39-btn-pause') {
            sim.isPlaying = !sim.isPlaying;
            e.target.textContent = sim.isPlaying ? '⏸️ Pause' : '▶️ Play';
        } else if (id === 'l39-btn-reset') {
            sim.frame = 0;
            sim.uniforms.targetAmp = 1.0;
            sim.uniforms.targetFreq = 1.5;
            if(document.getElementById('l39-tension')) document.getElementById('l39-tension').value = 1.5;
            if(document.getElementById('l39-tension-val')) document.getElementById('l39-tension-val').textContent = '1.5';
            sim.isPlaying = true;
            if(document.getElementById('l39-btn-pause')) document.getElementById('l39-btn-pause').textContent = '⏸️ Pause';
        }
    }
};

function bindL39Controls() {
    var sim = window.b4Sim;
    var tSlider = document.getElementById('l39-tension');
    var tLabel = document.getElementById('l39-tension-val');
    if (tSlider) {
        tSlider.value = sim.uniforms.targetFreq;
        tSlider.oninput = function() {
            sim.uniforms.targetFreq = parseFloat(this.value);
            if(tLabel) tLabel.textContent = this.value;
        };
    }
}
"""

    # Inject L39 bindings directly after bindL40Controls definition
    if "function bindL39Controls()" not in content:
        content = re.sub(
            r"(function bindL40Controls\(\) \{[\s\S]*?console\.log\(\"L40 controls bound\!\"\);\s*\})",
            r"\1" + "\n" + l39_js_block,
            content
        )

    # Patch setupWave to call bindL39Controls
    content = content.replace(
        "if (lessonId === 'l39' || lessonId === 'l40') {\n        setupWave(lessonId);\n        bindL40Controls();",
        "if (lessonId === 'l39' || lessonId === 'l40') {\n        setupWave(lessonId);\n        if(lessonId === 'l40') bindL40Controls();\n        if(lessonId === 'l39') bindL39Controls();"
    )

    # 2. Update the L39 JSON Data to the 14-slide Rigor standard
    l39_rigor_data = r"""'lesson39': {
                    title: `What is a Wave? (Rigorous Edition)`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Stadium Wave`,
                            content: `<div class="journal-box"><strong>Have you ever seen a "wave" at a crowded sports stadium?</strong><br><br>📓 <strong>Journal Task:</strong> Answer these questions:<ol style="line-height:1.8; margin-top:10px;"><li>When the crowd does "The Wave," do the people run all the way around the stadium, or do they just stand up and sit down in their exact seat?</li><li>If the people aren't moving around the stadium, what IS actually moving?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Define a <strong>Wave</strong> as a disturbance that transfers energy.</li><li>Explain that waves move <em>energy</em>, not <em>matter</em>.</li><li>Identify real-world examples of wave physics.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#00bcd4; background:rgba(0,188,212,0.15);"><strong>🛰️ Mission Context:</strong> To communicate during an emergency, we must send crucial information over miles instantly. We need something that travels fast without us carrying a physical object!</div>`,
                            vocabulary: [
                                { term: `Wave`, definition: `A disturbance or vibration that transfers energy from one place to another.` },
                                { term: `Matter`, definition: `Any physical substance; the "stuff" (water, air, rope) that a wave travels through.` },
                                { term: `Energy Transfer`, definition: `The passing of energy from one molecule or place to another.` }
                            ]
                        },
                        {
                            title: `📜 Historical Discovery: Measuring the Speed of Sound`,
                            content: `<div style="line-height:1.7;">In 1640, the French scientist Pierre Gassendi wanted to prove sound was a moving wave!</div><div class="journal-box" style="border-left-color:#667eea; background:rgba(102,126,234,0.1);">He had an army unit fire a cannon from a distant hilltop. By timing the delay between seeing the flash of the gunpowder and finally hearing the "boom" reach his ears, he proved that wave energy (sound) travels at a specific, measurable speed through the air medium!</div>`
                        },
                        {
                            title: `🔍 Discovery: Energy vs. Matter`,
                            content: `<div style="line-height:1.7; margin-bottom:15px;">The most important rule in physics: <strong>Waves transfer Energy, not Matter.</strong></div><div style="text-align:center; padding:20px; background:rgba(255,255,255,0.05); border-radius:12px; border:2px solid #00bcd4; margin-bottom:15px;"><svg width="100%" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg"><path d="M 50 100 Q 125 0 200 100 T 350 100 T 500 100" fill="none" stroke="#667eea" stroke-width="8" stroke-linecap="round"/><circle cx="200" cy="100" r="12" fill="#ff4444" /><path d="M 200 70 L 200 130 M 180 85 L 200 70 L 220 85 M 180 115 L 200 130 L 220 115" stroke="#ff4444" stroke-width="4" fill="none"/><text x="140" y="160" fill="#ff4444" font-size="16" font-family="sans-serif" font-weight="bold">Matter (Red Dot) moves UP & DOWN</text><path d="M 50 180 L 500 180" stroke="#00d4aa" stroke-width="6" stroke-dasharray="10, 10"/><path d="M 480 160 L 520 180 L 480 200" fill="#00d4aa" /><text x="200" y="50" fill="#00d4aa" font-size="20" font-family="sans-serif" font-weight="bold">Energy travels FORWARD</text></svg></div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 Study the diagram above...</div><div class="reveal-content">If you tie a ribbon to a jump rope and make a wave, the ribbon only bobs up and down. Only the invisible <strong>Kinetic Energy</strong> from your hand travels horizontally across the room!</div></div>`
                        },
                        {
                            title: `🧮 Math Moment: Calculating Wave Speed`,
                            content: `<div style="line-height:1.7;"><strong>The Speed Formula:</strong> How fast does an ocean wave travel?</div><div style="margin:20px 0; padding:25px; background:rgba(255,255,255,0.08); border-radius:12px; font-size:1.8rem; text-align:center;">Speed = Distance ÷ Time<br><br><span style="color:#00d4aa; font-weight:bold;">A wave travels 30 meters in 5 seconds.<br>30 ÷ 5 = 6 meters per second!</span></div><div class="journal-box">📓 <strong>Your Turn:</strong> If a tsunami wave travels 600 miles in 2 hours, what is its speed in miles per hour?</div>`
                        },
                        {
                            title: `🦇 Case Study: Seismic Earthquake Waves`,
                            content: `<div style="line-height:1.7;">What happens when the earth's crust snaps?</div><div class="journal-box" style="border-left-color:#2196f3; background:rgba(33,150,243,0.1);">When tectonic plates grind together and snap, they release millions of tons of <strong>Kinetic Energy</strong>. This energy travels as a "Seismic Wave" through the solid rock of the Earth (the Matter). The ground shakes violently up and down, but the rock itself doesn't travel across the country—only the energy does!</div>`
                        },
                        {
                            title: `📞 Engineering Challenge: The Ocean Buoy`,
                            content: `<div style="line-height:1.7;">If waves only move water up and down, how can we use that?</div><div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.1);">Engineers design giant floats called "Point Absorber Buoys." They sit on the ocean surface. As the ocean wave energy passes by, the water pushes the heavy buoy straight up and down. This vertical motion cranks a powerful generator inside to create electricity for cities!</div>`
                        },
                        {
                            title: `🤔 What If Scenario: Space Explosions`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An asteroid explodes in deep space, completely outside Earth's atmosphere. Do you hear the explosion?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 Remember what a wave needs...</div><div class="reveal-content">NO! Sound waves require <strong>Matter</strong> (like air or water) to travel through. Space is a vacuum with no air. The energy from the explosion has no "stuff" to vibrate against, so there is total silence!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Invisible Messengers`,
                            content: `<div style="line-height:1.7;">Our mission is to create an <strong>Emergency Signaling System</strong>.</div><div class="journal-box" style="border-left-color:#ffbc00; background:rgba(255,193,7,0.15);">We can't run a physical distress letter across a mountain in 5 seconds. But a <strong>Wave</strong> (like a sound siren or a beam of light) can carry our "SOS" pattern miles away almost instantly, without us needing to move a single physical object!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Rope Wave Physics`,
                            content: `<div style="margin-bottom:15px;"><strong>Wave Simulator:</strong> Adjust the rope's tension and send a massive energy pulse! Watch how the particles move compared to the invisible energy.</div><div id="threejs-container-l39" style="width:100%; height:450px; background:rgba(10,15,30,1); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"><div id="l39-hud" onmousedown="window.L39.stop(event)" ontouchstart="window.L39.stop(event)" onclick="window.L39.stop(event)" oninput="window.L39.input(event)" style="position:absolute; top:15px; left:15px; background:rgba(30,40,60,0.9); padding:15px; border-radius:10px; border:2px solid #ffbc00; z-index:10; color:white; font-family:sans-serif;"><h4 style="margin:0 0 10px 0; font-size:1.2rem;">🧶 Rope Tension</h4><label style="display:block; margin-bottom:5px;">Frequency: <span id="l39-tension-val">1.5</span></label><input type="range" id="l39-tension" min="0.5" max="4" value="1.5" step="0.1" style="width:100%;"></div></div><div class="energy-controls" onmousedown="window.L39.stop(event)" ontouchstart="window.L39.stop(event)" onclick="window.L39.click(event)"><button class="btn-debug" id="l39-btn-init">🛠️ Init Rope</button><button class="btn-drop" id="l39-btn-pulse">⚡ Send Big Pulse</button><button class="btn-pause" id="l39-btn-pause">⏸️ Pause</button><button class="btn-reset" id="l39-btn-reset">🔄 Reset</button></div>`
                        },
                        {
                            title: `📊 Organizer: Types of Waves`,
                            content: `<div style="margin-bottom:15px;">Not all energy travels the same way through matter:</div><table style="width:100%; border-collapse: collapse; font-size:1.6rem; text-align:left;"><tr style="background:rgba(255,255,255,0.1);"><th style="padding:15px; border:1px solid #444;">Wave Type</th><th style="padding:15px; border:1px solid #444;">How it Moves</th><th style="padding:15px; border:1px solid #444;">Real World Example</th></tr><tr><td style="padding:15px; border:1px solid #444;"><strong>Transverse Wave</strong></td><td style="padding:15px; border:1px solid #444;">Matter moves UP & DOWN, energy moves forward.</td><td style="padding:15px; border:1px solid #444;">Ocean waves, Shaking a jump rope</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:15px; border:1px solid #444;"><strong>Longitudinal Wave</strong></td><td style="padding:15px; border:1px solid #444;">Matter pushes FORWARD & BACK in a straight line.</td><td style="padding:15px; border:1px solid #444;">Sound waves, Pushing a slinky straight</td></tr></table>`
                        },
                        {
                            title: `🧪 Think Like a Scientist: The Domino Effect`,
                            content: `<div style="line-height:1.7;">Are falling dominoes a wave?</div><div class="journal-box" style="background:rgba(156,39,176,0.1); border-left-color:#9c27b0;">If you line up 100 dominoes and tip the first one, they all fall down. The <strong>Kinetic Energy</strong> traveled from the first domino all the way to the 100th domino! However, the very first domino didn't slide across the floor to hit the last one. It just transferred its energy and stopped! Yes, it acts exactly like a wave!</div>`
                        },
                        {
                            title: `🌊 Perspective: The Tsunami Misconception`,
                            content: `<div style="line-height:1.7;">Most people think a tsunami is a giant moving wall of water. It's not!</div><div class="journal-box" style="border-left-color:#667eea; background:rgba(102,126,234,0.1);">Out in the deep ocean, a tsunami wave transfers energy so cleanly that a boat floating on top will just gently lift up a few feet and gently go back down. The water itself isn't moving horizontally! It only becomes dangerous when the invisible energy hits the shallow shore and has nowhere to go but up into a crashing wall.</div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. In your own words, what is a wave?<br><br>2. When a huge, energetic wave travels across the entire Pacific ocean, does the ocean water itself travel across the ocean? Explain what is actually traveling.</div>`
                        }
                    ]
                },"""

    # Do a precise regex replacement of the old lesson39 object
    pattern = re.compile(r"'lesson39':\s*\{\s*title: `What is a Wave\?`,[\s\S]*?'lesson40':\s*\{", re.MULTILINE)
    
    if pattern.search(content):
        content = pattern.sub(l39_rigor_data + "\n                'lesson40': {", content)
        with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully upgraded Lesson 39 to 14-slide Rigor standard!")
    else:
        print("Error: Could not find the lesson39 JSON block to replace.")

if __name__ == "__main__":
    enhance_l39()
