'use client';

import { useEffect, useState } from 'react';
import { API } from '@/lib/api-client/api';
import { PostOwner, PostWithRelations } from '@/lib/helpers/helper-types-or-interfaces';
import { useParams, useRouter } from 'next/navigation';
import { useCommentStore, useLikeStore } from '@/lib/store';

export const usePostDetails = (postId?: string) => {
  const [likesAmount, setLikesAmount] = useState<string>('0');
  const [postWithRelations, setPostWithRelations] = useState<PostWithRelations>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [ownerOfPost, setOwnerOfPost] = useState<PostOwner>();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const hydrateLikesForPost = useLikeStore((state) => state.hydrateLikesForPost);
  const hydrateComments = useCommentStore((state) => state.hydrateComments);
  const clearComments = useCommentStore((state) => state.clearComments);

  const router = useRouter();
  const params = useParams();
  const paramsId = params.id as string;

  useEffect(() => {
    hydrateLikesForPost(Number(postId ? postId : paramsId));
  }, [hydrateLikesForPost, postId, paramsId]);

  useEffect(() => {
    const id = Number(postId ?? paramsId);

    if (!isNaN(id)) {
      clearComments();
      hydrateComments(id);
    }
  }, [postId, paramsId]);

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
        const { post, owner, isOwner } = await API.posts.getPost(id);

        if (post) {
          const likes = post.likes.length;

          setPostWithRelations(post);
          setLikesAmount(totalLikesValidator(likes));
          setOwnerOfPost(owner);
          setIsOwner(isOwner);

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

    fetchPost(postId ? postId : paramsId);
  }, []);

  return {
    likesAmount,
    postWithRelations,
    isMounted,
    ownerOfPost,
    setLikesAmount,
    totalLikesValidator,
    isOwner,
  };
};