const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema(
  {
    reportableType: {
      type: String,
      enum: ["Recipe", "Dish", "Review"],
      required: true,
    },
    reportableId: { type: Schema.Types.ObjectId, required: true },
    reporter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const reportModel = mongoose.model("Report", reportSchema, "Reports");
module.exports = reportModel;
