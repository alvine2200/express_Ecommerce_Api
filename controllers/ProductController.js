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
    })
      .then((prod) => {
        return res.status(201).json({
          status: "success",
          message: "Product added successfully",
          data: prod,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          status: "failed",
          message: "Something went wrong try again",
          error: error.message,
        });
      });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong try again",
      error: error,
    });
  }
};

const fetchProducts = async (req, res) => {
  try {
    const products = await Product.find({})
      .then((products) => {
        res.status(200).json({
          status: "success",
          message: "all products fetched",
          data: products,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: "failed",
          message: "Something went wrong,try again",
          data: error,
        });
      });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Something went wrong",
      data: error,
    });
  }
};

const editProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const product = await Product.findById({ _id: prodId })
      .then((product) => {
        res.status(200).json({
          status: "success",
          message: "Product fetched",
          data: product,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: "failed",
          message: "Something went wrong",
          data: error,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Something went wrong",
      data: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const prod = await Product.findOneAndUpdate({ _id: prodId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((product) => {
        res.status(200).json({
          status: "success",
          message: "Product fetched",
          data: product,
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: "failed",
          message: "Something went wrong",
          data: error,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "Something went wrong",
      data: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const prodId = req.params.id;
    const prod = await Product.findOneAndRemove({ _id: prodId })
      .then((product) => {
        res.status(200).json({
          status: "success",
          message: "Product deleted successfully",
          data: [],
        });
      })
      .catch((error) => {
        res.status(500).json({
          status: "failed",
          message: "Something went wrong",
          data: error.message,
        });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message: "error occurred",
      data: error,
    });
  }
};

module.exports = {
  createProduct,
  fetchProducts,
  editProduct,
  updateProduct,
  deleteProduct,
};
