import re

def search():
    try:
        with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
            lines = f.readlines()
            
        print(f"Total lines read: {len(lines)}")
        
        targets = ["Lesson 39", "lesson39", "'l39'", "Lesson 40", "lesson40", "Lesson 41", "lesson41", "bundle4Data"]
        
        found = {t: [] for t in targets}
        
        for i, line in enumerate(lines):
            for t in targets:
                if t.lower() in line.lower():
                    found[t].append((i+1, line.strip()[:100]))
                    
        for t, matches in found.items():
            if matches:
                print(f"--- Matches for {t} ---")
                for m in matches[:5]:
                    print(f"Line {m[0]}: {m[1]}")
            else:
                print(f"No matches for {t}")
                
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    search()
