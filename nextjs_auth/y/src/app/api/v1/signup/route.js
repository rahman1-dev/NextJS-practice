import UserModle from "@/models/userModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectDb from "@/db/dbConfig";

connectDb();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    console.log("user is :", username, email);

    //first hash the password and save into db using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const addedUser = await UserModle.create({
      email,
      password: hashedPassword,
      username,
    });

    return NextResponse.json({ msg: "Registaration successful", addedUser });
  } catch (error) {
    return NextResponse.json({ msg: "Something went wrong" });
  }
}
