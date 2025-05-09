import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/prisma/prisma-client";
import {getUserByToken} from "@/lib/helpers/helper-functions";

export async function GET(req: NextRequest) {
    try {
        const user = await getUserByToken(req)

        const createdPosts = await prismaClient.post.findMany({
            where: {
                userId: user.id
            }
        })

        return NextResponse.json({posts: createdPosts}, {status: 200})
    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({message: "Error retrieving user"}, {status: 401})
        }

        return NextResponse.json({message: "Something went wrong"}, {status: 500})
    }
}