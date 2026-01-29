const app = require('./src/app');
const { pool } = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Test DB connection and start server
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(-1);
  } else {
    console.log('Database connection successful:', res.rows[0].now);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
