const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");
router.post("/", orderController.postNewOrder);
router.get("/total-sales", orderController.totalSales);

module.exports = router;
