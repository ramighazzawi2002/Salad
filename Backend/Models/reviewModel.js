const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: String,
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviewableType: { type: String, enum: ["Recipe", "Dish"], required: true },
    reviewableId: { type: Schema.Types.ObjectId, required: true },
    isDeleted: { type: Boolean, default: false }, // Fixed syntax here
    replies: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        isDeleted: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("Review", reviewSchema, "Reviews");
module.exports = reviewModel;
