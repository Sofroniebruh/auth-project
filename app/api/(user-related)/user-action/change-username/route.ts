import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/prisma/prisma-client";
import {tokenCheck} from "@/lib";

export async function PUT(req: NextRequest) {
    const email = await tokenCheck(req)
    const {username} = (await req.json()) as { username: string };

    if (!email) {
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
    }

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