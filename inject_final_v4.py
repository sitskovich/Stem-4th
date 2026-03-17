import re
from gen_39_42 import get_lessons_js as g1
from gen_43_46 import get_lessons_js as g2
from gen_47_50 import get_lessons_js as g3
from gen_51_54 import get_lessons_js as g4

def inject():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()

    combined_js = g1().strip() + ",\\n" + g2().strip() + ",\\n" + g3().strip() + ",\\n" + g4().strip()
    
    start_idx = html.find("'lesson39': {")
    if start_idx == -1:
        print("Could not find lesson39 start")
        return
        
    l54_idx = html.find("'lesson54': {")
    end_idx = html.find("};", l54_idx)
    if end_idx == -1:
        print("Could not find end of lessonData")
        return
        
    print(f"Replacing from {start_idx} to {end_idx}")
    
    new_html = html[:start_idx] + combined_js + "\\n            " + html[end_idx:]
    
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
    
    p39 = r"<div class=\"lesson-card\"\s*onclick=\"openLesson\(\'lesson39\'\)\">.*?</div>\s*</div>"
    card_39 = '''<div class="lesson-card" onclick="openLesson('lesson39')">
                <div class="lesson-title">Lesson 39: What is a Wave?</div>
                <div class="lesson-description">Identify waves and model how wave properties affect energy.</div>
            </div>'''
    new_html = re.sub(p39, card_39, new_html, flags=re.DOTALL)
    
    with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
        
    print("Injection and HTML update complete.")

if __name__ == "__main__":
    inject()
