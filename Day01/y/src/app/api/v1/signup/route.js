import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { UserModel } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // check if user already exists
    const existingUser = await UserModel.findOne({ email });
    // console.log(existingUser);

    console.log("found this existing user while signup", existingUser)

    if (existingUser) {
      return NextResponse.json({ msg: "user already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const feedback = await UserModel.create({
      email: email,
      username: username,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        msg: "User Registered successfully",
        feedback,
      },
      { status: 201 },
    );

    // return NextResponse.json({ msg: existingUser });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
