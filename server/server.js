const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = 4000;

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES

//* Product Route *//
app.use("/products", require("./routes/products"));

/*TODO*/

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
