import { NextRequest, NextResponse } from 'next/server';
import { checkPassword } from '@/lib/auth/password-actions';
import { signJWT } from '@/lib/auth/jwt-actions';
import { prismaClient } from '@/prisma/prisma-client';

export async function POST(req: NextRequest) {
  const { email, password } = (await req.json()) as { email: string, password: string };

  const user = await prismaClient.user.findFirst({
    where: { email },
  });

  if (!user) {
    return NextResponse.json({ message: 'Email not found' }, { status: 400 });
  }

  const isValidPassword = await checkPassword(password, user.password!);

  if (!isValidPassword) {
    return NextResponse.json({ message: 'Password does not match' }, { status: 400 });
  }

  const token = signJWT({ email });
  const res = NextResponse.json({ message: 'Logged in' });

  res.cookies.set('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return res;
}