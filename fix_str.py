import os

def fix():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()
    
    with open('bundle4_sims.js', 'r', encoding='utf-8') as f:
        js = f.read()

    # The corrupted block starts with `<script src=".../three.min.js">` and ends with `</script>`
    # where the JS is shoved inside.
    old_target = '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js">\n' + js + '\n</script>'
    
    if old_target in html:
        print("Found target string precisely.")
        new_target = '<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>\n<script>\n' + js + '\n</script>'
        html = html.replace(old_target, new_target)
        
        with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
            f.write(html)
        print("Replacement successful.")
    else:
        print("Could not find exact string match.")

if __name__ == "__main__":
    fix()
