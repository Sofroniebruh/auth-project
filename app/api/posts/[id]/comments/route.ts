import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/prisma/prisma-client';
import { Params } from '@/lib/helpers/helper-types-or-interfaces';
import { getUserByToken } from '@/lib/helpers/helper-functions';

// @ts-ignore
export async function GET(req: NextRequest, { params }: Promise<Params>) {
  try {
    const { id } = await params;
    const page = Number(req.nextUrl.searchParams.get('page'));
    const limit = Number(req.nextUrl.searchParams.get('limit'));
    const user = await getUserByToken(req);

    const [paginatedComments, count] = await prismaClient.$transaction([
      prismaClient.comment.findMany({
        where: {
          postId: Number(id),
        },
        select: {
          id: true,
          likes: true,
          commentContent: true,
          createdAt: true,
          commentOwner: {
            select: {
              id: true,
              pfpUrl: true,
              username: true,
            },
          },
        },
        skip: limit * (page - 1),
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prismaClient.comment.count({
        where: {
          postId: Number(id),
        },
      }),
    ]);

    const totalPages = Math.ceil(count / limit);

    const response = NextResponse.json({ comments: paginatedComments, totalPages: totalPages, isOwner: false });


    if (!user) {
      return response;
    }

    const commentsLikedByCurrentUser = await prismaClient.commentLike.findMany({
      where: {
        userId: user.id,
      },
    });

    const postCommentsWithIsOwner = paginatedComments.map((comment) => ({
      ...comment,
      isOwner: comment.commentOwner.id === user.id,
      isLiked: commentsLikedByCurrentUser.some((likedComment) => likedComment.commentId === comment.id),
    }));

    return NextResponse.json({ comments: postCommentsWithIsOwner, totalPages: totalPages });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}