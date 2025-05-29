import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/prisma/prisma-client';
import { NewPostData } from '@/lib/api-client/change-user-info';
import { getUserByToken } from '@/lib/helpers/helper-functions';

export async function POST(req: NextRequest) {
  const data = (await req.json()) as NewPostData;
  const user = await getUserByToken(req);

  if (!user) {
    return NextResponse.json({ message: 'No user was found' }, { status: 404 });
  }

  const newPost = await prismaClient.post.create({
    data: {
      userId: user.id,
      postName: data.name,
      description: data.description,
      postImageUrl: data.imageUrl,
    },
  });

  if (newPost) {
    return NextResponse.json({ message: 'Post created successfully' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Error creating new Post' }, { status: 500 });
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
      return NextResponse.json({ posts: allPosts }, { status: 200 });
    }

    const postsWithLikedBySelectedUser = allPosts.map((post) => ({
      ...post,
      isLikedByCurrentUser: post.likes.some((like) => like.userId === user.id),
      isOwner: post.userId === user.id,
    }));

    return NextResponse.json({ posts: postsWithLikedBySelectedUser }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}