import { UserModel } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allUsers = UserModel.find({});
    NextResponse.json({ "users list": allUsers });
  } catch (error) {
    NextResponse.json({ error: error.message });
  }
}
