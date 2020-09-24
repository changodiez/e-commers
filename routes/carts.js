const pool = require("../db");
const router = require("express").Router();
const authorize = require("../middleware/authorize");

//===============================Get Order items============================

router.get("/", authorize, async (req, res) => {
  try {
    const { id } = req.user;
    const updateQuery =
    "SELECT order_items.quantity, order_items.id, products.product_name, products.unit_price, products.image FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id INNER JOIN products ON products.id=order_items.product_id WHERE customers.id=$1 AND orders.status=$2";
  const products = await pool.query(updateQuery, [id, "FALSE"]);

    res.json(products.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Server error");
  }
});

router.get("/orderID",authorize, async (req, res) => { 
  try {
    const { id } =  req.user;
    const updateQuery =
    "SELECT id FROM orders WHERE customer_id=$1 AND status=$2";
  const products = await pool.query(updateQuery, [id, "FALSE"]);

    res.json(products.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Server error");
  }
});

//ADD a product to ORDER
router.post("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  const { qty, orderID } = req.body;
  console.log(req.body)

  try {
    const insertQuery = "INSERT INTO order_items ( order_id, product_id, quantity ) VALUES ($1, $2, $3 )";
    const newUser = await pool.query(insertQuery, [orderID, id, qty]);
    return res.status(200).json("Order added succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});


//create order
router.post("/neworder/:id", async (req, res) => {
  const {
    id
  } = req.params;
  try {
    console.log(id);
    const insertQuery = "INSERT INTO orders (customer_id ) VALUES ($1)";
    const newUser = await pool.query(insertQuery, [id]);
    return res.status(200).json("Order added succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});


//if we need an update endpoint
router.put("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const insertQuery = "";
    const newUser = await pool.query(insertQuery, [id]);
    return res.status(200).json("order created succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});
//delete endpoint
router.delete("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const insertQuery = "DELETE FROM order_items WHERE id=($1)";
    const newUser = await pool.query(insertQuery, [id]);
    return res.status(200).json("order deleted succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

module.exports = router;