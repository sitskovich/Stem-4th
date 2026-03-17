import re

def get_lessons_js():
    return """
                'lesson39': {
                    title: `What is a Wave?`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Stadium Wave`,
                            content: `<div class="journal-box"><strong>Have you ever seen a "wave" at a stadium?</strong><br><br>📓 <strong>Journal Task:</strong> Answer these questions:<ol style="line-height:1.8; margin-top:10px;"><li>When the crowd does "The Wave," do the people run around the stadium, or do they just stand up and sit down in place?</li><li>What is actually moving around the stadium?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Define a <strong>Wave</strong> as a disturbance that transfers energy.</li><li>Explain that waves move <em>energy</em>, not <em>matter</em>.</li><li>Identify different types of waves in the real world.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#00bcd4; background:rgba(0,188,212,0.15);"><strong>🛰️ Mission Context:</strong> To communicate during an emergency, we need to send information over long distances instantly. We need something that can travel miles without moving any physical material across the landscape!</div>`,
                            vocabulary: [
                                { term: 'Wave', definition: 'A disturbance that transfers energy from one place to another.' },
                                { term: 'Matter', definition: 'Any physical substance; the "stuff" that the wave travels through.' },
                                { term: 'Energy Transfer', definition: 'The passing of energy from one object, molecule, or place to another.' }
                            ]
                        },
                        {
                            title: `📜 Historical Discovery: Measuring the Speed of Sound`,
                            content: `<div style="line-height:1.7;">In 1640, Pierre Gassendi correctly measured the speed of sound!</div><div class="journal-box" style="border-left-color:#667eea; background:rgba(102,126,234,0.1);">He used a cannon. By timing the flash of the gunpowder to the "boom" reaching his ears, he proved that wave energy (sound) travels at a specific speed through the air medium, much slower than light!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Rope Trick`,
                            content: `<div style="line-height:1.7;">If you tie one end of a rope to a doorknob and flick the other end, a ripple travels down the rope.</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What is moving?</div><div class="reveal-content">The pieces of the rope just go up and down. The <strong>Energy</strong> from your flick is what travels from your hand to the doorknob. The rope itself didn\'t move closer to the door!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Zero Gravity`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An astronaut flicked a jump rope on the International Space Station, where they are floating in microgravity?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 Would the wave still happen?</div><div class="reveal-content">Yes! The wave isn\'t dependent on gravity to move forward. The energy would still travel down the rope, making it wiggle through the air inside the station!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Invisible Messengers`,
                            content: `<div style="line-height:1.7;">Our mission is to create an <strong>Emergency Signaling System</strong>.</div><div class="journal-box" style="border-left-color:#ffbc00; background:rgba(255,193,7,0.15);">We can\'t run a letter across a mountain in 5 seconds. But a <strong>Wave</strong> (like sound or light) can carry our "SOS" message miles away almost instantly, without us needing to move a single inch!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Wave Physics Simulator`,
                            content: `<div style="margin-bottom:15px;"><strong>Observe Energy Transfer:</strong> Flick the rope and watch the energy travel! Notice how the red dot just bobs up and down.</div><div id="threejs-container-l39" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l39\')">🛠️ Debug</button><button class="btn-drop" onclick="startRopeWave()">⚡ Send Wave</button><button class="btn-pause" onclick="pauseRopeWave()">⏸️ Pause</button><button class="btn-slow" onclick="slowMoRopeWave()">🐢 Slow Mo</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. In your own words, what is a wave?<br><br>2. When a wave travels through the ocean, does the water itself move across the ocean? Explain.</div>`
                        }
                    ]
                },
                'lesson40': {
                    title: `Amplitude & Wavelength`,
                    slides: [
                        {
                            title: `🌅 Warm-up: Drawing the Invisible`,
                            content: `<div class="journal-box"><strong>In your journal, grab a pencil.</strong><br><br>📓 <strong>Task:</strong><ol style="line-height:1.8; margin-top:10px;"><li>Draw a wave that looks calm, gentle, and slow.</li><li>Below it, draw a wave that looks angry, chaotic, and energetic.</li><li>Look at the two drawings. What specifically makes them look different? (Height? Spacing?)</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Identify the <strong>Peak</strong> and <strong>Trough</strong> of a wave.</li><li>Measure a wave\\'s <strong>Amplitude</strong> (height).</li><li>Measure a wave\\'s <strong>Wavelength</strong> (distance).</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#ff4444; background:rgba(244,67,54,0.15);"><strong>🛰️ Mission Context:</strong> Different emergencies need different signals. By changing the shape of our waves (amplitude and wavelength), we can encode different messages, like "Send Medical Help" vs "Evacuate."</div>`,
                            vocabulary: [
                                { term: 'Peak (or Crest)', definition: 'The highest point of a wave.' },
                                { term: 'Trough', definition: 'The lowest point of a wave.' },
                                { term: 'Amplitude', definition: 'The height of a wave from its resting position to its peak.' },
                                { term: 'Wavelength', definition: 'The distance between one peak and the next peak.' }
                            ]
                        },
                        {
                            title: `📜 Historical Discovery: The First Seismograph`,
                            content: `<div style="line-height:1.7;">How did ancient scientists measure wave amplitude?</div><div class="journal-box" style="border-left-color:#667eea; background:rgba(102,126,234,0.1);">In 132 AD, Zhang Heng invented the first seismoscope in China! It was a giant bronze jar with dragons. When an earthquake wave arrived, the amplitude of the wave would knock a bronze ball into a toad's mouth, proving a wave had passed!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Wave Graph`,
                            content: `<div style="line-height:1.7;">Scientists graph waves to understand them.</div><img src="images/Bundle3/lens_reflection_diagram_1768923963160.png" style="width:60%; display:block; margin:20px auto; border-radius:12px; border:2px solid #00bcd4;" alt="Wave Anatomy"><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 How is Energy connected to Amplitude?</div><div class="reveal-content">The taller the wave (higher Amplitude), the more <strong>Energy</strong> is packed into it! It takes a lot more force to make a 20-foot wave than a 2-inch ripple.</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Earthquake Measurments`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An earthquake measuring station in California prints a graph with huge lines (high amplitude) drawn close together (short wavelength). What happened?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 Interpret the Graph...</div><div class="reveal-content">The ground was shaking VIOLENTLY (high amplitude) and VERY FAST (short wavelength). That’s a massive, destructive earthquake!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Designing the Signal`,
                            content: `<div style="line-height:1.7;">For our Emergency Signaler, we will use Light or Sound waves.</div><div class="journal-box" style="border-left-color:#28a745; background:rgba(40,167,69,0.15);">If we use a flashlight (Light Wave), changing the <strong>Amplitude</strong> makes the light brighter or dimmer. If we use a siren (Sound Wave), changing the <strong>Wavelength</strong> makes the pitch higher or lower!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Seismograph Sandbox`,
                            content: `<div style="margin-bottom:15px;"><strong>Create Your Wave:</strong> Adjust the sliders to see how Amplitude and Wavelength change the wave!</div><div id="threejs-container-l40" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l40\')">🛠️ Debug</button><button class="btn-drop" onclick="waveIncAmp()">⬆️ Amplitude</button><button class="btn-drop" onclick="waveDecAmp()">⬇️ Amplitude</button><button class="btn-slow" onclick="waveIncLength()">↔️ Wavelength</button><button class="btn-slow" onclick="waveDecLength()">>< Wavelength</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> Draw a single wave line in your journal.<br><br>1. Label exactly where the <strong>Peak</strong> and <strong>Trough</strong> are.<br>2. Draw an arrow showing what the <strong>Amplitude</strong> is.</div>`
                        }
                    ]
                },
                'lesson41': {
                    title: `LAB 1 — Wave Properties Lab`,
                    slides: [
                        {
                            title: `🔬 Lab Overview: Your Mission Today`,
                            content: `<strong style="font-size:1.4rem;">🎯 YOUR GOAL: Manipulate a medium to create exact wave patterns!</strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0;"><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #28a745;"><strong style="font-size:1.2rem;">✅ SUCCESS CRITERIA:</strong><br>1. Must demonstrate High Amplitude vs Low Amplitude.<br>2. Must demonstrate Short Wavelength vs Long Wavelength.</div><div style="background:rgba(220,53,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #dc3545;"><strong style="font-size:1.2rem;">⚠️ SAFETY RULES:</strong><br>• Do not snap the slinky/coil at your partner.<br>• Keep waves parallel to the floor.</div></div>`
                        },
                        {
                            title: `🛠️ Supplies & Setup`,
                            content: `<div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;"><strong style="font-size:1.8rem;">📦 WHAT YOU NEED:</strong><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:15px;font-size:1.5rem;"><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Long Metal Slinky (Coil)</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Meter Stick</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Masking Tape</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Lab Partner</div></div></div><div style="margin-top:20px;padding:15px;background:rgba(255,193,7,0.15);border-radius:10px;"><strong>📐 SETUP STEPS:</strong><br>Find an open spot on the floor. Take a piece of masking tape. One partner sits on the tape holding one end of the coil. The other sits 3 meters away holding the other end. Do not over-stretch!</div>`
                        },
                        {
                            title: `🏁 Procedure: The Amplitude Test`,
                            content: `<strong>📋 PART 1: AMPLITUDE (15 min)</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">1</div><div><strong>Low Amplitude:</strong> Partner A shakes their hand side-to-side just a TINY bit. Record if it took a lot of energy or a little.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">2</div><div><strong>High Amplitude:</strong> Partner A shakes their hand side-to-side VERY WIDE (3 feet total). Record the difference.</div></div></div><div style="background:rgba(255,193,7,0.2);padding:12px;border-radius:8px;"><strong>📝 NOTE:</strong> Amplitude is how WIDE you shake it.</div>`
                        },
                        {
                            title: `🔍 Discovery: Generating the Wave`,
                            content: `<div style="line-height:1.7;">Did you notice the slinky didn\'t move towards your partner?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What was moving?</div><div class="reveal-content">Only the <strong>kinetic energy</strong> from your arm traveled down the metal rings. The metal rings themselves just moved left and right. That’s a wave!</div></div>`
                        },
                        {
                            title: `🏁 Procedure: The Wavelength Test`,
                            content: `<strong>📋 PART 2: WAVELENGTH (15 min)</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">3</div><div><strong>Long Wavelength:</strong> Shake the slinky very SLOWLY side to side. The waves should look long and stretched out.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">4</div><div><strong>Short Wavelength (High Frequency):</strong> Shake the slinky side to side as FAST as you can! Notice how tight the wave peaks get.</div></div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Breaking the Slinky?`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You tried to make a wave with massive amplitude AND massive frequency (super wide and super fast)?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What happens to your arm?</div><div class="reveal-content">Your arm gets exhausted in two seconds! High Amplitude + Short Wavelength means the wave contains a HUGE amount of energy. Nature works the same way.</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Wave Data`,
                            content: `<div style="line-height:1.7;">If we are using waves to send an emergency code, we have options!</div><div class="journal-box" style="border-left-color:#00d4aa; background:rgba(0,212,170,0.15);">We could make a rule: 1 "High Amplitude" wave means "FIRE", 2 "High Amplitude" waves means "FLOOD." The wave is our messenger!</div>`
                        },
                        {
                            title: `🚪 Exit Ticket & Cleanup`,
                            content: `<div class="journal-box"><strong>🧹 MINUTE 40: CLEANUP</strong><ol><li>Coil your slinky carefully (don\'t tangle!).</li><li>Return meter sticks.</li><li>Sign off on your partner\'s lab sheet.</li></ol></div><div style="margin-top:20px;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;border:2px solid #28a745;"><strong>📓 EXIT TICKET:</strong> Which took more muscle energy to create: High Amplitude or Low Amplitude? Why?</div>`
                        }
                    ]
                },
                'lesson42': {
                    title: `Sound Waves & Mediums`,
                    slides: [
                        {
                            title: `🌅 Warm-up: Try This Now`,
                            content: `<div class="journal-box"><strong>Place two fingers lightly against the front of your throat.</strong><br><br>📓 <strong>Task:</strong> Hum a very low, deep note. Then hum a very high, squeaky note.<ol style="line-height:1.8; margin-top:10px;"><li>What do your fingers feel?</li><li>Did the feeling change between the low note and the high note?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain that <strong>Sound</strong> is a mechanical wave caused by vibrations.</li><li>Categorize materials as a <strong>Medium</strong> for sound (Solid, Liquid, Gas).</li><li>Explain why sound cannot travel through a vacuum.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#9c27b0; background:rgba(156,39,176,0.15);"><strong>🛰️ Mission Context:</strong> If our emergency signal uses a siren (Sound Wave), we must know how far the sound can travel through the air, water, or mountains before it runs out of energy!</div>`,
                            vocabulary: [
                                { term: 'Vibration', definition: 'A rapid back-and-forth movement.' },
                                { term: 'Sound Wave', definition: 'A pattern of disturbance caused by the movement of energy traveling through a medium.' },
                                { term: 'Medium', definition: 'The matter (solid, liquid, or gas) through which a wave travels.' },
                                { term: 'Vacuum', definition: 'A space that is completely empty of bounds—no air, no gas, nothing.' }
                            ]
                        },
                        {
                            title: `📜 Historical Discovery: The First Phonograph`,
                            content: `<div style="line-height:1.7;">How did we first record sound waves?</div><div class="journal-box" style="border-left-color:#667eea; background:rgba(102,126,234,0.1);">In 1877, Thomas Edison invented the phonograph. He shouted into a horn, and the sound wave vibrations caused a needle to carve a physical wave pattern into a spinning cylinder of tin foil!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Speaker Cone`,
                            content: `<div style="line-height:1.7;">If you look at the black cone of a giant speaker at a concert, you can see it physically jumping in and out.</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What is it doing to the air?</div><div class="reveal-content">It is literally "punching" the air molecules! The speaker pushes out, creating a high-pressure wave of air, which bumps into the next air molecules, all the way to your eardrum!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Sound in Space`,
                            content: `<div class="what-if-box"><strong>What If:</strong> A giant asteroid crashes into the moon. Would an astronaut in a nearby spaceship hear the explosion?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 Does sound travel in space?</div><div class="reveal-content">NO! Space is a <strong>Vacuum</strong>. There are no air molecules to bump into each other. The explosion happens in total, eerie silence! Sound REQUIRES a medium.</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: The Siren Limit`,
                            content: `<div style="line-height:1.7;">For our emergency signaling system, a siren has limits.</div><div class="journal-box" style="border-left-color:#00bcd4; background:rgba(0,188,212,0.15);">As sound waves travel through the air, they hit objects (trees, buildings, wind). Every time they hit something, they lose a tiny bit of energy. Eventually, the wave dies out, meaning the siren can only be heard a few miles away.</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Sound Medium Race`,
                            content: `<div style="margin-bottom:15px;"><strong>Test the Medium:</strong> Choose Air, Water, or Steel, and fire the sound wave to see who wins!</div><div id="threejs-container-l42" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l42\')">🛠️ Debug</button><button class="btn-drop" onclick="startSoundRace(\\\'air\\\')">💨 Air Wave</button><button class="btn-drop" onclick="startSoundRace(\\\'water\\\')">💧 Water Wave</button><button class="btn-drop" onclick="startSoundRace(\\\'steel\\\')">🛡️ Steel Wave</button><button class="btn-reset" onclick="resetSoundRace()">🔄 Reset</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. What are the three states of matter that sound can travel through (hint: solid...)?<br><br>2. Why does sound travel faster as a wave through a solid piece of metal than through the air?</div>`
                        }
                    ]
                }
"""

def inject():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()

    match = re.search(r'(\'lesson38\':\s*\{.*?\n\s{16}\}\n\s{12}\})', html, re.DOTALL)
    if not match:
        print("Could not find lesson38 block!")
        return

    end_idx = match.end()
    
    if 'lesson39' not in html[end_idx:end_idx+500]:
        new_html = html[:end_idx] + ",\n" + get_lessons_js() + html[end_idx:]
        with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print("Successfully injected lessons 39-42.")
    else:
        print("Injection point may already have data.")

if __name__ == "__main__":
    inject()
