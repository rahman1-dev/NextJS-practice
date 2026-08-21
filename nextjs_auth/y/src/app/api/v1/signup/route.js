import UserModle from "@/models/usermodel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import connectDb from "../db/dbConfig";

connectDb();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;
    console.log("user is :", username, email, password);

    //first hash the password and save into db using bcrypt
    const hashedPassword = bcrypt.hash(password, 10);

    const addedUser = await UserModle.create({
      email,
      password: hashedPassword,
      username,
    });

    NextResponse.json({ msg: "Registaration successful", addedUser });
  } catch (error) {
    NextResponse.json({ msg: "Something went wrong" });
  }
}
