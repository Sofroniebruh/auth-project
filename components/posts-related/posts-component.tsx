'use client';

import { Post } from '@prisma/client';
import { useEffect, useState } from 'react';
import { API } from '@/lib/api-client/api';
import { MasonryLayout } from '@/components/common';
import { Loading, NoPosts } from '@/components/posts-related/shared';
import { PostCardComponent } from '@/components/posts-related/post-card-component';
import { useTagPosts } from '@/lib/hooks/useTagPosts';
import { useLikeStore } from '@/lib/store/likeStore';

export const PostsComponent = () => {
  const [allPosts, setPosts] = useState<Post[] | []>([]);
  const { postsWithAction } = useTagPosts('liked');
  const { isLiked } = useLikeStore();
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const fetchPosts = async () => {
      const { posts } = await API.posts.getPosts();
      if (posts) setPosts(posts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (!hasMounted) return null;

  if (loading) {
    return (
      <div className={'px-5'}>
        <Loading></Loading>
      </div>);
  }

  if (!loading && allPosts.length == 0) {
    return (
      <NoPosts text={'No posts here yet...'}></NoPosts>
    );
  }

  return (
    <div className={'px-5'}>
      <MasonryLayout>
        {
          allPosts.map((post, index) => (
            <PostCardComponent isLiked={isLiked(post.id)} key={index} id={post.id}
                               image={post.postImageUrl}></PostCardComponent>
          ))
        }
      </MasonryLayout>
    </div>
  );
};


