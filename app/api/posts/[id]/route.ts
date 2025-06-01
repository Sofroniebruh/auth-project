import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/prisma/prisma-client';
import { Params } from '@/lib/helpers/helper-types-or-interfaces';
import { getUserByToken } from '@/lib/helpers/helper-functions';
import { updatePost } from '@/components/auth/schema';

// @ts-ignore
export async function GET(req: NextRequest, { params }: Promise<Params>) {
  try {
    let isOwner = false;
    const { id } = await params;
    const user = await getUserByToken(req);

    if (!id) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    const postWithRelations = await prismaClient.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            username: true,
            pfpUrl: true,
          },
        },
        comments: {
          select: {
            likes: true,
            id: true,
            commentOwner: {
              select: {
                id: true,
                username: true,
                pfpUrl: true,
              },
            },
            commentContent: true,
            createdAt: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!postWithRelations) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    const owner = {
      id: postWithRelations.createdBy.id,
      email: postWithRelations.createdBy.email,
    };

    if (!user) {
      return NextResponse.json({ post: postWithRelations, owner, isOwner: isOwner }, { status: 200 });
    }

    isOwner = owner.email === user.email;

    const postWithUserLikedOrNo = {
      ...postWithRelations,
      isLikedByUser: postWithRelations.likes.some((like) => like.userId === user.id),
    };

    return NextResponse.json({ post: postWithUserLikedOrNo, owner: owner, isOwner: isOwner }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error(error);
    return NextResponse.json({ error: 'Error retrieving the post' }, { status: 500 });
  }
}

// @ts-ignore
export async function PATCH(req: NextRequest, { params }: Promise<Params>) {
  try {
    const { id } = await params;
    const user = await getUserByToken(req);

    if (!id) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    if (!user) {
      return NextResponse.json({ message: 'No user was found' }, { status: 404 });
    }

    const post = await prismaClient.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!post) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    const existingLike = await prismaClient.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });

    if (existingLike) {
      await prismaClient.like.delete({
        where: {
          userId_postId: {
            userId: existingLike.userId,
            postId: existingLike.postId,
          },
        },
      });

      return NextResponse.json({ message: 'Post was unliked' }, { status: 200 });
    }

    await prismaClient.like.create({
      data: {
        userId: user.id,
        postId: post.id,
      },
    });

    return NextResponse.json({ message: 'Post was liked' }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error(error);
    return NextResponse.json({ error: 'Error updating the post' }, { status: 500 });
  }
}

// @ts-ignore
export async function PUT(req: NextRequest, { params }: Promise<Params>) {
  try {
    const { id } = await params;
    const user = await getUserByToken(req);
    const body = await req.json();

    const postToUpdate = await prismaClient.post.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!postToUpdate) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }

    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    if (user.id !== postToUpdate.userId) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const data = updatePost.parse(body);

    const updatedPost = await prismaClient.post.update({
      where: {
        id: postToUpdate.id,
      },
      data,
    });

    return NextResponse.json({ updatedPost }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error(error);
    return NextResponse.json({ error: 'Error updating the post' }, { status: 500 });
  }
}

// @ts-ignore
export async function DELETE(req: NextRequest, { params }: Promise<Params>) {
  try {
    const { id } = await params;
    const user = await getUserByToken(req);

    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    await prismaClient.post.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: 'Post was deleted successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error(error);
    return NextResponse.json({ error: 'Error deleting the post' }, { status: 500 });
  }
}