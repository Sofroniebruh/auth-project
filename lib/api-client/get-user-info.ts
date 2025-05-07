import {User} from "@prisma/client";

export const getUserInfo = async (): Promise<User> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user`, {
        method: "GET",
    })

    if (res.ok) {
        const response = (await res.json()) as { user: User }
        return response.user;
    }

    throw new Error(res.statusText);
}
