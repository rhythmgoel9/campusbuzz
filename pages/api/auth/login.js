import { connectDB } from '../../../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    await connectDB();
    const { email, password } = req.body;
    const { default: User } = await import('../../../models/User');
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Email registered nahi hai!' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Galat password!' });
    const token = jwt.sign({ id: user._id, name: user.name, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ token, name: user.name, email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
