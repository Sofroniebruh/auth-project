import {NextRequest, NextResponse} from "next/server";
import {uploadPublicImage} from "@/lib/aws/upload/upload-public-image";
import {verifyJWT} from "@/lib/auth";
import {prismaClient} from "@/prisma/prisma-client";

export async function POST(req: NextRequest) {
    const formData = await req.formData()

    const link = await uploadPublicImage({formData})

    if (!link) {
        return NextResponse.json({message: "Upload failed."}, {status: 500})
    }

    const token = req.cookies.get("jwt")?.value as string;
    const payload = await verifyJWT(token);

    if (!payload) {
        return NextResponse.json({message: "Token is invalid"}, {status: 500})
    }

    // @ts-ignore
    const email = payload.email as string;

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