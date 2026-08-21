import UserModle from "@/models/userModel";
import { NextResponse } from "next/server";
import connectDb from "@/db/dbConfig";

connectDb();

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;

  //checking whether the user is present in db or not
  const existingUser = await UserModle.findOne({ email });
  if (!existingUser) {
    return NextResponse.json(
      {
        msg: "User not found,Please go and signup first",
      },
      { status: 400 },
    );
  }

  return NextResponse.json({ msg: "SignIn successful", existingUser });

  //   console.log("existing user after registration", existingUser);
}
