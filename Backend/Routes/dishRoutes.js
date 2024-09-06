const express = require("express");
const router = express.Router();
const dishController = require("../Controllers/dishController");
// GET route to fetch all dishes where isApproved is false

router.get("/get", dishController.getAllDishesWhereIsApprovedFalse);
router.get("/chef/:chefId", dishController.getDishesByChefId);
router.post("/", dishController.createDish);
router.get("/:id", dishController.getDishById);
router.put("/:id", dishController.editDish);
router.delete("/:id", dishController.deleteDish);

router.put("/approve/:id", dishController.approveDish);

module.exports = router;
