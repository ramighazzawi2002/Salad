const express = require("express");
const router = express.Router();
const contactController = require("../Controllers/contactController");

// GET route to fetch all contacts
router.get("/get", contactController.getContacts);
router.post("/", contactController.postContacts);

module.exports = router;
