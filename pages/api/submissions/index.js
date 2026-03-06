// POST /api/submissions — organiser submits event for review
const { connectDB } = require('../../../lib/mongodb');
const Submission = require('../../../models/Submission');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { name, college, date, cat, venue, prize, desc, link, email, size } = req.body || {};
    if (!name || !college || !date || !cat || !venue || !email) {
      return res.status(400).json({ ok: false, msg: 'Fill all required fields' });
    }
    if (!email.includes('@')) {
      return res.status(400).json({ ok: false, msg: 'Enter a valid email' });
    }
    await connectDB();
    await Submission.create({ name, college, date, cat, venue, prize, desc, link, email, size });
    return res.status(201).json({ ok: true, msg: "Submitted! We'll review within 24 hours." });
  } catch (err) {
    console.error('[api/submissions]', err.message);
    res.status(500).json({ ok: false, msg: 'Server error, try again.' });
  }
};
