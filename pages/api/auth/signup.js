import { connectDB } from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    await connectDB();
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Sab fields zaroori hain' });
    const { default: User } = await import('../../../models/User');
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: 'Email already registered!' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    const token = jwt.sign({ id: user._id, name, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, name, email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
