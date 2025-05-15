'use client';

import { PostCardComponent } from '@/components/posts-related';
import * as React from 'react';
import { MasonryLayout } from '@/components/common/masonry-layout';
import { useTagPosts } from '@/lib/hooks/useTagPosts';
import { Loading, NoPosts } from '../posts-related/shared';
import { useLikeStore } from '@/lib/store/likeStore';

export const LikedPosts = () => {
  const { postsWithAction, loading, handleToggleLike } = useTagPosts('liked');
  const { isLiked } = useLikeStore();

  if (loading) {
    return (
      <Loading></Loading>
    );
  }

  if (postsWithAction.length === 0 && !loading) {
    return (
      <NoPosts text={'Nothing is to your liking yet...'}></NoPosts>
    );
  }

  return (
    <MasonryLayout>
      {
        postsWithAction.length > 0 && (
          postsWithAction.map((post, index) => (
            <PostCardComponent isLikedByUser={isLiked(post.id)} handleToggleLike={handleToggleLike} id={post.id} key={index}
                               image={post.postImageUrl} />
          ))
        )
      }
    </MasonryLayout>
  );
};