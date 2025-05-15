import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/prisma/prisma-client';
import { NewPostData } from '@/lib/api-client/change-user-info';
import { tokenCheck } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const email = await tokenCheck(req);
  const data = (await req.json()) as NewPostData;

  if (!email) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const user = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

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
    const email = await tokenCheck(req);

    if (!email) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const allPosts = await prismaClient.post.findMany({
      include: {
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });

    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json({ posts: allPosts }, { status: 200 });
    }

    const postsWithLikedBySelectedUser = allPosts.map((post) => ({
      ...post,
      isLikedByCurrentUser: post.likes.map((like) => like.userId === user.id),
    }));

    return NextResponse.json({ posts: postsWithLikedBySelectedUser }, { status: 200 });
  } catch (err) {
    console.error(err);

    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}