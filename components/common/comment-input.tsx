'use client';

import { Input } from '@/components/ui-components/ui/input';
import { cn } from '@/lib/utils';
import { SendHorizonalIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inputSchema, InputSchemaType } from '@/components/auth/schema';
import { CommentStructure } from '@/lib/helpers/helper-types-or-interfaces';
import { API } from '@/lib/api-client/api';
import { useCommentStore } from '@/lib/store/commentStore';

interface Props {
  className?: string;
  postId: number;
}

export const CommentInput = ({ className, postId }: Props) => {
  const { addComment } = useCommentStore();
  const form = useForm<InputSchemaType>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      message: '',
    },
  });

  const onSubmit = async (data: InputSchemaType) => {
    const commentData: CommentStructure = {
      message: data.message,
      id: postId,
    };

    const { comment } = await API.comments.createComment(commentData);

    if (comment) {
      addComment(comment);
      console.log(comment);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={'relative w-full'}>
        <Input {...form.register('message')} className={cn('mt-4 px-3 py-5 min-w-[300px]', className)}
               placeholder="Add your comment..." />
        <button type={'submit'}
                className={cn('absolute top-5.5 right-2 bg-blue-600 rounded-full p-2 text-white cursor-pointer text-sm', className)}>
          <SendHorizonalIcon className={'w-4 h-4'}></SendHorizonalIcon></button>
        {form.formState.errors.message && (
          <p className={cn('text-sm text-red-600', className)}>{form.formState.errors.message.message}</p>)}
      </form>
    </FormProvider>
  );
};