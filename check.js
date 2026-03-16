const fs = require('fs');
try {
  const code = fs.readFileSync('c:/Users/TestRun/OneDrive/Desktop/STEM 4th/interactive-teacher-portal.html', 'utf8');
  // Just parsing the whole file using a simple AST approach or eval
  // actually, let's just run it through acorn if we can, or just eval the whole script block
  // The easiest way is to extract exactly the `<script>` contents and check them
  const scriptMatch = code.match(/<script>([\s\S]*?)<\/script>/g);
  let hasError = false;
  
  if (scriptMatch) {
      scriptMatch.forEach((scriptTag, idx) => {
          const scriptContent = scriptTag.replace(/<\/?script>/g, '');
          try {
              new Function(scriptContent);
          } catch(e) {
              console.error(`Error in script block ${idx + 1}:`, e.message);
              // let's try to find line number
          }
      });
  }
} catch(e) {
  console.log(e);
}
