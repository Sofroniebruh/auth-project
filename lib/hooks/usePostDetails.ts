'use client';

import { useEffect, useState } from 'react';
import { API } from '@/lib/api-client/api';
import { PostWithRelations } from '@/lib/helpers/helper-types-or-interfaces';
import { useParams, useRouter } from 'next/navigation';
import { useLikeStore } from '@/lib/store/likeStore';

export const usePostDetails = (id?: string) => {
  const [likesAmount, setLikesAmount] = useState<string>('0');
  const [postWithRelations, setPostWithRelations] = useState<PostWithRelations>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOwnerOfPost, setIsOwnerOfPost] = useState(false);
  const { hydrateLikesForPost } = useLikeStore();

  const router = useRouter();
  const params = useParams();
  const paramsId = params.id as string;

  useEffect(() => {
    hydrateLikesForPost(Number(paramsId));
  }, [hydrateLikesForPost]);

  const totalLikesValidator = (likes: number): string => {
    if (likes >= 1_000_000) {
      return `${parseFloat((likes / 1_000_000).toFixed(2))}M`;
    } else if (likes >= 1_000) {
      return `${parseFloat((likes / 1_000).toFixed(2))}k`;
    }
    return likes.toString();
  };

  useEffect(() => {
    const fetchPost = async (id: string) => {
      setIsMounted(true);
      try {
        const { post, isOwner } = await API.posts.getPost(id);

        if (post) {
          const likes = post.likes.length;

          setPostWithRelations(post);
          setLikesAmount(totalLikesValidator(likes));
          setIsOwnerOfPost(isOwner);

          return;
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
          router.push('/');
        }

        console.log(e);
        router.push('/');
      }
    };

    fetchPost(id ? id : paramsId);
  }, []);

  return {
    likesAmount,
    postWithRelations,
    isMounted,
    isOwnerOfPost,
    setLikesAmount,
  };
};