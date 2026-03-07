var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
h = h.replace(
  "const name = (localStorage.getItem('cb_user_name') || 'Student').trim();",
  "const name = localStorage.getItem('cb_user_name') ? localStorage.getItem('cb_user_name').trim() : null;"
);
h = h.replace(
  "return { name: name || 'Student', email, college: '', avatar: (name||'S')[0].toUpperCase() };",
  "if(!name || !localStorage.getItem('cb_token')){return null;}return { name, email, college: '', avatar: name[0].toUpperCase() };"
);
fs.writeFileSync('public/app.html', h);
console.log('Done!');
