var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
for(var i=2020; i<2080; i++){
  console.log((i+1)+': '+lines[i]);
}
