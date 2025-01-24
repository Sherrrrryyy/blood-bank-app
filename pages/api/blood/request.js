import dbConnect from '../../../utils/dbConnect';
import BloodRequest from '../../../models/BloodRequest';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Authorization required' });

    try {
      const token = authorization.split(' ')[1];
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);

      const { bloodGroup, reason } = req.body;
      const bloodRequest = await BloodRequest.create({ userId, bloodGroup, reason });
      res.status(201).json({ message: 'Blood request created successfully', bloodRequest });
    } catch (err) {
      res.status(400).json({ message: 'Error creating blood request', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
