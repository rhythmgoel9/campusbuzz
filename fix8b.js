var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

// Find end of cats array
var start = h.indexOf('const cats=[{cat:"concert"');
var end = h.indexOf('];', start) + 2;

var newCats = `const catDefs=[{cat:"concert",emoji:"🎵",name:"Concerts",color:"#ff2d9b"},{cat:"dance",emoji:"💃",name:"Dance",color:"#f5ff00"},{cat:"literary",emoji:"📚",name:"Literary",color:"#00d4ff"},{cat:"mun",emoji:"🌍",name:"MUN",color:"#9b4dff"},{cat:"fest",emoji:"🎪",name:"Fests",color:"#ff6b00"},{cat:"tech",emoji:"💻",name:"Tech",color:"#39ff14"},{cat:"music",emoji:"🎸",name:"Music",color:"#ff9900"},{cat:"dance",emoji:"💃",name:"Dance",color:"#f5ff00"}];
  const allEvsForCount=featured&&featured.length?featured:[];
  const cats=catDefs.map(c=>({...c,count:allEvsForCount.filter(e=>e.cat===c.cat).length||0})).filter((c,i,a)=>a.findIndex(x=>x.cat===c.cat)===i);`;

h = h.substring(0, start) + newCats + h.substring(end);
fs.writeFileSync('public/app.html', h);
console.log('Done!');
