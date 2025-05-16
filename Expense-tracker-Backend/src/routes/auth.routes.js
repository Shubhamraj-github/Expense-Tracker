const express = require("express");
const userValidation = require("../middleware/user.validator.js");
const { AuthController } = require("../controllers/auth.controller.js");
const verifyToken = require("../middleware/auth.js");
const authController = new AuthController();
const router = express.Router();

router.post("/registration", userValidation, authController.registration);
router.post("/login", authController.login);
router.post("/getProfile", verifyToken, authController.getProfile);


module.exports = router;