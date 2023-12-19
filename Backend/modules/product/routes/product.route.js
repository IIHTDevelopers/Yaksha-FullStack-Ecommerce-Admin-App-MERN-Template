const express = require("express");
const router = express.Router();
const ProductController = require("../controller/product.controller");

const productController = new ProductController();

router.get("/", productController.getAllProducts);
router.post("/", productController.addProduct);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

module.exports = router;
