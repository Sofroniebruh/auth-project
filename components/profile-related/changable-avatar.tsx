'use client';

import { cn } from '@/lib/utils';
import { EditIcon, LoaderCircleIcon } from 'lucide-react';
import { DialogComponent } from '@/components/common/dialog-component';
import { DragAndDropImageComponent } from '@/components/common/drag-and-drop-image-component';
import { useHandleImageDropZone } from '@/lib/hooks/useHandleImageDropZone';
import { AvatarComponent } from '@/components/common';

interface Props {
  className?: string;
  email?: string;
}

export const ChangableAvatarComponent = ({ className, email }: Props) => {
  const {
    isLoading,
    profilePicture,
    openState,
    getInputProps,
    isDragActive,
    getRootProps,
    setIsLoading,
  } = useHandleImageDropZone({ isPfp: true });

  return (
    <div className={'w-fit relative rounded-full overflow-hidden group'}>
      <AvatarComponent setProfileIsLoading={setIsLoading} isForProfile={true} profileIsLoading={isLoading}
                       email={email} profilePicture={profilePicture}
                       className={'w-[70px] h-[70px] sm:w-[100px] sm:h-[100px]'}></AvatarComponent>
      <div
        className={cn(
          'w-full h-full bg-gray-200 absolute flex items-center justify-center cursor-pointer top-0 left-0 ', 'opacity-0 group-hover:opacity-100',
          {
            'hidden': isLoading,
          },
        )}
      >
        <DialogComponent openState={openState} triggerButton={
          <EditIcon className={'cursor-pointer'}></EditIcon>
        } title={'Change profile picture'}>
          <DragAndDropImageComponent className={'flex-1'} isDragActive={isDragActive}
                                     getInputProps={getInputProps}
                                     getRootProps={getRootProps}></DragAndDropImageComponent>
        </DialogComponent>
      </div>
      {isLoading && (
        <div
          className={cn('w-full h-full absolute bg-gray-200 flex items-center justify-center cursor-pointer top-0 left-0')}>
          <LoaderCircleIcon className={'animate-spin'}></LoaderCircleIcon>
        </div>
      )}
    </div>
  );
};