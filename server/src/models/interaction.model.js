const { query } = require('../config/db');

const Interaction = {
  createInquiry: async (name, email, message) => {
    const text = 'INSERT INTO inquiries (name, email, message) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, email, message];
    const { rows } = await query(text, values);
    return rows[0];
  },

  getAllInquiries: async () => {
    const text = 'SELECT * FROM inquiries ORDER BY created_at DESC';
    const { rows } = await query(text);
    return rows;
  },

  createTestimonial: async (userId, text) => {
    const textQuery = 'INSERT INTO testimonials (user_id, text) VALUES ($1, $2) RETURNING *';
    const values = [userId, text];
    const { rows } = await query(textQuery, values);
    return rows[0];
  },

  getApprovedTestimonials: async () => {
    const text = `
      SELECT t.*, u.name as user_name, u.avatar_url 
      FROM testimonials t 
      JOIN users u ON t.user_id = u.id 
      WHERE t.approved = TRUE 
      ORDER BY t.created_at DESC
    `;
    const { rows } = await query(text);
    return rows;
  },

  getAllTestimonials: async () => {
    const text = `
      SELECT t.*, u.name as user_name, u.email as user_email
      FROM testimonials t 
      JOIN users u ON t.user_id = u.id 
      ORDER BY t.created_at DESC
    `;
    const { rows } = await query(text);
    return rows;
  },

  approveTestimonial: async (id) => {
    const text = 'UPDATE testimonials SET approved = TRUE WHERE id = $1 RETURNING *';
    const values = [id];
    const { rows } = await query(text, values);
    return rows[0];
  }
};

module.exports = Interaction;
