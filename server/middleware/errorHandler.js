// TechCare Helpdesk Backend
// © 2025 Isaac Zachary. All rights reserved.
// middleware/errorHandler.js
/**
 * Express error handling middleware
 */
exports.errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Server Error' });
}; 