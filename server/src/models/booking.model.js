const { query } = require('../config/db');

const Booking = {
  create: async (userId, serviceId, planType, totalAmount, bookingDate, bookingTime, address, phone) => {
    const text = `
      INSERT INTO bookings (user_id, service_id, plan_type, total_amount, booking_date, booking_time, address, phone)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [userId, serviceId, planType, totalAmount, bookingDate, bookingTime, address, phone];
    const { rows } = await query(text, values);
    return rows[0];
  },

  getById: async (id) => {
    const text = 'SELECT * FROM bookings WHERE id = $1';
    const values = [id];
    const { rows } = await query(text, values);
    return rows[0];
  },

  getByUserId: async (userId) => {
    const text = `
      SELECT b.*, s.title as service_title 
      FROM bookings b 
      JOIN services s ON b.service_id = s.id 
      WHERE b.user_id = $1 
      ORDER BY b.created_at DESC
    `;
    const values = [userId];
    const { rows } = await query(text, values);
    return rows;
  },

  getAll: async () => {
    const text = `
      SELECT b.*, s.title as service_title, u.name as user_name, u.email as user_email
      FROM bookings b 
      JOIN services s ON b.service_id = s.id 
      JOIN users u ON b.user_id = u.id
      ORDER BY b.created_at DESC
    `;
    const { rows } = await query(text);
    return rows;
  },

  updateStatus: async (id, status) => {
    const text = 'UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *';
    const values = [status, id];
    const { rows } = await query(text, values);
    return rows[0];
  }
};

module.exports = Booking;
