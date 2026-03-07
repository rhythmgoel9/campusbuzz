var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');

console.log("=== INTEREST MODAL ===");
lines.forEach(function(l,i){
  if(l.includes('interest-modal') || l.includes('showInterestModal') || l.includes('cb_interests') || l.includes('saveInterests') || l.includes('interest-chips'))
    console.log((i+1)+': '+l.trim().substring(0,150));
});

console.log("\n=== AUTH SUBMIT - what happens after login ===");
lines.forEach(function(l,i){
  if(l.includes('submitAuth') || l.includes('auth-modal') && l.includes('display'))
    console.log((i+1)+': '+l.trim().substring(0,150));
});

console.log("\n=== AI PICKER getRecommendations ===");
lines.forEach(function(l,i){
  if(l.includes('getRecommendations') || l.includes('setRecs') || l.includes('getAllEvents') || l.includes('db.get'))
    console.log((i+1)+': '+l.trim().substring(0,150));
});
