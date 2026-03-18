const fs = require('fs');
const filePath = 'interactive-teacher-portal.html';
let html = fs.readFileSync(filePath, 'utf-8');
let ok = 0, fail = 0;

function rep(search, replacement, label) {
  if (html.includes(search)) {
    html = html.replace(search, replacement);
    console.log('✅ ' + label);
    ok++;
  } else {
    console.log('❌ FAILED: ' + label);
    fail++;
  }
}

// ====================
// SCHEDULE HTML BLOCKS
// ====================
const sched41 = '<div style="background:rgba(102,126,234,0.3);padding:15px;border-radius:10px;"><strong>⏱️ TODAY\'S SCHEDULE:</strong><table style="width:100%;margin-top:8px;"><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">10 min</td><td style="padding:5px 10px;">Mission Overview &amp; Slinky Setup</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">30 min</td><td style="padding:5px 10px;">Amplitude Tests &amp; Wavelength Tests</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">5 min</td><td style="padding:5px 10px;">Cleanup &amp; Exit Ticket</td></tr></table></div>';

const sched45 = '<div style="background:rgba(102,126,234,0.3);padding:15px;border-radius:10px;"><strong>⏱️ TODAY\'S SCHEDULE:</strong><table style="width:100%;margin-top:8px;"><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">10 min</td><td style="padding:5px 10px;">Mission Overview &amp; Mirror Setup</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">30 min</td><td style="padding:5px 10px;">Double Bounce &amp; Periscope Challenge</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">5 min</td><td style="padding:5px 10px;">Cleanup &amp; Exit Ticket</td></tr></table></div>';

const sched49 = '<div style="background:rgba(102,126,234,0.3);padding:15px;border-radius:10px;"><strong>⏱️ TODAY\'S SCHEDULE:</strong><table style="width:100%;margin-top:8px;"><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">10 min</td><td style="padding:5px 10px;">Mission Brief &amp; Code Dictionary</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">30 min</td><td style="padding:5px 10px;">Code Engineering &amp; Transmission</td></tr><tr><td style="padding:5px 10px;background:rgba(255,255,255,0.1);border-radius:5px;">5 min</td><td style="padding:5px 10px;">Cleanup &amp; Exit Ticket</td></tr></table></div>';

// ====================
// 1. ADD SCHEDULES
// ====================
// Lab 41: unique end of overview content
rep(
  'Do not snap the slinky/coil at your partner.<br>• Keep waves parallel to the floor.</div></div>`',
  'Do not snap the slinky/coil at your partner.<br>• Keep waves parallel to the floor.</div></div>' + sched41 + '`',
  'Lab 41: Schedule added'
);

// Lab 45: unique end of overview
rep(
  "NEVER shine the flashlight in a partner\\'s eyes.<br>• Handle mirrors delicately by the edges.</div></div>`",
  "NEVER shine the flashlight in a partner\\'s eyes.<br>• Handle mirrors delicately by the edges.</div></div>" + sched45 + '`',
  'Lab 45: Schedule added'
);

// Lab 49: unique end of overview
rep(
  'You must use either Light (flashlight) OR Sound (tapping).<br>• You must invent your own code dictionary!</div></div>`',
  'You must use either Light (flashlight) OR Sound (tapping).<br>• You must invent your own code dictionary!</div></div>' + sched49 + '`',
  'Lab 49: Schedule added'
);

// ====================
// 2. REORDER SLIDES: Swap Discovery (slide 4) with Procedure Part 2 (slide 5)
// Strategy: For each lab, find the Discovery slide block and the next Procedure slide block,
// then swap them so procedures are grouped together before discovery.
// ====================

// Helper: Extract a slide block from its title to the next slide's opening brace
function swapSlides(titleA, titleB, label) {
  // Find positions of both titles
  const posA = html.indexOf(titleA);
  const posB = html.indexOf(titleB);
  if (posA === -1 || posB === -1) {
    console.log('❌ FAILED swap: ' + label + ' (titles not found)');
    fail++;
    return;
  }

  // Find the opening { before each title
  let startA = posA;
  while (startA > 0 && html[startA] !== '{') startA--;

  let startB = posB;
  while (startB > 0 && html[startB] !== '{') startB--;

  // Find the closing }, for each slide
  // We need to find the }, that ends each slide object
  // Slide A ends right before Slide B starts
  let endA = startB;
  // Walk back to find the last newline before startB
  while (endA > startA && html[endA - 1] !== '\n') endA--;

  // Slide B ends at the next },\n or },\r\n after its content
  // Find },  after posB
  let endB = posB;
  // Find the next title: or ] after slide B to determine its boundary  
  let nextTitleOrEnd = html.indexOf('title:', posB + 1);
  let slidesEnd = html.indexOf(']', posB);
  let boundary = Math.min(
    nextTitleOrEnd === -1 ? Infinity : nextTitleOrEnd,
    slidesEnd === -1 ? Infinity : slidesEnd
  );
  // Walk back from boundary to find the opening { of the next slide
  endB = boundary;
  while (endB > posB && html[endB] !== '{') endB--;
  // Now walk back further to the newline
  while (endB > posB && html[endB - 1] !== '\n') endB--;

  const blockA = html.substring(startA, endA);
  const blockB = html.substring(startB, endB);

  // Replace B first (later in string), then A
  html = html.substring(0, startA) + blockB + blockA + html.substring(endB);
  console.log('✅ ' + label);
  ok++;
}

// Lab 41: Swap Discovery and Wavelength Procedure
swapSlides(
  "title: `🔍 Discovery: Generating the Wave`",
  "title: `🏁 Procedure: The Wavelength Test`",
  'Lab 41: Procedures grouped (swapped Discovery & Wavelength)'
);

