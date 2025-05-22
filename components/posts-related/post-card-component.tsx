'use client';

import { EditIcon, HeartIcon, ShareIcon } from 'lucide-react';
import { useIsAuthenticated, usePostDetails } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui-components/ui/skeleton';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useLikeStore } from '@/lib/store/likeStore';

interface Props {
  image: string,
  id: number,
  handleToggleLike?: (postId: number) => Promise<void>,
  isLikedByUser?: boolean,
}

export const PostCardComponent = ({ image, id, handleToggleLike, isLikedByUser }: Props) => {
  const { isLoggedIn } = useIsAuthenticated();
  const [liked, setLiked] = useState(isLikedByUser);
  const { toggleLike, isLiked } = useLikeStore();
  const [isLoaded, setIsLoaded] = useState<boolean>();
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const { isOwner } = usePostDetails(id.toString());

  useEffect(() => {
    if (isLiked(id) !== liked) {
      setLiked(isLiked(id));
    }
  }, [isLiked(id)]);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      setAspectRatio(ratio);
      setIsLoaded(true);
    };
  }, [image]);

  const handleLike = (id: number) => {
    handleToggleLike ? handleToggleLike(id) : toggleLike(id);
    setLiked(isLiked(id));
  };

  const handleEdit = (id: number) => {
    console.log(id);
  };

  return (
    <div className={'break-inside-avoid rounded-lg shadow-sm overflow-hidden relative'}>
      {isLoaded ? (
        <Link href={`/posts/${id}`} className={'block'}>
          <img
            src={image}
            alt={'cube image'}
            className="w-full h-auto rounded-lg"
          />
        </Link>
      ) : aspectRatio ? (
        <div
          className="w-full bg-gray-200 animate-pulse rounded-lg"
          style={{ aspectRatio: `${1 / aspectRatio}` }}
        />
      ) : (
        <Skeleton className="w-full aspect-[3/4]" />
      )}
      <div className={'absolute bottom-5 right-5'}>
        <div className={'flex items-center gap-2.5'}>
          <div className={'rounded-full bg-white p-2 cursor-pointer hover:bg-white/70'}>
            <ShareIcon size={20}></ShareIcon>
          </div>
          <div
            onClick={() => isOwner ? handleEdit(id) : isLoggedIn ? handleLike(id) : toast('Log In to like')}
            className={'rounded-full bg-white p-2 cursor-pointer hover:bg-white/70'}>
            {isOwner ? (<EditIcon size={20}></EditIcon>) : (<HeartIcon size={20}
                                                                       className={cn(liked ? 'fill-red-600 text-red-600' : '')}></HeartIcon>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};