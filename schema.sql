 CREATE TABLE IF NOT EXISTS roles (
  role_id   SERIAL PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL
);

INSERT INTO roles (role_name) VALUES ('leader'), ('member')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS users (
  user_id       SERIAL PRIMARY KEY,
  full_name     VARCHAR(255) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role_id       INTEGER REFERENCES roles(role_id),
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  project_id   SERIAL PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  description  TEXT,
  leader_id    INTEGER REFERENCES users(user_id),
  start_date   DATE,
  end_date     DATE,
  status       VARCHAR(50) DEFAULT 'active',
  created_at   TIMESTAMP DEFAULT NOW(),
  updated_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_members (
  id         SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(project_id),
  user_id    INTEGER REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS task_statuses (
  status_id   SERIAL PRIMARY KEY,
  status_name VARCHAR(50) NOT NULL
);

INSERT INTO task_statuses (status_name) VALUES ('not_started'), ('in_progress'), ('completed')
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS tasks (
  task_id                  SERIAL PRIMARY KEY,
  title                    VARCHAR(255) NOT NULL,
  description              TEXT,
  project_id               INTEGER REFERENCES projects(project_id),
  created_by               INTEGER REFERENCES users(user_id),
  complexity_level         INTEGER DEFAULT 3,
  priority_level           INTEGER DEFAULT 3,
  deadline                 TIMESTAMP,
  status_id                INTEGER DEFAULT 1 REFERENCES task_statuses(status_id),
  progress_percentage      NUMERIC DEFAULT 0,
  estimated_hours          NUMERIC,
  actual_hours             NUMERIC DEFAULT 0,
  created_at               TIMESTAMP DEFAULT NOW(),
  updated_at               TIMESTAMP DEFAULT NOW(),
  start_date               DATE,
  submission_note          TEXT DEFAULT '',
  submitted_at             TIMESTAMP,
  leader_score             INTEGER,
  leader_feedback          TEXT DEFAULT '',
  scored_at                TIMESTAMP,
  priority                 VARCHAR(20) DEFAULT 'Medium',
  review_status            VARCHAR(30) DEFAULT 'none',
  review_comment           TEXT DEFAULT '',
  submission_file          VARCHAR(500) DEFAULT '',
  submission_file_original VARCHAR(500) DEFAULT '',
  approved_at              TIMESTAMP
);

CREATE TABLE IF NOT EXISTS task_assignments (
  assignment_id SERIAL PRIMARY KEY,
  task_id       INTEGER REFERENCES tasks(task_id),
  assigned_to   INTEGER REFERENCES users(user_id),
  assigned_by   INTEGER REFERENCES users(user_id),
  assigned_at   TIMESTAMP DEFAULT NOW(),
  is_active     BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS notifications (
  notification_id SERIAL PRIMARY KEY,
  user_id         INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
  task_id         INTEGER REFERENCES tasks(task_id) ON DELETE SET NULL,
  title           VARCHAR(255) NOT NULL,
  message         TEXT NOT NULL,
  is_read         BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS time_logs (
  time_log_id      SERIAL PRIMARY KEY,
  task_id          INTEGER REFERENCES tasks(task_id),
  user_id          INTEGER REFERENCES users(user_id),
  start_time       TIMESTAMP NOT NULL,
  end_time         TIMESTAMP,
  duration_minutes NUMERIC,
  created_at       TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS task_files (
  file_id     SERIAL PRIMARY KEY,
  task_id     INTEGER NOT NULL REFERENCES tasks(task_id),
  user_id     INTEGER NOT NULL REFERENCES users(user_id),
  file_name   VARCHAR(255) NOT NULL,
  file_path   VARCHAR(255) NOT NULL,
  file_size   INTEGER,
  mime_type   VARCHAR(100),
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS performance_snapshots (
  snapshot_id        SERIAL PRIMARY KEY,
  project_id         INTEGER REFERENCES projects(project_id),
  user_id            INTEGER REFERENCES users(user_id),
  total_tasks        INTEGER DEFAULT 0,
  completed_tasks    INTEGER DEFAULT 0,
  avg_progress       NUMERIC DEFAULT 0,
  total_time_minutes NUMERIC DEFAULT 0,
  avg_complexity     NUMERIC DEFAULT 0,
  performance_score  NUMERIC DEFAULT 0,
  snapshot_date      TIMESTAMP DEFAULT NOW()
);
