import {NextRequest, NextResponse} from "next/server";
import {verifyJWT} from "@/lib/auth";
import {prismaClient} from "@/prisma/prisma-client";

export async function PUT(req: NextRequest) {
    const token = req.cookies.get("jwt")?.value
    const {username} = (await req.json()) as { username: string };

    if (!token) {
        return NextResponse.json({message: "Invalid token"}, {status: 401})
    }

    const payload = await verifyJWT(token)

    if (!payload) {
        return NextResponse.json({message: "Invalid token"}, {status: 500})
    }

    const email = payload.email as string

    const user = await prismaClient.user.findUnique({
        where: {email},
    })

    if (!user) {
        return NextResponse.json({message: "User not found"}, {status: 404})
    }

    await prismaClient.user.update({
        where: {
            email: user.email
        },
        data: {
            username,
        }
    })

    return NextResponse.json({message: "Username was updated successfully"}, {status: 200})
}