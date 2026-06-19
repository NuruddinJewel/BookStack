import { NextResponse } from "next/server";

export function middleware(request) {
    const currentPath = request.nextUrl.pathname;

    // Better-Auth Session Token
    const sessionToken =
        request.cookies.get("better-auth.session_token")?.value ||
        request.cookies.get("__Secure-better-auth.session_token")?.value;

    // Protected Routes
    const isProtected =
        currentPath.startsWith("/dashboard/user") ||
        currentPath.startsWith("/dashboard/writer") ||
        currentPath.startsWith("/dashboard/admin") ||
        /^\/ebooks\/.+/.test(currentPath);

    // Protected Page — if not login then redirect
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
        "/ebooks/:id+",
    ],
};