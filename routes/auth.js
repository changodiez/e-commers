const pool = require("../db");
const router = require("express").Router();
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");
const express = require("express");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//REGISTER NEW USER
router.post("/register", validInfo, async (req, res) => {
  const { username, email, password } = req.body;
  const now = new Date();
  try {
    const verificationQuery = "SELECT * FROM customers WHERE email=$1";
    const insertQuery =
      "INSERT INTO customers (first_name, email, password) VALUES ($1, $2, $3) RETURNING id";
    const userOrderQuery =
      "INSERT INTO orders (open_date, customer_id, status) VALUES ($1, $2, false)";

    const user = await pool.query(verificationQuery, [email]);

    if (user.rows.length > 0) {
      return res.status(409).json("Email already exists in the database");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptpassword = await bcrypt.hash(password, salt);

    pool
      .query(insertQuery, [username, email, bcryptpassword])
      .then((response) => {
        if (response) {
          pool
            .query(userOrderQuery, [now, response.rows[0].id])
            .then((orderResponse) => {
              return res.status(200).json("User created successfully");
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json("User could not be created");
            });
        }
      });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Something went wrong");
  }
});

//LOGIN FOR EXISTING USER
router.post("/login", validInfo, async (req, res) => {
  const { email, password } = req.body;

  const dbquery = "SELECT * FROM customers WHERE email=$1";

  try {
    const user = await pool.query(dbquery, [email]);

    if (user.rows.length === 0) {
      return res.status(401).json("Email not found in database");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Invalid password");
    }

    //Missing using JWT
    const token = jwtGenerator(user.rows[0].id);
    return res.json({ token });
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

//VERIFICATION ROUTE. GETS CALLED ON EACH RENDER
router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
});

//USED TO GET THE USER NAME
router.get("/dashboard", authorize, async (req, res) => {
  try {
    const { id } = req.user;
    const nameQuery = "SELECT first_name FROM customers WHERE id=$1";
    const name = await pool.query(nameQuery, [id]);

    res.json(name.rows[0]);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Server error");
  }
});

//USED TO GET THE CUSTOMER INFORMATION
router.get("/profile", authorize, async (req, res) => {
  try {
    const { id } = req.user;
    const customerQuery =
      "SELECT first_name, last_name, address, city, postcode, country, mobile FROM customers WHERE id=$1";
    const customer = await pool.query(customerQuery, [id]);
    return res.json(customer.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Server error");
  }
});

// UPDATE CUSTOMER INFORMATION

router.put("/profile/update", authorize, async (req, res) => {
  const { id } = req.user;
  const {
    first_name,
    last_name,
    address,
    city,
    postcode,
    country,
    mobile,
  } = req.body;
  console.log(req.body);
  try {
    const customerQuery =
      "UPDATE customers SET first_name =$1, last_name =$2, address=$3, city=$4, postcode=$5, country=$6, mobile=$7 WHERE customers.id =$8";
    const customer = await pool.query(customerQuery, [
      first_name,
      last_name,
      address,
      city,
      postcode,
      country,
      mobile,
      id,
    ]);
    res.json(customer.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//===============================UPDATE PASSWORD=======================================
router.put("/password/:id", async (req, res) => {
  const { password, newPassword } = req.body;
  const { id } = req.params;

  const dbquery = "SELECT * FROM customers WHERE id=$1";
  const updateQuery = "UPDATE customers SET password = $1 where id = $2  ";

  try {
    const user = await pool.query(dbquery, [id]);
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Invalid current password");
    } else {
      const salt = await bcrypt.genSalt(10);
      const bcryptpassword = await bcrypt.hash(newPassword, salt);

      const updatePassword = await pool.query(updateQuery, [
        bcryptpassword,
        id,
      ]);

      return res.status(200).json("Password updated succesfully");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

module.exports = router;
