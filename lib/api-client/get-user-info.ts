import {User} from "@/generated/prisma";

export const GetProfileImage = async (): Promise<string | null> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/user-action`, {
        method: "GET",
    })

    if (res.ok) {
        const response = (await res.json()) as { user: User }
        return response.user.pfpUrl;
    }

    throw new Error(res.statusText);
}

export const GetUserEmailAndUsername = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/user-action`, {
        method: "GET",
    })

    if (res.ok) {
        return res.json();
    }

    throw new Error(res.statusText);
}
