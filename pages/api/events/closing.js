const { connectDB } = require('../../../lib/mongodb');
const Event = require('../../../models/Event');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    await connectDB();
    const events = await Event.find({ verified: true, deadline: { $gt: new Date() } })
      .sort({ deadline: 1 }).limit(6).lean();
    res.json(events.map(e => ({ ...e, id: e.slug, deadline: e.deadline?.getTime?.() ?? null })));
  } catch (err) {
    console.error('[api/closing]', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
