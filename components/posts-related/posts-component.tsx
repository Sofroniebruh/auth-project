'use client';

import { useEffect, useState } from 'react';
import { API } from '@/lib/api-client/api';
import { MasonryLayout } from '@/components/common';
import { Loading, NoPosts } from '@/components/posts-related/shared';
import { PostCardComponent } from '@/components/posts-related/post-card-component';
import { PostsWithLikedByCurrentUser } from '@/lib/helpers/helper-types-or-interfaces';
import { useLikeStore } from '@/lib/store/likeStore';

export const PostsComponent = () => {
  const [posts, setPosts] = useState<PostsWithLikedByCurrentUser[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);
  const { toggleLike, setLikedPosts } = useLikeStore();

  useEffect(() => {
    setHasMounted(true);
    const fetchPosts = async () => {
      const { posts } = await API.posts.getPosts();
      if (posts) {
        const likedPosts = posts.filter((post) => post.isLikedByCurrentUser);
        setPosts(posts);
        setLikedPosts(new Set<number>(likedPosts.map(post => post.id)));
      }
      setLoading(false);
    };

    fetchPosts();
  }, [toggleLike]);

  if (!hasMounted) return null;

  if (loading) {
    return (
      <div className={'px-5'}>
        <Loading></Loading>
      </div>);
  }

  if (!loading && posts.length == 0) {
    return (
      <NoPosts text={'No posts here yet...'}></NoPosts>
    );
  }

  return (
    <div className={'px-5'}>
      <MasonryLayout>
        {
          posts.map((post, index) => (
            <PostCardComponent isLikedByUser={post.isLikedByCurrentUser} key={index} id={post.id}
                               image={post.postImageUrl}></PostCardComponent>
          ))
        }
      </MasonryLayout>
    </div>
  );
};


