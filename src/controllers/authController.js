require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @route   POST /api/auth/register
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // التحقق من وجود المستخدم
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1', [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إيجاد الـ role_id
    const roleResult = await pool.query(
      'SELECT role_id FROM roles WHERE role_name = $1', [role || 'member']
    );
    const role_id = roleResult.rows[0]?.role_id;

    if (!role_id) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // إضافة المستخدم
    const result = await pool.query(
      `INSERT INTO users (full_name, email, password_hash, role_id)
       VALUES ($1, $2, $3, $4)
       RETURNING user_id, full_name, email, role_id`,
      [name, email, hashedPassword, role_id]
    );

    const user = result.rows[0];

    res.status(201).json({
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      role: role,
      token: generateToken(user.user_id, role)
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT u.*, r.role_name 
       FROM users u 
       JOIN roles r ON u.role_id = r.role_id
       WHERE u.email = $1`, [email]
    );

    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      role: user.role_name,
      token: generateToken(user.user_id, user.role_name)
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login };