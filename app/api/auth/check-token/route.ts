import {verifyJWT} from "@/lib/auth/jwt-actions";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const token = req.cookies.get('jwt')?.value;

    if (token) {
        const user = token ? verifyJWT(token) : null;

        if (user) {
            return NextResponse.json({loggedIn: true, user}, {status: 200});
        }
    }

    return NextResponse.json({loggedIn: false}, {status: 200});
}