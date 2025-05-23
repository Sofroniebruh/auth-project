import { NextRequest, NextResponse } from 'next/server';
import { tokenCheck } from '@/lib/auth';
import { prismaClient } from '@/prisma/prisma-client';
import { Comment } from '@/components/common/comments-component';

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as { message: string, id: number };
    const email = await tokenCheck(req);

    if (!email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
    }

    const newComment = await prismaClient.comment.create({
      data: {
        userId: user.id,
        postId: data.id,
        commentContent: data.message,
      },
    });

    const comment: Comment = {
      id: newComment.id,
      commentContent: newComment.commentContent,
      commentOwner: {
        id: user.id,
        pfpUrl: user.pfpUrl,
        username: user.username!,
      },
      createdAt: newComment.createdAt,
    };

    return NextResponse.json({ comment: comment }, { status: 201 });
  } catch (err) {
    console.error(err);

    return NextResponse.json({ message: 'Error creating the comment' }, { status: 500 });
  }
}