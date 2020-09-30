const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = process.env.PORT || 4000;
const morgan = require("morgan");
const path = require("path")


//middleware
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(morgan("tiny"));

app.use(express.static(path.join(__dirname, "client/build")))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")))
}
//ROUTES

//*Just to check we're online */
app.get("/", (req, res) => {
  res.send(`Houston, we're online`);
});


//===================================All table view=======================================
app.get("/etailor/view", (req, res) => {
  // const { id } = req.params;

  try {
    const query = "SELECT customers.first_name, customers.last_name, customers.email, customers.address, customers.city, customers.postcode, customers.country, customers.mobile, orders.open_date, orders.status, order_items.quantity, products.product_name, products.product_size, products.category, products.unit_price, products.image, suppliers.supplier_name, suppliers.address, suppliers.city, suppliers.postcode, suppliers.country, suppliers.email, suppliers.mobile FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id  INNER JOIN products ON products.id=order_items.product_id INNER JOIN suppliers ON suppliers.id=products.supplier_id";

    pool.query(query, (error, results) => {
      res.json(results.rows);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }

});

//* Product Route *//
app.use("/products", require("./routes/products"));

//* Authenticaion Route*//
app.use("/auth", require("./routes/auth"));

/*carts TOOLS*/

app.use("/carts", require("./routes/carts"));

/*ADMIN TOOLS*/

app.use("/admin", require("./routes/admin"));

// app.get("*", (req, res)=> {
//   res.sendFile(path.join(__dirname, "client/build/index.html"))
// })

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));