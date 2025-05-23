import Link from 'next/link';
import {
  AvatarComponent,
  CommentInput,
  CommentsComponent,
  DialogComponent,
  PopoverComponent,
} from '@/components/common';
import { EditIcon, HeartIcon, InfoIcon, MessageCircleIcon, ShareIcon, TrashIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui-components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { PostOwner, PostWithRelations } from '@/lib/helpers/helper-types-or-interfaces';
import { useIsAuthenticated, usePostDetails } from '@/lib/hooks';
import { useCommentStore, useLikeStore } from '@/lib/store';
import { useMemo } from 'react';

interface Props {
  post: PostWithRelations;
  owner: PostOwner;
  isOwner: boolean;
}

export const PostInteractableSection = ({ post, isOwner, owner }: Props) => {
  const { totalLikesValidator } = usePostDetails(post.id.toString());
  const { isLoggedIn } = useIsAuthenticated();
  const isLiked = useLikeStore((state) => state.isLiked(post.id));
  const toggleLike = useLikeStore((state) => state.toggleLike);
  const getLikesPerPost = useLikeStore((state) => state.getLikesPerPost);
  const likesCount = useMemo(() => getLikesPerPost(post.id), [getLikesPerPost, post.id]);
  const comments = useCommentStore((state) => state.comments);

  const handleLike = (id: number) => {
    toggleLike(id);
  };

  return (
    <div className="flex flex-col w-full lg md:w-[400px] md:mt-0 gap-4 min-h-0 justify-between">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className={'flex items-center gap-3'}>
            <Link href={'#'}>

              <AvatarComponent className={'w-9 h-9'} email={post.createdBy.email}
                               profilePicture={post.createdBy.pfpUrl} />
            </Link>
            <h1 className="font-semibold text-lg">{post.createdBy.username}</h1>
          </div>
          <PopoverComponent className={'mr-5 z-30'} trigger={
            <InfoIcon className={'cursor-pointer text-gray-500'}></InfoIcon>
          } content={
            <div className={''}>
              <h1 className={'text-xl font-semibold mb-3'}>Post details</h1>
              <Separator></Separator>
              <div className={'mt-3 flex flex-col gap-1 break-words'}>
                <div>
                  <h1 className={'text-md font-semibold'}>Name</h1>
                  <p>{post.postName}</p>
                </div>
                <div>
                  <h1 className={'text-md font-semibold'}>Description</h1>
                  {post.description!.length == 0 ?
                    (<p className={'text-gray-400'}>Author did not provide a
                      description</p>) :
                    (
                      <p>{post.description}</p>
                    )}
                </div>
                <div>
                  <h1 className={'text-md font-semibold'}>Created at</h1>
                  <p>
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <div>

                  {/*// TODO: change to dynamic data*/}

                  <h1 className={'text-md font-semibold'}>Tags</h1>
                  <div className={'break-words w-full flex gap-x-2 flex-wrap'}>
                    <p>#Frieren</p>
                    <p>#Anime</p>
                    <p>#Bladerunner</p>
                  </div>
                </div>
                {isOwner &&
                  <div>
                    <h1 className={'text-md font-semibold'}>Total likes:</h1>
                    <span className={'flex items-center gap-1'}><HeartIcon size={20}
                                                                           className={'fill-red-600 text-red-600'}></HeartIcon> {totalLikesValidator(likesCount)}
                          </span>
                  </div>
                }
              </div>
            </div>
          }></PopoverComponent>
        </div>
        <div className="flex items-center justify-between">
          {
            isOwner ? (
              <div className={'flex gap-2'}>
                <Button variant={'destructive'}>Delete Post <TrashIcon></TrashIcon></Button>
                <Button
                  className={'bg-blue-600 hover:bg-blue-500'}>Edit <EditIcon></EditIcon></Button>
              </div>
            ) : (
              <div className={'flex items-center gap-3'}>
                <div className={'w-[65px] flex items-center justify-center'}>
                  <p className="font-semibold">{totalLikesValidator(likesCount)}</p>
                </div>
                <Button
                  onClick={() => isLoggedIn ? handleLike(post.id) : toast('Log In to like')}
                  variant="outline"
                  className={cn(isLiked ? 'text-red-600 fill-red-600' : '')}>Like <HeartIcon /></Button>
                <div className="flex items-center gap-3">
                  <Button variant="outline">Save <ShareIcon /></Button>
                </div>
              </div>
            )
          }
          <DialogComponent className={'flex flex-col justify-center items-center'} triggerButton={
            <div
              className={'sm:hidden rounded-full p-2.5 cursor-pointer bg-blue-600 text-white hover:bg-blue-500'}>
              <MessageCircleIcon className={'w-5 h-5'}></MessageCircleIcon>
            </div>
          } title={''}>
            <CommentsComponent owner={owner} comments={comments}
                               className={'flex w-full'}></CommentsComponent>
            <CommentInput postId={post.id} className={'block'}></CommentInput>
          </DialogComponent>
        </div>
        <Separator />
      </div>
      <div className={'hidden sm:flex lg:hidden w-full h-full items-center justify-center'}>
        <DialogComponent className={'flex flex-col justify-center items-center'} triggerButton={
          <div
            className={'bg-blue-600 hover:bg-blue-500 text-white rounded-md p-2 text-sm px-3 cursor-pointer'}>Open
            comment section</div>
        } title={''}>
          <CommentsComponent owner={owner} comments={comments}
                             className={'flex w-full'}></CommentsComponent>
          {isLoggedIn ? (
            <CommentInput postId={post.id} className={'block'}></CommentInput>
          ) : (
            <Button className={'bg-blue-600 text-white'}>
              <p>Log In to leave comments</p>
            </Button>
          )}
        </DialogComponent>
      </div>
      <CommentsComponent owner={owner} comments={comments}
                         className={'lg:flex hidden'}></CommentsComponent>
      {isLoggedIn ? (
        <CommentInput postId={post.id} className={'lg:block hidden'}></CommentInput>
      ) : (
        <Link href={'/sign-in'} className={' justify-center w-full lg:flex hidden'}>
          <Button className={'bg-blue-600 text-white w-[200px]'}>
            <p>Log In to leave comments</p>
          </Button>
        </Link>
      )}
    </div>
  );
};