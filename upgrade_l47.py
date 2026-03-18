import codecs
import re

def upgrade():
    with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
        html = f.read()

    # 1. Update window.flashMorseWord to use l47-bulb instead of l46-bulb
    if "document.getElementById('l46-bulb')" in html:
        html = html.replace("document.getElementById('l46-bulb')", "document.getElementById('l47-bulb')")
        print("Updated flashMorseWord to use l47-bulb")
    
    # 2. Inject L46 Signal Matcher JS
    signal_matcher_js = """
// --- L46 Signal Matcher Logic ---
window.l46Pattern = [];
window.l46UserInput = [];
window.l46IsPlaying = false;

window.startL46Pattern = async function() {
    if (window.l46IsPlaying) return;
    window.l46IsPlaying = true;
    window.l46UserInput = [];
    var status = document.getElementById('l46-matcher-status');
    if (status) status.innerHTML = 'Watch closely... 👀';
    
    window.l46Pattern = [];
    for(let i=0; i<4; i++) {
        window.l46Pattern.push(Math.random() > 0.5 ? 'long' : 'short');
    }
    
    var bulb = document.getElementById('l46-matcher-bulb');
    await new Promise(r => setTimeout(r, 1000));
    
    for(let i=0; i<window.l46Pattern.length; i++) {
        if (!bulb) break;
        bulb.style.background = '#00e5ff';
        bulb.style.boxShadow = '0 0 40px #00e5ff, inset 0 0 20px #fff';
        
        let duration = window.l46Pattern[i] === 'long' ? 600 : 200;
        await new Promise(r => setTimeout(r, duration));
        
        bulb.style.background = '#333';
        bulb.style.boxShadow = 'inset 0 0 20px #000';
        await new Promise(r => setTimeout(r, 300));
    }
    
    if (status) status.innerHTML = 'Your turn! Repeat the pattern.';
    window.l46IsPlaying = false;
};

window.inputL46Pattern = function(type) {
    if (window.l46IsPlaying || window.l46Pattern.length === 0) return;
    
    window.l46UserInput.push(type);
    
    var bulb = document.getElementById('l46-matcher-bulb');
    if (bulb) {
        bulb.style.background = '#00e5ff';
        bulb.style.boxShadow = '0 0 40px #00e5ff, inset 0 0 20px #fff';
        setTimeout(() => {
            bulb.style.background = '#333';
            bulb.style.boxShadow = 'inset 0 0 20px #000';
        }, type === 'long' ? 400 : 150);
    }
    
    var status = document.getElementById('l46-matcher-status');
    let currentIndex = window.l46UserInput.length - 1;
    
    if (window.l46UserInput[currentIndex] !== window.l46Pattern[currentIndex]) {
        if (status) status.innerHTML = '<span style="color:#ff4444;">❌ Incorrect pattern. Try again!</span>';
        window.l46Pattern = [];
    } else if (window.l46UserInput.length === window.l46Pattern.length) {
        if (status) status.innerHTML = '<span style="color:#4caf50;">✅ Perfect match! Access Granted.</span>';
        window.l46Pattern = [];
    }
};
// --------------------------------
"""
    if "window.l46Pattern =" not in html:
        # insert before window.flashMorseWord
        html = html.replace("window.flashMorseWord = async function", signal_matcher_js + "\nwindow.flashMorseWord = async function")
        print("Injected L46 Signal Matcher JS")

    # 3. Replace L46 Interactive HTML inside the lesson46 object
    l46_old_interactive_slide = r"title: `🔬 STEM Interactive: The Code Breaker`.*?content: `.*?`\n                        \}"
    
    l46_new_interactive_slide = """title: `🔬 STEM Interactive: The Signal Matcher`,
                            content: `<div style="text-align:center; font-size:1.2em; font-weight:bold; margin-bottom:15px;">Can you repeat the exact light sequence?</div><div style="text-align:center; margin:30px 0;"><div id="l46-matcher-bulb" style="width:120px; height:120px; border-radius:50%; background:#333; margin:0 auto; box-shadow:inset 0 0 20px #000; transition:all 0.1s;"></div><div id="l46-matcher-status" style="margin-top:20px; font-size:1.4em; font-weight:bold; height:30px; color:#aaa;">Click Play Pattern to start.</div></div><div class="energy-controls" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()" onclick="event.stopPropagation()"><button class="btn-debug" onclick="window.startL46Pattern()">▶️ Play Pattern</button><button class="btn-drop" style="background:#e91e63;" onclick="window.inputL46Pattern('short')">⚫ Short Flash</button><button class="btn-slow" style="background:#4caf50;" onclick="window.inputL46Pattern('long')">▬ Long Flash</button></div>`
                        }"""
    
    html, count = re.subn(l46_old_interactive_slide, l46_new_interactive_slide, html, flags=re.DOTALL)
    if count > 0:
        print("Updated L46 Interactive HTML")
    else:
        print("Warning: Could not find L46 interactive slide to replace.")

    # 4. Replace Lesson 47 entirely
    l47_old_start = "'lesson47': {"
    l47_old_end = "'lesson48': {"
    
    if l47_old_start in html and l47_old_end in html:
        l47_pattern = r"'lesson47': \{.*?(?='lesson48': \{)"
        
        l47_new_content = """'lesson47': {
                    title: `Morse Code & Emergency Signals (Rigorous Edition)`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Silent Tap`,
                            content: `<div class="journal-box"><strong>Close your eyes and listen to the teacher tap the desk.</strong><br><br>📓 <strong>Task:</strong> Your teacher tapped: (Short-Short-Short) ... (Long-Long-Long) ... (Short-Short-Short)<ol style="line-height:1.8; margin-top:10px;"><li>Did that sound like a random tapping, or did it sound intentionally planned?</li><li>What famous 3-letter emergency code does that pattern represent?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain how <strong>Morse Code</strong> uses patterns of dots and dashes to represent letters.</li><li>Understand how a <strong>Telegraph</strong> was used to send electricity as a code.</li><li>Identify Morse Code as a precursor to modern digital signaling.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#3f51b5; background:rgba(63,81,181,0.15);"><strong>🛰️ Mission Context:</strong> We don\\'t need a magical device to send words over a wire or a flashlight. We just need to convert the English alphabet into a simple pattern of "On" and "Off" signals!</div>`,
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
                            content: `<div style="line-height:1.7;">How do you turn 26 letters into just dots and dashes?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 What is the code for the letter "E"?</div><div class="reveal-content">The letter "E" is the most common letter in English. So Samuel Morse made it easiest to tap: Just ONE single Dot (.)! The letter "Q" is rarely used, so it got a long, complicated code: Dash-Dash-Dot-Dash (--.-). Efficiency matters!</div></div>`
                        },
                        {
                            title: `🧮 Math Moment: The Speed of Information`,
                            content: `<div style="line-height:1.7;">Before the telegraph, the fastest way to send a message was the Pony Express (a fast horse).</div><div style="background:rgba(255,255,255,0.1); padding:15px; border-radius:10px; margin:15px 0;"><strong>A fast horse runs at 40 miles per hour.</strong><br><strong>Electricity (the Telegraph) travels at 186,000 miles per SECOND.</strong><br><br>How many times faster is the Telegraph? It is almost 16 MILLION times faster! A message that took 3 weeks by horse now took 3 seconds.</div>`
                        },
                        {
                            title: `📈 Analysis: Morse Code Efficiency Chart`,
                            content: `<div style="margin-bottom:15px;">Notice how the most common letters have the shortest codes!</div>
                            <table style="width:100%; border-collapse: collapse; text-align:center; background:rgba(255,255,255,0.05); border-radius:10px; overflow:hidden;">
                                <tr style="background:rgba(255,255,255,0.1);"><th style="padding:10px; border:1px solid rgba(255,255,255,0.2);">Letter / Number</th><th style="padding:10px; border:1px solid rgba(255,255,255,0.2);">Usage Frequency</th><th style="padding:10px; border:1px solid rgba(255,255,255,0.2);">Morse Code</th><th style="padding:10px; border:1px solid rgba(255,255,255,0.2);">Total Taps/Holds</th></tr>
                                <tr><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">E</td><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">Highest (12.7%)</td><td style="padding:10px; font-weight:bold; border:1px solid rgba(255,255,255,0.2);">.</td><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">1 short</td></tr>
                                <tr><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">T</td><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">High (9%)</td><td style="padding:10px; font-weight:bold; border:1px solid rgba(255,255,255,0.2);">-</td><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">1 long</td></tr>
                                <tr><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">Q</td><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">Rare (0.1%)</td><td style="padding:10px; font-weight:bold; border:1px solid rgba(255,255,255,0.2);">--.-</td><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">4 (mixed)</td></tr>
                                <tr><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">0</td><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">Varies</td><td style="padding:10px; font-weight:bold; border:1px solid rgba(255,255,255,0.2);">-----</td><td style="padding:10px; border:1px solid rgba(255,255,255,0.2);">5 long</td></tr>
                            </table>`
                        },
                        {
                            title: `🤔 What If Scenario: The Sinking Ship`,
                            content: `<div class="what-if-box"><strong>What If:</strong> In 1912, the Titanic was sinking in the icy ocean. They had radios aboard, but they couldn\\'t transmit voice. How did they call for help?</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 How did the rescue ships know?</div><div class="reveal-content">The Titanic’s radio operators frantically tapped out "CQD" and "SOS" in <strong>Morse Code</strong> using electrical radio waves continuously until the power died. Ships miles away heard the Beep-Beep-Beep patterns and rushed to help!</div></div>`
                        },
                        {
                            title: `🌍 Case Study: The Transatlantic Cable`,
                            content: `<div style="line-height:1.7;">In 1858, engineers achieved something impossible: They laid a 2,000-mile copper wire on the bottom of the Atlantic Ocean connecting America to Europe.</div><div class="journal-box">The wire allowed them to send Telegraph (Morse Code) electrical pulses underwater. Queen Victoria sent a message to US President Buchanan. The 98-word message took 16 hours to transmit because the signal was so weak, but it was the start of global communication!</div>`
                        },
                        {
                            title: `🛠️ Engineering Challenge: The Telegraph Circuit`,
                            content: `<div style="line-height:1.7;">How did a telegraph physically work?</div><div style="background:rgba(255,255,255,0.1); padding:15px; border-radius:10px; margin:15px 0;"><strong>It was just an open electrical circuit!</strong><br>1. When you pressed the key down, the circuit closed.<br>2. Electricity flowed through the wire to the receiving station.<br>3. It powered an electromagnet that made a loud "CLICK" sound.<br>4. Releasing the key broke the circuit, making a "CLACK" sound.</div>`
                        },
                        {
                            title: `🛰️ Mission Connection: The Universal Language`,
                            content: `<div style="line-height:1.7;">For our emergency signaling system, Morse Code is the perfect tool.</div><div class="journal-box" style="border-left-color:#009688; background:rgba(0,150,136,0.15);">We can send Morse Code by turning a flashlight on and off (light wave), blasting a siren (sound wave), or even just tapping a rock against a pipe! It is a universal code.</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Morse Telegraph`,
                            content: `<div style="margin-bottom:15px; font-weight:bold;">Decode and Transmit the Message!</div>
<div style="text-align:center; margin:20px 0;">
    <div id="l47-bulb" style="width:100px; height:100px; border-radius:50%; background:#333; margin:0 auto; box-shadow:inset 0 0 20px #000; transition:background 0.05s, box-shadow 0.05s;"></div>
    
    <div id="l47-codebook" style="display:none; text-align:left; background:rgba(255,255,255,0.1); padding:15px; border-radius:10px; margin-top:20px; font-family:monospace; font-size:1.1em; line-height:2;">
        <div style="font-weight:bold; margin-bottom:10px; color:#aaa;">📖 CODEBOOK:</div>
        A = ●▬ &nbsp;&nbsp; B = ▬●●● &nbsp;&nbsp; C = ▬●▬● &nbsp;&nbsp; D = ▬●● &nbsp;&nbsp; E = ● &nbsp;&nbsp; F = ●●▬●<br>
        G = ▬▬● &nbsp;&nbsp; H = ●●●● &nbsp;&nbsp; I = ●● &nbsp;&nbsp; K = ▬●▬ &nbsp;&nbsp; L = ●▬●● &nbsp;&nbsp; M = ▬▬<br>
        N = ▬● &nbsp;&nbsp; O = ▬▬▬ &nbsp;&nbsp; P = ●▬▬● &nbsp;&nbsp; R = ●▬● &nbsp;&nbsp; S = ●●● &nbsp;&nbsp; T = ▬<br>
        U = ●●▬ &nbsp;&nbsp; W = ●▬▬ &nbsp;&nbsp; Y = ▬●▬▬<br><br>
        <strong>1 = .---- &nbsp;&nbsp; 2 = ..--- &nbsp;&nbsp; 3 = ...-- &nbsp;&nbsp; 4 = ....- &nbsp;&nbsp; 5 = .....<br>
        6 = -.... &nbsp;&nbsp; 7 = --... &nbsp;&nbsp; 8 = ---.. &nbsp;&nbsp; 9 = ----. &nbsp;&nbsp; 0 = -----</strong>
    </div>
</div>
<div class="energy-controls" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()" onclick="event.stopPropagation()">
    <button class="btn-debug" onclick="event.stopPropagation();if(window.flashMorseWord)window.flashMorseWord('SOS');">🆘 Flash SOS</button>
    <button class="btn-drop" style="background:#e91e63;" onclick="event.stopPropagation();if(window.flashMorseWord)window.flashMorseWord('HELP');">🚨 Flash HELP</button>
    <button class="btn-slow" style="background:#4caf50;" onclick="event.stopPropagation();if(window.flashMorseWord)window.flashMorseWord('OK');">✅ Flash OK</button>
    <button class="btn-drop" style="background:#2196f3;" onclick="event.stopPropagation();var cb=document.getElementById('l47-codebook');if(cb)cb.style.display=cb.style.display==='none'?'block':'none';">📖 Codebook</button>
</div>
<div style="margin-top:20px; text-align:center;">
    <button style="width:100%; max-width:400px; height:80px; font-size:2em; font-weight:bold; background:#ff9800; color:white; border:none; border-radius:10px; cursor:pointer; user-select:none; box-shadow:0 6px 0 #cc7a00; touch-action:manipulation;" 
            onmousedown="event.stopPropagation();document.getElementById('l47-bulb').style.background='#00e5ff'; document.getElementById('l47-bulb').style.boxShadow='0 0 40px #00e5ff, inset 0 0 20px #fff'; this.style.transform='translateY(6px)'; this.style.boxShadow='none';" 
            onmouseup="event.stopPropagation();document.getElementById('l47-bulb').style.background='#333'; document.getElementById('l47-bulb').style.boxShadow='inset 0 0 20px #000'; this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 0 #cc7a00';" 
            ontouchstart="event.stopPropagation();document.getElementById('l47-bulb').style.background='#00e5ff'; document.getElementById('l47-bulb').style.boxShadow='0 0 40px #00e5ff, inset 0 0 20px #fff'; this.style.transform='translateY(6px)'; this.style.boxShadow='none';" 
            ontouchend="event.stopPropagation();document.getElementById('l47-bulb').style.background='#333'; document.getElementById('l47-bulb').style.boxShadow='inset 0 0 20px #000'; this.style.transform='translateY(0)'; this.style.boxShadow='0 6px 0 #cc7a00';" 
            onclick="event.stopPropagation()">
        👇 TELEGRAPH KEY
    </button>
</div>`
                        },
                        {
                            title: `📝 Concept Check: True or False?`,
                            content: `<div style="line-height:1.8; font-size:1.1em;">
                                <div style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05); border-radius:8px;">1. Morse Code can be sent using sound, light, or electrical pulses.<br><span style="color:#4caf50; font-weight:bold;">True! It only relies on patterns of short and long signals.</span></div>
                                <div style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05); border-radius:8px;">2. The letter "E" has the longest Morse code sequence because it is rarely used.<br><span style="color:#ff4444; font-weight:bold;">False! "E" is the MOST common letter, so it has the shortest code (a single dot).</span></div>
                                <div style="margin-bottom:15px; padding:10px; background:rgba(255,255,255,0.05); border-radius:8px;">3. The telegraph allowed communication to travel faster than the speed of a horse.<br><span style="color:#4caf50; font-weight:bold;">True! Electricity travels millions of times faster than a running horse.</span></div>
                            </div>`
                        },
                        {
                            title: `🗣️ Discussion: Evolving Communication`,
                            content: `<div class="journal-box" style="background:rgba(255,193,7,0.15); border-left-color:#ffc107;"><strong>Pair Share:</strong><br><br>The telegraph was invented in the 1830s. Today, we use smartphones to text instantly. What is ONE THING that is the same between a telegraph message and a text message? What is ONE THING that is different?</div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong><br><br>1. Write your initials in your journal, and write the Morse Code dots and dashes for them next to it.<br><br>2. Why do you think Samuel Morse made the letter "A" very short (.-) but the letter "Z" much longer (--..)?</div>`
                        }
                    ]
                },
"""
        html = re.sub(l47_pattern, l47_new_content, html, flags=re.DOTALL)
        print("Updated Lesson 47 to 14 rigorous slides + Interactive")

    with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
        f.write(html)
    print("All fixes applied successfully for L46 and L47!")

if __name__ == "__main__":
    upgrade()

