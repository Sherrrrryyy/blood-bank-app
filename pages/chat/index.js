import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: 'Invalid credentials' });

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      res.status(400).json({ message: 'Error logging in', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
