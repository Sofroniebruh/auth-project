import { useEffect, useState } from 'react';
import { Post } from '@prisma/client';
import { API } from '@/lib/api-client/api';
import { useLikeStore } from '@/lib/store/likeStore';

export const useTagPosts = (tagType: 'created' | 'commented' | 'liked') => {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [loading, setLoading] = useState(true);
  const { toggleLike, setLikedPosts } = useLikeStore((state) => state);

  const fetchers = {
    created: API.getUserInfo.getAllPostsCreatedByUser,
    liked: API.getUserInfo.getAllPostsLikedByUser,
    commented: API.getUserInfo.getAllPostsCommentedByUser,
  };

  const fetchPosts = async () => {
    setLoading(true);
    if (!tagType || !fetchers[tagType]) return;
    const { posts } = await fetchers[tagType]();
    setPosts(posts);
    if (tagType === 'liked') {
      const likedPosts = posts.map((post) => post.id);
      setLikedPosts(new Set<number>(likedPosts));
    }

    setLoading(false);
  };

  const handleToggleLike = async (postId: number) => {
    const isLiked = await toggleLike(postId);

    if (!isLiked && tagType === 'liked') {
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    loading,
    postsWithAction: posts,
    handleToggleLike,
  };
};