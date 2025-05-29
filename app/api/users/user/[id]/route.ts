import { NextRequest, NextResponse } from 'next/server';
import { prismaClient } from '@/prisma/prisma-client';
import { tokenCheck } from '@/lib/auth';
import { updateProfileUsernameOrProfilePictureSchemaForAPI } from '@/components/auth/schema';
import { Params } from '@/lib/helpers/helper-types-or-interfaces';
import { getUserByToken } from '@/lib/helpers/helper-functions';

// @ts-ignore
export async function GET(req: NextRequest, { params }: Promise<Params>) {
  const { id } = await params;
  const userByToken = await getUserByToken(req);
  const userById = await prismaClient.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      email: true,
      username: true,
      pfpUrl: true,
    },
  });

  if (!userById) {
    return NextResponse.json({ message: 'No user was found' }, { status: 404 });
  }

  if (!userByToken) {
    return NextResponse.json({ user: userById, isOwner: false }, { status: 200 });
  }

  const isOwner = userByToken.id === userById.id;

  return NextResponse.json({ user: userById, isOwner: isOwner }, { status: 200 });
}

export async function DELETE(req: NextRequest) {
  const email = await tokenCheck(req);

  if (!email) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  const user = await prismaClient.user.delete({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'No user was found' }, { status: 404 });
  }

  const res = NextResponse.json({ message: 'User was deleted successfully' }, { status: 200 });

  res.cookies.set('jwt', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  return res;
}

export async function PUT(req: NextRequest) {
  const email = await tokenCheck(req);
  const body = await req.json();

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

  const data = updateProfileUsernameOrProfilePictureSchemaForAPI.parse(body);

  await prismaClient.user.update({
    where: {
      email,
    },
    data,
  });

  return NextResponse.json({ message: 'User was updated successfully' }, { status: 200 });
}