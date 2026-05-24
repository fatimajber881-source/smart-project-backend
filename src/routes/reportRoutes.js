const express = require('express');
const router = express.Router();
const {
  getProjectReport,
  getMemberReport,
  getTeamReport
} = require('../controllers/reportController');
const { protect, leaderOnly } = require('../middleware/auth');

/**
 * @swagger
 * /api/reports/project/{id}:
 *   get:
 *     summary: Get project report (Leader only)
 *     tags: [Reports]
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
 *         description: Project report
 */
router.get('/project/:id', protect, leaderOnly, getProjectReport);

/**
 * @swagger
 * /api/reports/member/{id}:
 *   get:
 *     summary: Get member report (Leader only)
 *     tags: [Reports]
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
 *         description: Member report
 */
router.get('/member/:id', protect, leaderOnly, getMemberReport);

/**
 * @swagger
 * /api/reports/team:
 *   get:
 *     summary: Get team report (Leader only)
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Team report
 */
router.get('/team', protect, leaderOnly, getTeamReport);

module.exports = router;