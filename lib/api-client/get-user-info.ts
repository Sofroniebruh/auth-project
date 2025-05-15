import { Post, User } from '@prisma/client';

export const getUserInfo = async (): Promise<User> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user`, {
    method: 'GET',
  });

  if (res.ok) {
    const response = (await res.json()) as { user: User };
    return response.user;
  }

  throw new Error(res.statusText);
};

export const getAllPostsLikedByUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user/liked-posts`, {
    method: 'GET',
  });

  if (res.ok) {
    return (await res.json()) as { posts: Post[] };
  }

  if (res.status === 401 || res.status === 403) {
    return { posts: [] };
  }

  throw new Error(res.statusText);
};

export const getPostLikedByUser = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user/liked-posts/${id}`, {
    method: 'GET',
  });

  if (res.ok) {
    return (await res.json()) as { post: Post };
  }

  throw new Error(res.statusText);
};

export const getAllPostsCreatedByUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user/created-posts`, {
    method: 'GET',
  });

  if (res.ok) {
    return (await res.json()) as { posts: Post[] };
  }

  throw new Error(res.statusText);
};

export const getPostCreatedByUser = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user/created-posts/${id}`, {
    method: 'GET',
  });

  if (res.ok) {
    return (await res.json()) as { post: Post[] };
  }

  throw new Error(res.statusText);
};

export const getAllPostsCommentedByUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user/commented-posts`, {
    method: 'GET',
  });

  if (res.ok) {
    return (await res.json()) as { posts: Post[] };
  }

  throw new Error(res.statusText);
};

export const getPostCommentedByUser = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user/commented-posts/${id}`, {
    method: 'GET',
  });

  if (res.ok) {
    return (await res.json()) as { post: Post[] };
  }

  throw new Error(res.statusText);
};