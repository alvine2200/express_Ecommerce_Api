const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

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
  try {
    //find the user and product id in params
    const user = req.user._id;
    const productId = req.body.product_id;
    const prod = await Product.findById({ productId });
    if (!prod)
      return res
        .status(400)
        .send({ status: false, message: "Product doesnt exitst" });

    //check the product quantity
    const quantity = prod.quantity;
    const price = prod.price;

    //if product is found then check if user already has the product on cart
    const cart = await Cart.findOne({ user });
    if (cart) {
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = quantity;
        cart.products[itemIndex] = productItem;
      } else {
        //product does not exists in cart, add new item
        cart.products.push({ productId, quantity, name, price });
      }
      cart = await cart.save();
      return res.status(201).json({
        status: "success",
        message: "Product Added to cart successfully",
        data: cart,
      });
    } else {
      if (prod.quantity < req.body.quantity) {
        return res.status(500).json({
          status: "failed",
          message:
            "The quantity present is lower than your demand, reduce your quantity",
        });
      }
      const cart = await Cart.create({
        user_id: user,
        products: [
          {
            productId: productId,
            quantity: req.body.quantity,
            price: prod.price,
            total: price * quantity,
          },
        ],
      });
      return res.status(201).json({
        status: "success",
        message: "Product Added to cart successfully",
        data: cart,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
};

const removeFromCart = async (req, res) => {
  res.send("remove from cart");
};

module.exports = { fetchCart, addToCart, removeFromCart };
