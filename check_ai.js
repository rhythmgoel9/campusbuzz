var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
var idx = lines.findIndex(l => l.includes('_uEmail') || l.includes('cb_interests_'));
for(var i=idx-2; i<idx+5; i++) console.log((i+1)+': '+lines[i]);
