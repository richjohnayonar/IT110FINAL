const express = require("express");
const userController = require("../../controller/userController");

const router = express.Router();

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.get("/login", userController.loginPage);

router.get("/signup", userController.signupPage);

module.exports = router;
