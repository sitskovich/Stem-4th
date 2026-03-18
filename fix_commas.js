const fs = require('fs');
let h = fs.readFileSync('interactive-teacher-portal.html', 'utf-8');
let fixes = 0;

// Find all instances where a } is followed by whitespace and then { with a title:
// but WITHOUT a comma between them. This is the pattern left by the swap function.
// We search for: }  (optional \r) \n (whitespace) { (optional \r) \n (whitespace) title:
// And replace with: }, \n (whitespace) { \n (whitespace) title:

const pattern = /\}(\s*\r?\n\s*)\{(\s*\r?\n\s*title:)/g;
let result = h.replace(pattern, function(match, gap1, gap2) {
    // Check if there's already a comma
    if (match.startsWith('},')) return match;
    fixes++;
    return '},' + gap1 + '{' + gap2;
});

// Also fix any double commas },,
result = result.replace(/\},\s*,/g, function() {
    fixes++;
    return '},';
});

fs.writeFileSync('interactive-teacher-portal.html', result);
console.log('Fixed ' + fixes + ' syntax issues');

// Verify: count slide objects in each lab
['lesson41', 'lesson45', 'lesson49'].forEach(lab => {
    const next = 'lesson' + (parseInt(lab.replace('lesson','')) + 1);
    const s = result.indexOf("'" + lab + "':");
    const e = result.indexOf("'" + next + "':");
    if (s === -1 || e === -1) { console.log(lab + ': NOT FOUND'); return; }
    const block = result.substring(s, e);
    const titleCount = (block.match(/title:\s*`/g) || []).length;
    const hasSchedule = block.includes('SCHEDULE');
    console.log(lab + ': ' + titleCount + ' titles, schedule=' + hasSchedule);
});
