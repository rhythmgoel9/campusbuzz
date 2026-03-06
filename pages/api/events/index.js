// GET /api/events?cat=&search=&page=1&limit=9
const { connectDB } = require('../../../lib/mongodb');
const Event = require('../../../models/Event');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();
  try {
    await connectDB();
    const { cat, search, page = '1', limit = '9' } = req.query;
    const filter = { verified: true };

    if (cat && cat !== 'all') filter.cat = cat;
    if (search?.trim()) {
      filter.$or = [
        { name:    { $regex: search, $options: 'i' } },
        { college: { $regex: search, $options: 'i' } },
        { tags:    { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const p = Math.max(1, parseInt(page));
    const l = Math.min(24, parseInt(limit) || 9);

    const [events, total] = await Promise.all([
      Event.find(filter).sort({ hot: -1, registrations: -1 }).skip((p-1)*l).limit(l).lean(),
      Event.countDocuments(filter),
    ]);

    const out = events.map(e => ({ ...e, id: e.slug, deadline: e.deadline?.getTime?.() ?? null }));
    res.status(200).json({ events: out, total, pages: Math.ceil(total / l) });
  } catch (err) {
    console.error('[api/events]', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
