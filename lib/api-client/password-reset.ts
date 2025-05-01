import {EmailType} from "@/components/auth/schema";

export async function passwordReset(data: EmailType) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/request-password-reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: data.email})
    })

    return response.ok
}