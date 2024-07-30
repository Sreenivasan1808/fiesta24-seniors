const express = require("express");
const router = express.Router();
const userController = require('../contollers/userController'); // Ensure the path is correct
const authenticateToken = require('../middleware/authMiddleware');
router.post("/register", userController.Register);
router.post("/login", userController.login);
//router.use(authenticateToken)
router.post("/forgetpassword",userController.ForgetPass)
router.post("/changepassword",userController.ChangePass)
router.post("/registersoloevent",userController.RegisterSoloEvent)
router.post("/registergroupevent",userController.RegisterGroupEvent)
router.get("/isregistered",userController.IsRegistered)
router.post('/refresh-token', userController.refreshToken);

// Protected route example
router.get('/protected-route', authenticateToken, (req, res) => {
  res.status(200).json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
