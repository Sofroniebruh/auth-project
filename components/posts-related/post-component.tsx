'use client';

import { PostCardOpenedVersion } from '@/components/posts-related/post-card-opened-version';
import { ArrowLeftIcon } from 'lucide-react';
import { PostsComponent } from '@/components/posts-related/posts-component';
import { PostOwner, PostWithRelations } from '@/lib/helpers/helper-types-or-interfaces';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PostInteractableSection } from '@/components/posts-related/post-interactable-section';

interface Props {
  post: PostWithRelations;
  owner: PostOwner;
  isOwner: boolean;
}

export const PostComponent = ({ post, owner, isOwner }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  return (
    <div className={'flex flex-col'}>
      <div className="px-5 sm:px-[80px] pt-10 pb-4 sm:py-10">
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <div
            className="w-full sm:min-w-[240px] sm:max-w-[300px] md:max-w-[370px] xl:max-w-[430px] flex items-center justify-center relative gap-8">
            <div onClick={router.back}
                 className={'hidden md:block rounded-full p-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-500'}>
              <ArrowLeftIcon /></div>
            <PostCardOpenedVersion
              image={post.postImageUrl} />
          </div>
          <PostInteractableSection post={post} owner={owner} isOwner={isOwner} />
        </div>
      </div>
      <PostsComponent></PostsComponent>
    </div>
  );
};