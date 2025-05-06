import {z} from "zod";

export const password = z.string().min(6, {message: "Password must be at least 6 characters"});
export const email = z.string().min(1, {message: "Email is required"}).email({message: 'Email is invalid'})

export const emailSchema = z.object({
    email: email,
})

export const nameSchema = z.object({
    name: z.string().min(1, {message: "Name is required"}),
})

export const newPostSchema = nameSchema.merge(z.object({
    description: z.string().optional(),
}))

export const formLoginSchema = emailSchema.merge(z.object({
    password: password,
}))

export const twoPasswordsSchema = z.object({
    password: password,
    confirmPassword: password,
}).refine(
    (data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    }
)

export const formRegisterSchema = formLoginSchema.merge(z.object({
        confirmPassword: password,
    })
).refine(
    (data) => data.confirmPassword === data.password, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    }
)

export type NewPostSchemaType = z.infer<typeof newPostSchema>
export type DefaultNamingSchemaType = z.infer<typeof nameSchema>
export type TwoPasswordsSchemaType = z.infer<typeof twoPasswordsSchema>
export type EmailType = z.infer<typeof emailSchema>
export type LoginFormType = z.infer<typeof formLoginSchema>
export type RegisterFormType = z.infer<typeof formRegisterSchema>