import {NextRequest, NextResponse} from "next/server";
import {signJWT, verifyJWT} from "@/lib/auth";
import {prismaClient} from "@/prisma/prisma-client";
import {hashPassword} from "@/lib/hash";

export async function POST(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({error: 'token is required'}, {status: 500});
    }

    const {password} = (await req.json()) as { password: string };
    const payload = await verifyJWT(token);

    if (!payload || typeof payload !== 'object' || !('email' in payload)) {
        return NextResponse.json({message: 'Invalid token'}, {status: 400});
    }

    const email = payload.email.email as string;
    console.log("Email", email)

    if (!email) {
        return NextResponse.json({message: "Internal server error"}, {status: 500})
    }

    const user = await prismaClient.user.findUnique(
        {
            where: {
                email
            },
        }
    )

    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 500});
    }

    await prismaClient.user.update({
        where: {
            email
        },
        data: {
            password: await hashPassword(password)
        }
    })

    const newToken = signJWT({email})

    const res = NextResponse.json({message: "Password updated successfully"}, {status: 200});
    res.cookies.set('jwt', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24,
    });

    return res;
}