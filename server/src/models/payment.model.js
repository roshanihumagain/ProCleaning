const { query } = require('../config/db');

const Payment = {
  create: async (bookingId, amount, pidx, status = 'INITIATED') => {
    const text = `
      INSERT INTO payments (booking_id, amount, pidx, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [bookingId, amount, pidx, status];
    const { rows } = await query(text, values);
    return rows[0];
  },

  getByPidx: async (pidx) => {
    const text = 'SELECT * FROM payments WHERE pidx = $1';
    const values = [pidx];
    const { rows } = await query(text, values);
    return rows[0];
  },

  updateStatus: async (pidx, status, rawResponse, verifiedAt = null) => {
    const text = `
      UPDATE payments 
      SET status = $1, raw_response = $2, verified_at = $3 
      WHERE pidx = $4 
      RETURNING *
    `;
    const values = [status, rawResponse, verifiedAt, pidx];
    const { rows } = await query(text, values);
    return rows[0];
  }
};

module.exports = Payment;
