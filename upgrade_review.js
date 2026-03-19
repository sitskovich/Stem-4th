const fs = require('fs');
let html = fs.readFileSync('interactive-teacher-portal.html', 'utf-8');

// ============ PART 1: Replace lesson52 slides ============
const s52 = html.indexOf("'lesson52': {");
const e52 = html.indexOf("'lesson53': {");
if (s52 === -1 || e52 === -1) { console.log('ERROR: lesson52/53 boundaries not found'); process.exit(1); }

const newL52 = `'lesson52': {
                    title: \`Bundle 4 Review — The Wave Games\`,
                    slides: [
                        {
                            title: \`🏁 Welcome to The Wave Games!\`,
                            content: \`<strong style="font-size:1.4rem;">🎯 TODAY'S GOAL: Prove your mastery of Waves, Light, Sound, and Communication!</strong><div style="font-size:1.2rem; margin-top:20px;">You will play through <strong>4 high-energy review games</strong> to prepare for tomorrow's Bundle 4 Assessment!</div><div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-top:20px;"><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:10px;text-align:center;font-size:1.3rem;"><strong>🏁 Game 1</strong><br>Pictionary Relay</div><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;text-align:center;font-size:1.3rem;"><strong>🧠 Game 2</strong><br>Memory Match</div><div style="background:rgba(255,193,7,0.2);padding:15px;border-radius:10px;text-align:center;font-size:1.3rem;"><strong>🏃 Game 3</strong><br>Four Corners</div><div style="background:rgba(220,53,69,0.2);padding:15px;border-radius:10px;text-align:center;font-size:1.3rem;"><strong>🏆 Game 4</strong><br>Mission Jeopardy</div></div><div style="background:rgba(255,193,7,0.2);padding:15px;border-radius:10px;margin-top:20px;border-left:4px solid #ffc107;"><h3>🏆 The Ultimate Prize</h3>The team with the highest combined score earns the <strong>Wave Master Trophy</strong>!</div>\`
                        },
                        {
                            title: \`🏁 Game 1: Pictionary Relay (Bundle 4)\`,
                            content: \`<div style="margin-bottom:15px;"><strong>Rules:</strong> One student from each team comes to the board. Direct them to draw one of these Bundle 4 terms while their team guesses!</div><div class="structure-grid"><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🌊 Term 1...</div><div class="reveal-content"><strong>Transverse Wave</strong></div></div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">〰️ Term 2...</div><div class="reveal-content"><strong>Amplitude</strong></div></div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔊 Term 3...</div><div class="reveal-content"><strong>Sound Wave (Compression)</strong></div></div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🔦 Term 4...</div><div class="reveal-content"><strong>Reflection</strong></div></div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">🌈 Term 5...</div><div class="reveal-content"><strong>Refraction (Bent Light)</strong></div></div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">📡 Term 6...</div><div class="reveal-content"><strong>Morse Code</strong></div></div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">💻 Term 7...</div><div class="reveal-content"><strong>Binary Code (0s and 1s)</strong></div></div><div class="reveal-box" onclick="this.classList.toggle('revealed')"><div class="reveal-hint">👁️ Term 8...</div><div class="reveal-content"><strong>Pupil &amp; Retina (Eye)</strong></div></div></div>\`
                        },
                        {
                            title: \`🧠 Game 2: Memory Match (Bundle 4)\`,
                            content: \`<div style="margin-bottom:15px;">Match the wave/light/communication term to its definition!</div><div id="memory-game-board-b4" class="memory-grid"></div><button onclick="if(window.initMemoryGameB4) window.initMemoryGameB4()" style="margin-top:20px; padding:10px 20px; font-size:1.4rem; border-radius:10px; border:none; background:#667eea; color:white; cursor:pointer; font-weight:bold;">🔄 Reset Memory Game</button>\`
                        },
                        {
                            title: \`🏃 Game 3: Four Corners (Bundle 4)\`,
                            content: \`<div style="margin-bottom:15px;"><strong>Move to the corner (A, B, C, D) that matches the correct answer!</strong></div><div style="text-align:center;margin:15px 0;"><button onclick="if(window.initFourCornersB4) window.initFourCornersB4()" style="background:#ffc107;color:#333;border:none;padding:12px 24px;border-radius:20px;font-size:1.4rem;cursor:pointer;font-weight:bold;box-shadow:0 4px 6px rgba(0,0,0,0.2);">▶️ Start/Restart Game</button></div><div id="four-corners-container-b4" style="background:rgba(255,255,255,0.1);padding:20px;border-radius:15px;min-height:300px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;"><p style="font-size:1.4rem;">Click Start to begin!</p></div>\`
                        },
                        {
                            title: \`🏆 Game 4: Mission Jeopardy (Bundle 4)\`,
                            content: \`<div style="margin-bottom:15px;">Pick a category and point value!</div><div style="text-align:center;margin-bottom:15px;"><span id="jeopardy-score-b4" style="font-size:1.8rem;font-weight:bold;background:rgba(0,0,0,0.3);padding:10px 20px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);">Score: 0</span> <button onclick="if(window.initJeopardyB4) window.initJeopardyB4()" style="margin-left:15px;background:#dc3545;color:white;border:none;padding:10px 20px;border-radius:10px;cursor:pointer;font-weight:bold;font-size:1.2rem;">🚀 Start Game</button></div><div id="jeopardy-grid-game-b4" class="jeopardy-grid"></div><div id="jeopardy-modal-game-b4" class="jeopardy-modal" style="display:none;"><div class="jeopardy-modal-content"><span class="close-modal" onclick="window.closeJeopardyModalB4()">×</span><div id="jeopardy-question-b4" style="font-size:1.6rem; line-height:1.5;"></div><div id="jeopardy-answer-b4" style="display:none;margin-top:20px;color:#4caf50;font-weight:bold;font-size:1.8rem;"></div><button id="jeop-reveal-btn-b4" onclick="window.revealJeopardyAnswerB4()" style="margin-top:20px;padding:12px 24px;background:#ffc107;border:none;border-radius:10px;cursor:pointer;font-size:1.3rem;font-weight:bold;">🔍 Show Answer</button></div></div>\`
                        },
                        {
                            title: \`🚪 Dismissal & Prep\`,
                            content: \`<div class="journal-box" style="font-size:1.3rem; text-align:center; padding:30px;"><strong>REST UP!</strong><br><br>Tomorrow is the Bundle 4 Assessment.<br>May the waves be with you! 🌊</div>\`
                        }
                    ]
                },
                `;

