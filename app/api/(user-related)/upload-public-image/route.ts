import {NextRequest, NextResponse} from "next/server";
import {uploadPublicImage} from "@/lib/aws/upload/upload-public-image";
import {prismaClient} from "@/prisma/prisma-client";
import {tokenCheck} from "@/lib";

export async function POST(req: NextRequest) {
    const formData = await req.formData()

    const link = await uploadPublicImage({formData})

    if (!link) {
        return NextResponse.json({message: "Upload failed."}, {status: 500})
    }

    const email = await tokenCheck(req)

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

    return NextResponse.json({link: link}, {status: 200})
}