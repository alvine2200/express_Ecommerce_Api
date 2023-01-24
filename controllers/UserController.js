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
    const token = await user.createJwt();
    if (!token) {
      return res
        .status(500)
        .json({ status: "failed", message: "No token generated" });
    }
    if (user) {
      return res.status(201).json({
        status: "success",
        message: "User created successfully",
        token: token,
      });
    }
    return res
      .status(500)
      .json({ status: "fail", message: "Something went wrong, try again" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "Request not send to database",
      data: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        status: "fail",
        message: "No user with such email exists",
      });
    }

    const pass = await user.isMatch(password);
    if (!pass) {
      return res.status(403).json({
        status: "fail",
        message: "Invalid credentials given",
      });
    }
    const token = await user.createJwt();
    if (!token) {
      return res
        .status(500)
        .json({ status: "failed", message: "No token generated" });
    }
    return res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error });
  }
};

module.exports = { register, login };
