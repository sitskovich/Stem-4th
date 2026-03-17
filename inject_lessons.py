import re

def insert_lessons(new_lessons_js):
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # Find the end of lessonsData
    # the last lesson originally is lesson38
    match = re.search(r'(\'lesson38\':\s*\{.*?\n\s{16}\}\n\s{12}\})', html, re.DOTALL)
    if not match:
        print("Could not find lesson38 block!")
        return

    end_idx = match.end()
    
    # Check if the text after is already injected
    if 'lesson39' not in html[end_idx:end_idx+500]:
        new_html = html[:end_idx] + ",\n" + new_lessons_js + html[end_idx:]
        with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
            f.write(new_html)
        print("Successfully injected lessons.")
    else:
        # If lesson39 already exists, we might need a more robust insert.
        # But we will inject all lessons in one go or incrementally.
        print("Injection point may already have data.")

if __name__ == "__main__":
    pass
