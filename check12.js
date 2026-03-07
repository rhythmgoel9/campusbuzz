var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
lines.forEach(function(l, i){
  if(l.includes('MAP_EVENTS') || l.includes('mapEvents') || l.includes('28.6') || l.includes('77.2') || l.includes('IIT Delhi') && l.includes('lat'))
    console.log((i+1)+': '+l.trim().substring(0,130));
});
