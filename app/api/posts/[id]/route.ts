import {NextRequest, NextResponse} from "next/server";
import {prismaClient} from "@/prisma/prisma-client";
import {tokenCheck} from "@/lib/auth";

export type Params = {
    params: {
        id: string;
    };
};

export async function GET(req: NextRequest, {params}: Params) {
    try {
        let isOwner = false
        const {id} = params
        const email = await tokenCheck(req)

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
                        createdAt: true,
                    },
                },
                likes: true,
            }
        })

        if (postWithRelations) {
            if (email) {
                isOwner = postWithRelations.createdBy.email === email;
            }

            return NextResponse.json({post: postWithRelations, isOwner: isOwner}, {status: 200})
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

export async function PUT(req: NextRequest, {params}: Params) {
    try {
        const {id} = params
        const email = await tokenCheck(req)

        if (!id) {
            return NextResponse.json({message: "Not found"}, {status: 404})
        }

        if (!email) {
            return NextResponse.json({message: "Not authenticated"}, {status: 401})
        }

        const user = await prismaClient.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            return NextResponse.json({message: "No user was found"}, {status: 404})
        }

        const post = await prismaClient.post.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!post) {
            return NextResponse.json({message: "Not found"}, {status: 404})
        }

        const existingLike = await prismaClient.like.findUnique({
            where: {
                userId_postId: {
                    userId: user.id,
                    postId: post.id
                }
            }
        });

        if (existingLike) {
            await prismaClient.like.delete({
                where: {
                    userId_postId: {
                        userId: existingLike.userId,
                        postId: existingLike.postId,
                    }
                }
            })

            return NextResponse.json({message: "Post was unliked"}, {status: 200})
        }

        await prismaClient.like.create({
            data: {
                userId: user.id,
                postId: post.id
            }
        })

        return NextResponse.json({message: "Post was liked"}, {status: 201})
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            return NextResponse.json({error: error.message}, {status: 500});
        }

        console.error(error);
        return NextResponse.json({error: "Error retrieving the post"}, {status: 500});
    }
}

export async function DELETE() {

}