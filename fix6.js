var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');

var oldPins = `const MAP_PINS=[
  {n:'IIT Delhi',a:'Hauz Khas, South Delhi',x:.38,y:.55,col:'#00e5ff',ev:3},
  {n:'DTU',a:'Rohini, North-West Delhi',x:.25,y:.21,col:'#ff6b35',ev:5},
  {n:'SRCC, DU',a:'North Campus, Delhi Univ.',x:.44,y:.29,col:'#ff2d9b',ev:4},
  {n:'JNU',a:'Vasant Kunj, South Delhi',x:.33,y:.63,col:'#39ff14',ev:3},
  {n:'NSUT',a:'Dwarka, West Delhi',x:.19,y:.53,col:'#f5ff00',ev:2},
  {n:'IGDTUW',a:'Kashmere Gate, Old Delhi',x:.52,y:.32,col:'#00d4ff',ev:2},
  {n:'AIIMS',a:'Ansari Nagar, South Delhi',x:.41,y:.59,col:'#ff9900',ev:2},
  {n:'Jamia',a:'Jamia Nagar, South-East',x:.59,y:.67,col:'#bf5fff',ev:3},
  {n:'Amity',a:'Sector 125, Noida',x:.77,y:.43,col:'#ff6b35',ev:4},
  {n:'Bennett Univ.',a:'Greater Noida',x:.87,y:.61,col:'#00e5ff',ev:2},
  {n:'IPU',a:'Dwarka Sector 16',x:.22,y:.61,col:'#f5ff00',ev:2},
  {n:'NIT Kurukshetra',a:'Kurukshetra, Haryana',x:.28,y:.05,col:'#39ff14',ev:2},
];`;

var newPins = `const MAP_PINS=[
  {n:'IIT Delhi',a:'Hauz Khas, South Delhi',x:.38,y:.55,col:'#00e5ff',ev:4,slug:'tryst-iit-delhi-2026'},
  {n:'DTU',a:'Rohini, North-West Delhi',x:.25,y:.21,col:'#ff6b35',ev:6,slug:'invictus-dtu-2026'},
  {n:'Hindu College',a:'North Campus, Delhi Univ.',x:.44,y:.29,col:'#ff2d9b',ev:5,slug:'mecca-2026'},
  {n:'SRCC, DU',a:'North Campus, Delhi Univ.',x:.46,y:.27,col:'#a855f7',ev:2,slug:'crossroads-2026'},
  {n:'JMI',a:'Jamia Nagar, South-East Delhi',x:.59,y:.67,col:'#bf5fff',ev:2,slug:'alma-fiesta-jmi-2026'},
  {n:'NIT Delhi',a:'Narela, North Delhi',x:.38,y:.08,col:'#39ff14',ev:2,slug:'robowars-2026'},
  {n:'SSCBS, DU',a:'Rohini, North-West Delhi',x:.27,y:.23,col:'#f5ff00',ev:2,slug:'hackcbs-du-2026'},
  {n:'DSE, DU',a:'North Campus, Delhi Univ.',x:.43,y:.31,col:'#00d4ff',ev:2,slug:'synergy-dse-2026'},
  {n:'Gargi College',a:'South Campus, Delhi Univ.',x:.40,y:.62,col:'#ff9900',ev:2,slug:'reconovate-gargi-2026'},
  {n:'Aryabhatta College',a:'South Campus, Delhi Univ.',x:.38,y:.60,col:'#ec4899',ev:2,slug:'enactopia-aryabhatta-2026'},
  {n:'Daulat Ram',a:'North Campus, Delhi Univ.',x:.45,y:.27,col:'#84cc16',ev:1,slug:'voices-today-daulat-ram-2026'},
  {n:'Christ Univ.',a:'Ghaziabad, Delhi NCR',x:.82,y:.32,col:'#06b6d4',ev:1,slug:'sustainathon-christ-2026'},
];`;

h = h.replace(oldPins, newPins);
fs.writeFileSync('public/app.html', h);
console.log('Done!');
