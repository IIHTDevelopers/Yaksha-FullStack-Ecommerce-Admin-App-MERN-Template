const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/product.controller");

router.get("/", getAllProducts);
router.post("/", addProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

module.exports = router;
