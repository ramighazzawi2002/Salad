// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const recipeSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     ingredients: [
//       {
//         name: String,
//         quantity: String,
//         unit: String,
//       },
//     ],
//     instructions: [String],
//     cookingTime: { type: Number, required: true }, // in minutes
//     category: { type: Schema.Types.ObjectId, ref: "Category" },
//     chef: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     chefName:[String],
//     photos: [String],
//     dietaryRestrictions: [String],
//     cuisineType: String,
//     nutrition: {
//       calories: String,
//       protein: String,
//       TotalFats: String,
//       carbs: String,
//     },
//     videoTutorialUrl: { type: String },  // إضافة رابط الفيديو التعليمي
//     isDeleted: { type: Boolean, default: false },
//     servings: Number,
//   },
//   { timestamps: true }
// );

// const recipeModel = mongoose.model("Recipe", recipeSchema, "Recipes");
// module.exports = recipeModel;
const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: [
      {
        name: String,
        quantity: String,
        unit: String,
      },
    ],
    instructions: [
      {
        stepText: String,
        stepImage: { type: String, default: "" }, // يمكن أن تكون فارغة إذا لم توجد صورة
      },
    ],
    cookingTime: { type: Number, required: true }, // in minutes
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    chef: { type: Schema.Types.ObjectId, ref: "User", required: true },

    photos: [String], // Array of image URLs
    dietaryRestrictions: [String], // e.g., ["Gluten-Free", "Vegan"]
    cuisineType: String, // e.g., "Italian", "Mexican"
    nutrition: {
      calories: String, // e.g., "500 kcal"
      protein: String, // e.g., "30g"
      totalFats: String, // e.g., "25g"
      carbs: String, // e.g., "40g"
    },
    videoTutorialUrl: { type: String }, // إضافة رابط الفيديو التعليمي
    servings: Number,
    isDeleted: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const recipeModel = mongoose.model("Recipe", recipeSchema, "Recipes");
module.exports = recipeModel;
