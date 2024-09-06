// const reviewModel = require("../Models/reviewModel");
// const Recipe = require('../Models/recipeModel');
// class reviewController {
//  //review
//  async addReview(req, res)  {
//   try {
//     const { rating, comment } = req.body;
//     const userId = req.user;
//     console.log(userId);

//     // العثور على الوصفة
//     const recipe = await Recipe.findById(req.params.id);

//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }

//     // إنشاء المراجعة الجديدة
//     const review = {
//       user: userId,
//       rating,
//       comment
//     };

//     // إضافة المراجعة إلى الوصفة وتحديث متوسط التقييم
//     recipe.reviews.push(review);
//     recipe.rating = (recipe.reviews.reduce((acc, item) => acc + item.rating, 0) / recipe.reviews.length).toFixed(1);

//     await recipe.save();

//     res.status(201).json({ message: 'Review added successfully', review });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
// }

// module.exports = new reviewController();

// دالة لإضافة مراجعة للوصفة
// const addReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;

//     // الوصول إلى User ID من الكوكيز
//     const userId = req.cookies.userId;

//     if (!userId) {
//       return res.status(401).json({ message: 'You must be logged in to leave a review' });
//     }

//     // العثور على الوصفة
//     const recipe = await Recipe.findById(req.params.id);

//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }

//     // إنشاء المراجعة
//     const review = {
//       user: userId,
//       rating,
//       comment,
//     };

//     // إضافة المراجعة إلى الوصفة
//     recipe.reviews.push(review);

//     // تحديث متوسط التقييم
//     recipe.rating = (
//       recipe.reviews.reduce((acc, item) => acc + item.rating, 0) / recipe.reviews.length
//     ).toFixed(1);

//     // حفظ التحديثات
//     await recipe.save();

//     res.status(201).json({ message: 'Review added successfully', review });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const Review = require("../Models/reviewModel");
const Recipe = require("../Models/recipeModel");
const User = require("../Models/userModel");

class ReviewController {
  // add new review
  static async addReview(req, res) {
    try {
      const { rating, comment } = req.body;
      const userId = req.cookies.user_id; // get user id fom cookies
      // const token = req.cookie.token;
      console.log(userId);
      const recipeId = req.params.recipeId;
      if (!userId) {
        return res
          .status(401)
          .json({ message: "You must be logged in to leave a review" });
      }

      // if rate correct
      if (!rating || rating < 1 || rating > 5) {
        return res
          .status(400)
          .json({ message: "Rating must be between 1 and 5." });
      }

      // creat new review
      const newReview = new Review({
        rating,
        comment,
        user: userId,
        reviewableType: "Recipe",
        reviewableId: recipeId,
      });

      // حفظ المراجعة
      const savedReview = await newReview.save();

      res
        .status(201)
        .json({ message: "Review added successfully", review: savedReview });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // دالة لجلب جميع المراجعات لعنصر معين (مثل وصفة أو طبق)
  static async getReviews(req, res) {
    try {
      const recipeId = req.params.recipeId;

      // جلب جميع المراجعات المرتبطة بالعنصر
      const reviews = await Review.find({
        reviewableId: recipeId,
        reviewableType: "Recipe",
        isDeleted: false,
      }).populate("user", "name"); //review

      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // دالة لإضافة رد على مراجعة
  static async addReply(req, res) {
    try {
      const { content } = req.body;
      const userId = req.cookies.userId; // الوصول إلى User ID من الكوكيز
      const { reviewId } = req.params;

      if (!userId) {
        return res
          .status(401)
          .json({ message: "You must be logged in to reply to a review" });
      }

      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      // إضافة الرد إلى المراجعة
      const reply = {
        author: userId,
        content,
      };

      review.replies.push(reply);
      await review.save();

      res.status(201).json({ message: "Reply added successfully", reply });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteReview(req, res) {
    try {
      const { reviewId } = req.params;
      const userId = req.cookies.user_id;
      console.log(userId);
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      // تحقق أن المستخدم هو مالك المراجعة
      if (review.user.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this review" });
      }

      // تنفيذ عملية الحذف الناعم
      review.isDeleted = true;
      await review.save();

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  //update
  static async updateReview(req, res) {
    try {
      const { reviewId } = req.params;
      const { rating, comment } = req.body;
      const userId = req.cookies.userId;

      // العثور على المراجعة
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      // تحقق من أن المستخدم هو مالك المراجعة
      if (review.user.toString() !== userId) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this review" });
      }

      // تحديث المراجعة
      review.rating = rating || review.rating;
      review.comment = comment || review.comment;
      await review.save();

      res.status(200).json({ message: "Review updated successfully", review });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  static async getReviewById(req, res) {
    try {
      const { reviewId } = req.params;
      const review = await Review.findById(reviewId).populate("user", "name");
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = ReviewController;
