var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
for(var i=1000; i<1020; i++){
  console.log((i+1)+': '+lines[i]);
}
