import { connect } from "@/db/dbConfig";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModle from "@/models/userModel";

connect();

export async function GET(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, msg: "Login requird token" },
      { status: 401 },
    );
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const userId = payload.id;

  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized: Invalid token payload" },
      { status: 401 },
    );
  }

  const userData = await UserModle.findOne({ _id: userId }).select("-password");

  return NextResponse.json({ success: true, msg: "User data", data: userData });
}
