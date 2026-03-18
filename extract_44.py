import subprocess
import re
import codecs

def extract():
    result = subprocess.run(['git', 'show', 'HEAD:interactive-teacher-portal.html'], capture_output=True, text=True, encoding='utf-8')
    original_html = result.stdout
    
    # Let's extract everything from l43 to l46 inside lessons = { ... }
    # Or find "l44": { ... }
    
    m44 = re.search(r"(?s)(\s*['\"]?l44['\"]?\s*:\s*\{.*?\})(?=\s*,\s*['\"]?l45['\"]?\s*:|\s*,\s*['\"]?l46['\"]?\s*:)", original_html)
    m45 = re.search(r"(?s)(\s*['\"]?l45['\"]?\s*:\s*\{.*?\})(?=\s*,\s*['\"]?l46['\"]?\s*:)", original_html)
    
    with codecs.open("recovered_44_45.js", "w", "utf-8") as f:
        if m44:
            f.write(m44.group(1) + ",\n")
            print("Found 44!")
        else:
            print("Could not find l44!")
            
        if m45:
            f.write(m45.group(1) + ",\n")
            print("Found 45!")
        else:
            print("Could not find l45!")

if __name__ == "__main__":
    extract()
