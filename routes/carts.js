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

// GET ORDERS CLOSED FOR COSTUMERS  

// router.get("/orders/inActive",  async (req, res) => {
//   const { id } = 15;

//   try {
//     const getClosedOrder =
//       "SELECT order_items.quantity, order_items.id, products.product_name, products.unit_price, products.image, orders.close_date FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id INNER JOIN products ON products.id=order_items.product_id WHERE orders.customer_id=$1 AND orders.status=$2";
//     const newUser = await pool.query(getClosedOrder, [id, "false"]);
   
//     return res.json(newUser.rows);
    
//   } catch (error) {
//     console.error(error.message);
//     return res.status(error.status).json("Something went wrong");
//   }
// });


module.exports = router;
