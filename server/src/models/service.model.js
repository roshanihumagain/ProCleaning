const { query } = require('../config/db');

const Service = {
  getAll: async () => {
    const text = 'SELECT * FROM services ORDER BY created_at ASC';
    const { rows } = await query(text);
    return rows;
  },

  getById: async (id) => {
    const text = 'SELECT * FROM services WHERE id = $1';
    const values = [id];
    const { rows } = await query(text, values);
    return rows[0];
  },

  create: async (title, description, price_hourly, price_daily, image_url) => {
    const text = 'INSERT INTO services(title, description, price_hourly, price_daily, image_url) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const values = [title, description, price_hourly, price_daily, image_url];
    const { rows } = await query(text, values);
    return rows[0];
  },

  update: async (id, title, description, price_hourly, price_daily, image_url) => {
    const text = 'UPDATE services SET title = $1, description = $2, price_hourly = $3, price_daily = $4, image_url = $5 WHERE id = $6 RETURNING *';
    const values = [title, description, price_hourly, price_daily, image_url, id];
    const { rows } = await query(text, values);
    return rows[0];
  },

  delete: async (id) => {
    const text = 'DELETE FROM services WHERE id = $1';
    const values = [id];
    await query(text, values);
    return { message: 'Service deleted successfully' };
  }
};

module.exports = Service;
