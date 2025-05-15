import {create} from 'zustand/react'
import {API} from '@/lib/api-client/api'

type LikeStore = {
    likedPosts: Set<number>
    toggleLike: (postId: number) => Promise<void>
    likes: (postId: string) => Promise<void>
    likesAmount: number
    isLiked: (postId: number) => boolean
    hydrateLikesForPost: (postId: number) => Promise<void>
    setLikedPosts: (posts: Set<number>) => void
}

export const useLikeStore = create<LikeStore>((set, get) => ({
    likedPosts: new Set<number>(),

    setLikedPosts: (posts) => set({likedPosts: posts}),

    isLiked: (postId) => {
        return get().likedPosts.has(postId)
    },

    likesAmount: 0,

    likes: async (postId) => {
        const {post} = await API.posts.getPost(postId)
        set({likesAmount: post.likes.length})
    },

    toggleLike: async (postId) => {
        const likedPosts = new Set(get().likedPosts)
        let likesAmount = get().likesAmount
        const isLiked = likedPosts.has(postId)
        const {post} = await API.posts.getPost(postId.toString())

        const handleUnlike = (postId: number) => {
            likedPosts.delete(postId)
            likesAmount--
        }

        const handleLike = (postId: number) => {
            likedPosts.add(postId)
            likesAmount++
        }

        isLiked ? handleUnlike(postId) : handleLike(postId)
        set({likedPosts, likesAmount})

        try {
            const res = await API.posts.likePost(postId)
            if (!res) throw new Error("Failed to like/unlike")
        } catch (err) {
            const rollback = new Set(get().likedPosts)
            isLiked ? rollback.add(postId) : rollback.delete(postId)
            set({likedPosts: rollback, likesAmount: post.likes.length})
        }
    },

    hydrateLikesForPost: async (postId) => {
        try {
            const {post} = await API.posts.getPost(postId.toString())
            set({likesAmount: post.likes.length})
        } catch (error) {
            console.error("Failed to hydrate likes", error)
        }
    }
}))
