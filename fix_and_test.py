import os
import io
from gen_39_42 import get_lessons_js as g1
from gen_43_46 import get_lessons_js as g2
from gen_47_50 import get_lessons_js as g3
from gen_51_54 import get_lessons_js as g4

def inject():
    # 1. Get raw string blocks and revert backticks from my first broken pass
    c1 = g1().replace('`', "'")
    c2 = g2().replace('`', "'")
    c3 = g3().replace('`', "'")
    c4 = g4().replace('`', "'")
    
    # 2. Join strings with proper newlines (not escaped!)
    combined_js = c1.strip() + ",\n" + c2.strip() + ",\n" + c3.strip() + ",\n" + c4.strip()

    # 3. Replace structurally perfect substrings!
    combined_js = combined_js.replace("content: '<", "content: `<")
    combined_js = combined_js.replace(">'", ">`")
    
    combined_js = combined_js.replace("title: '", "title: `")
    combined_js = combined_js.replace("subtitle: '", "subtitle: `")

    combined_js = combined_js.replace("{ term: '", "{ term: `")
    combined_js = combined_js.replace("', definition: '", "`, definition: `")
    combined_js = combined_js.replace("' }", "` }")

    # Titles typically end with "',\n". Replace correctly.
    combined_js = combined_js.replace("',\n", "`,\n")

    # Test the JS string locally first!
    test_js = "const testObj = {\n" + combined_js + "\n};\n"
    with open('test_syntax.js', 'w', encoding='utf-8') as f:
        f.write(test_js)

    print("Wrote test_syntax.js successfully.")

    # Apply to HTML
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        html = f.read()

    start_idx = html.find("'lesson39': {")
    end_idx = html.find("};", html.find("'lesson54': {"))
    
    new_html = html[:start_idx] + combined_js + "\n            " + html[end_idx:]

    with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
        f.write(new_html)

if __name__ == "__main__":
    inject()
