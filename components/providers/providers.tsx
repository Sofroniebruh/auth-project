'use client';

import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { Toaster } from '@/components/ui-components/ui/sonner';

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
}
