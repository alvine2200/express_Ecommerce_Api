const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: [500, "the description should be below 500 words"],
    },
    category: {
      type: String,
      required: true,
      maxlength: [100, "The name should be less then 100 chracters"],
    },
    price: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    size: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
      enum: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