html = html.substring(0, s52) + newL52 + html.substring(e52);

// ============ PART 2: Add B4 game JS functions ============
// Insert right before the closing </script> tag that follows the B3 Jeopardy functions
// We'll find the resetJeopardyB3 function end and insert after it

const insertMarker = 'window.resetJeopardyB3 = function () {';
const insertIdx = html.indexOf(insertMarker);
if (insertIdx === -1) { console.log('ERROR: resetJeopardyB3 marker not found'); process.exit(1); }
// Find the closing }; of this function then the next line
let afterReset = html.indexOf('};', insertIdx + insertMarker.length);
afterReset = html.indexOf('\n', afterReset) + 1;

const b4GameJS = `
        // ========== BUNDLE 4 MEMORY MATCH ==========
        var memoryDataB4 = [
            { id: 1, term: 'Amplitude', def: 'Height of a wave (more = more energy)' },
            { id: 2, term: 'Wavelength', def: 'Distance from one peak to the next peak' },
            { id: 3, term: 'Frequency', def: 'Number of waves per second' },
            { id: 4, term: 'Reflection', def: 'Light bouncing off a surface' },
            { id: 5, term: 'Refraction', def: 'Light bending through a new material' },
            { id: 6, term: 'Morse Code', def: 'Dots and dashes to encode letters' },
            { id: 7, term: 'Binary', def: 'Number system using only 0 and 1' },
            { id: 8, term: 'Medium', def: 'Material a wave travels through' }
        ];

        window.initMemoryGameB4 = function () {
            var board = document.getElementById('memory-game-board-b4');
            if (!board) return;
            board.innerHTML = '';
            var cards = [];
            memoryDataB4.forEach(function (item) {
                cards.push({ id: item.id, content: item.term, type: 'term' });
                cards.push({ id: item.id, content: item.def, type: 'def' });
            });
            cards.sort(function () { return 0.5 - Math.random() });
            var b4First = null, b4Second = null, b4Flipped = false, b4Lock = false;
            cards.forEach(function (card) {
                var cardEl = document.createElement('div');
                cardEl.className = 'mem-card';
                cardEl.dataset.matchId = card.id;
                cardEl.onclick = function () {
                    if (b4Lock) return;
                    if (this === b4First) return;
                    if (this.classList.contains('matched')) return;
                    this.classList.add('flipped');
                    if (!b4Flipped) { b4Flipped = true; b4First = this; return; }
                    b4Second = this;
                    if (b4First.dataset.matchId === b4Second.dataset.matchId) {
                        b4First.classList.add('matched'); b4Second.classList.add('matched');
                        b4Flipped = false; b4First = null; b4Second = null;
                    } else {
                        b4Lock = true;
                        var f = b4First, s = b4Second;
                        setTimeout(function () {
                            f.classList.remove('flipped'); s.classList.remove('flipped');
                            b4Flipped = false; b4Lock = false; b4First = null; b4Second = null;
                        }, 1000);
                    }
                };
                var backBorder = card.type === 'term' ? 'border-top: 4px solid #667eea' : 'border-top: 4px solid #ffc107';
                cardEl.innerHTML = '<div class="mem-inner"><div class="mem-front">?</div><div class="mem-back" style="' + backBorder + '">' + card.content + '</div></div>';
                board.appendChild(cardEl);
            });
        };

        // ========== BUNDLE 4 FOUR CORNERS ==========
        var fcQuestionsB4 = [
            { q: "1. What is a WAVE?", options: { A: "A type of rock", B: "A disturbance that transfers energy", C: "A tool for building", D: "A chemical reaction" }, ans: "B" },
            { q: "2. What does AMPLITUDE measure?", options: { A: "Speed of a wave", B: "Color of light", C: "Height of a wave from rest", D: "Number of waves" }, ans: "C" },
            { q: "3. Sound waves CANNOT travel through...", options: { A: "Water", B: "Metal", C: "Air", D: "Empty space (vacuum)" }, ans: "D" },
            { q: "4. When light bounces off a mirror, this is called...", options: { A: "Refraction", B: "Absorption", C: "Reflection", D: "Diffusion" }, ans: "C" },
            { q: "5. When light bends going from air into water, this is...", options: { A: "Reflection", B: "Refraction", C: "Diffraction", D: "Absorption" }, ans: "B" },
            { q: "6. In Morse Code, what does SOS look like?", options: { A: "--- --- ---", B: "... --- ...", C: "... ... ...", D: "--- ... ---" }, ans: "B" },
            { q: "7. Binary uses which two digits?", options: { A: "1 and 2", B: "A and B", C: "0 and 1", D: "+ and -" }, ans: "C" },
            { q: "8. Which part of the eye focuses light onto the retina?", options: { A: "Pupil", B: "Iris", C: "Lens", D: "Cornea" }, ans: "C" },
            { q: "9. Higher frequency waves have a _____ pitch.", options: { A: "Lower", B: "Quieter", C: "Higher", D: "Slower" }, ans: "C" },
            { q: "10. The Law of Reflection says...", options: { A: "Light always bends", B: "Angle in = Angle out", C: "Light stops at mirrors", D: "Mirrors absorb light" }, ans: "B" }
        ];

        var fcIndexB4 = 0;
        window.initFourCornersB4 = function () {
            fcIndexB4 = 0;
            var container = document.getElementById('four-corners-container-b4');
            if (container) container.innerHTML = '';
            renderFcQuestionB4();
        };
        function renderFcQuestionB4() {
            var container = document.getElementById('four-corners-container-b4');
            if (!container) return;
            if (fcIndexB4 >= fcQuestionsB4.length) {
                container.innerHTML = '<h3>🎉 BUNDLE 4 WAVE MASTER!</h3><button onclick="initFourCornersB4()" style="margin-top:20px;padding:10px 20px;background:#ffc107;border-radius:10px;cursor:pointer;">Play Again</button>';
                return;
            }
            var curr = fcQuestionsB4[fcIndexB4];
            var h = '<h3 style="font-size:2rem;margin-bottom:20px;">' + curr.q + '</h3>';
            h += '<div style="grid-template-columns:1fr 1fr; display:grid; gap:20px; width:100%; max-width:800px;">';
            var colors = { A: '#667eea', B: '#28a745', C: '#ffc107', D: '#dc3545' };
            ['A','B','C','D'].forEach(function(l) {
                h += '<div id="fc-b4-' + l + '" style="background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;font-size:1.5rem;border:2px solid ' + colors[l] + ';box-shadow: 0 4px 6px rgba(0,0,0,0.1);"><strong>' + l + ')</strong> ' + curr.options[l] + '</div>';
            });
            h += '</div><div style="margin-top:25px;"><button id="fc-b4-rev" onclick="revealFcAnswerB4()" style="padding:10px 25px;background:#17a2b8;color:white;border-radius:10px;cursor:pointer;font-weight:bold;">Reveal Answer</button>';
            h += '<button id="fc-b4-next" onclick="fcIndexB4++;renderFcQuestionB4()" style="display:none;padding:10px 25px;background:#007bff;color:white;border-radius:10px;cursor:pointer;margin-left:10px;font-weight:bold;">Next Question</button></div>';
            container.innerHTML = h;
        }
        function revealFcAnswerB4() {
            var ans = fcQuestionsB4[fcIndexB4].ans;
            ['A','B','C','D'].forEach(function(l) { if (l !== ans) document.getElementById('fc-b4-' + l).style.opacity = '0.3'; });
            document.getElementById('fc-b4-' + ans).style.background = '#28a745';
            document.getElementById('fc-b4-rev').style.display = 'none';
            document.getElementById('fc-b4-next').style.display = 'inline-block';
        }

        // ========== BUNDLE 4 JEOPARDY ==========
        var jeopCategoriesB4 = ["Wave Basics", "Sound", "Light", "Communication", "Eyes & Ears"];
        var jeopQuestionsB4 = [
            [
                { q: "A disturbance that transfers energy through a medium.", a: "Wave", v: 100 },
                { q: "The height of a wave from the rest position.", a: "Amplitude", v: 200 },
                { q: "The distance from one wave peak to the next.", a: "Wavelength", v: 300 },
                { q: "Metal, rope, and water are all examples of...", a: "Mediums (materials waves travel through)", v: 400 },
                { q: "If you increase both amplitude AND frequency, what happens to energy?", a: "Energy increases dramatically (both add energy)", v: 500 }
            ],
            [
                { q: "Sound waves are this type: Longitudinal or Transverse?", a: "Longitudinal (compression waves)", v: 100 },
                { q: "Sound CANNOT travel through this.", a: "A Vacuum (empty space)", v: 200 },
                { q: "Higher frequency sound waves have a _____ pitch.", a: "Higher Pitch", v: 300 },
                { q: "Sound travels fastest through solids, liquids, or gases?", a: "Solids (molecules are closest together)", v: 400 },
                { q: "The vibrating part of your throat that makes sound.", a: "Vocal Cords (Larynx)", v: 500 }
            ],
            [
                { q: "Light bouncing off a mirror is called...", a: "Reflection", v: 100 },
                { q: "Light bending through water or glass is called...", a: "Refraction", v: 200 },
                { q: "The Law of Reflection states: Angle In equals...", a: "Angle Out (angle of incidence = angle of reflection)", v: 300 },
                { q: "A smooth mirror creates specular reflection. A rough surface creates...", a: "Diffuse Reflection (scattered light)", v: 400 },
                { q: "Why does a straw look bent in a glass of water?", a: "Refraction (light bends changing speed between air and water)", v: 500 }
            ],
            [
                { q: "Dots and dashes used to send messages by telegraph.", a: "Morse Code", v: 100 },
                { q: "The number system computers use with only 0 and 1.", a: "Binary", v: 200 },
                { q: "In Morse Code, what is the signal for SOS?", a: "... --- ... (dot dot dot dash dash dash dot dot dot)", v: 300 },
                { q: "Why did making common words have shorter codes improve speed?", a: "Less time transmitting = faster communication (Morse did this!)", v: 400 },
                { q: "WiFi slows down when your neighbor's router is nearby because of...", a: "Signal Interference (overlapping frequencies)", v: 500 }
            ],
            [
                { q: "The part of the eye that controls how much light enters.", a: "Pupil (controlled by the Iris)", v: 100 },
                { q: "The screen at the back of the eye where images form.", a: "Retina", v: 200 },
                { q: "The three tiny bones in your ear that amplify sound.", a: "Hammer, Anvil, and Stirrup", v: 300 },
                { q: "What does a hearing aid do to help people hear?", a: "Amplifies (increases amplitude of) sound waves", v: 400 },
                { q: "Why does the image on your retina appear upside-down?", a: "The lens refracts (bends) light, flipping the image. Your brain flips it right-side-up!", v: 500 }
            ]
        ];

        var jeopScoreB4 = 0;

        window.initJeopardyB4 = function () {
            var grid = document.getElementById('jeopardy-grid-game-b4');
            if (!grid) return;
            grid.innerHTML = '';
            jeopScoreB4 = 0;
            var scoreEl = document.getElementById('jeopardy-score-b4');
            if (scoreEl) scoreEl.innerText = 'Score: 0';
            grid.style.gridTemplateColumns = 'repeat(5, 1fr)';

            var allModals = document.querySelectorAll('#jeopardy-modal-game-b4');
            if (allModals.length > 1) { allModals.forEach(function(m) { if (m.parentNode === document.body) m.remove(); }); }

            jeopCategoriesB4.forEach(function(cat) {
                var div = document.createElement('div');
                div.className = 'cat-header';
                div.innerText = cat;
                grid.appendChild(div);
            });
            for (var r = 0; r < 5; r++) {
                for (var c = 0; c < 5; c++) {
                    (function(cc, rr) {
                        var q = jeopQuestionsB4[cc][rr];
                        var card = document.createElement('div');
                        card.className = 'q-card';
                        card.innerText = q.v;
                        card.onclick = function () { window.openJeopardyQuestionB4(cc, rr, this); };
                        grid.appendChild(card);
                    })(c, r);
                }
            }
        };

        window.openJeopardyQuestionB4 = function (catIdx, rowIdx, card) {
            if (card.classList.contains('disabled')) return;
            var q = jeopQuestionsB4[catIdx][rowIdx];
            var modal = document.getElementById('jeopardy-modal-game-b4');
            if (!modal) return;
            if (modal.parentNode !== document.body) { document.body.appendChild(modal); }
            modal.onclick = function (event) { if (event.target === modal) { window.closeJeopardyModalB4(); } };
            var qEl = document.getElementById('jeopardy-question-b4');
            var aEl = document.getElementById('jeopardy-answer-b4');
            var revBtn = document.getElementById('jeop-reveal-btn-b4');
            if (!qEl || !aEl || !revBtn) return;
            qEl.innerHTML = '<div style="font-size:2.5rem; margin-bottom:20px; font-weight:bold; color:#764ba2;">' + jeopCategoriesB4[catIdx] + ' - ' + q.v + ' Points</div><div style="font-size:2rem;">' + q.q + '</div>';
            aEl.innerHTML = q.a;
            aEl.style.display = 'none';
            revBtn.style.display = 'inline-block';
            modal.dataset.catIdx = catIdx;
            modal.dataset.rowIdx = rowIdx;
            modal.dataset.scoreVal = q.v;
            modal.style.display = 'flex';
        };

        window.revealJeopardyAnswerB4 = function () {
            document.getElementById('jeopardy-answer-b4').style.display = 'block';
            document.getElementById('jeop-reveal-btn-b4').style.display = 'none';
            var modal = document.getElementById('jeopardy-modal-game-b4');
            if (!modal.dataset.scored) {
                var val = parseInt(modal.dataset.scoreVal) || 0;
                jeopScoreB4 += val;
                var scoreEl = document.getElementById('jeopardy-score-b4');
                if (scoreEl) scoreEl.innerText = 'Score: ' + jeopScoreB4;
                modal.dataset.scored = 'true';
            }
        };

        window.closeJeopardyModalB4 = function () {
            var modal = document.getElementById('jeopardy-modal-game-b4');
            if (!modal) return;
            modal.style.display = 'none';
            var catIdx = parseInt(modal.dataset.catIdx);
            var rowIdx = parseInt(modal.dataset.rowIdx);
            var grid = document.getElementById('jeopardy-grid-game-b4');
            if (grid) {
                var cardIndex = 5 + (rowIdx * 5) + catIdx;
                var card = grid.children[cardIndex];
                if (card && !card.classList.contains('disabled')) { card.classList.add('disabled'); card.innerText = ''; }
            }
            delete modal.dataset.scored;
        };

        window.resetJeopardyB4 = function () { if (confirm('Restart game?')) { window.initJeopardyB4(); } };

`;

html = html.substring(0, afterReset) + b4GameJS + html.substring(afterReset);

fs.writeFileSync('interactive-teacher-portal.html', html);
console.log('✅ Bundle 4 Review upgraded with 6 slides and full B4 game JS (Memory Match, Four Corners, Jeopardy)');
