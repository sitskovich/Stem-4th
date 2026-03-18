import codecs
import re

def upgrade_l46():
    with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
        html = f.read()

    # New 14-slide rigorous L46 curriculum
    new_l46 = """'lesson46': {
                    title: `Patterns & Information Transfer (Rigorous Edition)`,
                    slides: [
                        {
                            title: `🌅 Warm-up: The Silent Signal`,
                            content: `<div class="journal-box"><strong>Your teacher will perform an action at the front of the classroom without speaking.</strong><br><br>📓 <strong>Task:</strong> Observe. Your teacher will put their index finger perfectly vertically over their lips.<ol style="line-height:1.8; margin-top:10px;"><li>What does this signal mean?</li><li>Did they have to write a letter or say a word to communicate that message?</li></ol></div>`
                        },
                        {
                            title: `🎯 Objectives & Vocabulary`,
                            content: `<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Define a <strong>Code</strong> as a system of signals or symbols used to communicate.</li><li>Understand how simple <strong>Patterns</strong> can transfer complex information.</li><li>Recognize that different situations require different types of signals.</li><li>Encode your own message using a pattern system.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#f44336; background:rgba(244,67,54,0.15);"><strong>🛰️ Mission Context:</strong> A flashlight is useless in an emergency if you just turn it on and leave it on! To actually communicate a message, we must use patterns—flashing it on and off in a specific, agreed-upon code.</div>`,
                            vocabulary: [
                                { term: `Information Transfer`, definition: `The process of moving data or a message from one person or place to another.` },
                                { term: `Code`, definition: `A system of rules to convert information (like a letter) into another form (like a beep or flash).` },
                                { term: `Pattern`, definition: `A repeated, predictable design or sequence.` },
                                { term: `Encoding`, definition: `Converting a message into a coded form for transmission.` }
                            ]
                        },
                        {
                            title: `📜 Perspective: Talking Drums of Africa`,
                            content: `<div style="line-height:1.7;">Long before phones were invented, communities in West Africa could send complex news miles away in minutes.</div><div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.1);">They used "Talking Drums." Because their languages were tonal (pitch mattered), drummers could manipulate the pitch and rhythm of the drum to mimic spoken phrases. A pattern of high and low beats told neighboring villages exactly what was happening!</div>`
                        },
                        {
                            title: `🔍 Discovery: Baseball Signs`,
                            content: `<div style="line-height:1.7;">Look closely at a baseball coach in the dugout. They touch their ear, rub their chest, and tap their nose.</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 What is happening?</div><div class="reveal-content">They are transferring information! This is a visual <strong>Code</strong>. The batter knows that "nose tap" means "bunt the ball." The coach is communicating complex strategy to one player without the other team hearing it!</div></div>`
                        },
                        {
                            title: `🧮 Math Moment: Encoding Capacity`,
                            content: `<div class="journal-box" style="background:rgba(33,150,243,0.1); border-left-color:#2196f3;"><strong>How Many Messages Can a Flashlight Send?</strong><br><br>If you can only use ON and OFF, each flash has <strong>2 options</strong>.<br><br>With 1 flash: 2 messages<br>With 2 flashes: 2 × 2 = <strong>4</strong> messages<br>With 3 flashes: 2 × 2 × 2 = <strong>8</strong> messages<br>With 5 flashes: 2<sup>5</sup> = <strong>32</strong> messages (enough for every letter plus some!)<br><br>🧮 <strong>Formula:</strong> Messages = 2<sup>n</sup> where n = number of signal slots.</div>`
                        },
                        {
                            title: `📈 Analysis: Signal Comparison Chart`,
                            content: `<div style="margin-bottom:10px;"><strong>Comparing Methods of Sending Information:</strong></div><table style="width:100%; border-collapse: collapse; font-size:1.4rem; text-align:left;"><tr style="background:rgba(255,255,255,0.1);"><th style="padding:12px; border:1px solid #444;">Method</th><th style="padding:12px; border:1px solid #444;">Signal Type</th><th style="padding:12px; border:1px solid #444;">Range</th><th style="padding:12px; border:1px solid #444;">Limitation</th></tr><tr><td style="padding:12px; border:1px solid #444;">🗣️ Voice</td><td style="padding:12px; border:1px solid #444;">Sound Wave</td><td style="padding:12px; border:1px solid #444;">~100 ft</td><td style="padding:12px; border:1px solid #444;">Fades quickly</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:12px; border:1px solid #444;">🥁 Drum</td><td style="padding:12px; border:1px solid #444;">Sound Wave</td><td style="padding:12px; border:1px solid #444;">~1 mile</td><td style="padding:12px; border:1px solid #444;">Blocked by mountains</td></tr><tr><td style="padding:12px; border:1px solid #444;">🔦 Flashlight</td><td style="padding:12px; border:1px solid #444;">Light Wave</td><td style="padding:12px; border:1px solid #444;">10+ miles</td><td style="padding:12px; border:1px solid #444;">Needs line of sight</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:12px; border:1px solid #444;">📻 Radio</td><td style="padding:12px; border:1px solid #444;">EM Wave</td><td style="padding:12px; border:1px solid #444;">100+ miles</td><td style="padding:12px; border:1px solid #444;">Needs electronics</td></tr></table>`
                        },
                        {
                            title: `🤔 What If Scenario: Stranded on an Island`,
                            content: `<div class="what-if-box"><strong>What If:</strong> You are stranded on an island. You see a ship miles away. You have a pile of dry wood, green leaves, and fire.</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔍 How do you send information?</div><div class="reveal-content">A normal fire just means "someone is camping." If you put green leaves on the fire, the smoke turns thick and white. If you cover the fire with a wet blanket and release it in bursts, you create three equal puffs of smoke: A <strong>Pattern</strong> that universally means "SOS"!</div></div>`
                        },
                        {
                            title: `🦇 Case Study: The Navajo Code Talkers`,
                            content: `<div style="line-height:1.7;">During World War II, the military needed unbreakable codes.</div><div class="journal-box" style="border-left-color:#673ab7; background:rgba(103,58,183,0.1);">The United States Marine Corps recruited <strong>Navajo</strong> Native Americans to transmit secret military messages using their native language as a code. The Navajo language was so complex and had never been written down, making it impossible for enemies to decode. This information transfer system is credited with saving thousands of lives and winning critical battles in the Pacific!</div>`
                        },
                        {
                            title: `📞 Engineering Challenge: The Fire Relay Chain`,
                            content: `<div style="line-height:1.7;">Ancient Greeks used a relay system in 150 BC to send binary messages.</div><div class="journal-box" style="border-left-color:#ff9800; background:rgba(255,152,0,0.1);">They placed fire beacons on hilltops across the country. To send a message, they lit a fire on one hilltop. The watcher on the next hilltop saw the fire and lit THEIR fire. This chain continued until the message had traveled hundreds of miles in minutes! This is the exact same concept used in fiber optic internet today!</div>`
                        },
                        {
                            title: `🛰️ Mission Connection: Creating the Code`,
                            content: `<div style="line-height:1.7;">We have sound waves and light waves. Now we need the code!</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.15);">If we blast a siren for 1 second, pause, and blast again for 1 second... that is a pattern. Just like the talking drums, we must agree on what the pattern means before the emergency happens!</div>`
                        },
                        {
                            title: `🔬 STEM Interactive: The Code Breaker`,
                            content: `<div style="margin-bottom:15px;"><strong>Decode the Message:</strong> Watch the light flash pattern and use the codebook to decipher the secret word!</div><div id="l46-flasher" style="width:100%; height:300px; background:#111; border-radius:15px; margin:15px 0; position:relative; display:flex; align-items:center; justify-content:center;"><div id="l46-bulb" style="width:120px; height:120px; border-radius:50%; background:#333; border:4px solid #555; transition:background 0.15s, box-shadow 0.15s;"></div></div><div id="l46-codebook" style="display:none; background:rgba(255,255,255,0.08); padding:15px; border-radius:10px; margin:10px 0; font-family:monospace; font-size:1.4rem; line-height:2;"><strong>📖 CODEBOOK:</strong><br>A = ●▬ &nbsp; B = ▬●●● &nbsp; C = ▬●▬● &nbsp; D = ▬●● &nbsp; E = ● &nbsp; F = ●●▬●<br>G = ▬▬● &nbsp; H = ●●●● &nbsp; I = ●● &nbsp; K = ▬●▬ &nbsp; L = ●▬●● &nbsp; M = ▬▬<br>N = ▬● &nbsp; O = ▬▬▬ &nbsp; P = ●▬▬● &nbsp; R = ●▬● &nbsp; S = ●●● &nbsp; T = ▬<br>U = ●●▬ &nbsp; W = ●▬▬ &nbsp; Y = ▬●▬▬</div><div class="energy-controls" onmousedown="window.L46.stop(event)" ontouchstart="window.L46.stop(event)" onclick="window.L46.click(event)"><button class="btn-debug" id="l46-btn-sos">🆘 Flash SOS</button><button class="btn-drop" id="l46-btn-help" style="background:#e91e63;">🚨 Flash HELP</button><button class="btn-slow" id="l46-btn-ok" style="background:#4caf50;">✅ Flash OK</button><button class="btn-drop" id="l46-btn-codebook" style="background:#2196f3;">📖 Codebook</button></div>`
                        },
                        {
                            title: `📝 Concept Check: Codes`,
                            content: `<div class="journal-box">True or False?<br><br>1. You can send a complex message with only 2 signal types (ON and OFF).<br>2. Smoke signals are a modern invention.</div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">Check your answers...</div><div class="reveal-content">1. TRUE — This is the foundation of all digital communication!<br>2. FALSE — Smoke signals have been used for thousands of years by indigenous peoples worldwide.</div></div>`
                        },
                        {
                            title: `🗣️ Discussion: Your Own Code`,
                            content: `<div style="line-height:1.7;"><strong>Pair Share:</strong> With a partner, invent your OWN 3-signal code using desk taps.</div><div class="journal-box" style="border-left-color:#e91e63; background:rgba(233,30,99,0.1);">You must encode at least 3 different messages:<br>• "Yes" = ???<br>• "No" = ???<br>• "Help" = ???<br><br>Write your code down, then test it! Can your partner decode your message without seeing it written?</div>`
                        },
                        {
                            title: `🚪 Exit Ticket`,
                            content: `<div class="journal-box"><strong>Journal Task:</strong><br><br>1. What is an example of a pattern or code you use every day without speaking? (Think about lights at an intersection, or sounds a microwave makes.)<br><br>2. Why are patterns better for sending information over long distances than simply yelling words?</div>`
                        }
                    ]
                }"""

    # Replace old L46
    old_l46_pattern = r"'lesson46':\s*\{[^}]*title:[^}]*slides:\s*\[.*?\]\s*\}"
    html = re.sub(
        r"(?s)('lesson46'\s*:\s*\{.*?\})\s*,\s*(?='lesson47')",
        new_l46 + ",\n                ",
        html,
        count=1
    )

    # === Add L46 Safe Handler ===
    l46_handler = """
// --- L46 SAFE CONTROLS ---
window.L46 = {
    stop: function(e) {
        if (!e) return;
        e.stopPropagation();
    },
    click: function(e) {
        if (!e) return;
        e.stopPropagation();
        var id = e.target.id;
        if (id === 'l46-btn-sos') { window.flashMorseWord('SOS'); }
        else if (id === 'l46-btn-help') { window.flashMorseWord('HELP'); }
        else if (id === 'l46-btn-ok') { window.flashMorseWord('OK'); }
        else if (id === 'l46-btn-codebook') {
            var cb = document.getElementById('l46-codebook');
            if (cb) cb.style.display = cb.style.display === 'none' ? 'block' : 'none';
        }
    }
};
"""
    if "window.L46" not in html:
        html = html.replace("// --- L44 SAFE CONTROLS ---", l46_handler + "\n// --- L44 SAFE CONTROLS ---")

    # === Add Morse Code Flasher Engine ===
    l46_sim = """
<script>
// ===== L46 MORSE CODE FLASHER ENGINE =====
(function() {
    var morseAlphabet = {
        'A':'.-','B':'-...','C':'-.-.','D':'-..','E':'.','F':'..-.',
        'G':'--.','H':'....','I':'..','J':'.---','K':'-.-','L':'.-..',
        'M':'--','N':'-.','O':'---','P':'.--.','Q':'--.-','R':'.-.',
        'S':'...','T':'-','U':'..-','V':'...-','W':'.--','X':'-..-',
        'Y':'-.--','Z':'--..'
    };
    var dotMs = 200;
    var dashMs = 600;
    var gapMs = 200;
    var letterGapMs = 600;
    var wordGapMs = 1400;

    window.flashMorseWord = function(word) {
        var bulb = document.getElementById('l46-bulb');
        if (!bulb) return;
        
        // Build a sequence of on/off timings
        var seq = [];
        for (var i = 0; i < word.length; i++) {
            var ch = word[i].toUpperCase();
            if (ch === ' ') {
                seq.push({type:'off', ms: wordGapMs});
                continue;
            }
            var code = morseAlphabet[ch];
            if (!code) continue;
            for (var j = 0; j < code.length; j++) {
                var sym = code[j];
                seq.push({type:'on', ms: sym === '.' ? dotMs : dashMs});
                if (j < code.length - 1) seq.push({type:'off', ms: gapMs});
            }
            if (i < word.length - 1) seq.push({type:'off', ms: letterGapMs});
        }
        
        // Play the sequence
        var idx = 0;
        function playNext() {
            if (idx >= seq.length) {
                bulb.style.background = '#333';
                bulb.style.boxShadow = 'none';
                return;
            }
            var step = seq[idx];
            if (step.type === 'on') {
                bulb.style.background = '#ffeb3b';
                bulb.style.boxShadow = '0 0 60px #ffeb3b, 0 0 120px rgba(255,235,59,0.5)';
            } else {
                bulb.style.background = '#333';
                bulb.style.boxShadow = 'none';
            }
            idx++;
            setTimeout(playNext, step.ms);
        }
        playNext();
    };
})();
</script>
"""
    if "flashMorseWord" not in html:
        html = html.replace("</body>", l46_sim + "\n</body>")

    with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
        f.write(html)
    print("Successfully upgraded L46 with 14-slide rigor + Morse Code Flasher Engine!")

if __name__ == "__main__":
    upgrade_l46()
