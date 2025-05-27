'use client';

import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { Toaster } from '@/components/ui-components/ui/sonner';
import { AuthProviderUser } from '@/components/contexts/auth-context';
import { User } from '@prisma/client';

export function AuthProvider({ children, user }: { children: ReactNode, user: User | null }) {
  return (
    <AuthProviderUser initialUser={user}>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </AuthProviderUser>
  );
}
