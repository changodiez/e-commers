const pool = require("../db");
const router = require("express").Router();
const validInfo = require("../middleware/validInfo");

router.post("/register", validInfo, (req, res) => {});

router.post("/login", validInfo, (req, res) => {
  const { email, password } = req.body;
});

module.exports = router;
