// TechCare Helpdesk Backend
// © 2025 Isaac Zachary. All rights reserved.
const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

/**
 * @desc Create a new ticket
 * @route POST /api/tickets
 * @access Private
 */
exports.createTicket = async (req, res, next) => {
  const { title, description, priority, assigned_to } = req.body;
  const created_by = req.user.id;
  try {
    const id = uuidv4();
    const status = 'open';
    const created_at = new Date();
    const updated_at = new Date();
    await pool.query(
      'INSERT INTO tickets (id, title, description, priority, status, assigned_to, created_by, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
      [id, title, description, priority, status, assigned_to, created_by, created_at, updated_at]
    );
    // TODO: Trigger email notification here
    res.status(201).json({ message: 'Ticket created', id });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Get all tickets (with filter, pagination, search)
 * @route GET /api/tickets
 * @access Private
 */
exports.getTickets = async (req, res, next) => {
  const { status, priority, search, page = 1, limit = 10 } = req.query;
  let query = 'SELECT * FROM tickets WHERE 1=1';
  const params = [];
  let idx = 1;
  if (status) { query += ` AND status = $${idx++}`; params.push(status); }
  if (priority) { query += ` AND priority = $${idx++}`; params.push(priority); }
  if (search) { query += ` AND (title ILIKE $${idx} OR description ILIKE $${idx})`; params.push(`%${search}%`); idx++; }
  query += ' ORDER BY created_at DESC';
  query += ` LIMIT $${idx++} OFFSET $${idx}`;
  params.push(Number(limit), (Number(page) - 1) * Number(limit));
  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Get ticket by ID
 * @route GET /api/tickets/:id
 * @access Private
 */
exports.getTicketById = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM tickets WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Ticket not found' });
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Update ticket
 * @route PUT /api/tickets/:id
 * @access Private
 */
exports.updateTicket = async (req, res, next) => {
  const { title, description, priority, status, assigned_to } = req.body;
  try {
    const updated_at = new Date();
    await pool.query(
      'UPDATE tickets SET title=$1, description=$2, priority=$3, status=$4, assigned_to=$5, updated_at=$6 WHERE id=$7',
      [title, description, priority, status, assigned_to, updated_at, req.params.id]
    );
    // TODO: Trigger email notification here
    res.json({ message: 'Ticket updated' });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Delete ticket
 * @route DELETE /api/tickets/:id
 * @access Private
 */
exports.deleteTicket = async (req, res, next) => {
  try {
    await pool.query('DELETE FROM tickets WHERE id = $1', [req.params.id]);
    res.json({ message: 'Ticket deleted' });
  } catch (err) {
    next(err);
  }
};

// --- Comments ---
/**
 * @desc Add comment to ticket
 * @route POST /api/tickets/:id/comments
 * @access Private
 */
exports.addComment = async (req, res, next) => {
  const { content } = req.body;
  const ticket_id = req.params.id;
  const user_id = req.user.id;
  try {
    const id = uuidv4();
    const created_at = new Date();
    await pool.query(
      'INSERT INTO comments (id, ticket_id, user_id, content, created_at) VALUES ($1, $2, $3, $4, $5)',
      [id, ticket_id, user_id, content, created_at]
    );
    res.status(201).json({ message: 'Comment added', id });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Get comments for a ticket
 * @route GET /api/tickets/:id/comments
 * @access Private
 */
exports.getComments = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM comments WHERE ticket_id = $1 ORDER BY created_at ASC', [req.params.id]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
}; 