import {z} from "zod";

export const password = z.string().min(6, {message: "Password must be at least 6 characters"});

export const formLoginSchema = z.object({
    email: z.string().min(1, {message: "Email is required"}).email({message: 'Email is invalid'}),
    password: password,
})

export const formRegisterSchema = formLoginSchema.merge(z.object({
        confirmPassword: password,
    })
).refine(
    (data) => data.confirmPassword === data.password, {
        message: "Password must match",
        path: ["confirmPassword"],
    }
)

export type LoginFormType = z.infer<typeof formLoginSchema>
export type RegisterFormType = z.infer<typeof formRegisterSchema>