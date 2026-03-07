var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
h = h.replace('location.reload();}', "window.location.href='/';};");
fs.writeFileSync('public/app.html', h);
console.log('Done!');
