const router = require("express").Router();
const auth = require("../middlewares/AuthMiddleware");
const Cart = require("../controllers/CartController");
const {
  fetchCart,
  addToCart,
  removeFromCart,
} = require("../controllers/CartController");

router.get("/", fetchCart);
router.post("/add", addToCart);
router.delete("/remove", removeFromCart);

module.exports = router;
