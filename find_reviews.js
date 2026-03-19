const fs = require('fs');
const html = fs.readFileSync('interactive-teacher-portal.html', 'utf-8');

// Extract lesson37 full block
const s37 = html.indexOf("'lesson37': {");
const e37 = html.indexOf("'lesson38': {");
const block37 = html.substring(s37, e37);

// Write to temp file for easy viewing
fs.writeFileSync('/tmp/lesson37_review.txt', block37);
console.log('Wrote lesson37 block to /tmp/lesson37_review.txt (' + block37.length + ' chars)');

// Extract lesson52 full block  
const s52 = html.indexOf("'lesson52': {");
const e52 = html.indexOf("'lesson53': {");
const block52 = html.substring(s52, e52);
fs.writeFileSync('/tmp/lesson52_review.txt', block52);
console.log('Wrote lesson52 block to /tmp/lesson52_review.txt (' + block52.length + ' chars)');
