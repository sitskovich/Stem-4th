import codecs

def fix():
    with codecs.open("interactive-teacher-portal.html", "r", "utf-8") as f:
        html = f.read()

    # ===== FIX 1: L46 event handler - use closest() to find button ID =====
    old_l46_handler = """window.L46 = {
    stop: function(e) {
        if (!e) return;
        e.stopPropagation();
    },
    click: function(e) {
        if (!e) return;
        e.stopPropagation();
        var id = e.target.id;
        if (id === 'l46-btn-sos') { window.flashMorseWord('SOS'); }
        else if (id === 'l46-btn-help') { window.flashMorseWord('HELP'); }
        else if (id === 'l46-btn-ok') { window.flashMorseWord('OK'); }
        else if (id === 'l46-btn-codebook') {
            var cb = document.getElementById('l46-codebook');
            if (cb) cb.style.display = cb.style.display === 'none' ? 'block' : 'none';
        }
    }
};"""

    new_l46_handler = """window.L46 = {
    stop: function(e) {
        if (!e) return;
        e.stopPropagation();
    },
    click: function(e) {
        if (!e) return;
        e.stopPropagation();
        var btn = e.target.closest ? e.target.closest('button') : e.target;
        var id = btn ? btn.id : '';
        if (id === 'l46-btn-sos') { window.flashMorseWord('SOS'); }
        else if (id === 'l46-btn-help') { window.flashMorseWord('HELP'); }
        else if (id === 'l46-btn-ok') { window.flashMorseWord('OK'); }
        else if (id === 'l46-btn-codebook') {
            var cb = document.getElementById('l46-codebook');
            if (cb) cb.style.display = cb.style.display === 'none' ? 'block' : 'none';
        }
    }
};"""

    html = html.replace(old_l46_handler, new_l46_handler)

    # ===== FIX 2: L44 SVG - The template literal SVG gets into innerHTML fine, 
    # but the issue is it's inside the modal's content area which uses innerHTML.
    # The SVG likely needs xmlns. Let me add it. =====
    html = html.replace(
        '<svg viewBox="0 0 500 400" style="width:100%; height:400px; border-radius:10px; display:block;">',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 400" style="width:100%; height:400px; border-radius:10px; display:block;">'
    )

    with codecs.open("interactive-teacher-portal.html", "w", "utf-8") as f:
        f.write(html)
    print("Fixed L46 event handler (closest()) and L44 SVG (xmlns)!")

if __name__ == "__main__":
    fix()
