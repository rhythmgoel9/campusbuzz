var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// Fix 1: events fetch hone ke baad cache mein store karo
h = h.replace(
  'setStats(s);setFeatured(f.events);setLoading(false);',
  'setStats(s);setFeatured(f.events);setLoading(false);try{localStorage.setItem("cb_events_cache",JSON.stringify(f.events));}catch(e){}'
);

// Fix 2: AI picker - getAllEvents ki jagah seedha API call karo
h = h.replace(
  'const getRecommendations=async()=>{\n    setLoading(true);\n    const interests=JSON.parse(localStorage.getItem(\'cb_interests\')||\'[]\');\n    const myRegs=API.getMyRegs();\n    const regCats=myRegs.map(r=>{const ev=db.getEvent(r.eventId);return ev&&ev.cat;}).filter(Boolean);\n    const allCats=[...new Set([...interests.map(function(i){return i.toLowerCase();}), ...regCats])];\n    const allEv=db.getAllEvents();',
  'const getRecommendations=async()=>{\n    setLoading(true);\n    const interests=JSON.parse(localStorage.getItem(\'cb_interests\')||\'[]\');\n    const myRegs=API.getMyRegs();\n    const regCats=myRegs.map(r=>{const ev=db.getEvent(r.eventId);return ev&&ev.cat;}).filter(Boolean);\n    const allCats=[...new Set([...interests.map(function(i){return i.toLowerCase();}), ...regCats])];\n    const fetchedEvs=await API.query({limit:50});\n    const allEv=fetchedEvs.events||[];'
);

fs.writeFileSync('public/app.html', h);
console.log('Done!');
