import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
      res.status(400).json({ message: 'Error registering user', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
