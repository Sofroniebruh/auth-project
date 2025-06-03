import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/prisma/prisma-client';
import { Params } from '@/lib/helpers/helper-types-or-interfaces';
import { getUserByToken, isValidId } from '@/lib/helpers/helper-functions';

// @ts-ignore
export async function GET(req: NextRequest, { params }: Promise<Params>) {
  try {
    const userByToken = await getUserByToken(req);
    const { id } = await params;

    if (!isValidId(id)) {
      return NextResponse.json({ error: 'Id is invalid' }, { status: 400 });
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User was not found' }, { status: 404 });
    }

    const likedPosts = await prismaClient.post.findMany({
      where: {
        likes: {
          some: {
            userId: user.id,
          },
        },
      },
    });

    const postsWithIsOwners = likedPosts.map((post) => ({
      ...post,
      isOwner: userByToken ? post.userId === user.id && userByToken.id === user.id : false,
    }));

    return NextResponse.json({
      message: 'Posts liked by user were processed successfully',
      posts: postsWithIsOwners,
    }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}