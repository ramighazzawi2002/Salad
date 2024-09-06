const mongoose = require("mongoose");
const { Schema } = mongoose;

const dishSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    photos: [String],
    availableQuantity: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    chef: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dietaryRestrictions: [String],
    cuisineType: String,
    nutrition: {
      calories: String,
      protein: String,
      totalFats: String,
      carbs: String,
    },
    isDeleted: { type: Boolean, default: false },
    servings: Number,
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const dishModel = mongoose.model("Dish", dishSchema, "Dishes");
module.exports = dishModel;
