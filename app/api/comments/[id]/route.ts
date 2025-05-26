import { NextRequest, NextResponse } from 'next/server';
import { Params } from '@/lib/helpers/helper-types-or-interfaces';
import { tokenCheck } from '@/lib/auth';
import { prismaClient } from '@/prisma/prisma-client';

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

    console.log(id)

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