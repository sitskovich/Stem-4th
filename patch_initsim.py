import codecs

with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
    html = f.read()

old_block = "} else if (lessonId === 'l42') {\\n        sim.isPlaying = false;\\n        setupRace();\\n    } else {\\n        setupGenericOrbit();\\n    }"
old_block_r = "} else if (lessonId === 'l42') {\\r\\n        sim.isPlaying = false;\\r\\n        setupRace();\\r\\n    } else {\\r\\n        setupGenericOrbit();\\r\\n    }"

new_block = """} else if (lessonId === 'l42') {
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

if old_block in html:
    html = html.replace(old_block, new_block)
    print("Replaced with \\\\n")
elif old_block_r in html:
    html = html.replace(old_block_r, new_block.replace('\\n', '\\r\\n'))
    print("Replaced with \\\\r\\\\n")
else:
    print("Target block not found.")

old_anim = "updateSim(lessonId);\\n        sim.renderer.render(sim.scene, sim.camera);"
old_anim_r = "updateSim(lessonId);\\r\\n        sim.renderer.render(sim.scene, sim.camera);"

new_anim = """if (sim.customRender) {
            sim.customRender();
        } else {
            updateSim(lessonId);
        }
        sim.renderer.render(sim.scene, sim.camera);"""

if old_anim in html:
    html = html.replace(old_anim, new_anim)
    print("Replaced anim with \\\\n")
elif old_anim_r in html:
    html = html.replace(old_anim_r, new_anim.replace('\\n', '\\r\\n'))
    print("Replaced anim with \\\\r\\\\n")
else:
    print("Target anim not found.")

with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
    f.write(html)
