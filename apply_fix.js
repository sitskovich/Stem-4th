const fs = require('fs');
let html = fs.readFileSync('interactive-teacher-portal.html', 'utf8');

let newHtml = html.replace(/touchStartX = event\.changedTouches\[0\]\.screenX;\s*}/, 
    "touchStartX = event.changedTouches[0].screenX;\n                isSwipingActive = true;\n            }");

newHtml = newHtml.replace(/if \(document\.getElementById\('lessonModal'\)\.classList\.contains\('active'\)\) {\s*touchEndX = event\.changedTouches\[0\]\.screenX;/, 
    "if (document.getElementById('lessonModal').classList.contains('active') && isSwipingActive) {\n                touchEndX = event.changedTouches[0].screenX;");

newHtml = newHtml.replace(/handleSwipe\(\);\s*}/, 
    "handleSwipe();\n            }\n            isSwipingActive = false;");

fs.writeFileSync('interactive-teacher-portal.html', newHtml);
console.log('Swipe fix applied successfully!');
