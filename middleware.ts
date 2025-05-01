import {NextRequest, NextResponse} from 'next/server';
import {verifyJWT} from "@/lib/auth";

const protectedPaths = ['/profile'];

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    if (protectedPaths.some(path => pathname.startsWith(path))) {
        const token = request.cookies.get('jwt')?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }

        const decoded = verifyJWT(token);

        if (!decoded) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*'],
};
