var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
lines.forEach(function(l, i){
  if(l.includes('limit') || l.includes('api/events') || l.includes('fetchEvents') || l.includes('page='))
    console.log((i+1)+': '+l.trim().substring(0,120));
});
