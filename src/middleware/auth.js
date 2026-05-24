require('dotenv').config();
const jwt = require('jsonwebtoken');
const { mockUsers } = require('../config/db');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // إيجاد المستخدم بالـ id والـ role من التوكن مباشرة
      req.user = {
        id: decoded.id,
        role: decoded.role
      };

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

const leaderOnly = (req, res, next) => {
  if (req.user && req.user.role === 'leader') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied, leaders only' });
  }
};

module.exports = { protect, leaderOnly };