import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/verifyToken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("cronometro-token")?.value;

  //if (!token) return NextResponse.redirect(new URL("/", req.url));

  const { valid } = verifyToken(token);
  //if (!valid) return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/secretaria/:path*", "/cronometrista/:path*","/corrida/:path*"],
};
