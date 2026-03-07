var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
lines.forEach(function(l, i){
  if(l.includes('cat-grid') || l.includes('catCard') || l.includes('FESTS') || l.includes('concerts') || l.includes('cat-card') || l.includes('Browse'))
    console.log((i+1)+': '+l.trim().substring(0,130));
});
