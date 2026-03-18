import re

def get_lessons_js():
    return """
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
                                { term: 'Technology Evolution', definition: 'The process of improving tools and systems over time to solve problems more effectively.' },
                                { term: 'Reliability', definition: 'How consistently a system works without failing or losing the message.' },
                                { term: 'Global Network', definition: 'A system of computers, cables, and satellites connecting the entire planet.' }
                            ]
                        },
                        {
                            title: `📜 Perspective: From Fire to Fiber Optics`,
                            content: `<div style="line-height:1.7;">Communication has always been about waves.</div><div class="journal-box" style="border-left-color:#ff5722; background:rgba(255,87,34,0.1);">2,000 years ago, people lit fires on mountains to warn of invasion (Light Waves). Today, we shoot lasers through microscopic glass cables called <strong>Fiber Optics</strong> underneath the ocean to send the internet between continents (Also Light Waves)! The physics hasn\'t changed; the tools just got better!</div>`
                        },
                        {
                            title: `🔍 Discovery: The Submarine Cable`,
                            content: `<div style="line-height:1.7;">Most people think their cell phones use satellites to talk to the other side of the world.</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 Is the internet mostly floating in space?</div><div class="reveal-content">NO! 99% of international data is carried by physical wires lying on the muddy bottom of the ocean! Ships spend years constantly laying and repairing giant cables full of tiny glass threads. Your TikTok goes underwater!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: A Complete Blackout`,
                            content: `<div class="what-if-box"><strong>What If:</strong> A massive solar flare knocks out all electricity and computers on Earth. You still need to communicate across town. What technology from the past would you revert to?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What doesn\'t plug in?</div><div class="reveal-content">To survive, you would instantly go back to basic physics: <strong>Sound Waves</strong> (like bells or horns), <strong>Light Waves</strong> (mirrors flashing sunlight), or <strong>Matter Carrier</strong> (sending a person with a written note)!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Redundancy`,
                            content: `<div style="line-height:1.7;">The best engineers don\'t just rely on one system!</div><div class="journal-box" style="border-left-color:#607d8b; background:rgba(96,125,139,0.15);">They design <strong>Redundancy</strong> (a backup plan). If the digital radio fails in an emergency, maybe the helicopter has a giant analog spotlight. A good system has layers of technology!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: Timeline Explorer`,
                            content: `<div style="margin-bottom:15px;"><strong>Explore the Tech:</strong> Spin the globe to different eras to see how humanity connected the world!</div><div id="threejs-container-l51" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l51\')">🛠️ Debug</button><button class="btn-debug" onclick="initSim(\'l51\')">🛠️ Debug</button><button class="btn-drop" onclick="setEra(1800)">1800s: The Carrier</button><button class="btn-drop" onclick="setEra(1900)">1900s: The Wire</button><button class="btn-drop" onclick="setEra(2000)">2000s: The Web</button></div>`
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
                            content: `<strong style="font-size:1.4rem;">🎯 TODAY\\'S GOAL: Prove your mastery of Waves, Codes, and Communication!</strong><div style="font-size:1.2rem; margin-top:20px;">You will rotate through <strong>3 high-speed stations</strong>. At each station, your team must complete the challenge to earn a Mission Patch!</div><div style="background:rgba(255,193,7,0.2);padding:15px;border-radius:10px;margin-top:20px;border-left:4px solid #ffc107;"><h3>🏆 The Ultimate Prize</h3>A perfect score unlocks the <strong>VR Expedition</strong>!</div>`
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
                            content: `<div style="margin-bottom:15px;"><strong>Choose Your Drill:</strong> Use the remaining time to practice the skill you feel weakest on!</div><div id="threejs-container-l52" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l52\')">🛠️ Debug</button><button class="btn-debug" onclick="initSim(\'l52\')">🛠️ Debug</button><button class="btn-drop" onclick="loadMode(\\\'waves\\\')">🌊 Waves</button><button class="btn-drop" onclick="loadMode(\\\'optics\\\')">🔍 Optics</button><button class="btn-drop" onclick="loadMode(\\\'binary\\\')">📻 Binary</button></div>`
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
                            content: `<div style="line-height:1.7;">For the long answer questions, don\'t just write a giant paragraph!</div><div class="journal-box" style="border-left-color:#2196f3; background:rgba(33,150,243,0.1);"><strong>Draw it out!</strong> If the question asks you how to bounce light over a wall, draw the flashlight, draw the mirrors, and draw straight arrows to show the light beam. A good diagram is worth an entire page of writing!</div>`
                        },
                        {
                            title: `🔍 Discovery: Double Checking`,
                            content: `<div style="line-height:1.7;">A careless mistake can cost you a perfect score!</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 When you finish, what is step 2?</div><div class="reveal-content">Reread every single question! Did it ask you for <em>two</em> examples, and you only gave <em>one</em>? Did it ask you to explain <em>why</em>, and you only gave the definition? Verify every detail.</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: I\'m Stuck`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You read a question and your mind goes completely blank?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 What is the protocol?</div><div class="reveal-content">Skip it immediately! Circle the number, move on, and let your brain work on it in the background while you answer the easy questions. Come back to it at the very end. Sometimes a later question will trigger your memory!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Focus`,
                            content: `<div style="line-height:1.7;">Focus your energy!</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.15);">If you feel overwhelmed, take a deep breath. You have practiced this hundreds of times. You built the waves, you decoded the binary, and you bounced the light. You know this!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Brain Break`,
                            content: `<div style="margin-bottom:15px;"><strong>Zone Out:</strong> Breathe deeply and watch the gentle sine wave below to clear your mind before the test begins.</div><div id="threejs-container-l53" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l53\')">🛠️ Debug</button><button class="btn-debug" onclick="initSim(\'l53\')">🛠️ Debug</button><button class="btn-slow" onclick="startZenWave()">🌊 Begin Zen Mode</button></div>`
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
                            content: `<div style="line-height:1.7;">How does the headset know where your hands are?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 Does it use magic?</div><div class="reveal-content">It uses invisible waves! The cameras on the headset shoot out invisible Infrared Light beams that bounce off your hands and the walls. The computer calculates the time it takes the light to bounce back to know exactly where you are in the room!</div></div>`
                        },
                        {
                            title: `🤔 What If Scenario: Stepping Out`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You get so excited trying to catch a virtual butterfly that you walk right into your teacher\'s desk?</div><div class="reveal-box" onclick="this.classList.toggle(\\\'revealed\\\')"><div class="reveal-hint">🔍 How does VR stop you?</div><div class="reveal-content">The "Guardian boundary" will appear as a glowing digital wall in your vision! If you see the blue grid pop up, STOP walking immediately, or you are going to bump into reality!</div></div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Enjoy the Silence`,
                            content: `<div style="line-height:1.7;">There is no test at the end of this!</div><div class="journal-box" style="border-left-color:#00bcd4; background:rgba(0,188,212,0.15);">Explore the ocean depths, bounce lasers in space, or build giant towers. Just remember to use the wrist straps!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: VR Pre-Flight Check`,
                            content: `<div style="margin-bottom:15px;"><strong>Wait for the Green Light!</strong> Watch the safety check below to make sure your space is clear before you plug in!</div><div id="threejs-container-l54" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initSim(\'l54\')">🛠️ Debug</button><button class="btn-debug" onclick="initSim(\'l54\')">🛠️ Debug</button><button class="btn-slow" onclick="runGuardianCheck()">✅ Run System Check</button></div>`
                        },
                        {
                            title: `🚪 Exit Ticket & Power Down`,
                            content: `<div class="journal-box"><strong>🧹 MINUTE 40: CLEANUP</strong><ol><li>Hold the power button for 3 seconds to shut off the headset.</li><li>Wipe the face cushion with a sanitation wipe.</li><li>Plug the headset back into the charging cart perfectly straight!</li></ol></div><div style="margin-top:20px;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;border:2px solid #28a745;"><strong>📓 EXIT TICKET:</strong> High five your partner on the way out!</div>`
                        }
                    ]
                }
"""

def inject():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()

    match = re.search(r'(\'lesson50\':\s*\{.*?\n\s{16}\}\n\s{12}\})', html, re.DOTALL)
    if not match:
        print("Could not find lesson50 block!")
        return

    end_idx = match.end()
    
    if 'lesson51' not in html[end_idx:end_idx+500]:
        new_html = html[:end_idx] + ",\n" + get_lessons_js() + html[end_idx:]
        with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print("Successfully injected lessons 51-54.")
    else:
        print("Injection point may already have data.")

if __name__ == "__main__":
    inject()
