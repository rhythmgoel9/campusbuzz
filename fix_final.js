var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// Find exact submitAuth line and rewrite completely
var oldAuth = h.substring(h.indexOf('async function submitAuth()'), h.indexOf('function openAuthModal()'));

var newAuth = `async function submitAuth(){
const email=document.getElementById('auth-email').value;
const pass=document.getElementById('auth-pass').value;
const name=document.getElementById('auth-name').value;
const err=document.getElementById('auth-error');
err.style.display='none';
if(!email||!pass){err.textContent='Email aur password zaroori hai!';err.style.display='block';return;}
try{
const res=await fetch('/api/auth/'+authMode,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password:pass,name})});
const data=await res.json();
if(!res.ok){err.textContent=data.error||'Error!';err.style.display='block';return;}
localStorage.setItem('cb_token',data.token);
localStorage.setItem('cb_user_name',data.name);
localStorage.setItem('cb_user_email',email);
document.getElementById('auth-modal').style.display='none';
document.getElementById('auth-modal').style.visibility='hidden';
var interests=localStorage.getItem('cb_interests');
var hasInterests=interests&&JSON.parse(interests).length>0;
if(!hasInterests){
  document.getElementById('interest-modal').style.display='flex';
  document.getElementById('interest-modal').style.visibility='visible';
}else{
  location.reload();
}
}catch(e){err.textContent='Server error!';err.style.display='block';}
}
`;

h = h.replace(oldAuth, newAuth);

// Fix saveInterests - reload after save
var oldSave = h.substring(h.indexOf('function saveInterests()'), h.indexOf('function showInterestModal()'));
var newSave = `function saveInterests(){
var chips=document.querySelectorAll('#interest-chips div');
var selected=Array.from(chips).filter(function(c){return c.getAttribute('data-sel')==='1';}).map(function(c){return c.textContent.trim().split(' ').slice(1).join(' ');});
if(selected.length===0){selected=['fest','tech'];}
localStorage.setItem('cb_interests',JSON.stringify(selected));
document.getElementById('interest-modal').style.display='none';
location.reload();
}
`;
h = h.replace(oldSave, newSave);

fs.writeFileSync('public/app.html', h);
console.log('Done! submitAuth rewritten.');
