import os

files = ['gen_39_42.py', 'gen_43_46.py', 'gen_47_50.py', 'gen_51_54.py']

for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    new_lines = []
    for line in lines:
        stripped = line.lstrip()
        if stripped.startswith("title: '") or stripped.startswith("content: '") or \
           stripped.startswith("term: '") or stripped.startswith("definition: '") or \
           stripped.startswith("subtitle: '"):
            
            # Find first quote
            first_q = line.find("'")
            # Find last quote
            last_q = line.rfind("'")
            
            if first_q != -1 and last_q != -1 and first_q != last_q:
                # Replace these two specific characters with backticks
                line = line[:first_q] + "`" + line[first_q+1:last_q] + "`" + line[last_q+1:]
                
        new_lines.append(line)
        
    with open(fname, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
        
print("Updated all generator files to use backticks!")
