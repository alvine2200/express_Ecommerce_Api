const express = require("express");
const router = express.Router();
const auth = require("../middlewares/AuthController");
const { login, register } = require("../controllers/UserController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;
