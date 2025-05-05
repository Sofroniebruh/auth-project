import {NextRequest, NextResponse} from "next/server";
import {verifyJWT} from "@/lib/auth";
import {prismaClient} from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
    const token = req.cookies.get("jwt")?.value

    if (!token) {
        return NextResponse.json({message: "No token provided"}, {status: 500})
    }

    const payload = await verifyJWT(token);

    if (!payload) {
        return NextResponse.json({message: "Invalid token"}, {status: 500})
    }

    // @ts-ignore
    const email = payload.email as string
    const user = await prismaClient.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return NextResponse.json({message: "No user was found"}, {status: 500})
    }

    return NextResponse.json({user: user}, {status: 200})
}