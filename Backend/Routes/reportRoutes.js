const reportController = require("../Controllers/reportController");
const express = require("express");
const router = express.Router();

// GET route to fetch all pending reports
router.get("/get-pending-reports", reportController.getAllPendingReports);

router.put("/change-to-completed/:id", reportController.changeToResolved);

module.exports = router;
