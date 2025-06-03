import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import React from 'react';
import { AuthProvider } from '@/components/providers/providers';
import { cookies } from 'next/headers';
import { verifyJWT } from '@/lib/auth';
import { User } from '@prisma/client';
import { prismaClient } from '@/prisma/prisma-client';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Cube',
  description: 'Cube app for portfolio',
};

export default async function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

  let user: User | null = null;
  let email = '';

  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  if (token) {
    const payload = await verifyJWT(token);
    email = payload?.email as string;

    try {
      user = await prismaClient.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <html lang="en">
    <body className={'h-full'}>
    <AuthProvider user={user}>
      {children}
    </AuthProvider>
    </body>
    </html>
  );
}
