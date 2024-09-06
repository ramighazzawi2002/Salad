const mongoose = require("mongoose");
const { Schema } = mongoose;

const chefRequestSchema = new Schema(
  {
    user_Id: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    culinarySpecialties: { type: [String], required: true }, // Array of specialties
    isApproved: { type: Boolean, default: false }, // For dashboard use
    isDeleted: { type: Boolean, default: false }, // For dashboard use
  },
  { timestamps: true }
);

const ChefRequest = mongoose.model("ChefRequest", chefRequestSchema, "Chefs");
module.exports = ChefRequest;
