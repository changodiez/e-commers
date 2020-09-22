const pool = require("../db");
const router = require("express").Router();


//=====================================
router.get("/cart", async (req, res) => {

  const dbquery =
    "SELECT * FROM PRODUCTS WHERE CATEGORY = 'men clothing' OR CATEGORY = 'women clothing' OR CATEGORY='jewelery'";

  const allProducts = await pool.query(dbquery);
  res.json(allProducts.rows);

});

//=======================

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const dbquery =
    "SELECT * FROM PRODUCTS WHERE CATEGORY = 'men clothing' OR CATEGORY = 'women clothing' OR CATEGORY='jewelery'";

  const allProducts = await pool.query(dbquery);
  res.json(allProducts.rows);
});

//GET SPECIFIC PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    res.json(product.rows);
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json("Something went wrong");
  }
});

//GET PRODUCTS ACCORDING TO CATEGORIES (right now men or women)
router.get("/category/:category", (req, res) => {
  const category = req.params.category;
  const dbQuery = `SELECT * FROM PRODUCTS WHERE CATEGORY=$1`;

  if (category === "men") {
    pool
      .query(dbQuery, ["men clothing"])
      .then((response) => {
        return res.json(response.rows);
      })
      .catch((err) => {
        console.error(err);
        return res.status(err.status).json("Something went wrong");
      });
  } else if (category === "women") {
    pool
      .query(dbQuery, ["women clothing"])
      .then((response) => {
        return res.json(response.rows);
      })
      .catch((err) => {
        console.error(err);
        return res.status(err.status).json("Something went wrong");
      });
  }
});

module.exports = router;