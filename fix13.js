var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');

// ── FIX 1: saveInterests ke baad location.reload() add karo ──
// Taaki interests save hone ke baad page reload ho aur React state update ho
h = lines.join('\n');
h = h.replace(
  "function saveInterests(){\nconst chips=document.querySelectorAll('#interest-chips div');\nconst selected=Array.from(chips).filter(c=>c.getAttribute('data-sel')==='1').map(c=>c.textContent.split(' ').slice(1).join(' '));\nlocalStorage.setItem('cb_interests',JSON.stringify(selected));\ndocument.getElementById('interest-modal').style.display='none';\nlocation.reload();\n}",
  "function saveInterests(){const chips=document.querySelectorAll('#interest-chips div');const selected=Array.from(chips).filter(c=>c.getAttribute('data-sel')==='1').map(c=>c.textContent.split(' ').slice(1).join(' '));localStorage.setItem('cb_interests',JSON.stringify(selected));document.getElementById('interest-modal').style.display='none';location.reload();}"
);

// ── FIX 2: Interest form dobara nahi aana ──
// submitAuth mein: sirf show karo agar interests EMPTY array ya null ho
h = h.replace(
  "if(!localStorage.getItem('cb_interests')){setTimeout(function(){document.getElementById('interest-modal').style.display='flex';},300);}else{location.reload();}",
  "var cbInt=localStorage.getItem('cb_interests');var cbIntParsed=cbInt?JSON.parse(cbInt):null;if(!cbInt||!cbIntParsed||cbIntParsed.length===0){setTimeout(function(){document.getElementById('interest-modal').style.display='flex';},300);}else{location.reload();}"
);

fs.writeFileSync('public/app.html', h);
console.log('Done!');
