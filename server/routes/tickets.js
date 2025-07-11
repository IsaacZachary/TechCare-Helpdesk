// TechCare Helpdesk Backend
// © 2025 Isaac Zachary. All rights reserved.
// routes/tickets.js
const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  addComment,
  getComments,
} = require('../controllers/ticketController');
const router = express.Router();

/**
 * @route   POST /api/tickets
 * @desc    Create a new ticket
 * @access  Private (user, admin, superadmin)
 */
router.post('/', protect, createTicket);

/**
 * @route   GET /api/tickets
 * @desc    Get all tickets (with filter, pagination, search)
 * @access  Private (user, admin, superadmin)
 */
router.get('/', protect, getTickets);

/**
 * @route   GET /api/tickets/:id
 * @desc    Get ticket by ID
 * @access  Private (user, admin, superadmin)
 */
router.get('/:id', protect, getTicketById);

/**
 * @route   PUT /api/tickets/:id
 * @desc    Update ticket
 * @access  Private (owner, admin, superadmin)
 */
router.put('/:id', protect, updateTicket);

/**
 * @route   DELETE /api/tickets/:id
 * @desc    Delete ticket
 * @access  Private (owner, admin, superadmin)
 */
router.delete('/:id', protect, deleteTicket);

// Optional: Comments
/**
 * @route   POST /api/tickets/:id/comments
 * @desc    Add comment to ticket
 * @access  Private (user, admin, superadmin)
 */
router.post('/:id/comments', protect, addComment);

/**
 * @route   GET /api/tickets/:id/comments
 * @desc    Get comments for a ticket
 * @access  Private (user, admin, superadmin)
 */
router.get('/:id/comments', protect, getComments);

module.exports = router; 