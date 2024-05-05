import mongoose from "mongoose";

const loginUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  deviceInfo: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LoginUser =
  mongoose.models.LoginUser || mongoose.model("LoginUser", loginUserSchema);

export default LoginUser;
