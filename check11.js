var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
lines.forEach(function(l, i){
  if(l.includes('lat') || l.includes('lng') || l.includes('MapPin') || l.includes('mapEvent') || l.includes('coordinates'))
    console.log((i+1)+': '+l.trim().substring(0,130));
});
