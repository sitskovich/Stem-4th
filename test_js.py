import re
import subprocess
from gen_39_42 import get_lessons_js as g1
from gen_43_46 import get_lessons_js as g2
from gen_47_50 import get_lessons_js as g3
from gen_51_54 import get_lessons_js as g4

def check_syntax():
    combined_js = g1().strip() + ",\\n" + g2().strip() + ",\\n" + g3().strip() + ",\\n" + g4().strip()
    
    # 1. Replace opening quotes
    combined_js = combined_js.replace("content: '", "content: `")
    combined_js = combined_js.replace("title: '", "title: `")
    combined_js = combined_js.replace("subtitle: '", "subtitle: `")
    combined_js = combined_js.replace("term: '", "term: `")
    combined_js = combined_js.replace("definition: '", "definition: `")

    # 2. Replace closing quotes (either right before a comma-newline or just a newline)
    combined_js = re.sub(r"'(,?[\r\n]+)", r"`\1", combined_js)

    test_js = "const testObj = {\\n" + combined_js + "\\n};"
    
    with open('test_syntax.js', 'w', encoding='utf-8') as f:
        f.write(test_js)
        
    try:
        subprocess.run(['node', '-c', 'test_syntax.js'], check=True, capture_output=True, text=True)
        print("Syntax check PASSED!")
    except subprocess.CalledProcessError as e:
        print("Syntax check FAILED!")
        print(e.stderr)

if __name__ == "__main__":
    check_syntax()
