import codecs

def fix():
    with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
        html = f.read()

    # ===== FIX L44 SVG: Replace multi-line SVG with a SINGLE-LINE svg =====
    # Find the entire refraction diagrams slide content and replace
    old_svg_start = """title: `📈 Analysis: Refraction Diagrams`,
                            content: `<div style="margin-bottom:15px; font-weight:bold;">Visualizing the Bend:</div>"""
    
    if old_svg_start in html:
        # Find the full content block and replace completely
        import re
        # Match from the title through the closing backtick of content
        pattern = r"(title: `📈 Analysis: Refraction Diagrams`,\s*content: `).*?(`\s*\})"
        
        new_svg_content = '<div style="margin-bottom:15px; font-weight:bold;">Visualizing the Bend:</div>' \
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" style="width:100%;height:400px;border-radius:10px;display:block;">' \
            '<rect x="0" y="0" width="500" height="200" fill="#1a1a2e"/>' \
            '<rect x="0" y="200" width="500" height="200" fill="#0f3460"/>' \
            '<line x1="0" y1="200" x2="500" y2="200" stroke="#00d4aa" stroke-width="3" stroke-dasharray="10,5"/>' \
            '<line x1="250" y1="30" x2="250" y2="370" stroke="#aaa" stroke-dasharray="8,8" stroke-width="2"/>' \
            '<text x="255" y="50" fill="#aaa" font-size="14" font-family="sans-serif">Normal</text>' \
            '<line x1="80" y1="30" x2="250" y2="200" stroke="#ff4444" stroke-width="5"/>' \
            '<text x="90" y="80" fill="#ff4444" font-size="16" font-weight="bold" font-family="sans-serif">Incident Ray</text>' \
            '<line x1="250" y1="200" x2="350" y2="370" stroke="#ff4444" stroke-width="5"/>' \
            '<text x="310" y="330" fill="#ff8888" font-size="16" font-weight="bold" font-family="sans-serif">Refracted Ray</text>' \
            '<text x="15" y="35" fill="#ffffff" font-size="22" font-weight="bold" font-family="sans-serif">AIR (Fast)</text>' \
            '<text x="15" y="235" fill="#4fc3f7" font-size="22" font-weight="bold" font-family="sans-serif">WATER (Slow)</text>' \
            '<text x="250" y="390" fill="#00d4aa" font-size="13" text-anchor="middle" font-family="sans-serif">Light bends TOWARD the normal in denser media</text>' \
            '</svg>' \
            '<div style="font-size:0.9em;margin-top:10px;color:#aaa;">When going from thin air to dense water, light slows down and bends <u>TOWARD</u> the normal line.</div>'
        
        replacement = r'\g<1>' + new_svg_content + r'\2'
        html = re.sub(pattern, replacement, html, count=1, flags=re.DOTALL)
        print("Fixed L44 SVG to single-line!")
    else:
        print("WARNING: SVG start marker not found!")

    # ===== FIX L46: Use inline onclick instead of delegated event =====
    # Replace the L46 interactive slide with inline onclick handlers
    old_l46_interactive = """<div class="energy-controls" onmousedown="window.L46.stop(event)" ontouchstart="window.L46.stop(event)" onclick="window.L46.click(event)"><button class="btn-debug" id="l46-btn-sos">🆘 Flash SOS</button><button class="btn-drop" id="l46-btn-help" style="background:#e91e63;">🚨 Flash HELP</button><button class="btn-slow" id="l46-btn-ok" style="background:#4caf50;">✅ Flash OK</button><button class="btn-drop" id="l46-btn-codebook" style="background:#2196f3;">📖 Codebook</button></div>"""
    
    new_l46_interactive = """<div class="energy-controls" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()" onclick="event.stopPropagation()"><button class="btn-debug" onclick="event.stopPropagation();if(window.flashMorseWord)window.flashMorseWord('SOS');">🆘 Flash SOS</button><button class="btn-drop" style="background:#e91e63;" onclick="event.stopPropagation();if(window.flashMorseWord)window.flashMorseWord('HELP');">🚨 Flash HELP</button><button class="btn-slow" style="background:#4caf50;" onclick="event.stopPropagation();if(window.flashMorseWord)window.flashMorseWord('OK');">✅ Flash OK</button><button class="btn-drop" style="background:#2196f3;" onclick="event.stopPropagation();var cb=document.getElementById('l46-codebook');if(cb)cb.style.display=cb.style.display==='none'?'block':'none';">📖 Codebook</button></div>"""
    
    if old_l46_interactive in html:
        html = html.replace(old_l46_interactive, new_l46_interactive)
        print("Fixed L46 interactive with inline onclick!")
    else:
        print("WARNING: L46 interactive marker not found!")

    with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
        f.write(html)
    print("All fixes applied!")

if __name__ == "__main__":
    fix()
