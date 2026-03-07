var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// saveInterests - email specific
h = h.replace(
  "var uEmail=localStorage.getItem('cb_user_email')||'default';localStorage.setItem('cb_interests_'+uEmail,JSON.stringify(selected));",
  "var uEmail=localStorage.getItem('cb_user_email')||'default';localStorage.setItem('cb_interests_'+uEmail,JSON.stringify(selected));"
);
h = h.replace(
  "localStorage.setItem('cb_interests',JSON.stringify(selected));",
  "var uEmail=localStorage.getItem('cb_user_email')||'default';localStorage.setItem('cb_interests_'+uEmail,JSON.stringify(selected));"
);

// submitAuth - email specific check
h = h.replace(
  "var interests=localStorage.getItem('cb_interests');var hasInterests=interests&&JSON.parse(interests).length>0;",
  "var cbIntKey='cb_interests_'+email;var interests=localStorage.getItem(cbIntKey);var hasInterests=interests&&JSON.parse(interests).length>0;"
);

// getRecommendations - email specific
h = h.replace(
  "var _uEmail=localStorage.getItem('cb_user_email')||'default';const interests=JSON.parse(localStorage.getItem('cb_interests_'+_uEmail)||'[]');",
  "var _uEmail=localStorage.getItem('cb_user_email')||'default';const interests=JSON.parse(localStorage.getItem('cb_interests_'+_uEmail)||'[]');"
);

fs.writeFileSync('public/app.html', h);
console.log('Done!');
