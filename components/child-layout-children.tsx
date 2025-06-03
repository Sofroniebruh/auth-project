'use client';

import React from 'react';
import { HeaderComponent } from '@/components/header-section';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default function ChildLayoutChildren({ children }: Props) {
  const pathname = usePathname();
  const isEditPage = pathname.includes('/edit-post');

  return (
    <>
      <HeaderComponent></HeaderComponent>
      <div className={cn('min-h-screen', isEditPage ? 'mt-[80px]' : 'my-[80px]')}>
        <div id="modal-root"></div>
        {children}
      </div>
      ;
    </>
  );
}