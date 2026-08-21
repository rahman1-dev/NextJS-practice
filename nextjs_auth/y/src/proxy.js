import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function proxy(req) {
  console.log("Middleware ran ::");

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token");

  console.log("token recieved ::", token);

  const isApiRoute = pathname.startsWith("/api/");
  const isOProtectedRoute = pathname.startsWith("/profile");

  //   1. Handling backend route
  if (isApiRoute) {
    const isPublicRoute =
      pathname.startsWith("api/v1/signup") ||
      pathname.startsWith("api/v1/signin");

      if(isPublicRoute){
        return NextResponse.next()
      }
  }
}
