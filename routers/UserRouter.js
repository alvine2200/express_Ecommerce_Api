const express = require("express");
const router = express.Router();
const auth = require("../middlewares/AuthController");
const Admin = require("../middlewares/AdminMiddleware");
const { login, register } = require("../controllers/UserController");

router.post("/register", Admin(["admin"]), register);
router.post("/login", login);

module.exports = router;
