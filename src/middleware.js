import { NextResponse } from "next/server";
export function middleware(request) {
    const currentPath = request.nextUrl.pathname;
    const allCookies = request.cookies.getAll();
    const sessionCookie = allCookies.find(cookie =>
        cookie.name.includes("better-auth.session_token")
    );
    const sessionToken = sessionCookie?.value;

    const isProtected =
        currentPath.startsWith("/dashboard/user") ||
        currentPath.startsWith("/dashboard/writer") ||
        currentPath.startsWith("/dashboard/admin");

    // Protected Page — if not logged in then redirect
    if (isProtected && !sessionToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", currentPath);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/dashboard/user/:path*",
        "/dashboard/writer/:path*",
        "/dashboard/admin/:path*",
    ],
};