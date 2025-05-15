import {Post} from "@prisma/client";

export interface PostWithRelations extends Post {
    createdBy: {
        id: number
        email: string
        password: string | null
        username: string | null
        pfpUrl: string | null
    }
    likes: {
        userId: number
        postId: number
    }[]
    comments: {
        id: number
        commentContent: string
        commentOwner: {
            id: number,
            pfpUrl: string | null,
            username: string,
        },
        createdAt: Date,
    }[]
}

export interface PostsWithLikes {
    allPosts: ({
        likes: {
            userId: number
            postId: number
        }[]
    } & {
        id: number
        userId: number
        postName: string
        description: string | null
        postImageUrl: string
        createdAt: Date
        updatedAt: Date | null
    })[]
}