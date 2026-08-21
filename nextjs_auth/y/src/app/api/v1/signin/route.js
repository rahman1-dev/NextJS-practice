import UserModle from "@/models/userModel";
import { NextResponse } from "next/server";
import connectDb from "@/db/dbConfig";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

  console.log("found user while login", existingUser);

  const isValidUser = await bcrypt.compare(password, existingUser.password);

  if (!isValidUser) {
    return NextResponse.json({ msg: "Invalid password" }, { status: 401 });
  }

  const payload = {
    id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });

  const response = NextResponse.json(
    {
      msg: "SignIn successful",
    },
    { status: 200 },
  );

  response.cookies.set({
    name: "token",
    vlaue: token,
    httpOnly: true, // Prevents client-side JS from reading the cookie
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 day in seconds
  });

  return response;
}
