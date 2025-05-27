import { PostComponent } from '@/components/posts-related';
import { API } from '@/lib/api-client/api';
import { Params } from '@/lib/helpers/helper-types-or-interfaces';

// @ts-ignore
export default async function PostPage({ params }: Promise<Params>) {
  const { id } = await params;

  const totalLikesValidator = (likes: number): string => {
    if (likes >= 1_000_000) {
      return `${parseFloat((likes / 1_000_000).toFixed(2))}M`;
    } else if (likes >= 1_000) {
      return `${parseFloat((likes / 1_000).toFixed(2))}k`;
    }

    return likes.toString();
  };

  try {
    const { post, owner, isOwner } = await API.posts.getPost(id);

    if (post) {
      const likes = post.likes.length;

      return (
        <PostComponent
          post={post}
          owner={owner}
          isOwner={isOwner}
          totalLikes={totalLikesValidator(likes)
          }
        />
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