import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/prisma/prisma-client";
import {hashPassword} from "@/lib/hash";
import {signJWT} from "@/lib/auth";

export async function POST(req: NextRequest) {
    const {email, password} = (await req.json()) as { email: string; password: string };

    const isEmailTaken = await prismaClient.user.findUnique({
        where: {email},
    })

    if (isEmailTaken) {
        return NextResponse.json({message: "Email already taken"}, {status: 401})
    }

    await prismaClient.user.create({
        data: {
            email,
            password: await hashPassword(password),
        }
    })

    const token = signJWT({email});
    const res = NextResponse.json({message: "Registered"});

    res.cookies.set('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24,
    });

    return res;
}