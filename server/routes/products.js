const pool = require("../db");
const router = require("express").Router();


router.get("/", async (req, res) => {
  const dbquery = "SELECT * FROM products";

  try {
    const allProducts = await pool.query(dbquery);
    res.json(allProducts.rows);
  } catch (error) {
      console.error (error.message)
      res.status(error.status).json("Something went wrong")
  }
});


module.exports = router;
