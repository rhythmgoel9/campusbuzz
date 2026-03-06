const { connectDB } = require('../../../lib/mongodb');
const Event = require('../../../models/Event');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    await connectDB();
    const events = await Event.find({ verified: true }).lean();
    const colleges = new Set(events.map(e => e.college)).size;
    const regs = events.reduce((s, e) => s + (e.registrations || 0), 0);
    const prize = events.reduce((s, e) => {
      const n = parseInt((e.prize || '').replace(/[₹,\s]/g, ''));
      return s + (isNaN(n) ? 0 : n);
    }, 0);
    res.json({ events: events.length, colleges, prize, regs });
  } catch (err) {
    console.error('[api/stats]', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
