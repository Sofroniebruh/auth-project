import { Params } from '@/lib/helpers/helper-types-or-interfaces';
import { EditPostComponent } from '@/components/posts-related';
import { prismaClient } from '@/prisma/prisma-client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// @ts-ignore
export default async function EditPostPage({ params }: Promise<Params>) {
  const { id } = await params;
  const cookiesStore = await cookies();
  const token = cookiesStore.get('jwt')?.value;

  if (!token) {
    redirect('/sign-in');
  }

  const post = await prismaClient.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (post) {
    return (
      <EditPostComponent post={post}></EditPostComponent>
    );
  } else {
    return null;
  }
}