const mongoose = require("mongoose");
let ItemSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity can not be less then 1."],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("item", ItemSchema);

const CartSchema = new mongoose.Schema(
  {
    products: [ItemSchema],
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    modifiedon: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
