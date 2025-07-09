// routes/users.js
const express = require('express');
const { listUsers, changeUserRole, getActivityLogs } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

/**
 * @route   GET /api/users
 * @desc    List all users (admin/superadmin only)
 * @access  Private (admin, superadmin)
 */
router.get('/', protect, authorize('admin', 'superadmin'), listUsers);

/**
 * @route   PATCH /api/users/:id/role
 * @desc    Change user role (superadmin only)
 * @access  Private (superadmin)
 */
router.patch('/:id/role', protect, authorize('superadmin'), changeUserRole);

/**
 * @route   GET /api/users/activity-logs
 * @desc    Placeholder for activity logs (admin panel)
 * @access  Private (admin, superadmin)
 */
router.get('/activity-logs', protect, authorize('admin', 'superadmin'), getActivityLogs);

module.exports = router; 