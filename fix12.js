var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');

// ── FIX 1: Line 3235 - remove location.reload() after interest check ──
// Current: shows interest modal OR reloads, BUT line 3236 always reloads!
// Fix: move reload INSIDE else, remove line 3236
lines[3234] = `const m=document.getElementById('auth-modal');m.style.display='none';m.style.visibility='hidden';if(!localStorage.getItem('cb_interests')){setTimeout(function(){document.getElementById('interest-modal').style.display='flex';},300);}else{location.reload();}`;

// Remove the standalone location.reload() on line 3236
lines[3235] = '';

// ── FIX 2: db.getAllEvents - add this function ──
// Find where db object is defined
var dbIdx = lines.findIndex(l => l.includes('getUser() { return getLocalUser()'));
console.log('db found at line:', dbIdx+1);
console.log('Context:', lines[dbIdx].substring(0,100));

h = lines.join('\n');

// Add getAllEvents to db object
h = h.replace(
  'getUser() { return getLocalUser(); },',
  'getUser() { return getLocalUser(); },\n  getAllEvents() { try { const c=localStorage.getItem("cb_events_cache"); return c?JSON.parse(c):[]; } catch{return[];} },'
);

fs.writeFileSync('public/app.html', h);
console.log('Done!');
