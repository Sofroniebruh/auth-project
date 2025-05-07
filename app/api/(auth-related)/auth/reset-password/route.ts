import {NextRequest, NextResponse} from "next/server";
import {signJWT} from "@/lib/auth/jwt-actions";
import {prismaClient} from "@/prisma/prisma-client";
import {hashPassword} from "@/lib/auth/password-actions";
import {tokenCheck} from "@/lib";

export async function POST(req: NextRequest) {
    const {password} = (await req.json()) as { password: string };
    const email = await tokenCheck(req)

    if (!email) {
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
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