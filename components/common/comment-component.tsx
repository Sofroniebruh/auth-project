import { AvatarComponent } from '@/components/common/avatar-component';
import { Comment } from '@/components/common/comments-component';
import { EditIcon, HeartIcon, TrashIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { memo, useState } from 'react';
import { DialogComponent } from '@/components/common/dialog-component';
import { CommentInput } from '@/components/common/comment-input';
import { Button } from '@/components/ui-components/ui/button';
import { API } from '@/lib/api-client/api';
import { toast } from 'sonner';
import { usePaginatedComments } from '@/lib/hooks/swr';
import { cn } from '@/lib/utils';

interface Props {
  comment: Comment;
  isCreator: boolean;
  isOwner: boolean;
  page: number;
  id: number;
}

export const CommentComponent = memo(({ comment, isCreator, isOwner, page, id }: Props) => {
  const { mutate } = usePaginatedComments(id, page);
  const [likesAmount, setLikesAmount] = useState(comment.likes.length);
  const [isLiked, setIsLiked] = useState(comment.isLiked);

  const handleDelete = async (id: number) => {
    if (await API.comments.deleteComment(id)) {
      toast.success('Comment was deleted successfully');
      await mutate();

      return;
    }

    toast.error('Error deleting your comment');
  };

  const handleLike = async () => {
    const prevLikes = likesAmount;
    const prevLiked = isLiked;

    try {
      if (isLiked) {
        setLikesAmount(Math.max(likesAmount - 1, 0));
        setIsLiked(false);
      } else {
        setLikesAmount(likesAmount + 1);
        setIsLiked(true);
      }

      await API.comments.toggleLikeOnComment(comment.id);
      await mutate();
    } catch (e) {
      console.error(e);
      setLikesAmount(prevLikes);
      setIsLiked(prevLiked);
    }
  };

  return (
    <div className="flex items-start gap-3 w-full">
      <AvatarComponent
        className="w-9 h-9 shrink-0"
        email={comment.commentOwner.username}
        profilePicture={comment.commentOwner.pfpUrl}
      />

      <div className="flex flex-col gap-1 w-full">
        <div className={'flex gap-3'}>
          <p className="text-base font-semibold break-words">{comment.commentOwner.username}</p>
          {isCreator && (
            <div className={'bg-gray-200 rounded-sm px-1 flex items-center'}><p
              className={'text-sm text-center'}>Creator</p></div>
          )}
        </div>
        <p className="break-words">{comment.commentContent}</p>
        <div className={'flex gap-5 items-center'}>
          <p
            className={'text-sm text-gray-400'}>{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
          <p className={'flex text-sm items-center justify-center gap-1'} onClick={handleLike}>
            <HeartIcon
              className={cn('w-4 h-4 cursor-pointer hover:text-red-600', isLiked && 'text-red-600 fill-red-600')}></HeartIcon>
            {likesAmount}
          </p>
        </div>
      </div>
      {isOwner &&
        <div className={'flex flex-col items-end justify-evenly h-full'}>
          <DialogComponent triggerButton={
            <TrashIcon className={'cursor-pointer'} size={16} />
          } title={'Are you sure?'}>
            <div className={'w-full flex items-center justify-center gap-5'}>
              <Button onClick={() => handleDelete(comment.id)} size={'lg'} variant={'destructive'}>Delete My
                Comment</Button>
              <Button size={'lg'} variant={'outline'}>Cancel</Button>
            </div>
          </DialogComponent>
          <DialogComponent triggerButton={
            <EditIcon className={'cursor-pointer'} size={16} />
          } title={'Edit your comment'}>
            <CommentInput comment={comment} isUpdatingComment={true} postId={id} page={page} />
          </DialogComponent>
        </div>
      }
    </div>
  );
});

CommentComponent.displayName = 'CommentComponent';

