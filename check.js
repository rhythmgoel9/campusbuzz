var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
for(var i=955; i<975; i++){
  console.log(i+': '+lines[i]);
}
