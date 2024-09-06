const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    profilePicture: String,
    chefDisplayicture: String,
    role: { type: String, enum: ["user", "chef", "admin"], default: "user" },
    bio: String,
    savedRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
    orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    businessDetails: {
      paymentInfo: String,
      address: String,
    },
    otp: String,
    otpExpiry: Date,
    googleId: { type: String },
    facebookId: { type: String },
    isDeleted: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: true },
    yearsOfExperience: { type: Number },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema, "Users");
module.exports = userModel;

// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const userSchema = new Schema(
//   {
//     name: { type: String, required: true, trim: true, maxlength: 100 },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//     },
//     password: { type: String, required: true },
//     profilePicture: String,
//     role: {
//       type: String,
//       enum: ["user", "chef", "admin"],
//       default: "user",
//       index: true,
//     },
//     bio: { type: String, maxlength: 500 },
//     savedRecipes: [{ type: Schema.Types.ObjectId, ref: "Recipe" }],
//     orderHistory: [{ type: Schema.Types.ObjectId, ref: "Order" }],
//     businessDetails: {
//       paymentInfo: {
//         type: String,
//         validate: {
//           validator: function (v) {
//             return this.role === "chef" ? !!v : true;
//           },
//           message: (props) => `${props.path} is required for chefs!`,
//         },
//       },
//       address: String,
//     },
//     otp: String, // Consider hashing this
//     otpExpiry: Date,
//     isDeleted: { type: Boolean, default: false, index: true },
//   },
//   { timestamps: true }
// );

// const userModel = mongoose.model("User", userSchema, "Users");
// module.exports = userModel;
// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema, "Users");
module.exports = User;
