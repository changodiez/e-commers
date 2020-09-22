const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = 4000;
const morgan = require("morgan");



//===================================

var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(cookieParser());
app.use(session({
  secret: "Shh, its a secret!"
}));

app.get('/', function (req, res) {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});


//===============================================View All=================================0
app.get("/etailor/view", (req, res) => {
  // const { id } = req.params;

  try {
    const query = "SELECT customers.first_name, customers.last_name, customers.email, customers.address, customers.city, customers.postcode, customers.country, customers.mobile, orders.order_date, orders.status, order_items.quantity, products.product_name, products.product_size, products.category, products.unit_price, products.image, suppliers.supplier_name, suppliers.address, suppliers.city, suppliers.postcode, suppliers.country, suppliers.email, suppliers.mobile FROM customers  INNER JOIN orders ON customer_id=customers.id INNER JOIN order_items ON orders.id=order_items.order_id  INNER JOIN products ON products.id=order_items.product_id INNER JOIN suppliers ON suppliers.id=products.supplier_id";

    pool.query(query, (error, results) => {
      res.json(results.rows);
    });
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }

});
//===============================
//middleware
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(morgan("tiny"));
//ROUTES

//*Just to check we're online */
// app.get("/", (req, res) => {
//   res.send(`Houston, we're online`);
// });

//* Product Route *//
app.use("/products", require("./routes/products"));

//* Authenticaion Route*//
app.use("/auth", require("./routes/auth"));

/*TODO*/
app.use("/carts", require("./routes/carts"));


app.listen(port, () => console.log(`Listening at http://localhost:${port}`));