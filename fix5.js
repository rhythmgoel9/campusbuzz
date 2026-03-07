var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// Fix 1: Swipe cards - 8 se sab events
h = h.replace('const allCards=events.slice(0,8);', 'const allCards=events;');

fs.writeFileSync('public/app.html', h);
console.log('Done!');
