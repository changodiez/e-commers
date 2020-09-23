const pool = require("../db");
const router = require("express").Router();

//===============================Get Order items============================
router.get("/:id", async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const updateQuery = "Select * FROM order_items  WHERE id=$1";
    const newUser = await pool.query(updateQuery, [id]);

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

//Post endpoint
router.post("/:id", async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const insertQuery = "INSERT INTO order_items (product_id ) VALUES ($1)";
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