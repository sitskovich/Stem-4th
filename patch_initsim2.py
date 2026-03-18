import codecs
import re

with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
    html = f.read()

# 1. Replace the if/else block
pattern = r"\} else if \(lessonId === 'l42'\) \{\s*sim\.isPlaying = false;\s*setupRace\(\);\s*\} else \{\s*setupGenericOrbit\(\);\s*\}"

replacement = """} else if (lessonId === 'l42') {
        sim.isPlaying = false;
        setupRace();
    } else if (lessonId === 'l43') {
        sim.isPlaying = false;
        if(window.setupLightScene) window.setupLightScene();
    } else if (lessonId === 'l44') {
        sim.isPlaying = false;
        if(window.setupLightScene) window.setupLightScene();
    } else if (lessonId === 'l46') {
        sim.isPlaying = true;
        if(window.setupL46Sim) window.setupL46Sim(sim);
        sim.customRender = function() {
            if(window.animateL46Sim) window.animateL46Sim(sim);
        };
    } else {
        setupGenericOrbit();
    }"""

html, count = re.subn(pattern, replacement, html, flags=re.DOTALL)
print(f"initSim block replacements: {count}")

# 2. Replace the render loop
pattern_anim = r"updateSim\(lessonId\);\s*sim\.renderer\.render\(sim\.scene,\s*sim\.camera\);"
replacement_anim = """if (sim.customRender) {
            sim.customRender();
        } else {
            updateSim(lessonId);
        }
        sim.renderer.render(sim.scene, sim.camera);"""

html, count_anim = re.subn(pattern_anim, replacement_anim, html, flags=re.DOTALL)
print(f"animate block replacements: {count_anim}")

with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
    f.write(html)
