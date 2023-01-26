const Cart = require("../models/CartModel");

const fetchCart = async (req, res) => {
  try {
    const user = req.user._id;
    const cartItem = await Cart.findOne({ user })
      .then((cart) => {
        return res.status(200).json({
          status: "success",
          message: "cart Item fetched",
          data: cart,
        });
      })
      .catch((error) => {
        return res.status(500).json({ status: "failed", message: error });
      });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
};

const addToCart = async (req, res) => {
  res.send("add to cart");
};

const removeFromCart = async (req, res) => {
  res.send("remove from cart");
};

module.exports = { fetchCart, addToCart, removeFromCart };
