import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized- No token provided' });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ error: 'Unauthorized- Invalid token' });
    }
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ error: 'User not found in database' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('error in protectRoute middleware', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
export default protectRoute;
