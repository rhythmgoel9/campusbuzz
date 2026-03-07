var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
lines.forEach(function(l, i){
  if(l.includes('SwipeCard') || l.includes('swipe') || l.includes('Swipe') || l.includes('featured') || l.includes('setFeatured'))
    console.log((i+1)+': '+l.trim().substring(0,130));
});
