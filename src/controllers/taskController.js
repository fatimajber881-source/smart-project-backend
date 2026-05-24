require('dotenv').config();
const pool = require('../config/db');
const path = require('path');
const fs   = require('fs');

const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

const getTasks = async (req, res) => {
  const { id, role } = req.user;
  try {
    let result;
    if (role === 'leader') {
      result = await pool.query(
        `SELECT t.*, ts.status_name, u.full_name AS assigned_to_name, p.project_name
         FROM tasks t
         JOIN task_statuses ts ON t.status_id = ts.status_id
         LEFT JOIN task_assignments ta ON t.task_id = ta.task_id AND ta.is_active = true
         LEFT JOIN users u ON ta.assigned_to = u.user_id
         LEFT JOIN projects p ON t.project_id = p.project_id
         ORDER BY CASE t.priority WHEN 'Urgent' THEN 1 WHEN 'High' THEN 2 WHEN 'Medium' THEN 3 WHEN 'Low' THEN 4 ELSE 5 END, t.task_id ASC`
      );
    } else {
      result = await pool.query(
        `SELECT t.*, ts.status_name, p.project_name
         FROM tasks t
         JOIN task_assignments ta ON t.task_id = ta.task_id
         JOIN task_statuses ts ON t.status_id = ts.status_id
         LEFT JOIN projects p ON t.project_id = p.project_id
         WHERE ta.assigned_to = $1 AND ta.is_active = true
         ORDER BY CASE t.priority WHEN 'Urgent' THEN 1 WHEN 'High' THEN 2 WHEN 'Medium' THEN 3 WHEN 'Low' THEN 4 ELSE 5 END, t.task_id ASC`, [id]
      );
    }
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, ts.status_name, u.full_name AS assigned_to_name, p.project_name
       FROM tasks t
       JOIN task_statuses ts ON t.status_id = ts.status_id
       LEFT JOIN task_assignments ta ON t.task_id = ta.task_id AND ta.is_active = true
       LEFT JOIN users u ON ta.assigned_to = u.user_id
       LEFT JOIN projects p ON t.project_id = p.project_id
       WHERE t.task_id = $1`, [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createTask = async (req, res) => {
  const { title, description, project_id, assigned_to, complexity_level, deadline, priority } = req.body;
  if (!title || !project_id || !assigned_to)
    return res.status(400).json({ message: 'Title, project_id, and assigned_to are required' });

  const taskPriority = PRIORITIES.includes(priority) ? priority : 'Medium';
  try {
    const taskResult = await pool.query(
      `INSERT INTO tasks (title, description, project_id, created_by, complexity_level, deadline, status_id, priority)
       VALUES ($1,$2,$3,$4,$5,$6,1,$7) RETURNING *`,
      [title, description || '', project_id, req.user.id, complexity_level || 3, deadline || null, taskPriority]
    );
    const task = taskResult.rows[0];

    await pool.query(
      `INSERT INTO task_assignments (task_id, assigned_to, assigned_by) VALUES ($1,$2,$3)`,
      [task.task_id, assigned_to, req.user.id]
    );

    const projectResult = await pool.query(`SELECT project_name FROM projects WHERE project_id=$1`, [project_id]);
    const projectName   = projectResult.rows[0]?.project_name || 'a project';
    const deadlineStr   = deadline ? ` Deadline: ${new Date(deadline).toLocaleDateString('en-GB')}` : '';
    const priorityEmoji = { Low:'🟢', Medium:'🟡', High:'🟠', Urgent:'🔴' }[taskPriority];

    await pool.query(
      `INSERT INTO notifications (user_id, task_id, title, message) VALUES ($1,$2,$3,$4)`,
      [assigned_to, task.task_id,
       `New Task Assigned: ${title}`,
       `You have been assigned "${title}" in project "${projectName}". Priority: ${priorityEmoji} ${taskPriority}.${deadlineStr} Start working now!`]
    );

    // Return task with project_name included
    res.status(201).json({ ...task, project_name: projectName });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateProgress = async (req, res) => {
  const { progress } = req.body;
  if (progress < 0 || progress > 100)
    return res.status(400).json({ message: 'Progress must be between 0 and 100' });
  try {
    const check = await pool.query(`SELECT review_status FROM tasks WHERE task_id=$1`, [req.params.id]);
    const rs = check.rows[0]?.review_status;
    if (rs === 'pending_review') return res.status(400).json({ message: 'Task is awaiting leader review.' });
    if (rs === 'approved')       return res.status(400).json({ message: 'Task is already approved.' });
    const status_id = progress === 0 ? 1 : 2;
    const result = await pool.query(
      `UPDATE tasks SET progress_percentage=$1, status_id=$2 WHERE task_id=$3 RETURNING *`,
      [progress, status_id, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const submitTask = async (req, res) => {
  const taskId               = req.params.id;
  const submission_note      = req.body?.submission_note || '';
  const submissionFile       = req.file ? req.file.filename     : '';
  const submissionFileOriginal = req.file ? req.file.originalname : '';

  try {
    const result = await pool.query(
      `UPDATE tasks SET
         status_id=2, progress_percentage=100,
         review_status='pending_review', review_comment='',
         submission_note=$1, submission_file=$2,
         submission_file_original=$3, submitted_at=NOW()
       WHERE task_id=$4 RETURNING *`,
      [submission_note, submissionFile, submissionFileOriginal, taskId]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    const task = result.rows[0];

    if (task.created_by) {
      const fileStr = submissionFileOriginal ? ` File: "${submissionFileOriginal}".` : '';
      await pool.query(
        `INSERT INTO notifications (user_id,task_id,title,message) VALUES ($1,$2,$3,$4)`,
        [task.created_by, task.task_id,
         `Task Submitted for Review: ${task.title}`,
         `A member submitted "${task.title}" and is awaiting your review.${fileStr} Check the Review tab.`]
      );
    }
    res.json({ message: 'Task submitted for review successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const reviewTask = async (req, res) => {
  const { decision, comment } = req.body;
  const taskId = req.params.id;
  if (!['approved', 'needs_revision'].includes(decision))
    return res.status(400).json({ message: 'decision must be "approved" or "needs_revision"' });

  try {
    let result;
    if (decision === 'approved') {
      const statusRes    = await pool.query(`SELECT status_id FROM task_statuses WHERE status_name='completed' LIMIT 1`);
      const completedId  = statusRes.rows[0]?.status_id || 3;
      result = await pool.query(
        `UPDATE tasks SET review_status='approved', review_comment=$1,
           status_id=$2, progress_percentage=100, approved_at=NOW()
         WHERE task_id=$3 RETURNING *`,
        [comment || '', completedId, taskId]
      );
    } else {
      result = await pool.query(
        `UPDATE tasks SET review_status='needs_revision', review_comment=$1, status_id=2
         WHERE task_id=$2 RETURNING *`,
        [comment || '', taskId]
      );
    }
    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    const task = result.rows[0];

    const assignRes = await pool.query(
      `SELECT assigned_to FROM task_assignments WHERE task_id=$1 AND is_active=true LIMIT 1`, [taskId]
    );
    const memberId = assignRes.rows[0]?.assigned_to;
    if (memberId) {
      const notif = decision === 'approved'
        ? { title: `Task Approved: ${task.title}`,      message: `Great work! "${task.title}" was approved.` }
        : { title: `Revision Required: ${task.title}`,  message: `Leader requested revisions: "${comment || 'Please review and resubmit.'}"` };
      await pool.query(
        `INSERT INTO notifications (user_id,task_id,title,message) VALUES ($1,$2,$3,$4)`,
        [memberId, task.task_id, notif.title, notif.message]
      );
    }
    res.json({ message: decision === 'approved' ? 'Task approved' : 'Revision requested', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getTaskFile = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT submission_file, submission_file_original FROM tasks WHERE task_id=$1`, [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    const { submission_file, submission_file_original } = result.rows[0];
    if (!submission_file) return res.status(404).json({ message: 'No file attached' });
    const filePath = path.join(__dirname, '..', 'uploads', submission_file);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File not found on server' });
    res.download(filePath, submission_file_original || submission_file);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateTask = async (req, res) => {
  const { title, description, deadline, complexity_level, assigned_to, priority } = req.body;
  const taskPriority = priority && PRIORITIES.includes(priority) ? priority : undefined;
  try {
    const result = await pool.query(
      `UPDATE tasks SET
         title=COALESCE($1,title), description=COALESCE($2,description),
         deadline=COALESCE($3,deadline), complexity_level=COALESCE($4,complexity_level),
         priority=COALESCE($5,priority)
       WHERE task_id=$6 RETURNING *`,
      [title, description, deadline || null, complexity_level, taskPriority || null, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    if (assigned_to) {
      await pool.query(`UPDATE task_assignments SET is_active=false WHERE task_id=$1`, [req.params.id]);
      await pool.query(
        `INSERT INTO task_assignments (task_id,assigned_to,assigned_by) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING`,
        [req.params.id, assigned_to, req.user.id]
      );
      const task = result.rows[0];
      const pr   = await pool.query(`SELECT project_name FROM projects WHERE project_id=$1`, [task.project_id]);
      await pool.query(
        `INSERT INTO notifications (user_id,task_id,title,message) VALUES ($1,$2,$3,$4)`,
        [assigned_to, task.task_id,
         `Task Reassigned: ${task.title}`,
         `Task "${task.title}" in project "${pr.rows[0]?.project_name}" has been reassigned to you.`]
      );
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateDeadline = async (req, res) => {
  const { deadline } = req.body;
  if (!deadline) return res.status(400).json({ message: 'Deadline is required' });
  try {
    const result = await pool.query(
      `UPDATE tasks SET deadline=$1 WHERE task_id=$2 RETURNING *`, [deadline, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Task not found' });
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// delete task and all related records to avoid foreign key errors
const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    await client.query('DELETE FROM task_assignments WHERE task_id = $1', [taskId]);
    await client.query('DELETE FROM notifications  WHERE task_id = $1',   [taskId]).catch(() => {});
    await client.query('DELETE FROM time_logs       WHERE task_id = $1',   [taskId]).catch(() => {});

    const result = await client.query(
      'DELETE FROM tasks WHERE task_id = $1 RETURNING *', [taskId]
    );
    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ message: 'Task not found' });
    }

    await client.query('COMMIT');
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ message: 'Server error', error: error.message });
  } finally {
    client.release();
  }
};

module.exports = {
  getTasks, getTaskById, createTask, updateProgress,
  updateTask, updateDeadline, submitTask,
  reviewTask, getTaskFile, deleteTask
};