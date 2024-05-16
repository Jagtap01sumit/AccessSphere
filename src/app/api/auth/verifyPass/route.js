import connectDB from "../../../../config/Db";
import User from "../../../../Models/UserModel";
import LoginUser from "../../../../Models/LoginUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    connectDB();
    const { email, password, deviceInfo } = await request.json();
    console.log("ver", deviceInfo);
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.error(new Error("User does not exist."), {
        status: 404,
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.error(new Error("Invalid password."), {
        status: 401,
      });
    }

    const loginUser = new LoginUser({
      email: user.email,
      userId: user._id,
      deviceInfo: deviceInfo,
    });
    await loginUser.save();

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json(
      { message: "User is authenticated.", token },
      { status: 200 }
    );

    cookies().set("token", token, {
      httpOnly: true,
      maxAge: 86400,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.error(new Error("Internal Server Error"), {
      status: 500,
    });
  }
}
