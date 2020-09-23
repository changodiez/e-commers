const pool = require("../db");
const router = require("express").Router();

//===============================Get Order items============================
router.get("/", async (req, res) => {

  // SELECT order_items.quantity, products.product_name, products.unit_price, products.image
  // FROM order_items ON orders.id=order_items.order_id  INNER JOIN products ON products.id=order_items.product_id 
  try {
    const updateQuery = "SELECT order_items.quantity, order_items.id, products.product_name, products.unit_price, products.image FROM order_items INNER JOIN products ON products.id=order_items.product_id ";
    const newUser = await pool.query(updateQuery);

    return res.json(newUser.rows)
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});
//create order
router.post("/", async (req, res) => {
  const {
    id
  } = req.body;
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

//ADD a product to ORDER
router.post("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  const { qty } = req.body;

  try {
    const insertQuery = "INSERT INTO order_items (product_id, quantity ) VALUES ($1, $2)";
    const newUser = await pool.query(insertQuery, [id, qty]);
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