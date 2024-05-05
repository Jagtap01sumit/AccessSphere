import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please provide a password."],
  },
  otp: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  otpCreatedAt: {
    type: Date,
  },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
