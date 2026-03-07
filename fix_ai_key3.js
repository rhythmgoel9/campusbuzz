var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');

// Line 2025 fix - index 2024
lines[2024] = "    var _uEmail=localStorage.getItem('cb_user_email')||'default';const interests=JSON.parse(localStorage.getItem('cb_interests_'+_uEmail)||'[]');";

h = lines.join('\n');
fs.writeFileSync('public/app.html', h);
console.log('Done! Line 2025 fixed.');
