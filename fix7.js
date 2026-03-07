var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// Fix 1: AI picker - EVENTS ki jagah db.getAllEvents() use karo
h = h.replace(
  'const fallback=EVENTS.filter((e,i)=>i%4===0).slice(0,3).map(ev=>({ev,reason:"Popular among students with similar interests"}));',
  'const allEv=db.getAllEvents();const fallback=allEv.filter((e,i)=>i%4===0).slice(0,3).map(ev=>({ev,reason:"Popular among students with similar interests"}));'
);
h = h.replace(
  'const found=parsed.map(r=>({ev:EVENTS.find(e=>e.id===r.eventId),reason:r.reason})).filter(r=>r.ev);',
  'const allEvs=db.getAllEvents();const found=parsed.map(r=>({ev:allEvs.find(e=>e.id===r.eventId),reason:r.reason})).filter(r=>r.ev);'
);
h = h.replace(
  'const prompt=`You are CampusBuzz AI. Based on a student\'s registration history in college events (categories: ${regTypes.join(", ")||"none yet"})',
  'const interests=JSON.parse(localStorage.getItem("cb_interests")||"[]");const prompt=`You are CampusBuzz AI. Based on a student\'s interests (${interests.join(", ")||"general"}) and registration history in college events (categories: ${regTypes.join(", ")||"none yet"})'
);

// Fix 2: Interest form - login ke baad dikhao
// submitAuth ke baad interest modal show karo
h = h.replace(
  "localStorage.setItem('cb_token',data.token);\nllocalStorage.setItem('cb_user_name',data.name);",
  "localStorage.setItem('cb_token',data.token);\nllocalStorage.setItem('cb_user_name',data.name);"
);

// Add interest modal before </body>
var interestModal = `
<div id='interest-modal' style='display:none;position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:99999;align-items:center;justify-content:center'>
<div style='background:#0d0d1a;border:1px solid rgba(0,229,255,.2);border-radius:16px;padding:2rem;width:420px;max-width:92vw'>
<h2 style='color:#fff;margin-bottom:.5rem;font-family:Syne,sans-serif'>What are you into? 🎯</h2>
<p style='color:#666;font-size:.85rem;margin-bottom:1.5rem'>Select your interests so we can recommend the best events for you!</p>
<div id='interest-chips' style='display:flex;flex-wrap:wrap;gap:.6rem;margin-bottom:1.5rem'>
${['🎪 Fest','💻 Tech','🎵 Music','💃 Dance','🌍 MUN','📚 Literary','🤖 Robotics','🎤 Debate','🏏 Sports','🎨 Arts'].map(cat=>`
<div onclick='toggleInterest(this,"${cat}")' style='padding:.5rem 1rem;border:1px solid rgba(255,255,255,.15);border-radius:20px;cursor:pointer;font-size:.82rem;color:#aaa;transition:all .2s'>${cat}</div>
`).join('')}
</div>
<button onclick='saveInterests()' style='width:100%;padding:.75rem;background:linear-gradient(135deg,#00e5ff,#a855f7);border:none;border-radius:8px;color:#000;font-weight:800;cursor:pointer;font-size:1rem'>Save My Interests →</button>
<p onclick='saveInterests()' style='color:#444;text-align:center;margin-top:.75rem;cursor:pointer;font-size:.8rem'>Skip for now</p>
</div></div>
<script>
function toggleInterest(el,cat){
  const sel=el.getAttribute('data-sel')==='1';
  el.setAttribute('data-sel',sel?'0':'1');
  el.style.background=sel?'transparent':'rgba(0,229,255,.15)';
  el.style.borderColor=sel?'rgba(255,255,255,.15)':'#00e5ff';
  el.style.color=sel?'#aaa':'#00e5ff';
}
function saveInterests(){
  const chips=document.querySelectorAll('#interest-chips div');
  const selected=Array.from(chips).filter(c=>c.getAttribute('data-sel')==='1').map(c=>c.textContent.split(' ').slice(1).join(' '));
  localStorage.setItem('cb_interests',JSON.stringify(selected));
  document.getElementById('interest-modal').style.display='none';
  location.reload();
}
function showInterestModal(){
  const m=document.getElementById('interest-modal');
  m.style.display='flex';
}
<\/script>`;

h = h.replace('</body>', interestModal + '</body>');

// Show interest modal after successful signup/login if no interests set
h = h.replace(
  "const m=document.getElementById('auth-modal');m.style.display='none';m.style.visibility='hidden';",
  "const m=document.getElementById('auth-modal');m.style.display='none';m.style.visibility='hidden';if(!localStorage.getItem('cb_interests')){setTimeout(()=>showInterestModal(),300);}else{location.reload();}"
);

fs.writeFileSync('public/app.html', h);
console.log('Done!');
