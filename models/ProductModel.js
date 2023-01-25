const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [100, "The name should be less then 100 chracters"],
    },
    description: {
      type: String,
      maxlength: [500, "the description should be below 500 words"],
    },
    category: {
      type: String,
      maxlength: [100, "The name should be less then 100 chracters"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
