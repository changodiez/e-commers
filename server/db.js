const { Pool } = require("pg");

const pool = new Pool({
  user: "migracode",
  host: "localhost",
  database: "etailor",
  password: "password",
  port: 5432,
});

