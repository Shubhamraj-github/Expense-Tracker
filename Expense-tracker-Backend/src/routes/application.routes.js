const express = require("express");
const { ApplicationController } = require("../controllers/application.controller")
const verifyToken = require("../middleware/auth.js");
const { verifyApplication } = require("../middleware/verifyApplication.js");
const expenseValidation = require('../middleware/expenseValidation.js');
const applicationController = new ApplicationController();
const router = express.Router()

router.post("/addExpense", verifyToken, expenseValidation, applicationController.addExpense)
router.post("/getUser", verifyToken, verifyApplication, applicationController.getUser)
router.post("/getCategoryList", verifyToken, applicationController.getCategoryList)
router.post("/getExpenseList", verifyToken, applicationController.getExpenseList)
router.post("/getExpenseByUser", verifyToken, applicationController.getExpenseByUser)
router.post("/deleteExpenseById", verifyToken, applicationController.deleteExpenseById)
router.post("/deleteUserById", verifyToken, applicationController.deleteUserById)
router.post("/getTopThreeAmount", verifyToken, applicationController.getTopThreeAmount)
router.post("/getMonthlyExpenseChange", verifyToken, applicationController.getMonthlyExpenseChange)
router.post("/getPrediction", verifyToken, applicationController.getPrediction)
router.post("/getCategoryWiseData", verifyToken, verifyApplication, applicationController.getCategoryWiseData)

module.exports = router