var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
var authStart = lines.findIndex(l => l.includes('async function submitAuth'));
for(var i=authStart; i<authStart+20; i++) console.log((i+1)+': '+lines[i]);
