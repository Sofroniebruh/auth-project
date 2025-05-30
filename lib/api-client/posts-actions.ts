import { PostsWithLikedByCurrentUser } from '@/lib/helpers/helper-types-or-interfaces';
import { Comment } from '@/components/common/comments-component';

export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts`, {
    method: 'GET',
  });
  
  if (res.ok) {
    return (await res.json()) as { posts: PostsWithLikedByCurrentUser[] };
  }

  throw new Error(res.statusText);
}

export async function getPostsWithoutOpenedPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts?excluding=${id}`, {
    method: 'GET',
  });

  if (res.ok) {
    return (await res.json()) as { posts: PostsWithLikedByCurrentUser[] };
  }

  throw new Error(res.statusText);
}

export async function getCommentsPerPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts/${id}/comments`, {
    method: 'GET',
  });

  const data = await res.json();

  if (data) {
    return data as { comments: Comment[] };
  }

  throw new Error(res.statusText);
}

export async function likePost(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts/${id}`, {
    method: 'PUT',
  });

  return res.ok;
}