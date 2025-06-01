import { Post } from '@prisma/client';

export interface PostWithRelations extends Post {
  isLikedByUser: boolean;
  createdBy: {
    id: number
    email: string
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
  isOwner?: boolean;
}

export type UserWithNoPassword = {
  id: number,
  email: string,
  username: string,
  pfpUrl: string | null,
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
  isOwner?: boolean;
}

export interface PostOwner {
  id: number;
  email: string;
}

export interface CommentStructure {
  message: string;
  id: number;
}

export interface EditCommentStructure {
  message: string;
  commentId: number;
}

export type Params = {
  params: {
    id: string;
  };
};

export interface PlainPostsWithIsOwner extends Post {
  isOwner: boolean;
}
