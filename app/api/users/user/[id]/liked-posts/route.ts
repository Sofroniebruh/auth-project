import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/prisma/prisma-client';
import { Params } from '@/lib/helpers/helper-types-or-interfaces';
import { getUserByToken } from '@/lib/helpers/helper-functions';

// @ts-ignore
export async function GET(req: NextRequest, { params }: Promise<Params>) {
  try {
    const userByToken = await getUserByToken(req);
    const { id } = params;
    const user = await prismaClient.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
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

    return NextResponse.json({ posts: postsWithIsOwners }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: 'Error retrieving user' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}