import { NextRequest, NextResponse } from 'next/server';
import { Params } from '@/lib/helpers/helper-types-or-interfaces';
import { tokenCheck } from '@/lib/auth';
import { prismaClient } from '@/prisma/prisma-client';
import { getUserByToken } from '@/lib/helpers/helper-functions';

// @ts-ignore
export async function PUT(req: NextRequest, { params }: Promise<Params>) {
  try {
    const { id } = await params;
    const email = await tokenCheck(req);
    const commentData = (await req.json()) as { message: string, commentId: number };

    if (!email) {
      throw new Error();
    }

    const updatedComment = await prismaClient.comment.update({
      where: {
        id: commentData.commentId,
      },
      data: {
        commentContent: commentData.message,
      },
    });

    if (!updatedComment) {
      return NextResponse.json({ message: 'Error updating comment' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Comment was successfully updated ' }, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json({ message: 'Error retrieving user' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// @ts-ignore
export async function DELETE(req: NextRequest, { params }: Promise<Params>) {
  try {
    const { id } = await params;
    const email = await tokenCheck(req);

    if (!email) {
      throw new Error();
    }

    const deletedComment = await prismaClient.comment.delete({
      where: {
        id: Number(id),
      },
    });

    if (!deletedComment) {
      return NextResponse.json({ message: 'Error deleting your comment' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Comment was deleted successfully' }, { status: 200 });

  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      return NextResponse.json({ message: 'Error retrieving user' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

// @ts-ignore
export async function PATCH(req: NextRequest, { params }: Promise<Params>) {
  try {
    const { id } = params;
    const user = await getUserByToken(req);

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const comment = await prismaClient.comment.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found', status: 404 });
    }

    const commentHasLiked = await prismaClient.commentLike.findUnique({
      where: {
        userId_commentId: {
          commentId: comment.id,
          userId: user.id,
        },
      },
    });

    if (!commentHasLiked) {
      await prismaClient.commentLike.create({
        data: {
          userId: user.id,
          commentId: comment.id,
        },
      });

      return NextResponse.json({ message: 'Comment was liked' }, { status: 200 });
    }

    await prismaClient.commentLike.delete({
      where: {
        userId_commentId: {
          commentId: comment.id,
          userId: user.id,
        },
      },
    });

    return NextResponse.json({ message: 'Comment was unliked' }, { status: 200 });

  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}