const express = require("express");
const router = express.Router();
const userController = require('../contollers/userController'); // Ensure the path is correct

router.post("/register", userController.Register);
router.post("/login", userController.login);
router.post("/forgetpassword",userController.ForgetPass)
router.post("/changepassword",userController.ChangePass)

module.exports = router;
