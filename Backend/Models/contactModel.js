const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    subject: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "responded"],
      default: "new",
    },
    subject: { type: String, required: true },
  },
  { timestamps: true }
);

const contactModel = mongoose.model("Contact", contactSchema, "Contacts");
module.exports = contactModel;
