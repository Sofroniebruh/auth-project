import React from 'react';
import { HeaderComponent } from '@/components/header-section/header';

export default function ChildLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <main className={'relative min-h-screen'}>
      <HeaderComponent></HeaderComponent>
      <div className={'min-h-screen my-[80px]'}>
        <div id="modal-root"></div>
        {children}
      </div>
    </main>
  );
}