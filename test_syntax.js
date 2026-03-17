const testObj = {
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
                                { term: `Wave`, definition: `A disturbance that transfers energy from one place to another.` },
                                { term: `Matter`, definition: `Any physical substance; the "stuff" that the wave travels through.` },
                                { term: `Energy Transfer`, definition: `The passing of energy from one object, molecule, or place to another.` }
                            ]
                        },
                        {
                            title: `📜 Historical Discovery: Measuring the Speed of Sound`,
                            content: `<div style="line-height:1.7;">In 1640, Pierre Gassendi correctly measured the speed of sound!</div><div class="journal-box" style="border-left-color:#667eea; background:rgba(102,126,234,0.1);">He used a cannon. By timing the flash of the gunpowder to the "boom" reaching his ears, he proved that wave energy (sound) travels at a specific speed through the air medium, much slower than light!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Rope Trick`,
                            content: `<div style="line-height:1.7;">If you tie one end of a rope to a doorknob and flick the other end, a ripple travels down the rope.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What is moving?</div><div class="reveal-content">The pieces of the rope just go up and down. The <strong>Energy</strong> from your flick is what travels from your hand to the doorknob. The rope itself didn't move closer to the door!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Zero Gravity`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An astronaut flicked a jump rope on the International Space Station, where they are floating in microgravity?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Would the wave still happen?</div><div class="reveal-content">Yes! The wave isn't dependent on gravity to move forward. The energy would still travel down the rope, making it wiggle through the air inside the station!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Invisible Messengers`,
                            content: `<div style="line-height:1.7;">Our mission is to create an <strong>Emergency Signaling System</strong>.</div><div class="journal-box" style="border-left-color:#ffbc00; background:rgba(255,193,7,0.15);">We can't run a letter across a mountain in 5 seconds. But a <strong>Wave</strong> (like sound or light) can carry our "SOS" message miles away almost instantly, without us needing to move a single inch!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Wave Physics Simulator`,
                            content: `<div style="margin-bottom:15px;"><strong>Observe Energy Transfer:</strong> Flick the rope and watch the energy travel! Notice how the red dot just bobs up and down.</div><div id="threejs-container-l39" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l39')">🛠️ Debug</button><button class="btn-drop" onclick="startRopeWave()">⚡ Send Wave</button><button class="btn-pause" onclick="pauseRopeWave()">⏸️ Pause</button><button class="btn-slow" onclick="slowMoRopeWave()">🐢 Slow Mo</button></div>`
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
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Identify the <strong>Peak</strong> and <strong>Trough</strong> of a wave.</li><li>Measure a wave\'s <strong>Amplitude</strong> (height).</li><li>Measure a wave\'s <strong>Wavelength</strong> (distance).</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#ff4444; background:rgba(244,67,54,0.15);"><strong>🛰️ Mission Context:</strong> Different emergencies need different signals. By changing the shape of our waves (amplitude and wavelength), we can encode different messages, like "Send Medical Help" vs "Evacuate."</div>`,
                            vocabulary: [
                                { term: `Peak (or Crest)`, definition: `The highest point of a wave.` },
                                { term: `Trough`, definition: `The lowest point of a wave.` },
                                { term: `Amplitude`, definition: `The height of a wave from its resting position to its peak.` },
                                { term: `Wavelength`, definition: `The distance between one peak and the next peak.` }
                            ]
                        },
                        {
                            title: `📜 Historical Discovery: The First Seismograph`,
                            content: `<div style="line-height:1.7;">How did ancient scientists measure wave amplitude?</div><div class="journal-box" style="border-left-color:#667eea; background:rgba(102,126,234,0.1);">In 132 AD, Zhang Heng invented the first seismoscope in China! It was a giant bronze jar with dragons. When an earthquake wave arrived, the amplitude of the wave would knock a bronze ball into a toad's mouth, proving a wave had passed!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Wave Graph`,
                            content: `<div style="line-height:1.7;">Scientists graph waves to understand them.</div><img src="images/Bundle3/lens_reflection_diagram_1768923963160.png" style="width:60%; display:block; margin:20px auto; border-radius:12px; border:2px solid #00bcd4;" alt="Wave Anatomy"><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How is Energy connected to Amplitude?</div><div class="reveal-content">The taller the wave (higher Amplitude), the more <strong>Energy</strong> is packed into it! It takes a lot more force to make a 20-foot wave than a 2-inch ripple.</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Earthquake Measurments`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An earthquake measuring station in California prints a graph with huge lines (high amplitude) drawn close together (short wavelength). What happened?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Interpret the Graph...</div><div class="reveal-content">The ground was shaking VIOLENTLY (high amplitude) and VERY FAST (short wavelength). That’s a massive, destructive earthquake!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Designing the Signal`,
                            content: `<div style="line-height:1.7;">For our Emergency Signaler, we will use Light or Sound waves.</div><div class="journal-box" style="border-left-color:#28a745; background:rgba(40,167,69,0.15);">If we use a flashlight (Light Wave), changing the <strong>Amplitude</strong> makes the light brighter or dimmer. If we use a siren (Sound Wave), changing the <strong>Wavelength</strong> makes the pitch higher or lower!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Seismograph Sandbox`,
                            content: `<div style="margin-bottom:15px;"><strong>Create Your Wave:</strong> Adjust the sliders to see how Amplitude and Wavelength change the wave!</div><div id="threejs-container-l40" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l40')">🛠️ Debug</button><button class="btn-drop" onclick="waveIncAmp()">⬆️ Amplitude</button><button class="btn-drop" onclick="waveDecAmp()">⬇️ Amplitude</button><button class="btn-slow" onclick="waveIncLength()">↔️ Wavelength</button><button class="btn-slow" onclick="waveDecLength()">>< Wavelength</button></div>`
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
                            content: `<div style="line-height:1.7;">Did you notice the slinky didn't move towards your partner?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What was moving?</div><div class="reveal-content">Only the <strong>kinetic energy</strong> from your arm traveled down the metal rings. The metal rings themselves just moved left and right. That’s a wave!</div></div>`
                        },
                        {
                            title: `🏁 Procedure: The Wavelength Test`,
                            content: `<strong>📋 PART 2: WAVELENGTH (15 min)</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">3</div><div><strong>Long Wavelength:</strong> Shake the slinky very SLOWLY side to side. The waves should look long and stretched out.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">4</div><div><strong>Short Wavelength (High Frequency):</strong> Shake the slinky side to side as FAST as you can! Notice how tight the wave peaks get.</div></div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Breaking the Slinky?`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You tried to make a wave with massive amplitude AND massive frequency (super wide and super fast)?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What happens to your arm?</div><div class="reveal-content">Your arm gets exhausted in two seconds! High Amplitude + Short Wavelength means the wave contains a HUGE amount of energy. Nature works the same way.</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Wave Data`,
                            content: `<div style="line-height:1.7;">If we are using waves to send an emergency code, we have options!</div><div class="journal-box" style="border-left-color:#00d4aa; background:rgba(0,212,170,0.15);">We could make a rule: 1 "High Amplitude" wave means "FIRE", 2 "High Amplitude" waves means "FLOOD." The wave is our messenger!</div>`
                        },
                        {
                            title: `🚪 Exit Ticket & Cleanup`,
                            content: `<div class="journal-box"><strong>🧹 MINUTE 40: CLEANUP</strong><ol><li>Coil your slinky carefully (don't tangle!).</li><li>Return meter sticks.</li><li>Sign off on your partner's lab sheet.</li></ol></div><div style="margin-top:20px;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;border:2px solid #28a745;"><strong>📓 EXIT TICKET:</strong> Which took more muscle energy to create: High Amplitude or Low Amplitude? Why?</div>`
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
                                { term: `Vibration`, definition: `A rapid back-and-forth movement.` },
                                { term: `Sound Wave`, definition: `A pattern of disturbance caused by the movement of energy traveling through a medium.` },
                                { term: `Medium`, definition: `The matter (solid, liquid, or gas) through which a wave travels.` },
                                { term: `Vacuum`, definition: `A space that is completely empty of bounds—no air, no gas, nothing.` }
                            ]
                        },
                        {
                            title: `📜 Historical Discovery: The First Phonograph`,
                            content: `<div style="line-height:1.7;">How did we first record sound waves?</div><div class="journal-box" style="border-left-color:#667eea; background:rgba(102,126,234,0.1);">In 1877, Thomas Edison invented the phonograph. He shouted into a horn, and the sound wave vibrations caused a needle to carve a physical wave pattern into a spinning cylinder of tin foil!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Speaker Cone`,
                            content: `<div style="line-height:1.7;">If you look at the black cone of a giant speaker at a concert, you can see it physically jumping in and out.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What is it doing to the air?</div><div class="reveal-content">It is literally "punching" the air molecules! The speaker pushes out, creating a high-pressure wave of air, which bumps into the next air molecules, all the way to your eardrum!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Sound in Space`,
                            content: `<div class="what-if-box"><strong>What If:</strong> A giant asteroid crashes into the moon. Would an astronaut in a nearby spaceship hear the explosion?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Does sound travel in space?</div><div class="reveal-content">NO! Space is a <strong>Vacuum</strong>. There are no air molecules to bump into each other. The explosion happens in total, eerie silence! Sound REQUIRES a medium.</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: The Siren Limit`,
                            content: `<div style="line-height:1.7;">For our emergency signaling system, a siren has limits.</div><div class="journal-box" style="border-left-color:#00bcd4; background:rgba(0,188,212,0.15);">As sound waves travel through the air, they hit objects (trees, buildings, wind). Every time they hit something, they lose a tiny bit of energy. Eventually, the wave dies out, meaning the siren can only be heard a few miles away.</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Sound Medium Race`,
                            content: `<div style="margin-bottom:15px;"><strong>Test the Medium:</strong> Choose Air, Water, or Steel, and fire the sound wave to see who wins!</div><div id="threejs-container-l42" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l42')">🛠️ Debug</button><button class="btn-drop" onclick="startSoundRace(\'air\')">💨 Air Wave</button><button class="btn-drop" onclick="startSoundRace(\'water\')">💧 Water Wave</button><button class="btn-drop" onclick="startSoundRace(\'steel\')">🛡️ Steel Wave</button><button class="btn-reset" onclick="resetSoundRace()">🔄 Reset</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. What are the three states of matter that sound can travel through (hint: solid...)?<br><br>2. Why does sound travel faster as a wave through a solid piece of metal than through the air?</div>`
                        }
                    ]
                },
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
                                { term: `Light Wave`, definition: `A type of wave that travels in straight lines and carries electromagnetic energy.` },
                                { term: `Electromagnetic Spectrum`, definition: `The entire range of light waves, including things we can\'t see like X-rays and radio waves.` },
                                { term: `Speed of Light`, definition: `The fastest speed in the universe: 186,282 miles per second!` }
                            ]
                        },
                        {
                            title: `📜 Perspective: Sunlight Journey`,
                            content: `<div style="line-height:1.7;">It takes 8 minutes for light to leave the Sun and reach Earth.</div><div class="journal-box" style="border-left-color:#f44336; background:rgba(244,67,54,0.1);">Unlike sound waves, which need air, water, or solid matter to travel through, light waves are perfectly happy traveling through the empty vacuum of space! This is why we can see the stars, but we can't hear them explode.</div>`
                        },
                        {
                            title: `🔍 Discovery: Blocking the Path`,
                            content: `<div style="line-height:1.7;">Light is incredibly fast, but it has a weakness.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What happens if you stand in front of a flashlight?</div><div class="reveal-content">A shadow appears! Because light ONLY travels in perfectly straight lines, it cannot bend around your body. Sound can bounce around corners easily, but light is rigid.</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: The Laser Maze`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You need to shine a flashlight into a room, but the door is down a long, winding hallway?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How can you get light to turn a corner?</div><div class="reveal-content">You have to force it to bounce! Since light travels in straight lines, you need to use <strong>MIRRORS</strong> to reflect the light cleanly around the corners.</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Line of Sight`,
                            content: `<div style="line-height:1.7;">For our emergency signaling system, a flashlight is powerful but tricky.</div><div class="journal-box" style="border-left-color:#9c27b0; background:rgba(156,39,176,0.15);">If we use light to send a code from mountain A to mountain B, we need a clear <strong>Line of Sight</strong>. If a tree or cloud blocks the beam, the message dies instantly.</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Light Beams & Shadows`,
                            content: `<div style="margin-bottom:15px;"><strong>Test the Light Beam:</strong> Drag the objects in front of the laser. Notice the sharp shadows formed because light cannot curve!</div><div id="threejs-container-l43" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l43')">🛠️ Debug</button><button class="btn-drop" onclick="spawnBlock()">🧱 Spawn Wall</button><button class="btn-drop" onclick="spawnGlass()">🥃 Spawn Glass</button><button class="btn-reset" onclick="resetLightScene()">🔄 Clear Room</button></div>`
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
                                { term: `Reflection`, definition: `When light hits a surface and bounces off back into our eyes.` },
                                { term: `Refraction`, definition: `When light passes through a new medium (like water or glass) and changes speed, causing it to bend.` },
                                { term: `Opaque`, definition: `Materials that block all light (wood, metal).` },
                                { term: `Transparent`, definition: `Materials that let light pass through perfectly (clear glass).` }
                            ]
                        },
                        {
                            title: `📜 Perspective: Why is an Apple Red?`,
                            content: `<div style="line-height:1.7;">White light from the sun actually contains every color of the rainbow.</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.1);">When white light hits an apple, the skin of the apple absorbs the blue, green, and yellow light. It <strong>Reflects</strong> only the red light back to your eyeball! We only see things because light bounces off them.</div>`
                        },
                        {
                            title: `🔍 Discovery: The Mirror Bounce`,
                            content: `<div style="line-height:1.7;">Most objects scatter light in every direction because they are microscopically bumpy.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Why does a mirror create a perfect image?</div><div class="reveal-content">A mirror is completely smooth. When light hits it, all the light rays bounce off at the exact same, perfect angle! It’s like throwing a bouncy ball against a perfectly flat wall vs a rocky cliff.</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: The Bending Spear`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An ancient fisherman is trying to spear a fish in a river. He aims perfectly straight at where he sees the fish, but he keeps missing. Why?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Hint: The water is tricking him!</div><div class="reveal-content"><strong>Refraction!</strong> As light from the fish leaves the water and hits the air, the light bends. The fish isn’t actually where he sees it. He needs to aim slightly lower to catch the fish!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Focus and Bounce`,
                            content: `<div style="line-height:1.7;">We can build tools to control our light signals.</div><div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.15);">A magnifying glass uses <strong>Refraction</strong> to bend light to a single, powerful point. A periscope uses <strong>Reflection</strong> to bounce the light signal over a wall!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Optics Bench`,
                            content: `<div style="margin-bottom:15px;"><strong>Bend & Bounce the Laser:</strong> Drag mirrors and glass blocks to hit the target!</div><div id="threejs-container-l44" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l44')">🛠️ Debug</button><button class="btn-drop" onclick="spawnMirror()">🪞 Add Mirror</button><button class="btn-slow" onclick="rotateMirror()">🔄 Rotate</button><button class="btn-drop" onclick="spawnPrism()">💎 Add Glass Prism</button></div>`
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
                            content: `<strong style="font-size:1.4rem;">🎯 YOUR GOAL: Engineer a system to bounce a light signal around an obstacle!</strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0;"><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #28a745;"><strong style="font-size:1.2rem;">✅ SUCCESS CRITERIA:</strong><br>1. The light beam hit the target target.<br>2. The light beam must wrap a 90-degree corner.<br>3. You must use exactly two mirrors.</div><div style="background:rgba(220,53,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #dc3545;"><strong style="font-size:1.2rem;">⚠️ SAFETY RULES:</strong><br>• NEVER shine the flashlight in a partner\'s eyes.<br>• Handle mirrors delicately by the edges.</div></div>`
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
                            content: `<div style="line-height:1.7;">Did you notice a pattern with how you had to twist the mirrors?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What is the rule of reflection?</div><div class="reveal-content">Angle in = Angle out! If you hit a mirror perfectly straight, it bounces straight back. If you hit it at a sharp 45-degree slant, it bounces off at a matching 45-degree slant!</div></div>`
                        },
                        {
                            title: `🏁 Procedure: The Periscope Principle`,
                            content: `<strong>📋 PART 2: THE PERISCOPE BUILD (15 min)</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">3</div><div><strong>The Setup:</strong> Have Partner A sit on the floor. Have Partner B stand and hold the target box near their face. Partner A must use the flashlight to hit the target.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">4</div><div><strong>The Climb:</strong> The light must bounce UP to a mirror, and then ACROSS. Adjust the angles carefully to solve the vertical challenge!</div></div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Foggy Air`,
                            content: `<div class="what-if-box"><strong>What If:</strong> Someone filled the classroom with super thick smoke or fog while you were doing this lab?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What happens to the light beam?</div><div class="reveal-content">The fog acts as a million tiny obstacles. The light starts bouncing (reflecting) off every tiny water droplet, scattering in all directions until the beam is completely scattered and lost. You wouldn't hit the target!</div></div>`
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
                                { term: `Information Transfer`, definition: `The process of moving data or a message from one person or place to another.` },
                                { term: `Code`, definition: `A system of rules to convert information (like a letter or word) into another form (like a beep or a flash).` },
                                { term: `Pattern`, definition: `A repeated, predictable design or sequence.` }
                            ]
                        },
                        {
                            title: `📜 Perspective: Talking Drums of Africa`,
                            content: `<div style="line-height:1.7;">Long before phones were invented, communities in West Africa could send complex news miles away in minutes.</div><div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.1);">They used "Talking Drums." Because their languages were tonal (pitch mattered), drummers could manipulate the pitch and rhythm of the drum to mimic spoken phrases. A pattern of high and low beats told neighboring villages exactly what was happening!</div>`
                        },
                        {
                            title: `🔍 Discovery: Baseball Signs`,
                            content: `<div style="line-height:1.7;">Look closely at a baseball coach in the dugout. They touch their ear, rub their chest, and tap their nose.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What is happening?</div><div class="reveal-content">They are transferring information! This is a visual <strong>Code</strong>. The batter knows that "nose tap" means "bunt the ball." The coach is communicating complex strategy to one player without the other team hearing it!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Stranded on an Island`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You are stranded on an island. You see a ship miles away. You have a pile of dry wood, green leaves, and fire.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How do you send information?</div><div class="reveal-content">A normal fire just means "someone is camping." If you put green leaves on the fire, the smoke turns thick and white. If you cover the fire with a wet blanket and release it in bursts, you create three equal puffs of smoke: A <strong>Pattern</strong> that universally means "SOS"!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Creating the Code`,
                            content: `<div style="line-height:1.7;">We have sound waves and light waves. Now we need the code!</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.15);">If we blast a siren for 1 second, pause, and blast again for 1 second... that is a pattern. Just like the talking drums, we must agree on what the pattern means before the emergency happens!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Code Breaker`,
                            content: `<div style="margin-bottom:15px;"><strong>Decode the Message:</strong> Watch the light flash. Use the codebook to decipher the secret word!</div><div id="threejs-container-l46" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l46')">🛠️ Debug</button><button class="btn-drop" onclick="playSecretFlash(\'easy\')">🟢 Easy Pattern</button><button class="btn-drop" onclick="playSecretFlash(\'hard\')">🔴 Hard Pattern</button><button class="btn-slow" onclick="showCodebook()">📖 View Codebook</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong><br><br>1. What is an example of a pattern or code you use every day without speaking? (Think about lights at an intersection, or sounds a microwave makes.)<br><br>2. Why are patterns better for sending information over long distances than simply yelling words?</div>`
                        }
                    ]
                },
