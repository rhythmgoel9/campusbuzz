var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// Fix 1: Interest modal display fix
h = h.replace(
  "if(!localStorage.getItem('cb_interests')){setTimeout(function(){var m=document.getElementById('interest-modal');if(m){m.style.display='flex';}},400);}else{location.reload();}",
  "if(!localStorage.getItem('cb_interests')){setTimeout(function(){var m=document.getElementById('interest-modal');if(m){m.style.display='flex';}},400);}else{location.reload();}"
);

// Fix 2: Replace AI API call with simple interest-based filtering
var oldAI = `  const getRecommendations=async()=>{
    setLoading(true);
    const myRegs=API.getMyRegs();
    const regTypes=myRegs.map(r=>{const ev=db.getEvent(r.eventId);return ev?.cat;}).filter(Boolean);
    const interests=JSON.parse(localStorage.getItem("cb_interests")||"[]");const prompt=\`You are CampusBuzz AI. Based on a student's interests (\${interests.join(", ")||"general"}) and registration history in college events (categories: \${regTypes.join(", ")||"none yet"}), recommend exactly 3 events from this list that they'd love. Return ONLY valid JSON array (no markdown, no explanation) with exactly 3 objects: [{eventId, reason}] where eventId is from this list and reason is 1 brief sentence (max 12 words). Events: \${JSON.stringify(EVENTS.map(e=>({id:e.id,name:e.name,cat:e.cat,college:e.college})))}\`;
    try{
      const resp=await fetch("/api/ai-recommend",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt})});
      const data=await resp.json();
      const text=data.result||"[]";
      const clean=text.replace(/\`\`\`json|\`\`\`/g,"").trim();
      const parsed=JSON.parse(clean);
      const allEvs=db.getAllEvents();const found=parsed.map(r=>({ev:allEvs.find(e=>e.id===r.eventId),reason:r.reason})).filter(r=>r.ev);
      setRecs(found.slice(0,3));
    }catch(e){
      const allEv=db.getAllEvents();const fallback=allEv.filter((e,i)=>i%4===0).slice(0,3).map(ev=>({ev,reason:"Popular among students with similar interests"}));
      setRecs(fallback);
    }
    setLoading(false);setLoaded(true);
  };`;

var newAI = `  const getRecommendations=async()=>{
    setLoading(true);
    const interests=JSON.parse(localStorage.getItem("cb_interests")||"[]");
    const myRegs=API.getMyRegs();
    const regCats=myRegs.map(r=>{const ev=db.getEvent(r.eventId);return ev?.cat;}).filter(Boolean);
    const allCats=[...new Set([...interests.map(i=>i.toLowerCase()),...regCats])];
    const allEv=db.getAllEvents();
    let recs=[];
    if(allCats.length>0){
      allCats.forEach(cat=>{
        const match=allEv.filter(e=>e.cat===cat&&!myRegs.find(r=>r.eventId===e.id));
        match.forEach(ev=>{
          if(!recs.find(r=>r.ev.id===ev.id)) recs.push({ev,reason:"Matches your "+cat+" interest"});
        });
      });
    }
    if(recs.length<3){
      const hot=allEv.filter(e=>e.hot&&!recs.find(r=>r.ev.id===e.id));
      hot.forEach(ev=>{ if(recs.length<6) recs.push({ev,reason:"Trending on CampusBuzz this week"}); });
    }
    setRecs(recs.slice(0,3));
    setLoading(false);setLoaded(true);
  };`;

h = h.replace(oldAI, newAI);
fs.writeFileSync('public/app.html', h);
console.log('Done!');
