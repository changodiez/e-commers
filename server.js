const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = process.env.PORT || 4000;
const morgan = require("morgan");
const path = require("path")


//middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
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

//* Product Route *//
app.use("/products", require("./routes/products"));

//* Authenticaion Route*//
app.use("/auth", require("./routes/auth"));

/*carts TOOLS*/

app.use("/orders", require("./routes/orders"));

/*ADMIN TOOLS*/

app.use("/admin", require("./routes/admin"));

// app.get("*", (req, res)=> {
//   res.sendFile(path.join(__dirname, "client/build/index.html"))
// })

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));