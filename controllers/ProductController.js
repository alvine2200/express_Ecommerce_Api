const Product = require("../models/ProductModel");

const createProduct = async (req, res) => {
  try {
    const prod = await Product.create({
      name: req.body.name,
      description: req.body.description,
      image: req.body.image,
      quantity: req.body.quantity,
      category: req.body.category,
      price: req.body.price,
      size: req.body.size,
      color: req.body.color,
    });
    if (!prod) {
      return res.status(500).json({
        status: "failed",
        message: "Something went wrong, try again",
      });
    }
    return res.status(201).json({
      status: "success",
      message: "Product added successfully",
      data: prod,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong try again",
      error: error,
    });
  }
};

const fetchProducts = async (req, res) => {
  res.send("Products Page");
};

const editProduct = async (req, res) => {
  res.send("Edit Products page");
};

const updateProduct = async (req, res) => {
  res.send("Update Products Page");
};

const deleteProduct = async (req, res) => {
  res.send("Delete Products Page");
};

module.exports = {
  createProduct,
  fetchProducts,
  editProduct,
  updateProduct,
  deleteProduct,
};
