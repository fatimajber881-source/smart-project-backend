require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const reportRoutes = require('./routes/reportRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://smart-project-frontend1.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// ── Serve uploaded files (task submissions) ──────────────────────
// Files are protected — only authenticated users should download via the /api/tasks/:id/file route.
// This static folder is NOT publicly exposed; keep it for internal reference.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Swagger ──────────────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Routes ──────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.json({ message: '⚡ Smart Project API is running' });
});

module.exports = app;
