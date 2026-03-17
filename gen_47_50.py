import re

def get_lessons_js():
    return """
                'lesson47': {
                    title: `Morse Code & Signals`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Silent Tap`,
                            content: `<div class="journal-box"><strong>Close your eyes and listen to the teacher tap the desk.</strong><br><br>📓 <strong>Task:</strong> Your teacher tapped: (Short-Short-Short) ... (Long-Long-Long) ... (Short-Short-Short)<ol style="line-height:1.8; margin-top:10px;"><li>Did that sound like a random tapping, or did it sound intentionally planned?</li><li>What famous 3-letter emergency code does that pattern represent?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain how <strong>Morse Code</strong> uses patterns of dots and dashes to represent letters.</li><li>Understand how a <strong>Telegraph</strong> was used to send electricity as a code.</li><li>Identify Morse Code as a precursor to modern digital signaling.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#3f51b5; background:rgba(63,81,181,0.15);"><strong>🛰️ Mission Context:</strong> We don\\'t need a magical device to send words over a wire or a flashlight. We just need to convert the English alphabet into a simple pattern of "On" and "Off" signals!</div>`,
                            vocabulary: [
                                { term: 'Morse Code', definition: 'A method of sending text information as a series of on-off tones, clicks, or lights.' },
                                { term: 'Dot (or Dit)', definition: 'A very short signal in Morse Code (1 unit of time).' },
                                { term: 'Dash (or Dah)', definition: 'A long signal in Morse Code (3 units of time).' },
                                { term: 'Telegraph', definition: 'An old machine used to transmit and receive Morse code messages over long electrical wires.' }
                            ]
                        },
                        {
                            title: `📜 Perspective: The First Text Message`,
                            content: `<div style="line-height:1.7;">In 1844, Samuel Morse stood in Washington D.C. and tapped a sequence of dots and dashes into a machine.</div><div class="journal-box" style="border-left-color:#795548; background:rgba(121,85,72,0.1);">Miles away in Baltimore, a machine clicked in response. It was the first time in human history that a message traveled faster than a horse could run! It revolutionized the world almost exactly like the internet did.</div>`
                        },
                        {
                            title: `🔍 Discovery: Translating the Alphabet`,
                            content: `<div style="line-height:1.7;">How do you turn 26 letters into just dots and dashes?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What is the code for the letter "E"?</div><div class="reveal-content">The letter "E" is the most common letter in English. So Samuel Morse made it easiest to tap: Just ONE single Dot (.)! The letter "Q" is rarely used, so it got a long, complicated code: Dash-Dash-Dot-Dash (--.-). Efficiency matters!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: The Sinking Ship`,
                            content: `<div class="what-if-box"><strong>What If:</strong> In 1912, the Titanic was sinking in the icy ocean. They had radios aboard, but they couldn\'t transmit voice. How did they call for help?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 How did the rescue ships know?</div><div class="reveal-content">The Titanic’s radio operators frantically tapped out "CQD" and "SOS" in <strong>Morse Code</strong> using electrical radio waves continuously until the power died. Ships miles away heard the Beep-Beep-Beep patterns and rushed to help!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: The Universal Language`,
                            content: `<div style="line-height:1.7;">For our emergency signaling system, Morse Code is the perfect tool.</div><div class="journal-box" style="border-left-color:#009688; background:rgba(0,150,136,0.15);">We can send Morse Code by turning a flashlight on and off (light wave), blasting a siren (sound wave), or even just tapping a rock against a pipe! It is a universal code.</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Telegraph Machine`,
                            content: `<div style="margin-bottom:15px;"><strong>Transmit a Message:</strong> Use the telegraph key. A quick tap is a dot, a long hold is a dash. Try spelling your name using the chart!</div><div id="threejs-container-l47" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l47\')">🛠️ Debug</button><button class="btn-drop" onmousedown="telegraphKeyOn()" onmouseup="telegraphKeyOff()">📻 TAP KEY</button><button class="btn-slow" onclick="playSOS()">🚨 Auto-Play SOS</button></div>`
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
                                { term: 'Binary Code', definition: 'A coding system using the binary digits 0 and 1 to represent a letter, digit, or other character in a computer.' },
                                { term: 'Bit', definition: 'The smallest unit of data in a computer (a single 0 or 1).' },
                                { term: 'Digital Signal', definition: 'A signal that is expressed as a series of the digits 0 and 1.' },
                                { term: 'Analog Signal', definition: 'A continuous signal that has infinite possibilities (like a smooth wave).' }
                            ]
                        },
                        {
                            title: `📜 Perspective: 0 is Off, 1 is On`,
                            content: `<div style="line-height:1.7;">A computer is just a box filled with billions of microscopic switches.</div><div class="journal-box" style="border-left-color:#607d8b; background:rgba(96,125,139,0.1);">It doesn\'t understand English, or math, or pictures. All it understands is "Switch is OFF" (which we write as a 0) or "Switch is ON" (which we write as a 1). By combining millions of 0s and 1s, the computer can play a video game or send an email!</div>`
                        },
                        {
                            title: `🔍 Discovery: Translating Binary`,
                            content: `<div style="line-height:1.7;">How do you spell a word with just 0s and 1s?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 How do computers spell "HI"?</div><div class="reveal-content">Every letter has an 8-digit binary code! The letter "H" is exactly <strong>01001000</strong>. The letter "I" is exactly <strong>01001001</strong>. So to text your friend "HI", your phone shoots an invisible radio wave holding: 0100100001001001!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: A Scratched DVD`,
                            content: `<div class="what-if-box"><strong>What If:</strong> An old vinyl record gets scratched, the music sounds fuzzy and distorted. BUT if a digital DVD gets a tiny scratch, the movie might skip a split second, but the rest of the picture looks perfectly clear. Why?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 Why is Digital better?</div><div class="reveal-content">A vinyl record is <strong>Analog</strong>: the needle reads a continuous wavy groove. If it’s damaged, the wave is ruined. A DVD is <strong>Digital</strong>: it is microscopic pits (0s) and flat spots (1s). The computer can often repair a missing 0 or 1 instantly! Digital is a much more reliable way to send information.</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Digital Emergency Transmissions`,
                            content: `<div style="line-height:1.7;">When a modern GPS rescue beacon is activated on a mountain...</div><div class="journal-box" style="border-left-color:#e91e63; background:rgba(233,30,99,0.15);">It does NOT send a voice pleading for help. It blasts a burst of radio waves into space containing billions of 1s and 0s (digital binary data). The satellite catches those 1s and 0s, and decodes them into the hiker’s exact latitude and longitude coordinates!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Binary Byte Builder`,
                            content: `<div style="margin-bottom:15px;"><strong>Flip the Switches:</strong> Try to match the 8-bit pattern on the screen to unlock the secret data! Remember, 0 is light OFF, 1 is light ON.</div><div id="threejs-container-l48" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l48\')">🛠️ Debug</button><button class="btn-drop" onclick="randomizeBinaryTarget()">🔢 New Target</button><button class="btn-slow" onclick="checkBinaryCode()">✅ Submit</button></div>`
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
                            content: `<div style="line-height:1.7;">If a flashlight blinks 6 times really fast...</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 How does the receiver know if it was one 6-blink word, or two 3-blink words?</div><div class="reveal-content">Just like spaces between words on a page, your code NEEDS a specific pause (like counting 3 seconds of silence) to tell the receiver that the word has ended. Otherwise, it is just a garbled mess of data!</div></div>`
                        },
                        {
                            title: `🏁 Procedure: The Transmission Text`,
                            content: `<strong>📋 PART 2: THE TRANSMISSION (15 min)</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">3</div><div><strong>Separation:</strong> Sender goes to one side of the room. Receiver goes to the other side. DO NOT TALK. The teacher will hand the Sender a secret 3-word phrase from your dictionary.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">4</div><div><strong>Transmission:</strong> Send the message! The receiver must write down the translation. Then check with the teacher to see if it was 100% accurate!</div></div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Signal Interference`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You are trying to send a light code, but someone turns on the bright classroom lights? Or you are trying to send a sound code, but someone starts playing loud music?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What happens to your message?</div><div class="reveal-content">This is called <strong>Interference</strong> or <strong>Noise</strong>! The receiver’s eyes or ears get overwhelmed by the extra light or sound waves, and they can’t distinguish your pattern from the background noise. The message is lost!</div></div>`
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
                                { term: 'Lens', definition: 'A curved piece of glass or plastic that refracts (bends) light to a specific focal point.' },
                                { term: 'Retina / Image Sensor', definition: 'The surface that catches the light image (in your eye, or in a digital camera).' },
                                { term: 'Digitize', definition: 'The process of converting a physical wave (like light or sound) into a digital computer file of 1s and 0s.' }
                            ]
                        },
                        {
                            title: `📜 Perspective: Anatomy of an Eyeball`,
                            content: `<div style="line-height:1.7;">Your eye is an organic camera.</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.1);">Light bounces off the world and enters your pupil (the dark hole). Right behind it is a squishy clear <strong>Lens</strong>. This lens bends the light waves so they crash perfectly against the back of your eyeball (the Retina). The retina turns that light into an electrical signal and zaps it to your brain!</div>`
                        },
                        {
                            title: `🔍 Discovery: Flipping Reality`,
                            content: `<div style="line-height:1.7;">Wait, how does a curved lens bend the light?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 If light criss-crosses in a lens, what happens to the picture?</div><div class="reveal-content">The image is turned completely UPSIDE DOWN! The lenses in your eyeballs project an upside-down movie onto the back of your eye. Your amazing brain automatically flips the image right-side-up, so you don\'t walk around seeing the world upside down!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Glasses and Contacts`,
                            content: `<div class="what-if-box"><strong>What If:</strong> Someone is "nearsighted," meaning their eyeball is shaped a little too long. The lens in their eye bends the light, but the light crosses <em>before</em> it hits the back of the eyeball. Everything far away looks blurry!</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 How do glasses fix this?</div><div class="reveal-content">Glasses add a SECOND artificial lens in front of the eye. This extra lens pre-bends the light just perfectly, so that when it goes through the eye’s natural lens, it lands sharp and clear exactly on the back wall!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: The Smartphone Sensor`,
                            content: `<div style="line-height:1.7;">A smartphone camera works exactly like an eyeball.</div><div class="journal-box" style="border-left-color:#9c27b0; background:rgba(156,39,176,0.15);">It has a glass lens to focus the light. But instead of a retina, it has a digital microchip! The chip senses the light wave, turns it into millions of <strong>Binary 0s and 1s</strong>, and saves it as a JPEG photo on your phone screen!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Focus the Camera Lens`,
                            content: `<div style="margin-bottom:15px;"><strong>Adjust the Focal Length:</strong> Slide the lens back and forth. Can you get the criss-crossing light beams to perfectly focus right on the camera sensor?</div><div id="threejs-container-l50" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l50\')">🛠️ Debug</button><input type="range" min="1" max="100" value="50" oninput="moveCameraLens(this.value)" style="width:70%; margin:20px;"></div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong><br><br>1. What does the lens in your eye do to light waves?<br><br>2. How does a digital camera turn a light wave into a photograph that can be saved on a computer? (Hint: What does it turn the light into?)</div>`
                        }
                    ]
                }
"""

def inject():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()

    match = re.search(r'(\'lesson46\':\s*\{.*?\n\s{16}\}\n\s{12}\})', html, re.DOTALL)
    if not match:
        print("Could not find lesson46 block!")
        return

    end_idx = match.end()
    
    if 'lesson47' not in html[end_idx:end_idx+500]:
        new_html = html[:end_idx] + ",\n" + get_lessons_js() + html[end_idx:]
        with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print("Successfully injected lessons 47-50.")
    else:
        print("Injection point may already have data.")

if __name__ == "__main__":
    inject()
