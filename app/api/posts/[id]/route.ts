import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/prisma/prisma-client";

type Params = {
    params: {
        id: string;
    };
};

export async function GET(req: NextRequest, {params}: Params) {
    try {
        const {id} = params

        if (!id) {
            return NextResponse.json({message: "Not found"}, {status: 404})
        }

        const postWithRelations = await prismaClient.post.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                createdBy: true,
                comments: {
                    select: {
                        id: true,
                        commentOwner: {
                            select: {
                                id: true,
                                username: true,
                                pfpUrl: true,
                            }
                        },
                        commentContent: true,
                    },
                },
                likes: true,
            }
        })

        if (postWithRelations) {
            return NextResponse.json({post: postWithRelations}, {status: 200})
        }

        return NextResponse.json({message: "Not found"}, {status: 404})
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return NextResponse.json({error: error.message}, {status: 500});
        }

        console.error(error);
        return NextResponse.json({error: "Error retrieving the post"}, {status: 500});
    }
}

export async function PUT() {

}

export async function DELETE() {

}