import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Authorization required' });

  try {
    const token = authorization.split(' ')[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