'lesson47': {
                    title: `Morse Code & Signals`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Silent Tap`,
                            content: `<div class="journal-box"><strong>Close your eyes and listen to the teacher tap the desk.</strong><br><br>📓 <strong>Task:</strong> Your teacher tapped: (Short-Short-Short) ... (Long-Long-Long) ... (Short-Short-Short)<ol style="line-height:1.8; margin-top:10px;"><li>Did that sound like a random tapping, or did it sound intentionally planned?</li><li>What famous 3-letter emergency code does that pattern represent?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain how <strong>Morse Code</strong> uses patterns of dots and dashes to represent letters.</li><li>Understand how a <strong>Telegraph</strong> was used to send electricity as a code.</li><li>Identify Morse Code as a precursor to modern digital signaling.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#3f51b5; background:rgba(63,81,181,0.15);"><strong>🛰️ Mission Context:</strong> We don\'t need a magical device to send words over a wire or a flashlight. We just need to convert the English alphabet into a simple pattern of "On" and "Off" signals!</div>`,
                            vocabulary: [
                                { term: `Morse Code`, definition: `A method of sending text information as a series of on-off tones, clicks, or lights.` },
                                { term: `Dot (or Dit)`, definition: `A very short signal in Morse Code (1 unit of time).` },
                                { term: `Dash (or Dah)`, definition: `A long signal in Morse Code (3 units of time).` },
                                { term: `Telegraph`, definition: `An old machine used to transmit and receive Morse code messages over long electrical wires.` }
                            ]
                        },
                        {
                            title: `📜 Perspective: The First Text Message`,
                            content: `<div style="line-height:1.7;">In 1844, Samuel Morse stood in Washington D.C. and tapped a sequence of dots and dashes into a machine.</div><div class="journal-box" style="border-left-color:#795548; background:rgba(121,85,72,0.1);">Miles away in Baltimore, a machine clicked in response. It was the first time in human history that a message traveled faster than a horse could run! It revolutionized the world almost exactly like the internet did.</div>`
                        },
                        {
                            title: `🔍 Discovery: Translating the Alphabet`,
                            content: `<div style="line-height:1.7;">How do you turn 26 letters into just dots and dashes?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What is the code for the letter "E"?</div><div class="reveal-content">The letter "E" is the most common letter in English. So Samuel Morse made it easiest to tap: Just ONE single Dot (.)! The letter "Q" is rarely used, so it got a long, complicated code: Dash-Dash-Dot-Dash (--.-). Efficiency matters!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: The Sinking Ship`,
                            content: `<div class="what-if-box"><strong>What If:</strong> In 1912, the Titanic was sinking in the icy ocean. They had radios aboard, but they couldn't transmit voice. How did they call for help?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How did the rescue ships know?</div><div class="reveal-content">The Titanic’s radio operators frantically tapped out "CQD" and "SOS" in <strong>Morse Code</strong> using electrical radio waves continuously until the power died. Ships miles away heard the Beep-Beep-Beep patterns and rushed to help!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: The Universal Language`,
                            content: `<div style="line-height:1.7;">For our emergency signaling system, Morse Code is the perfect tool.</div><div class="journal-box" style="border-left-color:#009688; background:rgba(0,150,136,0.15);">We can send Morse Code by turning a flashlight on and off (light wave), blasting a siren (sound wave), or even just tapping a rock against a pipe! It is a universal code.</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Telegraph Machine`,
                            content: `<div style="margin-bottom:15px;"><strong>Transmit a Message:</strong> Use the telegraph key. A quick tap is a dot, a long hold is a dash. Try spelling your name using the chart!</div><div id="threejs-container-l47" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l47')">🛠️ Debug</button><button class="btn-drop" onmousedown="telegraphKeyOn()" onmouseup="telegraphKeyOff()">📻 TAP KEY</button><button class="btn-slow" onclick="playSOS()">🚨 Auto-Play SOS</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong><br><br>1. Write your initials in your journal, and write the Morse Code dots and dashes for them next to it.<br><br>2. Why do you think Samuel Morse made the letter "A" very short (.-) but the letter "Z" much longer (--..)?</div>`
                        }
                    ]
                },
                'lesson48': {
                    title: `Binary & Digital Information`,
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
                            content: `<div style="line-height:1.7;">How do you spell a word with just 0s and 1s?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How do computers spell "HI"?</div><div class="reveal-content">Every letter has an 8-digit binary code! The letter "H" is exactly <strong>01001000</strong>. The letter "I" is exactly <strong>01001001</strong>. So to text your friend "HI", your phone shoots an invisible radio wave holding: 0100100001001001!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: A Scratched DVD`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An old vinyl record gets scratched, the music sounds fuzzy and distorted. BUT if a digital DVD gets a tiny scratch, the movie might skip a split second, but the rest of the picture looks perfectly clear. Why?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Why is Digital better?</div><div class="reveal-content">A vinyl record is <strong>Analog</strong>: the needle reads a continuous wavy groove. If it’s damaged, the wave is ruined. A DVD is <strong>Digital</strong>: it is microscopic pits (0s) and flat spots (1s). The computer can often repair a missing 0 or 1 instantly! Digital is a much more reliable way to send information.</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Digital Emergency Transmissions`,
                            content: `<div style="line-height:1.7;">When a modern GPS rescue beacon is activated on a mountain...</div><div class="journal-box" style="border-left-color:#e91e63; background:rgba(233,30,99,0.15);">It does NOT send a voice pleading for help. It blasts a burst of radio waves into space containing billions of 1s and 0s (digital binary data). The satellite catches those 1s and 0s, and decodes them into the hiker’s exact latitude and longitude coordinates!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Binary Byte Builder`,
                            content: `<div style="margin-bottom:15px;"><strong>Flip the Switches:</strong> Try to match the 8-bit pattern on the screen to unlock the secret data! Remember, 0 is light OFF, 1 is light ON.</div><div id="threejs-container-l48" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l48')">🛠️ Debug</button><button class="btn-drop" onclick="randomizeBinaryTarget()">🔢 New Target</button><button class="btn-slow" onclick="checkBinaryCode()">✅ Submit</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong><br><br>1. What two numbers are used in Binary Code?<br><br>2. Why does a computer use binary? (Hint: Think about what is inside a computer processor).</div>`
                        }
                    ]
                },
                'lesson49': {
                    title: `LAB 3 — Design a Communication System`,
                    slides: [
                        {
                            title: `🔬 Lab Overview: Your Mission Today`,
                            content: `<strong style="font-size:1.4rem;">🎯 YOUR GOAL: Design, build, and test a device that can send a coded message across the room WITHOUT speaking!</strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0;"><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #28a745;"><strong style="font-size:1.2rem;">✅ SUCCESS CRITERIA:</strong><br>1. The Receiver must accurately decode a full 3-word message.<br>2. The Sender and Receiver must be 15 feet apart.<br>3. Zero vocal communication allowed.</div><div style="background:rgba(220,53,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #dc3545;"><strong style="font-size:1.2rem;">⚠️ THE CATCH:</strong><br>• You must use either Light (flashlight) OR Sound (tapping).<br>• You must invent your own code dictionary!</div></div>`
                        },
                        {
                            title: `🛠️ Supplies & Setup`,
                            content: `<div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;"><strong style="font-size:1.8rem;">📦 WHAT YOU NEED:</strong><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:15px;font-size:1.5rem;"><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Flashlight OR 1 Drum/Stick</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Blank Code Dictionary Sheet</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Pencils</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Lab Partner (Sender & Receiver)</div></div></div><div style="margin-top:20px;padding:15px;background:rgba(255,193,7,0.15);border-radius:10px;"><strong>📐 INTRUCTIONS:</strong><br>Do not use standard Morse Code. You must invent a simpler code for specific words (e.g. 2 flashes means "DANGER", 1 long flash means "FOOD").</div>`
                        },
                        {
                            title: `🏁 Procedure: Engineering the Code`,
                            content: `<strong>📋 PART 1: THE DICTIONARY (15 min)</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">1</div><div><strong>Brainstorm Words:</strong> Together with your partner, pick 10 emergency words your team might need to say (e.g. Water, Fire, Help, Yes, No, Move, Stop, Cave, Hill, Animal).</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">2</div><div><strong>Assign the Patterns:</strong> Assign a specific light flash pattern or sound pattern to each word. Write it down twice (one copy for the Sender, one for the Receiver).</div></div></div>`
                        },
                        {
                            title: `🔍 Discovery: The "Space" Between Words`,
                            content: `<div style="line-height:1.7;">If a flashlight blinks 6 times really fast...</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How does the receiver know if it was one 6-blink word, or two 3-blink words?</div><div class="reveal-content">Just like spaces between words on a page, your code NEEDS a specific pause (like counting 3 seconds of silence) to tell the receiver that the word has ended. Otherwise, it is just a garbled mess of data!</div></div>`
                        },
                        {
                            title: `🏁 Procedure: The Transmission Text`,
                            content: `<strong>📋 PART 2: THE TRANSMISSION (15 min)</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">3</div><div><strong>Separation:</strong> Sender goes to one side of the room. Receiver goes to the other side. DO NOT TALK. The teacher will hand the Sender a secret 3-word phrase from your dictionary.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">4</div><div><strong>Transmission:</strong> Send the message! The receiver must write down the translation. Then check with the teacher to see if it was 100% accurate!</div></div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Signal Interference`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You are trying to send a light code, but someone turns on the bright classroom lights? Or you are trying to send a sound code, but someone starts playing loud music?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What happens to your message?</div><div class="reveal-content">This is called <strong>Interference</strong> or <strong>Noise</strong>! The receiver’s eyes or ears get overwhelmed by the extra light or sound waves, and they can’t distinguish your pattern from the background noise. The message is lost!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Real World Integrity`,
                            content: `<div style="line-height:1.7;">In the real world, engineers face interference constantly.</div><div class="journal-box" style="border-left-color:#ff4444; background:rgba(244,67,54,0.15);">Static on a radio, static on a TV, or a dropped cell phone call are all examples of "Noise" overpowering your digital signal! Engineering is about making the signal strong enough to survive the journey.</div>`
                        },
                        {
                            title: `🚪 Exit Ticket & Cleanup`,
                            content: `<div class="journal-box"><strong>🧹 MINUTE 40: CLEANUP</strong><ol><li>Hand in your Code Dictionaries to the teacher.</li><li>Return all flashlights and drums.</li></ol></div><div style="margin-top:20px;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;border:2px solid #28a745;"><strong>📓 EXIT TICKET:</strong> Did your team successfully transmit the message? If yes, what made your code easy to read? If no, what went wrong?</div>`
                        }
                    ]
                },
                'lesson50': {
                    title: `Lenses, Cameras & Digital Devices`,
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
                                { term: `Digitize`, definition: `The process of converting a physical wave (like light or sound) into a digital computer file of 1s and 0s.` }
                            ]
                        },
                        {
                            title: `📜 Perspective: Anatomy of an Eyeball`,
                            content: `<div style="line-height:1.7;">Your eye is an organic camera.</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.1);">Light bounces off the world and enters your pupil (the dark hole). Right behind it is a squishy clear <strong>Lens</strong>. This lens bends the light waves so they crash perfectly against the back of your eyeball (the Retina). The retina turns that light into an electrical signal and zaps it to your brain!</div>`
                        },
                        {
                            title: `🔍 Discovery: Flipping Reality`,
                            content: `<div style="line-height:1.7;">Wait, how does a curved lens bend the light?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 If light criss-crosses in a lens, what happens to the picture?</div><div class="reveal-content">The image is turned completely UPSIDE DOWN! The lenses in your eyeballs project an upside-down movie onto the back of your eye. Your amazing brain automatically flips the image right-side-up, so you don't walk around seeing the world upside down!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Glasses and Contacts`,
                            content: `<div class="what-if-box"><strong>What If:</strong> Someone is "nearsighted," meaning their eyeball is shaped a little too long. The lens in their eye bends the light, but the light crosses <em>before</em> it hits the back of the eyeball. Everything far away looks blurry!</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How do glasses fix this?</div><div class="reveal-content">Glasses add a SECOND artificial lens in front of the eye. This extra lens pre-bends the light just perfectly, so that when it goes through the eye’s natural lens, it lands sharp and clear exactly on the back wall!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: The Smartphone Sensor`,
                            content: `<div style="line-height:1.7;">A smartphone camera works exactly like an eyeball.</div><div class="journal-box" style="border-left-color:#9c27b0; background:rgba(156,39,176,0.15);">It has a glass lens to focus the light. But instead of a retina, it has a digital microchip! The chip senses the light wave, turns it into millions of <strong>Binary 0s and 1s</strong>, and saves it as a JPEG photo on your phone screen!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Focus the Camera Lens`,
                            content: `<div style="margin-bottom:15px;"><strong>Adjust the Focal Length:</strong> Slide the lens back and forth. Can you get the criss-crossing light beams to perfectly focus right on the camera sensor?</div><div id="threejs-container-l50" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l50')">🛠️ Debug</button><input type="range" min="1" max="100" value="50" oninput="moveCameraLens(this.value)" style="width:70%; margin:20px;"></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong><br><br>1. What does the lens in your eye do to light waves?<br><br>2. How does a digital camera turn a light wave into a photograph that can be saved on a computer? (Hint: What does it turn the light into?)</div>`
                        }
                    ]
                },
