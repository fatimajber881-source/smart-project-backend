const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const {
  getTasks, getTaskById, createTask, updateProgress,
  updateTask, updateDeadline, submitTask,
  reviewTask, getTaskFile, deleteTask
} = require('../controllers/taskController');
const { protect, leaderOnly } = require('../middleware/auth');

// ── Multer ──────────────────────────────────────────────────────
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename:    (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `task-${req.params.id}-${Date.now()}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /pdf|doc|docx|txt|png|jpg|jpeg|gif|zip|xlsx|pptx/i;
    if (allowed.test(path.extname(file.originalname).slice(1))) cb(null, true);
    else cb(new Error('File type not allowed'));
  }
});

// ── Routes ──────────────────────────────────────────────────────
router.get('/',    protect, getTasks);
router.get('/:id', protect, getTaskById);
router.post('/',   protect, leaderOnly, createTask);

router.put('/:id/progress', protect, updateProgress);

// submit — multer يعالج multipart/form-data
router.put('/:id/submit', protect, upload.single('file'), submitTask);

// review — leader فقط
router.put('/:id/review',  protect, leaderOnly, reviewTask);

// تحميل الملف
router.get('/:id/file', protect, leaderOnly, getTaskFile);

router.put('/:id/deadline', protect, leaderOnly, updateDeadline);
router.put('/:id',          protect, leaderOnly, updateTask);
router.delete('/:id',       protect, leaderOnly, deleteTask);

module.exports = router;
