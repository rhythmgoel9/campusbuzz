var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
lines.forEach(function(l, i){
  if(l.includes('AIPicker') || l.includes('ai-panel') || l.includes('aiPick') || l.includes('interest') || l.includes('recommend'))
    console.log((i+1)+': '+l.trim().substring(0,130));
});
