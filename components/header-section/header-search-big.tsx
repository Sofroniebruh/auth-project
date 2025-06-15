'use client';

import { Input } from '@/components/ui-components/ui/input';
import { SheetComponent } from '@/components/common';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { CategoriesSection } from '@/components/header-section/categories-section';
import { useTags } from '@/components/contexts/tag-context';
import { Tags } from '@prisma/client';
import { useStore } from 'zustand/react';
import { sheetStore } from '@/lib/store';

export function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export const HeaderSearchBig = () => {
  const headerInput = (
    <div onClick={
      () => setIsSheetOpen(true, { key: { name: 'search sheet' }, value: true })
    } className={'relative w-full'}>
      <Input className={'bg-white w-full pl-[34px]'}
             placeholder={'Search...'}></Input>
      <SearchIcon className={'text-blue-600 absolute top-[7px] left-[7px] opacity-50'}></SearchIcon>
    </div>
  );
  const { tags } = useTags();
  const sheets = useStore(sheetStore, (state) => state.sheets);
  const setIsSheetOpen = useStore(sheetStore, (state) => state.setIsSheetOpen);
  const isOpenSearchSheet = sheets.some((sheet) => sheet.key.name === 'search sheet');
  const randomTags: Tags[] = getRandomElements(tags, 3);

  return (
    <>
      <div className={'relative hidden sm:block sm:w-full mx-10'}>
        <SheetComponent openState={isOpenSearchSheet} className={'w-full'} triggerElement={
          headerInput
        } sheetTitle={
          <Image src={'/main_logo.png'} width={30} height={30} alt={'main logo'}></Image>
        } side={'top'}>
          <div className={'px-4 pb-4'}>
            {headerInput}
            <CategoriesSection setIsSheetOpen={setIsSheetOpen} className={'mt-4'} items={randomTags} />
          </div>
        </SheetComponent>
      </div>
    </>
  );
};