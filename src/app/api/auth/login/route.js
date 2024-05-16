import connectDB from "../../../../config/Db";
import User from "../../../../Models/UserModel";
import LoginUser from "../../../../Models/LoginUser";
import { NextResponse } from "next/server";
import { SignalCellularNullRounded } from "@mui/icons-material";

export async function POST(request, response) {
  try {
    connectDB();
    const { email, uniqueIdentity } = await request.json();
    console.log(email);
    console.log(uniqueIdentity);
    const user = await User.findOne({ email: email });
    const notUnique = await LoginUser.findOne({
      uniqueIdentity: uniqueIdentity,
    });
    console.log(notUnique);
    if (notUnique) {
      return NextResponse.error(
        new Error(`Enter another id: ${uniqueIdentity}`),
        { status: 400 }
      );
    }
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
