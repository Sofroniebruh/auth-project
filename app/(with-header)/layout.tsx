"use client"

import React from 'react';
import { HeaderComponent } from '@/components/header-section/header';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function ChildLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const pathname = usePathname();
  const isEditPage = pathname.includes('/edit-post');

  return (
    <main className={'relative min-h-screen'}>
      <HeaderComponent></HeaderComponent>
      <div className={cn('min-h-screen', isEditPage ? 'mt-[80px]' : 'my-[80px]')}>
        <div id="modal-root"></div>
        {children}
      </div>
    </main>
  );
}