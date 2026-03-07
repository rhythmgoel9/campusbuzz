var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');

// Find getRecommendations and show interests line
lines.forEach(function(l,i){
  if(l.includes('interests') && l.includes('cb_interest'))
    console.log((i+1)+': '+l);
});
