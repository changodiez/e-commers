const pool = require("../db");
const router = require("express").Router();
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");
const express = require("express");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

router.post("/register", validInfo, async (req, res) => {
  const { email, password } = req.body;

  try {
    const verificationQuery = "SELECT * FROM customers WHERE email=$1";
    const insertQuery =
      "INSERT INTO customers (email, password) VALUES ($1, $2)";

    const user = await pool.query(verificationQuery, [email]);

    if (user.rows.length != 0) {
      return res.status(401).json("A user with that email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptpassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(insertQuery, [email, bcryptpassword]);

    //Do we assign jwt here? ask in meeting
    return res.status(200).json("User created succesfully");
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

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
    const jwtToken = jwtGenerator(user.rows[0].id);
    return res.json({ jwtToken });
  } catch (error) {
    console.error(error.message);
    return res.status(error.status).json("Something went wrong");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
