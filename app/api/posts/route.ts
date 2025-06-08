import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/prisma/prisma-client';
import { PostData } from '@/lib/api-client/change-user-info';
import { getUserByToken } from '@/lib/helpers/helper-functions';

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as PostData;
    const user = await getUserByToken(req);

    if (!data.imageUrl || !data.name) return NextResponse.json({ error: 'Post image and post name must be provided' }, { status: 400 });

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const post = await prismaClient.post.create({
      data: {
        userId: user.id,
        postName: data.name,
        description: data.description,
        postImageUrl: data.imageUrl,
      },
    });

    if (data.selectedTags) {
      const tagsNotCreatedPreviously = data.selectedTags.filter(tag => !tag.isCreated);
      const tagsCreatedPreviously = data.selectedTags.filter(tag => tag.isCreated);

      for (const tag of tagsNotCreatedPreviously) {
        await prismaClient.tags.create({
          data: {
            tagName: tag.tagName,
            tagAndPosts: {
              create: {
                postId: post.id,
              },
            },
          },
        });
      }

      for (const tag of tagsCreatedPreviously) {
        const createdTag = await prismaClient.tags.findUnique({
          where: {
            tagName: tag.tagName,
          },
        });

        if (!createdTag) continue;

        await prismaClient.tagAndPosts.create({
          data: {
            postId: post.id,
            tagId: createdTag.id,
          },
        });
      }
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
    const user = await getUserByToken(req);

    const allPosts = postIdToSkip ?
      await prismaClient.post.findMany({
        where: {
          NOT: {
            id: Number(postIdToSkip),
          },
        },
        include: {
          likes: {
            select: {
              userId: true,
            },
          },
        },
      }) :
      await prismaClient.post.findMany({
        include: {
          likes: {
            select: {
              userId: true,
            },
          },
        },
      });

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