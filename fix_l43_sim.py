import codecs

def fix_l43_sim():
    with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
        html = f.read()

    insert_idx = html.find("function setupGenericOrbit()")

    if insert_idx == -1:
        print("Could not find setupGenericOrbit")
        return

    # Check if we already patched
    if "function setupLightScene()" in html:
        print("Already patched setupLightScene")
        return

    injection = """
function setupLightScene() {
    var sim = window.b4Sim;
    if (!sim) return;
    sim.camera.position.set(0, 5, 20);
    sim.camera.lookAt(0, 0, 0);
    
    // Ambient light so we can see the transparent glass and shadows
    sim.scene.add(new THREE.AmbientLight(0x444444));
    
    // Laser spotlight
    var spotLight = new THREE.SpotLight(0xff0000, 20, 50, Math.PI/16, 0.1, 1);
    spotLight.position.set(-15, 2, 0);
    spotLight.target.position.set(15, 2, 0);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    sim.scene.add(spotLight);
    sim.scene.add(spotLight.target);
    sim.spotLight = spotLight;

    // Laser box (Emitter housing)
    var laserBox = new THREE.Mesh(new THREE.BoxGeometry(2, 2, 2), new THREE.MeshPhongMaterial({color: 0x444444}));
    laserBox.position.set(-16, 2, 0);
    sim.scene.add(laserBox);

    // Back wall
    var backWall = new THREE.Mesh(new THREE.BoxGeometry(1, 10, 20), new THREE.MeshPhongMaterial({color: 0x555555}));
    backWall.position.set(15, 5, 0);
    backWall.receiveShadow = true;
    sim.scene.add(backWall);

    // Floor
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshPhongMaterial({color: 0x222222}));
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    sim.scene.add(floor);

    // Visual beam (red glowing line)
    var beamGeo = new THREE.CylinderGeometry(0.1, 0.1, 30);
    var beamMat = new THREE.MeshBasicMaterial({color: 0xff0000, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending});
    var beam = new THREE.Mesh(beamGeo, beamMat);
    beam.rotation.z = Math.PI / 2;
    beam.position.set(0, 2, 0);
    sim.scene.add(beam);
    sim.beam = beam;

    sim.blocks = [];
}

window.spawnBlock = function() {
    var sim = window.b4Sim;
    if(!sim || !sim.scene) return;
    
    if(sim.renderer && !sim.renderer.shadowMap.enabled) {
        sim.renderer.shadowMap.enabled = true;
        sim.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        sim.scene.traverse(function(c) { if(c.material) c.material.needsUpdate = true; });
    }

    var wall = new THREE.Mesh(new THREE.BoxGeometry(1.5, 6, 10), new THREE.MeshPhongMaterial({color: 0xff6600}));
    wall.position.set(0, 3, 0);
    wall.castShadow = true;
    wall.receiveShadow = true;
    sim.scene.add(wall);
    sim.blocks.push(wall);
    
    // Visually shorten the glowing beam line since the wall blocks it
    if(sim.beam) {
        sim.beam.scale.y = 0.5; // Shorten to 15
        sim.beam.position.x = -7.5; // Shift to stop at the wall (x=0)
    }
};

window.spawnGlass = function() {
    var sim = window.b4Sim;
    if(!sim || !sim.scene) return;
    
    var glass = new THREE.Mesh(new THREE.BoxGeometry(2, 6, 6), new THREE.MeshPhysicalMaterial({
        color: 0x88ccff, transparent: true, opacity: 0.4, roughness: 0.1, transmission: 0.9, depthWrite: false
    }));
    // Position it after the wall
    glass.position.set(6, 3, 0);
    glass.castShadow = true;
    sim.scene.add(glass);
    sim.blocks.push(glass);
};

window.resetLightScene = function() {
    var sim = window.b4Sim;
    if(!sim || !sim.scene) return;
    if(sim.blocks) {
        sim.blocks.forEach(function(b) { sim.scene.remove(b); });
        sim.blocks = [];
    }
    if(sim.beam) {
        sim.beam.scale.y = 1.0;
        sim.beam.position.x = 0;
    }
};

"""
    html = html[:insert_idx] + injection + html[insert_idx:]
    
    hook = """
<script>
    if (window.initSim) {
        var oldInitSim = window.initSim;
        window.initSim = function(id) {
            oldInitSim(id);
            if (id === 'l43') {
                var sim = window.b4Sim;
                if (sim && sim.scene) {
                    // Clear the old scene objects
                    var objectsToRemove = [];
                    sim.scene.traverse(function(child) {
                        if (child.isMesh || child.isLight || child.isLine || child.isPoints) {
                            objectsToRemove.push(child);
                        }
                    });
                    objectsToRemove.forEach(function(obj) {
                        sim.scene.remove(obj);
                    });
                    
                    if(sim.renderer) {
                        sim.renderer.shadowMap.enabled = true;
                        sim.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                    }
                    
                    setupLightScene();
                }
            }
        };
    }
</script>
</body>
"""
    html = html.replace("</body>", hook)

    with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
        f.write(html)
    print("Successfully injected L43 simulation logic!")

if __name__ == "__main__":
    fix_l43_sim()
