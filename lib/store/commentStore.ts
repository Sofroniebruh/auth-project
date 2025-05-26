import { create } from 'zustand/react';
import { Comment } from '@/components/common/comments-component';
import { API } from '@/lib/api-client/api';

type CommentStore = {
  commentsPerPost: Record<number, Comment[]>,
  addComment: (comment: Comment, postId: number) => void,
  hydrateCommentsForPost: (postId: number) => Promise<void>,
  _comments: (postId: number) => void,
  getCommentsPerPost: (postId: number) => Comment[],
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  commentsPerPost: {},
  addComment: (comment: Comment, postId: number) => {
    set((state) => ({
      commentsPerPost: {
        ...state.commentsPerPost,
        [postId]: [...state.commentsPerPost[postId] ?? [], comment],
      },
    }));
  },
  getCommentsPerPost: (postId: number) => {
    return get().commentsPerPost[postId];
  },
  _comments: async (postId: number) => {
    const { comments } = await API.posts.getCommentsPerPost(postId.toString());
    console.log('Post', comments);
    set((state) => ({
      commentsPerPost: {
        ...state.commentsPerPost,
        [postId]: comments,
      },
    }));
  },
  hydrateCommentsForPost: async (postId: number) => {
    try {
      get()._comments(postId);
    } catch (error) {
      console.error('Failed to hydrate comments', error);
    }
  },
}));

export const useComments = (postId: number) => useCommentStore((state) => state.commentsPerPost[postId]);
export const useAddComment = () => useCommentStore((state) => state.addComment);
export const useHydrateComments = () => useCommentStore((state) => state.hydrateCommentsForPost);
