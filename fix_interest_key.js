var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// Line 3241-3242: cb_interests -> cb_interests_EMAIL
h = h.replace(
  "var interests=localStorage.getItem('cb_interests');\nvar hasInterests=interests&&JSON.parse(interests).length>0;",
  "var cbKey='cb_interests_'+email;\nvar interests=localStorage.getItem(cbKey);\nvar hasInterests=interests&&JSON.parse(interests).length>0;"
);

// saveInterests mein bhi fix karo
h = h.replace(
  "var uEmail=localStorage.getItem('cb_user_email')||'default';localStorage.setItem('cb_interests_'+uEmail,JSON.stringify(selected));\ndocument.getElementById('interest-modal').style.display='none';\nlocation.reload();",
  "var uEmail=localStorage.getItem('cb_user_email')||'default';localStorage.setItem('cb_interests_'+uEmail,JSON.stringify(selected));\ndocument.getElementById('interest-modal').style.display='none';\nlocation.reload();"
);

var changed = h.includes("var cbKey='cb_interests_'+email;");
console.log('Fix applied:', changed);

fs.writeFileSync('public/app.html', h);
