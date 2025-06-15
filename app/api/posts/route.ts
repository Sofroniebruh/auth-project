import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/prisma/prisma-client';
import { PostData } from '@/lib/api-client/change-user-info';
import { deleteKeysWithPrefix, getUserByToken, validateReceivedHashtags } from '@/lib/helpers/helper-functions';

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as PostData;
    const user = await getUserByToken(req);

    if (!data.imageUrl || !data.name) return NextResponse.json({ error: 'Post image and post name must be provided' }, { status: 400 });

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await deleteKeysWithPrefix(`user:${user.id}:created_posts`);

    const post = await prismaClient.post.create({
      data: {
        userId: user.id,
        postName: data.name,
        description: data.description,
        postImageUrl: data.imageUrl,
      },
    });

    if (data.selectedTags) {
      await validateReceivedHashtags(post, data.selectedTags);
    }

    return NextResponse.json({ message: 'Post was created successfully', post }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const postIdToSkip = req.nextUrl.searchParams.get('excluding');
    const tag = req.nextUrl.searchParams.get('tag');
    const user = await getUserByToken(req);
    let allPosts;

    const baseInclude = {
      likes: {
        select: {
          userId: true,
        },
      },
    };

    if (tag) {
      allPosts = await prismaClient.post.findMany({
        where: {
          tagAndPosts: {
            some: {
              tag: {
                tagName: tag,
              },
            },
          },
          ...(postIdToSkip && {
            NOT: {
              id: Number(postIdToSkip),
            },
          }),
        },
        include: baseInclude,
      });
    } else {
      allPosts = await prismaClient.post.findMany({
        where: postIdToSkip
          ? {
            NOT: {
              id: Number(postIdToSkip),
            },
          }
          : undefined,
        include: baseInclude,
      });
    }

    if (!user) {
      return NextResponse.json({
        message: 'Posts were retrieved successfully',
        posts: allPosts,
      }, { status: 200 });
    }

    const postsWithLikedBySelectedUser = allPosts.map((post) => ({
      ...post,
      isLikedByCurrentUser: post.likes.some((like) => like.userId === user.id),
      isOwner: post.userId === user.id,
    }));

    return NextResponse.json({
      message: 'Posts were retrieved successfully',
      posts: postsWithLikedBySelectedUser,
    }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}