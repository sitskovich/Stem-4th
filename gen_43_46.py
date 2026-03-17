import re

def get_lessons_js():
    return """
                'lesson43': {
                    title: `Light Waves`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Laser Pointer`,
                            content: `<div class="journal-box"><strong>Imagine shining a laser pointer across a dark, dusty room.</strong><br><br>📓 <strong>Task:</strong> In your journal, answer these two questions:<ol style="line-height:1.8; margin-top:10px;"><li>What does the beam of light look like? (Is it perfectly straight, wavy, or zig-zagged?)</li><li>How long does it take for the light to hit the wall?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Identify that <strong>Light</strong> travels in straight lines.</li><li>Explain that Light is an <strong>Electromagnetic Wave</strong>.</li><li>Understand that light does <em>not</em> need a medium to travel!</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#ffeb3b; background:rgba(255,235,59,0.15);"><strong>🛰️ Mission Context:</strong> A siren (sound wave) only travels a few miles. But if we use light to send our emergency message, it can travel almost infinitely... as long as nothing gets in its way!</div>`,
                            vocabulary: [
                                { term: 'Light Wave', definition: 'A type of wave that travels in straight lines and carries electromagnetic energy.' },
                                { term: 'Electromagnetic Spectrum', definition: 'The entire range of light waves, including things we can\\'t see like X-rays and radio waves.' },
                                { term: 'Speed of Light', definition: 'The fastest speed in the universe: 186,282 miles per second!' }
                            ]
                        },
                        {
                            title: `📜 Perspective: Sunlight Journey`,
                            content: `<div style="line-height:1.7;">It takes 8 minutes for light to leave the Sun and reach Earth.</div><div class="journal-box" style="border-left-color:#f44336; background:rgba(244,67,54,0.1);">Unlike sound waves, which need air, water, or solid matter to travel through, light waves are perfectly happy traveling through the empty vacuum of space! This is why we can see the stars, but we can\'t hear them explode.</div>`
                        },
                        {
                            title: `🔍 Discovery: Blocking the Path`,
                            content: `<div style="line-height:1.7;">Light is incredibly fast, but it has a weakness.</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What happens if you stand in front of a flashlight?</div><div class="reveal-content">A shadow appears! Because light ONLY travels in perfectly straight lines, it cannot bend around your body. Sound can bounce around corners easily, but light is rigid.</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: The Laser Maze`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You need to shine a flashlight into a room, but the door is down a long, winding hallway?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 How can you get light to turn a corner?</div><div class="reveal-content">You have to force it to bounce! Since light travels in straight lines, you need to use <strong>MIRRORS</strong> to reflect the light cleanly around the corners.</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Line of Sight`,
                            content: `<div style="line-height:1.7;">For our emergency signaling system, a flashlight is powerful but tricky.</div><div class="journal-box" style="border-left-color:#9c27b0; background:rgba(156,39,176,0.15);">If we use light to send a code from mountain A to mountain B, we need a clear <strong>Line of Sight</strong>. If a tree or cloud blocks the beam, the message dies instantly.</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Light Beams & Shadows`,
                            content: `<div style="margin-bottom:15px;"><strong>Test the Light Beam:</strong> Drag the objects in front of the laser. Notice the sharp shadows formed because light cannot curve!</div><div id="threejs-container-l43" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l43\')">🛠️ Debug</button><button class="btn-drop" onclick="spawnBlock()">🧱 Spawn Wall</button><button class="btn-drop" onclick="spawnGlass()">🥃 Spawn Glass</button><button class="btn-reset" onclick="resetLightScene()">🔄 Clear Room</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> Compare Sound and Light:<br><br>1. Can sound travel through the empty vacuum of space? Why or why not?<br><br>2. Can light travel through the empty vacuum of space?</div>`
                        }
                    ]
                },
                'lesson44': {
                    title: `Reflection & Refraction`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Broken Pencil`,
                            content: `<div class="journal-box"><strong>Look at a clear glass of water with a pencil resting in it.</strong><br><br>📓 <strong>Task:</strong> Draw exactly what you see happening to the pencil where the air meets the water.<ol style="line-height:1.8; margin-top:10px;"><li>Does the pencil look straight?</li><li>What illusion is happening?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain how a polished surface causes <strong>Reflection</strong>.</li><li>Explain how light bends, or <strong>Refracts</strong>, when it changes medium.</li><li>Provide examples of opaque, translucent, and transparent materials.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#e91e63; background:rgba(233,30,99,0.15);"><strong>🛰️ Mission Context:</strong> We can manipulate light to solve our line-of-sight problems! We can use mirrors to bounce our signal, or lenses to focus a weak light into a powerful beam!</div>`,
                            vocabulary: [
                                { term: 'Reflection', definition: 'When light hits a surface and bounces off back into our eyes.' },
                                { term: 'Refraction', definition: 'When light passes through a new medium (like water or glass) and changes speed, causing it to bend.' },
                                { term: 'Opaque', definition: 'Materials that block all light (wood, metal).' },
                                { term: 'Transparent', definition: 'Materials that let light pass through perfectly (clear glass).' }
                            ]
                        },
                        {
                            title: `📜 Perspective: Why is an Apple Red?`,
                            content: `<div style="line-height:1.7;">White light from the sun actually contains every color of the rainbow.</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.1);">When white light hits an apple, the skin of the apple absorbs the blue, green, and yellow light. It <strong>Reflects</strong> only the red light back to your eyeball! We only see things because light bounces off them.</div>`
                        },
                        {
                            title: `🔍 Discovery: The Mirror Bounce`,
                            content: `<div style="line-height:1.7;">Most objects scatter light in every direction because they are microscopically bumpy.</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 Why does a mirror create a perfect image?</div><div class="reveal-content">A mirror is completely smooth. When light hits it, all the light rays bounce off at the exact same, perfect angle! It’s like throwing a bouncy ball against a perfectly flat wall vs a rocky cliff.</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: The Bending Spear`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An ancient fisherman is trying to spear a fish in a river. He aims perfectly straight at where he sees the fish, but he keeps missing. Why?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 Hint: The water is tricking him!</div><div class="reveal-content"><strong>Refraction!</strong> As light from the fish leaves the water and hits the air, the light bends. The fish isn’t actually where he sees it. He needs to aim slightly lower to catch the fish!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Focus and Bounce`,
                            content: `<div style="line-height:1.7;">We can build tools to control our light signals.</div><div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.15);">A magnifying glass uses <strong>Refraction</strong> to bend light to a single, powerful point. A periscope uses <strong>Reflection</strong> to bounce the light signal over a wall!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Optics Bench`,
                            content: `<div style="margin-bottom:15px;"><strong>Bend & Bounce the Laser:</strong> Drag mirrors and glass blocks to hit the target!</div><div id="threejs-container-l44" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l44\')">🛠️ Debug</button><button class="btn-drop" onclick="spawnMirror()">🪞 Add Mirror</button><button class="btn-slow" onclick="rotateMirror()">🔄 Rotate</button><button class="btn-drop" onclick="spawnPrism()">💎 Add Glass Prism</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> Explain the difference between Reflection and Refraction to a friend.<br><br>1. Reflection is when light ________.<br><br>2. Refraction is when light ________.</div>`
                        }
                    ]
                },
                'lesson45': {
                    title: `LAB 2 — Light & Reflection Lab`,
                    slides: [
                        {
                            title: `🔬 Lab Overview: Your Mission Today`,
                            content: `<strong style="font-size:1.4rem;">🎯 YOUR GOAL: Engineer a system to bounce a light signal around an obstacle!</strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0;"><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #28a745;"><strong style="font-size:1.2rem;">✅ SUCCESS CRITERIA:</strong><br>1. The light beam hit the target target.<br>2. The light beam must wrap a 90-degree corner.<br>3. You must use exactly two mirrors.</div><div style="background:rgba(220,53,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #dc3545;"><strong style="font-size:1.2rem;">⚠️ SAFETY RULES:</strong><br>• NEVER shine the flashlight in a partner\\'s eyes.<br>• Handle mirrors delicately by the edges.</div></div>`
                        },
                        {
                            title: `🛠️ Supplies & Setup`,
                            content: `<div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;"><strong style="font-size:1.8rem;">📦 WHAT YOU NEED:</strong><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:15px;font-size:1.5rem;"><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Target Box (Cardboard)</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Flashlight (Signal Source)</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">2 Flat Craft Mirrors</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Giant Textbook (Obstacle)</div></div></div><div style="margin-top:20px;padding:15px;background:rgba(255,193,7,0.15);border-radius:10px;"><strong>📐 SETUP STEPS:</strong><br>Stand the textbook up vertically like a wall in the middle of your desk. Place the flashlight at one end. Place the target box directly behind the book. If you turn on the flashlight, the book blocks the beam!</div>`
                        },
                        {
                            title: `🏁 Procedure: The Double Bounce`,
                            content: `<strong>📋 PART 1: AROUND THE CORNER (20 min)</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">1</div><div><strong>Position Mirror 1:</strong> Place one mirror off to the side so the flashlight hits it and bounces <em>past</em> the book.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">2</div><div><strong>Position Mirror 2:</strong> Place the second mirror behind the book to catch the beam and bounce it back inward to hit the target.</div></div></div><div style="background:rgba(255,193,7,0.2);padding:12px;border-radius:8px;"><strong>📝 NOTE:</strong> The angle it hits the mirror will be the exact angle it leaves the mirror.</div>`
                        },
                        {
                            title: `🔍 Discovery: Angle of Incidence`,
                            content: `<div style="line-height:1.7;">Did you notice a pattern with how you had to twist the mirrors?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What is the rule of reflection?</div><div class="reveal-content">Angle in = Angle out! If you hit a mirror perfectly straight, it bounces straight back. If you hit it at a sharp 45-degree slant, it bounces off at a matching 45-degree slant!</div></div>`
                        },
                        {
                            title: `🏁 Procedure: The Periscope Principle`,
                            content: `<strong>📋 PART 2: THE PERISCOPE BUILD (15 min)</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">3</div><div><strong>The Setup:</strong> Have Partner A sit on the floor. Have Partner B stand and hold the target box near their face. Partner A must use the flashlight to hit the target.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">4</div><div><strong>The Climb:</strong> The light must bounce UP to a mirror, and then ACROSS. Adjust the angles carefully to solve the vertical challenge!</div></div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Foggy Air`,
                            content: `<div class="what-if-box"><strong>What If:</strong> Someone filled the classroom with super thick smoke or fog while you were doing this lab?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What happens to the light beam?</div><div class="reveal-content">The fog acts as a million tiny obstacles. The light starts bouncing (reflecting) off every tiny water droplet, scattering in all directions until the beam is completely scattered and lost. You wouldn\'t hit the target!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Mirror Signaler`,
                            content: `<div style="line-height:1.7;">We just proved that we can redirect an emergency signal!</div><div class="journal-box" style="border-left-color:#00bcd4; background:rgba(0,188,212,0.15);">If someone is trapped in a canyon and they have a mirror, they can bounce sunlight directly up to a rescue helicopter. They are controlling light perfectly!</div>`
                        },
                        {
                            title: `🚪 Exit Ticket & Cleanup`,
                            content: `<div class="journal-box"><strong>🧹 MINUTE 40: CLEANUP</strong><ol><li>Turn off all flashlights to save batteries.</li><li>Return mirrors and flashlights.</li></ol></div><div style="margin-top:20px;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;border:2px solid #28a745;"><strong>📓 EXIT TICKET:</strong> Draw a simple map showing your double-mirror solution from Part 1. Draw a straight line to show the beam of light bouncing off the two mirrors!</div>`
                        }
                    ]
                },
                'lesson46': {
                    title: `Patterns & Information Transfer`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Silent Signal`,
                            content: `<div class="journal-box"><strong>Your teacher will perform an action at the front of the classroom without speaking.</strong><br><br>📓 <strong>Task:</strong> Observe. Your teacher will put their index finger perfectly vertically over their lips.<ol style="line-height:1.8; margin-top:10px;"><li>What does this signal mean?</li><li>Did they have to write a letter or say a word to communicate that message?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Define a <strong>Code</strong> as a system of signals or symbols used to communicate.</li><li>Understand how simple <strong>Patterns</strong> can transfer complex information.</li><li>Recognize that different situations require different types of signals.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#f44336; background:rgba(244,67,54,0.15);"><strong>🛰️ Mission Context:</strong> A flashlight is useless in an emergency if you just turn it on and leave it on! To actually communicate a message, we must use patterns—flashing it on and off in a specific, agreed-upon code.</div>`,
                            vocabulary: [
                                { term: 'Information Transfer', definition: 'The process of moving data or a message from one person or place to another.' },
                                { term: 'Code', definition: 'A system of rules to convert information (like a letter or word) into another form (like a beep or a flash).' },
                                { term: 'Pattern', definition: 'A repeated, predictable design or sequence.' }
                            ]
                        },
                        {
                            title: `📜 Perspective: Talking Drums of Africa`,
                            content: `<div style="line-height:1.7;">Long before phones were invented, communities in West Africa could send complex news miles away in minutes.</div><div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.1);">They used "Talking Drums." Because their languages were tonal (pitch mattered), drummers could manipulate the pitch and rhythm of the drum to mimic spoken phrases. A pattern of high and low beats told neighboring villages exactly what was happening!</div>`
                        },
                        {
                            title: `🔍 Discovery: Baseball Signs`,
                            content: `<div style="line-height:1.7;">Look closely at a baseball coach in the dugout. They touch their ear, rub their chest, and tap their nose.</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What is happening?</div><div class="reveal-content">They are transferring information! This is a visual <strong>Code</strong>. The batter knows that "nose tap" means "bunt the ball." The coach is communicating complex strategy to one player without the other team hearing it!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Stranded on an Island`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You are stranded on an island. You see a ship miles away. You have a pile of dry wood, green leaves, and fire.</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 How do you send information?</div><div class="reveal-content">A normal fire just means "someone is camping." If you put green leaves on the fire, the smoke turns thick and white. If you cover the fire with a wet blanket and release it in bursts, you create three equal puffs of smoke: A <strong>Pattern</strong> that universally means "SOS"!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Creating the Code`,
                            content: `<div style="line-height:1.7;">We have sound waves and light waves. Now we need the code!</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.15);">If we blast a siren for 1 second, pause, and blast again for 1 second... that is a pattern. Just like the talking drums, we must agree on what the pattern means before the emergency happens!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Code Breaker`,
                            content: `<div style="margin-bottom:15px;"><strong>Decode the Message:</strong> Watch the light flash. Use the codebook to decipher the secret word!</div><div id="threejs-container-l46" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l46\')">🛠️ Debug</button><button class="btn-drop" onclick="playSecretFlash(\\\'easy\\\')">🟢 Easy Pattern</button><button class="btn-drop" onclick="playSecretFlash(\\\'hard\\\')">🔴 Hard Pattern</button><button class="btn-slow" onclick="showCodebook()">📖 View Codebook</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong><br><br>1. What is an example of a pattern or code you use every day without speaking? (Think about lights at an intersection, or sounds a microwave makes.)<br><br>2. Why are patterns better for sending information over long distances than simply yelling words?</div>`
                        }
                    ]
                }
"""

def inject():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find where lesson42 ends. It's the last one we just injected. 
    # Because I want to inject 43-46 right after 42.
    match = re.search(r'(\'lesson42\':\s*\{.*?\n\s{16}\}\n\s{12}\})', html, re.DOTALL)
    if not match:
        print("Could not find lesson42 block! Attempting lesson38.")
        match = re.search(r'(\'lesson38\':\s*\{.*?\n\s{16}\}\n\s{12}\})', html, re.DOTALL)
        if not match:
            print("Failed to find injection point.")
            return

    end_idx = match.end()
    
    if 'lesson43' not in html[end_idx:end_idx+500]:
        new_html = html[:end_idx] + ",\n" + get_lessons_js() + html[end_idx:]
        with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print("Successfully injected lessons 43-46.")
    else:
        print("Injection point may already have data.")

if __name__ == "__main__":
    inject()
