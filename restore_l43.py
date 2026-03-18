import subprocess
import re
import os

def restore_lessons():
    # 1. Get the original file from git HEAD
    try:
        result = subprocess.run(['git', 'show', 'HEAD:interactive-teacher-portal.html'], 
                                capture_output=True, text=True, check=True, encoding='utf-8')
        original_content = result.stdout
    except Exception as e:
        print(f"Error getting file from Git: {e}")
        return

    # 2. Extract the exact block spanning 'lesson43': { ... up to 'lesson46': {
    # We want everything between 'lesson43': { and 'lesson46': {
    match = re.search(r"(\s*'lesson43':\s*\{[\s\S]*?)(\s*'lesson46':\s*\{)", original_content, re.MULTILINE)
    
    if not match:
        print("Could not find lesson43-45 block in original file.")
        return
        
    extracted_block = match.group(1)
    
    # 3. Read the CURRENT file
    with open('interactive-teacher-portal.html', 'r', encoding='utf-8') as f:
        current_content = f.read()
        
    # 4. We know the current file has:
    #                 },
    #                 'lesson43': {
    #                 'lesson46': {
    
    # Wait, let's look at exactly what my previous script injected:
    # it did: content = pattern.sub(l42_rigor_data + "\n                'lesson43': {", content)
    # So the current file literally says:
    #                 'lesson43': {
    #                 'lesson46': {
    
    # That is clearly invalid syntax or missing the rest of the block.
    # We can just replace:
    #                 'lesson43': {
    #                 'lesson46': { 
    # OR 
    #                 'lesson43': {\s*'lesson46': {
    
    pattern_to_replace = re.compile(r"\s*'lesson43':\s*\{\s*'lesson46':\s*\{", re.MULTILINE)
    
    if pattern_to_replace.search(current_content):
        print("Found the exact broken boundary. Applying fix.")
        new_content = pattern_to_replace.sub(extracted_block + match.group(2), current_content)
        
        with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Successfully restored Lessons 43, 44, and 45!")
    else:
        # What if formatting is slightly different? Let's do a broader replacement
        print("Did not find exact broken boundary. Attempting broader replacement...")
        # Replace 'lesson43': { \n 'lesson46': { 
        # Actually let's just find 'lesson43': { and replace it AND everything up to 'lesson46': { with our block.
        broad_pattern = re.compile(r"\s*'lesson43':\s*\{[\s\S]*?(?=\s*'lesson46':\s*\{)", re.MULTILINE)
        if broad_pattern.search(current_content):
            new_content = broad_pattern.sub(extracted_block, current_content)
            with open('interactive-teacher-portal.html', 'w', encoding='utf-8') as f:
                f.write(new_content)
            print("Successfully restored via broad pattern.")
        else:
            print("ERROR: Could not find where to inject the restored code in the current file.")

if __name__ == "__main__":
    restore_lessons()
