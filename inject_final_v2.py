import re
from gen_39_42 import get_lessons_js as g1
from gen_43_46 import get_lessons_js as g2
from gen_47_50 import get_lessons_js as g3
from gen_51_54 import get_lessons_js as g4

def inject():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Get combined JS
    combined_js = g1().strip() + ",\\n" + g2().strip() + ",\\n" + g3().strip() + ",\\n" + g4().strip()
    
    # Let's find where 'lesson39': { starts in lessonsData
    start_match = re.search(r"\'lesson39\':\s*\{", html)
    if not start_match:
        print("Could not find lesson39 start")
        return
        
    start_idx = start_match.start()
    
    # Let's find the end of lessonsData by finding 'const lessonsData' 
    # and tracking braces.
    ld_start = html.find('const lessonsData')
    brace_count = 0
    in_object = False
    end_idx = -1
    
    for i in range(ld_start, len(html)):
        if html[i] == '{':
            brace_count += 1
            in_object = True
        elif html[i] == '}':
            brace_count -= 1
            if in_object and brace_count == 0:
                end_idx = i
                break
                
    if end_idx == -1:
        print("Could not find end of lessonsData")
        return
        
    print(f"Found block to replace: {start_idx} to {end_idx}")
    
    # Wait, the closing brace is at end_idx. The previous character should be a newline or space or `}`.
    # What if we just do:
    # replace from start_idx to end_idx-1 (or look backwards for comma)
    # Actually, we can just replace everything from start_idx to just before `end_idx` with our combined_js
    
    # Wait, the previous element might have a comma. 
    # new_html = html[:start_idx] + combined_js + html[end_idx-some_spaces:]
    
    # Just construct it:
    new_html = html[:start_idx] + combined_js + "\\n            " + html[end_idx:]
    
    # Now HTML Grid.
    card_52 = '''<div class="lesson-card" onclick="openLesson('lesson52')">
                <div class="lesson-title">Lesson 52: Bundle 4 Review — The Wave Games</div>
                <div class="lesson-description">Station rotations and mini-challenges to review Bundle 4 concepts.</div>
            </div>'''
            
    card_53 = '''<div class="lesson-card" onclick="openLesson('lesson53')">
                <div class="lesson-title">Lesson 53: Bundle 4 Assessment</div>
                <div class="lesson-description">Summative assessment covering waves, light, and information transfer.</div>
            </div>'''
            
    card_54 = '''<div class="lesson-card" onclick="openLesson('lesson54')">
                <div class="lesson-title">Lesson 54: 🥽 VR Free Day — Wave Tech Explorer</div>
                <div class="lesson-description">Student-directed exploration using VR headset immersion.</div>
            </div>'''
            
    p52 = r"<div class=\"lesson-card\"\s*onclick=\"openLesson\(\'lesson52\'\)\">.*?</div>\s*</div>"
    p53 = r"<div class=\"lesson-card\"\s*onclick=\"openLesson\(\'lesson53\'\)\">.*?</div>\s*</div>"
    p54 = r"<div class=\"lesson-card\"\s*onclick=\"openLesson\(\'lesson54\'\)\">.*?</div>\s*</div>"
    
    new_html = re.sub(p52, card_52, new_html, flags=re.DOTALL)
    new_html = re.sub(p53, card_53, new_html, flags=re.DOTALL)
    new_html = re.sub(p54, card_54, new_html, flags=re.DOTALL)
    
    with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
        
    print("Done")

if __name__ == "__main__":
    inject()
