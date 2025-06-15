'use client';

import { Input } from '@/components/ui-components/ui/input';
import { SheetComponent } from '@/components/common';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import { CategoriesSection } from '@/components/header-section/categories-section';
import { useTags } from '@/components/contexts/tag-context';
import { Tags } from '@prisma/client';

export const HeaderSearchBig = () => {
  const headerInput = (
    <div className={'relative w-full'}>
      <Input className={'bg-white w-full pl-[34px]'}
             placeholder={'Search...'}></Input>
      <SearchIcon className={'text-blue-600 absolute top-[7px] left-[7px] opacity-50'}></SearchIcon>
    </div>
  );
  const { tags } = useTags();

  function getRandomElements<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  const randomTags: Tags[] = getRandomElements(tags, 3);

  return (
    <>
      <div className={'relative hidden sm:block sm:w-full mx-10'}>
        <SheetComponent className={'w-full'} triggerElement={
          headerInput
        } sheetTitle={
          <Image src={'/main_logo.png'} width={30} height={30} alt={'main logo'}></Image>
        } side={'top'}>
          <div className={'px-4 pb-4'}>
            {headerInput}
            <CategoriesSection className={'mt-4'} items={randomTags} />
          </div>
        </SheetComponent>
      </div>
    </>
  );
};