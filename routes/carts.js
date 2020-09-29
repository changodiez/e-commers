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

// GET THE OPEN ORDER ID OF A CUSTOMER
router.get("/orderID", authorize, async (req, res) => {
  try {
    const { id } = req.user;
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
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { qty, orderID } = req.body;

  try {
    const verificationQuery =
      "SELECT * FROM order_items WHERE order_id=$1 AND product_id=$2";

    const repeated = await pool.query(verificationQuery, [orderID, id]);

    if (repeated.rows.length) {
      newQty = repeated.rows[0].quantity + qty;
      const updateQuery =
        "UPDATE order_items SET quantity=$1 WHERE order_id=$2 AND product_id=$3";
      pool.query(updateQuery, [newQty, orderID, id]);
      res.status(200).json("Qty updated");
    } else {
      const insertQuery =
        "INSERT INTO order_items ( order_id, product_id, quantity ) VALUES ($1, $2, $3 )";
      await pool.query(insertQuery, [orderID, id, qty]);
      return res.status(200).json("order item added succesfully");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

//=================================================Closed orders===========================================
router.get("/orders/inActive", authorize, async (req, res) => {
  const { id } = req.user;

  try {
    const getClosedOrder =
      "SELECT order_items.quantity, order_items.id, products.product_name, products.unit_price, products.image, orders.close_date FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id INNER JOIN products ON products.id=order_items.product_id WHERE orders.customer_id=$1 AND orders.status=$2";
    const newUser = await pool.query(getClosedOrder, [id, "TRUE"]);
   
    return res.json(newUser.rows);
    
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

//=================================================Closed order date===========================================
/* router.get("/orders/closed/date/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const getDate =
      "SELECT orders.order_close_date FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id INNER JOIN products ON products.id=order_items.product_id WHERE customers.id=$1";
    const newUser = await pool.query(getDate, [id]);

    return res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
}); */

//create order
router.post("/neworder/:id", async (req, res) => {
  const { id } = req.params;
  const now = new Date();
  try {
<<<<<<< HEAD
    console.log(id);
    const insertQuery =
      "INSERT INTO orders (open_date, customer_id, open ) VALUES ($1, $2, FALSE)";
    const order = await pool.query(insertQuery, [now, id]);
=======
    const insertQuery = "INSERT INTO orders (customer_id ) VALUES ($1)";
    const newUser = await pool.query(insertQuery, [id]);
>>>>>>> updateProfile
    return res.status(200).json("Order added succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

//if we need an update endpoint
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updateQuery = "";
    const newUser = await pool.query(updateQuery, [id]);
    return res.status(200).json("order created succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

//DELETE PRODUCT FROM THE CART
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteQuery = "DELETE FROM order_items WHERE id=($1)";
    const newUser = await pool.query(deleteQuery, [id]);
    return res.status(200).json("order deleted succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});



module.exports = router;
