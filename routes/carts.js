const pool = require("../db");
const router = require("express").Router();

//===============================Get Order items============================
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const getOrder = "Select * FROM order_items  WHERE id=$1";
    const newUser = await pool.query(getOrder, [id]);

    return res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

// router.post("/test/:id", (req, res) => {
//   pool
//     .query("SELECT * FROM order_items WHERE id=$1", [order_items.id])
//     .then((result) => {
//       if (result.rows.length > 0) {
//         const query = "INSERT INTO order_items (quantity ) VALUES ($1)";
//         const newuser = pool
//           .query(query, [quantity])
//           .then(() => console.log("Products inserted!"))
//           .catch((e) => console.error(e));

//         console.log("A Products with the same id already exists!");
//       } else {
//         const query =
//           "INSERT INTO order_items (product_id, quantity ) VALUES ($1, $2)";
//         const newuser = pool
//           .query(query, [id, quantity])
//           .then(() => console.log("Products inserted!"))
//           .catch((e) => console.error(e));
//       }
//     });
// });
//create order
// router.post("/", async (req, res) => {
//   const { id } = req.body;
//   try {
//     console.log(id);
//     const insertQuery = "INSERT INTO orders (customer_id ) VALUES ($1)";
//     const newUser = await pool.query(insertQuery, [id]);
//     return res.status(200).json("Order added succesfully");
//   } catch (error) {
//     console.error(error.message);
//     return res.status(error.status).json("Something went wrong");
//   }
// });

//=================================================Open orders===========================================
router.get("/orders/active/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const openOrderQuery =
      "SELECT order_items.quantity, order_items.id, products.product_name, products.unit_price, products.image FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id INNER JOIN products ON products.id=order_items.product_id WHERE customers.id=$1 AND orders.status=$2";
    const newUser = await pool.query(openOrderQuery, [id, "FALSE"]);

    return res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

//=================================================Closed orders===========================================
router.get("/orders/inActive/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const getClosedOrder =
      "SELECT order_items.quantity, order_items.id, products.product_name, products.unit_price, products.image FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id INNER JOIN products ON products.id=order_items.product_id WHERE orders.customer_id=$1 AND orders.status=$2";
    const newUser = await pool.query(getClosedOrder, [id, "TRUE"]);

    return res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});


//=================================================Closed order date===========================================
router.get("/orders/closed/date/:id", async (req, res) => {
  const { id } = req.params;

  try {
    console.log(1111, id);
    const getDate = 
    "SELECT orders.order_close_date FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id INNER JOIN products ON products.id=order_items.product_id WHERE customers.id=$1";
    const newUser = await pool.query(getDate, [id]);

    return res.json(newUser.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

//Post endpoint
router.post("/:id", async (req, res) => {
  const { id } = req.params;
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
//delete endpoint
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

//=============================Post order_items with modifying quantity============================
router.put("/quantity/:id", (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  pool
    .query("SELECT * FROM order_items WHERE product_id=$1 and order_id=$2", [
      id,
      order_items.order_id,
    ])
    .then((result) => {
      if (result.rows.length > 1) {
        const updateQuery = "UPDATE order_items SET quantity=$1";
        const newuser = pool
          .query(query, [quantity++])
          .then(() => console.log("Products quantity updated!"))
          .catch((e) => console.error(e));

        console.log("A Products with the same id already exists!");
      } else {
        const query =
          "INSERT INTO order_items (product_id, quantity ) VALUES ($1, $2)";
        const newuser = pool
          .query(query, [id, quantity])
          .then(() => console.log("New order_items inserted!"))
          .catch((e) => console.error(e));
      }
    });
});

  module.exports = router;
