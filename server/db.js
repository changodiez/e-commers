const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "etailor",
  password: "Bird14",
  port: 5432,
});

module.exports = pool;
