import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function proxy(req) {
  console.log("Middleware ran ::");

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  console.log("token recieved ::", token);

  const isApiRoute = pathname.startsWith("/api/");
  const isProtectedRoute = pathname.startsWith("/profile");

  //   1. Handling backend routed
  if (isApiRoute) {
    console.log("middleware ran for API ROUTE:: ")
    const isPublicRoute =
      pathname.startsWith("/api/v1/signup") ||
      pathname.startsWith("/api/v1/signin");

    if (isPublicRoute) {
      console.log("Public route detected at middleware ----------------")
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.json(
        { success: false, msg: "Unauthorized:No token provided" },
        { status: 401 },
      );
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    if (!payload.id) {
      return NextResponse.json(
        {
          success: false,
          msg: "Unauthorized:Invalid or broken token",
        },
        { status: 401 },
      );
    }

    console.log("cookie verified and got payload::", payload);

    // Inject validated data into request headers
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", payload.id);
    requestHeaders.set("x-user-username", payload.username);
    requestHeaders.set("x-user-email", payload.email);

    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // 2. Handle Frontend Page Protection (Redirects)
  if (isProtectedRoute && !token) {
    const signinUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signinUrl);
  }

  if ((pathname === "/signin" || pathname === "/signup") && token) {
    const profileUrl = new URL("/profile", req.url);
    return NextResponse.redirect(profileUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/v1/:path*", "/profile/:path*", "/signin", "/signup"],
};
