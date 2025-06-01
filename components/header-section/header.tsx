'use client';

import { ImageIcon, LogInIcon, MenuIcon, PlusIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui-components/ui/button';
import { SheetComponent } from '@/components/common';
import { HeaderSearchSmall } from '@/components/header-section/header-search-small';
import { HeaderSearchBig } from '@/components/header-section/header-search-big';
import React from 'react';
import { useAuth } from '@/components/contexts/auth-context';
import { useStore } from 'zustand/react';
import { sheetStore } from '@/lib/store';

export const HeaderComponent = () => {
  const pathname = usePathname();
  const isProfilePage = pathname.startsWith('/profile');
  const isEditPostPage = pathname.includes('/edit-post');
  const { isAuthenticated, user } = useAuth();
  const isOpenSheet = useStore(sheetStore, (state) => state.isOpenSheet);
  const setIsOpenSheet = useStore(sheetStore, (state) => state.setIsOpenSheet);

  return (
    <header
      className={'flex py-5 px-5 w-full justify-between items-center bg-white/70 backdrop-blur-md fixed top-0 z-50'}>
      <SheetComponent openState={isOpenSheet} triggerElement={<MenuIcon onClick={() => setIsOpenSheet(true)} size={25}
                                                                        className={'cursor-pointer'}></MenuIcon>}
                      sheetTitle={'Menu'}
                      side={'left'}>
        <div className={'flex flex-col p-10 gap-5 max-w-[345px] sm:w-full'}>
          <h1 className={'text-3xl sm:text-5xl font-semibold'}>Cube</h1>
          <div className={'w-full h-0.5 bg-black'}></div>
          <ul>
            <Link onClick={() => setIsOpenSheet(false)} href={'/posts'}>
              <li
                className={cn('text-lg sm:text-2xl flex gap-2 items-center justify-start cursor-pointer', pathname.startsWith('/posts') && 'text-blue-600')}>
                <ImageIcon></ImageIcon> Posts
              </li>
            </Link>
            {isAuthenticated && user ? (
              <Link onClick={() => setIsOpenSheet(false)} href={`/profile/${user.id}`}>
                <li
                  className={cn('text-lg sm:text-2xl flex gap-2 items-center justify-start cursor-pointer', pathname.startsWith('/profile') && !pathname.includes('new-post') && 'text-blue-600')}>
                  <UserIcon></UserIcon> Profile
                </li>
              </Link>
            ) : (
              <Link href="/sign-in" className={'w-full flex items-center mt-4'}>
                <Button
                  className={'w-full shadow-sm bg-linear-to-r/decreasing from-gray-50 to-white text-black border text-base sm:text-lg py-5 rounded-lg'}>Sign
                  in <LogInIcon></LogInIcon></Button>
              </Link>
            )
            }
          </ul>
          {isAuthenticated && user && (
            <Link onClick={() => setIsOpenSheet(false)} href={`/profile/${user.id}/new-post`}>
              <Button size={'lg'}
                      className={'w-full bg-blue-600 mt-10 text-lg sm:text-xl sm:py-6 cursor-pointer text-center'}>Add
                new
                Post <PlusIcon /></Button>
            </Link>
          )}
        </div>
      </SheetComponent>
      {(!isEditPostPage && !isProfilePage) && (
        <>
          <HeaderSearchBig />
          <HeaderSearchSmall />
        </>
      )}
      <Link href={'/'}>
        <Image src={'/main_logo.png'} width={40} height={40} alt={'main logo'}></Image>
      </Link>
    </header>
  );
};