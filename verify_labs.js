const h = require('fs').readFileSync('interactive-teacher-portal.html','utf-8');
const labs = [
  { key: 'lesson41', next: 'lesson42' },
  { key: 'lesson45', next: 'lesson46' },
  { key: 'lesson49', next: 'lesson50' }
];
labs.forEach(lab => {
  const s = h.indexOf("'" + lab.key + "':");
  const e = h.indexOf("'" + lab.next + "':");
  const chunk = h.substring(s, e);
  // Find slide titles
  const re = /title:\s*`([^`]+)`/g;
  const titles = [];
  let m;
  while ((m = re.exec(chunk)) !== null) titles.push(m[1]);
  console.log('\n' + lab.key.toUpperCase() + ' (' + titles.length + ' slides):');
  titles.forEach((t, i) => console.log('  ' + (i+1) + '. ' + t));
  console.log('  Schedule: ' + (chunk.includes('SCHEDULE') ? 'YES' : 'NO'));
  console.log('  Data Table: ' + (chunk.includes('Data Recording') || chunk.includes('Transmission Log') ? 'YES' : 'NO'));
});
