import {NextRequest, NextResponse} from "next/server";
import {signJWT, verifyJWT} from "@/lib/auth/jwt-actions";
import {prismaClient} from "@/prisma/prisma-client";
import {hashPassword} from "@/lib/auth/password-actions";

export async function POST(req: NextRequest) {
    const {password} = (await req.json()) as { password: string };
    const {searchParams} = new URL(req.url);
    const token = searchParams.get("token")

    if (!token) {
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
    }

    const payload = await verifyJWT(token)

    if (!payload) {
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
    }

    const {email} = payload.email as { email: string };

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