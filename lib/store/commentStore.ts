import { create } from 'zustand/react';
import { Comment } from '@/components/common/comments-component';
import { API } from '@/lib/api-client/api';

type CommentStore = {
  comments: Comment[],
  addComment: (comment: Comment) => void,
  setComments: (comments: Comment[]) => void,
  hydrateComments: (postId: number) => Promise<void>,
  _getComments: (postId: number) => Promise<Comment[]>,
  clearComments: () => void,
}

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [],
  addComment: (comment: Comment) => {
    set((state) => ({
      comments: [...state.comments, comment],
    }));
  },
  setComments: (comments: Comment[]) => {
    set({ comments });
  },
  _getComments: async (postId: number): Promise<Comment[]> => {
    const { post } = await API.posts.getPost(postId.toString());
    return post.comments;
  },
  hydrateComments: async (postId: number) => {
    try {
      set({ comments: await get()._getComments(postId) });
    } catch (error) {
      console.error('Failed to hydrate comments', error);
    }
  },
  clearComments: () => set({ comments: [] }),
}));