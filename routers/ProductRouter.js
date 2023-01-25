const router = require("express").Router();
const {
  createProduct,
  fetchProducts,
  editProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/ProductController");

router.get("/", fetchProducts);
router.post("/", createProduct);
router.get("/:id", editProduct);
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
