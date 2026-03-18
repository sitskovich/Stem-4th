import codecs

with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
    html = f.read()

# Make nodes brighter initially
html = html.replace('emissive: 0x550000', 'emissive: 0xff4444')
html = html.replace('emissiveIntensity: 0.5', 'emissiveIntensity: 1.0')

# Also, ensure toggleL48Bit works by adding console logs
old_toggle = """window.toggleL48Bit = function(index) {"""
new_toggle = """window.toggleL48Bit = function(index) {
    console.log("toggleL48Bit called for index: " + index);
"""
if old_toggle in html and new_toggle not in html:
    html = html.replace(old_toggle, new_toggle)

old_click = """} else if (id.startsWith('l48-b')) {"""
new_click = """} else if (id.startsWith('l48-b') && id !== 'l48-btn-init') {
            console.log("Bit clicked: " + id);"""
if old_click in html and new_click not in html:
    html = html.replace(old_click, new_click)

with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
    f.write(html)
