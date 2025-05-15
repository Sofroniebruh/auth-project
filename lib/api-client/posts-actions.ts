import { PostsWithLikedByCurrentUser, PostWithRelations } from '@/lib/helpers/helper-types-or-interfaces';

export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts`, {
    method: 'GET',
  });

  if (res.ok) {
    return (await res.json()) as { posts: PostsWithLikedByCurrentUser[] };
  }

  throw new Error(res.statusText);
}

export async function getPost(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts/${id}`, {
    method: 'GET',
  });

  const data = await res.json();

  if (data) {
    return data as { post: PostWithRelations, isOwner: boolean };
  }

  throw new Error(res.statusText);
}

export async function likePost(id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts/${id}`, {
    method: 'PUT',
  });

  return res.ok;
}