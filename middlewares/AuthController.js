const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(403).json({
        status: "fail",
        message: "Unauthorised to access,login first",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        status: "fail",
        message: "Unauthorised to access,login first",
      });
    }
    const payload = await jwt.verify(token, process.env.JWT_TOKEN);
    if (!payload) {
      return res.status(403).json({
        status: "fail",
        message: "Unauthorised to access,login first",
      });
    }
    const user = User.findById(payload.id).select("-password");
    req.user = user;
    // req.user = { userId: payload.userId, name: payload.name };
    return res.status(200).json({
      status: "success",
      message: "Logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = auth;
