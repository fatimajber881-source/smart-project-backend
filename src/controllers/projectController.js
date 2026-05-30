require('dotenv').config();
const pool = require('../config/db');

// @route   GET /api/projects
const getProjects = async (req, res) => {
  const { id, role } = req.user;
  try {
    let result;
    if (role === 'leader') {
      result = await pool.query('SELECT * FROM projects WHERE leader_id = $1', [id]);
    } else {
      result = await pool.query(
        `SELECT p.* FROM projects p
         JOIN project_members pm ON p.project_id = pm.project_id
         WHERE pm.user_id = $1`, [id]
      );
    }
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/projects/:id
const getProjectById = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE project_id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Project not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   POST /api/projects
const createProject = async (req, res) => {
  const { name, description, start_date, end_date } = req.body;
  if (!name) return res.status(400).json({ message: 'Project name is required' });
  try {
    const result = await pool.query(
      `INSERT INTO projects (project_name, description, leader_id, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, description || '', req.user.id, start_date || null, end_date || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   PUT /api/projects/:id
const updateProject = async (req, res) => {
  const { name, description, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE projects SET
        project_name = COALESCE($1, project_name),
        description  = COALESCE($2, description),
        status       = COALESCE($3, status)
       WHERE project_id = $4 RETURNING *`,
      [name, description, status, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Project not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   DELETE /api/projects/:id
const deleteProject = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM projects WHERE project_id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/projects/:id/members-score
const getProjectMembersScore = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
        u.user_id,
        u.full_name as name,
        COUNT(t.task_id) as total_tasks,
        COUNT(CASE WHEN t.review_status = 'approved' THEN 1 END) as approved,
        COUNT(CASE WHEN t.review_status = 'pending_review' THEN 1 END) as pending_review,
        COUNT(CASE WHEN ts.status_name = 'in_progress' AND (t.review_status = 'none' OR t.review_status IS NULL) THEN 1 END) as in_progress,
        COALESCE(AVG(t.progress_percentage), 0) as avg_progress
       FROM task_assignments ta
       JOIN users u ON ta.assigned_to = u.user_id
       JOIN tasks t ON ta.task_id = t.task_id AND t.project_id = $1
       JOIN task_statuses ts ON t.status_id = ts.status_id
       WHERE ta.is_active = true
       GROUP BY u.user_id, u.full_name
       ORDER BY approved DESC, avg_progress DESC`,
      [req.params.id]
    );

    const members = result.rows.map((m, index) => ({
      rank: index + 1,
      user_id: m.user_id,
      name: m.name,
      total_tasks: parseInt(m.total_tasks),
      completed: parseInt(m.approved),
      approved: parseInt(m.approved),
      pending_review: parseInt(m.pending_review),
      in_progress: parseInt(m.in_progress),
      avg_progress: Math.round(parseFloat(m.avg_progress)),
      score: m.total_tasks > 0
        ? Math.round((parseInt(m.approved) / m.total_tasks) * 100)
        : 0
    }));

    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @route   GET /api/projects/:id/tasks
const getProjectTasks = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.task_id, t.title, t.description, t.progress_percentage,
              t.complexity_level, t.deadline, t.priority,
              t.review_status, t.review_comment,
              t.submission_note, t.submission_file, t.submission_file_original,
              t.submitted_at,
              ts.status_name as status,
              u.full_name as assigned_to_name,
              ta.assigned_to as assigned_to_id
       FROM tasks t
       JOIN task_statuses ts ON t.status_id = ts.status_id
       LEFT JOIN task_assignments ta ON t.task_id = ta.task_id AND ta.is_active = true
       LEFT JOIN users u ON ta.assigned_to = u.user_id
       WHERE t.project_id = $1
       ORDER BY
         CASE t.priority
           WHEN 'Urgent' THEN 1 WHEN 'High' THEN 2
           WHEN 'Medium' THEN 3 WHEN 'Low'  THEN 4 ELSE 5
         END, t.task_id ASC`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getProjects, getProjectById, createProject,
  updateProject, deleteProject, getProjectMembersScore, getProjectTasks
};