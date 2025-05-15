import { CommentComponent } from '@/components/common/comment-component';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

export type Comment = {
  id: number
  commentContent: string
  commentOwner: {
    id: number,
    pfpUrl: string | null,
    username: string,
  },
  createdAt: Date
}

interface Props {
  className?: string;
  comments: Comment[];
  isOwner: boolean;
}

export const CommentsComponent = ({ className, comments, isOwner }: Props) => {
  return (
    <div className={cn('flex-col gap-4', className)}>
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      <div className={'flex flex-col h-[400px] w-full'}>
        <div
          className={cn('overflow-y-auto h-full flex flex-col gap-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100', comments.length == 0 && 'w-full')}>
          {comments.length == 0 ? (
            <div className={'w-full h-full flex justify-center items-center'}>
              <p>No comments here yet...</p>
            </div>
          ) : (
            comments.map((comment, index) => (
              <CommentComponent isOwner={isOwner} key={index} comment={comment} />
            ))
          )}
        </div>
        <Pagination className={'mt-8'}>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};