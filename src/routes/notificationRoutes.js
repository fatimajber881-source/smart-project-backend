const express = require('express');
const router = express.Router();
const {
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount
} = require('../controllers/notificationController');
const { protect } = require('../middleware/auth');

// GET /api/notifications
router.get('/', protect, getMyNotifications);

// GET /api/notifications/unread-count
router.get('/unread-count', protect, getUnreadCount);

// PUT /api/notifications/read-all
router.put('/read-all', protect, markAllAsRead);

// PUT /api/notifications/:id/read
router.put('/:id/read', protect, markAsRead);

module.exports = router;