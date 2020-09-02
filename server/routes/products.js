const pool = require("../db");
const router = require("express").Router();


router.get("/", async (req, res) => {
  const dbquery = "SELECT * FROM products";


    const allProducts = await pool.query(dbquery);
    res.json(allProducts.rows);

});

router.get("/:id", async (req, res) => {

  try {
   const {id} = req.params
   let product =  await pool.query ("SELECT * FROM products WHERE id = $1", [id])
   res.json(product.rows);
  } catch (error) {
      console.error (error.message)
      res.status(error.status).json("Something went wrong")
  }
});



module.exports = router;
