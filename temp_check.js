

        let currentLesson = null;

        let currentSlide = 0;

        let lessonData = {};

        let slideTimer = null;

        let currentTime = 0;

        let countdown = 0;

        let countdownTimer = null;

        let isTimerRunning = false;



        function openLesson(lessonId) {

            currentLesson = lessonId;

            currentSlide = 0;

            currentTime = 0;



            loadLessonData(lessonId);

            document.getElementById('lessonModal').classList.add('active');

            generateSlides();

            showSlide(0);

            startTimer();

            renderTimerBar();

        }



        function closeLesson() {
            document.getElementById('lessonModal').classList.remove('active');
            currentLesson = null;
            currentSlide = 0;
            currentTime = 0;
            stopTimer();
            stopCountdown();
            if (window.threeJSAnimId) {
                cancelAnimationFrame(window.threeJSAnimId);
                window.threeJSAnimId = null;
            }
        }



        function startTimer() {

            slideTimer = setInterval(() => {

                currentTime++;

                updateTimer();

            }, 1000);

        }



        function stopTimer() {

            if (slideTimer) {

                clearInterval(slideTimer);

                slideTimer = null;

            }

        }



        function updateTimer() {

            const minutes = Math.floor(currentTime / 60);

            const seconds = currentTime % 60;

            const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;



            const display = document.querySelector('.timer-display');

            if (display) display.textContent = timeString;

        }



        function renderTimerBar() {

            let bar = document.querySelector('.timer-bar');

            if (!bar) {

                bar = document.createElement('div');

                bar.className = 'timer-bar';

                bar.innerHTML = `

                    <div class="timer-controls">

                        <button class="timer-btn" onclick="startCountdown()">Start</button>

                        <button class="timer-btn" onclick="stopCountdown()">Stop</button>

                        <button class="timer-btn" onclick="resetCountdown()">Reset</button>

                    </div>

                    <input type="range" class="timer-slider" id="timerSlider" min="0" max="600" value="0" step="30">

                    <span id="timerDisplay" style="font-weight: 600; color: white; min-width: 80px; font-size: 1.3rem;">0:00</span>
                    <span id="countdownDisplay" style="font-weight: 600; color: #00d4aa; min-width: 100px; font-size: 1.4rem; display: none;"></span>
                `;

                document.querySelector('.modal-content').appendChild(bar);



                // Initialize timer display with slider value

                setTimeout(() => {

                    const slider = document.getElementById('timerSlider');

                    if (slider) {

                        countdown = parseInt(slider.value, 10) || 0;

                        updateTimerDisplay();



                        // Add event listeners for real-time updates

                        slider.addEventListener('input', function () {

                            countdown = parseInt(this.value, 10) || 0;

                            updateTimerDisplay();

                        });



                        slider.addEventListener('change', function () {

                            countdown = parseInt(this.value, 10) || 0;

                            updateTimerDisplay();

                        });



                        slider.addEventListener('mousemove', function () {

                            if (this.matches(':hover')) {

                                countdown = parseInt(this.value, 10) || 0;

                                updateTimerDisplay();

                            }

                        });

                    }

                }, 100);

            }

        }



        function startCountdown() {

            const slider = document.getElementById('timerSlider');

            if (!slider) return;



            // Stop any existing countdown

            if (countdownTimer) {

                clearInterval(countdownTimer);

                countdownTimer = null;

            }



            countdown = parseInt(slider.value, 10) || 0;

            isTimerRunning = true;

            updateCountdownDisplay();



            if (countdown > 0) {

                countdownTimer = setInterval(() => {

                    countdown--;

                    updateCountdownDisplay();

                    if (countdown <= 0) {

                        clearInterval(countdownTimer);

                        countdownTimer = null;

                        isTimerRunning = false;

                        alert('Timer complete!');

                        updateCountdownDisplay();

                    }

                }, 1000);

            }

        }



        function stopCountdown() {

            if (countdownTimer) {

                clearInterval(countdownTimer);

                countdownTimer = null;

                isTimerRunning = false;

            }

        }



        function resetCountdown() {

            stopCountdown();

            const slider = document.getElementById('timerSlider');

            if (slider) slider.value = 0;

            countdown = 0;

            isTimerRunning = false;

            updateCountdownDisplay();

            updateTimerDisplay();

        }



        function updateCountdownDisplay() {

            const el = document.getElementById('countdownDisplay');



            if (el) {

                if (isTimerRunning && countdown > 0) {

                    const m = Math.floor(countdown / 60);

                    const s = countdown % 60;

                    el.textContent = `Timer: ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

                    el.style.display = 'inline';

                } else {

                    el.style.display = 'none';

                }

            }

        }



        function updateTimerDisplay() {

            const el = document.getElementById('timerDisplay');



            if (el) {

                const minutes = Math.floor(countdown / 60);

                const seconds = countdown % 60;

                el.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

            }

        }



        function loadLessonData(lessonId) {

            // Helper to merge Objectives and Vocabulary onto the same slide for consistent formatting

            function mergeObjectivesAndVocabulary(slides) {

                if (!Array.isArray(slides)) return slides;

                const merged = [];

                for (let i = 0; i < slides.length; i++) {

                    const slide = slides[i];

                    const title = (slide.title || '').toLowerCase();

                    const next = slides[i + 1];

                    const nextTitle = (next && next.title ? next.title : '').toLowerCase();



                    const isObjectives = title.includes('learning objectives') || title.includes('objectives');

                    const vocabOnSame = Boolean(slide.vocabulary);

                    const nextIsVocabulary = next && (nextTitle.includes('vocabulary'));



                    // Already combined or no vocabulary following

                    if (!isObjectives || vocabOnSame || !nextIsVocabulary) {

                        merged.push(slide);

                        continue;

                    }



                    // Merge current Objectives slide with the following Vocabulary slide

                    const combined = {

                        ...slide,

                        title: slide.title.includes('Objectives') && next.title.includes('Vocabulary')

                            ? slide.title.replace('Objectives', 'Learning Objectives & Vocabulary')

                            : 'Learning Objectives & Vocabulary',

                        // Keep existing content, append a heading for vocabulary list if needed

                        content: (slide.content || '') + '\n📚 Key Vocabulary:',

                        vocabulary: next.vocabulary || []

                    };

                    merged.push(combined);

                    i++; // Skip the next slide since it has been merged

                }

                return merged;

            }



            // Helper to diversify Digital Citizenship slides using shared resources

            function diversifyDigitalCitizenship(slides, seedIndex) {

                if (!Array.isArray(slides)) return slides;

                const dcModules = [

                    {

                        title: 'Digital Citizenship: Sharing Personal Information',

                        content: '🔐 Think before you share!<div class="interactive-question">What should you keep private online?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🆔</span>\n    <span class="reveal-question">Personal details</span>\n    <span class="reveal-answer">Full name, address, phone number, school, and passwords stay private</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">👪</span>\n    <span class="reveal-question">Ask a trusted adult</span>\n    <span class="reveal-answer">Check with an adult before posting or signing up for sites</span>\n</div>'

                    },

                    {

                        title: 'Digital Citizenship: Password Strength',

                        content: '🛡️ Strong passwords protect your accounts.<div class="interactive-question">How do you build a strong password?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔤</span>\n    <span class="reveal-question">Mix characters</span>\n    <span class="reveal-answer">Use upper/lowercase letters, numbers, and symbols</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">♻️</span>\n    <span class="reveal-question">Unique for each site</span>\n    <span class="reveal-answer">Never reuse the same password across websites</span>\n</div>'

                    },

                    {

                        title: 'Digital Citizenship: Website Credibility',

                        content: '🧭 Not all websites are equal.<div class="interactive-question">How can you tell if a website is trustworthy?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔎</span>\n    <span class="reveal-question">Check the author</span>\n    <span class="reveal-answer">Look for an author/organization and publication date</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📚</span>\n    <span class="reveal-question">Cross-verify</span>\n    <span class="reveal-answer">Compare information with another reliable source</span>\n</div>'

                    },

                    {

                        title: 'Digital Citizenship: Recognizing Fake Content',

                        content: '🚩 Spot misinformation online.<div class="interactive-question">What are red flags for fake content?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🗓️</span>\n    <span class="reveal-question">Out-of-date info</span>\n    <span class="reveal-answer">Old posts/images used as if they are new</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🧪</span>\n    <span class="reveal-question">No evidence</span>\n    <span class="reveal-answer">Claims without sources, or only opinions</span>\n</div>'

                    },

                    {

                        title: 'Digital Citizenship: Online Gaming Safety',

                        content: '🎮 Stay safe while playing online.<div class="interactive-question">What are smart choices in games?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🗣️</span>\n    <span class="reveal-question">Chat wisely</span>\n    <span class="reveal-answer">Don\'t share personal info; report bullying or harassment</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">👥</span>\n    <span class="reveal-question">Friends only</span>\n    <span class="reveal-answer">Play with people you know; use privacy settings</span>\n</div>'

                    }

                ];



                // Replace any generic DC slide with a rotating module

                const result = slides.map((s) => ({ ...s }));

                for (let i = 0; i < result.length; i++) {

                    const s = result[i];

                    if (!s.title || !s.title.toLowerCase().includes('digital citizenship')) continue;

                    const text = (s.content || '').toLowerCase();

                    const looksGeneric = text.includes('research') || text.includes('responsibly') || text.includes('guidelines');

                    if (looksGeneric) {

                        const mod = dcModules[seedIndex % dcModules.length];

                        result[i].title = mod.title;

                        result[i].content = mod.content;

                    }

                }

                return result;

            }



            lessonData = {

                'lesson1': {

                    title: 'Accessing Prior Knowledge - Organism Structures',

                    slides: [

                        {

                            title: '🌅 Warm-up: What Do You Notice?',

                            content: '🌱🦋🐸🦎 Look at these different organisms.<div class="interactive-question">What structures do you notice?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌱</span>\n    <span class="reveal-question">Plant structures</span>\n    <span class="reveal-answer">Roots, stems, leaves, flowers</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦋</span>\n    <span class="reveal-question">Animal structures</span>\n    <span class="reveal-answer">Wings, legs, eyes, mouth</span>\n</div><div class="interactive-question">How do you think they help each organism survive?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🛡️</span>\n    <span class="reveal-question">Protection</span>\n    <span class="reveal-answer">Structures help organisms stay safe</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🍽️</span>\n    <span class="reveal-question">Getting food</span>\n    <span class="reveal-answer">Structures help organisms find and eat food</span>\n</div>'

                        },

                        {

                            title: '🎯 Learning Objectives & Vocabulary',

                            content: 'By the end of this lesson, you will be able to:\n• Identify basic structures of plants and animals\n• Understand how structures help organisms survive\n• Compare structures across different organisms\n• Use scientific vocabulary to describe organism parts\n📚 Key Vocabulary:',

                            vocabulary: [

                                { term: 'Structure', definition: 'A part of an organism that has a specific function' },

                                { term: 'Organism', definition: 'A living thing, such as a plant or animal' },

                                { term: 'Function', definition: 'The job or purpose that a structure serves' },

                                { term: 'Adaptation', definition: 'A characteristic that helps an organism survive in its environment' },

                                { term: 'Survival', definition: 'The ability to stay alive and grow' },

                                { term: 'Anatomy', definition: 'The study of the structure of living things' }

                            ]

                        },

                        {

                            title: 'Content: Basic Plant and Animal Structures',

                            content: '🌿🌱 Plants have different structures than animals:<div class="interactive-question">What structures do plants have?</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌿</span>\n    <span class="reveal-question">Roots</span>\n    <span class="reveal-answer">anchor the plant and absorb water</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌳</span>\n    <span class="reveal-question">Stems</span>\n    <span class="reveal-answer">support leaves and transport nutrients</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🍃</span>\n    <span class="reveal-question">Leaves</span>\n    <span class="reveal-answer">capture sunlight for food</span>\n</div>\n</div>\n🦋🐠 Animals have specialized body parts:<div class="interactive-question">What structures do animals have?</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦵</span>\n    <span class="reveal-question">Legs</span>\n    <span class="reveal-answer">help animals move and walk</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦋</span>\n    <span class="reveal-question">Wings</span>\n    <span class="reveal-answer">help birds and insects fly</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐠</span>\n    <span class="reveal-question">Fins</span>\n    <span class="reveal-answer">help fish swim in water</span>\n</div>\n</div>'

                        },

                        {

                            title: 'Deep Dive: Structure-Function Relationships',

                            content: '🔗 Every structure has a specific function:<div class="interactive-question">Click each emoji to reveal the function!</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦅</span>\n    <span class="reveal-question">Bird wings</span>\n    <span class="reveal-answer">help birds fly and escape predators</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌱</span>\n    <span class="reveal-question">Plant roots</span>\n    <span class="reveal-answer">help plants get water and nutrients from soil</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐟</span>\n    <span class="reveal-question">Fish fins</span>\n    <span class="reveal-answer">help fish swim and navigate water</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌳</span>\n    <span class="reveal-question">Tree bark</span>\n    <span class="reveal-answer">protects the tree from weather and insects</span>\n</div>\n</div>'

                        },

                        {

                            title: 'Digital Citizenship: Sharing Personal Information',

                            content: '🔐 Think before you share personal information online!<div class="interactive-question">What information should you keep private?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🆔</span>\n    <span class="reveal-question">Personal details</span>\n    <span class="reveal-answer">Full name, address, phone number, school, and passwords stay private</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">👪</span>\n    <span class="reveal-question">Ask a trusted adult</span>\n    <span class="reveal-answer">Check with an adult before posting or signing up for sites</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🛡️</span>\n    <span class="reveal-question">Protect your privacy</span>\n    <span class="reveal-answer">Never share photos of yourself or family without permission</span>\n</div>'

                        },

                        {

                            title: '📊 Graphic Organizer: Structure-Function Chart',

                            content: '📋 Complete this chart as you learn about organism structures:<div class="interactive-question">For each organism, define the structure and its function:</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌱</span>\n    <span class="reveal-question">Plant Roots</span>\n    <span class="reveal-answer">Anchor plant and absorb water from soil</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦅</span>\n    <span class="reveal-question">Bird Wings</span>\n    <span class="reveal-answer">Enable flight and escape from predators</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐟</span>\n    <span class="reveal-question">Fish Fins</span>\n    <span class="reveal-answer">Help fish swim and navigate in water</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌳</span>\n    <span class="reveal-question">Tree Bark</span>\n    <span class="reveal-answer">Protects tree from weather and insects</span>\n</div>\n</div>\n📝 Use this organizer to track what you learn throughout the lesson!'

                        },

                        {

                            title: '📖 Reading Science: Amazing Organisms',

                            content: '📚 Read about how different organisms have adapted to survive:<div class="interactive-question">What makes each organism special?</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦒</span>\n    <span class="reveal-question">Giraffe</span>\n    <span class="reveal-answer">Long neck to reach leaves high in trees</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐧</span>\n    <span class="reveal-question">Penguin</span>\n    <span class="reveal-answer">Flippers for swimming, thick feathers for warmth</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌵</span>\n    <span class="reveal-question">Cactus</span>\n    <span class="reveal-answer">Spines protect from animals, thick stem stores water</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦎</span>\n    <span class="reveal-question">Chameleon</span>\n    <span class="reveal-answer">Color-changing skin for camouflage</span>\n</div>\n</div>\n💡 Think: How do these adaptations help each organism survive in its environment?'

                        }

                    ]

                },

                'lesson2': {

                    title: 'Plant Structures and Functions',

                    slides: [

                        {

                            title: '🌅 Warm-up: Plant Part Identification',

                            content: '🌱🌿🌻 Can you identify the different parts of this plant?\n• Which part is the root?\n• Where are the leaves?\n• What does the stem do?\n• How do flowers help plants?'

                        },

                        {

                            title: '🎯 Learning Objectives & Vocabulary',

                            content: 'By the end of this lesson, you will be able to:\n• Identify major plant parts and their functions\n• Understand photosynthesis and growth\n• Explore root systems and adaptations\n📚 Key Vocabulary:',

                            vocabulary: [

                                { term: 'Photosynthesis', definition: 'The process plants use to make food from sunlight' },

                                { term: 'Chlorophyll', definition: 'The green pigment that helps plants capture sunlight' },

                                { term: 'Roots', definition: 'Plant parts that anchor the plant and absorb water' },

                                { term: 'Stems', definition: 'Plant parts that support leaves and transport water' }

                            ]

                        },

                        {

                            title: 'Content: Plant Anatomy and Physiology',

                            content: '🌱 Plants have four main parts:<div class="interactive-question">What are the four main plant parts?</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌿</span>\n    <span class="reveal-question">Roots</span>\n    <span class="reveal-answer">anchor plant and absorb water</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌳</span>\n    <span class="reveal-question">Stems</span>\n    <span class="reveal-answer">support leaves and transport nutrients</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🍃</span>\n    <span class="reveal-question">Leaves</span>\n    <span class="reveal-answer">capture sunlight for food</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌸</span>\n    <span class="reveal-question">Flowers</span>\n    <span class="reveal-answer">produce seeds for reproduction</span>\n</div>\n</div>\nEach part has important jobs to help the plant survive and grow!'

                        },

                        {

                            title: 'Deep Dive: Photosynthesis Process',

                            content: '☀️ Photosynthesis is how plants make their own food:<div class="interactive-question">What happens during photosynthesis?</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌞</span>\n    <span class="reveal-question">Step 1</span>\n    <span class="reveal-answer">Plants capture sunlight energy</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">💧</span>\n    <span class="reveal-question">Step 2</span>\n    <span class="reveal-answer">They absorb water through roots</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌬️</span>\n    <span class="reveal-question">Step 3</span>\n    <span class="reveal-answer">They take in carbon dioxide from air</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🍯</span>\n    <span class="reveal-question">Step 4</span>\n    <span class="reveal-answer">They create glucose (sugar) for energy</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">💨</span>\n    <span class="reveal-question">Step 5</span>\n    <span class="reveal-answer">They release oxygen for us to breathe</span>\n</div>\n</div>'

                        },

                        {

                            title: 'Digital Citizenship: Password Strength',

                            content: '🛡️ Strong passwords protect your accounts and personal information!<div class="interactive-question">How do you build a strong password?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔤</span>\n    <span class="reveal-question">Mix characters</span>\n    <span class="reveal-answer">Use upper/lowercase letters, numbers, and symbols</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">♻️</span>\n    <span class="reveal-question">Unique for each site</span>\n    <span class="reveal-answer">Never reuse the same password across websites</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📏</span>\n    <span class="reveal-question">Make it long</span>\n    <span class="reveal-answer">Use at least 8 characters, longer is better</span>\n</div>'

                        }

                    ]

                },

                'lesson3': {

                    title: 'Animal Structures and Adaptations',

                    slides: [

                        {

                            title: '🌅 Warm-up: Animal Adaptation Matching',

                            content: '🦅🐧🐘🦒 Match each animal with its special adaptation:\n• Which animal has thick fur for cold weather?\n• Which animal has webbed feet for swimming?\n• Which animal has a long neck for reaching leaves?\n• Which animal has sharp claws for hunting?'

                        },

                        {

                            title: '🎯 Learning Objectives & Vocabulary',

                            content: 'By the end of this lesson, you will be able to:\n• Compare animal structures across species\n• Understand adaptation and survival\n• Explore behavioral adaptations\n📚 Key Vocabulary:',

                            vocabulary: [

                                { term: 'Adaptation', definition: 'A characteristic that helps an organism survive in its environment' },

                                { term: 'Behavior', definition: 'The way an animal acts or responds to its environment' },

                                { term: 'Habitat', definition: 'The natural environment where an organism lives' },

                                { term: 'Species', definition: 'A group of similar organisms that can reproduce' }

                            ]

                        },

                        {

                            title: 'Content: Animal Anatomy and Adaptations',

                            content: '🦁 Animals have different body structures for survival:<div class="interactive-question">What adaptations help animals survive?</div>\n<div class="adaptation-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦅</span>\n    <span class="reveal-question">Sharp claws</span>\n    <span class="reveal-answer">for hunting prey</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐻</span>\n    <span class="reveal-question">Thick fur</span>\n    <span class="reveal-answer">for warmth in cold climates</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐸</span>\n    <span class="reveal-question">Webbed feet</span>\n    <span class="reveal-answer">for swimming</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦒</span>\n    <span class="reveal-question">Long necks</span>\n    <span class="reveal-answer">for reaching high leaves</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦎</span>\n    <span class="reveal-question">Camouflage colors</span>\n    <span class="reveal-answer">for hiding from predators</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦋</span>\n    <span class="reveal-question">Bright colors</span>\n    <span class="reveal-answer">to warn predators</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐘</span>\n    <span class="reveal-question">Large ears</span>\n    <span class="reveal-answer">for cooling down in heat</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦏</span>\n    <span class="reveal-question">Thick skin</span>\n    <span class="reveal-answer">for protection from thorns</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦈</span>\n    <span class="reveal-question">Streamlined body</span>\n    <span class="reveal-answer">for fast swimming</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦔</span>\n    <span class="reveal-question">Sharp spines</span>\n    <span class="reveal-answer">for protection</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦜</span>\n    <span class="reveal-question">Strong beak</span>\n    <span class="reveal-answer">for cracking nuts</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦘</span>\n    <span class="reveal-question">Powerful legs</span>\n    <span class="reveal-answer">for jumping long distances</span>\n</div>\n</div>'

                        },

                        {

                            title: 'Deep Dive: Behavioral vs. Physical Adaptations',

                            content: '🔧 Two types of adaptations:<div class="interactive-question">🦴 PHYSICAL ADAPTATIONS (body parts):</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐦</span>\n    <span class="reveal-question">Bird beaks</span>\n    <span class="reveal-answer">for different foods</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐟</span>\n    <span class="reveal-question">Fish fins</span>\n    <span class="reveal-answer">for swimming</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐘</span>\n    <span class="reveal-question">Elephant trunks</span>\n    <span class="reveal-answer">for grabbing</span>\n</div>\n</div><div class="interactive-question">🎭 BEHAVIORAL ADAPTATIONS (actions):</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦅</span>\n    <span class="reveal-question">Migration</span>\n    <span class="reveal-answer">to find food</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐻</span>\n    <span class="reveal-question">Hibernation</span>\n    <span class="reveal-answer">to survive winter</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦎</span>\n    <span class="reveal-question">Playing dead</span>\n    <span class="reveal-answer">to escape predators</span>\n</div>\n</div>'

                        },

                        {

                            title: 'Digital Citizenship: Recognizing Fake Content',

                            content: '🚩 Learn to spot misinformation and fake content online!<div class="interactive-question">What are red flags for fake content?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🗓️</span>\n    <span class="reveal-question">Out-of-date info</span>\n    <span class="reveal-answer">Old posts/images used as if they are new</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🧪</span>\n    <span class="reveal-question">No evidence</span>\n    <span class="reveal-answer">Claims without sources, or only opinions</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔍</span>\n    <span class="reveal-question">Check the source</span>\n    <span class="reveal-answer">Look for reliable authors and organizations</span>\n</div>'

                        }

                    ]

                },

                'lesson4': {

                    title: 'Plant Structure Investigation Lab',

                    slides: [

                        {

                            title: '🌅 Warm-up: Lab Safety Review',

                            content: '⚠️ Lab Safety Rules:\n• Always wear safety goggles\n• Use scissors and tweezers carefully\n• Wash hands before and after lab\n• Clean up all materials when finished'

                        },

                        {

                            title: '🎯 Learning Objectives & Vocabulary',

                            content: 'By the end of this lab, you will be able to:\n• Conduct hands-on plant dissection\n• Document plant structures and functions\n• Create detailed scientific drawings\n• Use microscopes to observe plant parts\n📚 Key Vocabulary:',

                            vocabulary: [

                                { term: 'Dissection', definition: 'The careful cutting apart of an organism to study its parts' },

                                { term: 'Microscope', definition: 'A tool that makes small objects look larger' },

                                { term: 'Observation', definition: 'Using your senses to gather information' },

                                { term: 'Hypothesis', definition: 'An educated guess about what will happen' }

                            ]

                        },

                        {

                            title: '🧪 Lab Supplies & Procedure',

                            content: '📦 Required Materials:\n• Fresh plant samples, safety goggles, scissors, tweezers\n• Microscope slides, hand lenses, lab notebooks\n• Colored pencils, rulers, paper towels<div class="interactive-question">What are the lab procedure steps?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌱</span>\n    <span class="reveal-question">Step 1</span>\n    <span class="reveal-answer">Examine the whole plant first</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">✂️</span>\n    <span class="reveal-question">Step 2</span>\n    <span class="reveal-answer">Carefully separate roots, stem, and leaves</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔍</span>\n    <span class="reveal-question">Step 3</span>\n    <span class="reveal-answer">Observe each part under microscope</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📏</span>\n    <span class="reveal-question">Step 4</span>\n    <span class="reveal-answer">Measure and record sizes</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🎨</span>\n    <span class="reveal-question">Step 5</span>\n    <span class="reveal-answer">Draw detailed sketches with labels</span>\n</div>'

                        },

                        {

                            title: '📊 Lab Rubric - 3 Category System',

                            content: '🏆 Grading Rubric:\n📋 PROCEDURE (40 points):\n• Follows safety rules (10 pts)\n• Completes all steps (15 pts)\n• Works cooperatively (15 pts)\n🔬 OBSERVATIONS (35 points):\n• Accurate drawings (15 pts)\n• Detailed observations (10 pts)\n• Proper labeling (10 pts)\n📝 ANALYSIS (25 points):\n• Explains structure functions (15 pts)\n• Compares different plants (10 pts)'

                        },

                        {

                            title: '🧹 Lab Cleanup Procedures',

                            content: '⚠️ IMPORTANT: Proper cleanup is essential for safety and organization!<div class="interactive-question">What are the cleanup steps?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🧤</span>\n    <span class="reveal-question">Step 1</span>\n    <span class="reveal-answer">Remove safety goggles and wash hands</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🧽</span>\n    <span class="reveal-question">Step 2</span>\n    <span class="reveal-answer">Clean and dry all equipment</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🗑️</span>\n    <span class="reveal-question">Step 3</span>\n    <span class="reveal-answer">Dispose of plant materials properly</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📋</span>\n    <span class="reveal-question">Step 4</span>\n    <span class="reveal-answer">Return all materials to storage</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">✅</span>\n    <span class="reveal-question">Step 5</span>\n    <span class="reveal-answer">Check workspace is clean and organized</span>\n</div>'

                        }

                    ]

                },

                'lesson5': {

                    title: 'Food Chains and Energy Flow',

                    slides: [

                        {

                            title: 'Warm-up: Energy in Nature',

                            content: '🌞 Think about what you ate for breakfast today. Where did that energy come from?<div class="interactive-question">What did you eat this morning?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🍳</span>\n    <span class="reveal-question">Breakfast foods</span>\n    <span class="reveal-answer">Cereal, eggs, fruit, toast, etc.</span>\n</div><div class="interactive-question">Where did your food get its energy?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌱</span>\n    <span class="reveal-question">Plants</span>\n    <span class="reveal-answer">Most food comes from plants that use sunlight</span>\n</div>'

                        },

                        {

                            title: 'Objectives',

                            content: '🎯 By the end of this lesson, you will be able to:<div class="interactive-question">What will we learn about food chains?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔗</span>\n    <span class="reveal-question">Define food chain</span>\n    <span class="reveal-answer">A sequence showing energy flow between organisms</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌱</span>\n    <span class="reveal-question">Identify producers</span>\n    <span class="reveal-answer">Organisms that make their own food using sunlight</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐰</span>\n    <span class="reveal-question">Identify consumers</span>\n    <span class="reveal-answer">Organisms that eat other organisms for energy</span>\n</div>'

                        },

                        {

                            title: 'Vocabulary',

                            content: '📚 Key Terms:<div class="interactive-question">Click each term to reveal its definition:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔗</span>\n    <span class="reveal-question">Food Chain</span>\n    <span class="reveal-answer">A sequence showing how energy flows from one organism to another</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌱</span>\n    <span class="reveal-question">Producer</span>\n    <span class="reveal-answer">An organism that makes its own food using sunlight</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐰</span>\n    <span class="reveal-question">Consumer</span>\n    <span class="reveal-answer">An organism that eats other organisms for energy</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🍄</span>\n    <span class="reveal-question">Decomposer</span>\n    <span class="reveal-answer">An organism that breaks down dead materials</span>\n</div>'

                        },

                        {

                            title: 'Content: Understanding Food Chains',

                            content: '🔗 A food chain shows how energy moves through an ecosystem:<div class="interactive-question">What is the order of energy flow?</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">☀️</span>\n    <span class="reveal-question">Sun</span>\n    <span class="reveal-answer">Provides energy to start the food chain</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌱</span>\n    <span class="reveal-question">Producer</span>\n    <span class="reveal-answer">Uses sunlight to make food (plants, algae)</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐰</span>\n    <span class="reveal-question">Primary Consumer</span>\n    <span class="reveal-answer">Eats producers (herbivores like rabbits)</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦅</span>\n    <span class="reveal-question">Secondary Consumer</span>\n    <span class="reveal-answer">Eats primary consumers (carnivores like eagles)</span>\n</div>\n</div>'

                        },

                        {

                            title: 'Deep Dive: Energy Transfer',

                            content: '⚡ Energy flows through food chains:<div class="interactive-question">How much energy transfers between levels?</div>\n<div class="structure-grid"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔟</span>\n    <span class="reveal-question">10% Rule</span>\n    <span class="reveal-answer">Only about 10% of energy transfers to the next level</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔥</span>\n    <span class="reveal-question">90% Lost</span>\n    <span class="reveal-answer">90% is used for life processes or lost as heat</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦅</span>\n    <span class="reveal-question">Fewer Predators</span>\n    <span class="reveal-answer">This is why there are fewer top predators</span>\n</div>\n</div>'

                        },

                        {

                            title: 'Digital Citizenship: Online Gaming Safety',

                            content: '🎮 Stay safe while playing online games and interacting with others!<div class="interactive-question">What are smart choices in online games?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🗣️</span>\n    <span class="reveal-question">Chat wisely</span>\n    <span class="reveal-answer">Don\'t share personal info; report bullying or harassment</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">👥</span>\n    <span class="reveal-question">Friends only</span>\n    <span class="reveal-answer">Play with people you know; use privacy settings</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">⏰</span>\n    <span class="reveal-question">Time limits</span>\n    <span class="reveal-answer">Set and follow time limits for gaming</span>\n</div>'

                        }

                    ]

                },

                'lesson6': {

                    title: 'Ecosystem Interactions',

                    slides: [

                        {

                            title: 'Warm-up: Ecosystem Interactions',

                            content: '🦅🐰🌱 Think about animals and plants in your backyard or a park.<div class="interactive-question">How do different organisms interact?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦅</span>\n    <span class="reveal-question">Predator-Prey</span>\n    <span class="reveal-answer">One animal hunts and eats another</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌱</span>\n    <span class="reveal-question">Plant-Animal</span>\n    <span class="reveal-answer">Animals eat plants for food</span>\n</div>'

                        },

                        {

                            title: 'Objectives',

                            content: '🎯 By the end of this lesson, you will be able to:<div class="interactive-question">What will we learn about ecosystems?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦅</span>\n    <span class="reveal-question">Predator-prey relationships</span>\n    <span class="reveal-answer">How animals hunt and are hunted</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🤝</span>\n    <span class="reveal-question">Competition and cooperation</span>\n    <span class="reveal-answer">How organisms compete and work together</span>\n</div>'

                        },

                        {

                            title: 'Vocabulary',

                            content: '📚 Key Terms:<div class="interactive-question">Click each term to reveal its definition:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦅</span>\n    <span class="reveal-question">Predator</span>\n    <span class="reveal-answer">An animal that hunts and eats other animals</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐰</span>\n    <span class="reveal-question">Prey</span>\n    <span class="reveal-answer">An animal that is hunted and eaten by other animals</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🤝</span>\n    <span class="reveal-question">Competition</span>\n    <span class="reveal-answer">When organisms compete for the same resources</span>\n</div>'

                        },

                        {

                            title: 'Content: Ecosystem Interactions',

                            content: 'Organisms interact in many ways: some hunt others, some compete for food, and some help each other survive.',

                            image: 'https://via.placeholder.com/800x600/667eea/ffffff?text=Ecosystem+Interactions'

                        },

                        {

                            title: 'Deep Dive: Population Dynamics',

                            content: 'When predator populations increase, prey populations decrease. This creates a balance in nature.',

                            image: 'https://via.placeholder.com/800x600/ff6b35/ffffff?text=Population+Dynamics'

                        },

                        {

                            title: 'Digital Citizenship: Digital Footprint',

                            content: '👣 Everything you do online creates a digital footprint!<div class="interactive-question">How can you manage your digital footprint?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🤔</span>\n    <span class="reveal-question">Think before you post</span>\n    <span class="reveal-answer">Consider if you want this online forever</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔍</span>\n    <span class="reveal-question">Search yourself</span>\n    <span class="reveal-answer">Check what information about you is online</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🛡️</span>\n    <span class="reveal-question">Protect privacy</span>\n    <span class="reveal-answer">Use privacy settings on social media</span>\n</div>'

                        }

                    ]

                },

                'lesson7': {

                    title: 'Human Impact on Ecosystems',

                    slides: [

                        {

                            title: 'Warm-up: Environmental Impact Scenarios',

                            content: 'Look at these scenarios. Which human activities help or harm ecosystems?',

                            image: 'images/imageslesson7-1.png'

                        },

                        {

                            title: 'Learning Objectives',

                            content: 'By the end of this lesson, you will be able to:\n• Identify human activities affecting ecosystems\n• Understand conservation and protection\n• Explore sustainable practices',

                            // Vocabulary will be merged onto this slide by pre-processing below

                            vocabulary: [

                                { term: 'Conservation', definition: 'The protection and preservation of natural resources' },

                                { term: 'Pollution', definition: 'Harmful substances in the environment' },

                                { term: 'Sustainability', definition: 'Using resources in a way that doesn\'t harm the environment' },

                                { term: 'Biodiversity', definition: 'The variety of life in an ecosystem' }

                            ]

                        },

                        {

                            title: 'Content: Human Impact on Nature',

                            content: 'Human activities like pollution, deforestation, and overfishing can harm ecosystems. But we can also help protect them.',

                            image: 'images/imageslesson7-1.png'

                        },

                        {

                            title: 'Deep Dive: Conservation Strategies',

                            content: 'We can protect ecosystems by reducing pollution, creating protected areas, and using sustainable practices.',

                            image: 'images/imageslesson7-2.png'

                        },

                        {

                            title: 'Digital Citizenship: Research Snapshot Log',

                            content: '🧭 Not all websites are equal.<div class="interactive-question">How can you tell if a website is trustworthy?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔎</span>\n    <span class="reveal-question">Check the author</span>\n    <span class="reveal-answer">Look for an author/organization and publication date</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📚</span>\n    <span class="reveal-question">Cross-verify</span>\n    <span class="reveal-answer">Compare information with another reliable source</span>\n</div>'

                        }

                    ]

                },

                'lesson8': {

                    title: 'Ecosystem Survey Lab',

                    slides: [

                        {

                            title: '🌿 Ecosystem Survey Lab',

                            content: 'Today we will conduct field ecosystem surveys with species identification and health assessment.'

                        },

                        {

                            title: '🛡️ Field Safety and Equipment Setup',

                            content: '⚠️ Field Safety Rules:\n• Stay with your group at all times\n• Don\'t touch unknown plants or animals\n• Wear closed-toe shoes and long pants\n• Bring water and stay hydrated\n• Respect wildlife - observe only\n🧪 Equipment Check:\n• Verify all materials are present\n• Test field guides and tools\n• Review data collection sheets'

                        },

                        {

                            title: '📋 Learning Objectives',

                            content: 'By the end of this lab, you will be able to:\n• Conduct field ecosystem survey\n• Document species interactions\n• Analyze ecosystem health\n• Use field identification guides'

                        },

                        {

                            title: '📚 Vocabulary Cards',

                            content: 'Let\'s learn field research vocabulary!',

                            vocabulary: [

                                { term: 'Survey', definition: 'A careful examination of an area to gather information' },

                                { term: 'Species', definition: 'A group of similar organisms that can reproduce' },

                                { term: 'Interaction', definition: 'How different organisms affect each other' },

                                { term: 'Health', definition: 'The condition of an ecosystem' }

                            ]

                        },

                        {

                            title: '🧪 Lab Supplies Needed',

                            content: '📦 Required Materials:\n• Field identification guides (plants, insects, birds)\n• Magnifying glasses (1 per student)\n• Field notebooks and pencils\n• Measuring tape or rulers\n• Plastic bags for sample collection\n• Digital cameras or tablets\n• Data collection sheets\n• Clipboards\n• Water bottles\n• First aid kit\n• Whistle for safety'

                        },

                        {

                            title: '📝 Lab Procedure: Field Survey',

                            content: '🌿 Step-by-Step Instructions:\n1. 🗺️ Choose your survey area (10m x 10m plot)\n2. 🔍 Identify and count different species\n3. 📊 Record interactions you observe\n4. 📏 Measure plant heights and areas\n5. 📸 Take photos of key species\n6. 📝 Document environmental conditions\n7. 🧹 Leave area cleaner than you found it'

                        },

                        {

                            title: '📊 Lab Rubric - 3 Category System',

                            content: '🏆 Grading Rubric:\n📋 PROCEDURE (40 points):\n• Follows safety rules (10 pts)\n• Completes survey systematically (15 pts)\n• Works cooperatively in field (15 pts)\n🔬 OBSERVATIONS (35 points):\n• Accurate species identification (15 pts)\n• Detailed field notes (10 pts)\n• Quality photographs (10 pts)\n📝 ANALYSIS (25 points):\n• Ecosystem health assessment (15 pts)\n• Species interaction analysis (10 pts)'

                        },

                        {

                            title: '🧹 Field Cleanup Procedures',

                            content: '⚠️ IMPORTANT: Leave the ecosystem better than you found it!<div class="interactive-question">What are the field cleanup steps?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🗑️</span>\n    <span class="reveal-question">Step 1</span>\n    <span class="reveal-answer">Collect all trash and materials</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌱</span>\n    <span class="reveal-question">Step 2</span>\n    <span class="reveal-answer">Return any moved rocks or logs</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📋</span>\n    <span class="reveal-question">Step 3</span>\n    <span class="reveal-answer">Pack all equipment safely</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">👥</span>\n    <span class="reveal-question">Step 4</span>\n    <span class="reveal-answer">Take attendance and head count</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">✅</span>\n    <span class="reveal-question">Step 5</span>\n    <span class="reveal-answer">Verify area is clean and undisturbed</span>\n</div>'

                        }

                    ]

                },

                'lesson9': {

                    title: 'Adaptation and Evolution',

                    slides: [

                        {

                            title: '🔥 Warm-up: Adaptation Challenge',

                            content: '🦅🐧🐘🦒 Look at these amazing animals! Can you spot how they might be different from each other? What do you think helps them survive in their environment?\n<div class="structure-grid" style="margin-top: 5px;"><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦅</span>\n    <span class="reveal-question">Eagle</span>\n    <span class="reveal-answer">Sharp talons and excellent eyesight for hunting</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐧</span>\n    <span class="reveal-question">Penguin</span>\n    <span class="reveal-answer">Flippers for swimming, thick feathers for warmth</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐘</span>\n    <span class="reveal-question">Elephant</span>\n    <span class="reveal-answer">Large ears for cooling, trunk for grabbing food</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦒</span>\n    <span class="reveal-question">Giraffe</span>\n    <span class="reveal-answer">Long neck to reach leaves high in trees</span>\n</div>\n</div>'

                        },

                        {

                            title: '🎯 Learning Objectives & Vocabulary',

                            content: 'By the end of this lesson, you will be able to:\n• Identify different types of adaptations that help organisms survive\n• Explain how organisms change over time through natural selection\n• Describe how environmental changes can lead to new adaptations\n• Compare and contrast different adaptation strategies',

                            vocabulary: [

                                { term: 'Adaptation', definition: 'A trait that helps an organism survive in its environment' },

                                { term: 'Evolution', definition: 'The gradual change in species over time' },

                                { term: 'Natural Selection', definition: 'The process where organisms with helpful traits survive and reproduce' },

                                { term: 'Camouflage', definition: 'An adaptation that helps organisms blend in with their surroundings' },

                                { term: 'Mimicry', definition: 'When one organism looks like another to avoid predators' },

                                { term: 'Survival', definition: 'The ability to stay alive and reproduce in a specific environment' }

                            ]

                        },

                        {

                            title: 'Content: Adaptation Mechanisms',

                            content: 'Organisms adapt to their environment over time. Those with helpful traits survive and reproduce.\n<div style="display: flex; justify-content: center; align-items: center; gap: 30px; margin-top: 15px; width: 100%; max-height: 55vh; overflow: visible; flex-wrap: nowrap;">\n<div class="flip-card" onclick="flipAdaptationCard(this)" style="width: 300px; height: 300px; perspective: 1000px; cursor: pointer; flex-shrink: 0;">\n    <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s; transform-style: preserve-3d;">\n        <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n            <img src="images/Lesson 9/camo.png" alt="Camouflage" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">\n        </div>\n        <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: white; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.2); transform: rotateY(180deg); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; box-sizing: border-box;">\n            <h3 style="color: #667eea; margin-bottom: 10px; font-size: 2.5rem;">🦎 Camouflage</h3>\n            <p style="color: #666; text-align: center; line-height: 1.3; font-size: 1.8rem;">Blending in with surroundings to avoid predators</p>\n        </div>\n    </div>\n</div>\n<div class="flip-card" onclick="flipAdaptationCard(this)" style="width: 300px; height: 300px; perspective: 1000px; cursor: pointer; flex-shrink: 0;">\n    <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s; transform-style: preserve-3d;">\n        <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n            <img src="images/Lesson 9/mimicry.png" alt="Mimicry" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">\n        </div>\n        <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: white; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.2); transform: rotateY(180deg); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; box-sizing: border-box;">\n            <h3 style="color: #667eea; margin-bottom: 10px; font-size: 2.5rem;">🦋 Mimicry</h3>\n            <p style="color: #666; text-align: center; line-height: 1.3; font-size: 1.8rem;">Looking like another organism to avoid predators</p>\n        </div>\n    </div>\n</div>\n<div class="flip-card" onclick="flipAdaptationCard(this)" style="width: 300px; height: 300px; perspective: 1000px; cursor: pointer; flex-shrink: 0;">\n    <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s; transform-style: preserve-3d;">\n        <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n            <img src="images/Lesson 9/coloration.png" alt="Coloration" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">\n        </div>\n        <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: white; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.2); transform: rotateY(180deg); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; box-sizing: border-box;">\n            <h3 style="color: #667eea; margin-bottom: 10px; font-size: 2.5rem;">🌈 Coloration</h3>\n            <p style="color: #666; text-align: center; line-height: 1.3; font-size: 1.8rem;">Warning colors and patterns to signal danger</p>\n        </div>\n    </div>\n</div>\n</div>'

                        },

                        {

                            title: 'Evolution Examples: Finch & Peppered Moth',

                            content: 'Let\'s explore famous examples of evolution in action!\n<div style="display: flex; justify-content: space-around; align-items: flex-start; gap: 40px; margin-top: 20px; flex-wrap: wrap; width: 100%; max-height: 70vh; overflow: visible;">\n<div class="flip-card" onclick="flipAdaptationCard(this)" style="width: 450px; height: 450px; perspective: 1000px; cursor: pointer;">\n    <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s; transform-style: preserve-3d;">\n        <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n            <img src="images/Lesson 9/finch.png" alt="Finch" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">\n        </div>\n        <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: white; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.2); transform: rotateY(180deg); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; box-sizing: border-box;">\n            <h3 style="color: #667eea; margin-bottom: 10px; font-size: 3.5rem;">🐦 Darwin\'s Finches</h3>\n            <p style="color: #666; text-align: center; line-height: 1.4; font-size: 2.2rem;">Different beak shapes evolved for different food sources on different islands</p>\n        </div>\n    </div>\n</div>\n<div class="flip-card" onclick="flipAdaptationCard(this)" style="width: 450px; height: 450px; perspective: 1000px; cursor: pointer;">\n    <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s; transform-style: preserve-3d;">\n        <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n            <img src="images/Lesson 9/pepperedMoth.png" alt="Peppered Moth" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">\n        </div>\n        <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: white; border-radius: 15px; box-shadow: 0 8px 16px rgba(0,0,0,0.2); transform: rotateY(180deg); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; box-sizing: border-box;">\n            <h3 style="color: #667eea; margin-bottom: 10px; font-size: 3.5rem;">🦋 Peppered Moth</h3>\n            <p style="color: #666; text-align: center; line-height: 1.4; font-size: 2.2rem;">Moths changed from light to dark color when pollution darkened tree bark</p>\n        </div>\n    </div>\n</div>\n</div>'

                        },

                        {

                            title: 'Digital Citizenship: Scientific Research Ethics',

                            content: '🔬 When researching evolution, use reliable scientific sources and respect different perspectives. 📚'

                        }

                    ]

                },

                'lesson10': {

                    title: 'Biodiversity and Classification',

                    slides: [

                        {

                            title: '🔥 Warm-up: Biodiversity Puzzle',

                            content: '🦋🐸🐋 Look at these amazing organisms! Can you sort them into groups? What characteristics do you notice?\n<div style="display: flex; justify-content: center; align-items: center; gap: 40px; margin-top: 5px; width: 100%; max-height: 75vh; overflow: visible; flex-wrap: nowrap;">\n<img src="images/Lesson 10/bio1.png" alt="Bio 1" style="width: 350px; height: 350px; object-fit: cover; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n<img src="images/Lesson 10/bio2.png" alt="Bio 2" style="width: 350px; height: 350px; object-fit: cover; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n<img src="images/Lesson 10/bio3.png" alt="Bio 3" style="width: 350px; height: 350px; object-fit: cover; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n</div>'

                        },

                        {

                            title: '🎯 Learning Objectives & Vocabulary',

                            content: 'By the end of this lesson, you will be able to:\n• Understand biodiversity and its importance\n• Learn how scientists classify organisms\n• Explore different classification systems\n• Identify key characteristics of major animal groups',

                            vocabulary: [

                                { term: 'Biodiversity', definition: 'The variety of life in an ecosystem or on Earth' },

                                { term: 'Classification', definition: 'The process of grouping organisms by shared characteristics' },

                                { term: 'Taxonomy', definition: 'The science of naming and classifying organisms' },

                                { term: 'Kingdom', definition: 'The largest group in the classification system' },

                                { term: 'Phylum', definition: 'A major group within a kingdom' },

                                { term: 'Species', definition: 'A group of organisms that can reproduce and produce fertile offspring' }

                            ]

                        },

                        {

                            title: 'Content: Classification Systems',

                            content: 'Scientists classify organisms into groups based on shared characteristics. Let\'s explore three major animal groups!\n<div style="display: flex; justify-content: center; align-items: center; gap: 30px; margin-top: 5px; width: 100%; max-height: 55vh; overflow: visible; flex-wrap: nowrap;">\n<div class="flip-card" onclick="flipAdaptationCard(this)" style="width: 350px; height: 350px; perspective: 1000px; cursor: pointer; flex-shrink: 0; border-radius: 0;">\n    <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s; transform-style: preserve-3d;">\n        <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n            <img src="images/Lesson 10/insects.png" alt="Insects" style="width: 100%; height: 100%; object-fit: cover;">\n        </div>\n        <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: white; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2); transform: rotateY(180deg); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 15px; box-sizing: border-box;">\n            <h3 style="color: #667eea; margin-bottom: 8px; font-size: 2.2rem;">🐛 Insects</h3>\n            <p style="color: #666; text-align: center; line-height: 1.2; font-size: 1.5rem;">Three-part body (head, thorax, abdomen), six legs, and often wings.</p>\n        </div>\n    </div>\n</div>\n<div class="flip-card" onclick="flipAdaptationCard(this)" style="width: 350px; height: 350px; perspective: 1000px; cursor: pointer; flex-shrink: 0; border-radius: 0;">\n    <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s; transform-style: preserve-3d;">\n        <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n            <img src="images/Lesson 10/amphibians.png" alt="Amphibians" style="width: 100%; height: 100%; object-fit: cover;">\n        </div>\n        <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: white; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2); transform: rotateY(180deg); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 15px; box-sizing: border-box;">\n            <h3 style="color: #667eea; margin-bottom: 8px; font-size: 2.2rem;">🐸 Amphibians</h3>\n            <p style="color: #666; text-align: center; line-height: 1.2; font-size: 1.5rem;">Live both on land and water. Start with gills, develop lungs. Have moist skin.</p>\n        </div>\n    </div>\n</div>\n<div class="flip-card" onclick="flipAdaptationCard(this)" style="width: 350px; height: 350px; perspective: 1000px; cursor: pointer; flex-shrink: 0; border-radius: 0;">\n    <div class="flip-card-inner" style="position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.6s; transform-style: preserve-3d;">\n        <div class="flip-card-front" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\n            <img src="images/Lesson 10/marinemammals.png" alt="Marine Mammals" style="width: 100%; height: 100%; object-fit: cover;">\n        </div>\n        <div class="flip-card-back" style="position: absolute; width: 100%; height: 100%; backface-visibility: hidden; background: white; border-radius: 0; box-shadow: 0 8px 16px rgba(0,0,0,0.2); transform: rotateY(180deg); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 15px; box-sizing: border-box;">\n            <h3 style="color: #667eea; margin-bottom: 8px; font-size: 2.2rem;">🐋 Marine Mammals</h3>\n            <p style="color: #666; text-align: center; line-height: 1.2; font-size: 1.5rem;">Breathe air, warm-blooded, give birth to live young, nurse with milk in the ocean.</p>\n        </div>\n    </div>\n</div>\n</div>'

                        },

                        {

                            title: 'Deep Dive: Taxonomic Hierarchy',

                            content: '<img src="images/Lesson 10/hierarchy.png" alt="Taxonomic Hierarchy" style="width: 90%; max-width: 1200px; height: auto; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 8px 16px rgba(0,0,0,0.2);">\nScientists organize living things into groups from biggest to smallest:\n<strong>Kingdom:</strong> The biggest group. All animals are in the Animal Kingdom.\n<strong>Phylum:</strong> Animals with backbones vs. animals without backbones.\n<strong>Class:</strong> Mammals, birds, fish, reptiles, and amphibians.\n<strong>Order:</strong> Like meat-eaters (carnivores) or plant-eaters (herbivores).\n<strong>Family:</strong> All cats, all dogs, all bears.\n<strong>Genus:</strong> Big cats (lions, tigers) vs. small cats (house cats).\n<strong>Species:</strong> The smallest group. Each type of animal is its own species.'

                        },

                        {

                            title: 'Digital Citizenship: Biodiversity Databases',

                            content: '🦋 When researching species in biodiversity databases, follow these guidelines:<div class="interactive-question">How can you research species responsibly?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦋</span>\n    <span class="reveal-question">Use reliable biodiversity databases</span>\n    <span class="reveal-answer">Choose scientific databases and conservation organizations</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔍</span>\n    <span class="reveal-question">Verify information</span>\n    <span class="reveal-answer">Always check facts from multiple reliable sources</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌿</span>\n    <span class="reveal-question">Respect species data</span>\n    <span class="reveal-answer">Use information responsibly for educational purposes</span>\n</div>'

                        }

                    ]

                },

                'lesson11': {

                    title: 'Life Cycles and Reproduction',

                    slides: [

                        {

                            title: 'Warm-up: Life Cycle Sequencing',

                            content: 'Put these life cycle stages in the correct order. What patterns do you notice?',

                            vocabulary: [

                                { term: 'images/Lesson 11/froglet.png', definition: 'Froglet/Juvenile' },

                                { term: 'images/Lesson 11/larvae.png', definition: 'Egg/Spawn' },

                                { term: 'images/Lesson 11/frog.png', definition: 'Adult Frog' },

                                { term: 'images/Lesson 11/tadpole.png', definition: 'Tadpole/Larvae' }

                            ]

                        },

                        {

                            title: 'Learning Objectives',

                            content: 'By the end of this lesson, you will be able to:\n• Compare life cycles across species\n• Understand reproduction strategies\n• Explore growth and development'

                        },

                        {

                            title: 'Vocabulary Cards',

                            content: 'Let\'s learn life cycle vocabulary!',

                            vocabulary: [

                                { term: 'Life Cycle', definition: 'The stages an organism goes through from birth to death' },

                                { term: 'Reproduction', definition: 'The process of creating new organisms' },

                                { term: 'Metamorphosis', definition: 'A dramatic change in body form during development' },

                                { term: 'Development', definition: 'The process of growing and changing' }

                            ]

                        },

                        {

                            title: 'Content: Life Cycle Patterns',

                            content: 'Different organisms have different life cycles. Some go through metamorphosis, others grow gradually.',

                            images: [

                                'images/Lesson 11/starfish.png',

                                'images/Lesson 11/butterfly.png'

                            ]

                        },

                        {

                            title: 'Birth and Reproduction Strategies',

                            content: 'Organisms reproduce in different ways: some lay eggs, others give birth to live young.',

                            images: [

                                'images/Lesson 11/elephantbirth.png',

                                'images/Lesson 11/birdbirth.png'

                            ]

                        },

                        {

                            title: 'Life Cycle Adaptations',

                            content: '🌍 Explore how different life cycle stages help organisms survive!<div class="interactive-question">How do organisms adapt during different life stages?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦋</span>\n    <span class="reveal-question">Migration patterns</span>\n    <span class="reveal-answer">Some butterflies migrate thousands of miles during adult stage</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🍃</span>\n    <span class="reveal-question">Diet changes</span>\n    <span class="reveal-answer">Tadpoles eat plants, adult frogs eat insects</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🏠</span>\n    <span class="reveal-question">Habitat shifts</span>\n    <span class="reveal-answer">Sea turtles hatch on land but live in ocean</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🛡️</span>\n    <span class="reveal-question">Protection strategies</span>\n    <span class="reveal-answer">Caterpillars hide in cocoons, adults fly away from danger</span>\n</div><div class="interactive-question">Think about it: What adaptations help YOU survive at different ages?</div>'

                        },

                        {

                            title: 'Digital Citizenship: Website Credibility',

                            content: 'Keep every life-cycle fact inside your mission journal so you always know where it came from.\nStudent steps:\n1. Paraphrase the fact in your own words (no copy/paste).\n2. Add a snapshot line: Source title + author/organization + date (all provided on this slide).\n3. Mark a ✅ when you confirm the fact with a second clue (diagram, lab data, class reading).\nExample entry:\n• Fact: \"Frogs lay eggs in jelly clusters.\"\n• Snapshot: Source – Portal diagram \"Frog Life Cycle,\" Author – STEM Team, Updated 2024.\n• Double-check: ✅ matches our tadpole photo evidence.\nOnly facts with completed snapshot lines can be used in your CER evidence.'

                        }

                    ]

                },

                'lesson12': {

                    title: 'Design a Creature Lab',

                    slides: [

                        {

                            title: '🎯 Learning Objectives & Vocabulary',

                            content: 'By the end of this 45-MINUTE PARTNER LAB, you will be able to:\n• Apply knowledge of organism structures and adaptations\n• Design a creature perfectly suited to its environment\n• Explain how each adaptation helps survival\n• Present scientific reasoning for design choices\n📚 Key Vocabulary:',

                            vocabulary: [

                                { term: 'Adaptation', definition: 'A trait that helps an organism survive in its environment' },

                                { term: 'Structure', definition: 'A body part or feature of an organism' },

                                { term: 'Function', definition: 'The job or purpose of a structure' },

                                { term: 'Habitat', definition: 'The natural environment where an organism lives' },

                                { term: 'Predator', definition: 'An animal that hunts other animals for food' },

                                { term: 'Prey', definition: 'An animal that is hunted by other animals' }

                            ]

                        },

                        {

                            title: '🧪 Lab Materials (Per Partner Pair)',

                            content: '📦 Materials Provided:\n• Construction paper (assorted colors)\n• Poster board or cardboard (12" x 18")\n• Modeling clay or playdough\n• Pipe cleaners (10-12)\n• Cotton balls, pom-poms, or felt scraps\n• Googly eyes (various sizes)\n• Feathers, yarn, string, or fabric scraps\n• Colored pencils and markers\n• Scissors, glue sticks, tape\n• Lab worksheet\n💡 Optional for habitat background:\n• Natural materials (twigs, leaves, pebbles)\n• Tissue paper for water or grass'

                        },

                        {

                            title: '💡 Design Ideas & Adaptation Examples',

                            content: '🌟 Get inspired! Here are adaptation ideas for different environments:\n🏜️ DESERT - Hot, dry, little water:\n• Water storage (humps, thick skin)\n• Light colors to reflect heat\n• Large ears for cooling\n• Ability to go long periods without water\n🌊 OCEAN - Saltwater, pressure, limited light:\n• Streamlined body for swimming\n• Fins or flippers for movement\n• Gills for breathing underwater\n• Bioluminescence (glowing) for deep water\n❄️ ARCTIC - Cold, ice, snow:\n• Thick fur or blubber for warmth\n• White coloring for camouflage\n• Large paws to walk on snow\n• Small ears to prevent heat loss\n🌳 RAINFOREST - Wet, dense, competitive:\n• Bright colors or camouflage\n• Strong limbs for climbing\n• Large eyes for dim forest floor\n• Waterproof covering\n🌾 GRASSLAND - Open, seasonal, few hiding spots:\n• Long legs for running fast\n• Sharp vision to spot predators\n• Camouflage colors (tan, brown)\n• Ability to survive temperature changes'

                        },

                        {

                            title: '📝 Lab Procedure & Requirements (45 minutes)',

                            content: '🔬 WHAT YOU MUST DO:\n1. **Choose an environment** (Desert, Ocean, Arctic, Rainforest, or Grassland)\n2. **Design your creature with 5 ADAPTATIONS:**\n   • Sensory (eyes, ears, nose)\n   • Movement (legs, wings, fins)\n   • Feeding (mouth, teeth, beak)\n   • Defense (camouflage, armor, speed)\n   • Environmental (fur, scales, feathers)\n3. **Build a 3D model** using provided materials\n4. **Create a simple habitat background** on poster board\n5. **Complete lab worksheet** explaining how each adaptation helps survival\n6. **Give creature a creative name**\n7. **Present to class** (2-3 minutes) explaining adaptations\n⏰ TIME MANAGEMENT:\n• Planning & sketch: 5 minutes\n• Building creature: 25 minutes\n• Habitat background: 8 minutes\n• Lab worksheet: 7 minutes'

                        },

                        {

                            title: '📊 Lab Rubric - 3 Category System (100 points)',

                            content: '🏆 Grading Rubric:\n📋 PROCEDURE & TEAMWORK (30 points):\n• Both partners contribute equally (10 pts)\n• Follows lab steps in order (10 pts)\n• Uses time effectively (5 pts)\n• Cleans up materials properly (5 pts)\n🔬 CREATURE DESIGN & CREATIVITY (40 points):\n• 3D model is creative and detailed (10 pts)\n• Includes 5 clear, visible adaptations (20 pts)\n• Habitat background shows environment (10 pts)\n📝 SCIENTIFIC EXPLANATION (30 points):\n• Explains HOW each adaptation helps survival (15 pts)\n• Uses scientific vocabulary correctly (5 pts)\n• Presentation is clear and organized (5 pts)\n• Connects adaptations to environment (5 pts)\n✨ BONUS POINTS (up to +5):\n• Exceptionally creative creature name (+2)\n• Extra adaptations beyond 5 (+2)\n• Outstanding presentation (+1)'

                        },

                        {

                            title: '🎤 Presentation Guide (2-3 minutes)',

                            content: '📣 When presenting your creature to the class:\n1. **Introduction** - State creature name and environment\n2. **Show Model** - Hold up your creature for class to see\n3. **Explain 5 Adaptations** - Point to each one and explain:\n   • WHAT it is (structure)\n   • HOW it helps survival (function)\n4. **Environmental Connection** - Explain why these adaptations fit the habitat\n5. **Answer Questions** - Be ready for classmate questions\n💡 TIPS:\n• Both partners should speak\n• Use scientific vocabulary\n• Speak clearly and loudly\n• Make eye contact with audience'

                        },

                        {

                            title: '🧹 Cleanup & Submission Checklist',

                            content: '✅ BEFORE YOU LEAVE:\n**Cleanup:**\n• Return unused materials to proper bins\n• Wipe down tables and pick up scraps\n• Throw away trash\n• Wash hands\n**Submission - Turn in ALL of these:**\n• 3D creature model\n• Habitat background on poster board\n• Completed lab worksheet\n• Both partners\' names visible on everything\n**Get teacher approval before leaving station!**\n📸 Optional: Take a photo of your project for your portfolio'

                        }

                    ]

                },

                'lesson13': {

                    title: "Rock Patterns: Evidence of Earth's Past",

                    slides: [

                        {

                            title: '🌅 Warm-up: Reading the Canyon Walls',

                            content: 'Look closely at the canyon layers.\n1. Jot one observation about color, thickness, or tilting.\n2. Next to it, write what that clue tells you about the past environment.\n3. Share your idea with a partner and be ready to report out.',

                            image: 'images/Bundle2/Lesson 13/grand_canyon_layers.png',

                            imageDescription: 'Stratified canyon wall with labeled rock layers.'

                        },

                        {

                            title: '🎯 Objectives & Vocabulary',

                            content: 'By the end of this lesson you will:\n• Identify evidence in rock layers that reveals past environments\n• Describe how earthquakes can disturb rock patterns\n• Support explanations with Claim-Evidence-Reasoning\n📚 Key Vocabulary:',

                            vocabulary: [

                                { term: 'Rock Layer', definition: 'A level of rock that formed during the same time period' },

                                { term: 'Fossil', definition: 'Remains or impressions of organisms preserved in rock' },

                                { term: 'Sediment', definition: 'Small pieces of rock, shell, or organic material' },

                                { term: 'Fault', definition: 'A crack in Earth\'s crust where movement occurs' },

                                { term: 'Relative Age', definition: 'The age of something compared to other things around it' }

                            ]

                        },

                        {

                            title: '🔍 Concept: Reading Rock Stories',

                            content: 'Analyze the canyon cross-section together:\n• Relative age: lowest layer is oldest; each higher layer formed later.\n• Fossil clues: marine shell in an upper layer = ancient ocean covered the area; plant fossils mark land periods.\n• Disturbances: when matching layers do not line up, a fault or uplift moved them—draw arrows to show the shift.',

                            image: 'images/Bundle2/Lesson 13/rock_layers_cross_section.png',

                            imageDescription: 'Cross-section showing fossil evidence and tilted layers.'

                        },

                        {

                            title: '👐 Explore: Clay Earthquake Model',

                            content: 'Show the layered clay model to demonstrate how a fault offsets rock layers:\n• Stack colored “rock” layers, slice with a craft stick, and push the blocks so students can see the offset.\n• Point out how the embedded “fossil” jumps to a new height after the quake.\nStudent job: RECORD\n• Sketch the BEFORE block with aligned layers.\n• Sketch the AFTER block showing the offset and arrows for movement.\n• Label which fossils moved and which side rose or dropped.',

                            image: 'images/Bundle2/Lesson 13/clay_fault_model.png',

                            imageDescription: 'Students pressing layered clay to show movement.',

                            expectedImage: '',

                            extraContent: '<div style="display:flex; justify-content:center; margin-top:20px;"><img src="images/Bundle2/Lesson 13/clay_fault_organizer.png" alt="Clay fault organizer example" style="width:60%; border-radius:15px; box-shadow:0 6px 12px rgba(0,0,0,0.3);"></div>'

                        },

                        {

                            title: '🧠 Guided Practice: Pattern Detective',

                            content: 'Display the two rock diagrams. Discuss:\n• Circle the layer offset by a fault and label the direction of movement.\n• Match each fossil to “ocean” or “land” conditions.\n• Identify any depositional features (e.g., delta, sandbar) and explain the process.',

                            image: 'images/Bundle2/Lesson 13/rock_patterns_compare.png',

                            imageDescription: 'Side-by-side diagrams with labeled layers and fossils.'

                        },

                        {

                            title: '✍️ Application: CER Mini-Task',

                            content: 'Display the evaluate prompt diagram (Layer A–F with fossils).\nStudent task:\n• CLAIM: Decide whether deposition, erosion, or an earthquake changed Layer C.\n• EVIDENCE: Pull TWO concrete clues from the drawing (offset fossils, tilted bed, missing sediment, etc.).\n• REASONING: Explain how each clue proves the process you chose.\nSentence starters (post on slide or board):\n“My claim is that Layer C was changed by _____ because…”.\n“One piece of evidence is _____ which shows…”.\n“This proves my claim because …”.\nFast-finisher: Compare Layer C to any other layer and explain which is older and why.',

                            image: 'images/Bundle2/Lesson 13/rock_layers_cross_section.png',

                            imageDescription: 'Cross-section showing fossil evidence and tilted layers.'

                        },

                        {

                            title: 'Digital Citizenship: Evidence Filter',

                            content: 'Two statements about the canyon are posted below. Use the evidence filter checklist to decide which one belongs in today’s notes.\n<div style=\"margin:15px 0;padding:18px;background:rgba(255,255,255,0.1);border-radius:12px;\">\n<strong>Statement A:</strong> \"Layer C formed on dry land because plant fossils only grow away from water.\"<br>\n<strong>Source line:</strong> Mission Guide Notes, Updated 2024, Author: STEM Team.\n</div>\n<div style=\"margin:0 0 18px 0;padding:18px;background:rgba(255,255,255,0.1);border-radius:12px;\">\n<strong>Statement B:</strong> \"Layer C was created in deep ocean trenches last summer.\"<br>\n<strong>Source line:</strong> Unknown blog commenter, date missing.\n</div>\nEvidence filter:\n1. WHO shared it? (mission guide vs anonymous comment)\n2. WHEN was it updated? (timestamp included?)\n3. WHAT proof is shown? (diagram labels, fossils, data)\nStudent task:\n• Circle the statement that passes all three checks and jot one reason why.\n• Put an X through the other statement and name the red flag you spotted.\n• Record the approved statement in your CER notes with its source line.'

                        },

                        {

                            title: '🚪 Exit Ticket',

                            content: 'Write one piece of evidence that shows an environment changed and identify the process that caused it.'

                        }

                    ]

                },

                'lesson14': {

                    title: 'Rock Patterns Deep Dive',

                    slides: [

                        {

                            title: '🌄 Warm-up: Then and Now',

                            content: 'Project the before/after landscape photos. Pairs:\n• Write three observations about what changed.\n• Next to each observation, name the process that caused it (wind, water, or tectonics).\n• Share one observation-process pair with the class.',

                            image: 'images/Bundle2/Lesson 14/landscape_before_after.png',

                            imageDescription: 'Before and after landscape photos that show erosion, deposition, or uplift.'

                        },

                        {

                            title: '🎯 Objectives & Vocabulary Refresh',

                            content: 'Today we will:\n• Use fossil and rock evidence to explain landscape changes over time\n• Interpret rock layer diagrams and timelines to support claims\n• Prepare evidence for our Rock Patterns mission board\nVocabulary:',

                            vocabulary: [

                                { term: 'Sedimentary Rock', definition: 'Rock formed when sediment is pressed and cemented together' },

                                { term: 'Uplift', definition: 'Upward movement of rock layers' },

                                { term: 'Seismic Wave', definition: 'Energy released during an earthquake' }

                            ]

                        },

                        {

                            title: '🧩 Journal Activity: Four-Quadrant Organizer',
                            content: '📓 <strong>In your science journal, draw a large cross (+) to divide your page into 4 sections.</strong><div style="margin:10px 0;padding:10px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong>Label each section:</strong><br>\n<div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:auto auto;gap:20px;margin-top:10px;">\n<div style="grid-column:1;grid-row:1;background:rgba(102,126,234,0.3);padding:15px;border-radius:8px;border:2px solid #667eea;">\n<strong>1️⃣ CAUSE (Top Left)</strong><br>\nChoose ONE process:<br>\n• Earthquake faulting<br>\n• Wave erosion<br>\n• River deposition\n</div>\n<div style="grid-column:2;grid-row:1;background:rgba(118,75,162,0.3);padding:15px;border-radius:8px;border:2px solid #764ba2;">\n<strong>2️⃣ EVIDENCE (Top Right)</strong><br>\nWhat clues prove it?<br>\n• Draw or describe<br>\n• Examples: offset layers, marine fossils on land, rounded sediments\n</div>\n<div style="grid-column:1;grid-row:2;background:rgba(40,167,69,0.3);padding:15px;border-radius:8px;border:2px solid #28a745;">\n<strong>3️⃣ RESULT (Bottom Left)</strong><br>\nWhat changed?<br>\n• Cliff fractures<br>\n• New delta formed<br>\n• Eroded hillside\n</div>\n<div style="grid-column:2;grid-row:2;background:rgba(220,53,69,0.3);padding:15px;border-radius:8px;border:2px solid #dc3545;">\n<strong>4️⃣ TIME SCALE (Bottom Right)</strong><br>\nHow fast?<br>\n• Mark: RAPID or SLOW<br>\n• Explain WHY you chose that speed\n</div>\n</div>\n</div><div class="interactive-question">Example completed organizer:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">⚡</span>\n    <span class="reveal-question">Earthquake Example</span>\n    <span class="reveal-answer"><strong>Cause:</strong> Earthquake faulting | <strong>Evidence:</strong> Clay layers are offset and don\'t line up | <strong>Result:</strong> Cliff has visible crack and shifted sections | <strong>Time Scale:</strong> RAPID - happens in seconds during earthquake</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌊</span>\n    <span class="reveal-question">Wave Erosion Example</span>\n    <span class="reveal-answer"><strong>Cause:</strong> Wave erosion | <strong>Evidence:</strong> Rounded sediments, carved cliff base | <strong>Result:</strong> Shoreline moved inland, beach formed | <strong>Time Scale:</strong> SLOW - takes hundreds/thousands of years</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🏞️</span>\n    <span class="reveal-question">River Deposition Example</span>\n    <span class="reveal-answer"><strong>Cause:</strong> River deposition | <strong>Evidence:</strong> Fan-shaped sediment pile, sorted by size | <strong>Result:</strong> New delta extends into ocean | <strong>Time Scale:</strong> SLOW - builds up over many years of flooding</span>\n</div>\n<div style="margin-top:25px;padding:15px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;">\n<strong>👥 TURN & TALK:</strong> After completing your organizer, share ONE quadrant with a shoulder partner. Explain your reasoning!\n</div>'
                        },

                        {

                            title: '🎲 Interactive: Fossil Layer Match',

                            content: '<div style="margin:10px 0;text-align:center;">\n<img src="images/Bundle2/Lesson 14/fossil_card_sort_board.png" style="max-width:70%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';">\n<div style="display:none;padding:20px;background:rgba(255,255,255,0.1);border-radius:15px;margin:20px auto;max-width:600px;">\n<div style="font-size:1.8rem;margin-bottom:5px;">📷 Image Placeholder</div>\nExpected: fossil_card_sort_board.png<br>\nShows rock layers with fossil cards for sorting activity\n</div>\n</div>\n<div style="margin-top:20px;background:rgba(255,255,255,0.1);padding:10px;border-radius:10px;">\n<strong style="font-size:1.5rem;">🤔 Discussion Question:</strong><br>\n"What does each fossil tell us about the environment when that layer formed?"\n</div><div class="interactive-question" style="margin-top:10px;">Click to reveal what each fossil tells us:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐚</span>\n    <span class="reveal-question">Marine Shell</span>\n    <span class="reveal-answer">Found in layers covered by sea water → Ancient ocean was here</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌿</span>\n    <span class="reveal-question">Fern Leaf</span>\n    <span class="reveal-answer">Found in layers formed on land with plants → Area was above water with vegetation</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🦈</span>\n    <span class="reveal-question">Shark Tooth</span>\n    <span class="reveal-answer">Found in layers deposited in ocean → Marine environment existed here</span>\n</div>\n<div style="margin-top:20px;padding:15px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;">\n<strong>💭 Think About It:</strong> If you found a marine shell fossil on top of a mountain, what does that tell you about Earth\'s history?\n</div>'
                        },

                        {

                            title: '🔬 Investigation Recap: Earthquake Evidence',

                            content: '<strong>🔙 Let\'s review what we discovered in our previous lesson\'s clay model investigation!</strong><div class="interactive-question" style="margin-top:20px;">What did we observe when we modeled an earthquake?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📐</span>\n    <span class="reveal-question">Layer Offset</span>\n    <span class="reveal-answer">The clay layers that were once lined up became offset and no longer matched across the fault</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐚</span>\n    <span class="reveal-question">Fossil Movement</span>\n    <span class="reveal-answer">The embedded "fossils" between layers shifted and separated from each other</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">⚡</span>\n    <span class="reveal-question">Rapid Change</span>\n    <span class="reveal-answer">The earthquake caused INSTANT change - layers moved in seconds, not millions of years</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔍</span>\n    <span class="reveal-question">Evidence in Nature</span>\n    <span class="reveal-answer">Scientists see this same pattern in real rock formations - proof that earthquakes happened in Earth\'s past</span>\n</div>\n<div style="margin-top:20px;padding:15px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;">\n<strong>💭 Key Takeaway:</strong> When rock layers are offset and don\'t line up, this is evidence that an earthquake occurred. The "BEFORE" shows aligned layers, the "AFTER" shows how earthquakes create visible breaks and shifts!\n</div>',
                            image: 'images/Bundle2/Lesson 14/clay_fault_model.png',
                            imageDescription: 'Clay fault model before/after layers showing earthquake offset (expected file: clay_fault_model.png).'
                        },
                        {
                            title: '📚 How Fossils Tell Earth\'s Story',
                            content: '🔍 Scientists use fossils to understand what environments looked like millions of years ago.<div class="interactive-question" style="margin-bottom:8px;">How did scientists reconstruct the Grand Canyon\'s history?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐚</span>\n    <span class="reveal-question">Marine fossils in upper layers</span>\n    <span class="reveal-answer">Show the area was once covered by an ancient ocean</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌿</span>\n    <span class="reveal-question">Plant fossils in middle layers</span>\n    <span class="reveal-answer">Indicate periods when the land was above water with vegetation</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📏</span>\n    <span class="reveal-question">Layer thickness and position</span>\n    <span class="reveal-answer">Bottom layers are oldest; thicker layers show longer deposition periods</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">⚡</span>\n    <span class="reveal-question">Offset and tilted layers</span>\n    <span class="reveal-answer">Evidence of earthquakes and tectonic movement over time</span>\n</div>\n<div style="margin-top:15px;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong>✍️ COMPARE & WRITE:</strong>\n• <strong>RAPID Change:</strong> Earthquake suddenly shifts rock layers and creates faults<br>\n• <strong>SLOW Change:</strong> Sediment gradually builds up layer by layer over millions of years<br>\n<strong>Discussion:</strong> Which type of change is easier to observe in rock layers? Why?\n</div>'
                        },
                        {
                            title: '📊 Math Connection: Deposition Rate',
                            content: '📈 <strong>Analyze how quickly rock layers formed!</strong><div style="margin:8px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong>Data Table: Rock Layer Formation</strong><br>\n<table style="width:100%;margin-top:10px;border-collapse:collapse;background:rgba(255,255,255,0.9);color:#333;border-radius:8px;overflow:hidden;">\n<tr style="background:#667eea;color:white;"><th style="padding:10px;border:2px solid white;">Layer Thickness (cm)</th><th style="padding:10px;border:2px solid white;">Deposition Time (years)</th></tr>\n<tr><td style="padding:8px;border:2px solid #ddd;text-align:center;">10 cm</td><td style="padding:8px;border:2px solid #ddd;text-align:center;">1,000 years</td></tr>\n<tr style="background:#f8f9fa;"><td style="padding:8px;border:2px solid #ddd;text-align:center;">20 cm</td><td style="padding:8px;border:2px solid #ddd;text-align:center;">2,000 years</td></tr>\n<tr><td style="padding:8px;border:2px solid #ddd;text-align:center;">30 cm</td><td style="padding:8px;border:2px solid #ddd;text-align:center;">3,000 years</td></tr>\n<tr style="background:#f8f9fa;"><td style="padding:8px;border:2px solid #ddd;text-align:center;">40 cm</td><td style="padding:8px;border:2px solid #ddd;text-align:center;">4,000 years</td></tr>\n<tr><td style="padding:8px;border:2px solid #ddd;text-align:center;">50 cm</td><td style="padding:8px;border:2px solid #ddd;text-align:center;">5,000 years</td></tr>\n</table>\n</div><div class="interactive-question" style="margin-top:8px;margin-bottom:8px;">What does the slope of this data tell us?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📈</span>\n    <span class="reveal-question">Steeper slope</span>\n    <span class="reveal-answer">Faster deposition - more sediment in less time</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📉</span>\n    <span class="reveal-question">Gentler slope</span>\n    <span class="reveal-answer">Slower deposition - less sediment over longer time</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🧮</span>\n    <span class="reveal-question">This data\'s pattern</span>\n    <span class="reveal-answer">Constant rate: 10 cm per 1,000 years = 0.01 cm/year (very slow!)</span>\n</div>\n<div style="margin-top:12px;padding:12px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;">\n<strong>💡 Think About It:</strong> If a rock layer is 100 cm thick and formed at this rate, how long did it take to form?\n</div>'
                        },

                        {

                            title: '📝 CER Practice: Highway Cutaway',

                            content: '<strong>🔬 Let\'s practice using evidence to make scientific claims!</strong>\nWhen highway construction crews cut through hills, they reveal layers of rock and fossils. Scientists use these "windows into the past" to understand Earth\'s history.<div style="margin:15px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong>📋 CER Framework:</strong><br>\n• <strong>CLAIM</strong> - Your statement about what you observe<br>\n• <strong>EVIDENCE</strong> - Specific facts and observations that support your claim<br>\n• <strong>REASONING</strong> - Explanation of how the evidence proves your claim\n</div><div class="interactive-question" style=";">Study the highway cutaway diagram - what can we learn about each layer?</div>\n<div style="display:flex;gap:30px;justify-content:center;margin:30px auto;max-width:1600px;flex-wrap:wrap;">\n<div style="flex:1;min-width:650px;">\n<h3 style="text-align:center;font-size:2.2rem;margin-bottom:15px;color:#fff;">Highway Cutaway</h3>\n<img src="images/Bundle2/Lesson 14/highway_cutaway.png" style="width:100%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.4);" alt="Highway Cutaway">\n</div>\n<div style="flex:1;min-width:650px;">\n<h3 style="text-align:center;font-size:2.2rem;margin-bottom:15px;color:#fff;">What Each Layer Tells Us</h3>\n<img src="images/Bundle2/Lesson 14/highway_cutaway_answers.png" style="width:100%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.4);" alt="Highway Cutaway Answers">\n</div>\n</div>\n<div style="margin-top:20px;background:rgba(255,255,255,0.1);padding:10px;border-radius:10px;max-width:1200px;margin-left:auto;margin-right:auto;">\n<strong style="font-size:1.8rem;">🤔 Example CER Analysis:</strong><br><div style="margin:12px 0;padding:15px;background:rgba(0,212,170,0.2);border-radius:8px;">\n<strong style="color:#00d4aa;font-size:2.2rem;">CLAIM:</strong><br>\n<span style="font-size:1.9rem;">Layer C formed in a shallow ocean environment.</span>\n</div><div style="margin:12px 0;padding:15px;background:rgba(255,193,7,0.2);border-radius:8px;">\n<strong style="color:#ffc107;font-size:2.2rem;">EVIDENCE:</strong><br>\n<span style="font-size:1.9rem;">\n• Marine shell fossils present<br>\n• Fine-grained sediment (deposited slowly in calm water)<br>\n• Layer positioned between deeper ocean layer below and land layer above\n</span>\n</div><div style="margin:12px 0;padding:15px;background:rgba(255,107,53,0.2);border-radius:8px;">\n<strong style="color:#ff6b35;font-size:2.2rem;">REASONING:</strong><br>\n<span style="font-size:1.9rem;">Marine shells only live in ocean water. The fine sediment shows calm, shallow conditions. The layer\'s position indicates sea levels were rising, covering previously dry land.</span>\n</div>\n</div>\n<div style="margin-top:15px;padding:15px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;">\n<strong>✍️ Your Turn:</strong> Choose a different layer (A, B, D, E, or F) and write your own CER statement about what environment existed when that layer formed!\n</div>'
                        },

                        {

                            title: '💻 Digital Citizenship: Credit the Creator',
                            content: '<strong>🌐 Why is giving credit important?</strong>\nWhen we use someone else\'s work, we must give them credit! This shows respect for their time, effort, and creativity. It\'s also the LAW - using someone\'s work without permission or credit is stealing.<div style="margin:20px 0;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong style="font-size:1.8rem;">📋 DC.LAW Rule: CREDIT THE CREATOR</strong><br>\nAlways cite (give credit to) the person who created the work you\'re using.\n</div><div class="interactive-question" style=";">What types of work need to be credited?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📝</span>\n    <span class="reveal-question">Written Words</span>\n    <span class="reveal-answer">Books, articles, blog posts, quotes - always credit the author!</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📸</span>\n    <span class="reveal-question">Photos & Images</span>\n    <span class="reveal-answer">Photographs, illustrations, diagrams - credit the photographer or artist</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🎵</span>\n    <span class="reveal-question">Music & Songs</span>\n    <span class="reveal-answer">Songs, beats, instrumental tracks - credit the musician or composer</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🎥</span>\n    <span class="reveal-question">Videos</span>\n    <span class="reveal-answer">YouTube videos, movie clips, documentaries - credit the creator or production company</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">💡</span>\n    <span class="reveal-question">Ideas & Research</span>\n    <span class="reveal-answer">Scientific discoveries, theories, data - credit the researcher or scientist</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🎨</span>\n    <span class="reveal-question">Artwork & Designs</span>\n    <span class="reveal-answer">Paintings, drawings, logos, graphics - credit the artist or designer</span>\n</div>\n<div style="margin-top:20px;padding:10px;background:rgba(102,126,234,0.2);border-radius:10px;">\n<strong style="font-size:2.2rem;">✅ How to Give Credit:</strong><br>\n<strong>1. Name the Creator</strong> - Who made it?<br>\n<strong>2. Title of the Work</strong> - What is it called?<br>\n<strong>3. Source</strong> - Where did you find it? (Website, book, etc.)<br>\n<strong>4. Date</strong> - When was it created or published?<br>\n<strong>Example:</strong><br>\n<em>"Grand Canyon Layers" photograph by Jane Smith, National Geographic, 2020</em>\n</div>\n<div style="margin-top:15px;padding:15px;background:rgba(220,53,69,0.2);border-left:4px solid #dc3545;border-radius:5px;">\n<strong>⚠️ Remember:</strong> Using someone\'s work without giving credit is called PLAGIARISM - it\'s dishonest and against the rules in school, college, and professional life!\n</div>\n<div style="margin-top:15px;padding:15px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;">\n<strong>🎯 Practice:</strong> Think of something you used or shared recently (a meme, video, quote, image). Who created it? How would you give them proper credit?\n</div>'
                        },

                        {

                            title: '🚪 Exit Ticket',

                            content: 'Answer: “How could a scientist prove that Layer B is older than Layer D?” Include two pieces of evidence.'

                        }

                    ]

                },

                'lesson15': {

                    title: 'Changing Land: Weathering & Erosion',

                    slides: [

                        {

                            title: '🌊 Warm-up: Sugar Cube Challenge',

                            content: '<div style="margin:8px 0;padding:15px;background:rgba(255,193,7,0.2);border-radius:10px;text-align:center;"><strong style="font-size:2.2rem;">🤔 Look at the image below. What do you notice?</strong><br>What differences do you see between the LEFT and RIGHT methods?<br><strong style="font-size:1.9rem;color:#764ba2;">🌍 How does this connect to ROCKS?</strong></div><div style="margin:8px 0;text-align:center;"><img src="images/Bundle2/Lesson 15/sugar_cube_weathering.png" style="max-width:45%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';"><div style="display:none;padding:10px;background:rgba(255,255,255,0.1);border-radius:15px;margin:10px auto;max-width:400px;font-size:1.5rem;">📷 sugar_cube_weathering.png</div></div><div style="margin:8px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.9rem;">🧪 The Challenge:</strong> TWO ways to break down a sugar cube:<br><strong>LEFT - Chemical Weathering:</strong> Water dripping slowly dissolves it<br><strong>RIGHT - Mechanical Weathering:</strong> Physical force crushes it<br><strong style="color:#ffc107;">❓ Which method do YOU think works FASTER?</strong></div><div class="interactive-question" style="margin:8px 0 5px 0 !important;">💭 Turn & Talk: Share your prediction with a partner</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">💧</span><span class="reveal-question">Chemical Method (Slow)</span><span class="reveal-answer">Water gradually dissolves sugar molecule by molecule - takes TIME but thoroughly breaks it down</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">💥</span><span class="reveal-question">Mechanical Method (Fast)</span><span class="reveal-answer">Physical force INSTANTLY breaks the cube into chunks - quick but pieces remain large</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌍</span><span class="reveal-question">Real-World Connection</span><span class="reveal-answer">ROCKS break down the SAME way! Rain/acids dissolve them slowly (chemical), while earthquakes/ice wedging crack them fast (mechanical)</span></div><div style="margin-top:10px;padding:12px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;"><strong>✍️ In your journal:</strong> Predict which method is faster and explain WHY using evidence from the image!</div>'
                        },

                        {

                            title: '🎯 Objectives & Vocabulary',

                            content: '📚 <strong>Today we will:</strong><div style="margin:20px 0;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;line-height:1.8;">✓ Compare weathering and erosion<br>✓ Identify agents that reshape landforms<br>✓ Understand how fast vs. slow changes shape Earth\'s surface<br>✓ Plan investigations to test erosion factors</div><strong style="font-size:2.2rem;">📖 Key Vocabulary:</strong>',
                            vocabulary: [

                                { term: 'Weathering', definition: 'Breaking down rocks into smaller pieces without moving them' },
                                { term: 'Erosion', definition: 'Moving weathered rock from one place to another' },
                                { term: 'Deposition', definition: 'When sediment drops and settles in a new location' },
                                { term: 'Agent', definition: 'A force that causes weathering or erosion (water, wind, ice, gravity)' },
                                { term: 'Sediment', definition: 'Small pieces of rock, soil, and sand' }
                            ]
                        },
                        {
                            title: '🔍 Concept: Weathering vs. Erosion',
                            content: '<div style="margin:0 0 8px 0 !important;padding:15px;background:rgba(102,126,234,0.2);border-radius:10px;"><div style="margin-bottom:8px;"><strong style="font-size:2.2rem;">WEATHERING</strong> = Breaking Down (In Place)</div><div style="margin-bottom:8px;"><strong style="font-size:2.2rem;">EROSION</strong> = Moving Away</div><div><strong style="font-size:2.2rem;">DEPOSITION</strong> = Dropping Off</div></div><div class="interactive-question" style="margin:8px 0 5px 0 !important;">Real-World Examples:</div><div class="reveal-item" onclick="revealAnswer(this)" style="margin:5px 0 !important;"><span class="reveal-emoji">🪨</span><span class="reveal-question">Weathering Example 1</span><span class="reveal-answer">A rock on a mountain cracks when water freezes inside it and expands - the rock breaks but STAYS in the same spot</span></div><div class="reveal-item" onclick="revealAnswer(this)" style="margin:5px 0 !important;"><span class="reveal-emoji">🌿</span><span class="reveal-question">Weathering Example 2</span><span class="reveal-answer">Tree roots grow into cracks in a sidewalk and break the concrete apart - the pieces don\'t move yet</span></div><div class="reveal-item" onclick="revealAnswer(this)" style="margin:5px 0 !important;"><span class="reveal-emoji">🌊</span><span class="reveal-question">Erosion Example 1</span><span class="reveal-answer">A river carries broken rock pieces downstream, moving them miles away from where they started</span></div><div class="reveal-item" onclick="revealAnswer(this)" style="margin:5px 0 !important;"><span class="reveal-emoji">💨</span><span class="reveal-question">Erosion Example 2</span><span class="reveal-answer">Wind picks up sand from one side of the beach and blows it to create sand dunes on the other side</span></div><div class="reveal-item" onclick="revealAnswer(this)" style="margin:5px 0 !important;"><span class="reveal-emoji">🏖️</span><span class="reveal-question">Deposition Example 1</span><span class="reveal-answer">A river slows down as it enters the ocean, dropping sediment to form a DELTA (like the Mississippi River Delta)</span></div><div class="reveal-item" onclick="revealAnswer(this)" style="margin:5px 0 !important;"><span class="reveal-emoji">🏔️</span><span class="reveal-question">Deposition Example 2</span><span class="reveal-answer">Wind carrying sand loses speed at the base of a hill and drops the sand, building up a sand dune over time</span></div><div style="margin-top:8px !important;padding:12px;background:rgba(40,167,69,0.2);border-radius:5px;"><strong>🔑 Remember:</strong> Weathering → Erosion → Deposition is a THREE-STEP process! First rocks BREAK, then pieces MOVE, then they DROP in a new place.</div>'
                        },
                        {
                            title: '🌬️ Agents of Change: What Causes Weathering & Erosion?',
                            content: '<div style="margin:8px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.9rem;">🔬 Five forces that change Earth\'s surface:</strong></div><div class="reveal-item" onclick="revealAnswer(this)" style="margin-top:8px;"><span class="reveal-emoji">💧</span><span class="reveal-question">WATER (Most Powerful!)</span><span class="reveal-answer">Rivers carve canyons, waves create beaches, rain washes away soil, ice cracks rocks</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌪️</span><span class="reveal-question">WIND (Desert Sculptor)</span><span class="reveal-answer">Sandblasts rocks smooth, builds sand dunes, creates arches and hoodoos</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🧊</span><span class="reveal-question">ICE (Slow but Mighty)</span><span class="reveal-answer">Glaciers carve valleys, freeze-thaw breaks rocks, carries huge boulders</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌳</span><span class="reveal-question">LIVING THINGS (Life Changes Land)</span><span class="reveal-answer">Plant roots crack rocks, animals dig and move soil, humans farm and build</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">⬇️</span><span class="reveal-question">GRAVITY (Downhill Force)</span><span class="reveal-answer">Pulls everything downward - causes landslides, rockfalls, and mudslides</span></div><div style="margin-top:10px;padding:12px;background:rgba(255,193,7,0.2);border-radius:10px;"><strong style="font-size:1.8rem;">💡 Important:</strong> Multiple agents usually work TOGETHER!<br><strong>Example:</strong> Rain loosens soil → Gravity pulls it down → River carries it away → Deposits as delta<br>This is how the Grand Canyon formed!</div>'
                        },
                        {
                            title: '⚡ Rapid vs. Slow Changes',
                            content: '<div style="margin:8px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.9rem;">⏰ Some changes are RAPID (fast)</strong><br><strong style="font-size:1.9rem;">🐌 Some changes are SLOW (gradual)</strong></div><div class="reveal-item" onclick="revealAnswer(this)" style="margin-top:8px;"><span class="reveal-emoji">⚡</span><span class="reveal-question">RAPID: Landslide</span><span class="reveal-answer">Hillside collapses in MINUTES after heavy rain</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🐌</span><span class="reveal-question">SLOW: Grand Canyon</span><span class="reveal-answer">Carved over 6 MILLION YEARS by the Colorado River</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">⚡</span><span class="reveal-question">RAPID: Flash Flood</span><span class="reveal-answer">Storm washes away beaches in HOURS</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🐌</span><span class="reveal-question">SLOW: Cave Formation</span><span class="reveal-answer">Water dissolves limestone over THOUSANDS of years</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">⚡</span><span class="reveal-question">RAPID: Hurricane Erosion</span><span class="reveal-answer">Waves erase 50 feet of beach in ONE NIGHT</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🐌</span><span class="reveal-question">SLOW: Mountain Weathering</span><span class="reveal-answer">Mountains wear down over MILLIONS of years</span></div><div style="margin-top:10px;padding:12px;background:rgba(220,53,69,0.2);border-radius:10px;"><strong>⚠️ Key Point:</strong> SLOW changes can create BIGGER results! The Grand Canyon is a MILE deep!</div><div style="margin-top:8px;padding:12px;background:rgba(40,167,69,0.2);border-radius:10px;"><strong>👥 TURN & TALK:</strong> What weathering or erosion have you seen in YOUR neighborhood? Fast or slow?</div>'
                        },
                        {
                            title: '📊 Math Connection: Erosion Rate',
                            content: '<div style="margin:8px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.8rem;">📈 Data Table: Rushing Water Experiment</strong><table style="width:100%;margin-top:8px;border-collapse:collapse;background:rgba(255,255,255,0.9);color:#333;border-radius:8px;overflow:hidden;"><tr style="background:#667eea;color:white;"><th style="padding:8px;border:2px solid white;font-size:2.2rem;">Slope Angle</th><th style="padding:8px;border:2px solid white;font-size:2.2rem;">Sediment Moved (grams)</th></tr><tr><td style="padding:6px;border:2px solid #ddd;text-align:center;font-size:1.5rem;">0° (Flat)</td><td style="padding:6px;border:2px solid #ddd;text-align:center;font-size:1.5rem;">2 grams</td></tr><tr style="background:#f8f9fa;"><td style="padding:6px;border:2px solid #ddd;text-align:center;font-size:1.5rem;">15° (Gentle)</td><td style="padding:6px;border:2px solid #ddd;text-align:center;font-size:1.5rem;">8 grams</td></tr><tr><td style="padding:6px;border:2px solid #ddd;text-align:center;font-size:1.5rem;">30° (Moderate)</td><td style="padding:6px;border:2px solid #ddd;text-align:center;font-size:1.5rem;">18 grams</td></tr><tr style="background:#f8f9fa;"><td style="padding:6px;border:2px solid #ddd;text-align:center;font-size:1.5rem;">45° (Steep)</td><td style="padding:6px;border:2px solid #ddd;text-align:center;font-size:1.5rem;">35 grams</td></tr></table></div><div class="interactive-question" style="margin-top:8px;margin-bottom:5px;">What patterns do you notice?</div><div class="reveal-item" onclick="revealAnswer(this)" style="margin-top:5px;"><span class="reveal-emoji">📈</span><span class="reveal-question">Pattern 1: As slope increases...</span><span class="reveal-answer">More sediment is moved! Steeper slopes = MORE erosion</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">⚡</span><span class="reveal-question">Pattern 2: Water speed</span><span class="reveal-answer">Water flows FASTER down steep slopes, giving it more energy to pick up and carry sediment</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🏔️</span><span class="reveal-question">Real-World Connection</span><span class="reveal-answer">This is why mountains erode faster than plains - steeper slopes mean faster water and more erosion!</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🧮</span><span class="reveal-question">Math Challenge</span><span class="reveal-answer">If we increased the slope to 60°, predict how much sediment would move. (Hint: The pattern shows doubling!)</span></div><div style="margin-top:8px;padding:10px;background:rgba(40,167,69,0.2);border-radius:5px;"><strong>💡 Engineering Connection:</strong> Civil engineers use this data to design roads, driveways, and drainage systems. They must prevent erosion by controlling slope angles and adding barriers!</div>'
                        },
                        {
                            title: '🗂️ Interactive: Sort the Processes',
                            content: '<div style="margin:8px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.8rem;">🎯 What process is each example?</strong></div><div class="reveal-item" onclick="revealAnswer(this)" style="margin-top:8px;"><span class="reveal-emoji">🪨</span><span class="reveal-question">Ice cracks a rock</span><span class="reveal-answer">WEATHERING - Breaks apart but stays in place</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌿</span><span class="reveal-question">Tree roots break sidewalk</span><span class="reveal-answer">WEATHERING - Breaking but not moving yet</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌊</span><span class="reveal-question">River carries sand downstream</span><span class="reveal-answer">EROSION - Sediment is being MOVED</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">💨</span><span class="reveal-question">Wind blows dust across field</span><span class="reveal-answer">EROSION - Soil is being TRANSPORTED</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🏖️</span><span class="reveal-question">Sand piles up forming delta</span><span class="reveal-answer">DEPOSITION - Sediment is DROPPED in new place</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🏜️</span><span class="reveal-question">Sand drops and builds dune</span><span class="reveal-answer">DEPOSITION - Wind slows and DEPOSITS sand</span></div><div style="margin-top:10px;padding:12px;background:rgba(255,193,7,0.2);border-radius:10px;"><strong>✍️ Journal Task:</strong> Create a 3-column chart: WEATHERING, EROSION, DEPOSITION. Write TWO examples of your own for each!</div>'
                        },
                        {
                            title: '💻 Digital Citizenship: Location Clues & Privacy',
                            content: '<div style="margin:8px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;text-align:center;"><strong style="font-size:1.9rem;">🗺️ Hide the map in your media!</strong></div><div style="margin:8px 0;padding:15px;background:rgba(102,126,234,0.2);border-radius:10px;"><strong>Why?</strong> Lab photos can leak where you live or go to school if location clues stay in the picture.</div><div class="reveal-item" onclick="revealAnswer(this)" style="margin-top:8px;"><span class="reveal-emoji">📍</span><span class="reveal-question">Turn off geo tags</span><span class="reveal-answer">Disable location services before snapping erosion experiments so GPS data is never attached</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">✂️</span><span class="reveal-question">Crop clues</span><span class="reveal-answer">Trim out street signs, school logos, name tags, or class schedules before posting</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🕶️</span><span class="reveal-question">Use code names</span><span class="reveal-answer">Label teams as \"Slope Squad\" or \"Delta Detectives\" instead of real names when sharing results</span></div><div style="margin-top:10px;padding:12px;background:rgba(40,167,69,0.2);border-radius:10px;"><strong>Quick check:</strong> Point to each sample photo on the slide—thumbs up if it\'s safe to post, thumbs down if a location clue needs to be hidden.</div>'
                        },

                        {

                            title: '🚪 Exit Ticket',

                            content: '<div style="margin:8px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;text-align:center;"><strong style="font-size:1.9rem;">📝 Quick Check: Answer at your desk!</strong></div><div style="margin:8px 0;padding:15px;background:rgba(102,126,234,0.2);border-radius:10px;"><strong style="font-size:1.7rem;">1. What is the difference between WEATHERING and EROSION?</strong></div><div style="margin:8px 0;padding:15px;background:rgba(118,75,162,0.2);border-radius:10px;"><strong style="font-size:1.7rem;">2. Name TWO agents that cause weathering or erosion.</strong></div><div style="margin:8px 0;padding:15px;background:rgba(220,53,69,0.2);border-radius:10px;"><strong style="font-size:1.7rem;">3. Which happens FASTER: a landslide or the Grand Canyon forming? Why?</strong></div><div style="margin:8px 0;padding:15px;background:rgba(255,193,7,0.2);border-radius:10px;"><strong style="font-size:1.7rem;">4. VOCABULARY: What is DEPOSITION?</strong></div><div style="margin-top:12px;padding:12px;background:rgba(40,167,69,0.2);border-radius:10px;"><strong>🎉 Coming Up Next:</strong> Lesson 16 - Lab experiments with waves, wind, and slopes!</div>'
                        }

                    ]

                },

                'lesson16': {

                    title: 'Changing Land Investigation Lab',

                    slides: [

                        {

                            title: '🧪 Warm-up: Lab Day!',
                            content: '<div style="margin:8px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;text-align:center;"><strong style="font-size:1.9rem;">🔬 Today: Test how forces change Earth\'s surface!</strong></div><div style="margin:8px 0;padding:12px;background:rgba(220,53,69,0.2);border-radius:8px;"><strong style="font-size:1.7rem;">⚠️ Safety Rules:</strong><br>• Goggles on at ALL times<br>• Keep water in trays<br>• Clean spills right away<br>• Stay at your station</div><div style="margin:8px 0;padding:12px;background:rgba(102,126,234,0.2);border-radius:8px;"><strong style="font-size:1.7rem;">👥 Team Roles (rotate each station):</strong><br><strong>🔧 Engineer:</strong> Builds & runs test<br><strong>⏱️ Timer:</strong> Tracks time<br><strong>📝 Recorder:</strong> Writes data<br><strong>🧹 Manager:</strong> Leads cleanup</div><div style="margin-top:8px;padding:10px;background:rgba(40,167,69,0.2);border-radius:5px;"><strong>💭 Prediction:</strong> Which will cause MORE erosion: waves, wind, or steep slopes? Write your guess!</div>'
                        },

                        {

                            title: '🎯 Learning Objectives & Vocabulary',
                            content: '<div style="margin:8px 0;padding:12px;background:rgba(102,126,234,0.2);border-radius:8px;line-height:1.8;"><strong style="font-size:1.8rem;">📋 Today We Will:</strong><br>• Test how waves, wind, and slope affect erosion<br>• Collect and record scientific data<br>• Analyze which factors cause fastest land changes<br>• Recommend ways to slow erosion</div>',
                            vocabulary: [

                                { term: 'Slope', definition: 'The steepness or angle of a surface' },
                                { term: 'Variable', definition: 'A factor that changes in an experiment' },
                                { term: 'Runoff', definition: 'Water that flows over land instead of soaking in' },
                                { term: 'Rate', definition: 'How fast something happens' },
                                { term: 'Evidence', definition: 'Scientific observations that support a claim' }
                            ]
                        },
                        {
                            title: '🌊 Station 1: Wave Erosion',
                            content: '<strong>🌊 How do waves change a coastline?</strong><div style="margin:8px 0;text-align:center;">\n<img src="images/Bundle2/Lesson 16/wave_station_setup.png" style="max-width:80%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';">\n<div style="display:none;padding:20px;background:rgba(255,255,255,0.1);border-radius:15px;margin:20px auto;max-width:600px;">\n<div style="font-size:1.8rem;margin-bottom:5px;">📷 Wave Station Setup</div>\nExpected file: wave_station_setup.png<br>\nShows tray with sand beach and water waves\n</div>\n</div><div style="margin:5px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong style="font-size:2.2rem;">📋 Procedure:</strong><br>\n<strong>1.</strong> Build a "beach" - pack sand to make a gentle slope in one end of tray<br>\n<strong>2.</strong> Pour water carefully into the other end (about 2 cm deep)<br>\n<strong>3.</strong> Use your hand to create 10 gentle waves toward the beach<br>\n<strong>4.</strong> Observe: What happens to the sand?<br>\n<strong>5.</strong> Create 10 MORE waves (stronger this time)<br>\n<strong>6.</strong> Measure how far the beach moved back\n</div><div style="margin:5px 0;padding:12px;background:rgba(255,193,7,0.2);border-radius:10px;">\n<strong style="font-size:2.2rem;">📝 Record in Your Journal:</strong><br>\n• Draw "before" and "after" sketches<br>\n• How many cm did the beach erode?<br>\n• Where did the sand go?<br>\n• What would happen with BIGGER waves?\n</div>\n<div style="margin-top:5px;padding:10px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;">\n<strong>💡 Real World:</strong> This is exactly what happens on ocean coastlines during storms! Over time, waves reshape beaches and cliffs.\n</div>',
                            image: 'images/Bundle2/Lesson 16/wave_station_setup.png',
                            imageDescription: 'Tray with sand beach model and water for wave erosion testing'
                        },
                        {
                            title: '💨 Station 2: Wind & Weathering',
                            content: '<strong>💨 Can wind move Earth materials?</strong><div style="margin:8px 0;text-align:center;">\n<img src="images/Bundle2/Lesson 16/wind_station_setup.png" style="max-width:80%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';">\n<div style="display:none;padding:20px;background:rgba(255,255,255,0.1);border-radius:15px;margin:20px auto;max-width:600px;">\n<div style="font-size:1.8rem;margin-bottom:5px;">📷 Wind Station Setup</div>\nExpected file: wind_station_setup.png<br>\nShows materials in trays with fan for wind simulation\n</div>\n</div><div style="margin:5px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong style="font-size:2.2rem;">📋 Procedure:</strong><br>\n<strong>Part A - Size Matters:</strong><br>\n1. Place three small piles in separate areas: fine sand, pebbles, larger rocks<br>\n2. Use fan on LOW setting - aim at each pile for 10 seconds<br>\n3. Observe: Which materials moved? Which stayed?<br>\n4. Try fan on HIGH - what changes?<br>\n<strong>Part B - Protection Test:</strong><br>\n1. Make two identical sand piles side by side<br>\n2. Place small "trees" (twigs) around ONE pile<br>\n3. Blow fan at both for 20 seconds<br>\n4. Compare: Which pile eroded more?\n</div><div style="margin:5px 0;padding:12px;background:rgba(255,193,7,0.2);border-radius:10px;">\n<strong style="font-size:2.2rem;">📝 Record in Your Journal:</strong><br>\n• Which size particles moved easiest?<br>\n• How far did sand travel compared to pebbles?<br>\n• Did the "trees" protect the soil? How?<br>\n• Draw what the wind-blown area looks like\n</div>\n<div style="margin-top:5px;padding:10px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;">\n<strong>💡 Real World:</strong> Wind creates sand dunes and dust storms! Farmers plant trees as "windbreaks" to protect their soil, just like your model.\n</div>',
                            image: 'images/Bundle2/Lesson 16/wind_station_setup.png',
                            imageDescription: 'Materials in trays with fan for testing wind erosion'
                        },
                        {
                            title: '🏔️ Station 3: Slope & Water Flow',
                            content: '<strong>🏔️ Does slope steepness affect erosion?</strong><div style="margin:8px 0;text-align:center;">\n<img src="images/Bundle2/Lesson 16/slope_station_setup.png" style="max-width:80%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';">\n<div style="display:none;padding:20px;background:rgba(255,255,255,0.1);border-radius:15px;margin:20px auto;max-width:600px;">\n<div style="font-size:1.8rem;margin-bottom:5px;">📷 Slope Station Setup</div>\nExpected file: slope_station_setup.png<br>\nShows elevated trays at different angles with collection cups\n</div>\n</div><div style="margin:5px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong style="font-size:2.2rem;">📋 Procedure:</strong><br>\n<strong>Test 1 - Gentle Slope (15°):</strong><br>\n1. Fill tray with loose soil/sand mix<br>\n2. Prop up one end with 1 book (gentle slope)<br>\n3. Place cup at bottom to catch sediment<br>\n4. Pour 200 mL water slowly from top<br>\n5. Measure sediment collected in cup<br>\n<strong>Test 2 - Steep Slope (45°):</strong><br>\n1. Refill tray with same amount of soil<br>\n2. Prop up with 3 books (steep slope)<br>\n3. Pour same amount of water<br>\n4. Measure sediment collected<br>\n5. Compare the results!\n</div><div style="margin:5px 0;padding:12px;background:rgba(255,193,7,0.2);border-radius:10px;">\n<strong style="font-size:2.2rem;">📝 Record in Your Journal:</strong><br>\n<table style="width:100%;background:rgba(255,255,255,0.9);color:#333;border-radius:8px;border-collapse:collapse;">\n<tr style="background:#667eea;color:white;"><th style="padding:10px;">Slope Angle</th><th style="padding:10px;">Sediment (spoons)</th><th style="padding:10px;">Observations</th></tr>\n<tr><td style="padding:8px;border:2px solid #ddd;">15° (gentle)</td><td style="padding:8px;border:2px solid #ddd;">_______</td><td style="padding:8px;border:2px solid #ddd;">_____________</td></tr>\n<tr style="background:#f8f9fa;"><td style="padding:8px;border:2px solid #ddd;">45° (steep)</td><td style="padding:8px;border:2px solid #ddd;">_______</td><td style="padding:8px;border:2px solid #ddd;">_____________</td></tr>\n</table>\n</div>\n<div style="margin-top:5px;padding:10px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;">\n<strong>💡 Real World:</strong> Steep hillsides lose soil much faster than gentle slopes! This is why landslides happen on mountains after heavy rain.\n</div>',
                            image: 'images/Bundle2/Lesson 16/slope_station_setup.png',
                            imageDescription: 'Elevated trays at different angles with collection cups for slope testing'
                        },
                        {
                            title: '🔍 Station 4: Filtering & Water Flow',
                            content: '<strong>🔍 How do different sized particles affect water flow?</strong><div style="margin:8px 0;text-align:center;">\n<img src="images/Bundle2/Lesson 16/filter_station_setup.png" style="max-width:80%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';">\n<div style="display:none;padding:20px;background:rgba(255,255,255,0.1);border-radius:15px;margin:20px auto;max-width:600px;">\n<div style="font-size:1.8rem;margin-bottom:5px;">📷 Filter Station Setup</div>\nExpected file: filter_station_setup.png<br>\nShows coffee filter in stand with materials for testing\n</div>\n</div><div style="margin:5px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong style="font-size:2.2rem;">📋 Procedure:</strong><br>\n<strong>Test 1 - Sand:</strong><br>\n1. Place coffee filter in the stand<br>\n2. Put sand in the filter<br>\n3. Pour water slowly and observe the flow<br>\n4. Record: How fast does water pass through?<br>\n<strong>Test 2 - Little Rocks:</strong><br>\n1. Empty and replace filter<br>\n2. Put little rocks in the filter<br>\n3. Pour water slowly and observe<br>\n4. Record: What happens to the water flow?<br>\n<strong>Test 3 - Bigger Rocks:</strong><br>\n1. Empty and replace filter<br>\n2. Put bigger rocks in the filter<br>\n3. Pour water slowly and observe<br>\n4. Record: Compare to sand and little rocks\n</div><div style="margin:5px 0;padding:12px;background:rgba(255,193,7,0.2);border-radius:10px;">\n<strong style="font-size:2.2rem;">📝 Record in Your Journal:</strong><br>\n• Which material let water flow fastest?<br>\n• Which material slowed water the most?<br>\n• Draw what you observed in each test<br>\n• Why do you think particle size affects water flow?\n</div>\n<div style="margin-top:5px;padding:10px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;">\n<strong>💡 Real World:</strong> This is how water filters work! Smaller particles create barriers that slow water, while larger particles let water flow through faster. This is why we use different sized materials in water treatment systems.\n</div>',
                            image: 'images/Bundle2/Lesson 16/filter_station_setup.png',
                            imageDescription: 'Coffee filter in stand with materials for filtering test'
                        },
                        {
                            title: '🛡️ Erosion Solutions: How Can We Slow It Down?',
                            content: '<strong>🌍 Based on our tests, how can we protect Earth\'s surface?</strong><div class="interactive-question" style=";">What are effective erosion prevention methods?</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌳</span>\n    <span class="reveal-question">Plant Vegetation</span>\n    <span class="reveal-answer">Tree and plant roots anchor soil, slow water flow, and block wind - our "windbreak" test proved this!</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📐</span>\n    <span class="reveal-question">Create Terraces</span>\n    <span class="reveal-answer">Cut steep slopes into steps (terraces) to reduce angle and slow runoff</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🪨</span>\n    <span class="reveal-question">Add Rocks/Barriers</span>\n    <span class="reveal-answer">Place large rocks or barriers to break up wave action or water flow</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌾</span>\n    <span class="reveal-question">Use Mulch/Ground Cover</span>\n    <span class="reveal-answer">Cover bare soil with mulch, leaves, or low plants to protect from direct rain and wind</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🏗️</span>\n    <span class="reveal-question">Build Retaining Walls</span>\n    <span class="reveal-answer">Strong walls hold soil in place on very steep areas</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">💧</span>\n    <span class="reveal-question">Control Water Flow</span>\n    <span class="reveal-answer">Use drainage ditches to direct water away from vulnerable areas</span>\n</div><div style="margin:10px 0;padding:10px;background:rgba(40,167,69,0.2);border-radius:10px;">\n<strong style="font-size:1.8rem;">🏞️ Apply to Our Mining Mission:</strong><br>\nThe coal mine will be on a hillside near a river. Based on today\'s lab:<br>\n<strong>1. What erosion risks does this location face?</strong><br>\n• Steep slopes = rapid runoff during storms<br>\n• River nearby = potential flooding and sediment transport<br>\n• Bare soil from construction = no plant protection<br>\n<strong>2. What should the mining company do?</strong><br>\n• Plant trees and grass immediately after digging<br>\n• Build terraces on steep areas<br>\n• Create drainage systems to control water<br>\n• Use silt fences to catch sediment before it reaches the river\n</div>'
                        },
                        {
                            title: '🚪 Exit Ticket: CER Challenge',
                            content: '<strong>📝 Show what you learned today!</strong><div style="margin:10px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong style="font-size:1.8rem;">🎯 Your Task:</strong><br>\nWrite a complete CER (Claim-Evidence-Reasoning) answering this question:<br>\n<div style="font-size:2.2rem;padding:10px;background:rgba(102,126,234,0.3);border-radius:8px;margin:15px 0;text-align:center;">\n<strong>"Which factor causes land to change the FASTEST: waves, wind, or steep slopes?"</strong>\n</div>\n</div><div style="margin:10px 0;padding:10px;background:rgba(0,212,170,0.2);border-radius:10px;">\n<strong style="color:#00d4aa;font-size:2.2rem;">CLAIM:</strong><br>\n<span style="font-size:1.8rem;">State which factor you think causes fastest change</span><br>\n<em>Example starter: "I claim that __________ causes the fastest land change because..."</em>\n</div><div style="margin:10px 0;padding:10px;background:rgba(255,193,7,0.2);border-radius:10px;">\n<strong style="color:#ffc107;font-size:2.2rem;">EVIDENCE:</strong><br>\n<span style="font-size:1.8rem;">Use data from your lab stations</span><br>\n<em>Include specific observations:</em><br>\n• How much sediment moved?<br>\n• How long did it take?<br>\n• What did you measure or observe?<br>\n• Compare at least TWO stations\n</div><div style="margin:10px 0;padding:10px;background:rgba(255,107,53,0.2);border-radius:10px;">\n<strong style="color:#ff6b35;font-size:2.2rem;">REASONING:</strong><br>\n<span style="font-size:1.8rem;">Explain WHY your evidence supports your claim</span><br>\n<em>Connect to science concepts:</em><br>\n• Why does steepness matter?<br>\n• How does force/energy relate to erosion rate?<br>\n• What makes one agent more powerful than others?\n</div><div style="margin:10px 0;padding:10px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;">\n<strong>💡 Remember:</strong> Use complete sentences, scientific vocabulary, and be specific! Your CER should convince someone who wasn\'t in the lab today.\n</div>'
                        }

                    ]

                },

                'lesson17': {

                    title: 'Plate Tectonics: Patterns of Earth\'s Features',
                    slides: [

                        {

                            title: '🎬 Video Warm-up: Plate Tectonics Lab Series',

                            content: '<strong>Start our Plate Tectonics lab series by watching this video.</strong><div style="margin:15px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;text-align:center;">\n<a href="https://safeshare.tv/x/ss692db1c9c7034#" target="_blank" style="display:inline-block;padding:10px 18px;background:#667eea;color:white;border-radius:8px;text-decoration:none;font-size:1.8rem;">▶️ Play Video: Plate Tectonics & Earth\'s Interior</a>\n</div><div style="margin:10px 0;padding:15px;background:rgba(102,126,234,0.2);border-radius:10px;">\nIn this 4-lesson lab sequence (Lessons 17–20), you will explore:\n<br>• Patterns of earthquakes, volcanoes, and mountains on Earth\'s surface\n<br>• What Earth looks like on the inside and how plates move\n<br>• How plate boundaries create hazards that affect our coal-mining mission\n<br>• How engineers design safer structures in risky plate boundary zones\n</div><div style="margin-top:10px;padding:10px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;">\n<strong>While you watch:</strong> Look for <em>evidence</em> that plates move and think about how this movement might affect a mining company.</div>'
                        },

                        {

                            title: '🌍 Warm-up: Earth\'s Puzzle Pieces',
                            content: '<strong>🗺️ Look at this world map - do you see a pattern?</strong><div style="margin:20px 0;text-align:center;"><img src="images/Bundle2/Lesson 17/plate_boundaries_map.png.png" style="max-width:60%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';"><div style="display:none;padding:30px;background:rgba(255,255,255,0.1);border-radius:15px;margin:20px auto;max-width:600px;"><div style="font-size:1.8rem;margin-bottom:10px;">📷 World Plate Boundaries Map</div>Shows tectonic plates, earthquake zones, volcanoes, and mountain ranges</div></div><div style="margin:20px 0;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2rem;">🤔 Observe & Discuss:</strong><br>• Where do you see clusters of mountains on this map?<br>• Where are most earthquakes located on the map?<br>• Where are most volcanoes on the map?<br>• Do these features form random patterns or do they line up?</div><div style="margin-top:15px;padding:15px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>🔥 Investigative Phenomenon:</strong><br>"Why are there MORE earthquakes and volcanoes in certain places on Earth?"<br>By the end of this lesson, you\'ll be able to explain this pattern!</div>'
                        },

                        {

                            title: '🎯 Objectives & Vocabulary',

                            content: '<strong>📋 Today We Will:</strong><br>• Identify patterns in Earth\'s surface features using maps<br>• Understand what tectonic plates are and how they move<br>• Connect plate boundaries to earthquakes, volcanoes, and mountains<br>• Model plate interactions with hands-on materials',
                            vocabulary: [

                                { term: 'Tectonic Plate', definition: 'A giant slab of Earth\'s crust that floats on the mantle and moves very slowly' },
                                { term: 'Plate Boundary', definition: 'The edge where two tectonic plates meet - where most action happens!' },
                                { term: 'Mid-Ocean Ridge', definition: 'An underwater mountain range formed where plates move apart' },
                                { term: 'Trench', definition: 'A deep valley in the ocean floor where one plate dives under another' },
                                { term: 'Ring of Fire', definition: 'A zone around the Pacific Ocean with many earthquakes and volcanoes' }
                            ]
                        },
                        {
                            title: '🧩 What Are Tectonic Plates?',
                            content: '<strong>🌍 Earth\'s surface is broken into giant pieces like a cracked eggshell!</strong><div class="interactive-question">Key Facts About Tectonic Plates:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌎</span>\n    <span class="reveal-question">How Many Plates?</span>\n    <span class="reveal-answer">There are about 15 major plates and many smaller ones covering Earth</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📏</span>\n    <span class="reveal-question">How Big?</span>\n    <span class="reveal-answer">Some plates are HUGE! The Pacific Plate covers most of the Pacific Ocean</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🐌</span>\n    <span class="reveal-question">How Fast Do They Move?</span>\n    <span class="reveal-answer">About 1-10 cm per year - slower than your fingernails grow! But over millions of years, continents move thousands of miles</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔥</span>\n    <span class="reveal-question">Why Do They Move?</span>\n    <span class="reveal-answer">Hot rock in Earth\'s mantle flows in circles (convection), dragging the plates along like rafts</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">💥</span>\n    <span class="reveal-question">What Happens at the Edges?</span>\n    <span class="reveal-answer">Plate boundaries are where all the action happens - earthquakes, volcanoes, and mountains form there!</span>\n</div>',
                            image: 'images/Bundle2/Lesson 17/tectonic_plates_diagram.png',
                            imageDescription: 'Major tectonic plates diagram (expected file: tectonic_plates_diagram.png). Shows all major plates including Pacific, North American, Eurasian, African, South American, Indo-Australian, Antarctic.'
                        },
                        {
                            title: '🔀 Three Types of Plate Boundaries',
                            content: '<strong>⚡ Different plate movements create different landforms!</strong><div style="margin:20px 0;padding:25px;background:rgba(102,126,234,0.2);border-radius:10px;"><strong style="font-size:2.2rem;">1️⃣ DIVERGENT Boundary (Moving Apart)</strong><br><div style="display:flex;gap:30px;align-items:center;flex-wrap:wrap;"><div style="flex:1;min-width:300px;"><strong>What Happens:</strong><br>Two plates pull away from each other<br><strong>What Forms:</strong><br>• Mid-ocean ridges (underwater mountains)<br>• Rift valleys (on land)<br>• New crust is created<br><strong>Example:</strong><br>🌊 Mid-Atlantic Ridge - Iceland is on this ridge!</div><div style="flex:1;min-width:300px;text-align:center;"><div style="font-size:4rem;">← →</div><div>Plates moving apart</div></div></div></div><div style="margin:20px 0;padding:25px;background:rgba(220,53,69,0.2);border-radius:10px;"><strong style="font-size:2.2rem;">2️⃣ CONVERGENT Boundary (Colliding)</strong><br><div style="display:flex;gap:30px;align-items:center;flex-wrap:wrap;"><div style="flex:1;min-width:300px;"><strong>What Happens:</strong><br>Two plates crash together<br><strong>What Forms:</strong><br>• Tall mountains (when both plates fold up)<br>• Deep ocean trenches (when one dives under)<br>• Volcanoes (from melting rock)<br><strong>Examples:</strong><br>🏔️ Himalayas (tallest mountains!)<br>🌋 Ring of Fire volcanoes<br>🕳️ Mariana Trench (deepest ocean spot)</div><div style="flex:1;min-width:300px;text-align:center;"><div style="font-size:4rem;">→ ←</div><div>Plates colliding</div></div></div></div><div style="margin:20px 0;padding:25px;background:rgba(40,167,69,0.2);border-radius:10px;"><strong style="font-size:2.2rem;">3️⃣ TRANSFORM Boundary (Sliding Past)</strong><br><div style="display:flex;gap:30px;align-items:center;flex-wrap:wrap;"><div style="flex:1;min-width:300px;"><strong>What Happens:</strong><br>Two plates slide sideways past each other<br><strong>What Forms:</strong><br>• Fault lines<br>• LOTS of earthquakes<br>• No mountains or volcanoes<br><strong>Example:</strong><br>🌁 San Andreas Fault in California</div><div style="flex:1;min-width:300px;text-align:center;"><div style="font-size:4rem;">↑<br>↓</div><div>Plates sliding past</div></div></div></div>'
                        },
                        {
                            title: '🔥 The Ring of Fire: A Pattern Emerges',
                            content: '<strong>🌋 Why do so many volcanoes surround the Pacific Ocean?</strong><div style="margin:20px 0;text-align:center;"><img src="images/Bundle2/Lesson 17/ring_of_fire_map.png" style="max-width:90%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';"><div style="display:none;padding:30px;background:rgba(255,255,255,0.1);border-radius:15px;margin:20px auto;max-width:600px;"><div style="font-size:1.8rem;margin-bottom:10px;">📷 Ring of Fire Map</div>Expected file: ring_of_fire_map.png<br>Shows Pacific Plate boundaries with volcano and earthquake markers</div></div><div class="interactive-question">Ring of Fire Facts:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌋</span>\n    <span class="reveal-question">How Many Volcanoes?</span>\n    <span class="reveal-answer">About 75% of Earth\'s volcanoes are in the Ring of Fire - that\'s 450+ volcanoes!</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">⚡</span>\n    <span class="reveal-question">How Many Earthquakes?</span>\n    <span class="reveal-answer">90% of the world\'s earthquakes happen here!</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🗺️</span>\n    <span class="reveal-question">Where Exactly?</span>\n    <span class="reveal-answer">It forms a horseshoe around the Pacific Ocean - touching Asia, Australia, Americas</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">💥</span>\n    <span class="reveal-question">Why Does It Exist?</span>\n    <span class="reveal-answer">The Pacific Plate is surrounded by CONVERGENT boundaries where plates collide, creating volcanoes and quakes</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🏙️</span>\n    <span class="reveal-question">Countries Affected</span>\n    <span class="reveal-answer">Japan, Philippines, Indonesia, Chile, Peru, Alaska, California, New Zealand - millions live in this zone!</span>\n</div><div style="margin:20px 0;padding:20px;background:rgba(255,107,53,0.2);border-radius:10px;"><strong style="font-size:2.2rem;">🤔 Pattern Discovery:</strong><br><strong>Question:</strong> "Why are there more earthquakes in certain places?"<br><strong>Answer:</strong> Most earthquakes and volcanoes happen at PLATE BOUNDARIES! The Ring of Fire marks where the Pacific Plate meets other plates. When plates collide, pull apart, or grind past each other, energy is released as earthquakes. When plates collide and one dives under, it melts and creates volcanoes.</div>'
                        },
                        {
                            title: '🗺️ Map Analysis: Finding Plate Boundaries',
                            content: '<strong>📊 Let\'s analyze real Earth data!</strong><div class="interactive-question">Famous Plate Boundaries:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🏔️</span>\n    <span class="reveal-question">Himalayas</span>\n    <span class="reveal-answer"><strong>Type:</strong> Convergent | <strong>Plates:</strong> Indian & Eurasian | <strong>Result:</strong> Tallest mountains on Earth (Mount Everest 8,849m!)</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌁</span>\n    <span class="reveal-question">San Andreas Fault</span>\n    <span class="reveal-answer"><strong>Type:</strong> Transform | <strong>Plates:</strong> Pacific & North American | <strong>Result:</strong> Frequent earthquakes in California</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌊</span>\n    <span class="reveal-question">Mid-Atlantic Ridge</span>\n    <span class="reveal-answer"><strong>Type:</strong> Divergent | <strong>Plates:</strong> North American & Eurasian | <strong>Result:</strong> Underwater mountain range, Iceland formed here</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🗻</span>\n    <span class="reveal-question">Japan Trench</span>\n    <span class="reveal-answer"><strong>Type:</strong> Convergent | <strong>Plates:</strong> Pacific diving under Eurasian | <strong>Result:</strong> Deep trench, many volcanoes, strong earthquakes</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">⛰️</span>\n    <span class="reveal-question">Andes Mountains</span>\n    <span class="reveal-answer"><strong>Type:</strong> Convergent | <strong>Plates:</strong> Nazca diving under South American | <strong>Result:</strong> Long mountain range with volcanoes</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌴</span>\n    <span class="reveal-question">East African Rift</span>\n    <span class="reveal-answer"><strong>Type:</strong> Divergent | <strong>Plates:</strong> African Plate splitting | <strong>Result:</strong> Rift valley forming - Africa may split into two continents in millions of years!</span>\n</div><div style="margin:20px 0;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;"><strong style="font-size:2.2rem;">💡 Math Connection:</strong><br>If the Pacific Plate moves 10 cm per year toward Japan:<br><strong>How much has it moved in your lifetime?</strong><br>If you\'re 10 years old: 10 cm/year × 10 years = <strong>100 cm = 1 meter!</strong><br><strong>How much will it move in 1 million years?</strong><br>10 cm × 1,000,000 years = 10,000,000 cm = <strong>100 kilometers!</strong><br><strong>That\'s why continents that were once together are now far apart!</strong></div>'
                        },
                        {
                            title: '🏞️ How This Affects Our Mining Mission',
                            content: '<strong>⛏️ What does plate tectonics mean for our coal mine?</strong><div style="margin:10px 0;padding:10px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong style="font-size:1.8rem;">🎯 Mission Connection:</strong><br>\nOur coal mine will be built near a plate boundary. We need to understand the risks!\n</div><div class="interactive-question" style=";">Questions to Consider:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">⚡</span>\n    <span class="reveal-question">Earthquake Risk</span>\n    <span class="reveal-answer">If the mine is near a boundary, earthquakes could damage buildings and cause tunnel collapses. We need earthquake-resistant structures!</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌋</span>\n    <span class="reveal-question">Volcanic Hazards</span>\n    <span class="reveal-answer">Convergent boundaries have volcanoes. Ash, lava flows, and volcanic gases could threaten workers and equipment</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🌊</span>\n    <span class="reveal-question">Tsunami Danger</span>\n    <span class="reveal-answer">Underwater earthquakes near plate boundaries can trigger tsunamis. If the mine is coastal, we need evacuation plans!</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📐</span>\n    <span class="reveal-question">Land Movement</span>\n    <span class="reveal-answer">Slow plate movement can crack roads, pipelines, and foundations over time</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🛡️</span>\n    <span class="reveal-question">What Can We Do?</span>\n    <span class="reveal-answer">• Build with flexible, earthquake-proof designs<br>• Install early warning systems<br>• Train workers for emergency evacuations<br>• Choose locations away from active fault lines when possible<br>• Have backup escape routes from underground</span>\n</div><div style="margin:20px 0;padding:20px;background:rgba(220,53,69,0.2);border-left:4px solid #dc3545;border-radius:5px;"><strong>⚠️ Safety First:</strong> Understanding plate boundaries helps us prepare! Companies that ignore geology put workers at risk. Our recruitment ad MUST address earthquake and volcano safety!</div>'
                        },
                        {
                            title: '💻 Digital Citizenship: Don\'t Fall for Fake Earthquake News',
                            content: '<strong>📰 How to spot FALSE earthquake and volcano news online!</strong><div style="margin:10px 0;padding:10px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong style="font-size:1.8rem;">🚨 Why It Matters:</strong><br>\nFake earthquake "predictions" and exaggerated volcano warnings spread panic! Scientists CANNOT predict exactly when earthquakes will happen, despite what clickbait says.\n</div><div class="interactive-question" style=";">Don\'t Fall for Fake - Checklist for Earthquake/Volcano News:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔍</span>\n    <span class="reveal-question">Check the Source</span>\n    <span class="reveal-answer"><strong>Reliable:</strong> USGS (U.S. Geological Survey), university geology departments, official weather services<br><strong>NOT Reliable:</strong> Random blogs, social media posts without sources, "psychic predictions"</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📅</span>\n    <span class="reveal-question">Check the Date</span>\n    <span class="reveal-answer">Old earthquake news gets reshared as "breaking news!" Always check if it happened recently or years ago</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🎯</span>\n    <span class="reveal-question">Beware of "Predictions"</span>\n    <span class="reveal-answer">Real scientists give PROBABILITIES, not exact predictions. If someone says "earthquake WILL happen Tuesday at 3pm" - it\'s FAKE</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📊</span>\n    <span class="reveal-question">Look for Data</span>\n    <span class="reveal-answer">Real reports include: magnitude, depth, location coordinates, time. Fake ones use vague dramatic language</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🖼️</span>\n    <span class="reveal-question">Verify Photos/Videos</span>\n    <span class="reveal-answer">Use reverse image search! Fake news often uses old disaster photos or CGI effects</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🚫</span>\n    <span class="reveal-question">Watch for Clickbait</span>\n    <span class="reveal-answer">Headlines like "MEGAQUAKE IN 3 DAYS!" or "YELLOWSTONE WILL EXPLODE TOMORROW!" are designed for clicks, not facts</span>\n</div><div style="margin:20px 0;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;"><strong style="font-size:2rem;">✅ Example of GOOD vs BAD Headlines:</strong><br><div style="background:rgba(40,167,69,0.4);padding:15px;border-radius:8px;margin:10px 0;"><strong style="color:#28a745;">✓ GOOD:</strong><br>"Magnitude 5.2 Earthquake Recorded Near Los Angeles - USGS Reports No Major Damage"<br><em>Why good: Specific magnitude, source cited, factual tone</em></div><div style="background:rgba(220,53,69,0.4);padding:15px;border-radius:8px;margin:10px 0;"><strong style="color:#dc3545;">✗ BAD:</strong><br>"THE BIG ONE IS COMING!!! 9.9 Earthquake Will DESTROY California Next Week!!!"<br><em>Why bad: No source, impossible prediction, ALL CAPS, exaggerated magnitude</em></div></div><div style="margin-top:15px;padding:15px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>🎯 Your Task:</strong> If you see earthquake/volcano news this week, practice using this checklist! Share ONLY if it passes ALL checks.</div>'
                        },
                        {
                            title: '🚪 Exit Ticket: Map Your Understanding',
                            content: '<strong>📝 Exit Ticket – 2 Minute Check</strong><div style="margin:15px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2rem;">🎯 Your Task:</strong><br>On a sticky note or in your journal, choose <strong>ONE</strong> famous plate boundary from today (for example: Himalayas, San Andreas Fault, Mid-Atlantic Ridge, Ring of Fire).</div><div style="margin:15px 0;padding:15px;background:rgba(102,126,234,0.2);border-radius:10px;"><strong style="font-size:1.9rem;">Write just three quick things:</strong><br>1. <strong>Name:</strong> What is the boundary called?<br>2. <strong>Type:</strong> Divergent, Convergent, or Transform<br>3. <strong>Result:</strong> One landform or hazard there (mountains, volcanoes, trench, or earthquakes)</div><div style="margin-top:10px;padding:12px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;"><strong>Example:</strong> "Himalayas – Convergent – Tall mountains form where plates push together."</div>'
                        }

                    ]

                },

                'lesson18': {

                    title: 'Plate Tectonics & Earth\'s Interior',
                    slides: [

                        {

                            title: '🌅 Warm-up: Interior Clues',

                            content: '<div style="display:grid;grid-template-columns:1.2fr 1fr;gap:20px;align-items:stretch;margin:5px 0;width:100%;max-width:100%;"><div style="display:flex;align-items:center;justify-content:center;padding:5px;"><img src="images/Bundle2/Lesson 18/earth_interior_cutaway.png" alt="Earth cross-section showing crust, mantle, outer core, and inner core layers" style="width:100%;max-width:100%;height:auto;border-radius:10px;box-shadow:0 4px 8px rgba(0,0,0,0.3);" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'block\';"><div style="display:none;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;margin:15px 0;"><strong>Expected file: earth_interior_cutaway.png</strong><br>Earth cross-section showing crust, mantle, outer core, and inner core layers. The diagram should show a cutaway view of Earth\'s interior with labeled layers.</div></div><div style="padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;display:flex;flex-direction:column;justify-content:center;min-height:100%;"><strong style="font-size:2.4rem;margin-bottom:12px;">🔍 Observation Questions:</strong><div style="font-size:1.7rem;line-height:1.5;">1. <strong>What do you notice about the colors?</strong> Which parts of Earth\'s interior appear brightest or hottest? Which appear coolest?<br><br>2. <strong>How many distinct layers can you count?</strong> Describe what makes each layer look different from the others.<br><br>3. <strong>Where do you think the heat source is located?</strong> Use evidence from the diagram (colors, brightness, position) to explain your thinking.<br><br>4. <strong>Predict:</strong> If heat is coming from deep inside Earth, how might that heat move upward toward the surface? What patterns do you see that might show heat movement?</div></div></div><div style="margin-top:12px;padding:12px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>💭 Think-Pair-Share:</strong> Write your observations in your journal, then share your predictions with a partner. What did you both notice about Earth\'s interior?</div>',

                        },

                        {

                            title: '🎯 Objectives & Vocabulary Extension',

                            content: 'Focus today on:\n• Connecting mantle convection to surface patterns\n• Using text features from “The Hiking Trip” reading\n• Calculating distances based on plate rates\nNew vocabulary:',

                            vocabulary: [

                                { term: 'Lithosphere', definition: 'Rigid outer layer made of crust and upper mantle' },

                                { term: 'Asthenosphere', definition: 'Soft layer of the mantle that plates move on' },

                                { term: 'Convection', definition: 'Movement caused by heated material rising and cooler material sinking' }

                            ]

                        },

                        {

                            title: '📚 Literacy Connection: Hiking Trip Highlights',

                            content: '<strong>Read this short "Hiking Trip" story about evidence of plate motion:</strong><div style="margin:12px 0;padding:12px;background:rgba(255,255,255,0.08);border-radius:10px;line-height:1.4;">Maya and Jordan hiked along the Ridge Line Trail in California. On the trail map they noticed a bold red line labeled <strong>San Andreas Fault</strong> running right beneath their path and crossing several mountain ranges. A note on the map explained that these mountains were pushed up where plates collide and slide past each other.<br><br>Later they stopped at an overlook sign. The photos showed rock layers on opposite sides of the valley that no longer lined up—one side was several meters higher than the other. The caption read: “Offset rock layers caused by repeated earthquakes along the fault.” In the trail guide, bold vocabulary words like <strong>fault</strong>, <strong>uplift</strong>, and <strong>tectonic plates</strong> helped Maya and Jordan connect what they saw to slow but powerful plate motion deep underground.</div><div class="interactive-question">What evidence did the hikers observe?</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🗺️</span><span class="reveal-question">Map features</span><span class="reveal-answer">The trail map showed the San Andreas Fault and nearby mountain ranges formed by plate movement</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📸</span><span class="reveal-question">Photo captions</span><span class="reveal-answer">Photos showed offset rock layers and tilted mountains - evidence of past earthquakes</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📝</span><span class="reveal-question">Vocabulary terms</span><span class="reveal-answer">Key terms like \"fault,\" \"uplift,\" and \"tectonic plates\" helped explain what they saw</span></div><div style="margin-top:15px;padding:15px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;"><strong>✍️ Your Task:</strong> In your journal, write 2-3 sentences summarizing how the hikers\' observations connect to plate tectonics we learned about yesterday.</div>'

                        },

                        {

                            title: '🌀 Concept: Convection Drives Plates',

                            content: 'Heat from Earth\'s core creates convection currents in the mantle that move tectonic plates.<div class="interactive-question">How does convection work?</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🔥</span><span class="reveal-question">Heat rises</span><span class="reveal-answer">Hot rock near the core becomes less dense and rises toward the surface</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">❄️</span><span class="reveal-question">Cool sinks</span><span class="reveal-answer">Cooler rock near the surface becomes denser and sinks back down</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🔄</span><span class="reveal-question">Circular motion</span><span class="reveal-answer">This creates circular currents that drag tectonic plates along like rafts on a river</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌊</span><span class="reveal-question">Plate movement</span><span class="reveal-answer">Where currents rise, plates move apart (divergent). Where they sink, plates collide (convergent)</span></div>',

                            image: 'images/Bundle2/Lesson 18/mantle_convection_diagram.png',
                            imageDescription: 'Arrow diagram showing convection cells beneath tectonic plates.'

                        },

                        {

                            title: '🧮 Math Moment: How Far Do Plates Move?',

                            content: 'Calculate plate movement over time:<div style="margin:20px 0;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2.2rem;">Problem:</strong> The Pacific Plate moves 10 cm per year toward Japan.</div><div class="interactive-question">How far has it moved in different time periods?</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📅</span><span class="reveal-question">In 100 years?</span><span class="reveal-answer">10 cm/year × 100 years = 1,000 cm = 10 meters (about the length of a school bus!)</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📅</span><span class="reveal-question">In 1,000 years?</span><span class="reveal-answer">10 cm/year × 1,000 years = 10,000 cm = 100 meters (a football field!)</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📅</span><span class="reveal-question">In 1 million years?</span><span class="reveal-answer">10 cm/year × 1,000,000 years = 10,000,000 cm = 100 kilometers (62 miles!)</span></div><div style="margin-top:15px;padding:15px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;"><strong>💡 Key Point:</strong> Even though plates move SLOWLY (slower than fingernails grow!), over millions of years they move HUGE distances. This is why continents that were once together are now far apart!</div>'

                        },

                        {

                            title: '🗺️ Mission Link: Mining Site Safety',

                            content: 'How does understanding plate movement help our mining mission?<div class="interactive-question">What risks should miners prepare for?</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">⚡</span><span class="reveal-question">Earthquake prediction</span><span class="reveal-answer">Knowing plate boundaries helps predict where earthquakes are more likely. We can build stronger structures in those areas.</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌋</span><span class="reveal-question">Volcano monitoring</span><span class="reveal-answer">Convergent boundaries have volcanoes. We need early warning systems and evacuation plans.</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📐</span><span class="reveal-question">Slow ground movement</span><span class="reveal-answer">Even slow plate movement can crack foundations over time. We need flexible building designs.</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🛡️</span><span class="reveal-question">Safety planning</span><span class="reveal-answer">Understanding convection helps us know which areas are most active and need extra safety measures.</span></div><div style="margin-top:15px;padding:15px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;"><strong>✍️ Your Task:</strong> Write one sentence for the mission ad explaining how the company uses geology knowledge to keep workers safe.</div>'

                        },

                        {

                            title: '💻 Digital Citizenship: Map Attribution & Credibility',

                            content: '<strong>🗺️ How to tell if a map is trustworthy!</strong><div style="margin:10px 0;padding:10px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong style="font-size:1.8rem;">🚨 Why It Matters:</strong><br>\nMaps can be misleading or outdated! A map without proper attribution might show old data, wrong locations, or be created by someone trying to mislead you. Always check who made the map and when.\n</div><div class="interactive-question" style=";">Map Credibility Checklist:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🏛️</span>\n    <span class="reveal-question">Check the Source</span>\n    <span class="reveal-answer"><strong>Reliable:</strong> Government agencies (USGS, NOAA, NASA), universities, official science organizations<br><strong>NOT Reliable:</strong> Random websites, social media posts, maps without author names</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📅</span>\n    <span class="reveal-question">Check the Date</span>\n    <span class="reveal-answer">Maps can be outdated! Earthquakes, boundaries, and features change. Always look for when the map was created or last updated</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔍</span>\n    <span class="reveal-question">Look for Attribution</span>\n    <span class="reveal-answer">Good maps list: who created it, what organization, and when. If a map has no attribution, don\'t trust it!</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📊</span>\n    <span class="reveal-question">Verify the Data</span>\n    <span class="reveal-answer">Check if the map explains what the symbols mean (red dots = earthquakes, blue lines = plate boundaries). If it\'s unclear, find another source</span>\n</div><div style="margin:20px 0;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;"><strong style="font-size:2rem;">✅ Example of GOOD vs BAD Map Attribution:</strong><br><div style="background:rgba(40,167,69,0.4);padding:15px;border-radius:8px;margin:10px 0;"><strong style="color:#28a745;">✓ GOOD:</strong><br>"USGS Global Seismic Activity Map, 2024. Red dots show earthquakes in the last 30 days."<br><em>Why good: Clear source (USGS), recent date, explains what symbols mean</em></div><div style="background:rgba(220,53,69,0.4);padding:15px;border-radius:8px;margin:10px 0;"><strong style="color:#dc3545;">✗ BAD:</strong><br>"Earthquake Map" (no source, no date, no explanation)<br><em>Why bad: No way to verify if it\'s accurate or current</em></div></div><div style="margin-top:15px;padding:15px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>🎯 Your Task:</strong> If you see a map online this week, practice using this checklist! Only trust maps that pass ALL checks.</div>'

                        },

                        {

                            title: '🚪 Exit Ticket',

                            content: 'Explain how mantle convection connects to one hazard miners must prepare for at the mission site.'

                        }

                    ]

                },

                'lesson19': {

                    title: 'Renewable vs. Nonrenewable Resources',

                    slides: [

                        {

                            title: '🤔 Warm-up: Resource Riddle',

                            content: '<strong>💭 Think about this scenario!</strong><div style="margin:8px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2rem;">📖 The Scenario:</strong><br>Imagine your town needs to build a new power plant. You have two options:<br><br><strong>Option A:</strong> A power plant that uses fuel from ancient plants and animals buried deep underground.<br><br><strong>Option B:</strong> A power plant that uses energy from the sun and wind.</div><div style="margin-top:8px;padding:12px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>🎯 Your Task:</strong> In your journal, answer these questions:<br>1. Which option would you choose? Why?<br>2. What is one advantage of Option A?<br>3. What is one advantage of Option B?<br>4. Which option do you think will last longer? Why?</div><div style="margin-top:8px;padding:12px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;"><strong>💡 Think-Pair-Share:</strong> Write your answers, then share with a partner. Be ready to explain your thinking to the class!</div>'

                        },

                        {

                            title: '🎯 Objectives & Vocabulary',

                            content: '<strong>📋 Today We Will:</strong><br>• Classify natural resources by renewability<br>• Explain environmental impacts of energy choices<br>• Gather information to inform the mission ad',

                            vocabulary: [

                                { term: 'Renewable Resource', definition: 'Resource that can be replaced naturally in a short time' },

                                { term: 'Nonrenewable Resource', definition: 'Resource that forms slowly and can run out' },

                                { term: 'Fossil Fuel', definition: 'Fuel formed from ancient plants and animals' },

                                { term: 'Sustainability', definition: 'Using resources without depleting them for future generations' }

                            ]

                        },

                        {

                            title: '🧩 Explore: Classify Natural Resources',

                            content: '<strong>📊 Create a T-chart in your science journal to classify natural resources!</strong><div style="margin:8px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;margin-bottom:20px;"><strong style="font-size:2rem;">📋 Your T-Chart:</strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px;width:100%;"><div style="background:rgba(40,167,69,0.2);padding:12px;border-radius:8px;border:2px solid #28a745;"><strong>RENEWABLE</strong><br>(Can be replaced quickly)<br><div class="reveal-item" onclick="revealAnswer(this)" style="margin:4px 0;"><span class="reveal-emoji">🌊</span><span class="reveal-question">Water</span><span class="reveal-answer">Water cycle constantly replenishes it through rain and snow</span></div><br>• Wind<br>• Sunlight<br>• Timber (trees)<br>• Geothermal<br>• Biomass</div><div style="background:rgba(220,53,69,0.2);padding:12px;border-radius:8px;border:2px solid #dc3545;"><strong>NONRENEWABLE</strong><br>(Forms slowly, can run out)<br><div class="reveal-item" onclick="revealAnswer(this)" style="margin:4px 0;"><span class="reveal-emoji">⛽</span><span class="reveal-question">Coal</span><span class="reveal-answer">Takes millions of years to form from ancient plants - we use it faster than it forms</span></div><br>• Oil<br>• Natural gas<br>• Uranium<br>• Metals (iron, copper)</div></div></div><div class="interactive-question" style="margin-top:20px;display:block;">Why is each resource in its category?</div>'

                        },

                        {

                            title: '🎭 Effects of Energy Skits',

                            content: '<strong>🎬 Your group will perform a mini-skit showing how an energy resource is used and its impacts!</strong><div style="margin:8px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2rem;">📋 Scenario Assignments:</strong><br><strong>Group 1:</strong> Coal mining - Show the process and its effects on air quality and wildlife habitats<br><strong>Group 2:</strong> Wind farm - Show turbines generating electricity and impacts on bird migration<br><strong>Group 3:</strong> Solar panel installation - Show clean energy production and land use considerations<br><strong>Group 4:</strong> Oil drilling - Show extraction process and potential water contamination<br><strong>Group 5:</strong> Hydroelectric dam - Show power generation and effects on fish migration</div><div style="margin-top:8px;padding:12px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>🎬 Your Skit Must Include:</strong><br>1. How the resource is extracted or collected<br>2. How it\'s used to create energy<br>3. At least ONE positive impact<br>4. At least ONE negative impact on people or wildlife<br>5. Keep it to 2 minutes!</div>'

                        },

                        {

                            title: '🔎 Research Station: Town of McCally',

                            content: '<strong>🏘️ The town of McCally needs to reduce its dependence on fossil fuels. Research energy solutions and make a recommendation!</strong><div style="margin:8px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2rem;">📍 About McCally:</strong><br>• Located on the coast with strong ocean winds<br>• Gets 250+ sunny days per year<br>• Has a large river flowing nearby<br>• Population: 15,000 people<br>• Currently uses coal for 80% of electricity<br>• Needs reliable power year-round</div><div style="margin:8px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2rem;">📊 Research Questions:</strong><br>1. What renewable energy sources are available in McCally\'s region?<br>2. Which source would be most reliable year-round?<br>3. What are the environmental benefits compared to coal?<br>4. What are the costs and challenges?</div><div class="interactive-question">Consider these renewable options:</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">💨</span><span class="reveal-question">Wind Power</span><span class="reveal-answer">Pros: Clean, abundant. Cons: Needs consistent wind, can affect birds</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">☀️</span><span class="reveal-question">Solar Power</span><span class="reveal-answer">Pros: Clean, works in sunny areas. Cons: Doesn\'t work at night, needs space</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌊</span><span class="reveal-question">Hydroelectric</span><span class="reveal-answer">Pros: Very reliable, clean. Cons: Needs flowing water, affects fish</span></div><div style="margin-top:8px;padding:12px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;"><strong>✍️ Your Recommendation:</strong> Write 2-3 sentences explaining which renewable energy source you recommend for McCally and why.</div>'

                        },

                        {

                            title: '📊 Data Talk: U.S. Energy Pie Chart',

                            content: '<strong>📈 Analyze the 2020 U.S. Energy Mix pie chart!</strong><div class="interactive-question">What does the data show?</div><div style="margin:15px 0;text-align:center;"><img src="images/Bundle2/Lesson 19/us_energy_pie_chart_2020.png" style="max-width:70%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'block\';"><div style="display:none;padding:30px;background:rgba(255,255,255,0.1);border-radius:15px;margin:20px auto;max-width:600px;"><div style="font-size:1.8rem;margin-bottom:10px;">📊 U.S. Energy Mix Pie Chart 2020</div>Expected file: us_energy_pie_chart_2020.png<br>Shows the percentage breakdown of renewable vs nonrenewable energy sources in the United States for 2020</div></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📊</span><span class="reveal-question">Largest category</span><span class="reveal-answer">Nonrenewable sources (coal, oil, natural gas) provided about 79% of U.S. energy in 2020</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌱</span><span class="reveal-question">Renewable percentage</span><span class="reveal-answer">Renewable sources (wind, solar, hydro, biomass) provided about 12% in 2020</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">💡</span><span class="reveal-question">Why this matters</span><span class="reveal-answer">Most energy still comes from sources that pollute and will eventually run out. We need more renewable energy!</span></div><div style="margin-top:8px;padding:12px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;"><strong>✍️ Your Task:</strong> Write a CER response:<br>• <strong>CLAIM:</strong> Which category (renewable or nonrenewable) provided most energy in 2020?<br>• <strong>EVIDENCE:</strong> What percentage from the pie chart supports your claim?<br>• <strong>REASONING:</strong> Why is this important for our future?</div>'

                        },

                        {

                            title: '💻 Digital Citizenship: Don\'t Fall for Fake Energy Claims',

                            content: '<strong>📰 How to spot FALSE or misleading energy statistics online!</strong><div style="margin:8px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.8rem;">🚨 Why It Matters:</strong><br>Companies and websites often exaggerate energy statistics to sell products or push an agenda! Fake numbers about "clean coal" or "100% renewable" can mislead people. Always verify before sharing!</div><div class="interactive-question">Don\'t Fall for Fake - Checklist for Energy Statistics:</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🔍</span><span class="reveal-question">Check the Source</span><span class="reveal-answer"><strong>Reliable:</strong> Government agencies (EPA, DOE, EIA), universities, peer-reviewed studies<br><strong>NOT Reliable:</strong> Company blogs, social media posts, websites trying to sell something</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📊</span><span class="reveal-question">Verify the Numbers</span><span class="reveal-answer">Check if other reliable sources show similar statistics. If only ONE source claims something amazing, it\'s probably fake!</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📅</span><span class="reveal-question">Check the Date</span><span class="reveal-answer">Energy data changes fast! A statistic from 2010 might be completely wrong today. Always check when the data was collected</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🎯</span><span class="reveal-question">Look for Bias</span><span class="reveal-answer">Does the source have a reason to exaggerate? Companies might make their energy look better than it is to sell products</span></div><div style="margin:8px 0;padding:12px;background:rgba(40,167,69,0.2);border-radius:10px;"><strong style="font-size:2rem;">✅ Example of GOOD vs BAD Energy Claims:</strong><div style="background:rgba(40,167,69,0.4);padding:12px;border-radius:8px;margin:8px 0;"><strong style="color:#28a745;">✓ GOOD:</strong><br>"Renewable energy provided 13% of U.S. electricity in 2022."<br><strong>Source:</strong> U.S. Energy Information Administration (EIA), 2023<br><em>Why good: Government agency, recent data, verifiable</em></div><div style="background:rgba(220,53,69,0.4);padding:12px;border-radius:8px;margin:8px 0;"><strong style="color:#dc3545;">✗ BAD:</strong><br>"Solar power now provides 50% of U.S. energy!"<br><strong>Source:</strong> Solar Company Blog, 2024<br><em>Why bad: Company trying to sell products, no way to verify, exaggerated number</em></div></div><div style="margin-top:8px;padding:12px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>🎯 Your Task:</strong> If you see energy statistics online this week, practice using this checklist! Share ONLY if it passes ALL checks.</div>'

                        },

                        {

                            title: '🚪 Exit Ticket: Resource Recommendation',

                            content: '<strong>📝 Exit Ticket – 2 Minute Check</strong><div style="margin:8px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2rem;">🎯 Your Task:</strong><br>On a sticky note or in your journal, write about <strong>ONE</strong> renewable resource you would feature in the mining company ad.</div><div style="margin:8px 0;padding:12px;background:rgba(102,126,234,0.2);border-radius:10px;"><strong style="font-size:1.9rem;">Include these two things:</strong><br>1. <strong>Resource Name:</strong> Which renewable resource? (wind, solar, hydroelectric, etc.)<br>2. <strong>Environmental Benefit:</strong> How does it protect the environment compared to coal?</div><div style="margin-top:8px;padding:12px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;"><strong>Example:</strong> "Solar power – It doesn\'t create air pollution or greenhouse gases like coal does, so it helps protect our air quality and climate."</div>'

                        }

                    ]

                },

                'lesson20': {

                    title: 'Conservation & Mission Planning',

                    slides: [

                        {

                            title: '🌱 Warm-up: Conservation Quick Poll',

                            content: 'Respond to each conservation statement by raising your hand if you do this:<div style="margin:20px 0;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2.2rem;">📊 Poll Questions:</strong><br>1. "I turn off lights when I leave a room."<br>2. "I recycle paper and plastic at home or school."<br>3. "I ride my bike or walk instead of asking for a car ride when possible."<br>4. "I use a reusable water bottle instead of buying plastic bottles."<br>5. "I turn off the water while brushing my teeth."<br>6. "I unplug chargers when I\'m not using them."<br>7. "I try to take shorter showers to save water."<br>8. "I bring my own bags when shopping instead of using plastic ones."</div><div style="margin-top:15px;padding:15px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;"><strong>📈 Class Tally:</strong> After each question, we\'ll count raised hands and calculate what percentage of our class practices each conservation action. Record the percentages in your journal.</div>'

                        },

                        {

                            title: '🎯 Objectives & Vocabulary',

                            content: 'Today we will:\n• Evaluate strategies that reduce resource use\n• Connect conservation ideas to the coal-mining mission\n• Draft talking points for the recruitment ad\nVocabulary additions:',

                            vocabulary: [

                                { term: 'Conservation', definition: 'Careful use and protection of natural resources' },

                                { term: 'Efficiency', definition: 'Doing the same work with less energy or materials' },

                                { term: 'Mitigation', definition: 'Actions that reduce negative impacts' }

                            ]

                        },

                        {

                            title: '📊 Analyze: Energy Use Graph',

                            content: '<strong style="font-size:1.8rem;">🏫 Greenville Elementary School Energy Challenge:</strong><div style="margin:15px 0;text-align:center;"><img src="images/Bundle2/Lesson 20/school_energy_bar_graph.png" style="max-width:90%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);"></div><div style="margin:15px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.6rem;">🔍 Conservation Actions Taken:</strong><br>• <strong>October:</strong> Replaced old bulbs with LED lights (uses 75% less energy)<br>• <strong>November:</strong> Installed motion sensors (lights turn off when rooms are empty)<br>• <strong>December:</strong> Students reminded to turn off computers + thermostat adjusted</div><div class="interactive-question">What patterns do you see in the data?</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📉</span><span class="reveal-question">Energy Reduction Amount</span><span class="reveal-answer">Energy dropped from 12,000 to 6,400 kWh - a decrease of 5,600 kWh (about 47% reduction!)</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">💰</span><span class="reveal-question">Cost Savings (at $0.12 per kWh)</span><span class="reveal-answer">Saving 5,600 kWh × $0.12 = $672 per month! That is $8,064 saved per year!</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌍</span><span class="reveal-question">Environmental Impact</span><span class="reveal-answer">Less electricity means less coal burned → fewer CO2 emissions → cleaner air and slower climate change</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📈</span><span class="reveal-question">Which action helped most?</span><span class="reveal-answer">LED lights made the biggest impact (2,000 kWh drop), but ALL actions together created the full 47% reduction</span></div><div style="margin-top:15px;padding:15px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;"><strong>✍️ Journal Task:</strong> Calculate: If YOUR school uses 15,000 kWh per month, and you reduce usage by 47%, how much energy would you save? Then write 2-3 sentences explaining the cause-and-effect: What CAUSED the energy to decrease? What EFFECT does this have on the environment?</div>'

                        },

                        {

                            title: '🛠️ Scenario Workshop',

                            content: 'Review the energy skits from yesterday. For each scenario, propose solutions to reduce environmental impacts.<div style="margin:15px 0;padding:15px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.8rem;">📋 Your Task for Each Energy Source:</strong><br><div style="margin:8px 0;padding:12px;background:rgba(40,167,69,0.2);border-radius:8px;"><strong>1. Immediate Fix:</strong> What can we do RIGHT NOW to reduce negative impacts?</div><div style="margin:8px 0;padding:12px;background:rgba(102,126,234,0.2);border-radius:8px;"><strong>2. Long-term Solution:</strong> What can we do OVER TIME to make this better?</div></div><div class="interactive-question">Brainstorm solutions for each scenario:</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">⛽</span><span class="reveal-question">Coal mining</span><span class="reveal-answer">Think about: air quality, water, land restoration, worker safety, alternative energy transition</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">💨</span><span class="reveal-question">Wind farms</span><span class="reveal-answer">Think about: wildlife protection, noise reduction, location planning, community benefits</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">☀️</span><span class="reveal-question">Solar panels</span><span class="reveal-answer">Think about: land use, recycling materials, energy storage, grid connection</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌊</span><span class="reveal-question">Hydroelectric dams</span><span class="reveal-answer">Think about: fish migration, water flow, downstream ecosystems, flood control</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🛢️</span><span class="reveal-question">Oil drilling</span><span class="reveal-answer">Think about: spill prevention, habitat protection, emissions, cleanup plans</span></div>'

                        },

                        {

                            title: '📰 Mission Ad Planner',

                            content: 'Plan your recruitment ad for the mining company. Include these sections:<div style="margin:12px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.8rem;">📋 Ad Sections:</strong><br><div style="margin:8px 0;padding:10px;background:rgba(220,53,69,0.2);border-radius:8px;"><strong>🛡️ Safety Section:</strong><br>• How does the company keep workers safe from earthquakes, floods, and volcanoes?<br>• What safety training do workers get before they start?</div><div style="margin:8px 0;padding:10px;background:rgba(40,167,69,0.2);border-radius:8px;"><strong>🌱 Stewardship Section:</strong><br>• How does the company protect the land, water, and air?<br>• What does the company do to save energy and reduce waste?</div><div style="margin:8px 0;padding:10px;background:rgba(102,126,234,0.2);border-radius:8px;"><strong>🏘️ Community Benefits:</strong><br>• How does the company help people who live nearby?<br>• What jobs and good things does the company bring to the town?</div></div><div style="margin-top:12px;padding:12px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>✍️ Your Task:</strong> Write 1-2 sentences for each section. Use what you learned in lessons 13-20 as evidence. This will become your final recruitment ad!</div>'

                        },

                        {

                            title: '💻 Digital Citizenship: Fact-Check Before You Share',

                            content: '<strong>🔍 How to verify information before sharing it online!</strong><div style="margin:10px 0;padding:10px;background:rgba(255,255,255,0.1);border-radius:10px;">\n<strong style="font-size:1.8rem;">🚨 Why It Matters:</strong><br>\nFalse information spreads fast online! When you share something without checking, you might be spreading lies. Always fact-check before you share - it protects you and others!\n</div><div class="interactive-question" style=";">Three-Step Fact-Check Process:</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📖</span>\n    <span class="reveal-question">Step 1: Read Past the Headline</span>\n    <span class="reveal-answer">Headlines are designed to grab attention! Read the full article. Does it explain HOW something works, or is it just hype? Real articles have details, fake ones are vague</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">🔎</span>\n    <span class="reveal-question">Step 2: Trace the Source</span>\n    <span class="reveal-answer">Who said this? Is it a peer-reviewed study, government agency, university, or just an anonymous comment? Reliable sources are named and can be verified</span>\n</div><div class="reveal-item" onclick="revealAnswer(this)">\n    <span class="reveal-emoji">📊</span>\n    <span class="reveal-question">Step 3: Evidence Hunt</span>\n    <span class="reveal-answer">Look for data tables, numbers, lab results, or research. Real information has evidence. If there\'s no data or proof, don\'t share it!</span>\n</div><div style="margin:20px 0;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;"><strong style="font-size:2rem;">✅ Example Fact-Check:</strong><br><div style="background:rgba(220,53,69,0.4);padding:15px;border-radius:8px;margin:10px 0;"><strong style="color:#dc3545;">Statement:</strong> "Coal smoke is 100% clean now!"<br><strong>Step 1:</strong> Read past headline - Article has no explanation, just hype<br><strong>Step 2:</strong> Trace source - Anonymous blog post, no author<br><strong>Step 3:</strong> Evidence hunt - No data, no studies, no proof<br><strong>Verdict:</strong> <strong>MISLEADING</strong> - Don\'t share!</div></div><div style="margin-top:15px;padding:15px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>🎯 Your Task:</strong> Practice the three-step fact-check on something you see online this week. Only share if it passes ALL three steps!</div>'

                        },

                        {

                            title: '🚪 Exit Ticket',

                            content: 'Write one sentence for the mission ad promising how the company will conserve resources, backed by evidence from today\'s lesson.'

                        }

                    ]

                },

                'lesson21': {

                    title: 'Natural Processes: Hazard Identification',

                    slides: [

                        {

                            title: '🌋 Warm-up: Shake Table Demo',

                            content: 'Build a block tower on your desk. When I say "EARTHQUAKE!", gently shake your desk.<div style="margin:12px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.8rem;">🤔 Observe:</strong><br>1. What happened to your tower when the desk shook?<br>2. Which parts failed first? (Top? Base? Middle?)<br>3. What could you change to make it stronger?</div><div style="margin-top:12px;padding:12px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>🔍 Investigative Phenomenon:</strong><br>"How could an architect design a house to withstand natural disasters like earthquakes, floods, and tsunamis?"<br>By the end of this lesson, you\'ll understand natural hazards and how engineers design solutions!</div>'

                        },

                        {

                            title: '🎯 Objectives & Vocabulary',

                            content: 'We will:\n• Identify impacts of earthquakes, floods, tsunamis, and volcanic eruptions\n• Brainstorm strategies to reduce damage\n• Connect hazards to the mining mission\nVocabulary:',

                            vocabulary: [

                                { term: 'Natural Hazard', definition: 'A natural event that can cause damage to humans and property' },

                                { term: 'Mitigation', definition: 'Steps taken to reduce harm from hazards' },

                                { term: 'Criteria', definition: 'Requirements a solution must meet' },

                                { term: 'Constraints', definition: 'Limits on materials, time, or cost' }

                            ]

                        },

                        {

                            title: '📚 Explore: Safety First!',

                            content: 'Analyze hazard cards for four natural disasters. Click each card to flip and see details!<style>.haz-card{aspect-ratio:1;perspective:1000px;cursor:pointer;}.haz-inner{position:relative;width:100%;height:100%;transition:transform 0.6s;transform-style:preserve-3d;}.haz-front,.haz-back{position:absolute;width:100%;height:100%;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:15px;box-sizing:border-box;display:flex;flex-direction:column;}.haz-front{z-index:2;}.haz-back{transform:rotateY(180deg);z-index:1;}</style><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:20px 0;"><div class="haz-card" onclick="flipHazardCard(this)"><div class="haz-inner"><div class="haz-front" style="background:linear-gradient(135deg,#dc3545,#ff6b6b);align-items:center;justify-content:center;color:white;font-size:2.2rem;font-weight:bold;padding:20px;"><span style="font-size:4rem;margin-bottom:10px;">🌍</span>Earthquake<span style="font-size:1.2rem;opacity:0.7;margin-top:8px;">(Click to flip)</span></div><div class="haz-back" style="background:#dc3545;color:white;font-size:1.8rem;padding:25px;line-height:1.5;justify-content:center;"><div style="font-size:2rem;font-weight:bold;margin-bottom:8px;">⚠️ Impacts:</div>• Building collapse<br>• Ground cracks<br>• Fires<br><br><div style="font-size:2rem;font-weight:bold;margin-bottom:8px;">🛡️ Preparation:</div>• Resistant buildings<br>• Emergency kits<br>• Evacuation plans</div></div></div><div class="haz-card" onclick="flipHazardCard(this)"><div class="haz-inner"><div class="haz-front" style="background:linear-gradient(135deg,#17a2b8,#5bc0de);align-items:center;justify-content:center;color:white;font-size:2.2rem;font-weight:bold;padding:20px;"><span style="font-size:4rem;margin-bottom:10px;">🌊</span>Flood<span style="font-size:1.2rem;opacity:0.7;margin-top:8px;">(Click to flip)</span></div><div class="haz-back" style="background:#17a2b8;color:white;font-size:1.8rem;padding:25px;line-height:1.5;justify-content:center;"><div style="font-size:2rem;font-weight:bold;margin-bottom:8px;">⚠️ Impacts:</div>• Water damage<br>• Property loss<br>• Contamination<br><br><div style="font-size:2rem;font-weight:bold;margin-bottom:8px;">🛡️ Preparation:</div>• Flood barriers<br>• Elevated buildings<br>• Drainage systems</div></div></div><div class="haz-card" onclick="flipHazardCard(this)"><div class="haz-inner"><div class="haz-front" style="background:linear-gradient(135deg,#6f42c1,#9b59b6);align-items:center;justify-content:center;color:white;font-size:2.2rem;font-weight:bold;padding:20px;"><span style="font-size:4rem;margin-bottom:10px;">🌊</span>Tsunami<span style="font-size:1.2rem;opacity:0.7;margin-top:8px;">(Click to flip)</span></div><div class="haz-back" style="background:#6f42c1;color:white;font-size:1.8rem;padding:25px;line-height:1.5;justify-content:center;"><div style="font-size:2rem;font-weight:bold;margin-bottom:8px;">⚠️ Impacts:</div>• Massive waves<br>• Coastal destruction<br>• Drowning<br><br><div style="font-size:2rem;font-weight:bold;margin-bottom:8px;">🛡️ Preparation:</div>• Warning systems<br>• Evacuation routes<br>• Seawalls</div></div></div><div class="haz-card" onclick="flipHazardCard(this)"><div class="haz-inner"><div class="haz-front" style="background:linear-gradient(135deg,#fd7e14,#ffc107);align-items:center;justify-content:center;color:white;font-size:2.2rem;font-weight:bold;padding:20px;"><span style="font-size:4rem;margin-bottom:10px;">🌋</span>Volcano<span style="font-size:1.2rem;opacity:0.7;margin-top:8px;">(Click to flip)</span></div><div class="haz-back" style="background:#fd7e14;color:white;font-size:1.8rem;padding:25px;line-height:1.5;justify-content:center;"><div style="font-size:2rem;font-weight:bold;margin-bottom:8px;">⚠️ Impacts:</div>• Ash clouds<br>• Lava flows<br>• Toxic gases<br><br><div style="font-size:2rem;font-weight:bold;margin-bottom:8px;">🛡️ Preparation:</div>• Gas masks<br>• Evacuation zones<br>• Monitoring systems</div></div></div></div><div style="margin-top:15px;padding:15px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:8px;font-size:1.8rem;"><strong>✍️ Your Task:</strong> Create a mini safety poster for ONE hazard. Include: hazard name, 2 impacts, 2 preparation strategies, and a drawing.</div>'

                        },


                        {

                            title: '📈 Data Connection',

                            content: 'Look at the map below showing earthquake and volcano locations around the Pacific Ocean.<div style="margin:12px 0;text-align:center;"><img src="images/Bundle2/Lesson 21/usgs_ring_of_fire_map.png" style="max-width:90%;height:auto;border-radius:15px;box-shadow:0 6px 12px rgba(0,0,0,0.3);"></div><div class="interactive-question">What patterns do you see on the map?</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📍</span><span class="reveal-question">Earthquake locations</span><span class="reveal-answer">Most earthquakes cluster along plate boundaries, especially the Ring of Fire around the Pacific Ocean</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌋</span><span class="reveal-question">Volcano locations</span><span class="reveal-answer">Volcanoes also follow plate boundaries - that\'s why the Ring of Fire has so many!</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">⚠️</span><span class="reveal-question">Risk assessment</span><span class="reveal-answer">Our mining site (yellow star) is near several earthquake zones and volcanoes - we need strong safety plans!</span></div><div style="margin-top:12px;padding:12px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;"><strong>✍️ Your Task:</strong> In your journal, list the top 3 hazards closest to the mining site. For each one, write one safety feature the company should include.</div>'

                        },

                        {

                            title: '🧠 Guided Discussion',

                            content: 'Now let\'s connect what we learned to our mining mission! Use your journal to think through each question.<div style="margin:12px 0;padding:12px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.8rem;">📊 Mining Mission Risk Chart:</strong><br><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;"><div style="background:rgba(220,53,69,0.2);padding:10px;border-radius:8px;"><strong>HAZARD</strong><br>Which natural disaster is MOST likely at our mining site?</div><div style="background:rgba(255,193,7,0.2);padding:10px;border-radius:8px;"><strong>IMPACTS</strong><br>How could it damage our mining equipment and workers?</div><div style="background:rgba(40,167,69,0.2);padding:10px;border-radius:8px;"><strong>MITIGATION</strong><br>What safety features should the company build?</div><div style="background:rgba(102,126,234,0.2);padding:10px;border-radius:8px;"><strong>MISSION CONNECTION</strong><br>How will you include this in your recruitment ad?</div></div></div><div style="margin-top:12px;padding:12px;background:rgba(102,126,234,0.2);border-left:4px solid #667eea;border-radius:5px;"><strong>💬 Class Discussion:</strong> Share your top hazard and mitigation idea with the class. Be ready to explain WHY you chose it!</div>'

                        },

                        {

                            title: '💻 Digital Citizenship: Don\'t Spread False Emergency Alerts',

                            content: '<strong>🚨 How to spot FAKE emergency alerts before sharing!</strong><div style="margin:10px 0;padding:10px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:1.6rem;">🚨 Why It Matters:</strong><br>False emergency alerts cause panic! When people share fake "BREAKING!" alerts about earthquakes, floods, or tsunamis, it spreads fear and wastes emergency resources. Always verify before sharing!</div><div class="interactive-question">Emergency Alert Verification Checklist:</div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🏛️</span><span class="reveal-question">Check the Source Badge</span><span class="reveal-answer"><strong>Reliable:</strong> Official agencies (USGS, NOAA, FEMA), your school district account, verified government accounts<br><strong>NOT Reliable:</strong> Random social media posts, forwarded messages, accounts you don\'t recognize</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">⏰</span><span class="reveal-question">Check the Time Stamp</span><span class="reveal-answer">Alerts expire fast! Real emergency alerts are recent (within the last 15 minutes). Old alerts get reshared as "breaking news" - don\'t fall for it!</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">📋</span><span class="reveal-question">Look for Action Line</span><span class="reveal-answer">Real alerts tell people what to DO (evacuate, shelter in place, avoid area). Rumors rarely include clear actions - they just spread fear</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🔍</span><span class="reveal-question">Verify on Official Sites</span><span class="reveal-answer">If you\'re not sure, go directly to USGS, NOAA, or your district\'s official website. Don\'t trust forwarded messages!</span></div><div style="margin:12px 0;padding:12px;background:rgba(40,167,69,0.2);border-radius:10px;"><strong style="font-size:1.6rem;">✅ GOOD vs BAD Emergency Alert:</strong><br><div style="background:rgba(40,167,69,0.4);padding:10px;border-radius:8px;margin:8px 0;"><strong style="color:#28a745;">✓ GOOD:</strong> "USGS Alert: Magnitude 5.2 earthquake recorded near Los Angeles at 2:15 PM. No tsunami warning. Stay indoors and away from windows."<br><em>Why good: Official source, recent time, clear action steps</em></div><div style="background:rgba(220,53,69,0.4);padding:10px;border-radius:8px;margin:8px 0;"><strong style="color:#dc3545;">✗ BAD:</strong> "BREAKING!!! HUGE EARTHQUAKE!!! SHARE NOW!!!"<br><em>Why bad: No source, no time, no actions, just panic</em></div></div><div style="margin-top:12px;padding:12px;background:rgba(255,193,7,0.2);border-left:4px solid #ffc107;border-radius:5px;"><strong>🎯 Your Task:</strong> If you see an emergency alert online, practice using this checklist! Only share if it passes ALL checks.</div>'

                        },

                        {

                            title: '🚪 Exit Ticket',

                            content: 'Rank the four hazards from most to least concerning for the mission site. Explain the top choice with evidence.'

                        }

                    ]

                },

                'lesson22': {

                    title: 'Engineering Lab: Build a Resilient Structure (45 min)',

                    slides: [

                        {

                            title: '🔬 Lab Overview: Your Mission Today',

                            content: '<strong style="font-size:1.4rem;">🎯 YOUR GOAL: Build a structure that survives earthquakes, floods, and wind!</strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0;"><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #28a745;"><strong style="font-size:1.2rem;">✅ SUCCESS CRITERIA:</strong><br>1. Stays standing when table is shaken<br>2. Does not tip over from fan wind<br>3. Survives 5 water sprays<br>4. Holds a small weight on top</div><div style="background:rgba(220,53,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #dc3545;"><strong style="font-size:1.2rem;">⚠️ YOUR LIMITS:</strong><br>• Build time: 15 minutes<br>• Budget: $50 maximum<br>• Height: 30 cm max<br>• Use 3+ different materials</div></div><div style="background:rgba(102,126,234,0.3);padding:15px;border-radius:10px;"><strong>⏱️ TODAY\'S SCHEDULE:</strong><table style="width:100%;margin-top:8px;"><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">5 min</td><td style="padding:5px 10px;">Overview & Assign Teams</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">15 min</td><td style="padding:5px 10px;">Plan & Build</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">10 min</td><td style="padding:5px 10px;">Test All 3 Hazards</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">10 min</td><td style="padding:5px 10px;">Improve & Retest</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">5 min</td><td style="padding:5px 10px;">Debrief & Cleanup</td></tr></table></div>'

                        },

                        {

                            title: '🛠️ Step 1: Assign Roles & Get Materials',

                            content: '<strong style="font-size:1.3rem;">📋 TEACHER: Give each team an Engineering Log and assign roles.</strong><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:15px 0;"><div style="background:rgba(40,167,69,0.25);padding:15px;border-radius:10px;text-align:center;border:2px solid #28a745;"><strong style="font-size:1.5rem;">🔧 BUILDER</strong><br><br>Your job:<br>• Put pieces together<br>• Follow the plan<br>• Ask "Does this look right?"</div><div style="background:rgba(255,193,7,0.25);padding:15px;border-radius:10px;text-align:center;border:2px solid #ffc107;"><strong style="font-size:1.5rem;">📝 RECORDER</strong><br><br>Your job:<br>• Write in the log<br>• Draw the design<br>• Track the budget</div><div style="background:rgba(102,126,234,0.25);padding:15px;border-radius:10px;text-align:center;border:2px solid #667eea;"><strong style="font-size:1.5rem;">🧪 TESTER</strong><br><br>Your job:<br>• Check for problems<br>• Run the tests<br>• Record YES or NO</div></div><div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;"><strong style="font-size:1.8rem;">💰 MATERIAL PRICE LIST (Budget: $50 max)</strong><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:15px;font-size:1.5rem;"><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Craft Sticks: $2</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Cardboard Base: $5</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Plastic Cup: $3</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Clay Ball: $4</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Tape Strip: $1</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">String (1 ft): $1</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">5 Paper Clips: $1</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Straw: $2</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Foil Sheet: $3</div></div></div>'

                        },

                        {

                            title: '🧱 Step 2: Plan & Build (15 min)',

                            content: '<strong>📋 FOLLOW THESE STEPS EXACTLY:</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">1</div><div><strong>PLAN (3 min):</strong> Draw your design in the Engineering Log. Label each material. RECORDER does this.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">2</div><div><strong>BUDGET (2 min):</strong> Write the cost of each item. Add them up. MUST be under $50! RECORDER does this.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">3</div><div><strong>COLLECT:</strong> ONE person goes to the supply table. Get ONLY what is on your list.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">4</div><div><strong>BUILD (10 min):</strong> BUILDER puts it together. Start with the BASE. Build UP. Make joints STRONG with tape.</div></div></div><div style="background:rgba(220,53,69,0.2);padding:12px;border-radius:8px;border-left:4px solid #dc3545;"><strong>⚠️ SAFETY RULES:</strong> Walk, don\'t run • Stay at your table • Share materials • Clean as you go</div>'

                        },

                        {

                            title: '🧪 Step 3: Test Your Structure (10 min)',

                            content: '<strong>📋 TESTER: Run each test. RECORDER: Write YES or NO in your log.</strong><div style="margin:15px 0;"><div style="background:rgba(220,53,69,0.2);padding:15px;border-radius:10px;margin-bottom:12px;border-left:4px solid #dc3545;"><strong style="font-size:1.2rem;">🌍 EARTHQUAKE TEST</strong><br><strong>HOW TO DO IT:</strong> Place structure on table. Shake the table side-to-side gently for 10 seconds.<br><strong>CHECK:</strong> Did it stay standing? Circle: <strong>YES</strong> or <strong>NO</strong></div><div style="background:rgba(23,162,184,0.2);padding:15px;border-radius:10px;margin-bottom:12px;border-left:4px solid #17a2b8;"><strong style="font-size:1.2rem;">🌊 FLOOD TEST</strong><br><strong>HOW TO DO IT:</strong> Use spray bottle. Spray water 5 times at the BASE of your structure.<br><strong>CHECK:</strong> Did it resist the water? Circle: <strong>YES</strong> or <strong>NO</strong></div><div style="background:rgba(111,66,193,0.2);padding:15px;border-radius:10px;margin-bottom:12px;border-left:4px solid #6f42c1;"><strong style="font-size:1.2rem;">💨 WIND TEST</strong><br><strong>HOW TO DO IT:</strong> Point fan at structure on LOW setting for 10 seconds.<br><strong>CHECK:</strong> Did it stay up? Circle: <strong>YES</strong> or <strong>NO</strong></div></div><div style="background:rgba(255,193,7,0.2);padding:12px;border-radius:8px;"><strong>📝 RECORDER:</strong> Write what happened for each test in your Engineering Log!</div>'

                        },

                        {

                            title: '🔄 Step 4: Improve & Retest (10 min)',

                            content: '<strong>If any test FAILED, fix it and test again!</strong><div style="margin:15px 0;"><div style="background:rgba(255,255,255,0.1);padding:15px;border-radius:10px;margin-bottom:15px;"><strong style="font-size:1.2rem;">🔍 TEAM DISCUSSION (2 min):</strong><br>1. What part failed? (Be specific: "The top fell off" not just "It broke")<br>2. WHY did it fail? (Too heavy? Weak joints? Small base?)<br>3. What ONE change will fix it?</div><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;margin-bottom:15px;"><strong style="font-size:1.2rem;">🔧 MAKE ONE IMPROVEMENT (5 min):</strong><br>• RECORDER: Draw the change in your log FIRST<br>• BUILDER: Make the change<br>• TESTER: Get ready to test again</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:10px;"><strong style="font-size:1.2rem;">🧪 RETEST (3 min):</strong><br>• Run the test that FAILED again<br>• Did it work this time? Circle: <strong>YES</strong> or <strong>NO</strong><br>• This is called <strong>ITERATION</strong> - engineers do this many times!</div></div>'

                        },

                        {

                            title: '🎓 Debrief: What Works Best? (5 min)',

                            content: '<strong>📋 TEACHER: Show this to students AFTER testing. Discuss as a class.</strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:15px 0;"><div><img src="images/Bundle2/Lesson 22/resilient_structure_example.png" style="max-width:100%;border-radius:10px;box-shadow:0 4px 8px rgba(0,0,0,0.3);" alt="Optimal resilient structure"></div><div><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;margin-bottom:10px;"><strong style="font-size:1.3rem;">✅ WHY THIS DESIGN WORKS:</strong></div><div style="background:rgba(255,255,255,0.1);padding:12px;border-radius:8px;margin-bottom:8px;"><strong>1. WIDE BASE</strong><br>A wide base spreads out the weight and makes it harder to tip over during earthquakes and wind.</div><div style="background:rgba(255,255,255,0.1);padding:12px;border-radius:8px;margin-bottom:8px;"><strong>2. CROSS-BRACING</strong><br>Diagonal supports prevent swaying. They transfer force through the whole structure.</div><div style="background:rgba(255,255,255,0.1);padding:12px;border-radius:8px;margin-bottom:8px;"><strong>3. STRONG JOINTS</strong><br>Tape at every connection point. Weak joints are the #1 failure point!</div><div style="background:rgba(255,255,255,0.1);padding:12px;border-radius:8px;"><strong>4. LOW CENTER OF GRAVITY</strong><br>Heavier materials at the bottom, lighter on top. This prevents tipping.</div></div></div><div style="background:rgba(102,126,234,0.3);padding:15px;border-radius:10px;margin-top:10px;"><strong>🤔 CLASS DISCUSSION:</strong> Look at your structure. Which of these features did you use? Which would you add next time?<br><br><strong>🧹 CLEANUP:</strong> Turn in your Engineering Log • Throw away scraps • Return unused materials • Wipe table</div>'

                        }

                    ]

                },

                'lesson23': {

                    title: 'Bundle 2 Review: "The Earth Science Games"',

                    slides: [

                        {

                            title: '🎮 Warm-up: Pictionary Relay',

                            content: '<strong>🎨 Team Challenge!</strong><div style="margin:20px 0;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2rem;">How to Play:</strong><br>1. One person from your team comes to the board.<br>2. I will whisper a word (e.g., "Volcano").<br>3. You have 30 seconds to DRAW it.<br>4. First team to guess correctly gets a point!</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:15px;margin-top:20px;"><div style="background:rgba(102,126,234,0.2);padding:20px;border-radius:10px;text-align:center;font-size:3rem;">🌋</div><div style="background:rgba(40,167,69,0.2);padding:20px;border-radius:10px;text-align:center;font-size:3rem;">⛰️</div><div style="background:rgba(255,193,7,0.2);padding:20px;border-radius:10px;text-align:center;font-size:3rem;">🌊</div></div>'

                        },

                        {

                            title: '🃏 Game 1: Memory Match',

                            content: 'Find the matching pairs! Term <-> Definition.<div style="text-align:center;margin-bottom:10px;"><button onclick="initMemoryGame()" style="background:#667eea;color:white;border:none;padding:8px 16px;border-radius:20px;font-size:1.2rem;cursor:pointer;box-shadow:0 4px 6px rgba(0,0,0,0.1);transition:transform 0.2s;">🔄 New Game / Shuffle</button></div><div id="memory-game-board" class="memory-grid"></div><style>.memory-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-top: 10px; }.mem-card { aspect-ratio: 1; perspective: 1000px; cursor: pointer; }.mem-inner { position: relative; width: 100%; height: 100%; transition: transform 0.6s; transform-style: preserve-3d; }.mem-card.flipped .mem-inner { transform: rotateY(180deg); }.mem-front, .mem-back { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; padding: 4px; text-align: center; border-radius: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); user-select: none; }.mem-front { background: linear-gradient(135deg, #667eea, #764ba2); color: white; font-size: 1.5rem; z-index: 2; }.mem-back { background: white; color: #333; transform: rotateY(180deg); font-size: 0.7rem; font-weight: bold; z-index: 1; border: 2px solid #667eea; line-height: 1.1; overflow: hidden; }.mem-card.matched .mem-back { background: #d4edda; border-color: #28a745; }</style>'

                        },

                        {

                            title: '🏃 Game 2: Four Corners',

                            content: '<strong>Move to the corner (A, B, C, D) that matches the correct answer!</strong><div style="text-align:center;margin:15px 0;"><button onclick="initFourCorners()" style="background:#ffc107;color:#333;border:none;padding:10px 20px;border-radius:20px;font-size:1.2rem;cursor:pointer;font-weight:bold;box-shadow:0 4px 6px rgba(0,0,0,0.1);">▶️ Start/Restart Game</button></div><div id="four-corners-container" style="background:rgba(255,255,255,0.1);padding:20px;border-radius:15px;min-height:300px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;"><p>Click Start to begin!</p></div>'

                        },

                        {

                            title: '🎭 Game 3: Charades',

                            content: 'Act out the term! No talking!<div id="charades-grid-container" class="charades-grid"><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 1</span><span class="reveal-answer">TSUNAMI</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 2</span><span class="reveal-answer">LANDSLIDE</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 3</span><span class="reveal-answer">VOLCANO</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 4</span><span class="reveal-answer">SEDIMENT</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 5</span><span class="reveal-answer">EARTHQUAKE</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 6</span><span class="reveal-answer">WIND TURBINE</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 7</span><span class="reveal-answer">FOSSIL FUEL</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 8</span><span class="reveal-answer">EROSION</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 9</span><span class="reveal-answer">GLACIER</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 10</span><span class="reveal-answer">LAVA</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 11</span><span class="reveal-answer">SOLAR PANEL</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🤫</span><span class="reveal-question">Term 12</span><span class="reveal-answer">FAULT LINE</span></div></div><style>#charades-grid-container { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 15px; margin: 20px; width: 100%; } #charades-grid-container .reveal-item { width: auto !important; margin: 0 !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; height: 120px; text-align: center; } #charades-grid-container .reveal-answer { font-size: 1.5rem !important; margin: 5px 0 0 0 !important; display: none; opacity: 1 !important; color: #28a745 !important; } #charades-grid-container .reveal-item.revealed .reveal-answer { display: block !important; } @media (max-width: 768px) { #charades-grid-container { grid-template-columns: repeat(2, 1fr) !important; } }</style>'

                        },

                        {

                            title: '🎲 Game 4: Mission Jeopardy',

                            content: 'Pick a category and point value!<div style="text-align:center;margin-bottom:10px;"><span id="jeopardy-score" style="font-size:1.5rem;font-weight:bold;background:rgba(0,0,0,0.2);padding:5px 15px;border-radius:10px;">Score: 0</span> <button onclick="window.initJeopardy()" style="margin-left:15px;background:#dc3545;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">Start Game</button></div><div id="jeopardy-grid-game" class="jeopardy-grid"></div><div id="jeopardy-modal-game" class="jeopardy-modal"><div class="jeopardy-modal-content"><span class="close-modal" onclick="closeJeopardyModal()">×</span><div id="jeopardy-question"></div><div id="jeopardy-answer" style="display:none;margin-top:20px;color:#28a745;font-weight:bold;font-size:1.5rem;"></div><button id="jeop-reveal-btn" onclick="revealJeopardyAnswer()" style="margin-top:20px;padding:10px 20px;background:#ffc107;border:none;border-radius:5px;cursor:pointer;font-size:1.2rem;">Show Answer</button></div></div><style>.jeopardy-grid{display:grid;grid-template-columns:repeat(5,1fr) !important;gap:10px;width:100%;}.cat-header{background:#667eea;padding:10px;color:white;font-weight:bold;text-align:center;border-radius:5px;font-size:0.9rem;display:flex;align-items:center;justify-content:center;}.q-card{background:rgba(255,255,255,0.1);padding:15px;text-align:center;cursor:pointer;border-radius:5px;transition:0.3s;border:1px solid rgba(255,255,255,0.2);font-weight:bold;color:#ffc107;}.q-card:hover{background:rgba(255,255,255,0.2);transform:scale(1.05);}.q-card.disabled{background:rgba(0,0,0,0.1);color:rgba(255,255,255,0.2);cursor:default;pointer-events:none;}.jeopardy-modal{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;align-items:center;justify-content:center;}.jeopardy-modal-content{background:white;padding:40px;border-radius:15px;max-width:600px;width:90%;text-align:center;position:relative;color:#333;}.close-modal{position:absolute;top:10px;right:20px;font-size:2rem;cursor:pointer;}</style>'

                        },

                        {

                            title: '🏁 Mission Debrief: The Big Picture',

                            content: 'Connecting science to our Mining Mission.<div style="margin:20px 0;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;"><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🏗️</span><span class="reveal-question">Why care about the Ring of Fire?</span><span class="reveal-answer">Our mine is NEAR it! We need earthquake-proof buildings (Lesson 22).</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">⚡</span><span class="reveal-question">Why use renewable energy?</span><span class="reveal-answer">Coal runs out (nonrenewable). Using solar/wind shows we are responsible stewards.</span></div><div class="reveal-item" onclick="revealAnswer(this)"><span class="reveal-emoji">🌧️</span><span class="reveal-question">Why plant trees?</span><span class="reveal-answer">To stop EROSION! Mining clears land; roots hold the soil in place.</span></div></div><div style="margin-top:20px;padding:15px;background:rgba(40,167,69,0.2);border-left:4px solid #28a745;border-radius:5px;"><strong>👋 GOOD LUCK ON THE TEST!</strong> You are ready!</div>'

                        }

                    ]

                },

                'lesson24': {

                    title: 'Earth Science Test',

                    slides: [

                        {

                            title: '📝 Earth Science Test',

                            content: '<strong>Instructions:</strong><div style="margin:20px 0;padding:20px;background:rgba(255,255,255,0.1);border-radius:10px;"><strong style="font-size:2rem;">Before we begin:</strong><br>1. Clear your desk (except pencil and eraser).<br>2. Privacy folders up.<br>3. No talking.<br><br><strong style="font-size:1.8rem;color:#ffc107;">This test covers:</strong><br>• Weathering & Erosion<br>• Plate Tectonics<br>• Natural Hazards<br>• Resources</div>'

                        },

                        {

                            title: '🍀 Good Luck!',

                            content: '<strong>You are ready for this!</strong><div style="text-align:center;font-size:5rem;margin:30px;">🌟</div><div style="margin:15px 0;padding:15px;background:rgba(40,167,69,0.2);border-radius:10px;text-align:center;">Remember to read each question carefully and check your work!</div>'

                        },

                        {

                            title: '📚 Early Finishers',

                            content: '<strong>If you finish early:</strong><div style="margin:20px 0;padding:20px;background:rgba(102,126,234,0.2);border-radius:10px;">1. Turn your test over.<br>2. Read a silent reading book.<br>3. Or sketch a safety poster for the mining company on the back of your scratch paper.<br><br><strong>Please stay quiet for your classmates! 🤫</strong></div>'

                        }

                    ]

                },

                'lesson25': {
                    title: 'Potential Energy and Kinetic Energy',
                    slides: [
                        {
                            title: '🌅 Warm-up: The Slide Experience',
                            content: '<div class="journal-box"><strong>Think about a time you went down a tall slide at a playground.</strong><br><br>📓 <strong>Journal Task:</strong> Write or draw your answers to these questions:<ol style="line-height:1.8; margin-top:20px;"><li>When you were sitting at the <strong>TOP</strong> of the slide, how did you feel?</li><li>What happened to your <strong>SPEED</strong> as you went down?</li><li>When you reached the <strong>BOTTOM</strong>, what happened to your body?</li></ol></div>'
                        },
                        {
                            title: '🎯 Objectives & Vocabulary',
                            content: '<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Define <strong>Potential Energy</strong> (Stored) and <strong>Kinetic Energy</strong> (Moving).</li><li>Explain how height and mass affect the amount of stored energy.</li><li>Predict when energy transitions between these two forms.</li></ol></div><div style="margin-top:20px; padding:20px; background:rgba(0,212,170,0.15); border-radius:10px; font-size:1.8rem;"><strong>🛰️ Mission Context:</strong> Our lunar colony uses massive elevators to lower cargo into underground shelters. Understanding energy is the difference between a safe descent and a dangerous fall!</div>',
                            vocabulary: [
                                { term: 'Potential Energy', definition: 'Energy stored in an object due to its position (like height) or condition (like a stretched rubber band).' },
                                { term: 'Kinetic Energy', definition: 'The energy an object has because it is in motion.' },
                                { term: 'Joule', definition: 'The standard unit used to measure energy.' }
                            ]
                        },
                        {
                            title: '📜 The Story of James Joule',
                            content: '<div style="line-height:1.7;">In the 1840s, a brewer named <strong>James Joule</strong> was obsessed with how energy changes forms.</div><div class="journal-box" style="border-left-color:#ffbc00; background:rgba(255,193,7,0.1);"><strong>The Waterfall Discovery:</strong> While on his honeymoon at a giant waterfall, Joule didn\'t just look at the view. He used a thermometer! He discovered that the water at the <strong>Bottom</strong> of the fall was warmer than the water at the <strong>Top</strong>. He proved that the <strong>Potential Energy</strong> of the falling water turned into <strong>Heat</strong> when it crashed at the bottom! This proved that energy is never lost; it just changes from one recognizable form to another. Today, we measure energy in <strong>Joules</strong> to honor him!</div>'
                        },
                        {
                            title: '🧪 The Gravity Fall Mystery',
                            content: '<div style="line-height:1.7;">If you drop a feather and a hammer on the Moon, they hit the ground at the same time. Why?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Click to reveal the Physics Fact!</div><div class="reveal-content"><strong>Physics Fact:</strong> Gravity pulls on both equally! While the hammer has more <strong>Mass</strong> and thus more <strong>Potential Energy</strong>, it also needs more force to move. On Earth, air resistance slows the feather down, but in a vacuum, energy transformation happens perfectly for both!</div></div>'
                        },
                        {
                            title: '🏹 Engineering: The Elastic Bow',
                            content: '<div style="line-height:1.7;">Potential energy isn\'t just about height. It can be <strong>Elastic</strong>!</div><img src="images/Bundle3/bow_and_arrow_energy_1768923885901.png" style="width:50\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #ffbc00;"><div style="margin:20px 0; padding:25px; background:rgba(255,255,255,0.08); border-radius:12px; font-size:1.8rem;">Pulling back a bowstring bends the wood. That "bent" state stores energy. When released, the wood snaps back, transferring its <strong>Potential Energy</strong> into the arrow as <strong>Kinetic Energy</strong>.</div><div class="journal-box">📓 <strong>Think:</strong> What other toys use Elastic Potential Energy? <div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Click to see examples...</div><div class="reveal-content">Springs, rubber bands, Nerf guns, and slingshots!</div></div></div>'
                        },
                        {
                            title: '⚖️ The Law of Conservation',
                            content: '<div style="line-height:1.7;"><strong>Energy is never created or destroyed—it only <em>changes form</em>!</strong></div><div class="journal-box"><strong>The Energy Budget:</strong> Imagine energy is like money. You can move it from your Savings (Potential) to your Checking (Kinetic), but the total amount of money you have stays the same. You can\'t spend more than you have!</div>'
                        },
                        {
                            title: '🔬 STEM Interactive: Potential vs. Kinetic',
                            content: '<div style="margin-bottom:15px;"><strong>Observe the Transfer:</strong> Change height/mass and watch the transformation!</div><div id="threejs-container-l25" style="width:100%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initPotKinSim()">🛠️ Debug</button><button class="btn-drop" onclick="dropBall()">▶️ Drop Ball</button><button class="btn-pause" onclick="pauseBall()">⏸️ Pause</button><button class="btn-slow" onclick="slowMotion()">🐢 Slow Mo</button><button class="btn-reset" onclick="resetBall()">🔄 Reset</button></div><div class="energy-viz-container"><div class="energy-bar-wrap"><div class="energy-label"><span>Potential Energy</span><span id="pe-val">100%</span></div><div class="energy-bar-bg"><div id="pe-bar" class="energy-bar-fill pe-fill" style="width:100%"></div></div></div><div class="energy-bar-wrap"><div class="energy-label"><span>Kinetic Energy</span><span id="ke-val">0%</span></div><div class="energy-bar-bg"><div id="ke-bar" class="energy-bar-fill ke-fill" style="width:0%"></div></div></div></div>'
                        },
                        {
                            title: '🧮 Factor 1: Height and Potential Energy',
                            content: '<div style="line-height:1.7;"><strong>General Rule:</strong> The higher an object is, the MORE Potential Energy it has stored.</div><div class="what-if-box">🤔 <strong>What If:</strong> What if we doubled the height of a slide? How would that change the speed at the bottom?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Click to Reveal the Secret...</div><div class="reveal-content">Doubling the height doubles the Potential Energy. This means the object will have much more Kinetic Energy (speed) at the bottom!</div></div>'
                        },
                        {
                            title: '🧮 Factor 2: Mass and Potential Energy',
                            content: '<div style="line-height:1.7;"><strong>General Rule:</strong> The heavier (more mass) an object has, the MORE Potential Energy it stores at the same height.</div><div class="journal-box">📓 <strong>Think-Write-Share:</strong> Which has more Potential Energy at the top of a hill: a bicycle or a delivery truck? Why?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Click to Reveal...</div><div class="reveal-content">The delivery truck has much more mass, so it stores significantly more Potential Energy than the bicycle!</div></div>'
                        },
                        {
                            title: '🏎️ Perspective 1: Roller Coaster Engineering',
                            content: '<div style="line-height:1.7;">Engineers use energy to make rides exciting and safe.</div><div style="margin:15px 0; padding:20px; background:rgba(255,255,255,0.05); border-radius:10px; font-size:1.8rem;">The first hill is always the tallest because it sets the <strong>Maximum Potential Energy</strong> for the whole ride. Every hill after that must be shorter because some energy is "lost" to friction and sound.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Why does the chain pull you up slowly?</div><div class="reveal-content">The chain is doing work to give you Potential Energy. The slow climb is "charging up" your energy!</div></div>'
                        },
                        {
                            title: '🤸 Perspective 2: The Trampoline Jump',
                            content: '<div style="line-height:1.7;">A trampoline is an energy transformation machine!</div><table style="width:100%; border-collapse: collapse; margin-top:20px; font-size:1.8rem;"><tr style="background:rgba(255,255,255,0.1);"><th style="padding:15px; border:1px solid #444;">Action</th><th style="padding:15px; border:1px solid #444;">Energy Type</th></tr><tr><td style="padding:15px; border:1px solid #444;">Highest point of jump</td><td style="padding:15px; border:1px solid #444;">Max Gravitational Potential Energy</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:15px; border:1px solid #444;">Falling down</td><td style="padding:15px; border:1px solid #444;">Potential → Kinetic</td></tr><tr><td style="padding:15px; border:1px solid #444;">Stretching the mat</td><td style="padding:15px; border:1px solid #444;">Kinetic → Elastic Potential</td></tr></table>'
                        },
                        {
                            title: '🤔 What If Scenario: Lunar Gravity',
                            content: '<div class="what-if-box"><strong>What If:</strong> You were on the Moon where gravity is 6 times weaker. If you dropped a ball from the same height as on Earth, would it have more or less Potential Energy?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Predict the Result...</div><div class="reveal-content">It would have LESS Potential Energy because the "pull" of gravity is weaker. It would also hit the ground much slower (less Kinetic Energy).</div></div>'
                        },
                        {
                            title: '🛰️ Mission Application: Cargo Lift Safety',
                            content: '<div style="line-height:1.7;">Our Lunar Colony cargo lifts carry 5,000kg of equipment.</div><img src="images/Bundle3/lunar_cargo_elevator_1768923504675.png" style="width:60%; display:block; margin:20px auto; border-radius:12px; border:2px solid #00d4aa;"><div class="journal-box" style="border-left-color:#dc3545; background:rgba(220,53,69,0.1);"><strong>The Problem:</strong> When the lift is at the top of the 50m shaft, it has massive Potential Energy. If the cables break, all that energy becomes a dangerous crash!</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Engineering Solution...</div><div class="reveal-content">We use "Emergency Dampeners" (giant springs). They catch the falling lift and turn the Kinetic Energy back into Elastic Potential Energy, stopping the crash safely!</div></div>'
                        },
                        {
                            title: '📊 Organizer: Categorize the Energy',
                            content: '<div style="margin-bottom:15px;">Decide if each example is primarily <strong>Potential</strong> or <strong>Kinetic</strong>:</div><div class="structure-grid" style="grid-template-columns: repeat(2, 1fr); gap:15px;"><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin:0;"><div class="reveal-hint">🪨 A boulder on a cliff</div><div class="reveal-content" style="color:#00d4aa; font-weight:bold;">Potential</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin:0;"><div class="reveal-hint">🏃 A student sprinting</div><div class="reveal-content" style="color:#00d4aa; font-weight:bold;">Kinetic</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin:0;"><div class="reveal-hint">🏹 A pulled bowstring</div><div class="reveal-content" style="color:#00d4aa; font-weight:bold;">Potential (Elastic)</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin:0;"><div class="reveal-hint">⚽ A ball in mid-air</div><div class="reveal-content" style="color:#00d4aa; font-weight:bold;">Both! (Mostly Kinetic)</div></div></div>'
                        },
                        {
                            title: '🚪 Exit Ticket',
                            content: '<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. Explain why the first hill of a roller coaster must be the tallest.<br><br>2. How does adding more "stuff" (mass) change Potential Energy at the top of a hill?</div>'
                        }
                    ]
                },
                'lesson26': {
                    title: 'Energy Conservation and Transformation',
                    slides: [
                        {
                            title: '🌅 Warm-up: The Hand-Crank Flashlight',
                            content: '<div class="journal-box"><strong>Imagine you have a flashlight that doesn\'t need batteries.</strong><img src="images/Bundle3/hand_crank_flashlight_diagram_1768923526090.png" style="width:50\%; display:block; margin:15px auto; border-radius:12px; border:2px solid #667eea;"><br>📓 <strong>Journal Task:</strong> Describe the energy journey:<ol style="line-height:1.8; margin-top:10px;"><li>What kind of energy are YOU putting into the crank?</li><li>What kind of energy comes out of the lightbulb?</li><li>If you stop cranking, why does the light eventually go out instead of staying on forever?</li></ol></div>'
                        },
                        {
                            title: '🎯 Objectives & Vocabulary',
                            content: '<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain the <strong>Law of Conservation of Energy</strong>.</li><li>Identify multiple <strong>Energy Transformations</strong> in a single system.</li><li>Define <strong>Efficiency</strong> and explain why systems produce waste heat.</li><li>Trace energy paths from natural sources (wind/water) to electrical power.</li></ol></div><div style="margin-top:20px; padding:20px; background:rgba(0,212,170,0.15); border-radius:10px; font-size:1.8rem;"><strong>🛰️ Mission Context:</strong> On our lunar colony, we can\'t afford to waste energy. Every Joule we collect from the sun must be used efficiently to keep our life support systems running.</div>',
                            vocabulary: [
                                { term: 'Conservation of Energy', definition: 'The scientific principle that energy cannot be created or destroyed, only transformed.' },
                                { term: 'Energy Transformation', definition: 'The process of changing one form of energy into another.' },
                                { term: 'Efficiency', definition: 'How much useful energy you get out of a system compared to what you put in.' },
                                { term: 'Electromagnetic Induction', definition: 'Creating an electrical current by moving a magnet near a wire.' }
                            ]
                        },
                        {
                            title: '🧪 The Perpetual Motion Challenge',
                            content: '<div style="line-height:1.7;">For centuries, inventors tried to build a machine that could run forever without any fuel. Why is this impossible?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Is it possible to run forever?</div><div class="reveal-content"><strong>The Answer:</strong> Friction and Sound! Every time parts rub together, some energy is "stolen" and turned into heat. Without an outside source of energy (like the Sun or a Battery), every machine will eventually run out of energy and stop.</div></div>'
                        },
                        {
                            title: '📜 The Humbleness of Michael Faraday',
                            content: '<div style="line-height:1.7;">Michael Faraday wasn\'t a wealthy scientist. He was a bookbinder\'s apprentice who taught himself science by reading the books he was binding!</div><div class="journal-box">In 1831, he proved that you could "catch" electricity from thin air by moving a magnet near a wire. People asked, "What is the use of this?" He famously replied, "What is the use of a newborn baby?" He knew his discovery would grow into something world-changing.</div>'
                        },
                        {
                            title: '⚡ Faraday\'s Discovery: Induction',
                            content: '<div style="line-height:1.7;">Moving a magnet through a coil of wire causes electricity to flow.</div><div class="journal-box" style="border-left-color:#00d4aa; background:rgba(0,212,170,0.1);">This simple discovery is how almost all electricity in the world is made today! Whether it\'s a coal plant, a nuclear plant, or a wind turbine, it\'s just a big machine designed to spin a magnet near a wire.</div>'
                        },
                        {
                            title: '🔬 The "Price" of Change: Waste Heat',
                            content: '<div style="line-height:1.7;">In every transformation, some energy is turned into forms we don\'t want. This is usually <strong>Heat</strong> or <strong>Sound</strong>.</div><div class="what-if-box">🤔 <strong>What If:</strong> You left an old-fashioned lightbulb on for an hour. If you touched it (don\'t!), it would be very hot. Was that heat the purpose of the bulb?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Is heat the goal?</div><div class="reveal-content">No! The purpose is Light. The heat is <strong>Waste Energy</strong>. This makes the bulb less <strong>Efficient</strong>.</div></div>',
                            vocabulary: [{ term: 'Waste Energy', definition: 'Energy that transforms into a non-useful form, usually heat.' }]
                        },
                        {
                            title: '⚙️ How Generators Work: Induction',
                            content: '<div style="line-height:1.7;">A generator is a machine that turns <strong>Motion</strong> into <strong>Electricity</strong>.</div><div style="margin:20px 0; padding:25px; background:rgba(255,255,255,0.05); border-radius:12px; font-size:1.8rem;"><strong>The Secret:</strong> When you spin a magnet inside a coil of copper wire, it pushes the electrons in the wire, creating an electrical current. This is called <em>Electromagnetic Induction</em>.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Why use spinning turbines?</div><div class="reveal-content">Almost all power plants (coal, nuclear, wind) use giant spinning turbines because they provide the <strong>Mechanical Motion</strong> needed to spin the magnets and create electricity!</div></div>'
                        },
                        {
                            title: '🔬 STEM Interactive: The Crank Lab',
                            content: '<div style="margin-bottom:15px;"><strong>Test the Efficiency:</strong> Crank the wheel to generate power. Watch how much "Heat" is lost!</div><div id="threejs-container-l26" style="width:100\%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initCrankSim()">🛠️ Debug</button><button class="btn-drop" onclick="crankSystem()">⚙️ Crank Wheel</button><button class="btn-pause" onclick="pauseSim()">⏸️ Pause</button><button class="btn-slow" onclick="slowMoSim()">🐢 Slow Mo</button><button class="btn-reset" onclick="resetSim()">🔄 Reset</button></div><div class="energy-viz-container"><div class="energy-bar-wrap"><div class="energy-label"><span>Electrical Power</span><span id="power-val">0 J</span></div><div class="energy-bar-bg"><div id="power-bar" class="energy-bar-fill ke-fill" style="width:0\%"></div></div></div><div class="energy-bar-wrap"><div class="energy-label"><span>Waste Heat</span><span id="heat-val">0 J</span></div><div class="energy-bar-bg"><div id="heat-bar" class="energy-bar-fill pe-fill" style="width:0\%; background:#ff4444;"></div></div></div></div>'
                        },
                        {
                            title: '🧮 Factor 1: Speed and Power',
                            content: '<div style="line-height:1.7;"><strong>Rule:</strong> The faster the magnet spins, the MORE electricity is generated.</div><div class="what-if-box">🤔 <strong>What If:</strong> A wind turbine is spinning very slowly on a calm day. How does that affect the lights in a nearby town?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How does speed affect power?</div><div class="reveal-content">Slow spinning means less energy is being transformed. The town might need to use stored battery power or other power plants to keep the lights on!</div></div>'
                        },
                        {
                            title: '🧮 Factor 2: Load and Resistance',
                            content: '<div style="line-height:1.7;">Adding more "Load" (like turning on more appliances) makes the generator harder to turn!</div><div class="journal-box">📓 <strong>Think-Write-Share:</strong> Why is it harder to pedal a bicycle with a dynamo light turned ON than with it turned OFF?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Why the extra effort?</div><div class="reveal-content">When the light is on, you are transforming your muscle energy into light. That energy has to come from somewhere—YOU! The movement requires more work to generate the electricity.</div></div>'
                        },
                        {
                            title: '🌬️ Perspective 1: Wind Turbines',
                            content: '<div style="line-height:1.7;">Wind turbines are giant energy transformers.</div><div class="journal-box" style="background:rgba(255,255,255,0.08);"><strong>The Chain:</strong><br><ol><li>Moving Air (Kinetic)</li><li>Spinning Blades (Mechanical)</li><li>Generator (Magnetic Induction)</li><li>Power Lines (Electrical)</li></ol></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What is the "Waste" here?</div><div class="reveal-content">The "whoosh" sound of the blades and the heat from friction in the gears! Even wind turbines aren\'t 100\% efficient.</div></div>'
                        },
                        {
                            title: '🌊 Perspective 2: Hydroelectric Dams',
                            content: '<div style="line-height:1.7;">Dams use the Potential Energy of water stored high up.</div><div class="journal-box">The water falls down a pipe (Potential → Kinetic), spins a turbine (Mechanical), which spins a generator (Electrical). It is one of the most efficient forms of power!</div>'
                        },
                        {
                            title: '🤔 What If Scenario: 100\% Efficiency?',
                            content: '<div class="what-if-box"><strong>What If:</strong> We built a machine that had zero friction and zero sound. Could it run forever without any source of energy?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 The Impossible Dream...</div><div class="reveal-content">No! This is called a "Perpetual Motion Machine." Even with zero waste, you can\'t get MORE energy out than you put in. The Law of Conservation says energy must come from somewhere!</div></div>'
                        },
                        {
                            title: '🛰️ Mission Application: Regenerative Braking',
                            content: '<div style="line-height:1.7;">Our Lunar Rovers used "Regenerative Braking" to save power.</div><div class="journal-box" style="border-left-color:#00d4aa; background:rgba(0,212,170,0.1);"><strong>The Solution:</strong> When the driver hits the brakes, the motors turn into <em>generators</em>. Instead of wasting the kinetic energy as heat, they turn it back into electricity and charge the battery!</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Why use this on the Moon?</div><div class="reveal-content">Batteries are heavy and hard to replace. Reusing energy means the rover can travel further without needing a recharge station!</div></div>'
                        },
                        {
                            title: '📊 Organizer: Intended vs. Unintended',
                            content: '<div style="margin-bottom:15px;">For each device, identify the <strong>Intended</strong> (Useful) and <strong>Unintended</strong> (Waste) energy:</div><table style="width:100\%; border-collapse: collapse; font-size:1.8rem;"><tr style="background:rgba(255,255,255,0.1);"><th style="padding:15px; border:1px solid #444;">Device</th><th style="padding:15px; border:1px solid #444;">Intended</th><th style="padding:15px; border:1px solid #444;">Unintended</th></tr><tr><td style="padding:15px; border:1px solid #444;">Hair Dryer</td><td style="padding:15px; border:1px solid #444;">Thermal (Heat)</td><td style="padding:15px; border:1px solid #444;">Sound / Motor Heat</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:15px; border:1px solid #444;">Game Console</td><td style="padding:15px; border:1px solid #444;">Light / Sound</td><td style="padding:15px; border:1px solid #444;">Thermal (Heat)</td></tr><tr><td style="padding:15px; border:1px solid #444;">Electric Mixer</td><td style="padding:15px; border:1px solid #444;">Mechanical</td><td style="padding:15px; border:1px solid #444;">Heat / Sound</td></tr></table>'
                        },
                        {
                            title: '🚪 Exit Ticket',
                            content: '<div class="journal-box"><strong>Journal Task:</strong> Answer these two questions in complete sentences:<br><br>1. Explain why a bouncing ball eventually stops bouncing instead of going forever.<br><br>2. What is one way we can make a machine more <em>efficient</em>? (Hint: Think about friction!)</div>'
                        }
                    ]
                },
                'lesson27': {
                    title: 'Momentum and Collisions',
                    slides: [
                        {
                            title: '🌅 Warm-up: The Momentum Mystery',
                            content: '<div class="journal-box"><strong>Imagine a bowling ball and a balloon are rolling toward you at the exact same speed.</strong><br><br>📓 <strong>Journal Task:</strong> Answer these questions:<ol style="line-height:1.8; margin-top:10px;"><li>Which one would be harder to stop with your hands? Why?</li><li>Now imagine the balloon is moving at 1,000 miles per hour. Would it still be easy to stop?</li><li>What two things determine how much "oomph" (energy) a moving object has?</li></ol></div>'
                        },
                        {
                            title: '🎯 Objectives & Vocabulary',
                            content: '<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Define <strong>Momentum</strong> as the product of mass and velocity.</li><li>Predict the results of a <strong>Collision</strong> between objects of different sizes.</li><li>Explain how energy is <strong>Transferred</strong> during an impact.</li><li>Identify engineering solutions (like airbags) that reduce collision force.</li></ol></div><div style="margin-top:20px; padding:20px; background:rgba(220,53,69,0.1); border-radius:10px; font-size:1.8rem;"><strong>🛰️ Mission Context:</strong> Even a tiny speck of space dust can damage our lunar base if it is moving fast enough. Understanding collisions is a matter of life and death in space!</div>',
                            vocabulary: [
                                { term: 'Momentum', definition: 'The strength or force that something has when it is moving. Calculated by Mass x Velocity.' },
                                { term: 'Collision', definition: 'An instance of one moving object striking against another.' },
                                { term: 'Velocity', definition: 'The speed of an object in a particular direction.' },
                                { term: 'Transfer', definition: 'When energy moves from one object to another during contact.' }
                            ]
                        },
                        {
                            title: '📜 The Isaac Newton Legacy',
                            content: '<div style="line-height:1.7;">In the 1600s, Sir Isaac Newton sat under an apple tree (maybe!) and wondered why things moved.</div><div class="journal-box">He realized that objects have a "Quantity of Motion" that depends on how much stuff they are made of and how fast they are going. He called this <strong>Momentum</strong>. His Laws of Motion are the foundation for how we land rockets on the Moon today!</div>'
                        },
                        {
                            title: '🧪 Case Study: Newton\'s Cradle',
                            content: '<div style="line-height:1.7;">Momentum must be conserved. The energy from the first ball travels <em>through</em> the middle balls and is transferred to the last one.</div><img src="images/Bundle3/newtons_cradle_physics_1768923544486.png" style="width:50\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #667eea;"><div class="journal-box">📓 <strong>Think:</strong> If you pull back TWO balls, how many will pop out the other side? Why?</div>'
                        },
                        {
                            title: '🎱 Perspective: The Physics of Billiards',
                            content: '<div style="line-height:1.7;">Pool players use momentum every time they take a shot.</div><div class="journal-box" style="background:rgba(0,188,212,0.1);">When the cue ball hits a target ball perfectly straight, it stops completely and the target ball moves away at the same speed. The Cue Ball has transferred 100\% of its <strong>Momentum</strong>!</div>'
                        },
                        {
                            title: '🔬 Math Moment: The Speed Squared Rule',
                            content: '<div style="line-height:1.7;">Speed is extremely powerful. In the math of Kinetic Energy, speed is <strong>squared</strong>.</div><div class="what-if-box"><strong>Rule:</strong> If you double the speed of a car, it doesn\'t just have 2x the energy... it has <strong>4x the energy</strong>!</div><div class="journal-box">📓 <strong>Think-Write-Share:</strong> Why are speed limits so much lower in school zones than on highways?</div>'
                        },
                        {
                            title: '☄️ Perspective 1: Meteorite Impacts',
                            content: '<div style="line-height:1.7;">A meteorite the size of a house can wipe out a city because they travel at <strong>40,000 miles per hour</strong>!</div><img src="images/Bundle3/meteorite_impact_energy_1768923948747.png" style="width:60\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #ff4444;"><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Where does the rock go?</div><div class="reveal-content">The energy is so great that most of the meteorite <em>vaporizes</em> into gas and dust instantly! The energy turns the solid rock into a massive explosion of heat.</div></div>'
                        },
                        {
                            title: '🔬 STEM Interactive: The Collision Lab',
                            content: '<div style="margin-bottom:15px;"><strong>Test the Impact:</strong> Change the mass and speed of the spheres to see the energy transfer!</div><div id="threejs-container-l27" style="width:100\%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initCollisionSim()">🛠️ Debug</button><button class="btn-drop" onclick="launchCollision()">💥 CRASH!</button><button class="btn-pause" onclick="pauseCollision()">⏸️ Pause</button><button class="btn-slow" onclick="slowMoCollision()">🐢 Slow Mo</button><button class="btn-reset" onclick="resetCollision()">🔄 Reset</button></div><div class="energy-viz-container"><div class="energy-bar-wrap"><div class="energy-label"><span>Impact Force</span><span id="impact-val">0 N</span></div><div class="energy-bar-bg"><div id="impact-bar" class="energy-bar-fill ke-fill" style="width:0\%; background:#dc3545;"></div></div></div></div>'
                        },
                        {
                            title: '🧮 Factor 1: Mass and Impact',
                            content: '<div style="line-height:1.7;"><strong>General Rule:</strong> Increasing mass increases the energy transferred in a collision.</div><div class="what-if-box">🤔 <strong>What If:</strong> A semi-truck and a small sports car hit a wall at the same speed. Which one causes more damage to the wall?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Which vehicle wins?</div><div class="reveal-content">The semi-truck. Its massive mass gives it much more momentum, even though the speeds were the same. It carries more "moving energy" into the wall!</div></div>'
                        },
                        {
                            title: '🧮 Factor 2: Speed and Impact',
                            content: '<div style="line-height:1.7;"><strong>General Rule:</strong> Increasing speed has a massive effect on impact force.</div><div class="journal-box">📓 <strong>Journal Task:</strong> Draw two cars. Label car A as "20 mph" and car B as "60 mph." Use arrows to show which one has more Kinetic Energy. Remember the Squared Rule!</div>'
                        },
                        {
                            title: '🚗 Perspective 2: Crumple Zones',
                            content: '<div style="line-height:1.7;">Why do modern cars look like they "explode" into pieces during a crash?</div><div class="journal-box"><strong>Engineering Secret:</strong> Engineers design the front of the car to <em>squish</em>. This uses up kinetic energy to bend the metal, instead of passing that energy into the person inside. It "stretches" the time of the crash, reducing the peak force!</div>'
                        },
                        {
                            title: '👷 Perspective 3: Sports Safety',
                            content: '<div style="line-height:1.7;">Football helmets and bike helmets are energy absorbers.</div><div style="margin:20px 0; display:flex; gap:20px; align-items:center;"><div class="journal-box" style="flex:1;">The foam inside a helmet is designed to crush. Just like a car\'s crumple zone, it turns the high-speed impact into a slightly slower stop, protecting your brain from the energy transfer.</div></div>'
                        },
                        {
                            title: '🤔 What If Scenario: Asteroid Defense',
                            content: '<div class="what-if-box"><strong>What If:</strong> An asteroid was heading for Earth. Could we stop it by hitting it with a small, very fast rocket?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How can we nudge a giant rock?</div><div class="reveal-content">Yes! NASA recently did this (the DART mission). Even though the rocket was small, its <strong>High Speed</strong> gave it enough momentum to "nudge" the asteroid into a different path!</div></div>'
                        },
                        {
                            title: '🛰️ Mission Link: Soft Landing on Ceres',
                            content: '<div style="line-height:1.7;">When our supply ships land on Ceres, they have massive Kinetic Energy.</div><div class="journal-box" style="border-left-color:#00d4aa; background:rgba(0,212,170,0.1);"><strong>The Problem:</strong> If they hit the ground too fast, the energy transfer will crush the ship.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Engineering Solution...</div><div class="reveal-content">We use retractable legs with giant shock absorbers (springs). They catch the energy and turn it into <strong>Elastic Potential Energy</strong> instead of a crash!</div></div>'
                        },
                        {
                            title: '🚪 Exit Ticket',
                            content: '<div class="journal-box"><strong>Journal Task:</strong> Answer these two questions in complete sentences:<br><br>1. If you want to increase an object\'s momentum, what are the two things you could do?<br><br>2. Why does a soft pillow feel better to fall on than a hard floor? (Use the word "Energy Transfer" in your answer!)</div>'
                        }
                    ]
                },
                'lesson28': {
                    title: 'LAB 1: Collision Chaos (45 min)',
                    slides: [
                        {
                            title: '🔬 Lab Overview: Your Mission Today',
                            content: '<strong style="font-size:1.4rem;">🎯 YOUR GOAL: Knock the cup as far as possible using Energy Transfer!</strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0;"><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #28a745;"><strong style="font-size:1.2rem;">✅ SUCCESS CRITERIA:</strong><br>1. Complete 3 trials for every test<br>2. Measured distance in Centimeters<br>3. Successful "Energy Chain" identification</div><div style="background:rgba(220,53,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #dc3545;"><strong style="font-size:1.2rem;">⚠️ SAFETY RULES:</strong><br>• Marbles stay on tables<br>• Clear the "Crash Zone" before drop<br>• Wear eye protection if requested</div></div><div style="background:rgba(102,126,234,0.3);padding:15px;border-radius:10px;"><strong>⏱️ TODAY\'S SCHEDULE:</strong><table style="width:100%;margin-top:8px;"><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">10 min</td><td style="padding:5px 10px;">Mission Overview & Setup</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">30 min</td><td style="padding:5px 10px;">Tests A, B, and C (3 trials each)</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">5 min</td><td style="padding:5px 10px;">Cleanup & Final Reflection</td></tr></table></div>'
                        },
                        {
                            title: '🛠️ Supplies & Setup',
                            content: '<div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;"><strong style="font-size:1.8rem;">📦 WHAT YOU NEED:</strong><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:15px;font-size:1.5rem;"><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Study Ramp</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Measuring Tape</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Small Marble</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Large Marble</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Plastic Cup</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Masking Tape</div></div></div><div style="margin-top:20px;padding:15px;background:rgba(255,193,7,0.15);border-radius:10px;"><strong>📐 SETUP STEPS:</strong><ol><li>Tape your ramp to the table so it doesn\'t move.</li><li>Mark your "Start Line" at the bottom of the ramp.</li><li>Place the cup exactly on the Start Line.</li></ol></div>'
                        },
                        {
                            title: '🏁 Procedure: Step-by-Step (30 min)',
                            content: '<strong>📋 FOLLOW THESE STEPS FOR ALL 3 TESTS:</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">A</div><div><strong>TEST SPEED (Height):</strong> Release the Small Marble from <strong>10cm</strong> height. Do this 3 times! Then move to <strong>30cm</strong>.</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">B</div><div><strong>TEST MASS (Weight):</strong> Switch to the <strong>Large Marble</strong>. Release from 30cm. Do this 3 times!</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">C</div><div><strong>MEASURE:</strong> For every trial, measure from the Start Line to where the cup stopped.</div></div></div>'
                        },
                        {
                            title: '📊 Data Recording: The Trial Matrix',
                            content: '<div style="margin-bottom:15px;">📋 Use this structure to record your results (cm):</div><table style="width:100\%; border-collapse: collapse; font-size:1.8rem; text-align:center;"><tr style="background:#444;"><th style="padding:10px; border:1px solid #666;">Test Group</th><th style="padding:10px; border:1px solid #666;">Trial 1</th><th style="padding:10px; border:1px solid #666;">Trial 2</th><th style="padding:10px; border:1px solid #666;">Trial 3</th><th style="padding:10px; border:1px solid #666; background:#28a745;">Average</th></tr><tr><td style="padding:10px; border:1px solid #666;">Small @ 10cm</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:10px; border:1px solid #666;">Small @ 30cm</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr><tr><td style="padding:10px; border:1px solid #666;">Large @ 30cm</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr></table><div style="margin-top:15px;padding:10px;background:rgba(102,126,234,0.2);border-radius:8px;"><strong>🧮 How to Average:</strong> (T1 + T2 + T3) ÷ 3.</div>'
                        },
                        {
                            title: '🧠 Scientific Integration: Why it Matters',
                            content: '<div style="line-height:1.7;"><strong>Use what you learned in Lessons 25-27 to answer:</strong></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Q1: Why did 30cm move further than 10cm? (L25)</div><div class="reveal-content">Because higher ramps give the marble more <strong>Potential Energy</strong>. When it rolls, that turns into more <strong>Kinetic Energy</strong> (Speed)!</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">🔍 Q2: Why did the Large marble win at 30cm? (L27)</div><div class="reveal-content">Mass matters! The Large marble has more <strong>Momentum</strong> (Mass x Speed), carrying more "oomph" into the crash.</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">🔍 Q3: What was the Energy Transformation? (L26)</div><div class="reveal-content">Potential Energy (at top) → Kinetic Energy (rolling) → Kinetic Transfer (hitting cup) + Sound + Heat!</div></div>'
                        },
                        {
                            title: '🚪 Cleanup & Final Reflection',
                            content: '<div class="journal-box"><strong>🧹 MINUTE 40: CLEANUP</strong><ol><li>All marbles in the bin?</li><li>Tape removed from tables?</li><li>Data signed by your partner?</li></ol></div><div style="margin-top:20px;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;border:2px solid #28a745;"><strong>📓 FINAL THOUGHT:</strong> If we did this on the Moon with 6x less gravity, would the cup move further or less? Why?</div>'
                        }
                    ]
                },
                'lesson29': {
                    title: 'Mechanical and Sound Waves',
                    slides: [
                        {
                            title: '🌅 Warm-up: The Pebble in the Puddle',
                            content: '<div class="journal-box"><strong>When you drop a pebble into a calm pond, ripples move outward.</strong><br><br>📓 <strong>Journal Task:</strong> Answer these questions:<ol style="line-height:1.8; margin-top:10px;"><li>Does the water move <em>with</em> the ripple to the edge of the pond, or just wiggle in place?</li><li>If you shout across a room, do the air molecules from your mouth travel to your friend\'s ear, or is it just a "wiggle" passing through?</li></ol></div>'
                        },
                        {
                            title: '🎯 Objectives & Vocabulary',
                            content: '<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain that <strong>Sound</strong> is energy traveling as a mechanical wave.</li><li>Identify the <strong>Medium</strong> (solid, liquid, or gas) a wave is traveling through.</li><li>Connect <strong>Amplitude</strong> to volume and <strong>Frequency</strong> to pitch.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#667eea; background:rgba(102,126,234,0.15);"><strong>🛰️ Mission Context:</strong> On the Moon, there is no air (atmosphere). That means waves have no "stuff" to wiggle. In space, no one can hear you shout!</div>',
                            vocabulary: [
                                { term: 'Vibration', definition: 'The rapid back-and-forth motion of an object or medium.' },
                                { term: 'Medium', definition: 'The substance through which a wave can travel.' },
                                { term: 'Amplitude', definition: 'The height of a wave; determines volume.' },
                                { term: 'Frequency', definition: 'How many waves pass a point per second; determines pitch.' },
                                { term: 'Wavelength', definition: 'The distance between two peaks of a wave.' }
                            ]
                        },
                        {
                            title: '🐋 Perspective 1: Whale Song Oceans',
                            content: '<div style="line-height:1.7;">Sound travels <strong>4 times faster</strong> in water than in air!</div><img src="images/Bundle3/whale_waves_ocean_1768923574936.png" style="width:60\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #00bcd4;"><div class="journal-box" style="background:rgba(0,188,212,0.1); border-left-color:#00bcd4;">Because water molecules are packed tighter than air, they don\'t have to travel as far to "bump" their neighbor. Whales can hear each other from miles away!</div>'
                        },
                        {
                            title: '📜 The Day Edison "Froze" Sound',
                            content: '<div style="line-height:1.7;">In 1877, Thomas Edison did the impossible. He <em>captured</em> a human voice.</div><img src="images/Bundle3/old_phonograph_edison_1768923924163.png" style="width:50\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #ffbc00;"><div class="journal-box" style="background:rgba(255,193,7,0.1); border-left-color:#ffbc00;">He realized sound waves were physical. Using a needle, he scratched the vibrations of his voice into a wax cylinder. When he ran the needle back over those scratches, his voice came back out! <strong>Sound is Physical Energy!</strong></div>'
                        },
                        {
                            title: '🦇 Case Study: Echolocation',
                            content: '<div style="line-height:1.7;">How do you "see" without light? <strong>Sound Waves!</strong></div><div class="journal-box">Bats emit high-frequency "clicks" (waves). These waves bounce off a moth (Reflection) and return to the bat\'s ears. By timing how long it takes for the echo to return, the bat knows exactly where the moth is!</div>'
                        },
                        {
                            title: '📞 Engineering Challenge: String Phones',
                            content: '<div style="line-height:1.7;">Can sound travel through a piece of string?</div><div class="journal-box">When you talk into a cup, your voice vibrates the bottom of the cup. That vibration travels along the <strong>tight</strong> string (Solid Medium) to the other cup. If the string is loose, the energy "leaks out" and the wave stops!</div>'
                        },
                        {
                            title: '🎻 Music Theory: The Science of Pitch',
                            content: '<div style="line-height:1.7;">Why does a guitar string change sound?</div><div class="journal-box" style="background:rgba(156,39,176,0.1); border-left-color:#9c27b0;">When you tighten a string, you make it vibrate <strong>faster</strong>. Faster vibrations = High Frequency = High Pitch. If you use a thicker, heavier string, it vibrates <strong>slower</strong> = Low Frequency = Low Pitch.</div>'
                        },
                        {
                            title: '🔬 STEM Interactive: Wave Visualizer',
                            content: '<div style="margin-bottom:15px;"><strong>Wave Lab:</strong> Adjust the dials to see how vibrations turn into waves!</div><div id="threejs-container-l29" style="width:100\%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="if(window.initSoundSim) window.initSoundSim()">🛠️ Debug</button><button class="btn-drop" onclick="startOscillator()">🔊 Start Wave</button><button class="btn-pause" onclick="pauseWave()">⏸️ Pause</button><button class="btn-slow" onclick="slowMoWave()">🐢 Slow Mo</button><button class="btn-reset" onclick="resetWave()">🔄 Reset</button></div>'
                        },
                        {
                            title: '🤔 What If Scenario: Air in Space?',
                            content: '<div class="what-if-box"><strong>What If:</strong> Outer space was filled with air instead of a vacuum?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 The Roar of the Sun...</div><div class="reveal-content">The Sun is a giant, exploding ball of fire. If there was air to carry the sound, it would be as constant as a loud rock concert—over 100 decibels everywhere on Earth! We would never have a quiet moment.</div></div>'
                        },
                        {
                            title: '🧮 Math Moment: Wave Patterns',
                            content: '<div style="line-height:1.7;"><strong>The Inverse Rule:</strong> If you keep the wave speed the same:</div><div style="margin:20px 0; padding:25px; background:rgba(255,255,255,0.08); border-radius:12px; font-size:1.8rem;">📈 High Frequency = 📉 Short Wavelength.<br>📉 Low Frequency = 📈 Long Wavelength.</div><div class="journal-box">📓 <strong>Draw it:</strong> Draw a "High Frequency" wave (lots of peaks) and label the distance between them.</div>'
                        },
                        {
                            title: '🛰️ Mission Link: Helmet-to-Helmet',
                            content: '<div style="line-height:1.7;">How do astronauts talk without radios?</div><div class="journal-box" style="border-left-color:#00d4aa; background:rgba(0,212,170,0.15);">If two astronauts touch their helmets together, they can hear each other! Their voices vibrate the air inside the first helmet, which vibrates the plastic (Solid), which vibrates the air in the second helmet. The sound found a <strong>Medium</strong> to travel through!</div>'
                        },
                        {
                            title: '📊 Organizer: Medium Mystery',
                            content: '<div style="margin-bottom:15px;">Rank these mediums from slowest to fastest sound speed:</div><table style="width:100\%; border-collapse: collapse; font-size:1.8rem;"><tr style="background:rgba(255,255,255,0.1);"><th style="padding:15px; border:1px solid #444;">Medium</th><th style="padding:15px; border:1px solid #444;">Speed</th></tr><tr><td style="padding:15px; border:1px solid #444;">Air (0°C)</td><td style="padding:15px; border:1px solid #444;">331 m/s (Slowest)</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:15px; border:1px solid #444;">Fresh Water</td><td style="padding:15px; border:1px solid #444;">1,482 m/s</td></tr><tr><td style="padding:15px; border:1px solid #444;">Steel / Iron</td><td style="padding:15px; border:1px solid #444;">5,960 m/s (Fastest!)</td></tr></table>'
                        },
                        {
                            title: '🧪 Think Like a Scientist: Breaking Glass',
                            content: '<div style="line-height:1.7;">How can a singer break a glass with only their voice?</div><div class="journal-box" style="background:rgba(244,67,54,0.1); border-left-color:#f44336;">Every object has a "Natural Frequency." If a singer hits a note that matches the frequency of the glass, the glass wiggles so hard that its atoms can\'t hold together anymore. <strong>CRACK!</strong> That is the power of resonance!</div>'
                        },
                        {
                            title: '🚪 Exit Ticket',
                            content: '<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. Why can\'t sound travel through a vacuum (empty space)?<br><br>2. Which would sound travel through faster: A brick wall or a swimming pool? Why?</div>'
                        }
                    ]
                },
                'lesson30': {
                    title: 'Light and Optics',
                    slides: [
                        {
                            title: '🌅 Warm-up: The Mirror Mystery',
                            content: '<div class="journal-box"><strong>Stand in front of a mirror and touch your right ear. Which ear does your reflection touch?</strong><br><br>📓 <strong>Journal Task:</strong> Answer these:<ol style="line-height:1.8; margin-top:10px;"><li>Why is the image flipped? Is the light "bouncing" or "bending"?</li><li>Have you ever noticed that "AMBULANCE" is written backwards on the front of the truck? Why do they do that?</li></ol></div>'
                        },
                        {
                            title: '🎯 Objectives & Vocabulary',
                            content: '<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain how <strong>Reflection</strong> and <strong>Refraction</strong> change the path of light.</li><li>Categorize objects as <strong>Opaque</strong>, <strong>Translucent</strong>, or <strong>Transparent</strong>.</li><li>Explain why we see <strong>Colors</strong> based on absorption and reflection.</li><li>Connect light speed to real-world phenomena (Lightning/Thunder).</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#ffc107; background:rgba(255,193,7,0.15);"><strong>🛰️ Mission Context:</strong> On the Moon, we use gold-coated mirrors to reflect harmful radiation away from our base. If the light isn\'t controlled, the heat will destroy our systems!</div>',
                            vocabulary: [
                                { term: 'Refraction', definition: 'The bending of a wave as it enters a new medium at an angle.' },
                                { term: 'Reflection', definition: 'The bouncing back of light when it hits a surface it cannot go through.' },
                                { term: 'Opaque', definition: 'Material that does not allow any light to pass through.' },
                                { term: 'Transparent', definition: 'Material that allows light to pass through clearly.' },
                                { term: 'Translucent', definition: 'Material that allows some light to pass through, but scatters it.' }
                            ]
                        },
                        {
                            title: '📜 The Window to the Invisible',
                            content: '<div style="line-height:1.7;">In the 1670s, Antonie van Leeuwenhoek used <strong>Refraction</strong> to see a hidden world.</div><div class="journal-box">He realized that a tiny, perfectly curved sphere of glass could bend light so much that it magnified small things 270 times! He was the first human to see bacteria. He called them "animalcules." His curiosity changed medicine forever!</div>'
                        },
                        {
                            title: '🌈 The Prism Discovery',
                            content: '<div style="line-height:1.7;">White light looks plain, but it is hiding a secret!</div><img src="images/Bundle3/lens_refraction_diagram_1768923963160.png" style="width:60\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #ffbc00;"><div class="journal-box" style="background:rgba(255,193,7,0.1); border-left-color:#ffbc00;">When light enters glass, different colors bend at different angles. This <strong>Refraction</strong> separates white light into a rainbow!</div>'
                        },
                        {
                            title: '✨ Specular vs. Diffuse Reflection',
                            content: '<div style="line-height:1.7;">Why is a mirror shiny but a piece of paper isn\'t?</div><div class="journal-box"><strong>Specular:</strong> Light bounces off a <em>perfectly</em> smooth surface at the same angle. (Mirror)<br><br><strong>Diffuse:</strong> Light hits a rough surface and bounces in 1,000 different directions. (Paper)</div>'
                        },
                        {
                            title: '🚀 Light Speed Math: Interplanetary Lag',
                            content: '<div style="line-height:1.7;">Light is the fastest thing in the universe, but space is BIG.</div><table style="width:100\%; border-collapse: collapse; margin-top:15px; font-size:1.8rem;"><tr style="background:rgba(255,193,7,0.15);"><th style="padding:15px; border:1px solid #444;">Path</th><th style="padding:15px; border:1px solid #444;">Time for Light</th></tr><tr><td style="padding:15px; border:1px solid #444;">Earth to Moon</td><td style="padding:15px; border:1px solid #444;">1.3 Seconds</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:15px; border:1px solid #444;">Earth to Mars</td><td style="padding:15px; border:1px solid #444;">3 - 22 Minutes</td></tr><tr><td style="padding:15px; border:1px solid #444;">Earth to Sun</td><td style="padding:15px; border:1px solid #444;">8 Minutes 20 Seconds</td></tr></table>'
                        },
                        {
                            title: '🔬 STEM Interactive: Light Refraction Lab',
                            content: '<div style="margin-bottom:15px;"><strong>Prism Lab:</strong> Adjust the prism to see how white light separates into colors!</div><div id="threejs-container-l30" style="width:100\%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initLightSim()">🛠️ Debug</button><button class="btn-drop" onclick="launchLight()">🔦 Shine Light</button><button class="btn-pause" onclick="pauseLight()">⏸️ Pause</button><button class="btn-slow" onclick="slowMoLight()">🐢 Slow Mo</button><button class="btn-reset" onclick="resetLight()">🔄 Reset</button></div>'
                        },
                        {
                            title: '🤔 What If Scenario: No Atmosphere?',
                            content: '<div class="what-if-box"><strong>What If:</strong> Earth had no atmosphere (air)?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 The Black Sky...</div><div class="reveal-content">The sky is blue because air molecules scatter blue light. Without air, the sky would be pitch black even during the day—just like it is on the Moon! You would see stars next to the Sun.</div></div>'
                        },
                        {
                            title: '🧮 Math Moment: The Speed King',
                            content: '<div style="line-height:1.7;"><strong>300,000 Kilometers per second!</strong></div><div class="journal-box" style="background:rgba(255,193,7,0.1); border-left-color:#ffbc00;">Light is about 1,000,000 times faster than sound. This is why you see lightning before you hear thunder.</div><div class="journal-box">📓 <strong>Fast Fact:</strong> Light from the Sun takes about 8 minutes and 20 seconds to reach Earth. If the Sun vanished right now, we wouldn\'t know for 8 minutes!</div>'
                        },
                        {
                            title: '🛰️ Mission Link: Lunar Mirrors',
                            content: '<div style="line-height:1.7;">Apollo astronauts left mirrors on the Moon!</div><img src="images/Bundle3/apollo_mirror_moon_1768923590355.png" style="width:60\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #00d4aa;"><div class="journal-box" style="border-left-color:#00d4aa; background:rgba(0,212,170,0.15);">By timing how long it takes for a laser to bounce back from these mirrors, we can measure the distance to the Moon within 1 millimeter! It turns out the Moon is drifting away by 1.5 inches per year.</div>'
                        },
                        {
                            title: '📊 Organizer: Color Absorption',
                            content: '<div style="margin-bottom:15px;">Why is a Red Apple red?</div><table style="width:100\%; border-collapse: collapse; font-size:1.8rem;"><tr style="background:rgba(255,255,255,0.1);"><th style="padding:15px; border:1px solid #444;">Object</th><th style="padding:15px; border:1px solid #444;">Reflects</th><th style="padding:15px; border:1px solid #444;">Absorbs</th></tr><tr><td style="padding:15px; border:1px solid #444;">Red Apple</td><td style="padding:15px; border:1px solid #444; color:#ff4444;">Red</td><td style="padding:15px; border:1px solid #444;">O, Y, G, B, I, V</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:15px; border:1px solid #444;">White Shirt</td><td style="padding:15px; border:1px solid #444;">ALL Colors</td><td style="padding:15px; border:1px solid #444;">None</td></tr><tr><td style="padding:15px; border:1px solid #444;">Black Coal</td><td style="padding:15px; border:1px solid #444;">None</td><td style="padding:15px; border:1px solid #444; color:#aaa;">ALL (Heats up!)</td></tr></table>'
                        },
                        {
                            title: '🦉 Perspective 3: Animal Eyes',
                            content: '<div style="line-height:1.7;">Some animals see light differently than us.</div><div class="journal-box">Cats and owls have a "Tapetum Lucidum"—a mirror layer behind their retina. It bounces light through their eyes <strong>twice</strong>, giving them super-powered night vision! This is why a cat\'s eyes "glow" in the dark when hit by a flashlight.</div>'
                        },
                        {
                            title: '🧪 The Optical Illusion Challenge',
                            content: '<div style="line-height:1.7;">Put a pencil in a glass of water. It looks broken!</div><div class="journal-box" style="background:rgba(102,126,234,0.1); border-left-color:#667eea;">This is <strong>Refraction</strong>. Light slow down when it hits the water, changing direction and tricking your brain into thinking the pencil is in a different spot.</div>'
                        },
                        {
                            title: '🚪 Exit Ticket',
                            content: '<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. If you are a chef, why would you choose a <strong>white</strong> kitchen over a <strong>black</strong> one to stay cool?<br><br>2. Give one example of <strong>Refraction</strong> you see in your house.</div>'
                        }
                    ]
                },
                'lesson31': {
                    title: 'Thermal Dynamics',
                    slides: [
                        {
                            title: '🌅 Warm-up: The Swimming Pool Chill',
                            content: '<div class="journal-box"><strong>Why do you feel shivering cold when you step out of a swimming pool, even if the sun is hot?</strong><br><br>📓 <strong>Journal Task:</strong> Answer these:<ol style="line-height:1.8; margin-top:10px;"><li>Where did your body heat go?</li><li>If you dry off with a towel immediately, why do you feel warmer?</li></ol></div>'
                        },
                        {
                            title: '🎯 Objectives & Vocabulary',
                            content: '<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Identify the three ways heat travels: <strong>Conduction</strong>, <strong>Convection</strong>, and <strong>Radiation</strong>.</li><li>Differentiate between thermal <strong>Conductors</strong> and <strong>Insulators</strong>.</li><li>Explain how temperature is actually the "wiggle speed" of molecules.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#f44336; background:rgba(244,67,54,0.15);"><strong>🛰️ Mission Context:</strong> Space is a vacuum—there is no air. That means heat can\'t travel by convection. We have to design our lunar base to manage heat using only radiation and conduction!</div>',
                            vocabulary: [
                                { term: 'Conduction', definition: 'Heat transfer through direct touch.' },
                                { term: 'Convection', definition: 'Heat transfer through moving liquids/gas.' },
                                { term: 'Radiation', definition: 'Heat transfer through waves across empty space.' },
                                { term: 'Insulator', definition: 'A material that slows down or blocks heat flow.' }
                            ]
                        },
                        {
                            title: '📜 Measuring the "Wiggle Speed"',
                            content: '<div style="line-height:1.7;">In the early 1700s, Daniel Fahrenheit invented the first reliable way to measure heat.</div><div class="journal-box">He realized that mercury expands when it gets warm. By putting it in a thin tube, he could see the level rise as molecules hit the glass harder (Kinetic Energy!). His scale is still used in the USA today to tell us if we have a fever!</div>'
                        },
                        {
                            title: '🚀 Perspective 1: Re-entry Heat',
                            content: '<div style="line-height:1.7;">Coming home from the Moon is HOT!</div><img src="images/Bundle3/spacex_heat_shield_1768923977129.png" style="width:60\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #ff4444;"><div class="journal-box" style="background:rgba(244,67,54,0.1); border-left-color:#f44336;">At 17,000 mph, a spacecraft slams into air molecules so fast that <strong>Friction</strong> creates over 3,000°F! We use "Ablative" heat shields that slowly burn away, carrying the heat with them.</div>'
                        },
                        {
                            title: '🔥 Mode 1: Conduction',
                            content: '<div class="journal-box" style="background:rgba(0,0,0,0.2); border-left-color:#f44336;"><strong>The "Molecular Bump":</strong> Have you ever left a metal spoon in a pot of hot soup? Even though only the bottom touches the soup, the handle gets hot! This is because hot molecules "bump" into their colder neighbors, passing the energy along like a game of tag.</div>'
                        },
                        {
                            title: '🌬️ Mode 2: Convection',
                            content: '<div class="journal-box" style="background:rgba(0,0,0,0.2); border-left-color:#2196f3;"><strong>The "Thermal Loop":</strong> Hot air and water become lighter and rise, while colder, heavier air sinks. This creates a circular "current." It\'s why the top floor of a house is often warmer than the basement, and why boiling water "tumbles" in a pot!</div>'
                        },
                        {
                            title: '☀️ Mode 3: Radiation',
                            content: '<div class="journal-box" style="background:rgba(0,0,0,0.2); border-left-color:#ffc107;"><strong>The "Invisible Wave":</strong> Radiation is the only way heat can travel through the empty vacuum of space. You can feel the heat of a campfire on your face without touching it, and without any wind blowing. It\'s pure energy moving in waves!</div>'
                        },
                        {
                            title: '🔬 STEM Interactive: Thermal Lab',
                            content: '<div style="margin-bottom:15px;"><strong>Molecular Motion:</strong> Watch how molecules "wiggle" faster!</div><div id="threejs-container-l31" style="width:100\%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="initThermalSim()">🛠️ Debug</button><button class="btn-drop" onclick="startHeat()">🔥 Apply Heat</button><button class="btn-pause" onclick="pauseHeat()">⏸️ Pause</button><button class="btn-slow" onclick="slowMoHeat()">🐢 Slow Mo</button><button class="btn-reset" onclick="resetHeat()">🔄 Reset</button></div>'
                        },
                        {
                            title: '🤔 What If Scenario: No Heat Transfer?',
                            content: '<div class="what-if-box"><strong>What If:</strong> Energy could NOT move between objects?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 The Frozen World...</div><div class="reveal-content">If heat couldn\'t move, your coffee would stay hot forever, but the Sun would never warm the Earth. Everything would stay exactly at the temperature it started at! Life would be impossible.</div></div>'
                        },
                        {
                            title: '🧮 Math Moment: Absolute Zero',
                            content: '<div style="line-height:1.7;">How cold can it get?</div><div class="journal-box" style="background:rgba(33,150,243,0.1); border-left-color:#2196f3;">The coldest possible temperature is <strong>-273°C</strong> (or 0 Kelvin). At this point, molecules <strong>STOP MOVING</strong> entirely. There is no kinetic energy left. It is impossible to get any colder than that!</div>'
                        },
                        {
                            title: '🛡️ Perspective 2: Insulators',
                            content: '<div style="line-height:1.7;">A material that slows down or blocks the flow of heat.</div><div class="journal-box"><strong>Examples:</strong> Wood, Plastic, Wool, and even trapped Air. These materials have molecules that don\'t "bump" their neighbors very easily. This is why we wear wool coats in winter!</div>'
                        },
                        {
                            title: '🐧 Perspective 3: Penguin Huddles',
                            content: '<div style="line-height:1.7;">Emperor Penguins use "Social Insulation" to survive -60°F.</div><img src="images/Bundle3/penguin_huddle_thermal_1768923605223.png" style="width:60\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #667eea;"><div class="journal-box">They huddle in giant groups of thousands. They take turns moving from the outside to the inside so everyone survives. It\'s a giant convection loop of penguins!</div>'
                        },
                        {
                            title: '🛰️ Mission Link: Gold Insulation',
                            content: '<div style="line-height:1.7;">Why is our equipment covered in "Gold Foil"?</div><div class="journal-box" style="border-left-color:#ffc107; background:rgba(255,193,7,0.15);">It\'s actually "Multi-Layer Insulation" (MLI). It acts like a high-tech mirror, reflecting <strong>99%</strong> of the Sun\'s radiation back into space. Without it, our lunar base would bake like an oven in direct sunlight!</div>'
                        },
                        {
                            title: '📊 Organizer: Conductor or Insulator?',
                            content: '<div style="margin-bottom:15px;">Which material is best for your lunchbox?</div><table style="width:100\%; border-collapse: collapse; font-size:1.8rem;"><tr style="background:rgba(255,255,255,0.1);"><th style="padding:15px; border:1px solid #444;">Material</th><th style="padding:15px; border:1px solid #444;">Type</th><th style="padding:15px; border:1px solid #444;">Best For...</th></tr><tr><td style="padding:15px; border:1px solid #444;">Aluminum Foil</td><td style="padding:15px; border:1px solid #444;">Conductor</td><td style="padding:15px; border:1px solid #444;">Cooking/Reflecting</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:15px; border:1px solid #444;">Styrofoam</td><td style="padding:15px; border:1px solid #444;">Insulator</td><td style="padding:15px; border:1px solid #444;">Keeping ice cold</td></tr><tr><td style="padding:15px; border:1px solid #444;">Wool Blanket</td><td style="padding:15px; border:1px solid #444;">Insulator</td><td style="padding:15px; border:1px solid #444;">Trapping body heat</td></tr></table>'
                        },
                        {
                            title: '🚪 Exit Ticket',
                            content: '<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. When you touch a metal pole on a cold day, why does it feel "colder" than a wooden fence, even if they are both the same temperature?<br><br>2. Give an example of <strong>Convection</strong> you see in your kitchen.</div>'
                        }
                    ]
                },
                'lesson32': {
                    title: 'LAB 2: Insulation Investigation (45 min)',
                    slides: [
                        {
                            title: '🔬 Lab Overview: Your Mission Today',
                            content: '<strong style="font-size:1.4rem;">🎯 YOUR GOAL: Design a container that keeps "Lunar Cocoa" (Hot Water) hot for as long as possible!</strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0;"><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #28a745;"><strong style="font-size:1.2rem;">✅ SUCCESS CRITERIA:</strong><br>1. Lowest Temperature Drop (ΔT)<br>2. Precise measurements every 3 mins<br>3. Identified Conduction vs Radiation</div><div style="background:rgba(220,53,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #dc3545;"><strong style="font-size:1.2rem;">⚠️ SAFETY RULES:</strong><br>• Hot water handled by TEACHER only<br>• Goggles must be worn<br>• Do not drink the lab samples!</div></div><div style="background:rgba(102,126,234,0.3);padding:15px;border-radius:10px;"><strong>⏱️ TODAY\'S SCHEDULE:</strong><table style="width:100\%;margin-top:8px;"><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">10 min</td><td style="padding:5px 10px;">Mission Overview & Wrapping</td></tr><tr><td style="padding:5px 10px;">30 min</td><td style="padding:5px 10px;">Temperature Recording (5 readings)</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">5 min</td><td style="padding:5px 10px;">Cleanup & Reflection</td></tr></table></div>'
                        },
                        {
                            title: '🛠️ Supplies & Insulators',
                            content: '<div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;"><strong style="font-size:1.8rem;">📦 WHAT YOU NEED:</strong><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:15px;font-size:1.5rem;"><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Paper Cup</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">1 Thermometer</div><div style="background:rgba(255,193,7,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Wool Fabric</div><div style="background:rgba(255,193,7,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Aluminum Foil</div><div style="background:rgba(255,193,7,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Bubble Wrap</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Rubber Bands</div></div></div><div style="margin-top:20px;padding:15px;background:rgba(255,193,7,0.15);border-radius:10px;"><strong>📐 SETUP STEPS:</strong><ol><li>Choose TWO materials from the list above.</li><li>Wrap your cup tightly. Does it need a "lid"? (Think about Convection!)</li><li>Prepare your data log for the first temperature reading.</li></ol></div>'
                        },
                        {
                            title: '🏁 Procedure: Step-by-Step (30 min)',
                            content: '<strong>📋 FOLLOW THESE STEPS CAREFULLY:</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">1</div><div><strong>BASELINE:</strong> Teacher pours hot water. Record the temperature IMMEDIATELY at "0 Minutes."</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">2</div><div><strong>INTERVALS:</strong> Record the temperature every <strong>3 Minutes</strong>. Do not remove the thermometer once it\'s in!</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">3</div><div><strong>GRAPH:</strong> While you wait between readings, start plotting your points on your lab sheet.</div></div></div>'
                        },
                        {
                            title: '📊 Data Recording: The Decay Log',
                            content: '<div style="margin-bottom:15px;">📋 Record your Temperature Readings (°C):</div><table style="width:100\%; border-collapse: collapse; font-size:1.8rem; text-align:center;"><tr style="background:#444;"><th style="padding:10px; border:1px solid #666;">Time</th><th style="padding:10px; border:1px solid #666;">Your Design</th><th style="padding:10px; border:1px solid #666;">Control (No Wrap)</th><th style="padding:10px; border:1px solid #666; background:#dc3545;">Δ Change</th></tr><tr><td style="padding:10px; border:1px solid #666;">0 Min</td><td style="padding:10px; border:1px solid #666;">__°</td><td style="padding:10px; border:1px solid #666;">__°</td><td style="padding:10px; border:1px solid #666;">0°</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:10px; border:1px solid #666;">6 Min</td><td style="padding:10px; border:1px solid #666;">__°</td><td style="padding:10px; border:1px solid #666;">__°</td><td style="padding:10px; border:1px solid #666;">__°</td></tr><tr><td style="padding:10px; border:1px solid #666;">12 Min</td><td style="padding:10px; border:1px solid #666;">__°</td><td style="padding:10px; border:1px solid #666;">__°</td><td style="padding:10px; border:1px solid #666;">__°</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:10px; border:1px solid #666;">15 Min</td><td style="padding:10px; border:1px solid #666; font-weight:bold; color:#ffc107;">__°</td><td style="padding:10px; border:1px solid #666;">__°</td><td style="padding:10px; border:1px solid #666;">__°</td></tr></table>'
                        },
                        {
                            title: '🧠 Scientific Integration: Why It Works',
                            content: '<div style="line-height:1.7;"><strong>Use what you learned in Lessons 29-31 to explain:</strong></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Q1: Why did the Wool fabric help? (L31)</div><div class="reveal-content">Wool traps air molecules. Since air is a poor conductor of heat, it creates a "thermal barrier" that slows down <strong>Conduction</strong>.</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">🔍 Q2: What was the purpose of the Foil? (L30)</div><div class="reveal-content">Aluminum foil is shiny and reflective. It reflects <strong>Radiation</strong> (infrared waves) back toward the cup instead of letting it escape!</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">🔍 Q3: Why did covering the top matter? (L31)</div><div class="reveal-content">Hot steam escaping is <strong>Convection</strong>. By puting a "lid" on it, you trapped the heat energy inside the system.</div></div>'
                        },
                        {
                            title: '🧹 Cleanup & Accountability',
                            content: '<div class="journal-box"><strong>🧹 MINUTE 40: CLEANUP</strong><ol><li>Pour water down the drain (be careful!).</li><li>Recycle your paper cup.</li><li>Dry off and return the thermometer.</li></ol></div><div style="margin-top:20px;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;border:2px solid #28a745;"><strong>📓 FINAL THOUGHT:</strong> If we did this in a <strong>Vacuum</strong> (like space) with no air, would Wool still work? Why or why not?</div>'
                        }
                    ]
                },
                'lesson33': {
                    title: 'Electrical Systems',
                    slides: [
                        {
                            title: '🌅 Warm-up: The Broken Loop',
                            content: '<div class="journal-box"><strong>You have a battery, two wires, and a bulb. You connect them, but the bulb doesn\'t light up.</strong><br><br>📓 <strong>Journal Task:</strong> List 3 things that could be wrong with this system in your notebook.</div>'
                        },
                        {
                            title: '🎯 Objectives & Vocabulary',
                            content: '<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Construct functioning <strong>Series</strong> and <strong>Parallel</strong> circuits.</li><li>Explain the role of <strong>Voltage</strong>, <strong>Current</strong>, and <strong>Resistance</strong>.</li><li>Identify and prevent <strong>Short Circuits</strong>.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#ffc107; background:rgba(255,193,7,0.15);"><strong>🛰️ Mission Context:</strong> Our lunar base runs on solar power, but that energy must be stored in batteries and moved through miles of wiring. One loose connection could shut down our life support!</div>',
                            vocabulary: [
                                { term: 'Current', definition: 'The flow of electrical charge through a conductor.' },
                                { term: 'Voltage', definition: 'The "push" or pressure that makes electricity move (stored in batteries).' },
                                { term: 'Resistance', definition: 'How much a material slows down the flow of electricity.' },
                                { term: 'Short Circuit', definition: 'An accidental path of low resistance that can cause heat or fire.' }
                            ]
                        },
                        {
                            title: '📜 The Kite and the Key',
                            content: '<div style="line-height:1.7;">In 1752, Benjamin Franklin used a kite to prove that lightning is actually <strong>Electricity</strong>.</div><div class="journal-box">He didn\'t actually want the kite to be hit by lightning, but he caught the <strong>Static Charge</strong> from the storm clouds in a jar. He realized that we could control this energy to power our world!</div>'
                        },
                        {
                            title: '⚡ Protecting the Base: Lightning Rods',
                            content: '<div style="line-height:1.7;">Franklin invented the Lightning Rod to protect buildings from burning down.</div><img src="images/Bundle3/lightning_rod_electricity_1768924382694.png" style="width:50\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #ffbc00;"><div class="journal-box">By providing a <strong>Low Resistance</strong> path to the ground, the rod "tricks" the lightning into skipping the building and following the wire instead.</div>'
                        },
                        {
                            title: '📖 Theory: How Circuits Work',
                            content: '<div style="line-height:1.7;">Think of electricity like water flowing through pipes.</div><div class="journal-box">The battery is the <strong>Pump</strong> (Voltage), the wires are the <strong>Pipes</strong>, and the lightbulb is a <strong>Waterwheel</strong> (Load).<br><br>📓 <strong>Think:</strong> Why can\'t you use a piece of string instead of a wire? (Use the word "Conductor")</div>'
                        },
                        {
                            title: '📖 The War of Currents: Edison vs. Tesla',
                            content: '<div style="line-height:1.7;"><strong>Edison vs. Tesla (1880s):</strong></div><div class="journal-box">Thomas Edison wanted <strong>Direct Current (DC)</strong> (like batteries). Nikola Tesla believed <strong>Alternating Current (AC)</strong> was better because it could travel long distances. Tesla won for city power, but Edison won for our portable electronics!</div>'
                        },
                        {
                            title: '🔬 STEM Interactive: Circuit Lab',
                            content: '<div style="margin-bottom:15px;"><strong>Circuit Builder:</strong> Construct a series and parallel circuit to see the difference!</div><div id="threejs-container-l33" style="width:100\%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="if(window.initCircuitSim) window.initCircuitSim()">🛠️ Debug</button><button class="btn-drop" onclick="closeCircuit()">🔌 Close Switch</button><button class="btn-pause" onclick="pauseCurrent()">⏸️ Pause</button><button class="btn-slow" onclick="slowMoCurrent()">🐢 Slow Mo</button><button class="btn-reset" onclick="resetCircuit()">🔄 Reset</button></div>'
                        },
                        {
                            title: '📖 Deep Dive: Series vs. Parallel',
                            content: '<div style="line-height:1.7;">In a <strong>Series</strong> circuit, there is only one path. If one bulb blows, they all go out.</div><div class="journal-box" style="border-left-color:#00d4aa; background:rgba(0,188,212,0.1);">In a <strong>Parallel</strong> circuit, there are multiple paths. If one path breaks, the others stay lit! This is how your house is wired so your lights don\'t go out if the fridge breaks.</div>'
                        },
                        {
                            title: '🤔 What If Scenario: No Resistance?',
                            content: '<div class="what-if-box"><strong>What If:</strong> A wire had ZERO resistance?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 The Frozen World of Superconductors...</div><div class="reveal-content">This is real! If you make materials extremely cold, resistance vanishes. You could send electricity forever without losing ANY energy to heat. We use these in MRI machines today!</div></div>'
                        },
                        {
                            title: '🧮 Math Moment: Ohm\'s Rule',
                            content: '<div style="line-height:1.7;"><strong>Current = Voltage ÷ Resistance</strong></div><div class="journal-box" style="background:rgba(255,193,7,0.1); border-left-color:#ffbc00;">If you increase the "Push" (Voltage), the current goes up. If you add more "Stuff to go through" (Resistance), the current goes down. It\'s a perfect balance!</div>'
                        },
                        {
                            title: '📊 Organizer: Circuit Symbols',
                            content: '<div style="margin-bottom:15px;">📋 Architects use symbols to map out electricity. Can you identify these?</div><div class="structure-grid"><div style="background:rgba(255,193,7,0.1); padding:15px; border-radius:10px; border-left:4px solid #ffc107;"><strong>🔋 Two Parallel Lines:</strong><br>The <strong>Battery (Cell)</strong>. The long line is +, short is -.</div><div style="background:rgba(255,193,7,0.1); padding:15px; border-radius:10px; border-left:4px solid #ffc107;"><strong>💡 A Circle with an X:</strong><br>The <strong>Lightbulb (Load)</strong>. This uses the energy.</div><div style="background:rgba(255,193,7,0.1); padding:15px; border-radius:10px; border-left:4px solid #ffc107;"><strong>⏻ A Line with a Gap:</strong><br>A <strong>Switch</strong>. Determines if the circuit is Open or Closed.</div></div>'
                        },
                        {
                            title: '⚠️ Safety Spotlight: Short Circuits',
                            content: '<div style="line-height:1.7;">A <strong>Short Circuit</strong> happens when electricity finds a "shortcut" without any resistance.</div><div class="journal-box" style="background:rgba(244,67,54,0.1); border-left-color:#f44336;">Because there is no resistance, the current becomes <strong>Massive</strong> and the wire gets incredibly hot instantly. This is how electrical fires start! We use Fuses to break the circuit if it gets too hot.</div>'
                        },
                        {
                            title: '🏃‍♂️ Case Study: The Lemon Battery',
                            content: '<div style="line-height:1.7;">Can fruit power a lightbulb?</div><div class="journal-box">Yes! The citric acid in a lemon acts as an <strong>Electrolyte</strong>. When you put zinc and copper into the lemon, a chemical reaction happens that pushes electrons through the juice. It\'s a low-voltage battery!</div>'
                        },
                        {
                            title: '🛰️ Mission Link: Solar Grids',
                            content: '<div style="line-height:1.7;">On the Moon, we don\'t have power plants. We have "Solar Farms."</div><div class="journal-box" style="border-left-color:#00d4aa; background:rgba(0,212,170,0.15);">Sunlight hits the panels, knocking electrons loose to create <strong>DC Current</strong>. We store that in giant batteries, then use a "Power Inverter" to change it into <strong>AC Current</strong> for the astronaut\'s computers. It\'s a complete system!</div>'
                        },
                        {
                            title: '🚪 Exit Ticket',
                            content: '<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. Why is your house wired in <strong>Parallel</strong> instead of <strong>Series</strong>?<br><br>2. What happens to the "Current" in a circuit if you add more "Resistance"?</div>'
                        }
                    ]
                },
                'lesson34': {
                    title: 'Electromagnetism',
                    slides: [
                        {
                            title: '🌅 Warm-up: The Magic Nail',
                            content: '<div class="journal-box">🖇️ <strong>You wrap a copper wire around a steel nail and connect it to a battery. Suddenly, the nail can pick up paperclips! How did a battery create magnetism?</strong></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 What is happening here?</div><div class="reveal-content">The electricity moving through the wire is "pulling" the atoms in the nail into alignment. You\'ve just built a temporary magnet that you can turn on and off with a switch!</div></div>'
                        },
                        {
                            title: '🎯 Learning Objectives & Vocabulary',
                            content: '<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Explain how electricity and magnetism are related.</li><li>Identify variables that increase electromagnet strength.</li><li>Describe how motors and generators use magnetism.</li></ol></div>',
                            vocabulary: [
                                { term: 'Magnetic Field', definition: 'The area around a magnet where magnetic force can be felt.' },
                                { term: 'Electromagnet', definition: 'A magnet that can be turned on and off with electricity.' },
                                { term: 'Core', definition: 'The material (like iron) inside an electromagnet coil.' },
                                { term: 'Solenoid', definition: 'A coil of wire that acts like a magnet when carrying current.' }
                            ]
                        },
                        {
                            title: '📖 Literacy Connection: Ørsted\'s Accident',
                            content: '<div style="line-height:1.7;"><strong>The Compass Jump (1820):</strong></div><div class="journal-box">Hans Christian Ørsted was giving a lecture when he noticed a compass needle twitch every time he turned on a nearby battery. He realized that electricity and magnetism aren\'t different forces—they are <strong>one force</strong>! This discovery allowed us to build everything from cranes to MRI machines.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Why did the needle move?</div><div class="reveal-content">Flowing electricity ALWAYS creates an invisible <strong>Magnetic Field</strong> around the wire.</div></div>'
                        },
                        {
                            title: '📖 Theory: The Invisible Link',
                            content: '<div style="line-height:1.7;">Moving electricity <strong>always</strong> creates a magnetic field.</div><div class="journal-box">This discovery allowed us to build everything from cranes to MRI machines! Unlike permanent magnets, electromagnets stop working the second you stop the current.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Can you turn it off?</div><div class="reveal-content">Yes! Cut the power, and the magnetic field vanishes instantly. This makes them perfect for scrap yard cranes.</div></div>'
                        },
                        {
                            title: '🔬 Deep Dive: Increasing the Force',
                            content: '<div style="margin-bottom:15px;">An engineer wants to pick up a heavier car in a scrap yard. How can she make her electromagnet stronger?</div><div id="threejs-container-l34" style="width:100\%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="if(window.initMagnetSim) window.initMagnetSim()">🛠️ Debug</button></div>'
                        },
                        {
                            title: '🧮 Math Moment: Coil Ratios',
                            content: '<div style="line-height:1.7;">Electromagnets follow a pattern: <strong>More wire loops = More power.</strong></div><div class="structure-grid"><div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:10px; border-left:4px solid #4facfe;"><strong>1️⃣ Double the Coils?</strong><br>If 10 coils pick up 2 paperclips, 20 coils will pick up 4 paperclips! (Linear growth)</div><div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:10px; border-left:4px solid #4facfe;"><strong>2️⃣ The Core Boost</strong><br>Replacing a plastic stick with an <strong>Iron Nail</strong> can make the magnet 1,000 times stronger!</div></div>'
                        },
                        {
                            title: '📊 Graphic Organizer: Motor vs Generator',
                            content: '<div style="margin-bottom:15px;">📋 These machines are "twins"—they do opposite jobs!</div><div class="structure-grid"><div style="background:rgba(30,30,30,0.6); padding:15px; border-radius:10px; border-left:4px solid #4facfe;"><strong>⚙️ Electric Motor:</strong><br><strong>Electricity -> Motion</strong>. Magnets push the axle to make things spin (like a fan).</div><div style="background:rgba(30,30,30,0.6); padding:15px; border-radius:10px; border-left:4px solid #f093fb;"><strong>💡 Generator:</strong><br><strong>Motion -> Electricity</strong>. Spinning magnets create current (like a wind turbine).</div></div>'
                        },
                        {
                            title: '🛰️ Mission Link: Magnetic Shielding',
                            content: '<div style="line-height:1.7;">Earth is safe because of its liquid iron core (a giant electromagnet!).</div><img src="images/Bundle3/maglev_train_futuristic_1768924526605.png" style="width:60\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #00d4aa;"><div class="journal-box">The Sun shoots dangerous radiation at the Moon. On our base, we must build artificial magnetic shields to deflect these particles.</div><div class="what-if-box" style="border:2px solid #4facfe; background:rgba(79,172,254,0.1);"><strong>How does it protect us?</strong><br><strong>Deflection:</strong> Magnetic fields push charged particles away, like an invisible energy shield!</div>'
                        },
                        {
                            title: '🔐 Digital Citizenship: Media Literacy',
                            content: '<div style="line-height:1.7;">Magnetic fields store data on hard drives and credit cards.</div><div class="journal-box">Just like magnetism can be invisible, <strong>Hidden Bias</strong> in news can be invisible too. We must look closely to see the "force" behind the story.</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 How do you spot bias?</div><div class="reveal-content"><strong>Compare Sources:</strong> Read multiple news sites to see different perspectives on the same event!</div></div>'
                        },
                        {
                            title: '🧪 Think Like a Scientist: Magnet Safety',
                            content: '<div class="journal-box"><strong>Critical Thinking:</strong> Why should you never bring a powerful magnet near a computer or credit card?</div><img src="images/Bundle3/mri_machine_scanning_1768924543267.png" style="width:50\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #ff4444;"><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 Analyze the Risk...</div><div class="reveal-content"><strong>Data Deletion:</strong> Computational data is stored using tiny magnetic charges. A big magnet can "jumble" those charges and destroy the info!</div></div>'
                        }
                    ]
                },
                'lesson35': {
                    title: 'Sustainability & Future Energy',
                    slides: [
                        {
                            title: '🌅 Warm-up: The 100-Year Challenge',
                            content: '<div class="journal-box"><strong>In 100 years, will we still be able to dig up coal and oil from the ground? What happens if we run out?</strong><br><br>📓 <strong>Journal Task:</strong> Define "Non-renewable" in your own words in your notebook.</div>'
                        },
                        {
                            title: '🎯 Objectives & Vocabulary',
                            content: '<div style="line-height:1.8;"><strong>📋 By the end of this lesson, you will be able to:</strong><ol><li>Distinguish between <strong>Renewable</strong> and <strong>Non-renewable</strong> energy.</li><li>Categorize energy sources (Solar, Wind, Hydro, Bio, Fossil).</li><li>Explain the concept of a <strong>Carbon Footprint</strong>.</li></ol></div><div class="journal-box" style="margin-top:20px; border-left-color:#4caf50; background:rgba(76,175,80,0.15);"><strong>🛰️ Mission Context:</strong> On the Moon, we have a "Zero Waste" policy. Every Joule of energy must be harvested sustainably because there are no gas stations in space!</div>',
                            vocabulary: [
                                { term: 'Renewable', definition: 'Energy from sources that are naturally replenished (like the sun).' },
                                { term: 'Carbon Footprint', definition: 'The total amount of greenhouse gases produced by our actions.' },
                                { term: 'Sustainable', definition: 'Methods that do not deplete resources or harm the environment permanently.' },
                                { term: 'Grid', definition: 'The network of wires and stations that delivers electricity to homes.' }
                            ]
                        },
                        {
                            title: '📜 Capturing the Invisible',
                            content: '<div style="line-height:1.7;">In the 9th century, engineers in Persia built the first windmills to grind grain.</div><div class="journal-box">They used the <strong>Kinetic Energy</strong> of the wind to turn heavy stones. Today, we use that same spinning motion to turn magnets in a generator! History is the story of humans finding better ways to "trap" the Earth\'s energy.</div>'
                        },
                        {
                            title: '🌬️ Harvesting the Wind',
                            content: '<div style="line-height:1.7;">Modern wind turbines are like giant high-tech windmills.</div><img src="images/Bundle3/wind_turbine_energy_1768923903794.png" style="width:50\%; display:block; margin:20px auto; border-radius:12px; border:2px solid #00bcd4;"><div class="journal-box" style="border-left-color:#00bcd4; background:rgba(0,188,212,0.1);">They use the wind to spin a <strong>Generator</strong> inside the "nacelle" (the box at the top). One spin of a giant turbine can power a house for an entire day!</div>'
                        },
                        {
                            title: '📖 Theory: The Solar Opportunity',
                            content: '<div style="line-height:1.7;">The sun provides enough energy to Earth in <strong>one hour</strong> to power the entire world for a year!</div><div class="journal-box" style="border-left-color:#ffc107; background:rgba(255,193,7,0.1);">The challenge isn\'t finding energy—it\'s "capturing" and "storing" it. Because the sun doesn\'t shine at night, we need massive batteries to keep our lights on.</div>'
                        },
                        {
                            title: '📖 Non-Renewable: The Fossil Story',
                            content: '<div style="line-height:1.7;">Coal and oil are actually "Ancient Sunlight" trapped in fossils.</div><div class="journal-box">Plants millions of years ago soaked up the sun, died, and were buried. Over time, heat and pressure turned them into fuel. When we burn them, we release <strong>Carbon Dioxide</strong>, which warms the planet.</div>'
                        },
                        {
                            title: '🔬 STEM Interactive: Energy Grid Sim',
                            content: '<div style="margin-bottom:15px;"><strong>Manage the City:</strong> Balance Solar, Wind, and Coal to keep the lights on without polluting the air!</div><div id="threejs-container-l35" style="width:100\%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="if(window.initGridSim) window.initGridSim()">🛠️ Debug</button><button class="btn-drop" onclick="gridSim.addSolar()">☀️ Add Solar</button><button class="btn-pause" onclick="gridSim.addWind()">🌬️ Add Wind</button><button class="btn-slow" onclick="gridSim.useCoal()">🪨 Use Coal</button><button class="btn-reset" onclick="gridSim.reset()">🔄 Reset</button></div>'
                        },
                        {
                            title: '🤔 What If Scenario: 100\% Renewable?',
                            content: '<div class="what-if-box"><strong>What If:</strong> The whole world switched to 100\% renewable energy today?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 The Green Earth...</div><div class="reveal-content">Pollution levels would drop instantly, and the "Carbon Footprint" of humanity would shrink. However, we would need to build millions of miles of new wires and giant battery "farms" to keep the grid stable when the wind isn\'t blowing.</div></div>'
                        },
                        {
                            title: '🧮 Math Moment: Efficiency Matters',
                            content: '<div style="line-height:1.7;">If you switch a 60W old bulb for a 6W LED, you save 90\% of your energy!</div><div class="journal-box" style="border-left-color:#4caf50; background:rgba(76,175,80,0.1);"><strong>Task:</strong> If your family has 10 bulbs, and you save $1 per month for each LED switch, how much do you save in a year?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 The Answer...</div><div class="reveal-content">$120! Saving energy also saves money.</div></div>'
                        },
                        {
                            title: '📊 Organizer: The Energy Menu',
                            content: '<div style="margin-bottom:15px;">Which source is best for which job?</div><table style="width:100\%; border-collapse: collapse; font-size:1.6rem; text-align:center;"><tr style="background:rgba(255,255,255,0.1);"><th style="padding:10px; border:1px solid #444;">Source</th><th style="padding:10px; border:1px solid #444;">Pros</th><th style="padding:10px; border:1px solid #444;">Cons</th></tr><tr><td style="padding:10px; border:1px solid #444;">Solar</td><td style="padding:10px; border:1px solid #444;">Clean, Infinite</td><td style="padding:10px; border:1px solid #444;">No Night Power</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:10px; border:1px solid #444;">Hydro</td><td style="padding:10px; border:1px solid #444;">Consistent</td><td style="padding:10px; border:1px solid #444;">Hurts Fish</td></tr><tr><td style="padding:10px; border:1px solid #444;">Coal</td><td style="padding:10px; border:1px solid #444;">Reliable</td><td style="padding:10px; border:1px solid #444;">Heavy Pollution</td></tr></table>'
                        },
                        {
                            title: '🌊 The Power of Water: Hydroelectric',
                            content: '<div style="line-height:1.7;">Gravity is a power plant!</div><div class="journal-box" style="border-left-color:#2196f3; background:rgba(33,150,243,0.1);">By building a dam, we trap water behind a wall. When we let it fall, it turns giant "turbines" (like underwater propellers) which spin generators. It is one of the oldest and most reliable ways to make <strong>Renewable</strong> electricity.</div>'
                        },
                        {
                            title: '🔌 The Power Grid: Moving Energy',
                            content: '<div style="line-height:1.7;">Electricity is useless if you can\'t get it from the "Solar Farm" to your house.</div><div class="journal-box"><strong>The Great Connection:</strong> We use an enormous network of wires and stations to share power across the country. But here\'s the catch: the longer the wire, the more energy is lost to heat! We have to "step up" the pressure to incredibly high levels (765,000 Volts!) just to make sure enough energy arrives at your toaster.</div>'
                        },
                        {
                            title: '⚖️ Case Study: The Lunar Loop',
                            content: '<div style="line-height:1.7;">In our mission, we use a <strong>Closed Loop</strong> system.</div><div class="journal-box" style="border-left-color:#00d4aa; background:rgba(0,212,170,0.15);">Solar panels power the machines that split water into Hydrogen (fuel) and Oxygen (air). When the astronauts breathe and use the fuel, it creates water again! It is the ultimate sustainable system.</div>'
                        },
                        {
                            title: '🚪 Exit Ticket & Cleanup',
                            content: '<div class="journal-box"><strong>Journal Task:</strong> Answer in complete sentences:<br><br>1. If you were the Mayor, would you build a <strong>Wind Farm</strong> or a <strong>Coal Plant</strong>? Give one reason why.<br><br>2. What is one thing you can do at home to reduce your <strong>Carbon Footprint</strong>?</div>'
                        }
                    ]
                },
                'lesson36': {
                    title: 'LAB 3: The Transformer Challenge (45 min)',
                    slides: [
                        {
                            title: '🔬 Lab Overview: Your Mission Today',
                            content: '<strong style="font-size:1.4rem;">🎯 YOUR GOAL: Build a device that converts energy from one form to another!</strong><div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin:15px 0;"><div style="background:rgba(40,167,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #28a745;"><strong style="font-size:1.2rem;">✅ SUCCESS CRITERIA:</strong><br>1. Choose a Power Source<br>2. Choose an Output Device<br>3. Make a Complete Circuit<br>4. Identify Energy Transformations</div><div style="background:rgba(220,53,69,0.2);padding:15px;border-radius:10px;border-left:4px solid #dc3545;"><strong style="font-size:1.2rem;">⚠️ SAFETY RULES:</strong><br>• Do not touch bare wire to battery ends for more than 2 seconds (Heat!)<br>• Always include an output device (like a bulb) to prevent short circuits!</div></div><div style="background:rgba(102,126,234,0.3);padding:15px;border-radius:10px;"><strong>⏱️ TODAY\'S SCHEDULE:</strong><table style="width:100\%;margin-top:8px;"><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">10 min</td><td style="padding:5px 10px;">Mission Overview & Planning</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">30 min</td><td style="padding:5px 10px;">Building & Testing Transformations</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">5 min</td><td style="padding:5px 10px;">Cleanup & Mission Reports</td></tr></table></div>'
                        },
                        {
                            title: '🛠️ Supplies & Components in your Lab Bin',
                            content: '<div style="background:rgba(255,255,255,0.1);padding:20px;border-radius:10px;"><strong style="font-size:1.8rem;">📦 WHAT YOU NEED:</strong><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:15px;font-size:1.5rem;"><div style="background:rgba(255,193,7,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Power: DC Generator<br><span style="font-size:1rem;font-weight:normal;">or Solar Cell / Battery</span></div><div style="background:rgba(255,193,7,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Path: Copper Wires<br><span style="font-size:1rem;font-weight:normal;">or Cricket Cables</span></div><div style="background:rgba(255,193,7,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Output: Light Bulb<br><span style="font-size:1rem;font-weight:normal;">or Tone Generator</span></div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Washers & Springs</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Cardboard Base</div><div style="background:rgba(102,126,234,0.2);padding:15px;border-radius:8px;text-align:center;font-weight:bold;">Tape & Glue</div></div></div><div style="margin-top:20px;padding:15px;background:rgba(255,193,7,0.15);border-radius:10px;"><strong>📐 SETUP STEPS:</strong><ol><li>Pick your **Power Source** (Input) and **Output Device**.</li><li>Draw your circuit plan.</li><li>Build it! Connect your power to your output using wires to make a closed loop!</li></ol></div>'
                        },
                        {
                            title: '🏁 Procedure: Step-by-Step (30 min)',
                            content: '<strong>📋 FOLLOW THESE STEPS CAREFULLY:</strong><div style="margin:15px 0;"><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">1</div><div><strong>CONNECT:</strong> Create a complete circuit loop connecting your input to output. Check all metal-on-metal contacts!</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">2</div><div><strong>TRANSFORM:</strong> Crank your generator, shine light on your solar cell, or connect your battery. Does it beep or light up?</div></div><div style="display:flex;align-items:center;gap:15px;background:rgba(102,126,234,0.15);padding:12px;border-radius:8px;margin-bottom:10px;"><div style="background:#667eea;color:white;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:1.3rem;">3</div><div><strong>OPTIMIZE:</strong> Make a cool stand using the cardboard and washers. How can you turn it off and on? Make a switch!</div></div></div>'
                        },
                        {
                            title: '🔬 STEM Interactive: Practice Stations!',
                            content: '<div style="margin-bottom:15px;"><strong>Wait for the Hand Generator?</strong> Since we have 2 generators, we will rotate stations! Watch the simulation below to remember how the energy transforms!</div><div id="threejs-container-l36" style="width:100\%; height:450px; background:rgba(0,0,0,0.2); border-radius:15px; margin:15px 0; position:relative; overflow:hidden;"></div><div class="energy-controls"><button class="btn-debug" onclick="if(window.initTransformerSim) window.initTransformerSim()">🛠️ Debug Sim</button><button class="btn-drop" onclick="if(window.pulseCrank) window.pulseCrank()">🌀 Virtual Crank</button><button class="btn-pause" onclick="if(window.pauseLab) window.pauseLab()">⏸️ Pause</button><button class="btn-slow" onclick="if(window.slowMoLab) window.slowMoLab()">🐢 Slow Mo</button><button class="btn-reset" onclick="if(window.resetLab) window.resetLab()">🔄 Reset</button></div>'
                        },
                        {
                            title: '🧠 Scientific Integration: The Energy Chain',
                            content: '<div style="line-height:1.7;"><strong>Explain the energy chain in your design:</strong></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔍 If using the Generator...</div><div class="reveal-content">The crank turns <strong>Motion Energy</strong> into <strong>Electrical Energy</strong>.</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">🔍 If using the Solar Cell...</div><div class="reveal-content">The solar cell converts <strong>Light Energy</strong> from the sun or flashlight into <strong>Electrical Energy</strong>.</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">🔍 If using the Battery...</div><div class="reveal-content">The battery converts stored <strong>Chemical Energy</strong> into <strong>Electrical Energy</strong>.</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">💥 Final Output</div><div class="reveal-content">The electrical energy travels through the wires, and is transformed back into <strong>Sound Energy</strong> (Tone Generator) or <strong>Light/Heat Energy</strong> (Bulb).</div></div>'
                        },
                        {
                            title: '🚪 Cleanup & Accountability',
                            content: '<div class="journal-box"><strong>🧹 MINUTE 40: MISSION REPORT</strong><ol><li>Draw your final device and label the energy flow (e.g., Motion &rarr; Electrical &rarr; Light).</li><li>Disconnect all batteries to prevent drains!</li><li>Return all materials to the bins.</li></ol></div><div style="margin-top:20px;padding:20px;background:rgba(40,167,69,0.2);border-radius:10px;border-left:4px solid #28a745;"><strong>📓 FINAL THOUGHT:</strong> What was the most challenging part of completing your circuit? Did you have to change your plan? That is true Engineering!</div>'
                        }
                    ]
                },
                'lesson37': {
                    title: 'The Energy & Forces Games (Review)',
                    slides: [
                        {
                            title: '🏁 Bundle 3 Review Games: Pictionary Relay',
                            content: '<div style="margin-bottom:15px;"><strong>Rules:</strong> One student from each team comes to the board. Direct them to draw one of these Bundle 3 terms while their team guesses!</div><div class="structure-grid"><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🎢 Term 1...</div><div class="reveal-content"><strong>Potential Energy</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🏎️ Term 2...</div><div class="reveal-content"><strong>Kinetic Energy</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">〰️ Term 3...</div><div class="reveal-content"><strong>Amplitude</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🧲 Term 4...</div><div class="reveal-content"><strong>Electromagnet</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔋 Term 5...</div><div class="reveal-content"><strong>Parallel Circuit</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🌡️ Term 6...</div><div class="reveal-content"><strong>Convection</strong></div></div></div>'
                        },
                        {
                            title: '🧠 Game 1: Memory Match (Bundle 3)',
                            content: '<div style="margin-bottom:15px;">Match the energy term to its definition!</div><div id="memory-game-board-b3" class="memory-grid"></div><button onclick="if(window.initMemoryGameB3) window.initMemoryGameB3()" style="margin-top:20px; padding:10px 20px; font-size:1.4rem; border-radius:10px; border:none; background:#667eea; color:white; cursor:pointer; font-weight:bold;">🔄 Reset Memory Game</button>'
                        },
                        {
                            title: '🏃 Game 2: Four Corners (Multiple Choice)',
                            content: '<div style="margin-bottom:15px;"><strong>Move to the corner (A, B, C, D) that matches the correct answer!</strong></div><div style="text-align:center;margin:15px 0;"><button onclick="if(window.initFourCornersB3) window.initFourCornersB3()" style="background:#ffc107;color:#333;border:none;padding:12px 24px;border-radius:20px;font-size:1.4rem;cursor:pointer;font-weight:bold;box-shadow:0 4px 6px rgba(0,0,0,0.2);">▶️ Start/Restart Game</button></div><div id="four-corners-container-b3" style="background:rgba(255,255,255,0.1);padding:20px;border-radius:15px;min-height:300px;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;"><p style="font-size:1.4rem;">Click Start to begin!</p></div>'
                        },
                        {
                            title: '🎭 Game 3: Charades (Active Review)',
                            content: '<div style="margin-bottom:15px;"><strong>Rules:</strong> No talking! Act out these Bundle 3 concepts for your team to guess.</div><div class="charades-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:15px;"><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🌊 Concept 1...</div><div class="reveal-content"><strong>Refraction</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔥 Concept 2...</div><div class="reveal-content"><strong>Convection</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">⚡ Concept 3...</div><div class="reveal-content"><strong>Short Circuit</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">💪 Concept 4...</div><div class="reveal-content"><strong>Kinetic Energy</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🎢 Concept 5...</div><div class="reveal-content"><strong>Potential Energy</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">〰️ Concept 6...</div><div class="reveal-content"><strong>Amplitude</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🧲 Concept 7...</div><div class="reveal-content"><strong>Electromagnet</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔋 Concept 8...</div><div class="reveal-content"><strong>Parallel Circuit</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🎨 Concept 9...</div><div class="reveal-content"><strong>Pigment</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🔄 Concept 10...</div><div class="reveal-content"><strong>Transformation</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🧬 Concept 11...</div><div class="reveal-content"><strong>Biofuel</strong></div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">🛰️ Concept 12...</div><div class="reveal-content"><strong>Solar Power</strong></div></div></div>'
                        },
                        {
                            title: '🏆 Game 4: Mission Jeopardy',
                            content: '<div style="margin-bottom:15px;">Pick a category and point value!</div><div style="text-align:center;margin-bottom:15px;"><span id="jeopardy-score-b3" style="font-size:1.8rem;font-weight:bold;background:rgba(0,0,0,0.3);padding:10px 20px;border-radius:12px;border:1px solid rgba(255,255,255,0.2);">Score: 0</span> <button onclick="if(window.initJeopardyB3) window.initJeopardyB3()" style="margin-left:15px;background:#dc3545;color:white;border:none;padding:10px 20px;border-radius:10px;cursor:pointer;font-weight:bold;font-size:1.2rem;">🚀 Start Game</button></div><div id="jeopardy-grid-game-b3" class="jeopardy-grid"></div><div id="jeopardy-modal-game-b3" class="jeopardy-modal" style="display:none;"><div class="jeopardy-modal-content"><span class="close-modal" onclick="window.closeJeopardyModalB3()">×</span><div id="jeopardy-question-b3" style="font-size:1.6rem; line-height:1.5;"></div><div id="jeopardy-answer-b3" style="display:none;margin-top:20px;color:#4caf50;font-weight:bold;font-size:1.8rem;"></div><button id="jeop-reveal-btn-b3" onclick="window.revealJeopardyAnswerB3()" style="margin-top:20px;padding:12px 24px;background:#ffc107;border:none;border-radius:10px;cursor:pointer;font-size:1.3rem;font-weight:bold;">🔍 Show Answer</button></div></div>'
                        }
                    ]
                },
                'lesson38': {
                    title: 'Bundle 3: Energy & Forces Test',
                    slides: [
                        {
                            title: '📝 Question 1: Energy Forms',
                            content: '<div style="margin-bottom:15px; font-size:1.4rem;">A roller coaster sitting at the top of a hill has the most:</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">A. Kinetic Energy</div><div class="reveal-content">❌ Incorrect. Kinetic Energy is for motion.</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">B. Potential Energy</div><div class="reveal-content">✅ <strong>Correct!</strong> Potential Energy is stored by height.</div></div>'
                        },
                        {
                            title: '📝 Question 2: Conservation',
                            content: '<div style="margin-bottom:15px; font-size:1.4rem;">Energy cannot be created or destroyed. This is called:</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">A. The Law of Complexity</div><div class="reveal-content">❌ Incorrect. There is no such law in basic physics!</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">B. The Law of Conservation</div><div class="reveal-content">✅ <strong>Correct!</strong> Energy only transforms; it never disappears.</div></div>'
                        },
                        {
                            title: '📝 Question 3: Sound Waves',
                            content: '<div style="margin-bottom:15px; font-size:1.4rem;">The "height" of a wave determines its:</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">A. Pitch</div><div class="reveal-content">❌ Incorrect. Frequency (how fast it wiggles) determines pitch.</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">B. Amplitude (Volume)</div><div class="reveal-content">✅ <strong>Correct!</strong> Higher amplitude means more volume.</div></div>'
                        },
                        {
                            title: '📝 Question 4: Light Optics',
                            content: '<div style="margin-bottom:15px; font-size:1.4rem;">Which material allows NO light to pass through it?</div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')"><div class="reveal-hint">A. Transparent</div><div class="reveal-content">❌ Incorrect. Light passes through clearly.</div></div><div class="reveal-box" onclick="this.classList.toggle(\'revealed\')" style="margin-top:10px;"><div class="reveal-hint">B. Opaque</div><div class="reveal-content">✅ <strong>Correct!</strong> Opaque materials like brick walls block all light.</div></div>'
                        }
                    ]
                },
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



            // Apply global slide fixes: merge Objectives+Vocabulary and diversify DC

            Object.keys(lessonData).forEach((lid, idx) => {

                const slides = lessonData[lid].slides;

                const merged = mergeObjectivesAndVocabulary(slides);

                // Change Digital Citizenship module every 4 lessons (after labs: 4, 8, 12, ...)

                const lessonNum = parseInt((lid || '').replace('lesson', ''), 10);

                const groupIndex = Number.isFinite(lessonNum) ? Math.floor((lessonNum - 1) / 4) : Math.floor(idx / 4);

                lessonData[lid].slides = diversifyDigitalCitizenship(merged, groupIndex);

            });

        }



        function generateSlides() {

            const lesson = lessonData[currentLesson];

            if (!lesson) return;



            document.getElementById('modalTitle').textContent = lesson.title;



            const wrapper = document.getElementById('slidesWrapper');

            wrapper.innerHTML = '';



            lesson.slides.forEach((slide, index) => {

                const slideDiv = document.createElement('div');

                slideDiv.className = 'slide';



                let slideHTML = `<div class="slide-title">${slide.title}</div>`;



                if (slide.content) {

                    // Wrap reveal items in a container for two-column layout

                    let content = slide.content.replace(/\n/g, '<br>');



                    // Simple approach: wrap all reveal items in a container

                    const revealItemRegex = /<div class="reveal-item"[^>]*>.*?<\/div>/g;

                    const revealItems = content.match(revealItemRegex) || [];



                    if (revealItems.length > 0) {

                        // Replace all reveal items with a container

                        content = content.replace(revealItemRegex, '');



                        // Add the container with all reveal items

                        const containerStart = '<div class="reveal-items-container">';

                        const containerEnd = '</div>';

                        const allRevealItems = revealItems.join('');



                        // Find where to insert the container (after the last non-reveal content)

                        const lastBrIndex = content.lastIndexOf('<br>');

                        if (lastBrIndex !== -1) {

                            content = content.substring(0, lastBrIndex) + '<br>' + containerStart + allRevealItems + containerEnd;

                        } else {

                            content += containerStart + allRevealItems + containerEnd;

                        }

                    }



                    slideHTML += `<div class="slide-content">${content}</div>`;

                }



                if (slide.image) {

                    slideHTML += renderImageElement(slide.image, slide.title, slide.imageDescription || '', slide.expectedImage || '');

                }



                if (slide.images) {

                    slideHTML += '<div style="display: flex; justify-content: center; gap: 30px; margin: 30px 0; height: 60vh;">';

                    slide.images.forEach(imageSrc => {

                        slideHTML += renderImageElement(imageSrc, slide.title, slide.imageDescription || '', slide.expectedImage || '', true);

                    });

                    slideHTML += '</div>';

                }



                if (slide.extraContent) {

                    slideHTML += slide.extraContent;

                }



                if (slide.vocabulary) {

                    slideHTML += generateVocabularySection(slide.vocabulary);

                }





                slideDiv.innerHTML = slideHTML;

                wrapper.appendChild(slideDiv);

            });



            updateSlidePosition();



            // Timer event listeners are now handled in renderTimerBar()

        }



        function generateSlideNavigation(totalSlides) {

            const navigation = document.getElementById('slideNav');

            navigation.innerHTML = '';



            for (let i = 0; i < totalSlides; i++) {

                const dot = document.createElement('button');

                dot.className = 'nav-dot';

                dot.onclick = () => showSlide(i);

                navigation.appendChild(dot);

            }

        }



        function updateSlidePosition() {

            const wrapper = document.getElementById('slidesWrapper');

            wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

        }



        function revealAnswer(element) {

            const answer = element.querySelector('.reveal-answer');

            if (answer) {

                if (answer.classList.contains('show')) {

                    answer.classList.remove('show');

                } else {

                    answer.classList.add('show');

                }

            }

        }



        function resetReveals() {

            const answers = document.querySelectorAll('.reveal-answer');

            answers.forEach(answer => {

                answer.classList.remove('show');

            });

        }



        function flipCard(cardElement) {

            cardElement.classList.toggle('flipped');

        }



        function showSlide(slideIndex) {
            const lesson = lessonData[currentLesson];
            if (!lesson || slideIndex < 0 || slideIndex >= lesson.slides.length) return;

            currentSlide = slideIndex;
            updateSlidePosition();
            resetReveals();

            const navDots = document.querySelectorAll('.nav-dot');
            navDots.forEach(dot => dot.classList.remove('active'));
            if (navDots[slideIndex]) {
                navDots[slideIndex].classList.add('active');
            }

            // Three.js Interactive Hooks
            if (window.threeJSAnimId) {
                cancelAnimationFrame(window.threeJSAnimId);
                window.threeJSAnimId = null;
            }

            const currentSlideContent = lesson.slides[slideIndex].content || '';
            // Robust check: Include explicit slide indices as fallback
            // L25: Index 2, L26: Index 4, L27: Index 4, L29: Index 5, L30: Index 5, L31: Index 4
            if (currentSlideContent.includes('threejs-container') ||
                currentSlideContent.includes('memory-game-board') ||
                currentSlideContent.includes('four-corners-container') ||
                currentSlideContent.includes('jeopardy-grid-game') ||
                (currentLesson === 'lesson25' && slideIndex === 2) ||
                (currentLesson === 'lesson26' && slideIndex === 4) ||
                (currentLesson === 'lesson27' && slideIndex === 4) ||
                (currentLesson === 'lesson29' && slideIndex === 5) ||
                (currentLesson === 'lesson30' && slideIndex === 5) ||
                (currentLesson === 'lesson31' && slideIndex === 4) ||
                (currentLesson === 'lesson33' && slideIndex === 3) ||
                (currentLesson === 'lesson34' && slideIndex === 4) ||
                (currentLesson === 'lesson35' && slideIndex === 4) ||
                (currentLesson === 'lesson37' && slideIndex === 1) ||
                (currentLesson === 'lesson37' && slideIndex === 2) ||
                (currentLesson === 'lesson37' && slideIndex === 4)) {

                console.log('Triggering Interaction for', currentLesson, 'Slide', slideIndex);

                const triggerSim = () => {
                    let attempts = 0;
                    const checkAndRun = () => {
                        let fn = null;
                        let id = '';
                        if (currentLesson === 'lesson25') { fn = window.initPotKinSim; id = 'threejs-container-l25'; }
                        else if (currentLesson === 'lesson26') { fn = window.initCrankSim; id = 'threejs-container-l26'; }
                        else if (currentLesson === 'lesson27') { fn = window.initCollisionSim; id = 'threejs-container-l27'; }
                        else if (currentLesson === 'lesson29') { fn = window.initSoundSim; id = 'threejs-container-l29'; }
                        else if (currentLesson === 'lesson30') { fn = window.initLightSim; id = 'threejs-container-l30'; }
                        else if (currentLesson === 'lesson31') { fn = window.initHeatSim; id = 'threejs-container-l31'; }
                        else if (currentLesson === 'lesson33' && slideIndex === 3) { fn = window.initCircuitSim; id = 'threejs-container-l33'; }
                        else if (currentLesson === 'lesson34' && slideIndex === 4) { fn = window.initMagnetSim; id = 'threejs-container-l34'; }
                        else if (currentLesson === 'lesson35' && slideIndex === 4) { fn = window.initSustainabilitySim; id = 'threejs-container-l35'; }
                        else if (currentLesson === 'lesson36' && slideIndex === 8) { fn = window.initTransformerSim; id = 'threejs-container-l36'; }
                        else if (currentLesson === 'lesson37' && slideIndex === 1) { fn = window.initMemoryGameB3; id = 'memory-game-board-b3'; }
                        else if (currentLesson === 'lesson37' && slideIndex === 2) { fn = window.initFourCornersB3; id = 'four-corners-container-b3'; }
                        else if (currentLesson === 'lesson37' && slideIndex === 4) { fn = window.initJeopardyB3; id = 'jeopardy-grid-game-b3'; }

                        const container = document.getElementById(id);
                        if (container && fn) {
                            console.log('Container found, running sim:', id);
                            fn();
                        } else {
                            attempts++;
                            if (attempts < 20) {
                                setTimeout(checkAndRun, 100); // Retry 20 times (2s)
                            } else {
                                console.error('Sim Container timed out:', id);
                                if (container) container.innerHTML = "Error: Simulation unavailable.";
                            }
                        }
                    };
                    checkAndRun();
                };
                triggerSim();
            }
        }



        function nextSlide() {

            const lesson = lessonData[currentLesson];

            if (lesson && currentSlide < lesson.slides.length - 1) {

                showSlide(currentSlide + 1);

            }

        }



        function previousSlide() {

            if (currentSlide > 0) {

                showSlide(currentSlide - 1);

            }

        }



        function escapeAttribute(str = '') {

            return str.replace(/"/g, '&quot;');

        }



        function renderImageElement(src, title, description = '', expected = '', isGallery = false) {

            const containerClass = isGallery ? 'gallery-image-wrapper' : 'single-image-wrapper';

            const widthStyle = isGallery
                ? 'width: 100%; height: auto;'
                : 'max-width: 1100px; width: 90%; height: auto;';

            const outerStyle = isGallery

                ? 'display: flex; justify-content: center; align-items: flex-start; width: 45%; margin: 20px 0;'

                : 'display: flex; justify-content: center; width: 100%; margin: 30px 0;';



            return `

                <div class="${containerClass}" style="${outerStyle}">

                    <img 

                        src="${src}" 

                        alt="${title}" 

                        style="${widthStyle} object-fit: contain; border-radius: 15px; box-shadow: 0 6px 12px rgba(0,0,0,0.4);" 

                        data-placeholder="${escapeAttribute(description)}" 

                        data-expected="${escapeAttribute(expected)}"

                        data-mode="${isGallery ? 'gallery' : 'single'}"

                        onerror="handleImageError(this)">

                </div>

            `;

        }



        function handleImageError(img) {

            if (!img || img.dataset.replaced === 'true') return;

            img.dataset.replaced = 'true';



            const description = img.getAttribute('data-placeholder') || 'Add your lesson image here.';

            const expected = img.getAttribute('data-expected');

            const srcPath = img.getAttribute('src') || '';

            const mode = img.getAttribute('data-mode') || 'single';



            const placeholder = document.createElement('div');

            placeholder.className = 'image-placeholder-card';

            placeholder.style.width = mode === 'gallery' ? '90%' : '80%';

            placeholder.style.height = 'auto';

            placeholder.innerHTML = `

                <div style="font-size: 2.0rem; font-weight: 700;">Image Placeholder</div>
                <div style="font-size: 1.4rem;">${description}</div>
                <div class="expected-file">Expected file: ${expected || srcPath}</div>

                <div style="font-size: 1.2rem; opacity: 0.85;">Add the image file at the path shown above to replace this placeholder automatically.</div>
            `;



            const wrapper = img.parentElement;

            if (wrapper) {

                wrapper.innerHTML = '';

                wrapper.appendChild(placeholder);

            }

        }



        function generateVocabularySection(vocabulary) {

            // Check if any items are images to use different styling

            const hasImages = vocabulary.some(item => item.term.includes('.png') || item.term.includes('.jpg') || item.term.includes('.jpeg'));



            let html = `

                <div class="vocab-cards" style="${hasImages ? 'display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 40px; padding: 40px; width: 100%; height: 70vh; margin: 0 auto; place-items: center;' : ''}">

            `;



            vocabulary.forEach(item => {

                // Check if the term is an image path

                const isImage = item.term.includes('.png') || item.term.includes('.jpg') || item.term.includes('.jpeg');



                if (isImage) {

                    html += `

                        <div class="vocab-card" onclick="flipCard(this)" style="width: 100%; max-width: 350px; height: 350px; padding: 0 !important; margin: 0 auto; border: 4px solid #fff; border-radius: 20px; overflow: hidden; aspect-ratio: 1; box-sizing: border-box;">

                            <div class="card-inner" style="width: 100%; height: 100%; padding: 0 !important;">

                                <div class="card-front" style="width: 100%; height: 100%; padding: 0 !important; margin: 0 !important;">

                                    <img src="${item.term}" alt="Life cycle stage" style="width: 100%; height: 100%; object-fit: cover; display: block; padding: 0; margin: 0;">

                                </div>

                                <div class="card-back" style="width: 100%; height: 100%; padding: 30px; display: flex; align-items: center; justify-content: center; font-size: 2.8rem; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">${item.definition}</div>
                            </div>

                        </div>

                    `;

                } else {

                    html += `

                        <div class="vocab-card" onclick="flipCard(this)">

                            <div class="card-inner">

                                <div class="card-front">${item.term}</div>

                                <div class="card-back"><div><strong>${item.term}:</strong> ${item.definition}</div></div>
                            </div>

                        </div>

                    `;

                }

            });



            html += `</div>`;

            return html;

        }



        function generateFlipCardsSection(flipCards) {

            let html = '<div class="flip-cards-container" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0;">';

            flipCards.forEach(card => {

                html += `

                    <div class="flip-card" onclick="flipCard(this)" style="

                        background-color: #f8f9fa;

                        border-radius: 15px;

                        padding: 20px;

                        cursor: pointer;

                        transition: transform 0.3s ease;

                        text-align: center;

                        min-height: 200px;

                        display: flex;

                        align-items: center;

                        justify-content: center;

                        border: 2px solid #e9ecef;

                    ">

                        <div class="flip-card-inner" style="

                            position: relative;

                            width: 100%;

                            height: 100%;

                            transition: transform 0.6s;

                            transform-style: preserve-3d;

                        ">

                            <div class="flip-card-front" style="

                                position: absolute;

                                width: 100%;

                                height: 100%;

                                backface-visibility: hidden;

                                display: flex;

                                flex-direction: column;

                                align-items: center;

                                justify-content: center;

                            ">

                                <img src="${card.front}" alt="Life cycle stage" style="

                                    max-width: 150px;

                                    max-height: 150px;

                                    object-fit: cover;

                                    border-radius: 10px;

                                ">

                            </div>

                            <div class="flip-card-back" style="

                                position: absolute;

                                width: 100%;

                                height: 100%;

                                backface-visibility: hidden;

                                display: flex;

                                align-items: center;

                                justify-content: center;

                                transform: rotateY(180deg);

                                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

                                color: white;

                                border-radius: 15px;

                            ">

                                <h3 style="font-size: 1.8rem; text-align: center;">${card.back}</h3>
                            </div>

                        </div>

                    </div>

                `;

            });

            html += '</div>';

            return html;

        }



        function flipCard(card) {

            const cardInner = card.querySelector('.card-inner') || card.querySelector('.flip-card-inner');

            if (cardInner) {

                cardInner.style.transform = cardInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';

            } else {

                card.classList.toggle('flipped');

            }

        }



        function flipAdaptationCard(card) {

            const flipInner = card.querySelector('.flip-card-inner');

            if (flipInner) {

                flipInner.style.transform = flipInner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';

            }

        }



        function showBioInfo(element, bioType) {

            const info = {

                'bio1': 'This organism has six legs, three body parts, and often has wings. It belongs to the insect family!',

                'bio2': 'This organism can live both in water and on land. It starts life with gills and develops lungs!',

                'bio3': 'This organism breathes air, is warm-blooded, and nurses its young with milk while living in the ocean!'

            };



            // Create a simple alert for now - you can enhance this with a modal later

            alert(info[bioType] || 'Click on an image to learn more about these amazing organisms!');

        }



        // Keyboard navigation

        document.addEventListener('keydown', function (event) {

            if (document.getElementById('lessonModal').classList.contains('active')) {

                if (event.key === 'ArrowRight' || event.key === ' ') {

                    event.preventDefault();

                    nextSlide();

                } else if (event.key === 'ArrowLeft') {

                    event.preventDefault();

                    previousSlide();

                } else if (event.key === 'Escape') {

                    closeLesson();

                }

            }

        });



        // Touch/swipe support for carousel

        let touchStartX = 0;

        let touchEndX = 0;

        let isDragging = false;

        let dragStartX = 0;

        let dragStartSlide = 0;



        document.addEventListener('touchstart', function (event) {

            if (document.getElementById('lessonModal').classList.contains('active')) {

                touchStartX = event.changedTouches[0].screenX;

            }

        });



        document.addEventListener('touchend', function (event) {

            if (document.getElementById('lessonModal').classList.contains('active')) {

                touchEndX = event.changedTouches[0].screenX;

                handleSwipe();

            }

        });



        function handleSwipe() {

            const swipeThreshold = 50;

            const diff = touchStartX - touchEndX;



            if (Math.abs(diff) > swipeThreshold) {

                if (diff > 0) {

                    // Swipe left - next slide

                    nextSlide();

                } else {

                    // Swipe right - previous slide

                    previousSlide();

                }

            }

        }



        // Draggable arrow functionality

        document.addEventListener('mousedown', function (event) {

            if (document.getElementById('lessonModal').classList.contains('active')) {

                if (event.target.closest('.arrow-right')) {

                    isDragging = true;

                    dragStartX = event.clientX;

                    dragStartSlide = currentSlide;

                    event.target.closest('.arrow-right').classList.add('dragging');

                    event.preventDefault();

                } else if (event.target.closest('.arrow-left')) {

                    isDragging = true;

                    dragStartX = event.clientX;

                    dragStartSlide = currentSlide;

                    event.target.closest('.arrow-left').classList.add('dragging');

                    event.preventDefault();

                }

            }

        });



        document.addEventListener('mousemove', function (event) {

            if (isDragging && document.getElementById('lessonModal').classList.contains('active')) {

                const diff = event.clientX - dragStartX;

                const threshold = 100;



                if (Math.abs(diff) > threshold) {

                    const rightArrow = document.querySelector('.arrow-right.dragging');

                    const leftArrow = document.querySelector('.arrow-left.dragging');



                    if (rightArrow) {

                        if (diff > 0 && currentSlide > 0) {

                            // Dragging right arrow right - go to previous slide

                            showSlide(dragStartSlide - 1);

                        } else if (diff < 0) {

                            const lesson = lessonData[currentLesson];

                            if (lesson && currentSlide < lesson.slides.length - 1) {

                                // Dragging right arrow left - go to next slide

                                showSlide(dragStartSlide + 1);

                            }

                        }

                    } else if (leftArrow) {

                        if (diff < 0 && currentSlide > 0) {

                            // Dragging left arrow left - go to previous slide

                            showSlide(dragStartSlide - 1);

                        } else if (diff > 0) {

                            const lesson = lessonData[currentLesson];

                            if (lesson && currentSlide < lesson.slides.length - 1) {

                                // Dragging left arrow right - go to next slide

                                showSlide(dragStartSlide + 1);

                            }

                        }

                    }

                }

            }

        });



        document.addEventListener('mouseup', function (event) {

            if (isDragging) {

                isDragging = false;

                const arrowBtn = document.querySelector('.arrow-right.dragging, .arrow-left.dragging');

                if (arrowBtn) {

                    arrowBtn.classList.remove('dragging');

                }

            }

        });



        // Navigation function

        function goBack() {

            window.location.href = 'teacher-portal.html';

        }

        // Flip hazard card on click
        function flipHazardCard(card) {
            const inner = card.querySelector('.haz-inner');
            if (inner) {
                if (inner.style.transform === 'rotateY(180deg)') {
                    inner.style.transform = 'rotateY(0deg)';
                } else {
                    inner.style.transform = 'rotateY(180deg)';
                }
            }
        }

        // Three.js Interactive Logic
        let scene, camera, renderer, ball, ground;
        let isDropping = false;
        let velocity = 0;
        let initialHeight = 5;
        let gravity = -0.01;
        let animationId;

        function initEnergyLab() {
            const container = document.getElementById('energy-lab-container');
            if (!container) return;

            if (renderer) {
                renderer.dispose();
                if (renderer.domElement.parentNode) {
                    renderer.domElement.parentNode.removeChild(renderer.domElement);
                }
            }

            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(renderer.domElement);

            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(5, 5, 5).normalize();
            scene.add(light);
            scene.add(new THREE.AmbientLight(0x404040));

            const groundGeometry = new THREE.PlaneGeometry(10, 10);
            const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
            ground = new THREE.Mesh(groundGeometry, groundMaterial);
            ground.rotation.x = -Math.PI / 2;
            scene.add(ground);

            const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
            const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b35 });
            ball = new THREE.Mesh(ballGeometry, ballMaterial);
            ball.position.y = initialHeight;
            scene.add(ball);

            const pGeometry = new THREE.BoxGeometry(1, initialHeight, 1);
            const pMaterial = new THREE.MeshPhongMaterial({ color: 0x666666 });
            const pedestal = new THREE.Mesh(pGeometry, pMaterial);
            pedestal.position.y = initialHeight / 2;
            pedestal.position.x = -1.5;
            scene.add(pedestal);

            camera.position.z = 10;
            camera.position.y = 3;

            if (animationId) cancelAnimationFrame(animationId);
            animate();
        }

        function animate() {
            animationId = requestAnimationFrame(animate);
            if (isDropping) {
                velocity += gravity;
                ball.position.y += velocity;
                if (ball.position.y <= 0.5) {
                    ball.position.y = 0.5;
                    velocity = 0;
                    isDropping = false;
                }
            }
            const h = Math.max(0, ball.position.y - 0.5);
            const pe = h * 9.8;
            const ke = 0.5 * 1 * (velocity * 200) ** 2;
            const peLabel = document.getElementById('pe-stat');
            const keLabel = document.getElementById('ke-stat');
            if (peLabel) peLabel.innerText = `Potential: ${pe.toFixed(1)} J`;
            if (keLabel) keLabel.innerText = `Kinetic: ${ke.toFixed(1)} J`;
            renderer.render(scene, camera);
        }

        window.dropBall = function () { if (ball.position.y > 0.6) isDropping = true; };
        window.resetBall = function () { isDropping = false; velocity = 0; ball.position.y = initialHeight; };

        // Crank Generator Logic
        let cScene, cCamera, cRenderer, wheel, bulb;
        let rotationSpeed = 0;
        let cAnimationId;

        function initCrankLab() {
            const container = document.getElementById('crank-lab-container');
            if (!container) return;
            if (cRenderer) {
                cRenderer.dispose();
                if (cRenderer.domElement.parentNode) cRenderer.domElement.parentNode.removeChild(cRenderer.domElement);
            }
            cScene = new THREE.Scene();
            cCamera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
            cRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            cRenderer.setSize(container.clientWidth, container.clientHeight);
            container.appendChild(cRenderer.domElement);
            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(5, 5, 5).normalize();
            cScene.add(light);
            cScene.add(new THREE.AmbientLight(0x404040));
            wheel = new THREE.Mesh(new THREE.TorusGeometry(2, 0.2, 16, 100), new THREE.MeshPhongMaterial({ color: 0x00d4aa }));
            wheel.position.x = -3;
            cScene.add(wheel);
            const spoke = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 0.1), wheel.material);
            wheel.add(spoke);
            bulb = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshPhongMaterial({ color: 0x333333, emissive: 0x000000 }));
            bulb.position.x = 3;
            cScene.add(bulb);
            const base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1, 1, 16), new THREE.MeshPhongMaterial({ color: 0x666666 }));
            base.position.y = -1;
            bulb.add(base);
            cCamera.position.z = 8;
            if (cAnimationId) cancelAnimationFrame(cAnimationId);
            animateCrank();
        }

        function animateCrank() {
            cAnimationId = requestAnimationFrame(animateCrank);
            wheel.rotation.z += rotationSpeed;
            rotationSpeed *= 0.98;
            const mech = rotationSpeed * 10;
            const elec = rotationSpeed * 8;
            const rad = Math.min(100, rotationSpeed * 500);
            const glow = rad / 100;
            bulb.material.emissive.setRGB(glow, glow, 0);
            bulb.material.color.setRGB(0.2 + glow * 0.8, 0.2 + glow * 0.8, 0);
            const mLabel = document.getElementById('mech-stat');
            const eLabel = document.getElementById('elec-stat');
            const rLabel = document.getElementById('rad-stat');
            if (mLabel) mLabel.innerText = `Mechanical: ${mech.toFixed(1)}`;
            if (eLabel) eLabel.innerText = `Electrical: ${elec.toFixed(1)}`;
            if (rLabel) rLabel.innerText = `Radiant: ${rad.toFixed(0)}%`;
            cRenderer.render(cScene, cCamera);
        }

        window.crankSystem = function () {
            rotationSpeed += 0.05;
            if (rotationSpeed > 0.5) rotationSpeed = 0.5;
        };

        window.showSlide = function (index) {
            const lesson = lessonData[currentLesson];
            if (!lesson) return;
            currentSlide = Math.max(0, Math.min(index, lesson.slides.length - 1));
            updateSlidePosition();
            const dots = document.querySelectorAll('.nav-dot');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
            setTimeout(() => {
                if (document.getElementById('energy-lab-container')) initEnergyLab();
                if (document.getElementById('crank-lab-container')) initCrankLab();
            }, 100);
        };


    