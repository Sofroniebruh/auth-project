'use client';

import { PostComponent } from '@/components/posts-related';
import { usePostDetails } from '@/lib/hooks';

export default function PostPage() {
  const { postWithRelations, isOwnerOfPost, isMounted } = usePostDetails();

  if (!isMounted) return null;

  if (!postWithRelations && isMounted) return null;

  return (
    <PostComponent isOwner={isOwnerOfPost} post={postWithRelations}></PostComponent>
  );
}