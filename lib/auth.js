// lib/auth.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev_secret_changeme';

module.exports = {
  signToken: (p) => jwt.sign(p, SECRET, { expiresIn: '30d' }),
  verifyToken: (t) => { try { return jwt.verify(t, SECRET); } catch { return null; } },
  getUser: (req) => {
    const h = req.headers.authorization;
    if (h?.startsWith('Bearer ')) return module.exports.verifyToken(h.slice(7));
    const c = req.cookies?.cb_token;
    if (c) return module.exports.verifyToken(c);
    return null;
  },
};
