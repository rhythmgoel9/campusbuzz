var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
lines.forEach(function(l, i){
  if(l.includes('map-section') || l.includes('MapSection') || l.includes('DelhiMap') || l.includes('NCR') || l.includes('svg') && l.includes('circle'))
    console.log((i+1)+': '+l.trim().substring(0,130));
});
