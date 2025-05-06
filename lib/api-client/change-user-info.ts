import {NewPostSchemaType} from "@/components/auth/schema";

export interface NewPostData extends NewPostSchemaType {
    imageUrl: string;
}

export const changeUserName = async (username: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/user-action/posts`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username}),
    })

    return res.ok
}

export async function deleteUser() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/user-action`, {
        method: "DELETE"
    })

    return res.ok
}

export async function changeUserPfp(link: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/user-action/update-pfp`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({link: link}),
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