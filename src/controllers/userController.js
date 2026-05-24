require('dotenv').config();
const pool = require('../config/db');

// @route   GET /api/users/me
const getMe = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.user_id, u.full_name, u.email, r.role_name
       FROM users u
       JOIN roles r ON u.role_id = r.role_id
       WHERE u.user_id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];
    res.json({
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      role: user.role_name
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.user_id, u.full_name, u.email, r.role_name
       FROM users u
       JOIN roles r ON u.role_id = r.role_id`
    );

    res.json(result.rows.map(u => ({
      user_id: u.user_id,
      name: u.full_name,
      email: u.email,
      role: u.role_name
    })));
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/users/:id/tasks
const getMemberTasks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.task_id, t.title, t.description, t.deadline,
              t.progress_percentage, t.complexity_level,
              ts.status_name as status,
              p.project_name
       FROM tasks t
       JOIN task_assignments ta ON t.task_id = ta.task_id
       JOIN task_statuses ts ON t.status_id = ts.status_id
       JOIN projects p ON t.project_id = p.project_id
       WHERE ta.assigned_to = $1 AND ta.is_active = true
       ORDER BY t.deadline ASC NULLS LAST`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getMe, getAllUsers, getMemberTasks };