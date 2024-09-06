const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");
const auth = require("../Middleware/auth");

router.post("/signup", userController.signUp);
router.post("/verify-otp", userController.verifyOTP);
router.post("/login", userController.logIn);
router.post("/google-signup", userController.googleSignup);
router.put("/toggle-active/:id", userController.userToggleActive);

// Profile
router.get("/profile", auth, userController.getUserProfile);
router.put("/profile", auth, userController.updateUserProfile);
router.delete(
  "/saved-recipes/:recipeId",
  auth,
  userController.removeSavedRecipe
);
router.delete(
  "/order-history/:orderId",
  auth,
  userController.removeOrderHistory
);

// GET route to fetch all users
router.get("/get", userController.getUsers);

// GET route to fetch chefs
router.get("/chefs", userController.getChefs);

// PUT route to update user role
router.put(
  "/update-role/:id/:yearsOfExperience",
  userController.convertFromUserToChef
);

router.get("/count-users", userController.countAllUsers);

router.get("/count-chefs", userController.countAllChefs);

router.get("/count-active-users", userController.countActiveUsers);

router.get("/all-users-pagination", userController.getUsersWithPagination);

router.post("/send-message", userController.sendMessage);

module.exports = router;
