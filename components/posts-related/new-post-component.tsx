'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { DragAndDropImageComponent } from '@/components/common';
import { useHandleImageDropZone } from '@/lib/hooks/useHandleImageDropZone';
import { Input } from '@/components/ui-components/ui/input';
import { newPostSchema, NewPostSchemaType } from '@/components/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Button } from '@/components/ui-components/ui/button';
import { API } from '@/lib/api-client/api';
import { toast } from 'sonner';
import { NewPostData } from '@/lib/api-client/change-user-info';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export const NewPostComponent = () => {
  const {
    getInputProps,
    isDragActive,
    getRootProps,
    uploadedFile,
    setUploadedFile,
  } = useHandleImageDropZone({ isPfp: false });
  const form = useForm<NewPostSchemaType>({
    resolver: zodResolver(newPostSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const isFileEmpty = uploadedFile?.size == undefined;
  const router = useRouter();

  const previewImage = useMemo(() => {
    if (!uploadedFile) return;
    return URL.createObjectURL(uploadedFile);
  }, [uploadedFile]);

  useEffect(() => {
    return () => {
      if (previewImage) {
        return URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const onSubmit = async (data: NewPostSchemaType) => {
    const image = await API.uploadImage.uploadPublicImage(uploadedFile!);

    if (!image) {
      toast.error('Image upload failed');

      return;
    }

    const newPostData: NewPostData = {
      ...data,
      imageUrl: image,
    };

    if (await API.changeUserInfo.createUserPost(newPostData)) {
      toast.success('Post was created successfully');
      router.push('/profile');

      return;
    }

    toast.error('Error creating post');
  };

  const handleResetImage = () => {
    setUploadedFile(null);
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-5xl mb-4 sm:mb-[40px]">Your new Post</h1>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
          {uploadedFile && previewImage ? (
            <div className="flex flex-col items-center gap-2">
              <Image
                src={previewImage}
                alt="Uploaded preview"
                width={400}
                height={300}
                className="rounded-lg border shadow"
              />
              <Button type="button" onClick={handleResetImage} variant="outline">
                Change Image
              </Button>
            </div>
          ) : (
            <div className={'h-[300px] w-[335px]'}>
              <DragAndDropImageComponent
                className={'flex-1'}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
              />
            </div>

          )}
          <div className="w-full max-w-md space-y-2">
            <div>
              <label className={'text-sm text-gray-500'} htmlFor="name">Post name:</label>
              <Input disabled={isFileEmpty} {...form.register('name')}
                     placeholder="Enter name..." />
              {form.formState.errors.name && (
                <p className={'text-sm text-red-500'}>{form.formState.errors.name.message}</p>
              )}
            </div>

            <label className={'text-sm text-gray-500'} htmlFor="description">Post description
              (optional):</label>
            <Input disabled={isFileEmpty} {...form.register('description')}
                   placeholder="Enter description..." />
          </div>

          <Button disabled={isFileEmpty} size={'lg'} type="submit"
                  className="mt-4 bg-blue-600 w-[200px]">Create</Button>
        </form>
      </FormProvider>
    </div>
  );
};
