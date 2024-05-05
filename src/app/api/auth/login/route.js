import connectDB from "../../../../config/Db";
import User from "../../../../Models/UserModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    connectDB();
    const { email } = await request.json();
    console.log(email);

    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("User not found with email:", email);
      return NextResponse.error(
        new Error(`User not found with email: ${email}`),
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User is registered!! , Enter Password to Login" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    console.error(err);
    return NextResponse.error(new Error("Internal Server Error"), {
      status: 500,
    });
  }
}
