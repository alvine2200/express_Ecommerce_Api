const router = require("express").Router();
const auth = require("../middlewares/AuthController");
const Cart = require("../controllers/CartController");

router.get("/cart", fetchCart);
router.post("/add/cart", addToCart);
  
module.exports = router;
