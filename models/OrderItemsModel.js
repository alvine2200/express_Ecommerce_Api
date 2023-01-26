const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema(
  {
    order_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps }
);

module.exports = mongoose.model("OrderItem", OrderItemSchema);
