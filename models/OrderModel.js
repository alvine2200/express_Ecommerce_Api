const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    quantity: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      maxlength: [50, "Less than 50 character required"],
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "On transit", "Delivered"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
