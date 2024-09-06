const express = require("express");
const router = express.Router();
const createChefRequest = require("../Controllers/chefRequestController");

// POST /chef-request
router.post("/post", createChefRequest.createChefRequest);

// GET /chef-request
router.get("/get", createChefRequest.getChefRequest);

// PUT /chef-request/:id
router.put("/approve/:id", createChefRequest.changeChefRequestToApproved);

router.delete("/delete/:id", createChefRequest.deleteChefRequest);

module.exports = router;
