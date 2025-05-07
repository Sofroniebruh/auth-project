import {NextRequest, NextResponse} from "next/server";
import {tokenCheck} from "@/lib";
import {prismaClient} from "@/prisma/prisma-client";
import {NewPostData} from "@/lib/api-client/change-user-info";

export async function POST(req: NextRequest) {
    const email = await tokenCheck(req)
    const data = (await req.json()) as NewPostData

    if (!email) {
        return NextResponse.json({message: "Not authenticated"}, {status: 401})
    }

    const user = await prismaClient.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return NextResponse.json({message: "No user was found"}, {status: 500})
    }

    const newPost = await prismaClient.post.create({
        data: {
            userId: user.id,
            postName: data.name,
            description: data.description,
            postImageUrl: data.imageUrl,
        }
    })

    if (newPost) {
        return NextResponse.json({message: "Post created successfully"}, {status: 200})
    }

    return NextResponse.json({message: "Error creating new Post"}, {status: 500})
}

export async function DELETE(req: NextRequest) {

}