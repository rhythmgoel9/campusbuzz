var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// Fix: submitAuth ke andar directly modal show karo - function call mat karo
h = h.replace(
  "if(!localStorage.getItem('cb_interests')){setTimeout(function(){var m=document.getElementById('interest-modal');if(m){m.style.display='flex';}},400);}else{location.reload();}",
  "setTimeout(function(){if(!localStorage.getItem('cb_interests')){var m=document.getElementById('interest-modal');m.style.display='flex';m.style.visibility='visible';}else{location.reload();}},300);"
);

fs.writeFileSync('public/app.html', h);
console.log('Done!');
