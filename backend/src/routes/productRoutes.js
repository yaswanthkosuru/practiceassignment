const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/products", authMiddleware, productController.createProduct);
router.get("/products", authMiddleware, productController.getUserProducts);
router.get("/user/products", authMiddleware, productController.getUserProducts);
router.get("/products/:id", authMiddleware, productController.getProduct);
router.put(
  "/products/batch",
  authMiddleware,
  productController.batchUpdateProducts
);
router.put("/products/:id", authMiddleware, productController.updateProduct);
router.delete("/products/:id", authMiddleware, productController.deleteProduct);

module.exports = router;
