import re

def enhance_l42():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update the L42 JS safe-event handlers
    l42_js_block = """
// --- L42 SAFE CONTROLS ---
window.L42 = {
    stop: function(e) {
        if (!e) return;
        e.stopPropagation();
    },
    click: function(e) {
        if (!e) return;
        e.stopPropagation();
        var id = e.target.id;
        var sim = window.b4Sim;
        if (id === 'l42-btn-init') {
            window.initSim('l42');
            if(document.getElementById('l42-hud-stats')) document.getElementById('l42-hud-stats').innerHTML = "Medium: None<br>Speed: 0 mph";
        } else if (id === 'l42-btn-air') {
            sim.frame = 0;
            sim.speeds = [0.1, 0, 0]; // Air is slow
            if(document.getElementById('l42-hud-stats')) document.getElementById('l42-hud-stats').innerHTML = "Medium: AIR (Gas)<br>Speed: 767 mph (Slowest)";
        } else if (id === 'l42-btn-water') {
            sim.frame = 0;
            sim.speeds = [0, 0.8, 0]; // Water is medium
            if(document.getElementById('l42-hud-stats')) document.getElementById('l42-hud-stats').innerHTML = "Medium: WATER (Liquid)<br>Speed: 3,315 mph (Faster)";
        } else if (id === 'l42-btn-steel') {
            sim.frame = 0;
            sim.speeds = [0, 0, 4.0]; // Steel is incredibly fast
            if(document.getElementById('l42-hud-stats')) document.getElementById('l42-hud-stats').innerHTML = "Medium: STEEL (Solid)<br>Speed: 13,330 mph (Fastest!)";
        } else if (id === 'l42-btn-reset') {
            sim.frame = 0;
            sim.speeds = [0, 0, 0];
            if(document.getElementById('l42-hud-stats')) document.getElementById('l42-hud-stats').innerHTML = "Medium: None<br>Speed: 0 mph";
        }
    }
};

function bindL42Controls() {
    console.log("L42 controls bound!");
}
"""

    # Inject L42 bindings directly after bindL40Controls (or L39) definition
    if "window.L42 =" not in content:
        content = re.sub(
            r"(function bindL39Controls\(\) \{[\s\S]*?\n\})",
            r"\1" + "\n" + l42_js_block,
            content
        )

    # Patch setupRace to call bindL42Controls
    content = content.replace(
        "if (lessonId === 'l42') {\n        setupRace();",
        "if (lessonId === 'l42') {\n        setupRace();\n        bindL42Controls();"
    )

    # Modify setupRace so it starts with speeds = 0
    content = content.replace("sim.speeds = [0.1, 0.8, 4.0];", "sim.speeds = [0, 0, 0];")

    # 2. Update the L42 JSON Data to the 14-slide Rigor standard
    l42_rigor_data = r"""'lesson42': {
                    title: `Sound Waves & Mediums (Rigorous Edition)`,
                    slides: [
                        {
                            title: `🌅 Warm-up: Try This Now`,
                            content: `<div class="journal-box"><strong>Place two fingers lightly against the front of your throat.</strong><br><br>📓 <strong>Task:</strong> Hum a very low, deep note. Then hum a very high, squeaky note.<ol style="line-height:1.8; margin-top:10px;"><li>First, what do your fingers physically feel?</li><li>Second, did the feeling change between the low note and the high note? Explain how it felt different.</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain that <strong>Sound</strong> is a mechanical wave caused by physical vibrations.</li><li>Categorize materials as a <strong>Medium</strong> for sound (Solid, Liquid, Gas).</li><li>Explain why sound completely fails in a vacuum.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#9c27b0; background:rgba(156,39,176,0.15);"><strong>🛰️ Mission Context:</strong> If our emergency signal uses a blaring siren (Sound Wave), we must know how far the sound can travel through the air, underwater, or across a mountain before the energy dies!</div>`,
                            vocabulary: [
                                { term: `Vibration`, definition: `A rapid back-and-forth physical movement of matter.` },
                                { term: `Compression Wave`, definition: `A longitudinal wave where matter pushes forward and bunches up, bumping into the next molecules (like pushing a slinky straight).` },
                                { term: `Medium`, definition: `The matter (solid, liquid, or gas) through which a mechanical wave travels.` },
                                { term: `Vacuum`, definition: `A space that is completely empty of matter—no air, no gas, absolutely nothing.` }
                            ]
                        },
                        {
                            title: `📜 Historical Discovery: The First Phonograph`,
                            content: `<div style="line-height:1.7;">How did humans first prove that sound was a physical vibration?</div><div class="journal-box" style="border-left-color:#667eea; background:rgba(102,126,234,0.1);">In 1877, Thomas Edison invented the phonograph. He shouted into a large cone that had a sharp needle at the tight end. His voice vibrations shook the air, which shook the needle, which literally carved a physical wave pattern into a spinning cylinder of tin foil! He proved sound is physical force!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Speaker Cone`,
                            content: `<div style="line-height:1.7; margin-bottom:15px;">Sound is created by PUNCHING the air!</div><div style="text-align:center; padding:20px; background:rgba(255,255,255,0.05); border-radius:12px; border:2px solid #9c27b0; margin-bottom:15px;"><svg width="100%" height="200" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg"><rect x="50" y="50" width="40" height="100" fill="#333"/><path d="M 90 60 L 130 30 L 130 170 L 90 140 Z" fill="#555"/><line x1="140" y1="100" x2="550" y2="100" stroke="#00bcd4" stroke-width="4" stroke-dasharray="15, 5"/><circle cx="180" cy="100" r="8" fill="#ffbc00"/><circle cx="200" cy="100" r="8" fill="#ffbc00"/><circle cx="220" cy="100" r="8" fill="#ffbc00"/><circle cx="350" cy="100" r="8" fill="#ffbc00"/><circle cx="480" cy="100" r="8" fill="#ffbc00"/><circle cx="500" cy="100" r="8" fill="#ffbc00"/><circle cx="520" cy="100" r="8" fill="#ffbc00"/><text x="140" y="160" fill="#ffbc00" font-size="14" font-family="sans-serif">Compression (Bunches)</text><text x="310" y="160" fill="#aaa" font-size="14" font-family="sans-serif">Rarefaction (Spread)</text></svg></div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 What is the speaker doing to the air molecules?</div><div class="reveal-content">It is literally punching forward and pulling back! The speaker cone pushes a wave of high-pressure air forward (a <strong>Compression</strong>). These molecules bump into the next molecules, creating a domino effect all the way to your eardrum!</div></div>`
                        },
                        {
                            title: `🧮 Math Moment: Thunder vs. Lightning`,
                            content: `<div style="line-height:1.7;">Light travels at 186,000 miles per second. Sound travels through air at only <strong>1/5th of a mile per second</strong>.</div><div style="margin:20px 0; padding:25px; background:rgba(255,255,255,0.08); border-radius:12px; font-size:1.5rem; text-align:center;">The 5-Second Rule!<br><br><span style="color:#00d4aa; font-weight:bold;">When you see lightning, count the seconds until you hear thunder.<br>Divide by 5 to get the miles!</span></div><div class="journal-box">📓 <strong>Your Turn:</strong> You see a lightning flash. You count to 15 seconds before the giant BOOM hits you. How many miles away did the lightning strike?</div>`
                        },
                        {
                            title: `🦇 Case Study: The Sonic Boom`,
                            content: `<div style="line-height:1.7;">What happens if an airplane flies faster than sound itself?</div><div class="journal-box" style="border-left-color:#2196f3; background:rgba(33,150,243,0.1);">Normally, an airplane pushes sound waves out in front of it. But if a fighter jet accelerates past 767 mph (Mach 1), it overtakes its own sound waves! The millions of pushed air molecules violently compress into a single, massive shockwave cone. When this cone hits the ground, we hear an explosive, window-shattering <strong>Sonic Boom</strong>!</div>`
                        },
                        {
                            title: `💧 Engineering Challenge: Sonar Mapping`,
                            content: `<div style="line-height:1.7;">How do submarines "see" in pitch black water?</div><div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.1);">Because sound is a physical push, it bounces off hard objects! Submarines blast a massive sound wave ("PING") into the ocean. The wave travels through the water medium, hits an enemy sub or the ocean floor, and physically <strong>echoes</strong> back. By timing the echo, the computer draws a 3D map of the dark ocean!</div>`
                        },
                        {
                            title: `🤔 What If Scenario: Sound in Space (The Truth)`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An asteroid crashes into the moon right next to an astronaut in a spacesuit. Does the astronaut hear the massive explosion?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 Remember what sound NEEDS...</div><div class="reveal-content"><strong>NO! Total silence.</strong> Space is a <strong>Vacuum</strong>. Sound is a mechanical wave—it MUST have a medium (air, water, or solid molecules) to bump into to travel. Since space is empty, the explosion energy has nothing to push. No molecules = No sound!</div></div>`
                        },
                        {
                            title: `📊 Organizer: The Density Race`,
                            content: `<div style="margin-bottom:15px;">Sound needs molecules to bounce against. The tighter the molecules are packed, the faster sound travels!</div><table style="width:100%; border-collapse: collapse; font-size:1.6rem; text-align:left;"><tr style="background:rgba(255,255,255,0.1);"><th style="padding:15px; border:1px solid #444;">Medium</th><th style="padding:15px; border:1px solid #444;">Molecule Packing</th><th style="padding:15px; border:1px solid #444;">Speed of Sound</th></tr><tr><td style="padding:15px; border:1px solid #444;"><strong>GAS (Air)</strong></td><td style="padding:15px; border:1px solid #444;">Spread far apart (slow bouncing)</td><td style="padding:15px; border:1px solid #444;">~ 767 mph</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:15px; border:1px solid #444;"><strong>LIQUID (Water)</strong></td><td style="padding:15px; border:1px solid #444;">Packed loosely together</td><td style="padding:15px; border:1px solid #444;">~ 3,315 mph</td></tr><tr><td style="padding:15px; border:1px solid #444;"><strong>SOLID (Steel)</strong></td><td style="padding:15px; border:1px solid #444;">Locked tightly together (instant bouncing)</td><td style="padding:15px; border:1px solid #444;">~ 13,330 mph!</td></tr></table>`
                        },
                        {
                            title: `🔬 STEM Interactive: Sound Medium Race`,
                            content: `<div style="margin-bottom:15px;"><strong>Test the Medium:</strong> Sound travels by molecules bumping into each other. Which phase of matter transfers the bump fastest?</div><div id="threejs-container-l42" style="width:100%; height:450px; background:rgba(10,15,30,1); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"><div id="l42-hud" onmousedown="window.L42.stop(event)" ontouchstart="window.L42.stop(event)" onclick="window.L42.stop(event)" style="position:absolute; top:15px; right:15px; background:rgba(30,40,60,0.9); padding:15px; border-radius:10px; border:2px solid #e91e63; z-index:10; color:white; font-family:sans-serif; text-align:right;"><h4 style="margin:0 0 10px 0; font-size:1.2rem;">📡 Telemetry</h4><div id="l42-hud-stats" style="font-size:1.1rem; color:#00bcd4;">Medium: None<br>Speed: 0 mph</div></div></div><div class="energy-controls" onmousedown="window.L42.stop(event)" ontouchstart="window.L42.stop(event)" onclick="window.L42.click(event)"><button class="btn-debug" id="l42-btn-init">🛠️ Init Race Track</button><button class="btn-drop" id="l42-btn-air" style="background:#555;">💨 Fire in AIR (Gas)</button><button class="btn-drop" id="l42-btn-water" style="background:#2196f3;">💧 Fire in WATER (Liquid)</button><button class="btn-drop" id="l42-btn-steel" style="background:#4caf50;">🛡️ Fire in STEEL (Solid)</button><button class="btn-reset" id="l42-btn-reset">🔄 Reset</button></div>`
                        },
                        {
                            title: `🧪 Think Like a Scientist: The Railroad Trick`,
                            content: `<div style="line-height:1.7;">In old Western movies, a cowboy puts his ear directly to the steel train tracks to see if a train is coming from miles away.</div><div class="journal-box" style="background:rgba(156,39,176,0.1); border-left-color:#9c27b0;">Why did they do this? Because the steel train tracks are a <strong>SOLID</strong>! The vibrations of the train wheels travel 17 times faster and much further through the solid steel molecules than they do through the gaseous air molecules. By listening to the steel, he hears into the future!</div>`
                        },
                        {
                            title: `🌊 Perspective: Whale Communication`,
                            content: `<div style="line-height:1.7;">How do Blue Whales talk to each other across entire oceans?</div><div class="journal-box" style="border-left-color:#667eea; background:rgba(102,126,234,0.1);">Air is terrible at carrying sound over long distances because the scattered molecules don't pass energy efficiently. But water is a dense liquid! A Blue Whale can sing a low-frequency hum that travels perfectly through the tightly packed water molecules for over <strong>1,000 miles</strong>!</div>`
                        },
                        {
                            title: `🛰️ Mission Connection: The Siren Limit`,
                            content: `<div style="line-height:1.7;">For our emergency signaling system, a loud siren has limits.</div><div class="journal-box" style="border-left-color:#00bcd4; background:rgba(0,188,212,0.15);">If we use a siren to signal for rescue over a huge mountain range, the sound waves are traveling through <strong>gas</strong> (air). As they hit trees, buildings, and wind, the loose molecules lose energy fast. A super loud siren might die out completely after just 3 or 4 miles! We might need a different kind of wave...</div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. What are the three states of matter that sound can travel through as a medium?<br><br>2. Why does sound travel incredibly fast through a solid piece of metal, but incredibly slow through the air? Explain using the concept of molecules.</div>`
                        }
                    ]
                },"""

    pattern = re.compile(r"'lesson42':\s*\{\s*title: `Sound Waves & Mediums`,[\s\S]*?'lesson43':\s*\{", re.MULTILINE)
    
    if pattern.search(content):
        content = pattern.sub(l42_rigor_data + "\n                'lesson43': {", content)
        with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Successfully upgraded Lesson 42 to 14-slide Rigor standard!")
    else:
        print("Error: Could not find the lesson42 JSON block to replace.")

if __name__ == "__main__":
    enhance_l42()
