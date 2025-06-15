'use client';

import { Tags } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface Props {
  items: Tags[],
  className?: string
}

export const CategoriesSection = ({ items, className }: Props) => {
  const router = useRouter();

  const handleClick = async (tagName: string) => {
    router.replace(`/posts?tag=${tagName}`);
    router.refresh();
  };

  return (
    <div className={className}>
      <h1 className={'text-2xl text-blue-600'}>Tags you may like:</h1>
      <ul className={'text-xl mt-2.5'}>
        {
          items.map((tag, index) => (
            <li onClick={() => handleClick(tag.tagName)} className={'cursor-pointer hover:text-blue-600 w-fit'}
                key={index}>#{tag.tagName}</li>
          ))
        }
      </ul>
    </div>
  );
};