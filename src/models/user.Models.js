// Importing required modules and packages
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Defining the user schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Username is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    score: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false }
);

// Hash the password before saving
userSchema.pre("save", async function () {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  } catch (error) {
    throw error;
  }
});

// Generate JWT token
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRES_IN, // You can adjust the expiration time
  });
  return token;
};

// Creating the User model using the user schema
const User = mongoose.model("User", userSchema);

// Exporting the User model
export default User;
