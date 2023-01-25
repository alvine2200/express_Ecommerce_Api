const product = require("../models/ProductModel");

const createProduct = async (req, res) => {
  res.send("Create Products Page");
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
