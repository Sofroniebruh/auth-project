import {cookies} from "next/headers";
import {verifyJWT} from "@/lib/auth/jwt-actions";
import {NextResponse} from "next/server";

export async function GET() {
    const token = (await cookies()).get('jwt')?.value;
    const user = token ? verifyJWT(token) : null;

    if (!user) {
        return NextResponse.json({loggedIn: false}, {status: 401});
    }

    return NextResponse.json({loggedIn: true, user}, {status: 200});
}