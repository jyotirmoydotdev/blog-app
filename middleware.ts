import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
    const { pathname } = request.nextUrl;

    if (token && pathname.startsWith('/signin')) {
        return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (!token && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher : [
        "/admin",
        "/admin/",
        "/admin/:path*",
        "/signin"
    ]
}
