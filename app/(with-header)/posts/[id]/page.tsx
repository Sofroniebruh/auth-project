import { PostProvider } from '@/components/contexts/post-context';
import { Params, PostOwner, PostWithRelations } from '@/lib/helpers/helper-types-or-interfaces';
import { cookies } from 'next/headers';
import { PostComponent } from '@/components/posts-related';

// @ts-ignore
export default async function PostPage({ params }: Promise<Params>) {
  const { id } = await params;
  const cookieStore = await cookies();
  const jwt = cookieStore.get('jwt')?.value;

  const totalLikesValidator = (likes: number): string => {
    if (likes >= 1_000_000) {
      return `${parseFloat((likes / 1_000_000).toFixed(2))}M`;
    } else if (likes >= 1_000) {
      return `${parseFloat((likes / 1_000).toFixed(2))}k`;
    }

    return likes.toString();
  };

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts/${id}`, {
      method: 'GET',
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    });

    const data = (await res.json()) as { post: PostWithRelations, owner: PostOwner, isOwner: boolean };
    const { post, owner, isOwner } = data;

    if (data.post) {
      const likes = data.post.likes.length;
      const totalLikes = totalLikesValidator(likes);

      return (
        <PostProvider post={post} owner={owner} isOwner={isOwner} totalLikes={totalLikes}>
          <PostComponent />
        </PostProvider>
      );
    } else {
      return null;
    }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);

      return null;
    }
    console.error(e);

    return null;
  }
}