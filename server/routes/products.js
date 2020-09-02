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

router.get("/:id", async (req, res) => {

  try {
   const {id} = req.params
   const product =  await pool.query ("SELECT * FROM products WHERE id = $1", [id])
   res.json(product.rows);
  } catch (error) {
      console.error (error.message)
      res.status(error.status).json("Something went wrong")
  }
});

router.get("/:men", async (req, res) => {

  try {
    const {men} = "men clothing"
      const menProducts =  await pool.query ("SELECT * FROM products WHERE category = $1", [men])
   res.json(menProducts.rows);
  } catch (error) {
      console.error (error.message)
      res.status(error.status).json("Something went wrong")
  }
});



module.exports = router;