// Lab 45: Swap Discovery and Periscope Procedure
swapSlides(
  "title: `🔍 Discovery: Angle of Incidence`",
  "title: `🏁 Procedure: The Periscope Principle`",
  'Lab 45: Procedures grouped (swapped Discovery & Periscope)'
);

// Lab 49: Swap Discovery and Transmission Procedure
swapSlides(
  "title: `🔍 Discovery: The \"Space\" Between Words`",
  "title: `🏁 Procedure: The Transmission Text`",
  'Lab 49: Procedures grouped (swapped Discovery & Transmission)'
);

// ====================
// 3. INSERT DATA RECORDING SLIDES
// ====================

// Lab 41 Data Recording (after Wavelength Procedure, before Discovery)
// Find the closing of the Wavelength Procedure slide and insert after it
const dataSlide41 = `,
                        {
                            title: \`📊 Data Recording: Wave Observation Log\`,
                            content: \`<div style="margin-bottom:15px;">📋 Record your observations for each wave trial:</div><table style="width:100%; border-collapse: collapse; font-size:1.6rem; text-align:center;"><tr style="background:#444;"><th style="padding:10px; border:1px solid #666;">Trial</th><th style="padding:10px; border:1px solid #666;">What You Did</th><th style="padding:10px; border:1px solid #666;">Arm Energy Used (Low/Med/High)</th><th style="padding:10px; border:1px solid #666;">Wave Appearance</th></tr><tr><td style="padding:10px; border:1px solid #666;">1. Low Amplitude</td><td style="padding:10px; border:1px solid #666;">Small side-to-side shake</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:10px; border:1px solid #666;">2. High Amplitude</td><td style="padding:10px; border:1px solid #666;">Wide side-to-side shake</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr><tr><td style="padding:10px; border:1px solid #666;">3. Long Wavelength</td><td style="padding:10px; border:1px solid #666;">Slow shake</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:10px; border:1px solid #666;">4. Short Wavelength</td><td style="padding:10px; border:1px solid #666;">Fast shake</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr></table><div style="margin-top:15px;padding:10px;background:rgba(102,126,234,0.2);border-radius:8px;"><strong>🧮 Conclusion:</strong> Which trial used the MOST energy from your arm? Why does higher amplitude or shorter wavelength require more energy?</div>\`
                        }`;

// Insert after the Wavelength Procedure closing },
// Find the Wavelength Procedure title (now it's been swapped, so it's in position 4)
const waveProcTitle = "title: `🏁 Procedure: The Wavelength Test`";
const waveProcPos = html.indexOf(waveProcTitle);
if (waveProcPos !== -1) {
  // Find the next }, after this slide
  let searchPos = waveProcPos;
  // Find the closing of this slide's content backtick, then the },
  let closingBrace = html.indexOf('},', searchPos);
  if (closingBrace !== -1) {
    // Insert after },
    const insertPos = closingBrace + 2;
    html = html.substring(0, insertPos) + dataSlide41 + html.substring(insertPos);
    console.log('✅ Lab 41: Data Recording slide inserted');
    ok++;
  }
} else {
  console.log('❌ FAILED: Lab 41 data slide insertion');
  fail++;
}

// Lab 49 Transmission Log (after Transmission Procedure, before Discovery)
const dataSlide49 = `,
                        {
                            title: \`📊 Transmission Log: Results\`,
                            content: \`<div style="margin-bottom:15px;">📋 Record your Code Dictionary and Transmission Results:</div><table style="width:100%; border-collapse: collapse; font-size:1.4rem; text-align:center;"><tr style="background:#444;"><th style="padding:10px; border:1px solid #666;">Word</th><th style="padding:10px; border:1px solid #666;">Your Code Pattern (flashes/taps)</th><th style="padding:10px; border:1px solid #666;">Decoded Correctly? (✓/✗)</th></tr><tr><td style="padding:10px; border:1px solid #666;">1. ___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:10px; border:1px solid #666;">2. ___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr><tr><td style="padding:10px; border:1px solid #666;">3. ___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr><tr style="background:rgba(255,255,255,0.05);"><td style="padding:10px; border:1px solid #666;">4. ___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr><tr><td style="padding:10px; border:1px solid #666;">5. ___</td><td style="padding:10px; border:1px solid #666;">___</td><td style="padding:10px; border:1px solid #666;">___</td></tr></table><div style="margin-top:15px;padding:15px;background:rgba(40,167,69,0.2);border-radius:8px;border-left:4px solid #28a745;"><strong>📡 Transmission Score:</strong> ___ out of 3 words correctly decoded on the first try.<br><br><strong>🧮 Analysis:</strong> If your partner missed a word, what went wrong? Was it the code pattern, the timing, or interference?</div>\`
                        }`;

const transProcTitle = "title: `🏁 Procedure: The Transmission Text`";
const transProcPos = html.indexOf(transProcTitle);
if (transProcPos !== -1) {
  let closingBrace49 = html.indexOf('},', transProcPos);
  if (closingBrace49 !== -1) {
    const insertPos49 = closingBrace49 + 2;
    html = html.substring(0, insertPos49) + dataSlide49 + html.substring(insertPos49);
    console.log('✅ Lab 49: Transmission Log slide inserted');
    ok++;
  }
} else {
  console.log('❌ FAILED: Lab 49 data slide insertion');
  fail++;
}

// ====================
// WRITE OUTPUT
// ====================
fs.writeFileSync(filePath, html, 'utf-8');
console.log(`\nDone! ${ok} changes succeeded, ${fail} failed.`);
