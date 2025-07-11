// TechCare Helpdesk Backend
// © 2025 Isaac Zachary. All rights reserved.
const { pool } = require('../config/db');

/**
 * @desc List all users (admin/superadmin only)
 * @route GET /api/users
 * @access Private (admin, superadmin)
 */
exports.listUsers = async (req, res, next) => {
  try {
    const users = await pool.query('SELECT id, name, email, role, created_at, updated_at FROM users');
    res.json(users.rows);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Change user role (superadmin only)
 * @route PATCH /api/users/:id/role
 * @access Private (superadmin)
 */
exports.changeUserRole = async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    await pool.query('UPDATE users SET role = $1, updated_at = $2 WHERE id = $3', [role, new Date(), id]);
    res.json({ message: 'User role updated' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Placeholder for activity logs (admin panel)
 * @route GET /api/users/activity-logs
 * @access Private (admin, superadmin)
 */
exports.getActivityLogs = async (req, res, next) => {
  // Placeholder: Return empty array or mock data
  res.json([]);
}; 