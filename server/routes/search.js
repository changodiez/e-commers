const pool = require("../db");
const router = require("express").Router();

router.get("/", async (req, res) => {
  const { name } = req.query

  const searchProducts = await pool.query("SELECT * FROM products WHERE product_name ILIKE $1;",[`%${name}%`]);
  res.json(searchProducts.rows);
});


module.exports = router;
