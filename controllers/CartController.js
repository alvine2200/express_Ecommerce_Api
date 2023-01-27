const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

const fetchCart = async (req, res) => {
  try {
    const user = req.user.userId;
    const cartItem = await Cart.find({ userId: user })
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
    const user = req.user.userId;
    const productId = req.body.product_id;
    const prod = await Product.findById({ _id: productId });
    if (!prod)
      return res
        .status(400)
        .send({ status: false, message: "Product doesnt exitst" });

    //check the product quantity
    const quantity = prod.quantity;
    const price = prod.price;

    //if product is found then check if user already has the product on cart
    const cart = await Cart.exists({ user });
    if (cart) {
      let itemIndex = cart.products.findIndex((p) => p.productId == productId);
      if (itemIndex > 0) {
        //check product quantity
        if (prod.quantity < req.body.quantity) {
          return res.status(500).json({
            status: "failed",
            message:
              "The quantity present is lower than your demand, reduce your quantity",
          });
        }
        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = req.body.quantity;
        cart.products[itemIndex] = productItem;
        return res.status(201).json({
          status: "success",
          message: "Product quantity updated successfully",
          data: productItem,
        });
      } else {
        //check if the product quantity is less than reqeusted
        if (prod.quantity < req.body.quantity) {
          return res.status(500).json({
            status: "failed",
            message:
              "The quantity present is lower than your demand, reduce your quantity",
          });
        }
        //product does not exists in cart, add new item
        // cart.products.push({ productId, quantity, name, price });
        const cart = await Cart.create({
          userId: userId,
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
    } else {
      if (prod.quantity < req.body.quantity) {
        return res.status(500).json({
          status: "failed",
          message:
            "The quantity present is lower than your demand, reduce your quantity",
        });
      }
      const cart = await Cart.create({
        userId: user,
        products: [
          {
            productId: productId,
            quantity: req.body.quantity,
            price: prod.price,
            total: prod.price * req.body.quantity,
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
    // console.log(error);
    return res.status(500).json({ status: "failed", message: error });
  }
};

const removeFromCart = async (req, res) => {
  const owner = req.user.userId;
  const itemId = req.params.productId;
  try {
    let cart = await Cart.findOne({ owner });

    const itemIndex = cart.products.findIndex(
      (item) => item.productId == itemId
    );

    if (itemIndex > -1) {
      let item = cart.products[itemIndex];
      cart.total -= item.quantity * item.price;
      if (cart.total < 0) {
        cart.total = 0;
      }
      cart.products.splice(itemIndex, 1);
      cart.total = cart.products.reduce((acc, curr) => {
        return res.status(200).json({
          status: "success",
          message: "product removed successfully",
          data: acc + curr.quantity * curr.price,
        });
      }, 0);
      cart = await cart.save();

      res.status(200).send(cart);
    } else {
      res.status(404).send("item not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "failed", message: error });
  }
};

module.exports = { fetchCart, addToCart, removeFromCart };
