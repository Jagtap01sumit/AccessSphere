import connectDB from "../../../../config/Db";
import UserLogin from "../../../../Models/LoginUser"; // Import Mongoose model
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await connectDB();

    // Fetch all documents from the LoginUser collection using Mongoose model
    const userData = await UserLogin.find({});

    return NextResponse.json({ userData }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.error(new Error("Internal Server Error"), {
      status: 500,
    });
  }
}
