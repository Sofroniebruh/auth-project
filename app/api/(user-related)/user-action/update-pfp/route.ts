import {NextRequest, NextResponse} from "next/server";
import {tokenCheck} from "@/lib";
import {prismaClient} from "@/prisma/prisma-client";

export async function PUT(req: NextRequest) {
    const email = await tokenCheck(req)
    const {link} = (await req.json()) as { link: string }

    if (!email) {
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
    }

    const user = await prismaClient.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return NextResponse.json({message: "User was not found"}, {status: 500})
    }

    await prismaClient.user.update({
        where: {
            email: user.email,
        },
        data: {
            pfpUrl: link,
        }
    })

    return NextResponse.json({message: "Updated successfully"}, {status: 200})
}