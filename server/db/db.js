require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.AWSPGUSER,
  database: process.env.AWSPGDATABASE,
  password: process.env.AWSPGPASSWORD,
  port: process.env.AWSPGPORT,
  host: process.env.AWSPGHOST,
});
// const pool = new Pool({
//   user: process.env.PGUSER,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
//   host: process.env.PGHOST,
// });

module.exports = { pool };
