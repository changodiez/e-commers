const express = require("express");
const app = express();
const { Pool } = require("pg");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const fetch = require("node-fetch");
​
app.listen(8000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
​
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "etailor",
  password: "Bird14",
  port: 5432,
});
​
//==============================================================Products==========================================================
​
fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    data.map((event) => {
      pool
        .query("SELECT * FROM products WHERE id=$1", [event.id])
        .then((result) => {
          if (result.rows.length > 0) {
            console.log("A Products with the same name already exists!");
          } else {
            const query =
              "INSERT INTO products (id, product_name, category, unit_price, image) VALUES ($1, $2, $3, $4, $5)";
            pool
              .query(query, [
                event.id,
                event.title,
                event.category,
                event.price,
                event.image,
              ])
              .then(() => console.log("Products created!"))
              .catch((e) => console.error(e));
          }
        });
    });
  });
​
//==============================================================users==========================================================
​
fetch("https://fakestoreapi.com/users")
  .then((response) => response.json())
  .then((data) => {
    data.map((event) => {
      pool
        .query("SELECT * FROM products WHERE id=$1", [event.id])
        .then((result) => {
          if (result.rows.length > 0) {
            console.log("A Customer with the same name already exists!");
          } else {
            const query =
              "INSERT INTO customers (id, first_name, last_name, email, password, address, city, postcode, country, mobile) VALUES ($1, $2, $3, $4, crypt($5, gen_salt('bf')), $6, $7, $8, $9, $10)";
            pool
              .query(query, [
                event.id,
                event.name.firstname,
                event.name.lastname,
                event.email,
                event.password,
                `${event.address.street} ${event.address.number}`,
                event.address.city,
                event.address.zipcode,
                "Spain",
                event.phone,
              ])
              .then(() => console.log("Customers created!"))
              .catch((e) => console.error(e));
          }
        });
    });
  });
​
//==============================================================suppliers==========================================================
​
fetch("https://fakestoreapi.com/users")
  .then((response) => response.json())
  .then((data) => {
    data.map((event) => {
      pool
        .query("SELECT * FROM suppliers WHERE id=$1", [event.id])
        .then((result) => {
          if (result.rows.length > 0) {
            console.log("A suppliers with the same name already exists!");
          } else {
            const query =
              "INSERT INTO suppliers (id, address, city, postcode, country, email, mobile) VALUES ($1, $2, $3, $4,$5, $6, $7)";
            pool
              .query(query, [
                event.id,
                `${event.address.street} ${event.address.number}`,
                event.address.city,
                event.address.zipcode,
                "Spain",
                event.email,
                event.phone,
              ])
              .then(() => console.log("Suppliers created!"))
              .catch((e) => console.error(e));
          }
        });
    });
  });