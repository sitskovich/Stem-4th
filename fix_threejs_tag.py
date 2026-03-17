def fix():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()
        
    start_marker = '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js">\n// Custom Bundle 4 STEM Simulators\n'
    if start_marker in html:
        # Extract the entire injected block until the end
        idx_start = html.find(start_marker)
        
        # We need to find the specific closing tag 'window.resetLightScene = function() { b4Sim.isPlaying = false; b4Sim.frame = 0; };\n</script>'
        end_str = 'window.resetLightScene = function() { b4Sim.isPlaying = false; b4Sim.frame = 0; };\n</script>'
        idx_end = html.find(end_str)
        if idx_end != -1:
            idx_end += len(end_str)
            bad_block = html[idx_start:idx_end]
            
            # Remove bad_block from top
            html = html.replace(bad_block, '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n')
            
            # Get the JS pure code
            # Re-read bundle4_sims.js instead to be safe since we already wrote it cleanly
            with open('bundle4_sims.js', 'r', encoding='utf-8') as jsf:
                pure_js = jsf.read()
                
            # Inject right before </body>
            html = html.replace('</body>', '<script>\n' + pure_js + '\n</script>\n</body>')
            
            with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
                f.write(html)
            print("Successfully restored ThreeJS script tag and repositioned custom Bundle 4 logic.")
        else:
            print("End string not found in bad block")
    else:
        print("Start marker not found, trying fallback...")
        # Maybe the start_marker is slightly different
        start2 = '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js">'
        idx_start2 = html.find(start2)
        end2 = '</script>'
        idx_end2 = html.find(end2, idx_start2)
        tag_content = html[idx_start2:idx_end2+len(end2)]
        if 'Custom Bundle 4 STEM' in tag_content:
            html = html.replace(tag_content, '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n')
            
            with open('bundle4_sims.js', 'r', encoding='utf-8') as jsf:
                pure_js = jsf.read()
                
            html = html.replace('</body>', '<script>\n' + pure_js + '\n</script>\n</body>')
            with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
                f.write(html)
            print("Fallback succeeded. Restored ThreeJS.")
        else:
            print("Could not find the corrupted tag!")

if __name__ == "__main__":
    fix()
