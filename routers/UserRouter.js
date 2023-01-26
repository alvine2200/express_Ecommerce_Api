const express = require("express");
const router = express.Router();
const auth = require("../middlewares/AuthMiddleware");
const Admin = require("../middlewares/AdminMiddleware");
const { login, register, home } = require("../controllers/UserController");

router.post("/register", register);
router.post("/login", login);
router.get("/home", [auth], home);  

module.exports = router;
