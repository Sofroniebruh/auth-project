import { CommentStructure } from '@/lib/helpers/helper-types-or-interfaces';
import { Comment } from '@/components/common/comments-component';

export async function createComment(data: CommentStructure) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: data.message,
      id: data.id,
    }),
  });

  if (res.ok) {
    return (await res.json()) as { comment: Comment };
  }

  throw new Error(res.statusText);
}