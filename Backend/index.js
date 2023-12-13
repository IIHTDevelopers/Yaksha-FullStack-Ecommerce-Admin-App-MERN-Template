require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/config");

const productRouter = require("./modules/product/routes/product.route");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Api Routes
app.use("/api/product", productRouter);

const server = app.listen(process.env.PORT);

const closeServer = () => {
  server.close();
};

module.exports = { app, closeServer };
