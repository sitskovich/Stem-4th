"""
Fix the duplicate JS problem and add event delegation so all buttons work.
1. Delete the OLD duplicate Bundle 4 JS block at the bottom of the file
2. Add document-level event delegation to the enhanced JS in the <head>
"""

def fix():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()

    original_lines = len(html.splitlines())
    print(f"Original: {original_lines} lines")

    # STEP 1: Find and remove the OLD duplicate Bundle 4 script block
    # It starts with "<script>\n// Custom Bundle 4 STEM Simulators\nlet b4Sim"
    # and ends with the next "</script>"
    # We need to find the SECOND occurrence (the first is our good one in <head>)
    
    marker = "// Custom Bundle 4 STEM Simulators"
    first_idx = html.find(marker)
    second_idx = html.find(marker, first_idx + len(marker))
    
    if second_idx == -1:
        print("No duplicate found. Checking if old code exists differently...")
        # Try finding the old-style "let b4Sim" which differs from "window.b4Sim"
        old_marker = "let b4Sim ="
        old_idx = html.find(old_marker)
        if old_idx == -1:
            print("No old b4Sim found either. Skipping duplicate removal.")
        else:
            # Find the <script> tag before it
            script_start = html.rfind("<script>", 0, old_idx)
            script_end = html.find("</script>", old_idx)
            if script_start != -1 and script_end != -1:
                # Remove from <script> to </script> inclusive
                html = html[:script_start] + html[script_end + len("</script>"):]
                print(f"Removed old b4Sim block (was at char {script_start})")
    else:
        # Found duplicate - remove the whole <script>...</script> block containing it
        script_start = html.rfind("<script>", 0, second_idx)
        script_end = html.find("</script>", second_idx)
        if script_start != -1 and script_end != -1:
            html = html[:script_start] + html[script_end + len("</script>"):]
            print(f"Removed duplicate Bundle 4 JS block!")

    # STEP 2: Add event delegation to the enhanced JS
    # This ensures buttons work even when they're created dynamically via innerHTML
    # We insert this BEFORE the closing </script> of our enhanced JS block in the <head>
    
    delegation_code = """
// === Event Delegation for dynamically-created buttons ===
// This handles clicks on any button with our known IDs, regardless of when they appear in DOM
document.addEventListener('click', function(e) {
    var t = e.target;
    // Init Sandbox / Debug button
    if (t.id === 'l40-btn-init' || (t.textContent && t.textContent.indexOf('Init Sandbox') !== -1) || (t.textContent && t.textContent.indexOf('Debug') !== -1 && t.className && t.className.indexOf('btn-debug') !== -1)) {
        if (window.initSim) window.initSim('l40');
    }
    // Trigger Earthquake
    if (t.id === 'l40-btn-quake' || (t.textContent && t.textContent.indexOf('Trigger Earthquake') !== -1)) {
        if (window.triggerEarthquake) window.triggerEarthquake();
    }
    // Play/Pause
    if (t.id === 'l40-btn-playpause' || (t.textContent && (t.textContent.indexOf('Pause') !== -1 || t.textContent.indexOf('Play') !== -1) && t.className && t.className.indexOf('btn-pause') !== -1)) {
        var sim = window.b4Sim;
        if (sim) {
            sim.isPlaying = !sim.isPlaying;
            t.textContent = sim.isPlaying ? '⏸️ Pause' : '▶️ Play';
        }
    }
    // Reset
    if (t.id === 'l40-btn-reset' || (t.textContent && t.textContent.indexOf('Reset') !== -1 && t.className && t.className.indexOf('btn-reset') !== -1)) {
        var sim = window.b4Sim;
        if (sim) {
            sim.frame = 0;
            sim.uniforms.targetAmp = 2.0;
            sim.uniforms.targetFreq = 1.0;
            sim.uniforms.amp = 2.0;
            sim.uniforms.freq = 1.0;
            sim.uniforms.earthquakePulse = 0.0;
            sim.isPlaying = true;
            if (sim.points) sim.points.material.color.setHex(0x00d4aa);
            var ampSlider = document.getElementById('l40-amp');
            var freqSlider = document.getElementById('l40-freq');
            if (ampSlider) { ampSlider.value = 2; }
            if (freqSlider) { freqSlider.value = 1; }
            var ampLabel = document.getElementById('l40-amp-val');
            var freqLabel = document.getElementById('l40-freq-val');
            if (ampLabel) ampLabel.textContent = '2.0';
            if (freqLabel) freqLabel.textContent = '1.0';
        }
    }
});

// Slider delegation via input event
document.addEventListener('input', function(e) {
    var sim = window.b4Sim;
    if (!sim) return;
    if (e.target.id === 'l40-amp') {
        sim.uniforms.targetAmp = parseFloat(e.target.value);
        var label = document.getElementById('l40-amp-val');
        if (label) label.textContent = e.target.value;
    }
    if (e.target.id === 'l40-freq') {
        sim.uniforms.targetFreq = parseFloat(e.target.value);
        var label = document.getElementById('l40-freq-val');
        if (label) label.textContent = e.target.value;
    }
});
"""

    # Insert the delegation code before the closing </script> of our head block
    head_script_end_marker = "window.resetLightScene = function()"
    idx = html.find(head_script_end_marker)
    if idx != -1:
        # Find the next </script> after this
        next_script_end = html.find("</script>", idx)
        if next_script_end != -1:
            html = html[:next_script_end] + delegation_code + "\n" + html[next_script_end:]
            print("Added event delegation code!")
    else:
        print("WARNING: Could not find insertion point for delegation code")

    # Safety
    final_lines = len(html.splitlines())
    print(f"Final: {final_lines} lines")
    if final_lines < 5000:
        print(f"SAFETY ABORT!")
        return
    
    with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("Saved!")

if __name__ == "__main__":
    fix()
