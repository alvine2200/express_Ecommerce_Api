const User = require("../models/UserModel");

const register = async (req, res) => {
  try {
    let email = req.body.email;
    let mail = await User.findOne({ email });
    if (mail) {
      return res.status(500).json({
        status: "fail",
        message: "Email already taken, choose another email",
      });
    }
    const user = await User.create({ ...req.body });
    if (user) {
      return res
        .status(201)
        .json({ status: "success", message: "User created successfully" });
    }
    return res
      .status(500)
      .json({ status: "fail", message: "Something went wrong, try again" });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error });
  }
};

const login = async (req, res) => {
  res.send("registration page");
};

module.exports = { register, login };
