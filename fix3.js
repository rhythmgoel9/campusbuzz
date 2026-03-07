var fs = require('fs');
var h = fs.readFileSync('public/app.html', 'utf8');
var lines = h.split('\n');

// Fix line 2182 - user.avatar
lines[2181] = '            <div className="profile-avatar">{user ? user.avatar : "?"}</div>';
// Fix line 2183 - user.name
lines[2182] = '            <span className="profile-name">{user ? user.name.split(" ")[0] : "Login"}</span>';
// Fix line 2181 - profile button - open auth if not logged in
lines[2180] = '          <button className={`profile-btn ${ddOpen?"open":""}`} onClick={()=>user?setDdOpen(o=>!o):openAuthModal()}>';

fs.writeFileSync('public/app.html', lines.join('\n'));
console.log('Done!');
