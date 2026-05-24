const express = require('express');
const router = express.Router();
const { getMe, getAllUsers, getMemberTasks } = require('../controllers/userController');
const { protect, leaderOnly } = require('../middleware/auth');

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get my profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 *       401:
 *         description: Not authorized
 */
router.get('/me', protect, getMe);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Leader only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       403:
 *         description: Access denied
 */
router.get('/', protect, leaderOnly, getAllUsers);

/**
 * @swagger
 * /api/users/{id}/tasks:
 *   get:
 *     summary: Get tasks assigned to a specific member (Leader only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of member tasks
 */
router.get('/:id/tasks', protect, leaderOnly, getMemberTasks);

module.exports = router;