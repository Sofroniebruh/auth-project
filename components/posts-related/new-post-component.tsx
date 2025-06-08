'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { DragAndDropImageComponent } from '@/components/common';
import { useHandleImageDropZone } from '@/lib/hooks/useHandleImageDropZone';
import { Input } from '@/components/ui-components/ui/input';
import { newPostSchema, PostSchemaType } from '@/components/auth/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Button } from '@/components/ui-components/ui/button';
import { API } from '@/lib/api-client/api';
import { toast } from 'sonner';
import { PostData } from '@/lib/api-client/change-user-info';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '@/components/contexts/auth-context';
import { Separator } from '@/components/ui/separator';
import { PlusIcon, XIcon } from 'lucide-react';
import { TagsWithIsCreated } from '@/lib/helpers/helper-types-or-interfaces';

export const NewPostComponent = () => {
  const [tags, setTags] = useState<TagsWithIsCreated[] | []>([]);
  const [isStartedTypingTags, setIsStartedTypingTags] = useState(false);
  const [isTagsLoading, setIsTagsLoading] = useState(true);
  const [tagInputValue, setTagInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<TagsWithIsCreated[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isNotEnteredTags, setIsNotEnteredTags] = useState<boolean>(false);
  const { user } = useAuth();
  const {
    getInputProps,
    isDragActive,
    getRootProps,
    uploadedFile,
    setUploadedFile,
  } = useHandleImageDropZone({ isPfp: false, id: user!.id });
  const form = useForm<PostSchemaType>({
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStartedTypingTags(false);
      }
    };

    if (isStartedTypingTags) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isStartedTypingTags]);

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTagInputValue(e.target.value);
    setIsStartedTypingTags(true);
    if (e.target.value.length > 0 && e.target.value.trim().length > 0) {
      const selectedTagsNames = selectedTags.map(tag => tag.tagName);
      const excluding = selectedTagsNames.join(',');

      const res = await API.tags.getTagsByName(e.target.value, excluding);
      if (res) {
        setTags(res.tags);
        setIsTagsLoading(false);
        return;
      }
      toast.error('Something went wrong');
    } else {
      setIsTagsLoading(false);
      setIsStartedTypingTags(false);
    }
  };

  const handleNewTag = (text: string, isCreated?: boolean) => {
    if (!text.trim()) return;

    const isAlreadyPresentByAPI = tags.find((tag) => tag.tagName === text);
    const isAlreadyChosenByUser = selectedTags.some((tag) => tag.tagName === text);

    if (isAlreadyPresentByAPI && !isAlreadyChosenByUser) {
      setSelectedTags([...selectedTags, isAlreadyPresentByAPI]);
      setTagInputValue('');
      setIsStartedTypingTags(false);
      return;
    }

    if (!isAlreadyPresentByAPI && !isAlreadyChosenByUser) {
      setSelectedTags([
        ...selectedTags,
        {
          tagName: text,
          isCreated: false,
        },
      ]);
      setTagInputValue('');
      setIsStartedTypingTags(false);
      return;
    }

    return;
  };

  const onSubmit = async (data: PostSchemaType) => {
    const image = await API.uploadImage.uploadPublicImage(uploadedFile!);

    if (!image || image instanceof Error) {
      toast.error('Image upload failed');

      return;
    }

    if (!selectedTags) {
      setIsNotEnteredTags(true);
      return;
    }

    const newPostData: PostData = {
      ...data,
      imageUrl: image,
      selectedTags: selectedTags,
    };

    if (await API.changeUserInfo.createUserPost(newPostData)) {
      toast.success('Post was created successfully');
      router.push(`/profile/${user!.id}`);

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
            <div className={'flex gap-2 flex-wrap'}>
              {selectedTags && selectedTags.length > 0 && (
                selectedTags.map((tag, index) => (
                  <div className={'flex gap-1 rounded-md border shadow-sm p-2 py-1 items-center justify-center'}
                       key={index}>{tag.tagName}
                    <XIcon onClick={() => {
                      setSelectedTags((prev) => prev.filter((t) => t !== tag));
                    }} size={16} className={'cursor-pointer'}></XIcon></div>
                ))
              )}
            </div>
            <p className={'text-sm text-gray-500'}>Tags</p>
            <div className="relative">
              <div>
                <Input
                  value={tagInputValue}
                  placeholder="Enter your tag name..."
                  onChange={onChange}
                  disabled={isFileEmpty}
                />
                {isNotEnteredTags && (
                  <p className={'text-sm text-red-600'}>Tags are required</p>
                )}
              </div>
              {tags && tags.length == 0 &&
                <Button
                  type="button"
                  disabled={isFileEmpty}
                  onClick={() => handleNewTag(tagInputValue)}
                  size="sm"
                  variant="ghost"
                  className="absolute hover:bg-white top-0.5 right-2 z-10"
                >
                  Add <PlusIcon size={16} />
                </Button>
              }
              {isStartedTypingTags && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full left-0 z-40 my-2 w-full max-w-[335px] rounded-lg border border-gray-300 bg-white shadow-lg p-4"
                >
                  {isTagsLoading ? (
                    <p className="text-gray-500 text-sm text-center">Loading...</p>
                  ) : (
                    <div>
                      <h3 className="text-md font-semibold mb-2">Suggested Tags</h3>
                      <Separator className="mb-2" />
                      <div className="max-h-[150px] overflow-y-auto custom-scroll space-y-2">
                        {tags && tags.length > 0 ? (
                          tags.map((tag, index) => (
                            <div
                              onClick={() => {
                                handleNewTag(tag.tagName);
                              }}
                              key={index}
                              className="px-3 py-1 rounded hover:bg-gray-100 cursor-pointer transition"
                            >
                              <p className="text-sm text-gray-800">{tag.tagName}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm text-center">No matching tags were found. Be the
                            first!</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
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
