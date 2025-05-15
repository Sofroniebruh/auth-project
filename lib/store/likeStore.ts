import { create } from 'zustand/react';
import { API } from '@/lib/api-client/api';

type LikeStore = {
  likedPosts: Set<number>
  toggleLike: (postId: number) => Promise<boolean>
  likes: (postId: string) => Promise<void>
  likesPerPost: Record<number, number>
  isLiked: (postId: number) => boolean
  hydrateLikesForPost: (postId: number) => Promise<void>
  setLikedPosts: (posts: Set<number>) => void
  getLikesPerPost: (postId: number) => number
}

export const useLikeStore = create<LikeStore>((set, get) => ({
  likedPosts: new Set<number>(),

  likesPerPost: {},

  setLikedPosts: (posts) => set({ likedPosts: posts }),

  getLikesPerPost: (postId: number) => {
    return get().likesPerPost[postId];
  },

  isLiked: (postId) => {
    return get().likedPosts.has(postId);
  },

  likes: async (postId) => {
    const { post } = await API.posts.getPost(postId);
    set((state) => ({
      likesPerPost: {
        ...state.likesPerPost,
        [postId]: post.likes.length,
      },
    }));
  },

  toggleLike: async (postId) => {
    const likedPosts = new Set(get().likedPosts);
    const isLiked = likedPosts.has(postId);
    const { post } = await API.posts.getPost(postId.toString());

    const handleUnlike = (postId: number) => {
      likedPosts.delete(postId);
      set((state) => ({
        likesPerPost: {
          ...state.likesPerPost,
          [postId]: Math.max((state.likesPerPost[postId] || 1) - 1, 0),
        },
      }));
    };

    const handleLike = (postId: number) => {
      likedPosts.add(postId);
      set((state) => ({
        likesPerPost: {
          ...state.likesPerPost,
          [postId]: (state.likesPerPost[postId] || 0) + 1,
        },
      }));
    };

    isLiked ? handleUnlike(postId) : handleLike(postId);
    set({ likedPosts });

    try {
      const res = await API.posts.likePost(postId);
      if (!res) throw new Error('Failed to like/unlike');

      return !isLiked;
    } catch (err) {
      const rollback = new Set(get().likedPosts);
      isLiked ? rollback.add(postId) : rollback.delete(postId);
      set((state) => ({
        likedPosts: rollback, likesPerPost: {
          ...state.likesPerPost,
          [postId]: state.likesPerPost[postId],
        },
      }));

      return false;
    }
  },

  hydrateLikesForPost: async (postId) => {
    try {
      await get().likes(postId.toString());
    } catch (error) {
      console.error('Failed to hydrate likes', error);
    }
  },
}));
