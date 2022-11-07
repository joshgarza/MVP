require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: 'joshgarza',
  database: 'trainer',
  password: '',
  port: 5432,
  host: 'localhost',
});

module.exports = { pool };