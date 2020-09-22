const pool = require("../db");
const router = require("express").Router();

//===============================Get Order items============================
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updateQuery = "Select * FROM order_items  WHERE id=$1";
    const newUser = await pool.query(updateQuery, [id]);
    return res.status(200).json("order_item extracted succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

//============================etailer Veiw=====================================
router.get("/etailor/view", (req, res) => {
  // const { id } = req.params;

  // try {
  //   const query = "SELECT * FROM customers";
  //   // "SELECT first_name, last_name, email, address, city, postcode, country, mobile, orders.order_date, orders.status, order_items.quantity, products.product_name, products.product_size, products.category, products.unit_prize, products.image, suppliers.supplier_name, suppliers.address, suppliers.city, suppliers.postcode, suppliers.country, suppliers.email, suppliers.mobile FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id  INNER JOIN products ON products.id=order_items.product_id INNER JOIN suppliers ON suppliers.id=products.supplier_id";
  //   pool.query(query),
  //     (error, results) => {
  //       res.json(results.rows);
  //     };
  //   // return res.status(200).json("order_item extracted succesfully");
  // } catch (error) {
  //   console.error(error.message);
  //   return res.status(error.status).json("Something went wrong");
  // }
  const viewAll =
    "SELECT customers.name, order_date FROM orders  INNER JOIN customers ON customer_id=customers.id";
  // "SELECT first_name, last_name, email, address, city, postcode, country, mobile, orders.order_date, orders.status, order_items.quantity, products.product_name, products.product_size, products.category, products.unit_prize, products.image, suppliers.supplier_name, suppliers.address, suppliers.city, suppliers.postcode, suppliers.country, suppliers.email, suppliers.mobile FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id  INNER JOIN products ON products.id=order_items.product_id INNER JOIN suppliers ON suppliers.id=products.supplier_id";

  pool.query(viewAll, (error, results) => {
    res.json(results.rows);
  });
});

//===========================Post Order_items====================================

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

//======================order table status==========================

router.put("/order-status", async (req, res) => {
  const { id } = req.body;

  try {
    const updateQuery = "UPDATE orders SET status=$1 WHERE id=$2";
    const newUser = await pool.query(updateQuery, ["TRUE", id]);
    return res.status(200).json("order STATUS CHANGED succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

//=====================================change quantity============================

router.put("/cart/item-quantity", async (req, res) => {
  const { quantity, id } = req.body;

  try {
    const updateQuery = "UPDATE order_items SET quantity=$1 WHERE id=$2";
    const newUser = await pool.query(updateQuery, [quantity, id]);
    return res.status(200).json("order STATUS CHANGED succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const insertQuery = "DELETE FROM order_items WHERE id=($1)";
    const newUser = await pool.query(insertQuery, [id]);
    //Do we assign jwt here? ask in meeting
    return res.status(200).json("order deleted succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

//=======================
// router.post("/test/:id", (req, res) => {
//   const { id } = req.params;
//   let quantity = 1;
//   pool
//     .query("SELECT * FROM order_items WHERE product_id=$1", [id])
//     .then((result) => {
//       if (result.rows.length > 0) {
//         quantity++;
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

router.post("/test/:id", (req, res) => {
  const { id } = req.params;
  let quantity = 1;
  pool
    .query("SELECT * FROM order_items WHERE product_id=$1", [id])
    .then((result) => {
      if (result.rows.length > 0) {
        quantity++;
        const query = "INSERT INTO order_items (quantity ) VALUES ($1)";
        const newuser = pool
          .query(query, [quantity])
          .then(() => console.log("Products inserted!"))
          .catch((e) => console.error(e));

        console.log("A Products with the same id already exists!");
      } else {
        const query =
          "INSERT INTO order_items (product_id, quantity ) VALUES ($1, $2)";
        const newuser = pool
          .query(query, [id, quantity])
          .then(() => console.log("Products inserted!"))
          .catch((e) => console.error(e));
      }
    });
});

module.exports = router;

//===========================================================
// "SELECT first_name, last_name, email, address, city, postcode, country, mobile, orders.order_date, orders.status, order_items.quantity, products.product_name, products.product_size, products.category, products.unit_prize, products.image, suppliers.supplier_name, suppliers.address, suppliers.city, suppliers.postcode, suppliers.country, suppliers.email, suppliers.mobile FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id  INNER JOIN products ON products.id=order_items.product_id INNER JOIN suppliers ON suppliers.id=products.supplier_id";
