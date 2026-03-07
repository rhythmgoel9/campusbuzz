var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
lines.forEach(function(l, i){
  if(l.includes('map') && (l.includes('pin') || l.includes('Pin') || l.includes('dot') || l.includes('marker') || l.includes('college')))
    console.log((i+1)+': '+l.trim().substring(0,130));
});
