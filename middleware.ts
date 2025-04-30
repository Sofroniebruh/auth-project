import {NextRequest, NextResponse} from 'next/server';
import {useAuthCheck} from "@/lib/hooks";

const protectedPaths = ['/profile'];

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    if (protectedPaths.some(path => pathname.startsWith(path))) {
        const decoded = useAuthCheck({request})

        if (!decoded) {
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*'],
};
