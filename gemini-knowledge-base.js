// Comprehensive 4th Grade Science Knowledge Base for Gemini AI
// This file contains extensive science knowledge, real-world applications, and problem-solving scenarios

const scienceKnowledgeBase = {
    vocabulary: {
        // Life Science Vocabulary
        'adaptation': {
            definition: "A trait that helps an organism survive in its environment",
            examples: ["Giraffe's long neck for reaching leaves", "Polar bear's white fur for camouflage", "Cactus spines for protection"],
            realWorld: "Engineers study animal adaptations to design better products, like Velcro inspired by burr plants! 🔬"
        },
        'ecosystem': {
            definition: "A community of living and non-living things that interact with each other",
            examples: ["Forest ecosystem", "Ocean ecosystem", "Desert ecosystem"],
            realWorld: "Scientists study ecosystems to help protect endangered species and restore damaged environments 🌍"
        },
        'photosynthesis': {
            definition: "The process plants use to make food using sunlight, water, and carbon dioxide",
            examples: ["Leaves turning sunlight into energy", "Plants producing oxygen", "Green color from chlorophyll"],
            realWorld: "Scientists are studying photosynthesis to create artificial leaves that could help solve energy problems! 🌱⚡"
        },
        'food chain': {
            definition: "A sequence showing how energy flows from one organism to another",
            examples: ["Grass → Rabbit → Hawk", "Algae → Fish → Shark", "Plant → Insect → Bird"],
            realWorld: "Understanding food chains helps farmers protect crops and scientists maintain healthy ecosystems 🐰🦅"
        },
        'producer': {
            definition: "An organism that makes its own food, usually plants",
            examples: ["Grass", "Trees", "Algae", "Seaweed"],
            realWorld: "Producers are essential for all life on Earth - they're the foundation of every food chain! 🌿"
        },
        'consumer': {
            definition: "An organism that eats other organisms for food",
            examples: ["Herbivores (plant eaters)", "Carnivores (meat eaters)", "Omnivores (eat both)"],
            realWorld: "Humans are consumers too! We depend on producers and other consumers for our food 🍎"
        },
        'decomposer': {
            definition: "An organism that breaks down dead plants and animals",
            examples: ["Bacteria", "Fungi", "Earthworms"],
            realWorld: "Decomposers are nature's recyclers - they turn waste into nutrients for new plants! ♻️"
        },
        'habitat': {
            definition: "The natural home or environment of an animal or plant",
            examples: ["Forest habitat", "Ocean habitat", "Desert habitat"],
            realWorld: "Conservationists work to protect habitats so animals and plants can survive and thrive 🏞️"
        },
        'migration': {
            definition: "The seasonal movement of animals from one place to another",
            examples: ["Birds flying south for winter", "Monarch butterflies traveling", "Caribou herds moving"],
            realWorld: "Scientists track animal migration to understand climate change and protect migration routes 🦅"
        },
        'hibernation': {
            definition: "A deep sleep that some animals enter during winter",
            examples: ["Bears sleeping in caves", "Groundhogs in burrows", "Bats in caves"],
            realWorld: "Understanding hibernation helps scientists develop new medical treatments for humans! 🐻"
        },

        // Earth Science Vocabulary
        'weathering': {
            definition: "The breaking down of rocks by wind, water, ice, or living things",
            examples: ["Water freezing in cracks", "Tree roots breaking rocks", "Wind blowing sand"],
            realWorld: "Weathering creates soil that farmers need to grow our food! 🌾"
        },
        'erosion': {
            definition: "The movement of weathered rock and soil by wind, water, or ice",
            examples: ["Rivers carrying sediment", "Wind moving sand dunes", "Glaciers carving valleys"],
            realWorld: "Understanding erosion helps engineers build stronger bridges and protect coastlines! 🌊"
        },
        'rock cycle': {
            definition: "The process of rocks changing from one type to another over time",
            examples: ["Igneous → Sedimentary → Metamorphic", "Heat and pressure changing rocks", "Melting and cooling"],
            realWorld: "The rock cycle creates valuable resources like marble for buildings and coal for energy! 🏗️"
        },
        'igneous rock': {
            definition: "Rock formed from cooled lava or magma",
            examples: ["Granite", "Basalt", "Obsidian"],
            realWorld: "Igneous rocks like granite are used to build countertops and monuments! 🏛️"
        },
        'sedimentary rock': {
            definition: "Rock formed from layers of sediment pressed together",
            examples: ["Sandstone", "Limestone", "Shale"],
            realWorld: "Sedimentary rocks often contain fossils that teach us about Earth's history! 🦕"
        },
        'metamorphic rock': {
            definition: "Rock changed by heat and pressure",
            examples: ["Marble", "Slate", "Gneiss"],
            realWorld: "Marble is used in beautiful buildings like the Taj Mahal! 🏛️"
        },
        'mineral': {
            definition: "A naturally occurring solid with a specific chemical composition",
            examples: ["Quartz", "Diamond", "Gold", "Salt"],
            realWorld: "Minerals are used in everything from jewelry to computer chips! 💎💻"
        },
        'fossil': {
            definition: "The preserved remains or traces of ancient living things",
            examples: ["Dinosaur bones", "Leaf imprints", "Shells in rock"],
            realWorld: "Fossils help scientists understand how life on Earth has changed over millions of years! 🦴"
        },
        'earthquake': {
            definition: "A sudden shaking of the ground caused by movement of Earth's crust",
            examples: ["Tectonic plates moving", "Fault lines shifting", "Ground shaking"],
            realWorld: "Scientists study earthquakes to help predict them and build safer buildings! 🏢"
        },
        'volcano': {
            definition: "An opening in Earth's crust where lava, ash, and gases escape",
            examples: ["Mount St. Helens", "Hawaiian volcanoes", "Underwater volcanoes"],
            realWorld: "Volcanic soil is very fertile and great for growing crops! 🌋🌱"
        },

        // Physical Science Vocabulary
        'energy': {
            definition: "The ability to do work or cause change",
            examples: ["Light energy", "Heat energy", "Motion energy", "Sound energy"],
            realWorld: "Energy powers everything from cars to computers to our own bodies! ⚡"
        },
        'motion': {
            definition: "The change in position of an object over time",
            examples: ["A ball rolling", "A car moving", "A bird flying"],
            realWorld: "Understanding motion helps engineers design safer cars and faster airplanes! 🚗✈️"
        },
        'force': {
            definition: "A push or pull that can change an object's motion",
            examples: ["Pushing a door", "Pulling a wagon", "Gravity pulling down"],
            realWorld: "Forces are everywhere - even when you're sitting still, gravity is pulling you down! 🪑"
        },
        'gravity': {
            definition: "The force that pulls objects toward each other",
            examples: ["Apples falling from trees", "Moon orbiting Earth", "Planets orbiting Sun"],
            realWorld: "Gravity keeps us on Earth and makes the Moon go around us! 🌙"
        },
        'friction': {
            definition: "A force that slows down objects when they rub against each other",
            examples: ["Shoes on pavement", "Brakes on wheels", "Air resistance"],
            realWorld: "Friction helps us walk without slipping, but engineers try to reduce it in cars for better gas mileage! 👟🚗"
        },
        'simple machine': {
            definition: "A basic tool that makes work easier",
            examples: ["Lever", "Pulley", "Wheel and axle", "Inclined plane"],
            realWorld: "Simple machines are everywhere - from scissors to car jacks to playground equipment! 🔧"
        },
        'lever': {
            definition: "A simple machine with a rigid bar that pivots on a fulcrum",
            examples: ["See-saw", "Crowbar", "Scissors", "Baseball bat"],
            realWorld: "Levers help us lift heavy things with less effort - like using a crowbar to move rocks! 🪨"
        },
        'pulley': {
            definition: "A simple machine with a wheel and rope used to lift heavy objects",
            examples: ["Flagpole", "Crane", "Window blinds", "Well bucket"],
            realWorld: "Pulleys are used in construction cranes to lift heavy building materials! 🏗️"
        },
        'wheel and axle': {
            definition: "A simple machine with a wheel attached to a rod",
            examples: ["Car wheel", "Doorknob", "Steering wheel", "Bicycle wheel"],
            realWorld: "Wheels and axles make transportation possible - from cars to bicycles to shopping carts! 🚲"
        },
        'inclined plane': {
            definition: "A simple machine that is a flat surface at an angle",
            examples: ["Ramp", "Stairs", "Slide", "Road up a hill"],
            realWorld: "Inclined planes help us move heavy objects - like ramps for wheelchairs! ♿"
        }
    },

    animals: {
        adaptations: {
            physical: [
                "Camouflage: Chameleons change color to blend in with their surroundings 🦎",
                "Sharp claws: Eagles use talons to catch prey 🦅",
                "Thick fur: Arctic foxes stay warm in cold climates 🦊",
                "Long neck: Giraffes reach leaves high in trees 🦒",
                "Webbed feet: Ducks swim efficiently in water 🦆"
            ],
            behavioral: [
                "Migration: Birds fly south for winter to find food 🐦",
                "Hibernation: Bears sleep through winter to save energy 🐻",
                "Hunting in groups: Wolves work together to catch prey 🐺",
                "Playing dead: Opossums pretend to be dead to avoid predators 🐭",
                "Building nests: Birds create safe homes for their babies 🪺"
            ]
        },
        habitats: {
            forest: "Forest animals like deer, squirrels, and owls live among trees and need shelter from weather 🌲",
            ocean: "Ocean animals like fish, whales, and sharks live in saltwater and need to breathe underwater 🌊",
            desert: "Desert animals like camels, snakes, and lizards survive with little water and extreme temperatures 🏜️",
            arctic: "Arctic animals like polar bears, penguins, and seals have thick fur and blubber to stay warm ❄️"
        },
        foodChains: [
            "Forest: Acorns → Squirrels → Hawks → Decomposers",
            "Ocean: Algae → Small fish → Big fish → Sharks",
            "Grassland: Grass → Rabbits → Foxes → Decomposers",
            "Desert: Cactus → Insects → Lizards → Snakes"
        ]
    },

    plants: {
        structures: {
            roots: "Roots anchor plants and absorb water and nutrients from soil. Some roots store food like carrots! 🥕",
            stems: "Stems support plants and transport water and nutrients. Some stems store water like cacti! 🌵",
            leaves: "Leaves make food through photosynthesis and help plants breathe. They come in many shapes! 🍃",
            flowers: "Flowers attract pollinators and produce seeds for new plants. They're nature's way of making babies! 🌸",
            fruits: "Fruits protect seeds and help them spread. Animals eat fruits and spread seeds in their droppings! 🍎"
        },
        adaptations: [
            "Cactus spines protect from animals and reduce water loss 🌵",
            "Water lily leaves float on water to get sunlight 🌸",
            "Venus flytrap catches insects for nutrients 🪴",
            "Pine needles stay green all year and resist cold 🌲",
            "Sunflower heads follow the sun across the sky 🌻"
        ],
        lifeCycle: "Seeds → Sprout → Seedling → Adult Plant → Flowers → Fruits → Seeds (cycle repeats) 🌱"
    },

    earthScience: {
        layers: {
            crust: "The thin outer layer where we live, made of rock and soil 🌍",
            mantle: "The thick middle layer of hot, flowing rock 🔥",
            outerCore: "The liquid layer of molten metal 🌋",
            innerCore: "The solid center made of iron and nickel ⚡"
        },
        rockCycle: {
            igneous: "Formed from cooled lava or magma, like granite and basalt 🌋",
            sedimentary: "Formed from layers of sediment, often contains fossils 🏔️",
            metamorphic: "Changed by heat and pressure, like marble and slate 🔥"
        },
        weathering: {
            physical: "Wind, water, ice, and temperature changes break rocks apart 🌪️",
            chemical: "Acid rain and other chemicals dissolve rocks 🧪",
            biological: "Plant roots and animal burrowing break rocks apart 🌱"
        },
        naturalDisasters: {
            earthquakes: "Caused by tectonic plates moving, can cause tsunamis 🌊",
            volcanoes: "Release lava, ash, and gases, create new land 🌋",
            hurricanes: "Powerful storms with strong winds and heavy rain 🌪️",
            tornadoes: "Spinning columns of air that can destroy buildings 🌪️"
        }
    },

    physicalScience: {
        energy: {
            types: [
                "Light energy: From the sun, powers solar panels ☀️",
                "Heat energy: Makes things warm, like a campfire 🔥",
                "Motion energy: Moving objects have this energy 🏃",
                "Sound energy: Vibrations we can hear 🔊",
                "Electrical energy: Powers our devices ⚡"
            ],
            transfer: "Energy can change from one type to another, like sunlight becoming electricity in solar panels! 🔄"
        },
        forces: {
            gravity: "Pulls objects toward Earth, keeps us on the ground 🌍",
            friction: "Slows down moving objects, helps us walk without slipping 👟",
            magnetism: "Attracts or repels metal objects, used in compasses 🧲",
            buoyancy: "Pushes objects up in water, helps boats float 🚢"
        },
        simpleMachines: {
            lever: "Makes lifting easier, like a see-saw or crowbar ⚖️",
            pulley: "Lifts heavy objects, like flagpoles and cranes 🏗️",
            wheel: "Reduces friction, makes transportation easier 🚗",
            inclinedPlane: "Makes moving objects easier, like ramps and stairs 🪜"
        }
    },

    engineering: {
        designProcess: [
            "1. Ask: What problem needs solving? 🤔",
            "2. Imagine: Brainstorm possible solutions 💡",
            "3. Plan: Choose the best solution and make a design 📋",
            "4. Create: Build a prototype 🛠️",
            "5. Test: Try it out and see what happens 🧪",
            "6. Improve: Make it better based on what you learned 🔧"
        ],
        realWorldApplications: [
            "Engineers design bridges to safely cross rivers 🌉",
            "They create water filters to clean dirty water 💧",
            "They build wind turbines to generate clean energy 💨",
            "They design prosthetics to help people with disabilities 🦿",
            "They create apps to solve everyday problems 📱"
        ]
    },

    problemSolving: {
        scenarios: [
            {
                problem: "A farmer's crops are dying because of drought. How can we help?",
                solution: "Design a water collection system using rain barrels and drip irrigation to conserve water! 💧",
                realWorld: "This is how farmers in dry areas grow food sustainably! 🌾"
            },
            {
                problem: "Animals are losing their homes because of deforestation. What can we do?",
                solution: "Create wildlife corridors - strips of protected land connecting forest areas so animals can move safely! 🦌",
                realWorld: "Wildlife corridors are being built around the world to protect endangered species! 🌍"
            },
            {
                problem: "A town's electricity goes out during a storm. How can we help?",
                solution: "Design a backup power system using solar panels and batteries to keep essential services running! ☀️",
                realWorld: "Many hospitals and emergency services use backup power systems just like this! 🏥"
            },
            {
                problem: "Plastic pollution is harming ocean animals. What's the solution?",
                solution: "Create a community recycling program and design biodegradable alternatives to plastic! ♻️",
                realWorld: "Scientists are developing biodegradable plastics made from plants! 🌱"
            }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = scienceKnowledgeBase;
}
