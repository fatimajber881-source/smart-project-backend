const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

pool.connect()
  .then(() => {
    console.log('✅ PostgreSQL Connected');
    return pool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        notification_id SERIAL PRIMARY KEY,
        user_id     INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
        task_id     INTEGER REFERENCES tasks(task_id) ON DELETE SET NULL,
        title       VARCHAR(255) NOT NULL,
        message     TEXT NOT NULL,
        is_read     BOOLEAN DEFAULT FALSE,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
  })
  // ─── columns ──────────────────────────────────────────────────
  .then(() => pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS submission_note TEXT DEFAULT ''`))
  .then(() => pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP`))
  .then(() => pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'Medium'`))
  .then(() => pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS review_status VARCHAR(30) DEFAULT 'none'`))
  .then(() => pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS review_comment TEXT DEFAULT ''`))
  .then(() => pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS submission_file VARCHAR(500) DEFAULT ''`))
  .then(() => pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS submission_file_original VARCHAR(500) DEFAULT ''`))
  // ─── approved_at: وقت موافقة القائد — يُستخدم لحساب مدة الإنجاز ───
  .then(() => pool.query(`ALTER TABLE tasks ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP`))
  .then(() => console.log('✅ DB schema ready'))
  .catch(err => console.error('❌ DB Error:', err.message));

module.exports = pool;
