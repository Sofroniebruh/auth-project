import {PostWithRelations} from "@/lib/helpers/helper-types-or-interfaces";

export async function getPosts() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts`, {
        method: 'GET',
    })

    if (res.ok) {
        return res.json()
    }

    throw new Error(res.statusText)
}

export async function getPost(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ROUTE}/posts/${id}`, {
        method: 'GET',
    })

    if (res.ok) {
        return (await res.json()) as { post: PostWithRelations }
    }

    throw new Error(res.statusText)
}