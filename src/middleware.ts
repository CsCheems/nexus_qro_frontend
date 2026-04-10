import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest){
    const token = request.cookies.get("token")?.value;

    const { pathname } = request.nextUrl;

    const protectedRoutes = [
        "/profile",
        "/proyects"
    ];

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    if(isProtected && !token){
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/projects/:path*"]
};