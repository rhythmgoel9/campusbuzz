var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// Fix 1: Homepage featured - 6 se 20 karo
h = h.replace('API.query({limit:6})', 'API.query({limit:20})');

// Fix 2: Default limit 9 se 27 karo
h = h.replace('async query({ cat, search, page = 1, limit = 9 } = {})', 'async query({ cat, search, page = 1, limit = 27 } = {})');

// Fix 3: Events page load - limit 9 se 27 karo
h = h.replace('API.query({cat:filter,search,page,limit:9})', 'API.query({cat:filter,search,page,limit:27})');

fs.writeFileSync('public/app.html', h);
console.log('Done!');
