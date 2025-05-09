import {NextRequest, NextResponse} from "next/server";
import {getUserByToken} from "@/lib/helpers/helper-functions";
import {prismaClient} from "@/prisma/prisma-client";

// @ts-ignore
export async function GET(req: NextRequest, {params}: Promise<{ params: { id: string } }>) {
    try {
        const {id} = await params.id
        const user = await getUserByToken(req)

        const commentedPost = await prismaClient.post.findUnique({
            where: {
                id,
                comments: {
                    some: {
                        userId: user.id,
                    }
                }
            }
        })

        return NextResponse.json({post: commentedPost}, {status: 200})
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({message: "Error retrieving user"}, {status: 401})
        }

        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}