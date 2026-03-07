var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

var oldCats = `  const cats=[{cat:"concert",emoji:"🎵",name:"Concerts",color:"#ff2d9b",count:2},{cat:"dance",emoji:"💃",name:"Dance",color:"#f5ff00",count:3},{cat:"literary",emoji:"📚",name:"Literary",color:"#00d4ff",count:2},{cat:"mun",emoji:"🌍",name:"MUN",color:"#9b4dff",count:2},{cat:"fest",emoji:"🎪",name:"Fests",color:"#ff6b00",count:1},{cat:"tech",emoji:"💻",name:"Tech",color:"#39ff14",count:2},{cat:"poetry",emoji:"✍️",name:"Poetry",color:"#bf5fff",count:1},{cat:"music",emoji:"🎸",name:"Music",color:"#ff9900",count:1}];`;

// Check exact text first
var idx = h.indexOf('const cats=[{cat:"concert"');
console.log('Found at index:', idx);
console.log('Context:', h.substring(idx, idx+50));
