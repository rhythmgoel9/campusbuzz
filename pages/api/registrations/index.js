// POST /api/registrations   — register for an event
// GET  /api/registrations?email=  — get registrations by email
const { connectDB } = require('../../../lib/mongodb');
const Event = require('../../../models/Event');
const Registration = require('../../../models/Registration');

function makeId() {
  const alpha = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'REG-';
  for (let i = 0; i < 8; i++) id += alpha[Math.floor(Math.random() * alpha.length)];
  return id;
}

export default = async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      const { email } = req.query;
      if (!email) return res.status(400).json({ error: 'email required' });
      const regs = await Registration.find({ email: email.toLowerCase() }).sort({ regAt: -1 }).lean();
      return res.json(regs);
    }

    if (req.method === 'POST') {
      const { eventId, name, email, phone, college } = req.body || {};
      if (!eventId || !name || !email || !phone) {
        return res.status(400).json({ ok: false, msg: 'Fill all required fields' });
      }

      const ev = await Event.findOne({ slug: eventId, verified: true });
      if (!ev) return res.status(404).json({ ok: false, msg: 'Event not found' });

      const exists = await Registration.findOne({ eventId, email: email.toLowerCase() });
      if (exists) return res.status(409).json({ ok: false, msg: 'Already registered for this event!' });

      const regId = makeId();
      await Registration.create({ regId, eventId, eventName: ev.name, name, email, phone, college });
      await Event.updateOne({ slug: eventId }, { $inc: { registrations: 1 } });

      return res.status(201).json({ ok: true, msg: `Registered for ${ev.name}! 🎉`, regId });
    }

    res.status(405).end();
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ ok: false, msg: 'Already registered for this event!' });
    }
    console.error('[api/registrations]', err.message);
    res.status(500).json({ ok: false, msg: 'Server error, please try again.' });
  }
};
