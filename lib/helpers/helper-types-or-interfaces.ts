import { Post } from '@prisma/client';

export interface PostWithRelations extends Post {
  isLikedByUser?: boolean;
  createdBy: {
    id: number
    email: string
    password: string | null
    username: string | null
    pfpUrl: string | null
  };
  likes: {
    userId: number
    postId: number
  }[];
  comments: {
    id: number
    commentContent: string
    commentOwner: {
      id: number,
      pfpUrl: string | null,
      username: string,
    },
    createdAt: Date,
  }[];
}

export interface PostsWithLikedByCurrentUser {
  isLikedByCurrentUser: boolean;
  likes: {
    userId: number
  }[];
  id: number;
  userId: number;
  postName: string;
  description: string | null;
  postImageUrl: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface PostOwner {
  id: number;
  email: string;
}

