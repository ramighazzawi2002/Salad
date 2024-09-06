// const { auth } = require("google-auth-library");
const reviewController = require("../Controllers/reviewController");
const express = require("express");
const router = express.Router();
const auth = require("./../Middleware/auth");
// GET route to fetch all reviews
const ReviewController = require("../Controllers/reviewController");
// add review on recipe
router.post("/recipes/:recipeId/reviews", auth, ReviewController.addReview);
// get all review of one recipe
router.get("/recipes/:recipeId/reviews", ReviewController.getReviews);
// add replay on review
router.post("/reviews/:reviewId/replies", auth, ReviewController.addReply);

// delete review
router.put("/reviews/:reviewId", auth, ReviewController.deleteReview);
// update review
router.put("/update/:reviewId", auth, ReviewController.updateReview);

router.get("/reviews/get-by-id/:reviewId", ReviewController.getReviewById);

const { addReview } = require("../Controllers/reviewController");

// router.get("/get", auth, reviewController.getReviews);
// Route لإضافة مراجعة إلى وصفة
router.post("/recipes/:id/reviews", auth, addReview);

module.exports = router;
