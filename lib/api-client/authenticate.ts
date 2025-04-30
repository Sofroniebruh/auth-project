import {LoginFormType, RegisterFormType} from "@/components/auth/schema";

export async function login(data: LoginFormType) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    return response.ok;
}

export async function register(data: RegisterFormType) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password,
        }),
    })

    return response.ok;
}