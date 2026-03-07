var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');

// ── FIX 1: auth-modal style conflict fix ──
// Line 3205 has both display:none and display:flex - remove the flex
lines[3204] = lines[3204].replace(
  "style='display:none;visibility:hidden;position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center'",
  "style='display:none;visibility:hidden;position:fixed;inset:0;background:rgba(0,0,0,0.8);z-index:9999;align-items:center;justify-content:center'"
);

// ── FIX 2: Replace getRecommendations with simple version ──
var start = h.indexOf('  const getRecommendations=async()=>{');
var end = h.indexOf('  };', start) + 4;
console.log('getRecommendations found at:', start, 'to', end);
console.log('Current code:', h.substring(start, start+200));

var newFn = `  const getRecommendations=async()=>{
    setLoading(true);
    const interests=JSON.parse(localStorage.getItem('cb_interests')||'[]');
    const myRegs=API.getMyRegs();
    const regCats=myRegs.map(r=>{const ev=db.getEvent(r.eventId);return ev&&ev.cat;}).filter(Boolean);
    const allCats=[...new Set([...interests.map(function(i){return i.toLowerCase();}), ...regCats])];
    const allEv=db.getAllEvents();
    var recs=[];
    if(allCats.length>0){
      allCats.forEach(function(cat){
        allEv.forEach(function(ev){
          if(ev.cat===cat && !myRegs.find(function(r){return r.eventId===ev.id;}) && !recs.find(function(r){return r.ev.id===ev.id;}))
            recs.push({ev:ev,reason:'Matches your '+cat+' interest'});
        });
      });
    }
    if(recs.length<3){
      allEv.filter(function(e){return e.hot;}).forEach(function(ev){
        if(recs.length<6 && !recs.find(function(r){return r.ev.id===ev.id;}))
          recs.push({ev:ev,reason:'Trending on CampusBuzz this week'});
      });
    }
    setRecs(recs.slice(0,3));
    setLoading(false);setLoaded(true);
  };`;

h = lines.join('\n');
h = h.substring(0, start) + newFn + h.substring(end);

fs.writeFileSync('public/app.html', h);
console.log('Done!');
