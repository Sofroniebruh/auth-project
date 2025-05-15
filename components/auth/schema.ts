import { z } from 'zod';

export const password = z.string().min(6, { message: 'Password must be at least 6 characters' });
export const email = z.string().min(1, { message: 'Email is required' }).email({ message: 'Email is invalid' });

// FOR POSTS
export const newPostSchema = z.object({
  name: z.string().min(1, { message: 'Post name is required' }),
  description: z.string().optional(),
});

// FOR PROFILES
export const emailSchema = z.object({
  email: email,
});

export const usernameSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }),
});

export const formLoginSchema = emailSchema.merge(z.object({
  password: password,
}));

export const twoPasswordsSchema = z.object({
  password: password,
  confirmPassword: password,
}).refine(
  (data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  },
);

export const formRegisterSchema = formLoginSchema.merge(z.object({
    confirmPassword: password,
  }),
).refine(
  (data) => data.confirmPassword === data.password, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  },
);

// FOR API
export const updateProfileUsernameOrProfilePictureSchemaForAPI = z.object({
  username: z.string().optional(),
  pfpUrl: z.string().optional(),
});

export type UpdatedUserAPISchema = z.infer<typeof updateProfileUsernameOrProfilePictureSchemaForAPI>
export type NewPostSchemaType = z.infer<typeof newPostSchema>
export type UsernameSchemaType = z.infer<typeof usernameSchema>
export type TwoPasswordsSchemaType = z.infer<typeof twoPasswordsSchema>
export type EmailType = z.infer<typeof emailSchema>
export type LoginFormType = z.infer<typeof formLoginSchema>
export type RegisterFormType = z.infer<typeof formRegisterSchema>