'lesson51': {
                    title: `Communication Tech: Then & Now`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Time Traveler`,
                            content: `<div class="journal-box"><strong>Imagine you went back in time to the year 1800.</strong><br><br>📓 <strong>Task:</strong> You need to tell your friend in Europe "Happy Birthday!" from New York.<ol style="line-height:1.8; margin-top:10px;"><li>How long would it take for the message to reach them?</li><li>How does that same message travel today?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Trace the evolution of communication technology over time.</li><li>Compare the speed, distance, and reliability of different methods.</li><li>Recognize that modern tech is just an advanced application of the exact same wave physics.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#009688; background:rgba(0,150,136,0.15);"><strong>🛰️ Mission Context:</strong> To build the ultimate emergency signaling system, we must look at what engineers have built in the past. We can learn perfectly good engineering from a 100-year-old telegraph or a 2000-year-old fire beacon!</div>`,
                            vocabulary: [
                                { term: `Technology Evolution`, definition: `The process of improving tools and systems over time to solve problems more effectively.` },
                                { term: `Reliability`, definition: `How consistently a system works without failing or losing the message.` },
                                { term: `Global Network`, definition: `A system of computers, cables, and satellites connecting the entire planet.` }
                            ]
                        },
                        {
                            title: `📜 Perspective: From Fire to Fiber Optics`,
                            content: `<div style="line-height:1.7;">Communication has always been about waves.</div><div class="journal-box" style="border-left-color:#ff5722; background:rgba(255,87,34,0.1);">2,000 years ago, people lit fires on mountains to warn of invasion (Light Waves). Today, we shoot lasers through microscopic glass cables called <strong>Fiber Optics</strong> underneath the ocean to send the internet between continents (Also Light Waves)! The physics hasn't changed; the tools just got better!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Submarine Cable`,
                            content: `<div style="line-height:1.7;">Most people think their cell phones use satellites to talk to the other side of the world.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Is the internet mostly floating in space?</div><div class="reveal-content">NO! 99% of international data is carried by physical wires lying on the muddy bottom of the ocean! Ships spend years constantly laying and repairing giant cables full of tiny glass threads. Your TikTok goes underwater!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: A Complete Blackout`,
                            content: `<div class="what-if-box"><strong>What If:</strong> A massive solar flare knocks out all electricity and computers on Earth. You still need to communicate across town. What technology from the past would you revert to?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What doesn't plug in?</div><div class="reveal-content">To survive, you would instantly go back to basic physics: <strong>Sound Waves</strong> (like bells or horns), <strong>Light Waves</strong> (mirrors flashing sunlight), or <strong>Matter Carrier</strong> (sending a person with a written note)!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Redundancy`,
                            content: `<div style="line-height:1.7;">The best engineers don't just rely on one system!</div><div class="journal-box" style="border-left-color:#607d8b; background:rgba(96,125,139,0.15);">They design <strong>Redundancy</strong> (a backup plan). If the digital radio fails in an emergency, maybe the helicopter has a giant analog spotlight. A good system has layers of technology!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Timeline Explorer`,
                            content: `<div style="margin-bottom:15px;"><strong>Explore the Tech:</strong> Spin the globe to different eras to see how humanity connected the world!</div><div id="threejs-container-l51" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l51')">🛠️ Debug</button><button class="btn-drop" onclick="setEra(1800)">1800s: The Carrier</button><button class="btn-drop" onclick="setEra(1900)">1900s: The Wire</button><button class="btn-drop" onclick="setEra(2000)">2000s: The Web</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong> List three different ways humans have communicated over long distances in history. Next to each, state if it primarily relied on Sound Waves, Light Waves, or moving physical Matter.</div>`
                        }
                    ]
                },
                'lesson52': {
                    title: `Bundle 4 Review — The Wave Games`,
                    subtitle: `Station Rotations & Mini-Challenges`,
                    slides: [
                        {
                            title: `🏁 Welcome to The Wave Games!`,
                            content: `<strong style="font-size:1.4rem;">🎯 TODAY\'S GOAL: Prove your mastery of Waves, Codes, and Communication!</strong><div style="font-size:1.2rem; margin-top:20px;">You will rotate through <strong>3 high-speed stations</strong>. At each station, your team must complete the challenge to earn a Mission Patch!</div><div style="background:rgba(255,193,7,0.2);padding:15px;border-radius:10px;margin-top:20px;border-left:4px solid #ffc107;"><h3>🏆 The Ultimate Prize</h3>A perfect score unlocks the <strong>VR Expedition</strong>!</div>`
                        },
                        {
                            title: `🌊 Station 1: The Wavelength Master`,
                            content: `<div style="background:linear-gradient(135deg, rgba(33,150,243,0.2), rgba(0,188,212,0.2)); padding:20px; border-radius:15px; box-shadow:0 4px 15px rgba(0,0,0,0.1);"><h3>📜 Your Task:</h3><p style="font-size:1.2rem;">Using the digital simulator, the teacher will show you a wave. Your team has 60 seconds to perfectly match the <strong>Amplitude</strong> and <strong>Wavelength</strong> on your own device.</p><hr style="border-color:rgba(255,255,255,0.3);"><p><strong>Scoring:</strong> Complete 3 matches perfectly to earn the <span style="color:#00bcd4; font-weight:bold;">Tsunami Patch</span>!</p></div>`
                        },
                        {
                            title: `🔍 Station 2: The Optic Maze`,
                            content: `<div style="background:linear-gradient(135deg, rgba(233,30,99,0.2), rgba(156,39,176,0.2)); padding:20px; border-radius:15px; box-shadow:0 4px 15px rgba(0,0,0,0.1);"><h3>📜 Your Task:</h3><p style="font-size:1.2rem;">You are given 3 mirrors, 1 glass prism, and a wooden block. You must bend the laser beam from the Start Point to the Target without touching the red "Danger Zones".</p><hr style="border-color:rgba(255,255,255,0.3);"><p><strong>Scoring:</strong> A successful hit in under 3 minutes earns the <span style="color:#e91e63; font-weight:bold;">Periscope Patch</span>!</p></div>`
                        },
                        {
                            title: `📻 Station 3: The Decoding Expert`,
                            content: `<div style="background:linear-gradient(135deg, rgba(76,175,80,0.2), rgba(205,220,57,0.2)); padding:20px; border-radius:15px; box-shadow:0 4px 15px rgba(0,0,0,0.1);"><h3>📜 Your Task:</h3><p style="font-size:1.2rem;">Listen closely! The computer will play out an emergency message in Morse Code. Use your dictionary to write down the exact English characters.</p><hr style="border-color:rgba(255,255,255,0.3);"><p><strong>Scoring:</strong> An exact translation earns the <span style="color:#4caf50; font-weight:bold;">Binary Patch</span>!</p></div>`
                        },
                        {
                            title: `📝 The Final Exam Approach`,
                            content: `<div class="journal-box" style="font-size:1.2rem; line-height:1.6;">Once you have completed all rotations, return to your seat for the final independent review sheet.<br><br>The actual Bundle 4 test will not just ask "what is a wave". It will give you an imaginary scenario—like being trapped on a mountain—and ask you to invent a wave-based signaling system to save yourself. <strong>Think like an engineer!</strong></div>`
                        },
                        {
                            title: `🤔 Final Review: Open Q&A`,
                            content: `<div class="what-if-box" style="text-align:center;"><strong>Ask the Teacher!</strong><br><br>If there is <em>anything</em> confusing about how light bounces, how sound travels, or how binary code works... ask it right now before the test!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Free Practice`,
                            content: `<div style="margin-bottom:15px;"><strong>Choose Your Drill:</strong> Use the remaining time to practice the skill you feel weakest on!</div><div id="threejs-container-l52" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l52')">🛠️ Debug</button><button class="btn-drop" onclick="loadMode(\'waves\')">🌊 Waves</button><button class="btn-drop" onclick="loadMode(\'optics\')">🔍 Optics</button><button class="btn-drop" onclick="loadMode(\'binary\')">📻 Binary</button></div>`
                        },
                        {
                            title: `🚪 Dismissal & Setup`,
                            content: `<div class="journal-box" style="font-size:1.3rem; text-align:center; padding:30px;"><strong>REST UP!</strong><br><br>Tomorrow is the Bundle 4 Assessment.<br>May the waves be with you!</div>`
                        }
                    ]
                },
                'lesson53': {
                    title: `Bundle 4 Assessment`,
                    slides: [
                        {
                            title: `📝 It is Test Day!`,
                            content: `<div style="text-align:center; padding:40px;"><strong style="font-size:2rem; color:#f44336;">DO NOT OPEN YOUR TEST YET.</strong><br><br><span style="font-size:1.2rem; color:#aaa;">Make sure you have two sharpened pencils and a privacy folder. No calculators are needed today!</span></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 Assessment Goals:</strong><ol><li>Demonstrate understanding of Wave Amplitude and Wavelength.</li><li>Correctly draw the Reflection and Refraction of Light.</li><li>Explain how Patterns (like Morse Code) transfer information.</li><li>Pass the Emergency Scenario Engineering question.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#e91e63; background:rgba(233,30,99,0.15);"><strong>🛰️ Final Mission Test:</strong> You are ready. You know how to send energy across distances to save lives!</div>`,
                            vocabulary: []
                        },
                        {
                            title: `📜 Test Taking Strategy: The Diagram`,
                            content: `<div style="line-height:1.7;">For the long answer questions, don't just write a giant paragraph!</div><div class="journal-box" style="border-left-color:#2196f3; background:rgba(33,150,243,0.1);"><strong>Draw it out!</strong> If the question asks you how to bounce light over a wall, draw the flashlight, draw the mirrors, and draw straight arrows to show the light beam. A good diagram is worth an entire page of writing!</div>`
                        },
                        {
                            title: `🔍 Discovery: Double Checking`,
                            content: `<div style="line-height:1.7;">A careless mistake can cost you a perfect score!</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 When you finish, what is step 2?</div><div class="reveal-content">Reread every single question! Did it ask you for <em>two</em> examples, and you only gave <em>one</em>? Did it ask you to explain <em>why</em>, and you only gave the definition? Verify every detail.</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: I'm Stuck`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You read a question and your mind goes completely blank?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What is the protocol?</div><div class="reveal-content">Skip it immediately! Circle the number, move on, and let your brain work on it in the background while you answer the easy questions. Come back to it at the very end. Sometimes a later question will trigger your memory!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Focus`,
                            content: `<div style="line-height:1.7;">Focus your energy!</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.15);">If you feel overwhelmed, take a deep breath. You have practiced this hundreds of times. You built the waves, you decoded the binary, and you bounced the light. You know this!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Brain Break`,
                            content: `<div style="margin-bottom:15px;"><strong>Zone Out:</strong> Breathe deeply and watch the gentle sine wave below to clear your mind before the test begins.</div><div id="threejs-container-l53" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l53')">🛠️ Debug</button><button class="btn-slow" onclick="startZenWave()">🌊 Begin Zen Mode</button></div>`
                        },
                        {
                            title: `🚪 Begin the Assessment!`,
                            content: `<div style="text-align:center; padding:50px; border:4px solid #4CAF50; border-radius:15px; background:rgba(76,175,80,0.1);"><h1 style="color:#4CAF50; font-size:3rem; margin:0;">YOU MAY FLIP<br>YOUR PAPERS!</h1><p style="font-size:1.5rem; margin-top:20px;">You have 45 minutes.</p></div>`
                        }
                    ]
                },
                'lesson54': {
                    title: `🥽 VR Free Day — Wave Tech Explorer`,
                    slides: [
                        {
                            title: `🌅 Warm-up: VR Prep`,
                            content: `<div class="journal-box"><strong>Put all pencils and journals away!</strong><br><br>📓 <strong>Task:</strong> Clear your desk entirely. Put the headset strap loosely over your head, but DO NOT drop the goggles over your eyes until instructed!<ol style="line-height:1.8; margin-top:10px;"><li>Check your battery light (Is it green?)</li><li>Make sure you have enough arm room to your left and right.</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Experience wave interactions in a fully immersive 3D environment.</li><li>Have fun!</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#9c27b0; background:rgba(156,39,176,0.15);"><strong>🛰️ Mission Context:</strong> You successfully deployed the emergency signaling system. The world is safe! Your reward is pure exploration.</div>`,
                            vocabulary: []
                        },
                        {
                            title: `📜 Perspective: What is VR?`,
                            content: `<div style="line-height:1.7;">Have you ever thought about how Virtual Reality works?</div><div class="journal-box" style="border-left-color:#ffeb3b; background:rgba(255,235,59,0.1);">It is a masterpiece of wave physics! Two tiny digital screens are strapped to your face. They shoot <strong>Light Waves</strong> through a special curved <strong>Lens</strong> in the headset. That lens bends the light (Refraction) so precisely that your brain is tricked into thinking the 2D screen is actually a giant 3D world surrounding you!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Guardian System`,
                            content: `<div style="line-height:1.7;">How does the headset know where your hands are?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Does it use magic?</div><div class="reveal-content">It uses invisible waves! The cameras on the headset shoot out invisible Infrared Light beams that bounce off your hands and the walls. The computer calculates the time it takes the light to bounce back to know exactly where you are in the room!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Stepping Out`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You get so excited trying to catch a virtual butterfly that you walk right into your teacher's desk?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How does VR stop you?</div><div class="reveal-content">The "Guardian boundary" will appear as a glowing digital wall in your vision! If you see the blue grid pop up, STOP walking immediately, or you are going to bump into reality!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Enjoy the Silence`,
                            content: `<div style="line-height:1.7;">There is no test at the end of this!</div><div class="journal-box" style="border-left-color:#00bcd4; background:rgba(0,188,212,0.15);">Explore the ocean depths, bounce lasers in space, or build giant towers. Just remember to use the wrist straps!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: VR Pre-Flight Check`,
                            content: `<div style="margin-bottom:15px;"><strong>Wait for the Green Light!</strong> Watch the safety check below to make sure your space is clear before you plug in!</div><div id="threejs-container-l54" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim('l54')">🛠️ Debug</button><button class="btn-slow" onclick="runGuardianCheck()">✅ Run System Check</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket & Power Down`,
                            content: `<div class="journal-box"><strong>🧹 MINUTE 40: CLEANUP</strong><ol><li>Hold the power button for 3 seconds to shut off the headset.</li><li>Wipe the face cushion with a sanitation wipe.</li><li>Plug the headset back into the charging cart perfectly straight!</li></ol></div><div style="margin-top:20px;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;border:2px solid #28a745;"><strong>📓 EXIT TICKET:</strong> High five your partner on the way out!</div>`
                        }
                    ]
                }
};
