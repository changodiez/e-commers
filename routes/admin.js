const pool = require("../db");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const express = require("express");

//Get Costumers
router.get("/customers", async (req, res) => {
  try {
    const customers = await pool.query("SELECT * FROM customers");
    res.json(customers.rows);
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json("Something went wrong");
  }
});

//GET SPECIFIC COSTUMER
router.get("/customers/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const customers = await pool.query(
      "SELECT * FROM customers WHERE id = $1",
      [id]
    );
    res.json(customers.rows);
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json("Something went wrong");
  }
});

//GET CUSTOMER ORDERS
router.get("/customers/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ordersQuery = "SELECT * FROM ORDERS WHERE customer_id=$1";
    const orders = await pool.query(ordersQuery, [id]);

    return res.status(200).json(orders.rows);
  } catch (error) {
    console.error(error);
  }
});

//Modificate costumer
router.put("/customers/:id", async (req, res) => {
  const { first_name, email, password } = req.body;
  try {
    const { id } = req.params;
    console.log(id);
    const insertQuery =
      "UPDATE customers SET first_name = $1, email = $2, password = $3 where id = $4";

    const changeUser = await pool.query(insertQuery, [
      first_name,
      email,
      password,
      id,
    ]);
    return res.status(200).json("User updated succesfully");
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json("Something went wrong");
  }
});

//Borrar costumer
router.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  const deleteCustomerOrdersQuery = "DELETE FROM orders WHERE customer_id=$1";
  const deleteCustomerQuery = "DELETE FROM customers WHERE id = $1";

  pool
    .query(deleteCustomerOrdersQuery, [id])
    .then((result) => {
      pool
        .query(deleteCustomerQuery, [id])
        .then((resp) => {
          return res.status(204).json("User deleted successfully");
        })
        .catch((err) => {
          console.error(err);
          return err.status(500).json("Server error");
        });
    })
    .catch((err) => {
      console.error(err);
      return err.status(500).json("Server error");
    });
});

/////////PRODUCTOS

//Get all Products
router.get("/products", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
    res.json(products.rows);
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json("Something went wrong");
  }
});

//GET SPECIFIC PRODUCT
router.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    res.json(product.rows);
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json("Something went wrong");
  }
});

// Add Products

router.post("/products/add", async (req, res) => {
  const { product_name, category, price, image, description } = req.body;
  try {
    const insertQuery =
      "INSERT INTO products (product_name, category, unit_price, image, description ) VALUES ($1, $2, $3, $4, $5)";

    const newUser = await pool.query(insertQuery, [
      product_name,
      category,
      price,
      image,
      description,
    ]);

    //Do we assign jwt here? ask in meeting
    return res.status(200).json("Product created succesfully");
  } catch (error) {
    console.error(error.message);
  }
});

//UPDATE PRODUCT
router.put("/products/:id", async (req, res) => {
  const { product_name, category, price, image, description } = req.body;

  try {
    const { id } = req.params;
    const insertQuery =
      "UPDATE products SET product_name = $1, category = $2, unit_price = $3, image = $4, description = $5  where id = $6";

    const changeUser = await pool.query(insertQuery, [
      product_name,
      category,
      price,
      image,
      description,
      id,
    ]);
    return res.status(200).json("Product updated succesfully");
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json("Something went wrong");
  }
});

//DELETE PRODUCT
router.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  try {
    const result = pool.query("DELETE FROM products where id = $1", [id]);
    return res.status(204).json("Product DELETED succesfully");
  } catch (error) {
    console.error(error.message);
    res.status(error.status).json("Something went wrong");
  }
});

module.exports = router;
