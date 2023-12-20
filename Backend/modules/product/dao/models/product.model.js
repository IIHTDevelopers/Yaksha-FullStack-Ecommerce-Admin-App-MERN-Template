const mongoose = require("mongoose");
const productSchema = require("../schemas/product.schema");

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
