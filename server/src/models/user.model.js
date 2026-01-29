const { query } = require('../config/db');

const User = {
  create: async (name, email, passwordHash, phone, address, role = 'CUSTOMER') => {
    const text = 'INSERT INTO users(name, email, password_hash, phone, address, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING id, name, email, role, phone, address, created_at';
    const values = [name, email, passwordHash, phone, address, role];
    const { rows } = await query(text, values);
    return rows[0];
  },

  findByEmail: async (email) => {
    const text = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const { rows } = await query(text, values);
    return rows[0];
  },

  findByPhone: async (phone) => {
    const text = 'SELECT * FROM users WHERE phone = $1';
    const values = [phone];
    const { rows } = await query(text, values);
    return rows[0];
  },

  findById: async (id) => {
    const text = 'SELECT id, name, email, role, phone, address, created_at FROM users WHERE id = $1';
    const values = [id];
    const { rows } = await query(text, values);
    return rows[0];
  },

  getAll: async () => {
    const text = 'SELECT id, name, email, role, phone, address, created_at FROM users ORDER BY created_at DESC';
    const { rows } = await query(text);
    return rows;
  }
};

module.exports = User;
