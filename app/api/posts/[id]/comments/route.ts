import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/prisma/prisma-client';
import { tokenCheck } from '@/lib/auth';
import { Params } from '@/lib/helpers/helper-types-or-interfaces';

// @ts-ignore
export async function GET(req: NextRequest, { params }: Promise<Params>) {
  const { id } = await params;
  const page = Number(req.nextUrl.searchParams.get('page'));
  const limit = Number(req.nextUrl.searchParams.get('limit'));
  const email = await tokenCheck(req);

  const [paginatedComments, count] = await prismaClient.$transaction([
    prismaClient.comment.findMany({
      where: {
        postId: Number(id),
      },
      select: {
        id: true,
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

  if (!email) {
    return response;
  }

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return response;
  }

  const postCommentsWithIsOwner = paginatedComments.map((comment) => ({
    ...comment,
    isOwner: comment.commentOwner.id === user.id,
  }));

  return NextResponse.json({ comments: postCommentsWithIsOwner, totalPages: totalPages });
}