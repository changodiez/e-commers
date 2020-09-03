const { Pool } = require("pg");

const pool = new Pool({
  user: "migracode",
  host: "localhost",
  database: "migracode_project",
  password: "occlaptop1",
  port: 5432,
});

module.exports = pool;
