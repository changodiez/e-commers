const pool = require("../db");
const router = require("express").Router();
//GET ALL PRODUCTS
router.get("/", async (req, res) => {

  const  { name }  = req.query

  if (name === undefined){
    const dbquery =
    "SELECT * FROM PRODUCTS WHERE CATEGORY = 'men clothing' OR CATEGORY = 'women clothing' OR CATEGORY='jewelery';";

  const allProducts = await pool.query(dbquery);
  res.json(allProducts.rows);
  } else if (name != undefined ) {

    if(name === "men") {
      const dbQuery = `SELECT * FROM PRODUCTS WHERE CATEGORY=$1`;
      pool
            .query(dbQuery, ["men clothing"])
            .then((response) => {
              return res.json(response.rows);
            })
            .catch((err) => {
              console.error(err);
              return res.status(err.status).json("Something went wrong");
            });
    }

   else if(name === "women") {
    const dbQuery = `SELECT * FROM PRODUCTS WHERE CATEGORY=$1`;
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

   else {  const searchProducts = await pool.query("SELECT * FROM products WHERE product_name ILIKE $1;",[`%${name}%`]);
   res.json(searchProducts.rows);}
  
  }

 

  
});

//GET SPECIFIC PRODUCT
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    res.json(product.rows);
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json("Something went wrong");
  }
});


module.exports = router;