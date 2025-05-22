'use client';

import { PostComponent } from '@/components/posts-related';
import { usePostDetails } from '@/lib/hooks';

export default function PostPage() {
  const { postWithRelations, ownerOfPost, isOwner, isMounted } = usePostDetails();

  if (!isMounted) return null;

  if (!postWithRelations) return null;

  if (!ownerOfPost) return null;

  return (
    <PostComponent isOwner={isOwner} owner={ownerOfPost} post={postWithRelations}></PostComponent>
  );
}