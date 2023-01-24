const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const AdminMiddleware = (permissions) => {
  return (req, res, next) => {
    const role = User.findById({ ...req.user._id });
    if (permissions.includes(roles)) {
      next();
    } else {
      return res
        .status(401)
        .json({ status: "failed", message: "No roles present to access" });
    }
  };
};

module.exports = AdminMiddleware;
