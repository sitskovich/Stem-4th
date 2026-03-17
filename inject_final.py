import re

# We can import our previously generated text functions:
from gen_39_42 import get_lessons_js as g1
from gen_43_46 import get_lessons_js as g2
from gen_47_50 import get_lessons_js as g3
from gen_51_54 import get_lessons_js as g4

def inject():
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Step 1: Replace the JS objects inside lessonsData
    # We want to match from 'lesson39': { up to the end of lessonsData: };
    
    # Let's cleanly stitch our new JS together:
    part1 = g1().strip()
    part2 = g2().strip()
    part3 = g3().strip()
    part4 = g4().strip()
    
    # Make sure we combine them properly with commas between the blocks:
    # Each gen file string is mostly a set of keys like: 'lesson39': {...}, \n 'lesson40': {...}
    # At the end of each block, the last item DOES NOT HAVE A COMMA.
    # So we join them with ",\n"
    combined_js = part1 + ",\n" + part2 + ",\n" + part3 + ",\n" + part4
    
    # We will search for where lesson38 ends, or where lesson39 begins
    # It looks like:
    #                 'lesson38': {
    #                     ...
    #                 },
    #                 'lesson39': {
    
    # Find the block to replace. We replace from the FIRST instance of 'lesson39': { 
    # to the function openLesson declaration.
    
    pattern_js = r"(\'lesson39\':\s*\{.*?\}\s*\n\s*\};\s*\n\s*function\s+openLesson)"
    
    # Our replacement string:
    replacement_js = combined_js + "\n            };\n\n            function openLesson"
    
    # Let's perform the substitution:
    new_html = re.sub(pattern_js, replacement_js, html, flags=re.DOTALL)
    
    if new_html == html:
        print("Error: JS replacement failed.")
        
        # Let's try an alternative pattern where it looks just for the end marker
        pattern_js_alt = r"(\'lesson39\':\s*\{.*?)\n\s*\};\s*\n\s*function\s+openLesson"
        new_html = re.sub(pattern_js_alt, combined_js + "\n            };\n\n            function openLesson", html, flags=re.DOTALL)
        if new_html == html:
            print("Error: Alternative JS replacement also failed.")
            return

    # Step 2: Swap the HTML grid items
    # Lesson 52 was VR Free Day. We want Lesson 52 to be Bundle 4 Review
    # Lesson 53 was Bundle 4 Review. We want Lesson 53 to be Bundle 4 Assessment
    # Lesson 54 was Bundle 4 Assessment. We want Lesson 54 to be VR Free Day
    
    # Let's redefine the 3 HTML cards completely.
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
            
    # We will search and replace the entire <div> blocks for these cards.
    # We can match anything between <div class="lesson-card" onclick="openLesson('lesson52')"> 
    # and the next <div class="lesson-card"
    
    p52 = r"<div class=\"lesson-card\" onclick=\"openLesson\(\'lesson52\'\)\">.*?</div>\s*</div>"
    p53 = r"<div class=\"lesson-card\" onclick=\"openLesson\(\'lesson53\'\)\">.*?</div>\s*</div>"
    p54 = r"<div class=\"lesson-card\" onclick=\"openLesson\(\'lesson54\'\)\">.*?</div>\s*</div>"
    
    new_html = re.sub(p52, card_52, new_html, flags=re.DOTALL)
    new_html = re.sub(p53, card_53, new_html, flags=re.DOTALL)
    new_html = re.sub(p54, card_54, new_html, flags=re.DOTALL)
    
    # Also fix lesson 39 HTML just in case it's wrong:
    # (Checking if maybe lesson 39 was incorrect in the grid)
    p39 = r"<div class=\"lesson-card\" onclick=\"openLesson\(\'lesson39\'\)\">.*?</div>\s*</div>"
    card_39 = '''<div class="lesson-card" onclick="openLesson('lesson39')">
                <div class="lesson-title">Lesson 39: What is a Wave?</div>
                <div class="lesson-description">Identify waves and model how wave properties affect energy.</div>
            </div>'''
    new_html = re.sub(p39, card_39, new_html, flags=re.DOTALL)
    
    with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
        
    print("Successfully replaced formatting and JS in interactive-teacher-portal.html!")

if __name__ == "__main__":
    inject()
