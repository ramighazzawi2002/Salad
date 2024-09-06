const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentTransactionSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    paymentMethod: { type: String, required: true },
    transactionId: { type: String, unique: true },
  },
  { timestamps: true }
);

const paymentModel = mongoose.model(
  "Payment",
  paymentTransactionSchema,
  "Payments"
);
module.exports = paymentModel;
