var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// Check current state
var idx = h.indexOf('var _uEmail=localStorage.getItem');
console.log('Current:', h.substring(idx, idx+150));

// Fix: correct email-specific key in getRecommendations
h = h.replace(
  "var _uEmail=localStorage.getItem('cb_user_email')||'default';const interests=JSON.parse(localStorage.getItem('cb_interests_'+_uEmail)||'[]');",
  "var _uEmail=localStorage.getItem('cb_user_email')||'default';var _iKey='cb_interests_'+_uEmail;const interests=JSON.parse(localStorage.getItem(_iKey)||'[]');console.log('AI Picker - user:',_uEmail,'key:',_iKey,'interests:',interests);"
);

fs.writeFileSync('public/app.html', h);
console.log('Done!');
