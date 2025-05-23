import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

  res.cookies.set('jwt', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  });

  return res;
}