var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');
var idx = lines.findIndex(l => l.includes('getLocalUser') && l.includes('const user'));
console.log('Found at line:', idx+1);
for(var i=Math.max(0,idx-2); i<Math.min(lines.length,idx+15); i++){
  console.log((i+1)+': '+lines[i]);
}
