const fs = require('fs');
let html = fs.readFileSync('interactive-teacher-portal.html', 'utf-8');

// Find lesson51 block boundaries
const startMarker = "'lesson51': {";
const startIdx = html.indexOf(startMarker);
if (startIdx === -1) { console.error("Could not find lesson51 start"); process.exit(1); }

// Find the next lesson block after lesson51
const endMarker = "'lesson52': {";
const endIdx = html.indexOf(endMarker);
if (endIdx === -1) { console.error("Could not find lesson52 start"); process.exit(1); }

console.log("lesson51 starts at char:", startIdx, "lesson52 starts at char:", endIdx);

const newLesson51 = `'lesson51': {
                    title: \`Communication Tech: Then & Now (Rigorous Edition)\`,
                    slides: [
                        {
                            title: \`🌅 Warm-up: The Time Traveler\`,
                            content: \`<div class="journal-box"><strong>Imagine you went back in time to the year 1800.</strong><br><br>📓 <strong>Task:</strong> You need to tell your friend in Europe "Happy Birthday!" from New York.<ol style="line-height:1.8; margin-top:10px;"><li>How long would it take for the message to reach them?</li><li>What kind of wave (light, sound, or none) carries your message?</li><li>How does that same message travel today? What wave carries it now?</li></ol></div>\`
                        },
                        {
                            title: \`🎯 Objectives & Vocabulary\`,
                            content: \`<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Trace the <strong>evolution</strong> of communication technology over 2,000 years.</li><li>Compare the <strong>speed, distance, and reliability</strong> of different methods.</li><li>Explain that modern tech is an advanced application of the <strong>exact same wave physics</strong>.</li><li>Identify what type of <strong>wave</strong> each technology relies on.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#009688; background:rgba(0,150,136,0.15);"><strong>🛰️ Mission Context:</strong> To build the ultimate emergency signaling system, we must study what engineers have built throughout history. A 100-year-old telegraph and a 2,000-year-old fire beacon teach us perfectly good wave engineering!</div>\`,
                            vocabulary: [
                                { term: \`Technology Evolution\`, definition: \`The process of improving tools and systems over time to solve problems more effectively.\` },
                                { term: \`Bandwidth\`, definition: \`How much information a communication system can send per second.\` },
                                { term: \`Reliability\`, definition: \`How consistently a system works without failing or losing the message.\` },
                                { term: \`Global Network\`, definition: \`A system of computers, cables, and satellites connecting the entire planet.\` }
                            ]
                        },
                        {
                            title: \`📜 Perspective: From Fire to Fiber Optics\`,
                            content: \`<div style="line-height:1.7;">Communication has always been about waves.</div><div class="journal-box" style="border-left-color:#ff5722; background:rgba(255,87,34,0.1);">2,000 years ago, people lit fires on mountains to warn of invasion (<strong>Light Waves</strong>). 200 years ago, the telegraph sent electrical pulses through copper wires (<strong>Electrical Waves</strong>). Today, we shoot lasers through microscopic glass cables called <strong>Fiber Optics</strong> underneath the ocean to send the internet between continents (<strong>Also Light Waves</strong>)! The physics has not changed in 2,000 years — the tools just got dramatically better!</div>\`
                        },
                        {
                            title: \`🔍 Discovery: The Submarine Cable\`,
                            content: \`<div style="line-height:1.7;">Most people think their cell phones use satellites to talk to the other side of the world.</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 Is the internet mostly floating in space?</div><div class="reveal-content">NO! <strong>99% of international data</strong> is carried by physical wires lying on the muddy bottom of the ocean! Giant ships spend years constantly laying and repairing cables full of tiny glass threads (fiber optics). When you watch a video from Japan, that data traveled <strong>underwater</strong> as pulses of light bouncing through glass!</div></div>\`
                        },
                        {
                            title: \`🧮 Math Moment: Speed of Communication\`,
                            content: \`<div class="journal-box" style="background:rgba(33,150,243,0.1); border-left-color:#2196f3;"><strong>Calculating Message Speed:</strong><br><br>In 1800, a letter from New York to London traveled by sailing ship at about <strong>10 mph</strong>. The distance is about <strong>3,500 miles</strong>.<br><br>How long did the letter take?<br>3,500 miles ÷ 10 mph = <strong>350 hours = about 15 days!</strong><br><br>Today, a text message travels through fiber optic cables at the speed of light: <strong>186,000 miles per second</strong>.<br>3,500 miles ÷ 186,000 mps = <strong>0.019 seconds!</strong><br><br>That is <strong>68 MILLION times faster</strong> than a sailing ship!</div>\`
                        },
                        {
                            title: \`📈 Analysis: Communication Timeline\`,
                            content: \`<div style="margin-bottom:15px; font-weight:bold;">Compare the technologies:</div><div style="display:flex; justify-content:center; gap:15px; flex-wrap:wrap;"><div style="text-align:center; flex:1; min-width:140px;"><div style="background:rgba(255,87,34,0.15); padding:15px; border-radius:10px; border:2px solid #ff5722;"><strong style="font-size:1.2em; color:#ff5722;">Ancient</strong><br><br>🔥 Fire Beacons<br>Wave: Light<br>Speed: Instant (line-of-sight)<br>Range: ~20 miles<br>Data: 1 bit (yes/no)</div></div><div style="text-align:center; flex:1; min-width:140px;"><div style="background:rgba(255,152,0,0.15); padding:15px; border-radius:10px; border:2px solid #ff9800;"><strong style="font-size:1.2em; color:#ff9800;">1840s</strong><br><br>⚡ Telegraph<br>Wave: Electrical<br>Speed: ~Instant<br>Range: ~1,000 miles (wire)<br>Data: Letters (Morse)</div></div><div style="text-align:center; flex:1; min-width:140px;"><div style="background:rgba(0,150,136,0.15); padding:15px; border-radius:10px; border:2px solid #009688;"><strong style="font-size:1.2em; color:#009688;">2020s</strong><br><br>💡 Fiber Optics<br>Wave: Light (laser)<br>Speed: 186,000 mi/s<br>Range: Global<br>Data: Billions of bits/s</div></div></div>\`
                        },
                        {
                            title: \`🤔 What If Scenario: A Complete Blackout\`,
                            content: \`<div class="what-if-box"><strong>What If:</strong> A massive solar flare knocks out all electricity and computers on Earth. You still need to communicate across town. What technology from the past would you revert to?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 What technology does not need to be plugged in?</div><div class="reveal-content">To survive, you would instantly go back to basic physics: <strong>Sound Waves</strong> (bells, horns, drums — they need no electricity), <strong>Light Waves</strong> (mirrors flashing sunlight — Heliograph), or <strong>Matter Carrier</strong> (sending a person running with a written note — the oldest method of all)!</div></div>\`
                        },
                        {
                            title: \`🛠️ Engineering Challenge: The Relay Network\`,
                            content: \`<div style="line-height:1.7;">Fire beacons could only travel about 20 miles (line-of-sight to the next hilltop). How did messages cross entire countries?</div><div style="background:rgba(255,255,255,0.1); padding:15px; border-radius:10px; margin:15px 0;"><strong>The Relay Solution!</strong><br>Engineers built chains of towers on hilltops. Each tower could see the next one. When the first tower lit its fire, the second tower saw it and lit their fire, then the third, and so on! The message "hopped" across the country at the speed of light — limited only by how fast the watchman could light the next fire.<br><br>This is the exact same concept modern cell towers use! Your text message "hops" from tower to tower across the country!</div>\`
                        },
                        {
                            title: \`🦇 Case Study: Voyager's Golden Record\`,
                            content: \`<div style="line-height:1.7;">In 1977, NASA launched the Voyager 1 spacecraft.</div><div class="journal-box" style="border-left-color:#673ab7; background:rgba(103,58,183,0.1);">Voyager carries a golden record — an actual phonograph disk — containing sounds and images from Earth. It was designed so that if aliens find it, they can play it and learn about humanity. But here is the problem: Voyager is now <strong>15 billion miles away</strong>. It sends data back to Earth using radio waves (a type of light wave), and even at the speed of light, that signal takes <strong>22 hours</strong> to reach us! And the signal is incredibly weak — NASA uses a 230-foot antenna dish just to hear it.</div>\`
                        },
                        {
                            title: \`🛰️ Mission Connection: Redundancy\`,
                            content: \`<div style="line-height:1.7;">The best engineers never rely on just one system!</div><div class="journal-box" style="border-left-color:#607d8b; background:rgba(96,125,139,0.15);">They design <strong>Redundancy</strong> — backup communication layers. A Navy ship has a satellite radio (light waves through space), a standard radio (radio waves through air), signal flags (visible light), and a foghorn (sound waves). If one system fails, another takes over. This engineering principle of multiple backup layers has saved countless lives!</div>\`
                        },
                        {
                            title: \`🔬 STEM Interactive: Communication Wave Sim\`,
                            content: \`<div style="margin-bottom:15px;"><strong>Watch the Wave:</strong> See how a signal pulse travels through different communication mediums — air, copper wire, and fiber optic glass!</div><div id="threejs-container-l51" style="width:100%; height:380px; background:rgba(0,0,0,0.8); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div id="l51-hud" style="text-align:center; font-family:sans-serif; font-weight:bold; height:30px; color:#009688; margin-bottom:10px; font-size:1.5em; letter-spacing:1px; text-transform:uppercase;">Medium: AIR</div><div class="energy-controls"><button class="btn-debug" onclick="window.L51 && window.L51.init()">🛠️ Initialize Sim</button><button class="btn-drop" onclick="window.L51 && window.L51.setMedium('air')">🌬️ Air (Sound)</button><button class="btn-drop" onclick="window.L51 && window.L51.setMedium('copper')">⚡ Copper Wire</button><button class="btn-drop" onclick="window.L51 && window.L51.setMedium('fiber')">💡 Fiber Optic</button></div>\`
                        },
                        {
                            title: \`📝 Concept Check: Communication\`,
                            content: \`<div class="journal-box">True or False?<br><br>1. Fire beacons and fiber optic cables both use light waves to send information.<br>2. Most international internet data travels through satellites in space.<br>3. The telegraph was the first technology to send messages faster than a human could carry them.</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">Check your communication knowledge...</div><div class="reveal-content">1. <strong>TRUE!</strong> Both are light-based, just 2,000 years apart in engineering!<br>2. <strong>FALSE!</strong> 99% travels through underwater fiber optic cables.<br>3. <strong>TRUE!</strong> Before the telegraph (1844), the fastest message was a person on a fast horse.</div></div>\`
                        },
                        {
                            title: \`🗣️ Discussion: What Comes Next?\`,
                            content: \`<div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.1);"><strong>Class Discussion:</strong><br><br>We went from fire beacons to fiber optics in 2,000 years. In the next 50 years, what do you think will be the next big leap in communication technology?<br><br><em>(Hint: Think about brain-computer interfaces, quantum communication, or communication through space to Mars colonies...)</em></div>\`
                        },
                        {
                            title: \`🚪 Exit Ticket\`,
                            content: \`<div class="journal-box"><strong>Journal Task:</strong><br><br>1. List three different communication technologies from three different time periods. For each one, state: What type of wave does it use? How far can it send a message?<br><br>2. Why is "redundancy" important in emergency communication systems?</div>\`
                        }
                    ]
                },
                `;

// Replace: everything from lesson51 start to lesson52 start
const before = html.substring(0, startIdx);
const after = html.substring(endIdx);
const newHtml = before + newLesson51 + after;

fs.writeFileSync('interactive-teacher-portal.html', newHtml);
console.log("SUCCESS: Lesson 51 replaced with rich version (" + newLesson51.length + " chars)");
