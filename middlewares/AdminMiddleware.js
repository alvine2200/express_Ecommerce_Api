const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const AdminMiddleware = (req, res, next) => {
  const { name, userId } = req.user;
  const user = User.findOne({ userId });
  if (user.roles === "admin") {
    next();
  }
  return res.status(500).json({ status: "fail", message: "Not an Admin" });
};

// const AdminMiddleware = (permissions) => {
//   return (req, res, next) => {
//     const roles = User.findById({ ...req.user._id });
//     if (permissions.includes(roles)) {
//       next();
//     } else {
//       return res
//         .status(401)
//         .json({ status: "failed", message: "No roles present to access" });
//     }
//   };
// };

module.exports = AdminMiddleware;
