import dbConnect from '../../../utils/dbConnect';
import Donor from '../../../models/Donor';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Authorization required' });

    try {
      const token = authorization.split(' ')[1];
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);

      const { bloodGroup, availability } = req.body;
      const donor = await Donor.create({ userId, bloodGroup, availability });
      res.status(201).json({ message: 'Donor registered successfully', donor });
    } catch (err) {
      res.status(400).json({ message: 'Error registering donor', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
