const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectMembersScore,
  getProjectTasks
} = require('../controllers/projectController');
const { protect, leaderOnly } = require('../middleware/auth');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get('/', protect, getProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
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
 *         description: Project details
 *       404:
 *         description: Project not found
 */
router.get('/:id', protect, getProjectById);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project (Leader only)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               start_date:
 *                 type: string
 *               end_date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Project created
 */
router.post('/', protect, leaderOnly, createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project (Leader only)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Project updated
 */
router.put('/:id', protect, leaderOnly, updateProject);

/**
 * @swagger
 * /api/projects/{id}/members-score:
 *   get:
 *     summary: Get members score for a project (Leader only)
 *     tags: [Projects]
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
 *         description: Ranked list of members with scores
 */
router.get('/:id/members-score', protect, leaderOnly, getProjectMembersScore);

/**
 * @swagger
 * /api/projects/{id}/tasks:
 *   get:
 *     summary: Get tasks for a specific project
 *     tags: [Projects]
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
 *         description: List of tasks in the project
 */
router.get('/:id/tasks', protect, getProjectTasks);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project (Leader only)
 *     tags: [Projects]
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
 *         description: Project deleted
 */
router.delete('/:id', protect, leaderOnly, deleteProject);

/**
 * @swagger
 * /api/projects/{id}/scores:
 *   get:
 *     summary: Get member scores for a project (Leader only)
 *     tags: [Projects]
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
 *         description: Ranked member scores
 */
router.get('/:id/scores', protect, leaderOnly, getProjectMembersScore);

module.exports = router;