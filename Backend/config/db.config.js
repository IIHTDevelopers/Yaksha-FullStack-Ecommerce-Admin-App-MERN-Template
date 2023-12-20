const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const dbName = "ecommerce-app";
const host = "0.0.0.0";
const port = "27017";

const url = `mongodb://${host}:${port}/${dbName}`;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => console.log("database connection successful"))
  .catch((err) => console.error(err));
