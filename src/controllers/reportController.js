require('dotenv').config();
const pool = require('../config/db');

// GET /api/reports/project/:id
const getProjectReport = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.task_id, t.title, ts.status_name AS status,
              t.progress_percentage, t.complexity_level,
              t.deadline, t.priority, t.review_status,
              t.created_at, t.approved_at,
              -- مدة الإنجاز بالدقائق (created → approved)
              CASE WHEN t.approved_at IS NOT NULL
                THEN ROUND(EXTRACT(EPOCH FROM (t.approved_at - t.created_at)) / 60)
                ELSE NULL END AS duration_minutes
       FROM tasks t
       JOIN task_statuses ts ON t.status_id = ts.status_id
       WHERE t.project_id = $1
       ORDER BY CASE t.priority WHEN 'Urgent' THEN 1 WHEN 'High' THEN 2 WHEN 'Medium' THEN 3 WHEN 'Low' THEN 4 ELSE 5 END`,
      [req.params.id]
    );

    const tasks = result.rows;
    const total        = tasks.length;
    const completed    = tasks.filter(t => t.review_status === 'approved').length;
    const pending      = tasks.filter(t => t.review_status === 'pending_review').length;
    const in_progress  = tasks.filter(t => t.status === 'in_progress' && t.review_status !== 'approved').length;
    const not_started  = tasks.filter(t => t.status === 'not_started').length;
    const approval_rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    res.json({
      project_id: req.params.id, total_tasks: total,
      completed, pending_review: pending, in_progress, not_started,
      avg_progress: `${approval_rate}%`, tasks
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/reports/member/:id
const getMemberReport = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.task_id, t.title, ts.status_name, t.review_status,
              t.created_at, t.approved_at,
              CASE WHEN t.approved_at IS NOT NULL
                THEN ROUND(EXTRACT(EPOCH FROM (t.approved_at - t.created_at)) / 60)
                ELSE NULL END AS duration_minutes
       FROM tasks t
       JOIN task_assignments ta ON t.task_id = ta.task_id
       JOIN task_statuses ts ON t.status_id = ts.status_id
       WHERE ta.assigned_to=$1 AND ta.is_active=true`,
      [req.params.id]
    );

    const tasks         = result.rows;
    const total         = tasks.length;
    const approved      = tasks.filter(t => t.review_status === 'approved').length;
    const pending       = tasks.filter(t => t.review_status === 'pending_review').length;
    const needs_revision= tasks.filter(t => t.review_status === 'needs_revision').length;
    const in_progress   = tasks.filter(t => t.status_name === 'in_progress' && (!t.review_status || t.review_status === 'none')).length;

    // مجموع الساعات من approved tasks فقط (created_at → approved_at)
    const totalMinutes = tasks
      .filter(t => t.duration_minutes !== null)
      .reduce((sum, t) => sum + parseFloat(t.duration_minutes || 0), 0);
    const total_hours = (totalMinutes / 60).toFixed(1);

    const performance_score = total > 0 ? Math.round((approved / total) * 100) : 0;

    res.json({
      member_id: req.params.id, total_tasks: total,
      approved, pending_review: pending,
      needs_revision, in_progress,
      total_hours: `${total_hours} hrs`,
      performance_score: `${performance_score}%`
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/reports/team
const getTeamReport = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         u.user_id, u.full_name AS name,
         COUNT(DISTINCT t.task_id) AS total_tasks,
         COUNT(DISTINCT CASE WHEN t.review_status='approved' THEN t.task_id END) AS approved,
         COUNT(DISTINCT CASE WHEN t.review_status='pending_review' THEN t.task_id END) AS pending_review,
         COUNT(DISTINCT CASE WHEN t.review_status='needs_revision' THEN t.task_id END) AS needs_revision,
         COUNT(DISTINCT CASE WHEN ts.status_name='in_progress' AND (t.review_status='none' OR t.review_status IS NULL) THEN t.task_id END) AS in_progress,
         ROUND(
           COALESCE(
             AVG(CASE WHEN t.approved_at IS NOT NULL
               THEN EXTRACT(EPOCH FROM (t.approved_at - t.created_at)) / 3600.0
               ELSE NULL END), 0
           )::numeric, 1
         ) AS avg_hours_per_task
       FROM users u
       JOIN roles r ON u.role_id = r.role_id
       JOIN task_assignments ta ON u.user_id = ta.assigned_to AND ta.is_active = true
       JOIN tasks t ON ta.task_id = t.task_id AND t.created_by = $1
       LEFT JOIN task_statuses ts ON t.status_id = ts.status_id
       WHERE r.role_name = 'member'
       GROUP BY u.user_id, u.full_name
       ORDER BY approved DESC, total_tasks DESC`,
      [req.user.id]
    );

    const report = result.rows.map(m => {
      const total    = parseInt(m.total_tasks);
      const approved = parseInt(m.approved);
      return {
        member_id:          m.user_id,
        name:               m.name,
        total_tasks:        total,
        completed:          approved,
        approved,
        pending_review:     parseInt(m.pending_review),
        needs_revision:     parseInt(m.needs_revision),
        in_progress:        parseInt(m.in_progress),
        avg_hours_per_task: parseFloat(m.avg_hours_per_task),
        performance_score:  total > 0 ? `${Math.round((approved / total) * 100)}%` : '0%'
      };
    });

    res.json(report);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getProjectReport, getMemberReport, getTeamReport };
