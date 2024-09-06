const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    orderDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    totalAmount: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chef: { type: Schema.Types.ObjectId, ref: "User", required: true },
    dishes: [
      {
        dish: { type: Schema.Types.ObjectId, ref: "Dish" },
        quantity: Number,
      },
    ],
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    deliveryMethod: {
      type: String,
      enum: ["delivery", "pickup"],
      required: true,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema, "Orders");
module.exports = orderModel;
