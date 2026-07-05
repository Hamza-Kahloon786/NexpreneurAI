const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const adminProtect = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({ message: 'Not authorised — no token provided' });

  try {
    const token   = auth.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user    = await User.findById(decoded.id).select('-password');

    if (!user)
      return res.status(401).json({ message: 'User no longer exists' });

    if (!user.isAdmin)
      return res.status(403).json({ message: 'Access denied — admins only' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

module.exports = { adminProtect };
