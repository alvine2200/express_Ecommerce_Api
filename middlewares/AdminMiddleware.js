const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const AdminMiddleware = async (req, res, next) => {
  const user = await User.findById({ _id: req.user._id });
  if (user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    message: "Forbidden",
  });
};

module.exports = AdminMiddleware;
