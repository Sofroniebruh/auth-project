import {NewPostSchemaType} from "@/components/auth/schema";

export interface NewPostData extends NewPostSchemaType {
    imageUrl: string;
}

export const changeUsername = async (username: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username}),
    })

    return res.ok
}

export async function deleteUser() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user`, {
        method: "DELETE"
    })

    return res.ok
}

export async function changeUserPfp(link: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/users/user`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({profilePicture: link}),
    })

    return res.ok
}

export async function createUserPost(data: NewPostData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/user-action/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name: data.name, description: data.description, imageUrl: data.imageUrl}),
    })

    return res.ok
}