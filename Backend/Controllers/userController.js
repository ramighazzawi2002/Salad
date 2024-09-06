const User = require("../Models/userModel");
const Recipe = require("../Models/recipeModel");
const Order = require("../Models/orderModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { OAuth2Client } = require("google-auth-library");
const userModel = require("../Models/userModel");

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendOTP = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP. Please try again.");
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { email, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // your email
        pass: process.env.PASSWORD, // your email password
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reply to your message",
      text: message,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending Message:", error);
  }
};

// exports.getUserInfo = async(req,res) => {
//   const token = req.cookie.token;
//   const userId = req.cookie.user_id;

// }
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.getUsersWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalUsers = await User.countDocuments({ isDeleted: false });
    const users = await User.find({ isDeleted: false }).skip(skip).limit(limit);
    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

exports.getChefs = async (req, res) => {
  try {
    const chefs = await User.find({ role: "chef", isDeleted: false });
    res.status(200).json({ success: true, chefs });
  } catch (error) {
    console.error("Error fetching chefs:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    const newUser = new User({
      name,
      email,
      password: hashedPassword, // Save the hashed password
      otp,
      otpExpiry,
    });

    await newUser.save();
    // console.log("User saved:", newUser);

    await sendOTP(email, otp);
    // console.log("OTP sent to:", email);

    res
      .status(201)
      .json({ message: "User registered. Check your email for OTP." });
  } catch (error) {
    console.error("Error in signUp controller:", error);
    res.status(500).json({ error: "Server error." });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    if (user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    // Clear OTP fields
    user.otp = undefined;
    user.otpExpiry = undefined;

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Set token and user_id as HTTP-only cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    res.cookie("user_id", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    await user.save();

    // Send response
    res.status(200).json({
      success: true,
      message: "OTP verified successfully. You are now logged in.",
      token, // Include token in response for frontend storage
      user_id: user._id, // Include user_id in response for frontend storage
    });
  } catch (error) {
    console.error("Error in verifyOTP controller:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // Token expires in 1 day
    );

    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    res.cookie("user_id", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      user_id: user._id, // Include user_id in response for frontend storage
    });
  } catch (error) {
    console.error("Error in logIn controller:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignup = async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        profilePicture: picture,
        googleId: payload.sub,
      });
      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Set token as an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    // Set user_id as an HTTP-only cookie
    res.cookie("user_id", user._id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    res.status(200).json({
      success: true,
      message: "Signup successful",
      token: token,
      user_id: user._id, // Include user_id in response for frontend storage
    });
  } catch (error) {
    console.error("Google signup error:", error);
    res.status(500).json({ message: "Error during Google signup" });
  }
};

exports.userToggleActive = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    user.isActivated = !user.isActivated;
    await user.save();
    res.status(200).json({ message: "User status updated successfully." });
  } catch (error) {
    console.error("Error in userToggleActive controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Profile

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId)
      .select("-password -otp -otpExpiry")
      .populate("savedRecipes")
      .populate({
        path: "orderHistory",
        match: { status: "completed" },
        populate: {
          path: "dishes.dish",
          model: "Dish",
        },
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user;
    const { name, email, bio, profilePicture } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name, email, bio, profilePicture },
      { new: true, runValidators: true }
    ).select("-password -otp -otpExpiry");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.removeSavedRecipe = async (req, res) => {
  try {
    const userId = req.user;
    const { recipeId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedRecipes: recipeId } },
      { new: true }
    ).select("savedRecipes");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.savedRecipes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.removeOrderHistory = async (req, res) => {
  try {
    const userId = req.user;
    const { orderId } = req.params;

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { orderHistory: orderId } },
      { new: true }
    ).select("orderHistory");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user.orderHistory);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.convertFromUserToChef = async (req, res) => {
  try {
    const { id, yearsOfExperience } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Users request not found" });
    }
    user.role = "chef";
    user.yearsOfExperience = yearsOfExperience;
    await user.save();
    res.status(200).json({
      message: "User converted to chef successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
exports.countAllUsers = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.countAllChefs = async (req, res) => {
  try {
    const totalChefs = await userModel.countDocuments({ role: "chef" });
    res.status(200).json({ totalChefs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.countActiveUsers = async (req, res) => {
  try {
    const activeUsers = await userModel.countDocuments({ isActivated: true });
    res.status(200).json({ activeUsers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
