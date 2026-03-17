import re

def fix_cards():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()
        
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
            
    p52 = r"<div class=\"lesson-card\"\s*onclick=\"openLesson\('lesson52'\)\">.*?</div>\s*</div>"
    p53 = r"<div class=\"lesson-card\"\s*onclick=\"openLesson\('lesson53'\)\">.*?</div>\s*</div>"
    p54 = r"<div class=\"lesson-card\"\s*onclick=\"openLesson\('lesson54'\)\">.*?</div>\s*</div>"
    
    html = re.sub(p52, card_52, html, flags=re.DOTALL)
    html = re.sub(p53, card_53, html, flags=re.DOTALL)
    html = re.sub(p54, card_54, html, flags=re.DOTALL)
    
    with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Fixed cards.")

if __name__ == "__main__":
    fix_cards()
